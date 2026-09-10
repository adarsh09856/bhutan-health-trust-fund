import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/lib/admin-auth";
import { checkSetupStatus, executeFirstRunSetup } from "@/lib/api/auth.functions";
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  User,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  AlertTriangle,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/setup")({
  head: () => ({
    meta: [
      { title: "System Setup | Bhutan Health Trust Fund" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminSetupPage,
});

function AdminSetupPage() {
  const [checking, setChecking] = useState(true);
  const [setupRequired, setSetupRequired] = useState(false);
  const [setupToken, setSetupToken] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    checkSetupStatus()
      .then((res) => {
        setSetupRequired(!!res?.setupRequired);
      })
      .catch(() => {
        setSetupRequired(false);
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Master passwords do not match. Please re-enter.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await executeFirstRunSetup({
        data: {
          setupToken: setupToken.trim(),
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        },
      });

      if (res.success && res.user && res.token) {
        login(res.user, res.token);
        toast.success(
          "Initial Super Administrator successfully provisioned! Redirecting to CRM...",
        );
        router.navigate({ to: "/admin/dashboard" });
      } else {
        if (res.statusCode === 404) {
          setSetupRequired(false);
          toast.error(res.error || "404 Not Found: Initialization endpoint is inactive.");
        } else {
          toast.error(res.error || "Initialization failed.");
        }
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to communicate with setup service.");
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-amber-500 animate-spin" />
          <p className="text-xs font-mono">Verifying institutional system state...</p>
        </div>
      </div>
    );
  }

  // Hard bricked: When super_admin exists or endpoint decommissioned, show clean 404
  if (!setupRequired) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-4">
          <div className="h-14 w-14 rounded-2xl bg-slate-800 text-slate-400 grid place-items-center mx-auto border border-slate-700">
            <ShieldAlert className="h-7 w-7 text-rose-500" />
          </div>
          <h1 className="text-2xl font-black text-white font-mono">404 — Not Found</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The requested resource is not available or has been permanently decommissioned.
          </p>
          <div className="pt-4 border-t border-slate-800 flex justify-center">
            <a
              href="/"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 transition underline underline-offset-4"
            >
              ← Return to BHTF Public Portal
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-lg w-full bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden text-slate-100">
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 p-6 sm:p-8 text-white text-center relative">
          <div className="mx-auto w-16 h-16 bg-white rounded-2xl p-2 shadow-xl mb-3 grid place-items-center border border-amber-300">
            <img src={logo} alt="BHTF Emblem" className="h-full w-full object-contain" />
          </div>
          <h1 className="text-xl font-black tracking-tight">Bhutan Health Trust Fund</h1>
          <p className="text-xs text-amber-100 mt-1 font-medium">
            Sovereign System Initialization • First-Run Wizard
          </p>
          <div className="mt-4 bg-black/30 border border-amber-400/30 rounded-xl p-3 text-left text-xs text-amber-200 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              This setup creates the primary <strong>SUPER_ADMIN</strong>. Once created, this
              endpoint is permanently bricked and cannot be reused.
            </span>
          </div>
        </div>

        {/* Setup Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Setup Passphrase / Token</span>
              <span className="text-[10px] text-amber-400 font-mono lowercase">
                From .env SETUP_TOKEN
              </span>
            </label>
            <div className="relative">
              <KeyRound className="h-4 w-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={setupToken}
                onChange={(e) => setSetupToken(e.target.value)}
                placeholder="Enter server SETUP_TOKEN"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Super Admin Legal Name
            </label>
            <div className="relative">
              <User className="h-4 w-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Executive Director / Secretariat Admin"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Official Email Address
            </label>
            <div className="relative">
              <Mail className="h-4 w-4 text-slate-500 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bhtf.bt"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Master Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm tracking-wide transition shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Provisioning Sovereign Super Admin...
              </>
            ) : (
              <>
                Initialize Sovereign Super Admin <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>Cryptographically Enforced</span>
            </div>
            <a href="/admin/login" className="text-amber-400 hover:text-amber-300 transition">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
