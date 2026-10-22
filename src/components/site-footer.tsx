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
import { useLanguage } from "@/lib/i18n/language-context";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang, t, isDzongkha } = useLanguage();

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
      <div className="bg-[#052e25] text-emerald-200 border-b border-emerald-800/40 px-4 py-2.5">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {isDzongkha
                ? "རྒྱལ་ཡོངས་འཕྲོད་བསྟེན་ཉེན་འཕྲང་བརྒྱུད་འཕྲིན་:"
                : "National Emergency Health Helpline:"}{" "}
              <strong className="text-sm font-bold underline decoration-white/50 underline-offset-2 ml-1 text-white">
                112
              </strong>{" "}
              {isDzongkha ? "(རིན་མེད། ཉིན་མཚན་མེད་པར)" : "(Toll-Free, 24/7 Nationwide)"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span>
              {isDzongkha
                ? "འབྲུག་གཞུང་ • ༡:༡ རྒྱལ་གཞུང་འདྲ་མཉམ་གཏོང་ལེན།"
                : "Royal Government of Bhutan • Sovereign Match 1:1"}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              {isDzongkha ? "དཔྱ་ཁྲལ་གུ་ཡངས་ཨང་ E-73" : "DRC Tax Exemption Reg. No. E-73"}
            </span>
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
              <span className="font-dzongkha text-xs text-amber-300 font-bold tracking-normal block leading-tight">
                ༄༅༎ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ ༎
              </span>
              <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                Bhutan Health Trust Fund
              </h3>
            </div>
          </div>

          <p className="text-xs text-white/75 leading-relaxed font-sans">
            {t(
              "footer_charter_note",
              "Established under Royal Charter in Geneva to guarantee uninterrupted sovereign financing for essential medicines and universal vaccines across all 20 Dzongkhags in Bhutan."
            )}
          </p>

          <div className="pt-2 flex items-center gap-2 text-xs text-emerald-300 font-semibold">
            <ShieldCheck className="size-4 shrink-0" />
            <span>{t("brand_badge", "Autonomous Statutory Entity • Royal Charter 2000")}</span>
          </div>
        </div>

        {/* Col 2: About BHTF */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">{t("footer_col_about", "About BHTF")}</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/about" className="hover:text-emerald-300 transition-colors">
                {t("nav_about_overview", "About Us Overview")}
              </Link>
            </li>
            <li>
              <Link to="/about/organization" className="hover:text-emerald-300 transition-colors">
                {t("nav_organization", "Organization & Organogram")}
              </Link>
            </li>
            <li>
              <Link to="/about/trustees" className="hover:text-emerald-300 transition-colors">
                {t("nav_trustees", "Board of Trustees")}
              </Link>
            </li>
            <li>
              <Link to="/about/committees" className="hover:text-emerald-300 transition-colors">
                {t("nav_amc", "Asset Management Committee")}
              </Link>
            </li>
            <li>
              <Link to="/about/secretariat" className="hover:text-emerald-300 transition-colors">
                {t("nav_secretariat", "Secretariat")}
              </Link>
            </li>
            <li>
              <Link to="/our-story" className="hover:text-emerald-300 transition-colors">
                {t("nav_our_story", "Our Story (1998–2026)")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Resources & Impact */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">{t("footer_col_formularies", "Impact & Formularies")}</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/our-impact" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "འཕྲོད་བསྟེན་མཁོ་ཆས་གཏོང་ལེན།" : "Commodity Disbursements"}
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ ༤༣༨" : "438 Essential Medicines"}
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "གསོ་བ་རིག་པའི་སྨན་སྦྱོར་ ༡༡༠" : "110 Traditional Remedies (gSo-ba Rig-pa)"}
              </Link>
            </li>
            <li>
              <Link to="/resources/audit-reports" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "རྩིས་ཞིབ་གྲུབ་པའི་སྙན་ཞུ།" : "RAA Certified Audits"}
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "མ་རྩ་བཙུགས་བཞག་སྲིད་བྱུས།" : "Investment Policies"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Get Involved */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">{t("footer_col_contribute", "Contribute")}</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/donate" className="hover:text-emerald-300 transition-colors font-semibold text-emerald-400">
                {isDzongkha ? "འཕྲོད་བསྟེན་མ་དངུལ་ལུ་ ཞལ་འདེབས།" : "Donate to Health Fund (1:1 Matched)"}
              </Link>
            </li>
            <li>
              <Link to="/donate" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "དཔྱ་ཁྲལ་གུ་ཡངས། (E-73)" : "DRC Tax Relief (E-73)"}
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "སྤྱི་ཟླ་ ༡༡ པའི་ཚེས་ ༡༡ མ་དངུལ་ཉིན་མ།" : "11 Nov BHTF Day"}
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "སྤྱི་ཟླ་ ༡༢ པའི་ཚེས་ ༡༧ མ་དངུལ་བསྡུ་སྒྲིལ།" : "17 Dec RSEB Crowd Fundraising"}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "ཐབས་བྱུས་མཉམ་འབྲེལ།" : "Strategic Partnerships"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Contact & Newsletter */}
        <div className="space-y-4">
          <h4 className="font-bold text-sm text-white">
            {t("nav_contact", "Contact Us")}
          </h4>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="size-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{t("topbar_address", "Lower Motithang, Thori Lam, Thimphu, Bhutan")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 text-emerald-400 shrink-0" />
              <span>02-338636 / 338637 / 77348083</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 text-emerald-400 shrink-0" />
              <span>bhtf@bhtf.bt</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-white/70">
              <span className="font-mono text-emerald-300 font-bold">WhatsApp:</span>
              <span>77348083</span>
            </li>
          </ul>

          <div className="pt-2">
            <div className="text-xs font-semibold mb-2 text-white/90">
              {isDzongkha ? "གཞུང་འབྲེལ་བརྡ་དོན།" : "Official Bulletins"}
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-1.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isDzongkha ? "གློག་འཕྲིན་བཙུགས་གནང་..." : "Enter email..."}
                className="bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-400 flex-1"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500 transition shrink-0"
              >
                {loading ? <Loader2 className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
              </button>
            </form>
          </div>

          <div className="pt-1 flex gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=100006126615023"
              target="_blank"
              rel="noreferrer"
              className="grid place-items-center size-8 rounded-full bg-white/10 hover:bg-emerald-600 hover:text-white transition text-white/80"
              aria-label="Official BHTF Facebook Profile"
            >
              <Facebook className="size-3.5" />
            </a>
            {[Twitter, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="https://www.bhtf.bt"
                target="_blank"
                rel="noreferrer"
                className="grid place-items-center size-8 rounded-full bg-white/10 hover:bg-emerald-600 hover:text-white transition text-white/80"
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
          <p>
            © {new Date().getFullYear()}{" "}
            {isDzongkha
              ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ། རྒྱལ་པོའི་བཀའ་ཤོག་ཅན་གྱི་ཁྲིམས་མཐུན་ལས་ཚོགས། ཐོབ་དབང་ཡོངས་རྫོགས་ཡོད།"
              : "Bhutan Health Trust Fund. Royal Charter Statutory Body. All Rights Reserved."}
          </p>
          <div className="flex gap-5 text-xs">
            <Link to="/policies" className="hover:text-emerald-300 transition">
              {isDzongkha ? "ཁྲིམས་མཐུན་སྲིད་བྱུས།" : "Statutory Policies"}
            </Link>
            <Link to="/reports" className="hover:text-emerald-300 transition">
              {isDzongkha ? "རྩིས་ཞིབ།" : "Audits"}
            </Link>
            <Link to="/contact" className="hover:text-emerald-300 transition">
              {t("nav_contact", "Contact")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
