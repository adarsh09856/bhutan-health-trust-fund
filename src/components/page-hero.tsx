import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

import kingPortrait from "@/assets/king_portrait_fourth.jpg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; to?: string }[];
}

import { ShieldCheck } from "lucide-react";

export function PageHero({ title, subtitle, badge, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#E3F1F6] via-[#FAF8F3] to-[#FAF8F3] text-slate-900 pt-20 sm:pt-22 pb-14 sm:pb-18 border-b border-slate-200/90">
      {/* Authentic Portrait of His Majesty The Fourth Druk Gyalpo with subtle opacity */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat pointer-events-none opacity-[0.07]"
        style={{
          backgroundImage: `url(${kingPortrait})`,
          backgroundPosition: "right 20%",
        }}
      />
      {/* Light soft vignette overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F3] via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F3] via-transparent to-transparent pointer-events-none" />

      {/* Transparent Royal Notice directly AFTER the fixed menu capsule (scrolls with page, never sticks) */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px] font-sans text-[#0B4F42]/85 bg-transparent border-b border-[#00A896]/15 pb-2.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-bold text-[#00A896] tracking-wide text-[10px] sm:text-[11px]">
              ༄༅། །འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ། །།
            </span>
            <span className="text-[#0B4F42]/40">•</span>
            <span className="font-mono font-semibold text-[10px] sm:text-[11px] tracking-wide">
              Royal Charter Sovereign Trust Fund
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-[#0B4F42]/80 text-[10px] sm:text-[11px]">
            <ShieldCheck className="h-3.5 w-3.5 text-[#00A896] shrink-0" />
            <span>Universal Free Healthcare Guarantee: 100% Essential Drugs & Vaccines Ring-Fenced in Perpetuity</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-1.5 text-xs text-slate-500 mb-4 font-sans"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-[#00A896] transition flex items-center gap-1 font-medium text-slate-600">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-[#00A896] transition font-medium text-slate-600">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-[#0B4F42] font-bold">{b.label}</span>
                )}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                )}
              </div>
            ))
          ) : (
            <span className="text-[#0B4F42] font-bold">{title}</span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#00A896]/30 text-[#0B4F42] text-xs font-bold mb-4 font-sans shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A896] animate-pulse"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title & Subtitle */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B4F42] leading-[1.12] max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans font-light">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
