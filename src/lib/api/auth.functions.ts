import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { authenticateAdmin, verifyDatabaseSession, revokeSessionByToken } from "../auth.server";
import { db } from "../db";

export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Valid email required"),
      password: z.string().min(1, "Password is required"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const result = await authenticateAdmin(data.email, data.password);

      if (!result.success || !result.user || !result.token) {
        return {
          success: false,
          error: result.error || "Invalid email address or password. Please verify credentials.",
        };
      }

      return {
        success: true,
        token: result.token,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        },
      };
    } catch (err: any) {
      console.error("[Admin Auth Error]:", err);
      const msg = err?.message || String(err);
      return {
        success: false,
        error: `Authentication Service Error: ${msg}`,
      };
    }
  });

export const adminLogout = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().optional() }))
  .handler(async ({ data }) => {
    if (data.token) {
      await revokeSessionByToken(data.token);
    }
    return { success: true };
  });

export const verifyCurrentSession = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().optional() }))
  .handler(async ({ data }) => {
    if (!data.token) {
      return { user: null };
    }
    const sessionUser = await verifyDatabaseSession(data.token);
    return { user: sessionUser };
  });

/**
 * First-Run Setup Status Checker
 * If a super_admin already exists in the database, returns setupRequired = false.
 */
export const checkSetupStatus = createServerFn({ method: "GET" }).handler(async () => {
  const hasSuperAdmin = await db.hasAnySuperAdmin();
  return {
    setupRequired: !hasSuperAdmin,
  };
});

/**
 * First-Run Sovereign Setup Wizard
 * HARD CONSTRAINT:
 * 1. If any super_admin already exists, this endpoint is permanently BRICKED (returns 404).
 * 2. Requires a valid SETUP_TOKEN from the environment. Mismatched token returns 404.
 */
export const executeFirstRunSetup = createServerFn({ method: "POST" })
  .validator(
    z.object({
      setupToken: z.string().min(1, "Setup token is required"),
      name: z.string().min(2, "Name is required"),
      email: z.string().email("Valid email required"),
      password: z.string().min(8, "Password must be at least 8 characters"),
    }),
  )
  .handler(async ({ data }) => {
    // 1. Check if super admin already exists
    const hasSuperAdmin = await db.hasAnySuperAdmin();
    if (hasSuperAdmin) {
      return {
        success: false,
        statusCode: 404,
        error: "404 Not Found: Sovereign setup endpoint has been permanently decommissioned.",
      };
    }

    // 2. Validate SETUP_TOKEN
    const expectedToken = process.env.SETUP_TOKEN || "BHTF_SOVEREIGN_SETUP_2026";
    if (data.setupToken.trim() !== expectedToken.trim()) {
      return {
        success: false,
        statusCode: 404,
        error: "404 Not Found: Invalid initialization parameters.",
      };
    }

    // 3. Create First Super Admin
    try {
      const passwordHash = bcrypt.hashSync(data.password, 12);
      const superAdmin = await db.createUser({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        passwordHash,
        role: "SUPER_ADMIN",
      });

      await db.logSystemEvent(
        "FIRST_RUN_SETUP_COMPLETE",
        `First sovereign Super Administrator initialized: ${superAdmin.email}`,
        `User ID #${superAdmin.id}`,
      );

      await db.logAuditEvent({
        userId: superAdmin.id,
        userEmail: superAdmin.email,
        action: "FIRST_RUN_SETUP",
        entity: "USER",
        entityId: String(superAdmin.id),
        details: "Initial Super Administrator created via authenticated setup wizard.",
      });

      // Auto-login and create database session
      const authResult = await authenticateAdmin(data.email, data.password);

      return {
        success: true,
        token: authResult.token,
        user: {
          id: superAdmin.id,
          name: superAdmin.name,
          email: superAdmin.email,
          role: superAdmin.role,
        },
      };
    } catch (err: any) {
      console.error("[First Run Setup Error]:", err);
      return {
        success: false,
        error: `Initialization failed: ${err.message}`,
      };
    }
  });
