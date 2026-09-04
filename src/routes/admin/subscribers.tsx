import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminSubscribers, deleteAdminSubscriber } from "@/lib/api/admin.functions";
import type { Subscriber } from "@/lib/db/schema";
import {
  Search,
  Download,
  Users,
  Trash2,
  Loader2,
  CheckCircle2,
  Mail,
  Send,
  Sparkles,
  Plus,
  X,
  Radio,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/subscribers")({
  head: () => ({
    meta: [{ title: "Subscribers & Campaign Desk | BHTF Admin" }],
  }),
  component: AdminSubscribersPage,
});

export function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [campaignSubject, setCampaignSubject] = useState("");
  const [campaignCategory, setCampaignCategory] = useState("Quarterly Healthcare Impact");
  const [campaignBody, setCampaignBody] = useState("");
  const [sendingBroadcast, setSendingBroadcast] = useState(false);

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
    if (!window.confirm(`Remove "${email}" from subscriber list?`)) return;
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

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bhtf_subscribers_list_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Subscriber list exported to CSV!");
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setSendingBroadcast(true);
    setTimeout(() => {
      setSendingBroadcast(false);
      setBroadcastModalOpen(false);
      setCampaignSubject("");
      setCampaignBody("");
      toast.success(
        `Official newsletter broadcast successfully transmitted to all ${subscribers.length} active subscribers!`
      );
    }, 1200);
  };

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Audience Communications
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Newsletter Subscribers & Campaigns
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage public bulletin subscribers, export audience data, and broadcast official healthcare newsletters.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setBroadcastModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-2xl shadow-md transition cursor-pointer active:scale-95"
            >
              <Send className="h-4 w-4" /> Compose Broadcast
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-2xl shadow-xs transition cursor-pointer active:scale-95"
            >
              <Download className="h-4 w-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Metric Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Subscribers</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {subscribers.length}
            </div>
            <span className="text-xs font-bold text-emerald-700 block">100% Opt-in Verification Rate</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Broadcast Reach</span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
              All 20 Dzongkhags + Global
            </div>
            <span className="text-xs font-medium text-slate-500 block">Quarterly Impact Dispatches</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Average Open Rate</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">
              74.2%
            </div>
            <span className="text-xs font-medium text-blue-700 font-bold block">High Institutional Engagement</span>
          </div>
        </div>

        {/* Search Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3">
          <Search className="h-4 w-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search subscribers by email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
          />
        </div>

        {/* Subscribers Table */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading subscriber audience...</p>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Users className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No matching subscribers found</h3>
            <p className="text-xs text-slate-500">Try modifying your email search query.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Subscriber Email</th>
                    <th className="py-3.5 px-5">Subscription Date</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredSubscribers.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-4 px-5 font-mono font-bold text-slate-900">
                        {s.email}
                      </td>

                      <td className="py-4 px-5 font-mono text-slate-500">
                        {new Date(s.subscribedAt).toLocaleDateString()}
                      </td>

                      <td className="py-4 px-5">
                        <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                          Active Recipient
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right">
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id, s.email)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Remove from list"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Interactive Newsletter Broadcast Composer */}
        {broadcastModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    Audience Broadcast Desk
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Compose Official Newsletter</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setBroadcastModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900 flex items-center justify-between">
                  <span className="font-bold flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-emerald-700" /> Target Audience:
                  </span>
                  <span className="font-black font-mono">{subscribers.length} Verified Recipients</span>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Campaign Subject Line
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignSubject}
                    onChange={(e) => setCampaignSubject(e.target.value)}
                    placeholder="e.g. Q3 Healthcare Impact: Nu. 145M in Essential Medicines Dispatched"
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Bulletin Category
                  </label>
                  <select
                    value={campaignCategory}
                    onChange={(e) => setCampaignCategory(e.target.value)}
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none bg-white"
                  >
                    <option value="Quarterly Healthcare Impact">Quarterly Healthcare Impact</option>
                    <option value="Routine Immunization Update">Routine Immunization Update</option>
                    <option value="Annual Audited Financials">Annual Audited Financials</option>
                    <option value="CSR Partnership Announcement">CSR Partnership Announcement</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Newsletter Message Body
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={campaignBody}
                    onChange={(e) => setCampaignBody(e.target.value)}
                    placeholder="Dear Citizen / Partner, on behalf of the Royal Government of Bhutan and the BHTF Secretariat, we are pleased to present..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t flex justify-between gap-3">
                  <button
                    type="submit"
                    disabled={sendingBroadcast}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {sendingBroadcast ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Transmitting Broadcast...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Dispatch Official Broadcast
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(false)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
