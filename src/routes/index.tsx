import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  ClipboardCheck,
  FileText,
  ShieldCheck,
  Megaphone,
  HandHeart,
  ArrowRight,
  BarChart3,
  Pill,
  Lock,
  Sparkles,
  Calendar,
  MapPin,
  Syringe,
  Activity,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Download,
  Building,
  ArrowUpRight,
  Award,
  Zap,
  Globe2,
  ThermometerSnowflake,
} from "lucide-react";
import hero from "@/assets/hero-bhutan.jpg";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";
import { DzongkhagExplorer } from "@/components/dzongkhag-map";
import { EndowmentCalculator } from "@/components/endowment-calculator";
import { CommodityTracker } from "@/components/commodity-tracker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      {
        name: "description",
        content:
          "Bhutan Health Trust Fund sustainably finances essential medicines and vaccines for every Bhutanese citizen across all 20 Dzongkhags.",
      },
    ],
  }),
  component: Index,
});

const quickAccess = [
  {
    icon: Users,
    label: "Royal Mandate & About",
    desc: "Charter, Board of Trustees & Governance",
    to: "/about",
    color: "bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20",
    borderHover: "hover:border-emerald-400",
    bgHover: "hover:bg-emerald-50/50",
  },
  {
    icon: Pill,
    label: "Essential Medicines",
    desc: "120+ Vital Primary Health Drugs",
    to: "/our-work",
    color: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/20",
    borderHover: "hover:border-amber-400",
    bgHover: "hover:bg-amber-50/50",
  },
  {
    icon: Syringe,
    label: "Universal Vaccines",
    desc: "100% Childhood & Routine Coverage",
    to: "/our-work",
    color: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20",
    borderHover: "hover:border-blue-400",
    bgHover: "hover:bg-blue-50/50",
  },
  {
    icon: FileText,
    label: "Reports & Audits",
    desc: "Statutory Financial & RAA Audits",
    to: "/reports",
    color: "bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md shadow-purple-500/20",
    borderHover: "hover:border-purple-400",
    bgHover: "hover:bg-purple-50/50",
  },
  {
    icon: ShieldCheck,
    label: "Governance & Policies",
    desc: "Trust Regulations & Ethics Policies",
    to: "/policies",
    color: "bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-500/20",
    borderHover: "hover:border-teal-400",
    bgHover: "hover:bg-teal-50/50",
  },
  {
    icon: HandHeart,
    label: "Donate & Double (1:1)",
    desc: "Every 1 Nu. Matched by Royal Government",
    to: "/get-involved",
    color: "bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/20",
    borderHover: "hover:border-rose-400",
    bgHover: "hover:bg-rose-50/50",
  },
];

