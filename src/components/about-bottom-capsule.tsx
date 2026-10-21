import { Link, useLocation } from "@tanstack/react-router";
import { Landmark, ShieldCheck, Scale, Users, BookOpen, Target } from "lucide-react";

interface SubTab {
  to: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

const ABOUT_SUB_TABS: SubTab[] = [
  {
    to: "/about",
    label: "About Us",
    shortLabel: "About",
    icon: Landmark,
  },
  {
    to: "/about/organization",
    label: "Organization & Mandate",
    shortLabel: "Mandate",
    icon: Target,
  },
  {
    to: "/about/trustees",
    label: "Board of Trustees",
    shortLabel: "Trustees",
    icon: ShieldCheck,
  },
  {
    to: "/about/committees",
    label: "Asset Management Committee",
    shortLabel: "AMC",
    icon: Scale,
  },
  {
    to: "/about/secretariat",
    label: "Secretariat & Organogram",
    shortLabel: "Secretariat",
    icon: Users,
  },
  {
    to: "/our-story",
    label: "Our Story & 26-Yr Timeline",
    shortLabel: "Our Story",
    icon: BookOpen,
  },
];

export function AboutBottomCapsule() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[94vw] sm:max-w-max pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-300">
      <nav
        aria-label="About Us Sub-pages Navigation"
        className="pointer-events-auto bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_40px_-8px_rgba(12,43,94,0.25)] rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar ring-1 ring-black/5"
      >
        <span className="hidden md:inline-flex items-center text-[10px] font-mono uppercase tracking-wider font-bold text-primary/70 px-3 py-1 bg-slate-100/80 rounded-full shrink-0">
          About BHTF
        </span>

        {ABOUT_SUB_TABS.map((tab) => {
          const isActive = currentPath === tab.to;
          const Icon = tab.icon;

          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 whitespace-nowrap ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md scale-100"
                  : "text-slate-700 hover:text-primary hover:bg-slate-100/80"
              }`}
            >
              <Icon className={`size-3.5 sm:size-4 shrink-0 ${isActive ? "text-emerald-300" : "text-slate-500"}`} />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
