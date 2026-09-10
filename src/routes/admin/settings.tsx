import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getAdminSettings,
  updateAdminSetting,
} from "@/lib/api/admin.functions";
import type { SiteSetting } from "@/lib/db/schema";
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
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [{ title: "Global Site Settings & Fiduciary Config | BHTF Admin" }],
  }),
  component: AdminSettingsPage,
});

export function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [savingAll, setSavingAll] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await getAdminSettings();
      setSettings(res);
      const vals: Record<string, string> = {};
      for (const s of res) {
        vals[s.settingKey] = s.settingValue;
      }
      setFormValues(vals);
    } catch {
      toast.error("Failed to load site settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (key: string, val: string) => {
    setFormValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveField = async (key: string) => {
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
      fetchSettings();
    } catch {
      toast.error(`Failed to update ${key}.`);
    } finally {
      setSavingKey(null);
    }
  };

  const handleSaveAll = async () => {
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
      toast.success("All configuration parameters updated successfully.");
      fetchSettings();
    } catch {
      toast.error("Failed to update all settings.");
    } finally {
      setSavingAll(false);
    }
  };

  const categories = [
    {
      id: "matching",
      title: "Sovereign Matching & Institutional Policy",
      icon: Coins,
      description: "Multiplier ratio guaranteed by the Royal Government and site-wide announcement banners.",
      keys: ["matching_ratio", "announcement_banner", "announcement_banner_enabled"],
    },
    {
      id: "contact",
      title: "Emergency Helplines & Secretariat Contacts",
      icon: Phone,
      description: "Direct emergency contacts displayed in headers, footers, and the citizen contact portal.",
      keys: [
        "emergency_hotline",
        "emergency_hotline_label",
        "secretariat_phone",
        "secretariat_email",
        "secretariat_address",
      ],
    },
    {
      id: "banking",
      title: "Treasury Banking & Wire Transfer Accounts",
      icon: Landmark,
      description: "Official designated accounts for direct RTGS/SWIFT corporate wire transfers.",
      keys: ["bob_account_no", "bob_account_title", "bob_swift_code", "bnb_account_no"],
    },
  ];

  return (
    <AdminShell>
      <div className="space-y-6 sm:space-y-8 pb-12">
        {/* Header Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                System Governance
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {settings.length} Config Keys Live
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Global Site Settings & Fiduciary Hub
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Configure sovereign matching multipliers, emergency hotlines, designated banking accounts, and public portal announcements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchSettings}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-bold transition cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reload
            </button>
            <button
              type="button"
              onClick={handleSaveAll}
              disabled={savingAll}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-700/20 transition cursor-pointer disabled:opacity-50"
            >
              {savingAll ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save All Changes
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-400 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <span className="text-sm font-semibold">Loading System Configurations...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const catSettings = settings.filter((s) => cat.keys.includes(s.settingKey));

              return (
                <div
                  key={cat.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
                >
                  <div className="p-6 border-b border-slate-100 bg-slate-50/60 flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">{cat.title}</h2>
                      <p className="text-xs text-slate-500 mt-0.5">{cat.description}</p>
                    </div>
                  </div>

                  <div className="p-6 divide-y divide-slate-100">
                    {catSettings.map((s) => {
                      const isSaving = savingKey === s.settingKey;
                      const isBoolean = s.settingKey.endsWith("_enabled");

                      return (
                        <div
                          key={s.settingKey}
                          className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="sm:w-1/3">
                            <label className="text-xs font-bold text-slate-800 font-mono">
                              {s.settingKey}
                            </label>
                            {s.description && (
                              <p className="text-xs text-slate-500 mt-0.5">{s.description}</p>
                            )}
                          </div>

                          <div className="flex-1 flex items-center gap-3">
                            {isBoolean ? (
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    const next = formValues[s.settingKey] === "true" ? "false" : "true";
                                    handleChange(s.settingKey, next);
                                  }}
                                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                                    formValues[s.settingKey] === "true"
                                      ? "bg-emerald-50 border-emerald-300 text-emerald-800"
                                      : "bg-slate-100 border-slate-200 text-slate-500"
                                  }`}
                                >
                                  {formValues[s.settingKey] === "true" ? "ENABLED (Live)" : "DISABLED"}
                                </button>
                              </div>
                            ) : (
                              <input
                                type="text"
                                value={formValues[s.settingKey] || ""}
                                onChange={(e) => handleChange(s.settingKey, e.target.value)}
                                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-slate-50/50"
                              />
                            )}

                            <button
                              type="button"
                              onClick={() => handleSaveField(s.settingKey)}
                              disabled={isSaving}
                              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 text-slate-700 border border-slate-200 transition shrink-0 cursor-pointer disabled:opacity-50"
                            >
                              {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Update"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
