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
    if (entry.isDirectory()) walkHtmlFiles(fullPath, files);
    else if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function routeFromHtmlFile(filePath) {
  const relative = path
    .relative(appOutputDir, filePath)
    .replaceAll(path.sep, "/")
    .replace(/\.html$/, "");
  return relative === "index" ? "/" : `/${relative}`;
}

function expectedUrl(route) {
  return route === "/" ? siteUrl : `${siteUrl}${route}`;
}

function matchContent(html, pattern, label, route) {
  const match = html.match(pattern);
  if (!match) fail(`${route}: missing ${label}`);
  return match[1];
}

function flattenSchemas(value) {
  if (Array.isArray(value)) return value.flatMap(flattenSchemas);
  if (value && typeof value === "object" && Array.isArray(value["@graph"])) {
    return [value, ...value["@graph"].flatMap(flattenSchemas)];
  }
  return value && typeof value === "object" ? [value] : [];
}

function parseJsonLd(html, route) {
  return [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)]
    .flatMap((match) => {
      try {
        return flattenSchemas(JSON.parse(match[1]));
      } catch (error) {
        fail(`${route}: invalid JSON-LD (${error.message})`);
      }
    });
}

function normalizeInternalHref(href) {
  if (/^(?:mailto:|tel:|javascript:|#)/i.test(href)) return null;
  try {
    const url = new URL(href.replaceAll("&amp;", "&"), siteUrl);
    if (url.origin !== siteUrl) return null;
    let pathname = decodeURI(url.pathname).replace(/\/+$/, "");
    if (!pathname) pathname = "/";
    if (/\.[a-z0-9]{2,5}$/i.test(pathname)) return null;
    return pathname;
  } catch {
    return null;
  }
}

if (!existsSync(appOutputDir)) {
  fail("Missing .next/server/app. Run `npm run build` before `npm run test:seo`.");
}

const htmlFiles = walkHtmlFiles(appOutputDir).filter((filePath) => {
  const route = routeFromHtmlFile(filePath);
  return route !== "/_not-found" && route !== "/_global-error";
});

if (htmlFiles.length === 0) fail("No built HTML pages found under .next/server/app.");

const rows = htmlFiles.map((filePath) => {
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
    canonical: matchContent(html, /<link rel="canonical" href="([^"]*)"/, "canonical", route),
    ogUrl: matchContent(html, /<meta property="og:url" content="([^"]*)"/, "og:url", route),
    schemas: parseJsonLd(html, route),
  };
}).sort((a, b) => a.route.localeCompare(b.route));

const rowByRoute = new Map(rows.map((row) => [row.route, row]));
const findRoute = (route) => {
  const row = rowByRoute.get(route);
  if (!row) fail(`Missing built route ${route}`);
  return row;
};

// Canonicals, SSR language, Open Graph URLs, and unique snippets.
for (const row of rows) {
  const url = expectedUrl(row.route);
  if (row.canonical !== url) fail(`${row.route}: canonical is ${row.canonical}, expected ${url}`);
  if (row.ogUrl !== url) fail(`${row.route}: og:url is ${row.ogUrl}, expected ${url}`);

  const expectedLanguage = row.route === "/lifestyle-medicine-romania"
    || row.route === "/en"
    || row.route.startsWith("/en/")
    ? "en"
    : "ro";
  if (!row.html.includes(`<html lang="${expectedLanguage}"`)) {
    fail(`${row.route}: SSR html lang must be ${expectedLanguage}`);
  }
}

for (const field of ["title", "description"]) {
  const values = new Map();
  for (const row of rows) {
    const previousRoute = values.get(row[field]);
    if (previousRoute) fail(`${row.route}: duplicate ${field} also used by ${previousRoute}`);
    values.set(row[field], row.route);
  }
}

// Reciprocal translated-route alternates, including x-default.
const localizedPairs = [
  ["/", "/en"],
  ["/consiliu-executiv", "/en/executive-council"],
  ["/consiliu-stiintific", "/en/scientific-council"],
  ["/adunarea-generala", "/en/general-assembly"],
  ["/membri", "/en/membership"],
];
for (const [roRoute, enRoute] of localizedPairs) {
  for (const route of [roRoute, enRoute]) {
    const html = findRoute(route).html;
    const expectedAlternates = [
      ["ro", expectedUrl(roRoute)],
      ["en", expectedUrl(enRoute)],
      ["x-default", expectedUrl(roRoute)],
    ];
    for (const [language, href] of expectedAlternates) {
      const tag = `<link rel="alternate" hrefLang="${language}" href="${href}"`;
      if (!html.includes(tag)) fail(`${route}: missing reciprocal alternate ${language} -> ${href}`);
    }
  }
}

