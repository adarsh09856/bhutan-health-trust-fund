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
  ShieldAlert,
  HelpCircle,
  BarChart3,
  History,
  Sliders,
  Scale,
  UserCheck,
  Camera,
  Video,
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import { getDashboardAnalytics } from "@/lib/api/admin.functions";
import logo from "@/assets/logo.png";

interface NavGroup {
  groupName: string;
  badge?: string;
  items: Array<{
    to: string;
    label: string;
    icon: any;
    badgeKey?: "pendingDonations" | "unreadInquiries";
  }>;
}

const navGroups: NavGroup[] = [
  {
    groupName: "Executive CRM & Donors",
    badge: "Fiduciary",
    items: [
      { to: "/admin/dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
      {
        to: "/admin/donations",
        label: "Donors & Pledges CRM",
        icon: HeartHandshake,
        badgeKey: "pendingDonations",
      },
      {
        to: "/admin/inquiries",
        label: "Citizen Inquiries & Ombudsman",
        icon: Mail,
        badgeKey: "unreadInquiries",
      },
      { to: "/admin/subscribers", label: "Subscribers & Audiences", icon: Users },
    ],
  },
  {
    groupName: "Commodities & Procurement",
    badge: "Supply",
    items: [
      { to: "/admin/programs", label: "Essential Medicines & Streams", icon: Activity },
      { to: "/admin/procurement", label: "Procurement Tenders & Steps", icon: Scale },
      { to: "/admin/metrics", label: "National Impact Statistics", icon: BarChart3 },
    ],
  },
  {
    groupName: "Institutional CMS & Media",
    badge: "Public",
    items: [
      { to: "/admin/news", label: "News & Press Releases", icon: Newspaper },
      { to: "/admin/reports", label: "Reports & RAA Audits", icon: FileText },
      { to: "/admin/policies", label: "Policies & Royal Charters", icon: ShieldCheck },
      { to: "/admin/gallery", label: "Field Operations Gallery", icon: Camera },
      { to: "/admin/videos", label: "Public Media & Videos", icon: Video },
    ],
  },
  {
    groupName: "Sovereign Governance",
    badge: "Charter",
    items: [
      { to: "/admin/trustees", label: "Board of Trustees", icon: Landmark },
      { to: "/admin/milestones", label: "Historical Timeline", icon: History },
      { to: "/admin/faqs", label: "FAQs & Citizen Helpdesk", icon: HelpCircle },
    ],
  },
  {
    groupName: "System Administration",
    badge: "RBAC",
    items: [
      { to: "/admin/users", label: "Users & Roles (RBAC)", icon: UserCheck },
      { to: "/admin/audit-logs", label: "Security Audit Trail", icon: ShieldAlert },
      { to: "/admin/settings", label: "Sovereign Site Settings", icon: Sliders },
    ],
  },
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
    <aside className="w-72 bg-[#0B1220] text-slate-100 flex flex-col h-full shrink-0 border-r border-slate-800/90 shadow-2xl">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex items-center gap-3 bg-[#080E18]">
        <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-slate-900 p-1 shadow-md border-2 border-amber-400 grid place-items-center shrink-0">
          <img src={logo} alt="BHTF Emblem" className="h-full w-full object-contain" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-black tracking-wider text-white uppercase flex items-center gap-1.5">
            Bhutan Health Trust Fund
          </div>
          <div className="text-[10px] text-amber-400 font-bold tracking-wider uppercase flex items-center gap-1 mt-0.5">
            <Sparkles className="h-3 w-3 text-amber-400" />
            Super Admin Portal
          </div>
        </div>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800">
        {navGroups.map((group) => (
          <div key={group.groupName} className="space-y-1">
            {/* Group Header */}
            <div className="text-[10px] uppercase font-black tracking-widest text-amber-400/90 px-3 mb-1.5 flex items-center justify-between">
              <span>{group.groupName}</span>
              {group.badge && (
                <span className="text-[9px] bg-slate-800/80 text-amber-300/80 px-1.5 py-0.5 rounded font-mono border border-slate-700/50">
                  {group.badge}
                </span>
              )}
            </div>

            {/* Group Items */}
            {group.items.map((item) => {
              const isActive = location.pathname === item.to;
              const badgeCount = item.badgeKey ? (counts as any)[item.badgeKey] : 0;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition duration-150 ${
                    isActive
                      ? "bg-[#141F36] text-white border-l-4 border-amber-400 pl-2.5 shadow-md shadow-black/40 font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/70 border-l-4 border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      className={`h-4 w-4 shrink-0 transition ${
                        isActive ? "text-amber-400" : "text-amber-500/80 group-hover:text-amber-400"
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {badgeCount > 0 && (
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full font-mono ${
                          isActive
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : "bg-amber-500/20 text-amber-300 border border-amber-400/30"
                        }`}
                      >
                        {badgeCount}
                      </span>
                    )}
                    <ChevronRight
                      className={`h-3.5 w-3.5 transition shrink-0 ${
                        isActive
                          ? "text-amber-400 opacity-100"
                          : "text-slate-600 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User Profile Footer (Matching Image 2) */}
      <div className="p-3.5 border-t border-slate-800/80 bg-[#080E18] space-y-2.5">
        {user && (
          <div className="p-2.5 bg-[#0D1527] rounded-xl border border-slate-800/90 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-amber-400 grid place-items-center text-amber-400 font-black text-xs shrink-0 shadow-xs">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-extrabold text-white text-xs truncate">{user.name}</div>
              <div className="text-[10px] text-amber-400 font-semibold tracking-wide flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                {user.role === "SUPER_ADMIN" ? "Super Administrator" : "Editor & CMS Manager"}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white transition border border-slate-800"
          >
            <ExternalLink className="h-3 w-3 text-amber-400" />
            <span>Public Site ↗</span>
          </Link>

          <button
            type="button"
            onClick={logout}
            className="flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-rose-300 bg-rose-950/30 hover:bg-rose-900/50 hover:text-rose-200 transition cursor-pointer border border-rose-900/30"
          >
            <LogOut className="h-3 w-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
