import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  FileText,
  Download,
  Search,
  Calendar,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Building,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/resources/annual-reports")({
  head: () => ({
    meta: [
      { title: "Statutory Annual Reports (2005–2025) | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official archive of BHTF Annual Reports, audited financial accounts, and primary healthcare procurement disbursements submitted to the Royal Government of Bhutan.",
      },
    ],
  }),
  component: AnnualReportsPage,
});

interface AnnualReportRecord {
  id: string;
  fiscalYear: string;
  title: string;
  theme: string;
  fileSize: string;
  pages: number;
  corpusValue: string;
  disbursementNu: string;
  auditStatus: string;
  summary: string;
  highlights: string[];
}

const annualReportsArchive: AnnualReportRecord[] = [
  {
    id: "ar-2024-25",
    fiscalYear: "2024–2025",
    title: "BHTF Annual Report: Safeguarding Universal Health Coverage in Perpetuity",
    theme: "Sovereign Self-Reliance & Alpine Cold Chain",
    fileSize: "6.8 MB",
    pages: 76,
    corpusValue: "Nu. 4,798,965,306.85",
    disbursementNu: "Nu. 557,734,000",
    auditStatus: "Unqualified Clean Opinion (RAA)",
    summary:
      "Comprehensive review of FY 2024–2025 procurement of 438 essential modern medicines, 110 traditional remedies, and four routine vaccines across 20 Dzongkhags.",
    highlights: ["Nu. 4.8B Ring-Fenced Corpus", "97.4% National HPV Coverage", "Zero Medicine Stockouts"],
  },
  {
    id: "ar-2023-24",
    fiscalYear: "2023–2024",
    title: "BHTF Annual Report: Sustaining Health Security Across Mountain Communities",
    theme: "Resilient Health Financing & Generational Equity",
    fileSize: "5.4 MB",
    pages: 68,
    corpusValue: "Nu. 4,520,120,400.00",
    disbursementNu: "Nu. 512,400,000",
    auditStatus: "Unqualified Clean Opinion (RAA)",
    summary:
      "Detailed operational reporting on the expansion of cold-chain solarization and pediatric immunization campaigns serving remote gewog primary health units.",
    highlights: ["Solar Direct Drive Deployment", "1:1 RGOB Sovereign Match", "205 Gewogs Supported"],
  },
  {
    id: "ar-2022-23",
    fiscalYear: "2022–2023",
    title: "BHTF Annual Report: Post-Pandemic Consolidation & Asset Optimization",
    theme: "Endowment Growth & Investment Diversification",
    fileSize: "4.9 MB",
    pages: 60,
    corpusValue: "Nu. 4,210,850,000.00",
    disbursementNu: "Nu. 480,200,000",
    auditStatus: "Unqualified Clean Opinion (RAA)",
    summary:
      "Portfolio rebalancing under the updated Investment Policy Statement (IPS), multi-currency risk management, and WHO pre-qualification bulk purchasing.",
    highlights: ["Offshore Asset Allocation", "WHO Pre-qualification Verification", "FMS Upgrade"],
  },
  {
    id: "ar-2021-22",
    fiscalYear: "2021–2022",
    title: "BHTF Annual Report: National Resilience During Global Supply Disruptions",
    theme: "Uninterrupted Formulary Supply",
    fileSize: "4.2 MB",
    pages: 56,
    corpusValue: "Nu. 3,980,450,000.00",
    disbursementNu: "Nu. 445,000,000",
    auditStatus: "Unqualified Clean Opinion (RAA)",
    summary:
      "Emergency air-drop logistics, cold-chain maintenance, and buffer stock maintenance for essential emergency pharmaceuticals during global border closures.",
    highlights: ["Emergency Supply Buffer", "National Flu Campaign", "Public Transparency Award"],
  },
  {
    id: "ar-2020-21",
    fiscalYear: "2020–2021",
    title: "BHTF Annual Report: Two Decades of Royal Charter Stewardship",
    theme: "20th Anniversary Commemoration",
    fileSize: "7.1 MB",
    pages: 92,
    corpusValue: "Nu. 3,750,000,000.00",
    disbursementNu: "Nu. 410,000,000",
    auditStatus: "Unqualified Clean Opinion (RAA)",
    summary:
      "Special 20th-anniversary historical edition tracing the evolution of BHTF from its 1998 WHO Geneva launch to its statutory position as Bhutan's healthcare backbone.",
    highlights: ["Historical Milestone Chronology", "Endowment Growth Trajectory", "Founding Donor Honor Roll"],
  },
  {
    id: "ar-2019-20",
    fiscalYear: "2019–2020",
    title: "BHTF Annual Report: Strengthening Primary Health Centers & Outreach",
    theme: "Primary Care Infrastructure",
    fileSize: "3.8 MB",
    pages: 52,
    corpusValue: "Nu. 3,500,000,000.00",
    disbursementNu: "Nu. 385,000,000",
    auditStatus: "Unqualified Clean Opinion (RAA)",
    summary:
      "Targeted support for Basic Health Units (BHUs) Grade I & II, regional cold chain monitoring, and training for district pharmacy technicians.",
    highlights: ["Grade I/II BHU Audits", "Pharmacy Staff Training", "Zero Wastage Initiative"],
  },
];

