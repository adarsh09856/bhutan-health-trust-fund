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
import kingPortrait from "@/assets/king_portrait_fourth.jpg";
import { useCountUp } from "@/hooks/use-count-up";
import {
  StatementLayout,
  RuledLedgerLayout,
  TwoColumnNarrativeLayout,
  DocumentRegisterLayout,
} from "@/components/institutional-layouts";

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

// Sovereign Glass Hero Corpus Card with Translucent Pure Glassmorphism
function HeroCorpusCard() {
  const corpusCounter = useCountUp({
    end: 3248500000,
    prefix: "Nu. ",
    duration: 2200,
  });

  return (
    <div className="relative space-y-3">
      {/* Translucent Pure Ultra-Glass Chassis Over Authentic Scenic Background */}
      <div
        ref={corpusCounter.ref}
        className="relative rounded-3xl bg-[#061713]/40 hover:bg-[#061713]/50 border border-white/25 p-5 sm:p-7 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.4)] backdrop-blur-md space-y-5 overflow-hidden md:animate-float text-white transition-all"
      >
        {/* Subtle Top Gold Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-emerald-300 uppercase font-bold">
              Sovereign Health Corpus
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 backdrop-blur-sm">
            Nu. 1:1 RGOB Matched
          </span>
        </div>

        {/* Main Numeral */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-slate-300 font-bold font-sans block">
            Perpetual Health Endowment
          </span>
          <div className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {corpusCounter.formatted}
          </div>
          <p className="text-xs text-slate-200 font-sans leading-relaxed pt-0.5 font-normal drop-shadow-xs">
            Invested sovereign capital yielding permanent annual returns to fund Bhutan's primary healthcare commodities.
          </p>
        </div>

        {/* 3 Editorial Supply Rows with Ultra-Transparent Pure Glass Visibility */}
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between bg-black/25 hover:bg-black/40 p-3.5 rounded-2xl border border-white/15 hover:border-emerald-400/60 transition-all backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-300 grid place-items-center shrink-0 border border-emerald-500/40">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">Universal Routine Vaccines</div>
                <div className="text-[11px] text-slate-300 font-medium">100% Childhood Coverage (14 Antigens)</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-emerald-300 font-mono">Nu. 68.5M</span>
          </div>

          <div className="flex items-center justify-between bg-black/25 hover:bg-black/40 p-3.5 rounded-2xl border border-white/15 hover:border-amber-400/60 transition-all backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-amber-500/20 text-amber-300 grid place-items-center shrink-0 border border-amber-500/40">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">120+ Essential Medicines</div>
                <div className="text-[11px] text-slate-300 font-medium">Zero Stockout Buffer across 205 Gewogs</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-amber-300 font-mono">Nu. 145.0M</span>
          </div>

          <div className="flex items-center justify-between bg-black/25 hover:bg-black/40 p-3.5 rounded-2xl border border-white/15 hover:border-teal-400/60 transition-all backdrop-blur-xs">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-teal-500/20 text-teal-300 grid place-items-center shrink-0 border border-teal-500/40">
                <ThermometerSnowflake className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-wide">Alpine Cold Chain Logistics</div>
                <div className="text-[11px] text-slate-300 font-medium">High-Altitude Solar Refrigeration</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-teal-300 font-mono">Nu. 24.2M</span>
          </div>
        </div>

        {/* Donate Link */}
        <div className="pt-1">
          <Link
            to="/get-involved"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-[0_10px_25px_rgba(212,162,55,0.4)] hover:shadow-[0_14px_32px_rgba(212,162,55,0.55)] hover:-translate-y-0.5 transition-all active:translate-y-0"
          >
            <HeartHandshake className="h-4 w-4 text-slate-950" />
            <span>Donate to Healthcare Endowment →</span>
          </Link>
        </div>

        {/* Trust Seal Badges */}
        <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[10px] text-slate-300 font-sans">
          <div className="flex items-center gap-1.5 text-emerald-300 font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>100% Ring-Fenced</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>RAA Clean Audit Certified</span>
          </div>
          <div className="flex items-center gap-1.5 text-blue-300 font-medium">
            <Globe className="h-3.5 w-3.5 text-blue-400 shrink-0" />
            <span>All 20 Dzongkhags</span>
          </div>
        </div>
      </div>

      {/* Floating Operational Status Satellite Micro-Card with Translucent Glass */}
      <div className="flex items-center justify-between bg-white/[0.08] hover:bg-white/[0.12] border border-white/20 rounded-2xl p-3.5 shadow-xl backdrop-blur-xl text-xs">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 grid place-items-center shrink-0">
            <MapPin className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">20/20 Dzongkhags Buffer Active</div>
            <div className="text-[10px] text-slate-300 font-medium">Zero Stockouts across 205 remote Gewog clinics</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-300 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30">
          100% Funded
        </span>
      </div>
    </div>
  );
}

// Institutional Ledger Data & Regional Distribution
const fiduciaryLedgerRows = [
  {
    label: "Sovereign Health Corpus (Endowment Principal)",
    figure: "Nu. 3,248,500,000",
    code: "CORPUS-AUDIT-2025",
    subtext: "Ring-fenced statutory capital invested in sovereign instruments and fixed-income portfolios.",
  },
  {
    label: "Annual Commodity Procurement Yield Disbursement",
    figure: "Nu. 145,000,000",
    code: "DISB-NEDL",
    subtext: "Disbursed quarterly to Department of Medical Services exclusively for vital medicines and vaccines.",
  },
  {
    label: "Citizens Protected Across 20 Dzongkhags",
    figure: "780,000+",
    code: "COVERAGE-MOH",
    subtext: "Universal healthcare guarantee delivered across all 205 remote gewog Primary Health Units.",
  },
  {
    label: "Essential Medicines on Zero-Stockout Formulary",
    figure: "120+ Formulations",
    code: "NEML-REV-8",
    subtext: "Pre-stocked continuous 6-month buffer maintained against global supply-chain shocks.",
  },
  {
    label: "Universal Pediatric Vaccine Antigens Financed",
    figure: "14 Antigens",
    code: "EPI-WHO",
    subtext: "100% routine childhood and maternal immunization coverage sustained in perpetuity.",
  },
];

const recentAuditDocuments = [
  {
    title: "Annual Financial & Operational Audit Report (FY 2024–2025)",
    referenceNumber: "RAA-BHTF-2025-01",
    date: "June 2026",
    fileSize: "PDF, 4.2 MB",
    documentType: "Audit Report",
    downloadUrl: "/reports",
  },
  {
    title: "Royal Charter of the Bhutan Health Trust Fund (Official Enactment)",
    referenceNumber: "ROYAL-CHARTER-2000",
    date: "August 2000",
    fileSize: "PDF, 1.8 MB",
    documentType: "Legal Charter",
    downloadUrl: "/reports",
  },
  {
    title: "National Essential Drugs List & Vaccine Cold-Chain Protocol",
    referenceNumber: "MOH-NEDL-REV8",
    date: "January 2026",
    fileSize: "PDF, 2.4 MB",
    documentType: "Formulary",
    downloadUrl: "/reports",
  },
];

const dzongkhagRegions = [
  {
    region: "Western Region",
    dzongkhags: [
      { name: "Thimphu", bhus: "14 BHUs", allocation: "Nu. 42.5M" },
      { name: "Paro", bhus: "12 BHUs", allocation: "Nu. 18.2M" },
      { name: "Haa", bhus: "7 BHUs", allocation: "Nu. 9.4M" },
      { name: "Chhukha", bhus: "16 BHUs", allocation: "Nu. 26.8M" },
      { name: "Samtse", bhus: "18 BHUs", allocation: "Nu. 22.1M" },
      { name: "Gasa", bhus: "5 BHUs", allocation: "Nu. 7.8M" },
    ],
  },
  {
    region: "Central Region",
    dzongkhags: [
      { name: "Punakha", bhus: "11 BHUs", allocation: "Nu. 12.8M" },
      { name: "Wangdue Phodrang", bhus: "15 BHUs", allocation: "Nu. 16.5M" },
      { name: "Trongsa", bhus: "8 BHUs", allocation: "Nu. 10.2M" },
      { name: "Bumthang", bhus: "9 BHUs", allocation: "Nu. 11.6M" },
      { name: "Dagana", bhus: "12 BHUs", allocation: "Nu. 13.4M" },
      { name: "Tsirang", bhus: "10 BHUs", allocation: "Nu. 11.9M" },
      { name: "Sarpang", bhus: "14 BHUs", allocation: "Nu. 21.4M" },
      { name: "Zhemgang", bhus: "14 BHUs", allocation: "Nu. 11.2M" },
    ],
  },
  {
    region: "Eastern Region",
    dzongkhags: [
      { name: "Mongar", bhus: "21 BHUs", allocation: "Nu. 24.5M" },
      { name: "Trashigang", bhus: "20 BHUs", allocation: "Nu. 25.8M" },
      { name: "Trashiyangtse", bhus: "9 BHUs", allocation: "Nu. 10.5M" },
      { name: "Lhuentse", bhus: "11 BHUs", allocation: "Nu. 9.8M" },
      { name: "Pema Gatshel", bhus: "13 BHUs", allocation: "Nu. 12.3M" },
      { name: "Samdrup Jongkhar", bhus: "14 BHUs", allocation: "Nu. 18.9M" },
    ],
  },
];

function RuledDzongkhagMatrix() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-800 uppercase block">
              Equitable Kingdom-Wide Distribution
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Nationwide Coverage Across All 20 Dzongkhags
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-light">
              Equitable primary healthcare commodity buffer maintained across all 205 remote gewogs and regional distribution centers.
            </p>
          </div>
          <Link
            to="/our-work"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-amber-800 hover:text-amber-900 shrink-0 hover:underline"
          >
            <span>View Detailed Commodity Allocations</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {dzongkhagRegions.map((reg) => (
            <div key={reg.region} className="border-t border-slate-300 pt-3 space-y-2">
              <div className="font-serif text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
                {reg.region}
              </div>
              <div className="divide-y divide-slate-100">
                {reg.dzongkhags.map((d) => (
                  <div key={d.name} className="py-2 flex items-baseline justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900">{d.name}</span>
                      <span className="text-slate-400 font-mono text-[10px] ml-1.5">({d.bhus})</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700">{d.allocation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-300 text-[11px] font-mono text-slate-500 gap-2">
          <div>All 20 Dzongkhags • 205 Primary Health Units • 100% Stockout Guarantee</div>
          <div>Source: Ministry of Health & BHTF Annual Dzongkhag Distribution Index, 2025–2026</div>
        </div>
      </div>
    </section>
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

  // Only override the rich home page layout if custom sections were explicitly created beyond the basic seeds
  const isCustomEdited = customSections && customSections.length > 5;
  if (isCustomEdited) {
    return (
      <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900 min-h-screen pt-24 sm:pt-28">
        {settings["announcement_banner_enabled"] === "true" && settings["announcement_banner"] && (
          <div className="mx-auto max-w-7xl w-full px-4 mb-6">
            <div className="bg-[#0B1F1A] text-amber-200 text-xs font-medium py-2.5 px-5 rounded-2xl text-center border border-amber-500/30 flex items-center justify-center gap-2.5 shadow-md">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span>{settings["announcement_banner"]}</span>
            </div>
          </div>
        )}
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      {/* 1. Sovereign Hero Section: Upper Stage King Portrait + Dynamic Scroll Elevation Content */}
      <section className="relative bg-[#061713] text-white">
        {/* Sticky Background / Upper Stage: Crystal Clear Portrait of His Majesty (68-72vh) */}
        <div className="sticky top-0 w-full h-[68vh] sm:h-[72vh] overflow-hidden flex items-end">
          {/* Portrait of His Majesty (100% Crisp, Untinted, Sharp & Clear Face) */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 ease-out will-change-transform"
            style={{
              backgroundImage: `url(${kingPortrait})`,
              backgroundPosition: "center 20%",
            }}
          />

          {/* Minimal non-tinting top & bottom fades: ensures header and lower text contrast without washing face */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#061713]/90 via-[#061713]/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#061713] via-[#061713]/70 to-transparent pointer-events-none" />

          {/* Top Royal Seal Badge */}
          <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8 flex items-center justify-between pointer-events-none">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#061713]/70 border border-amber-400/40 backdrop-blur-md shadow-2xl text-amber-300 text-xs font-mono font-bold pointer-events-auto">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>༄༅། །འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ། །། • Royal Charter Sovereign Trust Fund</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-2 text-xs font-medium text-slate-200 bg-[#061713]/60 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md pointer-events-auto">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <span>Universal Free Healthcare Guarantee</span>
            </div>
          </div>
        </div>

        {/* Lower Content Stage: Seamlessly elevated over the portrait's lower edge with zero dead gap */}
        <div className="relative z-20 bg-[#061713] pt-2 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20 shadow-[0_-20px_40px_rgba(6,23,19,0.95)]">
          <div className="mx-auto max-w-7xl w-full space-y-8">
            {/* Top Sovereign Announcement Ribbon */}
            {settings["announcement_banner_enabled"] === "true" && settings["announcement_banner"] && (
              <div className="bg-[#081f1a]/80 border border-amber-400/40 text-amber-200 text-xs font-medium py-2.5 px-5 rounded-2xl flex items-center justify-center gap-2.5 backdrop-blur-md shadow-xl animate-in fade-in slide-in-from-top-2">
                <Sparkles className="h-4 w-4 shrink-0 text-amber-400 animate-pulse" />
                <span className="leading-snug text-center">{settings["announcement_banner"]}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Dignified State Typography */}
              <div className="lg:col-span-7 space-y-6">
                {/* Royal Charter & Live Status Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-emerald-400/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span>Royal Charter Mandate • 100% Guaranteed</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.06] text-amber-300 border border-amber-400/40 text-xs font-bold font-mono shadow-sm backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-amber-400" />
                    <span>Nu. 1:1 RGOB Sovereign Match</span>
                  </div>
                </div>

                {/* Monumental Headline */}
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Healthy People.{" "}
                  <span className="text-gradient-gold drop-shadow-xs">
                    Stronger Bhutan.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-2xl font-normal drop-shadow-xs">
                  Bhutan's permanent statutory healthcare endowment — sustainably financing 120+ essential medicines, universal childhood vaccines, and alpine cold chain logistics across all 20 Dzongkhags without foreign reliance.
                </p>

                {/* Clean Translucent Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.09] p-3 rounded-2xl border border-white/15 backdrop-blur-md transition-all">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white">Zero Stockout Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.09] p-3 rounded-2xl border border-white/15 backdrop-blur-md transition-all">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-white">205 Remote Gewogs</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.09] p-3 rounded-2xl border border-white/15 col-span-2 sm:col-span-1 backdrop-blur-md transition-all">
                    <CheckCircle2 className="h-4 w-4 text-amber-400 shrink-0" />
                    <span className="font-semibold text-white">100% DRC Tax Exempt</span>
                  </div>
                </div>

                {/* Transparent Royal Homage Badge Bar */}
                <div className="relative overflow-hidden rounded-2xl border border-amber-400/35 bg-[#081f1a]/60 hover:bg-[#081f1a]/80 p-4 shadow-xl backdrop-blur-md group transition-all">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                        <span>Conceived & Enacted under Royal Vision (1998–2000)</span>
                      </div>
                      <p className="font-serif text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                        His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck
                      </p>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-1">
                        Enacted through Royal Charter to guarantee perpetual, self-reliant financing for essential medicines and vaccines.
                      </p>
                    </div>

                    <Link
                      to="/our-story"
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400 text-amber-200 hover:text-slate-950 border border-amber-400/40 text-xs font-bold transition-all shadow-sm"
                    >
                      <span>Read History</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Institutional Endorsement Bar */}
                <div className="pt-3 flex flex-wrap items-center gap-3 text-xs border-t border-white/15">
                  <span className="text-[11px] uppercase tracking-wider text-amber-400 font-bold font-mono">
                    Sovereign Multilateral Partners:
                  </span>
                  <span className="text-slate-200 font-semibold">WHO</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-200 font-semibold">UNICEF</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-200 font-semibold">Gavi Alliance</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-200 font-semibold">World Bank</span>
                </div>
              </div>

              {/* Right Column: Sovereign Corpus Endowment Card */}
              <div className="lg:col-span-5">
                <HeroCorpusCard />
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* 2. Statement of Royal Mandate (Layout 1) */}
      <StatementLayout
        proclamation="No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come."
        citation="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
        legalBasis="ROYAL CHARTER PROCLAMATION • 3 AUGUST 2000"
        theme="parchment"
      />

      {/* 3. Statutory Fiduciary & Operational Ledger (Layout 2) */}
      <RuledLedgerLayout
        title="Statutory Fiduciary & Operational Ledger"
        subtitle="Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship."
        sourceLine="Source: Royal Audit Authority (RAA) Certified Statements & BHTF Secretariat Annual Filing, FY 2024–2025"
        theme="parchment"
        rows={fiduciaryLedgerRows}
      />

      {/* 4. What the Fund Finances (Layout 3: Two-Column Narrative) */}
      <TwoColumnNarrativeLayout
        sectionTitle="Universal Vaccine & Primary Formulary Financing"
        referenceCode="Statutory Mandate & Allocation"
        paragraphs={[
          "Under the benevolent vision of His Majesty the Fourth Druk Gyalpo, the Bhutan Health Trust Fund was enacted to protect the nation's primary healthcare from the volatility of external donor funding. Operating as an autonomous statutory institution, the Fund finances 100% of routine pediatric vaccines and over 120 essential pharmaceuticals directly for every hospital and gewog clinic in the Kingdom.",
          "Procurement is conducted through WHO-prequalified international supply agreements and UNICEF supply divisions to eliminate intermediaries and guarantee verified cold chain potency. All annual purchases are funded entirely from endowment returns, ensuring the core capital corpus of Nu. 3.24B remains untouched in perpetuity.",
        ]}
        actionLink={{
          label: "Examine Financed Commodities & Formularies",
          to: "/our-work",
        }}
        theme="parchment"
      />

      {/* 5. Nationwide Coverage Across All 20 Dzongkhags (Ruled Regional Matrix) */}
      <RuledDzongkhagMatrix />

      {/* 6. Governance, Legal Structure & Statutory Triple-Lock (Layout 3: Forest Theme) */}
      <TwoColumnNarrativeLayout
        sectionTitle="Governance, Legal Structure & Statutory Triple-Lock"
        referenceCode="Charter Compliance & Oversight"
        paragraphs={[
          "BHTF operates under a strict Royal Charter mandate governed by a high-level Board of Trustees chaired by the Hon'ble Minister for Health. The Fund's fiduciary integrity is safeguarded by an institutional triple-lock: statutory capital ring-fencing prohibiting principal invasion, mandatory annual audits by the Royal Audit Authority (RAA), and independent oversight by the Asset Management and Technical Advisory Committees.",
          "Disbursements follow an uncompromising window financing mechanism. Annual procurement capital is released quarterly to the Department of Medical Services (DMS) via the Ministry of Finance only upon submission of physical inventory reconciliations and WHO/DRA batch compliance certificates.",
        ]}
        actionLink={{
          label: "Review Board of Trustees & Governance Structure",
          to: "/about/trustees",
        }}
        theme="forest"
      />

      {/* 7. Statutory Publications & Certified Audit Register (Layout 4) */}
      <DocumentRegisterLayout
        title="Statutory Publications & Certified Audit Register"
        subtitle="Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny."
        documents={recentAuditDocuments}
        viewAllLink={{
          label: "Browse Full Document & Audit Archive",
          to: "/reports",
        }}
        theme="parchment"
      />

      {/* 8. Sovereign Matching & Permanent DRC Tax Exemption (Layout 3) */}
      <TwoColumnNarrativeLayout
        sectionTitle="1:1 Sovereign Match & Permanent DRC Tax Exemption"
        referenceCode="DRC Income Tax Act Section 10(f) • Royal Decree"
        paragraphs={[
          "Under Royal Decree and Section 10(f) of the Department of Revenue & Customs (DRC) Income Tax Act of the Kingdom of Bhutan, all individual, philanthropic, and corporate contributions to the Bhutan Health Trust Fund are 100% tax-deductible.",
          "Furthermore, the Royal Government of Bhutan commits a permanent dollar-for-dollar (1:1) sovereign match to every citizen and institutional Ngultrum contributed, instantly doubling the enduring health financing capacity of every contribution.",
        ]}
        actionLink={{
          label: "Contribute to the Sovereign Health Endowment",
          to: "/get-involved",
        }}
        theme="parchment"
      />
    </div>
  );
}
