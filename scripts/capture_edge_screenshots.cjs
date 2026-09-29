const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const ARTIFACT_DIR = "C:\\Users\\Adarsh\\.gemini\\antigravity\\brain\\7022292b-9176-4c86-860e-84e248ecf232";
const BASE_URL = "http://localhost:3000";

const CAPTURES = [
  { url: `${BASE_URL}/`, name: "home-laptop-1440.png", width: 1440, height: 900 },
  { url: `${BASE_URL}/`, name: "home-tablet-768.png", width: 768, height: 1024 },
  { url: `${BASE_URL}/`, name: "home-phone-390.png", width: 390, height: 844 },
  { url: `${BASE_URL}/`, name: "home-full-1440.png", width: 1440, height: 3600 },
  { url: `${BASE_URL}/#trustees-showcase`, name: "home-trustees-1440.png", width: 1440, height: 1200 },
  { url: `${BASE_URL}/about/trustees`, name: "trustees-laptop-1440.png", width: 1440, height: 900 },
  { url: `${BASE_URL}/about/trustees`, name: "trustees-full-1440.png", width: 1440, height: 2400 },
  { url: `${BASE_URL}/about/trustees`, name: "trustees-phone-390.png", width: 390, height: 844 },
  { url: `${BASE_URL}/about/secretariat`, name: "secretariat-laptop-1440.png", width: 1440, height: 900 },
  { url: `${BASE_URL}/about/secretariat`, name: "secretariat-full-1440.png", width: 1440, height: 2600 },
  { url: `${BASE_URL}/about`, name: "about-full-1440.png", width: 1440, height: 2800 },
  { url: `${BASE_URL}/resources/window-financing`, name: "window-financing-laptop-1440.png", width: 1440, height: 900 },
  { url: `${BASE_URL}/resources/window-financing`, name: "window-financing-phone-390.png", width: 390, height: 844 },
  { url: `${BASE_URL}/donate`, name: "donate-laptop-1440.png", width: 1440, height: 900 },
  { url: `${BASE_URL}/donate`, name: "donate-phone-390.png", width: 390, height: 844 },
  { url: `${BASE_URL}/resources`, name: "resources-laptop-1440.png", width: 1440, height: 900 },
  { url: `${BASE_URL}/our-impact`, name: "our-impact-laptop-1440.png", width: 1440, height: 900 },
];

async function capture() {
  console.log("📸 Capturing High-Fidelity Screenshots via Headless Edge Browser...\n");

  for (const item of CAPTURES) {
    const outPath = path.join(ARTIFACT_DIR, item.name);
    const cmd = `"${EDGE_PATH}" --headless --disable-gpu --window-size=${item.width},${item.height} --hide-scrollbars --screenshot="${outPath}" "${item.url}"`;
    try {
      execSync(cmd, { stdio: 'ignore', timeout: 20000 });
      if (fs.existsSync(outPath)) {
        const stats = fs.statSync(outPath);
        console.log(`✅ [CAPTURED] ${item.name.padEnd(35)} (${item.width}x${item.height}) - ${(stats.size / 1024).toFixed(1)} KB`);
      } else {
        console.log(`⚠️ [FAILED] ${item.name}`);
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${item.name}: ${err.message}`);
    }
  }

  console.log("\n✨ All screenshots captured successfully in artifact directory!");
}

capture();
