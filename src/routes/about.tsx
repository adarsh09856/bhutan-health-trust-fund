import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Landmark,
  Scale,
  Building,
  CheckCircle2,
  FileText,
  Lock,
  Coins,
  ArrowRight,
  Users,
  Sparkles,
  Pill,
  Syringe,
} from "lucide-react";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/about")({
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
  const isExactAbout = location.pathname === "/about" || location.pathname === "/about/";

  if (!isExactAbout) {
    return <Outlet />;
  }

  return <AboutUsMainPage />;
}

function AboutUsMainPage() {
  const { t, isDzongkha } = useLanguage();

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 sm:pb-24 bg-[#FAF8F3]">
      {/* 1. Primary Statutory Hero with Official Narrative Directly in View (Matches Client Spec) */}
      <PageHero
        badge={
          isDzongkha
            ? "ཁྲིམས་མཐུན་ངོ་སྤྲོད། • རྒྱལ་པོའི་བཀའ་ཤོག་ ༢༠༠༠"
            : "STATUTORY PROFILE • ROYAL CHARTER 2000"
        }
        title={
          isDzongkha
            ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་སྐོར།"
            : "About the Bhutan Health Trust Fund"
        }
        breadcrumb={[{ label: t("nav_about_us", "About Us") }]}
      >
        <div className="relative" data-bhtf-section="about-us-narrative">
          <SectionEditBadge
            label="About Us Narrative"
            pageSlug="about"
            sectionId="about-us-narrative"
            studioHref="/admin/page-editor?slug=about"
            initialData={{
              title: "About the Bhutan Health Trust Fund",
              subtitle: "Official narrative approved by the BHTF Secretariat.",
              badge: "STATUTORY PROFILE • ROYAL CHARTER 2000",
            }}
          />

          {/* Official 4-Paragraph Narrative Directly Inside the Hero View */}
          <div className="bg-white/85 backdrop-blur-xs rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-sm space-y-4 max-w-5xl">
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
              <p className="font-normal text-slate-800">{t("about_p1")}</p>
              <p className="font-normal text-slate-800">{t("about_p2")}</p>
              <p className="font-normal text-slate-800">{t("about_p3")}</p>
              <p className="font-normal text-slate-800">{t("about_p4")}</p>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-4 border-t border-slate-200/70 flex flex-wrap gap-3 items-center">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B4F42] hover:bg-[#073C32] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm transition active:scale-95 whitespace-nowrap"
              >
                <Heart className="size-4 fill-current text-amber-300" />
                <span>{t("home_btn_donate", "Donate (1:1 Sovereign Match)")}</span>
              </Link>

              <Link
                to="/about/organization"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-900 shadow-2xs transition active:scale-95 whitespace-nowrap"
              >
                <span>{t("nav_organization", "Organization & Organogram")}</span>
                <ArrowRight className="size-3.5 text-emerald-800" />
              </Link>
            </div>
          </div>
        </div>
      </PageHero>

      {/* 2. About Us Governance & Institutional Navigation Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-slate-200/80 pt-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Institutional Sections
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Explore Governance, Mandate & Administration
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            Dedicated sections covering the statutory mandate, apex trustees, investment committee, and executive secretariat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Card 1: Organization & Organogram */}
          <Link
            to="/about/organization"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Target className="size-6 text-emerald-800" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 block">
                Statutory Mandate & Organogram
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Organization & Organogram
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Our Mandate, Vision, Mission, 70–20–10 financial model, and full organizational chart.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Organization</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Board of Trustees */}
          <Link
            to="/about/trustees"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-6 text-amber-800" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 block">
                Table 1.1 • Apex Board
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Board of Trustees
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Official directory of the 7 Board members headed by the Hon'ble Minister for Health.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Trustees</span>
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
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 block">
                Table 1.2 • Fiduciary Oversight
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Asset Management Committee
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
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 block">
                Section 1.3 • Executive Arm
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Secretariat & Personnel
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Director Dr. Gyambo Sithey, 4 core operational divisions, and key officer profiles.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Secretariat</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
