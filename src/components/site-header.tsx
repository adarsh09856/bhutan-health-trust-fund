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
  Calendar,
  Megaphone,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { user, adminBarCollapsed } = useAdminAuth();
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileCategory = (cat: string) => {
    setExpandedMobileCategory((prev) => (prev === cat ? null : cat));
  };

  const showAdminBar = Boolean(
    user && !adminBarCollapsed && !location.pathname.startsWith("/admin")
  );

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
      className={`fixed left-0 right-0 z-40 w-full pointer-events-none transition-all duration-300 ease-in-out ${
        showAdminBar
          ? scrolled
            ? "top-10 pt-0 px-0 sm:px-4 lg:px-6"
            : "top-10 pt-2 px-3 sm:px-6 lg:px-8"
          : scrolled
            ? "top-0 pt-0 px-0 sm:px-4 lg:px-6"
            : "top-0 pt-3 sm:pt-4 px-3 sm:px-6 lg:px-8"
      }`}
    >
      {/* Editorial Glass Capsule Navigation Island */}
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between gap-2 sm:gap-3 pointer-events-auto transition-all duration-300 ease-in-out ${
          scrolled
            ? "w-full rounded-none sm:rounded-b-2xl bg-white/98 backdrop-blur-2xl border-b sm:border-x border-slate-200/90 shadow-[0_12px_35px_rgba(11,79,66,0.12)] px-3 sm:px-7 py-1.5 sm:py-2.5"
            : "w-full rounded-full bg-white/92 backdrop-blur-xl border border-[#00A896]/20 shadow-xs px-3 sm:px-6 py-1.5 sm:py-2.5"
        }`}
      >
        {/* Logo & Dzongkha Title */}
        <Link
          to="/"
          className="flex items-center gap-2 sm:gap-3.5 group shrink-0 whitespace-nowrap"
        >
          <div className="h-9 w-9 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/80 border border-amber-300/40 p-1 shadow-xs grid place-items-center transition duration-200 group-hover:scale-105 shrink-0">
            <img
              src={logo}
              alt="Bhutan Health Trust Fund Emblem"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[11px] font-bold text-emerald-800 tracking-wider flex items-center gap-1 font-sans">
              ༄༅། །འབྲུག་གི་གསོ་བའི་བཅོལ་དངུལ། །།
            </span>
            <span className="font-serif text-xs sm:text-base md:text-lg font-bold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-900 transition truncate max-w-[125px] xs:max-w-[210px] sm:max-w-none">
              Bhutan Health Trust Fund
            </span>
          </div>
        </Link>

        {/* Desktop Strict 6 Main Navigation Items */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-slate-100/80 backdrop-blur-md p-1 rounded-full border border-slate-200/80 shadow-inner shrink-0">
          {/* 1. ABOUT US Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/about"
              className={`inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/about")
                  ? "bg-[#0B4F42] text-white shadow-xs"
                  : "text-[#0B4F42] hover:text-[#00A896] hover:bg-[#EAF6F5]"
              }`}
            >
              <span>ABOUT US</span>
              <ChevronDown className="h-3 w-3" />
            </Link>

            {openDropdown === "about" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* 1. Organization */}
                <Link
                  to="/about/organization"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      Our Organization
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Royal Charter mandate & statutory founding
                    </p>
                  </div>
                </Link>

                {/* 2. Board of Trustees */}
                <Link
                  to="/about/trustees"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition">
                      Board of Directors
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      High-level ministerial governance & oversight
                    </p>
                  </div>
                </Link>

                {/* 3. Asset Management Committee */}
                <Link
                  to="/about/committees"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Asset Management Committee
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Fiduciary investment parameters & risk oversight
                    </p>
                  </div>
                </Link>

                {/* 4. Secretariat & Organogram */}
                <Link
                  to="/about/secretariat"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-teal-50 text-teal-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-teal-600 group-hover:text-white transition">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition">
                      Secretariat & Organogram
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Directorate, staff members & headquarters
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 2. OUR STORY */}
          <Link
            to="/our-story"
            className={`px-2.5 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname.startsWith("/our-story")
                ? "bg-[#0B4F42] text-white shadow-xs"
                : "text-[#0B4F42] hover:text-[#00A896] hover:bg-[#EAF6F5]"
            }`}
          >
            OUR STORY
          </Link>

          {/* 3. OUR IMPACT */}
          <Link
            to="/our-impact"
            className={`px-2.5 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname.startsWith("/our-impact") || location.pathname.startsWith("/our-work")
                ? "bg-[#0B4F42] text-white shadow-xs"
                : "text-[#0B4F42] hover:text-[#00A896] hover:bg-[#EAF6F5]"
            }`}
          >
            OUR IMPACT
          </Link>

          {/* 4. RESOURCES Dropdown (Dedicated Routes: Advocacy Materials, Annual Reports, Audit Report) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/resources/annual-reports"
              className={`inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/resources") || location.pathname.startsWith("/reports") || location.pathname.startsWith("/policies")
                  ? "bg-[#0B4F42] text-white shadow-xs"
                  : "text-[#0B4F42] hover:text-[#00A896] hover:bg-[#EAF6F5]"
              }`}
            >
              <span>RESOURCES</span>
              <ChevronDown className="h-3 w-3" />
            </Link>

            {openDropdown === "resources" && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* 1. Annual Reports */}
                <Link
                  to="/resources/annual-reports"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Annual Reports
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Comprehensive annual operational & statutory summaries (1992–2025)
                    </p>
                  </div>
                </Link>

                {/* 2. Financial Reports */}
                <Link
                  to="/resources/financial-reports"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      Financial Reports
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Royal Audit Authority (RAA) audited financial statements
                    </p>
                  </div>
                </Link>

                {/* 3. Other Publications */}
                <Link
                  to="/resources/other-publications"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition">
                      Other Publications
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Surveys, policy studies & technical research publications
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* 5. NEWS & EVENTS Dropdown (Dedicated Routes: Upcoming events, announcement, career) */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("news")}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              to="/news"
              className={`inline-flex items-center gap-1 px-2.5 xl:px-3.5 py-1.5 text-[11px] xl:text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/news")
                  ? "bg-[#0B4F42] text-white shadow-xs"
                  : "text-[#0B4F42] hover:text-[#00A896] hover:bg-[#EAF6F5]"
              }`}
            >
              <span>NEWS & EVENTS</span>
              <ChevronDown className="h-3 w-3" />
            </Link>

            {openDropdown === "news" && (
              <div className="absolute top-full right-0 lg:left-0 mt-2 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                {/* 1. Upcoming Events */}
                <Link
                  to="/news/events"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-amber-600 group-hover:text-white transition">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition">
                      Upcoming Events
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Symposiums, campaigns & national health commemorations
                    </p>
                  </div>
                </Link>

                {/* 2. Announcement */}
                <Link
                  to="/news/announcements"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    <Megaphone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Announcement
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Official notifications, circulars & board resolutions
                    </p>
                  </div>
                </Link>

                {/* 3. Career */}
                <Link
                  to="/news/careers"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Briefcase className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      Career
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Job vacancies, consultancy tenders & recruitments
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Action Group: Track Donation Link + Prominent DONATE CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 whitespace-nowrap">
          {/* Subtle Clickable Track Donation Link (Visible on xl screens to maintain clean spacing) */}
          <Link
            to="/track-donation"
            className="hidden xl:inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B4F42] hover:text-[#00A896] hover:underline px-2.5 py-1.5 transition-colors whitespace-nowrap cursor-pointer"
            title="Track donation pledge & verify 1:1 RGOB match"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Track Donation</span>
          </Link>

          {/* 6. Clean, Attractive & Highly Clickable DONATE CTA */}
          <Link
            to="/donate"
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-[11px] sm:text-xs font-black shadow-[0_4px_16px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_22px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
          >
            <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-slate-950 text-slate-950 shrink-0" />
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

      {/* Mobile Drawer Menu - Clean Hierarchical Accordions Matching Desktop */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 border border-slate-200/90 bg-white/98 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150 pointer-events-auto max-h-[85vh] overflow-y-auto">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100/70 p-2 rounded-2xl border border-slate-200 space-y-1">
            {/* 1. Home */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                location.pathname === "/" ? "bg-[#0B4F42] text-white shadow-xs" : "text-slate-700 hover:bg-white"
              }`}
            >
              <span>Home</span>
              <ChevronRight className={`h-3.5 w-3.5 ${location.pathname === "/" ? "text-amber-400" : "text-slate-400"}`} />
            </Link>

            {/* 2. ABOUT US (Dropdown Accordion - Matching Desktop) */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileCategory("about")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  location.pathname.startsWith("/about")
                    ? "bg-[#0B4F42]/10 text-[#0B4F42] font-black"
                    : "text-slate-800 hover:bg-white"
                }`}
              >
                <span>About Us</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    expandedMobileCategory === "about" ? "rotate-180 text-[#0B4F42]" : ""
                  }`}
                />
              </button>

              {expandedMobileCategory === "about" && (
                <div className="bg-white/95 rounded-xl m-1 p-1.5 space-y-1 border border-slate-200/80 shadow-xs animate-in fade-in duration-150">
                  <Link
                    to="/about/organization"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                  >
                    <Landmark className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                    <span>Our Organization</span>
                  </Link>
                  <Link
                    to="/about/trustees"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>Board of Directors</span>
                  </Link>
                  <Link
                    to="/about/committees"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition"
                  >
                    <Landmark className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>Asset Management Committee</span>
                  </Link>
                  <Link
                    to="/about/secretariat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-teal-50 hover:text-teal-800 transition"
                  >
                    <Building className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                    <span>Secretariat & Organogram</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. OUR STORY */}
            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                location.pathname.startsWith("/our-story") ? "bg-[#0B4F42] text-white shadow-xs" : "text-slate-700 hover:bg-white"
              }`}
            >
              <span>Our Story</span>
              <ChevronRight className={`h-3.5 w-3.5 ${location.pathname.startsWith("/our-story") ? "text-amber-400" : "text-slate-400"}`} />
            </Link>

            {/* 4. OUR IMPACT */}
            <Link
              to="/our-impact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                location.pathname.startsWith("/our-impact") || location.pathname.startsWith("/our-work")
                  ? "bg-[#0B4F42] text-white shadow-xs"
                  : "text-slate-700 hover:bg-white"
              }`}
            >
              <span>Our Impact</span>
              <ChevronRight className={`h-3.5 w-3.5 ${location.pathname.startsWith("/our-impact") ? "text-amber-400" : "text-slate-400"}`} />
            </Link>

            {/* 5. RESOURCES (Dropdown Accordion - Matching Desktop: Annual Reports, Financial Reports, Other Publications) */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileCategory("resources")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  location.pathname.startsWith("/resources") || location.pathname.startsWith("/reports") || location.pathname.startsWith("/annual-reports") || location.pathname.startsWith("/financial-reports") || location.pathname.startsWith("/other-publications")
                    ? "bg-[#0B4F42]/10 text-[#0B4F42] font-black"
                    : "text-slate-800 hover:bg-white"
                }`}
              >
                <span>Resources</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    expandedMobileCategory === "resources" ? "rotate-180 text-[#0B4F42]" : ""
                  }`}
                />
              </button>

              {expandedMobileCategory === "resources" && (
                <div className="bg-white/95 rounded-xl m-1 p-1.5 space-y-1 border border-slate-200/80 shadow-xs animate-in fade-in duration-150">
                  <Link
                    to="/resources/annual-reports"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition"
                  >
                    <Building className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                    <span>Annual Reports</span>
                  </Link>
                  <Link
                    to="/resources/financial-reports"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Financial Reports</span>
                  </Link>
                  <Link
                    to="/resources/other-publications"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-800 transition"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                    <span>Other Publications</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 6. NEWS & EVENTS (Dropdown Accordion - Matching Desktop: Upcoming Events, Announcement, Career) */}
            <div className="rounded-xl overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobileCategory("news")}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  location.pathname.startsWith("/news")
                    ? "bg-[#0B4F42]/10 text-[#0B4F42] font-black"
                    : "text-slate-800 hover:bg-white"
                }`}
              >
                <span>News & Events</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                    expandedMobileCategory === "news" ? "rotate-180 text-[#0B4F42]" : ""
                  }`}
                />
              </button>

              {expandedMobileCategory === "news" && (
                <div className="bg-white/95 rounded-xl m-1 p-1.5 space-y-1 border border-slate-200/80 shadow-xs animate-in fade-in duration-150">
                  <Link
                    to="/news/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition"
                  >
                    <Calendar className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>Upcoming Events</span>
                  </Link>
                  <Link
                    to="/news/announcements"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-800 transition"
                  >
                    <Megaphone className="h-4 w-4 text-blue-600 shrink-0" />
                    <span>Announcement</span>
                  </Link>
                  <Link
                    to="/news/careers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 transition"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>Career</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 7. Track Donation */}
            <Link
              to="/track-donation"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                location.pathname === "/track-donation" ? "bg-[#0B4F42] text-white shadow-xs" : "text-slate-700 hover:bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Track Donation</span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                1:1 RGOB Match
              </span>
            </Link>

            {/* 8. Contact Secretariat */}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                location.pathname === "/contact" ? "bg-[#0B4F42] text-white shadow-xs" : "text-slate-700 hover:bg-white"
              }`}
            >
              <span>Contact Secretariat</span>
              <ChevronRight className={`h-3.5 w-3.5 ${location.pathname === "/contact" ? "text-amber-400" : "text-slate-400"}`} />
            </Link>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <Link
              to="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs shadow-md whitespace-nowrap active:scale-95 transition-transform"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950" /> DONATE NOW (1:1 MATCHED)
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs shadow-xs whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" /> Open Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-xs whitespace-nowrap"
              >
                <Lock className="h-3.5 w-3.5 text-slate-400" /> Admin Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
