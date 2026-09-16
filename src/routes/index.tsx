import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getPublicImpactMetrics,
  getPublicSettings,
  getPublicNews,
  getPublicPage,
} from "@/lib/api/public.functions";
import type { ImpactMetric, NewsArticle, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";

import {
  Users,
  FileText,
  ShieldCheck,
  HandHeart,
  ArrowRight,
  BarChart3,
  Pill,
  Lock,
  Sparkles,
  Calendar,
  MapPin,
  Syringe,
  Activity,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Award,
  ThermometerSnowflake,
  Heart,
  Globe,
  Building2,
} from "lucide-react";
import hero from "@/assets/hero-bhutan.jpg";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";
import { DzongkhagExplorer } from "@/components/dzongkhag-map";
import { EndowmentCalculator } from "@/components/endowment-calculator";
import { CommodityTracker } from "@/components/commodity-tracker";
import { useCountUp } from "@/hooks/use-count-up";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const [page, metrics, settings, news] = await Promise.all([
        getPublicPage({ data: { slug: "home" } }).catch(() => null),
        getPublicImpactMetrics().catch(() => []),
        getPublicSettings().catch(() => ({})),
        getPublicNews().catch(() => []),
      ]);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return {
        customSections: sections,
        liveMetrics: metrics || [],
        settings: settings || {},
        liveNews: (news || []).slice(0, 3),
      };
    } catch {
      return {
        customSections: null,
        liveMetrics: [],
        settings: {},
        liveNews: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      {
        name: "description",
        content:
          "Bhutan Health Trust Fund sustainably finances essential medicines and vaccines for every Bhutanese citizen across all 20 Dzongkhags.",
      },
    ],
  }),
  component: Index,
});

const quickAccess = [
  {
    icon: Users,
    label: "Royal Mandate & Charter",
    desc: "Founding history, Board of Trustees & fiduciary oversight",
    to: "/about",
  },
  {
    icon: Pill,
    label: "120+ Essential Medicines",
    desc: "Zero-stockout primary and emergency healthcare formulary",
    to: "/our-work",
  },
  {
    icon: Syringe,
    label: "Universal Routine Vaccines",
    desc: "100% Childhood immunization coverage across all 20 Dzongkhags",
    to: "/our-work",
  },
  {
    icon: FileText,
    label: "Reports & Certified Audits",
    desc: "Royal Audit Authority (RAA) statutory financial statements",
    to: "/reports",
  },
  {
    icon: ShieldCheck,
    label: "Governance & Policies",
    desc: "Trust regulations, procurement ethics & whistleblower protections",
    to: "/policies",
  },
  {
    icon: HandHeart,
    label: "Contribute (1:1 Matched)",
    desc: "Every Ngultrum matched by the Royal Government of Bhutan",
    to: "/get-involved",
  },
];

const defaultStats = [
  {
    value: "780,000+",
    label: "Citizens Protected",
    desc: "Universal healthcare coverage guaranteed across all 20 Dzongkhags",
    icon: Users,
  },
  {
    value: "120+",
    label: "Essential Medicines",
    desc: "Continuous national buffer for vital primary and emergency drugs",
    icon: Pill,
  },
  {
    value: "20 / 20",
    label: "Dzongkhags Covered",
    desc: "Direct supply line to all 205 remote gewog Primary Health Units",
    icon: MapPin,
  },
  {
    value: "100%",
    label: "Routine Vaccines",
    desc: "14 pediatric antigens fully financed and sustained in perpetuity",
    icon: Syringe,
  },
];

