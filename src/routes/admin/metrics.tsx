import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminMetrics,
  createAdminMetric,
  updateAdminMetric,
  deleteAdminMetric,
} from "@/lib/api/admin.functions";
import type { ImpactMetric } from "@/lib/db/schema";
import {
  BarChart3,
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  X,
  Sparkles,
  Users,
  HeartPulse,
  Building2,
  ShieldCheck,
  Activity,
  Award,
  Stethoscope,
  Pill,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/metrics")({
  head: () => ({
    meta: [{ title: "National Impact Statistics CMS | BHTF Admin" }],
  }),
  component: AdminMetricsPage,
});

const iconMap: Record<string, any> = {
  Users,
  HeartPulse,
  Building2,
  ShieldCheck,
  Activity,
  Award,
  Stethoscope,
  Pill,
};

const iconOptions = [
  "Users",
  "HeartPulse",
  "Building2",
  "ShieldCheck",
  "Activity",
  "Award",
  "Stethoscope",
  "Pill",
];

export function AdminMetricsPage() {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("Users");
  const [badge, setBadge] = useState("Verified");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchMetrics = async () => {
    try {
      const res = await getAdminMetrics();
      setMetrics(res);
    } catch {
      toast.error("Failed to load impact metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setLabel("");
    setValue("");
    setDescription("");
    setIcon("Users");
    setBadge("Verified");
    setOrderIndex(metrics.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (m: ImpactMetric) => {
    setEditingId(m.id);
    setLabel(m.label);
    setValue(m.value);
    setDescription(m.description);
    setIcon(m.icon);
    setBadge(m.badge);
    setOrderIndex(m.orderIndex);
    setIsActive(m.isActive);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !value.trim() || !description.trim()) {
      toast.error("All metric fields are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminMetric({
          data: {
            id: editingId,
            label,
            value,
            description,
            icon,
            badge,
            orderIndex,
            isActive,
          },
        });
        toast.success("Impact metric updated.");
      } else {
        await createAdminMetric({
          data: {
            label,
            value,
            description,
            icon,
            badge,
            orderIndex,
            isActive,
          },
        });
        toast.success("New impact metric configured.");
      }
      setModalOpen(false);
      fetchMetrics();
    } catch {
      toast.error("Failed to save metric.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, metricLabel: string) => {
    if (!window.confirm(`Are you sure you want to delete the metric "${metricLabel}"?`)) return;
    try {
      await deleteAdminMetric({ data: { id } });
      toast.success("Metric deleted.");
      fetchMetrics();
    } catch {
      toast.error("Failed to delete metric.");
    }
  };

  const handleToggleActive = async (m: ImpactMetric) => {
    try {
      await updateAdminMetric({
        data: {
          id: m.id,
          isActive: !m.isActive,
        },
      });
      toast.success(`Metric "${m.label}" status updated.`);
      fetchMetrics();
    } catch {
      toast.error("Failed to toggle metric status.");
    }
  };

  const filteredMetrics = metrics.filter(
    (m) =>
      m.label.toLowerCase().includes(search.toLowerCase()) ||
      m.value.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                National Statistics
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {metrics.filter((m) => m.isActive).length} Active on Public Homepage
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              National Impact Statistics CMS
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Control the headline metrics, vaccine coverage percentages, and citizens protected displayed on the public portal.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Add Impact Statistic
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search statistics by label, value, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="text-sm font-semibold">Loading National Metrics...</span>
          </div>
        ) : filteredMetrics.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
            <BarChart3 className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Metrics Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {search
                ? `No metrics match your search "${search}".`
                : "No impact statistics configured yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMetrics.map((m) => {
              const IconComp = iconMap[m.icon] || BarChart3;
              return (
                <div
                  key={m.id}
                  className={`bg-white rounded-2xl border transition hover:shadow-md flex flex-col justify-between overflow-hidden ${
                    m.isActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50/50"
                  }`}
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                        <IconComp className="h-5 w-5" />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleActive(m)}
                        title={m.isActive ? "Active (Click to Deactivate)" : "Inactive (Click to Activate)"}
                        className="cursor-pointer"
                      >
                        {m.isActive ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            <XCircle className="h-3 w-3" /> Hidden
                          </span>
                        )}
                      </button>
                    </div>

                    <div>
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-sm font-bold text-emerald-800 mt-0.5">{m.label}</div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                      {m.description}
                    </p>
                  </div>

                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded">
                      {m.badge}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(m)}
                        className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                        title="Edit Metric"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(m.id, m.label)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Metric"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Dialog */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 my-8 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingId ? "Edit Impact Metric" : "Add National Impact Statistic"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Display Value *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 780,000+ or 99.8%"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Audit Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Verified, Royal Charter, WHO"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Metric Headline Label *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Citizens Protected with Essential Medicines"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Official Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief explanation of the statistical methodology or impact scope..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Icon Symbol</label>
                  <div className="grid grid-cols-4 gap-2">
                    {iconOptions.map((opt) => {
                      const IconItem = iconMap[opt] || BarChart3;
                      const isSelected = icon === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setIcon(opt)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-xs font-medium cursor-pointer transition ${
                            isSelected
                              ? "bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20"
                              : "border-slate-200 hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          <IconItem className="h-4 w-4" />
                          <span className="text-[10px] truncate">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Sort Order</label>
                    <input
                      type="number"
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-6">
                    <input
                      type="checkbox"
                      id="isActiveMetric"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="isActiveMetric" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Live on Homepage
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition disabled:opacity-50 cursor-pointer"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingId ? "Update Metric" : "Add Statistic"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
