import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicMilestones, getPublicPage } from "@/lib/api/public.functions";
import type { Milestone, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Sparkles,
  Calendar,
  Award,
  ShieldCheck,
  Heart,
  Landmark,
  ArrowRight,
  Syringe,
  Pill,
  Users,
  Quote,
} from "lucide-react";
import historyKing from "@/assets/reference/history_fourth_king.webp";
import historyCharter from "@/assets/reference/history_charter_1992.webp";
import historyMou from "@/assets/reference/history_mou.webp";
import historyEndowment from "@/assets/reference/history_endowment.webp";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";

export const Route = createFileRoute("/our-story")({
  loader: async () => {
    try {
      const [page, milestones] = await Promise.all([
        getPublicPage({ data: { slug: "our-story" } }).catch(() => null),
        getPublicMilestones().catch(() => []),
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
        liveMilestones: milestones || [],
      };
    } catch {
      return {
        customSections: null,
        liveMilestones: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Our Story & Milestones | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "The founding story and 26-year timeline of the Bhutan Health Trust Fund (BHTF) from its 1998 Geneva launch to nationwide healthcare financing.",
      },
    ],
  }),
  component: OurStoryPage,
});

// Official BHTF Historical Milestones (Section 2 from official write-up)
const officialMilestones = [
  {
    year: "1998",
    title: "Launched in Geneva",
    desc: "BHTF launched on 12th May at the World Health Organization headquarters in Geneva.",
    era: "FOUNDATIONAL YEARS (1998–2006)",
  },
  {
    year: "2000",
    title: "Royal Charter issued",
    desc: "Secretariat established; Charter issued by the Fourth Druk Gyalpo on 3rd August.",
    era: "FOUNDATIONAL YEARS (1998–2006)",
  },
  {
    year: "2003",
    title: "Vaccine financing begins",
    desc: "First funding for primary health care vaccines.",
    era: "FOUNDATIONAL YEARS (1998–2006)",
  },
  {
    year: "2006",
    title: "National campaigns",
    desc: "Supported nationwide Measles & Rubella campaign; financed the Hepatitis B drive.",
    era: "FOUNDATIONAL YEARS (1998–2006)",
  },
  {
    year: "2014–15",
    title: "Health Contribution transferred",
    desc: "HC moved to BHTF; Fund began financing both essential drugs and vaccines.",
    era: "SCALING TO NATIONAL COVERAGE (2014–2026)",
  },
  {
    year: "2017",
    title: "HPV vaccine co-financed",
    desc: "Co-financed with the Australian Cervical Cancer Foundation (ACCF).",
    era: "SCALING TO NATIONAL COVERAGE (2014–2026)",
  },
  {
    year: "2018",
    title: "Autonomous & Pentavalent",
    desc: "Delinked from MoH; supported Pentavalent Vaccine introduction with GAVI.",
    era: "SCALING TO NATIONAL COVERAGE (2014–2026)",
  },
  {
    year: "2019",
    title: "PCV & Influenza funded",
    desc: "Funded introduction of Pneumococcal Conjugate and Influenza vaccines.",
    era: "SCALING TO NATIONAL COVERAGE (2014–2026)",
  },
  {
    year: "2026",
    title: "26 years of service to the nation",
    desc: "26 unbroken years sustaining primary healthcare financing for essential medicines and vaccines across all 20 Dzongkhags.",
    era: "SCALING TO NATIONAL COVERAGE (2014–2026)",
  },
];