const featuredNews = [
  {
    slug: "nationwide-vaccination-2024",
    img: newsVaccine,
    category: "Immunization",
    title: "BHTF Secures Full Financing for Nationwide Immunization Drive",
    desc: "Securing uninterrupted supply chains for pediatric vaccines and seasonal boosters across remote high-altitude communities in Gasa and Trashiyangtse.",
    date: "August 2026",
    readTime: "3 min read",
  },
  {
    slug: "primary-healthcare-expansion",
    img: newsCommunity,
    category: "Primary Health",
    title: "Strengthening Primary Health Units Across All 20 Dzongkhags",
    desc: "Over Nu. 180M disbursed to guarantee essential medicine buffers in remote health posts before winter seasonal isolations.",
    date: "July 2026",
    readTime: "4 min read",
  },
  {
    slug: "annual-report-2023-released",
    img: newsReport,
    category: "Publications",
    title: "Statutory Financial & Operational Audit Report Released",
    desc: "Royal Audit Authority certifies clean financial statements with full transparency on endowment returns and healthcare disbursements.",
    date: "June 2026",
    readTime: "5 min read",
  },
];

const metricIconMap: Record<string, any> = {
  Users,
  Pill,
  MapPin,
  Syringe,
  Activity,
  Award,
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  BarChart3,
};

// Minimal Stat Item with Viewport Count-Up Animation
function MinimalStatItem({
  value,
  label,
  desc,
  icon: Icon,
}: {
  value: string;
  label: string;
  desc: string;
  icon: any;
}) {
  const numericMatch = value.match(/^([\d,]+)/);
  const rawNumber = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ""), 10) : null;
  const suffix = value.replace(/^[\d,]+/, "");

  const counter = useCountUp({
    end: rawNumber ?? 0,
    suffix: suffix,
    duration: 1900,
  });

  return (
    <div ref={counter.ref} className="flex flex-col space-y-2.5 p-6 sm:p-8 hover:bg-slate-50/80 transition-colors duration-200">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-lg bg-amber-50 border border-amber-200/80 grid place-items-center">
          <Icon className="h-3.5 w-3.5 text-amber-700 stroke-[2]" />
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
          {label}
        </span>
      </div>
      <div className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-slate-900 tracking-tight leading-none">
        {rawNumber !== null ? counter.formatted : value}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-xs">
        {desc}
      </p>
    </div>
  );
}

