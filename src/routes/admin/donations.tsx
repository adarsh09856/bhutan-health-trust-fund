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
  Printer,
  ShieldCheck,
  Building2,
  Eye,
  X,
  FileText,
  CreditCard,
  Phone,
  Mail,
  User,
  Heart,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/admin/donations")({
  head: () => ({
    meta: [{ title: "Donors & Pledges CRM | BHTF Admin" }],
  }),
  component: AdminDonationsPage,
});

export function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [paymentFilter, setPaymentFilter] = useState("ALL");
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [voucherModalOpen, setVoucherModalOpen] = useState(false);

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
      if (selectedDonation && selectedDonation.id === id) {
        setSelectedDonation({ ...selectedDonation, status });
      }
      fetchDonations();
    } catch {
      toast.error("Failed to update donation status.");
    }
  };

  const getDonorTier = (amount: number) => {
    if (amount >= 100000) return { label: "Philanthropic Legacy / Bilateral", color: "bg-purple-100 text-purple-800 border-purple-300" };
    if (amount >= 25000) return { label: "Corporate CSR Partner", color: "bg-amber-100 text-amber-800 border-amber-300" };
    if (amount >= 5000) return { label: "Community Benefactor", color: "bg-blue-100 text-blue-800 border-blue-300" };
    return { label: "Grassroots Citizen", color: "bg-emerald-100 text-emerald-800 border-emerald-300" };
  };

  const handleExportCSV = () => {
    const headers = [
      "Reference No",
      "Donor Name",
      "Email",
      "Phone",
      "Amount (Nu)",
      "1:1 RGOB Match (Nu)",
      "Total Health Yield (Nu)",
      "Payment Method",
      "Status",
      "Date",
      "Message",
    ];
    const rows = filteredDonations.map((d) => [
      d.referenceNo,
      `"${d.donorName}"`,
      d.donorEmail,
      d.donorPhone || "",
      d.amountNu,
      d.amountNu,
      d.amountNu * 2,
      d.paymentMethod,
      d.status,
      new Date(d.createdAt).toISOString(),
      `"${(d.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `bhtf_fiduciary_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Fiduciary ledger exported to CSV successfully!");
  };

  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.referenceNo.toLowerCase().includes(search.toLowerCase()) ||
      d.donorName.toLowerCase().includes(search.toLowerCase()) ||
      d.donorEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || d.status === statusFilter;
    const matchesPayment = paymentFilter === "ALL" || d.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const totalPublicAmount = filteredDonations
    .filter((d) => d.status === "COMPLETED" || d.status === "VERIFIED")
    .reduce((sum, d) => sum + d.amountNu, 0);

  const totalYield = totalPublicAmount * 2; // 1:1 RGOB Sovereign Matching Multiplier

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Top Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Fiduciary Ledger
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Donors & Pledges CRM
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Verify incoming citizen and corporate pledges, audit sovereign matching yields, and generate official DRC tax vouchers.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-2xl shadow-xs transition cursor-pointer active:scale-95"
            >
              <Download className="h-4 w-4" /> Export CSV Ledger
            </button>
          </div>
        </div>

        {/* Fiduciary Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filtered Public Pledges</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              Nu. {totalPublicAmount.toLocaleString()}
            </div>
            <span className="text-xs font-medium text-slate-500 block">From {filteredDonations.length} records</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">1:1 RGOB Sovereign Match</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
              + Nu. {totalPublicAmount.toLocaleString()}
            </div>
            <span className="text-xs font-medium text-amber-800 font-bold block">100% Guaranteed by Ministry of Finance</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Combined Healthcare Yield</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">
              Nu. {totalYield.toLocaleString()}
            </div>
            <span className="text-xs font-medium text-blue-700 font-bold block">Doubled Purchasing Power</span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-1 w-full bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-200">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search donor name, email, or tracking reference (e.g. BHTF-DON-)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending Verification</option>
              <option value="VERIFIED">Verified</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>

            {/* Payment Method Filter */}
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Payment Modes</option>
              <option value="MBOB">MBOB Mobile Banking</option>
              <option value="BNB_PAY">BNB Pay / MPAY</option>
              <option value="RMA_GATEWAY">RMA Payment Gateway</option>
              <option value="BANK_TRANSFER">Bank Wire Transfer</option>
              <option value="INTERNATIONAL_CARD">International Card</option>
            </select>
          </div>
        </div>

        {/* Donations Table */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading donations ledger...</p>
          </div>
        ) : filteredDonations.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Coins className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No donations match your filter criteria</h3>
            <p className="text-xs text-slate-500">Try clearing the search or changing status filters.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Reference No</th>
                    <th className="py-3.5 px-5">Donor & Tier</th>
                    <th className="py-3.5 px-5">Public Amount</th>
                    <th className="py-3.5 px-5">1:1 RGOB Yield</th>
                    <th className="py-3.5 px-5">Payment Mode</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDonations.map((d) => {
                    const tier = getDonorTier(d.amountNu);
                    return (
                      <tr key={d.id} className="hover:bg-slate-50/80 transition group">
                        <td className="py-4 px-5 font-mono font-bold text-slate-900">
                          {d.referenceNo}
                        </td>

                        <td className="py-4 px-5 space-y-1">
                          <div className="font-extrabold text-slate-900">{d.donorName}</div>
                          <div className="text-[11px] text-slate-500">{d.donorEmail}</div>
                          <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${tier.color}`}>
                            {tier.label}
                          </span>
                        </td>

                        <td className="py-4 px-5 font-black text-slate-900 font-mono text-sm">
                          Nu. {d.amountNu.toLocaleString()}
                        </td>

                        <td className="py-4 px-5 font-black text-emerald-700 font-mono text-sm">
                          Nu. {(d.amountNu * 2).toLocaleString()}
                        </td>

                        <td className="py-4 px-5">
                          <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {d.paymentMethod}
                          </span>
                        </td>

                        <td className="py-4 px-5">
                          <span
                            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full ${
                              d.status === "COMPLETED" || d.status === "VERIFIED"
                                ? "bg-emerald-100 text-emerald-800"
                                : d.status === "PENDING"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {d.status}
                          </span>
                        </td>

                        <td className="py-4 px-5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDonation(d);
                              setVoucherModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer text-xs shadow-xs"
                          >
                            <Printer className="h-3 w-3" />
                            <span>Tax Voucher</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedDonation(d)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer text-xs"
                          >
                            <Eye className="h-3 w-3" />
                            <span>Details</span>
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

        {/* Modal 1: Donor Details & Status Manager Modal */}
        {selectedDonation && !voucherModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs font-extrabold text-emerald-700 uppercase tracking-widest">
                    Donor CRM Record
                  </span>
                  <h3 className="text-lg font-black text-slate-900">{selectedDonation.donorName}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedDonation(null)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 block font-medium">Tracking Ref:</span>
                    <span className="font-mono font-black text-slate-900">{selectedDonation.referenceNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Payment Mode:</span>
                    <span className="font-bold text-slate-900">{selectedDonation.paymentMethod}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Donation Amount:</span>
                    <span className="font-mono font-black text-slate-900">Nu. {selectedDonation.amountNu.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">1:1 RGOB Sovereign Match:</span>
                    <span className="font-mono font-black text-emerald-700">+ Nu. {selectedDonation.amountNu.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-medium">Donor Contact:</span>
                  <div className="font-bold text-slate-800">{selectedDonation.donorEmail}</div>
                  {selectedDonation.donorPhone && (
                    <div className="text-slate-600">{selectedDonation.donorPhone}</div>
                  )}
                </div>

                {selectedDonation.message && (
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900">
                    <span className="font-bold block mb-1">Donor Note / Pledge Dedication:</span>
                    <p className="italic">"{selectedDonation.message}"</p>
                  </div>
                )}

                <div className="pt-2">
                  <span className="text-slate-700 font-bold block mb-2">Update Fiduciary Status:</span>
                  <div className="flex flex-wrap gap-2">
                    {(["PENDING", "VERIFIED", "COMPLETED", "CANCELLED"] as const).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => handleStatusChange(selectedDonation.id, st)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          selectedDonation.status === st
                            ? "bg-slate-900 text-white shadow-md"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setVoucherModalOpen(true)}
                  className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Printer className="h-4 w-4" /> Print DRC Tax Certificate
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDonation(null)}
                  className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal 2: Official Stamped DRC Tax Voucher Generator */}
        {selectedDonation && voucherModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-200 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Official Royal Government Tax Receipt
                </span>
                <button
                  type="button"
                  onClick={() => setVoucherModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Printable Stamped Official Certificate */}
              <div id="printable-voucher" className="p-8 rounded-3xl bg-amber-50/40 border-2 border-amber-300 space-y-6 relative overflow-hidden text-slate-900">
                {/* Crest & Heading */}
                <div className="flex items-center justify-between border-b-2 border-amber-200 pb-4">
                  <div className="flex items-center gap-3">
                    <img src={logo} alt="BHTF Crest" className="h-14 w-14 object-contain" />
                    <div>
                      <div className="text-xs font-black text-emerald-800">འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ།</div>
                      <h2 className="text-lg font-black text-slate-900 tracking-tight">Bhutan Health Trust Fund</h2>
                      <div className="text-[11px] text-slate-600 font-medium">Royal Government of Bhutan · Thimphu</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-amber-200/70 text-amber-900">
                      Official Tax Voucher
                    </span>
                    <div className="text-xs font-mono font-bold text-slate-700 mt-1">{selectedDonation.referenceNo}</div>
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed">
                  <p>
                    This is to officially certify that <strong className="text-slate-900 font-black">{selectedDonation.donorName}</strong> ({selectedDonation.donorEmail}) has contributed to the perpetual sovereign health endowment of the Kingdom of Bhutan.
                  </p>

                  <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white border border-amber-200">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Public Donation Amount:</span>
                      <span className="text-base font-mono font-black text-slate-900">Nu. {selectedDonation.amountNu.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">1:1 RGOB Sovereign Match:</span>
                      <span className="text-base font-mono font-black text-emerald-700">+ Nu. {selectedDonation.amountNu.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Total Healthcare Yield:</span>
                      <span className="text-base font-mono font-black text-blue-700">Nu. {(selectedDonation.amountNu * 2).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Payment Instrument:</span>
                      <span className="text-sm font-bold text-slate-800">{selectedDonation.paymentMethod}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600">
                    <strong>Tax Exemption Mandate:</strong> In accordance with the Income Tax Act of the Kingdom of Bhutan and DRC guidelines, 100% of this contribution qualifies for personal and corporate income tax deductions.
                  </p>
                </div>

                {/* Institutional Stamp Signature */}
                <div className="pt-4 border-t border-amber-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono text-[10px] text-slate-500">Issued: {new Date(selectedDonation.createdAt).toLocaleDateString()}</div>
                    <div className="text-[10px] text-emerald-800 font-bold">Fiduciary Status: {selectedDonation.status}</div>
                  </div>

                  <div className="text-center">
                    <div className="h-10 w-24 border-b border-dashed border-slate-400 mx-auto" />
                    <span className="text-[10px] font-bold text-slate-700 mt-1 block">Executive Director, BHTF</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95"
                >
                  <Printer className="h-4 w-4" /> Print Stamped Certificate
                </button>

                <button
                  type="button"
                  onClick={() => setVoucherModalOpen(false)}
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
