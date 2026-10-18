import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Heart,
  Menu,
  Phone,
  Mail,
  MapPin,
  Globe,
  Search,
  X,
  ChevronDown,
  Landmark,
  ShieldCheck,
  Scale,
  Users,
  BookOpen,
  FileText,
  Activity,
  Calendar,
  Sparkles,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAdminAuth } from "@/lib/admin-auth";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAdminAuth();

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 transition-all">
      {/* 1. Top Utility Bar in Saffron */}
      <div className="bg-saffron text-saffron-foreground text-xs shadow-xs">
        <div className="container-page flex h-9 items-center justify-between gap-4">
          <span className="hidden sm:inline font-medium">
            ༄༅། །འབྲུག་གི་འཕྲོད་བསྟེན་གཞི་མ། — Working together for a healthier Bhutan
          </span>
          <span className="sm:hidden font-medium">Healthier Bhutan • BHTF</span>

          <div className="flex items-center gap-3 sm:gap-5">
            <a href="tel:+9752328999" className="hidden md:inline-flex items-center gap-1.5 hover:opacity-80 transition">
              <Phone className="size-3.5" />
              <span>+975 2 328999</span>
            </a>
            <a href="mailto:bhtf@bhtf.bt" className="hidden md:inline-flex items-center gap-1.5 hover:opacity-80 transition">
              <Mail className="size-3.5" />
              <span>bhtf@bhtf.bt</span>
            </a>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>Lower Motithang, Thimphu</span>
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold">
              <Globe className="size-3.5" />
              <span>EN</span>
            </span>
            {user && (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 text-[11px] font-bold"
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Institutional Navigation Bar */}
      <div className="border-b border-border bg-white">
        <div className="container-page flex h-20 items-center justify-between gap-4">
          {/* Logo & Royal Proclamation */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="size-12 rounded-xl bg-gradient-to-br from-amber-50 via-white to-slate-50 border border-border p-1 shadow-card grid place-items-center transition duration-200 group-hover:scale-105 shrink-0">
              <img src={logo} alt="Bhutan Health Trust Fund Emblem" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight">
              <div className="text-primary font-bold text-base sm:text-lg tracking-tight group-hover:text-primary/90">
                BHUTAN HEALTH TRUST FUND
              </div>
              <div className="hidden sm:block text-[11px] text-muted-foreground mt-0.5">
                Ensuring equitable access to essential medicines and vaccines
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {/* 1. About Us with Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/about"
                className={`inline-flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors relative ${
                  location.pathname.startsWith("/about") ? "text-saffron" : "text-foreground/80 hover:text-saffron"
                }`}
              >
                <span>About Us</span>
                <ChevronDown className="size-3.5" />
              </Link>

              {openDropdown === "about" && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-elevated border border-border p-2 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link
                    to="/about/organization"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs font-semibold text-foreground transition"
                  >
                    <Landmark className="size-4 text-primary" />
                    <div>
                      <div>Our Organization & Organogram</div>
                      <div className="text-[10px] text-muted-foreground font-normal">Royal Charter & Divisions</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/trustees"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs font-semibold text-foreground transition"
                  >
                    <ShieldCheck className="size-4 text-primary" />
                    <div>
                      <div>Board of Trustees</div>
                      <div className="text-[10px] text-muted-foreground font-normal">Apex ministerial leadership</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/committees"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs font-semibold text-foreground transition"
                  >
                    <Scale className="size-4 text-primary" />
                    <div>
                      <div>Asset Management Committee</div>
                      <div className="text-[10px] text-muted-foreground font-normal">Prudent endowment governance</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/secretariat"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs font-semibold text-foreground transition"
                  >
                    <Users className="size-4 text-primary" />
                    <div>
                      <div>Secretariat & Staff</div>
                      <div className="text-[10px] text-muted-foreground font-normal">Headquarters administration</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Our Story */}
            <Link
              to="/our-story"
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                location.pathname === "/our-story" ? "text-saffron" : "text-foreground/80 hover:text-saffron"
              }`}
            >
              Our Story
            </Link>

            {/* 3. Impact */}
            <Link
              to="/our-impact"
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                location.pathname.startsWith("/our-impact") || location.pathname.startsWith("/our-work")
                  ? "text-saffron"
                  : "text-foreground/80 hover:text-saffron"
              }`}
            >
              Impact
            </Link>

            {/* 4. Resources */}
            <Link
              to="/reports"
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                location.pathname.startsWith("/reports") || location.pathname.startsWith("/resources")
                  ? "text-saffron"
                  : "text-foreground/80 hover:text-saffron"
              }`}
            >
              Resources
            </Link>

            {/* 5. News and Events */}
            <Link
              to="/news"
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                location.pathname.startsWith("/news") ? "text-saffron" : "text-foreground/80 hover:text-saffron"
              }`}
            >
              News & Events
            </Link>

            {/* 6. Donate */}
            <Link
              to="/donate"
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                location.pathname === "/donate" ? "text-saffron" : "text-foreground/80 hover:text-saffron"
              }`}
            >
              Donate
            </Link>

            {/* 7. Contact Us */}
            <Link
              to="/contact"
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                location.pathname === "/contact" ? "text-saffron" : "text-foreground/80 hover:text-saffron"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Action CTAs: Donate Now in Saffron */}
          <div className="flex items-center gap-2">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-saffron px-5 py-2.5 text-sm font-bold text-saffron-foreground shadow-card hover:opacity-90 transition active:scale-95"
            >
              <Heart className="size-4 fill-current" />
              <span>Donate Now</span>
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="xl:hidden grid place-items-center size-10 rounded-lg border border-border hover:bg-muted transition text-foreground"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav className="xl:hidden border-t border-border bg-white animate-in slide-in-from-top-2 duration-200">
            <div className="container-page py-4 flex flex-col space-y-2">
              <div className="font-bold text-xs uppercase tracking-wider text-muted-foreground px-3 pt-1">
                Main Menu
              </div>
              <Link to="/" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                Home
              </Link>
              <div className="pl-3 space-y-1 border-l-2 border-saffron/30 ml-3">
                <Link to="/about" className="block py-1.5 text-sm font-medium text-foreground hover:text-saffron">
                  About Us (Overview)
                </Link>
                <Link to="/about/organization" className="block py-1 text-xs text-muted-foreground hover:text-saffron">
                  • Organization & Organogram
                </Link>
                <Link to="/about/trustees" className="block py-1 text-xs text-muted-foreground hover:text-saffron">
                  • Board of Trustees
                </Link>
                <Link to="/about/committees" className="block py-1 text-xs text-muted-foreground hover:text-saffron">
                  • Asset Management Committee
                </Link>
                <Link to="/about/secretariat" className="block py-1 text-xs text-muted-foreground hover:text-saffron">
                  • Secretariat & Staff
                </Link>
              </div>
              <Link to="/our-story" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                Our Story
              </Link>
              <Link to="/our-impact" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                Impact
              </Link>
              <Link to="/reports" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                Resources & Reports
              </Link>
              <Link to="/news" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                News & Events
              </Link>
              <Link to="/donate" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                Donate (1:1 Matched)
              </Link>
              <Link to="/contact" className="px-3 py-2 text-sm font-semibold text-foreground hover:text-saffron">
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