// Sovereign Glass Hero Corpus Card
function HeroCorpusCard() {
  const corpusCounter = useCountUp({
    end: 3248500000,
    prefix: "Nu. ",
    duration: 2200,
  });

  return (
    <div className="relative space-y-3">
      {/* Main Glassmorphic Corpus Card */}
      <div
        ref={corpusCounter.ref}
        className="relative rounded-3xl bg-[#091b16]/90 border border-white/15 p-5 sm:p-7 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.65)] backdrop-blur-2xl space-y-5 overflow-hidden md:animate-float text-white"
      >
        {/* Subtle Top Gold Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-bold">
              Sovereign Health Corpus
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
            Nu. 1:1 RGOB Matched
          </span>
        </div>

        {/* Main Numeral */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold font-sans block">
            Perpetual Health Endowment
          </span>
          <div className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white tracking-tight leading-tight">
            {corpusCounter.formatted}
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed pt-0.5 font-light">
            Invested sovereign capital yielding permanent annual returns to fund Bhutan's primary healthcare commodities.
          </p>
        </div>

        {/* 3 Editorial Supply Rows */}
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.08] p-3 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-300 grid place-items-center shrink-0 border border-emerald-500/30">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Universal Routine Vaccines</div>
                <div className="text-[11px] text-slate-400">100% Childhood Coverage (14 Antigens)</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-emerald-300">Nu. 68.5M</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.08] p-3 rounded-2xl border border-white/10 hover:border-amber-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-300 grid place-items-center shrink-0 border border-amber-500/30">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">120+ Essential Medicines</div>
                <div className="text-[11px] text-slate-400">Zero Stockout Buffer across 205 Gewogs</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-amber-300">Nu. 145.0M</span>
          </div>

          <div className="flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.08] p-3 rounded-2xl border border-white/10 hover:border-teal-500/40 transition">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-teal-500/20 text-teal-300 grid place-items-center shrink-0 border border-teal-500/30">
                <ThermometerSnowflake className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Alpine Cold Chain Logistics</div>
                <div className="text-[11px] text-slate-400">High-Altitude Solar Refrigeration</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-teal-300">Nu. 24.2M</span>
          </div>
        </div>

        {/* Simulator Link */}
        <div className="pt-1">
          <Link
            to="/get-involved"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-[0_10px_25px_rgba(212,162,55,0.35)] hover:shadow-[0_14px_32px_rgba(212,162,55,0.5)] hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            <Sparkles className="h-3.5 w-3.5 fill-slate-950" />
            <span>Simulate Your 1:1 Matched Contribution →</span>
          </Link>
        </div>

        {/* Trust Seal Badges */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-slate-400 font-sans">
          <div className="flex items-center gap-1 text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>100% Ring-Fenced Healthcare Corpus</span>
          </div>
          <div className="flex items-center gap-1 text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>RAA Clean Audit Certified</span>
          </div>
        </div>
      </div>

      {/* Floating Operational Status Satellite Micro-Card */}
      <div className="flex items-center justify-between bg-[#061410]/95 border border-amber-400/25 rounded-2xl p-3.5 shadow-xl backdrop-blur-xl text-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 grid place-items-center shrink-0">
            <MapPin className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">20/20 Dzongkhags Buffer Active</div>
            <div className="text-[10px] text-slate-400">Zero Stockouts across 205 remote Gewog clinics</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-300 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
          100% Funded
        </span>
      </div>
    </div>
  );
}

function Index() {
  const loaderData = Route.useLoaderData();
  const [liveMetrics, setLiveMetrics] = useState<ImpactMetric[]>(loaderData?.liveMetrics || []);
  const [settings, setSettings] = useState<Record<string, string>>(loaderData?.settings || {});
  const [liveNews, setLiveNews] = useState<NewsArticle[]>(loaderData?.liveNews || []);
  const [customSections, setCustomSections] = useState<PageBlockSection[] | null>(
    loaderData?.customSections || null,
  );

  useEffect(() => {
    getPublicPage({ data: { slug: "home" } })
      .then((page) => {
        if (page && page.status === "published") {
          try {
            const parsed = JSON.parse(page.sectionsJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCustomSections(parsed);
            }
          } catch {}
        }
      })
      .catch(() => {});

    getPublicImpactMetrics()
      .then((res) => {
        if (res && res.length > 0) setLiveMetrics(res);
      })
      .catch(() => {});

    getPublicSettings()
      .then((res) => {
        if (res) setSettings(res);
      })
      .catch(() => {});

    getPublicNews()
      .then((res) => {
        if (res && res.length > 0) setLiveNews(res.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  if (customSections && customSections.length > 0) {
    return (
      <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900 min-h-screen">
        {settings["announcement_banner_enabled"] === "true" && settings["announcement_banner"] && (
          <div className="bg-[#0B1F1A] text-amber-200 text-xs font-medium py-2.5 px-4 text-center border-b border-amber-500/20 flex items-center justify-center gap-2">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
            <span>{settings["announcement_banner"]}</span>
          </div>
        )}
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }


  const displayStats =
    liveMetrics.length > 0
      ? liveMetrics.map((m) => ({
          value: m.value,
          label: m.label,
          desc: m.description,
          icon: metricIconMap[m.icon] || Users,
        }))
      : defaultStats;

  const displayNews =
    liveNews.length > 0
      ? liveNews.map((n, idx) => ({
          slug: n.slug,
          img: n.coverImage || [newsVaccine, newsCommunity, newsReport][idx % 3],
          category: n.category,
          title: n.title,
          desc: n.excerpt,
          date: n.publishedAt
            ? new Date(n.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })
            : "Recent",
          readTime: "4 min read",
        }))
      : featuredNews;

  return (
    <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      {/* Top Sovereign Announcement Ribbon if Enabled */}
      {settings["announcement_banner_enabled"] === "true" && settings["announcement_banner"] && (
        <div className="bg-[#0B1F1A] text-amber-200 text-xs font-medium py-2.5 px-4 text-center border-b border-amber-500/20 flex items-center justify-center gap-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
          <span>{settings["announcement_banner"]}</span>
        </div>
      )}

      {/* 1. Atmospheric Modern Sovereign Dark Hero Section */}
      <section className="relative overflow-hidden bg-[#061713] text-white pt-24 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20">
        {/* Subtle royal pattern overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.05] mix-blend-luminosity"
          style={{ backgroundImage: `url(${hero})` }}
        />

        {/* Ambient Subtle Luminous Orbs */}
        <div className="absolute top-6 left-1/4 h-96 w-96 bg-amber-400/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 h-96 w-96 bg-emerald-500/[0.09] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 h-72 w-72 bg-teal-500/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Monumental Editorial Typography */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7">
              {/* Royal Charter & Live Status Badge */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xl shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span>Royal Charter Mandate • 100% Guaranteed</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-bold font-mono">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>Nu. 1:1 RGOB Sovereign Match</span>
                </div>
              </div>

              {/* Monumental Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
                Healthy People.{" "}
                <span className="text-gradient-gold drop-shadow-xs">
                  Stronger Bhutan.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl font-light">
                Bhutan's permanent statutory healthcare endowment — sustainably financing 120+ essential medicines, universal childhood vaccines, and alpine cold chain logistics across all 20 Dzongkhags without foreign reliance.
              </p>

              {/* Feature Highlights Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="flex items-center gap-2 bg-white/[0.05] p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-medium text-slate-200">Zero Stockout Guarantee</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.05] p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="font-medium text-slate-200">205 Remote Gewogs</span>
                </div>
                <div className="flex items-center gap-2 bg-white/[0.05] p-2.5 rounded-xl border border-white/10 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="font-medium text-slate-200">100% Tax Exempt (DRC)</span>
                </div>
              </div>

              {/* Modern Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-wider"
                >
                  <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
                  <span>Contribute (1:1 Matched)</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Link>

                <Link
                  to="/our-work"
                  className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white shadow-xs hover:-translate-y-0.5 transition-all text-sm tracking-wide backdrop-blur-sm"
                >
                  <span>Explore 6 Commodity Streams</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Sovereign Corpus Endowment Card */}
            <div className="lg:col-span-5">
              <HeroCorpusCard />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Minimal Stat Numerals Bar (Ultra Modern Bento Layout) */}
      <section className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            {displayStats.map((stat, idx) => (
              <MinimalStatItem
                key={idx}
                value={stat.value}
                label={stat.label}
                desc={stat.desc}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Refined Quick Access Portals (Sovereign Dark Theme) */}
      <section className="py-16 sm:py-24 bg-[#061713] text-white border-b border-white/10 relative overflow-hidden">
        {/* Ambient Subtle Luminous Orbs */}
        <div className="absolute top-0 right-1/4 h-80 w-80 bg-amber-400/[0.05] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 h-72 w-72 bg-emerald-500/[0.05] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/90 block mb-2 font-sans">
              Institutional Portals & Governance
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Governance, Stewardship & Public Portals
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 font-sans font-light">
              Direct access to statutory oversight, national medicine formularies, and official filings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {quickAccess.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="group bg-white/[0.04] p-6 rounded-2xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(212,162,55,0.15)] hover:-translate-y-1 hover:border-amber-400/50 hover:bg-white/[0.07] transition-all duration-300 flex items-start gap-4"
              >
                <div className="h-12 w-12 rounded-2xl bg-white/[0.06] border border-white/10 text-amber-300 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-300 transition-all duration-300 grid place-items-center shrink-0 mt-0.5 shadow-2xs">
                  <item.icon className="h-5 w-5 stroke-[1.75]" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif text-base font-bold text-white group-hover:text-amber-300 transition leading-snug">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive 6 Health Commodities Pipeline */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CommodityTracker />
        </div>
      </section>

      {/* 5. Interactive 20 Dzongkhags Health District Explorer */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DzongkhagExplorer />
        </div>
      </section>

      {/* 6. Interactive 1:1 RGOB Matching Simulator */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EndowmentCalculator />
        </div>
      </section>

      {/* 7. Editorial News & Press Spotlight */}
      <section className="py-16 sm:py-24 border-t border-slate-200/80 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2 font-sans">
                Official Updates & Press Releases
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
                Latest Publications & Bulletins
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition"
            >
              <span>View all media archives</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {displayNews.map((item) => (
              <article
                key={item.slug}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/50 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1 text-slate-600">
                        <Calendar className="h-3 w-3 text-amber-600" /> {item.date}
                      </span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg font-semibold text-slate-900 group-hover:text-emerald-900 transition leading-snug line-clamp-2">
                      <Link to="/news/$slug" params={{ slug: item.slug }}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      to="/news/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-900 transition"
                    >
                      <span>Read Full Document</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-150" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Statutory Governance & RAA Clean Audit Assurance */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#061713] rounded-3xl p-8 sm:p-12 text-white border border-amber-500/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>Statutory Oversight • Royal Audit Authority (RAA)</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-tight">
                  Uncompromised Transparency & Fiduciary Integrity
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-light leading-relaxed">
                  Every Nu. contributed is ring-fenced exclusively for primary healthcare commodities. The Board of Trustees, chaired jointly with Royal Charter oversight, undergoes annual statutory audits certified with unqualified clean ratings.
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-amber-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-amber-400" />
                    <span>100% Ring-Fenced Healthcare Corpus</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300 bg-white/5 px-3 py-2 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Annual Certified Clean RAA Audit</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to="/reports"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition active:scale-95"
                >
                  <FileText className="h-4 w-4" />
                  <span>Download Annual Audit Reports</span>
                </Link>
                <Link
                  to="/policies"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition"
                >
                  <ShieldCheck className="h-4 w-4 text-slate-300" />
                  <span>Charter & Trust Regulations</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Institutional Partners Bar (Grayscale to Color) */}
      <section className="border-t border-slate-200/80 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block mb-6 font-sans">
            Institutional Partners & Global Collaborators
          </span>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-slate-700 text-xs sm:text-sm font-medium">
            <div className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-amber-400/60 transition cursor-default">
              World Health Organization (WHO)
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-amber-400/60 transition cursor-default">
              UNICEF Bhutan Country Office
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-amber-400/60 transition cursor-default">
              The World Bank
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-amber-400/60 transition cursor-default">
              Gavi, The Vaccine Alliance
            </div>
            <div className="px-5 py-2.5 rounded-xl bg-[#FAF8F3] border border-slate-200/80 text-slate-600 hover:text-slate-900 hover:border-amber-400/60 transition cursor-default">
              Ministry of Health, RGOB
            </div>
          </div>
        </div>
      </section>

      {/* 9. Sovereign Call to Action Banner */}
      <section className="bg-[#061713] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-t border-amber-400/20">
        {/* Background ambient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] bg-amber-400/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] bg-emerald-600/[0.08] rounded-full blur-[70px] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl text-center space-y-8">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400/10 text-amber-300 text-xs font-semibold border border-amber-400/25">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Gross National Happiness in Action</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight">
            Invest in the Permanent{" "}
            <span className="text-gradient-gold">Healthcare Shield</span>{" "}
            of the Kingdom
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto font-sans font-light">
            Your contribution directly builds the ring-fenced health corpus, ensuring that no
            hospital or remote gewog Primary Health Unit in Bhutan ever faces a stockout of
            life-saving vaccines or essential medicines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-[0_10px_30px_rgba(212,162,55,0.35)] hover:shadow-[0_16px_40px_rgba(212,162,55,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all uppercase tracking-wider"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950" />
              <span>Make a 1:1 Matched Contribution</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition"
            >
              <span>Direct Secretariat Inquiry</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>

          {/* Trust credentials strip */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6 border-t border-white/10 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>RAA Clean Audit Certified</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-300">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              <span>100% Ring-Fenced Healthcare Corpus</span>
            </div>
            <div className="flex items-center gap-1.5 text-teal-300">
              <Sparkles className="h-4 w-4 text-teal-400" />
              <span>Royal Charter Mandate</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <HeartHandshake className="h-4 w-4 text-amber-400" />
              <span>Nu. 1:1 RGOB Sovereign Match</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
