import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  initialAdminUsers,
  initialNewsArticles,
  initialReports,
  initialPolicies,
  initialPrograms,
  initialDonations,
  initialInquiries,
  initialSubscribers,
} from "./seed-data";
import type {
  User,
  NewsArticle,
  Report,
  Policy,
  Program,
  Donation,
  Inquiry,
  Subscriber,
  NewUser,
  NewNewsArticle,
  NewReport,
  NewPolicy,
  NewProgram,
  NewDonation,
  NewInquiry,
  NewSubscriber,
} from "./schema";

/**
 * End-to-End Local JSON File + In-Memory Database Store for BHTF
 * Enables full live CRUD operations, offline demo accounts, and local persistence
 * without requiring any external live PostgreSQL server.
 */

const DB_FILE_PATH = path.resolve(process.cwd(), ".local-db-data.json");

interface PersistedState {
  users: User[];
  newsArticles: NewsArticle[];
  reports: Report[];
  policies: Policy[];
  programs: Program[];
  donations: Donation[];
  inquiries: Inquiry[];
  subscribers: Subscriber[];
}

class BHTFDataStore {
  private users: User[] = [];
  private newsArticles: NewsArticle[] = [];
  private reports: Report[] = [];
  private policies: Policy[] = [];
  private programs: Program[] = [];
  private donations: Donation[] = [];
  private inquiries: Inquiry[] = [];
  private subscribers: Subscriber[] = [];
  private initialized = false;

  constructor() {
    this.init();
  }

  private persist() {
    try {
      const state: PersistedState = {
        users: this.users,
        newsArticles: this.newsArticles,
        reports: this.reports,
        policies: this.policies,
        programs: this.programs,
        donations: this.donations,
        inquiries: this.inquiries,
        subscribers: this.subscribers,
      };
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
    } catch {
      // In-memory fallback if filesystem write is restricted
    }
  }

