import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const siteUrl = "https://www.aslm.ro";
const appOutputDir = path.join(process.cwd(), ".next", "server", "app");

function fail(message) {
  throw new Error(message);
}

function walkHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function routeFromHtmlFile(filePath) {
  const relative = path
    .relative(appOutputDir, filePath)
    .replaceAll(path.sep, "/")
    .replace(/\.html$/, "");

  if (relative === "index") {
    return "/";
  }

  return `/${relative}`;
}

function expectedUrlForRoute(route) {
  return route === "/" ? siteUrl : `${siteUrl}${route}`;
}

function matchContent(html, pattern, label, route) {
  const match = html.match(pattern);
  if (!match) {
    fail(`${route}: missing ${label}`);
  }

  return match[1];
}

function parseJsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
    .flatMap((match) => {
      const parsed = JSON.parse(match[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
}

if (!existsSync(appOutputDir)) {
  fail("Missing .next/server/app. Run `npm run build` before `npm run test:seo`.");
}

const htmlFiles = walkHtmlFiles(appOutputDir).filter((filePath) => {
  const route = routeFromHtmlFile(filePath);
  return route !== "/_not-found" && route !== "/_global-error";
});

if (htmlFiles.length === 0) {
  fail("No built HTML pages found under .next/server/app.");
}

const rows = htmlFiles
  .map((filePath) => {
    const route = routeFromHtmlFile(filePath);
    const html = readFileSync(filePath, "utf8");

    return {
      route,
      html,
      title: matchContent(html, /<title>(.*?)<\/title>/s, "title", route),
      description: matchContent(
        html,
        /<meta name="description" content="([^"]*)"/,
        "description",
        route,
      ),
      canonical: matchContent(
        html,
        /<link rel="canonical" href="([^"]*)"/,
        "canonical",
        route,
      ),
      ogUrl: matchContent(
        html,
        /<meta property="og:url" content="([^"]*)"/,
        "og:url",
        route,
      ),
    };
  })
  .sort((a, b) => a.route.localeCompare(b.route));

const home = rows.find((row) => row.route === "/");
if (!home) {
  fail("Missing built homepage HTML.");
}

function findRoute(route) {
  const row = rows.find((candidate) => candidate.route === route);
  if (!row) {
    fail(`Missing built route ${route}`);
  }

  return row;
}

for (const row of rows) {
  const expectedUrl = expectedUrlForRoute(row.route);
  if (row.canonical !== expectedUrl) {
    fail(`${row.route}: expected canonical ${expectedUrl}, received ${row.canonical}`);
  }
  if (row.ogUrl !== expectedUrl) {
    fail(`${row.route}: expected og:url ${expectedUrl}, received ${row.ogUrl}`);
  }

  if (row.route !== "/" && row.title === home.title) {
    fail(`${row.route}: title matches homepage title`);
  }
  if (row.route !== "/" && row.description === home.description) {
    fail(`${row.route}: description matches homepage description`);
  }
}

const homeSchemas = parseJsonLd(home.html);
const organizationSchema = homeSchemas.find((schema) => schema["@type"] === "MedicalOrganization");
if (!organizationSchema) {
  fail("Homepage is missing MedicalOrganization JSON-LD.");
}
if (organizationSchema.address?.addressLocality !== "Brașov") {
  fail("MedicalOrganization schema addressLocality is not Brașov.");
}
for (const socialUrl of [
  "https://www.facebook.com/profile.php?id=61587670614129",
  "https://www.instagram.com/aslm.lifestylemedicine/",
]) {
  if (!organizationSchema.sameAs?.includes(socialUrl)) {
    fail(`MedicalOrganization schema is missing sameAs URL: ${socialUrl}`);
  }
}

const allHtml = rows.map((row) => row.html).join("\n");
for (const stalePhrase of [
  "va avea loc",
  "Vă invităm",
  "va găzdui",
  "Următorul Eveniment Mare",
]) {
  if (allHtml.includes(stalePhrase)) {
    fail(`Built HTML still contains stale congress phrase: ${stalePhrase}`);
  }
}

const sitemapPath = path.join(appOutputDir, "sitemap.xml.body");
if (!existsSync(sitemapPath)) {
  fail("Missing built sitemap body.");
}

const sitemap = readFileSync(sitemapPath, "utf8");
if (sitemap.includes("https://aslm.ro")) {
  fail("Sitemap still contains non-www https://aslm.ro URLs.");
}
if (!sitemap.includes("<loc>https://www.aslm.ro/y-aslm</loc>")) {
  fail("Sitemap is missing https://www.aslm.ro/y-aslm.");
}
if (!sitemap.includes("<loc>https://www.aslm.ro/llms.txt</loc>")) {
  fail("Sitemap is missing https://www.aslm.ro/llms.txt.");
}

