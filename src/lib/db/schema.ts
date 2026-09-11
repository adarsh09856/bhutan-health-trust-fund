import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("SUPER_ADMIN"), // SUPER_ADMIN, EDITOR
  isActive: boolean("is_active").notNull().default(true),
  failedAttempts: integer("failed_attempts").notNull().default(0),
  lockedUntil: timestamp("locked_until"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const newsArticles = pgTable("news_articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image").notNull(),
  category: text("category").notNull().default("General"), // Immunization, Essential Medicines, Governance, Partnership, Community
  author: text("author").notNull().default("BHTF Media"),
  isPublished: boolean("is_published").notNull().default(true),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  viewsCount: integer("views_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reports = pgTable("reports", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  year: text("year").notNull(),
  category: text("category").notNull().default("Annual Report"), // Annual Report, Financial, Research, Governance, Assessment, Strategy
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size").notNull().default("2.4 MB"),
  description: text("description").notNull(),
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const policies = pgTable("policies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  fileUrl: text("file_url"),
  category: text("category").notNull().default("Governance"), // Governance, Procurement, Ethics, Finance, Privacy
  effectiveDate: text("effective_date").notNull().default("2024"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  referenceNo: text("reference_no").notNull().unique(), // e.g. BHTF-DON-882194
  donorName: text("donor_name").notNull(),
  donorEmail: text("donor_email").notNull(),
  donorPhone: text("donor_phone"),
  amountNu: integer("amount_nu").notNull(),
  currency: text("currency").notNull().default("BTN"),
  paymentMethod: text("payment_method").notNull().default("MBOB"), // MBOB, BNB_PAY, RMA_GATEWAY, BANK_TRANSFER, INTERNATIONAL_CARD
  status: text("status").notNull().default("PENDING"), // PENDING, VERIFIED, COMPLETED, CANCELLED
  message: text("message"),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("UNREAD"), // UNREAD, IN_PROGRESS, REPLIED, ARCHIVED
  replyNotes: text("reply_notes"),
  channel: text("channel").notNull().default("WEB"), // WEB, WALK_IN, PHONE, EMAIL
  loggedBy: text("logged_by"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
});

export const programs = pgTable("programs", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  fullDescription: text("full_description").notNull(),
  icon: text("icon").notNull().default("Pill"),
  targetDzongkhags: text("target_dzongkhags").notNull().default("All 20 Dzongkhags"),
  beneficiariesReached: text("beneficiaries_reached").notNull().default("780,000+ citizens"),
  status: text("status").notNull().default("ACTIVE"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const trustees = pgTable("trustees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  organization: text("organization").notNull(),
  badge: text("badge").notNull().default("Trustee"),
  bio: text("bio").notNull(),
  photoUrl: text("photo_url"),
  orderIndex: integer("order_index").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  category: text("category").notNull().default("General"),
  orderIndex: integer("order_index").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const impactMetrics = pgTable("impact_metrics", {
  id: serial("id").primaryKey(),
  label: text("label").notNull(),
  value: text("value").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull().default("Users"),
  badge: text("badge").notNull().default("Verified"),
  orderIndex: integer("order_index").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  settingKey: text("setting_key").notNull().unique(),
  settingValue: text("setting_value").notNull(),
  category: text("category").notNull().default("general"),
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Real Database-Backed Sessions Table
 * Enables 0ms linger instant session revocation upon account deactivation or admin logout.
 */
export const userSessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: timestamp("expires_at").notNull(),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Immutable Fiduciary Audit Logs Table
 * Strictly append-only — NO DELETE, NO UPDATE permitted.
 * In v3: captures old_value, new_value, and mandatory reason for Tier 2 operations.
 */
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email").notNull(),
  action: text("action").notNull(), // CREATE, UPDATE, DELETE, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SESSION_REVOKED, FINANCIAL_SETTINGS_UPDATE, LEGAL_SIGNOFF
  entity: text("entity").notNull(), // NEWS, REPORT, POLICY, DONATION, USER, SETTING, FINANCIAL_SETTINGS, SESSION, FAQ, TRUSTEE, PROGRAM, SYSTEM
  entityId: text("entity_id"),
  details: text("details"),
  oldValue: text("old_value"),
  newValue: text("new_value"),
  reason: text("reason"), // Mandatory min 10 chars for Tier 2 mutations
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Tier 2 Restricted Financial & Statutory Settings Table
 * Strictly super_admin controlled with mandatory audit logging and confirm-to-save.
 */
export const financialSettings = pgTable("financial_settings", {
  id: serial("id").primaryKey(),
  bankAccountBOB: text("bank_account_bob").notNull().default("[BANK_ACCOUNT_PLACEHOLDER]"),
  swiftCodeBOB: text("swift_code_bob").notNull().default("[SWIFT_PLACEHOLDER]"),
  bankName: text("bank_name").notNull().default("Bank of Bhutan Limited"),
  accountTitle: text("account_title").notNull().default("Bhutan Health Trust Fund"),
  taxExemptionId: text("tax_exemption_id").notNull().default("[TAX_ID_PLACEHOLDER]"),
  taxCertificateValid: boolean("tax_certificate_valid").notNull().default(false),
  legalSignoffBy: text("legal_signoff_by"),
  legalSignoffAt: timestamp("legal_signoff_at"),
  legalSignoffNotes: text("legal_signoff_notes"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  updatedBy: text("updated_by"),
});

/**
 * System Events Table
 * Tracks critical server events, background tasks, and security lockdowns.
 */
export const systemEvents = pgTable("system_events", {
  id: serial("id").primaryKey(),
  eventType: text("event_type").notNull(), // STARTUP, SEED_EXECUTED, RATE_LIMIT_LOCKOUT, BACKUP, ERROR
  message: text("message").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/**
 * Procurement Steps Table
 * Dynamic sovereign procurement lifecycle management.
 */
export const procurementSteps = pgTable("procurement_steps", {
  id: serial("id").primaryKey(),
  stepNumber: text("step_number").notNull(), // e.g. "01", "02"
  title: text("title").notNull(),
  description: text("description").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Media Gallery Table
 * Visual evidence of highland cold-chain logistics, vaccine air-drops, and community health units.
 */
export const mediaGallery = pgTable("media_gallery", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("Field Operations"), // Cold Chain, Immunization, Highlands Outreach, Clinics, Royal Visits
  imageUrl: text("image_url").notNull(),
  caption: text("caption"),
  dzongkhag: text("dzongkhag").notNull().default("All 20 Dzongkhags"),
  orderIndex: integer("order_index").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Media Videos Table
 * Public documentaries, King's addresses, healthcare worker interviews.
 */
export const mediaVideos = pgTable("media_videos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull().default("Documentary"), // Documentary, Field Report, Royal Address, Impact Story
  videoUrl: text("video_url").notNull(), // YouTube / Vimeo embed or link
  duration: text("duration").notNull().default("05:00"),
  thumbnailUrl: text("thumbnail_url"),
  description: text("description"),
  orderIndex: integer("order_index").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/**
 * Procurement Tenders Table
 * Active and archived tenders, Requests for Proposal (RFPs), and Bidding Documents.
 */
export const procurementTenders = pgTable("procurement_tenders", {
  id: serial("id").primaryKey(),
  tenderNo: text("tender_no").notNull().unique(), // e.g. BHTF/TEND-2025/001
  title: text("title").notNull(),
  category: text("category").notNull().default("Essential Drugs"), // Essential Drugs, Vaccines, Cold Chain, Diagnostics, Medical Devices
  status: text("status").notNull().default("OPEN"), // OPEN, EVALUATING, AWARDED, CLOSED
  closingDate: timestamp("closing_date").notNull(),
  documentUrl: text("document_url").notNull(),
  documentSize: text("document_size").notNull().default("1.8 MB"),
  downloadCount: integer("download_count").notNull().default(0),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
export type FinancialSetting = typeof financialSettings.$inferSelect;
export type NewFinancialSetting = typeof financialSettings.$inferInsert;
export type SystemEvent = typeof systemEvents.$inferSelect;
export type NewSystemEvent = typeof systemEvents.$inferInsert;
export type ProcurementStep = typeof procurementSteps.$inferSelect;
export type NewProcurementStep = typeof procurementSteps.$inferInsert;
export type NewsArticle = typeof newsArticles.$inferSelect;
export type NewNewsArticle = typeof newsArticles.$inferInsert;
export type Report = typeof reports.$inferSelect;
export type NewReport = typeof reports.$inferInsert;
export type Policy = typeof policies.$inferSelect;
export type NewPolicy = typeof policies.$inferInsert;
export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;
export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type Trustee = typeof trustees.$inferSelect;
export type NewTrustee = typeof trustees.$inferInsert;
export type Faq = typeof faqs.$inferSelect;
export type NewFaq = typeof faqs.$inferInsert;
export type ImpactMetric = typeof impactMetrics.$inferSelect;
export type NewImpactMetric = typeof impactMetrics.$inferInsert;
export type Milestone = typeof milestones.$inferSelect;
export type NewMilestone = typeof milestones.$inferInsert;
export type SiteSetting = typeof siteSettings.$inferSelect;
export type NewSiteSetting = typeof siteSettings.$inferInsert;
export type MediaGalleryItem = typeof mediaGallery.$inferSelect;
export type NewMediaGalleryItem = typeof mediaGallery.$inferInsert;
export type MediaVideo = typeof mediaVideos.$inferSelect;
export type NewMediaVideo = typeof mediaVideos.$inferInsert;
export type ProcurementTender = typeof procurementTenders.$inferSelect;
export type NewProcurementTender = typeof procurementTenders.$inferInsert;
