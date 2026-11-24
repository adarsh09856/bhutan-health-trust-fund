import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { PageRenderer } from "@/components/page-renderer";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import drGyamboDirector from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import staffSonamChojay from "@/assets/bhtf/secretariat/sonam_chojay.jpg";
import staffThinleyWangchuk from "@/assets/bhtf/secretariat/thinley_wangchuk_v2026_sharp.jpg";
import staffRinchenPhuntsho from "@/assets/bhtf/secretariat/rinchen_phuntsho.jpg";
import staffTsheringChoden from "@/assets/bhtf/secretariat/tshering_choden.jpg";
import { useLanguage } from "@/lib/i18n/language-context";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";

export const Route = createFileRoute("/about/secretariat")({
  loader: async () => ({
    page: await getPublicPage({ data: { slug: "about-secretariat" } }).catch(() => null),
  }),
  head: () => ({
    meta: [
      { title: "Secretariat & Key Personnel | Bhutan Health Trust Fund" },
      {
        name: "description",
        content: "Director Dr. Gyambo Sithey, Bhutan Health Trust Fund Secretariat.",
      },
    ],
  }),
  component: SecretariatPage,
});

interface SecretariatMember {
  id: string;
  orderNumber: number;
  name: string;
  nameDz: string;
  designation: string;
  designationDz: string;
  division: string;
  divisionDz: string;
  bio: string;
  bioDz: string;
  image: string;
}

