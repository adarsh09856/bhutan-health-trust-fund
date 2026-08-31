import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  Microscope,
  GraduationCap,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Plane,
  Sparkles,
  ArrowRight,
  HandHeart,
  Activity,
  Layers,
  ThermometerSnowflake,
} from "lucide-react";
import { CommodityTracker } from "@/components/commodity-tracker";
import { DzongkhagExplorer } from "@/components/dzongkhag-map";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Programs & Health Commodities | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Discover how BHTF finances essential medicines, life-saving vaccines, diagnostics, and cold chain logistics across all 20 Dzongkhags of Bhutan.",
      },
    ],
  }),
  component: OurWork,
});

const programs = [
  {
    icon: Syringe,
    title: "Universal Childhood & Adult Vaccines",
    badge: "100% Guaranteed",
    text: "Financing all 14 antigens under Bhutan's Expanded Programme on Immunization (EPI), including Pentavalent, BCG, Measles-Rubella, HPV, Hepatitis B, Influenza, and seasonal boosters.",
    stats: "Over 12,000 newborns protected annually",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: Pill,
    title: "120+ Essential Medicines Catalog",
    badge: "Formulary Approved",
    text: "Continuous procurement of vital antibiotics, anti-hypertensives, insulin, asthma inhalers, cardiovascular drugs, analgesics, and psychiatric medications for national hospitals and basic health units.",
    stats: "Zero stock-out mandate nationwide",
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: Microscope,
    title: "Diagnostic Reagents & Test Kits",
    badge: "Clinical Accuracy",
    text: "Procuring laboratory reagents, rapid diagnostic test kits for infectious diseases, blood glucose test strips, renal function assays, and automated biochemistry reagents for regional hospitals.",
    stats: "Equipping 20 Dzongkhag hospitals",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    icon: HeartPulse,
    title: "Maternal & Child Health Kits",
    badge: "Safe Motherhood",
    text: "Financing clean delivery kits, oxytocin, neonatal resuscitation equipment, essential micronutrients, and maternal supplements to ensure safe childbirth in remote mountainous settings.",
    stats: "Supporting 100% institutional deliveries",
    color: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    icon: ThermometerSnowflake,
    title: "Cold Chain & High-Altitude Logistics",
    badge: "Sub-Zero Reliability",
    text: "Investing in solar direct-drive vaccine refrigerators, temperature-monitored cooler boxes, and horse/porter medicine kits for remote settlements like Lunana, Laya, and Soe.",
    stats: "Connecting 200+ Basic Health Units",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: ShieldCheck,
    title: "Blood Safety & Transfusion Reagents",
    badge: "Zero Contamination",
    text: "Financing fourth-generation screening ELISA kits for HIV, Hepatitis B & C, and Syphilis to ensure 100% screened, safe blood transfusions in emergency operating theatres.",
    stats: "Universal blood safety certified",
    color: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

const procurementSteps = [
  {
    step: "01",
    title: "National Demand Forecasting",
    desc: "Ministry of Health quantifies national requirement based on real-time BHU consumption data.",
  },
  {
    step: "02",
    title: "International Competitive Bidding",
    desc: "Open tenders conducted adhering to strict WHO prequalification and DRA Bhutan standards.",
  },
  {
    step: "03",
    title: "Quality Batch Testing",
    desc: "Every medicine and vaccine batch undergoes rigorous laboratory assay testing upon port arrival.",
  },
  {
    step: "04",
    title: "Last-Mile Distribution",
    desc: "Direct delivery to Central Medical Stores and distribution across all 20 Dzongkhags.",
  },
];

function OurWork() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Universal Healthcare Coverage"
        title="Our Programs & Financed Commodities"
        subtitle="Ensuring no hospital, clinic, or health post across Bhutan faces stockouts of life-saving medicines or vaccines."
      />

      {/* 1. Interactive Health Commodity Streams */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CommodityTracker />
      </section>

      {/* 2. Core Commodities Summary Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
            Comprehensive Procurement
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Health Commodities Financed by BHTF
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            Every Ngultrum disbursed is earmarked for tangible, life-saving medical supplies that directly benefit patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programs.map((p, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`h-12 w-12 rounded-xl grid place-items-center border ${p.color}`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {p.badge}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.text}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                <span>{p.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Interactive Nationwide Reach Across 20 Dzongkhags */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DzongkhagExplorer />
        </div>
      </section>

      {/* 4. Transparent Procurement Cycle */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
            Fiduciary Integrity
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            How BHTF Manages Quality & Procurement
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {procurementSteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden"
            >
              <span className="text-4xl font-black text-slate-100 absolute top-3 right-3 select-none">
                {step.step}
              </span>
              <div className="relative z-10 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white font-bold text-xs grid place-items-center mb-4">
                  {step.step}
                </div>
                <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Help Safeguard Essential Medicine Buffers</h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Your donations are directly multiplied 1:1 by the Royal Government of Bhutan to fund vital supplies.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-extrabold text-sm hover:bg-emerald-50 transition shrink-0 shadow-lg cursor-pointer"
          >
            <HandHeart className="h-4 w-4 text-emerald-700" />
            <span>Donate to the Trust Fund</span>
          </Link>
        </div>
      </section>
    </div>
  );
}