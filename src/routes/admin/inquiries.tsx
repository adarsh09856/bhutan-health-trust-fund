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
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  FileText,
  User,
  Archive,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/inquiries")({
  head: () => ({
    meta: [{ title: "Citizen Inquiries & Ombudsman | BHTF Admin" }],
  }),
  component: AdminInquiriesPage,
});

const quickTemplates = [
  {
    title: "Tax Voucher Delivery",
    text: "Thank you for your generous contribution to the Bhutan Health Trust Fund. Please find your official DRC-approved tax voucher attached. Your contribution has been matched 1:1 by the Royal Government.",
  },
  {
    title: "Medicine Buffer Stock Inquiry",
    text: "Thank you for contacting the BHTF Secretariat. We have logged your medicine stock inquiry with the Department of Medical Services and the relevant Dzongkhag Health Officer for immediate verification.",
  },
  {
    title: "CSR Partnership Collaboration",
    text: "Tashi Delek. We are delighted to explore a CSR health partnership with your organization. The BHTF Executive Secretariat will review your proposal and arrange an introductory consultation.",
  },
];

export function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [replyNotes, setReplyNotes] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
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
    setResponseMessage("");
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
          replyNotes: replyNotes + (responseMessage ? `\n[Dispatched Response]: ${responseMessage}` : ""),
        },
      });
      toast.success(`Inquiry ticket updated to ${status}.`);
      setSelectedInquiry(null);
      fetchInquiries();
    } catch {
      toast.error("Failed to update inquiry.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this message record?")) return;
    try {
      await deleteAdminInquiry({ data: { id } });
      toast.success("Message removed from inbox.");
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
      fetchInquiries();
    } catch {
      toast.error("Failed to delete inquiry.");
    }
  };

  const getInquiryCategory = (subject: string, message: string) => {
    const text = (subject + " " + message).toLowerCase();
    if (text.includes("whistleblower") || text.includes("corruption") || text.includes("irregularity")) {
      return { label: "Confidential Ombudsman Report", color: "bg-rose-100 text-rose-800 border-rose-300", isWhistleblower: true };
    }
    if (text.includes("donation") || text.includes("tax") || text.includes("receipt") || text.includes("voucher")) {
      return { label: "Donation & Tax Voucher Query", color: "bg-emerald-100 text-emerald-800 border-emerald-300", isWhistleblower: false };
    }
    if (text.includes("medicine") || text.includes("vaccine") || text.includes("hospital") || text.includes("clinic")) {
      return { label: "Health Commodity Alert", color: "bg-amber-100 text-amber-800 border-amber-300", isWhistleblower: false };
    }
    return { label: "General Citizen Inquiry", color: "bg-blue-100 text-blue-800 border-blue-300", isWhistleblower: false };
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
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                Citizen Triage Desk
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Inquiries & Ombudsman Console
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Manage public citizen correspondence, partnership proposals, and confidential anti-corruption reports.
            </p>
          </div>
        </div>

        {/* Triage Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Messages</span>
            <div className="text-2xl font-black text-slate-900 font-mono">{inquiries.length}</div>
            <span className="text-[11px] text-slate-400">All recorded communications</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Unread Tickets</span>
            <div className="text-2xl font-black text-rose-700 font-mono">
              {inquiries.filter((i) => i.status === "UNREAD").length}
            </div>
            <span className="text-[11px] text-rose-700 font-bold">Awaiting secretariat review</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">In Progress</span>
            <div className="text-2xl font-black text-amber-700 font-mono">
              {inquiries.filter((i) => i.status === "IN_PROGRESS").length}
            </div>
            <span className="text-[11px] text-amber-700 font-bold">Under staff investigation</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resolved / Replied</span>
            <div className="text-2xl font-black text-emerald-700 font-mono">
              {inquiries.filter((i) => i.status === "REPLIED" || i.status === "ARCHIVED").length}
            </div>
            <span className="text-[11px] text-emerald-700 font-bold">Completed cases</span>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-1 w-full bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-200">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search sender name, email, subject, or message content..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Ticket Statuses</option>
              <option value="UNREAD">Unread / New</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="REPLIED">Replied</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
        </div>

        {/* Inquiries Table */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="text-xs font-bold">Loading inquiries console...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Mail className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No inquiries match your filter criteria</h3>
            <p className="text-xs text-slate-500">Try modifying your search query.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Sender & Email</th>
                    <th className="py-3.5 px-5">Subject & Category</th>
                    <th className="py-3.5 px-5">Received Date</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredInquiries.map((iq) => {
                    const cat = getInquiryCategory(iq.subject, iq.message);
                    return (
                      <tr key={iq.id} className="hover:bg-slate-50/80 transition group">
                        <td className="py-4 px-5 space-y-0.5">
                          <div className="font-extrabold text-slate-900">{iq.name}</div>
                          <div className="text-[11px] text-slate-500 font-mono">{iq.email}</div>
                        </td>

                        <td className="py-4 px-5 space-y-1 max-w-xs sm:max-w-md">
                          <div className="font-bold text-slate-900 leading-snug line-clamp-1">{iq.subject}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{iq.message}</div>
                          <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${cat.color}`}>
                            {cat.label}
                          </span>
                        </td>

                        <td className="py-4 px-5 font-mono text-slate-500">
                          {new Date(iq.createdAt).toLocaleDateString()}
                        </td>

                        <td className="py-4 px-5">
                          <span
                            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                              iq.status === "UNREAD"
                                ? "bg-rose-100 text-rose-800"
                                : iq.status === "IN_PROGRESS"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {iq.status}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => openInquiryModal(iq)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer text-xs shadow-xs"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Read Ticket</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(iq.id)}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Ticket"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Interactive Ticket Reader, Notes & Dispatcher */}
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs font-black text-purple-700 uppercase tracking-widest">
                    Citizen Ticket #{selectedInquiry.id}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">{selectedInquiry.subject}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sender Info & Message Body */}
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 font-medium block">Sender:</span>
                    <strong className="text-slate-900 text-sm font-black">{selectedInquiry.name}</strong>
                    <span className="text-slate-500 block font-mono">{selectedInquiry.email}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 font-medium block">Received:</span>
                    <span className="font-mono text-slate-700">{new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-700 block">Citizen Message:</span>
                  <p className="text-slate-800 leading-relaxed font-normal whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Pre-Built Response Templates */}
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Quick Response Templates:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {quickTemplates.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setResponseMessage(t.text)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer"
                      >
                        {t.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Response Composer */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Dispatch Response Message (Simulated Email)
                  </label>
                  <textarea
                    rows={3}
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Type official response to dispatch to citizen..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-purple-600 focus:outline-none"
                  />
                </div>

                {/* Staff Internal Notes */}
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Internal Secretariat Case Notes
                  </label>
                  <textarea
                    rows={2}
                    value={replyNotes}
                    onChange={(e) => setReplyNotes(e.target.value)}
                    placeholder="Staff notes (e.g. Forwarded to Thimphu DHO, verified bank deposit...)"
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-purple-600 focus:outline-none bg-slate-50"
                  />
                </div>

                {/* Update Status Buttons */}
                <div className="pt-2">
                  <span className="text-slate-700 font-bold block mb-2">Set Ticket Status:</span>
                  <div className="flex flex-wrap gap-2">
                    {(["UNREAD", "IN_PROGRESS", "REPLIED", "ARCHIVED"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleUpdateStatus(st)}
                        disabled={updating}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 ${
                          selectedInquiry.status === st
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        Mark as {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus("REPLIED")}
                  disabled={updating}
                  className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" /> Save Notes & Mark Resolved
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
