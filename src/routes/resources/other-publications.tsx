import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  FileText,
  Download,
  Search,
  BookOpen,
  Calendar,
  CheckCircle2,
  Layers,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/resources/other-publications")({
  head: () => ({
    meta: [
      { title: "Other Publications & Research Reports | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official publications, research surveys, baseline studies, and technical publications published by the Bhutan Trust Fund.",
      },
    ],
  }),
  component: OtherPublicationsPage,
});

interface PublicationRecord {
  id: string;
  title: string;
  category: string;
  year: string;
  fileSize: string;
  downloadUrl: string;
  description: string;
}

const publicationsArchive: PublicationRecord[] = [
  {
    id: "pub-01",
    title: "A Review Report on Satong and Gungtong (June 2024)",
    category: "Policy Study",
    year: "2024",
    fileSize: "5.4 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/09/Final_Report_on_satong_and_gungtong-june-2024.pdf",
    description: "In-depth research and comprehensive review assessing the socioeconomic drivers, rural dynamics, and policy interventions related to satong and gungtong in Bhutan.",
  },
  {
    id: "pub-02",
    title: "Distribution and Conservation Threats of Bhutan Takin (2016)",
    category: "Species Conservation",
    year: "2016",
    fileSize: "4.1 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/09/Distribution-and-Conservation-Threats-Of-Bhutan-Takin-in-Wangchuck-Centennial-National-Park-Bumthang-WCNP-.pdf",
    description: "Ecological field survey documenting habitat distribution, migratory corridors, and anthropogenic pressures on the national animal in Wangchuck Centennial National Park.",
  },
  {
    id: "pub-03",
    title: "National Snow Leopard Survey of Bhutan (2014–2016) — Phase II",
    category: "Ecological Survey",
    year: "2016",
    fileSize: "8.2 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/12/National-Snow-Leopard-Survey-of-Bhutan-2014-2016-Phase-II-Camera-Trap-Survey-for-Population-Estimation-DoFPS.pdf",
    description: "Camera-trap population estimation across alpine zones and high-altitude habitats conducted in coordination with the Department of Forests & Park Services.",
  },
  {
    id: "pub-04",
    title: "National Elephant Survey Report (2018)",
    category: "Wildlife Assessment",
    year: "2018",
    fileSize: "6.5 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/09/National-Elephant-Survey-Report-DoFPS.pdf",
    description: "Nationwide Asian elephant census, transboundary corridor assessment, and human-wildlife coexistence strategies across the southern biological corridors.",
  },
  {
    id: "pub-05",
    title: "Rangeland Areas of Bhutan (2017)",
    category: "Cartographic Survey",
    year: "2017",
    fileSize: "7.9 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/09/Rangeland-Map-of-Bhutan_final.pdf",
    description: "Highland pastoral zoning, geospatial mapping of high-altitude grazing grounds, and community rangeland management frameworks.",
  },
  {
    id: "pub-06",
    title: "A Decade of Transformation (2010–2020)",
    category: "Institutional Milestone",
    year: "2020",
    fileSize: "11.3 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/09/A-Decade-of-Transforation-2010-2020.pdf",
    description: "Comprehensive institutional retrospective examining ten years of trust fund capitalization, programmatic disbursements, and community impact.",
  },
  {
    id: "pub-07",
    title: "25 Years of Environmental Conservation in Bhutan (1992–2017)",
    category: "Historical Archive",
    year: "2017",
    fileSize: "14.8 MB",
    downloadUrl: "https://bhutantrustfund.bt/wp-content/uploads/2025/09/years-of-Environmental-Conservation-in-Bhutan-1992-2017.pdf",
    description: "Silver jubilee archival publication chronicling the establishment, sovereign partnership milestones, and foundational conservation grants since 1992.",
  },
];

function OtherPublicationsPage() {
  const [search, setSearch] = useState("");

  const filtered = publicationsArchive.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.year.includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const handleDownload = (pub: PublicationRecord) => {
    toast.success(`Opening "${pub.title}"...`);
    window.open(pub.downloadUrl, "_blank");
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Official Publications Repository"
        title="Other Publications"
        subtitle="Explore official publications, field surveys, strategic retrospectives, and baseline studies published by the Bhutan Trust Fund."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Other Publications" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="other-publications-register">
        <SectionEditBadge
          label="Other Publications Archive"
          pageSlug="resources-other-publications"
          sectionId="other-publications-register"
          studioHref="/admin/reports"
          initialData={{
            title: "Other Publications",
            subtitle: "Explore official publications, field surveys, strategic retrospectives, and baseline studies published by the Bhutan Trust Fund.",
            badge: "Official Publications Repository",
          }}
        />

        {/* Search Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search publications..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#00A896]/30 focus:border-[#00A896]"
            />
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filtered.length}</strong> official publications
          </div>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                    {pub.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" /> {pub.year}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug line-clamp-2">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light line-clamp-3">
                    {pub.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                <span className="text-xs font-mono text-slate-400">{pub.fileSize} • PDF</span>
                <a
                  href={pub.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#0B4F42] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
