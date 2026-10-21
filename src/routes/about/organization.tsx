import { createFileRoute, Link } from "@tanstack/react-router";
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
  Layers,
} from "lucide-react";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";

export const Route = createFileRoute("/about/organization")({
  head: () => ({
    meta: [
      { title: "Organization, Mandate & Organogram | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Mandate, Vision, Mission, Royal Charter Governance Framework, Organogram, and 70–20–10 Operating Model of the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

function AboutOrganizationPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge="Institutional Governance"
        title="Organization & Mandate"
        subtitle="Official Mandate, Vision, Mission, Royal Charter Governance Framework, and Organizational Structure."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Organization & Mandate" },
        ]}
      />

      {/* 1. Official Mandate, Vision, Mission Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-core-tenets">
        <SectionEditBadge
          label="Core Institutional Tenets"
          pageSlug="about-organization"
          sectionId="org-core-tenets"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Mandate, Vision & Mission",
            subtitle: "Official statutory tenets of the Bhutan Health Trust Fund.",
            badge: "Institutional Foundations",
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mandate */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-emerald-300 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center">
                <Target className="size-6 text-emerald-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Our Mandate</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                To ensure sustainable financing for essential medicines and vaccines through prudent fund management and responsible investment.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
              <CheckCircle2 className="size-3.5" />
              <span>Universal Healthcare Guarantee</span>
            </div>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-amber-300 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center">
                <Eye className="size-6 text-amber-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-amber-800 font-semibold">
              <CheckCircle2 className="size-3.5" />
              <span>Intergenerational Equity</span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-teal-300 transition-all duration-300 space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center">
                <Heart className="size-6 text-teal-800" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for financing essential medicines, vaccines, and related health supplies.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-teal-800 font-semibold">
              <CheckCircle2 className="size-3.5" />
              <span>Sustainable Commodity Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Governance Framework & Operating Model (70–20–10) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-governance-model">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Governance */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
                <ShieldCheck className="size-3.5 text-emerald-800" />
                <span>Governance & Oversight</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Governance Framework
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                The Bhutan Health Trust Fund (BHTF) operates under the guidance of the Board of Directors, headed by a Chairperson. The Board provides strategic direction and ensures effective governance, accountability and the long-term sustainability of the Fund.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets in line with its mandate and objectives. Together, the Board and the AMC play an important role in safeguarding the Fund’s resources to ensure the continued availability of essential medicines and vaccines for the people of Bhutan.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold">
              <Link to="/about/trustees" className="text-emerald-800 hover:underline inline-flex items-center gap-1">
                <span>View Board of Trustees (Table 1.1)</span>
                <ArrowRight className="size-3" />
              </Link>
              <Link to="/about/committees" className="text-amber-800 hover:underline inline-flex items-center gap-1">
                <span>Asset Management Committee (Table 1.2)</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Operating Model (70–20–10) & Capital Preservation */}
          <div className="bg-gradient-to-br from-[#0B4F42] to-[#073C32] text-white rounded-3xl p-7 sm:p-9 shadow-lg space-y-5 flex flex-col justify-between border border-emerald-700/40">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-bold border border-white/10">
                <Coins className="size-3.5 text-amber-300" />
                <span>70–20–10 Operating Model</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Our Operating Model
              </h3>
              <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-sans">
                As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a <strong>70–20–10 operating model</strong> to ensure the sustainable financing of national essential medicines and vaccines in Bhutan. Under this model:
              </p>

              {/* Three Stream Breakdown */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-300">70%</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                    Medicines & Vaccines Procurement
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-300">20%</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                    Reinvested for Capital Growth
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-teal-200">10%</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                    Operational Expenses
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-emerald-50/90 leading-relaxed space-y-2 font-sans border-t border-white/10">
                <p>
                  <strong>Principal Preservation:</strong> A key principle of the Fund is the preservation of its principal capital. By financing healthcare needs through investment income rather than drawing on the principal, BHTF aims to safeguard its financial resources for future generations.
                </p>
                <p className="text-xs text-emerald-100/80">
                  Any remaining funding gap is supplemented by a <strong>1% health contribution</strong> deducted from the monthly gross salaries of salaried employees in the country. Together, this financing mechanism supports the continued availability of national essential medicines and vaccines while strengthening the Fund’s long-term financial sustainability and its commitment to Bhutan’s free primary healthcare system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Organizational Chart (Organogram) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-organogram">
        <SectionEditBadge
          label="Organizational Chart (Organogram)"
          pageSlug="about-organization"
          sectionId="org-organogram"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Organizational Structure & Governance Organogram",
            subtitle: "Approved organizational structure of the Bhutan Health Trust Fund.",
            badge: "Institutional Organogram",
          }}
        />

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              Section 1.3 • Governance Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              Organizational Chart (Organogram)
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light">
              Hierarchical governance from the Board of Trustees and Asset Management Committee to the Secretariat Directorate and four operational divisions.
            </p>
          </div>

          {/* Interactive Organogram Diagram */}
          <div className="max-w-4xl mx-auto pt-4">
            {/* Level 1: Board of Trustees */}
            <div className="flex justify-center">
              <Link
                to="/about/trustees"
                className="w-72 bg-slate-50 hover:bg-emerald-50/50 border-2 border-slate-800 hover:border-emerald-700 rounded-2xl p-4 text-center shadow-xs transition group cursor-pointer block"
              >
                <span className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-900 block">
                  Board of Trustees
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-emerald-700 font-sans block mt-0.5">
                  High-Level Governance • 7 Trustees (Table 1.1) →
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
                  className="w-64 bg-amber-50/70 hover:bg-amber-100/70 border-2 border-amber-800/80 hover:border-amber-900 rounded-2xl p-3 text-center shadow-xs transition group cursor-pointer block"
                >
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-950 block leading-snug">
                    Asset Management Committee
                  </span>
                  <span className="text-[10px] text-amber-800 font-sans block mt-0.5 font-semibold">
                    Specialized Advisory Sub-committee (Table 1.2) →
                  </span>
                </Link>
                <div className="hidden sm:block w-16 md:w-20 h-0.5 bg-slate-700" />
              </div>
            </div>

            {/* Level 2: Director */}
            <div className="flex justify-center">
              <Link
                to="/about/secretariat"
                className="w-72 bg-slate-50 hover:bg-teal-50/50 border-2 border-slate-800 hover:border-teal-700 rounded-2xl p-4 text-center shadow-xs transition group cursor-pointer block"
              >
                <span className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-900 block">
                  Director
                </span>
                <span className="text-[11px] text-emerald-800 font-sans block mt-0.5 font-semibold">
                  Dr. Gyambo Sithey, PhD
                </span>
                <span className="text-[10px] text-slate-500 group-hover:text-teal-700 font-sans block">
                  Member Secretary & Executive Head →
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

            {/* Secretariat Link Callout */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <Link
                to="/about/secretariat"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition duration-200"
              >
                <span>View Secretariat Team & Key Personnel</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sub-pages Quick Link Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-slate-200/80 pt-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Governance Hierarchy
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Explore Fiduciary Leadership & Secretariat
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/about/trustees"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Landmark className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
              Board of trustees (with photos) →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
              7 Apex governing trustees chaired by HE Lyonpo Tandin Wangchuk, Minister for Health.
            </p>
          </Link>

          <Link
            to="/about/committees"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
              Asset management committee →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
              3-member fiduciary sub-committee chaired by Ms. Ugyen Choden, Deputy Governor, RMA.
            </p>
          </Link>

          <Link
            to="/about/secretariat"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-teal-800 transition">
              Secretariat Directorate & Personnel →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
              Executive arm headed by Director Dr. Gyambo Sithey, PhD, with key operational officers.
            </p>
          </Link>
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
