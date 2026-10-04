import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { submitContactInquiry, getPublicFaqs, getPublicSettings, getPublicPage } from "@/lib/api/public.functions";
import type { Faq, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { institutionalConfig } from "@/config/institutional";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/contact")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "contact" } }).catch(() => null);
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
      { title: "Contact Secretariat | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Connect with the Bhutan Health Trust Fund Secretariat at BTFEC Office Building, Genyen Lam, Thimphu for citizen inquiries, donor partnerships, and official communications.",
      },
    ],
  }),
  component: ContactPage,
});

const faqs = [
  {
    q: "What is the Bhutan Health Trust Fund (BHTF)?",
    a: "The Bhutan Health Trust Fund (BHTF) is an autonomous statutory body established under the Royal Charter granted by His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck in 2000. It manages a ring-fenced capital endowment to guarantee uninterrupted financing for essential drugs and vaccines in perpetuity.",
  },
  {
    q: "Why was BHTF created?",
    a: "BHTF was created to insulate Bhutan's universal free healthcare system from donor dependency, geopolitical shifts, and economic volatility. By using only the investment returns of its endowment corpus, BHTF ensures that essential drugs and vaccines remain freely accessible to every Bhutanese citizen without interruption.",
  },
  {
    q: "How does the sovereign 1:1 RGOB matching fund work?",
    a: "Under the sovereign Royal Charter, every single Ngultrum contributed by individuals, corporations, civil society, and international well-wishers is matched 1:1 by the Royal Government of Bhutan through the Ministry of Finance, effectively doubling the impact of every donation.",
  },
  {
    q: "What healthcare commodities does BHTF finance?",
    a: "BHTF finances 100% of the National Essential Medicines List comprising 438 essential modern medicines, 110 traditional medicines (gSo-ba Rig-pa) including 65 core formulations, and 4 routine national vaccines (Pentavalent, PCV, HPV, and seasonal Influenza), along with needles, syringes, and cold-chain equipment.",
  },
  {
    q: "Are donations to BHTF tax-deductible?",
    a: "Yes. In accordance with Department of Revenue & Customs (DRC) Circular DRC/TAX-A&L/DO-16/399, contributions to BHTF are 100% tax-exempt and fully deductible up to 5% of taxable income under Corporate Income Tax (CIT) and Personal Income Tax (PIT).",
  },
  {
    q: "How is BHTF governed and audited?",
    a: "BHTF is governed by an eminent Board of Trustees chaired by the Hon'ble Minister for Health, comprising members from Zhung Dratshang, RMA, NPPF, MoF, private finance, and JDWNRH. Its accounts are audited annually by the Royal Audit Authority (RAA) of Bhutan, consistently receiving unqualified (clean) audit reports.",
  },
  {
    q: "How are funds invested and managed?",
    a: "The endowment corpus is managed under strict statutory investment policies overseen by the Board's Asset Management Committee (AMC). Investments prioritize capital preservation, inflation hedging, and liquidity across domestic treasury bills, fixed deposits, sovereign bonds, and prudent equities.",
  },
  {
    q: "Can international donors contribute in foreign currency?",
    a: "Yes. BHTF maintains an official USD account with the Bank of Bhutan (Account No. 100931468, SWIFT: BHUBBTBT022) for international wire transfers and bilateral donor contributions.",
  },
  {
    q: "What is Window Financing and how does disbursement operate?",
    a: "Window Financing is BHTF's quarterly disbursement mechanism to the Ministry of Health: Q1 (1st week of October), Q2 (1st week of January), Q3 (1st week of April), and Q4 (last week of June), following formal requisition and inventory reconciliations.",
  },
  {
    q: "Where is the BHTF Secretariat located and how can I contact them?",
    a: "The Secretariat is located at BTFEC Office Building, Genyen Lam, Thimphu, Bhutan. You can contact the Secretariat by phone at +975 2 322424, email at bhtf@bhtf.bt, or visit during official working hours (Monday-Friday, 9:00 AM - 5:00 PM BST).",
  },
];

