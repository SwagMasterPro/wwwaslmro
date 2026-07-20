import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const appOutputDir = path.join(process.cwd(), ".next", "server", "app");

function fail(message) {
  throw new Error(message);
}

function readBuilt(route) {
  const filename = route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
  const filePath = path.join(appOutputDir, ...filename.split("/"));
  return existsSync(filePath) ? readFileSync(filePath, "utf8") : "";
}

const translatedPairs = [
  ["/", "/en"],
  ["/consiliu-executiv", "/en/executive-council"],
  ["/consiliu-stiintific", "/en/scientific-council"],
  ["/adunarea-generala", "/en/general-assembly"],
  ["/membri", "/en/membership"],
];

const checks = [
  ["Pillar has MedicalWebPage schema", () => readBuilt("/medicina-stilului-de-viata").includes("MedicalWebPage")],
  ["Review policy exists", () => readBuilt("/revizie-medicala").includes("Procesul editorial și de revizie medicală ASLM")],
  ["Expert schema exists", () => readBuilt("/experti/andrea-elena-neculau").includes("Person")],
  ["All six pillar guides exist", () => [
    "/ghid/alimentatie-sanatoasa",
    "/ghid/activitate-fizica",
    "/ghid/sanatatea-somnului",
    "/ghid/gestionare-stres",
    "/ghid/renuntare-fumat-alcool",
    "/ghid/relatii-sociale-sanatate",
  ].every((route) => readBuilt(route).includes("MedicalWebPage"))],
  ["Localized roots render the correct SSR language", () => readBuilt("/").includes('<html lang="ro"')
    && readBuilt("/en").includes('<html lang="en"')
    && readBuilt("/lifestyle-medicine-romania").includes('<html lang="en"')],
  ["Translated routes expose reciprocal hreflang", () => translatedPairs.every(([ro, en]) => {
    const roHtml = readBuilt(ro);
    const enHtml = readBuilt(en);
    return [roHtml, enHtml].every((html) => html.includes('hrefLang="ro"')
      && html.includes('hrefLang="en"')
      && html.includes('hrefLang="x-default"'));
  })],
  ["SearchAction is absent", () => !readBuilt("/").includes("SearchAction")],
  ["AI context file exists", () => existsSync(path.join(process.cwd(), "public", "ai-context.md"))],
  ["Articles expose exact publication dates", () => {
    const html = readBuilt("/news/articole/alimentatie/alimentatia-echilibrata-cheia-unei-vieti-active");
    return html.includes("Publicat: 24 februarie 2026") && !html.includes("Last updated: 2026");
  }],
  ["Article images are optimized", () => {
    const source = readFileSync(path.join(process.cwd(), "data", "blog-articles.ts"), "utf8");
    return [...source.matchAll(/src:\s*"([^"]+)"/g)]
      .filter(([, src]) => src.startsWith("/blog/"))
      .every(([, src]) => {
        const imagePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
        return src.endsWith(".webp") && existsSync(imagePath) && statSync(imagePath).size <= 800 * 1024;
      });
  }],
  ["News and press release routes are canonical", () => readBuilt("/news").includes('href="/news/articole"')
    && readBuilt("/news/comunicate-de-presa").includes("Comunicate de presă")
    && readBuilt("/news/comunicate-de-presa/proceedings-congres-inaugural-aslm-2026").includes("NewsArticle")],
  ["Default social image is 1200x630", () => readBuilt("/").includes('og:image:width" content="1200"')
    && readBuilt("/").includes('og:image:height" content="630"')],
  ["Sitemap uses canonical www URLs", () => {
    const sitemap = readFileSync(path.join(appOutputDir, "sitemap.xml.body"), "utf8");
    return !sitemap.includes("https://aslm.ro") && sitemap.includes("https://www.aslm.ro/medicina-stilului-de-viata");
  }],
  ["Archives are indexable and linked", () => readBuilt("/conferinte").includes("Arhivă")
    && readBuilt("/comunicari-orale").includes("Arhivă")
    && readBuilt("/evenimente").includes('href="/conferinte"')
    && readBuilt("/evenimente").includes('href="/evenimente/credite-emc"')
    && readBuilt("/evenimente").includes('href="/membri"')],
];

const results = checks.map(([label, check]) => [label, Boolean(check())]);
const passed = results.filter(([, result]) => result).length;
const score = Number(((passed / results.length) * 10).toFixed(1));

console.log(`SEO score: ${score}/10 (${passed}/${results.length} checks passed)`);
for (const [label, result] of results) console.log(`${result ? "PASS" : "FAIL"} ${label}`);
if (score < 9) fail(`SEO score ${score}/10 is below required 9.0/10.`);
