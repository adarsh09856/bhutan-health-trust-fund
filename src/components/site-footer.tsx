import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Loader2,
  Heart,
  ShieldCheck,
  Building2,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Award,
} from "lucide-react";
import { subscribeNewsletter } from "@/lib/api/public.functions";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await subscribeNewsletter({ data: { email } });
      if (res.success) {
        toast.success("Thank you for subscribing to BHTF official bulletins!");
        setEmail("");
      }
    } catch {
      toast.error("Failed to subscribe. Please check your email format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 mt-24 border-t border-amber-500/20 relative overflow-hidden">
      {/* Ambient Saffron & Emerald Background Glows */}
      <div className="absolute -top-24 left-1/4 h-80 w-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 h-80 w-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Upper Banner: Emergency & Healthcare Hotline Awareness */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 px-4 py-4 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium">
              National Emergency Health Helpline:{" "}
              <strong className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400 font-black text-sm ml-1 font-mono">112</strong> (Toll-Free, 24/7 Nationwide)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs font-medium">
            <span className="text-emerald-400 font-bold">Royal Government of Bhutan Partner</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-amber-400 font-bold">WHO Collaborating Sovereign Trust</span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Institutional Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-13 w-13 rounded-2xl bg-gradient-to-br from-amber-50 to-emerald-50 p-1.5 shadow-md shrink-0 border border-amber-300/40">
              <img src={logo} alt="BHTF Emblem" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-wider block">
                འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ།
              </span>
              <h3 className="font-black text-base text-white">Bhutan Health Trust Fund</h3>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-normal">
            Established under Royal Charter to guarantee perpetual sovereign financing for essential medicines, life-saving vaccines,
            and primary healthcare commodities across all 20 Dzongkhags in the Kingdom of Bhutan.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-bold">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Autonomous & Fully Audited Entity</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-extrabold text-white mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Institutional Portals</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
            <li>
              <Link to="/about" className="hover:text-amber-300 transition flex items-center gap-1.5">
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> About Mission & Royal Mandate
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Healthcare Programs & Impact
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-blue-400 transition flex items-center gap-1.5">
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Statutory Annual Reports & Audits
              </Link>
            </li>
            <li>
              <Link to="/policies" className="hover:text-teal-400 transition flex items-center gap-1.5">
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Governance & Fiduciary Policies
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-purple-400 transition flex items-center gap-1.5">
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Press Releases & Media Room
              </Link>
            </li>
            <li>
              <Link to="/get-involved" className="hover:text-amber-300 transition flex items-center gap-1.5 font-bold text-amber-400">
                <Heart className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Donate Nu. (1:1 RGOB Matched)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Secretariat Contact */}
        <div>
          <h4 className="font-extrabold text-white mb-4 uppercase tracking-wider text-xs flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Secretariat Directory</span>
          </h4>
          <ul className="space-y-3.5 text-xs text-slate-400 font-medium">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
              <span>BHTF Secretariat, Kawajangsa, Thimphu, Kingdom of Bhutan</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
              <a href="tel:+9752328999" className="hover:text-white transition">
                +975 2 328999 / 338999
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
              <a href="mailto:info@bhtf.bt" className="hover:text-white transition">
                info@bhtf.bt / secretariat@bhtf.bt
              </a>
            </li>
            <li className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-amber-400 font-bold hover:text-amber-300 transition"
              >
                Send Citizen Message →
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Socials */}
        <div>
          <h4 className="font-extrabold text-white mb-4 uppercase tracking-wider text-xs">
            Official Bulletins
          </h4>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            Subscribe to receive audited financial statements, procurement notices, and national health milestones.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-5">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="official.email@organization.bt"
                className="w-full bg-slate-900/90 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                "Subscribe to Bulletins"
              )}
            </button>
          </form>

          {/* Social Links */}
          <div className="space-y-2">
            <span className="text-[11px] text-slate-400 font-semibold block">Follow Official Updates:</span>
            <div className="flex gap-2">
              {[
                { icon: Facebook, href: "https://facebook.com/bhtf.bt", label: "Facebook" },
                { icon: Twitter, href: "https://twitter.com/bhtf_bhutan", label: "Twitter" },
                { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="h-8 w-8 grid place-items-center rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-amber-400 border border-slate-800 transition"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Legal Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/90 px-4 py-6 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span>© {new Date().getFullYear()} Bhutan Health Trust Fund.</span>
            <span className="hidden sm:inline">•</span>
            <span>Royal Charter Autonomous Statutory Entity.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 font-medium">
            <Link to="/policies" className="hover:text-emerald-400 transition">
              Anti-Corruption Policy
            </Link>
            <span>•</span>
            <Link to="/policies" className="hover:text-emerald-400 transition">
              Whistleblower Protection
            </Link>
            <span>•</span>
            <Link to="/admin/login" className="text-slate-500 hover:text-slate-300 transition">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}