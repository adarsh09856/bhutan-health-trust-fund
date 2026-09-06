import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { lookupDonation } from "@/lib/api/public.functions";
import {
  Search,
  CheckCircle2,
  ShieldCheck,
  Building,
  Printer,
  Calendar,
  CreditCard,
  Mail,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Loader2,
  Lock,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

export const Route = createFileRoute("/track-donation")({
  head: () => ({
    meta: [
      { title: "Track Donation & DRC Tax Certificate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Track your healthcare contribution, verify 1:1 RGOB Royal Matching, and generate your Department of Revenue & Customs 100% Tax Exemption Certificate.",
      },
    ],
  }),
  component: TrackDonationPage,
});

interface DonationRecord {
  id: number;
  referenceNo: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string | null;
  amountNu: number;
  currency: string;
  paymentMethod: string;
  status: string;
  message: string | null;
  isAnonymous: boolean;
  createdAt: string | Date;
}

function numberToWords(num: number): string {
  const a = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function inWords(n: number): string {
    if (n === 0) return "Zero";
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + inWords(n % 10000000) : "");
  }

  return "Ngultrum " + inWords(Math.floor(num)) + " Only";
}

export function TrackDonationPage() {
  const [referenceNo, setReferenceNo] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [donation, setDonation] = useState<DonationRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setDonation(null);

    if (!referenceNo.trim() || !donorEmail.trim()) {
      toast.error("Please enter both Reference Number and Donor Email.");
      return;
    }

    setLoading(true);
    try {
      const res = await lookupDonation({
        data: {
          referenceNo: referenceNo.trim(),
          donorEmail: donorEmail.trim(),
        },
      });

      if (res.success && res.donation) {
        setDonation(res.donation as DonationRecord);
        toast.success("Contribution record verified successfully.");
      } else {
        setError(res.error || "No contribution record found matching those credentials.");
      }
    } catch {
      setError("An error occurred while querying the sovereign ledger. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Reference number copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Hero */}
      <div className="print:hidden">
        <PageHero
          badge="SOVEREIGN HEALTH REPOSITORY"
          title="Track Donation & DRC Tax Certificate"
          subtitle="Real-Time 1:1 RGOB Sovereign Matching, Contribution Ledger Status & Official DRC 100% Tax Exemption Certificate"
        />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Verification Form (Hidden when printing) */}
        <div className="print:hidden bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" /> Confidential Verification
              </span>
              <h2 className="text-xl font-black text-slate-900 mt-1">
                Lookup Contribution Record
              </h2>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              RGOB Matching Model
            </span>
          </div>

          <form onSubmit={handleLookup} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Contribution Reference Number
                </label>
                <div className="relative">
                  <FileText className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={referenceNo}
                    onChange={(e) => setReferenceNo(e.target.value)}
                    placeholder="e.g. BHTF-DON-2026-8842"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono font-bold uppercase focus:border-emerald-600 focus:outline-none transition"
                  />
                </div>
                <p className="text-[10px] text-slate-400">Found on your pledge slip or SMS remittance confirmation.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Registered Donor Email
                </label>
                <div className="relative">
                  <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="e.g. donor@example.bt"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-emerald-600 focus:outline-none transition"
                  />
                </div>
                <p className="text-[10px] text-slate-400">Strictly required to verify identity and protect donor privacy.</p>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Verification Failed</p>
                  <p className="mt-0.5 text-rose-700 leading-relaxed">{error}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Direct verification against the live PostgreSQL sovereign store
              </span>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Verifying Ledger...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" /> Verify Contribution
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Found Contribution Details */}
        {donation && (
          <div className="mt-10 space-y-8 animate-in fade-in duration-200">
            {/* Action Bar (Print & Reset) */}
            <div className="print:hidden flex flex-wrap items-center justify-between gap-4 bg-emerald-950 text-white p-5 rounded-2xl shadow-lg border border-emerald-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-800 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Sovereign Contribution Verified</h3>
                  <p className="text-xs text-emerald-200">
                    Reference: <span className="font-mono font-bold text-amber-300">{donation.referenceNo}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 cursor-pointer transition shadow"
                >
                  <Printer className="h-4 w-4" /> Print DRC Tax Certificate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDonation(null);
                    setReferenceNo("");
                    setDonorEmail("");
                  }}
                  className="px-3 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-xs font-semibold cursor-pointer transition"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Verification Breakdown Card (Web View) */}
            <div className="print:hidden bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold border border-emerald-200">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    Verified Sovereign Contribution
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">
                    {donation.isAnonymous ? "Anonymous Benefactor" : donation.donorName}
                  </h3>
                  <p className="text-xs text-slate-500">{donation.donorEmail}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs text-slate-400 font-semibold block">Status</span>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mt-1 ${
                      donation.status === "COMPLETED"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}
                  >
                    {donation.status === "COMPLETED" ? "Remitted & Confirmed" : "Pledge Pending"}
                  </span>
                </div>
              </div>

              {/* 1:1 RGOB Sovereign Matching Multiplier Banner */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Donor Remittance
                  </span>
                  <span className="text-2xl font-black text-slate-900 block mt-1">
                    Nu. {donation.amountNu.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5 block">Direct Contribution</span>
                </div>

                <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                    RGOB 1:1 Matching
                  </span>
                  <span className="text-2xl font-black text-emerald-700 block mt-1">
                    + Nu. {donation.amountNu.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-600 mt-0.5 block">
                    Royal Government Allocation
                  </span>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-2xl p-5 shadow">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Total Healthcare Impact
                  </span>
                  <span className="text-2xl font-black text-amber-300 block mt-1">
                    Nu. {(donation.amountNu * 2).toLocaleString()}
                  </span>
                  <span className="text-[10px] text-emerald-200 mt-0.5 block">
                    Guaranteed Medicine Corpus
                  </span>
                </div>
              </div>

              {/* Detail Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-semibold block">Payment Channel</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4 text-slate-500" />
                    {donation.paymentMethod}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-slate-400 font-semibold block">Date & Timestamp</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-500" />
                    {new Date(donation.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="font-bold">DRC 100% Tax Exemption Clause:</strong> Under Section 10(b) of the
                  Income Tax Act of the Kingdom of Bhutan, direct contributions to the Bhutan Health Trust Fund are
                  fully deductible from gross taxable income. Click &quot;Print DRC Tax Certificate&quot; to obtain the official
                  stamped documentation.
                </div>
              </div>
            </div>

            {/* Official Printable Voucher (#printable-voucher) */}
            <div
              id="printable-voucher"
              className="bg-white border-2 border-slate-800 p-8 sm:p-12 rounded-3xl shadow-xl space-y-8 print:border-none print:shadow-none print:p-4 print:rounded-none print:m-0"
            >
              {/* Header */}
              <div className="text-center space-y-2 border-b-2 border-slate-800 pb-6">
                <div className="flex justify-center items-center gap-3">
                  <img src={logo} alt="BHTF Logo" className="h-16 w-16 object-contain" />
                </div>
                <div className="font-serif font-black text-xl sm:text-2xl text-slate-900 uppercase tracking-wide">
                  Bhutan Health Trust Fund
                </div>
                <div className="text-xs font-bold uppercase tracking-widest text-slate-700">
                  Royal Government of Bhutan
                </div>
                <div className="inline-block px-4 py-1 mt-2 rounded bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-widest">
                  Department of Revenue & Customs (DRC) Tax Exemption Certificate
                </div>
                <p className="text-[10px] text-slate-500 italic max-w-lg mx-auto mt-1">
                  Issued pursuant to Section 10(b) of the Income Tax Act of the Kingdom of Bhutan for allowable deduction from Gross Personal / Corporate Taxable Income.
                </p>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-slate-300 pb-4">
                <div>
                  <span className="text-slate-500 block">Certificate / Ref No:</span>
                  <span className="font-bold text-sm text-slate-900">{donation.referenceNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Date of Issue:</span>
                  <span className="font-bold text-slate-900">
                    {new Date(donation.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Benefactor Details */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Benefactor Particulars
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500">Name of Contributor:</span>
                    <p className="font-bold text-slate-900 text-sm">
                      {donation.isAnonymous ? "Anonymous Benefactor" : donation.donorName}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Registered Contact Email:</span>
                    <p className="font-mono text-slate-800">{donation.donorEmail}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Payment Instrument:</span>
                    <p className="font-bold text-slate-800">{donation.paymentMethod}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Remittance Verification:</span>
                    <p className="font-bold text-emerald-800 uppercase">
                      {donation.status === "COMPLETED" ? "Verified & Reconciled" : "Registered Pledge"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial Endorsement Table */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Contribution & Sovereign Matching Valuation
                </div>
                <table className="w-full text-xs border border-slate-300">
                  <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                    <tr>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-right">Statutory Amount (Nu.)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="p-3">
                        <span className="font-bold text-slate-900">Public Healthcare Contribution Remittance</span>
                        <p className="text-[10px] text-slate-500">100% Tax Deductible against DRC Assessment</p>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-slate-900">
                        Nu. {donation.amountNu.toLocaleString()}.00
                      </td>
                    </tr>
                    <tr className="bg-slate-50/50">
                      <td className="p-3">
                        <span className="font-bold text-emerald-800">RGOB 1:1 Sovereign Matching Component</span>
                        <p className="text-[10px] text-slate-500">Allocated directly from Ministry of Finance</p>
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-800">
                        + Nu. {donation.amountNu.toLocaleString()}.00
                      </td>
                    </tr>
                    <tr className="bg-slate-100 font-bold">
                      <td className="p-3 uppercase tracking-wider text-slate-900">
                        Total Sovereign Endowment Augmentation
                      </td>
                      <td className="p-3 text-right font-mono text-sm text-slate-900">
                        Nu. {(donation.amountNu * 2).toLocaleString()}.00
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="p-3 bg-slate-50 rounded-lg text-xs font-medium text-slate-700">
                  <strong>Amount in Words:</strong> {numberToWords(donation.amountNu)}
                </div>
              </div>

              {/* Statutory Attestation */}
              <div className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-200 pt-4 space-y-2">
                <p>
                  <strong>Statutory Declaration:</strong> The Bhutan Health Trust Fund certifies that the above donation has been remitted to the permanent sovereign endowment corpus for the uninterrupted provision of primary healthcare vaccines and essential drugs across all 20 Dzongkhags.
                </p>
                <p>
                  This document serves as an authentic legal receipt recognized by the Department of Revenue & Customs (DRC), Ministry of Finance, Royal Government of Bhutan.
                </p>
              </div>

              {/* Signatures & Seal */}
              <div className="pt-8 grid grid-cols-2 gap-8 items-end">
                <div className="space-y-1 text-center">
                  <div className="border-b border-slate-400 w-48 mx-auto mb-2"></div>
                  <p className="font-bold text-xs text-slate-900">Director / Comptroller</p>
                  <p className="text-[10px] text-slate-500">Bhutan Health Trust Fund Secretariat</p>
                </div>

                <div className="space-y-1 text-center">
                  <div className="border-b border-slate-400 w-48 mx-auto mb-2"></div>
                  <p className="font-bold text-xs text-slate-900">Authorized Officer</p>
                  <p className="text-[10px] text-slate-500">Department of Revenue & Customs Endorsement</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
