import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminProcurementSteps,
  createAdminProcurementStep,
  updateAdminProcurementStep,
  deleteAdminProcurementStep,
} from "@/lib/api/admin.functions";
import type { ProcurementStep } from "@/lib/db/schema";
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
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/procurement")({
  head: () => ({
    meta: [{ title: "Procurement Lifecycle CMS | BHTF Admin" }],
  }),
  component: AdminProcurementPage,
});

export function AdminProcurementPage() {
  const [steps, setSteps] = useState<ProcurementStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editStep, setEditStep] = useState<ProcurementStep | null>(null);

  const [formData, setFormData] = useState({
    stepNumber: "01",
    title: "",
    description: "",
    orderIndex: 0,
    isActive: true,
  });

  const [processing, setProcessing] = useState(false);

  const fetchSteps = async () => {
    try {
      const res = await getAdminProcurementSteps();
      setSteps(res || []);
    } catch {
      toast.error("Failed to load procurement lifecycle steps.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSteps();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    try {
      await createAdminProcurementStep({
        data: {
          stepNumber: formData.stepNumber.trim(),
          title: formData.title.trim(),
          description: formData.description.trim(),
          orderIndex: Number(formData.orderIndex),
          isActive: formData.isActive,
        },
      });
      toast.success("Procurement step created successfully.");
      setShowCreateModal(false);
      setFormData({ stepNumber: "01", title: "", description: "", orderIndex: 0, isActive: true });
      fetchSteps();
    } catch (err: any) {
      toast.error(err?.message || "Failed to create procurement step.");
    } finally {
      setProcessing(false);
    }
  };

  const handleOpenEdit = (step: ProcurementStep) => {
    setEditStep(step);
    setFormData({
      stepNumber: step.stepNumber,
      title: step.title,
      description: step.description,
      orderIndex: step.orderIndex,
      isActive: step.isActive,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editStep) return;
    setProcessing(true);
    try {
      await updateAdminProcurementStep({
        data: {
          id: editStep.id,
          stepNumber: formData.stepNumber.trim(),
          title: formData.title.trim(),
          description: formData.description.trim(),
          orderIndex: Number(formData.orderIndex),
          isActive: formData.isActive,
        },
      });
      toast.success("Procurement step updated successfully.");
      setEditStep(null);
      fetchSteps();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update procurement step.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this procurement step?")) return;
    try {
      await deleteAdminProcurementStep({ data: { id } });
      toast.success("Procurement step deleted.");
      fetchSteps();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete step.");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-wider">
                Public Control
              </span>
              <span className="text-xs font-mono text-slate-400">Our Work Page Component</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Procurement Lifecycle CMS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Control the four-stage sovereign medicine and vaccine procurement cycle rendered on
              the public Our Programs page.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchSteps}
              className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
              title="Refresh Steps"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Procurement Step</span>
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-2 py-20 text-center space-y-3">
              <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">
                Querying procurement_steps table...
              </p>
            </div>
          ) : steps.length === 0 ? (
            <div className="col-span-2 bg-slate-50 border border-dashed border-slate-300 rounded-3xl p-12 text-center space-y-2">
              <Scale className="h-10 w-10 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No procurement steps defined</h3>
            </div>
          ) : (
            steps.map((step) => (
              <div
                key={step.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="h-9 w-9 rounded-xl bg-emerald-600 text-white font-black text-sm grid place-items-center shadow-xs">
                      {step.stepNumber}
                    </div>
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
                    onClick={() => handleOpenEdit(step)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition cursor-pointer"
                    title="Edit Step"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(step.id)}
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

        {/* Modal: Create Step */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="font-black text-lg text-slate-900">Add Procurement Step</h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Step Number</label>
                    <input
                      type="text"
                      required
                      value={formData.stepNumber}
                      onChange={(e) => setFormData({ ...formData, stepNumber: e.target.value })}
                      placeholder="e.g. 01"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Order Index</label>
                    <input
                      type="number"
                      required
                      value={formData.orderIndex}
                      onChange={(e) =>
                        setFormData({ ...formData, orderIndex: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Step Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Quality Batch Testing"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe this procurement milestone..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActiveCreate"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="isActiveCreate"
                    className="text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    Live on public site
                  </label>
                </div>

                <div className="pt-4 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>Save Step</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Edit Step */}
        {editStep && (
          <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
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

              <form onSubmit={handleUpdate} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Step Number</label>
                    <input
                      type="text"
                      required
                      value={formData.stepNumber}
                      onChange={(e) => setFormData({ ...formData, stepNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700 block">Order Index</label>
                    <input
                      type="number"
                      required
                      value={formData.orderIndex}
                      onChange={(e) =>
                        setFormData({ ...formData, orderIndex: Number(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Step Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 block">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:outline-none leading-relaxed"
                  />
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActiveEdit"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="isActiveEdit"
                    className="text-xs font-bold text-slate-700 cursor-pointer"
                  >
                    Live on public site
                  </label>
                </div>

                <div className="pt-4 border-t flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setEditStep(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {processing && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    <span>Update Step</span>
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