for (const expectedSitemapUrl of [
  "https://www.aslm.ro/medicina-stilului-de-viata",
  "https://www.aslm.ro/evenimente/credite-emc",
  "https://www.aslm.ro/lifestyle-medicine-romania",
  "https://www.aslm.ro/ghid/gestionare-stres",
  "https://www.aslm.ro/ghid/sanatatea-somnului",
  "https://www.aslm.ro/revizie-medicala",
  "https://www.aslm.ro/experti/andrea-elena-neculau",
  "https://www.aslm.ro/experti/monica-tarcea",
  "https://www.aslm.ro/ghid/alimentatie-sanatoasa",
  "https://www.aslm.ro/ghid/activitate-fizica",
  "https://www.aslm.ro/ghid/renuntare-fumat-alcool",
  "https://www.aslm.ro/ghid/relatii-sociale-sanatate",
  "https://www.aslm.ro/medicina-stilului-de-viata-vs-medicina-preventiva",
  "https://www.aslm.ro/ai-context.md",
]) {
  if (!sitemap.includes(`<loc>${expectedSitemapUrl}</loc>`)) {
    fail(`Sitemap is missing ${expectedSitemapUrl}.`);
  }
}

const robotsPath = path.join(appOutputDir, "robots.txt.body");
if (!existsSync(robotsPath)) {
  fail("Missing built robots body.");
}

const robots = readFileSync(robotsPath, "utf8");
if (!robots.includes("Sitemap: https://www.aslm.ro/sitemap.xml")) {
  fail("robots.txt does not reference the www sitemap.");
}
for (const bot of [
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Bingbot",
]) {
  if (!robots.includes(`User-Agent: ${bot}`) || !robots.includes("Allow: /")) {
    fail(`robots.txt does not explicitly allow ${bot}.`);
  }
}

const llmsPath = path.join(process.cwd(), "public", "llms.txt");
if (!existsSync(llmsPath)) {
  fail("Missing public/llms.txt for AI search context.");
}

const llms = readFileSync(llmsPath, "utf8");
for (const requiredContent of [
  "Canonical site: https://www.aslm.ro",
  "Societatea Academica de Medicina Stilului de Viata",
  "https://www.aslm.ro/blog",
  "The ASLM inaugural congress took place on 10-12 May 2026",
  "Editorial and medical review policy: https://www.aslm.ro/revizie-medicala",
  "Canonical guide for healthy nutrition: https://www.aslm.ro/ghid/alimentatie-sanatoasa",
  "Canonical guide for physical activity: https://www.aslm.ro/ghid/activitate-fizica",
  "Canonical guide for avoiding harmful substances: https://www.aslm.ro/ghid/renuntare-fumat-alcool",
  "Canonical guide for social connection and health: https://www.aslm.ro/ghid/relatii-sociale-sanatate",
]) {
  if (!llms.includes(requiredContent)) {
    fail(`public/llms.txt is missing required AI context: ${requiredContent}`);
  }
}

const aiContextPath = path.join(process.cwd(), "public", "ai-context.md");
if (!existsSync(aiContextPath)) {
  fail("Missing public/ai-context.md for machine-readable AI context.");
}
const aiContext = readFileSync(aiContextPath, "utf8");
for (const requiredContent of [
  "ASLM entity summary",
  "Medical review",
  "Six canonical pillar guides",
  "https://www.aslm.ro/medicina-stilului-de-viata",
]) {
  if (!aiContext.includes(requiredContent)) {
    fail(`public/ai-context.md is missing required AI context: ${requiredContent}`);
  }
}

const pillar = findRoute("/medicina-stilului-de-viata");
if (!pillar.title.includes("Medicina stilului de viață")) {
  fail("/medicina-stilului-de-viata: title does not target medicina stilului de viață.");
}
for (const requiredText of [
  "Medicina stilului de viață: definiție, piloni și aplicare în România",
  "Ce este medicina stilului de viață?",
  "Alimentație echilibrată",
  "Medicina stilului de viață vs medicina preventivă",
  "Cui i se adresează",
  "Când este nevoie de evaluare medicală",
  "Pentru profesioniști",
  "FAQPage",
  "MedicalWebPage",
  "Revizuit de: Consiliul Științific ASLM",
  "World Health Organization",
]) {
  if (!pillar.html.includes(requiredText)) {
    fail(`/medicina-stilului-de-viata is missing required content: ${requiredText}`);
  }
}

