import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { submitContactInquiry } from "@/lib/api/public.functions";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Secretariat | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Connect with the Bhutan Health Trust Fund Secretariat in Kawajangsa, Thimphu for citizen inquiries, donor partnerships, and official communications.",
      },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "How does the 1:1 RGOB Matching Fund work?",
    a: "Every single Ngultrum contributed by individuals, organizations, or international donors is matched 1:1 by the Royal Government of Bhutan through the Ministry of Finance, effectively doubling your health impact.",
  },
  {
    q: "Are donations to BHTF tax-deductible in Bhutan?",
    a: "Yes. In accordance with Department of Revenue & Customs regulations, donations made to BHTF are eligible for corporate and personal income tax deduction upon receipt of our official stamped pledge certificate.",
  },
  {
    q: "How does BHTF select which medicines and vaccines to finance?",
    a: "BHTF finances commodities from the National Essential Medicines List (NEML) approved by the Ministry of Health and Drug Regulatory Authority of Bhutan, following WHO prequalification standards.",
  },
  {
    q: "Can international donors contribute in foreign currencies (USD, EUR, GBP)?",
    a: "Yes. BHTF maintains official foreign currency accounts with the Bank of Bhutan and Bhutan National Bank for direct international SWIFT wire transfers.",
  },
];

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitContactInquiry({
        data: { name, email, subject, message },
      });

      if (res.success) {
        setSubmitted(true);
        toast.success("Your message has been securely submitted to the Secretariat.");
      }
    } catch {
      toast.error("Failed to submit inquiry. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Citizen & Partner Secretariat"
        title="Contact the Secretariat"
        subtitle="Direct communication channels for public health inquiries, donor partnerships, and official administrative requests."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Contact Details Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
              <h3 className="font-extrabold text-base text-slate-900 border-b pb-3 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-700" />
                <span>Secretariat Directory</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Secretariat Headquarters</span>
                    <span className="text-slate-600">Kawajangsa, Thimphu, Kingdom of Bhutan</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">(Adjacent to Ministry of Health)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Telephone Desks</span>
                    <a href="tel:+9752328999" className="text-slate-600 hover:text-emerald-700 transition">
                      +975 2 328999 / 338999
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Toll-Free Helpline: 112 (24/7)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-700 grid place-items-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Official Electronic Inquiries</span>
                    <a href="mailto:info@bhtf.bt" className="text-slate-600 hover:text-emerald-700 transition">
                      info@bhtf.bt / secretariat@bhtf.bt
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 grid place-items-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Official Working Hours</span>
                    <span className="text-slate-600">Mon–Fri · 9:00 AM – 5:00 PM (BTT)</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Closed on National & Government Holidays</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-md space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
                <ShieldCheck className="h-4 w-4" />
                <span>Citizen Guarantee</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                All inquiries submitted through this portal are logged directly into our administrative tracking system and acknowledged promptly.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                Send an Official Message to the Secretariat
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Please fill out the form below. For confidential whistleblower disclosures, you may also email{" "}
                <a href="mailto:ethics@bhtf.bt" className="text-emerald-700 font-semibold underline">
                  ethics@bhtf.bt
                </a>
                .
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 sm:p-12 text-center space-y-4">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-emerald-950">Inquiry Logged Successfully!</h3>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="font-semibold">{name}</strong>. Your message regarding "
                    <span className="font-semibold">{subject}</span>" has been recorded. Our secretariat desk will contact you at{" "}
                    <strong className="font-semibold">{email}</strong>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-4 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tshering Wangchuk"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Official Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tshering@organization.bt"
                      className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Inquiry Subject <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Inquiry regarding Essential Medicines replenishment in Mongar"
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Detailed Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide complete context regarding your inquiry, partnership proposal, or feedback..."
                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-xl text-xs sm:text-sm shadow-md transition disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Transmitting Message...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Inquiry to Secretariat
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-1">
              Common Questions
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-700 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-emerald-700" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in-50 duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}