const allHtml = rows.map((row) => row.html).join("\n");
if (allHtml.includes("SearchAction")) fail("Built HTML must not emit SearchAction without site search.");
if (allHtml.includes("Last updated: 2026")) fail("Built HTML contains the stale year-only update label.");

const home = findRoute("/");
const organizationSchema = home.schemas.find((schema) => schema["@type"] === "MedicalOrganization");
if (!organizationSchema) fail("Homepage is missing MedicalOrganization JSON-LD.");
if (!home.schemas.some((schema) => schema["@type"] === "WebPage")
  || home.schemas.filter((schema) => schema["@type"] === "FAQPage").length !== 1) {
  fail("Homepage must emit one FAQPage and one WebPage schema in the initial HTML.");
}
if (organizationSchema.address?.addressLocality !== "Brașov") {
  fail("MedicalOrganization addressLocality must be Brașov.");
}
for (const socialUrl of [
  "https://www.facebook.com/profile.php?id=61587670614129",
  "https://www.instagram.com/aslm.lifestylemedicine/",
]) {
  if (!organizationSchema.sameAs?.includes(socialUrl)) {
    fail(`MedicalOrganization schema is missing sameAs URL: ${socialUrl}`);
  }
}

// Article snippets, trust signals, image dimensions, and exactly one FAQPage schema.
const articleRows = rows.filter((row) => row.route.split("/").length === 5 && row.route.startsWith("/news/articole/"));
if (articleRows.length !== 18) fail(`Expected 18 article pages, found ${articleRows.length}.`);
for (const row of articleRows) {
  const editorialTitle = row.title.replace(/ \| ASLM$/, "");
  if (editorialTitle.length < 45 || editorialTitle.length > 60) {
    fail(`${row.route}: editorial title length ${editorialTitle.length}, expected 45-60.`);
  }
  if (row.description.length < 135 || row.description.length > 160) {
    fail(`${row.route}: meta description length ${row.description.length}, expected 135-160.`);
  }
  for (const requiredText of [
    "Publicat:",
    "Autor:",
    "Key takeaways",
    "Întrebări frecvente",
    "Referințe",
    "/revizie-medicala",
    "/medicina-stilului-de-viata",
  ]) {
    if (!row.html.includes(requiredText)) fail(`${row.route}: missing article trust content: ${requiredText}`);
  }
  const faqSchemas = row.schemas.filter((schema) => schema["@type"] === "FAQPage");
  if (faqSchemas.length !== 1) fail(`${row.route}: expected one FAQPage schema, found ${faqSchemas.length}.`);
  const articleSchema = row.schemas.find((schema) => schema["@type"] === "Article");
  if (!articleSchema) fail(`${row.route}: missing Article schema.`);
  if (articleSchema.dateModified && !row.html.includes("Actualizat:")) {
    fail(`${row.route}: dateModified has no matching visible updated date.`);
  }
  if (articleSchema.reviewedBy && !row.html.includes("Revizuit de:")) {
    fail(`${row.route}: reviewedBy has no matching visible reviewer.`);
  }
  if (!row.html.includes('<meta property="og:image:width" content="1000"')
    || !row.html.includes('<meta property="og:image:height" content="1000"')) {
    fail(`${row.route}: square source image must be declared as 1000x1000.`);
  }
}

const proceedingsRoute = "/news/comunicate-de-presa/proceedings-congres-inaugural-aslm-2026";
const proceedings = findRoute(proceedingsRoute);
const newsArticleSchema = proceedings.schemas.find((schema) => schema["@type"] === "NewsArticle");
if (!newsArticleSchema) fail(`${proceedingsRoute}: missing NewsArticle schema.`);
if (newsArticleSchema.datePublished !== "2026-07-20") {
  fail(`${proceedingsRoute}: NewsArticle publish date must be 2026-07-20.`);
}
if (newsArticleSchema.mainEntityOfPage?.["@id"] !== expectedUrl(proceedingsRoute)) {
  fail(`${proceedingsRoute}: NewsArticle canonical URL is incorrect.`);
}
for (const requiredText of [
  "Despre Proceedings",
  "Lifestyle Medicine Research &amp; Reviews",
  "Proceedings-ul complet pe Publitas",
]) {
  if (!proceedings.html.includes(requiredText)) {
    fail(`${proceedingsRoute}: missing press-release content: ${requiredText}`);
  }
}

