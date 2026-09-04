import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "../db";

// --- Submit Contact Inquiry ---
export const submitContactInquiry = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      subject: z.string().min(3, "Subject must be at least 3 characters"),
      message: z.string().min(10, "Message must be at least 10 characters"),
    })
  )
  .handler(async ({ data }) => {
    const inquiry = await db.createInquiry({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject.trim(),
      message: data.message.trim(),
      status: "UNREAD",
    });

    return {
      success: true,
      inquiryId: inquiry.id,
      message: "Thank you for reaching out. The BHTF Secretariat has received your message.",
    };
  });

// --- Submit Donation Pledge ---
export const submitDonationPledge = createServerFn({ method: "POST" })
  .validator(
    z.object({
      donorName: z.string().min(2, "Donor name is required"),
      donorEmail: z.string().email("Valid email is required"),
      donorPhone: z.string().optional(),
      amountNu: z.number().min(50, "Minimum donation is Nu. 50"),
      paymentMethod: z.enum(["MBOB", "BNB_PAY", "RMA_GATEWAY", "BANK_TRANSFER", "INTERNATIONAL_CARD"]),
      message: z.string().optional(),
      isAnonymous: z.boolean().default(false),
    })
  )
  .handler(async ({ data }) => {
    const refNo = `BHTF-DON-${Math.floor(100000 + Math.random() * 900000)}`;

    const donation = await db.createDonation({
      referenceNo: refNo,
      donorName: data.donorName.trim(),
      donorEmail: data.donorEmail.trim().toLowerCase(),
      donorPhone: data.donorPhone?.trim(),
      amountNu: data.amountNu,
      currency: "BTN",
      paymentMethod: data.paymentMethod,
      status: "PENDING",
      message: data.message?.trim(),
      isAnonymous: data.isAnonymous,
    });

    return {
      success: true,
      referenceNo: donation.referenceNo,
      amountNu: donation.amountNu,
      paymentMethod: donation.paymentMethod,
      createdAt: donation.createdAt,
      message: `Your donation pledge of Nu. ${donation.amountNu.toLocaleString()} has been recorded with reference ${donation.referenceNo}.`,
    };
  });

// --- Newsletter Subscription ---
export const subscribeNewsletter = createServerFn({ method: "POST" })
  .validator(z.object({ email: z.string().email("Valid email required") }))
  .handler(async ({ data }) => {
    const sub = await db.addSubscriber(data.email);
    return {
      success: true,
      email: sub.email,
      message: "Thank you for subscribing to Bhutan Health Trust Fund updates.",
    };
  });

// --- Get Public News ---
export const getPublicNews = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllNews(true);
});

// --- Get Public News by Slug ---
export const getPublicNewsBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const article = await db.getNewsBySlug(data.slug);
    if (!article) return null;
    return article;
  });

// --- Get Public Reports ---
export const getPublicReports = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllReports();
});

// --- Track Report Download ---
export const trackReportDownload = createServerFn({ method: "POST" })
  .validator(z.object({ reportId: z.number() }))
  .handler(async ({ data }) => {
    await db.incrementReportDownload(data.reportId);
    return { success: true };
  });

// --- Get Public Policies ---
export const getPublicPolicies = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllPolicies();
});

// --- Get Public Programs ---
export const getPublicPrograms = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllPrograms();
});

// --- Get Public Academy Courses ---
export const getPublicCourses = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllCourses();
});

// --- Get Public Course by Slug ---
export const getPublicCourseBySlug = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    return await db.getCourseBySlug(data.slug);
  });

// --- Submit Course Quiz & Certification ---
export const submitCourseQuizCompletion = createServerFn({ method: "POST" })
  .validator(
    z.object({
      courseId: z.number(),
      studentName: z.string().min(2, "Full name is required for certification"),
      studentEmail: z.string().email("Valid institutional or personal email required"),
      institution: z.string().optional(),
      quizScore: z.number().min(0).max(100),
    })
  )
  .handler(async ({ data }) => {
    return await db.submitCourseCompletion(data);
  });
