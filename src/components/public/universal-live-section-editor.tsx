import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "@tanstack/react-router";
import {
  X,
  Save,
  Loader2,
  ExternalLink,
  Sliders,
  Type,
  Link2,
  Image as ImageIcon,
  BarChart2,
  Plus,
  Trash2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { saveQuickSectionEdit } from "@/lib/api/admin.functions";

export interface UniversalLiveSectionEditorProps {
  isOpen: boolean;
  onClose: () => void;
  pageSlug: string;
  sectionId: string;
  sectionTitle?: string;
  studioHref?: string;
  initialData?: {
    title?: string;
    subtitle?: string;
    badge?: string;
    content?: string;
    dzongkhaText?: string;
    primaryCtaText?: string;
    primaryCtaUrl?: string;
    secondaryCtaText?: string;
    secondaryCtaUrl?: string;
    bgVariant?: string;
    backgroundImage?: string;
    items?: Array<{
      title?: string;
      description?: string;
      value?: string;
      icon?: string;
      badge?: string;
      url?: string;
    }>;
  };
  onSaved?: (updatedSection: any) => void;
}

export function UniversalLiveSectionEditor({
  isOpen,
  onClose,
  pageSlug,
  sectionId,
  sectionTitle = "Section",
  studioHref,
  initialData = {},
  onSaved,
}: UniversalLiveSectionEditorProps) {
  const [activeTab, setActiveTab] = useState<"CONTENT" | "ACTIONS" | "APPEARANCE" | "ITEMS">("CONTENT");
  const [saving, setSaving] = useState(false);

  // Form Fields
  const [title, setTitle] = useState(initialData.title || "");
  const [subtitle, setSubtitle] = useState(initialData.subtitle || "");
  const [badge, setBadge] = useState(initialData.badge || "");
  const [content, setContent] = useState(initialData.content || "");
  const [dzongkhaText, setDzongkhaText] = useState(initialData.dzongkhaText || "");
  const [primaryCtaText, setPrimaryCtaText] = useState(initialData.primaryCtaText || "");
  const [primaryCtaUrl, setPrimaryCtaUrl] = useState(initialData.primaryCtaUrl || "");
  const [secondaryCtaText, setSecondaryCtaText] = useState(initialData.secondaryCtaText || "");
  const [secondaryCtaUrl, setSecondaryCtaUrl] = useState(initialData.secondaryCtaUrl || "");
  const [bgVariant, setBgVariant] = useState(initialData.bgVariant || "light");
  const [backgroundImage, setBackgroundImage] = useState(initialData.backgroundImage || "");
  const [items, setItems] = useState<Array<any>>(initialData.items || []);

  // Sync state if initialData changes
  useEffect(() => {
    if (isOpen) {
      setTitle(initialData.title || "");
      setSubtitle(initialData.subtitle || "");
      setBadge(initialData.badge || "");
      setContent(initialData.content || "");
      setDzongkhaText(initialData.dzongkhaText || "");
      setPrimaryCtaText(initialData.primaryCtaText || "");
      setPrimaryCtaUrl(initialData.primaryCtaUrl || "");
      setSecondaryCtaText(initialData.secondaryCtaText || "");
      setSecondaryCtaUrl(initialData.secondaryCtaUrl || "");
      setBgVariant(initialData.bgVariant || "light");
      setBackgroundImage(initialData.backgroundImage || "");
      setItems(initialData.items || []);
    }
  }, [isOpen, initialData]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        onClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, title, subtitle, badge, content, dzongkhaText, primaryCtaText, primaryCtaUrl, secondaryCtaText, secondaryCtaUrl, bgVariant, backgroundImage, items]);

  if (!isOpen) return null;

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        title: "New Item",
        description: "Add details here...",
        value: "100%",
        icon: "Sparkles",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateItem = (index: number, field: string, val: string) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: val } : item)),
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = {
        title,
        subtitle,
        badge,
        content,
        dzongkhaText,
        primaryCtaText,
        primaryCtaUrl,
        secondaryCtaText,
        secondaryCtaUrl,
        bgVariant,
        backgroundImage,
        items,
      };

      const res = await saveQuickSectionEdit({
        data: {
          pageSlug,
          sectionId,
          updates,
        },
      });

      if (res && res.success) {
        toast.success(`"${sectionTitle}" updated and published live!`);

        // Notify parent callback
        if (onSaved) {
          onSaved(res.updatedSection);
        }

        // Dispatch window event for other listeners
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("bhtf:section-updated", {
              detail: {
                pageSlug,
                sectionId,
                updatedSection: res.updatedSection,
              },
            }),
          );
        }

        onClose();
      } else {
        toast.error("Failed to save section changes.");
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to save section changes.");
    } finally {
      setSaving(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col text-slate-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">
                  Quick Live Edit: {sectionTitle}
                </h3>
                <span className="font-mono text-[10px] text-amber-300 bg-amber-500/10 border border-amber-400/30 px-2 py-0.5 rounded-full">
                  /{pageSlug}#{sectionId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct PostgreSQL persistence • Immediate public & admin synchronization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Close editor (Esc)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-5 text-xs font-semibold gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("CONTENT")}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "CONTENT"
                ? "border-amber-400 text-amber-300 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Type className="h-3.5 w-3.5" />
            <span>Content & Text</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ACTIONS")}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "ACTIONS"
                ? "border-amber-400 text-amber-300 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Link2 className="h-3.5 w-3.5" />
            <span>Buttons & Links</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("APPEARANCE")}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "APPEARANCE"
                ? "border-amber-400 text-amber-300 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Appearance & Style</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ITEMS")}
            className={`flex items-center gap-1.5 py-3 px-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === "ITEMS"
                ? "border-amber-400 text-amber-300 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5" />
            <span>Cards & Metrics ({items.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {activeTab === "CONTENT" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Eyebrow / Badge Label
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  placeholder="e.g. Royal Charter Statutory Trust Fund"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Main Section Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Healthy People. Stronger Bhutan."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs font-serif text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Subtitle / Narrative Lede
                </label>
                <textarea
                  rows={2}
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="e.g. Sovereign healthcare financing guaranteeing essential medicines..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Extended Body Content / Description
                </label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detailed narrative, royal proclamation, or statutory context..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Dzongkha Inscription (Optional)
                </label>
                <input
                  type="text"
                  value={dzongkhaText}
                  onChange={(e) => setDzongkhaText(e.target.value)}
                  placeholder="e.g. མི་སེར་གཟུགས་ཁམས་བཟང་པོ་དང་ རྒྱལ་ཁབ་སྟོབས་ཤུགས་ཅན།"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs font-serif"
                />
              </div>
            </div>
          )}

          {activeTab === "ACTIONS" && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="font-semibold text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Primary Action Button</span>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Button Label</label>
                    <input
                      type="text"
                      value={primaryCtaText}
                      onChange={(e) => setPrimaryCtaText(e.target.value)}
                      placeholder="e.g. Contribute (1:1 Matched)"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Target Link URL</label>
                    <input
                      type="text"
                      value={primaryCtaUrl}
                      onChange={(e) => setPrimaryCtaUrl(e.target.value)}
                      placeholder="e.g. /donate"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                    <ArrowRight className="h-3.5 w-3.5" />
                    <span>Secondary Action Button</span>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Button Label</label>
                    <input
                      type="text"
                      value={secondaryCtaText}
                      onChange={(e) => setSecondaryCtaText(e.target.value)}
                      placeholder="e.g. Explore Formularies"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Target Link URL</label>
                    <input
                      type="text"
                      value={secondaryCtaUrl}
                      onChange={(e) => setSecondaryCtaUrl(e.target.value)}
                      placeholder="e.g. /our-impact"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-amber-400 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "APPEARANCE" && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Background Style Variant
                </label>
                <select
                  value={bgVariant}
                  onChange={(e) => setBgVariant(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs"
                >
                  <option value="light">Light Parchment (#FAF8F3)</option>
                  <option value="white">Pure White (#FFFFFF)</option>
                  <option value="dark">Dark Forest Sovereign (#051612)</option>
                  <option value="warm">Warm Ochre Accent (#F5EDE0)</option>
                  <option value="forest">Emerald Deep Tint (#EAF6F5)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Background / Feature Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={backgroundImage}
                    onChange={(e) => setBackgroundImage(e.target.value)}
                    placeholder="e.g. /assets/hero-bhutan.jpg"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-400 text-xs font-mono"
                  />
                </div>
                {backgroundImage && (
                  <div className="mt-2 h-28 w-44 rounded-lg overflow-hidden border border-slate-700">
                    <img
                      src={backgroundImage}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "ITEMS" && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">
                  Manage sub-cards, statistics numbers, or highlights in this section.
                </span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-lg font-semibold hover:bg-amber-500/30 transition cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Item</span>
                </button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-8 text-slate-500 border border-dashed border-slate-800 rounded-xl">
                  No discrete items defined. Click "Add Item" to add metrics or highlight cards.
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((it, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800 space-y-2.5 relative group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] text-amber-400 font-bold">
                          Item #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-slate-500 hover:text-red-400 transition p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">
                            Highlight Figure / Value
                          </label>
                          <input
                            type="text"
                            value={it.value || ""}
                            onChange={(e) => handleUpdateItem(idx, "value", e.target.value)}
                            placeholder="e.g. Nu. 4.8B or 438"
                            className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-400 mb-0.5">
                            Card Title / Label
                          </label>
                          <input
                            type="text"
                            value={it.title || ""}
                            onChange={(e) => handleUpdateItem(idx, "title", e.target.value)}
                            placeholder="e.g. Endowment Corpus"
                            className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1 text-white text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 mb-0.5">
                          Description Subtext
                        </label>
                        <input
                          type="text"
                          value={it.description || ""}
                          onChange={(e) => handleUpdateItem(idx, "description", e.target.value)}
                          placeholder="e.g. Ring-fenced capital endowment managed under Royal Charter"
                          className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1 text-white text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 border-t border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            {studioHref && (
              <Link
                to={studioHref}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 underline font-medium"
              >
                <span>Open Full Studio in Admin</span>
                <ExternalLink className="h-3 w-3" />
              </Link>
            )}
            <span className="text-[11px] text-slate-500 hidden md:inline">
              (Press Ctrl+S to save)
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-4 py-1.5 rounded-lg text-xs shadow-md active:scale-95 transition cursor-pointer disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  <span>Save & Publish Live</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
