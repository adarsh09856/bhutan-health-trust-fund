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
    <div ref={counter.ref} className="flex flex-col space-y-3 p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-amber-600 stroke-[1.75]" />
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
          {label}
        </span>
      </div>
      <div className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-slate-900 tracking-tight">
        {rawNumber !== null ? counter.formatted : value}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed font-sans max-w-xs">
        {desc}
      </p>
    </div>
  );
}

// Slim Glass Sovereign Corpus Card in Hero
function HeroCorpusCard() {
  const corpusCounter = useCountUp({
    end: 3248500000,
    prefix: "Nu. ",
    duration: 2200,
  });

  return (
    <div
      ref={corpusCounter.ref}
      className="relative rounded-3xl bg-white/95 border border-slate-200/90 p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(11,31,26,0.08)] backdrop-blur-2xl space-y-6 overflow-hidden animate-float"
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-mono tracking-widest text-emerald-800 uppercase font-bold">
            Sovereign Health Corpus
          </span>
        </div>
        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300/60">
          1:1 RGOB Matched
        </span>
      </div>

      {/* Main Numeral */}
      <div className="space-y-1">
        <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold font-sans block">
          Perpetual Health Endowment
        </span>
        <div className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-slate-900 tracking-tight leading-tight">
          {corpusCounter.formatted}
        </div>
        <p className="text-xs text-slate-600 font-sans leading-relaxed pt-1">
          Invested capital yielding permanent annual returns to fund Bhutan's primary healthcare commodities.
        </p>
      </div>

      {/* 3 Editorial Supply Rows */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 hover:border-emerald-500/40 transition">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-100 text-emerald-800 grid place-items-center shrink-0 border border-emerald-200">
              <Syringe className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Universal Routine Vaccines</div>
              <div className="text-[11px] text-slate-500">100% Childhood Coverage (14 Antigens)</div>
            </div>
          </div>
          <span className="font-serif text-sm text-emerald-800 font-bold">Nu. 68.5M</span>
        </div>

        <div className="flex items-center justify-between bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 hover:border-amber-500/40 transition">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-amber-100 text-amber-800 grid place-items-center shrink-0 border border-amber-200">
              <Pill className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">120+ Essential Medicines</div>
              <div className="text-[11px] text-slate-500">Zero Stockout Buffer across 205 Gewogs</div>
            </div>
          </div>
          <span className="font-serif text-sm text-amber-800 font-bold">Nu. 145.0M</span>
        </div>

        <div className="flex items-center justify-between bg-slate-50/80 p-3 rounded-2xl border border-slate-200/70 hover:border-teal-500/40 transition">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-teal-100 text-teal-800 grid place-items-center shrink-0 border border-teal-200">
              <ThermometerSnowflake className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Alpine Cold Chain Logistics</div>
              <div className="text-[11px] text-slate-500">High-Altitude Solar Refrigeration</div>
            </div>
          </div>
          <span className="font-serif text-sm text-teal-800 font-bold">Nu. 24.2M</span>
        </div>
      </div>

      {/* Simulator Link */}
      <div className="pt-2">
        <Link
          to="/get-involved"
          className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-xs hover:shadow-md transition active:scale-95"
        >
          <Sparkles className="h-3.5 w-3.5 fill-slate-950" />
          <span>Simulate Your 1:1 Matched Contribution →</span>
        </Link>
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

      {/* 1. Atmospheric Modern White Hero Section */}
      <section className="relative overflow-hidden bg-mesh-white text-slate-900 pt-36 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        {/* Background Graphic overlay with delicate opacity */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.035] mix-blend-multiply"
          style={{ backgroundImage: `url(${hero})` }}
        />

        {/* Ambient Subtle Light Orbs */}
        <div className="absolute top-10 left-1/3 h-96 w-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 h-96 w-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Monumental Editorial Typography */}
            <div className="lg:col-span-7 space-y-7">
              {/* Royal Charter Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-50/90 border border-amber-300/60 text-amber-900 text-xs font-semibold backdrop-blur-xl shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span>Autonomous Statutory Trust • Royal Charter Mandate</span>
              </div>

              {/* Monumental Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08]">
                Healthy People.{" "}
                <span className="text-gradient-gold drop-shadow-xs">
                  Stronger Bhutan.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-sans max-w-2xl font-normal">
                Financing essential medicines and universal childhood vaccines to strengthen primary healthcare for every Bhutanese citizen across all 20 Dzongkhags.
              </p>

              {/* Modern Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.25)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-wider"
                >
                  <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
                  <span>Contribute (1:1 Matched)</span>
                  <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                </Link>

                <Link
                  to="/our-work"
                  className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 transition-all text-sm tracking-wide"
                >
                  <span>Explore Commodities</span>
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
      {/* 2. Minimal Stat Numerals Bar (Gates / Endowus Style) */}
      <section className="border-b border-slate-200/70 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
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

      {/* 3. Refined Quick Access Navigation */}
      <section className="py-16 sm:py-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block mb-2 font-sans">
            Institutional Directory
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Governance, Stewardship & Public Portals
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {quickAccess.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-lg hover:-translate-y-0.5 hover:border-amber-400/60 transition-all duration-200 flex items-start gap-4"
            >
              <div className="h-11 w-11 rounded-xl bg-[#FAF8F3] border border-slate-200/80 text-emerald-800 group-hover:bg-amber-50 group-hover:border-amber-300 group-hover:text-amber-700 transition grid place-items-center shrink-0 mt-0.5">
                <item.icon className="h-5 w-5 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition leading-snug">
                  {item.label}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
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

      {/* 8. Institutional Partners Bar (Grayscale to Color) */}
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
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="relative overflow-hidden bg-[#071512] rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-amber-400/25">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/[0.08] text-amber-300 text-xs font-medium border border-amber-400/30">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Gross National Happiness in Action</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Invest in the Permanent Healthcare Shield of the Kingdom
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-sans font-light">
              Your contribution directly builds the ring-fenced health corpus, ensuring that no
              hospital or remote gewog Primary Health Unit in Bhutan ever faces a stockout of
              life-saving vaccines or essential medicines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-sm shadow-xl transition active:scale-95"
              >
                <Heart className="h-4 w-4 fill-slate-950 text-slate-950" />
                <span>Make a 1:1 Matched Contribution</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white font-medium text-sm border border-white/20 backdrop-blur-md transition"
              >
                <span>Direct Secretariat Inquiry</span>
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
