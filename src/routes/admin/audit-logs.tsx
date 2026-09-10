import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminAuth } from "@/lib/admin-auth";
import { getAdminAuditLogs, getAdminSystemEvents } from "@/lib/api/admin.functions";
import type { AuditLog, SystemEvent } from "@/lib/db/schema";
import {
  ShieldCheck,
  Activity,
  Search,
  Filter,
  RefreshCw,
  Loader2,
  Calendar,
  Lock,
  FileText,
  AlertTriangle,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/audit-logs")({
  head: () => ({
    meta: [{ title: "Fiduciary Audit Logs & System Events | BHTF Admin" }],
  }),
  component: AdminAuditLogsPage,
});

export function AdminAuditLogsPage() {
  const { user } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<"audit" | "system">("audit");
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [systemEvents, setSystemEvents] = useState<SystemEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("ALL");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [logsRes, eventsRes] = await Promise.all([getAdminAuditLogs(), getAdminSystemEvents()]);
      setAuditLogs(logsRes || []);
      setSystemEvents(eventsRes || []);
    } catch {
      toast.error("Failed to load statutory audit logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // RBAC Permission Check: Super Admin only
  if (user && user.role !== "SUPER_ADMIN") {
    return (
      <AdminShell>
        <div className="max-w-xl mx-auto py-20 text-center space-y-4">
          <div className="h-16 w-16 bg-rose-50 text-rose-600 rounded-3xl mx-auto grid place-items-center border border-rose-200 shadow-sm">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Access Restricted</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            Viewing the statutory audit ledger requires elevated <strong>SUPER_ADMIN</strong>{" "}
            privileges. Please consult the Executive Secretariat.
          </p>
        </div>
      </AdminShell>
    );
  }

  const entities = ["ALL", ...Array.from(new Set(auditLogs.map((l) => l.entity)))];

  const filteredLogs = auditLogs.filter((l) => {
    const matchesSearch =
      l.userEmail.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      (l.details && l.details.toLowerCase().includes(search.toLowerCase())) ||
      (l.entityId && l.entityId.toLowerCase().includes(search.toLowerCase()));
    const matchesEntity = selectedEntity === "ALL" || l.entity === selectedEntity;
    return matchesSearch && matchesEntity;
  });

  const getActionBadgeColor = (action: string) => {
    if (action.includes("DELETE") || action.includes("REVOKE") || action.includes("LOCKED")) {
      return "bg-rose-50 text-rose-800 border-rose-200";
    }
    if (action.includes("CREATE") || action.includes("SUCCESS")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
    if (action.includes("UPDATE") || action.includes("SETTING")) {
      return "bg-amber-50 text-amber-800 border-amber-200";
    }
    return "bg-blue-50 text-blue-800 border-blue-200";
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                Immutable Ledger
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                Royal Audit Authority Compliant
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Fiduciary Audit Logs & System Events
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory append-only immutable audit trail recording every login attempt, mutation,
              setting modification, and session lifecycle event.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition cursor-pointer self-start sm:self-auto"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh Ledger</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`pb-3 text-xs font-bold transition border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === "audit"
                ? "border-emerald-600 text-emerald-800 font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Administrator Audit Trail ({auditLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("system")}
            className={`pb-3 text-xs font-bold transition border-b-2 cursor-pointer flex items-center gap-2 ${
              activeTab === "system"
                ? "border-emerald-600 text-emerald-800 font-black"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Activity className="h-4 w-4" />
            <span>System Events & Lockouts ({systemEvents.length})</span>
          </button>
        </div>

        {activeTab === "audit" ? (
          <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by admin, action, details..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-600 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-[11px] font-bold text-slate-400">Entity:</span>
                {entities.map((ent) => (
                  <button
                    key={ent}
                    type="button"
                    onClick={() => setSelectedEntity(ent)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer ${
                      selectedEntity === ent
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    {ent}
                  </button>
                ))}
              </div>
            </div>

            {/* Audit Logs Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              {loading ? (
                <div className="py-20 text-center space-y-3">
                  <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-500">
                    Querying immutable audit_logs table...
                  </p>
                </div>
              ) : filteredLogs.length === 0 ? (
                <div className="p-12 text-center space-y-2">
                  <FileText className="h-10 w-10 text-slate-400 mx-auto" />
                  <h3 className="font-bold text-slate-800 text-sm">No audit logs match criteria</h3>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                        <th className="py-3.5 px-6">Timestamp</th>
                        <th className="py-3.5 px-4">Admin Identity</th>
                        <th className="py-3.5 px-4">Action</th>
                        <th className="py-3.5 px-4">Entity</th>
                        <th className="py-3.5 px-6">Audit Details</th>
                        <th className="py-3.5 px-4">Network / IP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3.5 px-6 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                            {new Date(log.createdAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                            })}
                          </td>

                          <td className="py-3.5 px-4 font-bold text-slate-900">{log.userEmail}</td>

                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getActionBadgeColor(
                                log.action,
                              )}`}
                            >
                              {log.action}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                            {log.entity}
                            {log.entityId && (
                              <span className="text-slate-400 ml-1">#{log.entityId}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-6 text-slate-600 text-xs max-w-xs truncate font-mono">
                            {log.details || "—"}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                            {log.ipAddress || "127.0.0.1"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* System Events Tab */
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            {loading ? (
              <div className="py-20 text-center space-y-3">
                <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
                <p className="text-xs font-bold text-slate-500">Querying system_events table...</p>
              </div>
            ) : systemEvents.length === 0 ? (
              <div className="p-12 text-center space-y-2">
                <Activity className="h-10 w-10 text-slate-400 mx-auto" />
                <h3 className="font-bold text-slate-800 text-sm">No system events recorded</h3>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                      <th className="py-3.5 px-6">Timestamp</th>
                      <th className="py-3.5 px-4">Event Type</th>
                      <th className="py-3.5 px-6">Message</th>
                      <th className="py-3.5 px-6">Metadata</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {systemEvents.map((evt) => (
                      <tr key={evt.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-6 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                          {new Date(evt.createdAt).toLocaleString("en-US")}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 font-mono font-bold text-[10px] border border-slate-200">
                            {evt.eventType}
                          </span>
                        </td>

                        <td className="py-3.5 px-6 font-bold text-slate-900">{evt.message}</td>

                        <td className="py-3.5 px-6 font-mono text-[11px] text-slate-500">
                          {evt.metadata || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
