import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminTrustees,
  createAdminTrustee,
  updateAdminTrustee,
  deleteAdminTrustee,
} from "@/lib/api/admin.functions";
import type { Trustee } from "@/lib/db/schema";
import {
  Users,
  Plus,
  Search,
  Edit3,
  Trash2,
  Loader2,
  X,
  Sparkles,
  Award,
  Building2,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/trustees")({
  head: () => ({
    meta: [{ title: "Board of Trustees CMS | BHTF Admin" }],
  }),
  component: AdminTrusteesPage,
});

export function AdminTrusteesPage() {
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [organization, setOrganization] = useState("");
  const [badge, setBadge] = useState("Trustee");
  const [bio, setBio] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchTrustees = async () => {
    try {
      const res = await getAdminTrustees();
      setTrustees(res);
    } catch {
      toast.error("Failed to load trustees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrustees();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setRole("");
    setOrganization("");
    setBadge("Trustee");
    setBio("");
    setPhotoUrl("");
    setOrderIndex(trustees.length + 1);
    setIsActive(true);
    setModalOpen(true);
  };

  const openEditModal = (t: Trustee) => {
    setEditingId(t.id);
    setName(t.name);
    setRole(t.role);
    setOrganization(t.organization);
    setBadge(t.badge);
    setBio(t.bio);
    setPhotoUrl(t.photoUrl || "");
    setOrderIndex(t.orderIndex);
    setIsActive(t.isActive);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !organization.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminTrustee({
          data: {
            id: editingId,
            name,
            role,
            organization,
            badge,
            bio,
            photoUrl: photoUrl.trim() || undefined,
            orderIndex,
            isActive,
          },
        });
        toast.success("Trustee details updated successfully.");
      } else {
        await createAdminTrustee({
          data: {
            name,
            role,
            organization,
            badge,
            bio,
            photoUrl: photoUrl.trim() || undefined,
            orderIndex,
            isActive,
          },
        });
        toast.success("New trustee appointed successfully.");
      }
      setModalOpen(false);
      fetchTrustees();
    } catch {
      toast.error("Failed to save trustee.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, trusteeName: string) => {
    if (!window.confirm(`Are you sure you want to remove ${trusteeName} from the Board?`)) return;
    try {
      await deleteAdminTrustee({ data: { id } });
      toast.success("Trustee removed.");
      fetchTrustees();
    } catch {
      toast.error("Failed to remove trustee.");
    }
  };

  const handleToggleStatus = async (t: Trustee) => {
    try {
      await updateAdminTrustee({
        data: {
          id: t.id,
          isActive: !t.isActive,
        },
      });
      toast.success(`${t.name} status updated.`);
      fetchTrustees();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const filteredTrustees = trustees.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase()) ||
      t.organization.toLowerCase().includes(search.toLowerCase()) ||
      t.badge.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Fiduciary Oversight
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {trustees.length} Members Appointed
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Board of Trustees Directory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage high-level fiduciary governors, committee chairs, institutional affiliations, and public bios.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" />
            Appoint Trustee
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role, organization, or badge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Loading / Empty / Content */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="text-sm font-semibold">Loading Board Members...</span>
          </div>
        ) : filteredTrustees.length === 0 ? (
          <div className="py-16 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-8">
            <Users className="h-10 w-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Trustees Found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {search
                ? `No trustees matched your query "${search}". Try searching with another keyword.`
                : "No board members have been registered yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrustees.map((t) => (
              <div
                key={t.id}
                className={`bg-white rounded-2xl border transition hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  t.isActive ? "border-slate-200" : "border-slate-200 opacity-60 bg-slate-50/50"
                }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                        {t.photoUrl ? (
                          <img
                            src={t.photoUrl}
                            alt={t.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <Users className="h-6 w-6 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200/60 inline-block mb-1">
                          {t.badge}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">{t.name}</h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleStatus(t)}
                      title={t.isActive ? "Active (Click to Deactivate)" : "Inactive (Click to Activate)"}
                      className="cursor-pointer"
                    >
                      {t.isActive ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          <XCircle className="h-3 w-3" /> Inactive
                        </span>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-emerald-800">{t.role}</p>
                    <p className="text-slate-500 flex items-center gap-1">
                      <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {t.organization}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed border-t border-slate-100 pt-3">
                    {t.bio}
                  </p>
                </div>

                <div className="px-6 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Order: #{t.orderIndex}</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEditModal(t)}
                      className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
                      title="Edit Trustee"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                      title="Remove Trustee"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Modal Dialog */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 my-8 overflow-hidden animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingId ? "Edit Trustee Profile" : "Appoint New Trustee"}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dasho Dechen Wangmo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Board Role *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chairwoman / Trustee"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Display Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Chairman, Trustee, Member Secretary"
                      value={badge}
                      onChange={(e) => setBadge(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">Organization / Affiliation *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Former Minister of Health / Ministry of Finance"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-slate-700">Official Biography *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter executive summary of credentials, royal appointments, and expertise..."
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Photo URL (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. /images/trustees/chair.jpg"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Display Order</label>
                    <input
                      type="number"
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>

                  <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="isActiveCheckbox"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                      className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                    />
                    <label htmlFor="isActiveCheckbox" className="text-sm font-medium text-slate-700 cursor-pointer">
                      Publish member to the public Board directory (/about)
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
                    {editingId ? "Save Changes" : "Appoint Trustee"}
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
