import { Landmark, Rocket, TrendingUp, Coins, Wallet, ArrowRight, Target } from "lucide-react";

interface FundStep {
  year: string;
  title: string;
  desc: string;
  icon: any;
  highlight?: boolean;
}

const fundMilestones: FundStep[] = [
  {
    year: "2000",
    title: "Royal Charter",
    desc: "BHTF established under the Royal Charter to sustain primary health care.",
    icon: Landmark,
  },
  {
    year: "2016–17",
    title: "US$ 24.0M mobilized",
    desc: "Initial fund target achieved.",
    icon: Rocket,
  },
  {
    year: "2019–20",
    title: "Nu. 3 billion",
    desc: "Fund crosses the 3-billion mark.",
    icon: TrendingUp,
  },
  {
    year: "June 2025",
    title: "Nu. 4.3 billion",
    desc: "FY2024–25 audited fund size — target set to double it.",
    icon: Coins,
  },
  {
    year: "June 2026",
    title: "Nu. 4.7 billion",
    desc: "Audited fund size (Nu. 4.798B), marking 26 years of unbroken sovereign service.",
    icon: Wallet,
    highlight: true,
  },
];

export function FundGrowthTimeline() {
  return (
    <div className="space-y-6">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
          Track Record • Sovereign Capital Expansion
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
          Milestones in Sovereign Mobilisation
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 font-light">
          From the founding Royal Charter in 2000 to today's Nu. 4.8 billion health endowment.
        </p>
      </div>

      {/* 5-Card Progressive Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {fundMilestones.map((step, idx) => (
          <div
            key={idx}
            className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
              step.highlight
                ? "bg-slate-900 text-white border-amber-400/40 shadow-xl"
                : "bg-white border-slate-200 text-slate-900 shadow-xs hover:border-emerald-300 hover:shadow-md"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className={`h-11 w-11 rounded-xl grid place-items-center ${
                    step.highlight
                      ? "bg-amber-400 text-slate-900"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                </div>
                <span
                  className={`text-xs font-mono font-bold ${
                    step.highlight ? "text-amber-400" : "text-amber-700"
                  }`}
                >
                  {step.year}
                </span>
              </div>

              <div>
                <h4
                  className={`font-serif text-base font-bold leading-snug ${
                    step.highlight ? "text-white" : "text-slate-900"
                  }`}
                >
                  {step.title}
                </h4>
                <p
                  className={`text-xs mt-1.5 leading-relaxed font-light ${
                    step.highlight ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Target Banner (Slide 6 Bottom Ribbon) */}
      <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border border-emerald-500/20 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30 grid place-items-center shrink-0">
            <Target className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
              National Strategic Horizon
            </span>
            <p className="text-xs sm:text-sm font-medium text-white">
              <strong className="text-amber-300 uppercase tracking-wide">Current Target:</strong>{" "}
              Double the Nu. 4.3 billion fund size recorded in June 2025 — to roughly{" "}
              <strong className="text-emerald-300 font-bold font-mono">Nu. 8.6 Billion by 2030</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
