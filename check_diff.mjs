import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASELINE_DIR = path.join(__dirname, 'screenshots/baseline');
const CURRENT_DIR = path.join(__dirname, 'screenshots/current');

const files = fs.readdirSync(BASELINE_DIR);
let totalDiff = 0;

files.forEach(file => {
  if (!file.endsWith('.png')) return;

  const baselinePath = path.join(BASELINE_DIR, file);
  const currentPath = path.join(CURRENT_DIR, file);

  if (!fs.existsSync(currentPath)) {
    console.log(`Missing current screenshot for ${file}`);
    return;
  }

  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));
  
  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.log(`Size mismatch in ${file}: ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
    totalDiff += 1;
    return;
  }

  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  
  if (numDiffPixels > 0) {
    console.log(`Diff found in ${file}: ${numDiffPixels} pixels`);
    totalDiff += numDiffPixels;
  } else {
    console.log(`No diff in ${file}`);
  }
});

if (totalDiff === 0) {
  console.log('ALL CLEAR: No visual regression detected.');
} else {
  console.log(`FAILURE: Total diff pixels: ${totalDiff}`);
  process.exit(1);
}
