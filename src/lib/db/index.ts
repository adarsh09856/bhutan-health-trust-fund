import { eq, desc, asc, sql, and, gt } from "drizzle-orm";
import { drizzleDb } from "./client";
import * as schema from "./schema";
import { ensureDatabaseSchema } from "./init";
import {
  initialNewsArticles,
  initialReports,
  initialPolicies,
  initialPrograms,
  initialDonations,
  initialInquiries,
  initialSubscribers,
  initialTrustees,
  initialFaqs,
  initialImpactMetrics,
  initialMilestones,
  initialSiteSettings,
} from "./seed-data";
import type {
  User,
  UserSession,
  NewUserSession,
  AuditLog,
  NewAuditLog,
  SystemEvent,
  NewSystemEvent,
  ProcurementStep,
  NewProcurementStep,
  NewsArticle,
  Report,
  Policy,
  Program,
  Donation,
  Inquiry,
  Subscriber,
  Trustee,
  Faq,
  ImpactMetric,
  Milestone,
  SiteSetting,
  NewUser,
  NewNewsArticle,
  NewReport,
  NewPolicy,
  NewProgram,
  NewDonation,
  NewInquiry,
  NewSubscriber,
  NewTrustee,
  NewFaq,
  NewImpactMetric,
  NewMilestone,
  FinancialSetting,
  NewFinancialSetting,
  MediaGalleryItem,
  NewMediaGalleryItem,
  MediaVideo,
  NewMediaVideo,
  ProcurementTender,
  NewProcurementTender,
  PaymentGateway,
  NewPaymentGateway,
  CustomPage,
  NewCustomPage,
} from "./schema";
import { persistentStore } from "./persistent-store";


/**
 * Enterprise Production PostgreSQL Database Layer for BHTF
 * Direct Drizzle ORM queries against live aaPanel-hosted PostgreSQL database.
 * Includes graceful zero-downtime seed data fallbacks if the database is initializing.
 */
