import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  Target,
  Eye,
  Heart,
  Award,
  ShieldCheck,
  Building2,
  Users2,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  HandHeart,
  FileText,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us & Royal Mandate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Learn about BHTF's Royal Charter mandate, Board of Trustees, sustainable endowment model, and history financing medicines and vaccines for Bhutan.",
      },
    ],
  }),
  component: About,
});

const values = [
  {
    icon: Target,
    title: "Our Mission",
    text: "To sustainably finance essential drugs and vaccines, guaranteeing uninterrupted, equitable access to primary healthcare for every citizen in Bhutan.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Eye,
    title: "Our Vision",
    text: "A self-reliant, resilient, and sovereign national health financing system where no Bhutanese is denied life-saving medicines.",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: Heart,
    title: "Core Values",
    text: "Equity, Gross National Happiness, absolute transparency, zero waste, compassion, and fiduciary integrity guide our operations.",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: Award,
    title: "Royal Charter Mandate",
    text: "Established under Royal Charter as an autonomous statutory trust fund with permanent capital protection and dedicated health procurement mandate.",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

const trustees = [
  {
    role: "Chairperson of the Board",
    organization: "Ministry of Health, RGOB",
    desc: "Oversees strategic alignment with national health priorities and five-year development plans.",
  },
  {
    role: "Secretary of Finance",
    organization: "Ministry of Finance, RGOB",
    desc: "Guides endowment investment policies, 1:1 RGOB matching fund releases, and fiscal governance.",
  },
  {
    role: "Country Representative",
    organization: "World Health Organization (WHO)",
    desc: "Advises on international vaccine procurement standards, prequalification, and cold chain safety.",
  },
  {
    role: "Civil Society & Private Sector Trustee",
    organization: "Eminent Public Representative",
    desc: "Ensures citizen oversight, public accountability, and community donor engagement.",
  },
  {
    role: "Director of Medical Services",
    organization: "Department of Medical Services, RGOB",
    desc: "Monitors dzongkhag-level essential drug formularies, consumption rates, and buffer stocks.",
  },
  {
    role: "Secretariat Director",
    organization: "BHTF Executive Secretariat",
    desc: "Leads day-to-day fund management, tender procurement financing, and statutory audit compliance.",
  },
];

const milestones = [
  {
    year: "1998",
    title: "Conception in Geneva (WHO World Health Assembly)",
    desc: "The Royal Government of Bhutan formally announced the vision of an autonomous health endowment fund to international donors.",
  },
  {
    year: "2003",
    title: "Royal Charter & Statutory Establishment",
    desc: "Enacted under Royal Charter with initial capital grants from RGOB and international development partners.",
  },
  {
    year: "2014",
    title: "1:1 Matching Grant Policy Institutionalized",
    desc: "The Royal Government committed to match every Ngultrum contributed by the public and corporate donors.",
  },
  {
    year: "2020",
    title: "Pandemic Vaccine Security & Buffer Stocking",
    desc: "BHTF mobilized emergency financing to ensure uninterrupted essential drug supplies across all 20 Dzongkhags during global supply shocks.",
  },
  {
    year: "2026",
    title: "Resilient Endowment & Universal Diagnostic Expansion",
    desc: "Endowment capital reaches record levels, expanding financing to advanced oncology medicines, diagnostic reagents, and high-altitude health units.",
  },
];

function About() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Royal Charter Autonomous Statutory Entity"
        title="About the Bhutan Health Trust Fund"
        subtitle="Safeguarding the sovereignty of Bhutan's healthcare system through permanent, sustainable endowment financing."
      />

      {/* 1. Who We Are & Royal Mandate */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block">
              Founding Philosophy & Mandate
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              A Permanent Safety Net for the Health of the Nation
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                In the Kingdom of Bhutan, healthcare is recognized by the Constitution as a fundamental right.
                Under the enlightened vision of His Majesty the King, the Bhutan Health Trust Fund (BHTF) was
                created to ensure that free access to primary healthcare is never compromised by economic
                fluctuations or donor phase-outs.
              </p>
              <p>
                Operating as an autonomous statutory body, BHTF manages an endowment fund whose returns are
                solely dedicated to procuring essential drugs and universal vaccines for every hospital and
                Primary Health Centre (BHU) across the country.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <div className="text-2xl font-extrabold text-emerald-800">100% Free</div>
                <div className="text-xs text-emerald-700 font-medium mt-1">
                  Primary healthcare and essential medicines for all citizens
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200">
                <div className="text-2xl font-extrabold text-amber-800">1:1 Matched</div>
                <div className="text-xs text-amber-700 font-medium mt-1">
                  Every donor contribution is doubled by the Royal Government
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-md transition"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <div className={`h-10 w-10 rounded-xl grid place-items-center border ${v.color}`}>
                    <v.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{v.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Board of Trustees & Governance Structure */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
              High-Level Stewardship
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Board of Trustees & Oversight
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
              BHTF is governed by an eminent multi-sectoral Board of Trustees comprising government leadership,
              international health authorities, and civil society representatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustees.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition space-y-3"
              >
                <div className="h-10 w-10 rounded-xl bg-slate-900 text-emerald-400 grid place-items-center">
                  <Users2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{t.role}</h3>
                  <span className="text-xs font-semibold text-emerald-700 block mt-0.5">
                    {t.organization}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Historical Timeline & Milestones */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
            Chronicle of Growth
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Milestones in Health Sovereignty
          </h2>
        </div>

        <div className="relative border-l-2 border-emerald-200 ml-4 sm:ml-32 space-y-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Year badge on left for desktop */}
              <div className="hidden sm:block absolute -left-32 top-0 text-right w-24 font-extrabold text-lg text-emerald-800">
                {m.year}
              </div>

              {/* Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs group-hover:scale-125 transition"></div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="sm:hidden text-xs font-bold text-emerald-700 block">{m.year}</span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{m.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Review Our Statutory Audit & Governance Policies</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Access full statutory annual reports, procurement guidelines, and whistleblower policies published for public scrutiny.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/reports"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition"
            >
              <FileText className="h-4 w-4" />
              <span>Annual Reports</span>
            </Link>
            <Link
              to="/policies"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>Policies & Guidelines</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}