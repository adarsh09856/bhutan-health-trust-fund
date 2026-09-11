import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  Sparkles,
  Syringe,
  Pill,
  Baby,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function EndowmentCalculator() {
  const [pledgeAmount, setPledgeAmount] = useState(2500);

  const matchedAmount = pledgeAmount;
  const totalValue = pledgeAmount * 2;

  // Real-world healthcare impact approximations
  const vaccineDoses = Math.floor(totalValue / 50); // ~Nu. 50 per vaccine dose
  const clinicBuffers = Math.max(1, Math.floor(totalValue / 500)); // ~Nu. 500 per clinic buffer pack
  const maternalKits = Math.max(1, Math.floor(totalValue / 1200)); // ~Nu. 1200 per sterile maternal delivery kit

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
      {/* Editorial Header */}
      <div className="relative z-10 max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-amber-500/30 text-amber-800 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-amber-600 fill-amber-500" />
          <span>Statutory 1:1 RGOB Sovereign Matching Multiplier</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
          Double Your Impact with Royal Government Matching
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          Under the Royal Charter, every Ngultrum pledged to the Bhutan Health Trust Fund is matched
          1:1 by the Royal Government of Bhutan to build a permanent, ring-fenced healthcare shield.
        </p>
      </div>

      {/* Main Interactive Matrix */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Slider & Controls (Left 6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#FAF8F3] p-6 rounded-2xl border border-slate-200/80 space-y-5">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-sans">
                Select Contribution Amount (Nu.)
              </label>
              <div className="font-serif text-3xl sm:text-4xl font-light text-emerald-950">
                Nu. {pledgeAmount.toLocaleString()}
              </div>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min={100}
              max={25000}
              step={100}
              value={pledgeAmount}
              onChange={(e) => setPledgeAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
            />

            {/* Preset Amount Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[500, 1000, 2500, 5000, 10000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setPledgeAmount(preset)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    pledgeAmount === preset
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white border border-slate-200/80 text-slate-700 hover:border-amber-400 hover:text-slate-950"
                  }`}
                >
                  Nu. {preset.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* 1:1 Matching Equation Display */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
                Your Pledge
              </span>
              <span className="font-serif text-base sm:text-lg font-light text-slate-900 mt-1 block">
                Nu. {pledgeAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-[#FAF8F3] p-4 rounded-xl border border-amber-300/60">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block font-sans">
                + RGOB Match
              </span>
              <span className="font-serif text-base sm:text-lg font-normal text-amber-700 mt-1 block">
                Nu. {matchedAmount.toLocaleString()}
              </span>
            </div>

            <div className="bg-[#0B1F1A] text-white p-4 rounded-xl border border-amber-400/30">
              <span className="text-[11px] font-medium text-emerald-300 uppercase tracking-wider block font-sans">
                = Total Impact
              </span>
              <span className="font-serif text-base sm:text-lg font-light text-amber-300 mt-1 block">
                Nu. {totalValue.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Tangible Healthcare Yield (Right 6 Cols) */}
        <div className="lg:col-span-6 bg-[#0B1F1A] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-amber-400/20 relative overflow-hidden">
          <div className="border-b border-white/10 pb-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium text-amber-300/90 uppercase tracking-wider block font-sans">
                Tangible Healthcare Yield
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-normal text-white mt-1">
                What Nu. {totalValue.toLocaleString()} Procures:
              </h4>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30 grid place-items-center font-bold text-xs font-mono">
              2X
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3.5 bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition">
              <div className="h-10 w-10 rounded-xl bg-emerald-900/50 text-emerald-300 border border-emerald-700/40 grid place-items-center shrink-0">
                <Syringe className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-sm text-white">
                  {vaccineDoses.toLocaleString()} Routine Pediatric Vaccine Doses
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug font-sans">
                  Protects infants across remote high-altitude gewogs from 14 preventable diseases.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition">
              <div className="h-10 w-10 rounded-xl bg-amber-900/50 text-amber-300 border border-amber-700/40 grid place-items-center shrink-0">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-sm text-white">
                  {clinicBuffers.toLocaleString()} Rural Clinic Medicine Buffers
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug font-sans">
                  Guarantees local health centers have uninterrupted antibiotics and chronic drugs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 hover:border-amber-400/30 transition">
              <div className="h-10 w-10 rounded-xl bg-teal-900/50 text-teal-300 border border-teal-700/40 grid place-items-center shrink-0">
                <Baby className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-sm text-white">
                  {maternalKits.toLocaleString()} Safe Delivery & Neonatal Kits
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5 leading-snug font-sans">
                  Ensures sterile childbirth in gewog health centers before winter mountain isolations.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <Link
              to="/get-involved"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs shadow-md transition cursor-pointer active:scale-95"
            >
              <Heart className="h-4 w-4 fill-slate-950 text-slate-950" />
              <span>
                Pledge Nu. {pledgeAmount.toLocaleString()} (Doubled to Nu. {totalValue.toLocaleString()}) →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
