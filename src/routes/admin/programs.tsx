import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getPublicPrograms } from "@/lib/api/public.functions";
import type { Program } from "@/lib/db/schema";
import {
  Activity,
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  Microscope,
  GraduationCap,
  Users,
  MapPin,
  Loader2,
  Plus,
  Search,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Coins,
  Building2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/programs")({
  head: () => ({
    meta: [{ title: "Healthcare Programs & Commodities | BHTF Admin" }],
  }),
  component: AdminProgramsPage,
});

const iconMap: Record<string, any> = {
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  Microscope,
  GraduationCap,
};

export function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  useEffect(() => {
    getPublicPrograms()
      .then((res) => setPrograms(res))
      .catch(() => toast.error("Failed to load programs."))
      .finally(() => setLoading(false));
  }, []);

  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.targetDzongkhags.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Core Health Logistics
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Healthcare Commodity Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Supervise the 6 sovereign procurement streams, cold-chain distribution, and district buffer allocations.
            </p>
          </div>
        </div>

        {/* Metric Cards Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 border border-emerald-200">
              <Syringe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">6 Streams</div>
              <div className="text-xs font-bold text-slate-500">Financed Healthcare Commodities</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 border border-amber-200">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">20 / 20</div>
              <div className="text-xs font-bold text-slate-500">Dzongkhags Buffer Monitored</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 border border-blue-200">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">780,000+</div>
              <div className="text-xs font-bold text-slate-500">Protected Citizens Nationwide</div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search commodity streams, vaccines, medicines, or target Dzongkhags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
          />
        </div>

        {/* Programs Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading health commodity streams...</p>
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Activity className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No matching programs found</h3>
            <p className="text-xs text-slate-500">Try adjusting your keyword search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((p) => {
              const Icon = iconMap[p.icon] || Activity;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 flex flex-col justify-between space-y-5 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        WHO Prequalified
                      </span>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                        {p.summary}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                      {p.fullDescription}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-600 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="h-3.5 w-3.5 text-emerald-600" /> Target Coverage:
                      </span>
                      <span className="font-bold text-slate-900 font-mono text-[11px]">{p.targetDzongkhags}</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Users className="h-3.5 w-3.5 text-blue-600" /> Beneficiaries:
                      </span>
                      <span className="font-extrabold text-emerald-700 font-mono text-[11px]">
                        {p.beneficiariesReached}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
