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
  Sparkles,
  Award,
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
    icon: Award,
    color: "bg-amber-50 text-amber-700 border-amber-200",
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
    icon: Scale,
    color: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
    icon: ShieldCheck,
    color: "bg-rose-50 text-rose-700 border-rose-200",
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
    icon: Lock,
    color: "bg-blue-50 text-blue-700 border-blue-200",
    items: [
      {
        id: "investment-policy",
        title: "Endowment Capital Investment & Risk Management Guidelines",
        badge: "Fiduciary",
        summary:
          "Prescribes conservative sovereign investment mandates, capital preservation rules, and permissible asset classes to protect the corpus against inflation.",
        docSize: "1.1 MB PDF",
      },
      {
        id: "matching-fund-protocol",
        title: "RGOB 1:1 Matching Fund Release Operational Protocol",
        badge: "Statutory",
        summary:
          "Defines procedures for Ministry of Finance verification and automated 1:1 sovereign fund matching upon deposit of donor pledges.",
        docSize: "520 KB PDF",
      },
    ],
  },
];

function Policies() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (p: { title: string; docSize: string }) => {
    setDownloadingId(p.title);
    toast.success(`Preparing official copy of ${p.title}...`);
    setTimeout(() => {
      setDownloadingId(null);
      toast.success(`Official document downloaded successfully.`);
    }, 600);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Autonomous Fiduciary Governance"
        title="Governance, Policies & Ethics"
        subtitle="Institutional regulations, statutory anti-corruption safeguards, and quality assurance frameworks of the Bhutan Health Trust Fund."
      />

      {/* 4 Pillars Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policyCategories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className={`h-11 w-11 rounded-2xl grid place-items-center border ${cat.color}`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{cat.category}</h3>
                  <span className="text-xs text-slate-500 font-medium">Official Regulatory Instruments</span>
                </div>
              </div>

              <div className="space-y-4">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:bg-white hover:border-emerald-300 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-extrabold text-sm text-slate-900 leading-snug">{item.title}</h4>
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                        {item.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{item.summary}</p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 text-xs">
                      <span className="text-slate-400 font-mono text-[11px]">{item.docSize}</span>
                      <button
                        type="button"
                        onClick={() => handleDownload(item)}
                        className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:text-emerald-800 transition cursor-pointer text-xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download Instrument</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Whistleblower & Direct Reporting Box */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-rose-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                <span>Statutory Whistleblower Protection</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Confidential Reporting & Anti-Corruption Channel
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 self-start sm:self-auto">
              ACC Bhutan Harmonized
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
            Under the Anti-Corruption Act of the Kingdom of Bhutan and BHTF Trust Regulations, any citizen or contractor may confidentially report concerns regarding procurement irregularities, conflicts of interest, or misconduct with full legal protection.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-400" /> Confidential Ombudsman Email:
              </span>
              <a href="mailto:integrity@bhtf.bt" className="text-sm font-bold text-white hover:text-emerald-400 transition font-mono">
                integrity@bhtf.bt
              </a>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-400" /> Direct Secretariat Hotline:
              </span>
              <a href="tel:+9752328999" className="text-sm font-bold text-white hover:text-amber-400 transition font-mono">
                +975 2 328999 (Ext 104)
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}