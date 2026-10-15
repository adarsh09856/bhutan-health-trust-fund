import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";

// Always isolate storage before importing the application database module.
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), "bhtf-workflow-"));
const repository = fileURLToPath(new URL("../", import.meta.url));
process.chdir(fixture);
process.env.DATABASE_URL = "postgresql://fixture:fixture@127.0.0.1:1/disposable";
process.env.BHTF_DATA_DIR = path.join(fixture, ".data");
const { db } = await import("../src/lib/db/index");
const { pool } = await import("../src/lib/db/client");
let passed = 0;
function check(label: string, condition: unknown) {
  assert.ok(condition, label);
  passed++;
  console.log(`PASS ${label}`);
}

try {
  const auth = await import("../src/lib/auth.server");
  const password = randomUUID();
  const user = await db.createUser({ name: "Disposable Editor", email: "editor-fixture@example.invalid", role: "EDITOR", passwordHash: bcrypt.hashSync(password, 10) });
  check("user list excludes password hashes", (await db.getAllUsers()).every(user => !("passwordHash" in user)));
  const login = await auth.authenticateAdmin(user.email, password, "fixture-address");
  check("valid fixture login creates a session", login.success && login.token);
  const token = login.token!;
  check("session resolves the Editor role", (await auth.requireAdminFromRequest(token)).role === "EDITOR");
  await assert.rejects(() => auth.requireSuperAdminFromRequest(token), /FORBIDDEN/);
  check("Editor rejected by super-admin guard", true);
  check("session list includes the active session", (await db.getActiveSessionsForUser(user.id)).length === 1);
  await db.updateUser(user.id, { name: "Edited Disposable Editor" });
  check("user edit persists", (await db.findUserById(user.id))?.name === "Edited Disposable Editor");
  await auth.revokeSessionByToken(token);
  check("revoked session cannot authenticate", await auth.verifyDatabaseSession(token) === null);
  await db.updateUser(user.id, { isActive: false });
  check("deactivated user cannot log in", !(await auth.authenticateAdmin(user.email, password, "fixture-address")).success);
  await db.deleteUser(user.id);
  check("fixture user deletion persists", await db.findUserByEmail(user.email) === null);
  const domains = [
    { name: "reports", create: "createReport", update: "updateReport", read: "getAllReports", remove: "deleteReport", data: { title: "Fixture report", year: "2026", category: "Financial", fileUrl: "/uploads/fixture.pdf", description: "Fixture" }, field: "description" },
    { name: "policies", create: "createPolicy", update: "updatePolicy", read: "getAllPolicies", remove: "deletePolicy", data: { title: "Fixture policy", summary: "Fixture", content: "Fixture policy body", category: "Governance", effectiveDate: "2026" }, field: "summary" },
    { name: "programs", create: "createProgram", update: "updateProgram", read: "getAllPrograms", publicRead: "getAllPrograms", remove: "deleteProgram", data: { title: "Fixture program", summary: "Fixture", fullDescription: "Fixture body", icon: "Pill", status: "ACTIVE" }, field: "summary" },
    { name: "trustees", create: "createTrustee", update: "updateTrustee", read: "getAllTrustees", publicRead: "getAllTrustees", publicReadArgs: [true], remove: "deleteTrustee", data: { name: "Fixture trustee", role: "Fixture role", organization: "Fixture", photoUrl: "/uploads/fixture.jpg", bio: "Fixture", isActive: true }, field: "role" },
    { name: "faqs", create: "createFaq", update: "updateFaq", read: "getAllFaqs", publicRead: "getAllFaqs", publicReadArgs: [true], remove: "deleteFaq", data: { question: "Fixture question?", answer: "Fixture answer", category: "General", isPublished: true }, field: "answer" },
    { name: "impactMetrics", create: "createImpactMetric", update: "updateImpactMetric", read: "getAllImpactMetrics", publicRead: "getAllImpactMetrics", publicReadArgs: [true], remove: "deleteImpactMetric", data: { label: "Fixture metric", value: "1", description: "Fixture", icon: "Users", isActive: true }, field: "value" },
    { name: "milestones", create: "createMilestone", update: "updateMilestone", read: "getAllMilestones", publicRead: "getAllMilestones", remove: "deleteMilestone", data: { year: "2026", title: "Fixture milestone", description: "Fixture" }, field: "description" },
    { name: "mediaGallery", create: "createGalleryItem", update: "updateGalleryItem", read: "getGallery", remove: "deleteGalleryItem", data: { title: "Fixture photo", imageUrl: "/uploads/fixture.jpg", category: "Fixture", caption: "Fixture", isPublished: true }, field: "caption" },
    { name: "mediaVideos", create: "createVideo", update: "updateVideo", read: "getVideos", remove: "deleteVideo", data: { title: "Fixture video", videoUrl: "https://www.youtube.com/watch?v=fixture", category: "Fixture", description: "Fixture", isPublished: true }, field: "description" },
    { name: "procurementSteps", create: "createProcurementStep", update: "updateProcurementStep", read: "getProcurementSteps", publicRead: "getProcurementSteps", remove: "deleteProcurementStep", data: { stepNumber: "99", title: "Fixture step", description: "Fixture", isActive: true }, field: "description" },
    { name: "procurementTenders", create: "createProcurementTender", update: "updateProcurementTender", read: "getProcurementTenders", publicRead: "getProcurementTenders", remove: "deleteProcurementTender", data: { tenderNo: "FIXTURE-99", title: "Fixture tender", category: "Fixture", status: "OPEN", closingDate: new Date(), description: "Fixture" }, field: "description" },
  ];
  for (const domain of domains) {
    const store = db as any;
    const item = await store[domain.create](domain.data);
    check(`${domain.name} create is readable`, (await store[domain.read]()).some((x: any) => x.id === item.id));
    await store[domain.update](item.id, { [domain.field]: "Edited fixture value" });
    check(`${domain.name} edit is readable`, (await store[domain.read]()).find((x: any) => x.id === item.id)?.[domain.field] === "Edited fixture value");
    if (domain.publicRead) {
      check(`${domain.name} edit appears in the public data read`, (await store[domain.publicRead](...(domain.publicReadArgs ?? []))).find((x: any) => x.id === item.id)?.[domain.field] === "Edited fixture value");
    }
    const onDisk = JSON.parse(fs.readFileSync(path.join(fixture, ".data/bhtf-store.json"), "utf8"));
    check(`${domain.name} edit saved to disk`, onDisk[domain.name].find((x: any) => x.id === item.id)?.[domain.field] === "Edited fixture value");
    await store[domain.remove](item.id);
    check(`${domain.name} delete is readable`, !(await store[domain.read]()).some((x: any) => x.id === item.id));
  }
  const article = await db.createNews({
    title: "Disposable acceptance article",
    excerpt: "Fixture",
    content: "Fixture body",
    coverImage: "/fixture.png",
    isPublished: false,
  });
  check(
    "draft excluded from public news",
    !(await db.getAllNews()).some((x) => x.id === article.id),
  );
  await db.updateNews(article.id, { title: "Edited fixture", isPublished: true });
  check(
    "published edit appears in public news",
    (await db.getAllNews()).some((x) => x.id === article.id && x.title === "Edited fixture"),
  );
  await db.updateNews(article.id, { isPublished: false });
  check("unpublish removes list entry", !(await db.getAllNews()).some((x) => x.id === article.id));

  const inquiry = await db.createInquiry({
    name: "Fixture Citizen",
    email: "fixture@example.invalid",
    subject: "Acceptance fixture",
    message: "Disposable inquiry message",
  });
  await db.updateInquiryStatus(inquiry.id, "REPLIED", "Fixture reply");
  check(
    "inquiry status and notes persist",
    (await db.getAllInquiries()).some(
      (x) => x.id === inquiry.id && x.status === "REPLIED" && x.replyNotes === "Fixture reply",
    ),
  );
  const subscriber = await db.addSubscriber("fixture@example.invalid");
  const duplicate = await db.addSubscriber("FIXTURE@example.invalid");
  check("subscriber normalized and deduplicated", subscriber.id === duplicate.id);
  await db.updateSubscriberStatus(subscriber.id, false);
  check(
    "subscriber deactivation persists",
    (await db.getAllSubscribers()).find((x) => x.id === subscriber.id)?.isActive === false,
  );

  const donation = await db.createDonation({
    referenceNo: "BHTF-DON-999001",
    donorName: "Fixture Donor",
    donorEmail: "fixture@example.invalid",
    amountNu: 100,
    paymentMethod: "BANK_TRANSFER",
  });
  await db.submitDonationJournal(donation.referenceNo, "FIXTURE-JOURNAL", "Fixture Bank");
  const tracked = await db.findDonationByReference("bhtf-don-999001");
  check(
    "offline pledge and journal can be tracked",
    tracked?.status === "VERIFICATION_SUBMITTED" &&
      tracked.gatewayTransactionId === "FIXTURE-JOURNAL",
  );
  await db.updateDonationStatus(donation.id, "COMPLETED");
  check(
    "admin status preserves reference",
    (await db.findDonationByReference(donation.referenceNo))?.referenceNo === donation.referenceNo,
  );

  const saved = JSON.parse(fs.readFileSync(path.join(fixture, ".data/bhtf-store.json"), "utf8"));
  check(
    "saved disk contains edited inquiry",
    saved.inquiries.some((x: any) => x.id === inquiry.id && x.replyNotes === "Fixture reply"),
  );
  check(
    "saved disk contains donation status",
    saved.donations.some(
      (x: any) => x.referenceNo === donation.referenceNo && x.status === "COMPLETED",
    ),
  );
  check(
    "saved disk contains subscriber status",
    saved.subscribers.some((x: any) => x.id === subscriber.id && x.isActive === false),
  );

  await db.deleteNews(article.id);
  await db.deleteInquiry(inquiry.id);
  await db.deleteSubscriber(subscriber.id);
  check(
    "fixture deletions persist",
    !(await db.getAllNews(false)).some((x) => x.id === article.id) &&
      !(await db.getAllInquiries()).some((x) => x.id === inquiry.id) &&
      !(await db.getAllSubscribers()).some((x) => x.id === subscriber.id),
  );
  const readerPath = path.join(fixture, "reload-check.mts");
  const storeModule = new URL("../src/lib/db/persistent-store.ts", import.meta.url).href;
  fs.writeFileSync(readerPath, `import assert from 'node:assert/strict';
    const {persistentStore: store} = await import(${JSON.stringify(storeModule)});
    assert.equal(store.getDonations().find(x => x.referenceNo === 'BHTF-DON-999001')?.status, 'COMPLETED');
    assert.ok(!store.getNews().some(x => x.id === ${article.id}));
    assert.ok(!store.getInquiries().some(x => x.id === ${inquiry.id}));
    assert.ok(!store.getSubscribers().some(x => x.id === ${subscriber.id}));`);
  const reload = spawnSync(process.execPath, [path.join(repository, "node_modules/tsx/dist/cli.mjs"), readerPath], { cwd: fixture, env: process.env, encoding: "utf8" });
  check("records and deletions survive a fresh process", reload.status === 0);
  console.log(`${passed} assertions passed. Disposable storage: ${fixture}`);
} finally {
  await pool.end();
}
