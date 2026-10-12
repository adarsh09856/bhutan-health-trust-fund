import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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
import staffFinance from "@/assets/bhtf/secretariat/tshering_choden.jpg";
import staffProcurement from "@/assets/bhtf/secretariat/rinchen_phuntsho.jpg";

export const Route = createFileRoute("/about/secretariat")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "about-secretariat" } }).catch(() => null);
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
      { title: "Secretariat & Organogram | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Secretariat organizational structure, Director's office, approved division staffing cadres (Annexure 1), and operational leadership of BHTF.",
      },
    ],
  }),
  component: SecretariatPage,
});

function SecretariatPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Executive Operations"
        title="Secretariat & Organizational Structure"
        subtitle="The executive arm executing daily health endowment investments, international vaccine procurement, and primary medicine distributions across Bhutan."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Secretariat & Organogram" },
        ]}
      />

      {/* Sub-Navigation Pill Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex items-center justify-start sm:justify-start gap-2 text-xs font-bold overflow-x-auto no-scrollbar sm:flex-wrap">
          <Link
            to="/about/organization"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Our Organization & Organogram
          </Link>
          <Link
            to="/about/trustees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Board of Trustees
          </Link>
          <Link
            to="/about/committees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Asset Management Committee
          </Link>
          <Link
            to="/about/secretariat"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs shrink-0 whitespace-nowrap"
          >
            Secretariat & Staff
          </Link>
          <Link
            to="/our-story"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition shrink-0 whitespace-nowrap"
          >
            Our Story & History →
          </Link>
        </div>
      </section>

      {/* Executive Overview Banner & Link to Organogram under Our Organization */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-overview">
        <SectionEditBadge
          label="Secretariat Operations"
          pageSlug="about-secretariat"
          sectionId="secretariat-overview"
          studioHref="/admin/page-editor?slug=about-secretariat"
          initialData={{
            title: "Executive Arm of the Health Trust Fund",
            subtitle: "The Secretariat manages daily fiduciary investments, international vaccine procurement, and healthcare distributions under Board governance.",
            badge: "Operational Secretariat",
          }}
        />
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              Operational Secretariat
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
              Executive Arm of the Health Trust Fund
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Operating under the direct supervision of the Director and the Board of Trustees, the Secretariat executes statutory health endowment investments, nationwide commodity procurement, and cold-chain logistics across all 20 Dzongkhags.
            </p>
          </div>
          <Link
            to="/about/organization"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition text-xs font-bold shrink-0 shadow-xs"
          >
            <span>View Approved Organogram Tree</span>
            <ArrowRight className="h-4 w-4 text-amber-400" />
          </Link>
        </div>
      </section>

      {/* Secretariat Staff Profiles */}
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
            Executive Leadership & Key Personnel
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Secretariat Directorate & Officers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Dedicated professionals managing fiduciary operations, international commodity procurement, and statutory compliance.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {/* 1. Director Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/5] bg-[#F5F4EF] p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={drGyamboDirector}
                  alt="Dr. Gyambo Sithey, PhD"
                  className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                  Directorate
                </span>
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug">Dr. Gyambo Sithey, PhD</h3>
                <p className="text-[11px] font-semibold text-teal-700">Director</p>
              </div>
            </div>
          </div>

          {/* 2. Senior Program Officer Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/5] bg-[#F5F4EF] p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={staffFinance}
                  alt="Ms. Tshering Choden"
                  className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                  Programme Division
                </span>
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug">Ms. Tshering Choden</h3>
                <p className="text-[11px] font-semibold text-emerald-700">Senior Program Officer</p>
              </div>
            </div>
          </div>

          {/* 3. Senior Investment Officer Card (Third Sequence) */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/5] bg-[#F5F4EF] p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={staffThinley}
                  alt="Mr. Thinley Wangchuk"
                  className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full inline-block">
                  Investment Management
                </span>
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug">Mr. Thinley Wangchuk</h3>
                <p className="text-[11px] font-semibold text-teal-700">Senior Investment Officer</p>
              </div>
            </div>
          </div>

          {/* 4. Accounts Officer Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/5] bg-[#F5F4EF] p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={staffSonamChojay}
                  alt="Mr. Sonam Chojay"
                  className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
                  Admin & Finance
                </span>
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug">Mr. Sonam Chojay</h3>
                <p className="text-[11px] font-semibold text-amber-700">Accounts Officer</p>
              </div>
            </div>
          </div>

          {/* 5. Driver Card */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/5] bg-[#F5F4EF] p-2 overflow-hidden flex items-center justify-center">
                <img
                  src={staffProcurement}
                  alt="Mr. Rinchen Phuntsho"
                  className="w-full h-full object-contain rounded-xl hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-wider font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full inline-block">
                  Support Logistics
                </span>
                <h3 className="font-serif text-sm font-bold text-slate-900 leading-snug">Mr. Rinchen Phuntsho</h3>
                <p className="text-[11px] font-semibold text-slate-700">Driver</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secretariat Contact Details & Office Location */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-contact">
        <SectionEditBadge
          label="Secretariat Contact & HQ"
          pageSlug="about-secretariat"
          sectionId="secretariat-contact"
          studioHref="/admin/settings"
          initialData={{
            title: "Bhutan Health Trust Fund Office",
            subtitle: "Operating from the BTFEC Office Building in Genyen Lam, Thimphu, serving all primary healthcare units across the Kingdom.",
            badge: "Secretariat Headquarters",
          }}
        />
        <div className="bg-gradient-to-br from-slate-900 via-[#071914] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              Secretariat Headquarters
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Bhutan Health Trust Fund Office
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl">
              Operating from the BTFEC Office Building in Genyen Lam, Thimphu, serving all primary healthcare units across the Kingdom.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-200 shrink-0">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>BTFEC Office Building, Genyen Lam, Thimphu, Bhutan</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>+975 2 322424</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>bhtf@bhtf.bt</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
