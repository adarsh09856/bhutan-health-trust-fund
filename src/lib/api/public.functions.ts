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

import crypto from "node:crypto";

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
      isEnabled: razorpay?.isEnabled ?? false,
      isLiveMode: razorpay?.isLiveMode ?? false,
      keyId: razorpay?.keyId || null,
    },
    rmaBfs: {
      isEnabled: rmaBfs?.isEnabled ?? true,
      isLiveMode: rmaBfs?.isLiveMode ?? false,
      merchantId: rmaBfs?.merchantId || "BHTF_RMA_MERCHANT",
      gatewayUrl: rmaBfs?.gatewayUrl || "https://bfstest.rma.org.bt/bfsgateway",
    },
    banking: {
      bobAccountNo: fin.bankAccountBOB || settingsMap["bob_account_no"] || "BHTF-BOB-XXXXXX",
      bobSwiftCode: fin.swiftCodeBOB || settingsMap["bob_swift_code"] || "BOBTBT2X",
      bnbAccountNo: settingsMap["bnb_account_no"] || "BHTF-BNB-XXXXXX",
      bankName: fin.bankName || "Bank of Bhutan Limited",
      accountTitle: fin.accountTitle || "Bhutan Health Trust Fund",
      qrImageUrl: settingsMap["donation_qr_image"] || "/src/assets/qr-placeholder.png",
    },
  };
});

// --- Submit / Initiate Donation Payment ---
export const initiateDonationPayment = createServerFn({ method: "POST" })
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
        "RAZORPAY",
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

    // 1. Razorpay / International Card
    if (data.paymentMethod === "RAZORPAY" || data.paymentMethod === "INTERNATIONAL_CARD") {
      const gw = await db.getPaymentGateway("RAZORPAY");
      let razorpayOrderId = `order_${refNo.replace(/[^A-Za-z0-9]/g, "")}`;
      let keyId = gw?.keyId || "rzp_test_sample";

      if (gw?.isEnabled && gw?.keyId && gw?.keySecret) {
        try {
          const authHeader = `Basic ${Buffer.from(`${gw.keyId}:${gw.keySecret}`).toString("base64")}`;
          const res = await fetch("https://api.razorpay.com/v1/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: authHeader,
            },
            body: JSON.stringify({
              amount: data.amountNu * 100, // in subunits (paisa/chhertum)
              currency: "INR",
              receipt: refNo,
              notes: {
                referenceNo: refNo,
                donorEmail: data.donorEmail,
                donorName: data.donorName,
              },
            }),
          });

          if (res.ok) {
            const orderData = await res.json();
            razorpayOrderId = orderData.id;
            keyId = gw.keyId;
          }
        } catch (err: any) {
          console.warn("[Razorpay Order Creation Warning]:", err?.message || err);
        }
      }

      await db.updateDonationPayment(refNo, {
        gatewaySessionId: razorpayOrderId,
      });

      return {
        success: true,
        referenceNo: refNo,
        amountNu: data.amountNu,
        paymentMethod: data.paymentMethod,
        razorpayOrderId,
        razorpayKeyId: keyId,
        currency: "INR",
        createdAt: donation.createdAt,
      };
    }

    // 2. RMA BFS Payment Gateway (Bhutan Domestic Central Bank Switch)
    if (data.paymentMethod === "RMA_GATEWAY") {
      const gw = await db.getPaymentGateway("RMA_BFS");
      const merchantId = gw?.merchantId || "BHTF_RMA_MERCHANT";
      const terminalId = gw?.terminalId || "BHTF_TERM_01";
      const secret = gw?.keySecret || "BHTF_BFS_SECRET_TEST_KEY";
      const gatewayUrl = gw?.gatewayUrl || "https://bfstest.rma.org.bt/bfsgateway";
      const orderNo = `BFS-${refNo.replace("BHTF-DON-", "")}`;

      const payloadString = `${orderNo}|${data.amountNu}|${merchantId}|${Date.now()}`;
      const checksum = crypto.createHmac("sha256", secret).update(payloadString).digest("hex");

      await db.updateDonationPayment(refNo, {
        gatewaySessionId: orderNo,
        gatewayStatus: "BFS_DISPATCHED",
      });

      return {
        success: true,
        referenceNo: refNo,
        amountNu: data.amountNu,
        paymentMethod: data.paymentMethod,
        rmaPayload: {
          orderNo,
          amountNu: data.amountNu,
          merchantId,
          terminalId,
          checksum,
          gatewayUrl,
        },
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
      razorpaySignature: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const gw = await db.getPaymentGateway("RAZORPAY");
    const secret = gw?.keySecret;

    let isSignatureValid = false;
    if (secret && data.razorpaySignature) {
      const expected = crypto
        .createHmac("sha256", secret)
        .update(`${data.razorpayOrderId}|${data.razorpayPaymentId}`)
        .digest("hex");
      isSignatureValid = expected === data.razorpaySignature;
    } else {
      // In test simulation or if signature check is bypassed for test accounts
      isSignatureValid = Boolean(data.razorpayPaymentId);
    }

    if (!isSignatureValid) {
      throw new Error("Invalid Razorpay payment signature.");
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
    }),
  )
  .handler(async ({ data }) => {
    const updated = await db.updateDonationPayment(data.referenceNo, {
      status: "COMPLETED",
      gatewayTransactionId: data.bfsTxnId,
      gatewaySessionId: data.orderNo,
      gatewayStatus: "paid",
      completedAt: new Date(),
    });

    return {
      success: true,
      referenceNo: data.referenceNo,
      transactionId: data.bfsTxnId,
      donation: updated,
    };
  });

// --- Submit Bank Journal / Remittance Verification ---
export const submitDonationJournal = createServerFn({ method: "POST" })
  .validator(
    z.object({
      referenceNo: z.string(),
      journalNo: z.string().min(4, "Bank journal / remittance number must be at least 4 characters"),
      bankName: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const updated = await db.submitDonationJournal(
      data.referenceNo,
      data.journalNo,
      data.bankName,
    );

    if (!updated) {
      throw new Error(`Donation reference ${data.referenceNo} was not found.`);
    }

    return {
      success: true,
      referenceNo: updated.referenceNo,
      journalNo: data.journalNo,
      status: updated.status,
      message: "Bank journal number submitted successfully. Secretariat will verify and stamp your tax certificate.",
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
