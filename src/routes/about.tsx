import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import {
  getPublicTrustees,
  getPublicMilestones,
  getPublicSettings,
} from "@/lib/api/public.functions";
import type { Trustee, Milestone } from "@/lib/db/schema";
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
  Lock,
  Landmark,
  Scale,
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
    dzongkha: "དམིགས་ཡུལ།",
    text: "To sustainably finance essential drugs and universal vaccines, guaranteeing uninterrupted, equitable access to primary healthcare for every citizen in Bhutan.",
    color: "bg-[#FAF8F3] text-emerald-800 border-slate-200/80",
  },
  {
    icon: Eye,
    title: "Our Vision",
    dzongkha: "མཐོང་སྣང་།",
    text: "A self-reliant, resilient, and sovereign national health financing system where no Bhutanese is ever denied life-saving medicines or vaccines.",
    color: "bg-[#FAF8F3] text-emerald-800 border-slate-200/80",
  },
  {
    icon: Heart,
    title: "Core Values",
    dzongkha: "གཞི་རྩའི་བརྩི་མཐོང་།",
    text: "Gross National Happiness, universal equity, absolute transparency, zero procurement waste, compassion, and fiduciary integrity guide all operations.",
    color: "bg-[#FAF8F3] text-emerald-800 border-slate-200/80",
  },
  {
    icon: Award,
    title: "Royal Charter Mandate",
    dzongkha: "རྒྱལ་པོའི་བཀའ་ཤོག",
    text: "Established under Royal Charter as an autonomous statutory trust fund with permanent corpus protection and ring-fenced health procurement power.",
    color: "bg-[#FAF8F3] text-emerald-800 border-slate-200/80",
  },
];

const trustees: {
  name?: string;
  role: string;
  organization: string;
  badge: string;
  desc: string;
}[] = [
  {
    role: "Chairperson of the Board",
    organization: "Ministry of Health, RGOB",
    badge: "Government Trustee",
    desc: "Oversees strategic alignment with national healthcare policies, Five-Year Plans, and universal primary coverage.",
  },
  {
    role: "Secretary of Finance",
    organization: "Ministry of Finance, RGOB",
    badge: "Fiscal Trustee",
    desc: "Directs endowment investment policies, 1:1 RGOB matching disbursements, and statutory fiscal governance.",
  },
  {
    role: "Country Representative",
    organization: "World Health Organization (WHO)",
    badge: "Multilateral Partner",
    desc: "Advises on international pooled vaccine procurement, WHO prequalification standards, and cold chain safety.",
  },
  {
    role: "Civil Society & Private Sector Trustee",
    organization: "Eminent Public Representative",
    badge: "Public Oversight",
    desc: "Ensures citizen representation, societal accountability, ethical fiduciary stewardship, and community donor engagement.",
  },
  {
    role: "Director of Medical Services",
    organization: "Department of Medical Services, RGOB",
    badge: "Clinical Technical",
    desc: "Monitors national essential drug formularies, consumption rates, and 6-month buffer stock requirements across all 20 Dzongkhags.",
  },
  {
    role: "Secretariat Director",
    organization: "BHTF Executive Secretariat",
    badge: "Executive Leadership",
    desc: "Leads day-to-day capital endowment management, international tender financing, and statutory Royal Audit Authority compliance.",
  },
];

const milestones = [
  {
    year: "1998",
    title: "Conception in Geneva (WHO World Health Assembly)",
    desc: "The Royal Government of Bhutan formally announced the vision of an autonomous health endowment fund to international partners in Geneva.",
  },
  {
    year: "2003",
    title: "Royal Charter & Statutory Establishment",
    desc: "Enacted under Royal Charter as a permanent statutory trust fund with ring-fenced capital grants from RGOB and bilateral partners.",
  },
  {
    year: "2014",
    title: "1:1 Matching Grant Policy Institutionalized",
    desc: "The Royal Government of Bhutan legislated to match every Ngultrum contributed by the public and corporate donors.",
  },
  {
    year: "2020",
    title: "Pandemic Emergency Vaccine Security",
    desc: "BHTF mobilized emergency financing to guarantee uninterrupted essential drug buffers and pediatric vaccines across all 20 Dzongkhags during global supply shocks.",
  },
  {
    year: "2026",
    title: "Multi-Billion Sovereign Endowment & Diagnostic Expansion",
    desc: "Endowment capital surpasses Nu. 3.24 Billion, expanding coverage to high-altitude solar cold chain logistics, oncology medicines, and automated hospital diagnostics.",
  },
];

