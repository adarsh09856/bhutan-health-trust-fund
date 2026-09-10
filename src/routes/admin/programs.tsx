import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminPrograms,
  createAdminProgram,
  updateAdminProgram,
  deleteAdminProgram,
} from "@/lib/api/admin.functions";
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
  Sparkles,
  Building2,
  Edit3,
  Trash2,
  X,
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

const iconOptions = ["Pill", "Syringe", "Stethoscope", "HeartPulse", "Microscope", "GraduationCap"];

export function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [icon, setIcon] = useState("Pill");
  const [targetDzongkhags, setTargetDzongkhags] = useState("All 20 Dzongkhags");
  const [beneficiariesReached, setBeneficiariesReached] = useState("780,000+ citizens");
  const [status, setStatus] = useState<"ACTIVE" | "PAUSED" | "COMPLETED">("ACTIVE");
  const [slugCustomized, setSlugCustomized] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchPrograms = async () => {
    try {
      const res = await getAdminPrograms();
      setPrograms(res);
    } catch {
      toast.error("Failed to load programs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slugCustomized && !editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      );
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setSummary("");
    setFullDescription("");
    setIcon("Pill");
    setTargetDzongkhags("All 20 Dzongkhags");
    setBeneficiariesReached("780,000+ citizens");
    setStatus("ACTIVE");
    setSlugCustomized(false);
    setModalOpen(true);
  };

  const openEditModal = (p: Program) => {
    setEditingId(p.id);
    setTitle(p.title);
    setSlug(p.slug);
    setSummary(p.summary);
    setFullDescription(p.fullDescription);
    setIcon(p.icon || "Pill");
    setTargetDzongkhags(p.targetDzongkhags || "All 20 Dzongkhags");
    setBeneficiariesReached(p.beneficiariesReached || "780,000+ citizens");
    setStatus((p.status as any) || "ACTIVE");
    setSlugCustomized(true);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateAdminProgram({
          data: {
            id: editingId,
            title,
            slug,
            summary,
            fullDescription,
            icon,
            targetDzongkhags,
            beneficiariesReached,
            status,
          },
        });
        toast.success("Commodity stream updated successfully.");
      } else {
        await createAdminProgram({
          data: {
            title,
            slug: slug || undefined,
            summary,
            fullDescription,
            icon,
            targetDzongkhags,
            beneficiariesReached,
            status,
          },
        });
        toast.success("New commodity stream cataloged successfully.");
      }
      setModalOpen(false);
      fetchPrograms();
    } catch {
      toast.error("Failed to save commodity program.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, programTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${programTitle}"?`)) return;
    try {
      await deleteAdminProgram({ data: { id } });
      toast.success("Commodity program removed.");
      fetchPrograms();
    } catch {
      toast.error("Failed to delete program.");
    }
  };

  const getStatusBadge = (st: string) => {
    switch (st) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "PAUSED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const filteredPrograms = programs.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.targetDzongkhags.toLowerCase().includes(search.toLowerCase()),
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
              Supervise the 6 sovereign procurement streams, cold-chain distribution, and district
              buffer allocations.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md shadow-emerald-700/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            <span>Create Program</span>
          </button>
        </div>

        {/* Metric Cards Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 border border-emerald-200">
              <Syringe className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                {programs.length} Streams
              </div>
              <div className="text-xs font-bold text-slate-500">
                Financed Healthcare Commodities
              </div>
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
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            p.status,
                          )}`}
                        >
                          {p.status}
                        </span>
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          WHO Prequalified
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                        {p.summary}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {p.fullDescription}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600 font-medium">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="h-3.5 w-3.5 text-emerald-600" /> Target Coverage:
                        </span>
                        <span className="font-bold text-slate-900 font-mono text-[11px]">
                          {p.targetDzongkhags}
                        </span>
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

                    {/* Action Buttons: Edit & Delete */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition cursor-pointer"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(p.id, p.title)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Create / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="sticky top-0 bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="font-black text-slate-900 text-base">
                    {editingId ? "Edit Commodity Stream" : "Add Healthcare Commodity Stream"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 grid place-items-center transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Stream Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Essential Medicines (NEDL Financed)"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => {
                        setSlug(e.target.value);
                        setSlugCustomized(true);
                      }}
                      placeholder="essential-medicines-nedl"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Operational Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as any)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    >
                      <option value="ACTIVE">ACTIVE (Fully Financed)</option>
                      <option value="PAUSED">PAUSED (Buffer Under Review)</option>
                      <option value="COMPLETED">COMPLETED (Transitioned)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Icon Representation
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {iconOptions.map((ic) => {
                      const IconComp = iconMap[ic] || Activity;
                      const isSelected = icon === ic;
                      return (
                        <button
                          key={ic}
                          type="button"
                          onClick={() => setIcon(ic)}
                          className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-bold transition cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <IconComp className="h-5 w-5" />
                          <span className="text-[10px]">{ic}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Target Dzongkhags Coverage
                    </label>
                    <input
                      type="text"
                      required
                      value={targetDzongkhags}
                      onChange={(e) => setTargetDzongkhags(e.target.value)}
                      placeholder="e.g. All 20 Dzongkhags"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Beneficiaries Reached Metric
                    </label>
                    <input
                      type="text"
                      required
                      value={beneficiariesReached}
                      onChange={(e) => setBeneficiariesReached(e.target.value)}
                      placeholder="e.g. 780,000+ citizens"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Summary (Short Impact Sentence) *
                  </label>
                  <input
                    type="text"
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief 1-line description of the commodity stream..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Full Description & Procurement Scope *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={fullDescription}
                    onChange={(e) => setFullDescription(e.target.value)}
                    placeholder="Detailed procurement logistics, specifications, cold chain requirements..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-black shadow-md shadow-emerald-700/20 transition cursor-pointer disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    <span>{editingId ? "Save Changes" : "Publish Program"}</span>
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
