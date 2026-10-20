import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Users,
  Search,
  ArrowRight,
  CheckCircle2,
  Bell,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/news/events")({
  head: () => ({
    meta: [
      { title: "Upcoming Events & National Health Symposia | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official calendar of upcoming vaccine rollout campaigns, donor roundtables, primary healthcare symposiums, and national health commemorations.",
      },
    ],
  }),
  component: UpcomingEventsPage,
});

interface EventItem {
  id: string;
  title: string;
  category: "Campaign" | "Roundtable" | "Symposium" | "Governance";
  date: string;
  time: string;
  venue: string;
  dzongkhag: string;
  status: "UPCOMING" | "REGISTRATION_OPEN" | "SCHEDULED";
  excerpt: string;
  agenda: string[];
  isFeatured?: boolean;
}

const upcomingEventsList: EventItem[] = [
  {
    id: "evt-01",
    title: "11 November 2026: BHTF Day",
    category: "Governance",
    date: "November 11, 2026",
    time: "09:00 AM – 04:00 PM (BTT)",
    venue: "Thimphu & Nationwide Health Facilities",
    dzongkhag: "Thimphu & Nationwide",
    status: "SCHEDULED",
    isFeatured: true,
    excerpt:
      "Commemorating BHTF Day and celebrating the enduring sovereign vision to protect lives and safeguard the health of present and future generations of Bhutan.",
    agenda: [
      "Commemoration of BHTF Day and Royal Charter Founding Vision",
      "Annual Health Solidarity and Sovereign Matching Report",
      "Honoring Community Contributors & Partner Healthcare Workers",
    ],
  },
  {
    id: "evt-02",
    title: "17 December 2026: Crowd fundraising with the Royal Securities Exchange of Bhutan",
    category: "Campaign",
    date: "December 17, 2026",
    time: "10:00 AM – 04:30 PM (BTT)",
    venue: "Royal Securities Exchange of Bhutan (RSEB) & National Portal",
    dzongkhag: "Thimphu",
    status: "SCHEDULED",
    isFeatured: true,
    excerpt:
      "Crowd fundraising initiative in collaboration with the Royal Securities Exchange of Bhutan (RSEB) to mobilize public, corporate, and institutional health solidarity.",
    agenda: [
      "Launch of National Health Crowd Fundraising Platform with RSEB",
      "Corporate Philanthropic and Employee Contribution Drives",
      "Live Digital Dashboard Demonstrating 1:1 RGOB Sovereign Match",
    ],
  },
  {
    id: "evt-03",
    title: "Nationwide Seasonal Influenza Vaccination Campaign",
    category: "Campaign",
    date: "November 15, 2026",
    time: "09:00 AM – 04:00 PM (BTT)",
    venue: "National Launch: JDWNRH & All District Hospitals",
    dzongkhag: "Nationwide (All 20 Dzongkhags)",
    status: "SCHEDULED",
    isFeatured: false,
    excerpt:
      "BHTF finances and launches the annual nationwide influenza immunization campaign deploying vaccine doses targeting high-risk citizens, monks, elderly, and healthcare workers.",
    agenda: [
      "Ministerial keynote by Hon'ble Health Minister",
      "Demonstration of Cold Chain logistics storage",
      "Immediate rollout to Primary Health Centres",
    ],
  },
  {
    id: "evt-04",
    title: "World Immunization Week: Sustaining 98% Routine Vaccine Coverage",
    category: "Campaign",
    date: "April 24, 2026",
    time: "10:00 AM – 02:00 PM (BTT)",
    venue: "Clock Tower Square & District Health Centers",
    dzongkhag: "Thimphu & All Districts",
    status: "SCHEDULED",
    excerpt:
      "Public health commemoration celebrating Bhutan's world-leading child vaccination coverage, cervical cancer elimination strides, and community health worker dedications.",
    agenda: [
      "Public health awareness walk and mobile clinic stations",
      "Student essay & poster competition awards ceremony",
      "Community health volunteer recognition certificates",
    ],
  },
];

function UpcomingEventsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "All Events" },
    { id: "Campaign", label: "Vaccine Campaigns" },
    { id: "Roundtable", label: "Donor Roundtables" },
    { id: "Symposium", label: "Technical Symposia" },
  ];

  const filtered = upcomingEventsList.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(search.toLowerCase()) ||
      evt.venue.toLowerCase().includes(search.toLowerCase()) ||
      evt.dzongkhag.toLowerCase().includes(search.toLowerCase()) ||
      evt.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "ALL" || evt.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const featured = filtered.find((e) => e.isFeatured) || filtered[0];
  const regular = filtered.filter((e) => e !== featured);

  const handleRegister = (evt: EventItem) => {
    toast.success(`Inquiry sent for "${evt.title}". Secretariat will share attendance details.`);
  };

  return (
    <div className="public-editorial-page space-y-12 sm:space-y-16 pb-20 min-h-screen">
      <PageHero
        badge="Official Event Calendar"
        title="Upcoming Events & National Health Commemorations"
        subtitle="Key dates for nationwide vaccine rollouts, statutory donor roundtables, technical cold chain symposia, and public health campaigns."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "News & Events", to: "/news" },
          { label: "Upcoming Events" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="events-calendar">
        <SectionEditBadge
          label="Upcoming Events Calendar"
          pageSlug="news-events"
          sectionId="events-calendar"
          studioHref="/admin/news"
          initialData={{
            title: "Upcoming Events & National Health Commemorations",
            subtitle: "Key dates for nationwide vaccine rollouts, statutory donor roundtables, technical cold chain symposia, and public health campaigns.",
            badge: "Official Event Calendar",
          }}
        />
        {/* Search & Filter */}
        <div className="editorial-card p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search upcoming events..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 focus:border-[#00A896]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCat(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCat === c.id
                    ? "bg-[#0B4F42] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Keynote Event */}
        {featured && (
          <div className="bg-gradient-to-br from-slate-900 via-[#071914] to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-emerald-500/30 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 font-mono">
                Keynote Upcoming Event
              </span>
              <span className="text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                <Bell className="h-3.5 w-3.5" />
                <span>{featured.status.replace("_", " ")}</span>
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white leading-snug">
                {featured.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-3xl">
                {featured.excerpt}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
              <div className="flex items-center gap-3 text-slate-200">
                <Calendar className="h-4 w-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">{featured.date}</div>
                  <div className="text-[11px] text-slate-400">{featured.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-200">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                <div>
                  <div className="font-bold text-white">{featured.venue}</div>
                  <div className="text-[11px] text-slate-400">{featured.dzongkhag}</div>
                </div>
              </div>

              <div className="flex sm:justify-end items-center">
                <button
                  onClick={() => handleRegister(featured)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-black text-xs shadow-md hover:scale-105 transition cursor-pointer"
                >
                  Register / Inquire →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Events Grid */}
        <div className="event-register">
          {regular.map((evt) => (
            <div
              key={evt.id}
              className="editorial-card p-6 sm:p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    {evt.category}
                  </span>
                  <span className="text-slate-400">{evt.dzongkhag}</span>
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {evt.excerpt}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <Calendar className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                    <span className="font-semibold">{evt.date}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-500 text-[11px]">{evt.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-700">
                    <MapPin className="h-3.5 w-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">{evt.venue}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleRegister(evt)}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                <span>Event Details & Secretariat Registration</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
