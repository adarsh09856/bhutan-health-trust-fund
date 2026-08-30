import { Link, useLocation } from "@tanstack/react-router";
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
} from "lucide-react";
import { useAdminAuth } from "@/lib/admin-auth";
import logo from "@/assets/logo.png";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/donations", label: "Donations & Pledges", icon: HeartHandshake },
  { to: "/admin/inquiries", label: "Inquiries Inbox", icon: Mail },
  { to: "/admin/news", label: "News & Media", icon: Newspaper },
  { to: "/admin/reports", label: "Reports & Publications", icon: FileText },
  { to: "/admin/policies", label: "Policies & Charters", icon: ShieldCheck },
  { to: "/admin/subscribers", label: "Subscribers", icon: Users },
  { to: "/admin/programs", label: "Health Programs", icon: Activity },
];

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  return (
    <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col h-full shrink-0 border-r border-slate-800">
      {/* Brand */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <img src={logo} alt="BHTF" className="h-10 w-10 bg-white rounded-lg p-1" />
        <div>
          <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
            BHTF Admin <Sparkles className="h-3 w-3 text-amber-400" />
          </div>
          <div className="text-[11px] text-slate-400">Institutional Portal</div>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 px-3 mb-2">
          Management
        </div>
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-white shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <item.icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User / Bottom */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {user && (
          <div className="px-3 py-2 bg-slate-800/60 rounded-lg text-xs">
            <div className="font-semibold text-white truncate">{user.name}</div>
            <div className="text-slate-400 truncate text-[11px]">{user.email}</div>
            <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
              {user.role}
            </span>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-1">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span>View Public Site</span>
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition text-left w-full"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
