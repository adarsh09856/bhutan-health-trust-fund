import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminNews,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
} from "@/lib/api/admin.functions";
import type { NewsArticle } from "@/lib/db/schema";
import {
  Plus,
  Search,
  Eye,
  Trash2,
  Edit3,
  ExternalLink,
  Loader2,
  X,
  Sparkles,
  Calendar,
  Image as ImageIcon,
  Tag,
  User,
} from "lucide-react";
import { toast } from "sonner";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/admin/news")({
  head: () => ({
    meta: [{ title: "News & Media Releases CMS | BHTF Admin" }],
  }),
  component: AdminNewsPage,
});

const coverOptions = [
  { label: "Routine Vaccines & Cold Chain", path: "/src/assets/news-vaccine.jpg", img: newsVaccine },
  { label: "Community Healthcare Access", path: "/src/assets/news-community.jpg", img: newsCommunity },
  { label: "Audited Reports & Governance", path: "/src/assets/news-report.jpg", img: newsReport },
];

export function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("Immunization");
  const [author, setAuthor] = useState("BHTF Communications");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("/src/assets/news-vaccine.jpg");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchArticles = async () => {
    try {
      const res = await getAdminNews();
      setArticles(res);
    } catch {
      toast.error("Failed to load news articles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    }
  };

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setSlug("");
    setCategory("Immunization");
    setAuthor("BHTF Communications");
    setExcerpt("");
    setContent("");
    setCoverImage("/src/assets/news-vaccine.jpg");
    setIsPublished(true);
    setModalOpen(true);
  };

  const openEditModal = (article: NewsArticle) => {
    setEditingId(article.id);
    setTitle(article.title);
    setSlug(article.slug);
    setCategory(article.category);
    setAuthor(article.author);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setCoverImage(article.coverImage);
    setIsPublished(article.isPublished);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateNewsArticle({
          data: {
            id: editingId,
            title,
            category,
            excerpt,
            content,
            coverImage,
            isPublished,
          },
        });
        toast.success("Article updated successfully!");
      } else {
        await createNewsArticle({
          data: {
            title,
            slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            category,
            excerpt,
            content,
            coverImage,
            author,
            isPublished,
          },
        });
        toast.success("New press release published successfully!");
      }
      setModalOpen(false);
      fetchArticles();
    } catch {
      toast.error("Failed to save article.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, articleTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${articleTitle}"?`)) return;
    try {
      await deleteNewsArticle({ data: { id } });
      toast.success("Article deleted from media room.");
      fetchArticles();
    } catch {
      toast.error("Failed to delete article.");
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Official Media Desk
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Press Releases & Media CMS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Draft, edit, and publish official communications, routine vaccination announcements, and partnership milestones.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-2xl shadow-md transition cursor-pointer active:scale-95"
          >
            <Plus className="h-4 w-4" /> Create Press Release
          </button>
        </div>

        {/* Search Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search press releases, categories, or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
          />
        </div>

        {/* Articles Table */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading media releases...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <ImageIcon className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No press releases found</h3>
            <p className="text-xs text-slate-500">Create a new article to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Headline & Slug</th>
                    <th className="py-3.5 px-5">Topic Category</th>
                    <th className="py-3.5 px-5">Published Date</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredArticles.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/80 transition group">
                      <td className="py-4 px-5 space-y-1 max-w-sm sm:max-w-md">
                        <div className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition leading-snug">
                          {a.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">/{a.slug}</div>
                      </td>

                      <td className="py-4 px-5">
                        <span className="font-extrabold text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {a.category}
                        </span>
                      </td>

                      <td className="py-4 px-5 font-mono text-slate-500">
                        {new Date(a.publishedAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-5">
                        <span
                          className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                            a.isPublished ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {a.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right space-x-2">
                        <Link
                          to="/news/$slug"
                          params={{ slug: a.slug }}
                          target="_blank"
                          className="inline-flex items-center gap-1 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                          title="View Live Article"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => openEditModal(a)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer text-xs shadow-xs"
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(a.id, a.title)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Create & Edit Press Release */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    Media Editorial Desk
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {editingId ? "Edit Press Release" : "New Press Release"}
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
                    Headline Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Nationwide Measles-Rubella Campaign Achieves 99.4% Reach"
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs sm:text-sm font-bold focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Topic Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="Immunization">Immunization & Vaccines</option>
                      <option value="Essential Medicines">Essential Medicines</option>
                      <option value="Governance">Governance & Audits</option>
                      <option value="Partnership">Global Partnerships</option>
                      <option value="Community">Community Healthcare</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Author Attribution
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="BHTF Media & Communications"
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Cover Image Selector */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Featured Cover Photo Asset
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {coverOptions.map((opt) => (
                      <div
                        key={opt.path}
                        onClick={() => setCoverImage(opt.path)}
                        className={`p-2 rounded-2xl border-2 transition cursor-pointer flex flex-col items-center gap-2 ${
                          coverImage === opt.path ? "border-emerald-600 bg-emerald-50/50" : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <img src={opt.img} alt={opt.label} className="h-16 w-full object-cover rounded-xl" />
                        <span className="text-[10px] font-bold text-slate-700 text-center">{opt.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Short Summary / Excerpt
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Brief 2-line summary visible in news cards..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Full Press Release Content
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Official statement and details..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none font-normal"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="publishToggle"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <label htmlFor="publishToggle" className="font-bold text-slate-800 text-xs">
                    Publish immediately to the public Media Room
                  </label>
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
                        <Sparkles className="h-4 w-4" /> Save & Publish
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
