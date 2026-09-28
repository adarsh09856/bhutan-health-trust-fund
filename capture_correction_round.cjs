const puppeteer = require('C:/Users/Adarsh/AppData/Local/npm-cache/_npx/7d92d9a2d2ccc630/node_modules/puppeteer-core/lib/cjs/puppeteer/puppeteer-core.js');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

const outDir = 'C:\\Users\\Adarsh\\.gemini\\antigravity\\brain\\7022292b-9176-4c86-860e-84e248ecf232';
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

    // 1. Homepage Top (before scroll) - viewport screenshot
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 1000));
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));
    await saveScreenshot(page, `homepage-top-${vp.name}.png`);

    // 2. Homepage after scroll-rise (scrolled to reveal headline and corpus card)
    await page.evaluate(() => window.scrollTo(0, 500));
    await new Promise(r => setTimeout(r, 600));
    await saveScreenshot(page, `homepage-scrollrise-${vp.name}.png`);

    // 3. Homepage Footer (element screenshot so entire footer is visible)
    const footerEl = await page.$('footer');
    if (footerEl) {
      await page.evaluate(() => {
        const el = document.querySelector('footer');
        if (el) el.scrollIntoView();
      });
      await new Promise(r => setTimeout(r, 500));
      const file1 = path.join(outDir, `footer-${vp.name}.png`);
      const file2 = path.join(localOutDir, `footer-${vp.name}.png`);
      await footerEl.screenshot({ path: file1 });
      fs.copyFileSync(file1, file2);
      console.log(`Saved: footer-${vp.name}.png`);
    }

    // 4. One Inner Page (/our-story)
    await page.goto('http://localhost:3000/our-story', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 800));
    await saveScreenshot(page, `inner-story-${vp.name}.png`);

    // 5. Specimen Page (/specimen)
    await page.goto('http://localhost:3000/specimen', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 800));
    await saveScreenshot(page, `specimen-${vp.name}.png`, { fullPage: vp.width <= 768 });
  }

  await browser.close();
  console.log('\nFinished capturing all verification screenshots successfully.');
}

capture().catch(err => {
  console.error('Fatal error in capture script:', err);
  process.exit(1);
});
