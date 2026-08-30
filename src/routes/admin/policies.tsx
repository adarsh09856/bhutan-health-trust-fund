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
import { Plus, Search, ShieldCheck, Edit3, Trash2, Loader2, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/policies")({
  head: () => ({
    meta: [{ title: "Policies & Governance | BHTF Admin" }],
  }),
  component: AdminPoliciesPage,
});

function AdminPoliciesPage() {
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
        toast.success("Policy charter updated.");
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
        toast.success("New policy charter added.");
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
    if (!window.confirm(`Are you sure you want to remove "${policyTitle}"?`)) return;
    try {
      await deleteAdminPolicy({ data: { id } });
      toast.success("Policy removed.");
      fetchPolicies();
    } catch {
      toast.error("Failed to delete policy.");
    }
  };

  const filtered = policies.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Institutional Policies & Charters</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Manage fiduciary regulations, anti-corruption safeguards, whistleblower protocols, and procurement rules.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition"
          >
            <Plus className="h-4 w-4" /> Add Policy Document
          </button>
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search policies by name, regulatory category, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        {/* Policies Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <p className="text-sm">Loading policies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 text-sm">
            No policies found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-slate-300 transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {p.category}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Rev. {p.effectiveDate}</span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{p.summary}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Updated {new Date(p.updatedAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-primary transition"
                      title="Edit Policy"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition"
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

        {/* Create / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit Policy Charter" : "Add Policy Document"}
                </h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Policy Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Anti-Corruption & Whistleblower Protocol"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Governance">Governance</option>
                      <option value="Procurement">Procurement</option>
                      <option value="Ethics">Ethics</option>
                      <option value="Finance">Finance</option>
                      <option value="Privacy">Privacy</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Effective Year
                    </label>
                    <input
                      type="text"
                      required
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      placeholder="2024"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Executive Summary
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief 1-2 sentence overview for public card display..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Full Charter Content
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Full regulatory text, clauses, and guidelines..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    PDF Document Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="/documents/policy.pdf"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition shadow-xs disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editingId ? "Save Changes" : "Create Policy"}
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
