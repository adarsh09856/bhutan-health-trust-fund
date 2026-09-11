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
    }),
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
      paymentMethod: z.enum([
        "MBOB",
        "BNB_PAY",
        "RMA_GATEWAY",
        "BANK_TRANSFER",
        "INTERNATIONAL_CARD",
      ]),
      message: z.string().optional(),
      isAnonymous: z.boolean().default(false),
    }),
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

// --- Lookup Donation (Citizen & Donor Public Tracking) ---
export const lookupDonation = createServerFn({ method: "POST" })
  .validator(
    z.object({
      referenceNo: z.string().min(3, "Reference number is required"),
      donorEmail: z.string().email("Valid donor email is required"),
    }),
  )
  .handler(async ({ data }) => {
    const donation = await db.findDonationByReference(data.referenceNo.trim());

    if (
      !donation ||
      donation.donorEmail.toLowerCase().trim() !== data.donorEmail.toLowerCase().trim()
    ) {
      return {
        success: false as const,
        error:
          "No contribution record found matching that Reference Number and Donor Email. Please verify both details.",
      };
    }

    return {
      success: true as const,
      donation: {
        id: donation.id,
        referenceNo: donation.referenceNo,
        donorName: donation.isAnonymous ? "Anonymous Benefactor" : donation.donorName,
        donorEmail: donation.donorEmail,
        donorPhone: donation.donorPhone,
        amountNu: donation.amountNu,
        currency: donation.currency,
        paymentMethod: donation.paymentMethod,
        status: donation.status,
        message: donation.message,
        isAnonymous: donation.isAnonymous,
        createdAt: donation.createdAt,
      },
    };
  });

// --- Get Public Trustees ---
export const getPublicTrustees = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllTrustees(true);
});

// --- Get Public FAQs ---
export const getPublicFaqs = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllFaqs(true);
});

// --- Get Public Impact Metrics ---
export const getPublicImpactMetrics = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllImpactMetrics(true);
});

// --- Get Public Milestones ---
export const getPublicMilestones = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllMilestones();
});

// --- Get Public Site Settings ---
export const getPublicSettings = createServerFn({ method: "GET" }).handler(async () => {
  const settings = await db.getAllSettings();
  const map: Record<string, string> = {};
  for (const s of settings) {
    map[s.settingKey] = s.settingValue;
  }
  return map;
});

// --- Get Public Procurement Steps ---
export const getPublicProcurementSteps = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getProcurementSteps();
});

// --- Get Public Financial Settings (Sanitized Tier 2 Read) ---
export const getPublicFinancialSettings = createServerFn({ method: "GET" }).handler(async () => {
  const fin = await db.getFinancialSettings();
  return {
    bankAccountBOB: fin.bankAccountBOB,
    swiftCodeBOB: fin.swiftCodeBOB,
    bankName: fin.bankName,
    accountTitle: fin.accountTitle,
    taxExemptionId: fin.taxExemptionId,
    taxCertificateValid: fin.taxCertificateValid,
    legalSignoffBy: fin.legalSignoffBy,
    legalSignoffAt: fin.legalSignoffAt,
  };
});

// --- Get Public Field Operations Gallery ---
export const getPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getGallery(true);
});

// --- Get Public Videos & Documentaries ---
export const getPublicVideos = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getVideos(true);
});

// --- Get Public Procurement Tenders & RFPs ---
export const getPublicProcurementTenders = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getProcurementTenders();
});
