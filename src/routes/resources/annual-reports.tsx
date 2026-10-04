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
  fileSize: string;
  pages?: number;
  auditStatus: string;
  summary: string;
  downloadUrl: string;
}

const annualReportsArchive: AnnualReportRecord[] = [
  {
    id: "ar-2024-2025",
    fiscalYear: "2024–2025",
    title: "Annual Report 2024–2025",
    fileSize: "6.8 MB",
    pages: 76,
    auditStatus: "Official Publication",
    summary:
      "Comprehensive statutory operational report detailing fiduciary stewardship, healthcare commodity disbursements, and program investments across the Kingdom of Bhutan.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2026/06/BTFAnnualReport2025.pdf",
  },
  {
    id: "ar-2023-2024",
    fiscalYear: "2023–2024",
    title: "Annual Report 2023–2024",
    fileSize: "5.4 MB",
    pages: 68,
    auditStatus: "Official Publication",
    summary:
      "Statutory annual summary highlighting endowment growth, sustainable health financing, and nationwide primary care supply chain security.",
    downloadUrl: "https://bhutantrustfund.bt/BTFDemo/wordpress/wp-content/uploads/2025/08/1742810786annualReport2023-2024.pdf.pdf",
  },
  {
    id: "ar-2022-2023",
    fiscalYear: "2022–2023",
    title: "Annual Report 2022–2023",
    fileSize: "4.9 MB",
    pages: 60,
    auditStatus: "Official Publication",
    summary:
      "Operational review and audited balance sheet overview covering essential medicines procurement and trust fund asset diversification.",
    downloadUrl: "https://bhutantrustfund.bt/BTFDemo/wordpress/wp-content/uploads/2025/08/1716382873Annual-Report-BTFEC-2022-2023.pdf",
  },
  {
    id: "ar-2018-2019",
    fiscalYear: "2018–2019",
    title: "Annual Report 2018–2019",
    fileSize: "4.1 MB",
    pages: 54,
    auditStatus: "Official Publication",
    summary:
      "Annual operational filings, grant distributions, and programmatic milestones for the 2018–2019 fiscal cycle.",
    downloadUrl: "https://bhutantrustfund.bt/BTFDemo/wordpress/wp-content/uploads/2025/08/1705406276Annual-Report-2018-1.pdf",
  },
  {
    id: "ar-2017",
    fiscalYear: "2017",
    title: "Annual Report 2017",
    fileSize: "3.7 MB",
    pages: 48,
    auditStatus: "Official Publication",
    summary:
      "Review of annual endowment earnings, national immunization support, and long-term fiduciary health allocations.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705406212Annual-Report-2017.pdf",
  },
  {
    id: "ar-2001-2002",
    fiscalYear: "2001–2002",
    title: "Annual Report 2001–2002",
    fileSize: "2.8 MB",
    pages: 36,
    auditStatus: "Historical Archive",
    summary:
      "Institutional archive from early operational years of the Trust Fund documenting founding grants and endowment capitalization.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705403083AR2001-2002.pdf",
  },
  {
    id: "ar-1999-2000",
    fiscalYear: "1999–2000",
    title: "Annual Report 1999–2000",
    fileSize: "2.5 MB",
    pages: 32,
    auditStatus: "Historical Archive",
    summary:
      "Historical filings detailing initial multilateral contributions, charter mandates, and primary healthcare allocations.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705403856AR1999-2000.pdf",
  },
  {
    id: "ar-1998-2001",
    fiscalYear: "1998–2001",
    title: "Annual Report 1998–2001 (Consolidated)",
    fileSize: "3.1 MB",
    pages: 44,
    auditStatus: "Historical Archive",
    summary:
      "Triennial consolidated financial statement and governance review tracking the establishment of the perpetual fund.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705402410Annual-Report-1998-2001.pdf",
  },
  {
    id: "ar-1996-1997",
    fiscalYear: "1996–1997",
    title: "Annual Report 1996–1997",
    fileSize: "2.2 MB",
    pages: 28,
    auditStatus: "Historical Archive",
    summary:
      "Early foundational report on capital mobilization, governance meetings, and initial essential drug financing policies.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705401952Annual-Report-1996-1997.pdf",
  },
  {
    id: "ar-1994-1995",
    fiscalYear: "1994–1995",
    title: "Annual Report 1994–1995",
    fileSize: "2.0 MB",
    pages: 24,
    auditStatus: "Historical Archive",
    summary:
      "Historical documentation of early Trust Fund operations, partner commitments, and healthcare assistance programs.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705401855Annual-Report-1994-1995.pdf",
  },
  {
    id: "ar-1993-1994",
    fiscalYear: "1993–1994",
    title: "Annual Report 1993–1994",
    fileSize: "1.9 MB",
    pages: 22,
    auditStatus: "Historical Archive",
    summary:
      "Foundational report assessing initial financing models and long-term healthcare sustainability strategies for Bhutan.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705401776Annual-Report-1993-1994.pdf",
  },
  {
    id: "ar-1992-1993",
    fiscalYear: "1992–1993",
    title: "Annual Report 1992–1993",
    fileSize: "1.8 MB",
    pages: 20,
    auditStatus: "Historical Archive",
    summary:
      "Inaugural Trust Fund annual report capturing the inception vision, charter ratification, and earliest endowment contributions.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/1705401650Annual-Report-1992-1993.pdf",
  },
];

function AnnualReportsPage() {
  const [search, setSearch] = useState("");

  const filtered = annualReportsArchive.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.fiscalYear.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  const handleDownload = (r: AnnualReportRecord) => {
    toast.success(`Opening "${r.title}" (${r.fileSize})...`);
    window.open(r.downloadUrl, "_blank");
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

                {r.highlights && r.highlights.length > 0 && (
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
                )}
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0 w-full sm:w-auto">
                {r.disbursementNu && (
                  <div className="text-right hidden lg:block">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">
                      Annual Disbursement
                    </div>
                    <div className="text-sm font-mono font-bold text-slate-800">
                      {r.disbursementNu}
                    </div>
                  </div>
                )}

                <a
                  href={r.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B4F42] hover:bg-[#083b32] text-white text-xs font-bold shadow-xs hover:shadow-md transition cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Annual Report</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
