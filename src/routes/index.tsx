import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Users,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowRight,
  Pill,
  Syringe,
  FileText,
  Calendar,
  Briefcase,
  CheckCircle2,
  Download,
  Activity,
  HeartPulse,
  Building2,
  Award,
  Stethoscope,
  Coins,
  MapPin,
  Landmark,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getPublicImpactMetrics, getPublicNews, getPublicPage } from "@/lib/api/public.functions";
import type { ImpactMetric, NewsArticle, PageBlockSection } from "@/lib/db/schema";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

import kingHeroWidescreen from "@/assets/king_hero_widescreen.jpg";

// Client Field Photos
import imgDispensary from "@/assets/field/bhtf_dispensary_pharmacist.jpg";
import imgCubicles from "@/assets/field/bhtf_medicine_cubicles.jpg";
import imgCitizen from "@/assets/field/bhtf_citizen_receiving_medicine.jpg";
import imgCentralStore from "@/assets/field/bhtf_central_store.jpg";
import imgBbs from "@/assets/field/bhtf_bbs_broadcast.jpg";
import imgVaccineVial from "@/assets/field/bhtf_flu_vaccine_vial.jpg";
import imgTraditionalMed from "@/assets/field/bhtf_traditional_medicine.png";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";
import newsVaccine from "@/assets/news-vaccine.jpg";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const [metrics, news, customPage] = await Promise.all([
        getPublicImpactMetrics().catch(() => []),
        getPublicNews().catch(() => []),
        getPublicPage({ data: { slug: "home" } }).catch(() => null),
      ]);
      return {
        liveMetrics: metrics || [],
        liveNews: news || [],
        customPage,
      };
    } catch {
      return {
        liveMetrics: [],
        liveNews: [],
        customPage: null,
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Bhutan Health Trust Fund — Building a Healthier Bhutan" },
      {
        name: "description",
        content:
          "Bhutan Health Trust Fund sustainably finances essential medicines and vaccines for every Bhutanese citizen across all 20 Dzongkhags.",
      },
    ],
  }),
  component: HomePage,
});

const QUICK_LINKS = [
  {
    icon: Pill,
    label: "National Essential Medicines",
    sub: "438 Modern Formulations",
    color: "bg-soft-blue text-primary",
    to: "/our-work",
  },
  {
    icon: Syringe,
    label: "Vaccine Security",
    sub: "100% Childhood & Flu",
    color: "bg-amber-50 text-amber-800 border border-amber-200/60",
    to: "/our-work",
  },
  {
    icon: Sparkles,
    label: "Traditional Medicine",
    sub: "110 so-wai rigpa formulations",
    color: "bg-soft-green text-[oklch(0.45_0.15_155)]",
    to: "/our-work",
  },
  {
    icon: ShieldCheck,
    label: "Universal Access",
    sub: "100% Free at Point of Care",
    color: "bg-emerald-50 text-emerald-800 border border-emerald-200/60",
    to: "/our-work",
  },
  {
    icon: Coins,
    label: "Window Financing",
    sub: "Quarterly Releases",
    color: "bg-teal-50 text-teal-800 border border-teal-200/60",
    to: "/our-work",
  },
];

const STATS = [
  { value: "Nu. 4.8B+", label: "Sovereign Endowment", sub: "Ring-fenced principal", icon: ShieldCheck },
  { value: "100%", label: "Free Primary Healthcare", sub: "Zero out-of-pocket costs", icon: Heart },
  { value: "438 + 110", label: "National Essential Medicines and Traditional Medicines", sub: "", icon: Pill },
  { value: "20 / 20", label: "Dzongkhags Covered", sub: "205 gewog health units", icon: Users },
  { value: "1:1", label: "Sovereign Match", sub: "Guaranteed by RGoB", icon: Landmark },
];

const NEWS = [
  {
    title: "BBS Special Report: BHTF Ensures Unbroken Pharmaceutical Reserves Across Remote Gewogs",
    date: "14 October 2026",
    img: imgBbs,
    to: "/news",
    source: "BBS TV News",
  },
  {
    title: "Annual Seasonal Influenza Vaccination Rollout Achieves 97.4% Target Coverage",
    date: "28 September 2026",
    img: imgVaccineVial,
    to: "/news",
    source: "MOH / BHTF",
  },
  {
    title: "Expansion of Indigenous so-wai rigpa Therapies Across Regional Traditional Hospitals",
    date: "15 September 2026",
    img: imgTraditionalMed,
    to: "/news",
    source: "Traditional Medicine Division",
  },
];

