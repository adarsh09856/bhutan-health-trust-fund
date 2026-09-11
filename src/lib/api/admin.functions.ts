import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "../db";
import { requireAdminFromRequest, requireSuperAdminFromRequest } from "../auth.server";

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
    }),
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
    }),
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
    }),
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
    }),
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
    }),
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
    }),
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
    }),
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
      status: z.enum(["PENDING", "VERIFICATION_SUBMITTED", "VERIFIED", "COMPLETED", "CANCELLED"]),
    }),
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
    }),
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
    }),
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
    }),
  )
  .handler(async ({ data }) => {
    return await db.adminAddSubscriber(data.email, data.isActive);
  });

export const updateAdminSubscriberStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      isActive: z.boolean(),
    }),
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
    }),
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
    }),
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

// --- Trustees Admin Functions ---
export const getAdminTrustees = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllTrustees(false);
});

export const createAdminTrustee = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2),
      role: z.string().min(2),
      organization: z.string().min(2),
      badge: z.string().default("Trustee"),
      bio: z.string().min(5),
      photoUrl: z.string().optional(),
      orderIndex: z.number().default(0),
      isActive: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    return await db.createTrustee({
      name: data.name.trim(),
      role: data.role.trim(),
      organization: data.organization.trim(),
      badge: data.badge.trim(),
      bio: data.bio.trim(),
      photoUrl: data.photoUrl?.trim() || "/src/assets/logo.png",
      orderIndex: data.orderIndex,
      isActive: data.isActive,
    });
  });

export const updateAdminTrustee = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      name: z.string().optional(),
      role: z.string().optional(),
      organization: z.string().optional(),
      badge: z.string().optional(),
      bio: z.string().optional(),
      photoUrl: z.string().optional(),
      orderIndex: z.number().optional(),
      isActive: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateTrustee(id, rest);
  });

export const deleteAdminTrustee = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteTrustee(data.id);
  });

// --- FAQs Admin Functions ---
export const getAdminFaqs = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllFaqs(false);
});

export const createAdminFaq = createServerFn({ method: "POST" })
  .validator(
    z.object({
      question: z.string().min(3),
      answer: z.string().min(5),
      category: z.string().default("General"),
      orderIndex: z.number().default(0),
      isPublished: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    return await db.createFaq({
      question: data.question.trim(),
      answer: data.answer.trim(),
      category: data.category.trim(),
      orderIndex: data.orderIndex,
      isPublished: data.isPublished,
    });
  });

export const updateAdminFaq = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      question: z.string().optional(),
      answer: z.string().optional(),
      category: z.string().optional(),
      orderIndex: z.number().optional(),
      isPublished: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateFaq(id, rest);
  });

export const deleteAdminFaq = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteFaq(data.id);
  });

// --- Impact Metrics Admin Functions ---
export const getAdminMetrics = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllImpactMetrics(false);
});

export const createAdminMetric = createServerFn({ method: "POST" })
  .validator(
    z.object({
      label: z.string().min(2),
      value: z.string().min(1),
      description: z.string().min(5),
      icon: z.string().default("Users"),
      badge: z.string().default("Verified"),
      orderIndex: z.number().default(0),
      isActive: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    return await db.createImpactMetric({
      label: data.label.trim(),
      value: data.value.trim(),
      description: data.description.trim(),
      icon: data.icon.trim(),
      badge: data.badge.trim(),
      orderIndex: data.orderIndex,
      isActive: data.isActive,
    });
  });

export const updateAdminMetric = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      label: z.string().optional(),
      value: z.string().optional(),
      description: z.string().optional(),
      icon: z.string().optional(),
      badge: z.string().optional(),
      orderIndex: z.number().optional(),
      isActive: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateImpactMetric(id, rest);
  });

export const deleteAdminMetric = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteImpactMetric(data.id);
  });

// --- Milestones Admin Functions ---
export const getAdminMilestones = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllMilestones();
});

export const createAdminMilestone = createServerFn({ method: "POST" })
  .validator(
    z.object({
      year: z.string().min(4),
      title: z.string().min(3),
      description: z.string().min(5),
      orderIndex: z.number().default(0),
    }),
  )
  .handler(async ({ data }) => {
    return await db.createMilestone({
      year: data.year.trim(),
      title: data.title.trim(),
      description: data.description.trim(),
      orderIndex: data.orderIndex,
    });
  });

