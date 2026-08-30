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
    <section className="relative bg-slate-950 text-white py-14 sm:py-20 border-b border-slate-800 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(245,158,11,0.1),transparent_50%)]">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-4 font-medium" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-emerald-400 transition flex items-center gap-1">
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
          {breadcrumb ? (
            breadcrumb.map((b, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                {b.to ? (
                  <Link to={b.to} className="hover:text-emerald-400 transition">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-emerald-400 font-semibold">{b.label}</span>
                )}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
                )}
              </div>
            ))
          ) : (
            <span className="text-emerald-400 font-semibold">{title}</span>
          )}
        </nav>

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title & Subtitle */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}