const UPCOMING_EVENTS = [
  {
    month: "NOV",
    day: "11",
    title: "Annual BHTF Day 2026",
    desc: "Commemoration of the Sovereign Healthcare Endowment & Public Accountability Filing.",
    place: "Clock Tower & BHTF Headquarters, Thimphu",
  },
  {
    month: "DEC",
    day: "17",
    title: "National Crowd Fundraising Initiative",
    desc: "Strategic public health mobilization in collaboration with the Royal Securities Exchange of Bhutan (RSEB).",
    place: "RSEB Financial Centre, Thimphu & Nationwide Online",
  },
];

const FIELD_DISPATCHES = [
  {
    img: imgDispensary,
    tag: "Hospital Outpatient Dispensary",
    title: "Essential Medicines Dispensed Free of Charge",
    caption: "Uniformed hospital pharmacists dispense verified pharmaceuticals directly to citizens under royal mandate.",
    badge: "100% Free at Point of Delivery",
  },
  {
    img: imgCubicles,
    tag: "District Hospital Inventory",
    title: "Organized Cubicle Storage & Batch Control",
    caption: "Modular inventory cubicles maintaining zero-stockout levels of essential medicines in district health centers.",
    badge: "Zero Stockout Protocol",
  },
  {
    img: imgCitizen,
    tag: "Universal Healthcare Guarantee",
    title: "No Citizen Billed for Care",
    caption: "A Bhutanese citizen receiving life-saving prescription medicines at the hospital counter without payment.",
    badge: "Sacred Constitutional Trust",
  },
  {
    img: imgCentralStore,
    tag: "Central Medical Store Warehouse",
    title: "Strategic Multi-Month National Reserves",
    caption: "High-capacity pallet racking shielding the Kingdom against international pharmaceutical supply chain interruptions.",
    badge: "National Supply Buffer",
  },
];

