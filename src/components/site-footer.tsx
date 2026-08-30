import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Facebook, Twitter, Youtube, Linkedin, Mail, Phone, MapPin, Loader2, Send } from "lucide-react";
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
        toast.success("Thank you for subscribing to BHTF bulletins!");
        setEmail("");
      }
    } catch {
      toast.error("Failed to subscribe. Please verify your email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="BHTF" width={48} height={48} className="h-12 w-12 bg-white rounded-lg p-1 object-contain" />
            <div>
              <div className="font-bold text-base">Bhutan Health Trust Fund</div>
              <div className="text-xs opacity-80">Healthy People. Stronger Bhutan.</div>
            </div>
          </div>
          <p className="text-xs opacity-80 leading-relaxed">
            Sustainably financing essential medicines, vaccines, and primary healthcare commodities for every citizen across the Kingdom of Bhutan.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4">Quick Navigation</h4>
          <ul className="space-y-2 text-xs opacity-90">
            <li><Link to="/about" className="hover:underline">About Us & Mandate</Link></li>
            <li><Link to="/our-work" className="hover:underline">Our Work & Programs</Link></li>
            <li><Link to="/reports" className="hover:underline">Reports & Publications</Link></li>
            <li><Link to="/policies" className="hover:underline">Governance & Policies</Link></li>
            <li><Link to="/news" className="hover:underline">News & Announcements</Link></li>
            <li><Link to="/get-involved" className="hover:underline">Donate & Support</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4">Secretariat Directory</h4>
          <ul className="space-y-3 text-xs opacity-90">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
              <span>Kawajangsa, Thimphu, Kingdom of Bhutan</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
              <span>+975 2 328999</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-secondary" />
              <span>info@bhtf.bt</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-sm mb-4">Stay Connected</h4>
          <p className="text-xs opacity-80 mb-3">
            Subscribe to receive quarterly publications and public health impact reports.
          </p>
          <form className="flex gap-2 mb-4" onSubmit={handleSubscribe}>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your official email..."
              className="flex-1 rounded-lg px-3 py-2 text-xs text-foreground bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-secondary text-white px-3.5 py-2 rounded-lg text-xs font-bold hover:bg-secondary/90 transition flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Join"}
            </button>
          </form>

          <div className="flex gap-2.5">
            {[
              { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
              { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
              { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="h-8 w-8 grid place-items-center rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto max-w-7xl px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs opacity-80">
          <p>© {new Date().getFullYear()} Bhutan Health Trust Fund. Royal Charter Autonomous Entity.</p>
          <p>Transparency · Accountability · Sustainability</p>
        </div>
      </div>
    </footer>
  );
}