class BHTFDataStore {
  // --- Users & Auth ---
  public async findUserByEmail(email: string): Promise<User | null> {
    const normalized = email.trim().toLowerCase();
    try {
      const [user] = await drizzleDb
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, normalized));
      if (user) return user;
    } catch (err: any) {
      console.warn("[PostgreSQL findUserByEmail Warning]:", err?.message || err);
    }
    return null;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return this.findUserByEmail(email);
  }

  public async findUserById(id: number): Promise<User | null> {
    try {
      const [user] = await drizzleDb.select().from(schema.users).where(eq(schema.users.id, id));
      if (user) return user;
    } catch (err: any) {
      console.warn("[PostgreSQL findUserById Warning]:", err?.message || err);
    }
    return null;
  }

  // --- News Articles ---
  public async getAllNews(onlyPublished = true): Promise<NewsArticle[]> {
    try {
      if (onlyPublished) {
        const res = await drizzleDb
          .select()
          .from(schema.newsArticles)
          .where(eq(schema.newsArticles.isPublished, true))
          .orderBy(desc(schema.newsArticles.publishedAt));
        if (res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.newsArticles)
          .orderBy(desc(schema.newsArticles.publishedAt));
        if (res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getAllNews Warning]:", err?.message || err);
    }

    const all = persistentStore.getNews();
    return onlyPublished ? all.filter((a) => a.isPublished) : all;
  }

  public async getNewsBySlug(slug: string): Promise<NewsArticle | null> {
    try {
      const [article] = await drizzleDb
        .select()
        .from(schema.newsArticles)
        .where(eq(schema.newsArticles.slug, slug));
      if (article) {
        try {
          await drizzleDb
            .update(schema.newsArticles)
            .set({ viewsCount: (article.viewsCount || 0) + 1 })
            .where(eq(schema.newsArticles.id, article.id));
        } catch {}
        return article;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getNewsBySlug Warning]:", err?.message || err);
    }

    const all = persistentStore.getNews();
    return all.find((a) => a.slug === slug) || null;
  }

  public async createNews(data: NewNewsArticle): Promise<NewsArticle> {
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload: NewsArticle = {
      id: 0,
      slug,
      title: data.title,
      category: data.category || "General",
      author: data.author || "BHTF Media",
      coverImage: data.coverImage,
      excerpt: data.excerpt,
      content: data.content,
      isPublished: data.isPublished !== undefined ? data.isPublished : true,
      viewsCount: 0,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const localCreated = persistentStore.saveNews(payload);

    try {
      const [created] = await drizzleDb
        .insert(schema.newsArticles)
        .values({
          ...data,
          slug,
          viewsCount: 0,
          publishedAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createNews Warning]:", err?.message || err);
    }

    return localCreated;
  }

  public async updateNews(id: number, data: Partial<NewNewsArticle>): Promise<NewsArticle | null> {
    const existing = persistentStore.getNews().find((a) => a.id === id);
    if (existing) {
      persistentStore.saveNews({ ...existing, ...data } as NewsArticle);
    }

    try {
      const [updated] = await drizzleDb
        .update(schema.newsArticles)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(schema.newsArticles.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateNews Warning]:", err?.message || err);
    }

    return persistentStore.getNews().find((a) => a.id === id) || null;
  }

  public async deleteNews(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteNews(id);
    try {
      await drizzleDb.delete(schema.newsArticles).where(eq(schema.newsArticles.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteNews Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  // --- Reports & Publications ---
  public async getAllReports(): Promise<Report[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.reports)
        .orderBy(desc(schema.reports.year), desc(schema.reports.createdAt));
      if (res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getAllReports Warning]:", err?.message || err);
    }

    return persistentStore.getReports();
  }

  public async createReport(data: NewReport): Promise<Report> {
    const localCreated = persistentStore.saveReport(data);
    try {
      const [created] = await drizzleDb
        .insert(schema.reports)
        .values({
          ...data,
          downloadCount: 0,
        })
        .returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createReport Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updateReport(id: number, data: Partial<NewReport>): Promise<Report | null> {
    const localUpdated = persistentStore.saveReport({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.reports)
        .set(data)
        .where(eq(schema.reports.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateReport Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deleteReport(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteReport(id);
    try {
      await drizzleDb.delete(schema.reports).where(eq(schema.reports.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteReport Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  public async incrementReportDownload(id: number): Promise<boolean> {
    try {
      await drizzleDb
        .update(schema.reports)
        .set({ downloadCount: sql`${schema.reports.downloadCount} + 1` })
        .where(eq(schema.reports.id, id));
    } catch {}
    const rep = persistentStore.getReports().find((r) => r.id === id);
    if (rep) {
      rep.downloadCount = (rep.downloadCount || 0) + 1;
    }
    return true;
  }

  // --- Policies ---
  public async getAllPolicies(): Promise<Policy[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.policies)
        .orderBy(desc(schema.policies.createdAt));
      if (res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getAllPolicies Warning]:", err?.message || err);
    }

    return persistentStore.getPolicies();
  }

  public async getPolicyBySlug(slug: string): Promise<Policy | null> {
    try {
      const [p] = await drizzleDb.select().from(schema.policies).where(eq(schema.policies.slug, slug));
      if (p) return p;
    } catch (err: any) {
      console.warn("[PostgreSQL getPolicyBySlug Warning]:", err?.message || err);
    }
    return persistentStore.getPolicies().find((p) => p.slug === slug) || null;
  }

  public async createPolicy(data: NewPolicy): Promise<Policy> {
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const localCreated = persistentStore.savePolicy({ ...data, slug });
    try {
      const [created] = await drizzleDb
        .insert(schema.policies)
        .values({
          ...data,
          slug,
          updatedAt: new Date(),
        })
        .returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createPolicy Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updatePolicy(id: number, data: Partial<NewPolicy>): Promise<Policy | null> {
    const localUpdated = persistentStore.savePolicy({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.policies)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(schema.policies.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updatePolicy Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deletePolicy(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deletePolicy(id);
    try {
      await drizzleDb.delete(schema.policies).where(eq(schema.policies.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deletePolicy Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  // --- Programs ---
  public async getAllPrograms(): Promise<Program[]> {
    try {
      const res = await drizzleDb.select().from(schema.programs).orderBy(asc(schema.programs.id));
      if (res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getAllPrograms Warning]:", err?.message || err);
    }

    return persistentStore.getPrograms();
  }

  public async createProgram(data: NewProgram): Promise<Program> {
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const localCreated = persistentStore.saveProgram({ ...data, slug });
    try {
      const [created] = await drizzleDb
        .insert(schema.programs)
        .values({
          ...data,
          slug,
        })
        .returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createProgram Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updateProgram(id: number, data: Partial<NewProgram>): Promise<Program | null> {
    const localUpdated = persistentStore.saveProgram({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.programs)
        .set(data)
        .where(eq(schema.programs.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateProgram Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deleteProgram(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteProgram(id);
    try {
      await drizzleDb.delete(schema.programs).where(eq(schema.programs.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteProgram Warning]:", err?.message || err);
    }
    return localDeleted;
  }


  // --- Donations ---
  public async getAllDonations(): Promise<Donation[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.donations)
        .orderBy(desc(schema.donations.createdAt));
      return res || [];
    } catch (err: any) {
      console.warn("[PostgreSQL getAllDonations Warning]:", err?.message || err);
      return [];
    }
  }

  public async createDonation(data: NewDonation): Promise<Donation> {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const referenceNo = data.referenceNo || `BHTF-DON-${randomSuffix}`;

    const [created] = await drizzleDb
      .insert(schema.donations)
      .values({
        ...data,
        referenceNo,
      })
      .returning();
    return created;
  }

  public async findDonationByReference(referenceNo: string): Promise<Donation | null> {
    const normalized = referenceNo.trim().toUpperCase();
    try {
      const [donation] = await drizzleDb
        .select()
        .from(schema.donations)
        .where(eq(schema.donations.referenceNo, normalized));
      if (donation) return donation;
    } catch (err: any) {
      console.warn("[PostgreSQL findDonationByReference Warning]:", err?.message || err);
    }

    const all = await this.getAllDonations();
    return all.find((d) => d.referenceNo.toUpperCase() === normalized) || null;
  }

  public async updateDonationStatus(id: number, status: string): Promise<Donation | null> {
    const [updated] = await drizzleDb
      .update(schema.donations)
      .set({ status })
      .where(eq(schema.donations.id, id))
      .returning();
    return updated || null;
  }

  public async deleteDonation(id: number): Promise<boolean> {
    const deleted = await drizzleDb
      .delete(schema.donations)
      .where(eq(schema.donations.id, id))
      .returning();
    return deleted.length > 0;
  }

  public async updateDonationPayment(
    referenceNo: string,
    updates: {
      status?: string;
      gatewayTransactionId?: string;
      gatewaySessionId?: string;
      gatewayStatus?: string;
      paymentMetadata?: string;
      completedAt?: Date;
    },
  ): Promise<Donation | null> {
    const normalized = referenceNo.trim().toUpperCase();
    const [updated] = await drizzleDb
      .update(schema.donations)
      .set(updates)
      .where(eq(schema.donations.referenceNo, normalized))
      .returning();
    return updated || null;
  }

  public async submitDonationJournal(
    referenceNo: string,
    journalNo: string,
    bankName?: string,
  ): Promise<Donation | null> {
    const normalized = referenceNo.trim().toUpperCase();
    const current = await this.findDonationByReference(normalized);
    if (!current) return null;

    let existingMeta: Record<string, any> = {};
    if (current.paymentMetadata) {
      try {
        existingMeta = JSON.parse(current.paymentMetadata);
      } catch {
        existingMeta = {};
      }
    }

    const updatedMeta = JSON.stringify({
      ...existingMeta,
      journalNo: journalNo.trim(),
      bankName: bankName || current.paymentMethod,
      submittedAt: new Date().toISOString(),
    });

    const [updated] = await drizzleDb
      .update(schema.donations)
      .set({
        gatewayTransactionId: journalNo.trim(),
        gatewayStatus: "VERIFICATION_SUBMITTED",
        status: "VERIFICATION_SUBMITTED",
        paymentMetadata: updatedMeta,
      })
      .where(eq(schema.donations.referenceNo, normalized))
      .returning();

    return updated || null;
  }

  // --- Inquiries ---
  public async getAllInquiries(): Promise<Inquiry[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.inquiries)
        .orderBy(desc(schema.inquiries.createdAt));
      return res || [];
    } catch (err: any) {
      console.warn("[PostgreSQL getAllInquiries Warning]:", err?.message || err);
      return [];
    }
  }

  public async createInquiry(data: NewInquiry): Promise<Inquiry> {
    const [created] = await drizzleDb
      .insert(schema.inquiries)
      .values({
        ...data,
        status: data.status || "UNREAD",
        channel: data.channel || "WEB",
        loggedBy: data.loggedBy || null,
      })
      .returning();
    return created;
  }

  public async updateInquiryStatus(
    id: number,
    status: string,
    replyNotes?: string,
  ): Promise<Inquiry | null> {
    const updatePayload: Record<string, any> = { status };
    if (replyNotes !== undefined) {
      updatePayload.replyNotes = replyNotes;
    }

    const [updated] = await drizzleDb
      .update(schema.inquiries)
      .set(updatePayload)
      .where(eq(schema.inquiries.id, id))
      .returning();
    return updated || null;
  }

  public async deleteInquiry(id: number): Promise<boolean> {
    const deleted = await drizzleDb
      .delete(schema.inquiries)
      .where(eq(schema.inquiries.id, id))
      .returning();
    return deleted.length > 0;
  }

  // --- Subscribers ---
  public async getAllSubscribers(): Promise<Subscriber[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.subscribers)
        .orderBy(desc(schema.subscribers.subscribedAt));
      return res || [];
    } catch (err: any) {
      console.warn("[PostgreSQL getAllSubscribers Warning]:", err?.message || err);
      return [];
    }
  }

  public async addSubscriber(email: string): Promise<Subscriber> {
    const normalized = email.toLowerCase().trim();
    const [existing] = await drizzleDb
      .select()
      .from(schema.subscribers)
      .where(eq(schema.subscribers.email, normalized));

    if (existing) {
      if (!existing.isActive) {
        const [reactivated] = await drizzleDb
          .update(schema.subscribers)
          .set({ isActive: true })
          .where(eq(schema.subscribers.id, existing.id))
          .returning();
        return reactivated;
      }
      return existing;
    }

    const [created] = await drizzleDb
      .insert(schema.subscribers)
      .values({
        email: normalized,
        isActive: true,
      })
      .returning();
    return created;
  }

  public async adminAddSubscriber(email: string, isActive = true): Promise<Subscriber> {
    const normalized = email.toLowerCase().trim();
    const [existing] = await drizzleDb
      .select()
      .from(schema.subscribers)
      .where(eq(schema.subscribers.email, normalized));

    if (existing) {
      const [updated] = await drizzleDb
        .update(schema.subscribers)
        .set({ isActive })
        .where(eq(schema.subscribers.id, existing.id))
        .returning();
      return updated;
    }

    const [created] = await drizzleDb
      .insert(schema.subscribers)
      .values({
        email: normalized,
        isActive,
      })
      .returning();
    return created;
  }

  public async updateSubscriberStatus(id: number, isActive: boolean): Promise<Subscriber | null> {
    const [updated] = await drizzleDb
      .update(schema.subscribers)
      .set({ isActive })
      .where(eq(schema.subscribers.id, id))
      .returning();
    return updated || null;
  }

  public async deleteSubscriber(id: number): Promise<boolean> {
    const deleted = await drizzleDb
      .delete(schema.subscribers)
      .where(eq(schema.subscribers.id, id))
      .returning();
    return deleted.length > 0;
  }

  // --- Trustees ---
  public async getAllTrustees(onlyActive = false): Promise<Trustee[]> {
    try {
      if (onlyActive) {
        const res = await drizzleDb
          .select()
          .from(schema.trustees)
          .where(eq(schema.trustees.isActive, true))
          .orderBy(asc(schema.trustees.orderIndex), asc(schema.trustees.id));
        if (res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.trustees)
          .orderBy(asc(schema.trustees.orderIndex), asc(schema.trustees.id));
        if (res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getAllTrustees Warning]:", err?.message || err);
    }

    const all = persistentStore.getTrustees();
    return onlyActive ? all.filter((t) => t.isActive) : all;
  }

  public async createTrustee(data: NewTrustee): Promise<Trustee> {
    const localCreated = persistentStore.saveTrustee(data as any);
    try {
      const [created] = await drizzleDb.insert(schema.trustees).values(data).returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createTrustee Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updateTrustee(id: number, data: Partial<NewTrustee>): Promise<Trustee | null> {
    const localUpdated = persistentStore.saveTrustee({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.trustees)
        .set(data)
        .where(eq(schema.trustees.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateTrustee Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deleteTrustee(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteTrustee(id);
    try {
      await drizzleDb.delete(schema.trustees).where(eq(schema.trustees.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteTrustee Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  // --- FAQs ---
  public async getAllFaqs(onlyPublished = false): Promise<Faq[]> {
    try {
      if (onlyPublished) {
        const res = await drizzleDb
          .select()
          .from(schema.faqs)
          .where(eq(schema.faqs.isPublished, true))
          .orderBy(asc(schema.faqs.orderIndex), asc(schema.faqs.id));
        if (res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.faqs)
          .orderBy(asc(schema.faqs.orderIndex), asc(schema.faqs.id));
        if (res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getAllFaqs Warning]:", err?.message || err);
    }

    const all = persistentStore.getFaqs();
    return onlyPublished ? all.filter((f) => f.isPublished) : all;
  }

  public async createFaq(data: NewFaq): Promise<Faq> {
    const localCreated = persistentStore.saveFaq(data as any);
    try {
      const [created] = await drizzleDb.insert(schema.faqs).values(data).returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createFaq Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updateFaq(id: number, data: Partial<NewFaq>): Promise<Faq | null> {
    const localUpdated = persistentStore.saveFaq({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.faqs)
        .set(data)
        .where(eq(schema.faqs.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateFaq Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deleteFaq(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteFaq(id);
    try {
      await drizzleDb.delete(schema.faqs).where(eq(schema.faqs.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteFaq Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  // --- Impact Metrics ---
  public async getAllImpactMetrics(onlyActive = false): Promise<ImpactMetric[]> {
    try {
      if (onlyActive) {
        const res = await drizzleDb
          .select()
          .from(schema.impactMetrics)
          .where(eq(schema.impactMetrics.isActive, true))
          .orderBy(asc(schema.impactMetrics.orderIndex), asc(schema.impactMetrics.id));
        if (res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.impactMetrics)
          .orderBy(asc(schema.impactMetrics.orderIndex), asc(schema.impactMetrics.id));
        if (res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getAllImpactMetrics Warning]:", err?.message || err);
    }

    const all = persistentStore.getImpactMetrics();
    return onlyActive ? all.filter((m) => m.isActive) : all;
  }

  public async createImpactMetric(data: NewImpactMetric): Promise<ImpactMetric> {
    const localCreated = persistentStore.saveImpactMetric(data as any);
    try {
      const [created] = await drizzleDb.insert(schema.impactMetrics).values(data).returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createImpactMetric Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updateImpactMetric(
    id: number,
    data: Partial<NewImpactMetric>,
  ): Promise<ImpactMetric | null> {
    const localUpdated = persistentStore.saveImpactMetric({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.impactMetrics)
        .set(data)
        .where(eq(schema.impactMetrics.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateImpactMetric Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deleteImpactMetric(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteImpactMetric(id);
    try {
      await drizzleDb.delete(schema.impactMetrics).where(eq(schema.impactMetrics.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteImpactMetric Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  // --- Milestones ---
  public async getAllMilestones(): Promise<Milestone[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.milestones)
        .orderBy(asc(schema.milestones.orderIndex), asc(schema.milestones.year));
      if (res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getAllMilestones Warning]:", err?.message || err);
    }

    return persistentStore.getMilestones();
  }

  public async createMilestone(data: NewMilestone): Promise<Milestone> {
    const localCreated = persistentStore.saveMilestone(data as any);
    try {
      const [created] = await drizzleDb.insert(schema.milestones).values(data).returning();
      if (created) return created;
    } catch (err: any) {
      console.warn("[PostgreSQL createMilestone Warning]:", err?.message || err);
    }
    return localCreated;
  }

  public async updateMilestone(id: number, data: Partial<NewMilestone>): Promise<Milestone | null> {
    const localUpdated = persistentStore.saveMilestone({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.milestones)
        .set(data)
        .where(eq(schema.milestones.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateMilestone Warning]:", err?.message || err);
    }
    return localUpdated;
  }

  public async deleteMilestone(id: number): Promise<boolean> {
    const localDeleted = persistentStore.deleteMilestone(id);
    try {
      await drizzleDb.delete(schema.milestones).where(eq(schema.milestones.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteMilestone Warning]:", err?.message || err);
    }
    return localDeleted;
  }

  // --- Site Settings ---
  public async getAllSettings(): Promise<SiteSetting[]> {
    try {
      const res = await drizzleDb.select().from(schema.siteSettings);
      if (res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getAllSettings Warning]:", err?.message || err);
    }

    return persistentStore.getSiteSettings();
  }

  public async getSetting(key: string): Promise<string | null> {
    try {
      const [res] = await drizzleDb
        .select()
        .from(schema.siteSettings)
        .where(eq(schema.siteSettings.settingKey, key));
      if (res) return res.settingValue;
    } catch (err: any) {
      console.warn(`[PostgreSQL getSetting(${key}) Warning]:`, err?.message || err);
    }

    const fallback = persistentStore.getSiteSettings().find((s) => s.settingKey === key);
    return fallback ? fallback.settingValue : null;
  }

  public async updateSetting(key: string, value: string): Promise<SiteSetting | null> {
    const localSaved = persistentStore.updateSiteSetting(key, value);
    try {
      const [existing] = await drizzleDb
        .select()
        .from(schema.siteSettings)
        .where(eq(schema.siteSettings.settingKey, key));

      if (existing) {
        const [updated] = await drizzleDb
          .update(schema.siteSettings)
          .set({ settingValue: value, updatedAt: new Date() })
          .where(eq(schema.siteSettings.settingKey, key))
          .returning();
        if (updated) return updated;
      } else {
        const [created] = await drizzleDb
          .insert(schema.siteSettings)
          .values({
            settingKey: key,
            settingValue: value,
            updatedAt: new Date(),
          })
          .returning();
        if (created) return created;
      }
    } catch (err: any) {
      console.error(`[PostgreSQL updateSetting(${key}) Error]:`, err?.message || err);
    }
    return localSaved;
  }

  // --- WordPress-Style Custom Pages CRUD ---
  public async getAllPages(): Promise<CustomPage[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.customPages)
        .orderBy(asc(schema.customPages.id));
      if (res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getAllPages Warning]:", err?.message || err);
    }
    return persistentStore.getCustomPages();
  }

  public async getPageBySlug(slug: string): Promise<CustomPage | null> {
    const normalized = slug.trim().toLowerCase();
    try {
      const [page] = await drizzleDb
        .select()
        .from(schema.customPages)
        .where(eq(schema.customPages.slug, normalized));
      if (page) return page;
    } catch (err: any) {
      console.warn(`[PostgreSQL getPageBySlug(${normalized}) Warning]:`, err?.message || err);
    }
    return persistentStore.getCustomPageBySlug(normalized);
  }

  public async savePage(
    slug: string,
    payload: {
      title?: string;
      metaDescription?: string;
      sectionsJson?: string;
      status?: string;
      isSystemPage?: boolean;
    },
  ): Promise<CustomPage> {
    const normalized = slug.trim().toLowerCase();
    const localSaved = persistentStore.saveCustomPage(normalized, payload);

    try {
      const [existing] = await drizzleDb
        .select()
        .from(schema.customPages)
        .where(eq(schema.customPages.slug, normalized));

      if (existing) {
        const [updated] = await drizzleDb
          .update(schema.customPages)
          .set({
            ...payload,
            updatedAt: new Date(),
          })
          .where(eq(schema.customPages.slug, normalized))
          .returning();
        if (updated) return updated;
      } else {
        const [created] = await drizzleDb
          .insert(schema.customPages)
          .values({
            slug: normalized,
            title: payload.title || `Page - ${normalized}`,
            metaDescription: payload.metaDescription || null,
            sectionsJson: payload.sectionsJson || "[]",
            status: payload.status || "published",
            isSystemPage: payload.isSystemPage || false,
            updatedAt: new Date(),
          })
          .returning();
        if (created) return created;
      }
    } catch (err: any) {
      console.warn(`[PostgreSQL savePage(${normalized}) Warning]:`, err?.message || err);
    }

    return localSaved;
  }

  public async resetPageToDefault(slug: string): Promise<CustomPage | null> {
    const normalized = slug.trim().toLowerCase();
    const resetLocal = persistentStore.resetCustomPageToDefault(normalized);
    if (!resetLocal) return null;

    try {
      await drizzleDb
        .update(schema.customPages)
        .set({
          title: resetLocal.title,
          metaDescription: resetLocal.metaDescription,
          sectionsJson: resetLocal.sectionsJson,
          status: resetLocal.status,
          updatedAt: new Date(),
        })
        .where(eq(schema.customPages.slug, normalized));
    } catch (err: any) {
      console.warn(`[PostgreSQL resetPageToDefault(${normalized}) Warning]:`, err?.message || err);
    }

    return resetLocal;
  }

  public async deletePage(slug: string): Promise<boolean> {
    const normalized = slug.trim().toLowerCase();
    const localDeleted = persistentStore.deleteCustomPage(normalized);
    try {
      await drizzleDb
        .delete(schema.customPages)
        .where(and(eq(schema.customPages.slug, normalized), eq(schema.customPages.isSystemPage, false)));
    } catch (err: any) {
      console.warn(`[PostgreSQL deletePage(${normalized}) Warning]:`, err?.message || err);
    }
    return localDeleted;
  }


  // --- Dashboard Aggregations ---
  public async getDashboardMetrics() {
    const allDonations = await this.getAllDonations();
    const allInquiries = await this.getAllInquiries();
    const allNews = await this.getAllNews(false);
    const allSubscribers = await this.getAllSubscribers();
    const allReports = await this.getAllReports();

    const totalDonationsNu = allDonations
      .filter((d) => d.status === "COMPLETED" || d.status === "VERIFIED")
      .reduce((sum, d) => sum + d.amountNu, 0);

    const pendingDonationsCount = allDonations.filter((d) => d.status === "PENDING").length;
    const unreadInquiriesCount = allInquiries.filter((iq) => iq.status === "UNREAD").length;
    const publishedNewsCount = allNews.filter((n) => n.isPublished).length;
    const activeSubscribersCount = allSubscribers.filter((s) => s.isActive).length;
    const totalReportsCount = allReports.length;

    // Compute genuine monthly statistics dynamically from real database donations
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth();

    const monthlyMap = new Map<string, { amount: number; donors: number }>();
    for (let i = 0; i <= currentMonthIndex; i++) {
      monthlyMap.set(months[i], { amount: 0, donors: 0 });
    }

    allDonations.forEach((d) => {
      const dDate = new Date(d.createdAt);
      if (
        dDate.getFullYear() === currentYear &&
        (d.status === "COMPLETED" || d.status === "VERIFIED")
      ) {
        const mName = months[dDate.getMonth()];
        const entry = monthlyMap.get(mName);
        if (entry) {
          entry.amount += d.amountNu;
          entry.donors += 1;
        }
      }
    });

    const monthlyStats = Array.from(monthlyMap.entries()).map(([month, stats]) => ({
      month,
      amount: stats.amount,
      donors: stats.donors,
    }));

    return {
      totalDonationsNu,
      pendingDonationsCount,
      unreadInquiriesCount,
      publishedNewsCount,
      activeSubscribersCount,
      totalReportsCount,
      monthlyStats,
      recentDonations: allDonations.slice(0, 5),
      recentInquiries: allInquiries.slice(0, 5),
    };
  }

  // --- Sessions Management ---
  public async createSession(
    userId: number,
    tokenHash: string,
    ipAddress?: string,
    userAgent?: string,
    expiresAt?: Date,
  ): Promise<UserSession> {
    const exp = expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const [session] = await drizzleDb
      .insert(schema.userSessions)
      .values({
        userId,
        tokenHash,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        expiresAt: exp,
        isActive: true,
      })
      .returning();
    return session;
  }

  public async findSessionByTokenHash(
    tokenHash: string,
  ): Promise<{ session: UserSession; user: User } | null> {
    try {
      const rows = await drizzleDb
        .select({
          session: schema.userSessions,
          user: schema.users,
        })
        .from(schema.userSessions)
        .innerJoin(schema.users, eq(schema.userSessions.userId, schema.users.id))
        .where(
          and(
            eq(schema.userSessions.tokenHash, tokenHash),
            eq(schema.userSessions.isActive, true),
            gt(schema.userSessions.expiresAt, new Date()),
            eq(schema.users.isActive, true),
          ),
        );

      if (rows.length > 0) {
        return rows[0];
      }
    } catch (err: any) {
      console.warn("[PostgreSQL findSessionByTokenHash Warning]:", err?.message || err);
    }
    return null;
  }

  public async revokeSession(sessionId: number): Promise<boolean> {
    const [updated] = await drizzleDb
      .update(schema.userSessions)
      .set({ isActive: false })
      .where(eq(schema.userSessions.id, sessionId))
      .returning();
    return !!updated;
  }

  public async revokeAllUserSessions(userId: number): Promise<boolean> {
    await drizzleDb
      .update(schema.userSessions)
      .set({ isActive: false })
      .where(eq(schema.userSessions.userId, userId));
    return true;
  }

  public async getActiveSessionsForUser(userId: number): Promise<UserSession[]> {
    return await drizzleDb
      .select()
      .from(schema.userSessions)
      .where(
        and(
          eq(schema.userSessions.userId, userId),
          eq(schema.userSessions.isActive, true),
          gt(schema.userSessions.expiresAt, new Date()),
        ),
      )
      .orderBy(desc(schema.userSessions.createdAt));
  }

  // --- Audit Logging & System Events ---
  public async logAuditEvent(data: {
    userId?: number | null;
    userEmail: string;
    action: string;
    entity: string;
    entityId?: string | null;
    details?: string | null;
    oldValue?: string | null;
    newValue?: string | null;
    reason?: string | null;
    ipAddress?: string | null;
    userAgent?: string | null;
  }): Promise<void> {
    try {
      await drizzleDb.insert(schema.auditLogs).values({
        userId: data.userId || null,
        userEmail: data.userEmail,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId || null,
        details: data.details || null,
        oldValue: data.oldValue || null,
        newValue: data.newValue || null,
        reason: data.reason || null,
        ipAddress: data.ipAddress || null,
        userAgent: data.userAgent || null,
      });
    } catch (err: any) {
      console.warn("[PostgreSQL logAuditEvent Warning]:", err?.message || err);
    }
  }

  public async getAuditLogs(limit = 100, offset = 0): Promise<AuditLog[]> {
    try {
      return await drizzleDb
        .select()
        .from(schema.auditLogs)
        .orderBy(desc(schema.auditLogs.createdAt))
        .limit(limit)
        .offset(offset);
    } catch (err: any) {
      console.warn("[PostgreSQL getAuditLogs Warning]:", err?.message || err);
      return [];
    }
  }

  public async logSystemEvent(
    eventType: string,
    message: string,
    metadata?: string,
  ): Promise<void> {
    try {
      await drizzleDb.insert(schema.systemEvents).values({
        eventType,
        message,
        metadata: metadata || null,
      });
    } catch (err: any) {
      console.warn("[PostgreSQL logSystemEvent Warning]:", err?.message || err);
    }
  }

  public async getSystemEvents(limit = 100): Promise<SystemEvent[]> {
    try {
      return await drizzleDb
        .select()
        .from(schema.systemEvents)
        .orderBy(desc(schema.systemEvents.createdAt))
        .limit(limit);
    } catch (err: any) {
      console.warn("[PostgreSQL getSystemEvents Warning]:", err?.message || err);
      return [];
    }
  }

  // --- User Management & Security Lockouts ---
  public async recordFailedLoginAttempt(
    email: string,
  ): Promise<{ locked: boolean; lockedUntil: Date | null; attempts: number }> {
    const normalized = email.trim().toLowerCase();
    const [user] = await drizzleDb
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, normalized));

    if (!user) return { locked: false, lockedUntil: null, attempts: 0 };

    const attempts = (user.failedAttempts || 0) + 1;
    let lockedUntil: Date | null = null;
    let locked = false;

    if (attempts >= 5) {
      // 15-minute progressive account lockout
      lockedUntil = new Date(Date.now() + 15 * 60 * 1000);
      locked = true;
    }

    await drizzleDb
      .update(schema.users)
      .set({
        failedAttempts: attempts,
        lockedUntil,
      })
      .where(eq(schema.users.id, user.id));

    return { locked, lockedUntil, attempts };
  }

  public async resetFailedLoginAttempts(userId: number): Promise<void> {
    await drizzleDb
      .update(schema.users)
      .set({
        failedAttempts: 0,
        lockedUntil: null,
      })
      .where(eq(schema.users.id, userId));
  }

  public async hasAnySuperAdmin(): Promise<boolean> {
    try {
      const [res] = await drizzleDb
        .select({ count: sql<number>`count(*)` })
        .from(schema.users)
        .where(and(eq(schema.users.role, "SUPER_ADMIN"), eq(schema.users.isActive, true)));
      return Number(res?.count || 0) > 0;
    } catch {
      return false;
    }
  }

  public async getAllUsers(): Promise<Omit<User, "passwordHash">[]> {
    try {
      const usersList = await drizzleDb
        .select()
        .from(schema.users)
        .orderBy(desc(schema.users.createdAt));
      return usersList.map(({ passwordHash, ...u }) => u);
    } catch (err: any) {
      console.warn("[PostgreSQL getAllUsers Warning]:", err?.message || err);
      return [];
    }
  }

  public async createUser(data: {
    name: string;
    email: string;
    passwordHash: string;
    role?: string;
  }): Promise<User> {
    const [user] = await drizzleDb
      .insert(schema.users)
      .values({
        name: data.name,
        email: data.email.trim().toLowerCase(),
        passwordHash: data.passwordHash,
        role: data.role || "EDITOR",
        isActive: true,
        failedAttempts: 0,
      })
      .returning();
    return user;
  }

  public async updateUser(
    id: number,
    data: Partial<{ name: string; role: string; isActive: boolean; passwordHash: string }>,
  ): Promise<User | null> {
    const [updated] = await drizzleDb
      .update(schema.users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, id))
      .returning();
    return updated || null;
  }

  public async deleteUser(id: number): Promise<boolean> {
    const deleted = await drizzleDb.delete(schema.users).where(eq(schema.users.id, id)).returning();
    return deleted.length > 0;
  }

  // --- Procurement Steps CMS ---
  public async getProcurementSteps(): Promise<ProcurementStep[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.procurementSteps)
        .orderBy(asc(schema.procurementSteps.orderIndex));
      if (res && res.length > 0) return res;
    } catch (err: any) {
      console.warn("[PostgreSQL getProcurementSteps Warning]:", err?.message || err);
    }
    return persistentStore.getProcurementSteps();
  }

  public async createProcurementStep(data: NewProcurementStep): Promise<ProcurementStep> {
    const local = persistentStore.saveProcurementStep(data as any);
    try {
      const [step] = await drizzleDb.insert(schema.procurementSteps).values(data).returning();
      if (step) return step;
    } catch (err: any) {
      console.warn("[PostgreSQL createProcurementStep Warning]:", err?.message || err);
    }
    return local;
  }

  public async updateProcurementStep(
    id: number,
    data: Partial<NewProcurementStep>,
  ): Promise<ProcurementStep | null> {
    const local = persistentStore.saveProcurementStep({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.procurementSteps)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.procurementSteps.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateProcurementStep Warning]:", err?.message || err);
    }
    return local;
  }

  public async deleteProcurementStep(id: number): Promise<boolean> {
    const local = persistentStore.deleteProcurementStep(id);
    try {
      await drizzleDb
        .delete(schema.procurementSteps)
        .where(eq(schema.procurementSteps.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteProcurementStep Warning]:", err?.message || err);
    }
    return local;
  }


  // --- Tier 2 Financial Settings ---
  public async getFinancialSettings(): Promise<FinancialSetting> {
    try {
      const [settings] = await drizzleDb
        .select()
        .from(schema.financialSettings)
        .where(eq(schema.financialSettings.id, 1));
      if (settings) return settings;
    } catch (err: any) {
      console.warn("[PostgreSQL getFinancialSettings Warning]:", err?.message || err);
    }

    // Default institutional placeholder fallback
    return {
      id: 1,
      bankAccountBOB: "[BANK_ACCOUNT_PLACEHOLDER]", // TODO-VERIFY
      swiftCodeBOB: "[SWIFT_PLACEHOLDER]", // TODO-VERIFY
      bankName: "Bank of Bhutan Limited",
      accountTitle: "Bhutan Health Trust Fund",
      taxExemptionId: "[TAX_ID_PLACEHOLDER]", // TODO-VERIFY
      taxCertificateValid: false,
      legalSignoffBy: null,
      legalSignoffAt: null,
      legalSignoffNotes: null,
      updatedAt: new Date(),
      updatedBy: "system",
    };
  }

  public async updateFinancialSettings(
    data: Partial<NewFinancialSetting>,
    actorEmail: string,
    reason: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<FinancialSetting> {
    const current = await this.getFinancialSettings();

    const [updated] = await drizzleDb
      .update(schema.financialSettings)
      .set({
        ...data,
        updatedAt: new Date(),
        updatedBy: actorEmail,
      })
      .where(eq(schema.financialSettings.id, 1))
      .returning();

    const changedFields: string[] = [];
    const oldValues: Record<string, any> = {};
    const newValues: Record<string, any> = {};

    for (const key of Object.keys(data) as (keyof typeof data)[]) {
      if (data[key] !== undefined && (current as any)[key] !== data[key]) {
        changedFields.push(key);
        oldValues[key] = (current as any)[key];
        newValues[key] = data[key];
      }
    }

    await this.logAuditEvent({
      userEmail: actorEmail,
      action: "FINANCIAL_SETTINGS_UPDATE",
      entity: "FINANCIAL_SETTINGS",
      entityId: "1",
      details: `Updated restricted fields: ${changedFields.join(", ")}`,
      oldValue: JSON.stringify(oldValues),
      newValue: JSON.stringify(newValues),
      reason,
      ipAddress,
      userAgent,
    });

    return updated || current;
  }

  public async recordLegalSignoff(
    officerName: string,
    notes: string | undefined,
    actorEmail: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<FinancialSetting> {
    const current = await this.getFinancialSettings();
    const signoffTimestamp = new Date();

    const [updated] = await drizzleDb
      .update(schema.financialSettings)
      .set({
        legalSignoffBy: officerName,
        legalSignoffAt: signoffTimestamp,
        legalSignoffNotes: notes || null,
        updatedAt: signoffTimestamp,
        updatedBy: actorEmail,
      })
      .where(eq(schema.financialSettings.id, 1))
      .returning();

    await this.logAuditEvent({
      userEmail: actorEmail,
      action: "LEGAL_SIGNOFF",
      entity: "FINANCIAL_SETTINGS",
      entityId: "1",
      details: `Legal statutory sign-off recorded by ${officerName}. DRC exemption watermark clearance authorized.`,
      oldValue: JSON.stringify({
        legalSignoffBy: current.legalSignoffBy,
        legalSignoffAt: current.legalSignoffAt,
      }),
      newValue: JSON.stringify({
        legalSignoffBy: officerName,
        legalSignoffAt: signoffTimestamp,
        notes,
      }),
      reason: `Official legal statutory sign-off for tax certificate validity: ${notes || "Verified by authorized legal officer"}`,
      ipAddress,
      userAgent,
    });

    return updated || current;
  }

  // --- Media Gallery ---
  public async getGallery(onlyPublished = false): Promise<MediaGalleryItem[]> {
    try {
      if (onlyPublished) {
        const res = await drizzleDb
          .select()
          .from(schema.mediaGallery)
          .where(eq(schema.mediaGallery.isPublished, true))
          .orderBy(asc(schema.mediaGallery.orderIndex), desc(schema.mediaGallery.createdAt));
        if (res && res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.mediaGallery)
          .orderBy(asc(schema.mediaGallery.orderIndex), desc(schema.mediaGallery.createdAt));
        if (res && res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getGallery Error]:", err?.message || err);
    }
    const all = persistentStore.getGallery();
    return onlyPublished ? all.filter((g) => g.isPublished) : all;
  }

  public async createGalleryItem(item: NewMediaGalleryItem): Promise<MediaGalleryItem> {
    const local = persistentStore.saveGalleryItem(item as any);
    try {
      const [inserted] = await drizzleDb.insert(schema.mediaGallery).values(item).returning();
      if (inserted) return inserted;
    } catch (err: any) {
      console.warn("[PostgreSQL createGalleryItem Warning]:", err?.message || err);
    }
    return local;
  }

  public async updateGalleryItem(
    id: number,
    data: Partial<NewMediaGalleryItem>,
  ): Promise<MediaGalleryItem | null> {
    const local = persistentStore.saveGalleryItem({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.mediaGallery)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.mediaGallery.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateGalleryItem Warning]:", err?.message || err);
    }
    return local;
  }

  public async deleteGalleryItem(id: number): Promise<boolean> {
    const local = persistentStore.deleteGalleryItem(id);
    try {
      await drizzleDb
        .delete(schema.mediaGallery)
        .where(eq(schema.mediaGallery.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteGalleryItem Warning]:", err?.message || err);
    }
    return local;
  }

  // --- Media Videos ---
  public async getVideos(onlyPublished = false): Promise<MediaVideo[]> {
    try {
      if (onlyPublished) {
        const res = await drizzleDb
          .select()
          .from(schema.mediaVideos)
          .where(eq(schema.mediaVideos.isPublished, true))
          .orderBy(asc(schema.mediaVideos.orderIndex), desc(schema.mediaVideos.createdAt));
        if (res && res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.mediaVideos)
          .orderBy(asc(schema.mediaVideos.orderIndex), desc(schema.mediaVideos.createdAt));
        if (res && res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getVideos Error]:", err?.message || err);
    }
    const all = persistentStore.getVideos();
    return onlyPublished ? all.filter((v) => v.isPublished) : all;
  }

  public async createVideo(item: NewMediaVideo): Promise<MediaVideo> {
    const local = persistentStore.saveVideo(item as any);
    try {
      const [inserted] = await drizzleDb.insert(schema.mediaVideos).values(item).returning();
      if (inserted) return inserted;
    } catch (err: any) {
      console.warn("[PostgreSQL createVideo Warning]:", err?.message || err);
    }
    return local;
  }

  public async updateVideo(id: number, data: Partial<NewMediaVideo>): Promise<MediaVideo | null> {
    const local = persistentStore.saveVideo({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.mediaVideos)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.mediaVideos.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateVideo Warning]:", err?.message || err);
    }
    return local;
  }

  public async deleteVideo(id: number): Promise<boolean> {
    const local = persistentStore.deleteVideo(id);
    try {
      await drizzleDb
        .delete(schema.mediaVideos)
        .where(eq(schema.mediaVideos.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteVideo Warning]:", err?.message || err);
    }
    return local;
  }

  // --- Procurement Tenders ---
  public async getProcurementTenders(statusFilter?: string): Promise<ProcurementTender[]> {
    try {
      if (statusFilter && statusFilter !== "ALL") {
        const res = await drizzleDb
          .select()
          .from(schema.procurementTenders)
          .where(eq(schema.procurementTenders.status, statusFilter))
          .orderBy(desc(schema.procurementTenders.closingDate));
        if (res && res.length > 0) return res;
      } else {
        const res = await drizzleDb
          .select()
          .from(schema.procurementTenders)
          .orderBy(desc(schema.procurementTenders.closingDate));
        if (res && res.length > 0) return res;
      }
    } catch (err: any) {
      console.warn("[PostgreSQL getProcurementTenders Error]:", err?.message || err);
    }
    const all = persistentStore.getProcurementTenders();
    return statusFilter && statusFilter !== "ALL"
      ? all.filter((t) => t.status === statusFilter)
      : all;
  }

  public async createProcurementTender(item: NewProcurementTender): Promise<ProcurementTender> {
    const local = persistentStore.saveProcurementTender(item as any);
    try {
      const [inserted] = await drizzleDb.insert(schema.procurementTenders).values(item).returning();
      if (inserted) return inserted;
    } catch (err: any) {
      console.warn("[PostgreSQL createProcurementTender Warning]:", err?.message || err);
    }
    return local;
  }

  public async updateProcurementTender(
    id: number,
    data: Partial<NewProcurementTender>,
  ): Promise<ProcurementTender | null> {
    const local = persistentStore.saveProcurementTender({ ...data, id } as any);
    try {
      const [updated] = await drizzleDb
        .update(schema.procurementTenders)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.procurementTenders.id, id))
        .returning();
      if (updated) return updated;
    } catch (err: any) {
      console.warn("[PostgreSQL updateProcurementTender Warning]:", err?.message || err);
    }
    return local;
  }

  public async deleteProcurementTender(id: number): Promise<boolean> {
    const local = persistentStore.deleteProcurementTender(id);
    try {
      await drizzleDb
        .delete(schema.procurementTenders)
        .where(eq(schema.procurementTenders.id, id));
    } catch (err: any) {
      console.warn("[PostgreSQL deleteProcurementTender Warning]:", err?.message || err);
    }
    return local;
  }


  // --- Payment Gateways & Fiduciary APIs ---
  public async getPaymentGateways(): Promise<PaymentGateway[]> {
    try {
      const res = await drizzleDb
        .select()
        .from(schema.paymentGateways)
        .orderBy(asc(schema.paymentGateways.gatewayKey));
      return res || [];
    } catch (err: any) {
      console.warn("[PostgreSQL getPaymentGateways Error]:", err?.message || err);
      return [];
    }
  }

  public async getPaymentGateway(gatewayKey: string): Promise<PaymentGateway | null> {
    try {
      const [gw] = await drizzleDb
        .select()
        .from(schema.paymentGateways)
        .where(eq(schema.paymentGateways.gatewayKey, gatewayKey));
      return gw || null;
    } catch (err: any) {
      console.warn("[PostgreSQL getPaymentGateway Error]:", err?.message || err);
      return null;
    }
  }

  public async updatePaymentGateway(
    gatewayKey: string,
    data: Partial<NewPaymentGateway>,
    actorEmail: string,
    reason: string,
  ): Promise<PaymentGateway> {
    const payload: Partial<NewPaymentGateway> = {
      ...data,
      updatedAt: new Date(),
      updatedBy: actorEmail,
    };

    const [updated] = await drizzleDb
      .insert(schema.paymentGateways)
      .values({
        gatewayKey,
        name: data.name || gatewayKey,
        isEnabled: data.isEnabled ?? false,
        isLiveMode: data.isLiveMode ?? false,
        keyId: data.keyId ?? null,
        keySecret: data.keySecret ?? null,
        webhookSecret: data.webhookSecret ?? null,
        merchantId: data.merchantId ?? null,
        terminalId: data.terminalId ?? null,
        gatewayUrl: data.gatewayUrl ?? null,
        currency: data.currency || "BTN",
        updatedAt: new Date(),
        updatedBy: actorEmail,
      })
      .onConflictDoUpdate({
        target: schema.paymentGateways.gatewayKey,
        set: payload,
      })
      .returning();

    await this.logAuditEvent({
      userEmail: actorEmail,
      action: "UPDATE",
      entity: "PAYMENT_GATEWAY",
      entityId: gatewayKey,
      details: `Updated gateway ${gatewayKey} fields: ${Object.keys(data).join(", ")}`,
      reason,
    });

    return updated;
  }

  // --- Data Hygiene & Purge Demo Records ---
  public async purgeDemoData(actorEmail: string, reason: string) {
    try {
      const deletedDonations = await drizzleDb
        .delete(schema.donations)
        .where(
          sql`${schema.donations.referenceNo} IN ('BHTF-DON-928174', 'BHTF-DON-741920', 'BHTF-DON-551029', 'BHTF-DON-318492') OR ${schema.donations.donorName} ILIKE '%test%' OR ${schema.donations.donorEmail} ILIKE '%@druknet.bt%' OR ${schema.donations.donorEmail} ILIKE '%anonymous@bhutan.bt%'`
        )
        .returning();

      const deletedInquiries = await drizzleDb
        .delete(schema.inquiries)
        .where(
          sql`${schema.inquiries.email} IN ('stobgay@moh.gov.bt', 'rachel.higgins@globalhealth.org', 'upelzom@bhutanfound.bt') OR ${schema.inquiries.name} ILIKE '%test%'`
        )
        .returning();

      const deletedSubscribers = await drizzleDb
        .delete(schema.subscribers)
        .where(
          sql`${schema.subscribers.email} IN ('info@drukhealth.bt', 'sangay.c@rub.edu.bt', 'pema.choden@undp.org', 'tshering.penjor@bhtf.bt')`
        )
        .returning();

      await this.logAuditEvent({
        userEmail: actorEmail,
        action: "DELETE",
        entity: "DATA_HYGIENE",
        entityId: "DEMO_DATA_PURGE",
        details: `Purged demo data: ${deletedDonations.length} donations, ${deletedInquiries.length} inquiries, ${deletedSubscribers.length} subscribers`,
        reason,
      });

      return {
        deletedDonations: deletedDonations.length,
        deletedInquiries: deletedInquiries.length,
        deletedSubscribers: deletedSubscribers.length,
      };
    } catch (err: any) {
      console.error("[PostgreSQL purgeDemoData Error]:", err?.message || err);
      throw new Error(`Failed to purge demo data: ${err?.message || err}`);
    }
  }
}

// Global Singleton for BHTF Data Store
export const db = new BHTFDataStore();

// Trigger idempotent schema check on initialization
ensureDatabaseSchema().catch(() => {});
