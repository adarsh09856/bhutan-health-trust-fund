const puppeteer = require('C:/Users/Adarsh/AppData/Local/npm-cache/_npx/7d92d9a2d2ccc630/node_modules/puppeteer-core/lib/cjs/puppeteer/puppeteer-core.js');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\Adarsh\\.gemini\\antigravity\\brain\\f7679908-a0dc-4151-8222-943975a8c01d';
const localOutDir = 'E:\\ai\\bhutanprojects\\deploy-ready-site-main\\screenshots';

if (!fs.existsSync(localOutDir)) {
  fs.mkdirSync(localOutDir, { recursive: true });
}

const viewports = [
  { name: 'phone-390', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'tablet-768', width: 768, height: 1024, isMobile: false, hasTouch: false },
  { name: 'laptop-1440', width: 1440, height: 900, isMobile: false, hasTouch: false },
  { name: 'wide-1920', width: 1920, height: 1080, isMobile: false, hasTouch: false },
];

async function saveScreenshot(page, filename, options = {}) {
  const file1 = path.join(outDir, filename);
  const file2 = path.join(localOutDir, filename);
  await page.screenshot({ path: file1, ...options });
  fs.copyFileSync(file1, file2);
  console.log(`Saved: ${filename}`);
}

async function capture() {
  console.log('Launching browser with:', browserPath);
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  for (const vp of viewports) {
    console.log(`\n--- Capturing viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewport(vp);

    // 1. Homepage Top (before scroll)
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1200));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));
    await saveScreenshot(page, `hero-verified-top-${vp.name}.png`);

    // 2. Homepage after scroll-rise (scrolled 450px)
    await page.evaluate(() => window.scrollTo(0, 450));
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, `hero-verified-scrollrise-${vp.name}.png`);

    // 3. Sub-page /about/trustees
    await page.goto('http://localhost:3000/about/trustees', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    await saveScreenshot(page, `pagehero-verified-trustees-${vp.name}.png`);
  }

  // 4. Admin Authentication
  console.log('\n--- Logging in to Admin Portal ---');
  await page.setViewport({ width: 1440, height: 900, isMobile: false, hasTouch: false });
  await page.goto('http://localhost:3000/admin/login', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.waitForSelector('#btn-quick-admin-login');
  await page.click('#btn-quick-admin-login');
  await new Promise(r => setTimeout(r, 3000));

  // 5. Admin Page Editor view (Laptop 1440)
  await page.goto('http://localhost:3000/admin/page-editor?slug=home', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await saveScreenshot(page, 'admin-page-editor-verified-1440.png');

  // 6. Admin Pages Directory view (Laptop 1440)
  await page.goto('http://localhost:3000/admin/pages', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));
  await saveScreenshot(page, 'admin-pages-directory-verified-1440.png');

  await browser.close();
  console.log('\nFinished capturing all verification screenshots successfully.');
}

capture().catch(err => {
  console.error('Fatal error in capture script:', err);
  process.exit(1);
});
