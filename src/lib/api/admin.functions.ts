import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "../db";

// --- Dashboard Analytics ---
export const getDashboardAnalytics = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getDashboardMetrics();
});

// --- News Admin Functions ---
export const getAdminNews = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllNews(false);
});

export const createNewsArticle = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(3),
      slug: z.string().optional(),
      category: z.string().default("General"),
      excerpt: z.string().min(5),
      content: z.string().min(10),
      coverImage: z.string().default("/src/assets/news-vaccine.jpg"),
      author: z.string().default("BHTF Media"),
      isPublished: z.boolean().default(true),
    })
  )
  .handler(async ({ data }) => {
    return await db.createNews({
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: data.category,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author,
      isPublished: data.isPublished,
    });
  });

export const updateNewsArticle = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      category: z.string().optional(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      coverImage: z.string().optional(),
      isPublished: z.boolean().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateNews(id, rest);
  });

export const deleteNewsArticle = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteNews(data.id);
  });

// --- Reports Admin Functions ---
export const getAdminReports = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllReports();
});

export const createAdminReport = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(3),
      year: z.string().min(4),
      category: z.string().default("Annual Report"),
      fileUrl: z.string().min(1),
      fileSize: z.string().default("2.5 MB"),
      description: z.string().min(5),
    })
  )
  .handler(async ({ data }) => {
    return await db.createReport({
      title: data.title,
      year: data.year,
      category: data.category,
      fileUrl: data.fileUrl,
      fileSize: data.fileSize,
      description: data.description,
    });
  });

export const deleteAdminReport = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteReport(data.id);
  });

export const updateAdminReport = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      year: z.string().optional(),
      category: z.string().optional(),
      fileUrl: z.string().optional(),
      fileSize: z.string().optional(),
      description: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateReport(id, rest);
  });

// --- Policies Admin Functions ---
export const getAdminPolicies = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllPolicies();
});

export const createAdminPolicy = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(3),
      slug: z.string().optional(),
      category: z.string().default("Governance"),
      summary: z.string().min(5),
      content: z.string().min(10),
      fileUrl: z.string().optional(),
      effectiveDate: z.string().default("2024"),
    })
  )
  .handler(async ({ data }) => {
    return await db.createPolicy({
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: data.category,
      summary: data.summary,
      content: data.content,
      fileUrl: data.fileUrl,
      effectiveDate: data.effectiveDate,
    });
  });

export const updateAdminPolicy = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      category: z.string().optional(),
      summary: z.string().optional(),
      content: z.string().optional(),
      fileUrl: z.string().optional(),
      effectiveDate: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updatePolicy(id, rest);
  });

export const deleteAdminPolicy = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deletePolicy(data.id);
  });

// --- Donations Admin Functions ---
export const getAdminDonations = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllDonations();
});

export const createAdminDonation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      donorName: z.string().min(2),
      donorEmail: z.string().email(),
      donorPhone: z.string().optional(),
      amountNu: z.number().min(1),
      paymentMethod: z.enum([
        "CASH",
        "CHEQUE",
        "MBOB",
        "BNB_PAY",
        "RMA_GATEWAY",
        "BANK_TRANSFER",
        "INTERNATIONAL_CARD",
      ]),
      status: z.enum(["PENDING", "VERIFIED", "COMPLETED", "CANCELLED"]).default("VERIFIED"),
      message: z.string().optional(),
      isAnonymous: z.boolean().default(false),
    })
  )
  .handler(async ({ data }) => {
    const refNo = `BHTF-REM-${Math.floor(100000 + Math.random() * 900000)}`;
    return await db.createDonation({
      referenceNo: refNo,
      donorName: data.donorName.trim(),
      donorEmail: data.donorEmail.trim().toLowerCase(),
      donorPhone: data.donorPhone?.trim() || null,
      amountNu: data.amountNu,
      currency: "BTN",
      paymentMethod: data.paymentMethod,
      status: data.status,
      message: data.message?.trim() || null,
      isAnonymous: data.isAnonymous,
    });
  });

export const updateDonationStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      status: z.enum(["PENDING", "VERIFIED", "COMPLETED", "CANCELLED"]),
    })
  )
  .handler(async ({ data }) => {
    return await db.updateDonationStatus(data.id, data.status);
  });

export const deleteAdminDonation = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteDonation(data.id);
  });

// --- Inquiries Admin Functions ---
export const getAdminInquiries = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllInquiries();
});

export const createAdminInquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      subject: z.string().min(3),
      message: z.string().min(5),
      channel: z.enum(["WALK_IN", "PHONE", "EMAIL"]).default("WALK_IN"),
      loggedBy: z.string().min(2),
    })
  )
  .handler(async ({ data }) => {
    return await db.createInquiry({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      channel: data.channel,
      loggedBy: data.loggedBy.trim(),
      status: "UNREAD",
    });
  });

export const updateInquiryStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      status: z.enum(["UNREAD", "IN_PROGRESS", "REPLIED", "ARCHIVED"]),
      replyNotes: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    return await db.updateInquiryStatus(data.id, data.status, data.replyNotes);
  });

export const deleteAdminInquiry = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteInquiry(data.id);
  });

// --- Subscribers Admin Functions ---
export const getAdminSubscribers = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllSubscribers();
});

export const createAdminSubscriber = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email(),
      isActive: z.boolean().default(true),
    })
  )
  .handler(async ({ data }) => {
    return await db.adminAddSubscriber(data.email, data.isActive);
  });

export const updateAdminSubscriberStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      isActive: z.boolean(),
    })
  )
  .handler(async ({ data }) => {
    return await db.updateSubscriberStatus(data.id, data.isActive);
  });

export const deleteAdminSubscriber = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteSubscriber(data.id);
  });

// --- Programs Admin Functions ---
export const getAdminPrograms = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllPrograms();
});

export const createAdminProgram = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(3),
      slug: z.string().optional(),
      summary: z.string().min(5),
      fullDescription: z.string().min(10),
      icon: z.string().default("Pill"),
      targetDzongkhags: z.string().default("All 20 Dzongkhags"),
      beneficiariesReached: z.string().default("780,000+ citizens"),
      status: z.enum(["ACTIVE", "PAUSED", "COMPLETED"]).default("ACTIVE"),
    })
  )
  .handler(async ({ data }) => {
    return await db.createProgram({
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      summary: data.summary,
      fullDescription: data.fullDescription,
      icon: data.icon,
      targetDzongkhags: data.targetDzongkhags,
      beneficiariesReached: data.beneficiariesReached,
      status: data.status,
    });
  });

export const updateAdminProgram = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      slug: z.string().optional(),
      summary: z.string().optional(),
      fullDescription: z.string().optional(),
      icon: z.string().optional(),
      targetDzongkhags: z.string().optional(),
      beneficiariesReached: z.string().optional(),
      status: z.string().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateProgram(id, rest);
  });

export const deleteAdminProgram = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteProgram(data.id);
  });