function About() {
  const [liveTrustees, setLiveTrustees] = useState<Trustee[]>([]);
  const [liveMilestones, setLiveMilestones] = useState<Milestone[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      getPublicTrustees().catch(() => []),
      getPublicMilestones().catch(() => []),
      getPublicSettings().catch(() => ({})),
    ]).then(([t, m, s]) => {
      if (t && t.length > 0) setLiveTrustees(t);
      if (m && m.length > 0) setLiveMilestones(m);
      if (s) setSettings(s);
    });
  }, []);

  const displayTrustees =
    liveTrustees.length > 0
      ? liveTrustees.map((t) => ({
          role: t.role,
          organization: t.organization,
          badge: t.badge,
          desc: t.bio,
          name: t.name,
        }))
      : trustees;

  const displayMilestones =
    liveMilestones.length > 0
      ? liveMilestones.map((m) => ({
          year: m.year,
          title: m.title,
          desc: m.description,
        }))
      : milestones;

  const dynamicValues = [
    {
      ...values[0],
      text: settings["about_mission"] || values[0].text,
    },
    {
      ...values[1],
      text: settings["about_vision"] || values[1].text,
    },
    {
      ...values[2],
      text: settings["about_values"] || values[2].text,
    },
    {
      ...values[3],
      text: settings["about_mandate"] || values[3].text,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Royal Charter Autonomous Statutory Entity"
        title="About the Bhutan Health Trust Fund"
        subtitle="Safeguarding the sovereignty of Bhutan's healthcare system through permanent, sustainable endowment financing."
      />

      {/* 1. Who We Are & Royal Mandate */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Founding Philosophy & Royal Vision</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 leading-tight tracking-tight">
              A Permanent Safety Net for the Health of the Nation
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-sans font-light">
              <p>
                In the Kingdom of Bhutan, healthcare is recognized by the Constitution as a
                fundamental human right. Under the visionary leadership of His Majesty the King, the
                Bhutan Health Trust Fund (BHTF) was established to ensure that universal access to
                free primary healthcare is never compromised by external economic shocks or donor
                phase-outs.
              </p>
              <p>
                Operating as an autonomous statutory body, BHTF manages a permanent sovereign
                endowment whose returns are solely dedicated to procuring essential drugs and
                universal vaccines for every hospital and Primary Health Centre (BHU) across all 20
                Dzongkhags.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-slate-200/80 shadow-xs">
                <div className="font-serif text-3xl font-normal text-emerald-900">100% Free</div>
                <div className="text-xs text-emerald-800 font-medium mt-1 font-sans">
                  Primary healthcare and essential medicines guaranteed for all citizens
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-[#FAF8F3] border border-amber-300/50 shadow-xs">
                <div className="font-serif text-3xl font-normal text-amber-800">1:1 Matched</div>
                <div className="text-xs text-amber-800 font-medium mt-1 font-sans">
                  Every donor contribution doubled by the Royal Government of Bhutan
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {dynamicValues.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs hover:shadow-lg hover:border-amber-400/50 transition duration-200 group"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-xl grid place-items-center border ${v.color}`}
                    >
                      <v.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-serif text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition">
                      {v.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-800 tracking-wider font-sans">
                    {v.dzongkha}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Board of Trustees & Governance Structure */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block mb-2">
              High-Level Stewardship & Statutory Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Board of Trustees & Oversight
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
              BHTF is governed by an eminent multi-sectoral Board of Trustees comprising royal
              government leadership, multilateral health authorities, and civil society
              representatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayTrustees.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-xl transition duration-200 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-amber-400 grid place-items-center shadow-md">
                      <Users2 className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {t.badge}
                    </span>
                  </div>

                  <div>
                    {t.name && (
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-0.5">
                        {t.name}
                      </span>
                    )}
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                      {t.role}
                    </h3>
                    <span className="text-xs font-bold text-emerald-700 block mt-0.5">
                      {t.organization}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{t.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Statutory Fiduciary Oversight</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Historical Timeline & Milestones */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block mb-2">
            Chronicle of Growth
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Milestones in Health Sovereignty
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            From an ambitious vision at the World Health Assembly in Geneva to an enduring
            multi-billion sovereign healthcare corpus.
          </p>
        </div>

        <div className="relative border-l-2 border-emerald-300 ml-4 sm:ml-32 space-y-10">
          {displayMilestones.map((m, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Year badge on left for desktop */}
              <div className="hidden sm:block absolute -left-32 top-0 text-right w-24 font-black text-xl text-emerald-800 font-mono">
                {m.year}
              </div>

              {/* Glowing Pulse Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-emerald-600 border-4 border-white shadow-md group-hover:scale-125 transition"></div>

              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 space-y-2">
                <span className="sm:hidden inline-block text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1 font-mono">
                  {m.year}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900">{m.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Action CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-emerald-500/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black">Support the Sovereign Health Shield</h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-normal">
              Every contribution is matched 1:1 by the Royal Government of Bhutan to guarantee free
              medicines for generations.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-xl transition shrink-0 active:scale-95 cursor-pointer"
          >
            <HandHeart className="h-4 w-4 fill-slate-950" />
            <span>Make a Matched Pledge (1:1)</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
