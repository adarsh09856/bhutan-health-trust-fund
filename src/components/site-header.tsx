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
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/our-work", label: "Programs" },
  { to: "/reports", label: "Publications" },
  { to: "/policies", label: "Governance" },
  { to: "/news", label: "News" },
  { to: "/get-involved", label: "Support" },
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
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Glass Notification Bar */}
      <div className="bg-slate-950/85 backdrop-blur-xl text-slate-200 text-xs py-1.5 px-4 border-b border-white/10">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-500/30 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Royal Mandate
            </span>
            <span className="hidden sm:inline text-slate-300 text-xs">
              Sovereign Health Financing for Universal Essential Medicines & Vaccines
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-300">
            <a
              href="tel:+9752328999"
              className="hidden md:flex items-center gap-1 hover:text-emerald-400 transition"
            >
              <Phone className="h-3 w-3 text-emerald-400" /> +975 2 328999
            </a>
            <a
              href="mailto:info@bhtf.bt"
              className="hidden sm:flex items-center gap-1 hover:text-emerald-400 transition"
            >
              <Mail className="h-3 w-3 text-emerald-400" /> info@bhtf.bt
            </a>
            <span className="hidden lg:flex items-center gap-1 text-slate-400">
              <MapPin className="h-3 w-3 text-emerald-400" /> Kawajangsa, Thimphu
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Header */}
      <div className="bg-white/80 backdrop-blur-2xl border-b border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo & Dzongkha Title in Glass Card */}
            <Link to="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="relative h-13 w-13 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 p-1.5 shadow-sm grid place-items-center transition duration-300 group-hover:scale-105 group-hover:shadow-md">
                <img
                  src={logo}
                  alt="Bhutan Health Trust Fund Emblem"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-emerald-800 tracking-wider">
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
            <nav className="hidden lg:flex items-center gap-1 bg-slate-200/50 backdrop-blur-xl p-1.5 rounded-2xl border border-white/70 shadow-inner">
              {navLinks.map((item) => {
                const isActive =
                  item.to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(item.to);

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-700 hover:text-slate-950 hover:bg-white/80 hover:shadow-xs"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Glass CTAs */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600/90 to-emerald-700/90 hover:from-emerald-600 hover:to-emerald-700 backdrop-blur-md text-white text-xs font-bold border border-emerald-400/30 shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.35)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Heart className="h-3.5 w-3.5 fill-white text-white" />
                <span>Donate Nu.</span>
              </Link>

              {user ? (
                <Link
                  to="/admin/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md border border-slate-700 shadow-xs transition duration-200 cursor-pointer"
                >
                  <LayoutDashboard className="h-3.5 w-3.5 text-amber-400" />
                  <span>Admin Panel</span>
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/70 hover:bg-white/95 text-slate-800 text-xs font-bold backdrop-blur-md border border-slate-200/80 shadow-xs transition duration-200 cursor-pointer"
                >
                  <LogIn className="h-3.5 w-3.5 text-slate-600" />
                  <span>Staff Portal</span>
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button in Glass Pill */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/get-involved"
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/90 backdrop-blur-md text-white text-xs font-bold shadow-xs border border-emerald-400/30"
              >
                <Heart className="h-3 w-3 fill-white" />
                <span>Donate</span>
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-white/70 hover:bg-white/95 backdrop-blur-xl border border-white/80 text-slate-800 shadow-xs transition focus:outline-none cursor-pointer"
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
        <div className="lg:hidden border-b border-white/60 bg-white/90 backdrop-blur-3xl px-4 pt-3 pb-6 space-y-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] animate-in slide-in-from-top-2 duration-200">
          <div className="bg-slate-100/60 backdrop-blur-md p-1.5 rounded-2xl border border-white/60 space-y-1">
            {navLinks.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-700 hover:bg-white/80"
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
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold text-xs shadow-md border border-emerald-400/30"
            >
              <Heart className="h-4 w-4 fill-white" /> Make a Donation Pledge
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-xs"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" /> Open Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/80 hover:bg-white text-slate-800 font-semibold text-xs border border-slate-200/80 shadow-xs"
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