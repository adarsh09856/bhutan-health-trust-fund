import { Menu, Bell, ExternalLink, Sparkles, Plus, FileText, HeartHandshake } from "lucide-react";
import { useLocation, Link } from "@tanstack/react-router";

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Executive CRM Dashboard",
    subtitle: "Real-time fiduciary revenue, sovereign matching yields & public health operations.",
  },
  "/admin/donations": {
    title: "Donors & Pledges CRM",
    subtitle:
      "Citizen & corporate donations, payment verification & official DRC tax voucher generation.",
  },
  "/admin/inquiries": {
    title: "Citizen Inquiries & Ombudsman Inbox",
    subtitle: "Public inquiries, stakeholder requests & confidential whistleblower channel.",
  },
  "/admin/subscribers": {
    title: "Subscribers & Campaign Desk",
    subtitle:
      "Audience segmentation, email subscriber directory & newsletter broadcast simulation.",
  },
  "/admin/programs": {
    title: "Healthcare Commodity Streams",
    subtitle: "Supervise the 6 sovereign procurement streams and 20 Dzongkhags buffer allocations.",
  },
  "/admin/news": {
    title: "News & Media Releases CMS",
    subtitle: "Publish press releases, vaccine campaigns, and institutional announcements.",
  },
  "/admin/reports": {
    title: "Reports & Statutory Audits CMS",
    subtitle: "Upload annual reports, RAA audited statements, and research publications.",
  },
  "/admin/policies": {
    title: "Policies & Royal Charters CMS",
    subtitle: "Manage foundational charters, procurement guidelines, and ethics policies.",
  },
  "/admin/trustees": {
    title: "Board of Trustees Governance",
    subtitle: "Oversee high-level fiduciary governors, royal appointees, and leadership bios.",
  },
  "/admin/faqs": {
    title: "FAQs & Citizen Knowledge Base",
    subtitle:
      "Manage public guidance on donation matching, medicine access, and healthcare programs.",
  },
  "/admin/metrics": {
    title: "National Impact Statistics CMS",
    subtitle: "Control public homepage impact figures, vaccination stats, and citizens reached.",
  },
  "/admin/milestones": {
    title: "Historical Timeline & Royal Decrees",
    subtitle:
      "Curate institutional history, royal charter promulgations, and endowment milestones.",
  },
  "/admin/settings": {
    title: "Global Site Settings & Fiduciary Hub",
    subtitle:
      "Sovereign matching ratio, emergency helplines, banking credentials, and public notices.",
  },
  "/admin/pages": {
    title: "Institutional Pages & Live Visual Editor",
    subtitle:
      "WordPress-style visual page builder, block hierarchy, responsive device frames & publishing control.",
  },
  "/admin/page-editor": {
    title: "Sovereign Page Studio & Live Customizer",
    subtitle:
      "Real-time block inspector, responsive canvas (Desktop / Tablet / Mobile), and live preview.",
  },
  "/admin/procurement": {
    title: "Sovereign Procurement & Tenders CMS",
    subtitle:
      "Manage international bidding tenders, cold-chain handover steps & statutory procurement documents.",
  },
  "/admin/gallery": {
    title: "Field Operations Media Gallery",
    subtitle:
      "High-resolution photo journalism from all 20 Dzongkhags and alpine logistics hubs.",
  },
  "/admin/videos": {
    title: "Official Media & Video Broadcasts",
    subtitle:
      "National documentary broadcasts, Royal address streams & health campaign video library.",
  },
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
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Node
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden md:block">{currentRoute.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
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
