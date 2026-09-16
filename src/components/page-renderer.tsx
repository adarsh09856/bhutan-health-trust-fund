import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import type { PageBlockSection } from "@/lib/db/schema";
import {
  Users,
  Pill,
  MapPin,
  Syringe,
  Activity,
  ShieldCheck,
  Building2,
  ThermometerSnowflake,
  Target,
  Eye,
  Heart,
  Lock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Quote,
  CheckCircle2,
  HeartHandshake,
  BarChart3,
  Globe,
  Award,
} from "lucide-react";
import { CommodityTracker } from "@/components/commodity-tracker";
import { DzongkhagExplorer } from "@/components/dzongkhag-map";
import { EndowmentCalculator } from "@/components/endowment-calculator";
import { useCountUp } from "@/hooks/use-count-up";
import heroBhutan from "@/assets/hero-bhutan.jpg";

const iconMap: Record<string, any> = {
  Users,
  Pill,
  MapPin,
  Syringe,
  Activity,
  ShieldCheck,
  Building2,
  ThermometerSnowflake,
  Target,
  Eye,
  Heart,
  Lock,
  Sparkles,
  CheckCircle2,
  HeartHandshake,
  BarChart3,
  Globe,
  Award,
};

function getIcon(name?: string) {
  if (!name) return Sparkles;
  return iconMap[name] || Sparkles;
}

export function PageRenderer({
  sections,
  interactive = false,
  activeSectionId,
  onSelectSection,
}: {
  sections: PageBlockSection[];
  interactive?: boolean;
  activeSectionId?: string;
  onSelectSection?: (id: string) => void;
}) {
  const visibleSections = sections
    .filter((s) => (interactive ? true : s.isVisible))
    .sort((a, b) => a.order - b.order);

  return (
    <div className="w-full">
      {visibleSections.map((sec) => (
        <div
          key={sec.id}
          onClickCapture={(e) => {
            if (interactive) {
              const target = e.target as HTMLElement;
              if (target.closest("a") || target.closest("button")) {
                e.preventDefault();
              }
            }
          }}
          onClick={(e) => {
            if (interactive && onSelectSection) {
              e.stopPropagation();
              onSelectSection(sec.id);
            }
          }}
          className={`relative transition-all ${
            interactive
              ? "cursor-pointer hover:outline hover:outline-2 hover:outline-amber-500/60"
              : ""
          } ${
            interactive && activeSectionId === sec.id
              ? "outline outline-3 outline-amber-500 ring-4 ring-amber-500/20 z-10"
              : ""
          } ${!sec.isVisible && interactive ? "opacity-50 grayscale" : ""}`}
        >
          {/* Admin Block Label Overlay in Interactive Mode */}
          {interactive && (
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-slate-900/95 text-amber-400 backdrop-blur-md px-3 py-1 rounded-full text-xs font-mono shadow-lg border border-amber-500/40">
              <span className="capitalize font-bold">{sec.type.replace("_", " ")}</span>
              {!sec.isVisible && (
                <span className="bg-red-900/80 text-red-200 px-1.5 py-0.5 rounded text-[9px] uppercase font-bold">
                  Hidden
                </span>
              )}
            </div>
          )}

          {/* Active Editing Indicator in Interactive Mode */}
          {interactive && activeSectionId === sec.id && (
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              <Sparkles className="h-3 w-3" />
              <span>Editing in Inspector →</span>
            </div>
          )}

          {renderSection(sec)}
        </div>
      ))}
    </div>
  );
}

function renderSection(sec: PageBlockSection) {
  switch (sec.type) {
    case "hero":
      return <HeroBlock section={sec} />;
    case "stats":
      return <StatsBlock section={sec} />;
    case "feature_cards":
      return <FeatureCardsBlock section={sec} />;
    case "royal_decree":
      return <RoyalDecreeBlock section={sec} />;
    case "rich_text":
      return <RichTextBlock section={sec} />;
    case "accordion_faq":
      return <FaqAccordionBlock section={sec} />;
    case "cta_banner":
      return <CtaBannerBlock section={sec} />;
    case "interactive_tools":
      return <InteractiveToolsBlock section={sec} />;
    default:
      return (
        <div className="p-8 text-center text-slate-400 bg-slate-100 dark:bg-slate-800 text-sm">
          Unrecognized block type: {sec.type}
        </div>
      );
  }
}

