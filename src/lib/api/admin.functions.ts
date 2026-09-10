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
      status: z.enum(["PENDING", "VERIFIED", "COMPLETED", "CANCELLED"]),
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
