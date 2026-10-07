import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import {
  getPublicPrograms,
  getPublicProcurementSteps,
  getPublicPage,
} from "@/lib/api/public.functions";
import type { Program, ProcurementStep, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

import {
  Pill,
  Syringe,
  Stethoscope,
  HeartPulse,
  Microscope,
  GraduationCap,
  CheckCircle2,
  ShieldCheck,
  HandHeart,
  ThermometerSnowflake,
  Loader2,
  Scale,
  Coins,
  TrendingUp,
  Building2,
  Quote,
} from "lucide-react";
import { CommodityTracker } from "@/components/commodity-tracker";
import { DzongkhagExplorer } from "@/components/dzongkhag-map";
import { DisbursementChart } from "@/components/disbursement-chart";

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

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Anchoring Sustainable Health Financing • 1998–2026"
        title="Our Programs & Financed Commodities"
        subtitle="Ensuring no hospital, clinic, or health post across Bhutan faces stockouts of life-saving medicines or vaccines."
      />

      {/* The Impact: What BHTF Delivers Today (Slide 8 / Screenshot 6) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="today-impact-summary">
        <SectionEditBadge
          label="What BHTF Delivers Today"
          pageSlug={pageSlug}
          sectionId="today-impact-summary"
          studioHref="/admin/page-editor?slug=our-work"
          initialData={{
            title: "The Impact: What BHTF Delivers Today",
            subtitle: "Unbroken sovereign financing securing 100% of essential medicines, traditional therapies, and life-cycle vaccines nationwide.",
            badge: "Nationwide Coverage & Impact",
          }}
        />
        <div className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Nationwide Coverage & Impact
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              The Impact: What BHTF Delivers Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Direct sovereign financing ensuring no hospital or patient faces stockouts.
            </p>
          </div>

          {/* 4 Impact Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition space-y-2">
              <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-700 grid place-items-center">
                <Pill className="h-5 w-5" />
              </div>
              <div className="font-mono text-3xl font-black text-slate-900">438</div>
              <h4 className="font-serif font-bold text-base text-slate-900">Essential Medicines</h4>
              <p className="text-xs text-slate-600 font-light">100% of the National Essential Drugs List financed across all therapy lines.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition space-y-2">
              <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-700 grid place-items-center">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div className="font-mono text-3xl font-black text-slate-900">65–110</div>
              <h4 className="font-serif font-bold text-base text-slate-900">Traditional Medicines</h4>
              <p className="text-xs text-slate-600 font-light">65 core traditional formulations and 110 total indigenous remedies funded.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition space-y-2">
              <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-700 grid place-items-center">
                <Syringe className="h-5 w-5" />
              </div>
              <div className="font-mono text-3xl font-black text-slate-900">4</div>
              <h4 className="font-serif font-bold text-base text-slate-900">Routine Vaccines</h4>
              <p className="text-xs text-slate-600 font-light">Pentavalent, PCV, Seasonal Flu, and HPV shielding infants, youth, and elderly.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-300 transition space-y-2">
              <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-700 grid place-items-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="font-mono text-3xl font-black text-slate-900">100%</div>
              <h4 className="font-serif font-bold text-base text-slate-900">Facility Coverage</h4>
              <p className="text-xs text-slate-600 font-light">Every referral hospital, district hospital, and Primary Health Centre across all 20 Dzongkhags.</p>
            </div>
          </div>

          {/* Spend Ribbon (Slide 8 Bottom Banner) */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-2xl p-6 border border-emerald-500/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 grid place-items-center shrink-0">
                <Coins className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 font-bold block">
                  Annual Procurement Financing
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-white">Nu. 557M / Year</div>
                <p className="text-xs text-slate-300 font-light">Scaling to over Nu. 613M in FY 2025–26.</p>
              </div>
            </div>

            <div className="h-10 w-px bg-slate-700 hidden sm:block" />

            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 grid place-items-center shrink-0">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                  Cumulative Spend Since Inception
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-black text-amber-300">Nu. 4.37 Billion</div>
                <p className="text-xs text-slate-300 font-light">Total health disbursements from 2003–04 to 2025–26.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Interactive Health Commodity Streams */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="commodity-tracker">
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
      </section>

      {/* 2. Core Commodities Summary Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="commodity-streams">
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
      </section>

      {/* 2a. Constitutional & Royal Guarantee (Slide 9 Side-by-Side Quotes & Metric Tiles) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="sacred-mandate-quotes">
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
        <div className="space-y-8">
          {/* Side-by-Side Quotes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quote 1: HM Fourth Druk Gyalpo */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                  <Quote className="h-5 w-5" />
                </div>
                <p className="font-serif text-base sm:text-lg text-slate-900 italic leading-relaxed">
                  "The primary health services will be made available to all our citizens, and no citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">His Majesty the Fourth Druk Gyalpo</h4>
                  <p className="text-xs text-amber-700 font-medium">Jigme Singye Wangchuck • Royal Charter 2000</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  Royal Decree
                </span>
              </div>
            </div>

            {/* Quote 2: Constitution Article 9 */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="font-serif text-base sm:text-lg text-slate-900 italic leading-relaxed">
                  "The State shall provide free access to basic public health services in both modern and traditional medicines."
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-slate-900">The Constitution of the Kingdom of Bhutan</h4>
                  <p className="text-xs text-emerald-700 font-medium">Article 9, Section 21 • Principles of State Policy</p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">
                  Constitutional Law
                </span>
              </div>
            </div>
          </div>

          {/* 3 Metric Tiles (Slide 9) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-black text-amber-600">0</div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Citizens Billed</h4>
              <p className="text-xs text-slate-500 font-light">Zero out-of-pocket costs for essential medicines or routine vaccines at all public facilities.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-black text-emerald-700">253 → 438</div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Essential & Traditional Medicines</h4>
              <p className="text-xs text-slate-500 font-light">Expanded from 253 to 438 essential modern medicines plus 110 traditional medicinal formulations.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-2 text-center">
              <div className="font-mono text-3xl sm:text-4xl font-black text-teal-700">90,167+</div>
              <h4 className="font-serif text-sm font-bold text-slate-900">Citizens Protected Annually</h4>
              <p className="text-xs text-slate-500 font-light">Babies, adolescent girls, elderly, and high-risk patients protected against vaccine-preventable diseases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. Life-Cycle Immunization Protection Grid (Strategy Workshop Verified Data) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="vaccine-coverage">
        <SectionEditBadge
          label="Immunization Coverage"
          pageSlug={pageSlug}
          sectionId="vaccine-coverage"
          studioHref="/admin/programs"
          initialData={{
            title: "Protection Across the Life Cycle — 90,167+ Citizens Annually",
            subtitle: "Uninterrupted sovereign financing for routine childhood and adult immunization with 100% facility coverage.",
            badge: "Universal Vaccine Security",
          }}
        />
        <div className="bg-gradient-to-br from-emerald-950 via-[#071F18] to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-emerald-500/20 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-emerald-500/20 pb-6">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Universal Vaccine Security
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
                Protection Across the Life Cycle: 90,167+ Protected Annually
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-2xl font-light">
                Zero stockouts across all 4 critical vaccine programs. Financed directly by BHTF endowment yields and RGOB matched funds.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-2xl font-black text-amber-400 font-mono">0</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Citizens Billed</span>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <span className="block text-2xl font-black text-emerald-400 font-mono">100%</span>
                <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Health Facilities</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. Pentavalent */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">98.9% Coverage</span>
                <Syringe className="h-4 w-4 text-emerald-400" />
              </div>
              <h3 className="font-bold text-lg text-white">Pentavalent Vaccine</h3>
              <p className="text-xs text-slate-300 font-light">
                <strong className="text-white font-mono">8,961 babies</strong> protected against Diphtheria, Pertussis, Tetanus, Hepatitis B, and Hib.
              </p>
            </div>

            {/* 2. PCV */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-400">98.7% Coverage</span>
                <ShieldCheck className="h-4 w-4 text-blue-400" />
              </div>
              <h3 className="font-bold text-lg text-white">PCV (Pneumococcal)</h3>
              <p className="text-xs text-slate-300 font-light">
                <strong className="text-white font-mono">8,927 babies</strong> shielded against infant pneumonia, sepsis, and bacterial meningitis.
              </p>
            </div>

            {/* 3. Influenza */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">97.4% Coverage</span>
                <ThermometerSnowflake className="h-4 w-4 text-amber-400" />
              </div>
              <h3 className="font-bold text-lg text-white">Seasonal Influenza</h3>
              <p className="text-xs text-slate-300 font-light">
                <strong className="text-white font-mono">66,238 citizens</strong> (elderly 65+, comorbidities, children & frontline healthcare workers).
              </p>
            </div>

            {/* 4. HPV */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2 hover:bg-white/10 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-pink-400">99.8% Coverage</span>
                <HeartPulse className="h-4 w-4 text-pink-400" />
              </div>
              <h3 className="font-bold text-lg text-white">HPV (Cervical Cancer)</h3>
              <p className="text-xs text-slate-300 font-light">
                <strong className="text-white font-mono">6,041 adolescent girls</strong> vaccinated to eliminate cervical cancer nationwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2c. Essential Drug Formulary & Expenditure Ranking (Slide 6 & Chart 1) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="top-medicines">
        <SectionEditBadge
          label="Top Procured Medicines & Expenditure"
          pageSlug={pageSlug}
          sectionId="top-medicines"
          studioHref="/admin/reports"
          initialData={{
            title: "Top 10 Procured Medicines & Nu. 4.37B Cumulative Record",
            subtitle: "Verified procurement volume and expenditure ranking under Royal Audit Authority oversight.",
            badge: "Procurement Transparency",
          }}
        />
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
                FY 2025–2026 Formulary Ranking
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Top Ten Essential Medicines Financed by BHTF
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-2xl font-light">
                Over <strong className="font-mono text-emerald-900 font-bold">Nu. 4.37 Billion</strong> cumulatively disbursed for essential medicines and vaccines since inception (2003–04 to 2025–26), scaling from under Nu. 5M/yr to over Nu. 613M in FY 2025–26.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50 text-amber-950 border border-amber-300 text-xs font-mono font-bold shrink-0">
              <Coins className="h-4 w-4 text-amber-600" />
              <span>Cumulative Disbursed: Nu. 4.37B</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-mono uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4"># Rank</th>
                  <th className="py-3 px-4">Medicine / Formulary Description</th>
                  <th className="py-3 px-4">Clinical Indication</th>
                  <th className="py-3 px-4 text-right">Annual Allocation (Nu.)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {[
                  { rank: "1", name: "Losartan", desc: "Essential Antihypertensive therapy", cost: "Nu. 51,000,000" },
                  { rank: "2", name: "Diabetes Metformin", desc: "First-line Type-2 Diabetes oral glycemic management", cost: "Nu. 25,000,000" },
                  { rank: "3", name: "Paracetamol", desc: "National essential analgesic & antipyretic", cost: "Nu. 17,000,000" },
                  { rank: "4", name: "Hydrochlorothiazide", desc: "Cardiovascular diuretic therapy", cost: "Nu. 14,000,000" },
                  { rank: "5", name: "Glipizide", desc: "Oral sulfonylurea antidiabetic therapy", cost: "Nu. 10,000,000" },
                  { rank: "6", name: "Immunosuppressant (Vitamin B & D)", desc: "Post-transplant immunosuppression & therapeutic vitamins", cost: "Nu. 9,000,000" },
                  { rank: "7", name: "Omeprazole", desc: "Proton-pump inhibitor for acid peptic disease", cost: "Nu. 9,000,000" },
                  { rank: "8", name: "Gastrointestinal Formulations", desc: "Therapeutic gastrointestinal protectants & buffers", cost: "Nu. 8,000,000" },
                  { rank: "9", name: "Cetirizine", desc: "Second-generation antihistamine", cost: "Nu. 8,000,000" },
                  { rank: "10", name: "Vitamin C", desc: "Essential nutritional micronutrient supplementation", cost: "Nu. 8,000,000" },
                ].map((med) => (
                  <tr key={med.rank} className="hover:bg-slate-50/70 transition">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-500">{med.rank}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900">{med.name}</td>
                    <td className="py-2.5 px-4 text-slate-600 font-light">{med.desc}</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-800">{med.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Strategy Workshop Chart 1 Trajectory & Two Income Streams */}
          <div className="pt-8 border-t border-slate-100">
            <DisbursementChart />
          </div>
        </div>
      </section>

      {/* 3. Interactive Nationwide Reach Across 20 Dzongkhags */}
      <section className="bg-slate-50 border-y border-slate-200/80 py-16 sm:py-20 relative" data-bhtf-section="dzongkhag-explorer">
        <SectionEditBadge
          label="20 Dzongkhags Explorer"
          pageSlug={pageSlug}
          sectionId="dzongkhag-explorer"
          studioHref="/admin/metrics"
        />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DzongkhagExplorer />
        </div>
      </section>

      {/* 4. Transparent Procurement Cycle */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="procurement-lifecycle">
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
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between"
              >
                <span className="text-4xl font-black text-slate-100 absolute top-3 right-3 select-none">
                  {step.stepNumber}
                </span>
                <div className="relative z-10 space-y-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white font-bold text-xs grid place-items-center mb-4">
                    {step.stepNumber}
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="donation-banner">
        <SectionEditBadge
          label="Donation Call-To-Action"
          pageSlug={pageSlug}
          sectionId="donation-banner"
          studioHref="/admin/donations"
          initialData={{
            title: "Help Safeguard Essential Medicine Buffers",
            subtitle: "Your donations are directly multiplied 1:1 by the Royal Government of Bhutan to fund vital supplies.",
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
              Your donations are directly multiplied 1:1 by the Royal Government of Bhutan to fund
              vital supplies.
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
      </section>
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