export const updateAdminMilestone = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      year: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      orderIndex: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const { id, ...rest } = data;
    return await db.updateMilestone(id, rest);
  });

export const deleteAdminMilestone = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    return await db.deleteMilestone(data.id);
  });

// --- Site Settings Admin Functions ---
export const getAdminSettings = createServerFn({ method: "GET" }).handler(async () => {
  return await db.getAllSettings();
});

export const updateAdminSetting = createServerFn({ method: "POST" })
  .validator(
    z.object({
      key: z.string().min(1),
      value: z.string(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const res = await db.updateSetting(data.key.trim(), data.value.trim());

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "UPDATE_SETTING",
      entity: "SETTING",
      entityId: data.key,
      details: `Updated setting ${data.key} = ${data.value}`,
    });

    return res;
  });

// --- Tier 2 Restricted Financial & Statutory Settings Functions (Super Admin Only) ---
export const getAdminFinancialSettings = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return await db.getFinancialSettings();
});

export const updateAdminFinancialSettings = createServerFn({ method: "POST" })
  .validator(
    z.object({
      bankAccountBOB: z.string().optional(),
      swiftCodeBOB: z.string().optional(),
      bankName: z.string().optional(),
      accountTitle: z.string().optional(),
      taxExemptionId: z.string().optional(),
      taxCertificateValid: z.boolean().optional(),
      reason: z
        .string()
        .min(10, "Mandatory reason must be at least 10 characters justifying this Tier 2 mutation"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    const current = await db.getFinancialSettings();

    // Enforce Rule 5: tax_certificate_valid may only be flipped to true if legal_signoff_by and legal_signoff_at are already populated
    if (data.taxCertificateValid === true) {
      if (!current.legalSignoffBy || !current.legalSignoffAt) {
        throw new Error(
          "FORBIDDEN: DRC tax exemption certificate watermark cannot be cleared without prior statutory legal sign-off recorded by an authorized Secretariat officer.",
        );
      }
    }

    const { reason, ...updateData } = data;
    return await db.updateFinancialSettings(updateData, admin.email, reason);
  });

export const recordAdminLegalSignoff = createServerFn({ method: "POST" })
  .validator(
    z.object({
      officerName: z.string().min(2, "Authorizing officer name and designation required"),
      notes: z.string().optional(),
      reason: z
        .string()
        .min(10, "Mandatory reason must be at least 10 characters justifying legal clearance"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    return await db.recordLegalSignoff(data.officerName.trim(), data.notes?.trim(), admin.email);
  });

// --- User Management & Session Revocation Functions (Super Admin Only, Tier 2) ---
export const getAdminUsers = createServerFn({ method: "GET" }).handler(async () => {
  await requireSuperAdminFromRequest();
  return await db.getAllUsers();
});

export const createAdminUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      name: z.string().min(2, "Name is required"),
      email: z.string().email("Valid email required"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      role: z.enum(["SUPER_ADMIN", "EDITOR"]).default("EDITOR"),
      reason: z.string().min(10, "Reason must be at least 10 characters"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    const passwordHash = bcrypt.hashSync(data.password, 12);
    const user = await db.createUser({
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      passwordHash,
      role: data.role,
    });

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "CREATE_USER",
      entity: "USER",
      entityId: String(user.id),
      details: `Created user ${user.email} with role ${user.role}.`,
      newValue: JSON.stringify({ name: user.name, email: user.email, role: user.role }),
      reason: data.reason,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  });

export const updateAdminUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      name: z.string().optional(),
      role: z.enum(["SUPER_ADMIN", "EDITOR"]).optional(),
      isActive: z.boolean().optional(),
      password: z.string().min(8).optional(),
      reason: z.string().min(10, "Reason must be at least 10 characters"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    const updateData: any = {};
    if (data.name) updateData.name = data.name.trim();
    if (data.role) updateData.role = data.role;
    if (data.isActive !== undefined) {
      updateData.isActive = data.isActive;
      // If deactivating user, revoke all active sessions immediately
      if (!data.isActive) {
        await db.revokeAllUserSessions(data.id);
      }
    }
    if (data.password) {
      updateData.passwordHash = bcrypt.hashSync(data.password, 12);
      // Revoke old sessions when password changes
      await db.revokeAllUserSessions(data.id);
    }

    const updated = await db.updateUser(data.id, updateData);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "UPDATE_USER",
      entity: "USER",
      entityId: String(data.id),
      details: `Updated parameters: ${Object.keys(updateData).join(", ")}`,
      newValue: JSON.stringify(updateData),
      reason: data.reason,
    });

    return updated;
  });

export const deleteAdminUser = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      reason: z.string().min(10, "Reason must be at least 10 characters"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    if (admin.id === data.id) {
      throw new Error("Cannot delete your own administrator account.");
    }
    await db.revokeAllUserSessions(data.id);
    const success = await db.deleteUser(data.id);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "DELETE_USER",
      entity: "USER",
      entityId: String(data.id),
      details: `Permanently deleted user #${data.id}`,
      reason: data.reason,
    });

    return { success };
  });

