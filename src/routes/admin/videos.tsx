import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminVideos,
  createAdminVideo,
  updateAdminVideo,
  deleteAdminVideo,
} from "@/lib/api/admin.functions";
import type { MediaVideo } from "@/lib/db/schema";
import {
  Video,
  Plus,
  Search,
  Eye,
  Trash2,
  Edit3,
  Loader2,
  X,
  Sparkles,
  Play,
  Clock,
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

export const Route = createFileRoute("/admin/videos")({
  head: () => ({
    meta: [{ title: "Public Media & Videos CMS | BHTF Admin" }],
  }),
  component: AdminVideosPage,
});

const defaultThumbnails = [
  { label: "Audited Reports & Governance", path: "/src/assets/news-report.jpg", img: newsReport },
  {
    label: "Routine Vaccines & Cold Chain",
    path: "/src/assets/news-vaccine.jpg",
    img: newsVaccine,
  },
  {
    label: "Community Healthcare Access",
    path: "/src/assets/news-community.jpg",
    img: newsCommunity,
  },
];

const categories = [
  "ALL",
  "Documentary",
  "Field Report",
  "Royal Address",
  "Impact Story",
  "Healthcare Briefing",
];

export function AdminVideosPage() {
  const [videos, setVideos] = useState<MediaVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [activeVideoPreview, setActiveVideoPreview] = useState<MediaVideo | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Documentary");
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [duration, setDuration] = useState("10:00");
  const [thumbnailUrl, setThumbnailUrl] = useState("/src/assets/news-report.jpg");
  const [description, setDescription] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const res = await getAdminVideos();
      setVideos(res || []);
    } catch {
      toast.error("Failed to load videos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setCategory("Documentary");
    setVideoUrl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
    setDuration("10:00");
    setThumbnailUrl("/src/assets/news-report.jpg");
    setDescription("");
    setOrderIndex(videos.length + 1);
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (v: MediaVideo) => {
    setEditingId(v.id);
    setTitle(v.title);
    setCategory(v.category);
    setVideoUrl(v.videoUrl);
    setDuration(v.duration);
    setThumbnailUrl(v.thumbnailUrl || "/src/assets/news-report.jpg");
    setDescription(v.description || "");
    setOrderIndex(v.orderIndex);
    setIsPublished(v.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) {
      toast.error("Title and video URL are required.");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateAdminVideo({
          data: {
            id: editingId,
            title: title.trim(),
            category,
            videoUrl: videoUrl.trim(),
            duration: duration.trim(),
            thumbnailUrl: thumbnailUrl.trim() || undefined,
            description: description.trim() || undefined,
            orderIndex: Number(orderIndex),
            isPublished,
          },
        });
        toast.success("Video record updated successfully.");
      } else {
        await createAdminVideo({
          data: {
            title: title.trim(),
            category,
            videoUrl: videoUrl.trim(),
            duration: duration.trim(),
            thumbnailUrl: thumbnailUrl.trim() || undefined,
            description: description.trim() || undefined,
            orderIndex: Number(orderIndex),
            isPublished,
          },
        });
        toast.success("New video briefing published successfully.");
      }
      setModalOpen(false);
      fetchVideos();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save video.");
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (v: MediaVideo) => {
    try {
      await updateAdminVideo({
        data: {
          id: v.id,
          isPublished: !v.isPublished,
        },
      });
      toast.success(
        v.isPublished ? "Video hidden from public view." : "Video published to media showcase.",
      );
      fetchVideos();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (id: number, videoTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete video "${videoTitle}"?`)) return;
    try {
      await deleteAdminVideo({ data: { id } });
      toast.success("Video deleted.");
      fetchVideos();
    } catch {
      toast.error("Failed to delete video.");
    }
  };

  const filteredVideos = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      (v.description && v.description.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCategory === "ALL" || v.category === selectedCategory;
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
                Broadcast & Media
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                Documentaries & Royal Decrees
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Public Media & Documentary Videos
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage YouTube and video embeds featuring Royal Addresses, cold-chain transport
              documentaries, and healthcare frontline reports.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchVideos}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              title="Refresh Videos"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Video Embed</span>
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
              placeholder="Search title, description..."
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

        {/* Video Cards Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3 bg-white border border-slate-200 rounded-3xl">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Querying media_videos table...</p>
          </div>
        ) : filteredVideos.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <Video className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No videos found</h3>
            <p className="text-xs text-slate-500">
              No video records match your current filter. Click "Add Video Embed" to publish.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group"
              >
                {/* Thumbnail & Play Overlay */}
                <div
                  className="relative aspect-video bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => setActiveVideoPreview(video)}
                >
                  <img
                    src={video.thumbnailUrl || "/src/assets/news-report.jpg"}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-80 group-hover:opacity-95"
                  />
                  {/* Central Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-slate-950/80 backdrop-blur-xs border border-white/40 grid place-items-center text-white shadow-xl group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-200">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-black uppercase tracking-wider">
                      {video.category}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/90 text-white text-[10px] font-mono font-bold">
                    <Clock className="h-2.5 w-2.5 text-amber-400" />
                    {video.duration}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTogglePublish(video);
                    }}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-slate-950/80 backdrop-blur-xs text-white hover:bg-slate-900 transition cursor-pointer"
                    title={video.isPublished ? "Visible publicly" : "Hidden"}
                  >
                    {video.isPublished ? (
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
                      {video.title}
                    </h3>
                    {video.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                      {video.videoUrl}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEditModal(video)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition cursor-pointer"
                        title="Edit video"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(video.id, video.title)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                        title="Delete video"
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

        {/* Modal: Add / Edit Video */}
        {modalOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 grid place-items-center">
                    <Video className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      {editingId ? "Edit Video Embed" : "Add Video Embed"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure public video documentary or official briefing
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
                  <label className="text-xs font-bold text-slate-700">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. 25 Years of Free Healthcare: The Royal Sovereign Mandate"
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
                      <option value="Documentary">Documentary</option>
                      <option value="Field Report">Field Report</option>
                      <option value="Royal Address">Royal Address</option>
                      <option value="Impact Story">Impact Story</option>
                      <option value="Healthcare Briefing">Healthcare Briefing</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Duration (MM:SS)</label>
                    <input
                      type="text"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="14:20"
                      className="w-full text-xs font-mono rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Video Stream URL *</label>
                  <input
                    type="text"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or Vimeo"
                    className="w-full text-xs font-mono rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Thumbnail Asset URL</label>
                  <input
                    type="text"
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="/src/assets/news-report.jpg"
                    className="w-full text-xs font-mono rounded-xl border border-slate-200 p-2.5 focus:border-emerald-600 focus:outline-none"
                  />

                  {/* Preset quick picker */}
                  <div className="pt-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-400">Presets:</span>
                    {defaultThumbnails.map((opt) => (
                      <button
                        key={opt.path}
                        type="button"
                        onClick={() => setThumbnailUrl(opt.path)}
                        className={`text-[10px] px-2 py-0.5 rounded-lg border transition cursor-pointer ${
                          thumbnailUrl === opt.path
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
                  <label className="text-xs font-bold text-slate-700">Synopsis / Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Summary of documentary contents and featured personnel..."
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
                      <Video className="h-3.5 w-3.5" />
                    )}
                    <span>{editingId ? "Update Video" : "Publish Video"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Video Player Modal */}
        {activeVideoPreview && (
          <div
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in"
            onClick={() => setActiveVideoPreview(null)}
          >
            <div
              className="max-w-3xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white truncate">
                    {activeVideoPreview.title}
                  </h4>
                  <span className="text-[10px] text-amber-400 font-mono">
                    {activeVideoPreview.duration}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideoPreview(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="aspect-video bg-black flex items-center justify-center">
                <div className="text-center space-y-3 p-6">
                  <Play className="h-12 w-12 text-amber-400 mx-auto" />
                  <p className="text-xs text-slate-300 font-mono max-w-md truncate">
                    {activeVideoPreview.videoUrl}
                  </p>
                  <a
                    href={activeVideoPreview.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition"
                  >
                    <span>Open Stream in New Window</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
