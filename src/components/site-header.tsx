import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, LogIn, Menu, Phone, Mail, MapPin, X, LayoutDashboard } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/our-work", label: "Our Work" },
  { to: "/reports", label: "Reports & Publications" },
  { to: "/policies", label: "Policies" },
  { to: "/news", label: "Media & News" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAdminAuth();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-xs">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground text-xs">
        <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 opacity-90">
            <Heart className="h-3.5 w-3.5" /> Working towards a healthier Bhutan
          </span>
          <div className="hidden md:flex items-center gap-5 opacity-90">
            <a href="tel:+9752328999" className="flex items-center gap-1.5 hover:opacity-100">
              <Phone className="h-3.5 w-3.5" /> +975 2 328999
            </a>
            <a href="mailto:info@bhtf.bt" className="flex items-center gap-1.5 hover:opacity-100">
              <Mail className="h-3.5 w-3.5" /> info@bhtf.bt
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Kawajangsa, Thimphu
            </span>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="BHTF" width={48} height={48} className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <div className="text-[11px] text-primary font-semibold tracking-wide">
              འབྲུག་གི་འཕྲོད་བསྟེན་གྱི་མ་དངུལ།
            </div>
            <div className="text-lg font-bold text-primary">Bhutan Health Trust Fund</div>
            <div className="text-[11px] text-muted-foreground">
              Ensuring equitable access to essential medicines and vaccines
            </div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary rounded-md transition-colors"
              activeProps={{ className: "text-primary border-b-2 border-secondary rounded-none" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition shadow-xs"
          >
            <Heart className="h-4 w-4" /> Donate Now
          </Link>
          {user ? (
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-800 transition shadow-xs"
            >
              <LayoutDashboard className="h-4 w-4" /> Admin Panel
            </Link>
          ) : (
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition shadow-xs"
            >
              <LogIn className="h-4 w-4" /> Portal Login
            </Link>
          )}
        </div>

        <button className="xl:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {open && (
        <div className="xl:hidden border-t bg-white">
          <nav className="flex flex-col p-4 gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted rounded-md"
                activeProps={{ className: "text-primary bg-muted" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t mt-2">
              <Link
                to="/get-involved"
                onClick={() => setOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
              >
                <Heart className="h-4 w-4" /> Donate
              </Link>
              {user ? (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                >
                  <LayoutDashboard className="h-4 w-4" /> Admin
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-lg text-sm font-semibold"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}