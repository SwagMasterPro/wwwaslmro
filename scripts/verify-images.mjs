import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const maxBytes = 800 * 1024;
const sourcePath = path.join(process.cwd(), "data", "blog-articles.ts");
const source = readFileSync(sourcePath, "utf8");
const pressReleaseSource = readFileSync(path.join(process.cwd(), "data", "press-releases.ts"), "utf8");

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

const pressReleaseImages = [...pressReleaseSource.matchAll(/image:\s*{\s*src:\s*"([^"]+)",\s*alt:\s*"([^"]+)"/gs)];
if (pressReleaseImages.length === 0) fail("No press release images found to verify.");
for (const [, src, alt] of pressReleaseImages) {
  if (!alt || alt.trim().length < 18) fail(`${src} is missing useful alt text.`);
  if (!src.endsWith(".webp")) fail(`${src} should use optimized WebP format.`);
  const imagePath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  if (!existsSync(imagePath)) fail(`${src} does not exist under public/.`);
  const size = statSync(imagePath).size;
  if (size > maxBytes) fail(`${src} is ${(size / 1024).toFixed(0)}KB; image budget is 800KB.`);
}

const technicalAssets = [
  { src: "/images/aslm-og.png", width: 1200, height: 630, maxBytes: 200 * 1024 },
  { src: "/images/membership-popup-doctor.webp", width: 1024, height: 1024, maxBytes: 150 * 1024 },
  { src: "/images/promo-video-cover.webp", width: 1024, height: 576, maxBytes: 100 * 1024 },
  { src: "/images/piloni-medicina-stilului-de-viata.png", width: 550, height: 486, maxBytes: 300 * 1024 },
];

for (const asset of technicalAssets) {
  const imagePath = path.join(process.cwd(), "public", asset.src.replace(/^\//, ""));
  if (!existsSync(imagePath)) fail(`${asset.src} does not exist under public/.`);
  const size = statSync(imagePath).size;
  if (size > asset.maxBytes) {
    fail(`${asset.src} is ${(size / 1024).toFixed(0)}KB; budget is ${(asset.maxBytes / 1024).toFixed(0)}KB.`);
  }
  const metadata = await sharp(imagePath).metadata();
  if (metadata.width !== asset.width || metadata.height !== asset.height) {
    fail(`${asset.src} is ${metadata.width}x${metadata.height}; expected ${asset.width}x${asset.height}.`);
  }
}

console.log(`Verified ${imageBlocks.length} article images, ${pressReleaseImages.length} press-release image, and ${technicalAssets.length} social/performance assets.`);
