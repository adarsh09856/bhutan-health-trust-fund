import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { PageRenderer } from "@/components/page-renderer";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";

export const Route = createFileRoute("/about/organization")({
  loader: async () => ({
    page: await getPublicPage({ data: { slug: "about-organization" } }).catch(() => null),
  }),
  head: () => ({
    meta: [
      { title: "Organogram | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Organizational Chart and Governance Organogram of the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

function AboutOrganizationPage() {
  const { page } = Route.useLoaderData();
  const { t } = useLanguage();

  return (
    <div className="space-y-8 sm:space-y-10 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        title={t("organogram_title", "Organogram")}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("nav_organogram", "Organogram") },
        ]}
      />

      {/* Official Organizational Chart (Organogram) Brought to the Top */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="org-organogram"
      >
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          {/* Interactive Organogram Diagram */}
          <div className="max-w-4xl mx-auto pt-4">
            <p className="max-w-2xl mx-auto mb-8 text-center text-sm sm:text-base leading-relaxed text-slate-600">
              {t(
                "organogram_subtitle",
                "Hierarchical governance from the Board of Trustees and Asset Management Committee to the Secretariat Directorate and four operational divisions.",
              )}
            </p>
            {/* Level 1: Board of Directors */}
            <div className="flex justify-center">
              <Link
                to="/about/trustees"
                className="w-full max-w-sm bg-slate-50 hover:bg-emerald-50/50 border-2 border-slate-800 hover:border-emerald-700 rounded-2xl p-4 text-center shadow-xs transition group cursor-pointer block"
              >
                <span className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-900 block">
                  {t("organogram_board", "Board of Trustees")}
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-slate-600">
                  {t("organogram_board_sub", "High-Level Governance • 7 Trustees (Table 1.1)")}
                </span>
              </Link>
            </div>

            {/* Vertical Line */}
              <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Branch to AMC */}
            <div className="relative">
              <div className="w-0.5 h-20 bg-slate-700 mx-auto" />
              <div className="sm:absolute sm:top-1/2 sm:right-1/2 sm:-translate-y-1/2 flex items-center justify-center my-2 sm:my-0">
                <Link
                  to="/about/committees"
                  className="w-full max-w-xs bg-amber-50/70 hover:bg-amber-100/70 border-2 border-amber-800/80 hover:border-amber-900 rounded-2xl p-3 text-center shadow-xs transition group cursor-pointer block"
                >
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-950 block leading-snug">
                    {t("organogram_amc", "Asset Management Committee")}
                  </span>
                  <span className="mt-1 block text-xs text-slate-600">
                    {t("organogram_amc_sub", "Specialized Advisory Sub-committee (Table 1.2)")}
                  </span>
                </Link>
                <div className="hidden sm:block w-16 md:w-20 h-0.5 bg-slate-700" />
              </div>
            </div>

            {/* Level 2: Director */}
            <div className="flex justify-center">
              <Link
                to="/about/secretariat"
                className="w-full max-w-sm bg-slate-50 hover:bg-teal-50/50 border-2 border-slate-800 hover:border-teal-700 rounded-2xl p-4 text-center shadow-xs transition group cursor-pointer block"
              >
                <span className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-900 block">
                  {t("organogram_director", "Director")}
                </span>
                <span className="mt-1 block text-sm font-semibold text-slate-800">
                  {t("organogram_director_name", "Dr. Gyambo Sithey, PhD")}
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-slate-600">
                  {t("organogram_director_sub", "Member Secretary & Executive Head")}
                </span>
              </Link>
            </div>

            {/* Stem Down to 4 Divisions */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />
            <div className="hidden sm:block w-[88%] h-0.5 bg-slate-700 mx-auto" />

            {/* 4 Divisions matching Section 1.3 */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-0 sm:pt-0">
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {t("div_investment", "Investment Management Division")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {t("div_admin", "Administration & Finance Division")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {t("div_programme", "Programme Division")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    {t("div_monitoring", "Monitoring & Evaluation Division")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageRenderer sections={(page?.sections || []) as PageBlockSection[]} pageSlug="about-organization" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
