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
      { title: "Donate to BHTF — 1:1 RGOB Sovereign Matched Healthcare Endowment" },
      {
        name: "description",
        content:
          "Make an official contribution to Bhutan Health Trust Fund. 1:1 RGOB Golden Match, DRC 100% tax exemption, instant official voucher and live tracking.",
      },
    ],
  }),
  component: function DonatePage() {
    const { customSections } = Route.useLoaderData();
    return <DonateView customSections={customSections} />;
  },
});