const secretariatMembers: SecretariatMember[] = [
  {
    id: "director-gyambo-sithey",
    orderNumber: 1,
    name: "Mr. Gyambo Sithey, PhD",
    nameDz: "འབུམ་རམས་པ་ རྒྱལ་མཚན་སི་ཐེ།",
    designation: "Director",
    designationDz: "མདོ་ཆེན།",
    division: "Secretariat",
    divisionDz: "དྲུང་ཆེན་ཡིག་ཚང་།",
    bio: "Mr. Gyambo Sithey serves as Director of the Bhutan Health Trust Fund Secretariat and Member Secretary to the Board of Directors. With extensive leadership in public health policy, epidemiological research, and health financing, he oversees the execution of Board policies, endowment capital growth, bilateral donor partnerships, and statutory governance.",
    bioDz:
      "འབུམ་རམས་པ་ རྒྱལ་མཚན་སི་ཐེ་མཆོག་གིས་ འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་དྲུང་ཆེན་ཡིག་ཚང་གི་མདོ་ཆེན་དང་ བཀོད་ཚོགས་ཀྱི་དྲུང་ཆེན་སྦེ་ཕྱག་ལཱ་གནངམ་ཨིན།",
    image: drGyamboDirector,
  },
  {
    id: "officer-sonam-chojay", orderNumber: 4,
    name: "Mr. Sonam Chojay", nameDz: "སྐུ་ཞབས་ བསོད་ནམས་ཆོས་རྒྱལ།",
    designation: "Accounts Officer", designationDz: "རྩིས་ཁྲ་འགོ་དཔོན།",
    division: "Administration & Finance Division", divisionDz: "སྲིད་སྐྱོང་དང་ དངུལ་རྩིས་སྡེ་ཚན།",
    bio: "Mr. Sonam Chojay oversees statutory accounting, financial reporting, and expenditure controls across the BHTF Secretariat. He ensures compliance with Royal Audit Authority standards, manages disbursement audits for healthcare procurements, and coordinates annual statutory financial statements.",
    bioDz: "སྐུ་ཞབས་ བསོད་ནམས་ཆོས་རྒྱལ་གྱིས་ དྲུང་ཆེན་ཡིག་ཚང་གི་ ཁྲིམས་མཐུན་རྩིས་ཁྲ་དང་ དངུལ་རྩིས་སྙན་ཞུ་ དེ་ལས་ ཟད་འགྲོ་དོ་དམ་ཚུ་གི་འགན་ཁུར་འབགཔ་ཨིན།",
    image: staffSonamChojay,
  },
  {
    id: "officer-thinley-wangchuk", orderNumber: 3,
    name: "Mr. Thinley Wangchuk", nameDz: "སྐུ་ཞབས་ འཕྲིན་ལས་དབང་ཕྱུག",
    designation: "Senior Investment Officer", designationDz: "མ་རྩ་བཙུགས་བཞག་འགོ་དཔོན་གཙོ་འཛིན།",
    division: "Investment Management Division", divisionDz: "མ་རྩ་བདག་སྐྱོང་སྡེ་ཚན།",
    bio: "Mr. Thinley Wangchuk leads endowment portfolio management, asset allocation strategies, and liquidity monitoring. He focuses on yield optimization across Royal Government Treasury Bonds, commercial term deposits, and sovereign investment instruments to safeguard BHTF’s capital reserves.",
    bioDz: "སྐུ་ཞབས་ འཕྲིན་ལས་དབང་ཕྱུག་གིས་ མ་རྩ་བཙུགས་བཞག་དང་ མ་རྩ་བགོ་བཀྲམ་ དེ་ལས་ དངུལ་རྐྱང་ཉེན་སྲུང་གི་ལས་དོན་ཚུ་འགན་ལེན་འབདཝ་ཨིན།",
    image: staffThinleyWangchuk,
  },
  {
    id: "staff-rinchen-phuntsho", orderNumber: 5,
    name: "Mr. Rinchen Phuntsho", nameDz: "སྐུ་ཞབས་ རིན་ཆེན་ཕུན་ཚོགས།",
    designation: "Driver / Support Logistics", designationDz: "སྣུམ་འཁོར་གཏོང་མི།",
    division: "Support Logistics", divisionDz: "རྒྱབ་སྐྱོར་དོ་དམ།",
    bio: "Mr. Rinchen Phuntsho manages essential transport logistics, emergency delivery support, and official mobility for the BHTF Secretariat, ensuring safe and reliable transit for critical documents and official operations across Bhutan.",
    bioDz: "སྐུ་ཞབས་ རིན་ཆེན་ཕུན་ཚོགས་ཀྱིས་ དྲུང་ཆེན་ཡིག་ཚང་གི་འགྲོ་འགྲུལ་དང་ རྒྱབ་སྐྱོར་ལས་དོན་ཚུ་འབདཝ་ཨིན།",
    image: staffRinchenPhuntsho,
  },
  {
    id: "officer-tshering-choden", orderNumber: 2,
    name: "Ms. Tshering Choden", nameDz: "སྐུ་ཞབས་ ཚེ་རིང་ཆོས་ལྡན།",
    designation: "Senior Program Officer", designationDz: "ལས་རིམ་འགོ་དཔོན་གཙོ་འཛིན།",
    division: "Programme Division", divisionDz: "ལས་རིམ་སྡེ་ཚན།",
    bio: "Ms. Tshering Choden coordinates nationwide procurement programmes for essential medicines, traditional medicines, and universal vaccines. Working closely with the Ministry of Health and international suppliers, she monitors supply-chain integrity and national healthcare needs.",
    bioDz: "སྐུ་ཞབས་ ཚེ་རིང་ཆོས་ལྡན་གྱིས་ གསོ་བའི་ལྷན་ཁག་དང་མཉམ་འབྲེལ་ཐོག་ སྨན་རྫས་དང་སྨན་ཁབ་མཁོ་སྒྲུབ་ལས་རིམ་ཚུ་འགོ་འདྲེན་འཐབ་ཨིན།",
    image: staffTsheringChoden,
  },
];

