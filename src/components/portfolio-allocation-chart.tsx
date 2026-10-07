import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart as PieIcon, ShieldCheck, Scale, ArrowUpRight } from "lucide-react";

const portfolioData = [
  { name: "Onshore Domestic Portfolio", value: 74.8, nuValue: "Nu. 3.65 Billion", color: "#0B4F42" },
  { name: "Offshore Portfolio (ADB)", value: 25.2, nuValue: "USD 12.08M / Nu. 1.14B", color: "#D97706" },
];

const spendingPolicyData = [
  { name: "Medicine & Vaccine Procurement", value: 70, share: "70%", desc: "Direct healthcare supply funding", color: "#00A896" },
  { name: "Capital Corpus Reinvestment", value: 20, share: "20%", desc: "Inflation hedging & real capital growth", color: "#F59E0B" },
  { name: "Operational Overhead Ceiling", value: 10, share: "10%", desc: "Statutory 10% max (actual ~4%)", color: "#0F766E" },
];

export function PortfolioAllocationCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
      {/* Donut Chart 1: Asset Allocation (Onshore vs Offshore) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                Endowment Asset Structure
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                Onshore vs. Offshore Allocation
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-[10px] font-mono font-bold">
              Nu. 4.8B Total Corpus
            </span>
          </div>

          <div className="h-60 w-full mt-4 flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}% (${item.payload.nuValue})`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#FFFFFF",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
          {portfolioData.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50">
              <span
                className="h-3 w-3 rounded-full mt-0.5 shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block leading-tight">
                  {item.name} ({item.value}%)
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-medium">
                  {item.nuValue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Donut Chart 2: Spending Policy (70 / 20 / 10) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800">
                Statutory Fiduciary Policy
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                70 / 20 / 10 Spending Allocation
              </h4>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-mono font-bold">
              100% Net Yields
            </span>
          </div>

          <div className="h-60 w-full mt-4 flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendingPolicyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {spendingPolicyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any, item: any) => [
                      `${val}% — ${item.payload.desc}`,
                      name,
                    ]}
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "12px",
                      color: "#FFFFFF",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full bg-slate-50 animate-pulse rounded-2xl" />
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
          {spendingPolicyData.map((item, idx) => (
            <div key={idx} className="flex flex-col p-2.5 rounded-xl bg-slate-50 space-y-1">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {item.share}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-700 leading-tight">
                {item.name}
              </span>
              <span className="text-[10px] text-slate-500 font-light leading-snug">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
