import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Edit3, ExternalLink, Zap } from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  UniversalLiveSectionEditor,
  type UniversalLiveSectionEditorProps,
} from "./universal-live-section-editor";

export interface SectionEditBadgeProps {
  label: string;
  pageSlug: string;
  sectionId: string;
  studioHref: string;
  initialData?: UniversalLiveSectionEditorProps["initialData"];
  className?: string;
  onSaved?: (updatedSection: any) => void;
}

export function SectionEditBadge({
  label,
  pageSlug,
  sectionId,
  studioHref,
  initialData,
  className = "top-3 right-3",
  onSaved,
}: SectionEditBadgeProps) {
  const { user } = useAdminAuth();
  const [visible, setVisible] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  useEffect(() => {
    // Only proceed if user is an authenticated admin
    if (!user) {
      setVisible(false);
      return;
    }

    const checkVisibility = () => {
      const isVisible =
        typeof document !== "undefined" &&
        document.body.classList.contains("has-admin-live-bar") &&
        document.body.classList.contains("bhtf-visual-edit-on");
      setVisible(isVisible);
    };

    checkVisibility();

    // Listen to changes to body classes (toggle on/off in AdminTopBar)
    const observer = new MutationObserver(checkVisibility);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [user]);

  // If unauthenticated or visual edit mode is disabled, render nothing
  if (!user || !visible) return null;

  const handleQuickEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setEditorOpen(true);
  };

  return (
    <>
      <aside
        className={`bhtf-section-edit-badge absolute z-40 items-center gap-1.5 bg-slate-900/95 text-white text-[11px] font-medium px-3 py-1.5 rounded-xl border border-amber-400/60 shadow-xl backdrop-blur-md transition-all hover:bg-slate-900 ${className}`}
        aria-label={`Visual edit options for ${label}`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-amber-200 font-semibold">{label}</span>
        </div>

        <div className="flex items-center gap-1.5 ml-2 border-l border-slate-700 pl-2">
          <button
            type="button"
            onClick={handleQuickEditClick}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-400/40 transition-colors cursor-pointer"
            title={`Quick edit "${label}" in an on-page modal`}
          >
            <Zap className="w-2.5 h-2.5" />
            <span>Quick Edit</span>
          </button>

          <Link
            to={studioHref}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-[#0B4F42] hover:bg-[#143d32] text-white font-bold transition-colors shadow-xs"
            title={`Open full ${label} studio in Admin Console`}
          >
            <Edit3 className="w-2.5 h-2.5" />
            <span>Studio</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </Link>
        </div>
      </aside>

      {editorOpen && (
        <UniversalLiveSectionEditor
          isOpen={editorOpen}
          onClose={() => setEditorOpen(false)}
          pageSlug={pageSlug}
          sectionId={sectionId}
          sectionTitle={label}
          studioHref={studioHref}
          initialData={initialData}
          onSaved={onSaved}
        />
      )}
    </>
  );
}