const seoRoutes = [
  ["/evenimente/credite-emc", ["credite EMC", "puncte EMC medici", "FAQPage"]],
  ["/lifestyle-medicine-romania", ["Lifestyle medicine in Romania", "Academic Society of Lifestyle Medicine", "FAQPage"]],
  ["/ghid/gestionare-stres", ["Gestionare stres", "tehnici de gestionare a stresului", "FAQPage"]],
  ["/ghid/sanatatea-somnului", ["sănătatea somnului", "somn de calitate", "FAQPage"]],
  ["/ghid/alimentatie-sanatoasa", ["alimentație sănătoasă", "alimente integrale", "MedicalWebPage", "FAQPage"]],
  ["/ghid/activitate-fizica", ["activitate fizică", "mișcare regulată", "MedicalWebPage", "FAQPage"]],
  ["/ghid/renuntare-fumat-alcool", ["renunțare fumat alcool", "substanțe nocive", "MedicalWebPage", "FAQPage"]],
  ["/ghid/relatii-sociale-sanatate", ["relații sociale sănătate", "sprijin social", "MedicalWebPage", "FAQPage"]],
  ["/medicina-stilului-de-viata-vs-medicina-preventiva", ["Medicina stilului de viață vs medicina preventivă", "diferențe", "FAQPage"]],
];
for (const [route, requiredTexts] of seoRoutes) {
  const row = findRoute(route);
  for (const requiredText of requiredTexts) {
    if (!row.html.includes(requiredText)) {
      fail(`${route} is missing required content: ${requiredText}`);
    }
  }
}

for (const [route, keyword] of [
  ["/blog/alimentatie", "alimentație sănătoasă"],
  ["/blog/activitate-fizica", "activitate fizică"],
  ["/blog/calitate-somn", "sănătatea somnului"],
  ["/blog/gestionare-stres", "gestionare stres"],
  ["/blog/evitare-substante", "renunțare fumat alcool"],
  ["/blog/relatii-sociale", "relații sociale sănătate"],
]) {
  const row = findRoute(route);
  if (!row.html.includes(keyword)) {
    fail(`${route} is missing hub keyword: ${keyword}`);
  }
  if (!row.html.includes("/medicina-stilului-de-viata")) {
    fail(`${route} does not link to the lifestyle medicine pillar page.`);
  }
}

const reviewPolicy = findRoute("/revizie-medicala");
for (const requiredText of [
  "Procesul editorial și de revizie medicală ASLM",
  "Conținut educațional, nu diagnostic",
  "standard de citare",
  "Consiliul Științific ASLM",
  "MedicalOrganization",
]) {
  if (!reviewPolicy.html.includes(requiredText)) {
    fail(`/revizie-medicala is missing required E-E-A-T policy content: ${requiredText}`);
  }
}

for (const [route, name] of [
  ["/experti/andrea-elena-neculau", "Prof. Dr. Andrea Elena Neculau"],
  ["/experti/monica-tarcea", "Prof. Dr. Monica Tarcea"],
]) {
  const row = findRoute(route);
  if (!row.html.includes(name) || !row.html.includes("Person")) {
    fail(`${route} is missing expert profile content or Person schema.`);
  }
}

const articleRoutes = [
  "/blog/alimentatie/alimentatia-echilibrata-cheia-unei-vieti-active",
  "/blog/alimentatie/deficientele-nutritionale-si-riscul-de-depresie",
  "/blog/alimentatie/rolul-alimentatiei-in-prevenirea-bolilor",
  "/blog/activitate-fizica/cum-activitatile-in-aer-liber-reduc-stresul",
  "/blog/activitate-fizica/tehnici-de-automotivare-pentru-antrenamente",
  "/blog/activitate-fizica/beneficiile-inotului-pentru-sanatatea-pulmonara",
  "/blog/calitate-somn/cum-impacteaza-somnul-sanatatea-fizica-si-mentala",
  "/blog/calitate-somn/ritmul-circadian-de-ce-conteaza-ora-de-culcare",
  "/blog/calitate-somn/somnul-fragmentat-si-inflamatia-sistemica",
  "/blog/gestionare-stres/stresul-cronic-si-riscul-cardiovascular",
  "/blog/gestionare-stres/managementul-stresului-la-locul-de-munca",
  "/blog/gestionare-stres/constientizarea-emotiilor-si-gandirea-pozitiva",
  "/blog/evitare-substante/fumatul-si-inflamatia-cronica",
  "/blog/evitare-substante/tehnici-pentru-renuntarea-la-tutun-si-alcool",
  "/blog/evitare-substante/inlocuirea-obiceiurilor-nocive-cu-obiceiuri-sanatoase",
  "/blog/relatii-sociale/importanta-relatiilor-sociale-la-varstnici",
  "/blog/relatii-sociale/combaterea-izolarii-sociale-beneficiile-activitatilor-de-grup",
  "/blog/relatii-sociale/conexiunile-sociale-si-sanatatea-mentala",
];

for (const route of articleRoutes) {
  const row = findRoute(route);
  for (const requiredText of [
    "Last updated: 2026",
    "Autor: Echipa editorială ASLM",
    "Revizuit de: Consiliul Științific ASLM",
    "Key takeaways",
    "Întrebări frecvente",
    "Referințe",
    "/revizie-medicala",
    "/medicina-stilului-de-viata",
  ]) {
    if (!row.html.includes(requiredText)) {
      fail(`${route} is missing E-E-A-T/extractability block: ${requiredText}`);
    }
  }
}

console.log(`Verified SEO metadata for ${rows.length} built pages.`);
