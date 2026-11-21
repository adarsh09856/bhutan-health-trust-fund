import { useState } from "react";
import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
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
  ShieldCheck,
  Scale,
  Users,
  ArrowRight,
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

            {/* Read More / Read Less Toggle & Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
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

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to="/donate"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#0B4F42] hover:bg-[#073C32] px-4 py-1.5 text-xs font-bold text-white shadow-xs transition active:scale-95"
                >
                  <Heart className="size-3.5 fill-current text-amber-300" />
                  <span>{t("home_btn_donate", "Donate (1:1 Sovereign Match)")}</span>
                </Link>
                <Link
                  to="/about/organization"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 px-4 py-1.5 text-xs font-bold text-slate-800 shadow-2xs transition active:scale-95"
                >
                  <span>{t("nav_organization", "Organization & Organogram")}</span>
                  <ArrowRight className="size-3 text-emerald-800" />
                </Link>
              </div>
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

      {/* 3. Governance & Institutional Navigation Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-slate-200/80 pt-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Institutional Sections
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
            {t("about_explore_title", "Explore Governance, Mandate & Administration")}
          </h3>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl font-light">
            Comprehensive oversight across our legal framework, fiduciary leadership, operational divisions, and investment policies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Organogram & Structure */}
          <Link
            to="/about/organization"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Target className="size-6 text-emerald-800" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                {t("nav_organization", "Organogram & Structure")}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Mandate, Royal Charter Governance Framework, 70–20–10 financial model, and full organizational chart.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Organogram</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Board of Directors */}
          <Link
            to="/about/trustees"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-6 text-amber-800" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                {t("nav_trustees", "Board of Directors")}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Official directory of the Board of Directors headed by the Hon'ble Minister for Health.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Directors</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Asset Management Committee */}
          <Link
            to="/about/committees"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Scale className="size-6 text-teal-800" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                {t("nav_amc", "Asset Management Committee")}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Supporting responsible management and investment oversight of the Fund’s assets.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Committee</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Secretariat */}
          <Link
            to="/about/secretariat"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Users className="size-6 text-blue-800" />
              </div>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                {t("nav_secretariat", "Secretariat")}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Director Dr. Gyambo Sithey, operational divisions, and key officer profiles.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Secretariat</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      <PageRenderer sections={sections} pageSlug="about" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
