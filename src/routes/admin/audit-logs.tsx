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
  Eye,
  X,
  ArrowRight,
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
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

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
                        <th className="py-3.5 px-4">Statutory Reason</th>
                        <th className="py-3.5 px-4">Network / IP</th>
                        <th className="py-3.5 px-4 text-right">Inspect</th>
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

                          <td className="py-3.5 px-4 max-w-xs truncate">
                            {log.reason ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                <span className="truncate max-w-[140px]">{log.reason}</span>
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">—</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                            {log.ipAddress || "127.0.0.1"}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedLog(log)}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-600 hover:text-emerald-700 text-slate-600 text-xs font-bold transition cursor-pointer"
                              title="Inspect full audit record & diff"
                            >
                              <Eye className="h-3 w-3" />
                              <span>Diff</span>
                            </button>
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

        {/* Fiduciary Log Inspector & State Diff Modal */}
        {selectedLog && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 grid place-items-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900">
                        Fiduciary Record #{selectedLog.id}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getActionBadgeColor(
                          selectedLog.action,
                        )}`}
                      >
                        {selectedLog.action}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Cryptographically sequenced immutable audit ledger entry
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Timestamp
                  </span>
                  <span className="font-mono text-slate-700 font-semibold text-[11px]">
                    {new Date(selectedLog.createdAt).toLocaleString("en-US")}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Admin Actor
                  </span>
                  <span className="font-bold text-slate-900 truncate block">
                    {selectedLog.userEmail}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Entity Target
                  </span>
                  <span className="font-mono text-slate-700 font-semibold">
                    {selectedLog.entity} {selectedLog.entityId && `#${selectedLog.entityId}`}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Network IP
                  </span>
                  <span className="font-mono text-slate-700 font-semibold">
                    {selectedLog.ipAddress || "127.0.0.1"}
                  </span>
                </div>
              </div>

              {/* Mandatory Statutory Reason Block */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Statutory Justification Reason</span>
                </label>
                {selectedLog.reason ? (
                  <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 leading-relaxed font-medium">
                    &ldquo;{selectedLog.reason}&rdquo;
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-400 italic">
                    No explicit statutory reason recorded (standard Tier 1 operation or legacy
                    entry).
                  </div>
                )}
              </div>

              {/* State Transition Diff */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-emerald-700" />
                  <span>State Transition & Payload Diff</span>
                </label>

                {selectedLog.oldValue || selectedLog.newValue ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                        Previous State (Old Value)
                      </span>
                      <pre className="bg-rose-50/40 border border-rose-200/80 text-rose-950 p-3 rounded-xl text-[11px] font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {selectedLog.oldValue || "(null / empty)"}
                      </pre>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Applied State (New Value)
                      </span>
                      <pre className="bg-emerald-50/40 border border-emerald-200/80 text-emerald-950 p-3 rounded-xl text-[11px] font-mono whitespace-pre-wrap max-h-48 overflow-y-auto">
                        {selectedLog.newValue || "(null / empty)"}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Event Details
                    </span>
                    <p className="font-mono text-xs text-slate-700">{selectedLog.details || "—"}</p>
                  </div>
                )}
              </div>

              {/* Client Environment */}
              {selectedLog.userAgent && (
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 truncate">
                  <Laptop className="h-3 w-3 shrink-0" />
                  <span className="truncate">User Agent: {selectedLog.userAgent}</span>
                </div>
              )}

              {/* Footer */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition cursor-pointer"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
