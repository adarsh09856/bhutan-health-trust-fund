import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import {
  ShieldCheck,
  Award,
  Target,
  Eye,
  Heart,
  Landmark,
  Scale,
  Building,
  CheckCircle2,
  FileText,
  Lock,
  AlertCircle,
  Compass,
  TrendingUp,
  Globe,
  Share2,
  Coins,
  ArrowUpRight,
} from "lucide-react";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/about/organization")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "about-organization" } }).catch(() => null);
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
      { title: "Our Organization & Royal Charter Mandate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official profile of the Bhutan Health Trust Fund (BHTF), statutory founding under the Royal Charter, constitutional healthcare rights, and 2026 Vision & Mission.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

const corePillars = [
  {
    icon: Target,
    title: "Our Mission",
    dzongkha: "དམིགས་ཡུལ།",
    text: "To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for the financing of essential medicines, vaccines, and related health supplies.",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    icon: Eye,
    title: "Our Vision",
    dzongkha: "མཐོང་སྣང་།",
    text: "A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come.",
    color: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    icon: Heart,
    title: "Core Values",
    dzongkha: "གཞི་རྩའི་བརྩི་མཐོང་།",
    text: "Guided by Gross National Happiness, universal equity, zero procurement stockouts, compassion, absolute transparency, and fiduciary excellence.",
    color: "bg-rose-50 text-rose-800 border-rose-200",
  },
  {
    icon: Award,
    title: "Royal Charter Mandate",
    dzongkha: "རྒྱལ་པོའི་བཀའ་ཤོག",
    text: "Enacted by His Majesty the Fourth Druk Gyalpo as an autonomous statutory trust fund with permanent corpus protection and dedicated health procurement powers.",
    color: "bg-amber-50 text-amber-800 border-amber-200",
  },
];

function AboutOrganizationPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Institutional Profile"
        title="Our Organization & Royal Mandate"
        subtitle="A sacred sovereign institution established by Royal Charter to guarantee universal, equitable primary healthcare and life-saving medicines for all Bhutanese citizens in perpetuity."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Our Organization" },
        ]}
      />

      {/* Internal Navigation Sub-Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex items-center justify-start sm:justify-start gap-2 text-xs font-bold overflow-x-auto no-scrollbar sm:flex-wrap">
          <Link
            to="/about/organization"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs shrink-0 whitespace-nowrap"
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
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
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

      {/* Custom Page Renderer if edited by admin */}
      {customSections && customSections.length > 0 && (
        <PageRenderer sections={customSections} pageSlug="about-organization" />
      )}

      {/* 1. Sovereign Mandate & Legal Status */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-mandate">
        <SectionEditBadge
          label="Sovereign Mandate & Charter"
          pageSlug="about-organization"
          sectionId="org-mandate"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Healthcare as a Sacred Constitutional Guarantee",
            subtitle: "Article 9 of the Constitution of the Kingdom of Bhutan solemnly mandates that the State shall provide free access to basic public health services in both modern and traditional medicines.",
            badge: "Constitutional Mandate",
          }}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold font-mono border border-emerald-200">
              <Landmark className="h-3.5 w-3.5 text-emerald-700" />
              <span>Article 9, Constitution of the Kingdom of Bhutan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.12]">
              Healthcare as a Sacred Constitutional Guarantee
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-light">
              <p>
                In the Kingdom of Bhutan, healthcare is not treated as a commodity, but as a fundamental human right guaranteed to every citizen. Under the benevolence and vision of His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck, the Bhutan Health Trust Fund was established to ensure that universal access to free primary healthcare is safeguarded from economic volatility and international donor shifts.
              </p>
              <p>
                Operating as an independent statutory autonomous trust fund, BHTF manages a permanent sovereign endowment whose capital is preserved in perpetuity. The investment income earned annually is earmarked exclusively for procuring 100% of routine childhood vaccines, 438 essential medicines, 110 traditional formulations (gSo-ba Rig-pa), and high-altitude solar cold chain infrastructure across all 205 remote gewogs in 20 Dzongkhags.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="font-serif text-2xl font-bold text-emerald-800 block">100%</span>
                <span className="font-bold text-slate-900 block">Universal Free Coverage</span>
                <p className="text-slate-500 font-light">438 Essential Drugs & 4 Key Vaccines</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="font-serif text-2xl font-bold text-amber-700 block">Nu. 4.8B+</span>
                <span className="font-bold text-slate-900 block">Ring-Fenced Corpus</span>
                <p className="text-slate-500 font-light">Permanent endowment with capital preservation</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="font-serif text-2xl font-bold text-teal-700 block">20 / 20</span>
                <span className="font-bold text-slate-900 block">Dzongkhags Buffer</span>
                <p className="text-slate-500 font-light">Uninterrupted stockouts buffer for 205 gewogs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Royal Charter Seal & Key Statutory Articles */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-800 border border-amber-300 grid place-items-center font-serif text-lg font-bold">
                  ༄
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900">Royal Charter Mandate</h3>
                  <span className="text-[11px] text-slate-500 font-mono">Issued 3 August 2000</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Statutory Authority
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-light">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Article 1 • Autonomous Legal Status</strong>
                  The Fund shall exist as an autonomous body with perpetual succession, common seal, and power to hold and dispose of property.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Lock className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Article 4 • Capital Ring-Fencing</strong>
                  The core capital of the Trust Fund shall remain inviolate; under no circumstances shall the capital corpus be liquidated for operational costs.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Scale className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Article 7 • Royal Audit Authority (RAA)</strong>
                  All accounts and financial transactions shall be subjected to annual statutory audit by the Royal Audit Authority of Bhutan.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Full Charter Documentation</span>
              <Link
                to="/reports"
                className="font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
              >
                <span>View Legal Documents</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Vision, Mission & Core Values Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-pillars">
        <SectionEditBadge
          label="Vision, Mission & Values"
          pageSlug="about-organization"
          sectionId="org-pillars"
          studioHref="/admin/settings"
          initialData={{
            title: "Vision, Mission & Guiding Principles",
            subtitle: "Formally approved by the Secretariat leadership and Board of Trustees to anchor all strategic investment and healthcare allocations.",
            badge: "Approved Strategic Compass",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block mb-2 font-mono">
            Approved Strategic Compass (July 17, 2026)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Vision, Mission & Guiding Principles
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Formally approved by the Secretariat leadership and Board of Trustees to anchor all strategic investment and healthcare allocations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corePillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-2xl grid place-items-center border ${p.color}`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <span className="font-sans text-xs font-bold text-emerald-800">
                    {p.dzongkha}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {p.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-light mt-3">
                  {p.text}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Institutional Mandate</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2b. The Financial Architecture: Two Income Streams (Strategy Workshop Slide 10 & 14) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-financial-architecture">
        <SectionEditBadge
          label="Financial Architecture"
          pageSlug="about-organization"
          sectionId="org-financial-architecture"
          studioHref="/admin/settings"
          initialData={{
            title: "The Financial Architecture: Two Sustainable Income Streams",
            subtitle: "Investment income alone no longer covers annual expenditure. A dual-stream domestic architecture bridges the 60% procurement gap.",
            badge: "Domestic Health Financing",
          }}
        />
        <div className="bg-gradient-to-br from-slate-900 via-[#0B251F] to-emerald-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-500/20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/20 pb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Domestic Health Financing Architecture
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
                Two Income Streams Sustaining Free Primary Healthcare
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-light">
                As annual medicine expenditure rises to Nu. 557.7M (scaling to Nu. 613M), endowment returns cover 40%. The 1% Health Contribution covers the remaining 60% gap with 100% direct procurement pass-through.
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-xl sm:text-2xl font-black text-emerald-400 font-mono">Nu. 4.8B</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Endowment Assets</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-xl sm:text-2xl font-black text-amber-400 font-mono">1:1</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">RGOB Matching</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stream 1 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Stream 1 • Sovereign Endowment</span>
                <Coins className="h-5 w-5 text-emerald-400" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">Investment Income (ROI)</h3>
              <div className="text-3xl font-black font-mono text-emerald-300">Nu. 318M — Nu. 400M</div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Generated from ring-fenced domestic commercial deposits, long-term bonds, equities, and offshore Asian Development Bank (ADB) instruments. Governed by a 70% procurement / 20% capital growth / 10% operations statutory spending policy.
              </p>
            </div>

            {/* Stream 2 */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">Stream 2 • National Solidarity</span>
                <Heart className="h-5 w-5 text-amber-400" />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">1% Health Contribution</h3>
              <div className="text-3xl font-black font-mono text-amber-300">~Nu. 450M Annually</div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Mandatory 1% contribution from gross monthly salaries of public, civil, corporate, and private employees. Grown from Nu. 138M in FY 2014–15, 100% of this revenue is disbursed directly to healthcare procurement.
              </p>
            </div>
          </div>

          {/* Structural Risk Highlight Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-300 uppercase tracking-wider">
                <AlertCircle className="h-4 w-4" />
                <span>Macroeconomic Structural Risk</span>
              </div>
              <p className="text-xs text-slate-200 font-light">
                Global essential medicine prices escalate at <strong className="text-amber-300 font-mono">11% annually</strong> against an average <strong className="text-emerald-300 font-mono">7.7% investment return</strong>. The National Sustainable Health Financing Strategy roadmap is expanding the endowment from Nu. 4.3B to <strong className="text-white font-mono font-bold">Nu. 8.6 Billion</strong> to safeguard self-reliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Challenges & Strategic Way Forward */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 relative" data-bhtf-section="org-challenges-solutions">
        <SectionEditBadge
          label="Strategic Challenges & Solutions"
          pageSlug="about-organization"
          sectionId="org-challenges-solutions"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Current Challenges & Strategic Solutions",
            subtitle: "Preserving universal free healthcare requires confronting escalating global drug prices, domestic capital depth limitations, and evolving donor dynamics with an agile sovereign strategy.",
            badge: "Section 11 • Strategic Way Forward",
          }}
        />
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold font-mono">
            <Compass className="h-3.5 w-3.5 text-amber-700" />
            <span>Section 11 • Strategic Way Forward</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Current Challenges & Strategic Solutions
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            Preserving universal free healthcare requires confronting escalating global drug prices, domestic capital depth limitations, and evolving donor dynamics with an agile sovereign strategy.
          </p>
        </div>

        {/* 6 Macro Challenges */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-rose-800">
            <AlertCircle className="h-4 w-4" />
            <span>Key Institutional Challenges</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2 hover:border-rose-300 transition">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">01 • Escalating Global Costs</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Rising Pharmaceutical Prices</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Escalating global costs for essential drugs and vaccines each year pose a significant challenge to sustainable financing of free Primary Health Care services.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2 hover:border-rose-300 transition">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">02 • Market Constraints</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Domestic Capital Market Depth</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Limited investment opportunities in the domestic financial market restrict the Fund's ability to diversify and grow its capital base.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2 hover:border-rose-300 transition">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">03 • Donor Transition</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Declining External Grants</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Donor interest has declined over time, and traditional fundraising campaigns have become less effective, limiting the Fund's reach domestically and internationally.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2 hover:border-rose-300 transition">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">04 • Public Awareness</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Community Ownership</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                A significant portion of the Bhutanese population lacks a clear understanding of BHTF's role, which undermines community participation and public ownership of the Fund's mission.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2 hover:border-rose-300 transition">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">05 • Economic Sensitivity</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Capacity to Contribute</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Low income levels and economic instability reduce individuals' capacity to contribute, particularly during economic downturns and inflationary periods.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2 hover:border-rose-300 transition">
              <span className="text-[10px] font-mono font-bold text-rose-700 uppercase tracking-wider block">06 • Supply Chain Efficiency</span>
              <h4 className="font-serif text-base font-bold text-slate-900">Facility Stock Accumulation</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Under-utilisation of medicines across certain health facilities has led to stock accumulation, expiries, and financial losses requiring robust tracking.
              </p>
            </div>
          </div>
        </div>

        {/* 6 Strategic Plan Pillars */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Official Roadmap
              </span>
              <h3 className="font-serif text-2xl font-black text-slate-900">
                Our Three-Year Strategic Plan
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-700" />
              <span>Multi-Year Transformation</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs grid place-items-center">
                1
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Safe International Portfolio Diversification</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Explore safe, regulated international investments and sovereign offshore allocations to diversify the Fund's portfolio beyond domestic capacity.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs grid place-items-center">
                2
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Digital Fundraising & Strategic Alliances</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Strengthen donor engagement through modern digital fundraising platforms, QR integration, and institutional partnerships like RSEBL.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs grid place-items-center">
                3
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Public Awareness Within Bhutan & Abroad</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Increase public consciousness and education regarding BHTF's constitutional role, impact statistics, and matching grant benefits.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs grid place-items-center">
                4
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Grassroots Dzongkhag, Thromde & Gewog Drives</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Engage local government offices, corporate institutions, and individual donors across all 20 Dzongkhags for collective healthcare ownership.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs grid place-items-center">
                5
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Diplomatic Missions & Diaspora Support</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Mobilise Bhutanese embassies, consulates, and international diaspora communities across Australia, the Americas, and Europe for ongoing support.
              </p>
            </div>

            <div className="space-y-2">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-800 font-mono font-bold text-xs grid place-items-center">
                6
              </div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Rigorous Monitoring & Wastage Audits</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Enhance monitoring and reporting of BHTF-funded medicines and vaccines through quarterly reports and dedicated vaccine wastage studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Link Cards to Trustees, Committees & Secretariat */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-governance-framework">
        <SectionEditBadge
          label="Governance & Stewardship Structure"
          pageSlug="about-organization"
          sectionId="org-governance-framework"
          studioHref="/admin/trustees"
          initialData={{
            title: "Fiduciary Structure & Stewardship",
            subtitle: "High-level governance appointed under Cabinet Order C-3/4(4)/2024/35 comprising ministerial leaders, monetary fiduciaries, and clinicians.",
            badge: "Governance & Operational Leadership",
          }}
        />
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2 font-mono">
            Governance & Operational Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
            Fiduciary Structure & Stewardship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/about/trustees"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Landmark className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
              Board of Trustees →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              High-level governance appointed under Cabinet Order C-3/4(4)/2024/35 comprising ministerial leaders, monetary fiduciaries, and clinicians.
            </p>
          </Link>

          <Link
            to="/about/committees"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
              Asset Management Committee →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Specialized fiduciary sub-committee supervising investment policies, Nu. 4.8B capital preservation, and inflation hedging.
            </p>
          </Link>

          <Link
            to="/about/secretariat"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-teal-800 transition">
              Secretariat & Organogram →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              The Directorate headed by Dr. Gyambo Sithey and approved divisions executing daily procurement and health logistics.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
