import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASELINE_DIR = path.join(__dirname, 'screenshots/baseline');
const CURRENT_DIR = path.join(__dirname, 'screenshots/current');
const DIFF_DIR = path.join(__dirname, 'screenshots/diff');

if (!fs.existsSync(DIFF_DIR)) {
  fs.mkdirSync(DIFF_DIR, { recursive: true });
}

const files = fs.readdirSync(BASELINE_DIR).filter(file => file.endsWith('.png'));

let totalDiff = 0;

for (const file of files) {
  const baselinePath = path.join(BASELINE_DIR, file);
  const currentPath = path.join(CURRENT_DIR, file);
  const diffPath = path.join(DIFF_DIR, file);

  if (!fs.existsSync(currentPath)) {
    console.error(`Missing current screenshot for ${file}`);
    continue;
  }

  const img1 = PNG.sync.read(fs.readFileSync(baselinePath));
  const img2 = PNG.sync.read(fs.readFileSync(currentPath));
  const { width, height } = img1;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

  if (numDiffPixels > 0) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    console.error(`Diff detected in ${file}: ${numDiffPixels} pixels`);
    totalDiff += numDiffPixels;
  } else {
    console.log(`No diff in ${file}`);
  }
}

if (totalDiff === 0) {
  console.log('All checks passed: No visual regression detected.');
  process.exit(0);
} else {
  console.error(`Visual regression detected! Total diff pixels: ${totalDiff}`);
  process.exit(1);
}
