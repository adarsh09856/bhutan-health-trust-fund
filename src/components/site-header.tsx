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
  GraduationCap,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user } = useAdminAuth();
  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 px-3 sm:px-6 lg:px-8 pointer-events-none">
      {/* Floating Glass Capsule Navigation Island */}
      <div className="mx-auto max-w-7xl bg-white/95 backdrop-blur-2xl border border-slate-200/90 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.12)] px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 pointer-events-auto transition-all duration-200 hover:border-emerald-500/40 hover:shadow-[0_14px_45px_rgba(0,0,0,0.16)]">
        {/* Logo & Dzongkha Title in Capsule */}
        <Link to="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 whitespace-nowrap">
          <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-emerald-50 border border-amber-200/60 p-1 shadow-xs grid place-items-center transition duration-200 group-hover:scale-105">
            <img
              src={logo}
              alt="Bhutan Health Trust Fund Emblem"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-700 tracking-wider flex items-center gap-1">
              འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ།
            </span>
            <span className="text-xs sm:text-sm md:text-base font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition">
              Bhutan Health Trust Fund
            </span>
          </div>
        </Link>

        {/* Desktop Capsule Grouped Dropdown Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 backdrop-blur-md p-1 rounded-full border border-slate-200 shadow-inner shrink-0">
          {/* Home */}
          <Link
            to="/"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname === "/"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "text-slate-700 hover:text-emerald-700 hover:bg-white"
            }`}
          >
            Home
          </Link>

          {/* About Us Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("about")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/about")
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-white"
              }`}
            >
              <span>About Us</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {openDropdown === "about" && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  to="/about"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <Landmark className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      Royal Charter Mandate
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Founding history, mission & GNH alignment
                    </p>
                  </div>
                </Link>

                <Link
                  to="/about"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-amber-500 group-hover:text-white transition">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition">
                      Board of Trustees & Oversight
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Governance, fiduciary safeguards & leadership
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Our Programs Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("programs")}
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
              <span>Our Programs</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {openDropdown === "programs" && (
              <div className="absolute top-full left-0 mt-3 w-80 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
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
                      Primary health formulary & emergency drugs
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
                      Equitable distribution to 205 remote gewogs
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Transparency & Governance Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("transparency")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                location.pathname.startsWith("/reports") || location.pathname.startsWith("/policies")
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-white"
              }`}
            >
              <span>Transparency</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>

            {openDropdown === "transparency" && (
              <div className="absolute top-full left-0 mt-3 w-72 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  to="/reports"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-purple-600 group-hover:text-white transition">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-purple-700 transition">
                      Reports & Audits
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Annual reports & RAA certified statements
                    </p>
                  </div>
                </Link>

                <Link
                  to="/policies"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-teal-50 text-teal-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-teal-600 group-hover:text-white transition">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition">
                      Governance & Policies
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Procurement ethics & whistleblower channel
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Health Academy LMS */}
          <Link
            to="/academy"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 inline-flex items-center gap-1.5 ${
              location.pathname.startsWith("/academy")
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/20"
                : "text-slate-700 hover:text-blue-700 hover:bg-white"
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
            <span>Academy LMS</span>
          </Link>

          {/* News & Media */}
          <Link
            to="/news"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname.startsWith("/news")
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "text-slate-700 hover:text-emerald-700 hover:bg-white"
            }`}
          >
            News
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all duration-200 ${
              location.pathname === "/contact"
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "text-slate-700 hover:text-emerald-700 hover:bg-white"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Action CTAs in Capsule */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0 whitespace-nowrap">
          <Link
            to="/get-involved"
            className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-emerald-700/25 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 shrink-0 border border-emerald-400/30"
          >
            <Heart className="h-3.5 w-3.5 fill-white text-white shrink-0" />
            <span>Donate (1:1 Matched)</span>
          </Link>

          {/* Portals Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("portals")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs transition duration-150 cursor-pointer shrink-0"
            >
              <Lock className="h-3.5 w-3.5 text-slate-600 shrink-0" />
              <span>Portals</span>
              <ChevronDown className="h-3 w-3 text-slate-500" />
            </button>

            {openDropdown === "portals" && (
              <div className="absolute top-full right-0 mt-3 w-72 bg-white/98 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl p-2.5 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <Link
                  to="/academy"
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-blue-50/70 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Health Academy LMS
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      Student training & CME certificates
                    </p>
                  </div>
                </Link>

                <Link
                  to={user ? "/admin/dashboard" : "/admin/login"}
                  className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-emerald-50/70 transition text-left group"
                >
                  <div className="h-8 w-8 rounded-xl bg-slate-900 text-amber-400 grid place-items-center shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition">
                    <LayoutDashboard className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition">
                      Secretariat Staff Portal
                    </div>
                    <p className="text-[11px] text-slate-500 leading-snug font-normal">
                      {user ? `Logged in as ${user.name}` : "Restricted admin & CRM access"}
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions: Donate + Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/get-involved"
            className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs whitespace-nowrap"
          >
            <Heart className="h-3 w-3 fill-white" />
            <span>Donate</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs transition focus:outline-none cursor-pointer"
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

      {/* Mobile Glass Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-7xl mt-2 border border-slate-200/90 bg-white/98 backdrop-blur-2xl rounded-3xl p-3 sm:p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150 pointer-events-auto">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-2 rounded-2xl border border-slate-200 space-y-1">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us & Royal Charter" },
              { to: "/our-work", label: "Our Programs & Commodities" },
              { to: "/academy", label: "Health Academy & Student LMS 🎓" },
              { to: "/reports", label: "Reports & Publications" },
              { to: "/policies", label: "Governance & Policies" },
              { to: "/news", label: "News & Media Room" },
              { to: "/get-involved", label: "Get Involved & Donate (1:1)" },
              { to: "/contact", label: "Contact Secretariat" },
            ].map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-700 hover:bg-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`h-3.5 w-3.5 ${
                      isActive ? "text-amber-400" : "text-slate-400"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-xs shadow-md whitespace-nowrap"
            >
              <Heart className="h-4 w-4 fill-white" /> Make a Donation Pledge (1:1 Matched)
            </Link>

            <Link
              to="/academy"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-blue-50 text-blue-900 font-bold text-xs border border-blue-200 shadow-xs whitespace-nowrap"
            >
              <GraduationCap className="h-4 w-4 text-blue-700" /> Health Academy & Student LMS
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs shadow-xs whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" /> Secretariat Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs whitespace-nowrap"
              >
                <LogIn className="h-4 w-4 text-slate-600" /> Secretariat Staff Portal
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}