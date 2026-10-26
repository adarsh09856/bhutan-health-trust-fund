import { useRef, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Landmark, ShieldCheck, Scale, Users, Target } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

interface SubTab {
  to: string;
  labelKey: string;
  label: string;
  midLabelKey?: string;
  midLabel?: string;
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
    shortLabelKey: "capsule_about_short",
    shortLabel: "About",
    icon: Landmark,
  },
  {
    to: "/about/organization",
    labelKey: "capsule_org",
    label: "Organization",
    shortLabelKey: "capsule_org_short",
    shortLabel: "Org",
    icon: Target,
  },
  {
    to: "/about/trustees",
    labelKey: "capsule_trustees",
    label: "Board of Trustees",
    midLabelKey: "capsule_trustees_short",
    midLabel: "Trustees",
    shortLabelKey: "capsule_trustees_short",
    shortLabel: "Trustees",
    icon: ShieldCheck,
  },
  {
    to: "/about/committees",
    labelKey: "capsule_amc",
    label: "Asset Management",
    midLabelKey: "capsule_amc_short",
    midLabel: "AMC",
    shortLabelKey: "capsule_amc_short",
    shortLabel: "AMC",
    icon: Scale,
  },
  {
    to: "/about/secretariat",
    labelKey: "capsule_secretariat",
    label: "Secretariat",
    shortLabelKey: "capsule_secretariat_short",
    shortLabel: "Secretariat",
    icon: Users,
  },
];

export function AboutBottomCapsule() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { t } = useLanguage();
  const navRef = useRef<HTMLElement | null>(null);
  const activeTabRef = useRef<HTMLAnchorElement | null>(null);

  // Auto-scroll active tab into view on smaller/mobile screens if needed
  useEffect(() => {
    if (activeTabRef.current && navRef.current) {
      if (navRef.current.scrollWidth > navRef.current.clientWidth) {
        activeTabRef.current.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }
  }, [currentPath]);

  return (
    <div className="fixed bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-auto max-w-[calc(100vw-1.5rem)] px-1 sm:px-0 pointer-events-none flex justify-center animate-in fade-in slide-in-from-bottom-3 duration-300">
      <nav
        ref={navRef}
        aria-label="About Us Sub-pages Navigation"
        className="pointer-events-auto bg-white/95 backdrop-blur-2xl border border-slate-200/90 shadow-[0_12px_40px_-8px_rgba(12,43,94,0.22)] rounded-full p-0.5 sm:p-1.5 flex items-center gap-0.5 sm:gap-1.5 overflow-x-auto no-scrollbar ring-1 ring-black/5 mx-auto max-w-full scroll-smooth"
      >
        {ABOUT_SUB_TABS.map((tab) => {
          const isActive = currentPath === tab.to;
          const Icon = tab.icon;
          const label = t(tab.labelKey, tab.label);
          const midLabel = tab.midLabelKey ? t(tab.midLabelKey, tab.midLabel || tab.label) : label;
          const shortLabel = t(tab.shortLabelKey, tab.shortLabel);

          return (
            <Link
              key={tab.to}
              to={tab.to}
              ref={isActive ? activeTabRef : undefined}
              className={`inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 whitespace-nowrap select-none active:scale-[0.98] ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-slate-700 hover:text-primary hover:bg-slate-100/80"
              }`}
            >
              <Icon
                className={`size-3.5 sm:size-4 shrink-0 transition-colors ${
                  isActive ? "text-emerald-300" : "text-slate-500"
                }`}
              />
              {/* Desktop (>= 1024px) */}
              <span className="hidden lg:inline">{label}</span>
              {/* Tablet (640px to 1023px) */}
              <span className="hidden sm:inline lg:hidden">{midLabel}</span>
              {/* Mobile (< 640px) */}
              <span className="sm:hidden text-[11px] font-medium">{shortLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
