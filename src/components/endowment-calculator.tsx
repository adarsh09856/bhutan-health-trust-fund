import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Building,
  CheckCircle2,
  Syringe,
  Pill,
  Baby,
  ArrowRight,
  Zap,
} from "lucide-react";

export function EndowmentCalculator() {
  const [pledgeAmount, setPledgeAmount] = useState(2500);

  const matchedAmount = pledgeAmount;
  const totalValue = pledgeAmount * 2;

  // Impact approximations
  const vaccineDoses = Math.floor(totalValue / 50); // ~Nu. 50 per vaccine dose
  const clinicBuffers = Math.max(1, Math.floor(totalValue / 500)); // ~Nu. 500 per clinic buffer pack
  const maternalKits = Math.max(1, Math.floor(totalValue / 1200)); // ~Nu. 1200 per sterile maternal delivery kit

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-amber-50/20 to-emerald-50/30 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8">
      {/* Decorative Ambient Background */}
      <div className="absolute -top-24 -left-24 h-80 w-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 h-80 w-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-teal-500/20 border border-amber-500/40 text-amber-900 text-xs font-extrabold shadow-xs">
          <Zap className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
          <span>Statutory 1:1 RGOB Sovereign Matching Multiplier</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Interactive 1:1 Sovereign Health Multiplier
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Slide below to see how every Ngultrum you pledge is doubled by the Royal Government of Bhutan to build a permanent, sovereign healthcare shield.
        </p>
      </div>

      {/* Main Interactive Matrix */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slider & Controls (Left 6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Select Contribution Pledge (Nu.)
              </label>
              <div className="text-3xl font-black text-emerald-800 font-mono">
                Nu. {pledgeAmount.toLocaleString()}
              </div>
            </div>

            {/* Slider with colorful track */}
            <input
              type="range"
              min={100}
              max={25000}
              step={100}
              value={pledgeAmount}
              onChange={(e) => setPledgeAmount(Number(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-400 rounded-lg appearance-none cursor-pointer accent-emerald-600 shadow-inner"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[500, 1000, 2500, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPledgeAmount(preset)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-150 cursor-pointer ${
                    pledgeAmount === preset
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                      : "bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Nu. {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* 1:1 Matching Equation Display (3 Vibrant Floating Cards) */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gradient-to-b from-white to-slate-50 p-4 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-[11px] font-bold text-slate-500 block">Your Pledge</span>
              <span className="text-base sm:text-lg font-black text-slate-900 mt-1 block font-mono">
                Nu. {pledgeAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-gradient-to-b from-amber-50 to-orange-50 p-4 rounded-2xl border border-amber-300 shadow-sm">
              <span className="text-[11px] font-black text-amber-800 block">+ RGOB Match</span>
              <span className="text-base sm:text-lg font-black text-amber-700 mt-1 block font-mono">
                Nu. {matchedAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-gradient-to-b from-emerald-600 to-teal-700 text-white p-4 rounded-2xl shadow-lg shadow-emerald-700/20 border border-emerald-400">
              <span className="text-[11px] font-bold text-emerald-100 block">= Total Impact</span>
              <span className="text-base sm:text-lg font-black text-white mt-1 block font-mono">
                Nu. {totalValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tangible Real-World Health Deliverables (Right 6 Cols) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-amber-500/25 relative overflow-hidden">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Direct Primary Healthcare Yield
              </span>
              <h4 className="text-xl font-extrabold text-white mt-1">
                What Nu. {totalValue.toLocaleString()} Procures:
              </h4>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 grid place-items-center font-bold text-xs">
              2X
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3.5 bg-slate-800/80 p-3.5 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/60 transition">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 grid place-items-center shrink-0">
                <Syringe className="h-5 w-5" />
              </div>
              <div>
                <div className="font-black text-sm text-white">
                  {vaccineDoses.toLocaleString()} Routine Pediatric Vaccine Doses
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                  Protects children across remote high-altitude gewogs from preventable diseases.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-800/80 p-3.5 rounded-2xl border border-amber-500/30 hover:border-amber-500/60 transition">
              <div className="h-11 w-11 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 grid place-items-center shrink-0">
                <Pill className="h-5 w-5" />
              </div>
              <div>
                <div className="font-black text-sm text-white">
                  {clinicBuffers.toLocaleString()} Rural Clinic Medicine Buffers
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                  Supplies primary health centers with essential antibiotic and chronic care drugs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-slate-800/80 p-3.5 rounded-2xl border border-rose-500/30 hover:border-rose-500/60 transition">
              <div className="h-11 w-11 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/40 grid place-items-center shrink-0">
                <Baby className="h-5 w-5" />
              </div>
              <div>
                <div className="font-black text-sm text-white">
                  {maternalKits.toLocaleString()} Safe Child Delivery & Neonatal Kits
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                  Ensures safe childbirth in community hospitals before seasonal isolations.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-700/25 transition cursor-pointer active:scale-95 border border-emerald-400/30"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Make This Pledge of Nu. {pledgeAmount.toLocaleString()} (Doubled to Nu. {totalValue.toLocaleString()}) →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
