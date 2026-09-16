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
              ? "outline outline-3 outline-amber-600 ring-4 ring-amber-500/20 z-10"
              : ""
          } ${!sec.isVisible && interactive ? "opacity-50 grayscale" : ""}`}
        >
          {/* Admin Block Label Overlay in Interactive Mode */}
          {interactive && (
            <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 bg-slate-900/90 text-amber-400 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono shadow-md border border-amber-500/30">
              <span className="capitalize">{sec.type.replace("_", " ")}</span>
              {!sec.isVisible && (
                <span className="bg-red-900/80 text-red-200 px-1.5 py-0.2 rounded text-[9px] uppercase font-bold">
                  Hidden
                </span>
              )}
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
    default:
      return (
        <div className="p-8 text-center text-slate-400 bg-slate-100 dark:bg-slate-800 text-sm">
          Unrecognized block type: {sec.type}
        </div>
      );
  }
}

// 1. Hero Block
function HeroBlock({ section }: { section: PageBlockSection }) {
  const isDark = section.bgVariant !== "warm" && section.bgVariant !== "white";

  // Split title if it contains "Stronger Bhutan." to give it an opulent gold gradient highlight
  const titleParts = section.title.split(/(Stronger Bhutan\.?)/i);

  return (
    <section
      className={`relative overflow-hidden py-24 sm:py-32 px-4 sm:px-6 lg:px-8 ${
        isDark ? "bg-mesh-dark text-white" : "bg-mesh-light text-slate-900 border-b border-slate-200"
      }`}
    >
      {/* Background Graphic overlay with delicate opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: `url(${heroBhutan})` }}
      />
      
      {/* Ambient subtle light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-amber-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-7">
        {/* Live Status Beacon Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{section.badge || "Royal Charter Statutory Trust Fund"}</span>
        </div>

        {/* Dzongkha Seal Header */}
        {section.dzongkhaText && (
          <div className="font-serif text-xl sm:text-2xl text-amber-300/90 font-medium tracking-wide flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400 opacity-80" />
            <span>{section.dzongkhaText}</span>
            <Sparkles className="h-4 w-4 text-amber-400 opacity-80" />
          </div>
        )}

        {/* Main Headline with Modern Gradient Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight leading-[1.08] text-white">
          {titleParts.length > 1 ? (
            <>
              <span>{titleParts[0]}</span>
              <span className="text-gradient-gold drop-shadow-sm">{titleParts[1]}</span>
              <span>{titleParts[2]}</span>
            </>
          ) : (
            section.title
          )}
        </h1>

        {/* Subtitle */}
        {section.subtitle && (
          <p
            className={`max-w-3xl mx-auto text-lg sm:text-xl font-normal leading-relaxed font-sans ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {section.subtitle}
          </p>
        )}

        {/* Modern Action Buttons */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
          {section.primaryCtaText && (
            <Link
              to={section.primaryCtaUrl || "/get-involved"}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(245,158,11,0.3)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm uppercase tracking-wider"
            >
              <span>{section.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </Link>
          )}

          {section.secondaryCtaText && (
            <Link
              to={section.secondaryCtaUrl || "/our-work"}
              className="inline-flex items-center gap-2 font-semibold px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/25 text-white shadow-lg hover:-translate-y-0.5 transition-all text-sm tracking-wide"
            >
              <span>{section.secondaryCtaText}</span>
            </Link>
          )}
        </div>

        {/* Floating Trust Indicators Bar */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 border-t border-white/10 max-w-4xl mx-auto text-xs font-medium text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>RAA Clean Statutory Audit</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>1:1 RGOB Matching Fund</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-400" />
            <span>20/20 Dzongkhags Covered</span>
          </div>
          <div className="flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-amber-300" />
            <span>Perpetual Corpus Endowment</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// 2. Stats Block (Modern Bento Grid)
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
          {items.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={idx}
                className="card-modern rounded-3xl p-7 border border-slate-200/80 hover:border-amber-500/40 relative overflow-hidden group flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-sans">
                      {item.title}
                    </span>
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500/10 to-emerald-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight mb-2">
                    {item.value}
                  </div>
                </div>
                {item.description && (
                  <p className="text-xs text-slate-600 leading-relaxed font-sans pt-2 border-t border-slate-100 mt-2">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
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
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#061410] relative overflow-hidden">
      {/* Ambient Royal Gold Backlighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.15)_0,transparent_65%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        {/* Royal Decree Framed Showcase */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0b241d] via-[#071914] to-[#040e0b] border-2 border-amber-500/40 p-8 sm:p-14 shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-amber-400/20 text-center space-y-8">
          {/* Royal Crest Header */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 shadow-lg flex items-center justify-center">
              <div className="h-full w-full rounded-full bg-[#071914] flex items-center justify-center text-amber-400">
                <Quote className="h-7 w-7" />
              </div>
            </div>

            {section.dzongkhaText && (
              <div className="font-serif text-2xl sm:text-3xl text-amber-300 font-bold tracking-widest pt-1">
                {section.dzongkhaText}
              </div>
            )}

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-widest">
              <span>{section.badge || "The Royal Mandate of Sustainable Healthcare"}</span>
            </div>
          </div>

          {/* Quote Body */}
          <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-amber-50/95 leading-relaxed tracking-tight italic max-w-3xl mx-auto">
            "{section.content || section.title}"
          </blockquote>

          {/* Royal Attribution */}
          <div className="pt-4 border-t border-amber-500/20 max-w-md mx-auto">
            <div className="text-sm font-black tracking-widest uppercase text-amber-400 font-sans">
              {section.subtitle || "His Majesty The King of Bhutan"}
            </div>
            <div className="text-xs text-slate-400 font-sans mt-0.5">
              Royal Charter • Sovereign Health Protection
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
