import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { PageRenderer } from "@/components/page-renderer";
import { getPublicMilestones, getPublicPage } from "@/lib/api/public.functions";
import type { Milestone, PageBlockSection } from "@/lib/db/schema";
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
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/our-story")({
  loader: async () => {
    try {
      const [milestones, page] = await Promise.all([
        getPublicMilestones(),
        getPublicPage({ data: { slug: "our-story" } }).catch(() => null),
      ]);
      return {
        liveMilestones: milestones || [],
        milestonesLoaded: true,
        page,
      };
    } catch {
      return {
        liveMilestones: [],
        milestonesLoaded: false,
        page: null,
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

function OurStoryPage() {
  const loaderData = Route.useLoaderData();
  const [liveMilestones, setLiveMilestones] = useState<Milestone[]>(
    loaderData?.liveMilestones || [],
  );
  const { t, isDzongkha } = useLanguage();

  useEffect(() => {
    getPublicMilestones()
      .then((res) => { setLiveMilestones(res || []); })
      .catch(() => {});
  }, []);

  const localizedMilestones = [
    {
      year: "1998",
      title: t("milestone_1998_title", "Launched in Geneva"),
      desc: t(
        "milestone_1998_desc",
        "BHTF launched on 12th May at the World Health Organization headquarters in Geneva.",
      ),
      era: isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)",
    },
    {
      year: "2000",
      title: t("milestone_2000_title", "Royal Charter issued"),
      desc: t(
        "milestone_2000_desc",
        "Secretariat established; Charter issued by the Fourth Druk Gyalpo on 3rd August.",
      ),
      era: isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)",
    },
    {
      year: "2003",
      title: t("milestone_2003_title", "Vaccine financing begins"),
      desc: t("milestone_2003_desc", "First funding for primary health care vaccines."),
      era: isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)",
    },
    {
      year: "2006",
      title: t("milestone_2006_title", "National campaigns"),
      desc: t(
        "milestone_2006_desc",
        "Supported nationwide Measles & Rubella campaign; financed the Hepatitis B drive.",
      ),
      era: isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)",
    },
    {
      year: "2014–15",
      title: t("milestone_2014_title", "Health Contribution transferred"),
      desc: t(
        "milestone_2014_desc",
        "HC moved to BHTF; Fund began financing both essential drugs and vaccines.",
      ),
      era: isDzongkha
        ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།"
        : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2017",
      title: t("milestone_2017_title", "HPV vaccine co-financed"),
      desc: t(
        "milestone_2017_desc",
        "Co-financed with the Australian Cervical Cancer Foundation (ACCF).",
      ),
      era: isDzongkha
        ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།"
        : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2018",
      title: t("milestone_2018_title", "Autonomous & Pentavalent"),
      desc: t(
        "milestone_2018_desc",
        "Delinked from MoH; supported Pentavalent Vaccine introduction with GAVI.",
      ),
      era: isDzongkha
        ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།"
        : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2019",
      title: t("milestone_2019_title", "PCV & Influenza funded"),
      desc: t(
        "milestone_2019_desc",
        "Funded introduction of Pneumococcal Conjugate and Influenza vaccines.",
      ),
      era: isDzongkha
        ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།"
        : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2026",
      title: t("milestone_2026_title", "26 years of service to the nation"),
      desc: t(
        "milestone_2026_desc",
        "26 unbroken years sustaining primary healthcare financing for essential medicines and vaccines across all 20 Dzongkhags.",
      ),
      era: isDzongkha
        ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།"
        : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
  ];

  const seededMilestones: Record<string, { title: string; description: string }> = {
    "1998": { title: "Launched in Geneva", description: "BHTF launched on 12th May at the World Health Organization headquarters in Geneva." },
    "2000": { title: "Royal Charter issued", description: "Secretariat established; Charter issued by the Fourth Druk Gyalpo on 3rd August." },
    "2003": { title: "Vaccine financing begins", description: "First funding for primary health care vaccines." },
    "2006": { title: "National campaigns", description: "Supported nationwide Measles & Rubella campaign; financed the Hepatitis B drive." },
    "2014": { title: "Health Contribution transferred", description: "HC moved to BHTF; Fund began financing both essential drugs and vaccines." },
    "2017": { title: "HPV vaccine co-financed", description: "Co-financed with the Australian Cervical Cancer Foundation (ACCF)." },
    "2018": { title: "Autonomous & Pentavalent", description: "Delinked from MoH; supported Pentavalent Vaccine introduction with GAVI." },
    "2019": { title: "PCV & Influenza funded", description: "Funded introduction of Pneumococcal Conjugate and Influenza vaccines." },
    "2026": { title: "26 years of service to the nation", description: "26 unbroken years sustaining primary healthcare financing for essential medicines and vaccines across all 20 Dzongkhags." },
  };
  const milestonesToRender = liveMilestones.length > 0
    ? liveMilestones.map((milestone) => {
        const yearKey = milestone.year.match(/^\d{4}/)?.[0] || milestone.year;
        const original = seededMilestones[yearKey];
        const unchanged = original && milestone.title === original.title && milestone.description === original.description;
        const displayYear = yearKey === "2014" ? "2014–15" : milestone.year;
        return {
          year: displayYear,
          title: unchanged
            ? localizedMilestones.find((item) => item.year.startsWith(yearKey))?.title || milestone.title
            : milestone.title,
          desc: unchanged
            ? localizedMilestones.find((item) => item.year.startsWith(yearKey))?.desc || milestone.description
            : milestone.description,
          era: Number(yearKey) < 2010
            ? (isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)")
            : (isDzongkha ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "SCALING TO NATIONAL COVERAGE (2014–2026)"),
        };
      })
    : localizedMilestones;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 sm:pb-24 bg-[#FAF8F3]">
      {/* 1. Dignified Hero Header */}
      <PageHero
        title={t("story_page_title", "Our Story")}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("story_page_title", "Our Story") },
        ]}
      />

      {/* 2. Official Section 2 Story Narrative */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="story-narrative"
      >
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {isDzongkha
                ? "གཞི་བཙུགས་ཀྱི་ལོ་རྒྱུས་དང་ རྒྱལ་པོའི་མཐོང་སྣང་།"
                : "Founding Chronicle & Royal Vision"}
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              {t(
                "story_p1",
                "The Bhutan Health Trust Fund (BHTF) was established in 1998 with the objective of ensuring sustainable financing for essential medicines and vaccines in Bhutan. The Fund received its royal charter in 2000, which provides the foundation for its mandate and operations.",
              )}
            </p>
            <p>
              {t(
                "story_p2",
                "Since its establishment, BHTF has continued to strengthen its financial sustainability through prudent fund management and investment, supporting the continued provision of essential medicines and vaccines for the people of Bhutan.",
              )}
            </p>
          </div>

          {/* Dual Tribute Cards: His Majesty the Fourth Druk Gyalpo & Lyonpo Sangay Ngedup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Card 1: His Majesty the Fourth Druk Gyalpo with full, dignified portrait */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-amber-300/80 transition-all duration-300 group">
              <div className="space-y-4">
                {/* Dignified Header: Royal Title */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-serif">
                    {isDzongkha
                      ? "མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་མཆོག"
                      : "His Majesty the Fourth Druk Gyalpo"}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {isDzongkha
                      ? "འཇིགས་མེད་སེངྒེ་དབང་ཕྱུག • རྒྱལ་པོའི་བཀའ་ཤོག་ ༢༠༠༠ ཟླ་ ༨ ཚེས་ ༣"
                      : "Jigme Singye Wangchuck • Royal Charter 3 August 2000"}
                  </p>
                </div>

                {/* Dignified Portrait Plate: Full Face & Robes 100% Visible & Centered */}
                <div className="relative h-72 sm:h-80 md:h-[340px] w-full overflow-hidden rounded-2xl bg-[#FAF8F3] border border-slate-200/90 shadow-2xs flex items-center justify-center p-2 sm:p-3">
                  <img
                    src="/images/official/image1.png"
                    alt="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
                    className="max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="rounded-2xl border border-slate-200/80 border-l-4 border-l-amber-500 bg-[#FAF8F3] p-5">
                  <p className="font-serif text-sm sm:text-base italic leading-relaxed text-slate-800">
                    “No Bhutanese should ever have to choose between their health and their livelihood.”
                  </p>
                  <p className="mt-2 text-xs font-semibold text-slate-600">
                    {isDzongkha ? "— མི་དབང་འབྲུག་རྒྱལ་བཞི་པ། ༢༠༠༤" : "— His Majesty the Fourth Druk Gyalpo, 2004"}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Lyonpo Sangay Ngedup */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-emerald-300/80 transition-all duration-300 group">
              <div className="space-y-4">
                {/* Lyonpo Sangay Ngedup Header */}
                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-serif">
                    {isDzongkha ? "བློན་པོ་ སངས་རྒྱས་དངོས་གྲུབ།" : "Lyonpo Sangay Ngedup"}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {isDzongkha
                      ? "གསོ་བའི་བློན་པོ་ཟུར་པ། • འཕྲོད་བསྟེན་དོན་ལུ་གོམ་བགྲོད (༢༠༠༢)"
                      : "Hon'ble Former Health Minister • Move for Health (2002)"}
                  </p>
                </div>

                {/* Portrait Plate: Full Face & Robes 100% Visible & Centered */}
                <div className="relative h-72 sm:h-80 md:h-[340px] w-full overflow-hidden rounded-2xl bg-[#FAF8F3] border border-slate-200/90 shadow-2xs flex items-center justify-center p-2 sm:p-3">
                  <img
                    src="/images/official/image2.png"
                    alt="Hon'ble former Health Minister, Lyonpo Sangay Ngedup"
                    className="max-h-full max-w-full w-auto h-auto object-contain object-center rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Founding Context Callout */}
              <div className="mt-5 p-5 rounded-2xl bg-[#FAF8F3] border-l-4 border-emerald-600 border border-slate-200/70">
                <p className="text-xs sm:text-sm text-slate-800 italic font-serif leading-relaxed">
                  “A tree is only as strong as the hands that first planted it. Lyonpo Sangay Ngedup laid the foundation of BHTF, and its founding members nurtured it into life. We remain forever grateful for their vision and contributions.”
                </p>
                <p className="text-xs text-slate-600 font-sans mt-2 font-semibold">
                  {isDzongkha ? "— བློན་པོ་ སངས་རྒྱས་དངོས་གྲུབ།" : "— Lyonpo Sangay Ngedup"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 26 Years of Service: Milestones Timeline */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="milestones-timeline"
      >
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            {isDzongkha ? "བྱུང་རབས་རིམ་པ།" : "Milestones"}
          </h2>
        </div>

        {/* Horizontal Milestones Flow */}
        <div className="space-y-8">
          {/* Era 1: Foundational Years */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 text-amber-300 border border-emerald-700/60 text-xs font-mono font-bold shadow-xs">
                <span>
                  {isDzongkha ? "༡༩༩༨–༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "1998–2006 · FOUNDATIONAL YEARS"}
                </span>
              </span>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-600/60 to-transparent" />
            </div>

            <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-5 min-w-max">
                {milestonesToRender.slice(0, 4).map((m, idx) => (
                  <div
                    key={idx}
                    className="w-[280px] sm:w-[320px] bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-mono border border-emerald-200/80">
                          {m.year}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Era 2: Scaling to National Coverage */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-emerald-400 border border-slate-700 text-xs font-mono font-bold shadow-xs">
                <span>
                  {isDzongkha
                    ? "༢༠༡༤–༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།"
                    : "2014–2026 · SCALING TO NATIONAL COVERAGE"}
                </span>
              </span>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-slate-700 to-transparent" />
            </div>

            <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
              <div className="flex gap-5 min-w-max">
                {milestonesToRender.slice(4).map((m, idx) => (
                  <div
                    key={idx}
                    className="w-[280px] sm:w-[320px] bg-white p-6 rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-200 flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-block text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full font-mono border border-emerald-200/80">
                          {m.year}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                      </div>
                      <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900 leading-snug">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageRenderer sections={(loaderData?.page?.sections || []) as PageBlockSection[]} pageSlug="our-story" />

      {/* 4. Action Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#EAF6F5] text-slate-900 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs border border-[#00A896]/30">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black font-serif text-[#0B4F42]">
              {isDzongkha
                ? "མ་འོངས་མི་རབས་ཚུ་གི་དོན་ལུ་ འཕྲོད་བསྟེན་རང་དབང་སྲུང་སྐྱོབ་མཛད།"
                : "Safeguard Health Sovereignty for Future Generations"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-light">
              {isDzongkha
                ? "ཁྱོད་ཀྱི་ཞལ་འདེབས་འདི་ དངུལ་གྱི་རྒྱབ་སྐྱོར་ཙམ་མིན་པར་ འགྲོ་བ་མིའི་ཚེ་སྲོག་དང་ ཆེ་མཐོང་། མ་འོངས་མི་རབས་ཀྱི་ བདེ་སྐྱིད་ལུ་ མ་རྩ་བཙུགས་བཞག་འབད་མི་ཅིག་ཨིན།"
                : "Your contribution represents more than financial support; it is an investment in human life, dignity and the well-being of future generations."}
            </p>
          </div>
          <Link
            to="/donate"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B4F42] text-white font-bold text-sm shadow-md hover:bg-[#073C32] transition shrink-0 active:scale-95"
          >
            <Heart className="h-4 w-4 fill-current text-amber-300" />
            <span>{t("btn_donate_now", "Donate to BHTF")}</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
