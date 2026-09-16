import { Link, useLocation } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin-auth";
import { Sparkles, Edit3, Layers, LayoutDashboard, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export function AdminTopBar() {
  const { user } = useAdminAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Only render on non-admin routes when an admin is authenticated
  if (!user || location.pathname.startsWith("/admin")) {
    return null;
  }

  // Derive page slug from current path
  let currentSlug = "home";
  if (location.pathname.startsWith("/p/")) {
    currentSlug = location.pathname.replace("/p/", "");
  } else if (location.pathname !== "/") {
    currentSlug = location.pathname.replace(/^\//, "").split("/")[0];
  }

  if (collapsed) {
    return (
      <div className="fixed top-2 right-4 z-50">
        <button
          onClick={() => setCollapsed(false)}
          className="inline-flex items-center gap-1.5 bg-[#061a14]/90 backdrop-blur-md text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-semibold shadow-lg hover:bg-[#08241c] hover:border-amber-400 transition-all cursor-pointer"
          title="Expand Admin Bar"
        >
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>Admin Bar</span>
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
    );
  }

  return (
    <div
      id="bhtf-admin-topbar"
      className="bg-[#05110d]/95 backdrop-blur-md border-b border-amber-500/30 px-3 sm:px-6 py-2 flex items-center justify-between text-xs text-slate-200 z-50 sticky top-0 shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-all duration-200"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline font-sans tracking-wide">BHTF Sovereign CMS</span>
          <span className="sm:hidden">CMS</span>
        </div>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="font-mono text-[11px] text-amber-200/80 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
          /{currentSlug === "home" ? "" : currentSlug}
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Live Visual Customizer Button */}
        <Link
          to="/admin/page-editor"
          search={{ slug: currentSlug }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs shadow-xs hover:shadow-md transition-all active:scale-95"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>⚡ Live Edit</span>
        </Link>

        <Link
          to="/admin/pages"
          className="hidden md:inline-flex items-center gap-1 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium"
        >
          <Layers className="h-3 w-3 text-amber-400" />
          <span>All Pages</span>
        </Link>

        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/10 transition-colors text-xs font-medium"
        >
          <LayoutDashboard className="h-3 w-3 text-amber-400" />
          <span className="hidden sm:inline">Admin Panel</span>
        </Link>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          title="Minimize admin toolbar"
        >
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
