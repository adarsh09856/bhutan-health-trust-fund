import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Heart,
  LogIn,
  Menu,
  Phone,
  Mail,
  MapPin,
  X,
  LayoutDashboard,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/our-work", label: "Our Work" },
  { to: "/reports", label: "Reports" },
  { to: "/policies", label: "Policies" },
  { to: "/news", label: "News & Media" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAdminAuth();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 w-full transform-gpu will-change-transform">
      {/* Top Bhutan National Institutional Ribbon */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-slate-200 text-xs py-1.5 px-4 border-b border-amber-500/20 shadow-xs">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/25 to-emerald-500/25 text-amber-300 font-extrabold text-[11px] border border-amber-500/40 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              Royal Mandate
            </span>
            <span className="hidden sm:inline text-slate-300 text-xs font-medium">
              Sovereign Health Financing for Universal Essential Medicines & Vaccines
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300 whitespace-nowrap">
            <a
              href="tel:+9752328999"
              className="hidden md:flex items-center gap-1 hover:text-amber-300 transition"
            >
              <Phone className="h-3 w-3 text-emerald-400" /> +975 2 328999
            </a>
            <a
              href="mailto:info@bhtf.bt"
              className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition"
            >
              <Mail className="h-3 w-3 text-emerald-400" /> info@bhtf.bt
            </a>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <MapPin className="h-3 w-3 text-amber-400" /> Kawajangsa, Thimphu
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-3 xl:gap-6">
            {/* Logo & Dzongkha Title in Colorful Badge */}
            <Link to="/" className="flex items-center gap-3.5 group shrink-0 whitespace-nowrap">
              <div className="relative h-13 w-13 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-emerald-50 border border-amber-200/60 p-1.5 shadow-sm shadow-amber-500/10 grid place-items-center transition duration-300 group-hover:scale-105 group-hover:shadow-md">
                <img
                  src={logo}
                  alt="Bhutan Health Trust Fund Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-extrabold text-emerald-700 tracking-wider flex items-center gap-1">
                  འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ།
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-700 transition">
                  Bhutan Health Trust Fund
                </span>
                <span className="hidden sm:block text-[11px] text-slate-500 font-medium">
                  Royal Government of Bhutan
                </span>
              </div>
            </Link>

            {/* Desktop Frosted Glass Pill Menu */}
            <nav className="hidden xl:flex items-center gap-1 bg-gradient-to-r from-slate-100/90 via-slate-50/90 to-slate-100/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200/80 shadow-inner shrink-0 whitespace-nowrap">
              {navLinks.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`whitespace-nowrap px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md shadow-slate-900/20"
                        : "text-slate-700 hover:text-emerald-700 hover:bg-white/90"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-3 shrink-0 whitespace-nowrap">
              <Link
                to="/get-involved"
                className="whitespace-nowrap inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold shadow-md shadow-emerald-700/25 hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 shrink-0 border border-emerald-400/30"
              >
                <Heart className="h-3.5 w-3.5 fill-white text-white shrink-0" />
                <span>Donate Nu. (1:1 Matched)</span>
              </Link>

              {user ? (
                <Link
                  to="/admin/dashboard"
                  className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition duration-150 cursor-pointer shrink-0 border border-slate-700"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>Admin Panel</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="whitespace-nowrap inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs transition duration-150 cursor-pointer shrink-0"
                >
                  <LogIn className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                  <span>Staff Portal</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex xl:hidden items-center gap-2">
              <Link
                to="/get-involved"
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-xs whitespace-nowrap"
              >
                <Heart className="h-3 w-3 fill-white" />
                <span>Donate</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 shadow-xs transition focus:outline-none cursor-pointer"
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
        </div>
      </div>

      {/* Mobile Glass Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white/98 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          <div className="bg-gradient-to-b from-slate-50 to-slate-100 p-1.5 rounded-2xl border border-slate-200 space-y-1">
            {navLinks.map((item) => {
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

          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-extrabold text-xs shadow-md whitespace-nowrap"
            >
              <Heart className="h-4 w-4 fill-white" /> Make a Donation Pledge (1:1 Matched)
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-xs whitespace-nowrap"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" /> Open Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs whitespace-nowrap"
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