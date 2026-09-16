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
  const isDark = section.bgVariant === "dark";

  return (
    <section
      className={`relative overflow-hidden py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${
        isDark
          ? "bg-slate-950 text-white"
          : section.bgVariant === "emerald"
            ? "bg-emerald-950 text-white"
            : section.bgVariant === "warm"
              ? "bg-[#FAF8F3] text-slate-900"
              : "bg-white text-slate-900"
      }`}
    >
      {/* Background Graphic overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url(${heroBhutan})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        {section.badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-500 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{section.badge}</span>
          </div>
        )}

        {section.dzongkhaText && (
          <div className="font-serif text-lg sm:text-xl text-amber-500/90 font-medium tracking-wide">
            {section.dzongkhaText}
          </div>
        )}

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1]">
          {section.title}
        </h1>

        {section.subtitle && (
          <p
            className={`max-w-3xl mx-auto text-lg sm:text-xl font-normal leading-relaxed ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {section.subtitle}
          </p>
        )}

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          {section.primaryCtaText && (
            <Link
              to={section.primaryCtaUrl || "/get-involved"}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all text-sm uppercase tracking-wide"
            >
              <span>{section.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          {section.secondaryCtaText && (
            <Link
              to={section.secondaryCtaUrl || "/our-work"}
              className={`inline-flex items-center gap-2 font-medium px-6 py-3.5 rounded-lg border transition-all text-sm ${
                isDark
                  ? "border-slate-700 hover:bg-white/10 text-white"
                  : "border-slate-300 hover:bg-slate-100 text-slate-800"
              }`}
            >
              <span>{section.secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

// 2. Stats Block
function StatsBlock({ section }: { section: PageBlockSection }) {
  const items = section.items || [];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            {section.title && (
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-sm text-slate-600 leading-relaxed">{section.subtitle}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {item.title}
                    </span>
                    <div className="h-9 w-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <Icon className="h-5 w-5 stroke-[1.75]" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight mb-2">
                    {item.value}
                  </div>
                </div>
                {item.description && (
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 3. Feature Cards Block
function FeatureCardsBlock({ section }: { section: PageBlockSection }) {
  const items = section.items || [];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            {section.title && (
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={idx}
                className="group relative bg-[#FAF8F3] rounded-2xl p-8 border border-slate-200/80 hover:border-amber-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="h-6 w-6 stroke-[1.75]" />
                    </div>
                    {item.badge && (
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-200/70 text-slate-700">
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700 uppercase tracking-wider pt-4 border-t border-slate-200/60"
                  >
                    <span>Explore Stream</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
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

// 4. Royal Decree / Quote Callout
function RoyalDecreeBlock({ section }: { section: PageBlockSection }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-950 via-slate-950 to-slate-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="relative max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 shadow-inner">
          <Quote className="h-6 w-6" />
        </div>

        {section.dzongkhaText && (
          <div className="font-serif text-xl sm:text-2xl text-amber-400/90 font-medium tracking-wide">
            {section.dzongkhaText}
          </div>
        )}

        <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-100 leading-relaxed tracking-tight italic">
          "{section.content || section.title}"
        </blockquote>

        {section.subtitle && (
          <div className="pt-4">
            <div className="text-sm font-bold tracking-wider uppercase text-amber-400 font-sans">
              {section.subtitle}
            </div>
            {section.badge && (
              <div className="text-xs text-slate-400 font-sans mt-0.5">{section.badge}</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// 5. Rich Text Block
function RichTextBlock({ section }: { section: PageBlockSection }) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto space-y-6">
        {section.badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F3] border-y border-slate-200/80">
      <div className="max-w-3xl mx-auto">
        {(section.title || section.subtitle) && (
          <div className="text-center mb-12 space-y-2">
            {section.title && (
              <h2 className="text-3xl font-serif font-bold text-slate-900 tracking-tight">
                {section.title}
              </h2>
            )}
            {section.subtitle && (
              <p className="text-sm text-slate-600 font-sans">{section.subtitle}</p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-serif font-bold text-base text-slate-900">
                    {item.question || item.title}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-sans">
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

// 7. CTA Banner Block
function CtaBannerBlock({ section }: { section: PageBlockSection }) {
  const isEmerald = section.bgVariant === "emerald";

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${
        isEmerald
          ? "bg-gradient-to-r from-emerald-950 via-slate-950 to-emerald-950 text-white"
          : "bg-gradient-to-r from-slate-950 via-amber-950 to-slate-950 text-white"
      } border-y border-amber-500/20`}
    >
      <div className="max-w-5xl mx-auto text-center space-y-6">
        {section.badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{section.badge}</span>
          </div>
        )}

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
          {section.title}
        </h2>

        {section.subtitle && (
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            {section.subtitle}
          </p>
        )}

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          {section.primaryCtaText && (
            <Link
              to={section.primaryCtaUrl || "/get-involved"}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-amber-500/20 transition-all text-sm uppercase tracking-wide"
            >
              <span>{section.primaryCtaText}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}

          {section.secondaryCtaText && (
            <Link
              to={section.secondaryCtaUrl || "/track-donation"}
              className="inline-flex items-center gap-2 border border-slate-700 hover:bg-white/10 text-white font-medium px-6 py-3.5 rounded-lg transition-all text-sm"
            >
              <span>{section.secondaryCtaText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
