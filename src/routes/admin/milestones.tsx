import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminMilestones,
  createAdminMilestone,
  updateAdminMilestone,
  deleteAdminMilestone,
} from "@/lib/api/admin.functions";
import type { Milestone } from "@/lib/db/schema";
import {
  History,
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  X,
  Sparkles,
  Calendar,
  Clock,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/milestones")({
  head: () => ({
    meta: [{ title: "Institutional History & Milestones | BHTF Admin" }],
  }),
  component: AdminMilestonesPage,
});

export function AdminMilestonesPage() {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchMilestones = async () => {
    try {
      const res = await getAdminMilestones();
      setMilestones(res);
    } catch {
      toast.error("Failed to load milestones.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilestones();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setYear(new Date().getFullYear().toString());
    setTitle("");
    setDescription("");
    setOrderIndex(milestones.length + 1);
    setModalOpen(true);
  };

  const openEditModal = (m: Milestone) => {
    setEditingId(m.id);
    setYear(m.year);
    setTitle(m.title);
    setDescription(m.description);
    setOrderIndex(m.orderIndex);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!year.trim() || !title.trim() || !description.trim()) {
      toast.error("All milestone fields are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminMilestone({
          data: {
            id: editingId,
            year,
            title,
            description,
            orderIndex,
          },
        });
        toast.success("Historical milestone updated.");
      } else {
        await createAdminMilestone({
          data: {
            year,
            title,
            description,
            orderIndex,
          },
        });
        toast.success("New institutional milestone recorded.");
      }
      setModalOpen(false);
      fetchMilestones();
    } catch {
      toast.error("Failed to save milestone.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, milestoneTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete the milestone "${milestoneTitle}"?`))
      return;
    try {
      await deleteAdminMilestone({ data: { id } });
      toast.success("Milestone deleted.");
      fetchMilestones();
    } catch {
      toast.error("Failed to delete milestone.");
    }
  };

  const filteredMilestones = milestones.filter(
    (m) =>
      m.year.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Institutional Memory
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {milestones.length} Historical Chronologies
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Historical Milestones Timeline CMS
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Curate the royal decrees, foundational charters, and endowment growth milestones
              presented on the /about timeline.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Add Milestone
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search milestones by year, title, or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Timeline View */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="text-sm font-semibold">Loading Historical Milestones...</span>
          </div>
        ) : filteredMilestones.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
            <History className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Milestones Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {search
                ? `No milestones match your search "${search}".`
                : "No historical milestones registered yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMilestones.map((m, idx) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 transition hover:shadow-md flex flex-col sm:flex-row sm:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-16 sm:w-20 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                      Year
                    </span>
                    <span className="text-base sm:text-lg font-black">{m.year}</span>
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                      <span className="text-xs text-slate-400 font-mono">#{m.orderIndex}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                      {m.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => openEditModal(m)}
                    className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer"
                    title="Edit Milestone"
                  >
                    <Edit3 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(m.id, m.title)}
                    className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    title="Delete Milestone"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
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
                    {editingId ? "Edit Milestone" : "Add Institutional Milestone"}
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
                    <label className="text-xs font-bold text-slate-700">Year / Era *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1998 or 2024"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Chronological Sort Order
                    </label>
                    <input
                      type="number"
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Milestone Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Charter Promulgation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Historical Significance & Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Elaborate on the institutional impact, government contribution, or healthcare milestone..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
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
                    {editingId ? "Update Milestone" : "Record Milestone"}
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
