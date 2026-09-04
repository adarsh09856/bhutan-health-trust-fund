import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("ADMIN"), // SUPER_ADMIN, ADMIN, EDITOR
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

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  category: text("category").notNull().default("Cold Chain & Vaccines"), // Cold Chain & Vaccines, Essential Medicines, Maternal Health, Quality Assurance
  description: text("description").notNull(),
  instructor: text("instructor").notNull().default("BHTF & KGUMSB Faculty"),
  durationHours: text("duration_hours").notNull().default("4 Hours"),
  difficulty: text("difficulty").notNull().default("Intermediate"), // Beginner, Intermediate, Advanced
  modulesCount: integer("modules_count").notNull().default(4),
  enrolledCount: integer("enrolled_count").notNull().default(0),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  studentName: text("student_name").notNull(),
  studentEmail: text("student_email").notNull(),
  progressPercent: integer("progress_percent").notNull().default(0),
  quizScore: integer("quiz_score").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  certificateId: text("certificate_id"), // e.g. BHTF-CERT-2026-9812
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
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
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type NewCourseEnrollment = typeof courseEnrollments.$inferInsert;
