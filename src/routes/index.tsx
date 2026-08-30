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
} from "lucide-react";
import hero from "@/assets/hero-bhutan.jpg";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

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
    icon: Syringe,
    label: "Vaccines & Medicines",
    desc: "120+ vital drugs & universal immunization",
    to: "/our-work",
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    icon: FileText,
    label: "Statutory Reports",
    desc: "Audited financial statements & publications",
    to: "/reports",
    color: "bg-amber-500/10 text-amber-600 border-amber-200",
  },
  {
    icon: ShieldCheck,
    label: "Policies & Standards",
    desc: "Whistleblower & procurement guidelines",
    to: "/policies",
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
  },
  {
    icon: Megaphone,
    label: "News & Media",
    desc: "Official press releases & updates",
    to: "/news",
    color: "bg-rose-500/10 text-rose-600 border-rose-200",
  },
  {
    icon: HandHeart,
    label: "Support the Fund",
    desc: "Make a tax-deductible donation pledge",
    to: "/get-involved",
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
] as const;

const keyStats = [
  {
    icon: Users,
    value: "780,000+",
    label: "Citizens Protected",
    desc: "Universal healthcare safety net across Bhutan",
  },
  {
    icon: Pill,
    value: "120+",
    label: "Essential Medicines",
    desc: "Financed uninterruptedly for hospitals & BHUs",
  },
  {
    icon: Syringe,
    value: "100%",
    label: "Vaccine Coverage",
    desc: "EPI routine childhood immunization guaranteed",
  },
  {
    icon: ShieldCheck,
    value: "20 / 20",
    label: "Dzongkhags Reached",
    desc: "From Thimphu to remote alpine highland clinics",
  },
] as const;

const corePillars = [
  {
    icon: Syringe,
    title: "Universal Childhood Vaccines",
    description:
      "Financing Bhutan's Expanded Programme on Immunization (EPI) covering Hepatitis B, MMR, Pentavalent, Polio, and HPV vaccines to eradicate preventable diseases.",
    badge: "Life-Saving Vaccines",
  },
  {
    icon: Pill,
    title: "120+ Essential Medicines",
    description:
      "Sustainably procuring vital antibiotics, cardiovascular drugs, insulin, anti-hypertensives, and psychiatric medications for every Primary Health Centre (BHU) and hospital.",
    badge: "Primary Healthcare",
  },
  {
    icon: Activity,
    title: "Diagnostic Reagents & Lab Kits",
    description:
      "Ensuring regional hospitals and district health centres are equipped with essential diagnostic reagents, testing strips, blood safety kits, and screening supplies.",
    badge: "Clinical Diagnostics",
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
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all duration-150 active:scale-95"
              >
                <HandHeart className="h-4 w-4" />
                <span>Support the Trust Fund</span>
              </Link>

              <Link
                to="/our-work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-md transition duration-150"
              >
                <span>Explore Programs</span>
                <ArrowRight className="h-4 w-4 text-emerald-400" />
              </Link>

              <Link
                to="/reports"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white font-medium text-sm border border-slate-700 transition"
              >
                <FileText className="h-4 w-4 text-amber-400" />
                <span>Audit Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Floating Quick Access Matrix */}
      <section className="relative z-20 -mt-16 sm:-mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      {/* 4. Core Mandate & What We Fund */}
      <section className="mt-20 sm:mt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
                Our Strategic Priorities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                What the Trust Fund Finances
              </h2>
            </div>
            <Link
              to="/our-work"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition"
            >
              <span>View all procurement categories</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {corePillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-8 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center group-hover:bg-emerald-600 group-hover:text-white transition duration-200">
                      <pillar.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 transition">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Guaranteed by Charter
                  </span>
                  <Link
                    to="/our-work"
                    className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 group-hover:translate-x-1 transition duration-150"
                  >
                    Details <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 1:1 RGOB Matching Mechanism Spotlight */}
      <section className="mt-20 sm:mt-28 bg-slate-50 border-y border-slate-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block">
                Sustainable Financing Innovation
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Every 1 Nu. You Contribute Is Matched by 1 Nu. from the Royal Government
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The Bhutan Health Trust Fund operates an endowment model where the capital is invested
                prudently. The annual returns and matched contributions directly finance vaccine and medicine
                procurement without depleting the principal corpus.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">100% Ring-Fenced Health Corpus</h4>
                    <p className="text-xs text-slate-500">Funds cannot be diverted to non-health operational expenditures.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Royal Audit Authority Oversight</h4>
                    <p className="text-xs text-slate-500">Subject to annual public statutory audit with zero tolerance for leakages.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Tax Deductible in Bhutan</h4>
                    <p className="text-xs text-slate-500">Corporate and individual donations eligible for tax exemption under DRC rules.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/get-involved"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition"
                >
                  <HandHeart className="h-4 w-4 text-emerald-400" />
                  <span>Make an Institutional or Personal Pledge</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b pb-3 flex items-center justify-between">
                <span>Financing Flow Architecture</span>
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-semibold">Endowment Model</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white grid place-items-center font-bold text-sm">
                      50%
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Citizen & Donor Contributions</div>
                      <div className="text-xs text-slate-500">Individual, corporate and international donors</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">+ Nu. 1.00</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-amber-500 text-white grid place-items-center font-bold text-sm">
                      50%
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">RGOB 1:1 Matching Grant</div>
                      <div className="text-xs text-slate-500">Direct allocation from Ministry of Finance</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-700">+ Nu. 1.00</span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-900 text-white flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-white/20 text-white grid place-items-center font-bold text-sm">
                      =
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Total Health Impact Value</div>
                      <div className="text-xs text-emerald-200">200% purchasing power for vital medicine tenders</div>
                    </div>
                  </div>
                  <span className="text-base font-extrabold text-emerald-300">Nu. 2.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest News & Announcements Spotlight */}
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

      {/* 7. Institutional Partners & International Collaborations */}
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

      {/* 8. Modern Call To Action Banner */}
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
