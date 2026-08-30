import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSubscribers, deleteAdminSubscriber } from "@/lib/api/admin.functions";
import type { Subscriber } from "@/lib/db/schema";
import { Search, Download, Users, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/subscribers")({
  head: () => ({
    meta: [{ title: "Subscribers Audience | BHTF Admin" }],
  }),
  component: AdminSubscribersPage,
});

function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchSubscribers = async () => {
    try {
      const res = await getAdminSubscribers();
      setSubscribers(res);
    } catch {
      toast.error("Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: number, email: string) => {
    if (!window.confirm(`Remove "${email}" from mailing list?`)) return;
    try {
      await deleteAdminSubscriber({ data: { id } });
      toast.success("Subscriber removed.");
      fetchSubscribers();
    } catch {
      toast.error("Failed to remove subscriber.");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Email", "Status", "Subscribed At"];
    const rows = filteredSubscribers.map((s) => [
      s.email,
      s.isActive ? "Active" : "Unsubscribed",
      new Date(s.subscribedAt).toISOString(),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bhtf_subscribers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscriber list exported to CSV!");
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Newsletter Subscribers & Mailing List</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Citizens and international partners subscribed to receive quarterly healthcare impact updates.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition"
          >
            <Download className="h-4 w-4" /> Export Email List (CSV)
          </button>
        </div>

        {/* Count Pill & Search */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search subscribers by email address..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
          <div className="text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg shrink-0">
            Total Active: {subscribers.filter((s) => s.isActive).length} Contacts
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Loading subscribers...</p>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No subscribers found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Subscriber Email</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date Joined</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {s.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(s.subscribedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(s.id, s.email)}
                          className="p-1.5 rounded-md hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition"
                          title="Remove Subscriber"
                        >
                          <Trash2 className="h-4 w-4" />
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
    </AdminShell>
  );
}
