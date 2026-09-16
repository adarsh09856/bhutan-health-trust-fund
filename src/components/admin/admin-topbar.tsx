import { Link, useLocation } from "@tanstack/react-router";
import { useAdminAuth } from "@/lib/admin-auth";
import { Sparkles, Edit3, Layers, LayoutDashboard } from "lucide-react";

export function AdminTopBar() {
  const { user } = useAdminAuth();
  const location = useLocation();

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

  return (
    <div className="bg-[#05110d] border-b border-amber-500/40 px-3 sm:px-6 py-1.5 flex items-center justify-between text-xs text-slate-200 z-50 sticky top-0 shadow-md">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5 font-bold text-amber-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">BHTF Sovereign CMS</span>
          <span className="sm:hidden">CMS</span>
        </div>
        <span className="text-slate-600 hidden sm:inline">•</span>
        <span className="font-mono text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
          /{currentSlug === "home" ? "" : currentSlug}
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Instant WordPress-Style Live Customizer Button */}
        <Link
          to="/admin/page-editor"
          search={{ slug: currentSlug }}
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-3.5 py-1 rounded-full text-xs shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <Edit3 className="h-3.5 w-3.5" />
          <span>⚡ Live Edit This Page</span>
        </Link>

        <Link
          to="/admin/pages"
          className="hidden md:inline-flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors text-xs"
        >
          <Layers className="h-3 w-3 text-amber-400" />
          <span>All Pages</span>
        </Link>

        <Link
          to="/admin/dashboard"
          className="inline-flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-white/10 transition-colors text-xs"
        >
          <LayoutDashboard className="h-3 w-3 text-amber-400" />
          <span className="hidden sm:inline">Admin Panel</span>
        </Link>
      </div>
    </div>
  );
}
