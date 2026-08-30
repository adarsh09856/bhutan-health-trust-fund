import { Menu, Bell } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

const routeTitles: Record<string, string> = {
  "/admin/dashboard": "Executive Dashboard",
  "/admin/donations": "Donations & Financial Ledger",
  "/admin/inquiries": "Inquiries & Public Messages Inbox",
  "/admin/news": "News & Press Releases",
  "/admin/reports": "Reports & Publications",
  "/admin/policies": "Policies & Governance Charters",
  "/admin/subscribers": "Newsletter Audience",
  "/admin/programs": "Healthcare Program Initiatives",
};

export function AdminHeader({ onToggleMenu }: { onToggleMenu: () => void }) {
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Admin Portal";

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMenu}
          className="lg:hidden p-2 rounded-md hover:bg-muted text-foreground transition"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-foreground leading-tight">{title}</h1>
          <div className="text-xs text-muted-foreground hidden sm:block">
            Bhutan Health Trust Fund · Official Management Portal
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full text-xs font-semibold">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          System Live · PostgreSQL Connected
        </div>

        <div className="text-xs text-muted-foreground hidden lg:block">
          {new Date().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
    </header>
  );
}
