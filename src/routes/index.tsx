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
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  },
  {
    icon: Pill,
    label: "Essential Medicines",
    desc: "120+ Vital Primary Health Drugs",
    to: "/our-work",
    color: "bg-teal-500/10 text-teal-600 border-teal-200",
  },
  {
    icon: Syringe,
    label: "Universal Vaccines",
    desc: "100% Childhood & Routine Coverage",
    to: "/our-work",
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200",
  },
  {
    icon: FileText,
    label: "Reports & Audits",
    desc: "Statutory Financial & RAA Audits",
    to: "/reports",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  {
    icon: ShieldCheck,
    label: "Governance & Charter",
    desc: "Trust Regulations & Ethics Policies",
    to: "/policies",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    icon: HandHeart,
    label: "Donate & Double (1:1)",
    desc: "Every 1 Nu. Matched by Royal Government",
    to: "/get-involved",
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
];

const keyStats = [
  {
    value: "780,000+",
    label: "Citizens Protected",
    desc: "Universal health coverage for every citizen across the Kingdom",
    icon: Users,
  },
  {
    value: "120+",
    label: "Essential Medicines",
    desc: "Uninterrupted national supply of primary and emergency drugs",
    icon: Pill,
  },
  {
    value: "20 / 20",
    label: "Dzongkhags Covered",
    desc: "Direct supply line to all remote Primary Health Units (BHUs)",
    icon: MapPin,
  },
  {
    value: "100%",
    label: "Childhood Vaccines",
    desc: "Routine infant immunizations fully guaranteed in perpetuity",
    icon: Syringe,
  },
];

const corePillars = [
  {
    icon: Pill,
    title: "120+ Essential Medicines Guarantee",
    description:
      "Guarantees year-round buffer stock of vital primary healthcare medicines, antibiotics, analgesics, and emergency cardiovascular drugs for every hospital and BHU in Bhutan.",
    badge: "Primary Healthcare",
  },
  {
    icon: Syringe,
    title: "Universal Routine Childhood Vaccines",
    description:
      "Finances 100% of routine pediatric vaccines—including Pentavalent, BCG, Measles, Polio, Rotavirus, and HPV—ensuring zero preventable childhood illness outbreaks.",
    badge: "Immunization",
  },
  {
    icon: Activity,
    title: "High-Altitude Cold Chain Logistics",
    description:
      "Maintains solar-powered and temperature-monitored cold chain storage units across extreme high-altitude alpine regions like Gasa, Laya, and Lunana.",
    badge: "Supply Chain",
  },
  {
    icon: HeartHandshake,
    title: "1:1 RGOB Matching Model",
    description:
      "Every single Ngultrum contributed by donors and citizens is matched one-to-one by the Royal Government of Bhutan to build a permanent, resilient endowment fund.",
    badge: "Financial Sustainability",
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
      {/* 1. Modern Institutional Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* Background Image with Ambient Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero}
            alt="Bhutan Himalayas & Monasteries"
            width={1920}
            height={1080}
            className="h-full w-full object-cover object-center opacity-35 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-28 sm:pt-24 sm:pb-36 lg:pt-32 lg:pb-44">
          <div className="max-w-3xl space-y-6">
            {/* Royal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Royal Charter Autonomous Health Trust</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Sustaining Life-Saving Healthcare for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
                Every Citizen of Bhutan
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl">
              The Bhutan Health Trust Fund guarantees an uninterrupted, sustainable supply of essential
              medicines and universal vaccines across all 20 Dzongkhags—protecting Gross National Happiness and health equity.
            </p>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-bold shadow-lg shadow-emerald-900/30 hover:shadow-xl transition-all duration-150 cursor-pointer active:scale-95"
              >
                <HandHeart className="h-4 w-4 fill-white" />
                <span>Support & Double Your Pledge (1:1)</span>
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/20 backdrop-blur-md transition cursor-pointer"
              >
                <span>Read Royal Charter Mandate</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> Statutory Trust Fund
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-amber-400" /> Ring-Fenced Health Corpus
              </span>
              <span className="flex items-center gap-1.5">
                <BarChart3 className="h-4 w-4 text-emerald-400" /> Royal Audit Authority Certified
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Quick Access Navigation Matrix */}
      <section className="relative z-20 -mt-12 sm:-mt-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-5 sm:p-7 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {quickAccess.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="group flex flex-col items-center text-center p-3.5 sm:p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all duration-150"
            >
              <div
                className={`h-12 w-12 rounded-xl grid place-items-center mb-2.5 border ${item.color} group-hover:scale-110 transition duration-200`}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                {item.label}
              </h2>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-tight hidden sm:block">
                {item.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. National Impact Metrics Bar */}
      <section className="mt-14 sm:mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-2">
                Measurable Impact & Stewardship
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Guaranteed Healthcare Sovereignty
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Delivering reliable funding for primary healthcare since establishment under Royal Vision.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {keyStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/60 flex flex-col items-center text-center space-y-2 hover:border-emerald-500/40 transition"
                >
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 grid place-items-center mb-1">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm font-bold text-emerald-400">{stat.label}</div>
                  <p className="text-xs text-slate-400 leading-relaxed">{stat.desc}</p>
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
      <section className="mt-20 sm:mt-28 bg-slate-50 border-y border-slate-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <EndowmentCalculator />
        </div>
      </section>

      {/* 7. Latest News & Announcements Spotlight */}
      <section className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
                Press Releases & Updates
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Latest News & Announcements
              </h2>
            </div>
            <Link
              to="/news"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition"
            >
              <span>View all media articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredNews.map((item) => (
              <article
                key={item.slug}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col"
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
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-emerald-600" /> {item.date}
                      </span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
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

          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-14 text-slate-700 font-bold text-sm sm:text-lg">
            <span className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition">
              World Health Organization (WHO)
            </span>
            <span className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition">
              UNICEF Bhutan
            </span>
            <span className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition">
              The World Bank
            </span>
            <span className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition">
              Gavi, The Vaccine Alliance
            </span>
            <span className="px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition">
              Ministry of Health, RGOB
            </span>
          </div>
        </div>
      </section>

      {/* 9. Modern Call To Action Banner */}
      <section className="mt-6 mb-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 via-emerald-700 to-slate-900 rounded-3xl p-8 sm:p-14 text-white shadow-2xl">
          <div className="relative z-10 max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold backdrop-blur-md">
              <HandHeart className="h-3.5 w-3.5" />
              <span>Gross National Happiness in Action</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              Invest in the Eternal Health of the Kingdom of Bhutan
            </h2>

            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed max-w-2xl">
              Your contribution directly builds the permanent endowment, ensuring that no hospital or remote
              health clinic in Bhutan ever runs out of life-saving medicines or vaccines.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <Link
                to="/get-involved"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-emerald-900 font-extrabold text-sm hover:bg-emerald-50 shadow-lg transition active:scale-95"
              >
                <HandHeart className="h-4 w-4 text-emerald-700" />
                <span>Make a Donation Now</span>
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