function SecretariatMemberCard({
  member,
  isActive,
  onToggle,
  isDzongkha,
}: {
  member: SecretariatMember;
  isActive: boolean;
  onToggle: () => void;
  isDzongkha: boolean;
}) {
  return (
    <div
      className={`group relative w-full rounded-3xl bg-white border-2 transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden cursor-pointer flex flex-col ${
        isActive
          ? "border-emerald-600 ring-4 ring-emerald-500/20 shadow-2xl"
          : "border-slate-200/90 hover:border-emerald-500/60"
      }`}
      style={{ minHeight: "530px" }}
    >
      {/* Front Face: Large centered uncropped photo + clean footer */}
      <div className="flex flex-col h-full w-full">
        {/* Photo Container: Generous height, centered photo, zero cropping */}
        <div className="relative w-full h-[360px] sm:h-[390px] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/40 flex items-center justify-center p-6 overflow-hidden">
          {/* Subtle decorative background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
          <span className="absolute left-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-slate-900/90 font-mono text-sm font-bold text-white shadow">{member.orderNumber}</span>

          {/* Centered, completely uncropped photo */}
          <img
            src={member.image}
            alt={isDzongkha ? member.nameDz : member.name}
            className="w-full h-full object-contain object-center drop-shadow-md group-hover:scale-105 transition-transform duration-500 relative z-10"
            loading="eager"
          />
        </div>

        {/* Front Footer Info */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
          <div>
            <span className="block text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold mb-1">{isDzongkha ? member.divisionDz : member.division}</span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-900 transition-colors leading-tight">
              {isDzongkha ? member.nameDz : member.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-1">
              {isDzongkha ? member.designationDz : member.designation}
            </p>
            <button
              type="button"
              aria-expanded={isActive}
              onClick={(event) => {
                event.stopPropagation();
                onToggle();
              }}
              className="mt-3 inline-flex rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              {isActive
                ? isDzongkha
                  ? "བསྡམས།"
                  : "Close Details"
                : isDzongkha
                  ? "ཞིབ་ཕྲ་སྟོན།"
                  : "View Details"}
            </button>
          </div>
        </div>
      </div>

      {/* DHI Signature Hover Reveal Overlay */}
      <div
        className={`absolute inset-0 bg-white/98 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 z-20 rounded-3xl border-2 border-emerald-600/50 shadow-2xl ${
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        }`}
      >
        {/* Top Header */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-slate-500">#{member.orderNumber}</span>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {isDzongkha ? member.nameDz : member.name}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-emerald-800 mt-0.5">
              {isDzongkha ? member.designationDz : member.designation}
            </p>
          </div>
        </div>

        {/* Middle: Institutional Bio & Responsibilities */}
        <div className="my-3 py-2 border-y border-slate-200/80 overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-1 space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {isDzongkha ? member.bioDz : member.bio}
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
          className="self-start rounded-full bg-slate-100 px-3.5 py-2 text-xs font-bold text-slate-800 hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
        >
          {isDzongkha ? "བསྡམས།" : "Close Details"}
        </button>
      </div>
    </div>
  );
}

function SecretariatPage() {
  const { page } = Route.useLoaderData();
  const { t, isDzongkha } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        title={t("secretariat_page_title", "Secretariat")}
        subtitle={t(
          "secretariat_page_subtitle",
          "The executive arm of the Bhutan Health Trust Fund executing day-to-day operations, endowment investments, and healthcare procurement disbursements.",
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("secretariat_page_title", "Secretariat") },
        ]}
      />

      {/* Secretariat hierarchy: director, programme, investment, finance, support logistics. */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="secretariat-roster"
      >
        <div className="max-w-xl mx-auto mb-10 sm:mb-14">
          <SecretariatMemberCard member={secretariatMembers[0]} isActive={activeCardId === secretariatMembers[0].id} onToggle={() => handleToggleCard(secretariatMembers[0].id)} isDzongkha={isDzongkha} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {secretariatMembers
            .slice(1)
            .sort((a, b) => a.orderNumber - b.orderNumber)
            .map((member) => (
            <SecretariatMemberCard key={member.id} member={member} isActive={activeCardId === member.id} onToggle={() => handleToggleCard(member.id)} isDzongkha={isDzongkha} />
            ))}
        </div>
      </section>

      <PageRenderer sections={(page?.sections || []) as PageBlockSection[]} pageSlug="about-secretariat" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