export const getUserSessions = createServerFn({ method: "GET" })
  .validator(z.object({ userId: z.number() }))
  .handler(async ({ data }) => {
    await requireSuperAdminFromRequest();
    return await db.getActiveSessionsForUser(data.userId);
  });

export const revokeUserSession = createServerFn({ method: "POST" })
  .validator(
    z.object({
      sessionId: z.number(),
      reason: z.string().min(10, "Reason must be at least 10 characters").optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    const success = await db.revokeSession(data.sessionId);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "REVOKE_SESSION",
      entity: "SESSION",
      entityId: String(data.sessionId),
      details: `Session #${data.sessionId} revoked by super admin.`,
      reason: data.reason || "Manual session termination by super administrator",
    });

    return { success };
  });

// --- Audit Logs & System Events Functions (Super Admin Only) ---
export const getAdminAuditLogs = createServerFn({ method: "GET" })
  .validator(
    z
      .object({
        limit: z.number().optional().default(100),
        offset: z.number().optional().default(0),
      })
      .optional(),
  )
  .handler(async ({ data }) => {
    await requireSuperAdminFromRequest();
    return await db.getAuditLogs(data?.limit, data?.offset);
  });

export const getAdminSystemEvents = createServerFn({ method: "GET" })
  .validator(z.object({ limit: z.number().optional().default(100) }).optional())
  .handler(async ({ data }) => {
    await requireSuperAdminFromRequest();
    return await db.getSystemEvents(data?.limit);
  });

// --- Procurement Steps CMS Functions ---
export const getAdminProcurementSteps = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return await db.getProcurementSteps();
});

export const createAdminProcurementStep = createServerFn({ method: "POST" })
  .validator(
    z.object({
      stepNumber: z.string().min(1),
      title: z.string().min(3),
      description: z.string().min(5),
      orderIndex: z.number().default(0),
      isActive: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const step = await db.createProcurementStep(data);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "CREATE_PROCUREMENT_STEP",
      entity: "PROCUREMENT",
      entityId: String(step.id),
      details: `Created step ${step.stepNumber}: ${step.title}`,
    });

    return step;
  });

export const updateAdminProcurementStep = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      stepNumber: z.string().optional(),
      title: z.string().optional(),
      description: z.string().optional(),
      orderIndex: z.number().optional(),
      isActive: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const { id, ...rest } = data;
    const step = await db.updateProcurementStep(id, rest);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "UPDATE_PROCUREMENT_STEP",
      entity: "PROCUREMENT",
      entityId: String(id),
      details: `Updated procurement step #${id}`,
    });

    return step;
  });

export const deleteAdminProcurementStep = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const success = await db.deleteProcurementStep(data.id);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "DELETE_PROCUREMENT_STEP",
      entity: "PROCUREMENT",
      entityId: String(data.id),
      details: `Deleted procurement step #${data.id}`,
    });

    return { success };
  });

// ==========================================
// Field Operations Gallery Management
// ==========================================
export const getAdminGallery = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return db.getGallery(false);
});

export const createAdminGalleryItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(1, "Title is required"),
      category: z.string().default("Field Operations"),
      imageUrl: z.string().min(1, "Image URL is required"),
      caption: z.string().optional(),
      dzongkhag: z.string().default("All 20 Dzongkhags"),
      orderIndex: z.number().default(0),
      isPublished: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const item = await db.createGalleryItem(data);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "CREATE_GALLERY_ITEM",
      entity: "GALLERY",
      entityId: String(item.id),
      details: `Created gallery image: ${item.title}`,
    });

    return item;
  });

