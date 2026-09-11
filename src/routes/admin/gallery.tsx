import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminGallery,
  createAdminGalleryItem,
  updateAdminGalleryItem,
  deleteAdminGalleryItem,
} from "@/lib/api/admin.functions";
import type { MediaGalleryItem } from "@/lib/db/schema";
import {
  Camera,
  Plus,
  Search,
  Eye,
  Trash2,
  Edit3,
  Loader2,
  X,
  Sparkles,
  MapPin,
  Tag,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Layers,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({
    meta: [{ title: "Field Operations Gallery CMS | BHTF Admin" }],
  }),
  component: AdminGalleryPage,
});

const defaultImageOptions = [
  {
    label: "Community Healthcare Access",
    path: "/src/assets/news-community.jpg",
    img: newsCommunity,
  },
  {
    label: "Routine Vaccines & Cold Chain",
    path: "/src/assets/news-vaccine.jpg",
    img: newsVaccine,
  },
  { label: "Audited Reports & Governance", path: "/src/assets/news-report.jpg", img: newsReport },
];

const categories = [
  "ALL",
  "Highlands Outreach",
  "Cold Chain",
  "Clinics",
  "Immunization",
  "Royal Visits",
  "Field Operations",
];

const dzongkhagsList = [
  "All 20 Dzongkhags",
  "Gasa",
  "Thimphu",
  "Paro",
  "Haa",
  "Punakha",
  "Wangdue Phodrang",
  "Bumthang",
  "Trongsa",
  "Zhemgang",
  "Chhukha",
  "Dagana",
  "Samtse",
  "Sarpang",
  "Tsirang",
  "Mongar",
  "Lhuentse",
  "Trashigang",
  "Trashiyangtse",
  "Pemagatshel",
  "Samdrup Jongkhar",
];

export function AdminGalleryPage() {
  const [items, setItems] = useState<MediaGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Field Operations");
  const [imageUrl, setImageUrl] = useState("/src/assets/news-community.jpg");
  const [caption, setCaption] = useState("");
  const [dzongkhag, setDzongkhag] = useState("All 20 Dzongkhags");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await getAdminGallery();
      setItems(res || []);
    } catch {
      toast.error("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Field Operations");
    setImageUrl("/src/assets/news-community.jpg");
    setCaption("");
    setDzongkhag("All 20 Dzongkhags");
    setOrderIndex(items.length + 1);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (item: MediaGalleryItem) => {
    setEditingId(item.id);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setCaption(item.caption || "");
    setDzongkhag(item.dzongkhag);
    setOrderIndex(item.orderIndex);
    setIsPublished(item.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      toast.error("Title and image are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminGalleryItem({
          data: {
            id: editingId,
            title: title.trim(),
            category,
            imageUrl: imageUrl.trim(),
            caption: caption.trim() || undefined,
            dzongkhag,
            orderIndex: Number(orderIndex),
            isPublished,
          },
        });
        toast.success("Gallery image updated successfully.");
      } else {
        await createAdminGalleryItem({
          data: {
            title: title.trim(),
            category,
            imageUrl: imageUrl.trim(),
            caption: caption.trim() || undefined,
            dzongkhag,
            orderIndex: Number(orderIndex),
            isPublished,
          },
        });
        toast.success("New gallery photo published successfully.");
      }
      setModalOpen(false);
      fetchGallery();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save gallery photo.");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (item: MediaGalleryItem) => {
    try {
      await updateAdminGalleryItem({
        data: {
          id: item.id,
          isPublished: !item.isPublished,
        },
      });
      toast.success(
        item.isPublished ? "Photo hidden from public." : "Photo published to live gallery.",
      );
      fetchGallery();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id: number, itemTitle: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${itemTitle}"?`)) return;
    try {
      await deleteAdminGalleryItem({ data: { id } });
      toast.success("Gallery photo deleted.");
      fetchGallery();
    } catch {
      toast.error("Failed to delete photo.");
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(search.toLowerCase())) ||
      item.dzongkhag.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "ALL" || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                Visual Archive
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                Field Operations & Cold Chain
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Field Operations Photo Gallery
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Curate and publish authentic photographic evidence of cold-chain vaccine transport,
              highland outreach clinics, and health worker missions across Bhutan.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchGallery}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              title="Refresh Gallery"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Field Photo</span>
            </button>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, caption, dzongkhag..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-600 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <span className="text-[11px] font-bold text-slate-400 mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white border border-slate-200 rounded-3xl">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Querying media_gallery table...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <Camera className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No photos found</h3>
            <p className="text-xs text-slate-500">
              No gallery items match your current filter. Click "Add Field Photo" to upload.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    onClick={() => setPreviewImage(item.imageUrl)}
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                      <MapPin className="h-2.5 w-2.5" />
                      {item.dzongkhag}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTogglePublish(item)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-slate-950/80 backdrop-blur-xs text-white hover:bg-slate-900 transition cursor-pointer"
                    title={item.isPublished ? "Visible publicly" : "Hidden"}
                  >
                    {item.isPublished ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    {item.caption && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      Order: #{item.orderIndex}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition cursor-pointer"
                        title="Edit photo"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.title)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Add / Edit Photo */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 grid place-items-center">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {editingId ? "Edit Field Photo" : "Add Field Photo"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Upload photographic record to the sovereign media archive
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Photo Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Cold-Chain Delivery to Lunana Highlands"
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Highlands Outreach">Highlands Outreach</option>
                      <option value="Cold Chain">Cold Chain</option>
                      <option value="Clinics">Clinics</option>
                      <option value="Immunization">Immunization</option>
                      <option value="Royal Visits">Royal Visits</option>
                      <option value="Field Operations">Field Operations</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Dzongkhag</label>
                    <select
                      value={dzongkhag}
                      onChange={(e) => setDzongkhag(e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 bg-white focus:border-emerald-600 focus:outline-none"
                    >
                      {dzongkhagsList.map((dz) => (
                        <option key={dz} value={dz}>
                          {dz}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Image Asset URL *</label>
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="/src/assets/news-community.jpg or https://..."
                    className="w-full text-xs font-mono rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                  />

                  {/* Preset quick picker */}
                  <div className="pt-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">Quick presets:</span>
                    {defaultImageOptions.map((opt) => (
                      <button
                        key={opt.path}
                        type="button"
                        onClick={() => setImageUrl(opt.path)}
                        className={`text-[10px] px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                          imageUrl === opt.path
                            ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {opt.label.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Caption / Notes</label>
                  <textarea
                    rows={2}
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Brief description of the health operation or medical delivery..."
                    className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Sort Order</label>
                    <input
                      type="number"
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1 pt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPublished}
                        onChange={(e) => setIsPublished(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-slate-800">Publish Immediately</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {saving ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Camera className="h-3.5 w-3.5" />
                    )}
                    <span>{editingId ? "Update Photo" : "Publish Photo"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lightbox Preview */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in"
            onClick={() => setPreviewImage(null)}
          >
            <div className="max-w-4xl max-h-[90vh] relative">
              <img
                src={previewImage}
                alt="Preview"
                className="rounded-2xl max-w-full max-h-[85vh] object-contain shadow-2xl"
              />
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
