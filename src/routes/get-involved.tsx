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
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved & Donate | Bhutan Health Trust Fund" },
      { name: "description", content: "Support BHTF through direct donations, organizational partnerships, volunteering, and career opportunities." },
    ],
  }),
  component: GetInvolvedPage,
});

const ways = [
  {
    icon: Heart,
    title: "Public Donations",
    text: "Every Ngultrum directly procures life-saving medicines and childhood vaccines for Bhutanese families.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    text: "Collaborate with bilateral, multilateral, and philanthropic foundations advancing universal health coverage.",
  },
  {
    icon: Users,
    title: "Community Outreach",
    text: "Participate in health literacy drives, blood donation events, and public health campaigns across dzongkhags.",
  },
  {
    icon: Briefcase,
    title: "Careers & Internships",
    text: "Join our dedicated secretariat team in public health financing, procurement, and governance.",
  },
];

function GetInvolvedPage() {
  const [amount, setAmount] = useState(1000);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"MBOB" | "BNB_PAY" | "RMA_GATEWAY" | "BANK_TRANSFER" | "INTERNATIONAL_CARD">("MBOB");
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
        toast.success(`Donation pledge generated! Reference: ${res.referenceNo}`);
      }
    } catch {
      toast.error("Failed to process donation pledge. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Account detail copied to clipboard!");
  };

  return (
    <>
      <PageHero
        title="Get Involved"
        subtitle="Join our sacred journey of ensuring no Bhutanese is denied essential healthcare due to financial hardship."
      />

      {/* 4 Pillars Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {ways.map((w) => (
          <div key={w.title} className="bg-white border rounded-xl p-6 text-center shadow-xs hover:border-slate-300 transition">
            <div className="h-12 w-12 mx-auto rounded-full bg-secondary/10 text-secondary grid place-items-center mb-3">
              <w.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-primary mb-1 text-base">{w.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{w.text}</p>
          </div>
        ))}
      </section>

      {/* Donation Form Section */}
      <section className="mx-auto max-w-4xl px-4 pb-20">
        <div className="bg-white border rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-rose-50 text-rose-600 mb-2">
              <Heart className="h-3.5 w-3.5" /> 100% Tax Deductible in Bhutan
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary">Contribute to the Trust Fund</h2>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
              Every Ngultrum contributes to the perpetual capital endowment financing routine vaccines and essential medicines across all 20 Dzongkhags.
            </p>
          </div>

          {receiptData ? (
            <div className="space-y-6">
              {/* Receipt Voucher */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 sm:p-8 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-xs uppercase font-semibold tracking-wider text-slate-500">
                      Official Pledge Voucher
                    </div>
                    <div className="text-xl font-bold text-primary">Bhutan Health Trust Fund</div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-500 font-medium">Tracking Reference:</div>
                    <div className="text-lg font-mono font-bold text-emerald-700">{receiptData.referenceNo}</div>
                  </div>
                </div>

                <div className="py-6 grid sm:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500">Pledged Amount:</div>
                    <div className="text-3xl font-black text-slate-900 mt-0.5">
                      Nu. {receiptData.amountNu.toLocaleString()}
                    </div>

                    <div className="mt-4 space-y-1 text-xs text-slate-600">
                      <div><span className="font-semibold">Donor:</span> {donorName || "Anonymous Donor"}</div>
                      <div><span className="font-semibold">Email:</span> {donorEmail}</div>
                      <div><span className="font-semibold">Selected Method:</span> {receiptData.paymentMethod}</div>
                      <div><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</div>
                    </div>
                  </div>

                  {/* Payment Transfer Instructions */}
                  <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-3">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">
                      <Building className="h-4 w-4 text-primary" /> Bank of Bhutan Deposit Details:
                    </div>
                    <div className="space-y-1.5 text-slate-600 font-mono">
                      <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                        <span>Account: 100984572</span>
                        <button onClick={() => handleCopy("100984572")} className="text-primary hover:underline">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                        <span>Name: Bhutan Health Trust Fund</span>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 p-2 rounded">
                        <span>Branch: Thimphu Main Branch</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Please quote reference <span className="font-bold text-primary">{receiptData.referenceNo}</span> in your transfer remarks/narration.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 flex items-center gap-1">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> A confirmation copy has been logged to your email.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg font-semibold transition"
                    >
                      <Printer className="h-3.5 w-3.5" /> Print Voucher
                    </button>
                    <button
                      onClick={() => setReceiptData(null)}
                      className="px-3 py-1.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                      Make Another Pledge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Preset Amounts */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  Select Donation Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[500, 1000, 5000, 10000].map((a) => (
                    <button
                      type="button"
                      key={a}
                      onClick={() => setAmount(a)}
                      className={`rounded-xl border-2 py-3.5 px-2 text-sm font-bold transition flex flex-col items-center justify-center cursor-pointer ${
                        amount === a
                          ? "border-primary bg-primary text-white shadow-sm"
                          : "border-slate-200 hover:border-primary text-slate-700 bg-white"
                      }`}
                    >
                      <span>Nu. {a.toLocaleString()}</span>
                      <span className="text-[10px] font-normal opacity-80 mt-0.5">
                        {a === 500 && "Vaccine Kit"}
                        {a === 1000 && "Clinic Supply"}
                        {a === 5000 && "Emergency Kit"}
                        {a === 10000 && "Annual Sponsor"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                  Or enter custom amount (Nu.)
                </label>
                <input
                  type="number"
                  min={50}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(50, Number(e.target.value)))}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-base font-bold text-slate-900 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">
                  Preferred Payment Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "MBOB", label: "MBOB / Mobile Banking", icon: QrCode },
                    { id: "BNB_PAY", label: "BNB Pay / MPAY", icon: QrCode },
                    { id: "RMA_GATEWAY", label: "RMA Bhutan Pay Gateway", icon: Building },
                    { id: "BANK_TRANSFER", label: "Direct Bank Transfer", icon: Building },
                    { id: "INTERNATIONAL_CARD", label: "International Card", icon: CreditCard },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2.5 transition cursor-pointer ${
                        paymentMethod === pm.id
                          ? "border-primary bg-primary/5 text-primary ring-2 ring-primary"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <pm.icon className="h-4 w-4 shrink-0" />
                      <span>{pm.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Donor Full Name
                  </label>
                  <input
                    type="text"
                    required={!isAnonymous}
                    disabled={isAnonymous}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="e.g. Dechen Wangmo"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none disabled:bg-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Email for Official Receipt
                  </label>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="dechen@example.bt"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Phone / Mobile (Optional)
                  </label>
                  <input
                    type="tel"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    placeholder="+975 17XXXXXX"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Dedication Message (Optional)
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. In loving memory of..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Anonymous Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymousCheck"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <label htmlFor="anonymousCheck" className="text-xs font-medium text-slate-600 cursor-pointer">
                  Make this contribution anonymous in public donor reports
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-6 rounded-xl text-base shadow-lg transition duration-150 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Recording Pledge...
                  </>
                ) : (
                  <>
                    <Heart className="h-5 w-5 text-rose-300 fill-rose-300" /> Proceed to Donate Nu. {amount.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}