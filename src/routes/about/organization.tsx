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
      { title: "Organization & Mandate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Mandate, Vision, Mission, Governance Framework, and 70–20–10 Sustainable Healthcare Financing Model of the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

function AboutOrganizationPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge="Institutional Foundations"
        title="Organization & Mandate"
        subtitle="Official Mandate, Vision, Mission, Governance Framework, and the 70–20–10 Sustainable Healthcare Financing Model."
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

      {/* 3. Sub-pages Quick Link Cards */}
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
              Secretariat and organizational chart →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
              Executive arm headed by Director Dr. Gyambo Sithey, PhD, with 4 operational divisions.
            </p>
          </Link>
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
