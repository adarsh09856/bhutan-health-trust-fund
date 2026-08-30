import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Users, ClipboardCheck, FileText, ShieldCheck, Megaphone, HandHeart,
  ArrowRight, BarChart3, Pill, Lock, Sparkles, Calendar, MapPin,
} from "lucide-react";
import hero from "@/assets/hero-bhutan.jpg";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      { name: "description", content: "BHTF sustainably finances essential medicines and vaccines for every Bhutanese citizen." },
    ],
  }),
  component: Index,
});

const quickLinks = [
  { icon: Users, label: "About Us", desc: "Learn about our mission and vision", to: "/about", color: "bg-emerald-50 text-emerald-600" },
  { icon: ClipboardCheck, label: "Our Work", desc: "Explore our programs and initiatives", to: "/our-work", color: "bg-sky-50 text-sky-600" },
  { icon: FileText, label: "Reports & Publications", desc: "Access our reports and publications", to: "/reports", color: "bg-violet-50 text-violet-600" },
  { icon: ShieldCheck, label: "Policies", desc: "Guidelines & policy documents", to: "/policies", color: "bg-teal-50 text-teal-600" },
  { icon: Megaphone, label: "News & Updates", desc: "Latest announcements and news", to: "/news", color: "bg-orange-50 text-orange-600" },
  { icon: HandHeart, label: "Donate Now", desc: "Support our mission and make a difference", to: "/get-involved", color: "bg-rose-50 text-rose-600" },
] as const;

const stats = [
  { icon: Users, value: "1.2M+", label: "Bhutanese Benefited", desc: "Through essential medicines and vaccines" },
  { icon: Pill, value: "120+", label: "Essential Medicines", desc: "Financed for primary healthcare" },
  { icon: ShieldCheck, value: "100%", label: "Equitable Access", desc: "Across all dzongkhags of Bhutan" },
  { icon: Sparkles, value: "Trusted", label: "For a Healthier Bhutan", desc: "Transparency. Accountability. Sustainability." },
] as const;

const news = [
  { img: newsVaccine, title: "BHTF supports nationwide influenza vaccination program", date: "May 10, 2024" },
  { img: newsCommunity, title: "Strengthening primary healthcare across Bhutan", date: "May 02, 2024" },
  { img: newsReport, title: "BHTF Annual Report 2023 is now available", date: "Apr 28, 2024" },
];

function Index() {
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={hero} alt="" width={1920} height={1024} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-32 md:pt-24 md:pb-40">
          <p className="text-secondary font-semibold mb-3">Healthy People. Stronger Bhutan.</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight max-w-2xl">
            Building a Healthier Bhutan Through Trust & Equity
          </h1>
          <p className="mt-6 text-base md:text-lg text-foreground/80 max-w-xl">
            Bhutan Health Trust Fund finances essential medicines and vaccines to strengthen primary healthcare and protect the well-being of every Bhutanese.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/about" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition shadow-lg">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/our-work" className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-md font-semibold hover:bg-primary/5 transition">
              Our Impact <BarChart3 className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="relative -mt-20 z-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickLinks.map((q) => (
              <Link key={q.label} to={q.to} className="group flex flex-col items-center text-center gap-3 p-3 rounded-lg hover:bg-muted transition">
                <div className={`h-14 w-14 rounded-full grid place-items-center ${q.color}`}>
                  <q.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-semibold text-foreground group-hover:text-primary">{q.label}</div>
                  <p className="text-xs text-muted-foreground mt-1">{q.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-12 mx-auto max-w-7xl px-4">
        <div className="bg-primary text-white rounded-xl p-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-full bg-white/15 grid place-items-center shrink-0">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="font-semibold text-sm">{s.label}</div>
                <p className="text-xs opacity-80 mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* News + Events */}
      <section className="mt-16 mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-primary">Latest News & Announcements</h2>
            <Link to="/news" className="text-sm text-secondary font-semibold hover:underline">View All</Link>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {news.map((n) => (
              <article key={n.title} className="group">
                <div className="aspect-video overflow-hidden rounded-md mb-3">
                  <img src={n.img} alt={n.title} loading="lazy" width={800} height={600} className="h-full w-full object-cover group-hover:scale-105 transition" />
                </div>
                <h3 className="font-semibold text-sm text-primary leading-snug group-hover:underline">{n.title}</h3>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><Calendar className="h-3 w-3" /> {n.date}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-primary">Upcoming Events</h2>
            <Link to="/news" className="text-sm text-secondary font-semibold hover:underline">View All</Link>
          </div>
          <div className="flex gap-4">
            <div className="text-center bg-secondary text-white rounded-md px-3 py-2 shrink-0 self-start">
              <div className="text-[10px] font-semibold uppercase">May</div>
              <div className="text-xl font-bold">15</div>
            </div>
            <div>
              <h3 className="font-semibold text-primary">World Health Assembly Side Event</h3>
              <p className="text-sm text-muted-foreground mt-1">Promoting equitable access to essential medicines for resilient health systems.</p>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1"><MapPin className="h-3 w-3" /> Thimphu, Bhutan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mt-16 mx-auto max-w-7xl px-4">
        <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Our Partner Organizations</h2>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-primary font-bold text-lg opacity-70">
          {["WHO", "UNICEF", "The World Bank", "Gavi", "USAID", "UNDP"].map((p) => (
            <span key={p} className="hover:opacity-100 transition">{p}</span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-20 mx-auto max-w-7xl px-4">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-10 md:p-14 text-center text-white">
          <Lock className="h-10 w-10 mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Join us in building a healthier Bhutan</h2>
          <p className="opacity-90 max-w-2xl mx-auto mb-6">Your contribution helps finance essential medicines and vaccines for every Bhutanese, today and for generations to come.</p>
          <Link to="/get-involved" className="inline-flex items-center gap-2 bg-secondary text-white px-7 py-3 rounded-md font-semibold hover:bg-secondary/90">
            Donate Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
