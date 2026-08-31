import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { submitDonationPledge } from "@/lib/api/public.functions";
import {
  Heart,
  Handshake,
  Users,
  Briefcase,
  QrCode,
  CreditCard,
  Building,
  CheckCircle2,
  Copy,
  Printer,
  Loader2,
  Sparkles,
  ShieldCheck,
  Award,
  ArrowRight,
  TrendingUp,
  Landmark,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { EndowmentCalculator } from "@/components/endowment-calculator";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Donate & Support | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Make a tax-deductible donation pledge to Bhutan Health Trust Fund. 1:1 RGOB matched endowment model for essential medicines and vaccines.",
      },
    ],
  }),
  component: GetInvolvedPage,
});

const ways = [
  {
    icon: Heart,
    title: "Public Donations",
    text: "Every single Ngultrum contributed directly finances essential medicines and childhood vaccines across all 20 Dzongkhags.",
  },
  {
    icon: Handshake,
    title: "Corporate CSR Partnerships",
    text: "Partner with BHTF for institutional CSR allocations with official DRC Bhutan tax deduction certification.",
  },
  {
    icon: Landmark,
    title: "Endowment Legacy Giving",
    text: "Establish permanent named health endowments or long-term philanthropic trusts supporting remote primary clinics.",
  },
  {
    icon: Briefcase,
    title: "International Bilateral Grants",
    text: "Collaborate with WHO, UNICEF, and global health foundations under autonomous statutory governance.",
  },
];

const tiers = [
  {
    amount: 500,
    label: "Nu. 500",
    impact: "Provides full childhood immunization course for 2 infants",
  },
  {
    amount: 1000,
    label: "Nu. 1,000",
    impact: "Supplies essential antibiotic buffers for a rural BHU clinic",
  },
  {
    amount: 5000,
    label: "Nu. 5,000",
    impact: "Finances clean emergency maternal delivery and neonatal kits",
  },
  {
    amount: 10000,
    label: "Nu. 10,000",
    impact: "Sponsors essential chronic care medicines for an entire village",
  },
];

