import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminDonations, updateDonationStatus } from "@/lib/api/admin.functions";
import type { Donation } from "@/lib/db/schema";
import {
  Search,
  Download,
  Coins,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/donations")({
  head: () => ({
    meta: [{ title: "Donations & Ledger | BHTF Admin" }],
  }),
  component: AdminDonationsPage,
});

function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchDonations = async () => {
    try {
      const res = await getAdminDonations();
      setDonations(res);
    } catch {
      toast.error("Failed to load donations ledger.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleStatusChange = async (id: number, status: "PENDING" | "VERIFIED" | "COMPLETED" | "CANCELLED") => {
    try {
      await updateDonationStatus({ data: { id, status } });
      toast.success(`Donation status updated to ${status}`);
      fetchDonations();
    } catch {
      toast.error("Failed to update donation status.");
    }
  };

  const handleExportCSV = () => {
    const headers = ["Reference No", "Donor Name", "Email", "Phone", "Amount (Nu)", "Payment Method", "Status", "Date", "Message"];
    const rows = filteredDonations.map((d) => [
      d.referenceNo,
      `"${d.donorName}"`,
      d.donorEmail,
      d.donorPhone || "",
      d.amountNu,
      d.paymentMethod,
      d.status,
      new Date(d.createdAt).toISOString(),
      `"${(d.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bhtf_donations_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Donations ledger exported to CSV!");
  };

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.donorEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalAmount = filteredDonations
    .filter((d) => d.status === "COMPLETED" || d.status === "VERIFIED")
    .reduce((sum, d) => sum + d.amountNu, 0);

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Donations & Public Financial Ledger</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Verify bank transfers, mobile MBOB/BNB payments, and monitor public contributions.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition"
          >
            <Download className="h-4 w-4" /> Export Ledger CSV
          </button>
        </div>

        {/* Ledger Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center shrink-0">
              <Coins className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Filtered Volume</div>
              <div className="text-xl font-bold text-slate-900">Nu. {totalAmount.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 grid place-items-center shrink-0">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Pending Verification</div>
              <div className="text-xl font-bold text-slate-900">
                {donations.filter((d) => d.status === "PENDING").length} Pledges
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-600 grid place-items-center shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase">Completed Transactions</div>
              <div className="text-xl font-bold text-slate-900">
                {donations.filter((d) => d.status === "COMPLETED").length} Verified
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Donor Name, Email, or Reference ID (e.g. BHTF-DON-...)..."
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
            <option value="PENDING">Pending</option>
            <option value="VERIFIED">Verified</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Loading donations ledger...</p>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No donation records found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Reference No</th>
                    <th className="px-6 py-4">Donor</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDonations.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4 font-mono font-semibold text-xs text-primary">
                        {d.referenceNo}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                          {d.donorName}
                          {d.isAnonymous && (
                            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded font-normal">
                              Anon
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{d.donorEmail}</div>
                        {d.message && (
                          <div className="text-xs text-slate-600 italic mt-1 line-clamp-1">"{d.message}"</div>
                        )}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        Nu. {d.amountNu.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">
                          {d.paymentMethod}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            d.status === "COMPLETED"
                              ? "bg-emerald-50 text-emerald-700"
                              : d.status === "VERIFIED"
                              ? "bg-sky-50 text-sky-700"
                              : d.status === "PENDING"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {d.status === "COMPLETED" && <CheckCircle2 className="h-3 w-3" />}
                          {d.status === "PENDING" && <Clock className="h-3 w-3" />}
                          {d.status === "CANCELLED" && <XCircle className="h-3 w-3" />}
                          {d.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(d.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {d.status !== "COMPLETED" && (
                            <button
                              onClick={() => handleStatusChange(d.id, "COMPLETED")}
                              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition"
                            >
                              Verify
                            </button>
                          )}
                          {d.status === "PENDING" && (
                            <button
                              onClick={() => handleStatusChange(d.id, "CANCELLED")}
                              className="text-xs font-semibold px-2 py-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
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
