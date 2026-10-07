import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TrendingUp, ShieldAlert, ArrowUpRight, Coins } from "lucide-react";

// Official Strategy Workshop Chart 1 Data (FY 2014-15 to FY 2025-26 in Nu. Millions)
const disbursementData = [
  { year: "14-15", roi: 99.0, procurement: 177.6 },
  { year: "15-16", roi: 122.5, procurement: 189.1 },
  { year: "16-17", roi: 139.3, procurement: 218.7 },
  { year: "17-18", roi: 166.8, procurement: 196.7 },
  { year: "18-19", roi: 210.5, procurement: 262.6 },
  { year: "19-20", roi: 215.3, procurement: 377.5 },
  { year: "20-21", roi: 246.3, procurement: 379.7 },
  { year: "21-22", roi: 249.5, procurement: 416.9 },
  { year: "22-23", roi: 283.1, procurement: 466.0 },
  { year: "23-24", roi: 281.5, procurement: 557.7 },
  { year: "24-25", roi: 318.1, procurement: 557.7 },
  { year: "25-26", roi: 400.0, procurement: 613.0 },
];

export function DisbursementChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
            Strategy Workshop Audit • Chart 1 Series
          </span>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            Annual Procurement vs. Investment Return Trajectory
          </h3>
          <p className="text-xs text-slate-500 font-light mt-1">
            Tracking annual commodity procurement costs alongside BHTF investment yields (Nu. in Millions).
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="h-3 w-3 rounded-full bg-emerald-600 inline-block" />
            <span>Procurement (Nu. M)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
            <span className="h-3 w-3 rounded-full bg-amber-500 inline-block" />
            <span>Investment ROI (Nu. M)</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-72 sm:h-80 -ml-2 sm:ml-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={disbursementData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProcurement" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorRoi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d97706" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
                unit="M"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-slate-900 text-white rounded-xl p-3 shadow-xl text-xs space-y-1.5 border border-slate-800">
                        <p className="font-mono font-bold text-amber-400">FY 20{label}</p>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>Procurement:</span>
                          <span className="font-mono font-bold text-emerald-400">
                            Nu. {payload[0]?.value}M
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>Investment Return:</span>
                          <span className="font-mono font-bold text-amber-400">
                            Nu. {payload[1]?.value}M
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="procurement"
                stroke="#059669"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorProcurement)"
                name="Procurement"
              />
              <Area
                type="monotone"
                dataKey="roi"
                stroke="#d97706"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorRoi)"
                name="Investment ROI"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
            Loading trajectory visualization...
          </div>
        )}
      </div>

      {/* Strategic Callout Banner (Slide 10 & 14 Rationale) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-900">
            <Coins className="h-4 w-4 text-emerald-700" />
            <span>Two Sovereign Inflow Channels (Slide 10)</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-light">
            BHTF balances annual procurement via two streams: <strong>Nu. 318M–400M</strong> from portfolio investment yield (7.7% avg return) and approximately <strong>Nu. 450M</strong> from the 1% Health Contribution (up from Nu. 138M in FY 2014–15).
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-950">
            <ShieldAlert className="h-4 w-4 text-amber-700" />
            <span>The Fiscal Sustainability Imperative (Slide 14)</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-light">
            Healthcare commodity costs grow at <strong>~11% annually</strong> while portfolio returns average <strong>7.7%</strong>. Doubling the capital corpus to <strong>Nu. 8.6B by 2030</strong> with RGOB 1:1 matching guarantees perpetual health sovereignty.
          </p>
        </div>
      </div>
    </div>
  );
}