function ContactPage() {
  const { customSections } = Route.useLoaderData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [liveFaqs, setLiveFaqs] = useState<Faq[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    getPublicFaqs()
      .then((res) => {
        if (res && res.length > 0) setLiveFaqs(res);
      })
      .catch(() => {});

    getPublicSettings()
      .then((res) => {
        if (res) setSettings(res);
      })
      .catch(() => {});
  }, []);

  const displayFaqs =
    liveFaqs.length > 0 ? liveFaqs.map((f) => ({ q: f.question, a: f.answer })) : faqs;

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
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Citizen & Partner Secretariat"
        title="Contact the Secretariat"
        subtitle="Direct communication channels for public health inquiries, donor partnerships, and official administrative requests."
      />

      {/* Custom Page Renderer if edited by admin */}
      {customSections && customSections.length > 0 && (
        <PageRenderer sections={customSections} pageSlug="contact" />
      )}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="contact-directory">
        <SectionEditBadge
          label="Secretariat Directory & Form"
          pageSlug="contact"
          sectionId="contact-directory"
          studioHref="/admin/inquiries"
          initialData={{
            title: "Contact the Secretariat",
            subtitle: "Direct communication channels for public health inquiries, donor partnerships, and official administrative requests.",
            badge: "Citizen & Partner Secretariat",
          }}
        />
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
                    <span className="font-extrabold text-slate-900 block">
                      Secretariat Headquarters
                    </span>
                    {/* Section 0 Institutional Config // TODO-VERIFY */}
                    <span className="text-slate-600 leading-snug block mt-0.5">
                      {settings["secretariat_address"] || institutionalConfig.secretariatAddress}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      (Adjacent to Ministry of Health)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 border border-blue-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Telephone Desks</span>
                    {/* Section 0 Institutional Config // TODO-VERIFY */}
                    <span className="text-slate-600 block mt-0.5 font-mono">
                      {settings["secretariat_phone"] || institutionalConfig.secretariatPhone}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                      Emergency Helpline:{" "}
                      {settings["emergency_hotline"] || institutionalConfig.emergencyHelpline} (
                      {settings["emergency_hotline_label"] ||
                        institutionalConfig.emergencyHelplineLabel}
                      )
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-700 grid place-items-center shrink-0 border border-purple-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Official Inquiries</span>
                    {/* Section 0 Institutional Config // TODO-VERIFY */}
                    <a
                      href={`mailto:${settings["secretariat_email"] || institutionalConfig.secretariatEmail}`}
                      className="text-slate-600 hover:text-emerald-700 transition block mt-0.5 font-mono"
                    >
                      {settings["secretariat_email"] || institutionalConfig.secretariatEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 border border-amber-200">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">
                      Secretariat Office Hours
                    </span>
                    <span className="text-slate-600 block mt-0.5">
                      Monday – Friday: 9:00 AM – 5:00 PM
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      (BST Bhutan Standard Time, UTC+6)
                    </span>
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
                All communications and partnership proposals are logged with the Executive
                Secretariat for official Trustee review.
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
                Please complete the form below. Official responses are typically dispatched within 2
                business days.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4 bg-emerald-50/50 rounded-3xl border border-emerald-200 p-8">
                <div className="h-14 w-14 rounded-full bg-emerald-600 text-white grid place-items-center mx-auto shadow-md">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-black text-slate-900">
                  Inquiry Successfully Transmitted
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you. Your message has been logged with the BHTF Secretariat. A
                  representative will contact you via email shortly.
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
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="contact-faqs">
        <SectionEditBadge
          label="Frequently Asked Questions"
          pageSlug="contact"
          sectionId="contact-faqs"
          studioHref="/admin/faqs"
          initialData={{
            title: "Common Inquiries on BHTF Operations",
            subtitle: "Answers to the most frequently asked questions regarding the endowment, governance, and commodity procurement.",
            badge: "Frequently Asked Questions",
          }}
        />
        <div className="text-center space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 block">
            Frequently Asked Questions
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Common Inquiries on BHTF Operations
          </h3>
        </div>

        <div className="space-y-3">
          {displayFaqs.map((faq, idx) => {
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
