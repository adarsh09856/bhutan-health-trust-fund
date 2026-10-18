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
  Users,
  Sparkles,
} from "lucide-react";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";

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

      {/* 1. Official Section 1: About Us, Mandate, Vision, Mission, Governance, Operating Model */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-mandate">
        <div className="bg-white border border-border rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card space-y-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-saffron">
              Statutory Profile • Royal Charter 2000
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              About the Bhutan Health Trust Fund
            </h2>
            <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-sans">
              The Bhutan Health Trust Fund (BHTF) is a national trust established to support the sustainability of free primary healthcare services in Bhutan. Guided by its royal charter, BHTF finances essential medicines and vaccines through investment returns and health contributions, helping ensure continued access to essential healthcare for the people of Bhutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-soft-orange border border-saffron/20 space-y-2">
              <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                <Target className="size-4 shrink-0" />
                <span>Our Mandate</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                To ensure sustainable financing for essential medicines and vaccines through prudent fund management and responsible investment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-soft-blue border border-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <Eye className="size-4 shrink-0" />
                <span>Our Vision</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-soft-green border border-[oklch(0.85_0.08_155)] space-y-2">
              <div className="flex items-center gap-2 text-[oklch(0.4_0.15_155)] font-bold text-sm">
                <Heart className="size-4 shrink-0" />
                <span>Our Mission</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for financing essential medicines, vaccines, and related supplies.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-soft-purple border border-[oklch(0.85_0.08_290)] space-y-2">
              <div className="flex items-center gap-2 text-[oklch(0.45_0.18_290)] font-bold text-sm">
                <ShieldCheck className="size-4 shrink-0" />
                <span>Governance</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                BHTF operates under the guidance of its board of directors, supported by the Asset Management Committee (AMC) and the secretariat, ensuring accountability, transparency, and sound governance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-border space-y-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <Coins className="size-4 text-saffron shrink-0" />
                <span>Our Operating Model</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                The fund generates investment returns and receives health contributions to finance essential medicines and vaccines, while preserving its long-term financial sustainability through capital preservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2a. Three Strategic Objectives (Slide 4) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-objectives">
        <SectionEditBadge
          label="Three Strategic Objectives"
          pageSlug="about-organization"
          sectionId="org-objectives"
          studioHref="/admin/settings"
          initialData={{
            title: "Three Strategic Objectives",
            subtitle: "Guiding every investment decision and health commodity disbursement since the founding Royal Charter.",
            badge: "Strategic Objectives • Slide 4",
          }}
        />
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Core Strategic Mandate
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              Three Strategic Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Guiding every investment decision and health commodity disbursement since the founding Royal Charter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs hover:border-emerald-300 hover:shadow-md transition space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center font-mono font-bold text-base">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Sustain Primary Health Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Guarantee uninterrupted, sustainable financing for primary healthcare services, childhood vaccines, and essential medicines for every citizen across Bhutan.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs hover:border-amber-300 hover:shadow-md transition space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center font-mono font-bold text-base">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Eliminate Financing Uncertainty</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Protect national healthcare delivery from fluctuations in government revenue, global economic volatility, and external donor transition cycles.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs hover:border-teal-300 hover:shadow-md transition space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center font-mono font-bold text-base">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Build National Self-Reliance</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-light">
                Institutionalize a durable domestic financing architecture through endowment growth, the 1% Health Contribution, and sovereign matching grants.
              </p>
            </div>
          </div>
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

      {/* 2c. Built to Last: 4 Institutional Foundations (Slide 10) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-institutional-foundations">
        <SectionEditBadge
          label="Institutional Foundations"
          pageSlug="about-organization"
          sectionId="org-institutional-foundations"
          studioHref="/admin/settings"
          initialData={{
            title: "Built to Last: Four Institutional Foundations",
            subtitle: "A ring-fenced sovereign framework ensuring permanent capital preservation, fiduciary independence, and statutory transparency.",
            badge: "Fiduciary Architecture • Slide 10",
          }}
        />
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Fiduciary Architecture • Slide 10
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              Built to Last: Four Institutional Foundations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              A ring-fenced sovereign framework ensuring permanent capital preservation, fiduciary independence, and statutory transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-800">Foundation 1</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Royal Charter 2000</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Enacted by His Majesty the Fourth Druk Gyalpo on 3 August 2000, establishing statutory autonomy, 1:1 RGOB matching, and capital ring-fencing.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                <Lock className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800">Foundation 2</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Endowment Model</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Permanent capital preservation: the Nu. 4.8B principal corpus is ring-fenced and can never be spent; only investment returns fund healthcare.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 transition space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-800 grid place-items-center">
                <Users className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-blue-800">Foundation 3</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Independent Governance</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Apex 7-member Board of Trustees chaired by Lyonpo, Asset Management Committee (AMC), and annual statutory audits by the Royal Audit Authority (RAA).
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
                <TrendingUp className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-teal-800">Foundation 4</span>
              <h3 className="font-serif text-base font-bold text-slate-900">Investment Mandate</h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Guided by the Investment Policy Statement (IPS), diversified across domestic bonds, bank deposits, and secure offshore holdings via ADB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Annexure 1: Organizational Structure of the Secretariat (Exact match to WhatsApp Briefing & Slide 10) */}
      <section id="organogram" className="mx-auto max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-structure-tree">
        <SectionEditBadge
          label="Approved Organogram"
          pageSlug="about-organization"
          sectionId="org-structure-tree"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Organizational Structure of the Secretariat",
            subtitle: "Annexure 1 • Formally approved governance hierarchy from the Board of Trustees to operational divisions.",
            badge: "Annexure 1 • Organizational Structure",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
            Annexure 1 • Official Structure
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Organizational Structure of the Secretariat
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light">
            Formally approved governance hierarchy illustrating the direct line of accountability from the Board of Trustees to operational divisions.
          </p>
        </div>

        {/* Clean Organogram Diagram - Matching WhatsApp Document Exactly */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm">
          <div className="max-w-4xl mx-auto">
            {/* Level 1: Board */}
            <div className="flex justify-center">
              <div className="w-56 bg-slate-50 border-2 border-slate-700 rounded-xl p-3.5 text-center shadow-xs">
                <span className="font-serif font-bold text-base text-slate-900 block">Board</span>
              </div>
            </div>

            {/* Vertical Line from Board down */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Branch to Asset Management Committee on Left */}
            <div className="relative">
              {/* Center vertical continue line */}
              <div className="w-0.5 h-16 bg-slate-700 mx-auto" />

              {/* Horizontal connecting arm to AMC on the left */}
              <div className="absolute top-1/2 right-1/2 w-32 sm:w-48 h-0.5 bg-slate-700 -translate-y-1/2" />

              {/* AMC Box positioned to the left */}
              <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-[-8.5rem] sm:translate-x-[-12.5rem] w-44 sm:w-56 bg-slate-50 border-2 border-slate-700 rounded-xl p-2.5 sm:p-3 text-center shadow-xs">
                <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 block leading-snug">
                  Asset Management Committee
                </span>
              </div>
            </div>

            {/* Level 2: Director */}
            <div className="flex justify-center">
              <div className="w-56 bg-slate-50 border-2 border-slate-700 rounded-xl p-3.5 text-center shadow-xs">
                <span className="font-serif font-bold text-base text-slate-900 block">Director</span>
              </div>
            </div>

            {/* Stem Down to 4 Divisions */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Bar across all 4 Divisions */}
            <div className="hidden sm:block w-[88%] h-0.5 bg-slate-700 mx-auto" />

            {/* 4 Division Drops & Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-4 pt-0 sm:pt-0">
              {/* Division 1 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-700 rounded-xl p-3.5 text-center shadow-xs min-h-[72px] flex items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Investment Management Division
                  </span>
                </div>
              </div>

              {/* Division 2 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-700 rounded-xl p-3.5 text-center shadow-xs min-h-[72px] flex items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Administration & Finance Division
                  </span>
                </div>
              </div>

              {/* Division 3 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-700 rounded-xl p-3.5 text-center shadow-xs min-h-[72px] flex items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Programme Division
                  </span>
                </div>
              </div>

              {/* Division 4 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-700 rounded-xl p-3.5 text-center shadow-xs min-h-[72px] flex items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Monitoring & Evaluation Division
                  </span>
                </div>
              </div>
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

      {/* Section 12: Why BHTF Must Be Part of the National Strategy (Slide 16 / Screenshot 13) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="why-bhtf-strategy">
        <SectionEditBadge
          label="Why BHTF in National Strategy"
          pageSlug="about-organization"
          sectionId="why-bhtf-strategy"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Why BHTF Must Be Part of the Strategy",
            subtitle: "Bridging the gap between 11% pharmaceutical inflation and 7.7% returns through sovereign endowment expansion.",
            badge: "Strategic Imperative",
          }}
        />
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
            Strategic Imperative
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Why BHTF Must Be Part of the Strategy
          </h2>
          <p className="text-slate-600 text-sm font-light">
            Sustaining universal free healthcare requires a resilient sovereign endowment that outpaces pharmaceutical inflation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition space-y-3">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-700 grid place-items-center">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">11% Inflation vs 7.7% Returns</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Global essential medicine prices escalate at 11% annually against an average 7.7% investment yield. Without scaling the capital corpus, the financing gap will widen each year.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center">
              <Landmark className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">1:1 Sovereign RGOB Matching</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Enacted under the Royal Charter 2000, the Royal Government matches every Ngultrum contributed by the public and corporate donors, doubling the impact of every contribution.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 transition space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 grid place-items-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Donor Transition Buffer</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              As Bhutan transitions from external health assistance programs (GAVI, Global Fund), BHTF serves as the sole permanent domestic financing shield protecting essential health services.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-teal-300 transition space-y-3">
            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 grid place-items-center">
              <Scale className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Constitutional Mandate Fulfillment</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Directly delivers on Article 9, Section 21 of the Constitution of the Kingdom of Bhutan, ensuring free access to basic healthcare in both modern and traditional medicine.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-300 transition space-y-3 lg:col-span-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 grid place-items-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-slate-900">Generational Health Sovereignty</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              By expanding the capital endowment to roughly Nu. 8.6 Billion by 2030, Bhutan secures perpetual health self-reliance, ensuring no future generation ever faces healthcare rationing or catastrophic medical debt.
            </p>
          </div>
        </div>
      </section>

      {/* Section 13: BHTF's Role in the National Strategy (Slide 17 / Screenshot 14) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="role-national-strategy">
        <SectionEditBadge
          label="BHTF Role in National Strategy"
          pageSlug="about-organization"
          sectionId="role-national-strategy"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "BHTF's Role in the National Strategy",
            subtitle: "Three strategic asks to anchor sustainable health financing across Bhutan.",
            badge: "National Strategic Asks",
          }}
        />
        <div className="bg-gradient-to-br from-emerald-950 via-[#0B251F] to-slate-950 rounded-3xl p-6 sm:p-12 text-white shadow-xl border border-emerald-500/20 space-y-8">
          <div className="space-y-3 text-center max-w-3xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              National Strategic Asks
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
              BHTF's Role in the National Strategy
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-light">
              Three critical pillars to achieve lasting health security under the National Sustainable Health Financing Strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-amber-400/20 text-amber-300 font-mono font-bold text-sm grid place-items-center">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Double the Capital Corpus</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Expand the fund from Nu. 4.3B baseline to roughly <strong className="text-amber-300 font-mono">Nu. 8.6 Billion</strong> by 2030 through RGOB matching, corporate partnerships, and diaspora mobilization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-400/20 text-emerald-300 font-mono font-bold text-sm grid place-items-center">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Strengthen Health Contribution</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Optimize the national 1% Health Contribution collections, ensuring 100% direct procurement pass-through to absorb growing clinical demands.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-400/20 text-teal-300 font-mono font-bold text-sm grid place-items-center">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Prudent Portfolio Diversification</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Broaden investment horizons into regulated international instruments via multilateral partners (ADB) to optimize yield and mitigate domestic liquidity constraints.
              </p>
            </div>
          </div>

          {/* Shared Goal Banner */}
          <div className="p-5 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                The Shared National Goal
              </span>
              <p className="text-sm font-medium text-white mt-0.5">
                A self-reliant, sustainable healthcare financing ecosystem guaranteeing free primary health care for every Bhutanese citizen in perpetuity.
              </p>
            </div>
            <Link
              to="/get-involved"
              className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition shrink-0"
            >
              Support the Strategy →
            </Link>
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

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
