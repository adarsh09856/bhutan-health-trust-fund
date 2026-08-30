import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicReports, trackReportDownload } from "@/lib/api/public.functions";
import type { Report } from "@/lib/db/schema";
import { FileText, Download, Search, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Publications | Bhutan Health Trust Fund" },
      { name: "description", content: "Download BHTF annual reports, audited financials, and public health research publications." },
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
      // Simulate file download
      setTimeout(() => {
        const link = document.createElement("a");
        link.href = r.fileUrl;
        link.target = "_blank";
        link.download = `${r.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
        link.click();
        setDownloadingId(null);
        fetchReports();
      }, 600);
    } catch {
      setDownloadingId(null);
    }
  };

  const categories = ["ALL", "Annual Report", "Financial", "Research", "Governance", "Assessment", "Strategy"];

  const filtered = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.year.includes(search);
    const matchesCategory = selectedCategory === "ALL" || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <PageHero
        title="Reports & Publications"
        subtitle="Transparency, audited accountability, and empirical impact reporting at the heart of our public mission."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 space-y-8">
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports by title, audit year, or topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === c
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "ALL" ? "All Documents" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Loading publications catalog...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 p-8">
            <p className="text-sm">No publications found matching your filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((r) => (
              <article
                key={r.id}
                className="bg-white border rounded-xl p-6 flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-secondary uppercase tracking-wide">
                      {r.category} · {r.year}
                    </div>
                    <h3 className="font-bold text-base text-primary mt-1">{r.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {r.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    PDF · {r.fileSize} · {r.downloadCount.toLocaleString()} downloads
                  </span>

                  <button
                    onClick={() => handleDownload(r)}
                    disabled={downloadingId === r.id}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/5 hover:bg-primary text-primary hover:text-white text-xs font-semibold transition"
                  >
                    {downloadingId === r.id ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Preparing...
                      </>
                    ) : (
                      <>
                        <Download className="h-3.5 w-3.5" /> Download PDF
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}