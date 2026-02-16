import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'http://localhost:3000';
const OUTPUT_DIR = path.join(__dirname, 'screenshots/current');
const ROUTES = [
  '/',
  '/privacy',
  '/contact',
  '/industries',
  '/supports',
  '/industry/101',
  '/industry/102',
  '/industry/104',
  '/industry/105',
  '/industry/106',
  '/404'
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'pc' },
  { width: 390, height: 844, name: 'sp' }
];

(async () => {
  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new',
    timeout: 120000
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    
    // Normalize route name for filename
    let routeName = route === '/' ? 'home' : route.replace(/\//g, '_').replace(/^_/, '');
    
    for (const viewport of VIEWPORTS) {
      await page.setViewport(viewport);
      
      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0' });
        
        // Wait for any animations or lazy loading
        await new Promise(r => setTimeout(r, 2000));
        
        const filename = `${routeName}-${viewport.name}.png`;
        const filepath = path.join(OUTPUT_DIR, filename);
        
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`Captured: ${filepath}`);
      } catch (error) {
        console.error(`Failed to capture ${route} (${viewport.name}):`, error.message);
      }
    }
    
    await page.close();
  }

  await browser.close();
})();
