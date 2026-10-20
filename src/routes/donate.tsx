import { createFileRoute } from "@tanstack/react-router";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { DonateView } from "./get-involved";

export const Route = createFileRoute("/donate")({
  loader: async () => {
    try {
      const page =
        (await getPublicPage({ data: { slug: "donate" } }).catch(() => null)) ||
        (await getPublicPage({ data: { slug: "get-involved" } }).catch(() => null));
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return { customSections: sections };
    } catch {
      return { customSections: null };
    }
  },
  head: () => ({
    meta: [
      { title: "Donate — Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Every contribution makes a difference. BHTF warmly welcomes support from individuals, organisations, and well-wishers in Bhutan and around the world to help sustain access to essential medicines and vaccines for the people of Bhutan.",
      },
    ],
  }),
  component: function DonatePage() {
    const { customSections } = Route.useLoaderData();
    return <DonateView customSections={customSections} />;
  },
});
