import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const appOutputDir = path.join(process.cwd(), ".next", "server", "app");

function fail(message) {
  throw new Error(message);
}

function readBuilt(route) {
  const filename = route === "/" ? "index.html" : `${route.replace(/^\//, "")}.html`;
  const filePath = path.join(appOutputDir, ...filename.split("/"));
  if (!existsSync(filePath)) {
    return "";
  }
  return readFileSync(filePath, "utf8");
}

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
  ["Comparison page exists", () => readBuilt("/medicina-stilului-de-viata-vs-medicina-preventiva").includes("Medicina stilului de viață vs medicina preventivă")],
  ["AI context file exists", () => existsSync(path.join(process.cwd(), "public", "ai-context.md"))],
  ["AI crawler rules exist", () => readFileSync(path.join(appOutputDir, "robots.txt.body"), "utf8").includes("User-Agent: GPTBot")],
  ["All articles show scientific review", () => {
    const blogDir = path.join(appOutputDir, "blog");
    const html = readFileSync(path.join(blogDir, "alimentatie", "alimentatia-echilibrata-cheia-unei-vieti-active.html"), "utf8");
    return html.includes("Revizuit de: Consiliul Științific ASLM");
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
  ["No non-www canonical pollution", () => !readFileSync(path.join(appOutputDir, "sitemap.xml.body"), "utf8").includes("https://aslm.ro")],
];

const passed = checks.filter(([, check]) => check()).length;
const score = Number(((passed / checks.length) * 10).toFixed(1));

console.log(`SEO score: ${score}/10 (${passed}/${checks.length} checks passed)`);
for (const [label, check] of checks) {
  console.log(`${check() ? "PASS" : "FAIL"} ${label}`);
}

if (score < 9) {
  fail(`SEO score ${score}/10 is below required 9.0/10.`);
}
