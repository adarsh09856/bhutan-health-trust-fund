import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import {
  getPublicPrograms,
  getPublicProcurementSteps,
  getPublicPage,
} from "@/lib/api/public.functions";
import type { Program, ProcurementStep, PageBlockSection } from "@/lib/db/schema";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

import {
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  Microscope,
  GraduationCap,
  CheckCircle2,
  HandHeart,
  Loader2,
  Quote,
} from "lucide-react";
import { CommodityTracker } from "@/components/commodity-tracker";
import { DzongkhagExplorer } from "@/components/dzongkhag-map";
import photoCubicles from "@/assets/field/bhtf_medicine_cubicles.jpg";
import photoFluVial from "@/assets/field/bhtf_flu_vaccine_vial.jpg";
import photoPharmacist from "@/assets/field/bhtf_pharmacist_inspection.jpg";
import photoCentralStore from "@/assets/field/bhtf_central_store.jpg";
import photoDispensary from "@/assets/field/bhtf_dispensary_pharmacist.jpg";
import photoCitizenGho from "@/assets/field/bhtf_citizen_receiving_medicine.jpg";
import photoMaternalCare from "@/assets/field/bhtf_maternal_child_care.jpg";
import photoPharmacistBanner from "@/assets/field/bhtf_pharmacist_banner.jpg";

export const Route = createFileRoute("/our-work")({
  loader: async () => {
    try {
      const [page, programs, steps] = await Promise.all([
        getPublicPage({ data: { slug: "our-work" } }).catch(() => null),
        getPublicPrograms().catch(() => []),
        getPublicProcurementSteps().catch(() => []),
      ]);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return {
        customSections: sections,
        livePrograms: programs || [],
        liveSteps: steps || [],
      };
    } catch {
      return {
        customSections: null,
        livePrograms: [],
        liveSteps: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Programs & Health Commodities | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Discover how BHTF finances essential medicines, life-saving vaccines, diagnostics, and cold chain logistics across all 20 Dzongkhags of Bhutan.",
      },
    ],
  }),
  component: OurWork,
});

const progIconMap: Record<string, any> = {
  Syringe,
  Pill,
  Microscope,
  HeartPulse,
  ThermometerSnowflake,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
};

const progColors = [
  "bg-blue-50 text-blue-700 border-blue-200",
  "bg-emerald-50 text-emerald-700 border-emerald-200",
  "bg-purple-50 text-purple-700 border-purple-200",
  "bg-rose-50 text-rose-700 border-rose-200",
  "bg-amber-50 text-amber-700 border-amber-200",
  "bg-teal-50 text-teal-700 border-teal-200",
];

