import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  FileCheck2,
  Download,
  Search,
  CheckCircle2,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/resources/financial-reports")({
  head: () => ({
    meta: [
      { title: "Financial Reports & Statutory Audits | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Royal Audit Authority (RAA) audited financial accounts, independent auditor certifications, and statutory balance sheets of the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: FinancialReportsPage,
});

interface FinancialReportRecord {
  id: string;
  auditPeriod: string;
  title: string;
  auditor: string;
  opinion: string;
  fileSize: string;
  releaseDate: string;
  refCode: string;
  description: string;
  downloadUrl: string;
  isFromOldSite?: boolean;
}

const financialReportsArchive: FinancialReportRecord[] = [
  {
    id: "audit-2022-2023",
    auditPeriod: "FY 2022–2023",
    title: "Audit Report for FY 2022-2023",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "3.8 MB",
    releaseDate: "August 2023",
    refCode: "RAA/BHTF/AR-2023",
    description: "Statutory audited financial statements and fund utilization accounts for Financial Year 2022-2023 certified by the Royal Audit Authority.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/Audit-Report-FY-2022-2023.pdf",
    isFromOldSite: true,
  },
  {
    id: "audit-2021-2022",
    auditPeriod: "FY 2021–2022",
    title: "Audit Report for FY 2021-2022",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "3.2 MB",
    releaseDate: "August 2022",
    refCode: "RAA/BHTF/AR-2022",
    description: "Statutory audit report and financial compliance review for FY 2021-2022 issued under RAA governance framework.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/Audit-Report-FY2021-2022.pdf",
    isFromOldSite: true,
  },
  {
    id: "audit-2020-2021",
    auditPeriod: "FY 2020–2021",
    title: "Audit Report for FY 2020-2021",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "2.9 MB",
    releaseDate: "August 2021",
    refCode: "RAA/BHTF/AR-2021",
    description: "Statutory financial audit of BHTF operations and commodity accounts during pandemic response period.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/Audit-report-FY-2020-21.pdf",
    isFromOldSite: true,
  },
  {
    id: "audit-2019-2020",
    auditPeriod: "FY 2019–2020",
    title: "Audit Report for FY 2019-2020",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "2.7 MB",
    releaseDate: "August 2020",
    refCode: "RAA/BHTF/AR-2020",
    description: "Annual financial examination, balance sheet certification, and statutory endowment yield audits.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/Audit-Report-for-Fy-2019-2020.pdf",
    isFromOldSite: true,
  },
  {
    id: "audit-2018-2019",
    auditPeriod: "FY 2018–2019",
    title: "Audit Report for FY 2018-2019",
    auditor: "Royal Audit Authority, Royal Government of Bhutan",
    opinion: "Unqualified Clean Opinion",
    fileSize: "2.5 MB",
    releaseDate: "August 2019",
    refCode: "RAA/BHTF/AR-2019",
    description: "Statutory financial audit and endowment account verification conducted by the Royal Audit Authority.",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/08/Audit-Report-FY18-191.pdf",
    isFromOldSite: true,
  },
];

function FinancialReportsPage() {
  const [search, setSearch] = useState("");

  const filtered = financialReportsArchive.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.title.toLowerCase().includes(q) ||
      r.auditPeriod.toLowerCase().includes(q) ||
      r.auditor.toLowerCase().includes(q)
    );
  });

  const handleDownload = (report: FinancialReportRecord) => {
    toast.success(`Opening "${report.title}"...`);
    window.open(report.downloadUrl, "_blank");
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Official Financial Repository"
        title="Financial Reports & Statutory Audits"
        subtitle="Access independent statutory financial audits certified by the Royal Audit Authority (RAA) of Bhutan, preserving complete fiduciary transparency across all fiscal cycles."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Financial Reports" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="financial-reports-register">
        <SectionEditBadge
          label="Financial Reports Archive"
          pageSlug="resources-financial-reports"
          sectionId="financial-reports-register"
          studioHref="/admin/reports"
          initialData={{
            title: "Financial Reports & Statutory Audits",
            subtitle: "Access independent statutory financial audits certified by the Royal Audit Authority (RAA) of Bhutan.",
            badge: "Official Financial Repository",
          }}
        />

        {/* Search Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search financial audit reports..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 focus:border-[#00A896]"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filtered.length}</strong> official financial audits
          </div>
        </div>

        {/* Audit Report List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {report.auditPeriod}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> {report.releaseDate}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {report.description}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Auditor:</span>
                    <span className="font-bold text-slate-800">{report.auditor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Audit Opinion:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> {report.opinion}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Reference Code:</span>
                    <span className="font-mono text-slate-700 font-semibold">{report.refCode}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-400">{report.fileSize} • PDF Document</span>
                <a
                  href={report.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#0B4F42] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Audit PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
