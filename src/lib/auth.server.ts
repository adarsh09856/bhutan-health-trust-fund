import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { getCookie } from "@tanstack/react-start/server";
import { db } from "./db";
import type { User, UserSession } from "./db/schema";

export const SESSION_COOKIE_NAME = "bhtf_admin_session";

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: string;
  sessionId?: number;
}

// In-Memory IP Rate Limiter (Dual Layer Security: Layer 1 = IP, Layer 2 = Account Lockout)
interface IpAttempt {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const ipAttempts = new Map<string, IpAttempt>();
const MAX_IP_ATTEMPTS = 5;
const IP_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const IP_BLOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function checkIpRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = ipAttempts.get(ip);

  if (!record) {
    return { allowed: true };
  }

  // Check if currently blocked
  if (record.blockedUntil && record.blockedUntil > now) {
    const remainingSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // Reset window if expired
  if (now - record.firstAttempt > IP_WINDOW_MS) {
    ipAttempts.delete(ip);
    return { allowed: true };
  }

  if (record.count >= MAX_IP_ATTEMPTS) {
    record.blockedUntil = now + IP_BLOCK_DURATION_MS;
    return { allowed: false, remainingSeconds: Math.ceil(IP_BLOCK_DURATION_MS / 1000) };
  }

  return { allowed: true };
}

function recordIpFailure(ip: string) {
  const now = Date.now();
  const record = ipAttempts.get(ip);

  if (!record || now - record.firstAttempt > IP_WINDOW_MS) {
    ipAttempts.set(ip, { count: 1, firstAttempt: now });
  } else {
    record.count += 1;
    if (record.count >= MAX_IP_ATTEMPTS) {
      record.blockedUntil = now + IP_BLOCK_DURATION_MS;
    }
  }
}

function resetIpAttempts(ip: string) {
  ipAttempts.delete(ip);
}

/**
 * Generates a SHA-256 hash of a raw token for storage in PostgreSQL user_sessions.
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Creates a cryptographically secure random session token and persists it in PostgreSQL user_sessions.
 */
export async function createDatabaseSession(
  user: User,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ token: string; session: UserSession }> {
  // Generate high-entropy 256-bit token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(rawToken);

  // 7 days validity
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await db.createSession(
    user.id,
    tokenHash,
    ipAddress || undefined,
    userAgent || undefined,
    expiresAt,
  );

  return { token: rawToken, session };
}

/**
 * Verifies a session token against PostgreSQL user_sessions.
 * Instant 0ms session revocation if session or user was deactivated.
 */
export async function verifyDatabaseSession(token: string): Promise<SessionUser | null> {
  if (!token || typeof token !== "string" || token.length < 16) {
    return null;
  }

  try {
    const tokenHash = hashToken(token);
    const result = await db.findSessionByTokenHash(tokenHash);

    if (!result) {
      return null;
    }

    const { user, session } = result;

    // Safety checks
    if (!user.isActive || !session.isActive) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      sessionId: session.id,
    };
  } catch (err: any) {
    console.error("[Session Verification Error]:", err?.message || err);
    return null;
  }
}

/**
 * Authenticates admin credentials with dual-layer brute force protection:
 * Layer 1: Per-IP rate limiting (5 attempts / 15 mins)
 * Layer 2: Per-Account lockout (5 failed attempts locks user account for 15 mins)
 * ZERO hardcoded credentials, ZERO backdoors, ZERO plaintext comparisons.
 */