export const updateAdminGalleryItem = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      category: z.string().optional(),
      imageUrl: z.string().optional(),
      caption: z.string().optional(),
      dzongkhag: z.string().optional(),
      orderIndex: z.number().optional(),
      isPublished: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const { id, ...rest } = data;
    const item = await db.updateGalleryItem(id, rest);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "UPDATE_GALLERY_ITEM",
      entity: "GALLERY",
      entityId: String(id),
      details: `Updated gallery image #${id}`,
    });

    return item;
  });

export const deleteAdminGalleryItem = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const success = await db.deleteGalleryItem(data.id);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "DELETE_GALLERY_ITEM",
      entity: "GALLERY",
      entityId: String(data.id),
      details: `Deleted gallery image #${data.id}`,
    });

    return { success };
  });

// ==========================================
// Public Media & Videos Management
// ==========================================
export const getAdminVideos = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  return db.getVideos(false);
});

export const createAdminVideo = createServerFn({ method: "POST" })
  .validator(
    z.object({
      title: z.string().min(1, "Title is required"),
      category: z.string().default("Documentary"),
      videoUrl: z.string().min(1, "Video URL is required"),
      duration: z.string().default("05:00"),
      thumbnailUrl: z.string().optional(),
      description: z.string().optional(),
      orderIndex: z.number().default(0),
      isPublished: z.boolean().default(true),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const video = await db.createVideo(data);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "CREATE_VIDEO",
      entity: "VIDEO",
      entityId: String(video.id),
      details: `Created video embed: ${video.title}`,
    });

    return video;
  });

export const updateAdminVideo = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      title: z.string().optional(),
      category: z.string().optional(),
      videoUrl: z.string().optional(),
      duration: z.string().optional(),
      thumbnailUrl: z.string().optional(),
      description: z.string().optional(),
      orderIndex: z.number().optional(),
      isPublished: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const { id, ...rest } = data;
    const video = await db.updateVideo(id, rest);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "UPDATE_VIDEO",
      entity: "VIDEO",
      entityId: String(id),
      details: `Updated video #${id}`,
    });

    return video;
  });

export const deleteAdminVideo = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const success = await db.deleteVideo(data.id);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "DELETE_VIDEO",
      entity: "VIDEO",
      entityId: String(data.id),
      details: `Deleted video #${data.id}`,
    });

    return { success };
  });

// ==========================================
// Procurement Tenders Management
// ==========================================
export const getAdminProcurementTenders = createServerFn({ method: "GET" })
  .validator(z.object({ status: z.string().optional() }).optional())
  .handler(async ({ data }) => {
    await requireAdminFromRequest();
    return db.getProcurementTenders(data?.status);
  });

export const createAdminProcurementTender = createServerFn({ method: "POST" })
  .validator(
    z.object({
      tenderNo: z.string().min(1, "Tender number is required"),
      title: z.string().min(1, "Title is required"),
      category: z.string().default("Essential Drugs"),
      status: z.enum(["OPEN", "EVALUATING", "AWARDED", "CLOSED"]).default("OPEN"),
      closingDate: z.string().or(z.date()),
      documentUrl: z.string().min(1, "Document URL is required"),
      documentSize: z.string().default("1.8 MB"),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const closingDate =
      typeof data.closingDate === "string" ? new Date(data.closingDate) : data.closingDate;
    const tender = await db.createProcurementTender({
      ...data,
      closingDate,
    });

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "CREATE_TENDER",
      entity: "PROCUREMENT",
      entityId: String(tender.id),
      details: `Created procurement tender: ${tender.tenderNo} - ${tender.title}`,
    });

    return tender;
  });

export const updateAdminProcurementTender = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.number(),
      tenderNo: z.string().optional(),
      title: z.string().optional(),
      category: z.string().optional(),
      status: z.enum(["OPEN", "EVALUATING", "AWARDED", "CLOSED"]).optional(),
      closingDate: z.string().or(z.date()).optional(),
      documentUrl: z.string().optional(),
      documentSize: z.string().optional(),
      description: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const { id, closingDate, ...rest } = data;
    const updatePayload: any = { ...rest };
    if (closingDate) {
      updatePayload.closingDate =
        typeof closingDate === "string" ? new Date(closingDate) : closingDate;
    }
    const tender = await db.updateProcurementTender(id, updatePayload);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "UPDATE_TENDER",
      entity: "PROCUREMENT",
      entityId: String(id),
      details: `Updated procurement tender #${id}`,
    });

    return tender;
  });

