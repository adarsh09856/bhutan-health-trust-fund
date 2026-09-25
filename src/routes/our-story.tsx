import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicMilestones, getPublicPage } from "@/lib/api/public.functions";
import type { Milestone, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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
} from "lucide-react";
import heroBhutan from "@/assets/hero-bhutan.jpg";

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

// Official BHTF Historical Milestones Table (From Official BHTF Archive)
const officialMilestones = [
  {
    year: "1998 — 12 May",
    title: "Launch at WHO Headquarters in Geneva",
    desc: "The vision of the Bhutan Health Trust Fund was formally presented and launched to the international public health community at the World Health Assembly in Geneva, Switzerland, under the dynamic leadership of then Health Minister Lyonpo Sangay Nidup.",
  },
  {
    year: "2000 — 3 August",
    title: "Royal Charter Enactment & Secretariat Establishment",
    desc: "A historic Royal Charter was issued by His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck, establishing BHTF as an autonomous statutory trust fund with permanent corpus ring-fencing.",
  },
  {
    year: "2003",
    title: "First Vaccine Procurement Financing",
    desc: "BHTF initiated full procurement financing for national routine childhood immunization antigens, securing universal protection across all 20 Dzongkhags.",
  },
  {
    year: "2006",
    title: "Measles-Rubella Campaign & Hepatitis B Rollout",
    desc: "Financed the historic nationwide Measles & Rubella campaign and backed national Hepatitis B universal immunization.",
  },
  {
    year: "2014–15",
    title: "Expansion to 120+ Essential Medicines",
    desc: "Strengthened management of public health contributions and took on the statutory mandate to finance national primary healthcare essential medicines.",
  },
  {
    year: "2017",
    title: "HPV Cancer Prevention with ACCF",
    desc: "Initiated a co-financed nationwide Human Papillomavirus (HPV) vaccination program in collaboration with the Australian Cervical Cancer Foundation.",
  },
  {
    year: "2018",
    title: "GAVI Pentavalent Partnership & Full Autonomous Delinking",
    desc: "Delinked from the Ministry of Health to become a fully independent statutory autonomous entity; introduced support for the Pentavalent vaccine in partnership with GAVI.",
  },
  {
    year: "2020–2026",
    title: "Sovereign Endowment Growth Surpassing Nu. 3.24 Billion",
    desc: "Managing a robust sovereign health corpus with permanent capital preservation, solar cold-chain systems, and 100% uninterrupted emergency primary medicine buffers.",
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

  if (customSections && customSections.length > 3) {
    return (
      <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 min-h-screen pt-24 sm:pt-28">
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }

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
      {/* 1. Dignified Hero Header with Authentic Himalayan Background */}
      <section className="relative overflow-hidden bg-[#071914] text-white pt-32 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-6 lg:px-8 border-b border-amber-400/20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url(${heroBhutan})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#071914]/80 via-[#071914]/90 to-[#071914] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-semibold backdrop-blur-md">
            <Landmark className="h-3.5 w-3.5 text-amber-400" />
            <span>The Chronicle of Health Sovereignty • 1998–2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
            Our Story & Founding Vision
          </h1>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-sans leading-relaxed font-light">
            Over more than two decades, BHTF has grown from a visionary pledge in Geneva into an enduring national endowment sustaining primary healthcare for every Bhutanese citizen.
          </p>
        </div>
      </section>

      {/* 2. Tribute Section: Fourth Druk Gyalpo & Lyonpo Sangay Nidup */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 font-mono block">
              Founding Leadership & Royal Beneficence
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
              A Sovereign Gift to Safeguard Universal Healthcare
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light font-sans">
              Under the benevolent reign of His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck, healthcare was enshrined as a sacred right in Bhutan. Recognizing that external donor financing is temporary and vulnerable to global shifts, the Royal Government took the bold, historic step to build a self-reliant sovereign trust.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light font-sans">
              Launched at the 51st World Health Assembly in Geneva in May 1998 under Health Minister Lyonpo Sangay Nidup, the Bhutan Health Trust Fund established a global precedent: guaranteeing that universal access to free childhood vaccines and essential medicines would remain ring-fenced and protected in perpetuity.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <ShieldCheck className="h-4 w-4 text-emerald-700" />
                <span>Enacted by Royal Charter (2000)</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
                <Heart className="h-4 w-4 text-pink-600" />
                <span>100% Ring-Fenced Health Corpus</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-gradient-to-br from-emerald-950 via-[#0a231c] to-slate-900 p-8 text-white space-y-4 text-center">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 text-amber-300 grid place-items-center">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-xl font-bold text-amber-200">
                The Geneva Founding Charter
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed font-light">
                "No citizen should ever have to choose between their life and their livelihood. The Health Trust Fund represents Bhutan's commitment to self-reliance and collective compassion."
              </p>
              <div className="pt-2 text-[11px] font-mono text-emerald-300 uppercase tracking-widest font-bold">
                WHO Geneva • 12 May 1998
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Official Historical Milestones (1998 - 2026) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

      {/* 4. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-[#071914] to-slate-950 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-emerald-500/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-serif">
              Safeguard the Next 20 Years of Health Sovereignty
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl font-light">
              Your gift is preserved in the sovereign corpus. Every Ngultrum is doubled by the Royal Government of Bhutan.
            </p>
          </div>
          <Link
            to="/get-involved"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl transition shrink-0 active:scale-95 cursor-pointer"
          >
            <Heart className="h-4 w-4 fill-slate-950" />
            <span>DONATE NOW</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
