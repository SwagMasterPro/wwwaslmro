import { existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourcePath = path.join(process.cwd(), "data", "blog-articles.ts");
const source = readFileSync(sourcePath, "utf8");
const imageBlocks = [...source.matchAll(/image:\s*{\s*src:\s*"([^"]+)"/gs)];

for (const [, src] of imageBlocks) {
  const referencedPath = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const referencedParsed = path.parse(referencedPath);
  const pngFallback = path.join(referencedParsed.dir, `${referencedParsed.name}.png`);
  const inputPath = src.endsWith(".webp") && existsSync(pngFallback) ? pngFallback : referencedPath;
  if (!existsSync(inputPath)) {
    throw new Error(`Missing source image ${src}`);
  }

  const parsed = path.parse(inputPath);
  const outputPath = path.join(parsed.dir, `${parsed.name}.webp`);
  mkdirSync(parsed.dir, { recursive: true });

  const inputStat = statSync(inputPath);
  if (existsSync(outputPath) && statSync(outputPath).mtimeMs >= inputStat.mtimeMs) {
    continue;
  }

  await sharp(inputPath)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(outputPath);
}

console.log(`Optimized ${imageBlocks.length} blog article images.`);
