/**
 * convert_to_webp.js
 * Install sharp first if not available:
 *   npm install --save-dev sharp
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Target directory — change or pass as CLI argument
const targetDir = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(ROOT, 'src', 'assets', 'army', 'ArmyOperations');

const CONVERTIBLE = new Set(['.jpg', '.jpeg', '.png', '.avif', '.gif', '.tiff']);

console.log(`\n📂 Scanning: ${targetDir}\n`);

const files = fs.readdirSync(targetDir);
let converted = 0;
let skipped = 0;
const errors = [];

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!CONVERTIBLE.has(ext)) {
    console.log(`  ⏭  Skipping ${file} (already .webp or unsupported)`);
    skipped++;
    continue;
  }

  const inputPath = path.join(targetDir, file);
  const outputName = path.basename(file, ext) + '.webp';
  const outputPath = path.join(targetDir, outputName);

  try {
    await sharp(inputPath)
      .webp({ quality: 82, effort: 4 })  // quality 82 = excellent quality, smaller size
      .toFile(outputPath);

    const inStat = fs.statSync(inputPath);
    const outStat = fs.statSync(outputPath);
    const saving = ((1 - outStat.size / inStat.size) * 100).toFixed(1);

    fs.unlinkSync(inputPath); // Delete original
    console.log(`  ✅ ${file} → ${outputName}  (${(inStat.size / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB, ${saving}% saved)`);
    converted++;
  } catch (err) {
    console.error(`  ❌ Failed to convert ${file}: ${err.message}`);
    errors.push(file);
  }
}

console.log(`\n─────────────────────────────────────────────────`);
console.log(`  Converted : ${converted}`);
console.log(`  Skipped   : ${skipped}`);
console.log(`  Errors    : ${errors.length}`);
if (errors.length) console.log(`  Error files: ${errors.join(', ')}`);
console.log(`─────────────────────────────────────────────────\n`);
