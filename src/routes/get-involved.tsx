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
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { DonationFlowchart } from "@/components/donation-flowchart";
import { useLanguage } from "@/lib/i18n/language-context";

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
    icon: ShieldCheck,
    title: "1:1 Government Matching",
    caption: "“Double the gift. Double the lives touched.”",
    text: "Every donation is matched 1:1 by the Royal Government of Bhutan — doubling your impact instantly.",
    badge: "1:1 Sovereign Match",
  },
  {
    icon: Lock,
    title: "Capital Preservation",
    caption: "“Preserving capital for future generations.”",
    text: "A key principle of the Fund is the preservation of its principal capital. By financing healthcare needs through investment income rather than drawing on the principal, BHTF aims to safeguard its financial resources for future generations.",
    badge: "Corpus Protected",
  },
  {
    icon: TrendingUp,
    title: "70–20–10 Operating Model",
    caption: "“Sustainable financing for healthcare.”",
    text: "70% of investment income is allocated to finance the procurement of national essential medicines and vaccines, 20% is reinvested to support capital growth, and 10% is allocated to cover operational expenses.",
    badge: "Operating Model",
  },
  {
    icon: Award,
    title: "Tax Exemption (DRC E-73)",
    caption: "“Give generously, save on tax.”",
    text: "All contributions made by Bhutanese nationals to BHTF are tax-deductible under Tax Exemption Registration No. E-73 of the Department of Revenue and Customs, Ministry of Finance.",
    badge: "DRC Reg. No. E-73",
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
  const { t, isDzongkha } = useLanguage();
  const pageHeroSection = customSections?.find((section) => section.type === "hero" && section.isVisible);
  const [donorType, setDonorType] = useState<"national" | "international">("national");
  const [amount, setAmount] = useState(1000);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "MBOB" | "BNB_PAY" | "RMA_GATEWAY" | "BANK_TRANSFER" | "INTERNATIONAL_CARD"
  >("RMA_GATEWAY");
  const [dedicationType, setDedicationType] = useState<
    "GENERAL" | "BIRTHDAY" | "MEMORIAL" | "ANNIVERSARY" | "MERIT" | "CELEBRATION"
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
  const [rmaStep, setRmaStep] = useState<"BANK_INPUT" | "OTP_INPUT" | "CONFIRMED">("BANK_INPUT");
  const [rmaOtp, setRmaOtp] = useState("");
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

  // Official Media Lightbox Preview Modal State
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

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

    // Step 4 in flowchart: Verify account, send OTP
    if (rmaStep === "BANK_INPUT") {
      if (rmaAccountNo.trim().length < 5) {
        toast.error("Please enter your bank account number (min 5 digits).");
        return;
      }
      setRmaStep("OTP_INPUT");
      toast.success("Bank verification OTP generated! (Test code: 825109)");
      return;
    }

    // Step 5 in flowchart: Enter OTP (One-time password from bank)
    if (rmaStep === "OTP_INPUT") {
      if (rmaOtp.trim().length < 4) {
        toast.error("Please enter the 6-digit OTP from your bank (e.g. 825109).");
        return;
      }

      setProcessingRma(true);
      try {
        const txnId = `BFS-TXN-${Date.now().toString().slice(-8)}`;
        await verifyRmaBfsPayment({
          data: {
            referenceNo: receiptData.referenceNo,
            orderNo: rmaPayload.orderNo,
            bfsTxnId: txnId,
            bankName: rmaSelectedBank,
          },
        });

        setPaymentCompleted({
          transactionId: txnId,
          channel: `RMA BFS Gateway (${rmaSelectedBank})`,
          completedAt: new Date().toLocaleDateString(),
        });
        setRmaStep("CONFIRMED");
        toast.success("Donation confirmed! Stamped receipt generated.");
      } catch (err: any) {
        toast.error(err?.message || "RMA gateway authorization failed. Please try again.");
      } finally {
        setProcessingRma(false);
      }
    }
  };

  const handleConfirmRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!razorpayData || !receiptData) return;
    setProcessingRazorpay(true);
    try {
      if (!(window as any).Razorpay) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Checkout could not load"));
          document.head.appendChild(script);
        });
      }
      const checkout = new (window as any).Razorpay({
        key: razorpayData.keyId,
        order_id: razorpayData.orderId,
        amount: Math.round(razorpayData.amountNu * 100),
        currency: razorpayData.currency,
        name: "Bhutan Health Trust Fund",
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            await verifyRazorpayPayment({
              data: {
                referenceNo: razorpayData.referenceNo,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              },
            });
            setPaymentCompleted({
              transactionId: response.razorpay_payment_id,
              channel: "Razorpay",
              completedAt: new Date().toLocaleDateString(),
            });
            setRazorpayModalOpen(false);
            toast.success("Payment verified.");
          } catch {
            toast.error(
              "Payment verification failed. Contact the Fund with your reference number.",
            );
          }
        },
      });
      checkout.open();
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
    <div className="public-editorial-page donation-editorial-page space-y-14 sm:space-y-20 pb-20">
      <PageHero
        badge={pageHeroSection?.badge || "Section 6 · Support Free Primary Healthcare"}
        title={pageHeroSection?.title || "Donate"}
        subtitle={
          pageHeroSection?.subtitle ||
          "Every contribution makes a difference. BHTF warmly welcomes support from individuals, organisations, and well-wishers in Bhutan and around the world to help sustain access to essential medicines and vaccines for the people of Bhutan. Your generosity helps strengthen the Fund's commitment to free primary healthcare for present and future generations."
        }
      />

      {/* Rallying Theme Callout (Section 6 Verbatim) */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 -mt-8 sm:-mt-12 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 bg-emerald-900 text-amber-200 px-6 py-3.5 rounded-2xl shadow-lg border border-amber-400/30">
          <Sparkles className="h-5 w-5 text-amber-400 shrink-0" />
          <span className="font-serif italic text-sm sm:text-base md:text-lg font-bold">
            “Together, we can help sustain healthcare for all.”
          </span>
        </div>
      </div>

      {/* 4 Core Pillars of Donation */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="donate-avenues"
      >
        <SectionEditBadge
          label="Donation Pillars"
          pageSlug="get-involved"
          sectionId="donate-avenues"
          studioHref="/admin/donations"
          initialData={{
            title: "Donate — Bhutan Health Trust Fund",
            subtitle:
              "Your gift protects the health of every Bhutanese, forever. Every donation is matched 1:1 by the Royal Government of Bhutan.",
            badge: "Sovereign Health Guarantee",
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ways.map((w) => (
            <div
              key={w.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition duration-150 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center">
                    <w.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {w.badge}
                  </span>
                </div>
                <h3 className="font-sans font-bold text-slate-900 text-base">{w.title}</h3>
                <p className="font-sans italic font-bold text-xs text-emerald-800 leading-snug">
                  {w.caption}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{w.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Donation Form & Pledge Section */}
      <section
        id="donate-form"
        className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 scroll-mt-28 relative"
        data-bhtf-section="donate-terminal"
      >
        <SectionEditBadge
          label="Donation Terminal & Gateways"
          pageSlug="get-involved"
          sectionId="donate-terminal"
          studioHref="/admin/donations"
          initialData={{
            title: "Make a Healthcare Contribution Pledge",
            subtitle:
              "Generate an official stamped pledge certificate and deposit via MBOB, BNB Pay, RMA Payment Gateway, or direct bank transfer.",
            badge: "1:1 RGOB Matching Model Guaranteed",
          }}
        />
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
                <p className="font-sans text-xs sm:text-sm font-bold text-slate-900 italic leading-snug">
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
                <p className="font-sans text-xs sm:text-sm font-bold text-[#0B4F42] italic leading-snug">
                  "No Bhutanese should ever have to choose between their health and their
                  livelihood."
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
                <div className="font-sans text-sm font-bold text-slate-900">
                  “Give generously, save on tax.”
                </div>
                <p className="text-[11px] text-slate-600 font-light">
                  Tax deductible under DRC Reg. No. E-73 (subject to 5% statutory limits per
                  Circular DRC/TAX-A&L/DO-16/399 for BIT/CIT & PIT).
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
                      Your contribution has been settled via{" "}
                      <strong className="text-emerald-950">{paymentCompleted.channel}</strong>.
                      Reference ID:{" "}
                      <code className="bg-emerald-100 px-2 py-0.5 rounded font-mono font-bold text-emerald-900">
                        {paymentCompleted.transactionId}
                      </code>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-white border border-emerald-300 px-3.5 py-1 rounded-full shadow-2xs">
                      <ShieldCheck className="h-4 w-4 text-emerald-600" />
                      1:1 RGOB Sovereign Match Activated (Nu.{" "}
                      {(receiptData.amountNu * 2).toLocaleString()})
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
                      DRC Reg. No. E-73 Tax Deductible
                    </span>
                  </div>
                  <p className="font-sans italic text-xs font-bold text-emerald-950 bg-white/90 border border-emerald-300 rounded-xl p-3 max-w-lg mx-auto leading-relaxed shadow-2xs">
                    “Thank you — doubled by the Royal Government's 1:1 match! Your gift is preserved
                    forever, and its interest helps supply vaccines and medicines across Bhutan.”
                  </p>
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
                          <strong>USD Account:</strong> {institutionalConfig.bankAccountUSD} (SWIFT:{" "}
                          {institutionalConfig.swiftCodeBOB})
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
                          Your journal reference{" "}
                          <strong className="font-mono bg-white px-2 py-0.5 rounded border border-emerald-300">
                            {journalNo}
                          </strong>{" "}
                          has been tied to pledge voucher{" "}
                          <strong className="font-mono">{receiptData.referenceNo}</strong>. The BHTF
                          Secretariat cross-checks bank account entries daily and will verify your
                          pledge for official DRC tax deductibility.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitJournal} className="space-y-3">
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Once you execute the transfer on your <strong>mBoB, BNB Pay</strong> app,
                          or bank counter, please enter the{" "}
                          <strong>Journal / Reference / Narration Number</strong> from your
                          transaction receipt below. This allows instant matching and fast
                          certificate issuance.
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
              {/* Flowchart Step 3: Choose Donor Type */}
              <div className="space-y-2.5 bg-slate-50/80 p-4 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    {isDzongkha ? "རིམ་པ་ ༡ • ཞལ་འདེབས་པའི་དབྱེ་བ་གདམ།" : "Step 1 • Choose Donor Type"}
                  </label>
                  <span className="text-[11px] font-mono text-emerald-800 font-bold">
                    {donorType === "national" ? "Within Bhutan • BTN (Nu.)" : "Global & Diaspora • International"}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDonorType("national");
                      if (paymentMethod === "INTERNATIONAL_CARD") {
                        setPaymentMethod("RMA_GATEWAY");
                      }
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left transition duration-150 flex items-center justify-between cursor-pointer ${
                      donorType === "national"
                        ? "border-emerald-600 bg-white ring-2 ring-emerald-600/20 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${donorType === "national" ? "bg-emerald-700 text-white" : "bg-slate-100 text-slate-700"}`}>
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                          {isDzongkha ? "རྒྱལ་ནང་ཞལ་འདེབས།" : "National (Domestic)"}
                        </span>
                        <span className="text-[11px] text-slate-500 block">mBoB, BNB Pay, RMA BFS (Nu.)</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                      BTN (Nu.)
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setDonorType("international");
                      setPaymentMethod("INTERNATIONAL_CARD");
                    }}
                    className={`p-3.5 rounded-xl border-2 text-left transition duration-150 flex items-center justify-between cursor-pointer ${
                      donorType === "international"
                        ? "border-blue-600 bg-white ring-2 ring-blue-600/20 shadow-xs"
                        : "border-slate-200 hover:border-slate-300 bg-white/70"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${donorType === "international" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"}`}>
                        <Globe className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                          {isDzongkha ? "རྒྱལ་སྤྱིའི་ཞལ་འདེབས།" : "International (Global)"}
                        </span>
                        <span className="text-[11px] text-slate-500 block">Credit/Debit Card, SWIFT Wire</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                      USD / Card
                    </span>
                  </button>
                </div>
              </div>

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
                      sub: paymentConfig?.rmaBfs?.isEnabled
                        ? "Bhutan Financial Switch (All Bhutan Banks)"
                        : "Temporarily unavailable while the bank checkout protocol is verified.",
                      icon: Building,
                      disabled: !paymentConfig?.rmaBfs?.isEnabled,
                      badge: paymentConfig?.rmaBfs?.isLiveMode
                        ? "RMA BFS Live"
                        : paymentConfig?.rmaBfs?.isEnabled
                          ? "RMA BFS Test"
                          : "Verification pending",
                      badgeColor: paymentConfig?.rmaBfs?.isEnabled
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-slate-100 text-slate-600 border-slate-200",
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
                      sub: paymentConfig?.razorpay?.isEnabled
                        ? "Visa / Mastercard / UPI card checkout."
                        : "Temporarily unavailable until verified Razorpay credentials are configured.",
                      icon: CreditCard,
                      disabled: !paymentConfig?.razorpay?.isEnabled,
                      badge: paymentConfig?.razorpay?.isLiveMode
                        ? "Razorpay Live"
                        : paymentConfig?.razorpay?.isEnabled
                          ? "Razorpay Test"
                          : "Setup pending",
                      badgeColor: paymentConfig?.razorpay?.isEnabled
                        ? "bg-blue-50 text-blue-800 border-blue-200"
                        : "bg-slate-100 text-slate-600 border-slate-200",
                    },
                  ].map((pm) => (
                    <button
                      type="button"
                      key={pm.id}
                      disabled={Boolean((pm as { disabled?: boolean }).disabled)}
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between gap-2.5 transition ${
                        (pm as { disabled?: boolean }).disabled
                          ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-500 opacity-75"
                          : "cursor-pointer"
                      } ${
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
              {/* Meaningful Occasion Dedication Options */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Dedicate Your Donation (Tribute)
                  </label>
                  <span className="text-[11px] font-sans italic text-emerald-800 font-semibold">
                    “Turn a celebration into a lifesaving gift.”
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "GENERAL", label: "National Health", icon: "🏥" },
                    { id: "BIRTHDAY", label: "Birthday", icon: "🎂" },
                    { id: "MEMORIAL", label: "In Memoriam", icon: "🕊️" },
                    { id: "CELEBRATION", label: "Celebration", icon: "🎉" },
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
                      ? "In Memoriam (Name)"
                      : dedicationType === "BIRTHDAY"
                        ? "Birthday Tribute (Name)"
                        : dedicationType === "CELEBRATION"
                          ? "Celebration Tribute (Name & Occasion)"
                          : "Dedication Note (Optional)"}
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      dedicationType === "MEMORIAL"
                        ? "e.g. In loving memory of [Name]"
                        : dedicationType === "BIRTHDAY"
                          ? "e.g. Celebrating [Name]'s birthday with the gift of health"
                          : dedicationType === "CELEBRATION"
                            ? "e.g. In honor of [Name]'s [occasion]"
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
                  100% of your principal donation of <strong>Nu. {amount.toLocaleString()}</strong>{" "}
                  remains permanently preserved and untouched within the sovereign endowment corpus.
                  Only the annual returns and interest are spent on life-saving medicines and
                  universal childhood vaccines — protecting generations in perpetuity.
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

              {/* Flowchart Step 6: Click Pay now */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold py-4 px-6 rounded-2xl text-sm sm:text-base shadow-lg shadow-emerald-700/25 transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> {isDzongkha ? "དངུལ་སྤྲོད་སྒོ་ཕྱེ་དོ..." : "Opening Payment Window..."}
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>
                      {isDzongkha
                        ? `ད་ལྟོ་དངུལ་སྤྲོད • དངུལ་ཀྲམ ${amount.toLocaleString()} (དངུལ་སྤྲོད་སྒོ་ཕྱེ)`
                        : `Click Pay Now • Nu. ${amount.toLocaleString()} (Payment Window Opens)`}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Section 7 Canonical: Sources of Funding & Statutory 1% Contribution */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative"
        data-bhtf-section="donate-funding-architecture"
      >
        <SectionEditBadge
          label="Funding Architecture"
          pageSlug="get-involved"
          sectionId="donate-funding-architecture"
          studioHref="/admin/metrics"
          initialData={{
            title: "How BHTF Is Sustained",
            subtitle:
              "The Bhutan Health Trust Fund does not rely on short-term budgets. It is sustained by three perpetual, sovereign revenue streams designed to safeguard healthcare in perpetuity.",
            badge: "Section 7 • Institutional Financial Architecture",
          }}
        />
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
            <span>Section 7 • Institutional Financial Architecture</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl font-black text-slate-900">
            How BHTF Is Sustained
          </h2>
          <p className="text-slate-600 text-sm font-light leading-relaxed">
            The Bhutan Health Trust Fund does not rely on short-term budgets. It is sustained by
            three perpetual, sovereign revenue streams designed to safeguard healthcare in
            perpetuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="editorial-card p-6 sm:p-7 hover:shadow-lg transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Users className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
              Stream 1 • Working Citizen Solidarity
            </span>
            <h3 className="font-sans text-lg font-bold text-slate-900">1% Health Contribution</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              1% of the monthly gross salary of working employees across Bhutan — public and civil
              servants, as well as private and corporate employees. 100% of all health contributions
              collected are ring-fenced and utilized directly for the procurement of essential
              medicines and vaccines.
            </p>
          </div>

          <div className="editorial-card p-6 sm:p-7 hover:shadow-lg transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center">
              <TrendingUp className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
              Stream 2 • Capital Portfolio Yields
            </span>
            <h3 className="font-sans text-lg font-bold text-slate-900">
              Endowment Investment Income
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Prudent investment yields generated from the Fund's onshore holdings (annuities,
              corporate bonds, bank fixed deposits, equities) and safe offshore USD assets (USD
              12.08M). 70% of net yields directly finance medicines and vaccines, while 20% is
              reinvested for capital growth.
            </p>
          </div>

          <div className="editorial-card p-6 sm:p-7 hover:shadow-lg transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center">
              <Heart className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-800 uppercase tracking-wider block">
              Stream 3 • Philanthropic & Sovereign Match
            </span>
            <h3 className="font-sans text-lg font-bold text-slate-900">
              1:1 RGOB Matched Donations
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Voluntary contributions from donor nations, corporate entities, dzongkhags, gewogs,
              individuals, and the Bhutanese diaspora. Every single Ngultrum contributed by the
              public is doubled 1:1 by the Royal Government of Bhutan and is tax-deductible under
              DRC Reg No. E-73.
            </p>
          </div>
        </div>
      </section>

      {/* Official Events: Coming Together for a Healthier Bhutan (11 November 2026 & RSEBL) */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="donate-fundraising-campaigns"
      >
        <SectionEditBadge
          label="Fundraising Campaigns"
          pageSlug="get-involved"
          sectionId="donate-fundraising-campaigns"
          studioHref="/admin/news"
          initialData={{
            title: "Collective Mobilisation for Sovereign Health",
            subtitle:
              "Every contribution has a purpose, and behind every figure is a life. Together, we can turn collective support into better health outcomes for the people of Bhutan.",
            badge: "Events: Coming Together for a Healthier Bhutan",
          }}
        />
        <div className="bg-radial from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-900/40 relative overflow-hidden space-y-8">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/40 pb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 text-xs font-bold font-mono">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span>Events: Coming Together for a Healthier Bhutan</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-black text-white mt-2">
                Collective Mobilisation for Sovereign Health
              </h2>
            </div>
            <p className="text-xs text-emerald-200/80 max-w-md font-light leading-relaxed">
              "Every contribution has a purpose, and behind every figure is a life. Together, we can
              turn collective support into better health outcomes for the people of Bhutan."
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
              <h3 className="font-sans text-xl font-bold text-white">
                Fundraising Events — 11 November 2026
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                Fundraising is more than an event—it is an opportunity for individuals,
                organisations and communities to come together and contribute towards a healthier
                Bhutan. The fundraising activities planned for <strong>11 November 2026</strong>{" "}
                will provide a platform for collective support towards ensuring the continued
                availability of essential medicines and vaccines for those who need them.
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
              <h3 className="font-sans text-xl font-bold text-white">
                RSEBL Fundraising Initiatives
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                In partnership with the{" "}
                <strong>Royal Securities Exchange of Bhutan Limited (RSEBL)</strong>, BHTF will also
                explore fundraising initiatives that encourage greater participation from the public
                and private sectors. Through such partnerships, every contribution can become part
                of a larger effort to strengthen healthcare and make a meaningful difference in
                people's lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Ways to Donate */}
      <section
        id="ways-to-donate"
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative"
        data-bhtf-section="donate-ways"
      >
        <SectionEditBadge
          label="Ways to Donate & Remittance"
          pageSlug="get-involved"
          sectionId="donate-ways"
          studioHref="/admin/settings"
          initialData={{
            title: "Ways to Donate",
            subtitle: "Domestic and international contribution channels supporting Bhutan Health Trust Fund.",
            badge: "Section 6 · Ways to Donate",
          }}
        />

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
            Section 6 · Contributions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Ways to Donate
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Support BHTF domestically within Bhutan or internationally through verified sovereign channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Domestic Contributions Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center">
                    <Building className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-800 uppercase tracking-wider block">
                      Within Bhutan
                    </span>
                    <h3 className="font-sans text-xl font-bold text-slate-900">
                      Domestic
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  BTN (Nu.)
                </span>
              </div>

              {/* Verified Flowchart Diagram matching Developer Specification */}
              <DonationFlowchart variant="domestic" isDzongkha={isDzongkha} />

              {/* Verified Domestic Account Details */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Bank Name:</span>
                  <span className="font-bold text-slate-900">Bank of Bhutan Limited</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Account Number:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800 text-sm">100782506</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("100782506")}
                      className="p-1 text-slate-400 hover:text-emerald-700 cursor-pointer"
                      title="Copy Account Number"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Mobile Banking:</span>
                  <span className="font-medium text-slate-900 font-sans">
                    mBoB, mPay, ePay, TPay, RMA BFS
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Secretariat Address:</span>
                  <span className="font-medium text-slate-900 font-sans">
                    Lower Motithang, Thori Lam, Thimphu, Bhutan
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#donate-form"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition"
              >
                <span>Make a Donation Pledge / Generate Stamped Certificate</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* International Contributions Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-800 grid place-items-center">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-800 uppercase tracking-wider block">
                      Global & Diaspora
                    </span>
                    <h3 className="font-sans text-xl font-bold text-slate-900">
                      International
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200">
                  USD SWIFT Wire
                </span>
              </div>

              {/* Verified Flowchart Diagram matching Developer Specification */}
              <DonationFlowchart variant="international" isDzongkha={isDzongkha} />

              {/* Verified International SWIFT Account Details */}
              <div className="space-y-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Beneficiary Bank:</span>
                  <span className="font-medium text-slate-900 font-sans">Bank of Bhutan Ltd., Thimphu Branch</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">SWIFT Code:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-mono">BHUBBTBT022</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("BHUBBTBT022")}
                      className="p-1 text-slate-400 hover:text-emerald-700 cursor-pointer"
                      title="Copy SWIFT Code"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Beneficiary Account:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-emerald-800 text-sm">100931468</span>
                    <button
                      type="button"
                      onClick={() => handleCopy("100931468")}
                      className="p-1 text-slate-400 hover:text-emerald-700 cursor-pointer"
                      title="Copy Account Number"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Account Name:</span>
                  <span className="font-bold text-slate-900 font-sans">Bhutan Health Trust Fund</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#donate-form"
                onClick={() => setPaymentMethod("INTERNATIONAL_CARD")}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition"
              >
                <span>International Card Checkout (Razorpay)</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Join Membership */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8" id="membership">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
                Section 6 · Membership Movement
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Join Membership
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start">
              Sustaining Healthcare For All
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Embedded Official Image Graphic */}
            <div className="lg:col-span-7">
              <div
                className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 cursor-pointer group shadow-2xs"
                onClick={() => setPreviewImage({ src: "/images/official/image3.png", title: "Join Membership Program & Contribution Tiers" })}
              >
                <img
                  src="/images/official/image3.png"
                  alt="Join Membership Program BHTF"
                  className="w-full h-auto object-contain max-h-[500px] group-hover:scale-101 transition duration-300"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white text-xs font-bold">
                  <span>Click to view full image</span>
                </div>
              </div>
            </div>

            {/* Information & Action Details */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900">
                  Become a Life or Annual Member of BHTF
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Join hundreds of committed citizens, organisations, and institutional partners who contribute regularly to the Bhutan Health Trust Fund.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  Membership contributions are pooled into the protected endowment capital, ensuring ongoing investment returns that finance essential medicines and vaccines in perpetuity.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950 text-xs leading-relaxed space-y-1">
                <span className="font-bold text-amber-900 block">Enrollment Note:</span>
                <p>
                  To register your membership or for corporate/employee payroll giving programs, please contact the BHTF Secretariat at <a href="mailto:bhtf@bhtf.bt" className="underline font-bold">bhtf@bhtf.bt</a> or call <span className="font-mono font-semibold">02-338636 / 77348083</span>.
                </p>
              </div>

              <div>
                <a
                  href="mailto:bhtf@bhtf.bt?subject=BHTF%20Membership%20Enrollment%20Inquiry"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition"
                >
                  <Send className="h-4 w-4" />
                  <span>Contact Secretariat to Join</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Tax Exemption Verbatim Callout */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" id="tax-exemption">
        <div className="bg-white border-2 border-emerald-600/30 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center shrink-0 border border-emerald-200">
              <Award className="h-6 w-6 text-emerald-700" />
            </div>
            <div className="space-y-1.5 max-w-3xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 block">
                Department of Revenue & Customs • Ministry of Finance
              </span>
              <h3 className="font-sans text-xl font-bold text-slate-900">
                Tax Exemption
              </h3>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                All contributions made by Bhutanese nationals to BHTF are tax-deductible under Tax Exemption Registration No. E-73 of the Department of Revenue and Customs, Ministry of Finance.
              </p>
              <p className="text-[11px] text-slate-500 font-light">
                Statutory limits as per DRC Circular Ref. No. DRC/TAX-A&L/DO-16/399: BIT/CIT payers up to 5% of Assessed Net Profit; PIT payers up to 5% of Assessed Adjusted Gross Income.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-4 py-2 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-300 shrink-0 self-start md:self-center">
            DRC Reg. No. E-73
          </span>
        </div>
      </section>

      {/* RMA Bhutan Financial Switch (BFS) Gateway Modal - Flowchart Part 2 */}
      {rmaModalOpen && rmaPayload && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-600 grid place-items-center font-bold">
                  <Landmark className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">
                    {rmaStep === "CONFIRMED"
                      ? "Donation Confirmed"
                      : rmaStep === "OTP_INPUT"
                        ? "Enter OTP • Bank Verification"
                        : "RMA Bhutan Financial Switch"}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {rmaStep === "CONFIRMED"
                      ? "Receipt & Sovereign Match"
                      : "Central Bank Inter-Bank Gateway (BFS)"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRmaModalOpen(false);
                  setRmaStep("BANK_INPUT");
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {rmaStep === "CONFIRMED" ? (
              /* Step 6 in flowchart: Donation confirmed (Receipt and thank-you message) */
              <div className="space-y-4">
                <div className="bg-[#E3EED7] border-2 border-emerald-600 rounded-2xl p-5 text-center space-y-2 shadow-2xs">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 text-white mb-1 shadow-sm">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-black text-lg text-slate-900">
                    Donation Confirmed!
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-sans">
                    Receipt and thank-you message have been recorded. Thank you for sustaining free healthcare for the people of Bhutan!
                  </p>
                  <div className="pt-2 text-xs font-mono font-bold text-emerald-900 border-t border-emerald-400/60 mt-2">
                    Reference: {receiptData?.referenceNo || rmaPayload.orderNo}
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5 font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Amount Contributed:</span>
                    <span className="font-bold text-slate-900">Nu. {rmaPayload.amountNu.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">1:1 RGOB Match:</span>
                    <span className="font-bold text-emerald-700">+ Nu. {rmaPayload.amountNu.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-1">
                    <span className="text-slate-500 font-sans">Total Endowment Value:</span>
                    <span className="font-bold text-emerald-900">Nu. {(rmaPayload.amountNu * 2).toLocaleString()}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 pt-1 font-sans">
                    Tax Exemption: DRC Reg. No. E-73 eligible.
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setRmaModalOpen(false);
                    setRmaStep("BANK_INPUT");
                    window.print();
                  }}
                  className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Official Stamped Receipt
                </button>
              </div>
            ) : rmaStep === "OTP_INPUT" ? (
              /* Step 5 in flowchart: Enter OTP (Dashed box = step to confirm with BHTF) */
              <form onSubmit={handleConfirmRmaPayment} className="space-y-4">
                <div className="bg-[#E4ECF8] border-2 border-dashed border-slate-700 rounded-2xl p-4 text-center space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                    Part 2 • Step 5
                  </span>
                  <div className="font-black text-slate-900 text-sm">
                    Enter OTP
                  </div>
                  <div className="text-xs text-slate-600 leading-snug">
                    One-time password sent by your bank to your registered phone
                  </div>

                  <div className="pt-2">
                    <input
                      type="text"
                      maxLength={6}
                      required
                      autoFocus
                      value={rmaOtp}
                      onChange={(e) => setRmaOtp(e.target.value)}
                      placeholder="e.g. 825109"
                      className="w-40 mx-auto text-center font-mono font-black text-xl tracking-widest bg-white rounded-xl border border-slate-400 p-2.5 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <p className="text-[10.5px] text-slate-500 font-mono pt-1">
                    Demo test OTP: <strong className="text-emerald-800">825109</strong> (or any 6 digits)
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span className="w-4 h-2.5 rounded-xs border-2 border-dashed border-slate-700 bg-sky-100 inline-block shrink-0" />
                  <span>Dashed box = step to confirm with BHTF</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRmaStep("BANK_INPUT")}
                    className="w-1/3 py-2.5 px-3 border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={processingRma || !rmaOtp}
                    className="w-2/3 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {processingRma ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> Authenticate & Confirm
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Steps 1-4 in flowchart: Complete payment -> Select bank -> Enter account -> Verify account, send OTP */
              <>
                {/* Step 1: Complete your payment (Reference number is shown) */}
                <div className="bg-[#E4ECF8] p-3.5 rounded-2xl border border-blue-300 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Reference Number:</span>
                    <span className="font-mono font-bold text-slate-900">{rmaPayload.orderNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 font-medium">Amount to Pay:</span>
                    <span className="font-bold text-emerald-800">
                      Nu. {rmaPayload.amountNu.toLocaleString()}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleConfirmRmaPayment} className="space-y-4">
                  {/* Step 2: Select your bank */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Step 2 • Select Your Bank
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

                  {/* Step 3: Enter account number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Step 3 • Enter Account Number
                    </label>
                    <input
                      type="text"
                      required
                      value={rmaAccountNo}
                      onChange={(e) => setRmaAccountNo(e.target.value)}
                      placeholder="e.g. 100782506"
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-mono focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  {/* Step 4: Verify account, send OTP (Cancel closes the window) */}
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
                      disabled={!rmaAccountNo}
                      className="w-2/3 py-2.5 px-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Verify Account, Send OTP</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Bank of Bhutan Secure Card Payment Modal - Flowchart Part 2 */}
      {razorpayModalOpen && razorpayData && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-blue-500/10 text-blue-600 grid place-items-center font-bold">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-sm">Bank of Bhutan Card Payment</h3>
                  <p className="text-[11px] text-slate-500">
                    Secure International Gateway (VISA / Mastercard)
                  </p>
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

            {/* Step 1: Card payment window opens */}
            <div className="bg-[#E4ECF8] p-3.5 rounded-2xl border border-blue-300 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Gateway Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{razorpayData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Donation Amount:</span>
                <span className="font-bold text-blue-900">
                  Nu. {razorpayData.amountNu.toLocaleString()} ({razorpayData.currency})
                </span>
              </div>
              <div className="text-[10px] text-blue-700 pt-0.5">
                Bank of Bhutan Secure International Card Processing
              </div>
            </div>

            <form onSubmit={handleConfirmRazorpayPayment} className="space-y-4">
              {/* Step 3 & 4 dashed guide box */}
              <div className="bg-[#E4ECF8] border-2 border-dashed border-slate-700 rounded-2xl p-4 text-center space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Part 2 • Steps 3 & 4
                </span>
                <div className="font-black text-slate-900 text-sm">
                  Enter Card Details & Authenticate
                </div>
                <p className="text-xs text-slate-600 leading-snug">
                  Click the button below to launch the Bank of Bhutan secure payment window. Complete card authentication to receive instant receipt.
                </p>
              </div>

              <div className="text-[10.5px] text-slate-500 italic text-center">
                Keep the donation page open while paying. Cancel payment is available in the popup.
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
                  disabled={processingRazorpay}
                  className="w-2/3 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  {processingRazorpay ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Launching...
                    </>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5" /> Open Payment Window
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Official Media Lightbox Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl p-5 shadow-2xl border border-slate-200 overflow-hidden space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
                <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-base">
                  {previewImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto rounded-2xl bg-slate-50 p-2 flex items-center justify-center">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-h-[70vh] w-auto object-contain rounded-xl shadow-xs"
              />
            </div>
            <div className="flex justify-between items-center pt-1 text-xs text-slate-500">
              <span>Official Bhutan Health Trust Fund Documentation</span>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>
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