function GetInvolvedPage() {
  const [amount, setAmount] = useState(1000);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "MBOB" | "BNB_PAY" | "RMA_GATEWAY" | "BANK_TRANSFER" | "INTERNATIONAL_CARD"
  >("MBOB");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    referenceNo: string;
    amountNu: number;
    paymentMethod: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitDonationPledge({
        data: {
          donorName: isAnonymous ? "Anonymous Benefactor" : donorName,
          donorEmail,
          donorPhone: donorPhone || undefined,
          amountNu: amount,
          paymentMethod,
          message: message || undefined,
          isAnonymous,
        },
      });

      if (res.success) {
        setReceiptData({
          referenceNo: res.referenceNo,
          amountNu: res.amountNu,
          paymentMethod: res.paymentMethod,
          message: res.message,
        });
        toast.success(`Donation pledge recorded! Tracking Ref: ${res.referenceNo}`);
      }
    } catch {
      toast.error("Failed to record donation pledge. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Account detail copied to clipboard!");
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Tax Deductible in Bhutan"
        title="Support the Bhutan Health Trust Fund"
        subtitle="Every Ngultrum you pledge is doubled 1:1 by the Royal Government of Bhutan to build a permanent, sovereign health endowment."
      />

      {/* 4 Pillars of Engagement */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ways.map((w) => (
            <div
              key={w.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition duration-150 space-y-3"
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center mb-4">
                <w.icon className="h-6 w-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{w.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive 1:1 RGOB Sovereign Matching Simulator */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <EndowmentCalculator />
      </section>

      {/* Donation Form & Pledge Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>1:1 RGOB Matching Model Guaranteed</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Make a Healthcare Contribution Pledge
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Generate an official stamped pledge certificate and deposit via MBOB, BNB Pay, RMA Payment Gateway, or direct bank transfer.
            </p>
          </div>

          {receiptData ? (
            <div className="space-y-6">
              {/* Receipt Voucher */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-6 sm:p-10 relative space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-widest text-emerald-700 block">
                      Official Pledge Voucher
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                      Bhutan Health Trust Fund
                    </h3>
                    <p className="text-xs text-slate-500">Royal Charter Autonomous Statutory Entity</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">Tracking Reference:</span>
                    <span className="text-xl font-mono font-extrabold text-emerald-700">
                      {receiptData.referenceNo}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-slate-500 font-semibold">Pledged Amount:</span>
                      <div className="text-3xl sm:text-4xl font-black text-slate-900 mt-1">
                        Nu. {receiptData.amountNu.toLocaleString()}
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 mt-1">
                        + Nu. {receiptData.amountNu.toLocaleString()} (Matched by RGOB) = Nu.{" "}
                        {(receiptData.amountNu * 2).toLocaleString()} Total Value
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                      <div>
                        <strong className="text-slate-900">Donor Name:</strong>{" "}
                        {donorName || "Anonymous Benefactor"}
                      </div>
                      <div>
                        <strong className="text-slate-900">Email Address:</strong> {donorEmail}
                      </div>
                      {donorPhone && (
                        <div>
                          <strong className="text-slate-900">Phone:</strong> {donorPhone}
                        </div>
                      )}
                      <div>
                        <strong className="text-slate-900">Payment Channel:</strong>{" "}
                        {receiptData.paymentMethod}
                      </div>
                      <div>
                        <strong className="text-slate-900">Pledge Date:</strong>{" "}
                        {new Date().toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Bank Deposit Box */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                    <div className="font-bold text-slate-900 flex items-center gap-2 border-b pb-2">
                      <Building className="h-4 w-4 text-emerald-700" />
                      <span>Bank of Bhutan Official Account</span>
                    </div>

                    <div className="space-y-2 font-mono text-slate-700">
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg">
                        <span>Account: 100984572</span>
                        <button
                          type="button"
                          onClick={() => handleCopy("100984572")}
                          className="text-emerald-700 hover:text-emerald-800 p-1 cursor-pointer"
                          title="Copy Account Number"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg text-slate-800">
                        Title: Bhutan Health Trust Fund
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg text-slate-800">
                        Branch: Thimphu Main Branch (SWIFT: BOBKBTBT)
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                      ⚠️ Please enter your Reference{" "}
                      <strong className="text-slate-900 font-mono">{receiptData.referenceNo}</strong> into the
                      narration/remarks field during transfer.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> Stamped acknowledgment logged for tax deduction.
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      <Printer className="h-4 w-4" /> Print Stamped Voucher
                    </button>
                    <button
                      type="button"
                      onClick={() => setReceiptData(null)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Create Another Pledge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preset Amounts */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Donation Tier & Tangible Health Impact
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tiers.map((t) => (
                    <button
                      type="button"
                      key={t.amount}
                      onClick={() => setAmount(t.amount)}
                      className={`p-4 rounded-2xl border-2 text-left transition duration-150 flex flex-col justify-between cursor-pointer ${
                        amount === t.amount
                          ? "border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20 shadow-sm"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-lg text-slate-900">{t.label}</div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">{t.impact}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 mt-2 block">
                        Matched: Nu. {(t.amount * 2).toLocaleString()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Or Specify Custom Amount (Nu.)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-sm font-bold text-slate-400">Nu.</span>
                  <input
                    type="number"
                    min={50}
                    value={amount}
                    onChange={(e) => setAmount(Math.max(50, Number(e.target.value)))}
                    className="w-full rounded-xl border border-slate-300 pl-12 pr-4 py-3 text-base font-extrabold text-slate-900 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Select Payment / Deposit Channel
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "MBOB", label: "MBOB Mobile Banking", icon: QrCode },
                    { id: "BNB_PAY", label: "BNB Pay / MPAY", icon: QrCode },
                    { id: "RMA_GATEWAY", label: "RMA Payment Gateway", icon: Building },
                    { id: "BANK_TRANSFER", label: "Bank Wire Transfer", icon: Building },
                    { id: "INTERNATIONAL_CARD", label: "International Card", icon: CreditCard },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition cursor-pointer ${
                        paymentMethod === pm.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <pm.icon className="h-4 w-4 shrink-0 text-emerald-700" />
                      <span>{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Donor Full Name
                  </label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Tshering Yangzom"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition disabled:bg-slate-100"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address (For Tax Voucher)
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="tshering@organization.bt"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mobile Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+975 17XXXXXX"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Dedication Note (Optional)
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. For pediatric vaccines in Gasa"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="anonCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="anonCheck" className="text-xs font-medium text-slate-600 cursor-pointer">
                  List this contribution as "Anonymous Benefactor" in public annual reports
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-700/20 transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Recording Official Pledge...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 fill-white" /> Complete Pledge of Nu.{" "}
                    {amount.toLocaleString()} (Total Value: Nu. {(amount * 2).toLocaleString()})
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}