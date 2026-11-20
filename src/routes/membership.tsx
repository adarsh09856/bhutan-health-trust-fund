import { createFileRoute, Outlet, useLocation, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/membership")({
  component: MembershipLayout,
});

function MembershipLayout() {
  const location = useLocation();
  if (location.pathname === "/membership" || location.pathname === "/membership/") {
    return <Navigate to="/membership/institutional" replace />;
  }
  return <Outlet />;
}