for (const row of rows.filter((candidate) => candidate.route.startsWith("/ghid/")
  || candidate.route === "/medicina-stilului-de-viata"
  || candidate.route === "/medicina-stilului-de-viata-vs-medicina-preventiva")) {
  const faqSchemas = row.schemas.filter((schema) => schema["@type"] === "FAQPage");
  if (faqSchemas.length !== 1) fail(`${row.route}: expected one FAQPage schema, found ${faqSchemas.length}.`);
}

for (const route of ["/experti/andrea-elena-neculau", "/experti/monica-tarcea"]) {
  if (!findRoute(route).schemas.some((schema) => schema["@type"] === "Person")) {
    fail(`${route}: Person schema must be present in the initial HTML.`);
  }
}

if (!findRoute("/conferinte").html.includes("Arhivă")) fail("/conferinte must be a visible archive.");
if (!findRoute("/comunicari-orale").html.includes("Arhivă")) fail("/comunicari-orale must be a visible archive.");
if (!findRoute("/evenimente").html.includes('href="/conferinte"')
  || !findRoute("/evenimente").html.includes('href="/comunicari-orale"')) {
  fail("/evenimente must link to both historical archives.");
}
if (!findRoute("/y-aslm").html.includes('href="/internship"')) fail("/y-aslm must link to /internship.");
if (!findRoute("/medicina-stilului-de-viata").html.includes('href="/medicina-stilului-de-viata-vs-medicina-preventiva"')) {
  fail("The pillar page must link to the preventive-medicine comparison.");
}

// Every internal HTML link resolves to a built 200 page, and every page has an incoming link.
const incomingLinks = new Map(rows.map((row) => [row.route, 0]));
for (const row of rows) {
  const targets = new Set(
    [...row.html.matchAll(/<a\s[^>]*href="([^"]+)"/g)]
      .map((match) => normalizeInternalHref(match[1]))
      .filter(Boolean),
  );
  for (const target of targets) {
    if (!rowByRoute.has(target)) fail(`${row.route}: internal link does not resolve to built HTML: ${target}`);
    if (target !== row.route) incomingLinks.set(target, incomingLinks.get(target) + 1);
  }
}
for (const [route, incoming] of incomingLinks) {
  if (route !== "/" && incoming === 0) fail(`${route}: orphan page with no incoming internal link.`);
}

// Sitemap contains every canonical route and a valid, explicit editorial lastmod.
const sitemapPath = path.join(appOutputDir, "sitemap.xml.body");
if (!existsSync(sitemapPath)) fail("Missing built sitemap body.");
const sitemap = readFileSync(sitemapPath, "utf8");
if (sitemap.includes("https://aslm.ro")) fail("Sitemap contains non-www URLs.");
const sitemapEntries = [...sitemap.matchAll(/<url>\s*<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/gs)];
if (sitemapEntries.length !== rows.length) {
  fail(`Sitemap has ${sitemapEntries.length} entries for ${rows.length} built pages.`);
}
const today = new Date();
for (const row of rows) {
  const entry = sitemapEntries.find(([, loc]) => loc === expectedUrl(row.route));
  if (!entry) fail(`Sitemap is missing ${expectedUrl(row.route)}.`);
  const lastModified = entry[2];
  if (!/^\d{4}-\d{2}-\d{2}(?:T.*Z)?$/.test(lastModified) || Number.isNaN(Date.parse(lastModified))) {
    fail(`${row.route}: invalid sitemap lastmod ${lastModified}.`);
  }
  if (new Date(lastModified) > today) fail(`${row.route}: sitemap lastmod is in the future.`);
}

const robotsPath = path.join(appOutputDir, "robots.txt.body");
if (!existsSync(robotsPath)) fail("Missing built robots body.");
const robots = readFileSync(robotsPath, "utf8");
if (!robots.includes("Sitemap: https://www.aslm.ro/sitemap.xml")) {
  fail("robots.txt does not reference the canonical sitemap.");
}

console.log(`Verified SEO metadata, schemas, links, locales, and sitemap for ${rows.length} built pages.`);
