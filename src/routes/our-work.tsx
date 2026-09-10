import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicPrograms, getPublicProcurementSteps } from "@/lib/api/public.functions";
import type { Program, ProcurementStep } from "@/lib/db/schema";
import {
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  Microscope,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  HandHeart,
  ThermometerSnowflake,
  Loader2,
  Scale,
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

const progIconMap: Record<string, any> = {
  Syringe,
  Pill,
  Microscope,
  HeartPulse,
  ThermometerSnowflake,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
};

const progColors = [
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-teal-50 text-teal-700 border-teal-200",
];

function OurWork() {
  const [livePrograms, setLivePrograms] = useState<Program[]>([]);
  const [procurementSteps, setProcurementSteps] = useState<ProcurementStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPublicPrograms().catch(() => []), getPublicProcurementSteps().catch(() => [])])
      .then(([progs, steps]) => {
        if (progs) setLivePrograms(progs);
        if (steps) setProcurementSteps(steps);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayPrograms = livePrograms.map((p, idx) => ({
    icon: progIconMap[p.icon] || Pill,
    title: p.title,
    badge: p.status === "ACTIVE" ? "Active Stream" : p.status,
    text: p.summary,
    stats: `${p.targetDzongkhags} • ${p.beneficiariesReached}`,
    color: progColors[idx % progColors.length],
  }));

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
            Every Ngultrum disbursed is earmarked for tangible, life-saving medical supplies that
            directly benefit patients.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">
              Loading sovereign commodity programs...
            </p>
          </div>
        ) : displayPrograms.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Pill className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No commodity streams available</h3>
            <p className="text-xs text-slate-500">
              Healthcare commodity allocations are currently being updated by the Secretariat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayPrograms.map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-12 w-12 rounded-xl grid place-items-center border ${p.color}`}
                    >
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
        )}
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

        {procurementSteps.length === 0 && !loading ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Scale className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">
              Procurement lifecycle updates pending
            </h3>
            <p className="text-xs text-slate-500">
              Procurement specifications are updated dynamically in accordance with RGOB standards.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {procurementSteps.map((step, idx) => (
              <div
                key={step.id || idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between"
              >
                <span className="text-4xl font-black text-slate-100 absolute top-3 right-3 select-none">
                  {step.stepNumber}
                </span>
                <div className="relative z-10 space-y-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white font-bold text-xs grid place-items-center mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Help Safeguard Essential Medicine Buffers
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Your donations are directly multiplied 1:1 by the Royal Government of Bhutan to fund
              vital supplies.
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
