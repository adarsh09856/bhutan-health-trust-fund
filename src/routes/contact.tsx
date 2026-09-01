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
  Award,
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
    a: "Every single Ngultrum contributed by individuals, corporations, or international donors is matched 1:1 by the Royal Government of Bhutan through the Ministry of Finance, effectively doubling your healthcare purchasing power.",
  },
  {
    q: "Are donations to BHTF tax-deductible in Bhutan?",
    a: "Yes. In accordance with Department of Revenue & Customs regulations, donations made to BHTF are eligible for corporate and personal income tax deduction upon receipt of our official stamped pledge certificate.",
  },
  {
    q: "How does BHTF select which medicines and vaccines to finance?",
    a: "BHTF finances commodities from the National Essential Medicines List (NEML) approved by the Ministry of Health and Drug Regulatory Authority of Bhutan, strictly adhering to WHO prequalification standards.",
  },
  {
    q: "Can international donors contribute in foreign currencies (USD, EUR, GBP)?",
    a: "Yes. BHTF maintains official foreign currency accounts with the Bank of Bhutan and Bhutan National Bank for direct international SWIFT wire transfers.",
  },
  {
    q: "How can remote gewog clinics report emergency stock alerts?",
    a: "Basic Health Units (BHUs) communicate through the National Emergency Health Logistics Channel and Dzongkhag Health Officers to trigger immediate replenishment.",
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
          {/* Contact Details Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
              <h3 className="font-black text-lg text-slate-900 border-b pb-4 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-700" />
                <span>Secretariat Directory</span>
              </h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 border border-emerald-200">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Secretariat Headquarters</span>
                    <span className="text-slate-600 leading-snug block mt-0.5">Kawajangsa, Thimphu, Kingdom of Bhutan</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">(Adjacent to Ministry of Health)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 border border-blue-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Telephone Desks</span>
                    <a href="tel:+9752328999" className="text-slate-600 hover:text-emerald-700 transition block mt-0.5 font-mono">
                      +975 2 328999 / 338999
                    </a>
                    <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">Emergency Helpline: 112 (24/7)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-700 grid place-items-center shrink-0 border border-purple-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Official Inquiries</span>
                    <a href="mailto:info@bhtf.bt" className="text-slate-600 hover:text-emerald-700 transition block mt-0.5 font-mono">
                      info@bhtf.bt / secretariat@bhtf.bt
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 border border-amber-200">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Secretariat Office Hours</span>
                    <span className="text-slate-600 block mt-0.5">Monday – Friday: 9:00 AM – 5:00 PM</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">(BST Bhutan Standard Time, UTC+6)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Trust Guarantee Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 to-slate-900 text-white border border-emerald-500/30 space-y-2 shadow-md">
              <span className="text-amber-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> Royal Charter Fiduciary Oversight
              </span>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                All communications and partnership proposals are logged with the Executive Secretariat for official Trustee review.
              </p>
            </div>
          </div>

          {/* Interactive Inquiry Form Column (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
            <div className="border-b pb-4">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block mb-1">
                Direct Communication Portal
              </span>
              <h3 className="text-2xl font-black text-slate-900">Send an Official Inquiry</h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Please complete the form below. Official responses are typically dispatched within 2 business days.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-emerald-50/50 rounded-3xl border border-emerald-200 p-8">
                <div className="h-14 w-14 rounded-full bg-emerald-600 text-white grid place-items-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">Inquiry Successfully Transmitted</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you. Your message has been logged with the BHTF Secretariat. A representative will contact you via email shortly.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kinley Dorji"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kinley@organization.bt"
                      className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Subject / Inquiry Category
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. CSR Health Partnership or Donation Inquiries"
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Detailed Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide details regarding your inquiry or proposed collaboration..."
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-xs sm:text-sm focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 focus:outline-none transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md shadow-emerald-700/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 border border-emerald-400/30"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message to Secretariat
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block">
            Frequently Asked Questions
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Common Inquiries on BHTF Operations
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left font-extrabold text-slate-900 text-sm sm:text-base flex items-center justify-between gap-4 hover:text-emerald-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-emerald-700" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}