import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import { adminLogin } from "@/lib/api/auth.functions";
import { Lock, Mail, ShieldCheck, ArrowRight, Loader2, Eye, EyeOff, ShieldAlert } from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Bhutan Health Trust Fund" },
      { name: "description", content: "Official secretariat administrative portal for BHTF staff." },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        toast.error(res.error || "Authentication failed. Please check credentials.", { duration: 5000 });
      }
    } catch (err: any) {
      let msg = err?.message || "Failed to connect to the authentication server.";
      if (typeof msg === "string" && (msg.startsWith("<!") || msg.includes("<html") || msg.includes("This page didn't load"))) {
        msg = "Database connection error on server. Ensure PostgreSQL is active and 'npm run db:push && npm run db:seed' was completed.";
      }
      toast.error(msg, { duration: 6000 });
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginWithCredentials(email, password);
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

          <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl p-3 text-emerald-100 text-xs flex items-center gap-2 mt-4 text-left">
            <ShieldAlert className="h-4 w-4 text-amber-300 shrink-0" />
            <span>Official Secretariat Access Only — use your @bhtf.bt credentials</span>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">Sign in to your account</h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your official secretariat credentials to access administrative systems.
            </p>
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
                  placeholder="name@bhtf.bt"
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
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-11 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded"
                  title={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
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

          <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col gap-3">
            <div className="flex items-start gap-2 text-[11px] text-slate-400 leading-snug">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Royal Government of Bhutan IT Security Advisory: Unauthorized access attempts are monitored and logged.</span>
            </div>
            <div className="text-right">
              <a href="/" className="text-xs text-primary font-medium hover:underline">
                Return to Website →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