// Dedicated Sovereign Glass Hero Corpus Card for PageRenderer
function RendererHeroCorpusCard() {
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
        className="relative rounded-3xl bg-[#091b16]/90 border border-white/15 p-5 sm:p-7 shadow-[0_32px_80px_-16px_rgba(0,0,0,0.65)] backdrop-blur-2xl space-y-5 overflow-hidden md:animate-float text-white text-left"
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
      <div className="flex items-center justify-between bg-[#061410]/95 border border-amber-400/25 rounded-2xl p-3.5 shadow-xl backdrop-blur-xl text-xs text-left">
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

// 1. Hero Block (Modern Sovereign Dark Theme with Scenic Banner & 2-Column Card)
function HeroBlock({ section }: { section: PageBlockSection }) {
  const rawTitle = section.title || "Healthy People. Stronger Bhutan.";
  const titleParts = rawTitle.split(/(Stronger Bhutan\.?)/i);

  return (
    <section className="relative overflow-hidden bg-[#061713] text-white pt-24 pb-16 sm:pt-28 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20">
      {/* Authentic Bhutanese Himalayan Scenic Background Banner */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-40"
        style={{ backgroundImage: `url(${heroBhutan})` }}
      />
      {/* Multi-stop sovereign dark vignette overlay to preserve high readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061713]/92 via-[#061713]/75 to-[#061713]/92 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#061713]/60 via-transparent to-[#061713] pointer-events-none" />

      {/* Ambient subtle light glows */}
      <div className="absolute top-6 left-1/4 h-96 w-96 bg-amber-400/[0.08] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-96 w-96 bg-emerald-500/[0.09] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 h-72 w-72 bg-teal-500/[0.06] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            {/* Royal Charter & Live Status Badge */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-xl shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span>{section.badge || "Royal Charter Mandate • 100% Guaranteed"}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30 text-xs font-bold font-mono">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Nu. 1:1 RGOB Sovereign Match</span>
              </div>
            </div>

            {/* Dzongkha Seal Header if provided */}
            {section.dzongkhaText && (
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2 text-amber-300/90">
                <Sparkles className="h-3.5 w-3.5 text-amber-400 opacity-80" />
                <span>{section.dzongkhaText}</span>
              </div>
            )}

            {/* Main Headline with Modern Gradient Typography */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.06]">
              {titleParts.length > 1 ? (
                <>
                  <span>{titleParts[0]}</span>
                  <span className="text-gradient-gold drop-shadow-xs">{titleParts[1]}</span>
                  <span>{titleParts[2]}</span>
                </>
              ) : (
                section.title || "Healthy People. Stronger Bhutan."
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans max-w-2xl font-light">
              {section.subtitle ||
                "Bhutan's permanent statutory healthcare endowment — sustainably financing 120+ essential medicines, universal childhood vaccines, and alpine cold chain logistics across all 20 Dzongkhags without foreign reliance."}
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
                to={section.primaryCtaUrl || "/get-involved"}
                className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-wider"
              >
                <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
                <span>{section.primaryCtaText || "Contribute (1:1 Matched)"}</span>
                <ArrowRight className="h-4 w-4 stroke-[2.5]" />
              </Link>

              <Link
                to={section.secondaryCtaUrl || "/our-work"}
                className="inline-flex items-center gap-2 font-bold px-7 py-4 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white shadow-xs hover:-translate-y-0.5 transition-all text-sm tracking-wide backdrop-blur-sm"
              >
                <span>{section.secondaryCtaText || "Explore 6 Commodity Streams"}</span>
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
            <RendererHeroCorpusCard />
          </div>
        </div>
      </div>
    </section>
  );
}

// Animated Stat Item Card
function AnimatedBentoStat({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description?: string;
  icon: any;
}) {
  const Icon = getIcon(icon);
  const numericMatch = (value || "").match(/^([\d,]+)/);
  const rawNumber = numericMatch ? parseInt(numericMatch[1].replace(/,/g, ""), 10) : null;
  const suffix = (value || "").replace(/^[\d,]+/, "");

  const counter = useCountUp({
    end: rawNumber ?? 0,
    suffix: suffix,
    duration: 1900,
  });

  return (
    <div
      ref={counter.ref}
      className="card-modern rounded-3xl p-7 border border-slate-200/80 hover:border-amber-500/40 relative overflow-hidden group flex flex-col justify-between"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
            {title}
          </span>
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Icon className="h-6 w-6 stroke-[1.75]" />
          </div>
        </div>
        <div className="text-4xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight mb-2">
          {rawNumber !== null ? counter.formatted : value}
        </div>
      </div>
      {description && (
        <p className="text-xs text-slate-600 leading-relaxed font-sans pt-2 border-t border-slate-100 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}

// 2. Stats Block (Modern Bento Grid with Animated Count-Up)
function StatsBlock({ section }: { section: PageBlockSection }) {
  const items = section.items || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-mesh-light border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            {section.title && (
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <AnimatedBentoStat
              key={idx}
              title={item.title || ""}
              value={item.value || ""}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 8. Interactive Tools Block (Dzongkhag Map, Commodities, Endowment Calculator)
function InteractiveToolsBlock({ section }: { section: PageBlockSection }) {
  const [activeTab, setActiveTab] = useState<"map" | "commodities" | "calculator">("map");

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          {section.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>{section.badge}</span>
            </div>
          )}
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            {section.title || "Interactive Sovereign Portals & Transparency Tools"}
          </h2>
          <p className="text-base text-slate-600 font-sans leading-relaxed">
            {section.subtitle || "Explore national health commodity supply chains, all 20 Dzongkhags cold-chain coverage, and simulate your 1:1 RGOB matched pledge."}
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "map"
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <span>20 Dzongkhags Explorer</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("commodities")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "commodities"
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Pill className="h-4 w-4" />
              <span>Commodities Pipeline</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                activeTab === "calculator"
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <HeartHandshake className="h-4 w-4" />
              <span>1:1 Matching Simulator</span>
            </button>
          </div>
        </div>

        {/* Widget Viewport */}
        <div className="pt-2">
          {activeTab === "map" && <DzongkhagExplorer />}
          {activeTab === "commodities" && <CommodityTracker />}
          {activeTab === "calculator" && <EndowmentCalculator />}
        </div>
      </div>
    </section>
  );
}

// 3. Feature Cards Block (Modern Bento Stream Showcase)
function FeatureCardsBlock({ section }: { section: PageBlockSection }) {
  const items = section.items || [];

  const accentThemes = [
    { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800" },
    { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-700", badge: "bg-teal-100 text-teal-800" },
    { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-700", badge: "bg-amber-100 text-amber-800" },
    { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-800" },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            {section.title && (
              <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-base text-slate-600 leading-relaxed font-sans">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {items.map((item, idx) => {
            const Icon = getIcon(item.icon);
            const theme = accentThemes[idx % accentThemes.length];

            return (
              <div
                key={idx}
                className="card-modern rounded-3xl p-8 flex flex-col justify-between group hover:-translate-y-2 transition-all duration-300 relative border border-slate-200/90 hover:border-amber-500/40"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`h-14 w-14 rounded-2xl ${theme.bg} ${theme.border} ${theme.text} border flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs`}>
                      <Icon className="h-7 w-7 stroke-[1.75]" />
                    </div>
                    {item.badge && (
                      <span className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${theme.badge}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-3 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                {item.url && (
                  <Link
                    to={item.url}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 group-hover:text-amber-600 transition-colors pt-4 border-t border-slate-100"
                  >
                    <span>Explore Stream</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 4. Royal Decree / Proclamation Showcase
function RoyalDecreeBlock({ section }: { section: PageBlockSection }) {
  const isDark = section.bgVariant === "dark";

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isDark ? "bg-[#061410] text-white" : "bg-mesh-light border-y border-slate-200/80 text-slate-900"
    }`}>
      {/* Ambient Royal Gold Backlighting */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark 
          ? "bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.15)_0,transparent_65%)]" 
          : "bg-[radial-gradient(circle_at_center,rgba(212,162,55,0.08)_0,transparent_60%)]"
      }`} />

      <div className="relative max-w-4xl mx-auto">
        {/* Royal Decree Framed Showcase */}
        <div className={`relative rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-xl transition-all ${
          isDark
            ? "bg-gradient-to-b from-[#0b241d] via-[#071914] to-[#040e0b] border-2 border-amber-500/40 ring-1 ring-amber-400/20"
            : "bg-white border-2 border-amber-400/40 ring-4 ring-amber-400/5 shadow-[0_20px_50px_rgba(212,162,55,0.08)]"
        }`}>
          {/* Royal Crest Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className={`h-full w-full rounded-full flex items-center justify-center ${
                isDark ? "bg-[#071914] text-amber-400" : "bg-white text-amber-600"
              }`}>
                <Quote className="h-7 w-7" />
              </div>
            </div>

            {section.dzongkhaText && (
              <div className={`font-serif text-2xl sm:text-3xl font-bold tracking-widest pt-1 ${
                isDark ? "text-amber-300" : "text-emerald-900"
              }`}>
                {section.dzongkhaText}
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-800 dark:text-amber-300 text-[11px] font-bold uppercase tracking-widest">
              <span>{section.badge || "The Royal Mandate of Sustainable Healthcare"}</span>
            </div>
          </div>

          {/* Quote Body */}
          <blockquote className={`font-serif text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed tracking-tight italic max-w-3xl mx-auto ${
            isDark ? "text-amber-50/95" : "text-slate-800"
          }`}>
            "{section.content || section.title}"
          </blockquote>

          {/* Royal Attribution */}
          <div className="pt-4 border-t border-amber-500/20 max-w-md mx-auto">
            <div className="text-sm font-black tracking-widest uppercase text-amber-600 font-sans">
              {section.subtitle || "His Majesty The King of Bhutan"}
            </div>
            <div className="text-xs text-slate-500 font-sans mt-0.5 font-medium">
              Royal Charter • Sovereign Healthcare Guarantee
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 5. Rich Text Block
function RichTextBlock({ section }: { section: PageBlockSection }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {section.badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
            <span>{section.badge}</span>
          </div>
        )}

        {section.title && (
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            {section.title}
          </h2>
        )}

        {section.subtitle && (
          <p className="text-lg font-medium text-slate-700 leading-relaxed font-serif">
            {section.subtitle}
          </p>
        )}

        {section.content && (
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-sans whitespace-pre-line text-base">
            {section.content}
          </div>
        )}
      </div>
    </section>
  );
}

// 6. FAQ Accordion Block
function FaqAccordionBlock({ section }: { section: PageBlockSection }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const items = section.items || [];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-mesh-light border-y border-slate-200/80">
      <div className="max-w-3xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center mb-14 space-y-3">
            {section.title && (
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 tracking-tight">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
                {section.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-amber-500/40 transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left px-7 py-5 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-slate-900">
                    {item.question || item.title}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-7 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
                    {item.answer || item.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 7. CTA Banner Block (Corpus Matching Banner)
function CtaBannerBlock({ section }: { section: PageBlockSection }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#06241b] via-[#0a382c] to-[#041912] text-white relative overflow-hidden border-y border-emerald-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.15)_0,transparent_50%)]" />

      <div className="relative max-w-5xl mx-auto text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{section.badge || "Permanent Corpus Endowment"}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight">
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-emerald-100/90 font-sans leading-relaxed">
            {section.subtitle}
          </p>
        )}

        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          {section.primaryCtaText && (
            <Link
              to={section.primaryCtaUrl || "/get-involved"}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-full shadow-xl hover:shadow-amber-500/30 transition-all text-sm uppercase tracking-wide hover:-translate-y-0.5"
            >
              <span>{section.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          )}

          {section.secondaryCtaText && (
            <Link
              to={section.secondaryCtaUrl || "/track-donation"}
              className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 text-white text-sm hover:-translate-y-0.5 transition-all"
            >
              <span>{section.secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
