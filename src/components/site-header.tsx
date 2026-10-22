import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Heart,
  Menu,
  Phone,
  Mail,
  MapPin,
  Globe,
  X,
  ChevronDown,
  Landmark,
  ShieldCheck,
  Scale,
  Users,
  Target,
  BookOpen,
  FileText,
  Activity,
  Calendar,
  Sparkles,
  Briefcase,
  Layers,
  Download,
  Megaphone,
  FileSpreadsheet,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAdminAuth } from "@/lib/admin-auth";
import { useLanguage } from "@/lib/i18n/language-context";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAdminAuth();
  const { lang, toggleLang, t, isDzongkha } = useLanguage();

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpandedSection(null);
  }, [location.pathname]);

  const toggleMobileSection = (section: string) => {
    setMobileExpandedSection((prev) => (prev === section ? null : section));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 transition-all border-b border-border shadow-xs">
      {/* 1. Top Utility Bar in Sovereign Royal Emerald */}
      <div className="bg-[#0B4F42] text-white/95 text-xs shadow-xs border-b border-emerald-900/40">
        <div className="container-page flex h-8 items-center justify-between gap-4">
          <span className="hidden sm:inline font-medium font-dzongkha">
            {isDzongkha
              ? "༄༅༎ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ ༎ — འཕྲོད་བསྟེན་ལྡན་པའི་འབྲུག་རྒྱལ་ཁབ་ཀྱི་དོན་ལུ་ མཉམ་རུབ་ཐོག་ལཱ་འབད་དོ།"
              : "༄༅༎ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ ༎ — Working together for a healthier Bhutan"}
          </span>
          <span className="sm:hidden font-medium font-dzongkha">
            {isDzongkha ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ།" : "Healthier Bhutan • BHTF"}
          </span>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <a href="tel:02338636" className="hidden md:inline-flex items-center gap-1.5 hover:text-amber-300 transition">
              <Phone className="size-3.5" />
              <span>02-338636 / 338637 / 77348083</span>
            </a>
            <a href="mailto:bhtf@bhtf.bt" className="hidden md:inline-flex items-center gap-1.5 hover:text-amber-300 transition">
              <Mail className="size-3.5" />
              <span>bhtf@bhtf.bt</span>
            </a>
            <span className="hidden lg:inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              <span>{t("topbar_address", "Lower Motithang, Thimphu")}</span>
            </span>

            {/* Language Switcher Interactive Button (EN <-> DZ) */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer text-xs font-bold text-white border border-white/25 shadow-2xs"
              title={isDzongkha ? "Switch to English (EN)" : "རྫོང་ཁ་ལུ་སོར། (Switch to Dzongkha)"}
              aria-label="Toggle language between English and Dzongkha"
            >
              <Globe className="size-3.5 text-amber-300" />
              <span className={isDzongkha ? "font-dzongkha" : "font-bold"}>
                {lang === "en" ? "EN" : "རྫོང་ཁ"}
              </span>
              <span className="text-[10px] text-white/70 font-normal">
                ({lang === "en" ? "རྫོང་ཁ" : "EN"})
              </span>
            </button>

            {user && (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white"
              >
                {t("nav_admin", "Admin")}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Institutional Navigation Bar */}
      <div className="bg-white">
        <div className="container-page flex h-20 items-center justify-between gap-2 xl:gap-4">
          {/* Logo & Royal Proclamation (Official Dzongkha & English Brand Display) */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
            <div className="size-12 sm:size-14 rounded-2xl bg-white border border-slate-200/90 p-1 shadow-xs grid place-items-center transition duration-200 group-hover:scale-105 shrink-0">
              <img src={logo} alt="Bhutan Health Trust Fund Emblem" className="h-full w-full object-contain" />
            </div>
            <div className="leading-tight shrink-0">
              {/* Official Dzongkha Calligraphy Inscription from Logo Emblem */}
              <div className="font-dzongkha text-xs sm:text-[13px] font-bold text-amber-950 tracking-normal leading-tight group-hover:text-emerald-900 transition">
                ༄༅༎ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ ༎
              </div>
              <div className="text-primary font-black text-sm sm:text-base lg:text-lg tracking-tight whitespace-nowrap group-hover:text-primary/90 mt-0.5">
                BHUTAN HEALTH TRUST FUND
              </div>
              <div className="hidden 2xl:block text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 whitespace-nowrap">
                {t("brand_tagline", "Ensuring equitable access to essential medicines and vaccines")}
              </div>
              <div className="hidden sm:block 2xl:hidden text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">
                {t("brand_badge", "Autonomous Statutory Trust Fund • Est. 1998")}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation Links (Clean, Dignified Institutional Palette - Zero vertical text wrapping) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink-0">
            {/* 1. About Us with Dropdown */}
            <div
              className="relative py-2 shrink-0"
              onMouseEnter={() => setOpenDropdown("about")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/about"
                className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm rounded-full transition-all duration-150 ${
                  location.pathname === "/about" || location.pathname.startsWith("/about/")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-700 font-semibold hover:text-primary hover:bg-slate-100/70"
                }`}
              >
                <span className="whitespace-nowrap">{t("nav_about_us", "About Us")}</span>
                <ChevronDown className="size-3 2xl:size-3.5 text-slate-400 group-hover:text-primary transition-transform duration-200 shrink-0" />
              </Link>

              {openDropdown === "about" && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-elevated border border-border p-2 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link
                    to="/about"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Landmark className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{t("nav_about_overview", "About Us Overview")}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{t("nav_about_overview_desc", "Founding narrative & 26-year mission")}</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/organization"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Target className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{t("nav_organization", "Organization & Organogram")}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{t("nav_organization_desc", "Mandate, Vision, Mission & Organizational Chart")}</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/trustees"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <ShieldCheck className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{t("nav_trustees", "Board of trustees (with photos)")}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{t("nav_trustees_desc", "Apex governing body & ministerial leadership")}</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/committees"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Scale className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{t("nav_amc", "Asset management committee")}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{t("nav_amc_desc", "Endowment stewardship & investment oversight")}</div>
                    </div>
                  </Link>
                  <Link
                    to="/about/secretariat"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Users className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{t("nav_secretariat", "Secretariat")}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{t("nav_secretariat_desc", "Directorate leadership & operational officers")}</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 2. Our Story (Direct Link) */}
            <Link
              to="/our-story"
              className={`whitespace-nowrap shrink-0 inline-flex items-center px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm rounded-full transition-all duration-150 ${
                location.pathname === "/our-story"
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-slate-700 font-semibold hover:text-primary hover:bg-slate-100/70"
              }`}
            >
              <span className="whitespace-nowrap">{t("nav_our_story", "Our Story")}</span>
            </Link>

            {/* 3. Impact with Dropdown */}
            <div
              className="relative py-2 shrink-0"
              onMouseEnter={() => setOpenDropdown("work")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/our-impact"
                className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm rounded-full transition-all duration-150 ${
                  location.pathname.startsWith("/our-impact") || location.pathname.startsWith("/our-work")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-700 font-semibold hover:text-primary hover:bg-slate-100/70"
                }`}
              >
                <span className="whitespace-nowrap">{t("nav_impact", "Impact")}</span>
                <ChevronDown className="size-3 2xl:size-3.5 text-slate-400 group-hover:text-primary transition-transform duration-200 shrink-0" />
              </Link>

              {openDropdown === "work" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-elevated border border-border p-2 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link
                    to="/our-impact"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Activity className="size-4 text-primary shrink-0" />
                    <div>
                      <div>Healthcare Impact Overview</div>
                      <div className="text-[10px] text-muted-foreground font-normal">20 Dzongkhags & 100% Free Coverage</div>
                    </div>
                  </Link>
                  <Link
                    to="/our-work"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Layers className="size-4 text-primary shrink-0" />
                    <div>
                      <div>Essential Medicines & Vaccines</div>
                      <div className="text-[10px] text-muted-foreground font-normal">438 Allopathic + 110 Traditional Formulations</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Resources with Full Subpages Dropdown */}
            <div
              className="relative py-2 shrink-0"
              onMouseEnter={() => setOpenDropdown("resources")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/resources"
                className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm rounded-full transition-all duration-150 ${
                  location.pathname.startsWith("/resources") || location.pathname.startsWith("/reports")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-700 font-semibold hover:text-primary hover:bg-slate-100/70"
                }`}
              >
                <span className="whitespace-nowrap">{t("nav_resources", "Resources")}</span>
                <ChevronDown className="size-3 2xl:size-3.5 text-slate-400 group-hover:text-primary transition-transform duration-200 shrink-0" />
              </Link>

              {openDropdown === "resources" && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-elevated border border-border p-2 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link
                    to="/resources"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <BookOpen className="size-4 text-primary shrink-0" />
                    <div>
                      <div className="font-bold">{isDzongkha ? "གཞུང་འབྲེལ་ཡིག་ཆ་མཛོད་ཁང་།" : "Official Publications Archive"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "ཁྲིམས་མཐུན་ཡིག་ཆའི་མཛོད་ཁང་ལྟེ་བ།" : "Central statutory document repository"}</div>
                    </div>
                  </Link>
                  <div className="h-px bg-border/60 my-1" />
                  <Link
                    to="/resources/annual-reports"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <FileText className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "ལོ་བསྟར་སྙན་ཞུ།" : "Annual Reports"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "ལོ་རིམ་ལག་ལེན་དང་བདག་སྐྱོང་སྙན་ཞུ།" : "Yearly operational filings & governance"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/resources/financial-reports"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <FileSpreadsheet className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "དངུལ་རྩིས་གསལ་བཤད།" : "Financial Statements"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "མ་རྩའི་འོང་འབབ་དང་རྩིས་ཁྲ།" : "Portfolio yields & balance sheets"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/resources/audit-reports"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <ShieldCheck className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "རྩིས་ཞིབ་གྲུབ་པའི་སྙན་ཞུ།" : "Certified Audit Reports"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "རྒྱལ་གཞུང་རྩིས་ཞིབ་དབང་འཛིན་གྱི་ལག་ཁྱེར།" : "Royal Audit Authority (RAA) certificates"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/resources/window-financing"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Scale className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "སྒོ་འབྱེད་དངུལ་རྩིས་མཁོ་འདོན།" : "Window Financing Requisitions"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "བཞི་དཔྱའི་སྨན་རྫས་མཁོ་སྒྲུབ་གཏོང་ལེན།" : "Quarterly DMS procurement releases"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/resources/advocacy"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Megaphone className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "རྒྱབ་སྐྱོར་དང་བརྡ་དོན་རྒྱུ་ཆས།" : "Advocacy & IEC Materials"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "མི་སྡེའི་འཕྲོད་བསྟེན་ལམ་སྟོན་དང་ཡིག་ཆས།" : "Community health guides & brochures"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/resources/other-publications"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Layers className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "སྨན་ཐོ་དང་དཔེ་སྐྲུན་གཞན་དག" : "Formularies & Other Publications"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "རྒྱལ་ཡོངས་སྨན་ཐོ་དང་བཅའ་ཁྲིམས།" : "Drug formularies & strategic charters"}</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 5. News and Events with Full Subpages Dropdown */}
            <div
              className="relative py-2 shrink-0"
              onMouseEnter={() => setOpenDropdown("news")}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to="/news"
                className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm rounded-full transition-all duration-150 ${
                  location.pathname.startsWith("/news")
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-700 font-semibold hover:text-primary hover:bg-slate-100/70"
                }`}
              >
                <span className="whitespace-nowrap">{t("nav_news", "News and Events")}</span>
                <ChevronDown className="size-3 2xl:size-3.5 text-slate-400 group-hover:text-primary transition-transform duration-200 shrink-0" />
              </Link>

              {openDropdown === "news" && (
                <div className="absolute top-full left-0 w-76 bg-white rounded-2xl shadow-elevated border border-border p-2 space-y-1 animate-in fade-in duration-150 z-50">
                  <Link
                    to="/news"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Activity className="size-4 text-primary shrink-0" />
                    <div>
                      <div className="font-bold">{isDzongkha ? "ད་ལྟོའི་གནས་ཚུལ་དང་ རྒྱང་བསྒྲགས།" : "Latest News & BBS Dispatches"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "ས་གནས་གནས་ཚུལ་དང་ རྒྱལ་ཡོངས་སྙན་ཞུ།" : "Field coverage & national reports"}</div>
                    </div>
                  </Link>
                  <div className="h-px bg-border/60 my-1" />
                  <Link
                    to="/news/announcements"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Megaphone className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "གསར་འགོད་གསལ་བསྒྲགས་དང་ བརྡ་ཐོ།" : "Press Releases & Announcements"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "དྲུང་ཆེན་ཡིག་ཚང་གི་བཀོད་རྒྱ།" : "Official secretariat circulars"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/news/events"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Calendar className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "གཞུང་འབྲེལ་མཛད་སྒོའི་ཟླ་ཐོ།" : "Official Events Calendar"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "ལོ་བསྟར་མ་དངུལ་ཉིན་མ་དང་ ཞལ་འདེབས་ལས་རིམ།" : "Annual BHTF Day & RSEB Mobilization"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/news/careers"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Briefcase className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "ལཱ་གཡོག་དང་ གྲོས་བསྟུན་པའི་གོ་སྐབས།" : "Careers & Consultancies"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "གཞུང་འབྲེལ་ས་སྟོང་དང་ རིན་བསྡུར་བརྡ་ཐོ།" : "Official vacancies & RFP tenders"}</div>
                    </div>
                  </Link>
                  <Link
                    to="/news/media"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-soft-blue text-xs font-semibold text-foreground transition"
                  >
                    <Sparkles className="size-4 text-primary shrink-0" />
                    <div>
                      <div>{isDzongkha ? "བརྙན་དཔར་མཛོད་ཁང་།" : "Media Gallery"}</div>
                      <div className="text-[10px] text-muted-foreground font-normal">{isDzongkha ? "ས་གནས་འཕྲོད་བསྟེན་གྱི་པར་རིས།" : "High-resolution field photo archive"}</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Contact Us (Direct Link) */}
            <Link
              to="/contact"
              className={`whitespace-nowrap shrink-0 inline-flex items-center px-2.5 2xl:px-3.5 py-1.5 text-xs 2xl:text-sm rounded-full transition-all duration-150 ${
                location.pathname === "/contact"
                  ? "bg-primary/10 text-primary font-bold"
                  : "text-slate-700 font-semibold hover:text-primary hover:bg-slate-100/70"
              }`}
            >
              <span className="whitespace-nowrap">{t("nav_contact", "Contact Us")}</span>
            </Link>
          </nav>

          {/* Action CTAs: Donate in Sovereign Institutional Teal */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/donate"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#0B4F42] hover:bg-[#073C32] px-4 2xl:px-5 py-2 text-xs 2xl:text-sm font-bold text-white shadow-sm ring-1 ring-emerald-700/40 transition active:scale-95 whitespace-nowrap shrink-0"
            >
              <Heart className="size-3.5 2xl:size-4 fill-current shrink-0 text-amber-300" />
              <span>{t("nav_donate", "Donate")}</span>
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

        {/* Mobile Navigation Drawer with Accordion Subpages */}
        {mobileMenuOpen && (
          <nav className="xl:hidden border-t border-border bg-white animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
            <div className="container-page py-4 flex flex-col space-y-1">
              {/* Mobile Drawer Language Switcher Bar */}
              <div className="flex items-center justify-between px-3 pt-1 pb-3 border-b border-border/60 mb-2">
                <span className="font-bold text-xs uppercase tracking-wider text-muted-foreground">
                  {isDzongkha ? "འགྲུལ་བསྐྱོད་ཐོ་དེབ།" : "Navigation Menu"}
                </span>
                <button
                  type="button"
                  onClick={toggleLang}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition active:scale-95"
                >
                  <Globe className="size-3.5 text-emerald-700" />
                  <span className={isDzongkha ? "font-bold" : "font-dzongkha text-xs"}>
                    {lang === "en" ? "རྫོང་ཁ་ལུ་སོར།" : "Switch to English"}
                  </span>
                </button>
              </div>

              <Link
                to="/"
                className="px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg"
              >
                {t("nav_home", "Home")}
              </Link>

              {/* Accordion 1: About Us */}
              <div className="border-b border-border/60 pb-1">
                <button
                  onClick={() => toggleMobileSection("about")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg text-left"
                >
                  <span>{t("nav_about_us", "About Us")}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      mobileExpandedSection === "about" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "about" && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border border-border/40">
                    <Link
                      to="/about"
                      className="block py-1.5 px-2 text-xs font-semibold text-primary hover:underline"
                    >
                      • {t("nav_about_overview", "About Us Overview")}
                    </Link>
                    <Link
                      to="/about/organization"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {t("nav_organization", "Organization & Organogram")}
                    </Link>
                    <Link
                      to="/about/trustees"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {t("nav_trustees", "Board of trustees (with photos)")}
                    </Link>
                    <Link
                      to="/about/committees"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {t("nav_amc", "Asset management committee")}
                    </Link>
                    <Link
                      to="/about/secretariat"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {t("nav_secretariat", "Secretariat")}
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct Link: Our Story */}
              <Link
                to="/our-story"
                className="px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg border-b border-border/60"
              >
                {t("nav_our_story", "Our Story")}
              </Link>

              {/* Accordion 2: Impact */}
              <div className="border-b border-border/60 pb-1">
                <button
                  onClick={() => toggleMobileSection("work")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg text-left"
                >
                  <span>{t("nav_impact", "Impact")}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      mobileExpandedSection === "work" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "work" && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border border-border/40">
                    <Link
                      to="/our-impact"
                      className="block py-1.5 px-2 text-xs font-semibold text-primary hover:underline"
                    >
                      • {isDzongkha ? "འཕྲོད་བསྟེན་གྲུབ་འབྲས་སྤྱི་མཐོང་ (རྫོང་ཁག་ ༢༠)" : "Healthcare Impact Overview (20 Dzongkhags)"}
                    </Link>
                    <Link
                      to="/our-work"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ ༤༣༨ དང་ སྨན་ཁབ།" : "438 Essential Medicines & Vaccines"}
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 3: Resources (All 6 Subpages) */}
              <div className="border-b border-border/60 pb-1">
                <button
                  onClick={() => toggleMobileSection("resources")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg text-left"
                >
                  <span>{t("nav_resources", "Resources")}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      mobileExpandedSection === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "resources" && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border border-border/40">
                    <Link
                      to="/resources"
                      className="block py-1.5 px-2 text-xs font-bold text-primary hover:underline"
                    >
                      • {isDzongkha ? "གཞུང་འབྲེལ་ཡིག་ཆ་མཛོད་ཁང་།" : "All Statutory Publications Archive"}
                    </Link>
                    <Link
                      to="/resources/annual-reports"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "ལོ་བསྟར་སྙན་ཞུ།" : "Annual Reports"}
                    </Link>
                    <Link
                      to="/resources/financial-reports"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "དངུལ་རྩིས་གསལ་བཤད།" : "Financial Statements"}
                    </Link>
                    <Link
                      to="/resources/audit-reports"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "རྩིས་ཞིབ་གྲུབ་པའི་སྙན་ཞུ།" : "Certified Audit Reports (RAA)"}
                    </Link>
                    <Link
                      to="/resources/window-financing"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "སྒོ་འབྱེད་དངུལ་རྩིས་མཁོ་འདོན།" : "Window Financing Requisitions"}
                    </Link>
                    <Link
                      to="/resources/advocacy"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "རྒྱབ་སྐྱོར་དང་བརྡ་དོན་རྒྱུ་ཆས།" : "Advocacy & IEC Materials"}
                    </Link>
                    <Link
                      to="/resources/other-publications"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "སྨན་ཐོ་དང་དཔེ་སྐྲུན་གཞན་དག" : "Formularies & Other Publications"}
                    </Link>
                  </div>
                )}
              </div>

              {/* Accordion 4: News and Events */}
              <div className="border-b border-border/60 pb-1">
                <button
                  onClick={() => toggleMobileSection("news")}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg text-left"
                >
                  <span>{t("nav_news", "News and Events")}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform duration-200 ${
                      mobileExpandedSection === "news" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {mobileExpandedSection === "news" && (
                  <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/70 rounded-xl my-1 border border-border/40">
                    <Link
                      to="/news"
                      className="block py-1.5 px-2 text-xs font-bold text-primary hover:underline"
                    >
                      • {isDzongkha ? "ད་ལྟོའི་གནས་ཚུལ་དང་ རྒྱང་བསྒྲགས།" : "Latest News & BBS Dispatches"}
                    </Link>
                    <Link
                      to="/news/announcements"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "གསར་འགོད་གསལ་བསྒྲགས་དང་ བརྡ་ཐོ།" : "Press Releases & Announcements"}
                    </Link>
                    <Link
                      to="/news/events"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "གཞུང་འབྲེལ་མཛད་སྒོའི་ཟླ་ཐོ།" : "Official Events Calendar"}
                    </Link>
                    <Link
                      to="/news/careers"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "ལཱ་གཡོག་དང་ གྲོས་བསྟུན་པའི་གོ་སྐབས།" : "Career Opportunities & Consultancies"}
                    </Link>
                    <Link
                      to="/news/media"
                      className="block py-1.5 px-2 text-xs font-semibold text-foreground/80 hover:underline"
                    >
                      • {isDzongkha ? "བརྙན་དཔར་མཛོད་ཁང་།" : "Media Gallery"}
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/track-donation"
                className="px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg"
              >
                {isDzongkha ? "ཞལ་འདེབས་བདའ་ཟུན།" : "Track Donation"}
              </Link>
              <Link
                to="/contact"
                className="px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted rounded-lg"
              >
                {t("nav_contact", "Contact Us")}
              </Link>
              <Link
                to="/donate"
                className="mx-2 mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B4F42] hover:bg-[#073C32] px-4 py-2.5 text-sm font-bold text-white shadow-sm"
              >
                <Heart className="size-4 fill-current text-amber-300" />
                <span>{isDzongkha ? "ཞལ་འདེབས་ཕུལ། (གཞུང་གི་མཉམ་སྦྱོར)" : "Donate (1:1 Sovereign Match)"}</span>
              </Link>

              {/* Mobile Quick Support Info */}
              <div className="pt-4 px-3 text-xs text-muted-foreground space-y-2 border-t border-border mt-3">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-emerald-700" />
                  <span>02-338636 / 338637 / 77348083</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="size-3.5 text-emerald-700" />
                  <span>bhtf@bhtf.bt</span>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