const keyStats = [
  {
    value: "780,000+",
    label: "Citizens Protected",
    desc: "Universal health coverage for every citizen across the Kingdom",
    icon: Users,
    gradient: "from-emerald-950/80 via-slate-900 to-emerald-950/60 border-emerald-500/40 text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  {
    value: "120+",
    label: "Essential Medicines",
    desc: "Uninterrupted national supply of primary and emergency drugs",
    icon: Pill,
    gradient: "from-amber-950/80 via-slate-900 to-amber-950/60 border-amber-500/40 text-amber-400",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  {
    value: "20 / 20",
    label: "Dzongkhags Covered",
    desc: "Direct supply line to all remote Primary Health Units (BHUs)",
    icon: MapPin,
    gradient: "from-blue-950/80 via-slate-900 to-blue-950/60 border-blue-500/40 text-blue-400",
    badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  },
  {
    value: "100%",
    label: "Childhood Vaccines",
    desc: "Routine infant immunizations fully guaranteed in perpetuity",
    icon: Syringe,
    gradient: "from-rose-950/80 via-slate-900 to-rose-950/60 border-rose-500/40 text-rose-400",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
];

const featuredNews = [
  {
    slug: "nationwide-vaccination-2024",
    img: newsVaccine,
    category: "Vaccines",
    title: "BHTF Secures Full Financing for Nationwide Immunization Drive",
    desc: "Securing uninterrupted supply chains for pediatric vaccines and seasonal boosters across remote high-altitude communities in Gasa and Trashiyangtse.",
    date: "August 2026",
    readTime: "3 min read",
  },
  {
    slug: "primary-healthcare-expansion",
    img: newsCommunity,
    category: "Healthcare",
    title: "Strengthening Primary Health Units Across All 20 Dzongkhags",
    desc: "Over Nu. 180M disbursed to guarantee essential medicine buffers in remote health posts before winter seasonal isolations.",
    date: "July 2026",
    readTime: "4 min read",
  },
  {
    slug: "annual-report-2023-released",
    img: newsReport,
    category: "Publications",
    title: "Statutory Financial & Operational Audit Report Released",
    desc: "Royal Audit Authority certifies clean financial statements with full transparency on endowment returns and healthcare disbursements.",
    date: "June 2026",
    readTime: "5 min read",
  },
];

function Index() {
  return (
    <div className="flex flex-col gap-0">
      {/* 1. Ultra-Premium Colorful Hero Section with Floating Live Impact Showcase */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        {/* Background Image with Ambient Saffron & Emerald Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Bhutan Himalayas & Monasteries"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center opacity-30 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
        </div>

        {/* Ambient Glowing Orbs */}
        <div className="absolute top-10 left-1/4 h-96 w-96 bg-gradient-to-br from-amber-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 h-96 w-96 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-20 sm:pb-36 lg:pt-24 lg:pb-44">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headline, Subtitle & Action CTAs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Royal Badge with Glow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/25 via-emerald-500/20 to-teal-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold shadow-md shadow-amber-500/10 backdrop-blur-md">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Royal Charter Sovereign Health Trust of Bhutan</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Sustaining Life-Saving Healthcare for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-200">
                  Every Citizen of Bhutan
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-2xl">
                The Bhutan Health Trust Fund guarantees an uninterrupted, sustainable supply of essential
                medicines and universal vaccines across all 20 Dzongkhags—protecting Gross National Happiness and health equity in perpetuity.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm font-black shadow-xl shadow-emerald-700/30 hover:shadow-2xl transition-all duration-150 cursor-pointer active:scale-95 border border-emerald-400/40"
                >
                  <HandHeart className="h-4 w-4 fill-white" />
                  <span>Support & Double Your Pledge (1:1)</span>
                </Link>

                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold border border-white/25 backdrop-blur-md transition cursor-pointer"
                >
                  <span>Royal Charter Mandate</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/90 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-bold">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Statutory Sovereign Trust
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-amber-400" /> Ring-Fenced Health Corpus
                </span>
                <span className="flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-teal-400" /> Royal Audit Authority Certified
                </span>
              </div>
            </div>

            {/* Right Column: Floating Majestic Glass Live Impact Corridor (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-emerald-950/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-5 relative overflow-hidden">
                {/* Header Strip inside Floating Box */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                      Sovereign Health Corpus
                    </span>
                  </div>
                  <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    1:1 RGOB Matched
                  </span>
                </div>

                {/* Corpus Main Number */}
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-medium">Perpetual Health Endowment:</span>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-emerald-300 font-mono tracking-tight">
                    Nu. 3,248,500,000
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Capital invested to generate permanent annual health procurement yields.
                  </p>
                </div>

                {/* 3 Floating Live Stream Cards */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-emerald-500/30 hover:border-emerald-400 transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 grid place-items-center shrink-0">
                        <Syringe className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">Universal Routine Vaccines</div>
                        <div className="text-[11px] text-emerald-400">100% Childhood Coverage (14 Antigens)</div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-white font-mono">Nu. 68.5M</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-amber-500/30 hover:border-amber-400 transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-amber-500/20 text-amber-400 grid place-items-center shrink-0">
                        <Pill className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">120+ Essential Medicines</div>
                        <div className="text-[11px] text-amber-400">Zero Stockout Buffer across 205 Gewogs</div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-white font-mono">Nu. 145.0M</span>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-blue-500/20 text-blue-400 grid place-items-center shrink-0">
                        <ThermometerSnowflake className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-white">Alpine Cold Chain Logistics</div>
                        <div className="text-[11px] text-blue-400">High-Altitude Solar Refrigeration</div>
                      </div>
                    </div>
                    <span className="text-xs font-black text-white font-mono">Nu. 24.2M</span>
                  </div>
                </div>

                {/* Instant Action */}
                <div className="pt-2">
                  <Link
                    to="/get-involved"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition active:scale-95"
                  >
                    <Sparkles className="h-4 w-4 fill-slate-950" />
                    <span>Explore Sovereign Doubler Simulator →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Quick Access Navigation Matrix with Colorful Glow */}
      <section className="relative z-20 -mt-12 sm:-mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white/98 rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-200/90 p-5 sm:p-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 backdrop-blur-xl">
          {quickAccess.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`group flex flex-col items-center text-center p-4 rounded-2xl border border-slate-200/60 ${item.borderHover} ${item.bgHover} transition-all duration-200 hover:shadow-md hover:-translate-y-1`}
            >
              <div
                className={`h-12 w-12 rounded-2xl grid place-items-center mb-3 ${item.color} group-hover:scale-110 transition duration-200`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h2 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                {item.label}
              </h2>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight hidden sm:block">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. National Impact Metrics Bar with 4 Vibrant Thematic Gradients */}
      <section className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400 block mb-2">
                Measurable Impact & Royal Stewardship
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Guaranteed Healthcare Sovereignty
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2">
                Delivering reliable funding for universal primary healthcare since establishment under Royal Vision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-b ${stat.gradient} rounded-2xl p-6 border flex flex-col items-center text-center space-y-2.5 shadow-lg transition duration-200 hover:scale-105`}
                >
                  <div className={`h-12 w-12 rounded-2xl border ${stat.badge} grid place-items-center mb-1 shadow-md`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-sm font-extrabold">{stat.label}</div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive 6 Health Commodities Pipeline */}
      <section className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CommodityTracker />
        </div>
      </section>

      {/* 5. Interactive 20 Dzongkhags Health District Explorer */}
      <section className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DzongkhagExplorer />
        </div>
      </section>

      {/* 6. Interactive 1:1 RGOB Matching Simulator */}
      <section className="mt-20 sm:mt-28 bg-slate-50/70 border-y border-slate-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EndowmentCalculator />
        </div>
      </section>

      {/* 7. Latest News & Announcements Spotlight */}
      <section className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 block mb-2">
                Press Releases & Updates
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Latest News & Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-sm font-extrabold text-emerald-700 hover:text-emerald-800 transition"
            >
              <span>View all media articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredNews.map((item) => (
              <article
                key={item.slug}
                className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-emerald-300 transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <Calendar className="h-3 w-3" /> {item.date}
                      </span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                      <Link to="/news/$slug" params={{ slug: item.slug }}>
                        {item.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      to="/news/$slug"
                      params={{ slug: item.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition"
                    >
                      <span>Read Full Press Release</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition duration-150" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Institutional Partners & International Collaborations */}
      <section className="mt-20 sm:mt-28 border-t border-slate-200/80 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-6">
            Institutional Partners & Global Collaborators
          </span>

          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-slate-700 font-bold text-xs sm:text-sm">
            <span className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
              World Health Organization (WHO)
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
              UNICEF Bhutan
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
              The World Bank
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
              Gavi, The Vaccine Alliance
            </span>
            <span className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:bg-emerald-50/50 transition">
              Ministry of Health, RGOB
            </span>
          </div>
        </div>
      </section>

      {/* 9. Modern Call To Action Banner */}
      <section className="mt-6 mb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl border border-emerald-500/30">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold backdrop-blur-md border border-white/20">
              <HandHeart className="h-3.5 w-3.5" />
              <span>Gross National Happiness in Action</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              Invest in the Eternal Health of the Kingdom of Bhutan
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl font-normal">
              Your contribution directly builds the permanent endowment, ensuring that no hospital or remote
              health clinic in Bhutan ever runs out of life-saving medicines or vaccines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-xl transition active:scale-95"
              >
                <HandHeart className="h-4 w-4 fill-slate-950" />
                <span>Make a Donation Now (1:1 Matched)</span>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition"
              >
                <span>Inquire with Secretariat</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
