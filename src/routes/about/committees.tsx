import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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
} from "lucide-react";

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

function CommitteesPage() {
  const { customSections } = Route.useLoaderData();

  if (customSections && customSections.length > 0) {
    return (
      <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 min-h-screen pt-24 sm:pt-28">
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }

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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                Statutory Sub-Committee
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
                The Asset Management Committee (AMC) was instituted by the Board of Trustees to provide specialized financial acumen, portfolio risk management, and strategic asset allocation oversight. The committee ensures that all capital endowment funds adhere strictly to the principle of permanent preservation.
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

          {/* Investment Asset Allocation Strategy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                <Lock className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Capital Preservation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Zero capital erosion mandate. The principal corpus cannot be touched or utilized for operational expenses.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Yield Optimization</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Investment yields fund 100% of national vaccine procurement and 120+ primary medicine buffers.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-2">
              <div className="h-9 w-9 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
                <PieChart className="h-4 w-4" />
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Prudent Diversification</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Allocated across sovereign bonds, high-grade domestic debt, and secure international instruments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Governance & Audit Committee (GAC) Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
