import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import {
  FileText,
  Download,
  Search,
  Sparkles,
  BookOpen,
  Share2,
  Syringe,
  Heart,
  Eye,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/resources/advocacy")({
  head: () => ({
    meta: [
      { title: "Advocacy Materials & Public Health Literacy | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official advocacy publications, vaccine campaign toolkits, primary healthcare brochures, and community health literacy kits from BHTF.",
      },
    ],
  }),
  component: AdvocacyMaterialsPage,
});

interface AdvocacyItem {
  id: string;
  title: string;
  category: "Campaigns" | "Immunization" | "Health Literacy" | "Institutional";
  format: string;
  size: string;
  pages: number;
  year: string;
  description: string;
  highlights: string[];
  coverGradient: string;
  downloadUrl: string;
}

const advocacyArchive: AdvocacyItem[] = [
  {
    id: "adv-01",
    title: "National Cervical Cancer Elimination: HPV Vaccine Advocacy Toolkit",
    category: "Immunization",
    format: "PDF Document",
    size: "4.8 MB",
    pages: 28,
    year: "2024",
    description:
      "Strategic communication roadmap, adolescent counseling protocols, and community dialogue guidelines supporting Bhutan's 97.4% nationwide HPV vaccine uptake.",
    highlights: ["WHO SAGE Alignment", "School-Based Health Mobilization", "Community Q&A Guide"],
    coverGradient: "from-emerald-700 to-teal-900",
    downloadUrl: "#",
  },
  {
    id: "adv-02",
    title: "Alpine Cold Chain Stewardship: Preserving Vaccine Potency to the Last Mile",
    category: "Campaigns",
    format: "PDF Document",
    size: "3.6 MB",
    pages: 36,
    year: "2024",
    description:
      "Visual technical guide explaining solar direct drive refrigeration, high-altitude temperature monitoring, and horse-pack vaccine transport across Lunana and Laya.",
    highlights: ["Solar Direct Drive Specs", "20 Dzongkhags Route Map", "UNICEF Cold Chain Standard"],
    coverGradient: "from-blue-700 to-slate-900",
    downloadUrl: "#",
  },
  {
    id: "adv-03",
    title: "Universal Health Guarantee: The Royal Vision of Sustainable Health Financing",
    category: "Institutional",
    format: "PDF Document",
    size: "6.2 MB",
    pages: 44,
    year: "2023",
    description:
      "Commemorative institutional brochure documenting the statutory 1:1 RGOB matching mechanism, Nu. 4.8B endowment preservation rule, and free healthcare mandate.",
    highlights: ["Royal Charter 2000 Principles", "1:1 Sovereign Match Formula", "Generational Equity"],
    coverGradient: "from-amber-600 to-amber-950",
    downloadUrl: "#",
  },
  {
    id: "adv-04",
    title: "Essential Medicines Formulary Companion: 438 Modern & 110 Traditional Formulations",
    category: "Health Literacy",
    format: "PDF Document",
    size: "5.1 MB",
    pages: 52,
    year: "2024",
    description:
      "Comprehensive clinical guide for Primary Health Units (BHUs) outlining the 438 essential drugs and 65 core gSo-ba Rig-pa traditional remedies 100% financed by BHTF.",
    highlights: ["National Essential Drug List (NEDL)", "gSo-ba Rig-pa Formulary", "Stockout Zero Protocol"],
    coverGradient: "from-teal-700 to-emerald-950",
    downloadUrl: "#",
  },
  {
    id: "adv-05",
    title: "Seasonal Influenza Protection for Vulnerable Populations: Community Flyer & Poster Set",
    category: "Campaigns",
    format: "Print-Ready Pack",
    size: "8.4 MB",
    pages: 12,
    year: "2024",
    description:
      "Dzongkha and English bi-lingual campaign kit designed for district hospitals, monks, pregnant mothers, and elderly citizens across all 20 Dzongkhags.",
    highlights: ["Bilingual Dzongkha/English", "High-Resolution Print Files", "Clinical Triage Poster"],
    coverGradient: "from-rose-700 to-slate-950",
    downloadUrl: "#",
  },
  {
    id: "adv-06",
    title: "Gross National Happiness & Health Equity: Fiduciary Stewardship Monograph",
    category: "Institutional",
    format: "Research Monograph",
    size: "3.2 MB",
    pages: 32,
    year: "2023",
    description:
      "Analytical monograph on how dedicated sovereign endowment funds protect vulnerable mountain populations against global supply chain shocks.",
    highlights: ["Macroeconomic Case Study", "Health Security Analysis", "SDG 3 Indicator Tracker"],
    coverGradient: "from-purple-800 to-slate-950",
    downloadUrl: "#",
  },
];

function AdvocacyMaterialsPage() {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "All Advocacy Kits" },
    { id: "Immunization", label: "Vaccines & Cold Chain" },
    { id: "Campaigns", label: "Field Campaigns" },
    { id: "Health Literacy", label: "Health Literacy" },
    { id: "Institutional", label: "Institutional & Royal Charter" },
  ];

  const filtered = advocacyArchive.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = selectedCat === "ALL" || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleDownload = (item: AdvocacyItem) => {
    toast.success(`Preparing "${item.title}" for download...`);
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3] min-h-screen">
      <PageHero
        badge="Official Publications & Toolkits"
        title="Advocacy Materials & Health Literacy Kits"
        subtitle="Public campaign literature, immunization toolkits, clinical formulary guides, and institutional resources published by the Bhutan Health Trust Fund."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Resources", to: "/resources" },
          { label: "Advocacy Materials" },
        ]}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 relative" data-bhtf-section="advocacy-archive">
        <SectionEditBadge
          label="Advocacy Publications"
          pageSlug="resources-advocacy"
          sectionId="advocacy-archive"
          studioHref="/admin/reports"
          initialData={{
            title: "Advocacy Materials & Health Literacy Kits",
            subtitle: "Public campaign literature, immunization toolkits, clinical formulary guides, and institutional resources published by the Bhutan Health Trust Fund.",
            badge: "Official Publications & Toolkits",
          }}
        />
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search advocacy publications..."
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

        {/* Advocacy Publication Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Cover Banner */}
                <div className={`p-6 bg-gradient-to-br ${item.coverGradient} text-white space-y-3 relative overflow-hidden`}>
                  <div className="flex items-center justify-between text-[11px] font-mono opacity-80">
                    <span className="uppercase font-bold tracking-wider">{item.category}</span>
                    <span>{item.year}</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold leading-snug group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-mono text-slate-200">
                    <span>{item.format}</span>
                    <span>•</span>
                    <span>{item.pages} Pages</span>
                    <span>•</span>
                    <span>{item.size}</span>
                  </div>
                </div>

                {/* Description Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {item.description}
                  </p>

                  {/* Highlights Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Key Highlights
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                <button
                  onClick={() => handleDownload(item)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#0B4F42] hover:bg-[#083b32] text-white text-xs font-bold shadow-xs transition cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Publication ({item.size})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
