import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getPublicPrograms } from "@/lib/api/public.functions";
import type { Program } from "@/lib/db/schema";
import { Activity, Pill, Syringe, Stethoscope, HeartPulse, Microscope, GraduationCap, Users, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/programs")({
  head: () => ({
    meta: [{ title: "Healthcare Programs | BHTF Admin" }],
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

function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublicPrograms()
      .then((res) => setPrograms(res))
      .catch(() => toast.error("Failed to load programs."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="pb-4 border-b border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Healthcare Program Initiatives</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Core healthcare commodity financing streams maintained across the Kingdom of Bhutan.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm">Loading health programs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {programs.map((p) => {
              const Icon = iconMap[p.icon] || Activity;
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
                >
                  <div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.summary}</p>
                    <p className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                      {p.fullDescription}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span>{p.targetDzongkhags}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">{p.beneficiariesReached}</span>
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
