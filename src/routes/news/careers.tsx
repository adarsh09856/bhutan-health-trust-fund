import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  Briefcase,
  Download,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Mail,
  FileText,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/news/careers")({
  head: () => ({
    meta: [
      { title: "Career Opportunities & Consultancies | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official employment opportunities, consultancy tenders, and fellowships at the Bhutan Health Trust Fund Secretariat in Thimphu.",
      },
    ],
  }),
  component: CareersPage,
});

interface CareerOpening {
  id: string;
  title: string;
  division: string;
  employmentType: "Permanent Cadre" | "Fixed-Term Contract" | "Consultancy Tender";
  slots: number;
  gradePay: string;
  deadline: string;
  location: string;
  status: "OPEN" | "SHORTLISTING" | "CLOSED";
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  torFileSize: string;
}

const careerOpeningsList: CareerOpening[] = [
  {
    id: "car-2025-01",
    title: "Senior Cold Chain & Logistics Technical Specialist",
    division: "Programme Division",
    employmentType: "Fixed-Term Contract",
    slots: 1,
    gradePay: "Competitive Trust Fund Executive Scale",
    deadline: "November 30, 2025",
    location: "BHTF Secretariat, Thimphu (with Alpine Field Visits)",
    status: "OPEN",
    summary:
      "Lead technical monitoring of alpine solar-direct-drive refrigeration networks, WHO vaccine potency protocols, and emergency medical logistics across remote gewogs.",
    responsibilities: [
      "Conduct regular performance audits of solar cold chain units in northern high-altitude BHUs.",
      "Liaise with UNICEF Supply Division and Ministry of Health cold chain engineers.",
      "Develop training modules for district pharmacy and cold chain handlers.",
    ],
    qualifications: [
      "Master's Degree in Biomedical Engineering, Public Health Logistics, or Supply Chain Management.",
      "Minimum 5 years of verified professional experience in pharmaceutical cold-chain systems.",
      "Willingness to travel to alpine outreach centers (Lunana, Laya, Lingzhi).",
    ],
    torFileSize: "1.2 MB",
  },
  {
    id: "car-2025-02",
    title: "IT Systems & Financial Management Database Administrator",
    division: "Administration & Finance Division",
    employmentType: "Permanent Cadre",
    slots: 1,
    gradePay: "BHTF Grade 4 Scale + Sovereign Allowances",
    deadline: "December 15, 2025",
    location: "BTFEC Building, Genyen Lam, Thimphu",
    status: "OPEN",
    summary:
      "Administer the BHTF core Financial Management System (FMS), sovereign ledger databases, public donation portals, and statutory security backups.",
    responsibilities: [
      "Ensure 99.9% uptime of BHTF financial database servers and cloud backup mirrors.",
      "Implement multi-tier cryptographic security for donor records and RAA audit logs.",
      "Maintain automated synchronization between RMA BFS payment gateways and local ledgers.",
    ],
    qualifications: [
      "B.Tech / B.Sc in Computer Science, Information Technology, or Software Systems.",
      "Proficiency with PostgreSQL, TypeScript, Linux system administration, and network security.",
      "Clear Royal Audit Authority (RAA) and Royal Civil Service Commission (RCSC) background record.",
    ],
    torFileSize: "980 KB",
  },
  {
    id: "car-2025-03",
    title: "Health Economics & Endowment Portfolio Research Fellow",
    division: "Investment Management Division",
    employmentType: "Consultancy Tender",
    slots: 1,
    gradePay: "Honorarium Benchmark Scale",
    deadline: "January 10, 2026",
    location: "Thimphu (Hybrid Allowed)",
    status: "OPEN",
    summary:
      "Conduct macroeconomic research analyzing long-term pharmaceutical price inflation, multi-currency treasury yields, and endowment spending rule sustainability.",
    responsibilities: [
      "Model 10-year drug consumption scenarios under Gross National Happiness health priorities.",
      "Benchmark BHTF asset allocation against global sovereign health endowments.",
      "Deliver quarterly research briefings to the Asset Management Committee (AMC).",
    ],
    qualifications: [
      "Post-graduate degree in Economics, Quantitative Finance, or Actuarial Sciences.",
      "Demonstrated publication record or advisory experience in sovereign health financing.",
    ],
    torFileSize: "1.5 MB",
  },
];

function CareersPage() {
  const [selectedDivision, setSelectedDivision] = useState<string>("ALL");

  const divisions = [
    { id: "ALL", label: "All Vacancies" },
    { id: "Programme Division", label: "Programme Division" },
    { id: "Administration & Finance Division", label: "Administration & Finance" },
    { id: "Investment Management Division", label: "Investment Division" },
  ];

  const filtered = careerOpeningsList.filter((job) => {
    return selectedDivision === "ALL" || job.division === selectedDivision;
  });

  const handleDownloadTOR = (job: CareerOpening) => {
    toast.success(`Downloading Terms of Reference (TOR) for "${job.title}"...`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Join Our Mission"
        title="Careers & Consultancies"
        subtitle="Contribute your professional expertise to safeguarding sustainable health financing for every citizen across the Kingdom of Bhutan."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "News & Events", to: "/news" },
          { label: "Careers" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="career-opportunities">
        <SectionEditBadge
          label="Career Opportunities & Cadres"
          pageSlug="news-careers"
          sectionId="career-opportunities"
          studioHref="/admin/news"
          initialData={{
            title: "Careers & Consultancies",
            subtitle: "Contribute your professional expertise to safeguarding sustainable health financing for every citizen across the Kingdom of Bhutan.",
            badge: "Join Our Mission",
          }}
        />
        {/* Equal Opportunity Commitment */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-700 grid place-items-center shrink-0 border border-teal-200">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-800 font-bold">
                Autonomous Statutory Employer
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
                Equal Opportunity & Meritocracy
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl leading-relaxed">
                The Bhutan Health Trust Fund Secretariat is an autonomous institution offering competitive civil service-aligned remuneration packages, specialized training, and high-impact national service.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200 px-4 py-3 rounded-2xl shrink-0">
            <Mail className="h-4 w-4 text-emerald-700" />
            <span>Applications: bhtf@bhtf.bt</span>
          </div>
        </div>

        {/* Division Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {divisions.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedDivision(d.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedDivision === d.id
                  ? "bg-[#0B4F42] text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Career Cards */}
        <div className="space-y-6">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs hover:shadow-lg transition-all duration-300 space-y-6 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {job.division}
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-xs font-mono text-slate-600 bg-slate-100">
                      {job.employmentType} • {job.slots} Slot{job.slots > 1 ? "s" : ""}
                    </span>
                    <span className="px-3 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                      Apply by: {job.deadline}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                    {job.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-sans">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{job.gradePay}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadTOR(job)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0B4F42] hover:bg-[#083b32] text-white text-xs font-bold shadow-xs hover:shadow-md transition shrink-0 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Terms of Reference ({job.torFileSize})</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                {job.summary}
              </p>

              {/* Responsibilities & Qualifications 2-col */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Core Key Responsibilities
                  </span>
                  <div className="space-y-2">
                    {job.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Required Minimum Qualifications
                  </span>
                  <div className="space-y-2">
                    {job.qualifications.map((qual, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{qual}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                <div>
                  Submit CV, CID copy & academic transcripts to: <strong className="text-slate-800 font-mono">bhtf@bhtf.bt</strong>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  BHTF Secretariat Recruitment Ref: {job.id.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