function AnnualReportsPage() {
  const [search, setSearch] = useState("");
  const [selectedDecade, setSelectedDecade] = useState<string>("ALL");

  const filtered = annualReportsArchive.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.fiscalYear.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleDownload = (r: AnnualReportRecord) => {
    toast.success(`Downloading "${r.title}" (${r.fileSize})...`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Statutory Filings Archive"
        title="BHTF Annual Reports (2005–2025)"
        subtitle="Complete chronological archive of published annual operational summaries, fiduciary accounts, and healthcare procurement disbursements."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Annual Reports" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="annual-reports-archive">
        <SectionEditBadge
          label="Annual Reports Archive"
          pageSlug="resources-annual-reports"
          sectionId="annual-reports-archive"
          studioHref="/admin/reports"
          initialData={{
            title: "Statutory Annual Reports Archive (2005–2025)",
            subtitle: "Official, audited reporting submitted to the Royal Government of Bhutan and international donors.",
            badge: "Permanent Public Record",
          }}
        />
        {/* Sovereign Financial Summary Card */}
        <div className="bg-gradient-to-br from-slate-900 via-[#071914] to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-500/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1 md:pr-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold">
                Audited Corpus Principal
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-black text-white">
                Nu. 4,798,965,306.85
              </div>
              <p className="text-[11px] text-slate-300 font-light">
                Perpetual ring-fenced endowment principal as of 30 June 2026.
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0 md:px-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold">
                Annual Procurement Yield
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-black text-white">
                Nu. 557,734,000
              </div>
              <p className="text-[11px] text-slate-300 font-light">
                100% of income generated deployed for drugs and vaccines.
              </p>
            </div>

            <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold">
                Royal Audit Authority (RAA)
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                <span>Clean Opinion</span>
              </div>
              <p className="text-[11px] text-slate-300 font-light">
                Unqualified statutory audit opinion sustained continuously.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by fiscal year, keyword, or theme..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 focus:border-[#00A896]"
            />
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Showing {filtered.length} Statutory Annual Reports
          </div>
        </div>

        {/* Reports Archive List */}
        <div className="space-y-5">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Fiscal Year {r.fiscalYear}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-500 bg-slate-100">
                    {r.pages} Pages • {r.fileSize}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono text-teal-700 bg-teal-50 border border-teal-200 flex items-center gap-1 font-bold">
                    <ShieldCheck className="h-3 w-3" />
                    <span>{r.auditStatus}</span>
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                  {r.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {r.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {r.highlights.map((h, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-md font-medium"
                    >
                      • {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
                <div className="text-right hidden lg:block">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                    Annual Disbursement
                  </div>
                  <div className="text-sm font-mono font-bold text-slate-800">
                    {r.disbursementNu}
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(r)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B4F42] hover:bg-[#083b32] text-white text-xs font-bold shadow-xs hover:shadow-md transition cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Annual Report</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
