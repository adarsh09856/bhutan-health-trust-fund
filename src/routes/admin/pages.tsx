import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminPages,
  createAdminPage,
  deleteAdminPage,
  resetAdminPageToDefault,
} from "@/lib/api/admin.functions";
import type { CustomPage } from "@/lib/db/schema";
import {
  Layers,
  Plus,
  Edit3,
  ExternalLink,
  RotateCcw,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Globe,
  Loader2,
  FileCode2,
  X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/pages")({
  head: () => ({
    meta: [{ title: "Pages & Live Page Builder | BHTF Admin" }],
  }),
  component: AdminPagesList,
});

export function AdminPagesList() {
  const [pages, setPages] = useState<CustomPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const fetchPages = async () => {
    try {
      const res = await getAdminPages();
      setPages(res);
    } catch {
      toast.error("Failed to load customizable pages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) {
      toast.error("Please enter both title and slug.");
      return;
    }

    setCreating(true);
    try {
      const created = await createAdminPage({
        data: {
          title: newTitle.trim(),
          slug: newSlug.trim().toLowerCase(),
        },
      });
      toast.success(`Page "${created.title}" created successfully!`);
      setCreateModalOpen(false);
      setNewTitle("");
      setNewSlug("");
      await fetchPages();
      router.navigate({
        to: "/admin/page-editor",
        search: { slug: created.slug },
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to create page.");
    } finally {
      setCreating(false);
    }
  };

  const handleReset = async (slug: string) => {
    if (!confirm(`Are you sure you want to reset "${slug}" back to its default sovereign template?`)) {
      return;
    }
    try {
      await resetAdminPageToDefault({ data: { slug } });
      toast.success(`Page "${slug}" restored to sovereign defaults.`);
      await fetchPages();
    } catch {
      toast.error("Failed to reset page.");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Permanently delete custom page "/p/${slug}"? This action cannot be undone.`)) {
      return;
    }
    try {
      await deleteAdminPage({ data: { slug } });
      toast.success(`Page "${slug}" deleted.`);
      await fetchPages();
    } catch {
      toast.error("Failed to delete page.");
    }
  };

  const DEFAULT_CORE_PAGES_FALLBACK = [
    { slug: "home", title: "Home Page", metaDescription: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
    { slug: "about", title: "About Us & Royal Charter", metaDescription: "Founding history, Royal Charter mandate & Board of Trustees" },
    { slug: "our-story", title: "Our Story & Historical Milestones", metaDescription: "The founding chronicle of Bhutan Health Trust Fund and official milestones" },
    { slug: "our-work", title: "Our Programs & Commodities", metaDescription: "120+ Essential Medicines, Universal Vaccines & 20 Dzongkhags Reach" },
    { slug: "reports", title: "Reports & Financial Audits", metaDescription: "Annual reports and RAA certified statutory financial statements" },
    { slug: "policies", title: "Governance & Policies", metaDescription: "Trust regulations, procurement ethics & whistleblower protections" },
    { slug: "get-involved", title: "Contribute & Get Involved", metaDescription: "Every Ngultrum matched 1:1 by the Royal Government of Bhutan" },
    { slug: "contact", title: "Contact Secretariat", metaDescription: "Citizen inquiries, donor consultations & Thimphu HQ contact" },
    { slug: "news", title: "News & Media Bulletins", metaDescription: "Official press releases, field dispatches & procurement communiqués" },
    { slug: "track-donation", title: "Track Donation & Tax Voucher", metaDescription: "1:1 matching verification and DRC 100% tax exemption vouchers" },
  ];

  const allDisplayPages = [...pages];
  DEFAULT_CORE_PAGES_FALLBACK.forEach((dp, idx) => {
    if (!allDisplayPages.some((p) => p.slug.toLowerCase() === dp.slug.toLowerCase())) {
      allDisplayPages.push({
        id: -100 - idx,
        slug: dp.slug,
        title: dp.title,
        metaDescription: dp.metaDescription,
        sectionsJson: "[]",
        status: "published",
        isSystemPage: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  });

  const isCorePageSlug = (slug: string) =>
    DEFAULT_CORE_PAGES_FALLBACK.some((dp) => dp.slug.toLowerCase() === slug.toLowerCase());

  const filtered = allDisplayPages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  );

  const corePages = filtered.filter((p) => p.isSystemPage || isCorePageSlug(p.slug));
  const customPages = filtered.filter((p) => !p.isSystemPage && !isCorePageSlug(p.slug));

  const renderPageCard = (page: CustomPage) => {
    let sectionCount = 0;
    try {
      const parsed = JSON.parse(page.sectionsJson);
      sectionCount = parsed.length;
    } catch {}

    const isCore = page.isSystemPage || isCorePageSlug(page.slug);
    const publicUrl =
      page.slug === "home"
        ? "/"
        : isCore
          ? `/${page.slug}`
          : `/p/${page.slug}`;

    return (
      <div
        key={page.slug}
        className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-amber-500/40 transition-all flex flex-col justify-between overflow-hidden"
      >
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${isCore ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-600"}`}>
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500">
                  {publicUrl}
                </span>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {page.title}
                </h3>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  isCore
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                    : "bg-blue-100 text-blue-800 border border-blue-200"
                }`}
              >
                {isCore ? "System Core" : "Custom Landing"}
              </span>
              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  page.status === "published"
                    ? "bg-slate-100 text-slate-700"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {page.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <FileCode2 className="h-3.5 w-3.5 text-slate-400" />
              <span>{sectionCount} Sections</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              <span>Updated recently</span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="bg-slate-50/80 px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 text-xs font-medium px-2.5 py-1.5 rounded-md hover:bg-slate-200/60 transition-colors"
              title="View Live Public Route"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>View</span>
            </a>

            {isCore && (
              <button
                type="button"
                onClick={() => handleReset(page.slug)}
                className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-700 text-xs font-medium px-2 py-1.5 rounded-md hover:bg-amber-100/50 transition-colors"
                title="Reset to Default Master Template"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}

            {!isCore && (
              <button
                type="button"
                onClick={() => handleDelete(page.slug)}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 text-xs font-medium px-2 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                title="Delete Custom Page"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <Link
            to="/admin/page-editor"
            search={{ slug: page.slug }}
            className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all shadow-2xs"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Live Customizer</span>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 rounded-2xl border border-slate-700/80 text-white shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="h-4 w-4" />
              <span>WordPress-Style Live Page CMS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Pages & Visual Live Editor
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-sans">
              Manage page content, block layouts, and real-time visual customizer across all public routes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg hover:shadow-amber-500/20 transition-all text-xs uppercase tracking-wide cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Custom Page</span>
            </button>
          </div>
        </div>

        {/* Filter / Search Bar */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages by title or URL route..."
              className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-hidden"
            />
          </div>
          <span className="text-xs font-mono text-slate-500 pr-2">
            {filtered.length} {filtered.length === 1 ? "page" : "pages"}
          </span>
        </div>

        {/* Pages Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
            <span className="text-xs">Loading page directory...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Section 1: Core System Pages */}
            <div className="space-y-3">
              <div>
                <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                  <span>Core Sovereign System Routes</span>
                  <span className="text-[11px] font-sans font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {corePages.length} Core Pages
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Primary statutory public routes guaranteed under BHTF Royal Charter mandate.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {corePages.map((page) => renderPageCard(page))}
              </div>
            </div>

            {/* Section 2: Custom Campaign Pages */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-serif font-bold text-slate-900 flex items-center gap-2">
                    <span>Custom Campaign Landing Pages</span>
                    <span className="text-[11px] font-sans font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                      {customPages.length} Custom
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Bespoke thematic portals, anniversary campaigns, and emergency appeals hosted under /p/:slug.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>New Campaign Page</span>
                </button>
              </div>

              {customPages.length === 0 ? (
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50">
                  <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-slate-900">No Custom Pages Created Yet</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-0.5">
                      Launch bespoke public campaign landing pages, anniversary specials, or emergency appeals with visual live blocks.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wide transition shadow-xs cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create First Custom Page</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {customPages.map((page) => renderPageCard(page))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Create Custom Page */}
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-lg">
                  <Plus className="h-5 w-5 text-amber-500" />
                  <span>Create Custom Landing Page</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Page Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                      if (!newSlug) {
                        setNewSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, "-")
                            .replace(/(^-|-$)/g, ""),
                        );
                      }
                    }}
                    placeholder="e.g. 25th Royal Charter Anniversary"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    URL Slug
                  </label>
                  <div className="flex items-center">
                    <span className="bg-slate-100 border border-r-0 border-slate-300 rounded-l-lg px-3 py-2 text-xs text-slate-500 font-mono">
                      /p/
                    </span>
                    <input
                      type="text"
                      required
                      value={newSlug}
                      onChange={(e) =>
                        setNewSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9-]+/g, "-")
                            .replace(/(^-|-$)/g, ""),
                        )
                      }
                      placeholder="anniversary-25"
                      className="w-full border border-slate-300 rounded-r-lg px-3 py-2 text-sm text-slate-900 font-mono focus:outline-hidden focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-xs uppercase tracking-wider transition-all disabled:opacity-50"
                  >
                    {creating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>Create & Launch Editor</span>
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
