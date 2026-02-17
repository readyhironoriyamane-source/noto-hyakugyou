const fs = require('fs');
const path = require('path');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

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