export async function authenticateAdmin(
  email: string,
  password: string,
  clientIp = "127.0.0.1",
  userAgent?: string,
): Promise<{ success: boolean; user?: User; token?: string; error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();

  // 1. Layer 1 Check: IP Rate Limit
  const ipCheck = checkIpRateLimit(clientIp);
  if (!ipCheck.allowed) {
    await db.logAuditEvent({
      userEmail: normalizedEmail,
      action: "LOGIN_RATE_LIMITED",
      entity: "AUTH",
      details: `IP ${clientIp} temporarily blocked for 15 minutes due to excessive failed attempts.`,
      ipAddress: clientIp,
      userAgent,
    });

    return {
      success: false,
      error: `Too many login attempts from this network. Temporarily locked for ${ipCheck.remainingSeconds || 900} seconds.`,
    };
  }

  // 2. Query Live Database for User
  let user: User | null = null;
  try {
    user = await db.findUserByEmail(normalizedEmail);
  } catch (err: any) {
    console.error("[PostgreSQL Auth Lookup Error]:", err?.message || err);
    return {
      success: false,
      error: "Authentication service unavailable. Please check database connectivity.",
    };
  }

  // User not found
  if (!user) {
    recordIpFailure(clientIp);
    await db.logAuditEvent({
      userEmail: normalizedEmail,
      action: "LOGIN_FAILED_UNKNOWN_USER",
      entity: "AUTH",
      details: "Attempted login with unregistered email address.",
      ipAddress: clientIp,
      userAgent,
    });
    return {
      success: false,
      error: "Invalid email address or password. Please verify credentials.",
    };
  }

  // 3. Layer 2 Check: Account Status & Progressive Lockout
  if (!user.isActive) {
    await db.logAuditEvent({
      userId: user.id,
      userEmail: user.email,
      action: "LOGIN_BLOCKED_INACTIVE",
      entity: "AUTH",
      details: "Attempted login to deactivated administrator account.",
      ipAddress: clientIp,
      userAgent,
    });
    return {
      success: false,
      error: "This administrator account has been deactivated. Please contact the Secretariat.",
    };
  }

  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    const remainingMinutes = Math.ceil(
      (new Date(user.lockedUntil).getTime() - Date.now()) / (60 * 1000),
    );
    await db.logAuditEvent({
      userId: user.id,
      userEmail: user.email,
      action: "LOGIN_BLOCKED_LOCKED_ACCOUNT",
      entity: "AUTH",
      details: `Account currently locked until ${user.lockedUntil.toISOString()}`,
      ipAddress: clientIp,
      userAgent,
    });
    return {
      success: false,
      error: `This account is temporarily locked due to repeated failed attempts. Please retry in ${remainingMinutes} minute(s).`,
    };
  }

  // 4. Cryptographic Password Comparison
  let passwordMatches = false;
  try {
    passwordMatches = bcrypt.compareSync(password, user.passwordHash);
  } catch (err: any) {
    console.error("[Bcrypt Compare Error]:", err?.message || err);
    passwordMatches = false;
  }

  if (!passwordMatches) {
    recordIpFailure(clientIp);
    const lockoutStatus = await db.recordFailedLoginAttempt(normalizedEmail);

    await db.logAuditEvent({
      userId: user.id,
      userEmail: user.email,
      action: lockoutStatus.locked ? "ACCOUNT_LOCKED" : "LOGIN_FAILED_BAD_PASSWORD",
      entity: "AUTH",
      details: lockoutStatus.locked
        ? `Failed attempt #${lockoutStatus.attempts}. Account placed in 15-minute lockout.`
        : `Failed attempt #${lockoutStatus.attempts}.`,
      ipAddress: clientIp,
      userAgent,
    });

    if (lockoutStatus.locked) {
      return {
        success: false,
        error: "Account has been locked for 15 minutes due to 5 consecutive failed login attempts.",
      };
    }

    return {
      success: false,
      error: `Invalid email address or password. (${5 - lockoutStatus.attempts} attempt(s) remaining before temporary lockout).`,
    };
  }

  // 5. Success: Reset Lockouts & Issue Database Session
  await db.resetFailedLoginAttempts(user.id);
  resetIpAttempts(clientIp);

  const { token, session } = await createDatabaseSession(user, clientIp, userAgent);

  await db.logAuditEvent({
    userId: user.id,
    userEmail: user.email,
    action: "LOGIN_SUCCESS",
    entity: "AUTH",
    entityId: String(session.id),
    details: `Session #${session.id} established via database session store.`,
    ipAddress: clientIp,
    userAgent,
  });

  return {
    success: true,
    user,
    token,
  };
}

/**
 * Revokes a session in PostgreSQL
 */
export async function revokeSessionByToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    const tokenHash = hashToken(token);
    const result = await db.findSessionByTokenHash(tokenHash);
    if (result) {
      await db.revokeSession(result.session.id);
      await db.logAuditEvent({
        userId: result.user.id,
        userEmail: result.user.email,
        action: "LOGOUT",
        entity: "AUTH",
        entityId: String(result.session.id),
        details: "User logged out; session revoked in PostgreSQL.",
      });
      return true;
    }
  } catch (err: any) {
    console.error("[Revoke Session Error]:", err?.message || err);
  }
  return false;
}

/**
 * Server-side RBAC Guard: Requires valid administrative session
 */
export async function requireAdminSession(token?: string): Promise<SessionUser> {
  if (!token) {
    throw new Error("UNAUTHORIZED: Sovereign administrative session token is required.");
  }

  const user = await verifyDatabaseSession(token);
  if (!user) {
    throw new Error("UNAUTHORIZED: Invalid or expired sovereign administrative session.");
  }

  return user;
}

/**
 * Server-side RBAC Guard: Requires SUPER_ADMIN role
 */
export async function requireSuperAdminSession(token?: string): Promise<SessionUser> {
  const user = await requireAdminSession(token);
  if (user.role !== "SUPER_ADMIN") {
    throw new Error(
      "FORBIDDEN: Super Administrator privileges required for this statutory action.",
    );
  }
  return user;
}

/**
 * Server-side Request Guard: Extracts token from cookie or explicit argument and validates session
 */
export async function getSessionFromRequest(explicitToken?: string): Promise<SessionUser | null> {
  try {
    const cookieToken = getCookie(SESSION_COOKIE_NAME);
    const token =
      explicitToken ||
      (typeof cookieToken === "string" ? decodeURIComponent(cookieToken) : undefined);
    if (!token) return null;
    return await verifyDatabaseSession(token);
  } catch {
    return null;
  }
}

/**
 * Server-side RBAC Guard for server functions: requires active admin session
 */
export async function requireAdminFromRequest(explicitToken?: string): Promise<SessionUser> {
  const session = await getSessionFromRequest(explicitToken);
  if (!session) {
    throw new Error("UNAUTHORIZED: Sovereign administrative session required.");
  }
  return session;
}

/**
 * Server-side RBAC Guard for server functions: requires SUPER_ADMIN
 */
export async function requireSuperAdminFromRequest(explicitToken?: string): Promise<SessionUser> {
  const session = await requireAdminFromRequest(explicitToken);
  if (session.role !== "SUPER_ADMIN") {
    throw new Error("FORBIDDEN: Super Administrator privileges required.");
  }
  return session;
}
