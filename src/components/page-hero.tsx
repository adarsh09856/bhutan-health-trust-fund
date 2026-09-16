import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  breadcrumb?: { label: string; to?: string }[];
}

export function PageHero({ title, subtitle, badge, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-mesh-white text-slate-900 pt-36 pb-16 sm:pt-44 sm:pb-20 border-b border-slate-200/80">
      {/* Background Subtle Ambient Glows */}
      <div className="absolute top-0 right-1/4 h-80 w-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 h-72 w-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          className="flex items-center gap-1.5 text-xs text-slate-500 mb-5 font-sans"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-emerald-700 transition flex items-center gap-1 font-medium">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-emerald-700 transition font-medium">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-slate-900 font-bold">{b.label}</span>
                )}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                )}
              </div>
            ))
          ) : (
            <span className="text-slate-900 font-bold">{title}</span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-300/60 text-amber-900 text-xs font-bold mb-4 font-sans shadow-2xs">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title & Subtitle */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl leading-relaxed font-sans font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
