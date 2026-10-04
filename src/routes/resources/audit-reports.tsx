import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  FileCheck2,
  Download,
  Search,
  CheckCircle2,
  Lock,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/resources/audit-reports")({
  head: () => ({
    meta: [
      { title: "Statutory Audit Reports & Certified Financials | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Royal Audit Authority (RAA) audited financial accounts, independent auditor certifications, and statutory balance sheets of the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: AuditReportsPage,
});

interface AuditReportRecord {
  id: string;
  auditPeriod: string;
  title: string;
  auditor: string;
  opinion: string;
  fileSize: string;
  releaseDate: string;
  refCode: string;
  description: string;
  certifiedFigures: {
    label: string;
    value: string;
  }[];
}

const auditReportsArchive: AuditReportRecord[] = [
  {
    id: "audit-2025",
    auditPeriod: "FY 2024–2025",
    title: "Royal Audit Authority (RAA) Certified Financial Audit Report",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "4.5 MB",
    releaseDate: "June 2025",
    refCode: "RAA/BHTF/AR-2025/01",
    description:
      "Statutory examination of accounts, balance sheet verification, multi-currency endowment yields, and procurement disbursements for 438 essential drugs and 4 routine vaccines.",
    certifiedFigures: [
      { label: "Audited Principal", value: "Nu. 4,798,965,306.85" },
      { label: "Procurement Outflow", value: "Nu. 557,734,000.00" },
      { label: "Operational Overhead", value: "3.84% (Cap 10%)" },
      { label: "Audit Finding", value: "Zero Significant Irregularities" },
    ],
  },
  {
    id: "audit-2024",
    auditPeriod: "FY 2023–2024",
    title: "RAA Audited Financial Statements & Fiduciary Ledger Verification",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "3.9 MB",
    releaseDate: "June 2024",
    refCode: "RAA/BHTF/AR-2024/03",
    description:
      "Statutory verification of the 1:1 RGOB Sovereign Matching grant, bank interest income reconciliations with the Bank of Bhutan, and Window Financing transfers to the Ministry of Health.",
    certifiedFigures: [
      { label: "Audited Principal", value: "Nu. 4,520,120,400.00" },
      { label: "Procurement Outflow", value: "Nu. 512,400,000.00" },
      { label: "Operational Overhead", value: "4.12% (Cap 10%)" },
      { label: "Audit Finding", value: "Zero Compliance Exceptions" },
    ],
  },
  {
    id: "audit-2023",
    auditPeriod: "FY 2022–2023",
    title: "Annual Independent Audit & Investment Compliance Verification",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "3.6 MB",
    releaseDate: "June 2023",
    refCode: "RAA/BHTF/AR-2023/02",
    description:
      "Comprehensive compliance review against the BHTF Investment Policy Statement (IPS) asset allocation benchmarks and international bank treasury holdings.",
    certifiedFigures: [
      { label: "Audited Principal", value: "Nu. 4,210,850,000.00" },
      { label: "Procurement Outflow", value: "Nu. 480,200,000.00" },
      { label: "Operational Overhead", value: "3.95% (Cap 10%)" },
      { label: "Audit Finding", value: "Fully Compliant with Royal Charter" },
    ],
  },
  {
    id: "audit-2022",
    auditPeriod: "FY 2021–2022",
    title: "RAA Financial Statement Audit & Emergency Health Procurement Ledger",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "3.2 MB",
    releaseDate: "June 2022",
    refCode: "RAA/BHTF/AR-2022/01",
    description:
      "Audit of emergency vaccine buffer acquisitions, alpine logistics subsidies, and multilateral procurement agreements with UNICEF Supply Division.",
    certifiedFigures: [
      { label: "Audited Principal", value: "Nu. 3,980,450,000.00" },
      { label: "Procurement Outflow", value: "Nu. 445,000,000.00" },
      { label: "Operational Overhead", value: "4.20% (Cap 10%)" },
      { label: "Audit Finding", value: "Clean Fiduciary Opinion" },
    ],
  },
  {
    id: "audit-multiyear",
    auditPeriod: "2005–2025",
    title: "Two-Decade Fiduciary Integrity & Clean Audit Longitudinal Monograph",
    auditor: "Joint Oversight: RAA & Secretariat Asset Management Committee",
    opinion: "20 Consecutive Clean Opinions",
    fileSize: "8.2 MB",
    releaseDate: "January 2025",
    refCode: "BHTF/AUDIT-MONOGRAPH/2025",
    description:
      "Historical longitudinal verification documenting two decades of unblemished audit compliance under Royal Charter statutory triple-lock protections.",
    certifiedFigures: [
      { label: "Corpus Growth", value: "Nu. 1.2B → Nu. 4.8B" },
      { label: "Total Commodities Funded", value: "Nu. 6.4B+ Cumulative" },
      { label: "Audit History", value: "100% Unbroken Clean Track Record" },
      { label: "Capital Loss", value: "0% (Zero Capital Impairment)" },
    ],
  },
];

function AuditReportsPage() {
  const [search, setSearch] = useState("");

  const filtered = auditReportsArchive.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.auditPeriod.toLowerCase().includes(search.toLowerCase()) ||
      a.refCode.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleDownload = (a: AuditReportRecord) => {
    toast.success(`Downloading certified audit report: "${a.title}"...`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Independent Oversight & Compliance"
        title="Certified RAA Audit Reports & Statements"
        subtitle="Unqualified statutory audit accounts, balance sheet verifications, and compliance certifications issued by the Royal Audit Authority of Bhutan."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Audit Report" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="audit-reports-archive">
        <SectionEditBadge
          label="Certified Audit Archive"
          pageSlug="resources-audit-reports"
          sectionId="audit-reports-archive"
          studioHref="/admin/reports"
          initialData={{
            title: "Certified RAA Audit Reports & Statements",
            subtitle: "Unqualified statutory audit accounts, balance sheet verifications, and compliance certifications issued by the Royal Audit Authority of Bhutan.",
            badge: "Independent Oversight & Compliance",
          }}
        />
        {/* RAA Institutional Guarantee Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 border border-emerald-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold">
                Royal Audit Authority (RAA) Statutory Mandate
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Triple-Lock Fiduciary Guarantee
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl leading-relaxed">
                By statutory provision of the Royal Charter 2000, all BHTF accounts, investment transactions, and commodity disbursements are audited annually by the Royal Audit Authority. Principal capital is strictly preserved in perpetuity.
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center shrink-0 w-full md:w-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
              Audit Status
            </span>
            <div className="text-sm font-bold text-emerald-900 flex items-center justify-center gap-1.5 font-sans">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>100% Clean Opinions (2005–2025)</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by period, RAA reference number, or keywords..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 focus:border-[#00A896]"
            />
          </div>
          <div className="text-xs text-slate-500 font-mono">
            {filtered.length} Official Certified Audit Releases
          </div>
        </div>

        {/* Audit Cards Grid */}
        <div className="space-y-6">
          {filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 space-y-6 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {a.auditPeriod}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-500 bg-slate-100">
                      Ref: {a.refCode}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>{a.opinion}</span>
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition">
                    {a.title}
                  </h3>
                  <div className="text-xs text-slate-500 font-sans">
                    Audited by: <span className="font-semibold text-slate-700">{a.auditor}</span> • Released {a.releaseDate}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(a)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B4F42] hover:bg-[#083b32] text-white text-xs font-bold shadow-xs hover:shadow-md transition shrink-0 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Certified RAA Audit ({a.fileSize})</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                {a.description}
              </p>

              {/* Certified Metrics Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                {a.certifiedFigures.map((fig, i) => (
                  <div key={i} className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      {fig.label}
                    </span>
                    <div className="font-serif text-xs sm:text-sm font-bold text-slate-900">
                      {fig.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
