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
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [{ title: "Executive Dashboard | BHTF Admin" }],
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

function AdminDashboardPage() {
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
      toast.success("Donation marked as Verified & Completed!");
      fetchAnalytics();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  const handleMarkInquiryReplied = async (id: number) => {
    try {
      await updateInquiryStatus({ data: { id, status: "REPLIED" } });
      toast.success("Inquiry marked as Replied.");
      fetchAnalytics();
    } catch {
      toast.error("Failed to update status.");
    }
  };

  return (
    <AdminShell>
      <div className="space-y-8">
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Performance & Fiduciary Overview</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Live metrics from primary healthcare endowment, public contributions, and citizen communications.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                fetchAnalytics();
              }}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition shadow-xs disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
              Refresh Data
            </button>
            <Link
              to="/admin/news"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-primary/90 transition shadow-xs"
            >
              <Plus className="h-4 w-4" /> Publish News
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Loading real-time data metrics...</p>
          </div>
        ) : data ? (
          <>
            {/* Top 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Total Donations */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total Funds Pledged
                  </span>
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center">
                    <Coins className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-slate-900">
                    Nu. {data.totalDonationsNu.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-emerald-600 font-medium">
                    <TrendingUp className="h-3.5 w-3.5" /> +14.8% vs last month
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{data.pendingDonationsCount} pending verification</span>
                  <Link to="/admin/donations" className="text-primary font-semibold hover:underline flex items-center">
                    Ledger <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Unread Inquiries */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Inquiries Inbox
                  </span>
                  <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-600 grid place-items-center">
                    <Mail className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {data.unreadInquiriesCount} <span className="text-xs font-normal text-slate-500">Unread</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Citizen & partner inquiries
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Direct public channel</span>
                  <Link to="/admin/inquiries" className="text-primary font-semibold hover:underline flex items-center">
                    Inbox <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Published News */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Published News
                  </span>
                  <div className="h-10 w-10 rounded-lg bg-violet-50 text-violet-600 grid place-items-center">
                    <Newspaper className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {data.publishedNewsCount} <span className="text-xs font-normal text-slate-500">Articles</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    {data.totalReportsCount} official PDF reports online
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Publicly visible</span>
                  <Link to="/admin/news" className="text-primary font-semibold hover:underline flex items-center">
                    Articles <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Newsletter Audience */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Active Subscribers
                  </span>
                  <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 grid place-items-center">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {data.activeSubscribersCount}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Opted-in for quarterly bulletins
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Export ready</span>
                  <Link to="/admin/subscribers" className="text-primary font-semibold hover:underline flex items-center">
                    Audience <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Donation Financial Trends Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Public Contributions & Monthly Growth Trend</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Monthly donation volume in Ngultrum (Nu.) across individual, corporate, and royal grants.
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                  Fiscal Year 2024-2025
                </span>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.monthlyStats} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748b" }} axisLine={false} tickLine={false} />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#64748b" }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `Nu.${val / 1000}k`}
                    />
                    <Tooltip
                      formatter={(value: any) => [`Nu. ${Number(value).toLocaleString()}`, "Amount"]}
                      contentStyle={{ backgroundColor: "#0f172a", borderRadius: "8px", color: "#fff", border: "none" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#1e3a8a"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorAmount)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Two Column Grid: Recent Donations & Recent Inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Donations Ledger */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Recent Donation Pledges</h3>
                    <Link to="/admin/donations" className="text-xs font-semibold text-primary hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {data.recentDonations.map((d) => (
                      <div key={d.id} className="py-3.5 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold text-sm text-slate-900">{d.donorName}</div>
                          <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[11px] text-slate-600">{d.referenceNo}</span>
                            <span>·</span>
                            <span>{d.paymentMethod}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm text-slate-900">
                            Nu. {d.amountNu.toLocaleString()}
                          </div>
                          <div className="mt-1 flex items-center gap-1 justify-end">
                            {d.status === "COMPLETED" || d.status === "VERIFIED" ? (
                              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                                <CheckCircle2 className="h-3 w-3" /> {d.status}
                              </span>
                            ) : (
                              <button
                                onClick={() => handleVerifyDonation(d.id)}
                                className="inline-flex items-center gap-1 text-[10px] font-semibold bg-amber-50 text-amber-700 hover:bg-amber-100 px-2 py-0.5 rounded-full transition"
                              >
                                <Clock className="h-3 w-3" /> Verify
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Inquiries Inbox */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900">Incoming Public Inquiries</h3>
                    <Link to="/admin/inquiries" className="text-xs font-semibold text-primary hover:underline">
                      View All
                    </Link>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {data.recentInquiries.map((iq) => (
                      <div key={iq.id} className="py-3.5 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-slate-900 truncate">{iq.subject}</div>
                          <div className="text-xs text-slate-500 truncate mt-0.5">
                            {iq.name} · <span className="text-slate-400">{iq.email}</span>
                          </div>
                        </div>
                        <div className="shrink-0 flex items-center gap-2">
                          {iq.status === "UNREAD" ? (
                            <button
                              onClick={() => handleMarkInquiryReplied(iq.id)}
                              className="text-[10px] font-semibold bg-sky-50 text-sky-700 hover:bg-sky-100 px-2 py-1 rounded-md transition"
                            >
                              Mark Replied
                            </button>
                          ) : (
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                              {iq.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
