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
import staffProcurement from "@/assets/bhtf/secretariat/rinchen_phuntsho.jpg";
import staffFinance from "@/assets/bhtf/secretariat/tshering_choden.jpg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";

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
          "Official Secretariat organizational structure, Director Dr. Gyambo Sithey, 4 core operational divisions, and key staff profiles.",
      },
    ],
  }),
  component: SecretariatPage,
});

function SecretariatPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge="Section 1.3 • Executive Structure"
        title="Secretariat and organizational chart"
        subtitle="The executive arm of the Bhutan Health Trust Fund executing day-to-day operations, endowment investments, and healthcare procurement disbursements."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about/organization" },
          { label: "Secretariat and organogram" },
        ]}
      />

      {/* Custom Page Renderer if edited by admin */}
      {customSections && customSections.length > 0 && (
        <PageRenderer sections={customSections} pageSlug="about-secretariat" />
      )}

      {/* 1. Official Section 1.3 Organogram Chart */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-organogram">
        <SectionEditBadge
          label="Secretariat Organogram"
          pageSlug="about-secretariat"
          sectionId="secretariat-organogram"
          studioHref="/admin/page-editor?slug=about-secretariat"
          initialData={{
            title: "1.3 Secretariat and Organizational Chart",
            subtitle: "Approved organizational structure of the Secretariat with 4 core divisions.",
            badge: "Section 1.3 • Organogram",
          }}
        />

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              Section 1.3 • Organizational Chart
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              Secretariat and Organizational Chart
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light">
              Hierarchical governance from the Board of Trustees and Asset Management Committee to the Secretariat Directorate and four operational divisions.
            </p>
          </div>

          {/* Clean Organogram Diagram */}
          <div className="max-w-4xl mx-auto pt-4">
            {/* Level 1: Board */}
            <div className="flex justify-center">
              <div className="w-64 bg-slate-50 border-2 border-slate-800 rounded-2xl p-4 text-center shadow-xs">
                <span className="font-serif font-bold text-base text-slate-900 block">Board of Trustees</span>
                <span className="text-[10px] text-slate-500 font-sans block mt-0.5">High-Level Governance</span>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Branch to AMC */}
            <div className="relative">
              <div className="w-0.5 h-20 bg-slate-700 mx-auto" />
              <div className="sm:absolute sm:top-1/2 sm:right-1/2 sm:-translate-y-1/2 flex items-center justify-center my-2 sm:my-0">
                <div className="w-60 bg-amber-50/70 border-2 border-amber-800/80 rounded-2xl p-3 text-center shadow-xs">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 block leading-snug">
                    Asset Management Committee
                  </span>
                  <span className="text-[10px] text-amber-800 font-sans block mt-0.5 font-semibold">Specialized Advisory Sub-committee</span>
                </div>
                <div className="hidden sm:block w-16 md:w-20 h-0.5 bg-slate-700" />
              </div>
            </div>

            {/* Level 2: Director */}
            <div className="flex justify-center">
              <div className="w-64 bg-slate-50 border-2 border-slate-800 rounded-2xl p-4 text-center shadow-xs">
                <span className="font-serif font-bold text-base text-slate-900 block">Director</span>
                <span className="text-[11px] text-emerald-800 font-sans block mt-0.5 font-semibold">Dr. Gyambo Sithey, PhD</span>
                <span className="text-[10px] text-slate-500 font-sans block">Member Secretary & Executive Head</span>
              </div>
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
                    Investment Management Division
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Administration & Finance Division
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Programme Division
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Monitoring & Evaluation Division
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Document Organogram Graphic */}
          <div className="pt-6 border-t border-slate-100 flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Official Organogram Graphic from Write-up
            </span>
            <div className="max-w-2xl rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-50 p-2">
              <img
                src="/images/official/image6.png"
                alt="BHTF Secretariat Organizational Structure Chart"
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
              />
            </div>
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
            Executive Leadership & Key Personnel
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Secretariat Directorate & Officers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 font-light">
            Dedicated professionals managing fiduciary operations, international commodity procurement, and statutory compliance.
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
              Dr. Gyambo Sithey, PhD
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
              Director, Secretariat
            </p>
            <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
              Executive Head of Operations & Member Secretary to the Board
            </p>
            <span className="inline-block text-[10px] font-mono font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-0.5 rounded-full mt-3">
              Directorate Leadership
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
                Ms. Tshering Choden
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                Senior Program Officer
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                Programme Division
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Programme Operations</span>
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
                Mr. Thinley Wangchuk
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                Senior Investment Officer
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                Investment Management Division
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Endowment Yields</span>
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
                Mr. Sonam Chojay
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                Accounts Officer
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                Administration & Finance Division
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Fiduciary Compliance</span>
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
                Mr. Rinchen Phuntsho
              </h3>
              <div className="text-xs font-semibold text-emerald-800 mt-1">
                Driver
              </div>
              <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                Support Logistics
              </div>
            </div>
            <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>Field Transport</span>
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
              Section 7 • Official Contact
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Bhutan Health Trust Fund Office
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl">
              For any enquiries, please contact us at bhtf@bhtf.bt or visit the BHTF office in Thimphu.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-200 shrink-0">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>Lower Motithang, Thori Lam, Thimphu, Bhutan</span>
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
