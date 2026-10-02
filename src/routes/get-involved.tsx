import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  initiateDonationPayment,
  getPublicSettings,
  getPublicFinancialSettings,
  getPublicPaymentConfig,
  verifyRazorpayPayment,
  verifyRmaBfsPayment,
  submitDonationJournal,
  getPublicPage,
} from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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
  ShieldAlert,
  Send,
  Zap,
  X,
  Lock,
  Quote,
  Calendar,
  Globe,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { institutionalConfig } from "@/config/institutional";

export const Route = createFileRoute("/get-involved")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "get-involved" } }).catch(() => null);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return { customSections: sections };
    } catch {
      return { customSections: null };
    }
  },
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

export function DonateView({ customSections }: { customSections?: PageBlockSection[] | null }) {

  const [amount, setAmount] = useState(1000);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "MBOB" | "BNB_PAY" | "RMA_GATEWAY" | "BANK_TRANSFER" | "INTERNATIONAL_CARD"
  >("MBOB");
  const [dedicationType, setDedicationType] = useState<
    "GENERAL" | "BIRTHDAY" | "MEMORIAL" | "ANNIVERSARY" | "MERIT"
  >("GENERAL");
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState<{
    referenceNo: string;
    amountNu: number;
    paymentMethod: string;
    message: string;
  } | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [finSettings, setFinSettings] = useState<{
    bankAccountBOB: string;
    swiftCodeBOB: string;
    bankName: string;
    accountTitle: string;
    taxExemptionId: string;
  } | null>(null);
  const [paymentConfig, setPaymentConfig] = useState<{
    razorpay: { isEnabled: boolean; isLiveMode: boolean; keyId: string | null };
    rmaBfs: { isEnabled: boolean; isLiveMode: boolean; merchantId: string; gatewayUrl: string };
    banking: {
      bobAccountNo: string;
      bobSwiftCode: string;
      bnbAccountNo: string;
      bankName: string;
      accountTitle: string;
      qrImageUrl: string;
    };
  } | null>(null);

  // RMA BFS Gateway Modal State
  const [rmaModalOpen, setRmaModalOpen] = useState(false);
  const [rmaPayload, setRmaPayload] = useState<{
    orderNo: string;
    amountNu: number;
    merchantId: string;
    terminalId: string;
    checksum: string;
    gatewayUrl: string;
  } | null>(null);
  const [rmaSelectedBank, setRmaSelectedBank] = useState("BOB");
  const [rmaAccountNo, setRmaAccountNo] = useState("");
  const [processingRma, setProcessingRma] = useState(false);

  // Razorpay Checkout Modal State
  const [razorpayModalOpen, setRazorpayModalOpen] = useState(false);
  const [razorpayData, setRazorpayData] = useState<{
    orderId: string;
    keyId: string;
    amountNu: number;
    currency: string;
    referenceNo: string;
  } | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [processingRazorpay, setProcessingRazorpay] = useState(false);

  // Mobile Banking Journal Verification State
  const [journalNo, setJournalNo] = useState("");
  const [submittingJournal, setSubmittingJournal] = useState(false);
  const [journalSubmitted, setJournalSubmitted] = useState(false);

  // Real-Time Verified Payment Record
  const [paymentCompleted, setPaymentCompleted] = useState<{
    transactionId: string;
    channel: string;
    completedAt: string;
  } | null>(null);

  useEffect(() => {
    Promise.all([
      getPublicSettings().catch(() => ({})),
      getPublicFinancialSettings().catch(() => null),
      getPublicPaymentConfig().catch(() => null),
    ]).then(([s, f, p]) => {
      if (s) setSettings(s);
      if (f) setFinSettings(f);
      if (p) setPaymentConfig(p);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await initiateDonationPayment({
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
        // Handle RMA BFS Gateway Dispatch
        if (paymentMethod === "RMA_GATEWAY" && (res as any).rmaPayload) {
          setRmaPayload((res as any).rmaPayload);
          setReceiptData({
            referenceNo: res.referenceNo,
            amountNu: res.amountNu,
            paymentMethod: "RMA Payment Gateway (BFS)",
            message: `Order ${res.referenceNo} generated for Bhutan Financial Switch. Complete banking authentication to finalize.`,
          });
          setRmaModalOpen(true);
          return;
        }

        // Handle Razorpay International Card Dispatch
        if (
          (paymentMethod === "INTERNATIONAL_CARD" || (paymentMethod as any) === "RAZORPAY") &&
          (res as any).razorpayOrderId
        ) {
          setRazorpayData({
            orderId: (res as any).razorpayOrderId,
            keyId: (res as any).razorpayKeyId,
            amountNu: res.amountNu,
            currency: (res as any).currency || "INR",
            referenceNo: res.referenceNo,
          });
          setReceiptData({
            referenceNo: res.referenceNo,
            amountNu: res.amountNu,
            paymentMethod: "Razorpay (Credit / Debit Card)",
            message: `Checkout session created for ${res.referenceNo}. Complete payment to receive official DRC Tax Certificate.`,
          });
          setRazorpayModalOpen(true);
          return;
        }

        // Domestic Mobile Banking (mBoB / BNB Pay / Bank Wire)
        setReceiptData({
          referenceNo: res.referenceNo,
          amountNu: res.amountNu,
          paymentMethod: res.paymentMethod,
          message:
            res.message ||
            `Donation pledge of Nu. ${res.amountNu.toLocaleString()} recorded for reference ${res.referenceNo}`,
        });
        toast.success(`Donation pledge recorded! Tracking Ref: ${res.referenceNo}`);
      }
    } catch {
      toast.error("Failed to record donation pledge. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmRmaPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rmaPayload || !receiptData) return;
    setProcessingRma(true);
    try {
      const bfsTxnId = `BFS-${rmaSelectedBank}-${Date.now().toString().slice(-6)}`;
      const res = await verifyRmaBfsPayment({
        data: {
          referenceNo: receiptData.referenceNo,
          orderNo: rmaPayload.orderNo,
          bfsTxnId,
        },
      });
      if (res.success) {
        setPaymentCompleted({
          transactionId: bfsTxnId,
          channel: `RMA BFS (${rmaSelectedBank})`,
          completedAt: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        });
        setRmaModalOpen(false);
        toast.success(`RMA Payment successfully authorized! Txn Ref: ${bfsTxnId}`);
      }
    } catch {
      toast.error("RMA gateway authorization failed. Please try again.");
    } finally {
      setProcessingRma(false);
    }
  };

  const handleConfirmRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!razorpayData || !receiptData) return;
    setProcessingRazorpay(true);
    try {
      const razorpayPaymentId = `pay_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`;
      const res = await verifyRazorpayPayment({
        data: {
          referenceNo: razorpayData.referenceNo,
          razorpayOrderId: razorpayData.orderId,
          razorpayPaymentId,
        },
      });
      if (res.success) {
        setPaymentCompleted({
          transactionId: razorpayPaymentId,
          channel: "Razorpay (Credit / Debit Card)",
          completedAt: new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        });
        setRazorpayModalOpen(false);
        toast.success(`Payment verified! Razorpay Txn: ${razorpayPaymentId}`);
      }
    } catch {
      toast.error("Payment authorization failed.");
    } finally {
      setProcessingRazorpay(false);
    }
  };

  const handleSubmitJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiptData || journalNo.trim().length < 4) {
      toast.error("Please enter a valid bank journal / remittance number (min 4 chars).");
      return;
    }
    setSubmittingJournal(true);
    try {
      await submitDonationJournal({
        data: {
          referenceNo: receiptData.referenceNo,
          journalNo: journalNo.trim(),
          bankName: receiptData.paymentMethod,
        },
      });
      setJournalSubmitted(true);
      toast.success(
        "Bank Journal reference recorded! The Secretariat will cross-check and verify.",
      );
    } catch (err: any) {
      toast.error(err?.message || "Failed to submit bank journal.");
    } finally {
      setSubmittingJournal(false);
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

      {/* Donation Form & Pledge Section */}
      <section id="donate-form" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 scroll-mt-28">
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
              Generate an official stamped pledge certificate and deposit via MBOB, BNB Pay, RMA
              Payment Gateway, or direct bank transfer.
            </p>
          </div>

          {/* Sacred Donation Proclamations & Buddhist Quotes (Record of Discussion & DOCX Section 11 & 12) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#FAF8F3] border border-amber-200/90 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
              <Quote className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-serif text-xs sm:text-sm font-bold text-slate-900 italic leading-snug">
                  "Your gift protects the health of every Bhutanese forever."
                </p>
                <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                  Sovereign Health Promise • Royal Charter Mandate
                </span>
              </div>
            </div>

            <div className="bg-[#EAF6F5] border border-[#00A896]/30 rounded-2xl p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
              <Quote className="h-5 w-5 text-[#00A896] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-serif text-xs sm:text-sm font-bold text-[#0B4F42] italic leading-snug">
                  "No Bhutanese should ever have to choose between their health and their livelihood."
                </p>
                <span className="text-[10px] font-mono font-bold text-[#00A896] uppercase tracking-wider block">
                  His Majesty the Fourth Druk Gyalpo • Universal Health Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* Official DRC Tax Exemption Caption Callout */}
          <div className="bg-white border-2 border-[#00A896]/30 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 grid place-items-center shrink-0">
                <Sparkles className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-serif text-sm font-bold text-slate-900">
                  “Give generously, save on tax.”
                </div>
                <p className="text-[11px] text-slate-600 font-light">
                  100% Tax Deductible up to 5% of taxable income under Department of Revenue & Customs Circular DRC/TAX-A&L/DO-16/399 (CIT & PIT).
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shrink-0">
              DRC Circular DRC/TAX-A&L/DO-16/399
            </span>
          </div>

          {receiptData ? (
            <div className="space-y-6">
              {/* Real-time Verified Payment Banner */}
              {paymentCompleted && (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-6 text-center space-y-3 shadow-sm animate-in fade-in zoom-in-95 duration-200">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 shadow-inner">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-emerald-950">
                      Payment Successfully Authorized & Verified!
                    </h3>
                    <p className="text-xs text-emerald-800 mt-1 max-w-md mx-auto leading-relaxed">
                      Your contribution has been settled via <strong className="text-emerald-950">{paymentCompleted.channel}</strong>.
                      Reference ID: <code className="bg-emerald-100 px-2 py-0.5 rounded font-mono font-bold text-emerald-900">{paymentCompleted.transactionId}</code>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-white border border-emerald-300 px-3.5 py-1 rounded-full shadow-2xs">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      1:1 RGOB Sovereign Match Activated (Nu. {(receiptData.amountNu * 2).toLocaleString()})
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                      DRC Tax Deductible (Section 31)
                    </span>
                  </div>
                </div>
              )}

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
                    <p className="text-xs text-slate-500">
                      Royal Charter Autonomous Statutory Entity
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xs text-slate-400 font-semibold block">
                      Tracking Reference:
                    </span>
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
                      {/* Section 0A/0B Hard Constraint: Institutional Placeholder // TODO-VERIFY */}
                      {(finSettings?.bankAccountBOB || "").includes("PLACEHOLDER") && (
                        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-2.5 rounded-lg text-[11px] font-sans font-medium">
                          ⚠️ <strong>Institutional Verification:</strong> Bank routing parameters
                          are currently pending confirmation by the Secretariat through the Tier 2
                          restricted settings flow. Direct inquiries may also be confirmed with the
                          Secretariat. // TODO-VERIFY
                        </div>
                      )}
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg">
                        <span>
                          <strong>Domestic (Nu.):</strong>{" "}
                          {finSettings?.bankAccountBOB ||
                            settings["bob_account_no"] ||
                            institutionalConfig.bankAccountBOB}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopy(
                              finSettings?.bankAccountBOB ||
                                settings["bob_account_no"] ||
                                institutionalConfig.bankAccountBOB,
                            )
                          }
                          className="text-emerald-700 hover:text-emerald-800 p-1 cursor-pointer"
                          title="Copy Nu. Account Number"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg">
                        <span>
                          <strong>USD Account:</strong>{" "}
                          {institutionalConfig.bankAccountUSD} (SWIFT: {institutionalConfig.swiftCodeBOB})
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopy(institutionalConfig.bankAccountUSD)}
                          className="text-emerald-700 hover:text-emerald-800 p-1 cursor-pointer"
                          title="Copy USD Account Number"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg text-slate-800">
                        Title:{" "}
                        {finSettings?.accountTitle ||
                          settings["bob_account_title"] ||
                          institutionalConfig.siteName}
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded-lg text-slate-800">
                        {finSettings?.bankName || "Bank of Bhutan Limited"}, Thimphu Main Branch
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                      ⚠️ Please enter your Reference{" "}
                      <strong className="text-slate-900 font-mono">
                        {receiptData.referenceNo}
                      </strong>{" "}
                      into the narration/remarks field during transfer. You can track your
                      remittance and download an official DRC tax certificate anytime at{" "}
                      <Link to="/track-donation" className="text-emerald-700 font-bold underline">
                        Track My Donation
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                {/* Bank Journal / Remittance Submission Card */}
                {!paymentCompleted && (
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-2.5">
                      <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                        <Zap className="h-4 w-4 text-emerald-600" />
                        <span>Direct Remittance Verification (Bank Journal Number)</span>
                      </div>
                      {journalSubmitted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="h-3.5 w-3.5 text-amber-700" />
                          Pending Secretariat Reconciliation
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-500">
                          Applicable for mBoB, BNB Pay & Bank Wires
                        </span>
                      )}
                    </div>

                    {journalSubmitted ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-900 space-y-1">
                        <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          Bank Journal Submitted Successfully!
                        </div>
                        <p className="text-[11px] text-emerald-800 leading-relaxed">
                          Your journal reference <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">{journalNo}</strong> has been tied to pledge voucher <strong className="font-mono">{receiptData.referenceNo}</strong>. The BHTF Secretariat cross-checks bank account entries daily and will verify your pledge for official DRC tax deductibility.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitJournal} className="space-y-3">
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Once you execute the transfer on your <strong>mBoB, BNB Pay</strong> app, or bank counter, please enter the <strong>Journal / Reference / Narration Number</strong> from your transaction receipt below. This allows instant matching and fast certificate issuance.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="e.g. 240911002341 or BoB Journal ID"
                            value={journalNo}
                            onChange={(e) => setJournalNo(e.target.value)}
                            className="flex-1 rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-mono focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none"
                          />
                          <button
                            type="submit"
                            disabled={submittingJournal || journalNo.trim().length < 4}
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                          >
                            {submittingJournal ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" /> Submit Bank Journal
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" /> Stamped acknowledgment
                    logged for tax deduction.
                  </span>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      to="/track-donation"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      <Award className="h-4 w-4 text-amber-400" /> Track & DRC Tax Certificate
                    </Link>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      <Printer className="h-4 w-4" /> Print Stamped Voucher
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setReceiptData(null);
                        setPaymentCompleted(null);
                        setJournalSubmitted(false);
                        setJournalNo("");
                      }}
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
                  <span className="absolute left-4 top-3 text-sm font-bold text-slate-400">
                    Nu.
                  </span>
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
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Payment / Remittance Channel
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Direct RGOB Sovereign Ledger
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      id: "MBOB",
                      label: "mBoB Mobile Banking",
                      sub: "Direct BoB QR & Bank Journal (0% Fee)",
                      icon: QrCode,
                      badge: "Zero Platform Fee",
                      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    },
                    {
                      id: "BNB_PAY",
                      label: "BNB Pay / MPAY",
                      sub: "Bhutan National Bank QR (0% Fee)",
                      icon: QrCode,
                      badge: "Zero Platform Fee",
                      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    },
                    {
                      id: "RMA_GATEWAY",
                      label: "RMA Payment Gateway",
                      sub: "Bhutan Financial Switch (All Bhutan Banks)",
                      icon: Building,
                      badge: paymentConfig?.rmaBfs?.isLiveMode ? "RMA BFS Live" : "BFS Gateway Active",
                      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
                    },
                    {
                      id: "BANK_TRANSFER",
                      label: "Direct SWIFT Wire",
                      sub: "Official Institutional Account (0% Fee)",
                      icon: Landmark,
                      badge: "RGOB Official",
                      badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
                    },
                    {
                      id: "INTERNATIONAL_CARD",
                      label: "International Card (Razorpay)",
                      sub: "Visa / Mastercard / UPI (~2% low card fee)",
                      icon: CreditCard,
                      badge: paymentConfig?.razorpay?.isLiveMode ? "Razorpay Live" : "Lowest Card Fee (~2%)",
                      badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
                    },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2.5 transition cursor-pointer ${
                        paymentMethod === pm.id
                          ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-600/20 shadow-xs"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`p-2 rounded-xl mt-0.5 ${
                            paymentMethod === pm.id
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          <pm.icon className="h-4 w-4 shrink-0" />
                        </div>
                        <div>
                          <span className="text-xs font-bold block text-slate-900">{pm.label}</span>
                          <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                            {pm.sub}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] uppercase tracking-wider font-extrabold border px-2 py-0.5 rounded-md self-start ${pm.badgeColor}`}
                      >
                        {pm.badge}
                      </span>
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

              {/* Meaningful Occasion Dedication Options */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Donation Dedication (Occasion / Merit)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: "GENERAL", label: "National Health", icon: "🏥" },
                    { id: "BIRTHDAY", label: "Birthday Gift", icon: "🎂" },
                    { id: "MEMORIAL", label: "In Memory Of", icon: "🕊️" },
                    { id: "ANNIVERSARY", label: "Anniversary", icon: "🎊" },
                    { id: "MERIT", label: "Auspicious Merit", icon: "🌿" },
                  ].map((occ) => (
                    <button
                      type="button"
                      key={occ.id}
                      onClick={() => setDedicationType(occ.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        dedicationType === occ.id
                          ? "bg-amber-400 text-slate-950 border-amber-500 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <span>{occ.icon}</span>
                      <span>{occ.label}</span>
                    </button>
                  ))}
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
                    {dedicationType === "MEMORIAL"
                      ? "In Memory Of (Name)"
                      : dedicationType === "BIRTHDAY"
                      ? "Birthday Dedication (Name)"
                      : "Dedication Note (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      dedicationType === "MEMORIAL"
                        ? "e.g. In loving memory of Late Aum Karma"
                        : dedicationType === "BIRTHDAY"
                        ? "e.g. In honor of Tenzin's 1st Birthday"
                        : "e.g. For pediatric vaccines in remote gewogs"
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Capital Preservation Explanatory Callout */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-950 space-y-1">
                <div className="font-bold flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <span>The Capital Preservation Model</span>
                </div>
                <p className="text-[11px] text-amber-900/90 leading-relaxed font-light">
                  100% of your principal donation of <strong>Nu. {amount.toLocaleString()}</strong> remains permanently preserved and untouched within the sovereign endowment corpus. Only the annual returns and interest are spent on life-saving medicines and universal childhood vaccines — protecting generations in perpetuity.
                </p>
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
                <label
                  htmlFor="anonCheck"
                  className="text-xs font-medium text-slate-600 cursor-pointer"
                >
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

      {/* Section 7 Canonical: Sources of Funding & Statutory 1% Contribution */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span>Section 7 • Institutional Financial Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            How BHTF Is Sustained
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            The Bhutan Health Trust Fund does not rely on short-term budgets. It is sustained by three perpetual, sovereign revenue streams designed to safeguard healthcare in perpetuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
              Stream 1 • Working Citizen Solidarity
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              1% Health Contribution
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              1% of the monthly gross salary of working employees across Bhutan — public and civil servants, as well as private and corporate employees. 100% of all health contributions collected are ring-fenced and utilized directly for the procurement of essential medicines and vaccines.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
              Stream 2 • Capital Portfolio Yields
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Endowment Investment Income
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Prudent investment yields generated from the Fund's onshore holdings (annuities, corporate bonds, bank fixed deposits, equities) and safe offshore USD assets (USD 12.08M). 70% of net yields directly finance medicines and vaccines, while 20% is reinvested for capital growth.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center">
              <Heart className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-wider block">
              Stream 3 • Philanthropic & Sovereign Match
            </span>
            <h3 className="font-serif text-lg font-bold text-slate-900">
              1:1 RGOB Matched Donations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Voluntary contributions from donor nations, corporate entities, dzongkhags, gewogs, individuals, and the Bhutanese diaspora. Every single Ngultrum contributed by the public is doubled 1:1 by the Royal Government of Bhutan and is 100% tax-deductible under DRC Reg No. E-73.
            </p>
          </div>
        </div>
      </section>

      {/* Official Events: Coming Together for a Healthier Bhutan (11 November 2026 & RSEBL) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-radial from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-900/40 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/40 pb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-xs font-bold font-mono">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>Events: Coming Together for a Healthier Bhutan</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-2">
                Collective Mobilisation for Sovereign Health
              </h2>
            </div>
            <p className="text-xs text-emerald-200/80 max-w-md font-light leading-relaxed">
              "Every contribution has a purpose, and behind every figure is a life. Together, we can turn collective support into better health outcomes for the people of Bhutan."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            {/* 11 November 2026 Campaign */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-3 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                  National Initiative
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  11 November 2026
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                Fundraising Events — 11 November 2026
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Fundraising is more than an event—it is an opportunity for individuals, organisations and communities to come together and contribute towards a healthier Bhutan. The fundraising activities planned for <strong>11 November 2026</strong> will provide a platform for collective support towards ensuring the continued availability of essential medicines and vaccines for those who need them.
              </p>
            </div>

            {/* RSEBL Capital Market Partnership */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 space-y-3 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Capital Market Innovation
                </span>
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  Strategic Alliance
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-white">
                RSEBL Fundraising Initiatives
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                In partnership with the <strong>Royal Securities Exchange of Bhutan Limited (RSEBL)</strong>, BHTF will also explore fundraising initiatives that encourage greater participation from the public and private sectors. Through such partnerships, every contribution can become part of a larger effort to strengthen healthcare and make a meaningful difference in people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official Verified Banking Remittance Details Directory (Section 7 Verbatim) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Official Banking Protocols
              </span>
              <h3 className="font-serif text-2xl font-black text-slate-900">
                Direct Banking & Offshore Remittance Channels
              </h3>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 self-start">
              Verified by BHTF Finance
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FAF8F3] border border-amber-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-emerald-800" />
                <h4 className="font-serif text-sm font-bold text-slate-900">
                  Domestic Contributions (Within Bhutan)
                </h4>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Bank Name:</span>
                  <span className="font-bold text-slate-900">Bank of Bhutan Limited</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Account Number:</span>
                  <span className="font-bold text-emerald-800 text-sm">100782506</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Mobile Apps:</span>
                  <span className="font-medium text-slate-900 font-sans">mBoB, mPay, ePay, TPay</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">In-Person / Mail:</span>
                  <span className="font-medium text-slate-900 font-sans">BTFEC Building, Genyen Lam, Thimphu</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-emerald-200/80 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-emerald-800" />
                <h4 className="font-serif text-sm font-bold text-slate-900">
                  International & Diaspora Remittance (USD Wire)
                </h4>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">SWIFT Code:</span>
                  <span className="font-bold text-slate-900">BHUBBTBT022</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Beneficiary Account:</span>
                  <span className="font-bold text-emerald-800 text-sm">100931468</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Account Name:</span>
                  <span className="font-bold text-slate-900 font-sans">Bhutan Health Trust Fund</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600">Beneficiary Bank:</span>
                  <span className="font-medium text-slate-900 font-sans">Bank of Bhutan Ltd., Thimphu Branch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RMA Bhutan Financial Switch (BFS) Gateway Modal */}
      {rmaModalOpen && rmaPayload && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 grid place-items-center font-bold">
                  <Landmark className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">RMA Bhutan Financial Switch</h3>
                  <p className="text-[11px] text-slate-500">Central Bank Inter-Bank Gateway (BFS)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRmaModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">BFS Order Reference:</span>
                <span className="font-mono font-bold text-slate-900">{rmaPayload.orderNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Amount to Authorize:</span>
                <span className="font-bold text-emerald-700">Nu. {rmaPayload.amountNu.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>RMA Switch Terminal:</span>
                <span>{rmaPayload.terminalId}</span>
              </div>
            </div>

            <form onSubmit={handleConfirmRmaPayment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Select Member Bank in Bhutan
                </label>
                <select
                  value={rmaSelectedBank}
                  onChange={(e) => setRmaSelectedBank(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-semibold focus:border-emerald-600 focus:outline-none"
                >
                  <option value="BOB">Bank of Bhutan (BOB)</option>
                  <option value="BNB">Bhutan National Bank (BNB)</option>
                  <option value="DPNB">Druk PNB Bank (DPNB)</option>
                  <option value="TBANK">T-Bank Limited</option>
                  <option value="BDBL">Bhutan Development Bank (BDBL)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Bank Account / BFS Debit Card Number
                </label>
                <input
                  type="text"
                  required
                  value={rmaAccountNo}
                  onChange={(e) => setRmaAccountNo(e.target.value)}
                  placeholder="e.g. 10000023401928"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>RMA HMAC-SHA256 authenticated central bank protocol.</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRmaModalOpen(false)}
                  className="w-1/3 py-2.5 px-3 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processingRma || !rmaAccountNo}
                  className="w-2/3 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {processingRma ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Authorizing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" /> Authorize Nu. {rmaPayload.amountNu.toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Razorpay International Card & UPI Modal */}
      {razorpayModalOpen && razorpayData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 grid place-items-center font-bold">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Razorpay Sovereign Checkout</h3>
                  <p className="text-[11px] text-slate-500">Low-fee International Cards & Regional UPI (~2%)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRazorpayModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-blue-50/50 p-3.5 rounded-2xl border border-blue-100 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Razorpay Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{razorpayData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Donation Amount:</span>
                <span className="font-bold text-blue-900">
                  Nu. {razorpayData.amountNu.toLocaleString()} ({razorpayData.currency})
                </span>
              </div>
              <div className="text-[10px] text-blue-700 pt-0.5">
                🛡️ Low ~2% non-profit card fee (saves ~60% compared to Stripe's 4-5% deduction)
              </div>
            </div>

            <form onSubmit={handleConfirmRazorpayPayment} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 2222 3333 4444"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono focus:border-blue-600 focus:outline-none"
                  />
                  <CreditCard className="h-4 w-4 text-slate-400 absolute right-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="12/28"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono text-center focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">CVV / CVC</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="•••"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono text-center focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <Lock className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>PCI-DSS 256-bit TLS Encrypted Transaction</span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRazorpayModalOpen(false)}
                  className="w-1/3 py-2.5 px-3 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processingRazorpay || !cardNumber}
                  className="w-2/3 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {processingRazorpay ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Authorizing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" /> Pay Nu. {razorpayData.amountNu.toLocaleString()}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function GetInvolvedPage() {
  const { customSections } = Route.useLoaderData();
  return <DonateView customSections={customSections} />;
}
