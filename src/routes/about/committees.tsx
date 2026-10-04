import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Scale,
  ShieldCheck,
  TrendingUp,
  Award,
  Landmark,
  FileText,
  Lock,
  CheckCircle2,
  PieChart,
  UserCheck,
} from "lucide-react";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";

export const Route = createFileRoute("/about/committees")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "about-committees" } }).catch(() => null);
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
      { title: "Asset Management & Audit Committees | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official terms of reference, investment guidelines, and governance parameters of the BHTF Asset Management Committee (AMC) and Governance & Audit Committee.",
      },
    ],
  }),
  component: CommitteesPage,
});

const amcMembers = [
  {
    name: "Ms. Ugyen Choden",
    committeeRole: "Chairperson, Asset Management Committee",
    title: "Deputy Governor, Royal Monetary Authority (RMA)",
    badge: "AMC Chairperson",
    desc: "Provides high-level central banking, liquidity, and macroeconomic portfolio oversight, guiding BHTF capital preservation strategies.",
    photo: trusteeUgyenChoden,
  },
  {
    name: "Mr. Chencho T. Namgay",
    committeeRole: "Member, Asset Management Committee",
    title: "CEO, National Pension & Provident Fund (NPPF)",
    badge: "Institutional Portfolio",
    desc: "Brings extensive institutional fund management, asset allocation, and risk management insight from Bhutan's premier pension fiduciary.",
    photo: trusteeChenchoNamgay,
  },
  {
    name: "Mr. Norbu Dendup",
    committeeRole: "Member, Asset Management Committee",
    title: "Director, Department of Treasury & Accounts, MoF",
    badge: "Treasury & Sovereign Fiduciary",
    desc: "Oversees public debt parameters, sovereign treasury allocations, and statutory matching fund coordination under the Ministry of Finance.",
    photo: trusteeNorbuDendup,
  },
  {
    name: "Dr. Gyambo Sithey, PhD",
    committeeRole: "Director / Member Secretary",
    title: "Director, BHTF Secretariat",
    badge: "Director",
    desc: "Executes AMC strategic investment mandates, portfolio oversight, and statutory reporting.",
    photo: trusteeDrGyambo,
  },
];

function CommitteesPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Fiduciary Committees"
        title="Asset Management & Governance Committees"
        subtitle="Specialized statutory committees providing investment stewardship, capital preservation parameters, and independent audit oversight directly to the Board of Trustees."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Committees" },
        ]}
      />

      {/* Sub-Navigation Pill Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex items-center justify-start sm:justify-start gap-2 text-xs font-bold overflow-x-auto no-scrollbar sm:flex-wrap">
          <Link
            to="/about/organization"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Our Organization
          </Link>
          <Link
            to="/about/trustees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Board of Trustees
          </Link>
          <Link
            to="/about/committees"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs shrink-0 whitespace-nowrap"
          >
            Asset Management Committee
          </Link>
          <Link
            to="/about/secretariat"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Secretariat & Organogram
          </Link>
          <Link
            to="/our-story"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition shrink-0 whitespace-nowrap"
          >
            Our Story & History →
          </Link>
        </div>
      </section>

      {/* 1. Asset Management Committee (AMC) Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="amc-overview">
        <SectionEditBadge
          label="Asset Management Committee (AMC)"
          pageSlug="about-committees"
          sectionId="amc-overview"
          studioHref="/admin/page-editor?slug=about-committees"
          initialData={{
            title: "Asset Management Committee (AMC)",
            subtitle: "Cabinet Appointed Sub-Committee providing investment stewardship, capital preservation parameters, and statutory asset allocation.",
            badge: "Cabinet Appointed Sub-Committee",
          }}
        />
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                Cabinet Appointed Sub-Committee
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
                Asset Management Committee (AMC)
              </h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold font-mono">
              <Scale className="h-3.5 w-3.5 text-amber-700" />
              <span>Investment Oversight</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm leading-relaxed font-light">
              <p>
                The Asset Management Committee (AMC) was instituted by the Board of Trustees pursuant to Cabinet Order No. C-3/4(4)/2024/35 to provide specialized financial acumen, portfolio risk management, and strategic asset allocation oversight. The committee ensures that all capital endowment funds adhere strictly to the principle of permanent capital preservation.
              </p>
              <p>
                Under the approved Investment Policy Statement (IPS), the AMC formulates risk-adjusted return benchmarks, evaluates investment instruments (sovereign treasury bills, corporate bonds, fixed deposits, and multi-currency holdings), and ensures that liquidity is available for quarterly window financing releases without compromising the capital corpus.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs">
              <div className="font-bold text-slate-900 font-mono uppercase tracking-wider">
                Core AMC Responsibilities
              </div>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Enforcing capital preservation guidelines across all bank deposits and bonds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Reviewing quarterly yield performance against inflation and healthcare cost trends.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Approving multi-currency diversification (BTN, INR, USD) to mitigate foreign exchange risks.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AMC Appointed Members Gallery */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-800 uppercase tracking-wider">
              <UserCheck className="h-4 w-4 text-emerald-700" />
              <span>Asset Management Committee Members</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {amcMembers.map((m, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F3] rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-amber-300 hover:shadow-md transition duration-200 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="h-16 w-16 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-white">
                        <img
                          src={m.photo}
                          alt={m.name}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-900 border border-amber-300">
                        {m.badge}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-bold text-slate-900 leading-snug">
                        {m.name}
                      </h4>
                      <p className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                        {m.committeeRole}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {m.title}
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-mono">
                    Cabinet Order C-3/4(4)/2024/35
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment Asset Allocation Strategy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Capital Preservation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Zero capital erosion mandate. The principal corpus (Nu. 4.8B) cannot be touched or utilized for operational expenses.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Yield Optimization</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Investment yields fund 100% of 4 routine vaccines, 438 essential medicines, and 110 traditional formulations.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
                <PieChart className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Prudent Diversification</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Allocated across sovereign bonds, high-grade domestic debt, and secure international offshore holdings.
              </p>
            </div>
          </div>

          {/* Section 6 Official Portfolio Breakdown Table */}
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                  Section 6: Investment Portfolio Structure
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900">
                  Onshore & Offshore Endowment Asset Allocation
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono">
                <span>Fund Total: Nu. 4,798,965,306.85</span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Investment Class / Instrument</th>
                    <th className="py-3 px-4 text-right">Holding Value (Nu.)</th>
                    <th className="py-3 px-4 text-right">% of Total Endowment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  <tr className="bg-slate-50/50 font-bold text-slate-900">
                    <td colSpan={3} className="py-2 px-4 text-[11px] text-emerald-900 font-mono">
                      A. Onshore Investments (Domestic Financial Sector)
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 pl-6">• Fixed Deposits (Domestic Commercial Banks)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">1,905,600,000.00</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">39.71%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 pl-6">• Long-Term Annuity Scheme</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">645,000,000.00</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">13.44%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 pl-6">• Corporate Bonds (Bhutan Power Corporation)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">500,000,000.00</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">10.42%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 pl-6">• Listed Equity Shares (Bhutan National Bank Ltd.)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">148,999,386.85</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">3.10%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 pl-6">• Listed Equity Shares (GIC-Bhutan Reinsurance)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">10,000,023.05</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">0.21%</td>
                  </tr>
                  <tr className="bg-emerald-50/40 font-bold text-emerald-950 border-t border-emerald-200">
                    <td className="py-2.5 px-4 pl-6">Subtotal — Onshore Investments</td>
                    <td className="py-2.5 px-4 text-right font-mono font-black">3,209,599,409.90</td>
                    <td className="py-2.5 px-4 text-right font-mono font-black">66.88%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 font-medium">B. Operational Bank Savings Deposits (Liquidity Reserve)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">445,514,253.34</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">9.28%</td>
                  </tr>
                  <tr className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-4 text-slate-800 font-medium">C. Offshore Investments (USD 12,084,796.72 in Global Assets)</td>
                    <td className="py-2.5 px-4 text-right font-mono font-medium text-slate-900">1,143,851,643.61</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">23.84%</td>
                  </tr>
                  <tr className="bg-slate-900 text-white font-bold text-sm border-t-2 border-slate-900">
                    <td className="py-3 px-4">Total Endowment Corpus (Audited Sovereign Fund)</td>
                    <td className="py-3 px-4 text-right font-mono font-black text-amber-300">Nu. 4,798,965,306.85</td>
                    <td className="py-3 px-4 text-right font-mono text-emerald-400">100.00%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* IPS Spending Policy Highlight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  Spending Policy (70%)
                </span>
                <p className="font-serif text-sm font-bold text-slate-900">Essential Drugs & Vaccines</p>
                <p className="text-[11px] text-slate-600 font-light">
                  70% of net investment yields directly fund universal vaccines, 438 essential drugs, and 110 traditional remedies.
                </p>
              </div>

              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                  Capital Growth (20%)
                </span>
                <p className="font-serif text-sm font-bold text-slate-900">Endowment Reinvestment</p>
                <p className="text-[11px] text-slate-600 font-light">
                  20% of annual net income is automatically reinvested to protect the corpus against inflation and preserve real value.
                </p>
              </div>

              <div className="bg-[#FAF8F3] p-4 rounded-xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-wider">
                  Operations Cap (10%)
                </span>
                <p className="font-serif text-sm font-bold text-slate-900">Strict Fiduciary Efficiency</p>
                <p className="text-[11px] text-slate-600 font-light">
                  Statutory 10% ceiling for administration. In practice, only ~4% is utilized, with the remaining 6% returned to corpus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Governance & Audit Committee (GAC) Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="gac-overview">
        <SectionEditBadge
          label="Governance & Audit Committee (GAC)"
          pageSlug="about-committees"
          sectionId="gac-overview"
          studioHref="/admin/policies"
          initialData={{
            title: "Governance & Audit Committee (GAC)",
            subtitle: "Statutory compliance, independent audit oversight, and anti-corruption safeguards directly reporting to the Royal Audit Authority.",
            badge: "Statutory Compliance",
          }}
        />
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-teal-800">
                Statutory Compliance
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
                Governance & Audit Committee (GAC)
              </h2>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 text-teal-900 border border-teal-300 text-xs font-bold font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-700" />
              <span>Statutory Compliance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4 text-slate-700 text-sm leading-relaxed font-light">
              <p>
                The Governance & Audit Committee (GAC) operates as an independent audit safeguard, ensuring that all financial operations comply with Royal Audit Authority (RAA) statutory standards, public procurement norms, and the BHTF Financial Management System (FMS).
              </p>
              <p>
                The committee conducts internal control assessments, reviews external audit observations, inspects international procurement bidding records, and upholds transparent whistleblower and anti-corruption protections.
              </p>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 text-xs">
              <div className="font-bold text-slate-900 font-mono uppercase tracking-wider">
                Auditing & Transparency Mandate
              </div>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Supervising annual clean audit certification with the Royal Audit Authority.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Ensuring ring-fenced verification of donor funds and corporate CSR matching.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>Monitoring compliance with the statutory Procurement Rules and Regulations (PRR).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
