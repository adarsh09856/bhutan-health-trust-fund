import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  authenticateAdmin,
  getSessionFromRequest,
  revokeSessionByToken,
  SESSION_COOKIE_NAME,
} from "../auth.server";
import { db } from "../db";
import {
  deleteCookie,
  getCookie,
  getRequestHeader,
  getRequestIP,
  getRequestProtocol,
  setCookie,
} from "@tanstack/react-start/server";

export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Valid email required"),
      password: z.string().min(1, "Password is required"),
    }),
  )
  .handler(async ({ data }) => {
    try {
      const clientIp = getRequestIP({ xForwardedFor: true }) || "unknown";
      const result = await authenticateAdmin(data.email, data.password, clientIp, getRequestHeader("user-agent"));

      if (!result.success || !result.user || !result.token) {
        return {
          success: false,
          error: "Invalid email address or password. Please verify your credentials.",
        };
      }

      const secureCookie = getRequestProtocol({ xForwardedProto: true }) === "https";
      setCookie(SESSION_COOKIE_NAME, result.token, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          role: result.user.role,
        },
      };
    } catch (err: any) {
      console.error("[Admin Auth Error]:", err);
      return {
        success: false,
        error: "Authentication service is temporarily unavailable. Please try again.",
      };
    }
  });

export const adminLogout = createServerFn({ method: "POST" })
  .validator(z.object({}).optional())
  .handler(async () => {
    const token = getCookie(SESSION_COOKIE_NAME);
    if (token) {
      await revokeSessionByToken(token);
    }
    deleteCookie(SESSION_COOKIE_NAME, {
      path: "/",
      secure: getRequestProtocol({ xForwardedProto: true }) === "https",
      sameSite: "lax",
    });
    return { success: true };
  });

export const verifyCurrentSession = createServerFn({ method: "POST" })
  .validator(z.object({}).optional())
  .handler(async () => {
    const token = getCookie(SESSION_COOKIE_NAME);
    const sessionUser = await getSessionFromRequest();
    if (token && sessionUser) {
      setCookie(SESSION_COOKIE_NAME, token, {
        httpOnly: true,
        secure: getRequestProtocol({ xForwardedProto: true }) === "https",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }
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
    const expectedToken = process.env.SETUP_TOKEN;
    if (!expectedToken || data.setupToken.trim() !== expectedToken.trim()) {
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
      const authResult = await authenticateAdmin(
        data.email,
        data.password,
        getRequestIP({ xForwardedFor: true }) || "unknown",
        getRequestHeader("user-agent"),
      );

      setCookie(SESSION_COOKIE_NAME, authResult.token!, {
        httpOnly: true,
        secure: getRequestProtocol({ xForwardedProto: true }) === "https",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
      return {
        success: true,
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
        error: "Initialization could not be completed. Please try again or contact the system administrator.",
      };
    }
  });
