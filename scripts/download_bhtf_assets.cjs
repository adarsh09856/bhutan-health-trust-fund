const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '../src/assets/bhtf');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Subdirectories
const subdirs = ['trustees', 'secretariat', 'partners', 'field'];
subdirs.forEach(s => {
  const p = path.join(targetDir, s);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});

const assetsToDownload = [
  // Trustees
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/10/1.jpg', dest: 'trustees/lyonpo_tandin_wangchuk.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/10/2.jpeg', dest: 'trustees/lopen_choten_dorji.jpeg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2026/05/IMG_1544.jpg', dest: 'trustees/dr_phub_tshering.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/10/4.jpg', dest: 'trustees/pema_tshering.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/10/5.jpg', dest: 'trustees/ugyen_choden.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2026/05/WhatsApp-Image-2026-05-06-at-2.09.45-PM.jpeg', dest: 'trustees/norbu_dendup.jpeg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2026/05/ChenchoTNamgay.jpg.jpeg', dest: 'trustees/chencho_t_namgay.jpeg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2026/06/IMG_8400-scaled.jpg', dest: 'trustees/dr_gyambo_sithey.jpg' },

  // Secretariat Staff
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/05/MG_5734-scaled-e1747116341337.jpg', dest: 'secretariat/sonam_chojay.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/05/MG_5744-scaled-e1747116451510.jpg', dest: 'secretariat/tshering_choden.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/05/MG_5751-scaled-e1747116097952.jpg', dest: 'secretariat/rinchen_phuntsho.jpg' },

  // Partners & Sovereign Donors
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/rgob.png', dest: 'partners/rgob.png' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/who.jpg', dest: 'partners/who.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/unicef-150x150.png', dest: 'partners/unicef.png' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/adb.jpg', dest: 'partners/adb.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/bill.png', dest: 'partners/bill_gates_foundation.png' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/savthechil.png', dest: 'partners/save_the_children.png' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/sumitfoun.png', dest: 'partners/sumitomo.png' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2024/09/aus.png', dest: 'partners/aus_aid.png' },

  // Field Operations
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/01/LHUNTSE-580x450.jpg', dest: 'field/lhuntse_clinic.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/03/haa-dzo-580x450.jpg', dest: 'field/haa_hospital.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/07/abpi-to-BHTF-580x450.jpg', dest: 'field/vaccine_delivery.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/04/MG_7725-580x450.jpg', dest: 'field/cold_chain_logistics.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2025/04/MG_7403-580x450.jpg', dest: 'field/essential_medicines_stock.jpg' },
  { url: 'https://www.bhtf.bt/wp-content/uploads/2021/08/round.png', dest: 'bhtf_emblem.png' }
];

function download(item) {
  return new Promise((resolve) => {
    const filePath = path.join(targetDir, item.dest);
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
      console.log(`Already exists: ${item.dest}`);
      return resolve(true);
    }
    const file = fs.createWriteStream(filePath);
    https.get(item.url, { rejectUnauthorized: false, timeout: 15000 }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${item.dest} (${fs.statSync(filePath).size} bytes)`);
          resolve(true);
        });
      } else {
        console.warn(`Failed (${res.statusCode}): ${item.url}`);
        file.close();
        try { fs.unlinkSync(filePath); } catch {}
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${item.url}:`, err.message);
      file.close();
      try { fs.unlinkSync(filePath); } catch {}
      resolve(false);
    });
  });
}

async function run() {
  console.log(`Starting download of ${assetsToDownload.length} authentic BHTF assets...`);
  for (const item of assetsToDownload) {
    await download(item);
  }
  console.log('Asset synchronization complete.');
}

run();
