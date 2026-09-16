import {
  ArrowUp,
  ArrowDown,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  X,
  Palette,
  Sliders,
} from "lucide-react";
import type { PageBlockSection, PageBlockItem } from "@/lib/db/schema";

export function BlockInspector({
  section,
  totalSections,
  onUpdateSection,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onDelete,
  onClose,
}: {
  section: PageBlockSection;
  totalSections: number;
  onUpdateSection: (updated: PageBlockSection) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const updateField = <K extends keyof PageBlockSection>(key: K, value: PageBlockSection[K]) => {
    onUpdateSection({
      ...section,
      [key]: value,
    });
  };

  const updateItem = (index: number, updatedFields: Partial<PageBlockItem>) => {
    const items = [...(section.items || [])];
    items[index] = { ...items[index], ...updatedFields };
    updateField("items", items);
  };

  const addItem = () => {
    const items = [...(section.items || [])];
    if (section.type === "stats") {
      items.push({
        title: "New Metric",
        value: "100%",
        description: "Description of verified impact",
        icon: "Users",
      });
    } else if (section.type === "accordion_faq") {
      items.push({
        question: "New Frequently Asked Question?",
        answer: "Detailed answer explaining the policy or procedure.",
      });
    } else {
      items.push({
        title: "New Feature / Stream",
        description: "Overview of commodity or healthcare program.",
        badge: "New",
        icon: "Pill",
      });
    }
    updateField("items", items);
  };

  const removeItem = (index: number) => {
    const items = [...(section.items || [])].filter((_, idx) => idx !== index);
    updateField("items", items);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border-l border-slate-800 text-slate-100 overflow-y-auto">
      {/* Top Toolbar */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/95 backdrop-blur-md z-10">
        <div>
          <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider">
            Block Inspector
          </div>
          <h3 className="font-bold text-sm text-white capitalize">
            {section.type.replace("_", " ")} Block
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => updateField("isVisible", !section.isVisible)}
            className={`p-1.5 rounded-md hover:bg-slate-800 text-xs transition-colors ${
              section.isVisible ? "text-emerald-400" : "text-slate-500"
            }`}
            title={section.isVisible ? "Hide Block" : "Show Block"}
          >
            {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={onMoveUp}
            disabled={section.order <= 1}
            className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition-colors"
            title="Move Up"
          >
            <ArrowUp className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onMoveDown}
            disabled={section.order >= totalSections}
            className="p-1.5 rounded-md hover:bg-slate-800 disabled:opacity-30 text-slate-300 transition-colors"
            title="Move Down"
          >
            <ArrowDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-300 transition-colors"
            title="Duplicate Block"
          >
            <Copy className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-md hover:bg-red-950/60 text-red-400 transition-colors"
            title="Delete Block"
          >
            <Trash2 className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 transition-colors ml-1"
            title="Close Inspector"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="p-4 space-y-5 flex-1">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Heading / Title</label>
          <input
            type="text"
            value={section.title || ""}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Block Headline"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Subtitle / Tagline</label>
          <input
            type="text"
            value={section.subtitle || ""}
            onChange={(e) => updateField("subtitle", e.target.value)}
            placeholder="Secondary description or attribution"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Dzongkha Text */}
        {(section.type === "hero" || section.type === "royal_decree") && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-amber-400">Dzongkha Title / Mandate</label>
            <input
              type="text"
              value={section.dzongkhaText || ""}
              onChange={(e) => updateField("dzongkhaText", e.target.value)}
              placeholder="e.g. མི་སེར་གཟུགས་ཁམས་བཟང་པོ་དང་..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-amber-300 font-serif placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors"
            />
          </div>
        )}

        {/* Badge */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">Badge / Pill Text</label>
          <input
            type="text"
            value={section.badge || ""}
            onChange={(e) => updateField("badge", e.target.value)}
            placeholder="e.g. Royal Charter Mandate"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Background Variant */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Palette className="h-3.5 w-3.5 text-amber-500" />
            <span>Background Theme</span>
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[
              { id: "dark", label: "Deep Navy", bg: "bg-slate-950" },
              { id: "emerald", label: "Emerald", bg: "bg-emerald-950" },
              { id: "gold", label: "Gold Glow", bg: "bg-amber-950" },
              { id: "warm", label: "Warm Cream", bg: "bg-amber-100" },
              { id: "white", label: "Pure White", bg: "bg-white" },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => updateField("bgVariant", v.id as any)}
                className={`h-8 rounded-md border text-[10px] font-bold flex items-center justify-center transition-all ${
                  v.bg
                } ${
                  section.bgVariant === v.id
                    ? "ring-2 ring-amber-500 border-white"
                    : "border-slate-700 opacity-70 hover:opacity-100"
                }`}
                title={v.label}
              >
                {section.bgVariant === v.id && "✓"}
              </button>
            ))}
          </div>
        </div>

        {/* Content / Body Text */}
        {(section.type === "rich_text" || section.type === "royal_decree") && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Content / Decree Text</label>
            <textarea
              rows={5}
              value={section.content || ""}
              onChange={(e) => updateField("content", e.target.value)}
              placeholder="Enter comprehensive paragraph or official decree quotation..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-amber-500 transition-colors leading-relaxed"
            />
          </div>
        )}

        {/* Action Buttons */}
        {(section.type === "hero" || section.type === "cta_banner") && (
          <div className="space-y-4 pt-3 border-t border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="h-3.5 w-3.5" />
              <span>Call to Action Buttons</span>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-400">Primary Button</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={section.primaryCtaText || ""}
                  onChange={(e) => updateField("primaryCtaText", e.target.value)}
                  placeholder="Button Label"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  value={section.primaryCtaUrl || ""}
                  onChange={(e) => updateField("primaryCtaUrl", e.target.value)}
                  placeholder="/get-involved"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-400">Secondary Button</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={section.secondaryCtaText || ""}
                  onChange={(e) => updateField("secondaryCtaText", e.target.value)}
                  placeholder="Button Label"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
                <input
                  type="text"
                  value={section.secondaryCtaUrl || ""}
                  onChange={(e) => updateField("secondaryCtaUrl", e.target.value)}
                  placeholder="/our-work"
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Items (for stats, feature cards, faqs) */}
        {(section.type === "stats" ||
          section.type === "feature_cards" ||
          section.type === "accordion_faq") && (
          <div className="space-y-3 pt-3 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Block Items ({section.items?.length || 0})
              </span>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 px-2.5 py-1 rounded text-xs font-bold transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {(section.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 space-y-2.5 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-slate-500 hover:text-red-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {section.type === "stats" && (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.value || ""}
                        onChange={(e) => updateItem(idx, { value: e.target.value })}
                        placeholder="780,000+"
                        className="bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-amber-400 font-bold"
                      />
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => updateItem(idx, { title: e.target.value })}
                        placeholder="Citizens Protected"
                        className="bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  )}

                  {section.type === "accordion_faq" ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={item.question || ""}
                        onChange={(e) => updateItem(idx, { question: e.target.value })}
                        placeholder="Question text..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white font-medium"
                      />
                      <textarea
                        rows={3}
                        value={item.answer || ""}
                        onChange={(e) => updateItem(idx, { answer: e.target.value })}
                        placeholder="Answer text..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-slate-300"
                      />
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {section.type !== "stats" && (
                        <input
                          type="text"
                          value={item.title || ""}
                          onChange={(e) => updateItem(idx, { title: e.target.value })}
                          placeholder="Card Title"
                          className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-white font-medium"
                        />
                      )}
                      <textarea
                        rows={2}
                        value={item.description || ""}
                        onChange={(e) => updateItem(idx, { description: e.target.value })}
                        placeholder="Description text..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-2.5 py-1.5 text-xs text-slate-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
