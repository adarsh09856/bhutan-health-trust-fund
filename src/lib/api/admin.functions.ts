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

// --- Inquiries Admin Functions ---
export const getAdminInquiries = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllInquiries();
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

export const deleteAdminSubscriber = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteSubscriber(data.id);
  });

// --- LMS Courses Admin Functions ---
export const getAdminCourses = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllCourses();
});

export const createAdminCourse = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(3),
      slug: z.string().optional(),
      category: z.string().default("Cold Chain & Vaccines"),
      description: z.string().min(10),
      instructor: z.string().default("BHTF & KGUMSB Faculty"),
      durationHours: z.string().default("4 Hours"),
      difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]).default("Intermediate"),
      modulesCount: z.number().default(4),
      isPublished: z.boolean().default(true),
    })
  )
  .handler(async ({ data }) => {
    return await db.createCourse({
      title: data.title,
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: data.category,
      description: data.description,
      instructor: data.instructor,
      durationHours: data.durationHours,
      difficulty: data.difficulty,
      modulesCount: data.modulesCount,
      isPublished: data.isPublished,
    });
  });

export const updateAdminCourse = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      category: z.string().optional(),
      description: z.string().optional(),
      instructor: z.string().optional(),
      durationHours: z.string().optional(),
      difficulty: z.string().optional(),
      modulesCount: z.number().optional(),
      isPublished: z.boolean().optional(),
    })
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateCourse(id, rest);
  });

export const deleteAdminCourse = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteCourse(data.id);
  });

export const getAdminCourseEnrollments = createServerFn({ method: "GET" })
  .validator(z.object({ courseId: z.number().optional() }))
  .handler(async ({ data }) => {
    return await db.getCourseEnrollments(data?.courseId);
  });
