import fs from "node:fs";
import path from "node:path";
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
import { defaultCorePages } from "./default-pages";
import type {
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
  CustomPage,
  MediaGalleryItem,
  MediaVideo,
  ProcurementStep,
  ProcurementTender,
} from "./schema";

interface StoreData {
  news: NewsArticle[];
  reports: Report[];
  policies: Policy[];
  programs: Program[];
  trustees: Trustee[];
  faqs: Faq[];
  impactMetrics: ImpactMetric[];
  milestones: Milestone[];
  siteSettings: SiteSetting[];
  customPages: CustomPage[];
  mediaGallery: MediaGalleryItem[];
  mediaVideos: MediaVideo[];
  procurementSteps: ProcurementStep[];
  procurementTenders: ProcurementTender[];
  donations: Donation[];
  inquiries: Inquiry[];
  subscribers: Subscriber[];
}

class PersistentStore {
  private dataDir: string;
  private filePath: string;
  private data: StoreData | null = null;
  private initialized = false;

  constructor() {
    this.dataDir = path.resolve(process.cwd(), ".data");
    this.filePath = path.resolve(this.dataDir, "bhtf-store.json");
  }

  private init() {
    if (this.initialized && this.data) return;

    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }

      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, "utf-8");
        const parsed = JSON.parse(raw);
        this.data = this.ensureDefaultCollections(parsed);
      } else {
        this.data = this.buildInitialData();
        this.persist();
      }
    } catch (err) {
      console.warn("[PersistentStore Init Warning]:", err);
      this.data = this.buildInitialData();
    }

    this.initialized = true;
  }

  private persist() {
    if (!this.data) return;
    try {
      if (!fs.existsSync(this.dataDir)) {
        fs.mkdirSync(this.dataDir, { recursive: true });
      }
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.warn("[PersistentStore Persist Warning]:", err);
    }
  }

  private buildInitialData(): StoreData {
    const now = new Date();

    const news: NewsArticle[] = initialNewsArticles.map((n, idx) => ({
      id: idx + 1,
      slug: n.slug || `article-${idx + 1}`,
      title: n.title,
      category: n.category || "General",
      author: n.author || "BHTF Media",
      coverImage: n.coverImage,
      excerpt: n.excerpt,
      content: n.content,
      isPublished: n.isPublished !== undefined ? n.isPublished : true,
      viewsCount: n.viewsCount || 100,
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
    }));

    const reports: Report[] = initialReports.map((r, idx) => ({
      id: idx + 1,
      title: r.title,
      year: r.year,
      category: r.category || "Annual Report",
      fileUrl: r.fileUrl,
      fileSize: r.fileSize || "2.5 MB",
      downloadCount: r.downloadCount || 50,
      description: r.description,
      createdAt: now,
    }));

    const policies: Policy[] = initialPolicies.map((p, idx) => ({
      id: idx + 1,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      content: p.content,
      fileUrl: p.fileUrl || null,
      category: p.category || "Governance",
      effectiveDate: p.effectiveDate || "2024",
      createdAt: now,
      updatedAt: now,
    }));

    const programs: Program[] = initialPrograms.map((pr, idx) => ({
      id: idx + 1,
      slug: pr.slug,
      title: pr.title,
      summary: pr.summary,
      fullDescription: pr.fullDescription,
      icon: pr.icon || "Pill",
      targetDzongkhags: pr.targetDzongkhags || "All 20 Dzongkhags",
      beneficiariesReached: pr.beneficiariesReached || "780,000+ citizens",
      status: pr.status || "ACTIVE",
      createdAt: now,
    }));

    const trustees: Trustee[] = initialTrustees.map((t, idx) => ({
      id: idx + 1,
      name: t.name,
      role: t.role,
      organization: t.organization,
      badge: t.badge || "Trustee",
      bio: t.bio,
      photoUrl: t.photoUrl || null,
      orderIndex: t.orderIndex || idx + 1,
      isActive: t.isActive !== undefined ? t.isActive : true,
      createdAt: now,
    }));

    const faqs: Faq[] = initialFaqs.map((f, idx) => ({
      id: idx + 1,
      question: f.question,
      answer: f.answer,
      category: f.category || "General",
      orderIndex: f.orderIndex || idx + 1,
      isPublished: f.isPublished !== undefined ? f.isPublished : true,
      createdAt: now,
    }));

    const impactMetrics: ImpactMetric[] = initialImpactMetrics.map((m, idx) => ({
      id: idx + 1,
      label: m.label,
      value: m.value,
      description: m.description,
      icon: m.icon || "Users",
      badge: m.badge || "Verified",
      orderIndex: m.orderIndex || idx + 1,
      isActive: m.isActive !== undefined ? m.isActive : true,
      createdAt: now,
    }));

    const milestones: Milestone[] = initialMilestones.map((ms, idx) => ({
      id: idx + 1,
      year: ms.year,
      title: ms.title,
      description: ms.description,
      orderIndex: ms.orderIndex || idx + 1,
      createdAt: now,
    }));

    const siteSettings: SiteSetting[] = initialSiteSettings.map((s, idx) => ({
      id: idx + 1,
      settingKey: s.settingKey,
      settingValue: s.settingValue,
      category: s.category || "general",
      description: s.description || null,
      updatedAt: now,
    }));

    const customPages: CustomPage[] = defaultCorePages.map((dp, idx) => ({
      id: idx + 1,
      slug: dp.slug,
      title: dp.title,
      metaDescription: dp.metaDescription,
      sectionsJson: JSON.stringify(dp.sections),
      status: "published",
      isSystemPage: dp.isSystemPage,
      createdAt: now,
      updatedAt: now,
    }));

    const donations: Donation[] = initialDonations.map((d, idx) => ({
      id: idx + 1,
      referenceNo: d.referenceNo,
      donorName: d.donorName,
      donorEmail: d.donorEmail,
      donorPhone: d.donorPhone || null,
      amountNu: d.amountNu,
      currency: d.currency || "BTN",
      paymentMethod: d.paymentMethod,
      status: d.status || "PENDING",
      message: d.message || null,
      isAnonymous: d.isAnonymous || false,
      gatewayTransactionId: null,
      gatewaySessionId: null,
      gatewayStatus: null,
      paymentMetadata: null,
      completedAt: d.status === "COMPLETED" ? now : null,
      createdAt: now,
    }));

    const inquiries: Inquiry[] = initialInquiries.map((iq, idx) => ({
      id: idx + 1,
      name: iq.name,
      email: iq.email,
      subject: iq.subject,
      message: iq.message,
      status: iq.status || "UNREAD",
      replyNotes: iq.replyNotes || null,
      channel: iq.channel || "WEB",
      loggedBy: null,
      createdAt: now,
    }));

    const subscribers: Subscriber[] = initialSubscribers.map((sb, idx) => ({
      id: idx + 1,
      email: sb.email,
      isActive: sb.isActive !== undefined ? sb.isActive : true,
      subscribedAt: now,
    }));

    return {
      news,
      reports,
      policies,
      programs,
      trustees,
      faqs,
      impactMetrics,
      milestones,
      siteSettings,
      customPages,
      mediaGallery: [],
      mediaVideos: [],
      procurementSteps: [],
      procurementTenders: [],
      donations,
      inquiries,
      subscribers,
    };
  }

  private ensureDefaultCollections(parsed: any): StoreData {
    const fresh = this.buildInitialData();
    return {
      news: parsed.news?.length ? parsed.news : fresh.news,
      reports: parsed.reports?.length ? parsed.reports : fresh.reports,
      policies: parsed.policies?.length ? parsed.policies : fresh.policies,
      programs: parsed.programs?.length ? parsed.programs : fresh.programs,
      trustees: parsed.trustees?.length ? parsed.trustees : fresh.trustees,
      faqs: parsed.faqs?.length ? parsed.faqs : fresh.faqs,
      impactMetrics: parsed.impactMetrics?.length ? parsed.impactMetrics : fresh.impactMetrics,
      milestones: parsed.milestones?.length ? parsed.milestones : fresh.milestones,
      siteSettings: parsed.siteSettings?.length ? parsed.siteSettings : fresh.siteSettings,
      customPages: parsed.customPages?.length ? parsed.customPages : fresh.customPages,
      mediaGallery: parsed.mediaGallery || [],
      mediaVideos: parsed.mediaVideos || [],
      procurementSteps: parsed.procurementSteps || [],
      procurementTenders: parsed.procurementTenders || [],
      donations: parsed.donations || fresh.donations,
      inquiries: parsed.inquiries || fresh.inquiries,
      subscribers: parsed.subscribers || fresh.subscribers,
    };
  }

  // --- Collection Accessors ---

  public getNews(): NewsArticle[] {
    this.init();
    return this.data!.news;
  }
  public saveNews(article: NewsArticle): NewsArticle {
    this.init();
    const existingIdx = this.data!.news.findIndex((a) => a.id === article.id || a.slug === article.slug);
    if (existingIdx >= 0) {
      this.data!.news[existingIdx] = { ...this.data!.news[existingIdx], ...article, updatedAt: new Date() };
      this.persist();
      return this.data!.news[existingIdx];
    }
    const nextId = Math.max(0, ...this.data!.news.map((a) => a.id)) + 1;
    const created: NewsArticle = { ...article, id: nextId, createdAt: new Date(), updatedAt: new Date() };
    this.data!.news.unshift(created);
    this.persist();
    return created;
  }
  public deleteNews(id: number): boolean {
    this.init();
    const lenBefore = this.data!.news.length;
    this.data!.news = this.data!.news.filter((a) => a.id !== id);
    this.persist();
    return this.data!.news.length < lenBefore;
  }

  public getReports(): Report[] {
    this.init();
    return this.data!.reports;
  }
  public saveReport(report: Partial<Report> & { title: string }): Report {
    this.init();
    if (report.id) {
      const idx = this.data!.reports.findIndex((r) => r.id === report.id);
      if (idx >= 0) {
        this.data!.reports[idx] = { ...this.data!.reports[idx], ...report };
        this.persist();
        return this.data!.reports[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.reports.map((r) => r.id)) + 1;
    const created: Report = {
      id: nextId,
      title: report.title,
      year: report.year || new Date().getFullYear().toString(),
      category: report.category || "Annual Report",
      fileUrl: report.fileUrl || "/reports/sample.pdf",
      fileSize: report.fileSize || "2.5 MB",
      downloadCount: report.downloadCount || 0,
      description: report.description || "",
      createdAt: new Date(),
    };
    this.data!.reports.unshift(created);
    this.persist();
    return created;
  }
  public deleteReport(id: number): boolean {
    this.init();
    const lenBefore = this.data!.reports.length;
    this.data!.reports = this.data!.reports.filter((r) => r.id !== id);
    this.persist();
    return this.data!.reports.length < lenBefore;
  }

  public getPolicies(): Policy[] {
    this.init();
    return this.data!.policies;
  }
  public savePolicy(policy: Partial<Policy> & { title: string }): Policy {
    this.init();
    if (policy.id) {
      const idx = this.data!.policies.findIndex((p) => p.id === policy.id);
      if (idx >= 0) {
        this.data!.policies[idx] = { ...this.data!.policies[idx], ...policy, updatedAt: new Date() };
        this.persist();
        return this.data!.policies[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.policies.map((p) => p.id)) + 1;
    const created: Policy = {
      id: nextId,
      title: policy.title,
      slug: policy.slug || policy.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary: policy.summary || "",
      content: policy.content || "",
      fileUrl: policy.fileUrl || null,
      category: policy.category || "Governance",
      effectiveDate: policy.effectiveDate || "2024",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data!.policies.unshift(created);
    this.persist();
    return created;
  }
  public deletePolicy(id: number): boolean {
    this.init();
    const len = this.data!.policies.length;
    this.data!.policies = this.data!.policies.filter((p) => p.id !== id);
    this.persist();
    return this.data!.policies.length < len;
  }

  public getPrograms(): Program[] {
    this.init();
    return this.data!.programs;
  }
  public saveProgram(program: Partial<Program> & { title: string }): Program {
    this.init();
    if (program.id) {
      const idx = this.data!.programs.findIndex((p) => p.id === program.id);
      if (idx >= 0) {
        this.data!.programs[idx] = { ...this.data!.programs[idx], ...program };
        this.persist();
        return this.data!.programs[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.programs.map((p) => p.id)) + 1;
    const created: Program = {
      id: nextId,
      slug: program.slug || program.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: program.title,
      summary: program.summary || "",
      fullDescription: program.fullDescription || "",
      icon: program.icon || "Pill",
      targetDzongkhags: program.targetDzongkhags || "All 20 Dzongkhags",
      beneficiariesReached: program.beneficiariesReached || "780,000+ citizens",
      status: program.status || "ACTIVE",
      createdAt: new Date(),
    };
    this.data!.programs.push(created);
    this.persist();
    return created;
  }
  public deleteProgram(id: number): boolean {
    this.init();
    const len = this.data!.programs.length;
    this.data!.programs = this.data!.programs.filter((p) => p.id !== id);
    this.persist();
    return this.data!.programs.length < len;
  }

  public getTrustees(): Trustee[] {
    this.init();
    return this.data!.trustees;
  }
  public saveTrustee(t: Partial<Trustee> & { name: string }): Trustee {
    this.init();
    if (t.id) {
      const idx = this.data!.trustees.findIndex((item) => item.id === t.id);
      if (idx >= 0) {
        this.data!.trustees[idx] = { ...this.data!.trustees[idx], ...t };
        this.persist();
        return this.data!.trustees[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.trustees.map((item) => item.id)) + 1;
    const created: Trustee = {
      id: nextId,
      name: t.name,
      role: t.role || "Trustee",
      organization: t.organization || "Royal Government of Bhutan",
      badge: t.badge || "Trustee",
      bio: t.bio || "",
      photoUrl: t.photoUrl || null,
      orderIndex: t.orderIndex || nextId,
      isActive: t.isActive !== undefined ? t.isActive : true,
      createdAt: new Date(),
    };
    this.data!.trustees.push(created);
    this.persist();
    return created;
  }
  public deleteTrustee(id: number): boolean {
    this.init();
    const len = this.data!.trustees.length;
    this.data!.trustees = this.data!.trustees.filter((t) => t.id !== id);
    this.persist();
    return this.data!.trustees.length < len;
  }

  public getFaqs(): Faq[] {
    this.init();
    return this.data!.faqs;
  }
  public saveFaq(f: Partial<Faq> & { question: string; answer: string }): Faq {
    this.init();
    if (f.id) {
      const idx = this.data!.faqs.findIndex((item) => item.id === f.id);
      if (idx >= 0) {
        this.data!.faqs[idx] = { ...this.data!.faqs[idx], ...f };
        this.persist();
        return this.data!.faqs[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.faqs.map((item) => item.id)) + 1;
    const created: Faq = {
      id: nextId,
      question: f.question,
      answer: f.answer,
      category: f.category || "General",
      orderIndex: f.orderIndex || nextId,
      isPublished: f.isPublished !== undefined ? f.isPublished : true,
      createdAt: new Date(),
    };
    this.data!.faqs.push(created);
    this.persist();
    return created;
  }
  public deleteFaq(id: number): boolean {
    this.init();
    const len = this.data!.faqs.length;
    this.data!.faqs = this.data!.faqs.filter((item) => item.id !== id);
    this.persist();
    return this.data!.faqs.length < len;
  }

  public getImpactMetrics(): ImpactMetric[] {
    this.init();
    return this.data!.impactMetrics;
  }
  public saveImpactMetric(m: Partial<ImpactMetric> & { label: string; value: string }): ImpactMetric {
    this.init();
    if (m.id) {
      const idx = this.data!.impactMetrics.findIndex((item) => item.id === m.id);
      if (idx >= 0) {
        this.data!.impactMetrics[idx] = { ...this.data!.impactMetrics[idx], ...m };
        this.persist();
        return this.data!.impactMetrics[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.impactMetrics.map((item) => item.id)) + 1;
    const created: ImpactMetric = {
      id: nextId,
      label: m.label,
      value: m.value,
      description: m.description || "",
      icon: m.icon || "Users",
      badge: m.badge || "Verified",
      orderIndex: m.orderIndex || nextId,
      isActive: m.isActive !== undefined ? m.isActive : true,
      createdAt: new Date(),
    };
    this.data!.impactMetrics.push(created);
    this.persist();
    return created;
  }
  public deleteImpactMetric(id: number): boolean {
    this.init();
    const len = this.data!.impactMetrics.length;
    this.data!.impactMetrics = this.data!.impactMetrics.filter((item) => item.id !== id);
    this.persist();
    return this.data!.impactMetrics.length < len;
  }

  public getMilestones(): Milestone[] {
    this.init();
    return this.data!.milestones;
  }
  public saveMilestone(ms: Partial<Milestone> & { year: string; title: string }): Milestone {
    this.init();
    if (ms.id) {
      const idx = this.data!.milestones.findIndex((item) => item.id === ms.id);
      if (idx >= 0) {
        this.data!.milestones[idx] = { ...this.data!.milestones[idx], ...ms };
        this.persist();
        return this.data!.milestones[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.milestones.map((item) => item.id)) + 1;
    const created: Milestone = {
      id: nextId,
      year: ms.year,
      title: ms.title,
      description: ms.description || "",
      orderIndex: ms.orderIndex || nextId,
      createdAt: new Date(),
    };
    this.data!.milestones.push(created);
    this.persist();
    return created;
  }
  public deleteMilestone(id: number): boolean {
    this.init();
    const len = this.data!.milestones.length;
    this.data!.milestones = this.data!.milestones.filter((item) => item.id !== id);
    this.persist();
    return this.data!.milestones.length < len;
  }

  public getSiteSettings(): SiteSetting[] {
    this.init();
    return this.data!.siteSettings;
  }
  public updateSiteSetting(key: string, value: string): SiteSetting {
    this.init();
    const idx = this.data!.siteSettings.findIndex((s) => s.settingKey === key);
    if (idx >= 0) {
      this.data!.siteSettings[idx] = {
        ...this.data!.siteSettings[idx],
        settingValue: value,
        updatedAt: new Date(),
      };
      this.persist();
      return this.data!.siteSettings[idx];
    }
    const nextId = Math.max(0, ...this.data!.siteSettings.map((s) => s.id)) + 1;
    const created: SiteSetting = {
      id: nextId,
      settingKey: key,
      settingValue: value,
      category: "general",
      description: null,
      updatedAt: new Date(),
    };
    this.data!.siteSettings.push(created);
    this.persist();
    return created;
  }

  // --- WordPress-Style Custom Pages CRUD ---
  public getCustomPages(): CustomPage[] {
    this.init();
    return this.data!.customPages;
  }

  public getCustomPageBySlug(slug: string): CustomPage | null {
    this.init();
    const normalized = slug.trim().toLowerCase();
    const found = this.data!.customPages.find((p) => p.slug.toLowerCase() === normalized);
    return found || null;
  }

  public saveCustomPage(
    slug: string,
    payload: {
      title?: string;
      metaDescription?: string;
      sectionsJson?: string;
      status?: string;
      isSystemPage?: boolean;
    },
  ): CustomPage {
    this.init();
    const normalized = slug.trim().toLowerCase();
    const idx = this.data!.customPages.findIndex((p) => p.slug.toLowerCase() === normalized);

    if (idx >= 0) {
      const updated: CustomPage = {
        ...this.data!.customPages[idx],
        ...payload,
        updatedAt: new Date(),
      };
      this.data!.customPages[idx] = updated;
      this.persist();
      return updated;
    }

    const nextId = Math.max(0, ...this.data!.customPages.map((p) => p.id)) + 1;
    const created: CustomPage = {
      id: nextId,
      slug: normalized,
      title: payload.title || `Page - ${normalized}`,
      metaDescription: payload.metaDescription || null,
      sectionsJson: payload.sectionsJson || "[]",
      status: payload.status || "published",
      isSystemPage: payload.isSystemPage || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data!.customPages.push(created);
    this.persist();
    return created;
  }

  public resetCustomPageToDefault(slug: string): CustomPage | null {
    this.init();
    const normalized = slug.trim().toLowerCase();
    const def = defaultCorePages.find((dp) => dp.slug.toLowerCase() === normalized);
    if (!def) return null;

    return this.saveCustomPage(normalized, {
      title: def.title,
      metaDescription: def.metaDescription,
      sectionsJson: JSON.stringify(def.sections),
      status: "published",
      isSystemPage: def.isSystemPage,
    });
  }

  public deleteCustomPage(slug: string): boolean {
    this.init();
    const normalized = slug.trim().toLowerCase();
    const target = this.data!.customPages.find((p) => p.slug.toLowerCase() === normalized);
    if (!target || target.isSystemPage) {
      // Prevent deleting system pages
      return false;
    }
    const len = this.data!.customPages.length;
    this.data!.customPages = this.data!.customPages.filter((p) => p.slug.toLowerCase() !== normalized);
    this.persist();
    return this.data!.customPages.length < len;
  }

  public getInquiries(): Inquiry[] {
    this.init();
    return this.data!.inquiries;
  }
  public saveInquiry(inq: Partial<Inquiry> & { name: string; email: string; subject: string; message: string }): Inquiry {
    this.init();
    const nextId = Math.max(0, ...this.data!.inquiries.map((i) => i.id)) + 1;
    const created: Inquiry = {
      id: nextId,
      name: inq.name,
      email: inq.email,
      subject: inq.subject,
      message: inq.message,
      status: inq.status || "UNREAD",
      replyNotes: inq.replyNotes || null,
      channel: inq.channel || "WEB",
      loggedBy: inq.loggedBy || null,
      createdAt: new Date(),
    };
    this.data!.inquiries.unshift(created);
    this.persist();
    return created;
  }
  public updateInquiryStatus(id: number, status: string, notes?: string): Inquiry | null {
    this.init();
    const idx = this.data!.inquiries.findIndex((i) => i.id === id);
    if (idx >= 0) {
      this.data!.inquiries[idx] = {
        ...this.data!.inquiries[idx],
        status,
        replyNotes: notes !== undefined ? notes : this.data!.inquiries[idx].replyNotes,
      };
      this.persist();
      return this.data!.inquiries[idx];
    }
    return null;
  }

  public getDonations(): Donation[] {
    this.init();
    return this.data!.donations;
  }
  public saveDonation(d: Partial<Donation> & { referenceNo: string; donorName: string; amountNu: number }): Donation {
    this.init();
    const idx = this.data!.donations.findIndex((item) => item.referenceNo === d.referenceNo);
    if (idx >= 0) {
      this.data!.donations[idx] = { ...this.data!.donations[idx], ...d };
      this.persist();
      return this.data!.donations[idx];
    }
    const nextId = Math.max(0, ...this.data!.donations.map((item) => item.id)) + 1;
    const created: Donation = {
      id: nextId,
      referenceNo: d.referenceNo,
      donorName: d.donorName,
      donorEmail: d.donorEmail || "donor@bhutan.bt",
      donorPhone: d.donorPhone || null,
      amountNu: d.amountNu,
      currency: d.currency || "BTN",
      paymentMethod: d.paymentMethod || "MBOB",
      status: d.status || "PENDING",
      message: d.message || null,
      isAnonymous: d.isAnonymous || false,
      gatewayTransactionId: d.gatewayTransactionId || null,
      gatewaySessionId: d.gatewaySessionId || null,
      gatewayStatus: d.gatewayStatus || null,
      paymentMetadata: d.paymentMetadata || null,
      completedAt: d.completedAt || null,
      createdAt: new Date(),
    };
    this.data!.donations.unshift(created);
    this.persist();
    return created;
  }

  public getSubscribers(): Subscriber[] {
    this.init();
    return this.data!.subscribers;
  }
  public addSubscriber(email: string): Subscriber {
    this.init();
    const normalized = email.trim().toLowerCase();
    const existing = this.data!.subscribers.find((s) => s.email.toLowerCase() === normalized);
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        this.persist();
      }
      return existing;
    }
    const nextId = Math.max(0, ...this.data!.subscribers.map((s) => s.id)) + 1;
    const created: Subscriber = {
      id: nextId,
      email: normalized,
      isActive: true,
      subscribedAt: new Date(),
    };
    this.data!.subscribers.push(created);
    this.persist();
    return created;
  }

  public getGallery(): MediaGalleryItem[] {
    this.init();
    return this.data!.mediaGallery;
  }
  public saveGalleryItem(item: Partial<MediaGalleryItem> & { title: string; imageUrl: string }): MediaGalleryItem {
    this.init();
    if (item.id) {
      const idx = this.data!.mediaGallery.findIndex((g) => g.id === item.id);
      if (idx >= 0) {
        this.data!.mediaGallery[idx] = { ...this.data!.mediaGallery[idx], ...item, updatedAt: new Date() };
        this.persist();
        return this.data!.mediaGallery[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.mediaGallery.map((g) => g.id)) + 1;
    const created: MediaGalleryItem = {
      id: nextId,
      title: item.title,
      category: item.category || "Field Operations",
      imageUrl: item.imageUrl,
      caption: item.caption || null,
      dzongkhag: item.dzongkhag || "All 20 Dzongkhags",
      orderIndex: item.orderIndex || nextId,
      isPublished: item.isPublished !== undefined ? item.isPublished : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data!.mediaGallery.unshift(created);
    this.persist();
    return created;
  }
  public deleteGalleryItem(id: number): boolean {
    this.init();
    const len = this.data!.mediaGallery.length;
    this.data!.mediaGallery = this.data!.mediaGallery.filter((g) => g.id !== id);
    this.persist();
    return this.data!.mediaGallery.length < len;
  }

  public getVideos(): MediaVideo[] {
    this.init();
    return this.data!.mediaVideos;
  }
  public saveVideo(v: Partial<MediaVideo> & { title: string; videoUrl: string }): MediaVideo {
    this.init();
    if (v.id) {
      const idx = this.data!.mediaVideos.findIndex((item) => item.id === v.id);
      if (idx >= 0) {
        this.data!.mediaVideos[idx] = { ...this.data!.mediaVideos[idx], ...v, updatedAt: new Date() };
        this.persist();
        return this.data!.mediaVideos[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.mediaVideos.map((item) => item.id)) + 1;
    const created: MediaVideo = {
      id: nextId,
      title: v.title,
      category: v.category || "Documentary",
      videoUrl: v.videoUrl,
      duration: v.duration || "05:00",
      thumbnailUrl: v.thumbnailUrl || null,
      description: v.description || null,
      orderIndex: v.orderIndex || nextId,
      isPublished: v.isPublished !== undefined ? v.isPublished : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data!.mediaVideos.unshift(created);
    this.persist();
    return created;
  }
  public deleteVideo(id: number): boolean {
    this.init();
    const len = this.data!.mediaVideos.length;
    this.data!.mediaVideos = this.data!.mediaVideos.filter((item) => item.id !== id);
    this.persist();
    return this.data!.mediaVideos.length < len;
  }

  public getProcurementSteps(): ProcurementStep[] {
    this.init();
    return this.data!.procurementSteps;
  }
  public saveProcurementStep(s: Partial<ProcurementStep> & { stepNumber: string; title: string; description: string }): ProcurementStep {
    this.init();
    if (s.id) {
      const idx = this.data!.procurementSteps.findIndex((item) => item.id === s.id);
      if (idx >= 0) {
        this.data!.procurementSteps[idx] = { ...this.data!.procurementSteps[idx], ...s, updatedAt: new Date() };
        this.persist();
        return this.data!.procurementSteps[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.procurementSteps.map((item) => item.id)) + 1;
    const created: ProcurementStep = {
      id: nextId,
      stepNumber: s.stepNumber,
      title: s.title,
      description: s.description,
      orderIndex: s.orderIndex || nextId,
      isActive: s.isActive !== undefined ? s.isActive : true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data!.procurementSteps.push(created);
    this.persist();
    return created;
  }
  public deleteProcurementStep(id: number): boolean {
    this.init();
    const len = this.data!.procurementSteps.length;
    this.data!.procurementSteps = this.data!.procurementSteps.filter((item) => item.id !== id);
    this.persist();
    return this.data!.procurementSteps.length < len;
  }

  public getProcurementTenders(): ProcurementTender[] {
    this.init();
    return this.data!.procurementTenders;
  }
  public saveProcurementTender(t: Partial<ProcurementTender> & { tenderNo: string; title: string; documentUrl: string; closingDate: Date }): ProcurementTender {
    this.init();
    if (t.id) {
      const idx = this.data!.procurementTenders.findIndex((item) => item.id === t.id);
      if (idx >= 0) {
        this.data!.procurementTenders[idx] = { ...this.data!.procurementTenders[idx], ...t, updatedAt: new Date() };
        this.persist();
        return this.data!.procurementTenders[idx];
      }
    }
    const nextId = Math.max(0, ...this.data!.procurementTenders.map((item) => item.id)) + 1;
    const created: ProcurementTender = {
      id: nextId,
      tenderNo: t.tenderNo,
      title: t.title,
      category: t.category || "Essential Drugs",
      status: t.status || "OPEN",
      closingDate: t.closingDate || new Date(Date.now() + 30 * 86400000),
      documentUrl: t.documentUrl,
      documentSize: t.documentSize || "1.8 MB",
      downloadCount: t.downloadCount || 0,
      description: t.description || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.data!.procurementTenders.unshift(created);
    this.persist();
    return created;
  }
  public deleteProcurementTender(id: number): boolean {
    this.init();
    const len = this.data!.procurementTenders.length;
    this.data!.procurementTenders = this.data!.procurementTenders.filter((item) => item.id !== id);
    this.persist();
    return this.data!.procurementTenders.length < len;
  }
}

export const persistentStore = new PersistentStore();

