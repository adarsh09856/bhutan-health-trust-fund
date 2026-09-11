import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminProcurementSteps,
  createAdminProcurementStep,
  updateAdminProcurementStep,
  deleteAdminProcurementStep,
  getAdminProcurementTenders,
  createAdminProcurementTender,
  updateAdminProcurementTender,
  deleteAdminProcurementTender,
} from "@/lib/api/admin.functions";
import type { ProcurementStep, ProcurementTender } from "@/lib/db/schema";
import {
  Scale,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  X,
  Layers,
  RefreshCw,
  FileText,
  Calendar,
  Download,
  Search,
  Filter,
  Clock,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/procurement")({
  head: () => ({
    meta: [{ title: "Procurement Tenders & Lifecycle CMS | BHTF Admin" }],
  }),
  component: AdminProcurementPage,
});

const tenderCategories = [
  "ALL",
  "Essential Drugs",
  "Vaccines",
  "Cold Chain",
  "Diagnostics",
  "Medical Devices",
];

export function AdminProcurementPage() {
  const [activeTab, setActiveTab] = useState<"tenders" | "steps">("tenders");

  // --- Tenders State ---
  const [tenders, setTenders] = useState<ProcurementTender[]>([]);
  const [loadingTenders, setLoadingTenders] = useState(true);
  const [tenderSearch, setTenderSearch] = useState("");
  const [tenderCatFilter, setTenderCatFilter] = useState("ALL");
  const [tenderStatusFilter, setTenderStatusFilter] = useState("ALL");
  const [tenderModalOpen, setTenderModalOpen] = useState(false);
  const [editingTenderId, setEditingTenderId] = useState<number | null>(null);

  // Tender Form State
  const [tenderNo, setTenderNo] = useState("");
  const [tenderTitle, setTenderTitle] = useState("");
  const [tenderCategory, setTenderCategory] = useState("Essential Drugs");
  const [tenderStatus, setTenderStatus] = useState<"OPEN" | "EVALUATING" | "AWARDED" | "CLOSED">(
    "OPEN",
  );
  const [tenderClosingDate, setTenderClosingDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [tenderDocUrl, setTenderDocUrl] = useState("");
  const [tenderDocSize, setTenderDocSize] = useState("2.4 MB");
  const [tenderDesc, setTenderDesc] = useState("");
  const [savingTender, setSavingTender] = useState(false);

  // --- Lifecycle Steps State ---
  const [steps, setSteps] = useState<ProcurementStep[]>([]);
  const [loadingSteps, setLoadingSteps] = useState(true);
  const [showCreateStepModal, setShowCreateStepModal] = useState(false);
  const [editStep, setEditStep] = useState<ProcurementStep | null>(null);
  const [stepFormData, setStepFormData] = useState({
    stepNumber: "01",
    title: "",
    description: "",
    orderIndex: 0,
    isActive: true,
  });
  const [processingStep, setProcessingStep] = useState(false);

  const fetchTenders = async () => {
    try {
      setLoadingTenders(true);
      const res = await getAdminProcurementTenders();
      setTenders(res || []);
    } catch {
      toast.error("Failed to load procurement tenders.");
    } finally {
      setLoadingTenders(false);
    }
  };

  const fetchSteps = async () => {
    try {
      setLoadingSteps(true);
      const res = await getAdminProcurementSteps();
      setSteps(res || []);
    } catch {
      toast.error("Failed to load procurement lifecycle steps.");
    } finally {
      setLoadingSteps(false);
    }
  };

  useEffect(() => {
    fetchTenders();
    fetchSteps();
  }, []);

  // --- Tender Handlers ---
  const openCreateTenderModal = () => {
    setEditingTenderId(null);
    setTenderNo(`BHTF/TEND-${new Date().getFullYear()}/00${tenders.length + 1}`);
    setTenderTitle("");
    setTenderCategory("Essential Drugs");
    setTenderStatus("OPEN");
    setTenderClosingDate(
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    );
    setTenderDocUrl("");
    setTenderDocSize("2.4 MB");
    setTenderDesc("");
    setTenderModalOpen(true);
  };

  const openEditTenderModal = (t: ProcurementTender) => {
    setEditingTenderId(t.id);
    setTenderNo(t.tenderNo);
    setTenderTitle(t.title);
    setTenderCategory(t.category);
    setTenderStatus(t.status as any);
    setTenderClosingDate(new Date(t.closingDate).toISOString().split("T")[0]);
    setTenderDocUrl(t.documentUrl);
    setTenderDocSize(t.documentSize);
    setTenderDesc(t.description || "");
    setTenderModalOpen(true);
  };

  const handleSaveTender = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenderNo.trim() || !tenderTitle.trim() || !tenderDocUrl.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSavingTender(true);
    try {
      if (editingTenderId) {
        await updateAdminProcurementTender({
          data: {
            id: editingTenderId,
            tenderNo: tenderNo.trim(),
            title: tenderTitle.trim(),
            category: tenderCategory,
            status: tenderStatus,
            closingDate: new Date(tenderClosingDate),
            documentUrl: tenderDocUrl.trim(),
            documentSize: tenderDocSize.trim(),
            description: tenderDesc.trim() || undefined,
          },
        });
        toast.success("Procurement tender updated successfully.");
      } else {
        await createAdminProcurementTender({
          data: {
            tenderNo: tenderNo.trim(),
            title: tenderTitle.trim(),
            category: tenderCategory,
            status: tenderStatus,
            closingDate: new Date(tenderClosingDate),
            documentUrl: tenderDocUrl.trim(),
            documentSize: tenderDocSize.trim(),
            description: tenderDesc.trim() || undefined,
          },
        });
        toast.success("New procurement tender published.");
      }
      setTenderModalOpen(false);
      fetchTenders();
    } catch (err: any) {
      toast.error(err?.message || "Failed to save tender.");
    } finally {
      setSavingTender(false);
    }
  };

  const handleDeleteTender = async (id: number, tNo: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete tender ${tNo}?`)) return;
    try {
      await deleteAdminProcurementTender({ data: { id } });
      toast.success(`Tender ${tNo} deleted.`);
      fetchTenders();
    } catch {
      toast.error("Failed to delete tender.");
    }
  };

  // --- Step Handlers ---
  const handleCreateStep = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingStep(true);
    try {
      await createAdminProcurementStep({
        data: {
          stepNumber: stepFormData.stepNumber.trim(),
          title: stepFormData.title.trim(),
          description: stepFormData.description.trim(),
          orderIndex: Number(stepFormData.orderIndex),
          isActive: stepFormData.isActive,
        },
      });
      toast.success("Procurement step created.");
      setShowCreateStepModal(false);
      setStepFormData({
        stepNumber: "01",
        title: "",
        description: "",
        orderIndex: 0,
        isActive: true,
      });
      fetchSteps();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create step.");
    } finally {
      setProcessingStep(false);
    }
  };

  const handleUpdateStep = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStep) return;
    setProcessingStep(true);
    try {
      await updateAdminProcurementStep({
        data: {
          id: editStep.id,
          stepNumber: stepFormData.stepNumber.trim(),
          title: stepFormData.title.trim(),
          description: stepFormData.description.trim(),
          orderIndex: Number(stepFormData.orderIndex),
          isActive: stepFormData.isActive,
        },
      });
      toast.success("Procurement step updated.");
      setEditStep(null);
      fetchSteps();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update step.");
    } finally {
      setProcessingStep(false);
    }
  };

  const handleDeleteStep = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this procurement step?")) return;
    try {
      await deleteAdminProcurementStep({ data: { id } });
      toast.success("Procurement step removed.");
      fetchSteps();
    } catch {
      toast.error("Failed to delete step.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-50 text-emerald-800 border-emerald-200 font-black";
      case "EVALUATING":
        return "bg-amber-50 text-amber-800 border-amber-200 font-bold";
      case "AWARDED":
        return "bg-blue-50 text-blue-800 border-blue-200 font-bold";
      case "CLOSED":
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 font-bold";
    }
  };

  const filteredTenders = tenders.filter((t) => {
    const matchesSearch =
      t.tenderNo.toLowerCase().includes(tenderSearch.toLowerCase()) ||
      t.title.toLowerCase().includes(tenderSearch.toLowerCase());
    const matchesCat = tenderCatFilter === "ALL" || t.category === tenderCatFilter;
    const matchesStatus = tenderStatusFilter === "ALL" || t.status === tenderStatusFilter;
    return matchesSearch && matchesCat && matchesStatus;
  });

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider">
                Supply Chain CMS
              </span>
              <span className="text-xs font-mono text-emerald-700 font-bold">
                DRA & WHO Prequalified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Procurement Tenders & Lifecycle CMS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage international competitive bidding, medicine tenders, RFPs, and statutory
              procurement milestone stages.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                fetchTenders();
                fetchSteps();
              }}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              title="Refresh Data"
            >
              <RefreshCw className="h-4 w-4" />
            </button>

            {activeTab === "tenders" ? (
              <button
                type="button"
                onClick={openCreateTenderModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Publish Tender / RFP</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStepFormData({
                    stepNumber: `0${steps.length + 1}`,
                    title: "",
                    description: "",
                    orderIndex: steps.length + 1,
                    isActive: true,
                  });
                  setShowCreateStepModal(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>Add Lifecycle Step</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
          <button
            type="button"
            onClick={() => setActiveTab("tenders")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "tenders"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Active Tenders & RFPs ({tenders.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("steps")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === "steps"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Procurement Lifecycle Steps ({steps.length})</span>
          </button>
        </div>

        {/* TAB 1: TENDERS & RFPS */}
        {activeTab === "tenders" ? (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={tenderSearch}
                  onChange={(e) => setTenderSearch(e.target.value)}
                  placeholder="Search tender reference, title..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-600 focus:outline-none transition"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <select
                  value={tenderCatFilter}
                  onChange={(e) => setTenderCatFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none"
                >
                  {tenderCategories.map((c) => (
                    <option key={c} value={c}>
                      Category: {c}
                    </option>
                  ))}
                </select>

                <select
                  value={tenderStatusFilter}
                  onChange={(e) => setTenderStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none"
                >
                  <option value="ALL">Status: All</option>
                  <option value="OPEN">Open</option>
                  <option value="EVALUATING">Evaluating</option>
                  <option value="AWARDED">Awarded</option>
                  <option value="CLOSED">Closed</option>
                </select>
              </div>
            </div>

            {/* Tenders Table */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
              {loadingTenders ? (
                <div className="py-20 text-center space-y-3">
                  <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-500">
                    Querying procurement_tenders table...
                  </p>
                </div>
              ) : filteredTenders.length === 0 ? (
                <div className="p-12 text-center space-y-2">
                  <Scale className="h-10 w-10 text-slate-400 mx-auto" />
                  <h3 className="font-bold text-slate-800 text-sm">
                    No procurement tenders match filter
                  </h3>
                  <p className="text-xs text-slate-500">
                    Click "Publish Tender / RFP" to initiate a new international bidding round.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-extrabold uppercase tracking-wider">
                        <th className="py-3.5 px-6">Tender No.</th>
                        <th className="py-3.5 px-4">Title & Details</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Closing Date</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4">Bidding Doc</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTenders.map((t) => (
                        <tr key={t.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-4 px-6 font-mono font-bold text-slate-900 whitespace-nowrap">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                              {t.tenderNo}
                            </span>
                          </td>

                          <td className="py-4 px-4 max-w-md">
                            <div className="font-extrabold text-slate-900 line-clamp-2">
                              {t.title}
                            </div>
                            {t.description && (
                              <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                {t.description}
                              </div>
                            )}
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-xs font-bold text-slate-700">{t.category}</span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-slate-600">
                            {new Date(t.closingDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider border ${getStatusBadge(
                                t.status,
                              )}`}
                            >
                              {t.status}
                            </span>
                          </td>

                          <td className="py-4 px-4 whitespace-nowrap">
                            <a
                              href={t.documentUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:underline"
                            >
                              <Download className="h-3 w-3" />
                              <span>{t.documentSize}</span>
                            </a>
                          </td>

                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditTenderModal(t)}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-emerald-700 transition cursor-pointer"
                                title="Edit Tender"
                              >
                                <Edit2 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteTender(t.id, t.tenderNo)}
                                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                                title="Delete Tender"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
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
          </div>
        ) : (
          /* TAB 2: LIFECYCLE STEPS */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loadingSteps ? (
                <div className="col-span-full py-12 text-center text-slate-400">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-emerald-600" />
                </div>
              ) : steps.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400">
                  No procurement lifecycle steps defined.
                </div>
              ) : (
                steps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white font-mono text-xs font-black">
                          Step {step.stepNumber}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] text-slate-400 font-bold">
                            Order #{step.orderIndex}
                          </span>
                          {step.isActive ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> Live
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold border border-slate-200 flex items-center gap-1">
                              <XCircle className="h-3 w-3" /> Draft
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditStep(step);
                          setStepFormData({
                            stepNumber: step.stepNumber,
                            title: step.title,
                            description: step.description,
                            orderIndex: step.orderIndex,
                            isActive: step.isActive,
                          });
                        }}
                        className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                        title="Edit Step"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteStep(step.id)}
                        className="p-2 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                        title="Delete Step"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Modal: Create / Edit Tender */}
        {tenderModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 grid place-items-center">
                    <Scale className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900">
                      {editingTenderId ? "Edit Procurement Tender" : "Publish Procurement Tender"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Publish official international competitive bidding notices
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTenderModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSaveTender} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Tender Reference No. *</label>
                    <input
                      type="text"
                      required
                      value={tenderNo}
                      onChange={(e) => setTenderNo(e.target.value)}
                      placeholder="e.g. BHTF/TEND-2025/001"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono font-bold focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Category</label>
                    <select
                      value={tenderCategory}
                      onChange={(e) => setTenderCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Essential Drugs">Essential Drugs</option>
                      <option value="Vaccines">Vaccines</option>
                      <option value="Cold Chain">Cold Chain</option>
                      <option value="Diagnostics">Diagnostics</option>
                      <option value="Medical Devices">Medical Devices</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Tender Title / Scope *</label>
                  <input
                    type="text"
                    required
                    value={tenderTitle}
                    onChange={(e) => setTenderTitle(e.target.value)}
                    placeholder="e.g. Supply of 124 National Essential Drugs List (NEDL) Commodities"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-semibold focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Status</label>
                    <select
                      value={tenderStatus}
                      onChange={(e) => setTenderStatus(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white font-bold focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="OPEN">OPEN (Accepting Bids)</option>
                      <option value="EVALUATING">EVALUATING (Technical Review)</option>
                      <option value="AWARDED">AWARDED (Contract Issued)</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Submission Deadline *</label>
                    <input
                      type="date"
                      required
                      value={tenderClosingDate}
                      onChange={(e) => setTenderClosingDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-1">
                    <label className="font-bold text-slate-700 block">
                      Bidding Document PDF URL *
                    </label>
                    <input
                      type="text"
                      required
                      value={tenderDocUrl}
                      onChange={(e) => setTenderDocUrl(e.target.value)}
                      placeholder="/documents/sample-report.pdf"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">File Size</label>
                    <input
                      type="text"
                      value={tenderDocSize}
                      onChange={(e) => setTenderDocSize(e.target.value)}
                      placeholder="2.4 MB"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">
                    Scope Notes & Prequalification Criteria
                  </label>
                  <textarea
                    rows={3}
                    value={tenderDesc}
                    onChange={(e) => setTenderDesc(e.target.value)}
                    placeholder="Provide details on GMP accreditation, ISO standards, and submission guidelines..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setTenderModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingTender}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {savingTender ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Scale className="h-3.5 w-3.5" />
                    )}
                    <span>{editingTenderId ? "Update Tender" : "Publish Tender"}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Create Step */}
        {showCreateStepModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-black text-lg text-slate-900">
                  Add Procurement Lifecycle Step
                </h3>
                <button
                  type="button"
                  onClick={() => setShowCreateStepModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreateStep} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Step Number</label>
                    <input
                      type="text"
                      required
                      value={stepFormData.stepNumber}
                      onChange={(e) =>
                        setStepFormData({ ...stepFormData, stepNumber: e.target.value })
                      }
                      placeholder="e.g. 01"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Order Index</label>
                    <input
                      type="number"
                      required
                      value={stepFormData.orderIndex}
                      onChange={(e) =>
                        setStepFormData({ ...stepFormData, orderIndex: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Step Title</label>
                  <input
                    type="text"
                    required
                    value={stepFormData.title}
                    onChange={(e) => setStepFormData({ ...stepFormData, title: e.target.value })}
                    placeholder="e.g. Quality Batch Testing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={stepFormData.description}
                    onChange={(e) =>
                      setStepFormData({ ...stepFormData, description: e.target.value })
                    }
                    placeholder="Describe the activities performed during this stage..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateStepModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processingStep}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {processingStep ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                    <span>Create Step</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Step */}
        {editStep && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-black text-lg text-slate-900">Edit Procurement Step</h3>
                <button
                  type="button"
                  onClick={() => setEditStep(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateStep} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Step Number</label>
                    <input
                      type="text"
                      required
                      value={stepFormData.stepNumber}
                      onChange={(e) =>
                        setStepFormData({ ...stepFormData, stepNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-bold focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Order Index</label>
                    <input
                      type="number"
                      required
                      value={stepFormData.orderIndex}
                      onChange={(e) =>
                        setStepFormData({ ...stepFormData, orderIndex: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Step Title</label>
                  <input
                    type="text"
                    required
                    value={stepFormData.title}
                    onChange={(e) => setStepFormData({ ...stepFormData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={stepFormData.description}
                    onChange={(e) =>
                      setStepFormData({ ...stepFormData, description: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditStep(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processingStep}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    {processingStep ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
                    <span>Save Changes</span>
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