export function OurWorkExperience({
  customSections: initialCustomSections,
  livePrograms: initialPrograms = [],
  liveSteps: initialSteps = [],
  pageSlug = "our-work",
}: {
  customSections?: PageBlockSection[] | null;
  livePrograms?: Program[];
  liveSteps?: ProcurementStep[];
  pageSlug?: string;
}) {
  const [livePrograms, setLivePrograms] = useState<Program[]>(initialPrograms);
  const [procurementSteps, setProcurementSteps] = useState<ProcurementStep[]>(initialSteps);
  const [customSections, setCustomSections] = useState<PageBlockSection[] | null>(
    initialCustomSections || null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPublicPage({ data: { slug: pageSlug } })
      .then((page) => {
        if (page && page.status === "published") {
          try {
            const parsed = JSON.parse(page.sectionsJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCustomSections(parsed);
            }
          } catch {}
        }
      })
      .catch(() => {});

    Promise.all([getPublicPrograms().catch(() => []), getPublicProcurementSteps().catch(() => [])])
      .then(([progs, steps]) => {
        if (progs) setLivePrograms(progs);
        if (steps) setProcurementSteps(steps);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);



  const displayPrograms = livePrograms.map((p, idx) => ({
    icon: progIconMap[p.icon] || Pill,
    title: p.title,
    badge: p.status === "ACTIVE" ? "Active Stream" : p.status,
    text: p.summary,
    stats: `${p.targetDzongkhags} • ${p.beneficiariesReached}`,
    color: progColors[idx % progColors.length],
  }));

  const showSection = (id: string) =>
    !customSections ||
    !customSections.some((section) => section.id === id) ||
    customSections.some((section) => section.id === id && section.isVisible);

  return (
    <div className="space-y-12 sm:space-y-16 pb-16 bg-[#FAF8F3]">
      <PageHero
        title="Our Impact"
        subtitle="BHTF sustains free primary healthcare by financing essential medicines and vaccines across Bhutan."
      />

      {/* Official Section 3: Impact & What BHTF Delivers Today */}
      {showSection("today-impact-summary") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="today-impact-summary">
        <SectionEditBadge
          label="What BHTF Delivers Today"
          pageSlug={pageSlug}
          sectionId="today-impact-summary"
          studioHref="/admin/page-editor?slug=our-work"
          initialData={{
            title: "3. Impact — What BHTF delivers today",
            subtitle: "BHTF supports the sustainability of Bhutan’s public healthcare financing.",
            badge: "Section 3 • Impact",
          }}
        />
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Healthcare impact at a glance
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-medium">
              Through prudent financial management, the Fund continues supply of national essential medicines and vaccines and strengthens the long-term sustainability of primary healthcare financing for the people of Bhutan.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200 border-y border-slate-200 bg-white">
            {[
              { value: "438", label: "Essential medicines" },
              { value: "110", label: "Traditional formulations" },
              { value: "4", label: "Routine vaccine programmes" },
              { value: "20", label: "Dzongkhags served" },
            ].map((metric) => (
              <div key={metric.label} className="px-4 py-5 sm:px-6 sm:py-7">
                <div className="font-sans text-2xl sm:text-3xl font-bold text-[#0B4F42]">{metric.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-slate-600">{metric.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>}

      {/* 1. Interactive Health Commodity Streams */}
      {showSection("commodity-tracker") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="commodity-tracker">
        <SectionEditBadge
          label="Commodity Tracker"
          pageSlug={pageSlug}
          sectionId="commodity-tracker"
          studioHref="/admin/programs"
          initialData={{
            title: "Interactive Health Commodity Streams",
            subtitle: "Real-time formulary stock levels and distribution logistics.",
            badge: "Formulary Monitoring",
          }}
        />
        <CommodityTracker />
      </section>}

      {/* 2. Core Commodities Summary Cards */}
      {showSection("commodity-streams") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="commodity-streams">
        <SectionEditBadge
          label="Financed Commodities"
          pageSlug={pageSlug}
          sectionId="commodity-streams"
          studioHref="/admin/programs"
          initialData={{
            title: "Health Commodities Financed by BHTF",
            subtitle: "Every Ngultrum disbursed is earmarked for tangible, life-saving medical supplies that directly benefit patients.",
            badge: "Comprehensive Procurement",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
            Comprehensive Procurement
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            Health Commodities Financed by BHTF
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            Every Ngultrum disbursed is earmarked for tangible, life-saving medical supplies that
            directly benefit patients.
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="h-8 w-8 text-emerald-600 animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-500">
              Loading sovereign commodity programs...
            </p>
          </div>
        ) : displayPrograms.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Pill className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No commodity streams available</h3>
            <p className="text-xs text-slate-500">
              Healthcare commodity allocations are currently being updated by the Secretariat.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayPrograms.map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`h-12 w-12 rounded-xl grid place-items-center border ${p.color}`}
                    >
                      <p.icon className="h-6 w-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {p.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{p.stats}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>}

      {/* Constitutional and Royal mandate */}
      {showSection("sacred-mandate-quotes") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="sacred-mandate-quotes">
        <SectionEditBadge
          label="Sacred Mandate Quotes"
          pageSlug={pageSlug}
          sectionId="sacred-mandate-quotes"
          studioHref="/admin/page-editor?slug=our-work"
          initialData={{
            title: "Guaranteed by Royal Vision and the Constitution",
            subtitle: "Universal healthcare in Bhutan is anchored in the supreme law of the land and the compassion of our Monarchs.",
            badge: "Sacred Constitutional Foundation",
          }}
        />
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quote 1: HM Fourth Druk Gyalpo */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="font-sans text-base sm:text-lg text-slate-900 font-medium italic leading-relaxed">
                  "No Bhutanese should ever have to choose between their health and their livelihood."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900">His Majesty the Fourth Druk Gyalpo</h4>
                  <p className="text-xs text-amber-700 font-medium">Jigme Singye Wangchuck • Royal Charter 2000</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  Royal Decree
                </span>
              </div>
            </div>

            {/* Quote 2: Constitution Article 9 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="font-sans text-base sm:text-lg text-slate-900 font-medium italic leading-relaxed">
                  "The State shall provide free access to basic public health services in both modern and traditional medicines."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900">The Constitution of the Kingdom of Bhutan</h4>
                  <p className="text-xs text-emerald-700 font-medium">Article 9, Section 21 • Principles of State Policy</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  Constitutional Law
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>}

      {/* Routine immunization programmes */}
      {showSection("vaccine-coverage") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="vaccine-coverage">
        <SectionEditBadge
          label="Immunization Coverage"
          pageSlug={pageSlug}
          sectionId="vaccine-coverage"
          studioHref="/admin/programs"
          initialData={{
            title: "Routine Immunization Programmes",
            subtitle: "BHTF supports routine immunization as part of Bhutan’s public healthcare system.",
            badge: "Universal Vaccine Security",
          }}
        />
        <div className="bg-gradient-to-br from-emerald-950 via-[#071F18] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-500/20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/20 pb-6">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
                Routine immunization programmes
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-light">
                BHTF supports vaccine financing for people at different stages of life.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Pentavalent */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <Syringe className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg text-white">Pentavalent Vaccine</h3>
              <p className="text-xs text-slate-300 font-light">
                Protects infants against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.
              </p>
            </div>

            {/* 2. PCV */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <Pill className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="font-bold text-lg text-white">PCV (Pneumococcal)</h3>
              <p className="text-xs text-slate-300 font-light">
                Supports protection against pneumococcal disease, including pneumonia and meningitis.
              </p>
            </div>

            {/* 3. Influenza */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <HeartPulse className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-lg text-white">Seasonal Influenza</h3>
              <p className="text-xs text-slate-300 font-light">
                Seasonal vaccination supports people at increased risk of influenza.
              </p>
            </div>

            {/* 4. HPV */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <Syringe className="h-4 w-4 text-pink-400" />
              </div>
              <h3 className="font-bold text-lg text-white">HPV (Cervical Cancer)</h3>
              <p className="text-xs text-slate-300 font-light">
                Supports cervical cancer prevention through HPV vaccination.
              </p>
            </div>
          </div>
        </div>
      </section>}

      {/* Authentic Field Photography & Cold-Chain Logistics Gallery */}
      {showSection("field-gallery") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="field-gallery">
        <SectionEditBadge
          label="Field Operations & Logistics Gallery"
          pageSlug={pageSlug}
          sectionId="field-gallery"
          studioHref="/admin/media"
          initialData={{
            title: "Authentic Field Operations & Cold-Chain Logistics",
            subtitle: "Real photographic documentation of BHTF-financed medicines, cold-chain vaccines, dispensary logistics, and patient care across Bhutan.",
            badge: "Field Documentation",
          }}
        />
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Field Documentation & Cold-Chain Custody
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Authentic Healthcare Delivery Across the Kingdom
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Real photographic documentation of BHTF-financed medicines, cold-chain vaccines, hospital dispensaries, and clinical services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={photoCubicles} alt="Standardized Medicine Cubicles" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  Essential Drug Storage
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Organized Essential Drug Storage</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Carefully partitioned cubicles housing the 438 essential modern medicines to prevent stockouts and support rapid fulfillment.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={photoFluVial} alt="Influenza Vaccine Cold Chain" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-amber-900/80 backdrop-blur-md text-amber-200 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  Cold-Chain Biologics
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Life-Saving Vaccine Vials</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  WHO-prequalified seasonal influenza and routine childhood vaccines kept at rigorous +2°C to +8°C cold chain temperatures.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={photoPharmacist} alt="Pharmacist Quality Inspection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-emerald-900/80 backdrop-blur-md text-emerald-200 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  Quality Assurance
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Batch Testing & Quality Oversight</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Rigorous physical inspection and DRA regulatory batch verification before dispatch to national referral centers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={photoDispensary} alt="Hospital Dispensary Counter" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-teal-900/80 backdrop-blur-md text-teal-200 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  Hospital Pharmacy
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Dispensary Operations & Patient Care</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Frontline pharmacists dispensing BHTF-financed treatments directly to patients at hospital outpatient pharmacies.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={photoCitizenGho} alt="Citizen Receiving Medication" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-blue-900/80 backdrop-blur-md text-blue-200 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  Constitutional Right
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-sm">100% Free Medication at Point of Care</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Bhutanese citizen receiving prescribed medication at zero out-of-pocket cost, fulfilling Article 9 Section 21.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-card group">
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                <img src={photoCentralStore} alt="Strategic Reserve Storehouse" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-indigo-900/80 backdrop-blur-md text-indigo-200 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                  National Buffer Reserve
                </span>
              </div>
              <div className="p-5 space-y-2">
                <h4 className="font-sans font-bold text-slate-900 text-sm">Strategic Central Medical Storehouse</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  Bulk stockpiles and emergency therapeutic reserves ensuring no health facility runs out of vital supplies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* Procurement information */}
      {showSection("top-medicines") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="top-medicines">
        <SectionEditBadge
          label="Medicines and formulary"
          pageSlug={pageSlug}
          sectionId="top-medicines"
          studioHref="/admin/programs"
          initialData={{
            title: "Essential medicines",
            subtitle: "National essential medicines financed by BHTF.",
            badge: "Medicines",
          }}
        />
        <div className="max-w-3xl border-y border-slate-200 py-6">
          <h2 className="text-2xl font-bold text-slate-900">Essential medicines</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            BHTF finances Bhutan’s national essential medicines and traditional medicine formulations. Current procurement details can be managed through the Programs area in the admin panel.
          </p>
        </div>
      </section>}

      {/* How the Fund is Financed: Two Income Streams & Asset Allocation (Slide 11 & 12 / Screenshots 9 & 10) */}
      {showSection("fund-financing-structure") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="fund-financing-structure">
        <SectionEditBadge
          label="How the Fund is Financed"
          pageSlug={pageSlug}
          sectionId="fund-financing-structure"
          studioHref="/admin/reports"
          initialData={{
            title: "How the Fund Is Financed",
            subtitle: "BHTF combines endowment income with health contributions to support healthcare financing.",
            badge: "Sustainable Health Financing",
          }}
        />
        <div className="max-w-3xl border-y border-slate-200 py-6">
          <h2 className="text-2xl font-bold text-slate-900">How the Fund is financed</h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            The Fund supports its mandate through investment income and health contributions. Its investment strategy follows the 70–20–10 operating model described in the BHTF Investment Strategy Statement.
          </p>
        </div>
      </section>}

      {/* 3. Interactive Nationwide Reach Across 20 Dzongkhags */}
      {showSection("dzongkhag-explorer") && <section className="bg-slate-50 border-y border-slate-200/80 py-12 sm:py-16 relative" data-bhtf-section="dzongkhag-explorer">
        <SectionEditBadge
          label="20 Dzongkhags Explorer"
          pageSlug={pageSlug}
          sectionId="dzongkhag-explorer"
          studioHref="/admin/metrics"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DzongkhagExplorer />
        </div>
      </section>}

      {/* 4. Transparent Procurement Cycle */}
      {showSection("procurement-lifecycle") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="procurement-lifecycle">
        <SectionEditBadge
          label="Procurement Lifecycle"
          pageSlug={pageSlug}
          sectionId="procurement-lifecycle"
          studioHref="/admin/procurement"
          initialData={{
            title: "How BHTF Manages Quality & Procurement",
            subtitle: "Strict WHO prequalification, DRA regulatory clearance, and cold chain verification.",
            badge: "Fiduciary Integrity",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 block mb-2">
            Fiduciary Integrity
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
            How BHTF Manages Quality & Procurement
          </h2>
        </div>

        {procurementSteps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {procurementSteps.map((step, idx) => (
              <div
                key={step.id || idx}
                className="bg-white border border-slate-200 rounded-xl p-5 relative flex flex-col justify-between"
              >
                <div className="relative z-10 space-y-2">
                  <div className="text-xs font-semibold text-emerald-800 mb-3">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>}

      {/* 5. Action Banner */}
      {showSection("donation-banner") && <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="donation-banner">
        <SectionEditBadge
          label="Donation Call-To-Action"
          pageSlug={pageSlug}
          sectionId="donation-banner"
          studioHref="/admin/donations"
          initialData={{
            title: "Help Safeguard Essential Medicine Buffers",
            subtitle: "Your donations are directly ring-fenced to fund vital supplies across all 20 Dzongkhags.",
            primaryCtaText: "Donate to the Trust Fund",
            primaryCtaUrl: "/donate",
          }}
        />
        <div className="bg-gradient-to-r from-emerald-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Help Safeguard Essential Medicine Buffers
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              Your donations are directly ring-fenced to fund vital supplies across all 20 Dzongkhags.
            </p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-emerald-900 font-extrabold text-sm hover:bg-emerald-50 transition shrink-0 shadow-lg cursor-pointer"
          >
            <HandHeart className="h-4 w-4 text-emerald-700" />
            <span>Donate to the Trust Fund</span>
          </Link>
        </div>
      </section>}
    </div>
  );
}

function OurWork() {
  const loaderData = Route.useLoaderData();
  return (
    <OurWorkExperience
      customSections={loaderData?.customSections}
      livePrograms={loaderData?.livePrograms}
      liveSteps={loaderData?.liveSteps}
      pageSlug="our-work"
    />
  );
}
