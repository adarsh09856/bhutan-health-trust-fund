import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  Megaphone,
  FileText,
  Download,
  Search,
  Calendar,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/news/announcements")({
  head: () => ({
    meta: [
      { title: "Official Announcements & Board Circulars | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official public notices, Board of Trustees resolutions, procurement circulars, and executive press releases from the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: AnnouncementsPage,
});

interface AnnouncementRecord {
  id: string;
  refCode: string;
  title: string;
  category: "Board Resolution" | "Public Notice" | "Procurement Notice" | "Tax & Legal";
  date: string;
  isUrgent?: boolean;
  summary: string;
  content: string[];
  fileSize?: string;
  authority: string;
}

const officialAnnouncements: AnnouncementRecord[] = [
  {
    id: "ann-2025-01",
    refCode: "BHTF/SEC/RES/2025/12",
    title: "Board of Trustees Resolution: Approval of FY 2025–2026 National Medicine Allocations",
    category: "Board Resolution",
    date: "October 01, 2025",
    isUrgent: true,
    summary:
      "The Board of Trustees formally approves the disbursement ceiling of Nu. 557.734 Million for the procurement of 438 essential modern medicines, 110 traditional remedies, and four routine vaccines.",
    content: [
      "In its 48th statutory session, the Board of Trustees ratified the quarterly Window Financing schedule submitted by the Ministry of Health.",
      "100% of funding is generated from endowment investments with zero impairment of the core Nu. 4.8B ring-fenced principal.",
      "Priority procurement authorization granted for alpine solar cold-chain replacements across northern district hospitals.",
    ],
    fileSize: "1.4 MB",
    authority: "Board of Trustees Secretariat",
  },
  {
    id: "ann-2025-02",
    refCode: "DRC/TAX-A&L/DO-16/399-VERIF",
    title: "Public Advisory: 5% Corporate & Personal Income Tax Deductibility for BHTF Contributions",
    category: "Tax & Legal",
    date: "September 15, 2025",
    summary:
      "Guidance for corporate donors and citizens claiming statutory tax deductions under Income Tax Act Section 44 and Royal Charter Article 7.8.",
    content: [
      "All direct donations to the Bhutan Health Trust Fund qualify for up to 5% taxable income deduction upon presentation of official BHTF receipt.",
      "Every Nu. 1 contributed by private benefactors is matched 1:1 by the Royal Government of Bhutan directly into the endowment principal.",
      "Digital tax receipts can be instantly verified through the BHTF Donation Tracking Portal.",
    ],
    fileSize: "850 KB",
    authority: "Department of Revenue & Customs / BHTF Legal",
  },
  {
    id: "ann-2025-03",
    refCode: "BHTF/PROC/PQ-2025/08",
    title: "Annual International Prequalification Notice: WHO-Prequalified Essential Pharmaceuticals",
    category: "Procurement Notice",
    date: "August 20, 2025",
    summary:
      "Notification inviting international pharmaceutical manufacturers and authorized distributors to submit prequalification dossiers for 2026–2027 drug supplies.",
    content: [
      "Strict compliance with WHO Good Manufacturing Practice (GMP) and Certificate of Pharmaceutical Product (CPP) required.",
      "All submissions must adhere to the Department of Medical Supplies (DMS) cold-chain transit criteria.",
      "Bidding documents are downloadable directly from the BHTF Public Procurement Registry.",
    ],
    fileSize: "2.1 MB",
    authority: "Procurement & Program Division",
  },
  {
    id: "ann-2025-04",
    refCode: "BHTF/PUB/COMM-2025/04",
    title: "Public Health Assurance: Zero Out-of-Pocket Cost for Essential Medicines at All Gewog BHUs",
    category: "Public Notice",
    date: "July 10, 2025",
    summary:
      "Reaffirmation of the Universal Healthcare Guarantee enacted by His Majesty the Fourth Druk Gyalpo: all basic health unit services and essential drugs remain free.",
    content: [
      "No citizen shall ever be charged for essential formulary medications or routine childhood immunizations at any public healthcare facility.",
      "Any facility reporting localized inventory deficits must activate the 24-Hour BHTF Emergency Buffer Requisition Protocol.",
    ],
    fileSize: "620 KB",
    authority: "Executive Directorate",
  },
];

function AnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "All Announcements" },
    { id: "Board Resolution", label: "Board Resolutions" },
    { id: "Public Notice", label: "Public Notices" },
    { id: "Procurement Notice", label: "Procurement Notices" },
    { id: "Tax & Legal", label: "Tax & Legal Guidance" },
  ];

  const filtered = officialAnnouncements.filter((ann) => {
    const matchesSearch =
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.refCode.toLowerCase().includes(search.toLowerCase()) ||
      ann.summary.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCat === "ALL" || ann.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDownloadNotice = (ann: AnnouncementRecord) => {
    toast.success(`Downloading official notice: "${ann.refCode}.pdf"...`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Official Public Gazette"
        title="Official Announcements & Board Circulars"
        subtitle="Authoritative circulars, ministerial notifications, Board of Trustees resolutions, and statutory compliance advisories."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "News & Events", to: "/news" },
          { label: "Announcements" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="announcements-gazette">
        <SectionEditBadge
          label="Announcements Gazette"
          pageSlug="news-announcements"
          sectionId="announcements-gazette"
          studioHref="/admin/news"
          initialData={{
            title: "Official Announcements & Board Circulars",
            subtitle: "Authoritative circulars, ministerial notifications, Board of Trustees resolutions, and statutory compliance advisories.",
            badge: "Official Public Gazette",
          }}
        />
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements or reference numbers..."
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

        {/* Announcements List */}
        <div className="space-y-6">
          {filtered.map((ann) => (
            <div
              key={ann.id}
              className={`bg-white rounded-3xl border p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 space-y-5 ${
                ann.isUrgent ? "border-amber-400/80 ring-1 ring-amber-400/30" : "border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  {ann.isUrgent && (
                    <span className="px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-mono flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>Priority Circular</span>
                    </span>
                  )}
                  <span className="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700">
                    Ref: {ann.refCode}
                  </span>
                  <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                    {ann.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{ann.date}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {ann.summary}
                </p>

                {/* Key Points Bullet List */}
                <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    Executive Points
                  </span>
                  {ann.content.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
                <div className="text-slate-500 font-sans">
                  Issued by: <span className="font-bold text-slate-800">{ann.authority}</span>
                </div>

                {ann.fileSize && (
                  <button
                    onClick={() => handleDownloadNotice(ann)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Official PDF ({ann.fileSize})</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
