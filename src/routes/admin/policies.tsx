import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminPolicies,
  createAdminPolicy,
  updateAdminPolicy,
  deleteAdminPolicy,
} from "@/lib/api/admin.functions";
import type { Policy } from "@/lib/db/schema";
import {
  Plus,
  Search,
  ShieldCheck,
  Edit3,
  Trash2,
  Loader2,
  X,
  Scale,
  Award,
  Lock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/policies")({
  head: () => ({
    meta: [{ title: "Policies & Royal Charters CMS | BHTF Admin" }],
  }),
  component: AdminPoliciesPage,
});

export function AdminPoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Governance");
  const [effectiveDate, setEffectiveDate] = useState("2024");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchPolicies = async () => {
    try {
      const res = await getAdminPolicies();
      setPolicies(res);
    } catch {
      toast.error("Failed to load policies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Governance");
    setEffectiveDate("2024");
    setSummary("");
    setContent("");
    setFileUrl("");
    setModalOpen(true);
  };

  const openEditModal = (p: Policy) => {
    setEditingId(p.id);
    setTitle(p.title);
    setCategory(p.category);
    setEffectiveDate(p.effectiveDate);
    setSummary(p.summary);
    setContent(p.content);
    setFileUrl(p.fileUrl || "");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminPolicy({
          data: {
            id: editingId,
            title,
            category,
            effectiveDate,
            summary,
            content,
            fileUrl: fileUrl || undefined,
          },
        });
        toast.success("Policy charter updated successfully.");
      } else {
        await createAdminPolicy({
          data: {
            title,
            category,
            effectiveDate,
            summary,
            content,
            fileUrl: fileUrl || undefined,
          },
        });
        toast.success("New governance instrument created successfully.");
      }
      setModalOpen(false);
      fetchPolicies();
    } catch {
      toast.error("Failed to save policy.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, policyTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${policyTitle}"?`)) return;
    try {
      await deleteAdminPolicy({ data: { id } });
      toast.success("Policy removed.");
      fetchPolicies();
    } catch {
      toast.error("Failed to delete policy.");
    }
  };

  const filteredPolicies = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Institutional Governance
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Policies, Charters & Fiduciary Guidelines
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Supervise foundational legal decrees, pharmaceutical procurement guidelines, and anti-corruption frameworks.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-2xl shadow-md transition cursor-pointer active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add Legal Instrument
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search policies, procurement guidelines, or ethics codes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
          />
        </div>

        {/* Policies Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading regulatory instruments...</p>
          </div>
        ) : filteredPolicies.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <ShieldCheck className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No policies found</h3>
            <p className="text-xs text-slate-500">Create a new governance instrument to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPolicies.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {p.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Effective: {p.effectiveDate}
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
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {p.fileUrl ? "PDF Instrument Attached" : "Internal Policy Text"}
                  </span>

                  <div className="space-x-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(p)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer text-xs shadow-xs"
                    >
                      <Edit3 className="h-3 w-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                      title="Delete Policy"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Create & Edit Policy */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    Governance Instruments
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {editingId ? "Edit Legal Instrument" : "New Legal Instrument"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Instrument Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Pharmaceutical Procurement & WHO Prequalification Policy"
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs sm:text-sm font-bold focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Governance Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="Governance">Foundational Charter</option>
                      <option value="Procurement">Procurement & Quality</option>
                      <option value="Ethics">Anti-Corruption & Ethics</option>
                      <option value="Finance">Investment Fiduciary</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Effective Year / Date
                    </label>
                    <input
                      type="text"
                      required
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      placeholder="2024"
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Executive Summary
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Concise overview of the legal mandate and fiduciary requirements..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Full Policy Text & Articles
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Official statutory text, section numbers, and provisions..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none font-normal"
                  />
                </div>

                <div className="pt-4 border-t flex justify-between gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Save Legal Instrument
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancel
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
