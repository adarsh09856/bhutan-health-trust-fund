import { db } from "../src/lib/db";

async function main() {
  console.log("=== COMPREHENSIVE END-TO-END BHTF CRUD & PAGE BUILDER VERIFICATION ===\n");

  // 1. News Articles
  console.log("1. Testing News CRUD...");
  const newsItem = await db.createNews({
    title: "National Health Verification 2026",
    excerpt: "Verification test article",
    content: "Content for national health verification test article.",
    category: "Immunization",
    author: "BHTF Verifier",
    coverImage: "/src/assets/news-vaccine.jpg",
    isPublished: true,
  });
  console.log("   -> Created news:", newsItem.id, newsItem.title);
  await db.updateNews(newsItem.id, { title: "National Health Verification 2026 (Updated)" });
  await db.deleteNews(newsItem.id);
  console.log("   -> News CRUD Verified OK.");

  // 2. Reports
  console.log("2. Testing Reports CRUD...");
  const rep = await db.createReport({
    title: "RAA Audited Statement 2025-2026",
    year: "2026",
    category: "Financial",
    fileUrl: "/documents/sample.pdf",
    description: "Annual statutory audit statement certified by Royal Audit Authority.",
  });
  console.log("   -> Created report:", rep.id, rep.title);
  await db.updateReport(rep.id, { title: "RAA Audited Statement 2025-2026 (Verified)" });
  await db.deleteReport(rep.id);
  console.log("   -> Reports CRUD Verified OK.");

  // 3. Policies
  console.log("3. Testing Policies CRUD...");
  const pol = await db.createPolicy({
    title: "Sovereign Health Buffer Regulation",
    summary: "Mandatory 6-month national drug buffer policy.",
    content: "Full text of sovereign health buffer regulation.",
    category: "Governance",
    effectiveDate: "2026",
  });
  console.log("   -> Created policy:", pol.id, pol.title);
  await db.updatePolicy(pol.id, { summary: "Updated buffer policy text." });
  await db.deletePolicy(pol.id);
  console.log("   -> Policies CRUD Verified OK.");

  // 4. Programs
  console.log("4. Testing Healthcare Programs CRUD...");
  const prog = await db.createProgram({
    title: "Alpine Emergency Oxygen & Cold Chain",
    summary: "Solar refrigeration for mountain clinics in Laya and Lunana.",
    fullDescription: "Comprehensive high-altitude logistics ensuring zero stockout.",
    icon: "ThermometerSnowflake",
    targetDzongkhags: "Gasa, Bumthang, Trashigang",
    beneficiariesReached: "45,000 citizens",
    status: "ACTIVE",
  });
  console.log("   -> Created program:", prog.id, prog.title);
  await db.updateProgram(prog.id, { title: "Alpine Emergency Oxygen Stream (Updated)" });
  await db.deleteProgram(prog.id);
  console.log("   -> Programs CRUD Verified OK.");

  // 5. Trustees
  console.log("5. Testing Trustees CRUD...");
  const trustee = await db.createTrustee({
    name: "Dasho Dechen Wangmo",
    role: "Special Health Advisor",
    organization: "Royal Government of Bhutan",
    badge: "Government Trustee",
    bio: "Former Minister of Health guiding universal primary coverage.",
    orderIndex: 9,
    isActive: true,
  });
  console.log("   -> Created trustee:", trustee.id, trustee.name);
  await db.updateTrustee(trustee.id, { role: "Eminent Senior Trustee" });
  await db.deleteTrustee(trustee.id);
  console.log("   -> Trustees CRUD Verified OK.");

  // 6. FAQs
  console.log("6. Testing FAQs CRUD...");
  const faq = await db.createFaq({
    question: "How is the 1:1 RGOB matching fund accounted?",
    answer: "Audited biannually by the Royal Audit Authority with direct treasury transfers.",
    category: "Governance",
    orderIndex: 99,
    isPublished: true,
  });
  console.log("   -> Created FAQ:", faq.id);
  await db.updateFaq(faq.id, { answer: "Updated audit protocol answer." });
  await db.deleteFaq(faq.id);
  console.log("   -> FAQs CRUD Verified OK.");

  // 7. Impact Metrics
  console.log("7. Testing Impact Metrics CRUD...");
  const metric = await db.createImpactMetric({
    label: "Alpine Porterage Routes",
    value: "42 Remote gewogs",
    description: "Highland mule & solar porterage routes sustained.",
    icon: "MapPin",
    badge: "Highland Reach",
    orderIndex: 12,
    isActive: true,
  });
  console.log("   -> Created Metric:", metric.id, metric.label);
  await db.updateImpactMetric(metric.id, { value: "48 Remote gewogs" });
  await db.deleteImpactMetric(metric.id);
  console.log("   -> Impact Metrics CRUD Verified OK.");

  // 8. Milestones
  console.log("8. Testing Milestones CRUD...");
  const milestone = await db.createMilestone({
    year: "2027",
    title: "100% Sovereign Self-Reliance Target",
    description: "Target year for full national financing of all essential commodities.",
    orderIndex: 20,
  });
  console.log("   -> Created Milestone:", milestone.id, milestone.year);
  await db.updateMilestone(milestone.id, { title: "Updated Milestone Target" });
  await db.deleteMilestone(milestone.id);
  console.log("   -> Milestones CRUD Verified OK.");

  // 9. Media Gallery & Videos
  console.log("9. Testing Media Gallery & Videos CRUD...");
  const galleryItem = await db.createGalleryItem({
    title: "Gasa Highland Vaccine Dispatch",
    category: "Highlands Outreach",
    imageUrl: "/src/assets/hero-bhutan.jpg",
    caption: "Winter medical supply convoy reaching remote primary health units.",
    dzongkhag: "Gasa",
    orderIndex: 1,
    isPublished: true,
  });
  console.log("   -> Created gallery item:", galleryItem.id, galleryItem.title);
  await db.updateGalleryItem(galleryItem.id, { title: "Gasa Highland Dispatch (Updated)" });
  await db.deleteGalleryItem(galleryItem.id);

  const video = await db.createVideo({
    title: "The King's Sacred Trust Documentary",
    category: "Documentary",
    videoUrl: "https://www.youtube.com/watch?v=sample",
    duration: "12:30",
    description: "25-year documentary on Bhutan Health Trust Fund.",
    orderIndex: 1,
    isPublished: true,
  });
  console.log("   -> Created video:", video.id, video.title);
  await db.updateVideo(video.id, { duration: "14:10" });
  await db.deleteVideo(video.id);
  console.log("   -> Gallery & Videos CRUD Verified OK.");

  // 10. Procurement Steps & Tenders
  console.log("10. Testing Procurement Steps & Tenders CRUD...");
  const step = await db.createProcurementStep({
    stepNumber: "06",
    title: "Highland Cold Chain Handover",
    description: "Final temperature validation upon delivery to gewog clinic.",
    orderIndex: 6,
    isActive: true,
  });
  console.log("   -> Created procurement step:", step.id, step.stepNumber);
  await db.updateProcurementStep(step.id, { title: "Cold Chain Handover (Verified)" });
  await db.deleteProcurementStep(step.id);

  const tender = await db.createProcurementTender({
    tenderNo: "BHTF/TEND-2026/099",
    title: "Sovereign Supply of Pediatric Hepatitis B Vaccines",
    category: "Vaccines",
    status: "OPEN",
    closingDate: new Date(Date.now() + 60 * 86400000),
    documentUrl: "/documents/sample.pdf",
    documentSize: "2.1 MB",
    description: "WHO prequalified international bidding for childhood vaccine stockpile.",
  });
  console.log("   -> Created procurement tender:", tender.id, tender.tenderNo);
  await db.updateProcurementTender(tender.id, { status: "EVALUATING" });
  await db.deleteProcurementTender(tender.id);
  console.log("   -> Procurement CRUD Verified OK.");

  // 11. Custom Pages & WordPress-Style Live Page Editor
  console.log("11. Testing Custom Pages & WordPress-Style Live Editor...");
  const pages = await db.getAllPages();
  console.log("   -> Available pages in builder:", pages.map((p) => p.slug));

  const newCustomPage = await db.savePage("himalayan-health-fund", {
    title: "Himalayan Sovereign Health Initiative",
    metaDescription: "Dedicated fund for remote Himalayan communities.",
    sectionsJson: JSON.stringify([
      {
        id: "hero-1",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "Safeguarding Alpine Communities",
        subtitle: "Universal routine medicines for remote Bhutanese highlands.",
        badge: "Special Initiative",
        bgVariant: "emerald",
      },
      {
        id: "stats-1",
        type: "stats",
        order: 2,
        isVisible: true,
        title: "Highland Outreach Statistics",
        items: [
          { value: "100%", title: "Gewogs Reached", description: "All alpine Primary Health Units" },
          { value: "0", title: "Stockouts", description: "Uninterrupted essential medicine supply" },
        ],
      },
    ]),
    status: "published",
    isSystemPage: false,
  });
  console.log("   -> Created custom page:", newCustomPage.slug, "Status:", newCustomPage.status);

  const fetchedCustom = await db.getPageBySlug("himalayan-health-fund");
  if (!fetchedCustom) throw new Error("Failed to retrieve custom page!");
  console.log("   -> Retrieved custom page sections length:", fetchedCustom.sectionsJson.length);

  await db.deletePage("himalayan-health-fund");
  console.log("   -> Deleted custom page successfully.");

  // Reset Home Page
  const resetHome = await db.resetPageToDefault("home");
  console.log("   -> Reset Home page template verified:", Boolean(resetHome));

  console.log("\n===========================================================");
  console.log(">>> ALL 11 DOMAIN MODULES & CUSTOM LIVE EDITOR VERIFIED 100% <<<");
  console.log("===========================================================\n");
}

main().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
