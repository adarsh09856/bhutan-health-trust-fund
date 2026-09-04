import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Newspaper,
  FileText,
  ShieldCheck,
  HeartHandshake,
  Mail,
  Users,
  Activity,
  ExternalLink,
  LogOut,
  Sparkles,
  ChevronRight,
  Landmark,
  Shield,
  Coins,
  GraduationCap,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { getDashboardAnalytics } from "@/lib/api/admin.functions";
import logo from "@/assets/logo.png";

const crmNavItems = [
  { to: "/admin/dashboard", label: "Dashboard & KPIs", icon: LayoutDashboard },
  { to: "/admin/donations", label: "Donors & Pledges CRM", icon: HeartHandshake, badgeKey: "pendingDonations" },
  { to: "/admin/inquiries", label: "Inquiries & Ombudsman", icon: Mail, badgeKey: "unreadInquiries" },
  { to: "/admin/subscribers", label: "Subscribers & Audiences", icon: Users },
  { to: "/admin/programs", label: "Commodity Streams", icon: Activity },
];

const cmsNavItems = [
  { to: "/admin/courses", label: "Academy & LMS Controls", icon: GraduationCap },
  { to: "/admin/news", label: "News & Press Releases", icon: Newspaper },
  { to: "/admin/reports", label: "Reports & RAA Audits", icon: FileText },
  { to: "/admin/policies", label: "Policies & Royal Charters", icon: ShieldCheck },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();
  const [counts, setCounts] = useState<{ pendingDonations: number; unreadInquiries: number }>({
    pendingDonations: 0,
    unreadInquiries: 0,
  });

  useEffect(() => {
    getDashboardAnalytics()
      .then((res: any) => {
        if (res) {
          setCounts({
            pendingDonations: res.pendingDonationsCount || 0,
            unreadInquiries: res.unreadInquiriesCount || 0,
          });
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  return (
    <aside className="w-68 bg-slate-950 text-slate-100 flex flex-col h-full shrink-0 border-r border-slate-800/80 shadow-2xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3.5 bg-slate-900/50">
        <div className="h-11 w-11 rounded-2xl bg-white p-1 shadow-md shadow-amber-500/10 grid place-items-center shrink-0 border border-amber-400/40">
          <img src={logo} alt="BHTF Emblem" className="h-full w-full object-contain" />
        </div>
        <div>
          <div className="text-sm font-black tracking-tight text-white flex items-center gap-1.5">
            BHTF Secretariat <Sparkles className="h-3.5 w-3.5 text-amber-400 shrink-0" />
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Enterprise CRM & CMS
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3.5 py-4 space-y-6 overflow-y-auto">
        {/* Group 1: Executive CRM */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>Executive CRM</span>
            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">Fiduciary</span>
          </div>
          {crmNavItems.map((item) => {
            const isActive = location.pathname === item.to;
            const badgeCount = item.badgeKey ? (counts as any)[item.badgeKey] : 0;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-emerald-400"}`}
                  />
                  <span>{item.label}</span>
                </div>

                {badgeCount > 0 && (
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full font-mono ${
                      isActive ? "bg-white text-emerald-800" : "bg-amber-500 text-slate-950 shadow-xs"
                    }`}
                  >
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Group 2: Institutional CMS */}
        <div className="space-y-1">
          <div className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-3 mb-2 flex items-center justify-between">
            <span>Institutional CMS</span>
            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">Publishing</span>
          </div>
          {cmsNavItems.map((item) => {
            const isActive = location.pathname === item.to;

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-900/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-amber-400"}`}
                  />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className={`h-3 w-3 ${isActive ? "text-white" : "text-slate-600"}`} />
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile & Footer Actions */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 space-y-3">
        {user && (
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
            <div className="font-extrabold text-white truncate">{user.name}</div>
            <div className="text-slate-400 truncate text-[11px] font-mono">{user.email}</div>
            <div className="pt-1 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold border border-emerald-500/30">
                {user.role}
              </span>
              <span className="text-[10px] text-slate-500">• Secretariat</span>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
              <span>Public Web Portal</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Live ↗</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-950/50 hover:text-rose-200 transition cursor-pointer text-left w-full border border-rose-500/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
