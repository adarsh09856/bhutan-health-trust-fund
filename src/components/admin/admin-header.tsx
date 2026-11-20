import { Menu, ExternalLink, Sparkles } from "lucide-react";
import { useLocation, Link } from "@tanstack/react-router";

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Dashboard",
    subtitle: "A summary of donations, inquiries and site activity.",
  },
  "/admin/donations": {
    title: "Donations",
    subtitle: "Review contributions, verify payments and manage receipts.",
  },
  "/admin/inquiries": {
    title: "Inquiries",
    subtitle: "Review public questions and record follow-up.",
  },
  "/admin/subscribers": {
    title: "Subscribers",
    subtitle: "Manage newsletter subscriptions and consent status.",
  },
  "/admin/programs": {
    title: "Programs",
    subtitle: "Manage the program information shown on the public site.",
  },
  "/admin/news": {
    title: "News & events",
    subtitle: "Publish press releases, vaccine campaigns, and institutional announcements.",
  },
  "/admin/reports": {
    title: "Reports",
    subtitle: "Upload annual reports, RAA audited statements, and research publications.",
  },
  "/admin/policies": {
    title: "Policies",
    subtitle: "Manage foundational charters, procurement guidelines, and ethics policies.",
  },
  "/admin/trustees": {
    title: "Board of directors",
    subtitle: "Oversee high-level fiduciary governors, royal appointees, and leadership bios.",
  },
  "/admin/faqs": {
    title: "FAQs",
    subtitle:
      "Manage public guidance on donation matching, medicine access, and healthcare programs.",
  },
  "/admin/metrics": {
    title: "Impact metrics",
    subtitle: "Control public homepage impact figures, vaccination stats, and citizens reached.",
  },
  "/admin/milestones": {
    title: "Our Story timeline",
    subtitle:
      "Curate institutional history, royal charter promulgations, and endowment milestones.",
  },
  "/admin/settings": {
    title: "Settings",
    subtitle: "Manage site details, payment options and operational settings.",
  },
  "/admin/pages": {
    title: "Pages",
    subtitle: "Choose a page, edit its content blocks, preview and publish changes.",
  },
  "/admin/page-editor": {
    title: "Page editor",
    subtitle: "Edit page blocks, preview responsive layouts and publish changes.",
  },
  "/admin/procurement": {
    title: "Procurement",
    subtitle:
      "Manage international bidding tenders, cold-chain handover steps & statutory procurement documents.",
  },
  "/admin/gallery": {
    title: "Gallery",
    subtitle:
      "High-resolution photo journalism from all 20 Dzongkhags and alpine logistics hubs.",
  },
  "/admin/videos": {
    title: "Videos",
    subtitle:
      "National documentary broadcasts, Royal address streams & health campaign video library.",
  },
  "/admin/memberships": { title: "Membership applications", subtitle: "Review and track membership submissions." },
  "/admin/audit-logs": { title: "Audit logs", subtitle: "Review administrator actions and system events." },
  "/admin/users": { title: "Users & roles", subtitle: "Manage administrator accounts and access." },
  "/admin/setup": { title: "Initial setup", subtitle: "Create the first administrator account." },
};

export function AdminHeader({ onToggleMenu }: { onToggleMenu: () => void }) {
  const location = useLocation();
  const currentRoute = routeTitles[location.pathname] || {
    title: "Admin Portal",
    subtitle: "Bhutan Health Trust Fund Official Management System",
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
              {currentRoute.title}
            </h1>
          </div>
          <p className="text-xs text-slate-500 hidden md:block">{currentRoute.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          to="/admin/pages"
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 shadow-xs hover:shadow-md transition-all active:scale-95"
          title="Open pages and page editor"
        >
          <Sparkles className="h-3.5 w-3.5 fill-slate-950" />
          <span>Pages & editor</span>
        </Link>

        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          <ExternalLink className="h-3.5 w-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Public Site ↗</span>
        </Link>
      </div>
    </header>
  );
}
