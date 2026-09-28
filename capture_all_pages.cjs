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

const pagesToCapture = [
  { slugName: 'homepage', path: '/' },
  { slugName: 'about', path: '/about' },
  { slugName: 'about-organization', path: '/about/organization' },
  { slugName: 'about-trustees', path: '/about/trustees' },
  { slugName: 'about-committees', path: '/about/committees' },
  { slugName: 'about-secretariat', path: '/about/secretariat' },
  { slugName: 'our-story', path: '/our-story' },
  { slugName: 'our-work', path: '/our-work' },
  { slugName: 'reports', path: '/reports' },
  { slugName: 'policies', path: '/policies' },
  { slugName: 'get-involved', path: '/get-involved' },
  { slugName: 'contact', path: '/contact' },
  { slugName: 'news', path: '/news' },
];

async function run() {
  console.log('Launching browser with:', browserPath);
  const browser = await puppeteer.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const overflowAudit = [];

  for (const p of pagesToCapture) {
    console.log(`\n================ Testing Route: ${p.path} (${p.slugName}) ================`);
    for (const vp of viewports) {
      await page.setViewport(vp);
      const url = `http://localhost:3000${p.path}`;
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await new Promise(r => setTimeout(r, 600));

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const winWidth = window.innerWidth;
        const hasOverflow = docWidth > winWidth;
        let overflowingElements = [];
        if (hasOverflow) {
          const all = document.querySelectorAll('*');
          all.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.right > winWidth + 1) {
              overflowingElements.push({
                tag: el.tagName,
                className: (el.className || '').toString().slice(0, 50),
                right: Math.round(rect.right),
                width: Math.round(rect.width)
              });
            }
          });
        }
        return {
          hasOverflow,
          docWidth,
          winWidth,
          overflowCount: overflowingElements.length,
          sample: overflowingElements.slice(0, 3)
        };
      });

      console.log(`[${vp.name}] ${p.slugName}: docWidth=${overflow.docWidth}, winWidth=${overflow.winWidth}, hasOverflow=${overflow.hasOverflow}`);
      if (overflow.hasOverflow) {
        console.warn(`  WARNING: Horizontal overflow on ${p.slugName} at ${vp.name}!`, overflow.sample);
        overflowAudit.push({ page: p.slugName, viewport: vp.name, overflow });
      }

      // Take screenshot
      const filename = `${p.slugName}-${vp.name}.png`;
      const file1 = path.join(outDir, filename);
      const file2 = path.join(localOutDir, filename);
      
      // Capture viewport (first screen view)
      await page.screenshot({ path: file1 });
      fs.copyFileSync(file1, file2);
      console.log(`  Saved screenshot: ${filename}`);
    }
  }

  await browser.close();
  console.log('\n--- Capture Completed ---');
  console.log('Total Screenshots: ' + (pagesToCapture.length * viewports.length));
  console.log('Overflow Audit Summary:', JSON.stringify(overflowAudit, null, 2));
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
