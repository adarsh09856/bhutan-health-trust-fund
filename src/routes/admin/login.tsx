import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import { adminLogin } from "@/lib/api/auth.functions";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, Sparkles, UserCheck, KeyRound } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Bhutan Health Trust Fund" },
      { name: "description", content: "Administrative authentication portal for BHTF staff." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [email, setEmail] = useState("admin@bhtf.bt");
  const [password, setPassword] = useState("Admin@BHTF2026");
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleLoginWithCredentials = async (loginEmail: string, loginPass: string) => {
    setLoading(true);
    try {
      const res = await adminLogin({ data: { email: loginEmail, password: loginPass } });
      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        toast.success(`Welcome back, ${res.user.name}!`);
        router.navigate({ to: "/admin/dashboard" });
      } else {
        toast.error(res.error || "Authentication failed. Please check credentials.");
      }
    } catch {
      toast.error("Failed to connect to the authentication server.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginWithCredentials(email, password);
  };

  const handleQuickDemoAdmin = () => {
    setEmail("admin@bhtf.bt");
    setPassword("Admin@BHTF2026");
    handleLoginWithCredentials("admin@bhtf.bt", "Admin@BHTF2026");
  };

  const handleQuickDemoEditor = () => {
    setEmail("media@bhtf.bt");
    setPassword("Admin@BHTF2026");
    handleLoginWithCredentials("media@bhtf.bt", "Admin@BHTF2026");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-primary/90 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700/20">
        {/* Top Header */}
        <div className="bg-primary px-8 pt-8 pb-6 text-center text-white relative">
          <div className="mx-auto w-16 h-16 bg-white rounded-xl p-2 shadow-lg mb-4 grid place-items-center">
            <img src={logo} alt="BHTF Logo" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Bhutan Health Trust Fund</h1>
          <p className="text-xs text-primary-foreground/80 mt-1">Management & Executive Portal</p>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500 mt-1">
              Select a demo account below or enter your official secretariat credentials.
            </p>
          </div>

          {/* Quick 1-Click Demo Buttons */}
          <div className="mb-6 space-y-2">
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Instant 1-Click Demo Logins:
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={handleQuickDemoAdmin}
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-between transition cursor-pointer shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-amber-400" /> Login as Super Admin
                </span>
                <span className="font-mono text-[10px] text-slate-400">admin@bhtf.bt</span>
              </button>

              <button
                type="button"
                onClick={handleQuickDemoEditor}
                disabled={loading}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-3 rounded-lg flex items-center justify-between transition cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-primary" /> Login as Media Editor
                </span>
                <span className="font-mono text-[10px] text-slate-500">media@bhtf.bt</span>
              </button>
            </div>
          </div>

          <div className="relative flex py-2 items-center mb-4">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-slate-400 text-[10px] uppercase font-semibold">Or enter manually</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Official Email
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@bhtf.bt"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition duration-150 flex items-center justify-center gap-2 shadow-md disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                </>
              ) : (
                <>
                  Enter Admin Dashboard <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Offline Demo Ready
            </span>
            <a href="/" className="text-primary font-medium hover:underline">
              Return to Website →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