  public init() {
    if (this.initialized) return;

    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const raw = fs.readFileSync(DB_FILE_PATH, "utf-8");
        const parsed: PersistedState = JSON.parse(raw);
        if (parsed.users && parsed.newsArticles) {
          this.users = parsed.users;
          this.newsArticles = parsed.newsArticles;
          this.reports = parsed.reports || [];
          this.policies = parsed.policies || [];
          this.programs = parsed.programs || [];
          this.donations = parsed.donations || [];
          this.inquiries = parsed.inquiries || [];
          this.subscribers = parsed.subscribers || [];
          this.initialized = true;
          return;
        }
      }
    } catch {
      // Fallback to fresh seed
    }

    // Seed Users
    this.users = initialAdminUsers.map((u, idx) => ({
      id: idx + 1,
      name: u.name,
      email: u.email,
      passwordHash: u.passwordHash,
      role: u.role || "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Seed News Articles
    this.newsArticles = initialNewsArticles.map((n, idx) => ({
      id: idx + 1,
      slug: n.slug,
      title: n.title,
      excerpt: n.excerpt,
      content: n.content,
      coverImage: n.coverImage,
      category: n.category || "General",
      author: n.author || "BHTF Media",
      isPublished: n.isPublished ?? true,
      publishedAt: n.publishedAt || new Date(),
      viewsCount: n.viewsCount || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Seed Reports
    this.reports = initialReports.map((r, idx) => ({
      id: idx + 1,
      title: r.title,
      year: r.year,
      category: r.category || "Annual Report",
      fileUrl: r.fileUrl,
      fileSize: r.fileSize || "2.4 MB",
      description: r.description,
      downloadCount: r.downloadCount || 0,
      createdAt: new Date(),
    }));

    // Seed Policies
    this.policies = initialPolicies.map((p, idx) => ({
      id: idx + 1,
      title: p.title,
      slug: p.slug,
      summary: p.summary,
      content: p.content,
      fileUrl: p.fileUrl || null,
      category: p.category || "Governance",
      effectiveDate: p.effectiveDate || "2024",
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // Seed Programs
    this.programs = initialPrograms.map((pr, idx) => ({
      id: idx + 1,
      slug: pr.slug,
      title: pr.title,
      summary: pr.summary,
      fullDescription: pr.fullDescription,
      icon: pr.icon || "Pill",
      targetDzongkhags: pr.targetDzongkhags || "All 20 Dzongkhags",
      beneficiariesReached: pr.beneficiariesReached || "780,000+ citizens",
      status: pr.status || "ACTIVE",
      createdAt: new Date(),
    }));

    // Seed Donations
    this.donations = initialDonations.map((d, idx) => ({
      id: idx + 1,
      referenceNo: d.referenceNo,
      donorName: d.donorName,
      donorEmail: d.donorEmail,
      donorPhone: d.donorPhone || null,
      amountNu: d.amountNu,
      currency: d.currency || "BTN",
      paymentMethod: d.paymentMethod || "MBOB",
      status: d.status || "PENDING",
      message: d.message || null,
      isAnonymous: d.isAnonymous ?? false,
      createdAt: new Date(Date.now() - (idx + 1) * 86400000),
    }));

    // Seed Inquiries
    this.inquiries = initialInquiries.map((iq, idx) => ({
      id: idx + 1,
      name: iq.name,
      email: iq.email,
      subject: iq.subject,
      message: iq.message,
      status: iq.status || "UNREAD",
      replyNotes: iq.replyNotes || null,
      createdAt: new Date(Date.now() - (idx + 1) * 43200000),
    }));

    // Seed Subscribers
    this.subscribers = initialSubscribers.map((s, idx) => ({
      id: idx + 1,
      email: s.email,
      isActive: s.isActive ?? true,
      subscribedAt: new Date(Date.now() - (idx + 1) * 172800000),
    }));

    this.initialized = true;
    this.persist();
  }

  // --- Users / Auth Operations ---
  public async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public async getUserById(id: number): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  public async createUser(data: NewUser): Promise<User> {
    const newUser: User = {
      id: this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1,
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role || "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    this.persist();
    return newUser;
  }

  // --- News Articles Operations ---
  public async getAllNews(onlyPublished = true): Promise<NewsArticle[]> {
    let list = [...this.newsArticles];
    if (onlyPublished) {
      list = list.filter((n) => n.isPublished);
    }
    return list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  public async getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
    const article = this.newsArticles.find((n) => n.slug === slug);
    if (article) {
      article.viewsCount = (article.viewsCount || 0) + 1;
      this.persist();
    }
    return article;
  }

  public async createNews(data: NewNewsArticle): Promise<NewsArticle> {
    const article: NewsArticle = {
      id: this.newsArticles.length ? Math.max(...this.newsArticles.map((n) => n.id)) + 1 : 1,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage || "/src/assets/news-vaccine.jpg",
      category: data.category || "General",
      author: data.author || "BHTF Media",
      isPublished: data.isPublished ?? true,
      publishedAt: data.publishedAt || new Date(),
      viewsCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.newsArticles.unshift(article);
    this.persist();
    return article;
  }

  public async updateNews(id: number, data: Partial<NewNewsArticle>): Promise<NewsArticle | undefined> {
    const index = this.newsArticles.findIndex((n) => n.id === id);
    if (index === -1) return undefined;
    this.newsArticles[index] = {
      ...this.newsArticles[index],
      ...data,
      updatedAt: new Date(),
    };
    this.persist();
    return this.newsArticles[index];
  }

  public async deleteNews(id: number): Promise<boolean> {
    const initialLen = this.newsArticles.length;
    this.newsArticles = this.newsArticles.filter((n) => n.id !== id);
    this.persist();
    return this.newsArticles.length < initialLen;
  }

  // --- Reports Operations ---
  public async getAllReports(): Promise<Report[]> {
    return [...this.reports].sort((a, b) => b.year.localeCompare(a.year));
  }

  public async createReport(data: NewReport): Promise<Report> {
    const report: Report = {
      id: this.reports.length ? Math.max(...this.reports.map((r) => r.id)) + 1 : 1,
      title: data.title,
      year: data.year,
      category: data.category || "Annual Report",
      fileUrl: data.fileUrl || "/documents/sample-report.pdf",
      fileSize: data.fileSize || "2.4 MB",
      description: data.description,
      downloadCount: 0,
      createdAt: new Date(),
    };
    this.reports.unshift(report);
    this.persist();
    return report;
  }

  public async incrementReportDownload(id: number): Promise<void> {
    const report = this.reports.find((r) => r.id === id);
    if (report) {
      report.downloadCount = (report.downloadCount || 0) + 1;
      this.persist();
    }
  }

  public async deleteReport(id: number): Promise<boolean> {
    const initialLen = this.reports.length;
    this.reports = this.reports.filter((r) => r.id !== id);
    this.persist();
    return this.reports.length < initialLen;
  }

  // --- Policies Operations ---
  public async getAllPolicies(): Promise<Policy[]> {
    return [...this.policies];
  }

  public async createPolicy(data: NewPolicy): Promise<Policy> {
    const policy: Policy = {
      id: this.policies.length ? Math.max(...this.policies.map((p) => p.id)) + 1 : 1,
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary: data.summary,
      content: data.content,
      fileUrl: data.fileUrl || null,
      category: data.category || "Governance",
      effectiveDate: data.effectiveDate || "2024",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.policies.unshift(policy);
    this.persist();
    return policy;
  }

  public async updatePolicy(id: number, data: Partial<NewPolicy>): Promise<Policy | undefined> {
    const index = this.policies.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.policies[index] = {
      ...this.policies[index],
      ...data,
      updatedAt: new Date(),
    };
    this.persist();
    return this.policies[index];
  }

  public async deletePolicy(id: number): Promise<boolean> {
    const initialLen = this.policies.length;
    this.policies = this.policies.filter((p) => p.id !== id);
    this.persist();
    return this.policies.length < initialLen;
  }

  // --- Programs Operations ---
  public async getAllPrograms(): Promise<Program[]> {
    return [...this.programs];
  }

  // --- Donations Operations ---
  public async getAllDonations(): Promise<Donation[]> {
    return [...this.donations].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async createDonation(data: NewDonation): Promise<Donation> {
    const ref = data.referenceNo || `BHTF-DON-${Math.floor(100000 + Math.random() * 900000)}`;
    const donation: Donation = {
      id: this.donations.length ? Math.max(...this.donations.map((d) => d.id)) + 1 : 1,
      referenceNo: ref,
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donorPhone: data.donorPhone || null,
      amountNu: data.amountNu,
      currency: data.currency || "BTN",
      paymentMethod: data.paymentMethod || "MBOB",
      status: data.status || "PENDING",
      message: data.message || null,
      isAnonymous: data.isAnonymous ?? false,
      createdAt: new Date(),
    };
    this.donations.unshift(donation);
    this.persist();
    return donation;
  }

  public async updateDonationStatus(id: number, status: string): Promise<Donation | undefined> {
    const donation = this.donations.find((d) => d.id === id);
    if (donation) {
      donation.status = status;
      this.persist();
    }
    return donation;
  }

  // --- Inquiries Operations ---
  public async getAllInquiries(): Promise<Inquiry[]> {
    return [...this.inquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public async createInquiry(data: NewInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: this.inquiries.length ? Math.max(...this.inquiries.map((iq) => iq.id)) + 1 : 1,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: "UNREAD",
      replyNotes: null,
      createdAt: new Date(),
    };
    this.inquiries.unshift(inquiry);
    this.persist();
    return inquiry;
  }

  public async updateInquiryStatus(id: number, status: string, replyNotes?: string): Promise<Inquiry | undefined> {
    const inquiry = this.inquiries.find((iq) => iq.id === id);
    if (inquiry) {
      inquiry.status = status;
      if (replyNotes !== undefined) {
        inquiry.replyNotes = replyNotes;
      }
      this.persist();
    }
    return inquiry;
  }

  public async deleteInquiry(id: number): Promise<boolean> {
    const initialLen = this.inquiries.length;
    this.inquiries = this.inquiries.filter((iq) => iq.id !== id);
    this.persist();
    return this.inquiries.length < initialLen;
  }

  // --- Subscribers Operations ---
  public async getAllSubscribers(): Promise<Subscriber[]> {
    return [...this.subscribers].sort((a, b) => new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime());
  }

  public async addSubscriber(email: string): Promise<Subscriber> {
    const normalized = email.trim().toLowerCase();
    const existing = this.subscribers.find((s) => s.email.toLowerCase() === normalized);
    if (existing) {
      existing.isActive = true;
      this.persist();
      return existing;
    }
    const subscriber: Subscriber = {
      id: this.subscribers.length ? Math.max(...this.subscribers.map((s) => s.id)) + 1 : 1,
      email: normalized,
      isActive: true,
      subscribedAt: new Date(),
    };
    this.subscribers.unshift(subscriber);
    this.persist();
    return subscriber;
  }

  public async deleteSubscriber(id: number): Promise<boolean> {
    const initialLen = this.subscribers.length;
    this.subscribers = this.subscribers.filter((s) => s.id !== id);
    this.persist();
    return this.subscribers.length < initialLen;
  }

  // --- Reset Database to Initial Factory State ---
  public resetToFactoryDemo() {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        fs.unlinkSync(DB_FILE_PATH);
      }
    } catch {
      // ignore
    }
    this.initialized = false;
    this.init();
  }

  // --- Dashboard Aggregations ---
  public async getDashboardMetrics() {
    const totalDonationsNu = this.donations
      .filter((d) => d.status === "COMPLETED" || d.status === "VERIFIED")
      .reduce((sum, d) => sum + d.amountNu, 0);

    const pendingDonationsCount = this.donations.filter((d) => d.status === "PENDING").length;
    const unreadInquiriesCount = this.inquiries.filter((iq) => iq.status === "UNREAD").length;
    const publishedNewsCount = this.newsArticles.filter((n) => n.isPublished).length;
    const activeSubscribersCount = this.subscribers.filter((s) => s.isActive).length;
    const totalReportsCount = this.reports.length;

    // Monthly donation stats for charts
    const monthlyStats = [
      { month: "Jan", amount: 145000, donors: 18 },
      { month: "Feb", amount: 210000, donors: 24 },
      { month: "Mar", amount: 185000, donors: 21 },
      { month: "Apr", amount: 320000, donors: 35 },
      { month: "May", amount: 290000, donors: 28 },
      { month: "Jun", amount: 410000, donors: 42 },
      { month: "Jul", amount: 380000, donors: 39 },
      { month: "Aug", amount: totalDonationsNu > 0 ? totalDonationsNu : 450000, donors: this.donations.length + 30 },
    ];

    return {
      totalDonationsNu,
      pendingDonationsCount,
      unreadInquiriesCount,
      publishedNewsCount,
      activeSubscribersCount,
      totalReportsCount,
      monthlyStats,
      recentDonations: this.donations.slice(0, 5),
      recentInquiries: this.inquiries.slice(0, 5),
    };
  }
}

// Global Singleton for BHTF Data Store
export const db = new BHTFDataStore();
