import { createFileRoute, Link, useRouter, useSearch } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  getAdminPages,
  getAdminPage,
  createAdminPage,
  saveAdminPageDraft,
  publishAdminPage,
  resetAdminPageToDefault,
} from "@/lib/api/admin.functions";
import type { CustomPage, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { DeviceToolbar, DeviceFrame, type DeviceMode } from "@/components/admin/page-editor/device-frame";
import { BlockInspector } from "@/components/admin/page-editor/block-inspector";
import { BLOCK_REGISTRY } from "@/components/admin/page-editor/block-registry";
import {
  ArrowLeft,
  Save,
  Rocket,
  RotateCcw,
  ExternalLink,
  Plus,
  Layers,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2,
  Loader2,
  Sparkles,
  ChevronDown,
  X,
  Sliders,
} from "lucide-react";
import { toast } from "sonner";

interface EditorSearch {
  slug?: string;
}

const DEFAULT_CORE_PAGES_MENU = [
  { slug: "home", title: "Home Page", path: "/" },
  { slug: "about", title: "About Us & Royal Charter", path: "/about" },
  { slug: "our-story", title: "Our Story & Historical Milestones", path: "/our-story" },
  { slug: "our-work", title: "Our Impact & Programs", path: "/our-work" },
  { slug: "reports", title: "Resources & Window Financing", path: "/reports" },
  { slug: "policies", title: "Governance & Policies", path: "/policies" },
  { slug: "get-involved", title: "Donate & Support", path: "/get-involved" },
  { slug: "contact", title: "Contact Secretariat", path: "/contact" },
  { slug: "news", title: "News & Events", path: "/news" },
  { slug: "track-donation", title: "Track Donation & Tax Voucher", path: "/track-donation" },
];

export const Route = createFileRoute("/admin/page-editor")({
  validateSearch: (search: Record<string, unknown>): EditorSearch => ({
    slug: typeof search.slug === "string" ? search.slug : "home",
  }),
  head: () => ({
    meta: [{ title: "Live Visual Page Customizer | BHTF Admin" }],
  }),
  component: AdminPageEditor,
});

export function AdminPageEditor() {
  const { slug } = useSearch({ from: "/admin/page-editor" });
  const activeSlug = slug || "home";
  const router = useRouter();

  const { user, isLoading: authLoading } = useAdminAuth();
  const [allPages, setAllPages] = useState<CustomPage[]>([]);
  const [currentPage, setCurrentPage] = useState<CustomPage | null>(null);
  const [sections, setSections] = useState<PageBlockSection[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [isDirty, setIsDirty] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addBlockModalOpen, setAddBlockModalOpen] = useState(false);
  const [newPageModalOpen, setNewPageModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [creatingPage, setCreatingPage] = useState(false);

  const handleCreateNewPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSlug.trim()) {
      toast.error("Please provide both title and slug.");
      return;
    }
    setCreatingPage(true);
    try {
      const created = await createAdminPage({
        data: {
          title: newTitle.trim(),
          slug: newSlug.trim().toLowerCase(),
        },
      });
      toast.success(`Page "${created.title}" created successfully!`);
      setNewPageModalOpen(false);
      setNewTitle("");
      setNewSlug("");
      router.navigate({
        to: "/admin/page-editor",
        search: { slug: created.slug },
      });
    } catch (err: any) {
      toast.error(err?.message || "Failed to create page.");
    } finally {
      setCreatingPage(false);
    }
  };

  // Load all pages list and current page details
  const loadPageData = async (targetSlug: string) => {
    setLoading(true);
    try {
      const [pagesList, page] = await Promise.all([
        getAdminPages(),
        getAdminPage({ data: { slug: targetSlug } }),
      ]);

      setAllPages(pagesList);
      if (page) {
        setCurrentPage(page);
        setPageTitle(page.title);
        try {
          const parsed = JSON.parse(page.sectionsJson);
          setSections(parsed);
          if (parsed.length > 0) {
            setSelectedBlockId(parsed[0].id);
          } else {
            setSelectedBlockId(null);
          }
        } catch {
          setSections([]);
          setSelectedBlockId(null);
        }
      }
      setIsDirty(false);
    } catch {
      toast.error("Failed to load page customizer.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPageData(activeSlug);
  }, [activeSlug]);

  const handlePageSwitch = (newSlug: string) => {
    if (isDirty) {
      if (!confirm("You have unsaved changes. Discard and switch pages?")) {
        return;
      }
    }
    router.navigate({
      to: "/admin/page-editor",
      search: { slug: newSlug },
    });
  };

  // Block Manipulations
  const handleUpdateSection = (updated: PageBlockSection) => {
    setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setIsDirty(true);
  };

  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    setSections((prev) => {
      const clone = [...prev];
      const temp = clone[index];
      clone[index] = clone[index - 1];
      clone[index - 1] = temp;
      return clone.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
    setIsDirty(true);
  };

  const handleMoveDown = (index: number) => {
    if (index >= sections.length - 1) return;
    setSections((prev) => {
      const clone = [...prev];
      const temp = clone[index];
      clone[index] = clone[index + 1];
      clone[index + 1] = temp;
      return clone.map((s, idx) => ({ ...s, order: idx + 1 }));
    });
    setIsDirty(true);
  };

  const handleDuplicate = (section: PageBlockSection) => {
    const newSection: PageBlockSection = {
      ...JSON.parse(JSON.stringify(section)),
      id: `${section.type}-${Date.now()}`,
      title: `${section.title || "Section"} (Copy)`,
      order: sections.length + 1,
    };
    setSections((prev) => [...prev, newSection]);
    setSelectedBlockId(newSection.id);
    setIsDirty(true);
    toast.success("Block duplicated.");
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this block from the page?")) return;
    setSections((prev) =>
      prev.filter((s) => s.id !== id).map((s, idx) => ({ ...s, order: idx + 1 })),
    );
    setSelectedBlockId(null);
    setIsDirty(true);
    toast.success("Block removed.");
  };

  const handleAddBlock = (blockType: PageBlockSection["type"]) => {
    const meta = BLOCK_REGISTRY.find((b) => b.type === blockType);
    if (!meta) return;

    const newBlock: PageBlockSection = {
      ...JSON.parse(JSON.stringify(meta.defaultData)),
      id: `${blockType}-${Date.now()}`,
      order: sections.length + 1,
    };

    setSections((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    setIsDirty(true);
    setAddBlockModalOpen(false);
    toast.success(`Added ${meta.name} block.`);
  };

  // Save / Publish Actions
  const handleSaveDraft = async () => {
    setSaving(true);
    try {
      await saveAdminPageDraft({
        data: {
          slug: activeSlug,
          title: pageTitle,
          sectionsJson: JSON.stringify(sections),
        },
      });
      setIsDirty(false);
      toast.success("Draft saved successfully.");
    } catch {
      toast.error("Failed to save draft.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublishLive = async () => {
    setSaving(true);
    try {
      await publishAdminPage({
        data: {
          slug: activeSlug,
          title: pageTitle,
          sectionsJson: JSON.stringify(sections),
        },
      });
      setIsDirty(false);
      toast.success("🚀 Page published live to public site!");
    } catch {
      toast.error("Failed to publish page.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!confirm("Reset this page back to its default sovereign layout? Any unsaved edits will be lost.")) {
      return;
    }
    try {
      await resetAdminPageToDefault({ data: { slug: activeSlug } });
      toast.success("Page restored to sovereign master template.");
      await loadPageData(activeSlug);
    } catch {
      toast.error("Failed to reset page.");
    }
  };

  const selectedSection = sections.find((s) => s.id === selectedBlockId);
  const selectedIndex = sections.findIndex((s) => s.id === selectedBlockId);

  // Guarantee that all 9 core pages are always available in the dropdown
  const displayedPages: CustomPage[] = [...allPages];
  DEFAULT_CORE_PAGES_MENU.forEach((dp) => {
    if (!displayedPages.some((p) => p.slug.toLowerCase() === dp.slug.toLowerCase())) {
      displayedPages.push({
        id: -1,
        slug: dp.slug,
        title: dp.title,
        metaDescription: "",
        sectionsJson: "[]",
        status: "published",
        isSystemPage: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  });

  const publicUrl =
    activeSlug === "home"
      ? "/"
      : currentPage?.isSystemPage
        ? `/${activeSlug}`
        : `/p/${activeSlug}`;

  if (authLoading || loading) {
    return (
      <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-white gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <span className="text-xs font-mono text-slate-400">Loading BHTF Live Customizer...</span>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* 1. Master Top Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 shrink-0 z-30">
        {/* Left: Navigation & Page Selector */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin/pages"
            className="flex items-center gap-1 text-slate-400 hover:text-white text-xs font-medium px-2 py-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">All Pages</span>
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          {/* Page Selector Dropdown */}
          <div className="relative">
            <select
              value={activeSlug}
              onChange={(e) => handlePageSwitch(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white font-bold text-xs rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-amber-500 cursor-pointer"
            >
              <optgroup label="Core Sovereign System Pages">
                {displayedPages
                  .filter((p) => p.isSystemPage || DEFAULT_CORE_PAGES_MENU.some((dp) => dp.slug === p.slug))
                  .map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.title} ({p.slug === "home" ? "/" : `/${p.slug}`})
                    </option>
                  ))}
              </optgroup>
              {displayedPages.some(
                (p) => !p.isSystemPage && !DEFAULT_CORE_PAGES_MENU.some((dp) => dp.slug === p.slug),
              ) && (
                <optgroup label="Custom Campaign Landing Pages">
                  {displayedPages
                    .filter(
                      (p) => !p.isSystemPage && !DEFAULT_CORE_PAGES_MENU.some((dp) => dp.slug === p.slug),
                    )
                    .map((p) => (
                      <option key={p.slug} value={p.slug}>
                        {p.title} (/p/{p.slug})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
          </div>

          <button
            type="button"
            onClick={() => setNewPageModalOpen(true)}
            className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1.5 rounded-lg text-xs transition-all shadow-xs cursor-pointer shrink-0"
            title="Create a new custom landing page"
          >
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden xl:inline">New Page</span>
          </button>

          {/* Unsaved Badge */}
          {isDirty && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Unsaved Edits
            </span>
          )}
        </div>

        {/* Center: Device Viewport Mode Toolbar */}
        <div className="hidden md:flex items-center">
          <DeviceToolbar mode={deviceMode} onChange={setDeviceMode} />
        </div>

        {/* Right: Actions (Save Draft, Publish Live, Preview) */}
        <div className="flex items-center gap-2">
          {currentPage?.isSystemPage && (
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Reset to Default Template"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}

          <Link
            to={publicUrl}
            target="_blank"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5"
            title="Preview Live Page in New Tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden lg:inline">View Live</span>
          </Link>

          <button
            type="button"
            disabled={saving}
            onClick={handleSaveDraft}
            className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs border border-slate-700 transition-all disabled:opacity-50 shadow-2xs"
          >
            <Save className="h-3.5 w-3.5 text-slate-400" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handlePublishLive}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all disabled:opacity-50 shadow-lg hover:shadow-amber-500/20"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Rocket className="h-3.5 w-3.5" />}
            <span>Publish Live</span>
          </button>
        </div>
      </header>

      {/* 2. Workspace Body: Left Sidebar + Live Canvas */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar (Block Tree & Inspector) */}
        <aside className="w-80 sm:w-96 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 z-20 overflow-hidden">
          {selectedSection ? (
            <BlockInspector
              section={selectedSection}
              totalSections={sections.length}
              onUpdateSection={handleUpdateSection}
              onMoveUp={() => handleMoveUp(selectedIndex)}
              onMoveDown={() => handleMoveDown(selectedIndex)}
              onDuplicate={() => handleDuplicate(selectedSection)}
              onDelete={() => handleDelete(selectedSection.id)}
              onClose={() => setSelectedBlockId(null)}
            />
          ) : (
            <div className="flex-1 flex flex-col overflow-y-auto">
              {/* Header */}
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-amber-500 uppercase tracking-wider">
                    Page Layout Hierarchy
                  </div>
                  <h3 className="font-serif font-bold text-sm text-white">
                    {sections.length} Active Blocks
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setAddBlockModalOpen(true)}
                  className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-1.5 rounded-md text-xs transition-all shadow-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Block</span>
                </button>
              </div>

              {/* Sections Outline List */}
              <div className="p-3 space-y-2 flex-1">
                {sections.map((sec, idx) => {
                  const meta = BLOCK_REGISTRY.find((b) => b.type === sec.type);
                  const Icon = meta?.icon || Layers;

                  return (
                    <div
                      key={sec.id}
                      onClick={() => setSelectedBlockId(sec.id)}
                      className="group flex items-center justify-between p-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-slate-400">
                            #{idx + 1} • {sec.type.replace("_", " ")}
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {sec.title || "Untitled Block"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {!sec.isVisible && (
                          <span title="Hidden">
                            <EyeOff className="h-3.5 w-3.5 text-slate-500" />
                          </span>
                        )}
                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  );
                })}

                {sections.length === 0 && (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    No blocks on this page yet. Click "Add Block" to start building.
                  </div>
                )}
              </div>
            </div>
          )}
        </aside>

        {/* Right Canvas: Live Viewport */}
        <main className="flex-1 bg-slate-950 overflow-y-auto relative flex flex-col">
          <DeviceFrame mode={deviceMode}>
            <PageRenderer
              sections={sections}
              interactive={true}
              activeSectionId={selectedBlockId || undefined}
              onSelectSection={(id) => setSelectedBlockId(id)}
            />
          </DeviceFrame>
        </main>
      </div>

      {/* 3. Modal: Add Block from Registry */}
      {addBlockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
                  BHTF Component Library
                </span>
                <h3 className="text-lg font-serif font-bold text-white">Choose a Section Block</h3>
              </div>
              <button
                type="button"
                onClick={() => setAddBlockModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto flex-1">
              {BLOCK_REGISTRY.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.type}
                    onClick={() => handleAddBlock(b.type)}
                    className="group p-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-amber-500 cursor-pointer transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-9 w-9 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                          {b.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">
                        {b.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] font-bold text-amber-500">
                      <span>Insert Block</span>
                      <Plus className="h-3.5 w-3.5 group-hover:rotate-90 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Custom Page */}
      {newPageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white text-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-serif font-bold text-lg">
                <Plus className="h-5 w-5 text-amber-500" />
                <span>Create Custom Landing Page</span>
              </div>
              <button
                type="button"
                onClick={() => setNewPageModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPage} className="space-y-4">
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
                  onClick={() => setNewPageModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingPage}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2 rounded-lg text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
                >
                  {creatingPage && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Create & Launch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
