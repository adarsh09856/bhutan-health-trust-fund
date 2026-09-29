import { createFileRoute } from "@tanstack/react-router";
import {
  getPublicPrograms,
  getPublicProcurementSteps,
  getPublicPage,
} from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { OurWorkExperience } from "./our-work";

export const Route = createFileRoute("/our-impact")({
  loader: async () => {
    try {
      const [page, programs, steps] = await Promise.all([
        getPublicPage({ data: { slug: "our-impact" } }).catch(() => null) ||
          getPublicPage({ data: { slug: "our-work" } }).catch(() => null),
        getPublicPrograms().catch(() => []),
        getPublicProcurementSteps().catch(() => []),
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
        livePrograms: programs || [],
        liveSteps: steps || [],
      };
    } catch {
      return {
        customSections: null,
        livePrograms: [],
        liveSteps: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Our Impact & Health Commodities | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Discover how BHTF finances essential medicines, life-saving vaccines, diagnostics, and cold chain logistics across all 20 Dzongkhags of Bhutan.",
      },
    ],
  }),
  component: function OurImpactPage() {
    const loaderData = Route.useLoaderData();
    return (
      <OurWorkExperience
        customSections={loaderData?.customSections}
        livePrograms={loaderData?.livePrograms}
        liveSteps={loaderData?.liveSteps}
        pageSlug="our-impact"
      />
    );
  },
});
