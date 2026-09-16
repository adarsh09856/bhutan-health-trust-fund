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
  Quote,
  Clock,
  Scale,
  Stethoscope,
  Zap,
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
        {/* Authentic Bhutanese Himalayan & Dzong Architecture Scenic Background Banner */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40"
          style={{ backgroundImage: `url(${hero})` }}
        />
        {/* Multi-stop sovereign dark vignette overlay to preserve high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#061713]/92 via-[#061713]/75 to-[#061713]/92 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#061713]/60 via-transparent to-[#061713] pointer-events-none" />

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

              {/* Institutional Endorsement Bar */}
              <div className="pt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400 border-t border-white/10">
                <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold font-mono">
                  Sovereign Partners:
                </span>
                <span className="text-slate-300 font-medium">World Health Organization (WHO)</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">UNICEF</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">Gavi, The Vaccine Alliance</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300 font-medium">World Bank</span>
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

      {/* 4. National Primary Healthcare Strategic Buffer Gauge (Live Transparency Strip) */}
      <section className="py-14 sm:py-18 bg-[#091f19] text-white border-b border-amber-400/20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 h-80 w-80 bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-500/30">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live National Strategic Buffer Status</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
                Primary Healthcare Commodity Reserves
              </h2>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Certified Active • All 20 Dzongkhags & 205 Gewogs
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Universal Vaccines</span>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded">12 Months</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-full rounded-full" />
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Continuous 1-year buffer maintained for all 14 childhood and maternal antigens.
              </p>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Essential Medicines</span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">6 Months</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 w-[88%] rounded-full" />
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Zero-stockout national buffer across 120+ vital drugs and emergency infusions.
              </p>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Alpine Solar Cold Chain</span>
                <span className="text-xs font-mono font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded">100% Uptime</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal-500 to-teal-400 w-full rounded-full" />
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Solar-powered off-grid refrigeration operating continuously at high altitudes.
              </p>
            </div>

            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gewog Delivery Coverage</span>
                <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">205 / 205</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 w-full rounded-full" />
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                All primary health units in remote valleys restocked before seasonal passes close.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Universal Routine Childhood & Maternal Immunization Matrix (14 Antigens) */}
      <section className="py-20 sm:py-24 bg-[#FAF8F3] border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <Syringe className="h-3.5 w-3.5 text-emerald-600" />
              <span>National Immunization Schedule</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              14 Universal Routine Antigens
            </h2>
            <p className="text-base text-slate-600 font-sans leading-relaxed">
              Every child born in the Kingdom of Bhutan receives 100% free, uninterrupted vaccines financed permanently through the Bhutan Health Trust Fund.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">At Birth</span>
                <span className="text-xs font-bold text-slate-900">99.8%</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">BCG (Tuberculosis)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Administered within 24 hours of birth in all district hospitals and remote gewog maternity units.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">6, 10, 14 Wks</span>
                <span className="text-xs font-bold text-slate-900">99.4%</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Pentavalent (DTP-HepB-Hib)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                5-in-1 pediatric protection against Diphtheria, Tetanus, Pertussis, Hepatitis B, and Hib pneumonia.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">6 &amp; 14 Wks</span>
                <span className="text-xs font-bold text-slate-900">Polio-Free</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Polio (IPV &amp; bOPV)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dual mucosal and systemic immunity safeguarding Bhutan's wild poliovirus elimination status since 2014.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">6, 10, 14 Wks</span>
                <span className="text-xs font-bold text-slate-900">98.9%</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">PCV (Pneumococcal)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Shields infants against invasive pneumococcal meningitis, bacteremia, and acute respiratory infections.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">6 &amp; 10 Wks</span>
                <span className="text-xs font-bold text-slate-900">99.1%</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Rotavirus Oral Vaccine</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Prevents severe pediatric diarrhea and winter gastroenteritis hospitalizations among mountain communities.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">9 &amp; 24 Mos</span>
                <span className="text-xs font-bold text-slate-900">Eliminated</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Measles-Rubella (MR)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                WHO-certified measles and rubella elimination achieved through zero stockouts in cold-chain depots.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">9-14 Years</span>
                <span className="text-xs font-bold text-slate-900">96.5%</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">HPV (Cervical Cancer)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                First nation in South Asia to introduce gender-neutral school HPV vaccination, eliminating cervical cancer risks.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">Pregnancy</span>
                <span className="text-xs font-bold text-slate-900">99.7%</span>
              </div>
              <h3 className="font-serif text-base font-bold text-slate-900">Td (Tetanus-Diphtheria)</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Universal maternal immunization ensuring complete elimination of neonatal and maternal tetanus mortality.
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-[#061713] text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2.5">
              <Award className="h-5 w-5 text-amber-400 shrink-0" />
              <span className="text-slate-200">
                WHO Regional Verification: Bhutan maintains unbroken national coverage above 95% for all routine antigens.
              </span>
            </div>
            <Link
              to="/our-work"
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold whitespace-nowrap"
            >
              <span>Explore Cold Chain Logistics Formulary</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Interactive 6 Health Commodities Pipeline */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CommodityTracker />
        </div>
      </section>

      {/* 6. Field Voices from 205 Remote Gewogs (Frontline Ground Impact) */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Voices from the Frontline</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Healthcare Self-Reliance in Action
            </h2>
            <p className="text-base text-slate-600 font-sans leading-relaxed">
              How the Bhutan Health Trust Fund safeguards mothers, children, and remote communities across the Kingdom's most rugged terrain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg hover:border-amber-400/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    Laya Gewog (3,800m)
                  </span>
                  <MapPin className="h-4 w-4 text-emerald-600" />
                </div>
                <blockquote className="font-serif text-base text-slate-800 italic leading-relaxed">
                  "Winter snow closes our high passes for five months. Because BHTF pre-positions our full vaccine and medicine quota in autumn, not a single newborn in Laya missed their immunization schedule."
                </blockquote>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-emerald-700 text-white font-bold grid place-items-center text-xs">
                  KD
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Karma Dema</div>
                  <div className="text-[11px] text-slate-500">Senior Health Assistant, Laya PHU</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg hover:border-amber-400/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-800">
                    Trashiyangtse Outpost
                  </span>
                  <MapPin className="h-4 w-4 text-amber-600" />
                </div>
                <blockquote className="font-serif text-base text-slate-800 italic leading-relaxed">
                  "The zero-stockout policy is a sacred promise. When patients walk for two days to reach our clinic, having guaranteed, free essential medicines preserves both their health and their dignity."
                </blockquote>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-amber-600 text-white font-bold grid place-items-center text-xs">
                  TW
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Dr. Tashi Wangchuk</div>
                  <div className="text-[11px] text-slate-500">District Medical Officer, Eastern Region</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/80 rounded-3xl p-7 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-lg hover:border-amber-400/50 transition-all duration-300">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-teal-100 text-teal-800">
                    Lingzhi Primary Unit
                  </span>
                  <MapPin className="h-4 w-4 text-teal-600" />
                </div>
                <blockquote className="font-serif text-base text-slate-800 italic leading-relaxed">
                  "High-altitude solar refrigerators funded by BHTF hold vaccine potency steady despite sub-zero blizzards. Our cold-chain link to Thimphu has never failed."
                </blockquote>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-teal-700 text-white font-bold grid place-items-center text-xs">
                  PD
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Passang Dorji</div>
                  <div className="text-[11px] text-slate-500">Cold Chain Logistics Coordinator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Essential Medicines Life-Saving Formulary Classes */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Pill className="h-3.5 w-3.5 text-amber-600" />
              <span>National Essential Drugs List</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Life-Saving Formulary Classes
            </h2>
            <p className="text-base text-slate-600 font-sans leading-relaxed">
              Every basic health unit and district hospital in Bhutan dispenses WHO-standard pharmaceuticals free of charge, permanently sustained through BHTF endowment yields.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/80 p-7 space-y-4 hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 grid place-items-center">
                <Activity className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Cardiovascular &amp; Hypertension</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Amlodipine, Enalapril, Losartan, Atenolol, and Atorvastatin. Sustains daily non-communicable disease therapy across all 20 Dzongkhags.
              </p>
              <div className="text-[11px] font-mono text-amber-800 font-semibold pt-1">
                Zero Out-of-Pocket Cost for Citizens
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/80 p-7 space-y-4 hover:border-emerald-500/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 grid place-items-center">
                <Pill className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Diabetes &amp; Endocrine Health</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Human Recombinant Insulin (Regular &amp; NPH), Metformin, and Glimepiride. Guaranteed cold-chain storage from Thimphu to remote gewogs.
              </p>
              <div className="text-[11px] font-mono text-emerald-800 font-semibold pt-1">
                Continuous 6-Month National Reserve
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/80 p-7 space-y-4 hover:border-teal-500/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-teal-100 text-teal-800 grid place-items-center">
                <ShieldCheck className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Broad-Spectrum Anti-Infectives</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Amoxicillin-Clavulanic Acid, Ceftriaxone, Azithromycin, and Doxycycline. First-line treatments for mountain respiratory and bacterial infections.
              </p>
              <div className="text-[11px] font-mono text-teal-800 font-semibold pt-1">
                WHO Pre-Qualified Procurement
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/80 p-7 space-y-4 hover:border-rose-400/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-rose-100 text-rose-800 grid place-items-center">
                <Heart className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Maternal Obstetric Survival</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Injectable Oxytocin, Magnesium Sulphate, Tranexamic Acid, and Misoprostol. Critical emergency interventions protecting mothers during childbirth.
              </p>
              <div className="text-[11px] font-mono text-rose-800 font-semibold pt-1">
                100% Delivery Room Availability
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/80 p-7 space-y-4 hover:border-blue-400/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-800 grid place-items-center">
                <Stethoscope className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Respiratory &amp; Resuscitation</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Salbutamol Nebulizer Solution, Budesonide Inhalers, Adrenaline, and Hydrocortisone. Essential for severe pediatric asthma and highland exposure.
              </p>
              <div className="text-[11px] font-mono text-blue-800 font-semibold pt-1">
                Supplied to all 205 Gewog PHUs
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/80 p-7 space-y-4 hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 grid place-items-center">
                <Zap className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900">Critical Emergency Infusions</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Ringer's Lactate, Normal Saline (0.9%), Dextrose 5%, and WHO Oral Rehydration Salts. Trauma fluid replacement for road accidents and acute dehydrations.
              </p>
              <div className="text-[11px] font-mono text-amber-800 font-semibold pt-1">
                Pre-Stocked Before Winter Closures
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive 20 Dzongkhags Health District Explorer */}
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

      {/* 8. Royal Sovereign Health Milestones (1998-2026 Timeline) */}
      <section className="py-20 sm:py-24 bg-[#061713] text-white border-t border-amber-400/20 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 h-96 w-96 bg-amber-400/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Sovereign Fiduciary Legacy</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
              A Journey of Healthcare Self-Reliance
            </h2>
            <p className="text-base text-slate-300 font-sans leading-relaxed font-light">
              From Royal vision to a permanent statutory endowment protecting every generation of Bhutanese citizens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-amber-400/40 hover:bg-white/[0.07] transition-all duration-300">
              <span className="font-serif text-3xl font-black text-amber-400 block">1998</span>
              <h3 className="font-serif text-base font-bold text-white">Royal Vision Proclaimed</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                His Majesty the Fourth Druk Gyalpo initiates the endowment to insulate primary healthcare from donor volatility.
              </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-amber-400/40 hover:bg-white/[0.07] transition-all duration-300">
              <span className="font-serif text-3xl font-black text-amber-400 block">2003</span>
              <h3 className="font-serif text-base font-bold text-white">Royal Charter Enacted</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Formal statutory establishment with permanent ring-fenced protection and governance under the Board of Trustees.
              </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-amber-400/40 hover:bg-white/[0.07] transition-all duration-300">
              <span className="font-serif text-3xl font-black text-amber-400 block">2014</span>
              <h3 className="font-serif text-base font-bold text-white">1:1 RGOB Sovereign Match</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Royal Government of Bhutan cements perpetual dollar-for-dollar matching commitment for all citizen contributions.
              </p>
            </div>

            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 space-y-3 hover:border-amber-400/40 hover:bg-white/[0.07] transition-all duration-300">
              <span className="font-serif text-3xl font-black text-amber-400 block">2026</span>
              <h3 className="font-serif text-base font-bold text-white">Nu. 3.2B+ Endowment</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Permanent sovereign corpus generating Nu. 145M+ annual procurement yields without touching sovereign principal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Editorial News & Press Spotlight */}
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

      {/* Fiduciary Triple-Lock Governance & Capital Ring-Fencing */}
      <section className="py-20 sm:py-24 bg-[#FAF8F3] border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <Lock className="h-3.5 w-3.5 text-amber-600" />
              <span>Sovereign Fiduciary Safeguards</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              The Fiduciary Triple-Lock
            </h2>
            <p className="text-base text-slate-600 font-sans leading-relaxed">
              Institutional mechanisms designed so that your contributions remain permanently protected, growing in value to protect Bhutanese citizens forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 space-y-4 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 grid place-items-center">
                <Lock className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">1. Statutory Ring-Fencing</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Protected by Royal Charter. The endowment principal can never be withdrawn, borrowed against, or absorbed into general treasury operations.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 space-y-4 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-800 grid place-items-center">
                <TrendingUp className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">2. Pure Yield Financing</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Essential medicines are procured exclusively from dividend and interest yields. The core Nu. 3.2B+ principal remains untouched and grows continuously.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 space-y-4 shadow-xs hover:border-teal-500/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-teal-100 text-teal-800 grid place-items-center">
                <Globe className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">3. WHO-Prequalified Bidding</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Zero middleman markups. International competitive tenders secure the lowest global institutional prices for vaccines and cold chain equipment.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 space-y-4 shadow-xs hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-800 grid place-items-center">
                <ShieldCheck className="h-6 w-6 stroke-[1.75]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">4. Constitutional RAA Audit</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-sans">
                Annual statutory audits conducted by the Royal Audit Authority of Bhutan, published unedited to Parliament and available to any citizen.
              </p>
            </div>
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

      {/* 11. DRC 100% Tax Exemption & Corporate CSR Matching Portal */}
      <section className="py-20 sm:py-24 bg-[#FAF8F3] border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-14 shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-300/60 text-emerald-900 text-xs font-bold uppercase tracking-wider font-mono">
                  <Scale className="h-3.5 w-3.5 text-emerald-600" />
                  <span>DRC Income Tax Act Section 10(f)</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  100% Tax Deductible Corporate & Citizen Giving
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                  Under statutory proclamation by the Ministry of Finance, every contribution made to the Bhutan Health Trust Fund qualifies for an immediate 100% deduction against personal income tax (PIT) and corporate income tax (CIT), matched Nu. 1:1 by the Royal Government.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-slate-200/70 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900">Instant Digital Tax Voucher</div>
                    <p className="text-[11px] text-slate-500">
                      Automated issuance of DRC-recognized tax exemption receipts instantly upon contribution.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-slate-200/70 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900">Nu. 1:1 Sovereign Multiplier</div>
                    <p className="text-[11px] text-slate-500">
                      Every Nu. 1,000 you donate releases an additional Nu. 1,000 from the Treasury match.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/get-involved"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md transition-all active:scale-95"
                  >
                    <span>Calculate Your Tax Shield & Donate</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/track-donation"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
                  >
                    <span>Verify Past Receipt</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 bg-gradient-to-br from-[#061713] to-[#0d2d24] text-white p-7 sm:p-9 rounded-3xl border border-amber-400/20 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="text-xs font-bold font-mono text-amber-300 uppercase tracking-widest">
                    Pledge Impact Example
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Sovereign Formula
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300">Your Contribution:</span>
                    <span className="font-serif font-bold text-base text-white">Nu. 50,000</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-amber-300">+ RGOB 1:1 Sovereign Match:</span>
                    <span className="font-serif font-bold text-base text-amber-300">Nu. 50,000</span>
                  </div>
                  <div className="h-px bg-white/10 my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-200">Total Endowment Impact:</span>
                    <span className="font-serif font-black text-xl text-emerald-300">Nu. 100,000</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] text-slate-400 pt-1">
                    <span>DRC Tax Deduction (30% bracket):</span>
                    <span className="font-mono text-emerald-400">Save Nu. 15,000 PIT</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 leading-relaxed font-light">
                  "Your net cost is only Nu. 35,000, while delivering Nu. 100,000 in permanent health purchasing power for universal vaccines."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philanthropic Impact Giving Tiers (1:1 Sovereign Multiplier) */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/60 text-amber-900 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="h-3.5 w-3.5 text-amber-600" />
              <span>Nu. 1:1 RGOB Sovereign Multiplier</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Tangible Health Outcomes per Pledge
            </h2>
            <p className="text-base text-slate-600 font-sans leading-relaxed">
              When you contribute, the Royal Government immediately releases an equal sum from the Treasury, doubling your healthcare purchasing power for the nation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between space-y-5 hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase">
                  Pledge Nu. 1,000
                </span>
                <div className="font-serif text-3xl font-black text-slate-900">
                  Nu. 2,000 <span className="text-xs font-sans font-normal text-slate-500">Value</span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  Universal Vaccines for 5 Newborns
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Covers complete 14-antigen childhood immunizations from birth BCG through 24-month Measles-Rubella boosters.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 text-[11px] text-emerald-700 font-mono font-semibold">
                DRC Tax Shield: Save Nu. 300
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between space-y-5 hover:border-emerald-500/50 hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full uppercase">
                  Pledge Nu. 5,000
                </span>
                <div className="font-serif text-3xl font-black text-slate-900">
                  Nu. 10,000 <span className="text-xs font-sans font-normal text-slate-500">Value</span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  6-Month Pediatric Antibiotic Supply
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Guarantees zero stockouts of oral amoxicillin, ORS salts, and emergency nebulizer solutions in a remote gewog clinic.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 text-[11px] text-emerald-700 font-mono font-semibold">
                DRC Tax Shield: Save Nu. 1,500
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between space-y-5 hover:border-teal-500/50 hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-100 px-2.5 py-1 rounded-full uppercase">
                  Pledge Nu. 25,000
                </span>
                <div className="font-serif text-3xl font-black text-slate-900">
                  Nu. 50,000 <span className="text-xs font-sans font-normal text-slate-500">Value</span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  Alpine Solar Cold-Chain Battery Pack
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Equips a high-altitude primary health unit with deep-cycle solar backup, maintaining vaccine potency during sub-zero blizzards.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 text-[11px] text-emerald-700 font-mono font-semibold">
                DRC Tax Shield: Save Nu. 7,500
              </div>
            </div>

            <div className="bg-[#FAF8F3] rounded-3xl border border-slate-200/90 p-7 flex flex-col justify-between space-y-5 hover:border-amber-400/50 hover:shadow-md transition-all">
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full uppercase">
                  Pledge Nu. 100,000
                </span>
                <div className="font-serif text-3xl font-black text-slate-900">
                  Nu. 200,000 <span className="text-xs font-sans font-normal text-slate-500">Value</span>
                </div>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  District Emergency Resuscitation Reserve
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  Pre-positions a full year of emergency trauma infusions, cardiac drugs, and maternal hemorrhage kits for an entire Dzongkhag.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/60 text-[11px] text-emerald-700 font-mono font-semibold">
                DRC Tax Shield: Save Nu. 30,000 (CIT/PIT)
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-9 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-xs uppercase tracking-wider"
            >
              <Heart className="h-4 w-4 fill-slate-950 shrink-0" />
              <span>Make a 1:1 Matched Contribution Now</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. Institutional Partners Bar (Grayscale to Color) */}
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
