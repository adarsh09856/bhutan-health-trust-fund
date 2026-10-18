import { createFileRoute, Navigate, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Royal Mandate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Learn about BHTF's Royal Charter mandate, Board of Trustees, sustainable endowment model, and history financing medicines and vaccines for Bhutan.",
      },
    ],
  }),
  component: AboutRouteComponent,
});

function AboutRouteComponent() {
  const location = useLocation();
  const isExactAbout = location.pathname === "/about" || location.pathname === "/about/";

  if (isExactAbout) {
    return <Navigate to="/about/organization" replace />;
  }

  return <Outlet />;
}