function OurStoryPage() {
  const loaderData = Route.useLoaderData();
  const [liveMilestones, setLiveMilestones] = useState<Milestone[]>(loaderData?.liveMilestones || []);
  const [customSections, setCustomSections] = useState<PageBlockSection[] | null>(
    loaderData?.customSections || null,
  );

  useEffect(() => {
    getPublicMilestones()
      .then((res) => {
        if (res && res.length > 0) setLiveMilestones(res);
      })
      .catch(() => {});
  }, []);

  const milestonesToRender =
    liveMilestones.length >= 9
      ? liveMilestones.map((m, idx) => ({
          year: m.year,
          title: m.title,
          desc: m.description,
          era: officialMilestones[idx]?.era || "Milestone",
        }))
      : officialMilestones;

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      {/* 1. Dignified Hero Header */}
      <PageHero
        badge="Section 2 • Historical Journey"
        title="Our Story"
        subtitle="The founding chronicle of the Bhutan Health Trust Fund and 26 years of service to the nation."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Our Story" },
        ]}
      />

      {/* Custom Page Renderer if edited by admin */}
      {customSections && customSections.length > 0 && (
        <PageRenderer sections={customSections} pageSlug="our-story" />
      )}

      {/* 2. Official Section 2 Story Narrative */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="story-narrative">
        <SectionEditBadge
          label="Our Story Narrative"
          pageSlug="our-story"
          sectionId="story-narrative"
          studioHref="/admin/page-editor?slug=our-story"
          initialData={{
            title: "2. Our Story",
            subtitle: "Official founding narrative approved by the Secretariat.",
            badge: "Section 2 • Our Story",
          }}
        />

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              Founding Mandate • Est. 1998
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Our Story
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              The Bhutan Health Trust Fund (BHTF) was established in 1998 with the objective of ensuring sustainable financing for essential medicines and vaccines in Bhutan. The Fund received its royal charter in 2000, which provides the foundation for its mandate and operations.
            </p>
            <p>
              Since its establishment, BHTF has continued to strengthen its financial sustainability through prudent fund management and investment, supporting the continued provision of essential medicines and vaccines for the people of Bhutan.
            </p>
          </div>

          {/* Dual Tribute Cards: His Majesty the Fourth Druk Gyalpo & Lyonpo Sangay Ngedup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Card 1: His Majesty the Fourth Druk Gyalpo with image1.png */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between group hover:border-emerald-300 transition-all duration-300">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/official/image1.png"
                  alt="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                    Royal Benefactor
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1 text-white leading-snug font-serif">
                    His Majesty the Fourth Druk Gyalpo
                  </h3>
                  <p className="text-xs text-amber-200/90 font-light">
                    Jigme Singye Wangchuck • Royal Charter 2000
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-white flex-1 flex flex-col justify-between">
                <div className="relative pl-4 border-l-2 border-amber-500">
                  <p className="text-sm sm:text-base text-slate-900 italic font-serif leading-relaxed">
                    “No Bhutanese should ever have to choose between their health and their livelihood.”
                  </p>
                  <p className="text-xs text-slate-500 font-sans mt-2">
                    — His Majesty the Fourth Druk Gyalpo, 2004
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Lyonpo Sangay Ngedup with image2.png */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between group hover:border-emerald-300 transition-all duration-300">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                <img
                  src="/images/official/image2.png"
                  alt="Hon'ble former Health Minister, Lyonpo Sangay Ngedup"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold">
                    Founding Architect
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold mt-1 text-white leading-snug font-serif">
                    Lyonpo Sangay Ngedup
                  </h3>
                  <p className="text-xs text-emerald-200/90 font-light">
                    Hon'ble Former Health Minister • Move for Health (2002)
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-white flex-1 flex flex-col justify-between">
                <div className="relative pl-4 border-l-2 border-emerald-600">
                  <p className="text-sm sm:text-base text-slate-900 italic font-serif leading-relaxed">
                    “A tree is only as strong as the hands that first planted it. Lyonpo Sangay Ngedup laid the foundation of BHTF, and its founding members nurtured it into life. We remain forever grateful for their vision and contributions.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 26 Years of Service: Milestones Timeline */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="milestones-timeline">
        <SectionEditBadge
          label="26 Years Milestones"
          pageSlug="our-story"
          sectionId="milestones-timeline"
          studioHref="/admin/milestones"
          initialData={{
            title: "26 Years of Service: Milestones",
            subtitle: "From launch in Geneva to a nationwide immunization backbone — the programmatic journey behind the Fund.",
            badge: "26-Year Chronology",
          }}
        />

        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
            Milestones Timeline
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            26 Years of Service: Milestones
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light">
            From launch in Geneva to a nationwide immunization backbone — the programmatic journey behind the Fund.
          </p>
        </div>

        <div className="relative border-l-2 border-emerald-500/60 ml-4 sm:ml-36 space-y-8 sm:space-y-10">
          {milestonesToRender.map((m, idx) => (
            <div key={idx}>
              {/* Foundational Years Era Header */}
              {idx === 0 && (
                <div className="relative pl-6 sm:pl-10 -ml-1 sm:-ml-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 text-amber-300 border border-emerald-700/60 text-xs font-mono font-bold shadow-xs">
                    <span>1998–2006 · FOUNDATIONAL YEARS</span>
                  </div>
                </div>
              )}

              {/* Scaling to National Coverage Era Header */}
              {m.year.includes("2014") && (
                <div className="relative pl-6 sm:pl-10 -ml-1 sm:-ml-4 my-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-emerald-400 border border-slate-700 text-xs font-mono font-bold shadow-xs">
                    <span>2014–2026 · SCALING TO NATIONAL COVERAGE</span>
                  </div>
                </div>
              )}

              <div className="relative pl-6 sm:pl-10 group">
                {/* Year badge on left */}
                <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 font-mono text-xs font-black text-emerald-800 uppercase tracking-wide">
                  {m.year}
                </div>

                {/* Node Indicator Dot */}
                <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-emerald-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

                <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition duration-200 space-y-2">
                  <span className="sm:hidden inline-block text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1 font-mono">
                    {m.year}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                    {m.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF6F5] text-slate-900 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-[#00A896]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0B4F42]">
              Safeguard Health Sovereignty for Future Generations
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-light">
              Your contribution represents more than financial support; it is an investment in human life, dignity and the well-being of future generations.
            </p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B4F42] text-white font-bold text-sm shadow-md hover:bg-[#073C32] transition shrink-0 active:scale-95"
          >
            <Heart className="h-4 w-4 fill-current text-amber-300" />
            <span>Donate Now</span>
          </Link>
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
