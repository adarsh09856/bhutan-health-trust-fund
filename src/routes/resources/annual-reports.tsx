import { ManagedPublications } from "@/components/managed-publications";
import { getPublicReports } from "@/lib/api/public.functions";
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
  loader: async () => ({ managedReports: await getPublicReports().catch(() => []) }),
  head: () => ({
    meta: [
      { title: "Statutory Annual Reports (2010–2025) | Bhutan Health Trust Fund" },
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
  highlights?: string[];
  disbursementNu?: string;
}

// Official archive: https://www.bhtf.bt/?page_id=3279
const annualReportsArchive: AnnualReportRecord[] = [
  {
    "id": "ar-2023-2025",
    "fiscalYear": "2023–2025",
    "title": "Annual Report 2023–2025",
    "fileSize": "19.1 MB",
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2023–2025 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2023-2025.pdf"
  },
  {
    "id": "ar-2020-2023",
    "fiscalYear": "2020–2023",
    "title": "Annual Report 2020–2023",
    "fileSize": "18.9 MB",
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2020–2023 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2020-2023.pdf"
  },
  {
    "id": "ar-2018-2020",
    "fiscalYear": "2018–2020",
    "title": "Annual Report 2018–2020",
    "fileSize": "9.3 MB",
    "pages": 34,
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2018–2020 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2018-2020.pdf"
  },
  {
    "id": "ar-2016-2018",
    "fiscalYear": "2016–2018",
    "title": "Annual Report 2016–2018",
    "fileSize": "2.4 MB",
    "pages": 27,
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2016–2018 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2016-2018.pdf"
  },
  {
    "id": "ar-2014-2016",
    "fiscalYear": "2014–2016",
    "title": "Annual Report 2014–2016",
    "fileSize": "4.0 MB",
    "pages": 19,
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2014–2016 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2014-2016.pdf"
  },
  {
    "id": "ar-2012-2013",
    "fiscalYear": "2012–2013",
    "title": "Annual Report 2012–2013",
    "fileSize": "8.5 MB",
    "pages": 16,
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2012–2013 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2012-2013.pdf"
  },
  {
    "id": "ar-2010-2012",
    "fiscalYear": "2010–2012",
    "title": "Annual Report 2010–2012",
    "fileSize": "1.7 MB",
    "pages": 24,
    "auditStatus": "Official BHTF Publication",
    "summary": "Official Bhutan Health Trust Fund publication covering the 2010–2012 reporting period.",
    "downloadUrl": "https://www.bhtf.bt/annual-report/2010-2012.pdf"
  }
];

function AnnualReportsPage() {
  const { managedReports } = Route.useLoaderData();
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
    <div className="public-editorial-page space-y-12 sm:space-y-16 pb-20 min-h-screen">
      <PageHero
        badge="Statutory Filings Archive"
        title="BHTF Annual Reports (2010–2025)"
        subtitle="Complete chronological archive of published annual operational summaries, fiduciary accounts, and healthcare procurement disbursements."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Annual Reports" },
        ]}
      />
      <ManagedPublications reports={managedReports} categories={["Annual Report"]} />
      <p className="home-content text-sm text-slate-600">Archive source: <a href="https://www.bhtf.bt/?page_id=3279" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Bhutan Health Trust Fund</a></p>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="annual-reports-archive">
        <SectionEditBadge
          label="Annual Reports Archive"
          pageSlug="resources-annual-reports"
          sectionId="annual-reports-archive"
          studioHref="/admin/reports"
          initialData={{
            title: "Statutory Annual Reports Archive (2010–2025)",
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
        <div className="editorial-card p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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
        <div className="publication-register">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="editorial-card p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                    Reporting period {r.fiscalYear}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono text-slate-500 bg-slate-100">
                    {r.pages ? `${r.pages} Pages • ` : ""}{r.fileSize}
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
