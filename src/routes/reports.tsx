import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicReports, trackReportDownload } from "@/lib/api/public.functions";
import type { Report } from "@/lib/db/schema";
import {
  FileText,
  Download,
  Search,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowDownToLine,
  TrendingUp,
  BarChart3,
  Award,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Statutory Reports & Publications | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Download BHTF audited financial statements, annual reports, expenditure assessments, and public health impact publications.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const fetchReports = async () => {
    try {
      const res = await getPublicReports();
      setReports(res);
    } catch {
      toast.error("Failed to load publications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDownload = async (r: Report) => {
    setDownloadingId(r.id);
    try {
      await trackReportDownload({ data: { reportId: r.id } });
      toast.success(`Downloading "${r.title}"...`);
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = r.fileUrl;
        link.target = "_blank";
        link.download = `${r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
        link.click();
        setDownloadingId(null);
        fetchReports();
      }, 500);
    } catch {
      setDownloadingId(null);
    }
  };

  const categories = [
    { id: "ALL", label: "All Publications" },
    { id: "Annual Report", label: "Annual Reports" },
    { id: "Financial", label: "Audited Financials" },
    { id: "Governance", label: "Governance & Charters" },
    { id: "Research", label: "Health Impact & Research" },
    { id: "Strategy", label: "Strategic Plans" },
  ];

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.year.includes(search);
    const matchesCategory = selectedCategory === "ALL" || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <PageHero
        badge="Statutory Public Transparency"
        title="Reports & Official Publications"
        subtitle="Uncompromising fiduciary accountability, audited financial statements, and empirical public health impact assessments."
      />

      {/* Transparency Metric Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0 border border-emerald-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">100%</div>
              <div className="text-xs font-bold text-slate-500 mt-0.5">Unqualified RAA Audit Rating</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-700 grid place-items-center shrink-0 border border-amber-200">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">{reports.length}+</div>
              <div className="text-xs font-bold text-slate-500 mt-0.5">Public Official Documents</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-700 grid place-items-center shrink-0 border border-blue-200">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 font-mono">2003–2026</div>
              <div className="text-xs font-bold text-slate-500 mt-0.5">Historical Archive Indexed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Filter & Search Area */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports, years, audits..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Loading statutory repository...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <FileText className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No matching publications found</h3>
            <p className="text-xs text-slate-500">Try adjusting your keyword search or category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {r.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" /> {r.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal line-clamp-3">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="text-slate-400 font-mono text-[11px]">
                    {r.fileSize} • {r.downloadsCount} downloads
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(r)}
                    disabled={downloadingId === r.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold transition duration-150 cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
                  >
                    {downloadingId === r.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        <span>Downloading...</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}