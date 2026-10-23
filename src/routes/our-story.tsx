import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicMilestones, getPublicPage } from "@/lib/api/public.functions";
import type { Milestone, PageBlockSection } from "@/lib/db/schema";
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
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/our-story")({
  loader: async () => {
    try {
      const milestones = await getPublicMilestones().catch(() => []);
      return {
        liveMilestones: milestones || [],
      };
    } catch {
      return {
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

function OurStoryPage() {
  const loaderData = Route.useLoaderData();
  const [liveMilestones, setLiveMilestones] = useState<Milestone[]>(loaderData?.liveMilestones || []);
  const { t, isDzongkha } = useLanguage();

  useEffect(() => {
    getPublicMilestones()
      .then((res) => {
        if (res && res.length > 0) setLiveMilestones(res);
      })
      .catch(() => {});
  }, []);

  const localizedMilestones = [
    {
      year: "1998",
      title: t("milestone_1998_title", "Launched in Geneva"),
      desc: t("milestone_1998_desc", "BHTF launched on 12th May at the World Health Organization headquarters in Geneva."),
      era: isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)",
    },
    {
      year: "2000",
      title: t("milestone_2000_title", "Royal Charter issued"),
      desc: t("milestone_2000_desc", "Secretariat established; Charter issued by the Fourth Druk Gyalpo on 3rd August."),
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
      desc: t("milestone_2006_desc", "Supported nationwide Measles & Rubella campaign; financed the Hepatitis B drive."),
      era: isDzongkha ? "༡༩༩༨-༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "FOUNDATIONAL YEARS (1998–2006)",
    },
    {
      year: "2014–15",
      title: t("milestone_2014_title", "Health Contribution transferred"),
      desc: t("milestone_2014_desc", "HC moved to BHTF; Fund began financing both essential drugs and vaccines."),
      era: isDzongkha ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2017",
      title: t("milestone_2017_title", "HPV vaccine co-financed"),
      desc: t("milestone_2017_desc", "Co-financed with the Australian Cervical Cancer Foundation (ACCF)."),
      era: isDzongkha ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2018",
      title: t("milestone_2018_title", "Autonomous & Pentavalent"),
      desc: t("milestone_2018_desc", "Delinked from MoH; supported Pentavalent Vaccine introduction with GAVI."),
      era: isDzongkha ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2019",
      title: t("milestone_2019_title", "PCV & Influenza funded"),
      desc: t("milestone_2019_desc", "Funded introduction of Pneumococcal Conjugate and Influenza vaccines."),
      era: isDzongkha ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
    {
      year: "2026",
      title: t("milestone_2026_title", "26 years of service to the nation"),
      desc: t("milestone_2026_desc", "26 unbroken years sustaining primary healthcare financing for essential medicines and vaccines across all 20 Dzongkhags."),
      era: isDzongkha ? "༢༠༡༤-༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "SCALING TO NATIONAL COVERAGE (2014–2026)",
    },
  ];

  const milestonesToRender = localizedMilestones;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 sm:pb-24 bg-[#FAF8F3]">
      {/* 1. Dignified Hero Header */}
      <PageHero
        badge={t("story_page_badge", "Section 2 • Historical Journey")}
        title={t("story_page_title", "Our Story")}
        subtitle={t(
          "story_page_subtitle",
          "The founding chronicle of the Bhutan Health Trust Fund and 26 years of service to the nation."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("story_page_title", "Our Story") },
        ]}
      />

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
              {t("story_mandate_badge", "Founding Mandate • Est. 1998")}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t("story_page_title", "Our Story")}
            </h2>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              {t(
                "story_p1",
                "The Bhutan Health Trust Fund (BHTF) was established in 1998 with the objective of ensuring sustainable financing for essential medicines and vaccines in Bhutan. The Fund received its royal charter in 2000, which provides the foundation for its mandate and operations."
              )}
            </p>
            <p>
              {t(
                "story_p2",
                "Since its establishment, BHTF has continued to strengthen its financial sustainability through prudent fund management and investment, supporting the continued provision of essential medicines and vaccines for the people of Bhutan."
              )}
            </p>
          </div>

          {/* Dual Tribute Cards: His Majesty the Fourth Druk Gyalpo & Lyonpo Sangay Ngedup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Card 1: His Majesty the Fourth Druk Gyalpo with full, dignified portrait */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-amber-300/80 transition-all duration-300 group">
              <div className="space-y-4">
                {/* Dignified Header: Royal Badge & Title */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 font-bold inline-block">
                    {isDzongkha ? "རྒྱལ་པོའི་སྦྱིན་བདག" : "Royal Benefactor"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-serif">
                    {isDzongkha ? "མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་མཆོག" : "His Majesty the Fourth Druk Gyalpo"}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {isDzongkha ? "འཇིགས་མེད་སེངྒེ་དབང་ཕྱུག • རྒྱལ་པོའི་བཀའ་ཤོག་ ༢༠༠༠" : "Jigme Singye Wangchuck • Royal Charter 2000"}
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
              </div>

              {/* Royal Quote Callout */}
              <div className="mt-5 p-5 rounded-2xl bg-[#FAF8F3] border-l-4 border-amber-500 border border-slate-200/70">
                <p className="text-sm sm:text-base text-slate-900 italic font-serif leading-relaxed">
                  {t(
                    "quote_king_text",
                    "“No Bhutanese should ever have to choose between their health and their livelihood.”"
                  )}
                </p>
                <p className="text-xs text-slate-600 font-sans mt-2 font-semibold">
                  {isDzongkha ? "— མི་དབང་འབྲུག་རྒྱལ་བཞི་པ་མཆོག ༢༠༠༤" : "— His Majesty the Fourth Druk Gyalpo, 2004"}
                </p>
              </div>
            </div>

            {/* Card 2: Lyonpo Sangay Ngedup */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-emerald-300/80 transition-all duration-300 group">
              <div className="space-y-4">
                {/* Founding Architect Header */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/80 font-bold inline-block">
                    {isDzongkha ? "གཞི་བཙུགས་འཆར་བཀོད་པ།" : "Founding Architect"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug font-serif">
                    {isDzongkha ? "བློན་པོ་ སངས་རྒྱས་དངོས་གྲུབ།" : "Lyonpo Sangay Ngedup"}
                  </h3>
                  <p className="text-xs text-slate-500 font-sans">
                    {isDzongkha ? "གསོ་བའི་བློན་པོ་ཟུར་པ། • འཕྲོད་བསྟེན་དོན་ལུ་གོམ་བགྲོད (༢༠༠༢)" : "Hon'ble Former Health Minister • Move for Health (2002)"}
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

              {/* Quote Callout */}
              <div className="mt-5 p-5 rounded-2xl bg-[#FAF8F3] border-l-4 border-emerald-600 border border-slate-200/70">
                <p className="text-sm sm:text-base text-slate-900 italic font-serif leading-relaxed">
                  {t(
                    "quote_lyonpo_text",
                    "“A tree is only as strong as the hands that first planted it. Lyonpo Sangay Ngedup laid the foundation of BHTF, and its founding members nurtured it into life. We remain forever grateful for their vision and contributions.”"
                  )}
                </p>
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
            {isDzongkha ? "བྱུང་རབས་ལམ་འགྲོས།" : "Milestones Timeline"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-serif">
            {isDzongkha ? "རྒྱལ་ཁབ་ལུ་ ལོ་ངོ་ ༢༦ གི་ཞབས་ཏོག: བྱུང་རབས་རིམ་པ།" : "26 Years of Service: Milestones"}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light">
            {isDzongkha
              ? "ཇི་ནི་བཱ་ལུ་ འགོ་འབྱེད་མཛད་པ་ལས་ རྒྱལ་ཡོངས་ཀྱི་ སྨན་ཁབ་སྲུང་སྐྱོབ་ཀྱི་ ཀ་ཆེན་ལུ་གྱུར་ཚུན་གྱི་ ལམ་འགྲོས།"
              : "From launch in Geneva to a nationwide immunization backbone — the programmatic journey behind the Fund."}
          </p>
        </div>

        <div className="relative border-l-2 border-emerald-500/60 ml-4 sm:ml-36 space-y-8 sm:space-y-10">
          {milestonesToRender.map((m, idx) => (
            <div key={idx}>
              {/* Foundational Years Era Header */}
              {idx === 0 && (
                <div className="relative pl-6 sm:pl-10 -ml-1 sm:-ml-4 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950 text-amber-300 border border-emerald-700/60 text-xs font-mono font-bold shadow-xs">
                    <span>{isDzongkha ? "༡༩༩༨–༢༠༠༦ · གཞི་བཙུགས་དུས་རབས།" : "1998–2006 · FOUNDATIONAL YEARS"}</span>
                  </div>
                </div>
              )}

              {/* Scaling to National Coverage Era Header */}
              {m.year.includes("2014") && (
                <div className="relative pl-6 sm:pl-10 -ml-1 sm:-ml-4 my-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-emerald-400 border border-slate-700 text-xs font-mono font-bold shadow-xs">
                    <span>{isDzongkha ? "༢༠༡༤–༢༠༢༦ · རྒྱལ་ཡོངས་ཁྱབ་ཚད་རྒྱ་བསྐྱེད།" : "2014–2026 · SCALING TO NATIONAL COVERAGE"}</span>
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
