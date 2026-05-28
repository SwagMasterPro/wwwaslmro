import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const maxBytes = 800 * 1024;
const sourcePath = path.join(process.cwd(), "data", "blog-articles.ts");
const source = readFileSync(sourcePath, "utf8");

function fail(message) {
  throw new Error(message);
}

const imageBlocks = [...source.matchAll(/image:\s*{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)"/gs)];
if (imageBlocks.length === 0) {
  fail("No blog article images found to verify.");
}

for (const [, src, alt] of imageBlocks) {
  if (!alt || alt.trim().length < 18) {
    fail(`${src} is missing useful alt text.`);
  }

  if (!src.endsWith(".webp")) {
    fail(`${src} should use optimized WebP format.`);
  }

  const imagePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  if (!existsSync(imagePath)) {
    fail(`${src} does not exist under public/.`);
  }

  const size = statSync(imagePath).size;
  if (size > maxBytes) {
    fail(`${src} is ${(size / 1024).toFixed(0)}KB; image budget is 800KB.`);
  }
}

console.log(`Verified ${imageBlocks.length} optimized article images.`);
