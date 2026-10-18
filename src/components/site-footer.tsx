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
  Send,
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
    <footer className="bg-gradient-footer text-white mt-20 relative overflow-hidden">
      {/* 1. Emergency Helpline Bar */}
      <div className="bg-saffron text-saffron-foreground border-b border-white/10 px-4 py-2.5">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-white animate-pulse" />
            <span>
              National Emergency Health Helpline:{" "}
              <strong className="text-sm font-bold underline decoration-white/50 underline-offset-2 ml-1">
                112
              </strong>{" "}
              (Toll-Free, 24/7 Nationwide)
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>Royal Government of Bhutan • Sovereign Match 1:1</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">DRC Tax Exemption Reg. No. E-73</span>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Grid */}
      <div className="container-page py-16 grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        {/* Col 1: Brand & Royal Mandate */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-white p-1.5 shadow-card shrink-0">
              <img src={logo} alt="BHTF Emblem" className="size-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] text-saffron font-bold tracking-wider block">
                ༄༅། །འབྲུག་གི་འཕྲོད་བསྟེན་གཞི་མ།
              </span>
              <h3 className="text-base font-bold text-white tracking-tight">Bhutan Health Trust Fund</h3>
            </div>
          </div>

          <p className="text-xs text-white/75 leading-relaxed">
            Established under Royal Charter in Geneva to guarantee uninterrupted sovereign financing for essential
            medicines and universal vaccines across all 20 Dzongkhags in Bhutan.
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-saffron font-semibold">
            <ShieldCheck className="size-4 shrink-0" />
            <span>Autonomous Statutory Entity • Royal Charter 2000</span>
          </div>
        </div>

        {/* Col 2: About BHTF */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">About BHTF</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/about" className="hover:text-saffron transition-colors">
                Vision & Mandate
              </Link>
            </li>
            <li>
              <Link to="/about/organization" className="hover:text-saffron transition-colors">
                Organization & Organogram
              </Link>
            </li>
            <li>
              <Link to="/about/trustees" className="hover:text-saffron transition-colors">
                Board of Trustees
              </Link>
            </li>
            <li>
              <Link to="/about/committees" className="hover:text-saffron transition-colors">
                Asset Management Committee
              </Link>
            </li>
            <li>
              <Link to="/about/secretariat" className="hover:text-saffron transition-colors">
                Secretariat & Staff
              </Link>
            </li>
            <li>
              <Link to="/our-story" className="hover:text-saffron transition-colors">
                Our Story (1998–2026)
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Resources & Impact */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">Impact & Formularies</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/our-impact" className="hover:text-saffron transition-colors">
                Commodity Disbursements
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="hover:text-saffron transition-colors">
                438 Essential Medicines
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="hover:text-saffron transition-colors">
                110 Traditional Remedies (gSo-ba Rig-pa)
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:text-saffron transition-colors">
                RAA Certified Audits
              </Link>
            </li>
            <li>
              <Link to="/policies" className="hover:text-saffron transition-colors">
                Investment Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Get Involved */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">Contribute</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/donate" className="hover:text-saffron transition-colors font-semibold text-saffron">
                Donate to Health Fund (1:1 Matched)
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-saffron transition-colors">
                DRC Tax Relief (E-73)
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-saffron transition-colors">
                11 Nov BHTF Day
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-saffron transition-colors">
                17 Dec RSEB Crowd Fundraising
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-saffron transition-colors">
                Strategic Partnerships
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Contact & Newsletter */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-white">Contact Us</h4>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="size-4 text-saffron shrink-0 mt-0.5" />
              <span>Lower Motithang, Thori Lam, Thimphu, Bhutan</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-saffron shrink-0" />
              <span>+975 2 328999</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-saffron shrink-0" />
              <span>bhtf@bhtf.bt</span>
            </li>
          </ul>

          <div className="pt-2">
            <div className="text-xs font-semibold mb-2 text-white/90">Official Bulletins</div>
            <form onSubmit={handleSubscribe} className="flex gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email..."
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-saffron flex-1"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-saffron text-saffron-foreground px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition shrink-0"
              >
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
              </button>
            </form>
          </div>

          <div className="pt-1 flex gap-2">
            {[Facebook, Twitter, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="https://facebook.com/bhutanhealthtrustfund"
                target="_blank"
                rel="noreferrer"
                className="grid place-items-center size-8 rounded-full bg-white/10 hover:bg-saffron hover:text-saffron-foreground transition text-white/80"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal Strip */}
      <div className="border-t border-white/10">
        <div className="container-page py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Bhutan Health Trust Fund. Royal Charter Statutory Body. All Rights Reserved.</p>
          <div className="flex gap-5 text-xs">
            <Link to="/policies" className="hover:text-saffron transition">
              Statutory Policies
            </Link>
            <Link to="/reports" className="hover:text-saffron transition">
              Audits
            </Link>
            <Link to="/contact" className="hover:text-saffron transition">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
