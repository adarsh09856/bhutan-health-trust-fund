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
import heroBhutan from "@/assets/hero-bhutan.jpg";
import kingPortrait from "@/assets/king_portrait_fourth.jpg";
import kingFourthOfficial from "@/assets/bhtf/king_fourth_official.png";
import lyonpoSangayPhoto from "@/assets/bhtf/lyonpo_sangay_ngedup.png";
import historyKing from "@/assets/reference/history_fourth_king.webp";
import historyCharter from "@/assets/reference/history_charter_1992.webp";
import historyMou from "@/assets/reference/history_mou.webp";
import historyEndowment from "@/assets/reference/history_endowment.webp";

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
      { title: "Our Story & Historical Milestones | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "The founding chronicle of Bhutan Health Trust Fund from the 1998 WHO Geneva launch, Royal Charter enactment by His Majesty the Fourth Druk Gyalpo, to universal healthcare security.",
      },
    ],
  }),
  component: OurStoryPage,
});

// Official BHTF Historical Milestones (Docx Content Package V2 Section 4 & National Strategy Strategy Record)
const officialMilestones = [
  {
    year: "1998 — 12 May",
    title: "Conception & Geneva Launch at 51st World Health Assembly",
    desc: "The vision of the Bhutan Health Trust Fund was formally launched to the international public health community at the 51st World Health Assembly in Geneva, Switzerland, under the visionary guidance of His Majesty the Fourth Druk Gyalpo and led by Lyonpo Sangay Ngedup (then Minister for Health and Education).",
  },
  {
    year: "2000 — 3 August",
    title: "Royal Charter Enactment & Secretariat Establishment",
    desc: "His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck granted the historic Royal Charter on 3rd August 2000, formally establishing the BHTF Secretariat and ring-fencing the capital endowment to guarantee uninterrupted financing for primary healthcare in perpetuity.",
  },
  {
    year: "2003",
    title: "Operational Primary Healthcare Financing Commences",
    desc: "The Trust Fund commenced direct disbursements to finance essential primary healthcare needs, providing sustained funding for basic medical supplies, clinical consumables, and cold-chain infrastructure across all 20 Dzongkhags.",
  },
  {
    year: "2006",
    title: "100% Childhood Vaccines Financing & National Campaigns",
    desc: "BHTF assumed complete sovereign financing responsibility for routine childhood immunization, supporting the nationwide Measles & Rubella campaign and fully financing the national Hepatitis B vaccination drive.",
  },
  {
    year: "2014–2015",
    title: "Health Contribution Transferred to BHTF & Drug Financing",
    desc: "Management of the national 1% Health Contribution was transferred to BHTF, empowering the Fund to expand beyond vaccines to finance the entire national Essential Drugs List and 5-in-1 Pentavalent vaccine nationwide.",
  },
  {
    year: "2017",
    title: "Target US$ 24M Achieved & HPV Co-Financed with ACCF",
    desc: "BHTF attained its founding endowment target of US$ 24.0 Million (Nu. 1.5 Billion+). Simultaneously launched nationwide HPV vaccination in partnership with the Australian Cervical Cancer Foundation (ACCF).",
  },
  {
    year: "2018",
    title: "Autonomous Statutory Delinking & Pentavalent with GAVI",
    desc: "Delinked from the Ministry of Health to operate as an independent autonomous agency under Cabinet oversight; supported nationwide Pentavalent introduction with GAVI, and crossed the Nu. 3.0 Billion endowment milestone.",
  },
  {
    year: "2019",
    title: "Pneumococcal Conjugate Vaccine (PCV) & Influenza Funding",
    desc: "Financing expanded to introduce Pneumococcal Conjugate Vaccine (PCV) protecting infants against fatal pneumonia/meningitis, alongside nationwide seasonal influenza protection for high-risk citizens and frontline workers.",
  },
  {
    year: "2026",
    title: "26 Years of Service: Nu. 4.8B Endowment & Strategy Roadmap",
    desc: "Marking 26 years of unbroken solidarity: capital endowment stands at Nu. 4,798,965,306.85 (~Nu. 4.8B), guaranteeing 438 essential modern medicines, 110 traditional medicines (65 core formulations), and 4 routine vaccines across 100% of health facilities.",
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
    liveMilestones.length > 0
      ? liveMilestones.map((m) => ({
          year: m.year,
          title: m.title,
          desc: m.description,
        }))
      : officialMilestones;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      {/* 1. Dignified Hero Header using Standard PageHero */}
      <PageHero
        badge="The Chronicle of Health Sovereignty • 1998–2026"
        title="Our Story & Founding Vision"
        subtitle="Over more than two decades, BHTF has grown from a visionary pledge in Geneva into an enduring national endowment sustaining primary healthcare for every Bhutanese citizen."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Our Story" },
        ]}
      />

      {/* 2. Tribute Section: Fourth Druk Gyalpo & Lyonpo Sangay Ngedup */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative" data-bhtf-section="founding-tribute">
        <SectionEditBadge
          label="Founding Vision & Royal Mandate"
          pageSlug="our-story"
          sectionId="founding-tribute"
          studioHref="/admin/milestones"
          initialData={{
            title: "A Sovereign Gift to Safeguard Universal Healthcare",
            subtitle: "Under the benevolent reign of His Majesty the Fourth Druk Gyalpo, healthcare was enshrined as a sacred right in Bhutan.",
            badge: "Founding Leadership & Royal Beneficence",
          }}
        />
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00A896] font-mono block">
              Founding Leadership & Royal Beneficence
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-[#0B4F42] leading-tight">
              A Sovereign Gift to Safeguard Universal Healthcare
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light font-sans">
              Under the benevolent reign of His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck, healthcare was enshrined as a sacred right in Bhutan. Recognizing that external donor financing is temporary and vulnerable to global economic shocks, the Royal Government took the historic step to build a self-reliant sovereign endowment.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light font-sans">
              Launched at the 51st World Health Assembly in Geneva on 12 May 1998 under Health Minister Lyonpo Sangay Ngedup, the Bhutan Health Trust Fund established a global precedent: guaranteeing that universal access to free childhood vaccines and essential medicines would remain ring-fenced and protected in perpetuity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 bg-[#EAF6F5] px-3.5 py-2 rounded-xl border border-[#00A896]/30 text-[#0B4F42]">
                <ShieldCheck className="h-4 w-4 text-[#00A896]" />
                <span>Enacted by Royal Charter (2000)</span>
              </div>
              <div className="flex items-center gap-2 bg-[#FAF8F3] px-3.5 py-2 rounded-xl border border-slate-200 text-[#0B4F42]">
                <Heart className="h-4 w-4 text-[#EE6C8A]" />
                <span>100% Ring-Fenced Health Corpus (Nu. 4.8B)</span>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 px-3.5 py-2 rounded-xl border border-amber-200 text-amber-900">
                <Landmark className="h-4 w-4 text-amber-600" />
                <span>Sovereign 1:1 RGOB Matching Fund</span>
              </div>
            </div>
          </div>

          {/* Dual Tribute Cards: His Majesty the 4th King & Lyonpo Sangay Ngedup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Card 1: His Majesty the Fourth Druk Gyalpo */}
            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#00A896]/50 transition-all duration-300">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                <img
                  src={kingPortrait}
                  alt="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                    Royal Visionary & Benefactor
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold mt-1 text-white leading-snug">
                    His Majesty the Fourth Druk Gyalpo
                  </h3>
                  <p className="text-xs text-amber-200/90 font-light">
                    Jigme Singye Wangchuck • Royal Charter 2000
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-white flex-1 flex flex-col justify-between">
                <div className="relative pl-4 border-l-2 border-amber-400">
                  <p className="text-xs sm:text-sm text-slate-700 italic font-serif leading-relaxed">
                    "No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. BHTF stands as a sacred trust of self-reliance for generations to come."
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed pt-2 border-t border-slate-100">
                  Enacted the Royal Charter on 12 May 2000, establishing the autonomous legal framework that forever protects basic healthcare financing in Bhutan.
                </p>
              </div>
            </div>

            {/* Card 2: Lyonpo Sangay Ngedup */}
            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-[#00A896]/50 transition-all duration-300">
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100">
                <img
                  src={lyonpoSangayPhoto}
                  alt="Lyonpo Sangay Ngedup, Minister for Health and Education (1998)"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#00A896] text-white font-bold">
                    Founding Architect • WHO Geneva 1998
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold mt-1 text-white leading-snug">
                    Lyonpo Sangay Ngedup
                  </h3>
                  <p className="text-xs text-emerald-200/90 font-light">
                    Minister for Health & Education (1998) • Founding Leader of BHTF
                  </p>
                </div>
              </div>
              <div className="p-6 space-y-3 bg-white flex-1 flex flex-col justify-between">
                <div className="relative pl-4 border-l-2 border-[#00A896]">
                  <p className="text-xs sm:text-sm text-slate-700 italic font-serif leading-relaxed">
                    "A tree is only as strong as the hands that first planted it. Lyonpo Sangay Ngedup laid the foundation of BHTF, and its founding members nurtured it into life. We remain forever grateful for their vision and contributions."
                  </p>
                </div>
                <p className="text-[11px] text-slate-500 font-light leading-relaxed pt-2 border-t border-slate-100">
                  Led the historic Bhutanese delegation to the 51st World Health Assembly in Geneva on 12 May 1998, mobilizing international partners to seed the world's first sovereign health trust fund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Historical Milestones (1998 - 2026) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="milestones-timeline">
        <SectionEditBadge
          label="Historical Milestones Archive"
          pageSlug="our-story"
          sectionId="milestones-timeline"
          studioHref="/admin/milestones"
          initialData={{
            title: "Official Milestones in Health Sovereignty",
            subtitle: "Two decades of transparent stewardship and continuous nationwide expansion.",
            badge: "Chronology of Service",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 block mb-2 font-mono">
            Chronology of Service
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            Official Milestones in Health Sovereignty
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3">
            Two decades of transparent stewardship and continuous nationwide expansion.
          </p>
        </div>

        <div className="relative border-l-2 border-emerald-400/60 ml-4 sm:ml-36 space-y-8 sm:space-y-10">
          {milestonesToRender.map((m, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-10 group">
              {/* Year badge on left */}
              <div className="hidden sm:block absolute -left-36 top-1 text-right w-28 font-mono text-xs font-black text-emerald-800 uppercase tracking-wide">
                {m.year}
              </div>

              {/* Node Indicator Dot */}
              <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-emerald-600 border-4 border-white shadow-md group-hover:scale-125 transition-transform" />

              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition duration-200 space-y-2">
                <span className="sm:hidden inline-block text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1 font-mono">
                  {m.year}
                </span>
                <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Official Archival Documents & Decrees from BHTF Archive */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="archival-manuscripts">
        <SectionEditBadge
          label="Archival Decrees & Manuscripts"
          pageSlug="our-story"
          sectionId="archival-manuscripts"
          studioHref="/admin/reports"
          initialData={{
            title: "Official Decrees, Charters & Historic MOUs",
            subtitle: "Primary historical documents from the Royal Government of Bhutan and multilateral partners.",
            badge: "Original Archival Manuscripts",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 font-mono">
            Original Archival Manuscripts
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            Official Decrees, Charters & Historic MOUs
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Primary historical documents from the Royal Government of Bhutan and multilateral partners.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={historyKing}
                alt="His Majesty the Fourth Druk Gyalpo Founding Portrait"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Royal Benefactor</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">His Majesty the Fourth Druk Gyalpo</h4>
              <p className="text-[11px] text-slate-500 leading-snug">Founding father and visionary of the health trust fund.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={historyCharter}
                alt="Royal Charter Founding Manuscript"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Legal Charter</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">Original Royal Charter</h4>
              <p className="text-[11px] text-slate-500 leading-snug">Statutory enactment establishing autonomy and capital ring-fencing.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={historyMou}
                alt="Geneva Multilateral MOU 1998"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Geneva Accord</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">WHO Multilateral MOU</h4>
              <p className="text-[11px] text-slate-500 leading-snug">International pact securing universal immunization procurement.</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div className="aspect-[4/5] overflow-hidden bg-slate-100">
              <img
                src={historyEndowment}
                alt="Sovereign Endowment Ledger Document"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 space-y-1">
              <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Sovereign Corpus</span>
              <h4 className="font-serif font-bold text-sm text-slate-900">Perpetual Trust Ledger</h4>
              <p className="text-[11px] text-slate-500 leading-snug">1:1 matching agreement and permanent capital preservation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF6F5] text-slate-900 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-[#00A896]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0B4F42]">
              Safeguard the Next 20 Years of Health Sovereignty
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-light">
              Your gift is preserved in the sovereign corpus. Every Ngultrum is doubled by the Royal Government of Bhutan.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-md transition shrink-0 active:scale-95 cursor-pointer"
          >
            <Heart className="h-4 w-4 fill-slate-950" />
            <span>DONATE NOW</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
