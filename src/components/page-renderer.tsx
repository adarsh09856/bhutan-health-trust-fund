import React, { useState, useEffect } from "react";
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
import { useCountUp } from "@/hooks/use-count-up";
import heroBhutan from "@/assets/hero-bhutan.jpg";
import kingPortrait from "@/assets/king_portrait_fourth.jpg";

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

// Dedicated Sovereign Glass Hero Corpus Card for PageRenderer with Frosted Translucency
export function RendererHeroCorpusCard() {
  const corpusCounter = useCountUp({
    end: 3248500000,
    prefix: "Nu. ",
    duration: 2200,
  });

  return (
    <div className="relative space-y-3">
      {/* Main Glassmorphic Corpus Card with Frosted Translucent Chassis */}
      <div
        ref={corpusCounter.ref}
        className="relative rounded-3xl bg-white/80 sm:bg-white/70 border border-[#00A896]/25 ring-1 ring-white/60 p-5 sm:p-7 shadow-[0_25px_60px_-12px_rgba(11,79,66,0.12)] backdrop-blur-2xl space-y-5 overflow-hidden text-slate-900 text-left transition-all hover:border-[#00A896]/40"
      >
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
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF6F5]/80 text-[#0B4F42] border border-[#00A896]/30">
            Nu. 1:1 RGOB Matched
          </span>
        </div>

        {/* Main Numeral */}
        <div className="space-y-1">
          <span className="text-[11px] uppercase tracking-wider text-[#0B4F42]/80 font-bold font-sans block">
            Perpetual Health Endowment
          </span>
          <div className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-[#0B4F42] tracking-tight leading-tight break-words">
            {corpusCounter.formatted}
          </div>
          <p className="text-xs text-[#0B4F42]/80 font-sans leading-relaxed pt-0.5 font-light">
            Invested sovereign capital yielding permanent annual returns to fund Bhutan's primary healthcare commodities.
          </p>
        </div>

        {/* 3 Editorial Supply Rows with Frosted Glass */}
        <div className="space-y-2 pt-0.5">
          <div className="flex items-center justify-between bg-[#EAF6F5]/65 hover:bg-[#EAF6F5]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#00A896]/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/90 text-[#00A896] grid place-items-center shrink-0 border border-[#00A896]/30 shadow-xs">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B4F42] tracking-wide">Universal Routine Vaccines</div>
                <div className="text-[11px] text-[#0B4F42]/70 font-medium">100% Childhood Coverage (14 Antigens)</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-[#00A896] font-mono shrink-0 ml-2">Nu. 68.5M</span>
          </div>

          <div className="flex items-center justify-between bg-[#EAF6F5]/65 hover:bg-[#EAF6F5]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#00A896]/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/90 text-[#00A896] grid place-items-center shrink-0 border border-[#00A896]/30 shadow-xs">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B4F42] tracking-wide">120+ Essential Medicines</div>
                <div className="text-[11px] text-[#0B4F42]/70 font-medium">Zero Stockout Buffer across 205 Gewogs</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-[#00A896] font-mono shrink-0 ml-2">Nu. 145.0M</span>
          </div>

          <div className="flex items-center justify-between bg-[#EAF6F5]/65 hover:bg-[#EAF6F5]/90 backdrop-blur-md p-3.5 rounded-2xl border border-[#00A896]/20 transition-all">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-white/90 text-[#00A896] grid place-items-center shrink-0 border border-[#00A896]/30 shadow-xs">
                <ThermometerSnowflake className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B4F42] tracking-wide">Alpine Cold Chain Logistics</div>
                <div className="text-[11px] text-[#0B4F42]/70 font-medium">High-Altitude Solar Refrigeration</div>
              </div>
            </div>
            <span className="font-serif text-xs font-bold text-[#00A896] font-mono shrink-0 ml-2">Nu. 24.2M</span>
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
        </div>
      </div>

      {/* Floating Operational Status Satellite Micro-Card */}
      <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl border border-[#00A896]/20 rounded-2xl p-3.5 shadow-xs text-xs text-left">
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

// 1. Hero Block (Full 100dvh Unobstructed King Portrait + Scroll-Driven Translucent Card Elevation)
export function HeroBlock({ section }: { section?: PageBlockSection }) {
  const currentSection = section || { id: "hero-main", type: "hero" };
  const isHomepageHero =
    !currentSection.id ||
    currentSection.id === "hero-main" ||
    currentSection.id === "hero" ||
    currentSection.id === "home-hero" ||
    (!currentSection.id.startsWith("about-") && (currentSection.title?.includes("Stronger Bhutan") || !currentSection.title));

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isHomepageHero) {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E3F1F6] via-[#FAF8F3] to-[#FAF8F3] text-slate-900 pt-10 pb-12 sm:pb-16 border-b border-slate-200/90 text-left">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none opacity-[0.25] sm:opacity-[0.28] transition-opacity duration-300"
          style={{
            backgroundImage: `url(${kingPortrait})`,
            backgroundPosition: "right 15%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/85 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/50 to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          {currentSection.badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#00A896]/30 text-[#0B4F42] text-xs font-bold font-sans shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A896] animate-pulse"></span>
              <span>{currentSection.badge}</span>
            </div>
          )}

          {currentSection.dzongkhaText && (
            <div className="font-serif text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2 text-[#00A896]">
              <Sparkles className="h-3.5 w-3.5 text-[#00A896]" />
              <span>{currentSection.dzongkhaText}</span>
            </div>
          )}

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B4F42] leading-[1.12] max-w-4xl">
            {currentSection.title}
          </h1>

          {currentSection.subtitle && (
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans font-light">
              {currentSection.subtitle}
            </p>
          )}

          {(currentSection.primaryCtaText || currentSection.secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
              {currentSection.primaryCtaText && currentSection.primaryCtaUrl && (
                <Link
                  to={currentSection.primaryCtaUrl}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0B4F42] text-white hover:bg-[#083b31] font-medium text-xs shadow-xs transition text-center"
                >
                  <span>{currentSection.primaryCtaText}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                </Link>
              )}
              {currentSection.secondaryCtaText && currentSection.secondaryCtaUrl && (
                <Link
                  to={currentSection.secondaryCtaUrl}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs transition text-center"
                >
                  <span>{currentSection.secondaryCtaText}</span>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  const rawTitle = currentSection.title || "Healthy People. Stronger Bhutan.";
  const titleParts = rawTitle.split(/(Stronger Bhutan\.?)/i);

  // Scroll animations:
  // - scrollProgress moves from 0 to 1 over first 260px
  // - promptOpacity fades out as soon as scroll exceeds 30px
  // - King portrait subtlest scale 1.0 -> 1.04
  const scrollProgress = Math.min(Math.max((scrollY - 15) / 260, 0), 1);
  const promptOpacity = Math.max(0, 1 - scrollY / 70);
  const portraitScale = 1 + Math.min(scrollY / 4500, 0.04);

  return (
    <section className="relative bg-[#FAF8F3] text-slate-900">
      {/* Upper Stage: Portrait of His Majesty (Full Viewport 100dvh, Sticky on Background, Completely Unobstructed on Load) */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden z-0">
        {/* Portrait of His Majesty (100% Crisp, Untinted, Sharp & Clear Face and Robes) */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat transition-transform duration-300 ease-out will-change-transform"
          style={{
            backgroundImage: `url(${kingPortrait})`,
            backgroundPosition: "center 18%",
            transform: `scale(${portraitScale})`,
          }}
        />

        {/* Soft top gradient to keep fixed header capsule legible */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF8F3]/80 via-[#FAF8F3]/20 to-transparent pointer-events-none" />

        {/* Soft bottom ambient gradient fading in as scroll elevates cards */}
        <div
          className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#FAF8F3]/90 via-[#FAF8F3]/40 to-transparent pointer-events-none transition-opacity duration-300"
          style={{ opacity: Math.min(scrollProgress * 1.2, 1) }}
        />

        {/* Floating Attractive Sovereign Donation Card on the Right Side (Frosted Translucent Glass) */}
        <div
          className="absolute right-4 sm:right-8 lg:right-14 bottom-6 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 z-20 w-[calc(100%-2rem)] max-w-[340px] sm:max-w-[360px] pointer-events-auto transition-all duration-300 ease-out"
          style={{
            opacity: Math.max(0, 1 - scrollY / 130),
            transform: `translateY(${Math.max(-25, -scrollY * 0.18)}px)`,
            pointerEvents: scrollY > 70 ? "none" : "auto",
          }}
        >
          <div className="rounded-3xl bg-white/80 sm:bg-white/70 backdrop-blur-2xl border border-white/60 p-5 sm:p-6 shadow-[0_20px_50px_-10px_rgba(11,79,66,0.15)] space-y-4 text-left transition-all hover:bg-white/90 hover:shadow-2xl group">
            {/* Top Badge Header */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF6F5] text-[#0B4F42] text-[11px] font-bold border border-[#00A896]/30 shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-[#00A896]" />
                <span>Sacred Trust Endowment</span>
              </span>
              <span className="text-[11px] font-mono font-bold text-[#00A896] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-[#00A896]/20">
                100% Tax Exempt
              </span>
            </div>

            {/* Inspiring Headline & Description */}
            <div className="space-y-1.5">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#0B4F42] leading-snug">
                Did you know you can donate here?
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-light">
                Your direct contribution strengthens Bhutan's primary healthcare lifeline — safeguarding universal childhood vaccines and 120+ essential medicines in perpetuity.
              </p>
            </div>

            {/* Impact Highlights Mini-Grid */}
            <div className="space-y-1.5 pt-0.5 border-y border-[#00A896]/15 py-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B4F42]">
                <Syringe className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
                <span>100% Routine Childhood Immunization</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0B4F42]">
                <Pill className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
                <span>Zero Stockout Buffer across 20 Dzongkhags</span>
              </div>
            </div>

            {/* Glowing Attractive Action Button */}
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
              <span>Donate to Healthcare Fund →</span>
            </Link>

            {/* Trust Seal Note */}
            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-sans pt-0.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
              <span>Royal Charter Mandate • RAA Clean Audit</span>
            </div>
          </div>
        </div>

        {/* Floating Royal Endowment Prompt on Initial Load (Fades out when user scrolls) */}
        <div
          className="hidden sm:block absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none transition-all duration-300 ease-out"
          style={{
            opacity: promptOpacity,
            transform: `translate(-50%, ${scrollY > 30 ? "16px" : "0px"})`,
          }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/85 backdrop-blur-xl border border-[#00A896]/30 text-[#0B4F42] text-xs sm:text-sm font-semibold shadow-[0_8px_30px_rgba(0,0,0,0.08)] animate-bounce">
            <Sparkles className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
            <span>Scroll to explore sovereign endowment</span>
            <ChevronDown className="h-4 w-4 text-[#00A896] shrink-0" />
          </div>
        </div>
      </div>

      {/* Dynamic Content Stage: Glides UP gracefully on scroll with Frosted Translucent Glassmorphism */}
      <div className="relative z-10 px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24 pointer-events-auto">
        <div className="mx-auto max-w-7xl w-full">
          <div
            className="rounded-3xl sm:rounded-[2.5rem] bg-white/75 sm:bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_25px_70px_-15px_rgba(11,79,66,0.12)] p-6 sm:p-10 lg:p-14 space-y-8 transition-all duration-500 ease-out"
            style={{
              transform: `translateY(${Math.max(0, (1 - scrollProgress) * 45)}px)`,
              opacity: Math.min(1, 0.35 + scrollProgress * 0.65),
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Monumental Editorial Typography */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
                {/* Royal Charter & Live Status Badge */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6F5]/80 backdrop-blur-md border border-[#00A896]/30 text-[#0B4F42] text-xs font-semibold shadow-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A896]" />
                    </span>
                    <span>{currentSection.badge || "Royal Charter Mandate • 100% Guaranteed"}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50/90 backdrop-blur-md text-amber-900 border border-amber-300 text-xs font-bold font-mono shadow-xs">
                    <Sparkles className="h-3 w-3 text-amber-600" />
                    <span>Nu. 1:1 RGOB Sovereign Match</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7CAD0]/50 backdrop-blur-md text-[#8B263E] border border-[#EE6C8A]/30 text-xs font-semibold shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#EE6C8A]" />
                    <span>Universal Vaccines Ring-Fenced</span>
                  </div>
                </div>

                {/* Dzongkha Seal Header if provided */}
                {currentSection.dzongkhaText && (
                  <div className="font-serif text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2 text-[#00A896]">
                    <Sparkles className="h-3.5 w-3.5 text-[#00A896]" />
                    <span>{currentSection.dzongkhaText}</span>
                  </div>
                )}

                {/* Main Headline */}
                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0B4F42] leading-[1.06]">
                  {titleParts.length > 1 ? (
                    <>
                      <span>{titleParts[0]}</span>
                      <span className="text-[#00A896]">{titleParts[1]}</span>
                      <span>{titleParts[2]}</span>
                    </>
                  ) : (
                    currentSection.title || "Healthy People. Stronger Bhutan."
                  )}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans max-w-2xl font-light">
                  {currentSection.subtitle ||
                    "Bhutan's permanent statutory healthcare endowment — sustainably financing 120+ essential medicines, universal childhood vaccines, and alpine cold chain logistics across all 20 Dzongkhags without foreign reliance."}
                </p>

                {/* Feature Highlights Pills with Frosted Translucency */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-xs hover:border-[#00A896]/40 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-[#00A896] shrink-0" />
                    <span className="font-semibold text-slate-900">Zero Stockout Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-xs hover:border-[#00A896]/40 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-[#00A896] shrink-0" />
                    <span className="font-semibold text-slate-900">205 Remote Gewogs</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-md p-3 rounded-2xl border border-white/60 col-span-2 sm:col-span-1 shadow-xs hover:border-amber-400/40 transition-all">
                    <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                    <span className="font-semibold text-slate-900">100% Tax Exempt (DRC)</span>
                  </div>
                </div>

                {/* Transparent Royal Homage Badge Bar */}
                <div className="relative overflow-hidden rounded-2xl border border-[#00A896]/25 bg-[#EAF6F5]/70 backdrop-blur-xl hover:bg-[#EAF6F5]/85 p-4 shadow-xs transition-all">
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
                      className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 hover:bg-[#0B4F42] text-[#0B4F42] hover:text-white border border-[#00A896]/30 text-xs font-bold transition-all shadow-xs"
                    >
                      <span>Read History</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Modern Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
                  <Link
                    to={currentSection.primaryCtaUrl || "/get-involved"}
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-full shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all text-xs sm:text-sm uppercase tracking-wider text-center"
                  >
                    <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
                    <span>{currentSection.primaryCtaText || "Contribute (1:1 Matched)"}</span>
                    <ArrowRight className="h-4 w-4 stroke-[2.5] shrink-0" />
                  </Link>

                  <Link
                    to={currentSection.secondaryCtaUrl || "/our-work"}
                    className="inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-full bg-white/90 hover:bg-[#EAF6F5] border border-[#00A896]/30 text-[#0B4F42] shadow-xs transition-all text-xs sm:text-sm tracking-wide text-center"
                  >
                    <span>{currentSection.secondaryCtaText || "Explore Commodities"}</span>
                  </Link>
                </div>

                {/* Institutional Endorsement Bar */}
                <div className="pt-3.5 flex flex-wrap items-center gap-3 text-xs border-t border-slate-200/80">
                  <span className="text-[11px] uppercase tracking-wider text-[#0B4F42] font-bold font-mono">
                    Sovereign Partners:
                  </span>
                  <span className="text-slate-800 font-semibold">World Health Organization (WHO)</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-800 font-semibold">UNICEF</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-800 font-semibold">Gavi, The Vaccine Alliance</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-800 font-semibold">World Bank</span>
                </div>
              </div>

              {/* Right Column: Sovereign Corpus Endowment Card */}
              <div className="lg:col-span-5">
                <RendererHeroCorpusCard />
              </div>
            </div>
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
        <div className="flex items-center justify-center max-w-full overflow-x-auto">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("map")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "map"
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span>20 Dzongkhags Explorer</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("commodities")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "commodities"
                  ? "bg-emerald-900 text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Pill className="h-4 w-4 shrink-0" />
              <span>Commodities Pipeline</span>
            </button>
          </div>
        </div>

        {/* Widget Viewport */}
        <div className="pt-2">
          {activeTab === "map" && <DzongkhagExplorer />}
          {activeTab === "commodities" && <CommodityTracker />}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
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
  const isAlt = section.bgVariant === "dark" || section.bgVariant === "alt";

  return (
    <section className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
      isAlt ? "bg-[#EAF6F5] border-y border-[#00A896]/20 text-[#0B4F42]" : "bg-[#FAF8F3] border-y border-slate-200/80 text-slate-900"
    }`}>
      {/* Ambient Royal Gold Backlighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,162,55,0.08)_0,transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto">
        {/* Royal Decree Framed Showcase */}
        <div className="relative rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-xl transition-all bg-white border-2 border-amber-400/40 ring-4 ring-amber-400/5 shadow-[0_20px_50px_rgba(212,162,55,0.08)]">
          {/* Royal Crest Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 p-0.5 shadow-md flex items-center justify-center">
              <div className="h-full w-full rounded-full flex items-center justify-center bg-white text-amber-600">
                <Quote className="h-7 w-7" />
              </div>
            </div>

            {section.dzongkhaText && (
              <div className="font-serif text-2xl sm:text-3xl font-bold tracking-widest pt-1 text-[#0B4F42]">
                {section.dzongkhaText}
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-800 text-[11px] font-bold uppercase tracking-widest">
              <span>{section.badge || "The Royal Mandate of Sustainable Healthcare"}</span>
            </div>
          </div>

          {/* Quote Body */}
          <blockquote className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal leading-relaxed tracking-tight italic max-w-3xl mx-auto text-slate-800 break-words">
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
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed font-sans whitespace-pre-line text-sm sm:text-base break-words overflow-x-auto">
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#EAF6F5] text-[#0B4F42] relative overflow-hidden border-y border-[#00A896]/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,162,55,0.08)_0,transparent_50%)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-7">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#00A896]/30 text-[#0B4F42] text-xs font-bold uppercase tracking-wider shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-[#D4A237]" />
          <span>{section.badge || "Permanent Corpus Endowment"}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0B4F42] tracking-tight leading-tight">
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 font-sans leading-relaxed">
            {section.subtitle}
          </p>
        )}

        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto w-full">
          {section.primaryCtaText && (
            <Link
              to={section.primaryCtaUrl || "/get-involved"}
              className="inline-flex items-center justify-center gap-2.5 bg-[#D4A237] hover:bg-[#c4922b] text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all text-xs sm:text-sm uppercase tracking-wider text-center"
            >
              <span>{section.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5] shrink-0" />
            </Link>
          )}

          {section.secondaryCtaText && (
            <Link
              to={section.secondaryCtaUrl || "/track-donation"}
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 border border-slate-300 text-[#0B4F42] text-xs sm:text-sm transition-all shadow-xs text-center"
            >
              <span>{section.secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
