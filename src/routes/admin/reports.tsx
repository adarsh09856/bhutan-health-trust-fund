import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminReports, createAdminReport, deleteAdminReport } from "@/lib/api/admin.functions";
import type { Report } from "@/lib/db/schema";
import { Plus, Search, FileText, Download, Trash2, Loader2, X, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [{ title: "Reports & Publications | BHTF Admin" }],
  }),
  component: AdminReportsPage,
});

function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [category, setCategory] = useState("Annual Report");
  const [fileUrl, setFileUrl] = useState("/documents/sample-report.pdf");
  const [fileSize, setFileSize] = useState("3.2 MB");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchReports = async () => {
    try {
      const res = await getAdminReports();
      setReports(res);
    } catch {
      toast.error("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminReport({
        data: {
          title,
          year,
          category,
          fileUrl,
          fileSize,
          description,
        },
      });
      toast.success("New report added to official repository.");
      setModalOpen(false);
      fetchReports();
    } catch {
      toast.error("Failed to create report.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number, reportTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${reportTitle}"?`)) return;
    try {
      await deleteAdminReport({ data: { id } });
      toast.success("Report deleted from repository.");
      fetchReports();
    } catch {
      toast.error("Failed to delete report.");
    }
  };

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.year.includes(search);
    const matchesCategory = categoryFilter === "ALL" || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reports & Publications Manager</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Upload, catalog, and monitor downloads for statutory annual reports, audited financials, and research papers.
            </p>
          </div>
          <button
            onClick={() => {
              setTitle("");
              setDescription("");
              setModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-xs transition"
          >
            <Plus className="h-4 w-4" /> Add New Report
          </button>
        </div>

        {/* Filter / Search Row */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reports by title, description, or publication year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium focus:ring-2 focus:ring-primary focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Annual Report">Annual Report</option>
            <option value="Financial">Financial</option>
            <option value="Research">Research</option>
            <option value="Governance">Governance</option>
            <option value="Assessment">Assessment</option>
            <option value="Strategy">Strategy</option>
          </select>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-sm">Loading publications...</p>
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="py-16 text-center text-slate-500 text-sm">
              No reports found in the catalog.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase font-semibold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Publication</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Year</th>
                    <th className="px-6 py-4">File Size</th>
                    <th className="px-6 py-4">Downloads</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 line-clamp-1">{r.title}</div>
                            <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{r.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {r.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono font-medium text-xs text-slate-700">
                        {r.year}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">{r.fileSize}</td>
                      <td className="px-6 py-4 text-slate-700 font-mono text-xs font-semibold">
                        {r.downloadCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={r.fileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition"
                            title="Download / View PDF"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(r.id, r.title)}
                            className="p-1.5 rounded-md hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition"
                            title="Delete Report"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Add Report Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-white">
                <h3 className="text-lg font-bold text-slate-900">Add New Report / Publication</h3>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. BHTF Audited Financial Statements 2024"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Publication Year
                    </label>
                    <input
                      type="text"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2024"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                      Classification
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    >
                      <option value="Annual Report">Annual Report</option>
                      <option value="Financial">Financial</option>
                      <option value="Research">Research</option>
                      <option value="Governance">Governance</option>
                      <option value="Assessment">Assessment</option>
                      <option value="Strategy">Strategy</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    PDF Document URL / Path
                  </label>
                  <input
                    type="text"
                    required
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="/documents/bhtf-report-2024.pdf"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                    Description / Scope
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description of report contents and audit findings..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition shadow-xs disabled:opacity-50 flex items-center gap-2"
                  >
                    {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                    Add Report
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
