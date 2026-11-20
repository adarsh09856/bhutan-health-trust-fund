import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/lib/i18n/language-context";

export function SiteFooter() {
  const { t, isDzongkha } = useLanguage();

  return (
    <footer className="bg-gradient-footer text-white mt-20 relative overflow-hidden">
      {/* Main Footer Grid */}
      <div className="container-page py-16 grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.2fr]">
        {/* Col 1: Brand & Royal Mandate */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full bg-white p-1 shadow-card shrink-0 grid place-items-center">
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
              "Established under Royal Charter in 2000 to guarantee uninterrupted financing for essential medicines and vaccines across all 20 Dzongkhags in Bhutan."
            )}
          </p>
        </div>

        {/* Col 2: About BHTF */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">{t("footer_col_about", "About BHTF")}</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/about" className="hover:text-emerald-300 transition-colors">
                {t("nav_about_us", "About Us")}
              </Link>
            </li>
            <li>
              <Link to="/about/organization" className="hover:text-emerald-300 transition-colors">
                {t("nav_organization", "Organogram")}
              </Link>
            </li>
            <li>
              <Link to="/about/trustees" className="hover:text-emerald-300 transition-colors">
                {t("nav_trustees", "Board of Directors")}
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
                {t("nav_our_story", "Our Story")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Resources & Impact */}
        <div>
          <h4 className="font-bold text-sm mb-4 text-white">{t("footer_col_formularies", "Impact & Formularies")}</h4>
          <ul className="space-y-2.5 text-xs text-white/75">
            <li>
              <Link to="/our-work" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "ཉེ་བར་མཁོ་བའི་སྨན་རྫས་ ༤༣༨" : "438 Essential Medicines"}
              </Link>
            </li>
            <li>
              <Link to="/our-work" className="hover:text-emerald-300 transition-colors">
                {isDzongkha ? "གསོ་བ་རིག་པའི་སྨན་སྦྱོར་ ༡༡༠" : "110 Traditional Medicines"}
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

        {/* Col 5: Contact */}
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
          </div>
        </div>
      </div>

    </footer>
  );
}
