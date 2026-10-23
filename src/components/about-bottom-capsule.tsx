import { Link, useLocation } from "@tanstack/react-router";
import { Landmark, ShieldCheck, Scale, Users, Target } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface SubTab {
  to: string;
  labelKey: string;
  label: string;
  shortLabelKey: string;
  shortLabel: string;
  icon: React.ElementType;
}

// 5 core About sub-pages ("Our Story" removed as requested)
const ABOUT_SUB_TABS: SubTab[] = [
  {
    to: "/about",
    labelKey: "capsule_about",
    label: "About Us",
    shortLabelKey: "capsule_about",
    shortLabel: "About",
    icon: Landmark,
  },
  {
    to: "/about/organization",
    labelKey: "capsule_org",
    label: "Organization & Organogram",
    shortLabelKey: "capsule_org",
    shortLabel: "Organization",
    icon: Target,
  },
  {
    to: "/about/trustees",
    labelKey: "capsule_trustees",
    label: "Board of Trustees",
    shortLabelKey: "capsule_trustees",
    shortLabel: "Trustees",
    icon: ShieldCheck,
  },
  {
    to: "/about/committees",
    labelKey: "capsule_amc",
    label: "Asset Management Committee",
    shortLabelKey: "capsule_amc",
    shortLabel: "AMC",
    icon: Scale,
  },
  {
    to: "/about/secretariat",
    labelKey: "capsule_secretariat",
    label: "Secretariat",
    shortLabelKey: "capsule_secretariat",
    shortLabel: "Secretariat",
    icon: Users,
  },
];

export function AboutBottomCapsule() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t, isDzongkha } = useLanguage();

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[96vw] sm:max-w-max pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-300">
      <nav
        aria-label="About Us Sub-pages Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_40px_-8px_rgba(12,43,94,0.25)] rounded-full p-1.5 px-2 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar ring-1 ring-black/5"
      >
        <span className="hidden lg:inline-flex items-center text-[10px] font-mono uppercase tracking-wider font-bold text-primary/70 px-3 py-1 bg-slate-100/90 rounded-full shrink-0">
          {isDzongkha ? "སྐོར།" : "About BHTF"}
        </span>

        {ABOUT_SUB_TABS.map((tab) => {
          const isActive = currentPath === tab.to;
          const Icon = tab.icon;
          const label = t(tab.labelKey, tab.label);
          const shortLabel = t(tab.shortLabelKey, tab.shortLabel);

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
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{shortLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