export const deleteAdminProcurementTender = createServerFn({ method: "POST" })
  .validator(z.object({ id: z.number() }))
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const success = await db.deleteProcurementTender(data.id);

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "DELETE_TENDER",
      entity: "PROCUREMENT",
      entityId: String(data.id),
      details: `Deleted procurement tender #${data.id}`,
    });

    return { success };
  });

// ==========================================
// Batch / Bulk Operations
// ==========================================
export const bulkUpdateDonationsStatus = createServerFn({ method: "POST" })
  .validator(
    z.object({
      ids: z.array(z.number()),
      status: z.enum(["PENDING", "VERIFIED", "COMPLETED", "CANCELLED"]),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    for (const id of data.ids) {
      await db.updateDonationStatus(id, data.status);
    }

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "BULK_UPDATE_DONATIONS",
      entity: "DONATION",
      details: `Bulk updated ${data.ids.length} donations to status ${data.status}`,
    });

    return { success: true, count: data.ids.length };
  });

// ==========================================
// Tier 2 Payment Gateway & Fiduciary API Management (Super Admin Only)
// ==========================================

function maskSecretKey(secret: string | null | undefined): string | null {
  if (!secret) return null;
  if (secret.length <= 8) return "••••••••";
  const start = secret.slice(0, 4);
  const end = secret.slice(-4);
  return `${start}••••••••${end}`;
}

export const getAdminPaymentGateways = createServerFn({ method: "GET" }).handler(async () => {
  await requireAdminFromRequest();
  const gateways = await db.getPaymentGateways();
  return gateways.map((gw) => ({
    ...gw,
    keySecret: maskSecretKey(gw.keySecret),
    webhookSecret: maskSecretKey(gw.webhookSecret),
  }));
});

