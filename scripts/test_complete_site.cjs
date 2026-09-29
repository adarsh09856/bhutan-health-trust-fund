const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const ARTIFACT_DIR = 'C:/Users/Adarsh/.gemini/antigravity/brain/7022292b-9176-4c86-860e-84e248ecf232';

const ROUTES_TO_TEST = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/about/organization', name: 'about-organization' },
  { path: '/about/trustees', name: 'about-trustees' },
  { path: '/about/committees', name: 'about-committees' },
  { path: '/about/secretariat', name: 'about-secretariat' },
  { path: '/our-story', name: 'our-story' },
  { path: '/our-impact', name: 'our-impact' },
  { path: '/resources', name: 'resources' },
  { path: '/resources/window-financing', name: 'window-financing' },
  { path: '/donate', name: 'donate' },
  { path: '/track-donation', name: 'track-donation' },
  { path: '/news', name: 'news' },
  { path: '/policies', name: 'policies' },
  { path: '/contact', name: 'contact' },
  { path: '/admin/pages', name: 'admin-pages' },
  { path: '/admin/page-editor?slug=home', name: 'admin-editor-home' },
  { path: '/admin/page-editor?slug=about-organization', name: 'admin-editor-org' },
  { path: '/admin/page-editor?slug=about-trustees', name: 'admin-editor-trustees' },
  { path: '/admin/page-editor?slug=resources', name: 'admin-editor-resources' },
  { path: '/admin/page-editor?slug=window-financing', name: 'admin-editor-window-financing' },
  { path: '/admin/page-editor?slug=donate', name: 'admin-editor-donate' },
];

const VIEWPORTS = [
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1440', width: 1440, height: 900 },
];

async function runTests() {
  console.log('🚀 Starting BHTF Complete Platform Audit & Verification...\n');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const results = [];

  for (const r of ROUTES_TO_TEST) {
    const url = `${BASE_URL}${r.path}`;
    try {
      const response = await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      const status = response ? response.status() : 'NO_RESPONSE';
      const pageTitle = await page.title();
      
      console.log(`[STATUS ${status}] ${r.path} -> "${pageTitle}"`);
      results.push({ path: r.path, status, title: pageTitle, ok: status === 200 });
    } catch (err) {
      console.error(`[FAIL] ${r.path}:`, err.message);
      results.push({ path: r.path, status: 'ERROR', error: err.message, ok: false });
    }
  }

  console.log('\n📸 Capturing Multi-Device Screenshots & Verifying Layout Integrity...');

  // Key visual checks on Homepage
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
    
    // Check horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });

    const screenshotPath = path.join(ARTIFACT_DIR, `home-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: home-${vp.name}.png | Overflow: ${hasHorizontalOverflow ? 'FAIL ❌' : 'PASS ✅'}`);
  }

  // Key visual checks on /about/trustees
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/about/trustees`, { waitUntil: 'networkidle2' });
    
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });

    const screenshotPath = path.join(ARTIFACT_DIR, `trustees-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: trustees-${vp.name}.png | Overflow: ${hasHorizontalOverflow ? 'FAIL ❌' : 'PASS ✅'}`);
  }

  // Key visual checks on /donate
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/donate`, { waitUntil: 'networkidle2' });
    
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });

    const screenshotPath = path.join(ARTIFACT_DIR, `donate-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: donate-${vp.name}.png | Overflow: ${hasHorizontalOverflow ? 'FAIL ❌' : 'PASS ✅'}`);
  }

  // Key visual checks on /resources/window-financing
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.goto(`${BASE_URL}/resources/window-financing`, { waitUntil: 'networkidle2' });
    
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth + 2;
    });

    const screenshotPath = path.join(ARTIFACT_DIR, `window-financing-${vp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`Saved screenshot: window-financing-${vp.name}.png | Overflow: ${hasHorizontalOverflow ? 'FAIL ❌' : 'PASS ✅'}`);
  }

  // Header verification
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });

  const headerCheck = await page.evaluate(() => {
    const textTrackLink = document.querySelector('a[href="/track-donation"]');
    const donateButton = document.querySelector('a[href="/donate"]');
    const navItems = Array.from(document.querySelectorAll('nav a')).map(a => a.textContent?.trim());
    return {
      hasTrackDonationTextLink: !!textTrackLink,
      trackDonationText: textTrackLink ? textTrackLink.textContent?.trim() : null,
      hasDonateButton: !!donateButton,
      navItems,
    };
  });

  console.log('\n🔍 Header Verification Results:');
  console.log('Track Donation Link:', headerCheck.hasTrackDonationTextLink ? 'PRESENT ✅' : 'MISSING ❌', `(${headerCheck.trackDonationText})`);
  console.log('Donate Button:', headerCheck.hasDonateButton ? 'PRESENT ✅' : 'MISSING ❌');
  console.log('Nav Items:', headerCheck.navItems.filter(Boolean).join(' | '));

  await browser.close();

  const totalPassed = results.filter(r => r.ok).length;
  console.log(`\n🎉 Verification Completed: ${totalPassed}/${results.length} Routes 200 OK!`);
}

runTests().catch(err => {
  console.error('Fatal Test Error:', err);
  process.exit(1);
});
