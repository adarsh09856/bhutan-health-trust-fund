import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminInquiries,
  updateInquiryStatus,
  deleteAdminInquiry,
} from "@/lib/api/admin.functions";
import type { Inquiry } from "@/lib/db/schema";
import {
  Search,
  Mail,
  CheckCircle2,
  Clock,
  Trash2,
  Eye,
  Loader2,
  X,
  Send,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/inquiries")({
  head: () => ({
    meta: [{ title: "Inquiries Inbox | BHTF Admin" }],
  }),
  component: AdminInquiriesPage,
});

function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyNotes, setReplyNotes] = useState("");
  const [updating, setUpdating] = useState(false);

  const fetchInquiries = async () => {
    try {
      const res = await getAdminInquiries();
      setInquiries(res);
    } catch {
      toast.error("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const openInquiryModal = (iq: Inquiry) => {
    setSelectedInquiry(iq);
    setReplyNotes(iq.replyNotes || "");
    if (iq.status === "UNREAD") {
      updateInquiryStatus({ data: { id: iq.id, status: "IN_PROGRESS" } }).then(() => {
        fetchInquiries();
      });
    }
  };

  const handleUpdateStatus = async (status: "UNREAD" | "IN_PROGRESS" | "REPLIED" | "ARCHIVED") => {
    if (!selectedInquiry) return;
    setUpdating(true);
    try {
      await updateInquiryStatus({
        data: {
          id: selectedInquiry.id,
          status,
          replyNotes,
        },
      });
      toast.success(`Inquiry marked as ${status}.`);
      setSelectedInquiry(null);
      fetchInquiries();
    } catch {
      toast.error("Failed to update inquiry.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteAdminInquiry({ data: { id } });
      toast.success("Message removed.");
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      fetchInquiries();
    } catch {
      toast.error("Failed to delete inquiry.");
    }
  };

  const filteredInquiries = inquiries.filter((iq) => {
    const matchesSearch =
      iq.name.toLowerCase().includes(search.toLowerCase()) ||
      iq.email.toLowerCase().includes(search.toLowerCase()) ||
      iq.subject.toLowerCase().includes(search.toLowerCase()) ||
      iq.message.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || iq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Public Communications & Inquiries Inbox</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Citizen questions, hospital supply requests, partner proposals, and donor inquiries.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-700 rounded-full border border-sky-200">
              {inquiries.filter((i) => i.status === "UNREAD").length} Unread Messages
            </span>
          </div>
        </div>

        {/* Filter / Search Row */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search inquiries by sender, email address, subject, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="UNREAD">Unread</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="REPLIED">Replied / Resolved</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Loading inbox...</p>
            </div>
          ) : filteredInquiries.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No inquiries found in inbox.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Sender</th>
                    <th className="px-6 py-4">Subject & Excerpt</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Received</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((iq) => (
                    <tr
                      key={iq.id}
                      onClick={() => openInquiryModal(iq)}
                      className={`hover:bg-slate-50/80 transition cursor-pointer ${
                        iq.status === "UNREAD" ? "bg-sky-50/30 font-medium" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{iq.name}</div>
                        <div className="text-xs text-slate-500">{iq.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-900 line-clamp-1 font-medium">{iq.subject}</div>
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{iq.message}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            iq.status === "UNREAD"
                              ? "bg-sky-50 text-sky-700 font-bold"
                              : iq.status === "REPLIED"
                              ? "bg-emerald-50 text-emerald-700"
                              : iq.status === "IN_PROGRESS"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {iq.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                        {new Date(iq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openInquiryModal(iq)}
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-primary transition"
                            title="View Message"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(iq.id)}
                            className="p-1.5 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition"
                            title="Delete Message"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* View / Reply Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedInquiry.subject}</h3>
                  <div className="text-xs text-slate-500 mt-0.5">
                    From: <span className="font-semibold text-slate-700">{selectedInquiry.name}</span> ({selectedInquiry.email}) ·{" "}
                    {new Date(selectedInquiry.createdAt).toLocaleString()}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Full Message Box */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    Inquiry Message Body
                  </label>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </div>
                </div>

                {/* Direct Action Link */}
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition shadow-xs"
                  >
                    <Send className="h-3.5 w-3.5" /> Reply via Official Email ({selectedInquiry.email})
                  </a>
                </div>

                {/* Internal Secretariat Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Internal Resolution Notes
                  </label>
                  <textarea
                    rows={3}
                    value={replyNotes}
                    onChange={(e) => setReplyNotes(e.target.value)}
                    placeholder="Log internal follow-ups, responsible officer, or reply summary..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                {/* Status Actions */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedInquiry.id)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-2 rounded-lg transition"
                  >
                    Delete Message
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdateStatus("IN_PROGRESS")}
                      className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Mark In Progress
                    </button>
                    <button
                      type="button"
                      disabled={updating}
                      onClick={() => handleUpdateStatus("REPLIED")}
                      className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition shadow-xs flex items-center gap-1.5"
                    >
                      {updating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                      Mark Resolved / Replied
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
