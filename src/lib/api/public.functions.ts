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
      channel: "WEB",
    });

    return {
      success: true,
      inquiryId: inquiry.id,
      message: "Thank you for reaching out. The BHTF Secretariat has received your message.",
    };
  });

// --- Submit Membership Application (Institutional & Individual) ---
export const submitMembershipApplication = createServerFn({ method: "POST" })
  .validator(
    z
      .object({
        type: z.enum(["INSTITUTIONAL", "INDIVIDUAL"]),
        applicantName: z.string().trim().min(2, "Applicant / contact name is required").max(120),
        email: z.string().trim().email("Valid email address is required").max(254),
        phone: z.string().trim().min(6, "Valid phone number is required").max(32),
        dzongkhag: z.string().trim().min(2).max(80),
        organizationName: z.string().trim().max(160).optional(),
        designation: z.string().trim().max(120).optional(),
        notes: z.string().trim().max(1200).optional(),
        website: z.string().max(200).optional(),
      })
      .superRefine((data, context) => {
        if (data.type === "INSTITUTIONAL" && !data.organizationName?.trim()) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["organizationName"],
            message: "Organization name is required for institutional applications.",
          });
        }
      }),
  )
  .handler(async ({ data }) => {
    const isInstitutional = data.type === "INSTITUTIONAL";
    const referenceNo = `BHTF-MEM-${isInstitutional ? "INST" : "IND"}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
    if (data.website?.trim()) {
      return { success: true, referenceNo, message: "Your application has been received." };
    }

    const applicantLabel = isInstitutional ? data.organizationName!.trim() : data.applicantName;
    const subject = `${isInstitutional ? "Institutional" : "Individual"} Membership Application — ${applicantLabel} — ${referenceNo}`;
    const structuredMessage = [
      `Membership reference: ${referenceNo}`,
      `Application type: ${isInstitutional ? "Institutional" : "Individual"}`,
      `Applicant / contact: ${data.applicantName}`,
      isInstitutional ? `Organization: ${data.organizationName}` : null,
      isInstitutional && data.designation ? `Contact role: ${data.designation}` : null,
      `Email: ${data.email.toLowerCase()}`,
      `Phone: ${data.phone}`,
      `Dzongkhag: ${data.dzongkhag}`,
      data.notes ? `Additional information: ${data.notes}` : null,
      `Submitted: ${new Date().toISOString()}`,
    ]
      .filter(Boolean)
      .join("\n");

    const inquiry = await db.createInquiry({
      name: data.applicantName,
      email: data.email.trim().toLowerCase(),
      subject,
      message: structuredMessage,
      status: "UNREAD",
      channel: isInstitutional ? "MEMBERSHIP_INSTITUTIONAL" : "MEMBERSHIP_INDIVIDUAL",
      loggedBy: "Public Membership Portal",
    });

    return {
      success: true,
      referenceNo,
      inquiryId: inquiry.id,
      applicantName: data.applicantName,
      message: "Your membership application has been received by the Secretariat for review.",
    };
  });

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// --- Get Public Payment Gateways Configuration ---
export const getPublicPaymentConfig = createServerFn({ method: "GET" }).handler(async () => {
  const gateways = await db.getPaymentGateways();
  const fin = await db.getFinancialSettings();
  const settings = await db.getAllSettings();
  const settingsMap: Record<string, string> = {};
  for (const s of settings) {
    settingsMap[s.settingKey] = s.settingValue;
  }

  const razorpay = gateways.find((g) => g.gatewayKey === "RAZORPAY");
  const rmaBfs = gateways.find((g) => g.gatewayKey === "RMA_BFS");

  return {
    razorpay: {
      isEnabled: Boolean(razorpay?.isEnabled && razorpay.keyId && razorpay.keySecret),
      isLiveMode: razorpay?.isLiveMode ?? false,
      keyId: razorpay?.isEnabled && razorpay.keyId && razorpay.keySecret ? razorpay.keyId : null,
    },
    rmaBfs: {
      // The current project has no verified RMA request signing or callback
      // protocol. Do not advertise or accept this gateway until that is added.
      isEnabled: false,
      isLiveMode: false,
      merchantId: rmaBfs?.merchantId || "",
      gatewayUrl: rmaBfs?.gatewayUrl || "",
    },
    banking: {
      bobAccountNo: fin.bankAccountBOB || settingsMap["bob_account_no"] || "BHTF-BOB-XXXXXX",
      bobSwiftCode: fin.swiftCodeBOB || settingsMap["bob_swift_code"] || "BOBTBT2X",
      bnbAccountNo: settingsMap["bnb_account_no"] || "BHTF-BNB-XXXXXX",
      bankName: fin.bankName || "Bank of Bhutan Limited",
      accountTitle: fin.accountTitle || "Bhutan Health Trust Fund",
      qrImageUrl: settingsMap["donation_qr_image"] || "/uploads/bhtf_donate_qr.png",
    },
  };
});

// --- Submit / Initiate Donation Payment ---
export const initiateDonationPayment = createServerFn({ method: "POST" })
  .validator(
    z.object({
      donorName: z.string().trim().min(2, "Donor name is required").max(120),
      donorEmail: z.string().trim().email("Valid email is required").max(254),
      donorPhone: z.string().trim().max(32).optional(),
      amountNu: z.number().finite().min(50, "Minimum donation is Nu. 50").max(100_000_000),
      paymentMethod: z.enum([
        "MBOB",
        "BNB_PAY",
        "RMA_GATEWAY",
        "BANK_TRANSFER",
        "RAZORPAY",
        "INTERNATIONAL_CARD",
      ]),
      message: z.string().max(2000).optional(),
      isAnonymous: z.boolean().default(false),
    }),
  )
  .handler(async ({ data }) => {
    const refNo = `BHTF-DON-${crypto.randomInt(100000, 1000000)}`;

    if (data.paymentMethod === "RMA_GATEWAY") {
      throw new Error("RMA checkout is unavailable until the bank's signed payment protocol is configured.");
    }

    let razorpayOrderId: string | null = null;
    let razorpayKeyId: string | null = null;
    if (data.paymentMethod === "RAZORPAY" || data.paymentMethod === "INTERNATIONAL_CARD") {
      const gw = await db.getPaymentGateway("RAZORPAY");
      if (!gw?.isEnabled || !gw.keyId || !gw.keySecret) {
        throw new Error("Card checkout is not configured. Please use a bank transfer or contact the Secretariat.");
      }
      const authHeader = `Basic ${Buffer.from(`${gw.keyId}:${gw.keySecret}`).toString("base64")}`;
      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: authHeader },
        body: JSON.stringify({
          amount: Math.round(data.amountNu * 100),
          currency: "INR",
          receipt: refNo,
          notes: { referenceNo: refNo, donorEmail: data.donorEmail, donorName: data.donorName },
        }),
        signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("The card payment provider could not create an order. No pledge was recorded.");
      const order = await response.json();
      if (typeof order.id !== "string" || !order.id.startsWith("order_")) {
        throw new Error("The card payment provider returned an invalid order. No pledge was recorded.");
      }
      razorpayOrderId = order.id;
      razorpayKeyId = gw.keyId;
    }

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
      gatewaySessionId: razorpayOrderId,
    });

    // 2. Razorpay / International Card
    if (data.paymentMethod === "RAZORPAY" || data.paymentMethod === "INTERNATIONAL_CARD") {
      return {
        success: true,
        referenceNo: refNo,
        amountNu: data.amountNu,
        paymentMethod: data.paymentMethod,
        razorpayOrderId,
        razorpayKeyId,
        currency: "INR",
        createdAt: donation.createdAt,
      };
    }

    // 3. mBoB / BNB Pay / Bank Wire
    return {
      success: true,
      referenceNo: donation.referenceNo,
      amountNu: donation.amountNu,
      paymentMethod: donation.paymentMethod,
      createdAt: donation.createdAt,
      message: `Your donation pledge of Nu. ${donation.amountNu.toLocaleString()} has been recorded with reference ${donation.referenceNo}.`,
    };
  });

// --- Verify Razorpay Payment ---
export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .validator(
    z.object({
      referenceNo: z.string(),
      razorpayOrderId: z.string(),
      razorpayPaymentId: z.string(),
      razorpaySignature: z
        .string()
        .regex(/^[a-fA-F0-9]{64}$/, "A valid payment signature is required"),
    }),
  )
  .handler(async ({ data }) => {
    const gw = await db.getPaymentGateway("RAZORPAY");
    const secret = gw?.keySecret;

    if (!gw?.isEnabled || !secret || !gw.keyId) {
      throw new Error(
        "Payment verification is unavailable. Please contact the Fund with your reference number.",
      );
    }
    const donation = await db.findDonationByReference(data.referenceNo);
    if (
      !donation ||
      donation.gatewaySessionId !== data.razorpayOrderId ||
      !["RAZORPAY", "INTERNATIONAL_CARD"].includes(donation.paymentMethod)
    ) {
      throw new Error("Payment order does not match this donation.");
    }
    const expected = crypto
      .createHmac("sha256", secret)
      .update(`${donation.gatewaySessionId}|${data.razorpayPaymentId}`)
      .digest();
    if (!crypto.timingSafeEqual(expected, Buffer.from(data.razorpaySignature, "hex"))) {
      throw new Error("Invalid Razorpay payment signature.");
    }
    if (
      donation.status === "COMPLETED" &&
      donation.gatewayTransactionId !== data.razorpayPaymentId
    ) {
      throw new Error("This donation already has a different verified payment.");
    }
    const paymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(data.razorpayPaymentId)}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${gw.keyId}:${secret}`).toString("base64")}`,
        },
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!paymentResponse.ok)
      throw new Error("The payment provider could not confirm this payment.");
    const payment = await paymentResponse.json();
    if (
      payment.status !== "captured" ||
      payment.order_id !== donation.gatewaySessionId ||
      payment.amount !== Math.round(donation.amountNu * 100) ||
      payment.currency !== "INR"
    ) {
      throw new Error(
        "Payment has not been captured for the expected order and amount. Your pledge remains pending.",
      );
    }

    const updated = await db.updateDonationPayment(data.referenceNo, {
      status: "COMPLETED",
      gatewayTransactionId: data.razorpayPaymentId,
      gatewaySessionId: data.razorpayOrderId,
      gatewayStatus: "paid",
      completedAt: new Date(),
    });

    return {
      success: true,
      referenceNo: data.referenceNo,
      transactionId: data.razorpayPaymentId,
      donation: updated,
    };
  });

// --- Verify RMA BFS Payment ---
export const verifyRmaBfsPayment = createServerFn({ method: "POST" })
  .validator(
    z.object({
      referenceNo: z.string(),
      orderNo: z.string(),
      bfsTxnId: z.string(),
      responseChecksum: z.string().optional(),
      bankName: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    void data;
    throw new Error("RMA payment confirmation is unavailable until a signed bank callback is configured.");
  });

// --- Submit Bank Journal / Remittance Verification ---
export const submitDonationJournal = createServerFn({ method: "POST" })
  .validator(
    z.object({
      referenceNo: z.string(),
      journalNo: z
        .string()
        .min(4, "Bank journal / remittance number must be at least 4 characters"),
      bankName: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const updated = await db.submitDonationJournal(data.referenceNo, data.journalNo, data.bankName);

    if (!updated) {
      throw new Error(`Donation reference ${data.referenceNo} was not found.`);
    }

    return {
      success: true,
      referenceNo: updated.referenceNo,
      journalNo: data.journalNo,
      status: updated.status,
      message:
        "Bank journal number submitted successfully. Secretariat will verify and stamp your tax certificate.",
    };
  });

// Legacy alias for backwards compatibility
export const submitDonationPledge = initiateDonationPayment;

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
    if (!article?.isPublished) return null;
    return article;
  });

// --- Get Public Reports ---
export const getPublicReports = createServerFn({ method: "GET" }).handler(async () => {
  const reports = await db.getAllReports();
  return reports.map((report) => {
    let fileAvailable = /^https?:\/\//i.test(report.fileUrl);
    if (report.fileUrl.startsWith("/") && !report.fileUrl.startsWith("//")) {
      try {
        const fileName = decodeURIComponent(
          new URL(report.fileUrl, "http://localhost").pathname,
        ).slice(1);
        fileAvailable = ["public", ".output/public"].some((directory) => {
          const root = path.resolve(process.cwd(), directory);
          const target = path.resolve(root, fileName);
          return (
            target.startsWith(`${root}${path.sep}`) &&
            fs.existsSync(target) &&
            fs.statSync(target).isFile()
          );
        });
      } catch {
        fileAvailable = false;
      }
    }
    return { ...report, fileAvailable };
  });
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
      donorEmail: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const donation = await db.findDonationByReference(data.referenceNo.trim());

    if (!donation) {
      return {
        success: false as const,
        error:
          "No contribution record found matching Reference Number '" +
          data.referenceNo.trim() +
          "'. Please verify the reference number on your deposit voucher or pledge confirmation.",
      };
    }

    if (
      data.donorEmail &&
      data.donorEmail.trim() &&
      donation.donorEmail.toLowerCase().trim() !== data.donorEmail.toLowerCase().trim()
    ) {
      return {
        success: false as const,
        error:
          "The email provided does not match the record on file for Reference Number '" +
          data.referenceNo.trim() +
          "'.",
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

// --- Get Public Customized Page ---
export const getPublicPage = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string() }))
  .handler(async ({ data }) => {
    const page = await db.getPageBySlug(data.slug);
    if (!page || page.status !== "published") return null;
    return page;
  });
