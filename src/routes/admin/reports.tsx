import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminReports, createAdminReport, deleteAdminReport } from "@/lib/api/admin.functions";
import type { Report } from "@/lib/db/schema";
import {
  Plus,
  Search,
  FileText,
  Download,
  Trash2,
  Loader2,
  X,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Calendar,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({
  head: () => ({
    meta: [{ title: "Reports & Statutory Audits CMS | BHTF Admin" }],
  }),
  component: AdminReportsPage,
});

export function AdminReportsPage() {
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
  const [fileSize, setFileSize] = useState("2.8 MB");
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

  const openCreateModal = () => {
    setTitle("");
    setYear(new Date().getFullYear().toString());
    setCategory("Annual Report");
    setFileUrl("/documents/sample-report.pdf");
    setFileSize("2.8 MB");
    setDescription("");
    setModalOpen(true);
  };

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
      toast.success("New statutory report cataloged successfully.");
      setModalOpen(false);
      fetchReports();
    } catch {
      toast.error("Failed to catalog report.");
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

  const totalDownloads = reports.reduce((sum, r) => sum + (r.downloadCount || 0), 0);

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Statutory Transparency
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
              Reports & Audited Financials CMS
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Catalog and monitor official annual reports, Royal Audit Authority (RAA) statements, and research publications.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-extrabold rounded-2xl shadow-md transition cursor-pointer active:scale-95"
          >
            <Plus className="h-4 w-4" /> Add Statutory Report
          </button>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cataloged Publications</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {reports.length} Documents
            </div>
            <span className="text-xs font-bold text-emerald-700 block">100% Unqualified RAA Audit Rating</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Archived Span</span>
            <div className="text-2xl sm:text-3xl font-black text-amber-700 font-mono">
              2003 – 2026
            </div>
            <span className="text-xs font-medium text-slate-500 block">23 Years of Public Accountability</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Public Downloads</span>
            <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono">
              {totalDownloads} Tracked
            </div>
            <span className="text-xs font-medium text-blue-700 font-bold block">Telemetry Monitored</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 flex-1 w-full bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-200">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search reports by title, year, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="Annual Report">Annual Reports</option>
              <option value="Financial">Audited Financials</option>
              <option value="Governance">Governance & Charters</option>
              <option value="Research">Health Impact & Research</option>
              <option value="Strategy">Strategic Frameworks</option>
            </select>
          </div>
        </div>

        {/* Reports Table */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading statutory archive...</p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <FileText className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No publications found</h3>
            <p className="text-xs text-slate-500">Catalog a new report to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                    <th className="py-3.5 px-5">Document Title & Year</th>
                    <th className="py-3.5 px-5">Category</th>
                    <th className="py-3.5 px-5">File Details</th>
                    <th className="py-3.5 px-5">Downloads</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredReports.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition group">
                      <td className="py-4 px-5 space-y-1 max-w-sm sm:max-w-md">
                        <div className="font-extrabold text-slate-900 text-sm group-hover:text-emerald-700 transition leading-snug">
                          {r.title}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-slate-400" /> Year {r.year}
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <span className="font-extrabold text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {r.category}
                        </span>
                      </td>

                      <td className="py-4 px-5 font-mono text-slate-600">
                        {r.fileSize} · PDF
                      </td>

                      <td className="py-4 px-5 font-mono font-bold text-slate-800">
                        {r.downloadCount || 0} downloads
                      </td>

                      <td className="py-4 px-5 text-right space-x-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(r.id, r.title)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Report"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add Statutory Report */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                    Statutory Repository
                  </span>
                  <h3 className="text-lg font-black text-slate-900">Catalog New Official Report</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Document Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Annual Audited Financial Statements FY 2025-2026"
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs sm:text-sm font-bold focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Fiscal / Calendar Year
                    </label>
                    <input
                      type="text"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      placeholder="2026"
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      Document Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none bg-white"
                    >
                      <option value="Annual Report">Annual Report</option>
                      <option value="Financial">Audited Financials</option>
                      <option value="Governance">Governance & Charters</option>
                      <option value="Research">Health Impact & Research</option>
                      <option value="Strategy">Strategic Frameworks</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      PDF Asset URL / Path
                    </label>
                    <input
                      type="text"
                      required
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="/documents/bhtf-annual-report.pdf"
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                      File Size Display
                    </label>
                    <input
                      type="text"
                      required
                      value={fileSize}
                      onChange={(e) => setFileSize(e.target.value)}
                      placeholder="3.2 MB"
                      className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
                    Executive Summary / Abstract
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the audit conclusions and key health expenditure statistics..."
                    className="w-full rounded-2xl border border-slate-300 p-3 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t flex justify-between gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Cataloging...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" /> Catalog Report
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Cancel
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
