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
import newsVaccine from "@/assets/news-vaccine.jpg";

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

// Clean, Streamlined Sovereign Corpus Card (Transparent Frosted Glass)
export function RendererHeroCorpusCard({ showSatellite = false }: { showSatellite?: boolean }) {
  const [corpusValue, setCorpusValue] = useState(3248500000);

  useEffect(() => {
    fetch("/api/public?action=settings")
      .then((res) => res.json())
      .then((data) => {
        const val = data.settings?.corpus_target_amount;
        if (val) setCorpusValue(Number(val));
      })
      .catch(() => {});
  }, []);

  const corpusCounter = useCountUp({
    end: corpusValue,
    duration: 2200,
    prefix: "Nu. ",
  });

  return (
    <div className="relative space-y-2.5">
      {/* Main Glassmorphic Corpus Card with Ultra-Translucent Frosted Chassis */}
      <div
        ref={corpusCounter.ref}
        className="relative rounded-2xl sm:rounded-3xl bg-white/20 hover:bg-white/30 border border-white/45 ring-1 ring-white/30 p-3.5 sm:p-4.5 lg:p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.7)] backdrop-blur-2xl space-y-3 overflow-hidden text-slate-900 text-left transition-all"
      >
        {/* Top Status Header */}
        <div className="flex items-center justify-between border-b border-black/10 sm:border-white/35 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A896]" />
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#00A896] uppercase font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              Sovereign Health Corpus
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/40 backdrop-blur-md text-[#0B4F42] border border-white/40 shadow-2xs">
            Royal Charter Mandate
          </span>
        </div>

        {/* Main Numeral */}
        <div className="space-y-0.5">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#0B4F42] font-extrabold font-sans block drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
            Perpetual Health Endowment
          </span>
          <div className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] font-black text-[#0B4F42] tracking-tight leading-tight break-words drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
            {corpusCounter.formatted}
          </div>
          <p className="text-[11px] sm:text-xs text-slate-900 font-sans leading-relaxed pt-0.5 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
            Financing universal vaccines & 120+ essential medicines in perpetuity.
          </p>
        </div>

        {/* Clean 3-Item Micro Grid (Translucent Frosted Pills) */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <div className="bg-white/30 hover:bg-white/45 backdrop-blur-md px-1.5 sm:px-2 py-2 rounded-xl border border-white/45 text-center shadow-2xs transition-all">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#0B4F42]">
              <Syringe className="h-3 w-3 text-[#00A896] shrink-0" />
              <span>Vaccines</span>
            </div>
            <div className="font-serif text-[10px] sm:text-[11px] font-black text-[#0B4F42] font-mono pt-0.5 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">Nu. 68.5M</div>
          </div>

          <div className="bg-white/30 hover:bg-white/45 backdrop-blur-md px-1.5 sm:px-2 py-2 rounded-xl border border-white/45 text-center shadow-2xs transition-all">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#0B4F42]">
              <Pill className="h-3 w-3 text-[#00A896] shrink-0" />
              <span>Medicines</span>
            </div>
            <div className="font-serif text-[10px] sm:text-[11px] font-black text-[#0B4F42] font-mono pt-0.5 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">Nu. 145M</div>
          </div>

          <div className="bg-white/30 hover:bg-white/45 backdrop-blur-md px-1.5 sm:px-2 py-2 rounded-xl border border-white/45 text-center shadow-2xs transition-all">
            <div className="flex items-center justify-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#0B4F42]">
              <ThermometerSnowflake className="h-3 w-3 text-[#00A896] shrink-0" />
              <span>Cold Chain</span>
            </div>
            <div className="font-serif text-[10px] sm:text-[11px] font-black text-[#0B4F42] font-mono pt-0.5 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">Nu. 24.2M</div>
          </div>
        </div>

        {/* Trust Seal Badges */}
        <div className="flex items-center justify-between pt-2 border-t border-black/10 sm:border-white/35 text-[10px] text-[#0B4F42] font-bold font-sans">
          <div className="flex items-center gap-1.5 text-[#00A896] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
            <span>100% Ring-Fenced</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-900 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
            <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>RAA Clean Audit</span>
          </div>
        </div>
      </div>

      {/* Optional satellite micro-card */}
      {showSatellite && (
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-xl border border-[#00A896]/20 rounded-2xl p-2.5 shadow-xs text-xs text-left">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-[#EAF6F5] border border-[#00A896]/30 text-[#00A896] grid place-items-center shrink-0">
              <MapPin className="h-3 w-3" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#0B4F42]">20/20 Dzongkhags Covered</div>
              <div className="text-[9px] text-[#0B4F42]/70">Zero Stockouts across 205 Gewogs</div>
            </div>
          </div>
          <span className="text-[9px] font-mono font-bold text-[#00A896] px-2 py-0.5 rounded-lg bg-[#EAF6F5] border border-[#00A896]/30">
            100% Funded
          </span>
        </div>
      )}
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
        {/* Portrait of His Majesty (100% Crisp, Untinted, Sharp & Clear Face and Robes, Perfectly Centered on Mobile & All Screens) */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[position:42%_18%] sm:bg-[position:39%_18%] lg:bg-[position:center_18%] transition-transform duration-300 ease-out will-change-transform"
          style={{
            backgroundImage: `url(${kingPortrait})`,
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

        {/* Desktop Left Side: Clickable Story Rectangle Card + Mission Button */}
        <div
          className="hidden lg:flex flex-col absolute z-20 lg:left-8 xl:left-14 top-[54%] w-[360px] lg:w-[380px] xl:w-[400px] pointer-events-auto transition-all duration-300 ease-out space-y-2.5"
          style={{
            opacity: Math.max(0, 1 - scrollY / 150),
            pointerEvents: scrollY > 90 ? "none" : "auto",
            transform: `translateY(calc(-50% - ${scrollY * 0.2}px))`,
          }}
        >
          <Link
            to="/our-story"
            className="block rounded-2xl sm:rounded-3xl bg-white/20 hover:bg-white/30 border border-white/45 ring-1 ring-white/30 p-3.5 sm:p-4.5 lg:p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,0.7)] backdrop-blur-2xl space-y-3 overflow-hidden text-slate-900 text-left transition-all hover:scale-[1.01] group cursor-pointer"
          >
            {/* Top Status Header */}
            <div className="flex items-center justify-between border-b border-black/10 sm:border-white/35 pb-2.5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#00A896]" />
                <span className="text-[10px] font-mono tracking-widest text-[#00A896] uppercase font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  Sacred Trust Endowment
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/40 backdrop-blur-md text-[#0B4F42] border border-white/40 shadow-2xs">
                100% Tax Exempt
              </span>
            </div>

            {/* Photo + Story text in horizontal layout */}
            <div className="flex items-start gap-3.5 pt-0.5">
              <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden shadow-xs border border-white/40 bg-slate-100 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={newsVaccine}
                  alt="Bhutan Healthcare Immunization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-serif text-sm lg:text-base font-black text-[#0B4F42] leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-hover:text-[#00A896] transition-colors">
                  Did you know you can donate here?
                </h3>
                <p className="text-[11px] text-slate-900 line-clamp-3 leading-relaxed font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
                  Your direct contribution strengthens Bhutan's primary healthcare lifeline — safeguarding universal childhood vaccines & 120+ essential medicines across all 20 Dzongkhags.
                </p>
              </div>
            </div>

            {/* Trust Seal Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-black/10 sm:border-white/35 text-[10px] text-[#0B4F42] font-bold font-sans">
              <div className="flex items-center gap-1.5 text-[#00A896] font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
                <span>Universal Health Guarantee</span>
              </div>
              <div className="flex items-center gap-1 text-amber-900 font-black group-hover:translate-x-0.5 transition-transform drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                <span>Read Story →</span>
              </div>
            </div>
          </Link>

          {/* Action Bar on Left Side */}
          <div className="rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-2xl border border-white/45 ring-1 ring-white/30 p-2 sm:p-2.5 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col items-center justify-center text-center transition-all">
            <Link
              to="/our-story"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-white/35 hover:bg-white/50 text-[#0B4F42] border border-white/45 font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] text-center shadow-2xs backdrop-blur-md"
            >
              <span>Explore Sovereign Mission</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#00A896]" />
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#0B4F42] font-black font-sans pt-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              <Sparkles className="h-3 w-3 text-[#00A896] shrink-0" />
              <span>Conceived under Royal Vision (1998–2000)</span>
            </div>
          </div>
        </div>

        {/* Desktop Right Side: Clean Translucent Corpus Card + Donate Button Directly Below */}
        <div
          className="hidden lg:flex flex-col absolute z-20 lg:right-8 xl:right-14 top-[54%] w-[360px] lg:w-[380px] xl:w-[400px] pointer-events-auto transition-all duration-300 ease-out space-y-2.5"
          style={{
            opacity: Math.max(0, 1 - scrollY / 150),
            pointerEvents: scrollY > 90 ? "none" : "auto",
            transform: `translateY(calc(-50% - ${scrollY * 0.2}px))`,
          }}
        >
          {/* Clean Minimalist Corpus Card */}
          <RendererHeroCorpusCard showSatellite={false} />

          {/* Dedicated Glowing Amber Donate Button Bar Directly Below Right Card */}
          <div className="rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-2xl border border-white/45 ring-1 ring-white/30 p-2 sm:p-2.5 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)] flex flex-col items-center justify-center text-center transition-all">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
              <span>Donate to Healthcare Fund →</span>
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#0B4F42] font-black font-sans pt-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              <CheckCircle2 className="h-3 w-3 text-[#00A896] shrink-0" />
              <span>Royal Charter Mandate • RAA Clean Audit</span>
            </div>
          </div>
        </div>

        {/* Mobile View (< lg): Clean Clickable Story Card + Centered Donate Button at Bottom */}
        <div
          className="lg:hidden absolute inset-x-0 mx-auto bottom-3 sm:bottom-5 z-20 w-[calc(100%-1.5rem)] max-w-[370px] sm:max-w-[440px] pointer-events-auto transition-all duration-300 ease-out space-y-2"
          style={{
            opacity: Math.max(0, 1 - scrollY / 130),
            pointerEvents: scrollY > 70 ? "none" : "auto",
          }}
        >
          {/* Clickable Story Card on Mobile */}
          <Link
            to="/our-story"
            className="block rounded-2xl bg-white/25 hover:bg-white/35 backdrop-blur-2xl border border-white/45 ring-1 ring-white/30 p-2.5 sm:p-3.5 shadow-[0_15px_45px_-10px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.6)] transition-all text-left"
          >
            <div className="flex flex-row items-center gap-2.5 sm:gap-3.5">
              <div className="relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shadow-xs border border-white/40 bg-slate-100">
                <img
                  src={newsVaccine}
                  alt="Bhutan Healthcare Immunization"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              <div className="flex-1 min-w-0 space-y-0.5 text-left">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/40 text-[#0B4F42] text-[9px] font-bold border border-white/40 backdrop-blur-sm">
                    <Sparkles className="h-2.5 w-2.5 text-[#00A896]" />
                    <span>Sacred Trust</span>
                  </span>
                  <span className="text-[9px] font-mono font-bold text-[#0B4F42] bg-white/40 px-1.5 py-0.5 rounded-full border border-white/40 backdrop-blur-sm">
                    100% Tax Exempt
                  </span>
                </div>
                <h3 className="font-serif text-xs sm:text-sm font-black text-[#0B4F42] leading-tight drop-shadow-[0_1px_0_rgba(255,255,255,0.7)]">
                  Did you know you can donate here?
                </h3>
                <p className="text-[10px] text-slate-900 line-clamp-2 leading-relaxed font-medium drop-shadow-[0_1px_0_rgba(255,255,255,0.5)]">
                  Your direct contribution safeguards childhood vaccines & 120+ essential medicines in perpetuity.
                </p>
                <div className="pt-0.5 flex items-center gap-1 text-[10px] font-bold text-[#00A896]">
                  <span>Explore Mission</span>
                  <ArrowRight className="h-2.5 w-2.5" />
                </div>
              </div>
            </div>
          </Link>

          {/* Centered Donate Button Bar on Mobile */}
          <div className="rounded-xl bg-white/25 backdrop-blur-2xl border border-white/45 ring-1 ring-white/30 p-2 shadow-[0_12px_35px_-10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.5)] flex flex-col items-center justify-center text-center">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(245,158,11,0.35)] transition-all text-center"
            >
              <Heart className="h-3.5 w-3.5 fill-slate-950 text-slate-950 shrink-0" />
              <span>Donate to Healthcare Fund →</span>
            </Link>
            <div className="flex items-center justify-center gap-1.5 text-[9px] text-[#0B4F42] font-black font-sans pt-1 drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
              <CheckCircle2 className="h-3 w-3 text-[#00A896] shrink-0" />
              <span>Royal Charter Mandate • RAA Clean Audit</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Content Stage: Glides UP gracefully on scroll with Centered Frosted Editorial Layout */}
      <div className="relative z-10 px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24 pointer-events-auto">
        <div className="mx-auto max-w-5xl w-full">
          <div
            className="rounded-3xl sm:rounded-[2.5rem] bg-white/80 sm:bg-white/75 backdrop-blur-2xl border border-white/60 shadow-[0_25px_70px_-15px_rgba(11,79,66,0.12)] p-6 sm:p-10 lg:p-14 space-y-7 transition-all duration-500 ease-out text-center"
            style={{
              transform: `translateY(${Math.max(0, (1 - scrollProgress) * 45)}px)`,
              opacity: Math.min(1, 0.35 + scrollProgress * 0.65),
            }}
          >
            {/* Royal Charter & Live Status Badges (Centered) */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF6F5] border border-[#00A896]/30 text-[#0B4F42] text-xs font-semibold shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00A896]" />
                </span>
                <span>{currentSection.badge || "Royal Charter Mandate • 100% Guaranteed"}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold font-mono shadow-xs">
                <Sparkles className="h-3 w-3 text-amber-600" />
                <span>Royal Charter Sovereign Guarantee</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F7CAD0]/50 text-[#8B263E] border border-[#EE6C8A]/30 text-xs font-semibold shadow-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[#EE6C8A]" />
                <span>Universal Vaccines Ring-Fenced</span>
              </div>
            </div>

            {/* Dzongkha Seal Header (Centered) */}
            {currentSection.dzongkhaText && (
              <div className="font-serif text-lg sm:text-xl font-bold tracking-wide flex items-center justify-center gap-2 text-[#00A896]">
                <Sparkles className="h-3.5 w-3.5 text-[#00A896]" />
                <span>{currentSection.dzongkhaText}</span>
              </div>
            )}

            {/* Main Headline (Centered) */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B4F42] leading-[1.08] max-w-3xl mx-auto">
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

            {/* Subtitle (Centered) */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-sans max-w-2xl mx-auto font-light">
              {currentSection.subtitle ||
                "Bhutan's permanent statutory healthcare endowment — sustainably financing 120+ essential medicines, universal childhood vaccines, and alpine cold chain logistics across all 20 Dzongkhags without foreign reliance."}
            </p>

            {/* Feature Highlights Pills (Centered) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1 text-xs max-w-2xl mx-auto">
              <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-xs hover:border-[#00A896]/40 transition-all">
                <CheckCircle2 className="h-4 w-4 text-[#00A896] shrink-0" />
                <span className="font-semibold text-slate-900">Zero Stockout Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-xs hover:border-[#00A896]/40 transition-all">
                <CheckCircle2 className="h-4 w-4 text-[#00A896] shrink-0" />
                <span className="font-semibold text-slate-900">205 Remote Gewogs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/60 shadow-xs hover:border-amber-400/40 transition-all">
                <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-900">100% Tax Exempt (DRC)</span>
              </div>
            </div>

            {/* Transparent Royal Homage Banner (Centered Box) */}
            <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl border border-[#00A896]/25 bg-[#EAF6F5]/70 backdrop-blur-xl p-4 shadow-xs text-left">
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

            {/* Institutional Endorsement Bar (Centered) */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs border-t border-slate-200/80">
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
