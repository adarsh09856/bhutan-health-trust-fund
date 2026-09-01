import { Link } from "@tanstack/react-router";
import { ChevronRight, Home, Sparkles } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export function PageHero({ title, subtitle, badge, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-24 pb-14 sm:pt-32 sm:pb-20 border-b border-amber-500/20">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 h-80 w-80 bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 h-72 w-72 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-amber-300 transition flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-amber-300 transition">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-amber-300 font-bold">{b.label}</span>
                )}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                )}
              </div>
            ))
          ) : (
            <span className="text-emerald-400 font-bold">{title}</span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold mb-3 shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title & Subtitle */}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.15] max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}