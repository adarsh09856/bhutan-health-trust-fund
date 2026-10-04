import React, { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  Sparkles,
  Edit3,
  Layers,
  LayoutDashboard,
  ChevronUp,
  ChevronDown,
  Eye,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

const ROUTE_STUDIO_MAP: Record<string, { label: string; href: string }> = {
  "/": { label: "Homepage Studio", href: "/admin/page-editor?slug=home" },
  "/about": { label: "About Us Studio", href: "/admin/page-editor?slug=about" },
  "/about/trustees": { label: "Trustees Studio", href: "/admin/trustees" },
  "/about/secretariat": { label: "Secretariat Studio", href: "/admin/page-editor?slug=about-secretariat" },
  "/about/committees": { label: "Committees Studio", href: "/admin/page-editor?slug=about-committees" },
  "/about/organization": { label: "Organization Studio", href: "/admin/page-editor?slug=about-organization" },
  "/our-story": { label: "Milestones Studio", href: "/admin/milestones" },
  "/our-impact": { label: "Impact & Metrics Studio", href: "/admin/metrics" },
  "/resources": { label: "Reports & Audits Studio", href: "/admin/reports" },
  "/resources/advocacy": { label: "Advocacy Studio", href: "/admin/reports" },
  "/resources/annual-reports": { label: "Annual Reports Studio", href: "/admin/reports" },
  "/resources/financial-reports": { label: "Financial Reports Studio", href: "/admin/reports" },
  "/resources/other-publications": { label: "Other Publications Studio", href: "/admin/reports" },
  "/resources/audit-reports": { label: "Audit Reports Studio", href: "/admin/reports" },
  "/resources/window-financing": { label: "Window Financing Studio", href: "/admin/page-editor?slug=window-financing" },
  "/news": { label: "News & Bulletins Studio", href: "/admin/news" },
  "/news/events": { label: "Events Studio", href: "/admin/news" },
  "/news/announcements": { label: "Announcements Studio", href: "/admin/news" },
  "/news/careers": { label: "Careers Vacancies Studio", href: "/admin/news" },
  "/donate": { label: "Donations & Gateway Studio", href: "/admin/donations" },
  "/get-involved": { label: "Donations & Pledges Studio", href: "/admin/donations" },
  "/track-donation": { label: "Track Donation & Tax Studio", href: "/admin/donations" },
  "/policies": { label: "Statutory Policies Studio", href: "/admin/policies" },
  "/contact": { label: "Inquiries & Messages Studio", href: "/admin/inquiries" },
};

export function AdminTopBar() {
  const { user, adminBarCollapsed, setAdminBarCollapsed } = useAdminAuth();
  const location = useLocation();
  const [editMode, setEditMode] = useState<boolean>(false);

  // Initialize editMode from localStorage on client
  useEffect(() => {
    try {
      const stored = localStorage.getItem("bhtf_visual_edit_mode");
      if (stored === "true") {
        setEditMode(true);
      }
    } catch {}
  }, []);

  // Sync body classes with auth status and visual edit mode
  useEffect(() => {
    if (user && !location.pathname.startsWith("/admin")) {
      document.body.classList.add("has-admin-live-bar");
      if (editMode) {
        document.body.classList.add("bhtf-visual-edit-on");
      } else {
        document.body.classList.remove("bhtf-visual-edit-on");
      }
    } else {
      document.body.classList.remove("has-admin-live-bar");
      document.body.classList.remove("bhtf-visual-edit-on");
    }

    return () => {
      document.body.classList.remove("has-admin-live-bar");
      document.body.classList.remove("bhtf-visual-edit-on");
    };
  }, [user, location.pathname, editMode]);

  // Only render on non-admin routes when an admin is authenticated
  if (!user || location.pathname.startsWith("/admin")) {
    return null;
  }

  // Derive page slug from current path
  let currentSlug = "home";
  if (location.pathname.startsWith("/p/")) {
    currentSlug = location.pathname.replace("/p/", "");
  } else if (location.pathname === "/resources/window-financing") {
    currentSlug = "window-financing";
  } else if (location.pathname !== "/") {
    currentSlug = location.pathname.replace(/^\//, "").replace(/\//g, "-");
  }

  // Determine current studio mapping
  let currentStudio = ROUTE_STUDIO_MAP[location.pathname];
  if (!currentStudio) {
    if (location.pathname.startsWith("/news")) {
      currentStudio = { label: "News Studio", href: "/admin/news" };
    } else if (location.pathname.startsWith("/resources")) {
      currentStudio = { label: "Reports Studio", href: "/admin/reports" };
    } else if (location.pathname.startsWith("/about")) {
      currentStudio = { label: "About Studio", href: "/admin/page-editor?slug=about" };
    } else {
      currentStudio = { label: "Pages Directory", href: "/admin/pages" };
    }
  }

  const toggleVisualEdit = () => {
    const nextState = !editMode;
    setEditMode(nextState);
    try {
      localStorage.setItem("bhtf_visual_edit_mode", String(nextState));
    } catch {}
  };

  if (adminBarCollapsed) {
    return (
      <div className="fixed top-2 right-4 z-50 pointer-events-auto">
        <button
          onClick={() => setAdminBarCollapsed(false)}
          className="inline-flex items-center gap-1.5 bg-[#061a14]/90 backdrop-blur-md text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:bg-[#08241c] hover:border-amber-400 transition-all cursor-pointer"
          title="Expand Admin Bar"
        >
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>Admin Bar</span>
          {editMode && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          )}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        id="bhtf-admin-topbar"
        className="fixed top-0 left-0 right-0 z-50 h-10 bg-[#05110d]/95 backdrop-blur-md border-b border-amber-500/30 px-3 sm:px-6 flex items-center justify-between text-xs text-slate-200 shadow-md transition-all duration-200 pointer-events-auto select-none overflow-x-auto no-scrollbar whitespace-nowrap"
      >
        {/* Left: Identity & Dynamic Studio Link */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#0B4F42] text-amber-300 font-bold text-[10px] shadow-xs">
              B
            </span>
            <span className="hidden sm:inline font-sans tracking-wide">BHTF Admin</span>
            <span className="sm:hidden">Admin</span>
          </div>

          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="font-mono text-[11px] text-amber-200/90 truncate max-w-[120px] sm:max-w-[160px] hidden sm:inline">
            {user.name || user.email}
          </span>

          <Link
            to={currentStudio.href}
            className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/40 text-[11px] font-semibold transition-colors shrink-0"
            title={`Open ${currentStudio.label} in Admin Panel`}
          >
            <Edit3 className="w-3 h-3 text-amber-400" />
            <span>Edit in {currentStudio.label}</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
          </Link>
        </div>

        {/* Center: Live Visual Edit Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleVisualEdit}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-semibold transition-all shadow-xs cursor-pointer text-[11px] sm:text-xs ${
              editMode
                ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300 font-bold"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
            title={
              editMode
                ? "Visual Edit active: Outlines and [⚡ Quick Edit] badges visible on all sections"
                : "Turn on visual outlines and live section edit buttons"
            }
          >
            {editMode ? (
              <>
                <Edit3 className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                <span className="hidden sm:inline">VISUAL EDIT: ON</span>
                <span className="sm:hidden">EDIT: ON</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="hidden sm:inline">VISUAL EDIT: OFF</span>
                <span className="sm:hidden">EDIT: OFF</span>
              </>
            )}
          </button>
          {editMode && (
            <span className="text-[11px] text-amber-300/80 font-mono hidden xl:inline">
              (Hover over any section to see edit badges)
            </span>
          )}
        </div>

        {/* Right: Pages Directory, Admin Dashboard & Collapse */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <Link
            to="/admin/pages"
            className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium"
            title="View all customizable pages in Pages Directory"
          >
            <Layers className="h-3 w-3 text-amber-400" />
            <span>Pages Directory</span>
          </Link>

          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-1 text-white bg-[#0B4F42] hover:bg-[#143d32] border border-emerald-500/30 px-2.5 py-1 rounded-lg transition-colors text-xs font-semibold shadow-xs"
            title="Open Admin Console"
          >
            <LayoutDashboard className="h-3 w-3 text-amber-300" />
            <span className="hidden sm:inline">Admin Console</span>
            <span className="sm:hidden">Console</span>
            <ExternalLink className="h-2.5 w-2.5 text-slate-300" />
          </Link>

          {/* Collapse toggle */}
          <button
            onClick={() => setAdminBarCollapsed(true)}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimize admin toolbar"
          >
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      {/* Document flow spacer so fixed topbar doesn't cover page content */}
      <div className="h-10 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </>
  );
}
