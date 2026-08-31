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
} from "lucide-react";

export function EndowmentCalculator() {
  const [pledgeAmount, setPledgeAmount] = useState(2500);

  const matchedAmount = pledgeAmount;
  const totalValue = pledgeAmount * 2;

  // Impact approximations
  const vaccineDoses = Math.floor(totalValue / 50); // ~Nu. 50 per vaccine dose
  const clinicBuffers = Math.max(1, Math.floor(totalValue / 500)); // ~Nu. 500 per clinic buffer pack
  const maternalKits = Math.max(1, Math.floor(totalValue / 1200)); // ~Nu. 1200 per sterile maternal delivery kit

  // 10-year projected perpetual return (assuming 7% annual endowment yield)
  const tenYearYield = Math.floor(totalValue * (Math.pow(1 + 0.07, 10) - 1));

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Statutory 1:1 RGOB Sovereign Matching Multiplier</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Interactive Healthcare Impact & Endowment Simulator
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Slide to see how your contribution is instantly doubled by the Royal Government of Bhutan to build a permanent, sovereign healthcare shield.
        </p>
      </div>

      {/* Main Interactive Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slider & Controls (Left 6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Contribution Pledge (Nu.)
              </label>
              <div className="text-2xl font-black text-slate-900 font-mono">
                Nu. {pledgeAmount.toLocaleString()}
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={100}
              max={25000}
              step={100}
              value={pledgeAmount}
              onChange={(e) => setPledgeAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[500, 1000, 2500, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPledgeAmount(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    pledgeAmount === preset
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Nu. {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* 1:1 Matching Equation Display */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-100/80 p-3.5 rounded-2xl border border-slate-200/80">
              <span className="text-[11px] font-medium text-slate-500 block">Your Pledge</span>
              <span className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 block">
                Nu. {pledgeAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200">
              <span className="text-[11px] font-bold text-emerald-700 block">+ RGOB Match</span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1 block">
                Nu. {matchedAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-sm">
              <span className="text-[11px] font-semibold text-amber-400 block">= Total Value</span>
              <span className="text-sm sm:text-base font-black text-white mt-1 block">
                Nu. {totalValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tangible Real-World Health Deliverables (Right 6 Cols) */}
        <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Tangible Primary Healthcare Yield
            </span>
            <h4 className="text-xl font-extrabold text-white mt-1">
              What Nu. {totalValue.toLocaleString()} Procures:
            </h4>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 grid place-items-center shrink-0">
                <Syringe className="h-5 w-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">
                  {vaccineDoses.toLocaleString()} Routine Vaccine Doses
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Protects children across remote high-altitude gewogs from measles, polio, and rubella.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 grid place-items-center shrink-0">
                <Pill className="h-5 w-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">
                  {clinicBuffers.toLocaleString()} Rural Clinic Medicine Buffers
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Supplies primary health centers with essential antibiotic and chronic care supplies.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 text-emerald-400 grid place-items-center shrink-0">
                <Baby className="h-5 w-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm text-white">
                  {maternalKits.toLocaleString()} Safe Delivery & Neonatal Kits
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Ensures safe child deliveries in community hospitals before seasonal isolations.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
            >
              <Heart className="h-4 w-4 fill-white" />
              <span>Make This Pledge of Nu. {pledgeAmount.toLocaleString()} →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
