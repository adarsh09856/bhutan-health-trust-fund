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
    const user = await authenticateAdmin(data.email, data.password);
    if (!user) {
      return {
        success: false,
        error: "Invalid email address or password. Please try again.",
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
