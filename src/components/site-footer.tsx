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
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { subscribeNewsletter } from "@/lib/api/public.functions";
import logo from "@/assets/logo.png";
import { toast } from "sonner";
import { institutionalConfig } from "@/config/institutional";

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
    <footer className="bg-[#071512] text-slate-300 mt-20 border-t border-amber-400/20 relative overflow-hidden">
      {/* Upper Banner: Emergency Helpline Awareness */}
      <div className="bg-[#0B1F1A] border-b border-white/10 px-4 py-3.5 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300">
              National Emergency Health Helpline:{" "}
              <strong className="text-amber-300 font-serif text-sm ml-1">
                112
              </strong>{" "}
              (Toll-Free, 24/7 Nationwide)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <span className="text-emerald-400 font-medium">Royal Government of Bhutan Partner</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-amber-300/90 font-medium">
              WHO Collaborating Sovereign Trust
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Column 1: Institutional Overview */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/[0.08] p-1.5 shadow-sm shrink-0 border border-amber-300/30">
              <img src={logo} alt="BHTF Emblem" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] text-amber-400 font-semibold tracking-wider block font-sans">
                འབྲུག་གི་འཕྲོད་བསྟེན་མ་དངུལ།
              </span>
              <h3 className="font-serif text-base font-normal text-white">Bhutan Health Trust Fund</h3>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed font-sans font-light">
            Established under Royal Charter to guarantee perpetual sovereign financing for essential
            medicines, life-saving vaccines, and primary healthcare commodities across all 20
            Dzongkhags in the Kingdom of Bhutan.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium font-sans">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Autonomous & Fully Audited Entity</span>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>Institutional Portals</span>
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-sans">
            <li>
              <Link
                to="/about"
                className="hover:text-amber-300 transition flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Mission & Royal Mandate
              </Link>
            </li>
            <li>
              <Link
                to="/our-work"
                className="hover:text-emerald-400 transition flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Healthcare Programs & Impact
              </Link>
            </li>
            <li>
              <Link
                to="/reports"
                className="hover:text-blue-300 transition flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Statutory Annual Reports &
                Audits
              </Link>
            </li>
            <li>
              <Link
                to="/policies"
                className="hover:text-teal-300 transition flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Governance & Fiduciary Policies
              </Link>
            </li>
            <li>
              <Link
                to="/track-donation"
                className="hover:text-amber-300 transition flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Track My Donation / Tax Voucher
              </Link>
            </li>
            <li>
              <Link
                to="/news"
                className="hover:text-slate-200 transition flex items-center gap-1.5"
              >
                <ArrowUpRight className="h-3 w-3 text-slate-500" /> Press Releases & Media Room
              </Link>
            </li>
            <li>
              <Link
                to="/get-involved"
                className="hover:text-amber-300 transition flex items-center gap-1.5 font-semibold text-amber-400"
              >
                <Heart className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> Donate (1:1 RGOB
                Matched)
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Secretariat Contact */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-white mb-4 tracking-wide flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-emerald-400" />
            <span>Secretariat Directory</span>
          </h4>
          <ul className="space-y-3.5 text-xs text-slate-400 font-sans">
            <li className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-amber-400" />
              <span>{institutionalConfig.secretariatAddress}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-emerald-400" />
              <a
                href={`tel:${institutionalConfig.secretariatPhone.replace(/[^0-9+]/g, "")}`}
                className="hover:text-white transition"
              >
                {institutionalConfig.secretariatPhone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
              <a
                href={`mailto:${institutionalConfig.secretariatEmail}`}
                className="hover:text-white transition"
              >
                {institutionalConfig.secretariatEmail}
              </a>
            </li>
            <li className="pt-1">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-amber-400 font-medium hover:text-amber-300 transition"
              >
                Send Citizen Message →
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Socials */}
        <div>
          <h4 className="font-serif text-sm font-semibold text-white mb-4 tracking-wide">
            Official Bulletins
          </h4>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed font-sans font-light">
            Subscribe to receive audited financial statements, procurement notices, and national
            health milestones.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-5">
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="official.email@organization.bt"
                className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition font-sans"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold py-2.5 px-4 rounded-xl text-xs transition duration-150 flex items-center justify-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50 font-sans"
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
            <span className="text-[11px] text-slate-400 font-sans block">
              Follow Official Channels:
            </span>
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
                  className="h-8 w-8 grid place-items-center rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-amber-300 border border-white/10 transition"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Legal Bar */}
      <div className="border-t border-white/10 bg-[#071512] px-4 py-6 relative z-10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span>© {new Date().getFullYear()} Bhutan Health Trust Fund.</span>
            <span className="hidden sm:inline">•</span>
            <span>Royal Charter Autonomous Statutory Entity.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <Link to="/policies" className="hover:text-amber-300 transition">
              Anti-Corruption Policy
            </Link>
            <span>•</span>
            <Link to="/policies" className="hover:text-amber-300 transition">
              Whistleblower Protection
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
