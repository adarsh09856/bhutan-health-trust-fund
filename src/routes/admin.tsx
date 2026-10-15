import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { verifyCurrentSession } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    if (["/admin/login", "/admin/setup"].includes(location.pathname)) return;
    const { user } = await verifyCurrentSession({ data: {} });
    if (!user) throw redirect({ to: "/admin/login" });
    if (user.role !== "SUPER_ADMIN" && ["/admin/users", "/admin/audit-logs"].includes(location.pathname)) {
      throw redirect({ to: "/admin/dashboard" });
    }
  },
  component: Outlet,
});
