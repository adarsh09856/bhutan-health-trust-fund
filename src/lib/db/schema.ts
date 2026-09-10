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
 */
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "set null" }),
  userEmail: text("user_email").notNull(),
  action: text("action").notNull(), // CREATE, UPDATE, DELETE, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT, SESSION_REVOKED, SYSTEM_SETTING_CHANGED
  entity: text("entity").notNull(), // NEWS, REPORT, POLICY, DONATION, USER, SETTING, SESSION, FAQ, TRUSTEE, PROGRAM, SYSTEM
  entityId: text("entity_id"),
  details: text("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type UserSession = typeof userSessions.$inferSelect;
export type NewUserSession = typeof userSessions.$inferInsert;
export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;
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
