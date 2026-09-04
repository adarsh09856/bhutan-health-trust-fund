import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getDashboardAnalytics, updateDonationStatus, updateInquiryStatus } from "@/lib/api/admin.functions";
import {
  Coins,
  Mail,
  Newspaper,
  Users,
  TrendingUp,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  Loader2,
  RefreshCw,
  ShieldCheck,
  HeartHandshake,
  Activity,
  FileText,
  Building2,
  Sparkles,
  ArrowRight,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Executive CRM Dashboard | BHTF Admin" }],
  }),
  component: AdminDashboardPage,
});

interface AnalyticsData {
  totalDonationsNu: number;
  pendingDonationsCount: number;
  unreadInquiriesCount: number;
  publishedNewsCount: number;
  activeSubscribersCount: number;
  totalReportsCount: number;
  monthlyStats: Array<{ month: string; amount: number; donors: number }>;
  recentDonations: Array<{
    id: number;
    referenceNo: string;
    donorName: string;
    donorEmail: string;
    amountNu: number;
    paymentMethod: string;
    status: string;
    createdAt: string | Date;
  }>;
  recentInquiries: Array<{
    id: number;
    name: string;
    email: string;
    subject: string;
    status: string;
    createdAt: string | Date;
  }>;
}

export function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async () => {
    try {
      const res = await getDashboardAnalytics();
      setData(res as unknown as AnalyticsData);
    } catch {
      toast.error("Failed to load dashboard metrics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleVerifyDonation = async (id: number) => {
    try {
      await updateDonationStatus({ data: { id, status: "COMPLETED" } });
      toast.success("Donation verified & official DRC voucher activated!");
      fetchAnalytics();
    } catch {
      toast.error("Failed to update donation status.");
    }
  };

  const handleMarkInquiryReplied = async (id: number) => {
    try {
      await updateInquiryStatus({ data: { id, status: "REPLIED" } });
      toast.success("Inquiry marked as Replied.");
      fetchAnalytics();
    } catch {
      toast.error("Failed to update inquiry status.");
    }
  };

  const publicDonations = data?.totalDonationsNu || 0;
  const rgobMatch = publicDonations; // 1:1 RGOB Sovereign Matching Multiplier
  const totalCombinedYield = publicDonations + rgobMatch;

  // Chart data with 1:1 RGOB Sovereign match
  const chartData = (data?.monthlyStats || []).map((item) => ({
    month: item.month,
    PublicDonations: item.amount,
    RGOBMatching: item.amount,
    TotalYield: item.amount * 2,
  }));

  const regionalBufferData = [
    { region: "Western (6 Dzongkhags)", bufferMonths: 8.5, facilities: 64 },
    { region: "Central (4 Dzongkhags)", bufferMonths: 7.8, facilities: 48 },
    { region: "Eastern (6 Dzongkhags)", bufferMonths: 9.2, facilities: 68 },
    { region: "Southern (4 Dzongkhags)", bufferMonths: 8.0, facilities: 40 },
  ];

  return (
    <AdminShell>
      <div className="space-y-8 pb-12">
        {/* Top Fiduciary Overview Banner */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Royal Charter Sovereign Fiduciary Ledger</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Executive Health Trust Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
              Supervising perpetual healthcare endowment allocations, public donation pledges, and the statutory 1:1 Royal Government matching fund for universal primary healthcare.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setRefreshing(true);
                fetchAnalytics();
              }}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin text-emerald-400" : ""}`} />
              <span>Sync Live Ledger</span>
            </button>
          </div>
        </div>

        {/* 4 Main CRM Metric Cards */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Aggregating real-time telemetry...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1: Public Contributions */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Public Contributions</span>
                  <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 grid place-items-center border border-emerald-200">
                    <Coins className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    Nu. {publicDonations.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-700 font-bold mt-1 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Direct Pledges Received
                  </div>
                </div>
              </div>

              {/* Card 2: 1:1 RGOB Matching Yield */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-amber-300 transition duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">1:1 RGOB Sovereign Match</span>
                  <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-700 grid place-items-center border border-amber-200">
                    <Building2 className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-700 font-mono">
                    + Nu. {rgobMatch.toLocaleString()}
                  </div>
                  <div className="text-xs text-amber-800 font-bold mt-1">
                    Ministry of Finance Sovereign Multiplier
                  </div>
                </div>
              </div>

              {/* Card 3: Combined Purchasing Yield */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-blue-300 transition duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Health Yield</span>
                  <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-700 grid place-items-center border border-blue-200">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-blue-700 font-mono">
                    Nu. {totalCombinedYield.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 font-bold mt-1">
                    Effective Healthcare Purchasing Power
                  </div>
                </div>
              </div>

              {/* Card 4: Actionable CRM Backlog */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-xl hover:border-purple-300 transition duration-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Actionable Inbox</span>
                  <div className="h-10 w-10 rounded-2xl bg-purple-50 text-purple-700 grid place-items-center border border-purple-200">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-900 font-mono">
                    {data?.pendingDonationsCount || 0} Pledges · {data?.unreadInquiriesCount || 0} Inquiries
                  </div>
                  <div className="text-xs text-purple-700 font-bold mt-1">
                    Pending Verification & Response
                  </div>
                </div>
              </div>
            </div>

            {/* Visualizer Charts Section (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Financial Revenue Dual Area Chart (7 Cols) */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Monthly Fiduciary Revenue & 1:1 RGOB Doubling
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Public citizen contributions doubled by sovereign matching funds.
                    </p>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
                    2026 Fiscal Year
                  </span>
                </div>

                <div className="h-72 w-full pt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="publicGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="matchGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#0f172a",
                          borderRadius: "16px",
                          border: "1px solid #334155",
                          color: "#fff",
                          fontSize: "12px",
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
                      <Area
                        type="monotone"
                        dataKey="PublicDonations"
                        name="Public Donations (Nu)"
                        stroke="#059669"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#publicGrad)"
                      />
                      <Area
                        type="monotone"
                        dataKey="TotalYield"
                        name="Total Yield with 1:1 RGOB Match (Nu)"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="4 4"
                        fillOpacity={1}
                        fill="url(#matchGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Regional Buffer Allocation Breakdown (5 Cols) */}
              <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4 flex flex-col justify-between">
                <div>
                  <div className="border-b pb-4">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Regional Medicine Buffer Stocks
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Supply pipeline duration across the 4 healthcare zones.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    {regionalBufferData.map((reg, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-extrabold text-slate-900">{reg.region}</span>
                          <span className="font-mono font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                            {reg.bufferMonths} Months Buffer
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(reg.bufferMonths / 12) * 100}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Target: 6.0 Months Minimum</span>
                          <span>{reg.facilities} Primary Health Centers</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/admin/programs"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-2xl transition cursor-pointer mt-4"
                >
                  <Activity className="h-4 w-4 text-emerald-700" />
                  <span>Inspect All 6 Commodity Streams</span>
                </Link>
              </div>
            </div>

            {/* Recent Pledges & Citizen Inquiries Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Donations CRM Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <HeartHandshake className="h-4 w-4 text-emerald-700" />
                      <span>Recent Donation Pledges</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Citizen and corporate contributions.</p>
                  </div>
                  <Link
                    to="/admin/donations"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                  >
                    View All Pledges →
                  </Link>
                </div>

                {(!data?.recentDonations || data.recentDonations.length === 0) ? (
                  <p className="text-xs text-slate-400 py-8 text-center">No recent donation pledges recorded.</p>
                ) : (
                  <div className="space-y-3">
                    {data.recentDonations.slice(0, 5).map((d) => (
                      <div
                        key={d.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 text-xs hover:bg-white transition"
                      >
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-slate-900 block">{d.donorName}</span>
                          <span className="text-[11px] text-slate-400 font-mono block">{d.referenceNo} · {d.paymentMethod}</span>
                        </div>

                        <div className="text-right space-y-1">
                          <div className="font-black text-slate-900 font-mono text-sm">
                            Nu. {d.amountNu.toLocaleString()}
                          </div>
                          {d.status === "PENDING" ? (
                            <button
                              type="button"
                              onClick={() => handleVerifyDonation(d.id)}
                              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-[10px] transition cursor-pointer shadow-xs"
                            >
                              Verify Pledge
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Citizen Inquiries CRM Table */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-purple-700" />
                      <span>Citizen Inquiries & Messages</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">Public inquiries and stakeholder correspondence.</p>
                  </div>
                  <Link
                    to="/admin/inquiries"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                  >
                    Open Inbox →
                  </Link>
                </div>

                {(!data?.recentInquiries || data.recentInquiries.length === 0) ? (
                  <p className="text-xs text-slate-400 py-8 text-center">No citizen inquiries in inbox.</p>
                ) : (
                  <div className="space-y-3">
                    {data.recentInquiries.slice(0, 5).map((iq) => (
                      <div
                        key={iq.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 text-xs hover:bg-white transition"
                      >
                        <div className="space-y-0.5">
                          <span className="font-extrabold text-slate-900 block">{iq.name}</span>
                          <span className="text-[11px] text-slate-600 line-clamp-1">{iq.subject}</span>
                        </div>

                        <div className="text-right space-y-1 shrink-0">
                          {iq.status === "UNREAD" ? (
                            <span className="text-[10px] font-black text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                              New
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-2 py-0.5 rounded-full">
                              {iq.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </AdminShell>
  );
}
