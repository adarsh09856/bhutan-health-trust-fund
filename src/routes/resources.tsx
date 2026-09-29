import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { getPublicReports, getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection, Report } from "@/lib/db/schema";
import { ReportsExperience } from "./reports";

export const Route = createFileRoute("/resources")({
  loader: async () => {
    try {
      const [page, reports] = await Promise.all([
        getPublicPage({ data: { slug: "resources" } }).catch(() => null) ||
          getPublicPage({ data: { slug: "reports" } }).catch(() => null),
        getPublicReports().catch(() => []),
      ]);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return {
        customSections: sections,
        initialReports: reports || [],
      };
    } catch {
      return {
        customSections: null,
        initialReports: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Official Resources & Certified Audits | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official document archive of the Bhutan Health Trust Fund: Royal Charter, Investment Policy Statement, RAA Certified Financial Audits, and Window Financing Requisitions.",
      },
    ],
  }),
  component: function ResourcesRoute() {
    const location = useLocation();
    const isExactResources =
      location.pathname === "/resources" || location.pathname === "/resources/";

    if (!isExactResources) {
      return <Outlet />;
    }

    const loaderData = Route.useLoaderData();
    return (
      <ReportsExperience
        customSections={loaderData?.customSections}
        initialReports={loaderData?.initialReports}
        badge="Official Repository"
        title="Resources, Official Documents & Certified Audits"
        subtitle="Access statutory filings, audited financial statements (2005–2025), Royal Charter proclamations, and quarterly window financing documentation."
        pageSlug="resources"
      />
    );
  },
});