function HomePage() {
  const loaderData = Route.useLoaderData();
  const [liveMetrics, setLiveMetrics] = useState<ImpactMetric[]>(loaderData?.liveMetrics || []);
  const [liveNews, setLiveNews] = useState<NewsArticle[]>(loaderData?.liveNews || []);
  const { t, isDzongkha } = useLanguage();

  useEffect(() => {
    getPublicImpactMetrics()
      .then((res) => {
        if (res && res.length > 0) setLiveMetrics(res);
      })
      .catch(() => {});
    getPublicNews()
      .then((res) => {
        if (res && res.length > 0) setLiveNews(res);
      })
      .catch(() => {});
  }, []);

  const localizedQuickLinks = [
    {
      icon: Pill,
      label: t("ql_essential_meds", "National Essential Medicines"),
      sub: t("ql_essential_meds_sub", "438 Modern Formulations"),
      color: "bg-soft-blue text-primary",
      to: "/our-work",
    },
    {
      icon: Syringe,
      label: t("ql_vaccine_sec", "Vaccine Security"),
      sub: t("ql_vaccine_sec_sub", "100% Childhood & Flu"),
      color: "bg-amber-50 text-amber-800 border border-amber-200/60",
      to: "/our-work",
    },
    {
      icon: Sparkles,
      label: t("ql_traditional_med", "Traditional Medicine"),
      sub: t("ql_traditional_med_sub", "110 so-wai rigpa formulations"),
      color: "bg-soft-green text-[oklch(0.45_0.15_155)]",
      to: "/our-work",
    },
    {
      icon: ShieldCheck,
      label: isDzongkha ? "ཡོངས་ཁྱབ་ཐོབ་སྐལ།" : "Universal Access",
      sub: isDzongkha ? "༡༠༠% རིན་མེད་ཞབས་ཏོག" : "100% Free at Point of Care",
      color: "bg-emerald-50 text-emerald-800 border border-emerald-200/60",
      to: "/our-work",
    },
    {
      icon: Coins,
      label: t("ql_window_financing", "Window Financing"),
      sub: isDzongkha ? "བཞི་དཔྱའི་མ་དངུལ་བཀྲམ་སྤེལ།" : "Quarterly Releases",
      color: "bg-teal-50 text-teal-800 border border-teal-200/60",
      to: "/our-work",
    },
  ];

  const defaultLocalizedStats = [
    {
      value: "Nu. 4.8B+",
      label: t("stat_sovereign_endowment", "Sovereign Endowment"),
      sub: t("stat_ringfenced", "Ring-fenced principal"),
      icon: ShieldCheck,
    },
    {
      value: "100%",
      label: t("stat_free_healthcare", "Free Primary Healthcare"),
      sub: t("stat_zero_cost", "Zero out-of-pocket costs"),
      icon: Heart,
    },
    {
      value: "438 + 110",
      label: t("stat_meds_formulations", "National Essential Medicines and Traditional Medicines"),
      sub: "",
      icon: Pill,
    },
    {
      value: "20 / 20",
      label: t("stat_dzongkhags_covered", "Dzongkhags Covered"),
      sub: t("stat_phu_units", "205 gewog health units"),
      icon: Users,
    },
    {
      value: "1:1",
      label: isDzongkha ? "གཞུང་གི་འདྲ་མཉམ་རྒྱབ་སྐྱོར།" : "Sovereign Match",
      sub: isDzongkha ? "འབྲུག་གཞུང་གིས་ཉེན་ལེན་ཡོདཔ།" : "Guaranteed by RGoB",
      icon: Landmark,
    },
  ];

  // Resolve icon component from string name
  const resolveMetricIcon = (iconName?: string | null) => {
    switch (iconName) {
      case "HeartPulse":
      case "Heart":
        return Heart;
      case "Pill":
        return Pill;
      case "Syringe":
        return Syringe;
      case "Users":
        return Users;
      case "ShieldCheck":
        return ShieldCheck;
      case "Coins":
        return Coins;
      case "Building2":
        return Building2;
      case "Award":
        return Award;
      case "Activity":
        return Activity;
      default:
        return Sparkles;
    }
  };

  // Dynamic stats merged from Admin CMS
  const localizedStats = useMemo(() => {
    const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    const metricAliasesByStat = [
      ["sovereign endowment", "endowment corpus", "endowment"],
      ["free primary healthcare", "universal access"],
      ["essential medicines", "traditional medicines", "formulary"],
      ["dzongkhags covered", "dzongkhag", "nationwide reach"],
      ["sovereign match", "government match", "rgob match"],
    ];

    return defaultLocalizedStats.map((fallback, index) => {
      const aliases = metricAliasesByStat[index] || [normalize(fallback.label)];
      const metric = liveMetrics.find((candidate) => {
        const label = normalize(candidate.label);
        return aliases.some((alias) => label.includes(normalize(alias)));
      });
      if (!metric) return fallback;
      return {
        ...fallback,
        value: metric.value || fallback.value,
        label: isDzongkha ? fallback.label : metric.label || fallback.label,
        sub: isDzongkha ? fallback.sub : metric.description || fallback.sub,
        icon: resolveMetricIcon(metric.icon),
      };
    });
  }, [liveMetrics, defaultLocalizedStats, isDzongkha]);

  // Dynamic news merged from Admin CMS
  const effectiveNews = useMemo(() => {
    const resolveNewsImage = (imgUrl?: string | null, idx: number = 0) => {
      if (!imgUrl) return [newsVaccine, newsCommunity, newsReport][idx % 3];
      if (imgUrl.includes("vaccine") || imgUrl.includes("flu")) return newsVaccine;
      if (imgUrl.includes("community") || imgUrl.includes("remote")) return newsCommunity;
      if (imgUrl.includes("report") || imgUrl.includes("annual")) return newsReport;
      if (imgUrl.includes("bbs")) return imgBbs;
      if (imgUrl.includes("traditional")) return imgTraditionalMed;
      if (imgUrl.startsWith("http") || imgUrl.startsWith("/")) return imgUrl;
      return [newsVaccine, newsCommunity, newsReport][idx % 3];
    };

    if (liveNews && liveNews.length > 0) {
      return liveNews.slice(0, 3).map((item, idx) => ({
        title: item.title,
        date: new Date(item.publishedAt || item.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        img: resolveNewsImage(item.coverImage, idx),
        to: `/news/${item.slug}`,
        source: item.author || "BHTF Communications",
      }));
    }
    return NEWS;
  }, [liveNews]);

  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION (Continuous Widescreen King Portrait Background on all devices) */}
      <section className="relative overflow-hidden min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] xl:min-h-[680px] flex items-center border-b border-border bg-[#BFA26F]">
        {/* Full Seamless Portrait Background with His Majesty on the right on all devices */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-[center_right] sm:bg-right lg:bg-center"
          style={{ backgroundImage: `url(${kingHeroWidescreen})` }}
        />

        {/* Subtle executive light scrim overlay ensuring 100% crisp typography on mobile & desktop without washing out the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF8F5]/95 via-[#FAF8F5]/85 to-transparent sm:from-[#FAF8F5]/90 sm:via-[#FAF8F5]/40 sm:to-transparent" />

        <div className="container-page py-10 sm:py-14 lg:py-20 relative z-10 w-full">
          {/* Left Column: Vision, Royal Mandate & Clean Frosted Quote */}
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              {t("home_hero_title_1", "Building a")}<br />{t("home_hero_title_2", "Healthier Bhutan")}
            </h1>

            <div className="h-1.5 w-20 sm:w-24 bg-amber-500 rounded-full my-4 sm:my-5" />

            <p className="text-sm sm:text-base lg:text-lg text-slate-900 font-medium leading-relaxed max-w-lg">
              {t(
                "home_hero_desc",
                "The Bhutan Health Trust Fund sustainably finances essential medicines and vaccines to strengthen primary healthcare and protect the well-being of every Bhutanese citizen."
              )}
            </p>

            {/* Royal Vision Callout - clean typography without box background */}
            <div className="my-5 space-y-1.5 max-w-lg">
              <p className="text-sm sm:text-base font-bold text-slate-900 italic leading-snug">
                {t(
                  "quote_king_text",
                  "“No Bhutanese should ever have to choose between their health and their livelihood.”"
                )}
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-900/15">
                <span className="size-1.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold text-slate-900">
                  {isDzongkha
                    ? "མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་ འཇིགས་མེད་སེངྒེ་དབང་ཕྱུག་མཆོག"
                    : "HM the Fourth Druk Gyalpo Jigme Singye Wangchuck"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK LINKS PILL CARDS (5 Essential Pillars) */}
      <section className="container-page mt-4 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-elevated p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 border border-border">
          {localizedQuickLinks.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-muted transition"
            >
              <div className={`size-13 rounded-full grid place-items-center ${q.color} mb-2 group-hover:scale-105 transition`}>
                <q.icon className="size-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-foreground leading-tight">{q.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{q.sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. GRADIENT STATS BAND */}
      <section className="container-page mt-12 sm:mt-16 relative" data-bhtf-section="homepage-stats">
        <SectionEditBadge
          label="Homepage Impact Metrics"
          pageSlug="home"
          sectionId="homepage-stats"
          studioHref="/admin/metrics"
        />
        <div className="bg-gradient-stats rounded-3xl p-6 sm:p-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-white shadow-elevated">
          {localizedStats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-white/10 grid place-items-center text-amber-300 shrink-0 border border-white/15">
                <s.icon className="size-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold leading-tight">{s.value}</div>
                <div className="text-xs text-white/90 font-medium leading-tight mt-0.5">{s.label}</div>
                <div className="text-[10px] text-white/60 leading-tight">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3-COLUMN SECTION: NEWS AND EVENTS | ANNOUNCEMENT | PUBLICATIONS */}
      <section className="container-page mt-14 sm:mt-16 grid lg:grid-cols-3 gap-6 relative" data-bhtf-section="homepage-news">
        {/* Col 1: NEWS AND EVENTS */}
        <div className="bg-white rounded-3xl shadow-card p-6 border border-border flex flex-col justify-between relative">
          <SectionEditBadge
            label="Homepage News & BBS Dispatches"
            pageSlug="home"
            sectionId="homepage-news"
            studioHref="/admin/news"
          />
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  Media & Dispatches
                </span>
                <h3 className="font-bold text-lg text-primary">NEWS AND EVENTS</h3>
              </div>
              <Link to="/news" className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline">
                View All <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {effectiveNews.map((n) => (
                <Link key={n.title} to={n.to} className="flex gap-3 group cursor-pointer">
                  <div className="size-20 rounded-xl overflow-hidden shadow-2xs shrink-0 border border-border bg-slate-100">
                    <img src={n.img} alt={n.title} className="size-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-snug group-hover:text-emerald-800 transition line-clamp-2">
                      {n.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1.5 font-medium">
                      <span>{n.date}</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">{n.source}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: ANNOUNCEMENT */}
        <div className="bg-white rounded-3xl shadow-card p-6 border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  Official Notices
                </span>
                <h3 className="font-bold text-lg text-primary">ANNOUNCEMENT</h3>
              </div>
              <Link to="/news/announcements" className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline">
                All Notices <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-5">
              {UPCOMING_EVENTS.map((e) => (
                <div key={e.title} className="flex gap-3.5 items-start">
                  <div className="rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center w-14 h-14 shrink-0 leading-none border border-emerald-200/80 shadow-2xs">
                    <div className="text-center">
                      <div className="text-[10px] font-black uppercase tracking-wider">{e.month}</div>
                      <div className="text-xl font-black mt-0.5">{e.day}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-snug">{e.title}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{e.desc}</p>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                      <span>📍 {e.place}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-soft-blue text-xs text-primary font-medium border border-primary/20">
            Commemorating 26 years of universal primary healthcare financing.
          </div>
        </div>

        {/* Col 3: VACANCIES */}
        <div className="bg-white rounded-3xl shadow-card p-6 border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  Official Recruitment
                </span>
                <h3 className="font-bold text-lg text-primary">VACANCIES</h3>
              </div>
              <Link to="/news/careers" className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline">
                View All <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Briefcase className="size-3.5" />
                  <span>Current Openings</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  There are currently no active vacancies or open consultancy tenders. All upcoming career opportunities, recruitment announcements, and terms of reference will be published here and advertised in national media.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Link
              to="/news/careers"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-primary text-xs font-bold transition text-center"
            >
              <span>View Career Notices</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. AUTHENTIC PHOTO FIELD DISPATCHES */}
      <section className="container-page mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
              Field Operations & Nationwide Healthcare Logistics
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIELD_DISPATCHES.map((d) => (
            <div
              key={d.title}
              className="bg-white rounded-3xl overflow-hidden border border-border shadow-card flex flex-col group hover:shadow-elevated transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={d.img}
                  alt={d.title}
                  className="size-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-primary leading-snug group-hover:text-emerald-800 transition">
                    {d.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {d.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRADITIONAL MEDICINE & THERAPIES (SO-WAI RIGPA) SHOWCASE */}
      <section className="container-page mt-16 sm:mt-20 mb-16">
        <div className="rounded-3xl bg-soft-green/60 border border-[oklch(0.85_0.08_155)] p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div className="space-y-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">
              Preserving Bhutan’s Sacred Healing Heritage: 110 Traditional Formulations
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              In accordance with Royal Charter mandate, BHTF finances not only modern pharmaceuticals but also 110 essential
              traditional medicines (so-wai rigpa) manufactured at the National Traditional Medicine Hospital in Thimphu.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: "110 Formulations", desc: "Herbal pills, powders, decoctions, and mineral remedies." },
                { title: "Traditional Therapies", desc: "Chulum herbal baths, Lang-dug herbal steam, and Dug-pob." },
                { title: "20 Dzongkhags Reach", desc: "Dispensed at traditional units in all district hospitals." },
                { title: "100% Free Access", desc: "Zero patient billing for authentic indigenous healthcare." },
              ].map((item) => (
                <div key={item.title} className="p-3 rounded-2xl bg-white/90 border border-[oklch(0.85_0.08_155)] shadow-2xs">
                  <div className="text-xs font-bold text-primary">{item.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-white aspect-[4/3] bg-white">
            <img
              src={imgTraditionalMed}
              alt="Traditional Bhutanese Medicines and Therapies (so-wai rigpa)"
              className="size-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white text-[11px] text-center font-medium">
              Authentic so-wai rigpa essential traditional medications financed by BHTF
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
