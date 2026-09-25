import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Heart,
  LogIn,
  Menu,
  Phone,
  Mail,
  MapPin,
  X,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Building,
  FileText,
  Syringe,
  Pill,
  Award,
  Lock,
  Globe2,
  Newspaper,
  HeartHandshake,
  Landmark,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useAdminAuth();
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll listener for sticky glass elevation
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header
      className={`fixed left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 ${
        scrolled
          ? user
            ? "top-10 pt-0 px-0 sm:px-4 lg:px-6"
            : "top-0 pt-0 px-0 sm:px-4 lg:px-6"
          : user
            ? "top-11 pt-1 px-3 sm:px-6 lg:px-8"
            : "top-0 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8"
      }`}
    >
      {/* Editorial Glass Capsule Navigation Island */}
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between gap-3 pointer-events-auto transition-all duration-300 ${
          scrolled
            ? "w-full rounded-none sm:rounded-b-2xl bg-white/95 backdrop-blur-2xl border-b sm:border-x border-slate-200/90 shadow-[0_12px_35px_rgba(11,31,26,0.10)] px-4 sm:px-7 py-2 sm:py-2.5"
            : "w-full rounded-full bg-white/92 backdrop-blur-xl border border-slate-200/80 shadow-xs px-4 sm:px-6 py-2 sm:py-2.5"
        }`}
      >
        {/* Logo & Dzongkha Title */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 whitespace-nowrap"
        >
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/80 border border-amber-300/40 p-1 shadow-xs grid place-items-center transition duration-200 group-hover:scale-105">
            <img
              src={logo}
              alt="Bhutan Health Trust Fund Emblem"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-800 tracking-wider flex items-center gap-1 font-sans">
              ༄༅། །འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ། །།
            </span>
            <span className="font-serif text-sm sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-900 transition">
              Bhutan Health Trust Fund
            </span>
          </div>
        </Link>

        {/* Desktop Strict 6 Main Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 backdrop-blur-md p-1 rounded-full border border-slate-200/80 shadow-inner shrink-0">
          {/* 1. ABOUT US Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/about"
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/about")
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-white"
              }`}
            >
              <span>ABOUT US</span>
              <ChevronDown className="h-3 w-3" />
            </Link>

            {openDropdown === "about" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  to="/about"
                  hash="organization"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      Our Organization & Mandate
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Royal Charter statutory governance & GNH foundation
                    </p>
                  </div>
                </Link>

                <Link
                  to="/about"
                  hash="vision-mission"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition">
                      Vision & Mission
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Approved July 17, 2026 Sovereign health charter
                    </p>
                  </div>
                </Link>

                <Link
                  to="/about"
                  hash="trustees"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-teal-50 text-teal-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-teal-600 group-hover:text-white transition">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition">
                      Board of Trustees & Oversight
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      High-level multi-sectoral fiduciary governance
                    </p>
                  </div>
                </Link>

                <Link
                  to="/about"
                  hash="organogram"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Secretariat & Organogram
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Annexure 1: AMC, Directorate & 3 Operational Divisions
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 2. OUR STORY (Separate from Our Impact) */}
          <Link
            to="/our-story"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname.startsWith("/our-story")
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-700 hover:text-emerald-700 hover:bg-white"
            }`}
          >
            OUR STORY
          </Link>

          {/* 3. OUR IMPACT (Separate from Our Story) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("impact")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/our-work"
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/our-work")
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-white"
              }`}
            >
              <span>OUR IMPACT</span>
              <ChevronDown className="h-3 w-3" />
            </Link>

            {openDropdown === "impact" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  to="/our-work"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Syringe className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Universal Routine Vaccines
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      100% Childhood immunization antigens
                    </p>
                  </div>
                </Link>

                <Link
                  to="/our-work"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      120+ Essential Medicines
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Primary healthcare formulary & emergency buffer
                    </p>
                  </div>
                </Link>

                <Link
                  to="/our-work"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-cyan-50 text-cyan-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-cyan-600 group-hover:text-white transition">
                    <Globe2 className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-cyan-700 transition">
                      20 Dzongkhags Reach Matrix
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Equitable supply to 205 remote gewogs
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 4. RESOURCES (Includes Window Financing) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/reports"
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/reports") || location.pathname.startsWith("/policies")
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-white"
              }`}
            >
              <span>RESOURCES</span>
              <ChevronDown className="h-3 w-3" />
            </Link>

            {openDropdown === "resources" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  to="/reports"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition">
                      Official Documents & Audits
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Royal Charter, IPS, FMS & 2005–2025 RAA reports
                    </p>
                  </div>
                </Link>

                <Link
                  to="/reports"
                  hash="window-financing"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition">
                      Window Financing
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      MOF requisition process & Q1–Q4 quarterly releases
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 5. NEWS & EVENTS */}
          <Link
            to="/news"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname.startsWith("/news")
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-700 hover:text-emerald-700 hover:bg-white"
            }`}
          >
            NEWS & EVENTS
          </Link>
        </nav>

        {/* 6. Clean, Attractive & Highly Clickable DONATE CTA */}
        <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          >
            <Heart className="h-4 w-4 fill-slate-950 text-slate-950 shrink-0" />
            <span className="tracking-wide font-sans">DONATE</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs transition focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-slate-900" />
            ) : (
              <Menu className="h-5 w-5 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 border border-slate-200/90 bg-white/98 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150 pointer-events-auto">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-2 rounded-2xl border border-slate-200 space-y-1">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/our-story", label: "Our Story" },
              { to: "/our-work", label: "Our Impact" },
              { to: "/reports", label: "Resources & Window Financing" },
              { to: "/news", label: "News & Events" },
              { to: "/get-involved", label: "Donate" },
              { to: "/contact", label: "Contact Secretariat" },
            ].map((item) => {
              const isActive =
                item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    isActive ? "bg-slate-900 text-white shadow-xs" : "text-slate-700 hover:bg-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 ${isActive ? "text-amber-400" : "text-slate-400"}`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs shadow-md whitespace-nowrap"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950" /> DONATE NOW
            </Link>

            {user && (
              <Link
                to="/admin/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs shadow-xs whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" /> Open Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
