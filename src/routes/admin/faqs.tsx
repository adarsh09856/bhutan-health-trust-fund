import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminFaqs,
  createAdminFaq,
  updateAdminFaq,
  deleteAdminFaq,
} from "@/lib/api/admin.functions";
import type { Faq } from "@/lib/db/schema";
import {
  HelpCircle,
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  X,
  Sparkles,
  CheckCircle2,
  XCircle,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/faqs")({
  head: () => ({
    meta: [{ title: "FAQs & Helpdesk CMS | BHTF Admin" }],
  }),
  component: AdminFaqsPage,
});

const defaultCategories = [
  "All",
  "General",
  "Contributions & Matching",
  "Procurement",
  "Governance",
  "Tax Exemption",
];

export function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedFaqId, setExpandedFaqId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("General");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchFaqs = async () => {
    try {
      const res = await getAdminFaqs();
      setFaqs(res);
    } catch {
      toast.error("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setCategory(selectedCategory !== "All" ? selectedCategory : "General");
    setOrderIndex(faqs.length + 1);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (f: Faq) => {
    setEditingId(f.id);
    setQuestion(f.question);
    setAnswer(f.answer);
    setCategory(f.category);
    setOrderIndex(f.orderIndex);
    setIsPublished(f.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      toast.error("Question and answer are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminFaq({
          data: {
            id: editingId,
            question,
            answer,
            category,
            orderIndex,
            isPublished,
          },
        });
        toast.success("FAQ updated successfully.");
      } else {
        await createAdminFaq({
          data: {
            question,
            answer,
            category,
            orderIndex,
            isPublished,
          },
        });
        toast.success("New FAQ entry created.");
      }
      setModalOpen(false);
      fetchFaqs();
    } catch {
      toast.error("Failed to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this FAQ entry?")) return;
    try {
      await deleteAdminFaq({ data: { id } });
      toast.success("FAQ deleted.");
      fetchFaqs();
    } catch {
      toast.error("Failed to delete FAQ.");
    }
  };

  const handleTogglePublish = async (f: Faq) => {
    try {
      await updateAdminFaq({
        data: {
          id: f.id,
          isPublished: !f.isPublished,
        },
      });
      toast.success(`FAQ ${!f.isPublished ? "published" : "hidden"}.`);
      fetchFaqs();
    } catch {
      toast.error("Failed to update FAQ status.");
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Citizen Helpdesk
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {faqs.filter((f) => f.isPublished).length} Published / {faqs.length} Total
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              FAQs & Knowledge Base CMS
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage citizen inquiries, donation matching FAQs, and sovereign procurement
              explanations shown across the site and /contact.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Add FAQ Entry
          </button>
        </div>

        {/* Categories Bar & Search */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {defaultCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs by question or answer keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Content list */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="text-sm font-semibold">Loading FAQ Repository...</span>
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
            <HelpCircle className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No FAQs Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {search
                ? `No FAQs match your search "${search}".`
                : "No questions have been configured for this category."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((f) => {
              const isExpanded = expandedFaqId === f.id;
              return (
                <div
                  key={f.id}
                  className={`bg-white rounded-2xl border transition hover:border-slate-300 ${
                    f.isPublished
                      ? "border-slate-200"
                      : "border-slate-200 opacity-60 bg-slate-50/50"
                  }`}
                >
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div
                      className="flex-1 cursor-pointer select-none"
                      onClick={() => setExpandedFaqId(isExpanded ? null : f.id)}
                    >
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md border border-slate-200 flex items-center gap-1">
                          <Tag className="h-2.5 w-2.5" />
                          {f.category}
                        </span>
                        <span className="text-slate-400 text-xs font-mono">#{f.orderIndex}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug flex items-center gap-2">
                        {f.question}
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 inline" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 inline" />
                        )}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(f)}
                        title={
                          f.isPublished ? "Published (Click to hide)" : "Hidden (Click to publish)"
                        }
                        className="cursor-pointer"
                      >
                        {f.isPublished ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="h-3 w-3" /> Live
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                            <XCircle className="h-3 w-3" /> Draft
                          </span>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditModal(f)}
                        className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                        title="Edit FAQ"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(f.id)}
                        className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete FAQ"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                      <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
                        {f.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Modal Dialog */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 my-8 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingId ? "Edit FAQ Entry" : "Create New FAQ"}
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. General, Contributions & Matching, Procurement"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Question *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How does the 1:1 Sovereign matching mechanism work?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Answer *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Detailed explanation answering the citizen's query..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Display Order</label>
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
                      id="isPublishedFaq"
                      checked={isPublished}
                      onChange={(e) => setIsPublished(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label
                      htmlFor="isPublishedFaq"
                      className="text-sm font-medium text-slate-700 cursor-pointer"
                    >
                      Published Live
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
                    {editingId ? "Update FAQ" : "Publish FAQ"}
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
