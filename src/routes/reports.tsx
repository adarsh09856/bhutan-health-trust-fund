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
      toast.success(`Downloading ${r.title}...`);
      // Simulate clean file download
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
    "ALL",
    "Annual Report",
    "Financial",
    "Research",
    "Governance",
    "Assessment",
    "Strategy",
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

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Transparency Overview Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">100% Unqualified</div>
              <p className="text-xs text-slate-500">Clean statutory audit opinions by Royal Audit Authority</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-700 grid place-items-center shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">20+ Years</div>
              <p className="text-xs text-slate-500">Unbroken public archive of annual financial reports</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-700 grid place-items-center shrink-0">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">Zero Leakage</div>
              <p className="text-xs text-slate-500">Fiduciary controls aligned with World Bank standards</p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 flex-1 w-full bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200/80">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search reports by title, audit year, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === c
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "ALL" ? "All Publications" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Publications Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-sm font-semibold">Loading official publications catalog...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm font-medium">No publications found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((r) => (
              <article
                key={r.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-emerald-300 transition duration-200 space-y-6"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-slate-900 text-emerald-400 grid place-items-center shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                        {r.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Fiscal Year {r.year}
                      </span>
                    </div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 leading-snug">
                      {r.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    PDF · {r.fileSize} · {r.downloadCount.toLocaleString()} downloads
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDownload(r)}
                    disabled={downloadingId === r.id}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition duration-150 cursor-pointer disabled:opacity-50"
                  >
                    {downloadingId === r.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing File...
                      </>
                    ) : (
                      <>
                        <ArrowDownToLine className="h-3.5 w-3.5" /> Download Document
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}