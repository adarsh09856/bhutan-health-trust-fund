import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { useAdminAuth } from "@/lib/admin-auth";
import {
  getAdminSettings,
  updateAdminSetting,
  getAdminFinancialSettings,
  updateAdminFinancialSettings,
  recordAdminLegalSignoff,
  getAdminPaymentGateways,
  updateAdminPaymentGateway,
  testGatewayConnection,
  purgeDemoData,
} from "@/lib/api/admin.functions";
import type { SiteSetting, FinancialSetting, PaymentGateway } from "@/lib/db/schema";
import {
  Sliders,
  Save,
  Loader2,
  Sparkles,
  ShieldCheck,
  Building2,
  Phone,
  Landmark,
  Coins,
  Bell,
  CheckCircle2,
  RefreshCw,
  Lock,
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  Scale,
  KeyRound,
  Globe2,
  Eye,
  ExternalLink,
  CreditCard,
  Trash2,
  CheckCircle,
  XCircle,
  Key,
  Terminal,
  Send,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "Global Settings Hub (Tier 1 & Tier 2) | BHTF Admin" }],
  }),
  component: AdminSettingsPage,
});

export function AdminSettingsPage() {
  const { user } = useAdminAuth();
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const [activeTab, setActiveTab] = useState<"tier1" | "tier2" | "gateways" | "hygiene">("tier1");

  // Tier 1 State
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);

  // Tier 2 State
  const [finSettings, setFinSettings] = useState<FinancialSetting | null>(null);
  const [finLoading, setFinLoading] = useState(false);

  // Tier 2 Double-Entry Edit State
  const [editingField, setEditingField] = useState<
    "bankAccountBOB" | "swiftCodeBOB" | "taxExemptionId" | null
  >(null);
  const [fieldValue1, setFieldValue1] = useState("");
  const [fieldValue2, setFieldValue2] = useState("");
  const [mutationReason, setMutationReason] = useState("");
  const [savingTier2, setSavingTier2] = useState(false);

  // Tier 2 Watermark Toggle State
  const [watermarkDialogOpen, setWatermarkDialogOpen] = useState(false);
  const [watermarkReason, setWatermarkReason] = useState("");

  // Tier 2 Legal Signoff State
  const [signoffDialogOpen, setSignoffDialogOpen] = useState(false);
  const [signoffOfficer, setSignoffOfficer] = useState("");
  const [signoffNotes, setSignoffNotes] = useState("");
  const [signoffReason, setSignoffReason] = useState("");
  const [recordingSignoff, setRecordingSignoff] = useState(false);

  // Payment Gateways State
  const [gateways, setGateways] = useState<PaymentGateway[]>([]);
  const [gatewaysLoading, setGatewaysLoading] = useState(false);
  const [testingGateway, setTestingGateway] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{
    gatewayKey: string;
    success: boolean;
    message: string;
    latencyMs: number;
  } | null>(null);

  // Edit Gateway Modal State
  const [editingGateway, setEditingGateway] = useState<PaymentGateway | null>(null);
  const [gwName, setGwName] = useState("");
  const [gwEnabled, setGwEnabled] = useState(false);
  const [gwLiveMode, setGwLiveMode] = useState(false);
  const [gwKeyId, setGwKeyId] = useState("");
  const [gwKeySecret, setGwKeySecret] = useState("");
  const [gwMerchantId, setGwMerchantId] = useState("");
  const [gwTerminalId, setGwTerminalId] = useState("");
  const [gwGatewayUrl, setGwGatewayUrl] = useState("");
  const [gwReason, setGwReason] = useState("");
  const [savingGateway, setSavingGateway] = useState(false);

  // Data Hygiene / Purge Demo Data State
  const [purgeDialogOpen, setPurgeDialogOpen] = useState(false);
  const [purgeReason, setPurgeReason] = useState("");
  const [purging, setPurging] = useState(false);

  const fetchTier1Settings = async () => {
    try {
      const res = await getAdminSettings();
      setSettings(res);
      const vals: Record<string, string> = {};
      for (const s of res) {
        vals[s.settingKey] = s.settingValue;
      }
      setFormValues(vals);
    } catch {
      toast.error("Failed to load standard site settings.");
    }
  };

  const fetchTier2Settings = async () => {
    if (!isSuperAdmin) return;
    setFinLoading(true);
    try {
      const res = await getAdminFinancialSettings();
      if (res) setFinSettings(res);
    } catch {
      toast.error("Failed to load Tier 2 restricted settings.");
    } finally {
      setFinLoading(false);
    }
  };

  const fetchGateways = async () => {
    setGatewaysLoading(true);
    try {
      const res = await getAdminPaymentGateways();
      setGateways(res);
    } catch {
      toast.error("Failed to load payment gateways.");
    } finally {
      setGatewaysLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchTier1Settings(), fetchTier2Settings(), fetchGateways()]).finally(() => {
      setLoading(false);
    });
  }, [isSuperAdmin]);

  const openEditGatewayModal = (gw: PaymentGateway) => {
    setEditingGateway(gw);
    setGwName(gw.name);
    setGwEnabled(gw.isEnabled);
    setGwLiveMode(gw.isLiveMode);
    setGwKeyId(gw.keyId || "");
    setGwKeySecret(gw.keySecret || "");
    setGwMerchantId(gw.merchantId || "");
    setGwTerminalId(gw.terminalId || "");
    setGwGatewayUrl(gw.gatewayUrl || "");
    setGwReason("");
  };

  const handleSaveGateway = async () => {
    if (!editingGateway) return;
    if (gwReason.trim().length < 10) {
      toast.error("Mandatory justification reason must be at least 10 characters.");
      return;
    }
    setSavingGateway(true);
    try {
      await updateAdminPaymentGateway({
        data: {
          gatewayKey: editingGateway.gatewayKey as any,
          name: gwName.trim() || undefined,
          isEnabled: gwEnabled,
          isLiveMode: gwLiveMode,
          keyId: gwKeyId.trim() || undefined,
          keySecret: gwKeySecret.trim() || undefined,
          merchantId: gwMerchantId.trim() || undefined,
          terminalId: gwTerminalId.trim() || undefined,
          gatewayUrl: gwGatewayUrl.trim() || undefined,
          reason: gwReason.trim(),
        },
      });
      toast.success(`Payment gateway ${editingGateway.gatewayKey} updated successfully.`);
      setEditingGateway(null);
      setGwReason("");
      setGwKeySecret("");
      fetchGateways();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update payment gateway.");
    } finally {
      setSavingGateway(false);
    }
  };

  const handleTestConnection = async (gatewayKey: "RMA_BFS" | "RAZORPAY") => {
    setTestingGateway(gatewayKey);
    setTestResult(null);
    try {
      const res = await testGatewayConnection({
        data: { gatewayKey },
      });
      setTestResult({
        gatewayKey,
        success: res.success,
        message: res.message,
        latencyMs: res.latencyMs,
      });
      if (res.success) {
        toast.success(`${gatewayKey} connection verified (${res.latencyMs}ms)!`);
      } else {
        toast.error(`${gatewayKey} test failed: ${res.message}`);
      }
    } catch (err: any) {
      const msg = err?.message || "Connection test failed.";
      setTestResult({
        gatewayKey,
        success: false,
        message: msg,
        latencyMs: 0,
      });
      toast.error(msg);
    } finally {
      setTestingGateway(null);
    }
  };

  const handlePurgeDemoData = async () => {
    if (purgeReason.trim().length < 10) {
      toast.error("Mandatory justification reason must be at least 10 characters.");
      return;
    }
    setPurging(true);
    try {
      const res = await purgeDemoData({
        data: { reason: purgeReason.trim() },
      });
      toast.success(
        `Demo data purged! Removed ${res.deletedDonations} test donations, ${res.deletedInquiries} test inquiries, and ${res.deletedSubscribers} test subscribers.`,
        { duration: 8000 },
      );
      setPurgeDialogOpen(false);
      setPurgeReason("");
    } catch (err: any) {
      toast.error(err?.message || "Failed to purge demo data.");
    } finally {
      setPurging(false);
    }
  };

  const handleChange = (key: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveTier1Field = async (key: string) => {
    const val = formValues[key];
    if (val === undefined) return;
    setSavingKey(key);
    try {
      await updateAdminSetting({
        data: {
          key,
          value: val,
        },
      });
      toast.success(`Updated "${key}" successfully.`);
      fetchTier1Settings();
    } catch {
      toast.error(`Failed to update ${key}.`);
    } finally {
      setSavingKey(null);
    }
  };

  const handleSaveAllTier1 = async () => {
    setSavingAll(true);
    try {
      for (const [key, value] of Object.entries(formValues)) {
        await updateAdminSetting({
          data: {
            key,
            value,
          },
        });
      }
      toast.success("All Tier 1 configuration parameters updated successfully.");
      fetchTier1Settings();
    } catch {
      toast.error("Failed to update all settings.");
    } finally {
      setSavingAll(false);
    }
  };

  // Tier 2: Double-Entry Save Handler
  const handleSaveTier2Field = async () => {
    if (!editingField) return;
    if (fieldValue1 !== fieldValue2) {
      toast.error("Values do not match. Re-typing verification failed.");
      return;
    }
    if (mutationReason.trim().length < 10) {
      toast.error("Mandatory justification reason must be at least 10 characters long.");
      return;
    }

    setSavingTier2(true);
    try {
      await updateAdminFinancialSettings({
        data: {
          [editingField]: fieldValue1.trim(),
          reason: mutationReason.trim(),
        },
      });
      toast.success(`Restricted parameter updated and recorded in fiduciary audit log.`);
      setEditingField(null);
      setFieldValue1("");
      setFieldValue2("");
      setMutationReason("");
      fetchTier2Settings();
    } catch (err: any) {
      toast.error(err?.message || "Failed to update restricted setting.");
    } finally {
      setSavingTier2(false);
    }
  };

  // Tier 2: Watermark Toggle Handler
  const handleToggleWatermark = async (newValidState: boolean) => {
    if (newValidState && (!finSettings?.legalSignoffBy || !finSettings?.legalSignoffAt)) {
      toast.error(
        "Statutory clearance required: You must record legal sign-off before clearing the sample watermark.",
        { duration: 6000 },
      );
      setWatermarkDialogOpen(false);
      return;
    }

    if (watermarkReason.trim().length < 10) {
      toast.error("Mandatory justification reason must be at least 10 characters.");
      return;
    }

    setSavingTier2(true);
    try {
      await updateAdminFinancialSettings({
        data: {
          taxCertificateValid: newValidState,
          reason: watermarkReason.trim(),
        },
      });
      toast.success(
        newValidState
          ? "Tax certificate validated for official use. Sample watermark removed."
          : "Tax certificate marked as sample display. Watermark reinstated.",
      );
      setWatermarkDialogOpen(false);
      setWatermarkReason("");
      fetchTier2Settings();
    } catch (err: any) {
      toast.error(err?.message || "Failed to toggle watermark status.");
    } finally {
      setSavingTier2(false);
    }
  };

  // Tier 2: Record Legal Signoff Handler
  const handleRecordSignoff = async () => {
    if (!signoffOfficer.trim()) {
      toast.error("Officer name and designation is required.");
      return;
    }
    if (signoffReason.trim().length < 10) {
      toast.error("Mandatory justification reason must be at least 10 characters.");
      return;
    }

    setRecordingSignoff(true);
    try {
      await recordAdminLegalSignoff({
        data: {
          officerName: signoffOfficer.trim(),
          notes: signoffNotes.trim() || undefined,
          reason: signoffReason.trim(),
        },
      });
      toast.success("Legal statutory sign-off recorded. Tax certificate clearance unlocked.");
      setSignoffDialogOpen(false);
      setSignoffOfficer("");
      setSignoffNotes("");
      setSignoffReason("");
      fetchTier2Settings();
    } catch (err: any) {
      toast.error(err?.message || "Failed to record legal sign-off.");
    } finally {
      setRecordingSignoff(false);
    }
  };

  const categories = [
    {
      id: "general",
      label: "General & Sovereign Branding",
      icon: Sliders,
      desc: "Primary site title, Dzongkha name, tagline, founding year, and nationwide emergency hotline.",
    },
    {
      id: "announcement",
      label: "Announcement Ribbon & Broadcast",
      icon: Bell,
      desc: "High-priority alert banner displayed across every public web page.",
    },
    {
      id: "contact",
      label: "Contact & Secretariat HQ",
      icon: Phone,
      desc: "Official telephone lines, email desks, physical headquarters address, and public visiting hours.",
    },
    {
      id: "fiduciary",
      label: "Fiduciary, Endowment & Matching",
      icon: Coins,
      desc: "Sovereign 1:1 RGOB matching parameters, capital endowment goals, and annual healthcare disbursement.",
    },
    {
      id: "pillars",
      label: "Mission & Royal Charter Pillars",
      icon: Sparkles,
      desc: "Core statutory mandate pillars, mission statement, and visionary goals commanded by Royal Charter.",
    },
    {
      id: "social",
      label: "Social Media & Public Channels",
      icon: Globe2,
      desc: "Official links to BHTF Facebook, YouTube briefings, Twitter/X, and professional LinkedIn.",
    },
  ];

  const formatKeyLabel = (key: string) => {
    return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <AdminShell>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Sliders className="h-6 w-6 text-emerald-600" />
              Settings Hub & Sovereign Control
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Tier 1 general configurations and Tier 2 restricted financial/statutory settings
              governed by Section 0B rules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                fetchTier1Settings();
                fetchTier2Settings();
              }}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            {activeTab === "tier1" && (
              <button
                type="button"
                onClick={handleSaveAllTier1}
                disabled={savingAll}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition cursor-pointer disabled:opacity-60"
              >
                {savingAll ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save All Tier 1
              </button>
            )}
          </div>
        </div>

        {/* Tier Tabs */}
        <div className="flex border-b border-slate-200 gap-4 sm:gap-6 text-xs sm:text-sm font-bold overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("tier1")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "tier1"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>Tier 1 — General CMS Settings</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
              Editor / Admin
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tier2")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "tier2"
                ? "border-amber-600 text-amber-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Lock className="h-4 w-4 text-amber-600" />
            <span>Tier 2 — Fiduciary Settings (Section 0B)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono">
              Super Admin Only
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("gateways")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "gateways"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CreditCard className="h-4 w-4 text-emerald-600" />
            <span>Payment Gateways & Fiduciary APIs</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
              RMA & Razorpay
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("hygiene")}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer shrink-0 ${
              activeTab === "hygiene"
                ? "border-rose-600 text-rose-900"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Trash2 className="h-4 w-4 text-rose-600" />
            <span>Data Hygiene & Purge</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-mono">
              Sanitize DB
            </span>
          </button>
        </div>

        {/* TAB 1: TIER 1 GENERAL SETTINGS */}
        {activeTab === "tier1" && (
          <div className="space-y-6">
            {categories.map((cat) => {
              const catSettings = settings.filter(
                (s) =>
                  s.category?.toLowerCase() === cat.id ||
                  (cat.id === "general" && (!s.category || s.category === "general")),
              );

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden"
                >
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 grid place-items-center">
                        <cat.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <h2 className="text-xs font-black uppercase tracking-wider text-slate-800">
                          {cat.label}
                        </h2>
                        <p className="text-[11px] text-slate-500">{cat.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full self-start sm:self-auto">
                      {catSettings.length} Parameters
                    </span>
                  </div>

                  {/* Announcement Live Preview Box */}
                  {cat.id === "announcement" && (
                    <div className="mx-6 mt-5 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border border-amber-300/40">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-2">
                        <Eye className="h-3.5 w-3.5 text-amber-600" />
                        <span>Real-Time Visitor Preview</span>
                      </div>
                      <div className="bg-slate-900 text-white rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] shrink-0">
                            {formValues["announcement_badge"] || "BROADCAST"}
                          </span>
                          <span className="truncate text-slate-200">
                            {formValues["announcement_banner"] ||
                              "Site-wide announcement headline..."}
                          </span>
                        </div>
                        <span className="text-[10px] text-amber-300 font-bold shrink-0">
                          {formValues["announcement_banner_enabled"] === "false"
                            ? "🔴 (HIDDEN)"
                            : "🟢 (LIVE SITEWIDE)"}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 space-y-4 divide-y divide-slate-100">
                    {catSettings.length === 0 ? (
                      <div className="py-6 text-center text-slate-400 text-xs">
                        No custom settings in this category yet. Default fallback values are active.
                      </div>
                    ) : (
                      catSettings.map((s) => {
                        const isSaving = savingKey === s.settingKey;
                        const val = formValues[s.settingKey] ?? s.settingValue;

                        return (
                          <div
                            key={s.settingKey}
                            className="pt-4 first:pt-0 grid grid-cols-1 sm:grid-cols-12 gap-4 items-start"
                          >
                            <div className="sm:col-span-4 space-y-1">
                              <label className="text-xs font-black text-slate-900">
                                {formatKeyLabel(s.settingKey)}
                              </label>
                              <div className="font-mono text-[10px] text-slate-400">
                                {s.settingKey}
                              </div>
                              {s.description && (
                                <p className="text-[11px] text-slate-500 leading-snug">
                                  {s.description}
                                </p>
                              )}
                            </div>

                            <div className="sm:col-span-8 flex items-center gap-3">
                              {s.settingKey.endsWith("_enabled") ? (
                                <select
                                  value={val}
                                  onChange={(e) => handleChange(s.settingKey, e.target.value)}
                                  className="w-full text-xs font-bold rounded-xl border border-slate-300 p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                >
                                  <option value="true">Active (Enabled Site-Wide)</option>
                                  <option value="false">Disabled (Hidden)</option>
                                </select>
                              ) : val.length > 80 ||
                                s.settingKey.includes("statement") ||
                                s.settingKey.includes("address") ||
                                s.settingKey.includes("desc") ? (
                                <textarea
                                  rows={3}
                                  value={val}
                                  onChange={(e) => handleChange(s.settingKey, e.target.value)}
                                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans"
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={val}
                                  onChange={(e) => handleChange(s.settingKey, e.target.value)}
                                  className="w-full text-xs rounded-xl border border-slate-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-sans font-medium"
                                />
                              )}

                              <button
                                type="button"
                                onClick={() => handleSaveTier1Field(s.settingKey)}
                                disabled={isSaving}
                                className="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                              >
                                {isSaving ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Save className="h-3.5 w-3.5" />
                                )}
                                <span>Save</span>
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: TIER 2 RESTRICTED SETTINGS (SECTION 0B) */}
        {activeTab === "tier2" && (
          <div className="space-y-6">
            {!isSuperAdmin ? (
              <div className="bg-rose-50 border-2 border-dashed border-rose-300 rounded-3xl p-10 text-center space-y-3">
                <ShieldAlert className="h-12 w-12 text-rose-600 mx-auto" />
                <h3 className="text-base font-black text-rose-950">HTTP 403 — Access Denied</h3>
                <p className="text-xs text-rose-800 max-w-lg mx-auto leading-relaxed">
                  Under Section 0B governance, Tier 2 restricted settings (bank routing, SWIFT
                  codes, tax exemption, and legal clearance) are strictly limited to authenticated{" "}
                  <strong>SUPER_ADMIN</strong> accounts.
                </p>
              </div>
            ) : finLoading ? (
              <div className="py-20 text-center space-y-2">
                <Loader2 className="h-8 w-8 text-amber-600 animate-spin mx-auto" />
                <p className="text-xs text-slate-500">Querying financial_settings table...</p>
              </div>
            ) : finSettings ? (
              <div className="space-y-6">
                {/* Section 0 Advisory Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-xs text-amber-900 flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-extrabold text-amber-950">
                      Section 0B Mandatory Mutation Protocol
                    </p>
                    <p className="text-amber-800 leading-relaxed text-[11px]">
                      1. Confirm-to-save double entry is enforced: you must retype the new value to
                      confirm.
                      <br />
                      2. A mandatory justification reason (min 10 characters) is required and stored
                      permanently in <strong>audit_logs</strong>.
                      <br />
                      3. The DRC tax watermark cannot be removed until statutory legal sign-off is
                      recorded.
                    </p>
                  </div>
                </div>

                {/* 1. Official Bank Routing Parameters */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-amber-600" />
                      <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        Official Treasury Banking & Routing
                      </h2>
                    </div>
                    <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
                      Double-Entry Gated
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Bank Account */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pb-4 border-b border-slate-100">
                      <div className="sm:col-span-4">
                        <span className="text-xs font-bold text-slate-800">
                          Bank of Bhutan Account No.
                        </span>
                        <p className="text-[11px] text-slate-500 font-mono">bank_account_bob</p>
                      </div>
                      <div className="sm:col-span-6 font-mono text-xs text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200 truncate">
                        {finSettings.bankAccountBOB}
                      </div>
                      <div className="sm:col-span-2 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingField("bankAccountBOB");
                            setFieldValue1("");
                            setFieldValue2("");
                            setMutationReason("");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
                        >
                          Modify...
                        </button>
                      </div>
                    </div>

                    {/* SWIFT Code */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pb-4 border-b border-slate-100">
                      <div className="sm:col-span-4">
                        <span className="text-xs font-bold text-slate-800">
                          SWIFT / BIC Routing Code
                        </span>
                        <p className="text-[11px] text-slate-500 font-mono">swift_code_bob</p>
                      </div>
                      <div className="sm:col-span-6 font-mono text-xs text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200 truncate">
                        {finSettings.swiftCodeBOB}
                      </div>
                      <div className="sm:col-span-2 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingField("swiftCodeBOB");
                            setFieldValue1("");
                            setFieldValue2("");
                            setMutationReason("");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
                        >
                          Modify...
                        </button>
                      </div>
                    </div>

                    {/* Tax Exemption ID */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-4">
                        <span className="text-xs font-bold text-slate-800">
                          DRC Tax Exemption Reference
                        </span>
                        <p className="text-[11px] text-slate-500 font-mono">tax_exemption_id</p>
                      </div>
                      <div className="sm:col-span-6 font-mono text-xs text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200 truncate">
                        {finSettings.taxExemptionId}
                      </div>
                      <div className="sm:col-span-2 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingField("taxExemptionId");
                            setFieldValue1("");
                            setFieldValue2("");
                            setMutationReason("");
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer"
                        >
                          Modify...
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. DRC Tax Exemption Legal Sign-Off & Watermark Clearance */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
                  <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Scale className="h-4 w-4 text-emerald-700" />
                      <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                        DRC Statutory Tax Clearance & Watermark Gate
                      </h2>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        finSettings.taxCertificateValid
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {finSettings.taxCertificateValid
                        ? "WATERMARK CLEARED (OFFICIAL)"
                        : "SAMPLE WATERMARK ENFORCED"}
                    </span>
                  </div>

                  <div className="p-6 space-y-4 text-xs">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Legal Statutory Sign-Off:</span>
                        {finSettings.legalSignoffBy ? (
                          <span className="text-emerald-700 font-extrabold flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approved
                          </span>
                        ) : (
                          <span className="text-rose-700 font-bold">Unsigned / Pending</span>
                        )}
                      </div>

                      {finSettings.legalSignoffBy && (
                        <div className="pt-2 border-t border-slate-200 text-slate-600 space-y-1 font-mono text-[11px]">
                          <div>
                            <strong>Authorized By:</strong> {finSettings.legalSignoffBy}
                          </div>
                          <div>
                            <strong>Sign-off Date:</strong>{" "}
                            {new Date(finSettings.legalSignoffAt!).toLocaleString("en-US")}
                          </div>
                          {finSettings.legalSignoffNotes && (
                            <div>
                              <strong>Statutory Notes:</strong> {finSettings.legalSignoffNotes}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSignoffOfficer("");
                          setSignoffNotes("");
                          setSignoffReason("");
                          setSignoffDialogOpen(true);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition cursor-pointer flex items-center gap-2"
                      >
                        <FileCheck className="h-4 w-4" />
                        <span>Record Statutory Legal Sign-Off...</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setWatermarkReason("");
                          setWatermarkDialogOpen(true);
                        }}
                        className={`px-4 py-2 rounded-xl font-bold transition cursor-pointer flex items-center gap-2 ${
                          finSettings.taxCertificateValid
                            ? "bg-rose-600 hover:bg-rose-700 text-white"
                            : "bg-emerald-600 hover:bg-emerald-700 text-white"
                        }`}
                      >
                        <KeyRound className="h-4 w-4" />
                        <span>
                          {finSettings.taxCertificateValid
                            ? "Reinstate Sample Watermark"
                            : "Clear Sample Watermark (Make Official)"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: PAYMENT GATEWAYS & FIDUCIARY APIS */}
        {activeTab === "gateways" && (
          <div className="space-y-6">
            {/* Banner */}
            <div className="bg-emerald-950 text-emerald-100 p-5 rounded-2xl border border-emerald-800/60 flex items-start gap-4">
              <CreditCard className="h-6 w-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <span>Sovereign Fiduciary Payment Gateway Hub</span>
                  <span className="bg-emerald-800/80 text-emerald-200 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase">
                    Tier 2 Security Guarded
                  </span>
                </div>
                <p className="text-emerald-200/90 leading-relaxed">
                  Configure domestic Bhutan central banking (RMA BFS) and international low-cost gateways (Razorpay). 
                  In adherence with Section 0B security directives, private secret keys are permanently masked. 
                  Mutations require Super Administrator authentication, minimum 10-character justification reasons, and are recorded to the immutable ledger.
                </p>
              </div>
            </div>

            {/* Test Connection Banner (if test ran) */}
            {testResult && (
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3 text-xs ${
                  testResult.success
                    ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                    : "bg-rose-50 border-rose-200 text-rose-900"
                }`}
              >
                {testResult.success ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0" />
                )}
                <div className="space-y-0.5">
                  <div className="font-bold">
                    Gateway Connection Test: {testResult.gatewayKey} ({testResult.latencyMs}ms)
                  </div>
                  <p>{testResult.message}</p>
                </div>
              </div>
            )}

            {/* Gateways Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: RMA Payment Gateway / BFS */}
              {(() => {
                const rma = gateways.find((g) => g.gatewayKey === "RMA_BFS") || {
                  gatewayKey: "RMA_BFS",
                  name: "RMA Payment Gateway / Bhutan Financial Switch",
                  isEnabled: true,
                  isLiveMode: false,
                  merchantId: "BHTF_RMA_MERCHANT",
                  terminalId: "BHTF_TERM_01",
                  gatewayUrl: "https://bfstest.rma.org.bt/bfsgateway",
                  keySecret: "••••••••••••",
                  currency: "BTN",
                };

                return (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 grid place-items-center font-bold">
                            <Building2 className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                              RMA BFS Gateway (Bhutan Domestic)
                            </h2>
                            <p className="text-[11px] text-slate-500">
                              Royal Monetary Authority Switch (BoB, BNB, Druk PNB, TBank, BDBL)
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              rma.isEnabled
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {rma.isEnabled ? "ENABLED" : "DISABLED"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              rma.isLiveMode
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {rma.isLiveMode ? "LIVE" : "SANDBOX"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3.5 text-xs">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              BFS Merchant ID
                            </span>
                            <span className="font-mono font-bold text-slate-800">
                              {rma.merchantId || "Not Configured"}
                            </span>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              Terminal ID
                            </span>
                            <span className="font-mono font-bold text-slate-800">
                              {rma.terminalId || "Not Configured"}
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            BFS Gateway URL
                          </span>
                          <span className="font-mono text-[11px] text-slate-700 truncate block">
                            {rma.gatewayUrl || "https://bfstest.rma.org.bt/bfsgateway"}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            HMAC-SHA256 Encryption Secret
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-slate-600">
                              {rma.keySecret || "••••••••••••"}
                            </span>
                            <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Masked
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleTestConnection("RMA_BFS")}
                        disabled={testingGateway === "RMA_BFS"}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {testingGateway === "RMA_BFS" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Zap className="h-3.5 w-3.5 text-amber-600" />
                        )}
                        <span>Test Checksum</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditGatewayModal(rma as any)}
                        disabled={!isSuperAdmin}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Key className="h-3.5 w-3.5 text-amber-400" />
                        <span>Configure RMA Gateway</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Card 2: Razorpay Regional & International */}
              {(() => {
                const rzp = gateways.find((g) => g.gatewayKey === "RAZORPAY") || {
                  gatewayKey: "RAZORPAY",
                  name: "Razorpay Regional & International Gateway",
                  isEnabled: false,
                  isLiveMode: false,
                  keyId: "",
                  keySecret: "••••••••••••",
                  currency: "BTN",
                };

                return (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 grid place-items-center font-bold">
                            <CreditCard className="h-5 w-5" />
                          </div>
                          <div>
                            <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                              Razorpay (International & Regional)
                            </h2>
                            <p className="text-[11px] text-slate-500">
                              Low-Fee Cards (Visa, Mastercard, Amex), UPI & NetBanking
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              rzp.isEnabled
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {rzp.isEnabled ? "ENABLED" : "DISABLED"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              rzp.isLiveMode
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {rzp.isLiveMode ? "LIVE" : "TEST"}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3.5 text-xs">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            Razorpay Key ID
                          </span>
                          <span className="font-mono font-bold text-slate-800">
                            {rzp.keyId || "Not Configured (e.g. rzp_test_...)"}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                            Key Secret
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-slate-600">
                              {rzp.keySecret || "••••••••••••"}
                            </span>
                            <span className="text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Masked
                            </span>
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              Operating Currency Peg
                            </span>
                            <span className="font-bold text-slate-800">
                              Bhutanese Ngultrum (BTN) / INR (1:1 Parity)
                            </span>
                          </div>
                          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[10px] px-2 py-1 rounded-lg font-bold">
                            ~2% Low NGO Rate
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => handleTestConnection("RAZORPAY")}
                        disabled={testingGateway === "RAZORPAY" || !rzp.keyId}
                        className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-white text-slate-700 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {testingGateway === "RAZORPAY" ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Zap className="h-3.5 w-3.5 text-blue-600" />
                        )}
                        <span>Ping Razorpay API</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditGatewayModal(rzp as any)}
                        disabled={!isSuperAdmin}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Key className="h-3.5 w-3.5 text-amber-400" />
                        <span>Configure Razorpay</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Card 3: Bhutan Domestic Mobile Banking QR & Accounts */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Landmark className="h-5 w-5 text-emerald-700" />
                  <div>
                    <h2 className="text-xs font-black uppercase tracking-wider text-slate-900">
                      Bhutan Mobile Banking Accounts & Remittance Verification (0% Fee)
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      Direct mBoB and BNB Pay transfers verified by Bank Journal / Remittance numbers
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("tier2")}
                  className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                >
                  Manage Bank Routing Parameters →
                </button>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Bank of Bhutan (mBoB)
                  </span>
                  <p className="font-mono font-bold text-slate-900 text-sm">
                    {finSettings?.bankAccountBOB || formValues["bob_account_no"] || "BHTF-BOB-XXXXXX"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    SWIFT: {finSettings?.swiftCodeBOB || formValues["bob_swift_code"] || "BOBTBT2X"}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Bhutan National Bank (BNB Pay)
                  </span>
                  <p className="font-mono font-bold text-slate-900 text-sm">
                    {formValues["bnb_account_no"] || "BHTF-BNB-XXXXXX"}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Thimphu Main Branch (mPay Integrated)
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-500">
                    Remittance Verification Protocol
                  </span>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    Donors input their 6+ digit Bank Journal No. on the receipt screen. Secretariat accounts desk stamps approval in <strong className="text-slate-900">Donations CRM</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DATA HYGIENE & PURGE */}
        {activeTab === "hygiene" && (
          <div className="space-y-6">
            <div className="bg-rose-950 text-rose-100 p-5 rounded-2xl border border-rose-800/60 flex items-start gap-4">
              <ShieldAlert className="h-6 w-6 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <div className="font-bold text-sm text-white flex items-center gap-2">
                  <span>Database Sanitation & Test Record Eradication</span>
                  <span className="bg-rose-800/80 text-rose-200 text-[10px] px-2 py-0.5 rounded-full font-mono uppercase">
                    Destructive Maintenance Operation
                  </span>
                </div>
                <p className="text-rose-200/90 leading-relaxed">
                  Purge all mock transaction records, test inquiries, and dummy newsletter subscriptions from the active PostgreSQL database instance. 
                  Genuine sovereign records including Board of Trustees, Royal Charter documents, Impact Metrics, Milestones, and Procurement Tenders are strictly protected and never touched.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  Target Cleanse Scope
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  The following legacy demo entries will be deleted permanently across all environments:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-rose-600" />
                    <span>Demo Donations</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside font-mono">
                    <li>BHTF-DON-928174 (Tashi Dorji)</li>
                    <li>BHTF-DON-741920 (Dechen Wangmo)</li>
                    <li>BHTF-DON-551029 (Karma Yangzom)</li>
                    <li>BHTF-DON-318492 (Well-wisher)</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-rose-600" />
                    <span>Mock Inquiries</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                    <li>Sonam Tobgay (Procurement Inquiry)</li>
                    <li>Dr. Rachel Higgins (Cold Chain IoT)</li>
                    <li>Ugyen Pelzom (Volunteer Inquiry)</li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-rose-600" />
                    <span>Mock Subscribers</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside font-mono">
                    <li>info@drukhealth.bt</li>
                    <li>sangay.c@rub.edu.bt</li>
                    <li>pema.choden@undp.org</li>
                    <li>tshering.penjor@bhtf.bt</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  ⚠️ Action is recorded in immutable <strong>audit_logs</strong> with actor email, timestamp, and mandatory justification reason.
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPurgeReason("");
                    setPurgeDialogOpen(true);
                  }}
                  disabled={!isSuperAdmin}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Purge Demo / Test Records...</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: TIER 2 DOUBLE-ENTRY CONFIRMATION */}
        {editingField && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-2 text-amber-700 font-extrabold text-sm border-b pb-3">
                <Lock className="h-4 w-4" />
                <span>Tier 2 Confirm-to-Save Double Entry</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Modifying <strong>{editingField}</strong>. Enter the new value, retype it to confirm
                identical entry, and state the mandatory justification reason.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    New Value
                  </label>
                  <input
                    type="text"
                    required
                    value={fieldValue1}
                    onChange={(e) => setFieldValue1(e.target.value)}
                    placeholder="Enter new value"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Retype New Value (Confirm)
                  </label>
                  <input
                    type="text"
                    required
                    value={fieldValue2}
                    onChange={(e) => setFieldValue2(e.target.value)}
                    placeholder="Retype to confirm"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  {fieldValue1 && fieldValue2 && fieldValue1 !== fieldValue2 && (
                    <p className="text-[11px] text-rose-600 font-bold mt-1">
                      ⚠️ Values do not match. Please recheck.
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mandatory Reason / Justification (Min 10 chars)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={mutationReason}
                    onChange={(e) => setMutationReason(e.target.value)}
                    placeholder="State the official rationale for this fiduciary change..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-slate-400">
                    Characters: {mutationReason.length} / 10 required
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingField(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveTier2Field}
                  disabled={
                    savingTier2 ||
                    !fieldValue1 ||
                    fieldValue1 !== fieldValue2 ||
                    mutationReason.trim().length < 10
                  }
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {savingTier2 ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  Save to Audit Log
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: WATERMARK TOGGLE JUSTIFICATION */}
        {watermarkDialogOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-extrabold text-sm border-b pb-3">
                <Scale className="h-4 w-4" />
                <span>Statutory Watermark State Modification</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Toggling DRC Tax Certificate validity to:{" "}
                <strong>
                  {finSettings?.taxCertificateValid ? "SAMPLE (WATERMARKED)" : "OFFICIAL (CLEAR)"}
                </strong>
                .
              </p>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mandatory Audit Reason (Min 10 chars)
                </label>
                <textarea
                  rows={3}
                  required
                  value={watermarkReason}
                  onChange={(e) => setWatermarkReason(e.target.value)}
                  placeholder="e.g. Official gazetted notification received from DRC Ministry of Finance..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setWatermarkDialogOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleWatermark(!finSettings?.taxCertificateValid)}
                  disabled={savingTier2 || watermarkReason.trim().length < 10}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {savingTier2 ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    "Confirm & Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: RECORD LEGAL SIGNOFF */}
        {signoffDialogOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm border-b pb-3">
                <FileCheck className="h-4 w-4 text-emerald-600" />
                <span>Record Legal Statutory Sign-Off</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Signatory Legal Officer Name & Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={signoffOfficer}
                    onChange={(e) => setSignoffOfficer(e.target.value)}
                    placeholder="e.g. Sonam Dorji, Legal Comptroller / DRC Director"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Statutory Notes / Reference No.
                  </label>
                  <input
                    type="text"
                    value={signoffNotes}
                    onChange={(e) => setSignoffNotes(e.target.value)}
                    placeholder="e.g. DRC/REV-NOTIF/2026/088"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mandatory Reason for Record (Min 10 chars)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={signoffReason}
                    onChange={(e) => setSignoffReason(e.target.value)}
                    placeholder="Justification for recording this legal sign-off..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setSignoffDialogOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleRecordSignoff}
                  disabled={
                    recordingSignoff || !signoffOfficer.trim() || signoffReason.trim().length < 10
                  }
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {recordingSignoff ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    "Record Sign-Off"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CONFIGURE PAYMENT GATEWAY (TIER 2) */}
        {editingGateway && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Configure Gateway: {editingGateway.name}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      {editingGateway.gatewayKey} • Section 0B Tier 2 Controlled
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingGateway(null)}
                  className="text-slate-400 hover:text-slate-600 p-1 text-sm font-bold cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Toggles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gwEnabled}
                      onChange={(e) => setGwEnabled(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block">Enable Gateway</span>
                      <span className="text-[10px] text-slate-500">Public checkout option</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={gwLiveMode}
                      onChange={(e) => setGwLiveMode(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="font-bold text-slate-800 block">Live Production</span>
                      <span className="text-[10px] text-slate-500">
                        {gwLiveMode ? "Real transactions" : "Sandbox / Test mode"}
                      </span>
                    </div>
                  </label>
                </div>

                {/* Gateway-specific Fields */}
                {editingGateway.gatewayKey === "RMA_BFS" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                          BFS Merchant ID
                        </label>
                        <input
                          type="text"
                          value={gwMerchantId}
                          onChange={(e) => setGwMerchantId(e.target.value)}
                          placeholder="e.g. BHTF_MERCHANT"
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                          BFS Terminal ID
                        </label>
                        <input
                          type="text"
                          value={gwTerminalId}
                          onChange={(e) => setGwTerminalId(e.target.value)}
                          placeholder="e.g. BHTF_TERM_01"
                          className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        BFS Gateway Endpoint URL
                      </label>
                      <input
                        type="url"
                        value={gwGatewayUrl}
                        onChange={(e) => setGwGatewayUrl(e.target.value)}
                        placeholder="https://bfstest.rma.org.bt/bfsgateway"
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        HMAC Secret / Encryption Key
                      </label>
                      <input
                        type="password"
                        value={gwKeySecret}
                        onChange={(e) => setGwKeySecret(e.target.value)}
                        placeholder="Leave unchanged or enter new BFS secret..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Secret is masked. Enter a new key to update, or leave as is to preserve existing key.
                      </p>
                    </div>
                  </div>
                )}

                {editingGateway.gatewayKey === "RAZORPAY" && (
                  <div className="space-y-3">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Razorpay Key ID
                      </label>
                      <input
                        type="text"
                        value={gwKeyId}
                        onChange={(e) => setGwKeyId(e.target.value)}
                        placeholder="e.g. rzp_test_... or rzp_live_..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Razorpay Key Secret
                      </label>
                      <input
                        type="password"
                        value={gwKeySecret}
                        onChange={(e) => setGwKeySecret(e.target.value)}
                        placeholder="Leave unchanged or enter new Key Secret..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Secret is masked. Enter a new key to update, or leave as is to preserve existing key.
                      </p>
                    </div>
                  </div>
                )}

                {/* Mandatory Audit Reason */}
                <div className="pt-2 border-t border-slate-200">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mandatory Reason for Mutation (Min 10 Characters)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={gwReason}
                    onChange={(e) => setGwReason(e.target.value)}
                    placeholder="Provide statutory operational reason for this gateway mutation..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setEditingGateway(null)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveGateway}
                  disabled={savingGateway || gwReason.trim().length < 10}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {savingGateway ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Save className="h-3.5 w-3.5 text-amber-400" />
                  )}
                  <span>Save Gateway Credentials</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: PURGE DEMO DATA CONFIRMATION */}
        {purgeDialogOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm border-b pb-3">
                <Trash2 className="h-5 w-5" />
                <span>Confirm Database Demo Data Purge</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                You are about to permanently delete all mock donations ("Tashi Dorji", "Dechen Wangmo", etc.), mock inquiries, and demo subscribers. 
                Genuine institutional programs, charter narrative, board trustees, and policies are strictly protected.
              </p>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mandatory Reason for Purge (Min 10 chars)
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={purgeReason}
                    onChange={(e) => setPurgeReason(e.target.value)}
                    placeholder="e.g. Institutional sanitation before production deployment..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setPurgeDialogOpen(false)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePurgeDemoData}
                  disabled={purging || purgeReason.trim().length < 10}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold disabled:opacity-50 cursor-pointer flex items-center gap-2"
                >
                  {purging ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  <span>Permanently Purge Demo Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
