import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authenticateAdmin, createSessionToken, verifySessionToken } from "../auth.server";

export const adminLogin = createServerFn({ method: "POST" })
  .validator(
    z.object({
      email: z.string().email("Valid email required"),
      password: z.string().min(1, "Password is required"),
    })
  )
  .handler(async ({ data }) => {
    try {
      const user = await authenticateAdmin(data.email, data.password);
      if (!user) {
        return {
          success: false,
          error: "Invalid email address or password. Please verify credentials.",
        };
      }

      const token = createSessionToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      return {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (err: any) {
      console.error("[Admin Auth Error]:", err);
      const msg = err?.message || String(err);
      if (
        msg.includes("connect") ||
        msg.includes("ECONNREFUSED") ||
        msg.includes("relation") ||
        msg.includes("password authentication failed") ||
        msg.includes("database")
      ) {
        return {
          success: false,
          error: "Database unreachable or not initialized. Ensure PostgreSQL is active on aaPanel and 'npm run db:push && npm run db:seed' was executed.",
        };
      }
      return {
        success: false,
        error: "Authentication service error: " + (err?.message || "Unknown error"),
      };
    }
  });

export const verifyCurrentSession = createServerFn({ method: "POST" })
  .validator(z.object({ token: z.string().optional() }))
  .handler(async ({ data }) => {
    if (!data.token) {
      return { user: null };
    }
    const session = verifySessionToken(data.token);
    return { user: session };
  });
