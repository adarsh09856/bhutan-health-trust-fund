import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  FileText,
  Lock,
  Download,
  AlertTriangle,
  Mail,
  Phone,
  CheckCircle2,
  Scale,
  Building,
  Eye,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Governance & Policies | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Institutional policies, procurement regulations, code of conduct, and anti-corruption safeguards of Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: Policies,
});

const policyCategories = [
  {
    category: "Foundational & Charter",
    items: [
      {
        id: "royal-charter",
        title: "Royal Charter of Bhutan Health Trust Fund",
        badge: "Royal Decree",
        summary:
          "The foundational legal decree defining the autonomy, sovereign mandate, perpetual endowment corpus protections, and fiduciary accountability of the Trust Fund.",
        docSize: "1.4 MB PDF",
      },
      {
        id: "governance-framework",
        title: "Board of Trustees Governance Framework & Bylaws",
        badge: "Statutory",
        summary:
          "Details board compositions, fiduciary responsibilities, quorum rules, audit sub-committee responsibilities, and public reporting requirements.",
        docSize: "850 KB PDF",
      },
    ],
  },
  {
    category: "Procurement & Quality Standards",
    items: [
      {
        id: "procurement-rules",
        title: "Pharmaceutical Procurement & Quality Assurance Guidelines",
        badge: "Procurement",
        summary:
          "Strict open competitive bidding protocols adhering to WHO Prequalification criteria, DRA Bhutan batch-testing protocols, and cold-chain integrity standards.",
        docSize: "2.1 MB PDF",
      },
      {
        id: "supplier-code",
        title: "Supplier & Vendor Code of Ethics",
        badge: "Compliance",
        summary:
          "Mandatory ethical conduct guidelines forbidding price collusions, counterfeit supplies, and conflicts of interest in medical supply contracts.",
        docSize: "620 KB PDF",
      },
    ],
  },
  {
    category: "Integrity & Anti-Corruption",
    items: [
      {
        id: "anti-corruption",
        title: "Anti-Corruption & Whistleblower Protection Policy",
        badge: "Zero Tolerance",
        summary:
          "Zero-tolerance stance toward financial irregularities, establishing independent and confidential reporting channels with complete legal immunity for whistleblowers.",
        docSize: "740 KB PDF",
      },
      {
        id: "conflict-interest",
        title: "Conflict of Interest Disclosure Policy",
        badge: "Integrity",
        summary:
          "Annual mandatory conflict of interest declarations for all Board members, procurement officers, and secretariat staff.",
        docSize: "480 KB PDF",
      },
    ],
  },
  {
    category: "Financial Fiduciary & Investments",
    items: [
      {
        id: "investment-policy",
        title: "Endowment Investment Policy Statement (IPS)",
        badge: "Endowment",
        summary:
          "Guiding conservative capital preservation, asset allocation limits, ethical investing criteria, and risk management parameters for trust fund investments.",
        docSize: "1.1 MB PDF",
      },
      {
        id: "donor-rights",
        title: "Donor Transparency & Gift Acceptance Charter",
        badge: "Fiduciary",
        summary:
          "Standards governing the acceptance of public and international gifts, ring-fenced allocation, and the 1:1 RGOB matching fund mechanism.",
        docSize: "590 KB PDF",
      },
    ],
  },
];

function Policies() {
  const [expandedId, setExpandedId] = useState<string | null>("royal-charter");

  const handleDownload = (title: string) => {
    toast.success(`Downloading official policy: ${title}`);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "#";
      link.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
      link.click();
    }, 400);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Zero-Tolerance Fiduciary Integrity"
        title="Governance, Policies & Standards"
        subtitle="Upholding the highest standards of transparency, statutory compliance, and ethical stewardship in public health financing."
      />

      {/* 1. Core Principles Strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center mb-3">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Royal Audit Authority</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Subject to annual independent statutory audit with full disclosure of all receipts, disbursements, and investment returns.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 grid place-items-center mb-3">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">WHO & International Standards</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              All vaccine and medicine procurement strictly adheres to World Health Organization prequalification and safety guidelines.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 grid place-items-center mb-3">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Ring-Fenced Health Corpus</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Endowment capital is legally safeguarded by Royal Charter to guarantee perpetual healthcare financing.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Structured Policy Catalog */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {policyCategories.map((cat, idx) => (
          <div key={idx} className="space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-600"></span>
              <h2 className="text-xl font-extrabold text-slate-900">{cat.category}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-emerald-300 transition duration-200 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {item.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{item.docSize}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {item.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Active Policy
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDownload(item.title)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> PDF Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Confidential Whistleblower & Ethics Hotline Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Protected Whistleblower Channel</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                Confidential Ethics & Anti-Corruption Reporting
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                If you suspect any procurement irregularity, conflict of interest, or financial misconduct,
                report it directly to the Secretariat Ethics Officer. All disclosures are strictly confidential with full legal protection.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="mailto:ethics@bhtf.bt"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-md"
              >
                <Mail className="h-4 w-4" />
                <span>ethics@bhtf.bt</span>
              </a>
              <a
                href="tel:+9752328999"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
              >
                <Phone className="h-4 w-4" />
                <span>+975 2 328999</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}