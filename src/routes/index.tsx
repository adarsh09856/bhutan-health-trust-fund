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
      {/* Light Glass Chassis with Fine Aquamarine Border & Soft Ambient Shadow */}
      <div
        ref={corpusCounter.ref}
        className="relative rounded-3xl bg-white/90 hover:bg-white border border-[#00A896]/25 p-5 sm:p-7 shadow-[0_16px_45px_rgba(11,79,66,0.08)] backdrop-blur-md space-y-5 overflow-hidden text-[#0B4F42] transition-all"
      >
        {/* Subtle Top Gold Hairline Accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-[#00A896]/15 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A896]" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#00A896] uppercase font-bold">
              Sovereign Health Corpus
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF6F5] text-[#0B4F42] border border-[#00A896]/30">
            Nu. 1:1 RGOB Matched
          </span>
        </div>

        {/* Main Numeral */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#0B4F42]/70 font-bold font-sans block">
            Perpetual Health Endowment
          </span>
          <div className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0B4F42] tracking-tight leading-tight">
            {corpusCounter.formatted}
          </div>
          <p className="text-xs text-[#0B4F42]/75 font-sans leading-relaxed pt-0.5 font-normal">
            Invested sovereign capital yielding permanent annual returns to fund Bhutan's primary healthcare commodities.
          </p>
        </div>

        {/* 3 Editorial Supply Rows with Light Aqua Surface */}
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between bg-[#EAF6F5]/70 hover:bg-[#EAF6F5] p-3.5 rounded-2xl border border-[#00A896]/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white text-[#00A896] grid place-items-center shrink-0 border border-[#00A896]/30">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B4F42] tracking-wide">Universal Routine Vaccines</div>
                <div className="text-[11px] text-[#0B4F42]/70 font-medium">100% Childhood Coverage (14 Antigens)</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-[#00A896] font-mono">Nu. 68.5M</span>
          </div>

          <div className="flex items-center justify-between bg-[#EAF6F5]/70 hover:bg-[#EAF6F5] p-3.5 rounded-2xl border border-[#00A896]/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white text-[#00A896] grid place-items-center shrink-0 border border-[#00A896]/30">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B4F42] tracking-wide">120+ Essential Medicines</div>
                <div className="text-[11px] text-[#0B4F42]/70 font-medium">Zero Stockout Buffer across 205 Gewogs</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-[#00A896] font-mono">Nu. 145.0M</span>
          </div>

          <div className="flex items-center justify-between bg-[#EAF6F5]/70 hover:bg-[#EAF6F5] p-3.5 rounded-2xl border border-[#00A896]/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white text-[#00A896] grid place-items-center shrink-0 border border-[#00A896]/30">
                <ThermometerSnowflake className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B4F42] tracking-wide">Alpine Cold Chain Logistics</div>
                <div className="text-[11px] text-[#0B4F42]/70 font-medium">High-Altitude Solar Refrigeration</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-[#00A896] font-mono">Nu. 24.2M</span>
          </div>
        </div>

        {/* Donate Link */}
        <div className="pt-1">
          <Link
            to="/get-involved"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.5)] transition-all"
          >
            <HeartHandshake className="h-4 w-4 text-slate-950" />
            <span>Donate to Healthcare Endowment →</span>
          </Link>
        </div>

        {/* Trust Seal Badges */}
        <div className="flex items-center justify-between pt-2 border-t border-[#00A896]/15 text-[10px] text-[#0B4F42]/80 font-sans">
          <div className="flex items-center gap-1.5 text-[#00A896] font-medium">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
            <span>100% Ring-Fenced</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-800 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>RAA Clean Audit Certified</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#0B4F42] font-medium">
            <Globe className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
            <span>All 20 Dzongkhags</span>
          </div>
        </div>
      </div>

      {/* Floating Operational Status Satellite Micro-Card with Light Glass */}
      <div className="flex items-center justify-between bg-white/90 border border-[#00A896]/20 rounded-2xl p-3.5 shadow-md text-xs text-[#0B4F42]">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-[#EAF6F5] border border-[#00A896]/30 text-[#00A896] grid place-items-center shrink-0">
            <MapPin className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-[#0B4F42]">20/20 Dzongkhags Buffer Active</div>
            <div className="text-[10px] text-[#0B4F42]/70 font-medium">Zero Stockouts across 205 remote Gewog clinics</div>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-[#00A896] px-2.5 py-1 rounded-lg bg-[#EAF6F5] border border-[#00A896]/30">
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

  // Render custom CMS sections if published by admin
  const isCustomEdited = customSections && customSections.length > 0;
  if (isCustomEdited) {
    const hasHero = customSections[0]?.type === "hero";
    return (
      <div className={`flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900 min-h-screen ${hasHero ? "pt-0" : "pt-24 sm:pt-28"}`}>
        {settings["announcement_banner_enabled"] === "true" && settings["announcement_banner"] && !hasHero && (
          <div className="mx-auto max-w-7xl w-full px-4 mb-6">
            <div className="bg-[#EAF6F5] text-[#0B4F42] text-xs font-semibold py-2.5 px-5 rounded-2xl text-center border border-[#00A896]/30 flex items-center justify-center gap-2.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#D4A237]" />
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
      <section className="relative bg-[#FAF8F3] text-slate-900">
        {/* Upper Stage: Portrait of His Majesty (starts from top of viewport; sticky on desktop) */}
        <div className="relative md:sticky md:top-0 w-full h-[52vh] sm:h-[60vh] md:h-[70vh] overflow-hidden flex flex-col justify-end">
          {/* Portrait of His Majesty (100% Crisp, Untinted, Sharp & Clear Face) */}
          <div
            className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-700 ease-out will-change-transform"
            style={{
              backgroundImage: `url(${kingPortrait})`,
              backgroundPosition: "center 18%",
            }}
          />

          {/* Soft top gradient to keep fixed header capsule legible */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF8F3]/80 via-[#FAF8F3]/20 to-transparent pointer-events-none" />

          {/* Clean soft fade at bottom into light page background */}
          <div className="relative z-10 w-full h-24 sm:h-36 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/60 to-transparent pointer-events-none" />
        </div>

        {/* Lower Content Stage: Seamlessly elevated over the portrait's lower edge with zero dead gap */}
        <div className="relative z-20 bg-[#FAF8F3] pt-6 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 md:shadow-[0_-20px_40px_rgba(250,248,243,0.95)]">
          <div className="mx-auto max-w-7xl w-full space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Dignified State Typography */}
              <div className="lg:col-span-7 space-y-6">
                {/* Royal Charter & Live Status Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6F5] border border-[#00A896]/30 text-[#0B4F42] text-xs font-semibold shadow-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A896]" />
                    </span>
                    <span>Royal Charter Mandate • 100% Guaranteed</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold font-mono shadow-xs">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    <span>Nu. 1:1 RGOB Sovereign Match</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7CAD0]/40 text-[#8B263E] border border-[#EE6C8A]/30 text-xs font-semibold shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EE6C8A]" />
                    <span>Universal Vaccines Ring-Fenced</span>
                  </div>
                </div>

                {/* Monumental Headline */}
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0B4F42] leading-[1.06]">
                  Healthy People.{" "}
                  <span className="text-[#00A896]">
                    Stronger Bhutan.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-2xl font-light">
                  Bhutan's permanent statutory healthcare endowment — sustainably financing 120+ essential medicines, universal childhood vaccines, and alpine cold chain logistics across all 20 Dzongkhags without foreign reliance.
                </p>

                {/* Clean Highlights Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#00A896]/40 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-[#00A896] shrink-0" />
                    <span className="font-semibold text-slate-900">Zero Stockout Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs hover:border-[#00A896]/40 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-[#00A896] shrink-0" />
                    <span className="font-semibold text-slate-900">205 Remote Gewogs</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 col-span-2 sm:col-span-1 shadow-xs hover:border-amber-400/40 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-semibold text-slate-900">100% DRC Tax Exempt</span>
                  </div>
                </div>

                {/* Transparent Royal Homage Badge Bar */}
                <div className="relative overflow-hidden rounded-2xl border border-[#00A896]/25 bg-[#EAF6F5]/80 hover:bg-[#EAF6F5] p-4 shadow-xs transition-all">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0B4F42] font-sans">
                        <Sparkles className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
                        <span>Conceived & Enacted under Royal Vision (1998–2000)</span>
                      </div>
                      <p className="font-serif text-sm sm:text-base font-bold text-[#0B4F42] tracking-tight leading-snug">
                        His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck
                      </p>
                      <p className="text-xs text-slate-600 font-sans leading-relaxed line-clamp-1 font-light">
                        Enacted through Royal Charter to guarantee perpetual, self-reliant financing for essential medicines and vaccines.
                      </p>
                    </div>

                    <Link
                      to="/our-story"
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#0B4F42] text-[#0B4F42] hover:text-white border border-[#00A896]/30 text-xs font-bold transition-all shadow-xs"
                    >
                      <span>Read History</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Institutional Endorsement Bar */}
                <div className="pt-3 flex flex-wrap items-center gap-3 text-xs border-t border-slate-200">
                  <span className="text-[11px] uppercase tracking-wider text-[#0B4F42] font-bold font-mono">
                    Sovereign Multilateral Partners:
                  </span>
                  <span className="text-slate-800 font-semibold">WHO</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-800 font-semibold">UNICEF</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-800 font-semibold">Gavi Alliance</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-800 font-semibold">World Bank</span>
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
