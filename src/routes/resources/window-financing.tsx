import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight,
  TrendingUp,
  FileText,
  CheckCircle2,
  Lock,
  Layers,
  Activity,
  HeartHandshake,
  Landmark,
  Scale,
  Clock,
  Download,
} from "lucide-react";

export const Route = createFileRoute("/resources/window-financing")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "window-financing" } }).catch(() => null);
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
      { title: "Window Financing Protocol | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official guidelines on BHTF's Window Financing mechanism: statutory MOF quarterly releases, DMS procurement reconciliations, and RAA certified compliance.",
      },
    ],
  }),
  component: WindowFinancingPage,
});

const quarters = [
  {
    quarter: "Quarter 1 (1st Week of October)",
    commodity: "Initial Essential Drugs & Vaccines Requisition",
    focus: "National primary formulary & immunization launch",
    icon: Activity,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    details:
      "First tranche disbursement covering routine pediatric vaccines, maternal healthcare commodities, and core primary care therapeutics across all 20 dzongkhags.",
  },
  {
    quarter: "Quarter 2 (1st Week of January)",
    commodity: "Winter Formulary & Seasonal Antigens",
    focus: "Winter reserve buffer & influenza vaccines",
    icon: ShieldCheck,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
    details:
      "Mid-year disbursement replenishing high-altitude snowbound gewog clinics with essential medicines, rapid diagnostics, and seasonal influenza vaccines.",
  },
  {
    quarter: "Quarter 3 (1st Week of April)",
    commodity: "Spring Primary Healthcare Stocking",
    focus: "Hospital therapeutics & traditional medicine",
    icon: Sparkles,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    details:
      "Third tranche release supporting 438 essential modern medicines and 110 traditional gSo-ba Rig-pa formulations nationwide.",
  },
  {
    quarter: "Quarter 4 (Last Week of June)",
    commodity: "Fiscal Year-End Reconciliation & Contingency",
    focus: "Emergency buffer replenishment & annual audit prep",
    icon: Clock,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    details:
      "Final fiscal year release reconciling annual consumption data, emergency contingency stockpiles, and preparing ledgers for Royal Audit Authority review.",
  },
];

const statutoryGuidelines = [
  {
    num: "01",
    title: "Verified Requisition",
    desc: "Releases are executed strictly upon submission of verified drug requirements and inventory reconciliation by the Ministry of Health.",
  },
  {
    num: "02",
    title: "Designated Transfer",
    desc: "Direct fund transfer to MoH designated Letter-of-Credit (LC) accounts and statutory project accounts for procurement execution.",
  },
  {
    num: "03",
    title: "Yield-Only Financing",
    desc: "Financed exclusively from accumulated investment returns and donor contributions, without ever eroding the core capital corpus.",
  },
  {
    num: "04",
    title: "Formulary Compliance",
    desc: "Strictly covers items listed on the approved National Essential Drugs List (438 items) and traditional medicines (110 formulations).",
  },
  {
    num: "05",
    title: "Utilization Verification",
    desc: "Subsequent quarterly releases are contingent on submission and physical verification of previous quarter expenditure and stock ledgers.",
  },
  {
    num: "06",
    title: "Statutory RAA Audit",
    desc: "Annual audit and physical verification conducted independently by the Royal Audit Authority of Bhutan with unqualified certification.",
  },
];

const lifecycleSteps = [
  {
    step: "01",
    actor: "Department of Medical Services (MOH)",
    action: "Annual Need Assessment & Batch Prequalification",
    desc: "Aggregates bottom-up drug consumption records from all 205 gewogs and generates standardized procurement indent schedules conforming strictly to the National Essential Drugs List.",
  },
  {
    step: "02",
    actor: "Ministry of Finance & BHTF Secretariat",
    action: "Statutory Yield Verification & Release Advice",
    desc: "BHTF verifies that the requested allocation does not exceed net annual investment returns. The core endowment capital is untouched. Formal release advice is issued to the Ministry of Finance.",
  },
  {
    step: "03",
    actor: "Department of Medical Services (DMS)",
    action: "WHO/UNICEF Prequalified Procurement",
    desc: "Capital is disbursed directly for international tender settlement. Third-party testing by the Drug Regulatory Authority (DRA) guarantees batch potency prior to national distribution.",
  },
  {
    step: "04",
    actor: "Royal Audit Authority (RAA)",
    action: "Physical Stock Reconciliation & Post-Audit",
    desc: "Within 60 days following quarter close, DMS must submit verified physical stock receipt ledgers. Subsequent quarterly releases are legally frozen until reconciliations are certified clean.",
  },
];

function WindowFinancingPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Statutory Capital Allocation"
        title="Quarterly Window Financing Protocol"
        subtitle="The institutional mechanism transferring endowment yields to the Department of Medical Services (DMS) via the Ministry of Finance, guaranteeing zero stockouts without invading trust principal."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Window Financing" },
        ]}
      />

      {/* Sub-Navigation Pill Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex items-center justify-start gap-2 text-xs font-bold overflow-x-auto no-scrollbar sm:flex-wrap">
          <Link
            to="/resources"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Official Documents & Audits
          </Link>
          <Link
            to="/resources/window-financing"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs shrink-0 whitespace-nowrap"
          >
            Window Financing Protocol
          </Link>
          <Link
            to="/policies"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Governance & Statutory Policies
          </Link>
          <Link
            to="/our-impact"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Commodity Allocations →
          </Link>
        </div>
      </section>

      {/* Core Principle: The Fiduciary Triple-Lock */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              Statutory Fiduciary Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              Perpetual Healthcare Independence Through Window Financing
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light leading-relaxed">
              Enacted under the Royal Charter, the Window Financing mechanism bridges BHTF's multi-billion Ngultrum sovereign endowment directly with public health supply lines. The Fund does not act as a healthcare operator; instead, it provides permanent, debt-free procurement liquidity strictly ring-fenced from the volatility of general tax revenues or donor withdrawal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                100% Principal Ring-Fencing
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                By Royal Decree, the endowment principal (Nu. 4.8 Billion) is strictly inviolable. All window disbursements are funded exclusively from certified interest, sovereign coupon yields, and dividend returns.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                Quarterly Requisition Governance
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Disbursements are divided into four predictable tranches. Each release requires dual authorization: medical necessity certification by DMS and fiduciary clearance by the Asset Management Committee.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-800 grid place-items-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">
                Non-Submission Holdback Rule
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Subsequent quarterly tranches cannot be released until physical inventory utilization reports from the previous quarter are submitted and verified by internal auditors and the Royal Audit Authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Quarterly Disbursement Tranches */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block mb-2">
            Disbursement Cadence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Four Quarterly Window Tranches
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Targeted commodity releases aligned with national clinical procurement cycles and alpine winter logistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quarters.map((q) => {
            const Icon = q.icon;
            return (
              <div
                key={q.quarter}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {q.quarter}
                    </span>
                    <div className="h-10 w-10 rounded-xl bg-slate-50 text-slate-700 grid place-items-center border border-slate-200">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-slate-900">{q.commodity}</h3>
                  <div className="text-xs font-semibold text-emerald-700 mt-1">{q.focus}</div>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mt-3">
                    {q.details}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Audited by RAA</span>
                  <span>100% Endowed Funding</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Six Statutory Disbursement Guidelines */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#00A896] block">
              Governance Framework • Content Package V2
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#0B4F42]">
              Six Statutory Disbursement Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Mandatory fiduciary protocols governing all transfers from the Bhutan Health Trust Fund to the Ministry of Health.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {statutoryGuidelines.map((g) => (
              <div
                key={g.num}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-2 hover:border-[#00A896]/50 transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#EAF6F5] text-[#0B4F42] border border-[#00A896]/20">
                      Guideline {g.num}
                    </span>
                    <ShieldCheck className="h-4 w-4 text-[#00A896]" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-slate-900">{g.title}</h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mt-2">
                    {g.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Step Requisition Lifecycle */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block mb-2">
            Standard Operating Procedure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Window Requisition & Fund-Release Cycle
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Step-by-step institutional workflow governing every disbursement from initial gewog indent to final stock audit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {lifecycleSteps.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 relative group hover:border-emerald-300 transition"
            >
              <div>
                <div className="font-mono text-3xl font-black text-emerald-800/30 group-hover:text-emerald-700 transition">
                  {step.step}
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-800 mt-2">
                  {step.actor}
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 mt-1">
                  {step.action}
                </h3>
                <p className="text-xs text-slate-600 font-light leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[10px] font-mono text-slate-400">
                Phase {idx + 1} of 4 • Certified
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#071F18] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              Institutional Fiduciary Assurance
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Permanent Health Security for All 20 Dzongkhags
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Every Ngultrum contributed to the Bhutan Health Trust Fund expands the window financing yield capacity and is matched 1:1 by the Royal Government of Bhutan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/resources"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-all text-center"
            >
              <FileText className="h-4 w-4 text-emerald-400" />
              <span>Official Audit Reports</span>
            </Link>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 text-center"
            >
              <span>Contribute (1:1 Matched)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
