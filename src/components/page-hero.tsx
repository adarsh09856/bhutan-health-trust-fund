import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

import heroBhutan from "@/assets/hero-bhutan.jpg";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export function PageHero({ title, subtitle, badge, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#061713] text-white pt-24 pb-14 sm:pt-28 sm:pb-18 border-b border-amber-400/20">
      {/* Authentic Scenic Bhutan Himalayan Mountain Background Banner */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-75"
        style={{ backgroundImage: `url(${heroBhutan})` }}
      />
      {/* Sovereign Dark Vignette Overlays for Maximum Contrast & Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#061713]/90 via-[#061713]/65 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#061713]/50 via-transparent to-[#061713] pointer-events-none" />

      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 h-96 w-96 bg-amber-400/[0.08] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 h-80 w-80 bg-emerald-500/[0.08] rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-sans"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-amber-300 transition flex items-center gap-1 font-medium text-slate-300">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-amber-300 transition font-medium text-slate-300">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-amber-300 font-bold">{b.label}</span>
                )}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
                )}
              </div>
            ))
          ) : (
            <span className="text-amber-300 font-bold">{title}</span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4 font-sans backdrop-blur-md shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title & Subtitle */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed font-sans font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