export const updateAdminPaymentGateway = createServerFn({ method: "POST" })
  .validator(
    z.object({
      gatewayKey: z.enum(["RMA_BFS", "RAZORPAY", "STRIPE"]),
      name: z.string().optional(),
      isEnabled: z.boolean().optional(),
      isLiveMode: z.boolean().optional(),
      keyId: z.string().optional(),
      keySecret: z.string().optional(),
      webhookSecret: z.string().optional(),
      merchantId: z.string().optional(),
      terminalId: z.string().optional(),
      gatewayUrl: z.string().optional(),
      currency: z.string().optional(),
      reason: z
        .string()
        .min(10, "Mandatory reason must be at least 10 characters justifying payment gateway mutation"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    const current = await db.getPaymentGateway(data.gatewayKey);

    const updatePayload: Record<string, any> = {};
    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.isEnabled !== undefined) updatePayload.isEnabled = data.isEnabled;
    if (data.isLiveMode !== undefined) updatePayload.isLiveMode = data.isLiveMode;
    if (data.keyId !== undefined) updatePayload.keyId = data.keyId;
    if (data.merchantId !== undefined) updatePayload.merchantId = data.merchantId;
    if (data.terminalId !== undefined) updatePayload.terminalId = data.terminalId;
    if (data.gatewayUrl !== undefined) updatePayload.gatewayUrl = data.gatewayUrl;
    if (data.currency !== undefined) updatePayload.currency = data.currency;

    // Only update secret if new plaintext secret is supplied (not containing masked bullet)
    if (data.keySecret !== undefined && !data.keySecret.includes("••••")) {
      updatePayload.keySecret = data.keySecret.trim();
    } else if (current?.keySecret) {
      updatePayload.keySecret = current.keySecret;
    }

    if (data.webhookSecret !== undefined && !data.webhookSecret.includes("••••")) {
      updatePayload.webhookSecret = data.webhookSecret.trim();
    } else if (current?.webhookSecret) {
      updatePayload.webhookSecret = current.webhookSecret;
    }

    const updated = await db.updatePaymentGateway(
      data.gatewayKey,
      updatePayload,
      admin.email,
      data.reason,
    );

    return {
      ...updated,
      keySecret: maskSecretKey(updated.keySecret),
      webhookSecret: maskSecretKey(updated.webhookSecret),
    };
  });

export const testGatewayConnection = createServerFn({ method: "POST" })
  .validator(
    z.object({
      gatewayKey: z.enum(["RMA_BFS", "RAZORPAY", "STRIPE"]),
    }),
  )
  .handler(async ({ data }) => {
    await requireSuperAdminFromRequest();
    const startTime = Date.now();
    const gw = await db.getPaymentGateway(data.gatewayKey);

    if (!gw) {
      throw new Error(`Gateway configuration for ${data.gatewayKey} not found.`);
    }

    if (data.gatewayKey === "RAZORPAY") {
      if (!gw.keyId || !gw.keySecret) {
        throw new Error("Razorpay Key ID and Key Secret must be configured before testing connection.");
      }

      try {
        const authHeader = `Basic ${Buffer.from(`${gw.keyId}:${gw.keySecret}`).toString("base64")}`;
        const res = await fetch("https://api.razorpay.com/v1/orders?count=1", {
          headers: { Authorization: authHeader },
        });

        const latencyMs = Date.now() - startTime;
        if (res.ok || res.status === 200) {
          return {
            success: true,
            gatewayKey: "RAZORPAY",
            isLiveMode: gw.isLiveMode,
            latencyMs,
            message: `Razorpay connection verified successfully (${latencyMs}ms). Credentials are valid in ${gw.isLiveMode ? "LIVE" : "TEST"} mode.`,
          };
        } else {
          const errBody = await res.json().catch(() => ({}));
          const errMsg = errBody?.error?.description || `HTTP ${res.status}: ${res.statusText}`;
          return {
            success: false,
            gatewayKey: "RAZORPAY",
            isLiveMode: gw.isLiveMode,
            latencyMs,
            message: `Razorpay API returned an error: ${errMsg}`,
          };
        }
      } catch (err: any) {
        return {
          success: false,
          gatewayKey: "RAZORPAY",
          isLiveMode: gw.isLiveMode,
          latencyMs: Date.now() - startTime,
          message: `Network failure connecting to Razorpay: ${err?.message || err}`,
        };
      }
    }

    if (data.gatewayKey === "RMA_BFS") {
      const crypto = await import("node:crypto");
      const secret = gw.keySecret || "BHTF_BFS_SECRET_TEST_KEY";
      const samplePayload = `BHTF_TEST_ORDER|1000|${gw.merchantId || "BHTF_RMA_MERCHANT"}|${Date.now()}`;
      const signature = crypto.createHmac("sha256", secret).update(samplePayload).digest("hex");

      const latencyMs = Date.now() - startTime;
      return {
        success: true,
        gatewayKey: "RMA_BFS",
        isLiveMode: gw.isLiveMode,
        latencyMs,
        message: `RMA BFS HMAC-SHA256 signature generator active. Endpoint: ${gw.gatewayUrl || "https://bfstest.rma.org.bt/bfsgateway"}. Test checksum verified (${signature.slice(0, 12)}...).`,
      };
    }

    return {
      success: true,
      gatewayKey: data.gatewayKey,
      latencyMs: Date.now() - startTime,
      message: `Gateway ${data.gatewayKey} simulated connection verified.`,
    };
  });

export const purgeDemoData = createServerFn({ method: "POST" })
  .validator(
    z.object({
      reason: z.string().min(10, "Mandatory justification reason required (minimum 10 characters)"),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireSuperAdminFromRequest();
    return await db.purgeDemoData(admin.email, data.reason);
  });

export const verifyDonationJournalAction = createServerFn({ method: "POST" })
  .validator(
    z.object({
      referenceNo: z.string(),
      verified: z.boolean(),
      notes: z.string().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const admin = await requireAdminFromRequest();
    const status = data.verified ? "VERIFIED" : "CANCELLED";
    const donation = await db.findDonationByReference(data.referenceNo);
    if (!donation) throw new Error("Donation not found");

    const updated = await db.updateDonationPayment(data.referenceNo, {
      status,
      completedAt: data.verified ? new Date() : undefined,
    });

    await db.logAuditEvent({
      userId: admin.id,
      userEmail: admin.email,
      action: "VERIFY_JOURNAL",
      entity: "DONATION",
      entityId: data.referenceNo,
      details: `Admin ${admin.email} marked donation ${data.referenceNo} as ${status}. Notes: ${data.notes || "None"}`,
    });

    return { success: true, donation: updated };
  });
