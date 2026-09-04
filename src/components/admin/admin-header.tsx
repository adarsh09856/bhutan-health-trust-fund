import { Menu, Bell, ExternalLink, Sparkles, Plus, FileText, HeartHandshake } from "lucide-react";
import { useLocation, Link } from "@tanstack/react-router";

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/admin/dashboard": {
    title: "Executive CRM Dashboard",
    subtitle: "Real-time fiduciary revenue, sovereign matching yields & public health operations.",
  },
  "/admin/donations": {
    title: "Donors & Pledges CRM",
    subtitle: "Citizen & corporate donations, payment verification & official DRC tax voucher generation.",
  },
  "/admin/inquiries": {
    title: "Citizen Inquiries & Ombudsman Inbox",
    subtitle: "Public inquiries, stakeholder requests & confidential whistleblower channel.",
  },
  "/admin/subscribers": {
    title: "Subscribers & Campaign Desk",
    subtitle: "Audience segmentation, email subscriber directory & newsletter broadcast simulation.",
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
  "/admin/courses": {
    title: "Healthcare Academy & LMS Training Controls",
    subtitle: "Curriculum modules, KGUMSB clinical certifications & accredited healthcare trainee records.",
  },
};

export function AdminHeader({ onToggleMenu }: { onToggleMenu: () => void }) {
  const location = useLocation();
  const currentRoute = routeTitles[location.pathname] || {
    title: "Admin Portal",
    subtitle: "Bhutan Health Trust Fund Official Management System",
  };

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onToggleMenu}
          className="lg:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition cursor-pointer"
          aria-label="Toggle Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight">
            {currentRoute.title}
          </h1>
          <p className="text-xs text-slate-500 hidden sm:block font-normal mt-0.5">
            {currentRoute.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* System Live Pill */}
        <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>1:1 Sovereign Match Active</span>
        </div>

        {/* Quick View Portal Link */}
        <Link
          to="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition shadow-xs cursor-pointer"
        >
          <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
          <span className="hidden md:inline">Public Site</span>
        </Link>
      </div>
    </header>
  );
}
