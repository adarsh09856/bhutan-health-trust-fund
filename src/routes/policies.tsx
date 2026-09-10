import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicPolicies } from "@/lib/api/public.functions";
import type { Policy } from "@/lib/db/schema";
import { institutionalConfig } from "@/config/institutional";
import {
  ShieldCheck,
  FileText,
  Lock,
  Download,
  AlertTriangle,
  Mail,
  Phone,
  Scale,
  Award,
  Search,
  Loader2,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/policies")({
  head: () => ({
    meta: [
      { title: "Governance & Policies | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Institutional policies, procurement regulations, code of conduct, and anti-corruption safeguards of Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: PoliciesPage,
});

export function PoliciesPage() {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const fetchPolicies = async () => {
    try {
      const res = await getPublicPolicies();
      setPolicies(res || []);
    } catch {
      toast.error("Failed to load governance policies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleDownload = (policy: Policy) => {
    setDownloadingId(policy.id);
    toast.success(`Preparing official copy of ${policy.title}...`);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = policy.fileUrl || "/documents/bhtf-policy.pdf";
      link.target = "_blank";
      link.download = `${policy.slug || "bhtf-policy"}.pdf`;
      link.click();
      setDownloadingId(null);
      toast.success(`Official document downloaded successfully.`);
    }, 500);
  };

  const categories = ["ALL", ...Array.from(new Set(policies.map((p) => p.category)))];

  const filtered = policies.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.effectiveDate.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "governance":
        return Award;
      case "procurement":
        return Scale;
      case "ethics":
        return ShieldCheck;
      case "finance":
        return Lock;
      default:
        return FileText;
    }
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      <PageHero
        badge="Autonomous Fiduciary Governance"
        title="Governance, Policies & Ethics"
        subtitle="Institutional regulations, statutory anti-corruption safeguards, and quality assurance frameworks of the Bhutan Health Trust Fund."
      />

      {/* Main Content Area */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Controls */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="h-4 w-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search policies, bylaws, ethics codes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-emerald-600 focus:outline-none transition"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat === "ALL" ? "All Policies" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">Loading statutory policies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <FileText className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No matching policies found</h3>
            <p className="text-xs text-slate-500">
              {policies.length === 0
                ? "Statutory policies are currently being archived. Please check back shortly."
                : "Try adjusting your search criteria or category filter."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item) => {
              const IconComponent = getCategoryIcon(item.category);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-extrabold">
                        <IconComponent className="h-3.5 w-3.5 text-emerald-600" />
                        <span>{item.category}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" /> {item.effectiveDate}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug group-hover:text-emerald-700 transition">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-2 font-normal">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      Effective: {item.effectiveDate}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDownload(item)}
                      disabled={downloadingId === item.id}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-800 font-bold transition duration-150 cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
                    >
                      {downloadingId === item.id ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <Download className="h-3.5 w-3.5" />
                          <span>Download Instrument</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Whistleblower & Direct Reporting Box */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-rose-500/30 shadow-2xl space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
                <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                <span>Statutory Whistleblower Protection</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Confidential Reporting & Anti-Corruption Channel
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 self-start sm:self-auto">
              ACC Bhutan Harmonized
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl font-normal">
            Under the Anti-Corruption Act of the Kingdom of Bhutan and BHTF Trust Regulations, any
            citizen or contractor may confidentially report concerns regarding procurement
            irregularities, conflicts of interest, or misconduct with full legal protection.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-emerald-400" /> Confidential Ombudsman Email:
              </span>
              {/* Section 0 Institutional Config // TODO-VERIFY */}
              <a
                href={`mailto:${institutionalConfig.secretariatEmail}`}
                className="text-sm font-bold text-white hover:text-emerald-400 transition font-mono"
              >
                {institutionalConfig.secretariatEmail}
              </a>
            </div>

            <div className="bg-slate-800/90 p-4 rounded-2xl border border-slate-700/80 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-amber-400" /> Direct Secretariat Hotline:
              </span>
              {/* Section 0 Institutional Config // TODO-VERIFY */}
              <a
                href={`tel:${institutionalConfig.secretariatPhone.replace(/[^0-9+]/g, "")}`}
                className="text-sm font-bold text-white hover:text-amber-400 transition font-mono"
              >
                {institutionalConfig.secretariatPhone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
