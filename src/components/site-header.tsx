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
  Shield,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/our-work", label: "Our Programs" },
  { to: "/reports", label: "Reports & Publications" },
  { to: "/policies", label: "Governance & Policies" },
  { to: "/news", label: "News & Media" },
  { to: "/get-involved", label: "Support Us" },
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200">
      {/* Top Notification / Institutional Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Royal Mandate
            </span>
            <span className="hidden sm:inline text-slate-300">
              Sustainable Financing for Essential Healthcare & Vaccines
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <a
              href="tel:+9752328999"
              className="hidden md:flex items-center gap-1 hover:text-white transition"
            >
              <Phone className="h-3 w-3 text-emerald-400" /> +975 2 328999
            </a>
            <a
              href="mailto:info@bhtf.bt"
              className="hidden sm:flex items-center gap-1 hover:text-white transition"
            >
              <Mail className="h-3 w-3 text-emerald-400" /> info@bhtf.bt
            </a>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin className="h-3 w-3 text-emerald-400" /> Kawajangsa, Thimphu, Bhutan
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Dzongkha Title */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative h-14 w-14 rounded-xl bg-slate-50 border border-slate-200/60 p-1.5 shadow-xs grid place-items-center transition group-hover:scale-105">
              <img
                src={logo}
                alt="Bhutan Health Trust Fund Emblem"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-semibold text-emerald-800 tracking-wide">
                འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ།
              </span>
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-tight group-hover:text-primary transition">
                Bhutan Health Trust Fund
              </span>
              <span className="hidden sm:block text-[11px] text-slate-500 font-medium">
                Royal Government of Bhutan
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 text-[13px] font-semibold rounded-lg transition-all duration-150 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-bold shadow-sm shadow-emerald-700/20 hover:shadow-md transition-all duration-150 cursor-pointer active:scale-95"
            >
              <Heart className="h-3.5 w-3.5 fill-white text-white" />
              <span>Donate Nu.</span>
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition duration-150 cursor-pointer"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-amber-400" />
                <span>Admin Panel</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition duration-150 cursor-pointer"
              >
                <LogIn className="h-3.5 w-3.5 text-slate-600" />
                <span>Staff Portal</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/get-involved"
              className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-xs"
            >
              <Heart className="h-3 w-3 fill-white" />
              <span>Donate</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-slate-900" />
              ) : (
                <Menu className="h-6 w-6 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/90 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => {
              const isActive =
                item.to === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(item.to);

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight
                    className={`h-4 w-4 ${
                      isActive ? "text-amber-400" : "text-slate-400"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md"
            >
              <Heart className="h-4 w-4 fill-white" /> Make a Donation Pledge
            </Link>

            {user ? (
              <Link
                to="/admin/dashboard"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-xs"
              >
                <LayoutDashboard className="h-4 w-4 text-amber-400" /> Open Admin Dashboard
              </Link>
            ) : (
              <Link
                to="/admin/login"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm"
              >
                <LogIn className="h-4 w-4 text-slate-600" /> Secretariat Staff Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}