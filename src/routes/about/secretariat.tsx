import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Building2,
  Users2,
  TrendingUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Briefcase,
  Layers,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
} from "lucide-react";
import drGyamboDirector from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import staffThinley from "@/assets/bhtf/secretariat/thinley_wangchuk_v2026_sharp.jpg";
import staffSonamChojay from "@/assets/bhtf/secretariat/sonam_chojay.jpg";
import staffProcurement from "@/assets/bhtf/secretariat/rinchen_phuntsho.jpg";
import staffFinance from "@/assets/bhtf/secretariat/tshering_choden.jpg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/about/secretariat")({
  head: () => ({
    meta: [
      { title: "Secretariat & Key Personnel | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Secretariat executive structure, Director Dr. Gyambo Sithey, 4 core operational divisions, and key staff profiles.",
      },
    ],
  }),
  component: SecretariatPage,
});

function SecretariatPage() {
  const { t, isDzongkha } = useLanguage();

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge={t("secretariat_page_badge", "Executive Directorate")}
        title={t("secretariat_page_title", "Secretariat")}
        subtitle={t(
          "secretariat_page_subtitle",
          "The executive arm of the Bhutan Health Trust Fund executing day-to-day operations, endowment investments, and healthcare procurement disbursements."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("secretariat_page_title", "Secretariat") },
        ]}
      />

      {/* 1. Core Secretariat Operational Divisions */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-divisions">
        <SectionEditBadge
          label="Secretariat Operational Divisions"
          pageSlug="about-secretariat"
          sectionId="secretariat-divisions"
          studioHref="/admin/page-editor?slug=about-secretariat"
          initialData={{
            title: "Secretariat Operational Divisions",
            subtitle: "Four operational divisions executing day-to-day management and procurement.",
            badge: "Operational Structure",
          }}
        />

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              {isDzongkha ? "དབྱེ་ཚན་ ༡.༣ • ལག་ལེན་སྡེ་ཚན་ཚུ།" : "Section 1.3 • Operational Divisions"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              {t("secretariat_divisions_title", "Secretariat Operational Divisions")}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light">
              {t(
                "secretariat_divisions_sub",
                "Under the leadership of the Director & Member Secretary, the Secretariat manages four specialized operational divisions to fulfill the statutory objectives of the Fund."
              )}
            </p>
          </div>

          {/* 4 Divisions Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_investment", "Investment Management Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_investment_desc",
                    "Oversees endowment portfolio management, yield generation, onshore/offshore asset allocations, and liquidity monitoring."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-emerald-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "མ་རྩ་བདག་སྐྱོང་།" : "Endowment Stewardship"}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_admin", "Administration & Finance Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_admin_desc",
                    "Directs statutory accounting, audit compliance, human resources, IT infrastructure, and secretariat procurement support."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-amber-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "ཁྲིམས་མཐུན་དངུལ་རྩིས།" : "Statutory Fiduciary"}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_programme", "Programme Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_programme_desc",
                    "Coordinates with the Ministry of Health on the procurement of 438 essential medicines, traditional medicines, and universal vaccines."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-teal-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "སྨན་རྫས་མཁོ་སྒྲུབ།" : "Commodity Procurement"}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-800 grid place-items-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_monitoring", "Monitoring & Evaluation Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_monitoring_desc",
                    "Tracks distribution to health centers, formulary adherence, stock integrity, and primary healthcare outcomes across all 20 Dzongkhags."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-sky-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "སྤུས་ཚད་དང་ བདེན་དཔྱད།" : "Quality & Verification"}
              </div>
            </div>
          </div>

          {/* Reference Link to Organization & Organogram */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              {isDzongkha
                ? "བདག་སྐྱོང་གི་གོ་རིམ་དང་ སྙན་ཞུའི་ལམ་ལུགས་རྒྱས་པ་གཟིགས་ནིའི་དོན་ལུ་:"
                : "To view the overarching governance hierarchy and reporting lines:"}
            </span>
            <Link
              to="/about/organization"
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950 transition"
            >
              <span>
                {isDzongkha
                  ? "ལས་ཁུངས་དང་བཀོད་རིམ་རེའུ་མིག་ (Organogram) ནང་གཟིགས།"
                  : "View Organizational Chart (Organogram) in Organization & Mandate"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Secretariat Staff Profiles in Clean NPPF Institutional Style */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-roster">
        <SectionEditBadge
          label="Secretariat Personnel Roster"
          pageSlug="about-secretariat"
          sectionId="secretariat-roster"
          studioHref="/admin/page-editor?slug=about-secretariat"
          initialData={{
            title: "Secretariat Directorate & Officers",
            subtitle: "Dedicated professionals managing fiduciary operations, international commodity procurement, and statutory compliance.",
            badge: "Executive Leadership & Key Personnel",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block mb-2">
            {isDzongkha ? "ལག་ལེན་དབུ་ཁྲིད་དང་ གཙོ་བོའི་འགོ་དཔོན་ཚུ།" : "Executive Leadership & Key Personnel"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            {isDzongkha ? "དྲུང་ཆེན་ཡིག་ཚང་གི་ དབུ་ཁྲིད་དང་ འགོ་དཔོན་ཚུ།" : "Secretariat Directorate & Officers"}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 font-light">
            {isDzongkha
              ? "དངུལ་རྩིས་ལག་ལེན་དང་ རྒྱལ་སྤྱིའི་སྨན་རྫས་མཁོ་སྒྲུབ། ཁྲིམས་མཐུན་བསྟུན་སྒྲིག་ཚུ་ འགན་ལེན་འབད་མི་ དམིགས་བསལ་འགོ་དཔོན་ཚུ།"
              : "Dedicated professionals managing fiduciary operations, international commodity procurement, and statutory compliance."}
          </p>
        </div>

        {/* 1. Director Featured Leadership Card (NPPF Core Management Pattern) */}
        <div className="max-w-md mx-auto mb-10 sm:mb-12">
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition text-center flex flex-col items-center">
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 mb-4 shadow-2xs">
              <img
                src={drGyamboDirector}
                alt="Dr. Gyambo Sithey, PhD"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {t("organogram_director_name", "Dr. Gyambo Sithey, PhD")}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
              {isDzongkha ? "མདོ་ཆེན། དྲུང་ཆེན་ཡིག་ཚང་།" : "Director, Secretariat"}
            </p>
            <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
              {t("organogram_director_sub", "Member Secretary & Executive Head")}
            </p>
            <span className="inline-block text-[10px] font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full mt-3">
              {isDzongkha ? "མདོ་ཆེན་དབུ་ཁྲིད།" : "Directorate Leadership"}
            </span>
          </div>
        </div>

        {/* 2. Key Officers & Staff (NPPF Senior Management Grid Pattern) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Senior Program Officer */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 text-center flex flex-col items-center justify-between group">
            <div className="flex flex-col items-center w-full">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 mb-4 shadow-2xs">
                <img
                  src={staffFinance}
                  alt="Ms. Tshering Choden"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                {isDzongkha ? "སྐུ་ཞབས་ ཚེ་རིང་ཆོས་ལྡན།" : "Ms. Tshering Choden"}
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                {isDzongkha ? "ལས་རིམ་འགོ་དཔོན་གཙོ་འཛིན།" : "Senior Program Officer"}
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                {t("div_programme", "Programme Division")}
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{isDzongkha ? "ལས་རིམ་ལག་ལེན།" : "Programme Operations"}</span>
            </div>
          </div>

          {/* Senior Investment Officer */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 text-center flex flex-col items-center justify-between group">
            <div className="flex flex-col items-center w-full">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 mb-4 shadow-2xs">
                <img
                  src={staffThinley}
                  alt="Mr. Thinley Wangchuk"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                {isDzongkha ? "སྐུ་ཞབས་ འཕྲིན་ལས་དབང་ཕྱུག" : "Mr. Thinley Wangchuk"}
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                {isDzongkha ? "མ་རྩ་བཙུགས་བཞག་འགོ་དཔོན་གཙོ་འཛིན།" : "Senior Investment Officer"}
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                {t("div_investment", "Investment Management Division")}
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{isDzongkha ? "མ་རྩ་འོང་འབབ།" : "Endowment Yields"}</span>
            </div>
          </div>

          {/* Accounts Officer */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 text-center flex flex-col items-center justify-between group">
            <div className="flex flex-col items-center w-full">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 mb-4 shadow-2xs">
                <img
                  src={staffSonamChojay}
                  alt="Mr. Sonam Chojay"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                {isDzongkha ? "སྐུ་ཞབས་ བསོད་ནམས་ཆོས་རྒྱལ།" : "Mr. Sonam Chojay"}
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                {isDzongkha ? "རྩིས་ཁྲ་འགོ་དཔོན།" : "Accounts Officer"}
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                {t("div_admin", "Administration & Finance Division")}
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{isDzongkha ? "དངུལ་རྩིས་བསྟུན་སྒྲིག" : "Fiduciary Compliance"}</span>
            </div>
          </div>

          {/* Driver */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 text-center flex flex-col items-center justify-between group">
            <div className="flex flex-col items-center w-full">
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 mb-4 shadow-2xs">
                <img
                  src={staffProcurement}
                  alt="Mr. Rinchen Phuntsho"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                {isDzongkha ? "སྐུ་ཞབས་ རིན་ཆེན་ཕུན་ཚོགས།" : "Mr. Rinchen Phuntsho"}
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                {isDzongkha ? "སྣུམ་འཁོར་གཏོང་མི།" : "Driver"}
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                {isDzongkha ? "རྒྱབ་སྐྱོར་དོ་དམ།" : "Support Logistics"}
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{isDzongkha ? "འགྲོ་འགྲུལ་སྐྱེལ་འདྲེན།" : "Field Transport"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Secretariat Official Contact Details & Office Location (Section 7) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-contact">
        <SectionEditBadge
          label="Secretariat Contact & HQ"
          pageSlug="about-secretariat"
          sectionId="secretariat-contact"
          studioHref="/admin/settings"
          initialData={{
            title: "Bhutan Health Trust Fund Office",
            subtitle: "Lower Motithang, Thori Lam, Thimphu, Bhutan",
            badge: "Section 7 • Official Contact",
          }}
        />
        <div className="bg-gradient-to-br from-slate-900 via-[#071914] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              {isDzongkha ? "དབྱེ་ཚན་ ༧ • གཞུང་འབྲེལ་འབྲེལ་གཏུགས།" : "Section 7 • Official Contact"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {isDzongkha ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་ ཡིག་ཚང་།" : "Bhutan Health Trust Fund Office"}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl">
              {isDzongkha
                ? "འདྲི་དཔྱད་ག་ཅི་ཡོད་རུང་ གློག་འཕྲིན་ bhtf@bhtf.bt ཡང་ན་ ཐིམ་ཕུག་ལུ་ཡོད་པའི་ མ་དངུལ་གྱི་ཡིག་ཚང་ལུ་ འབྲེལ་བ་འཐབ་གནང་།"
                : "For any enquiries, please contact us at bhtf@bhtf.bt or visit the BHTF office in Thimphu."}
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-200 shrink-0">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>{t("topbar_address", "Lower Motithang, Thimphu")}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>02-338636 / 338637 / 77348083</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>bhtf@bhtf.bt</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-300 font-mono">
              <span className="font-bold">WhatsApp:</span>
              <span>77348083</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Navigation Capsule for About Sub-Pages */}
      <AboutBottomCapsule />
    </div>
  );
}
