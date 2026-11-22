import { useState } from "react";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { PageHero } from "@/components/page-hero";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import {
  Target,
  Eye,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/about")({
  loader: async () => ({
    page: await getPublicPage({ data: { slug: "about" } }).catch(() => null),
  }),
  head: () => ({
    meta: [
      { title: "About Us | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official profile of the Bhutan Health Trust Fund (BHTF), established by Royal Charter to sustain free primary healthcare, essential medicines, and vaccines in Bhutan.",
      },
    ],
  }),
  component: AboutRouteComponent,
});

function AboutRouteComponent() {
  const location = useLocation();
  const { page } = Route.useLoaderData();
  const isExactAbout = location.pathname === "/about" || location.pathname === "/about/";

  if (!isExactAbout) {
    return <Outlet />;
  }

  return <AboutUsMainPage sections={page?.sections || []} />;
}

function AboutUsMainPage({ sections }: { sections: PageBlockSection[] }) {
  const { t, isDzongkha } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-12 sm:space-y-16 pb-28 sm:pb-36 bg-[#FAF8F3]">
      {/* 1. Primary Statutory Hero with Official Narrative Directly in View */}
      <PageHero
        title={t("nav_about_us", "About Us")}
        breadcrumb={[{ label: t("nav_about_us", "About Us") }]}
        showTitle={false}
      >
        <div className="relative" data-bhtf-section="about-us-narrative">
          {/* Official Narrative with Read More Expander */}
          <div className="bg-white/85 backdrop-blur-xs rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm space-y-4 max-w-5xl">
            <div id="about-narrative-content" className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              <p className="font-normal text-slate-800">{isExpanded ? t("about_p1") : t("about_p1_preview")}</p>
              {isExpanded && (
                <>
                  <p className="font-normal text-slate-800 animate-fadeIn">{t("about_p2")}</p>
                  <p className="font-normal text-slate-800 animate-fadeIn">{t("about_p3")}</p>
                  <p className="font-normal text-slate-800 animate-fadeIn">{t("about_p4")}</p>
                </>
              )}
            </div>

            {/* Read More / Read Less Toggle */}
            <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls="about-narrative-content"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-emerald-800 hover:text-emerald-950 transition cursor-pointer px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80"
              >
                <span>{isExpanded ? (isDzongkha ? "ཉུང་སུ་སྟོན།" : "Read Less") : (isDzongkha ? "ལྷག་པ་ལྷག" : "Read More")}</span>
                {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </button>

            </div>
          </div>
        </div>
      </PageHero>

      {/* 2. Mandate, Vision & Mission */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="about-tenets">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mandate */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-emerald-300 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center">
                <Target className="size-6 text-emerald-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t("tenet_mandate_title", "Our Mandate")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {t(
                  "tenet_mandate_text",
                  "To ensure sustainable financing for essential medicines and vaccines through prudent fund management and responsible investment."
                )}
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-amber-300 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center">
                <Eye className="size-6 text-amber-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t("tenet_vision_title", "Our Vision")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {t(
                  "tenet_vision_text",
                  "A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come."
                )}
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-teal-300 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center">
                <Heart className="size-6 text-teal-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {t("tenet_mission_title", "Our Mission")}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {t(
                  "tenet_mission_text",
                  "To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for financing essential medicines, vaccines, and related health supplies."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <PageRenderer sections={sections} pageSlug="about" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
