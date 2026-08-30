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
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/news")({
  head: () => ({
    meta: [{ title: "News & Media Manager | BHTF Admin" }],
  }),
  component: AdminNewsPage,
});

function AdminNewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
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

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
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
        toast.success("News article updated successfully!");
      } else {
        await createNewsArticle({
          data: {
            title,
            category,
            author,
            excerpt,
            content,
            coverImage,
            isPublished,
          },
        });
        toast.success("New article published successfully!");
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
      toast.success("Article deleted.");
      fetchArticles();
    } catch {
      toast.error("Failed to delete article.");
    }
  };

  const handleTogglePublish = async (article: NewsArticle) => {
    try {
      await updateNewsArticle({
        data: {
          id: article.id,
          isPublished: !article.isPublished,
        },
      });
      toast.success(`Article ${!article.isPublished ? "Published" : "Moved to Drafts"}.`);
      fetchArticles();
    } catch {
      toast.error("Failed to toggle status.");
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">News & Press Releases Manager</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Draft, edit, publish, and manage public health announcements and articles.
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition"
          >
            <Plus className="h-4 w-4" /> Create New Article
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search articles by title, keyword, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm outline-none bg-transparent"
          />
        </div>

        {/* Articles Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Loading articles...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No news articles found matching your criteria.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Article</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Views</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredArticles.map((a) => (
                    <tr key={a.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 line-clamp-1">{a.title}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{a.excerpt}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {a.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleTogglePublish(a)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition ${
                            a.isPublished
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {a.isPublished ? "● Published" : "○ Draft"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                        {a.viewsCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(a.publishedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to="/news/$slug"
                            params={{ slug: a.slug }}
                            target="_blank"
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
                            title="View Public Article"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => openEditModal(a)}
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-primary transition"
                            title="Edit Article"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(a.id, a.title)}
                            className="p-1.5 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition"
                            title="Delete Article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create / Edit Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingId ? "Edit News Article" : "Create New Press Article"}
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
                    Headline / Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. BHTF Expands Vaccine Rollout to Highlands"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Immunization">Immunization</option>
                      <option value="Essential Medicines">Essential Medicines</option>
                      <option value="Governance">Governance</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Community">Community</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Author / Desk
                    </label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Summary / Excerpt
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    placeholder="Short 1-2 sentence lead for cards and preview lists..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Full Article Content (Markdown / Text)
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write the full press release or article here..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isPublishedCheck"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isPublishedCheck" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Publish immediately to the public portal
                  </label>
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
                    {editingId ? "Save Changes" : "Publish Article"}
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
