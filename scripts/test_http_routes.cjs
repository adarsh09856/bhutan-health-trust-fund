const fs = require('fs');

const BASE_URL = 'http://localhost:3000';

const ROUTES_TO_TEST = [
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About Institutional Overview' },
  { path: '/about/organization', name: 'Our Organization & Mandate' },
  { path: '/about/trustees', name: 'Board of Directors (8 Trustees)' },
  { path: '/about/committees', name: 'Asset Management Committee' },
  { path: '/about/secretariat', name: 'Secretariat & Staff Profiles' },
  { path: '/our-story', name: 'Our Story & Historical Milestones' },
  { path: '/our-impact', name: 'Our Impact & Health Commodities' },
  { path: '/resources', name: 'Official Resources & Certified Audits' },
  { path: '/resources/window-financing', name: 'Quarterly Window Financing Protocol' },
  { path: '/donate', name: 'Donate & Support (1:1 Matched)' },
  { path: '/get-involved', name: 'Get Involved / Contribute' },
  { path: '/track-donation', name: 'Track Donation & Tax Voucher' },
  { path: '/news', name: 'News & Media Bulletins' },
  { path: '/policies', name: 'Governance & Statutory Policies' },
  { path: '/contact', name: 'Contact Secretariat' },
  { path: '/admin/pages', name: 'Admin Customizable Pages List' },
  { path: '/admin/page-editor?slug=home', name: 'Admin Page Editor (Home)' },
  { path: '/admin/page-editor?slug=about-organization', name: 'Admin Page Editor (Organization)' },
  { path: '/admin/page-editor?slug=about-trustees', name: 'Admin Page Editor (Trustees)' },
  { path: '/admin/page-editor?slug=about-committees', name: 'Admin Page Editor (Committees)' },
  { path: '/admin/page-editor?slug=about-secretariat', name: 'Admin Page Editor (Secretariat)' },
  { path: '/admin/page-editor?slug=resources', name: 'Admin Page Editor (Resources)' },
  { path: '/admin/page-editor?slug=window-financing', name: 'Admin Page Editor (Window Financing)' },
  { path: '/admin/page-editor?slug=donate', name: 'Admin Page Editor (Donate)' },
  { path: '/admin/page-editor?slug=our-impact', name: 'Admin Page Editor (Our Impact)' },
];

async function verifyAll() {
  console.log('🌐 BHTF Bidirectional Platform HTTP Audit: Testing All Routes on localhost:3000...\n');
  let passed = 0;
  let failed = 0;

  for (const route of ROUTES_TO_TEST) {
    const url = `${BASE_URL}${route.path}`;
    try {
      const res = await fetch(url);
      const text = await res.text();
      const status = res.status;
      
      // Check title or content
      const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : 'No title tag';

      if (status === 200) {
        console.log(`✅ [200 OK] ${route.path.padEnd(38)} | ${route.name.padEnd(36)} | Title: "${title}"`);
        passed++;
      } else {
        console.log(`❌ [HTTP ${status}] ${route.path.padEnd(38)} | ${route.name}`);
        failed++;
      }
    } catch (err) {
      console.log(`❌ [ERROR] ${route.path.padEnd(38)} | ${err.message}`);
      failed++;
    }
  }

  console.log(`\n======================================================`);
  console.log(`🏆 Audit Result: ${passed}/${ROUTES_TO_TEST.length} Routes PASSED (200 OK) | ${failed} FAILED`);
  console.log(`======================================================\n`);

  if (failed > 0) process.exit(1);
}

verifyAll();
