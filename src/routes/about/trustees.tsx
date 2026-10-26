import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { Sparkles } from "lucide-react";
import trusteeLyonpoTandin from "@/assets/bhtf/trustees/lyonpo_tandin_wangchuk.jpg";
import trusteeLopenTshering from "@/assets/bhtf/trustees/lopen_tshering_wangchuk.jpg";
import trusteeDrPhub from "@/assets/bhtf/trustees/dr_phub_tshering.jpg";
import trusteePemaTshering from "@/assets/bhtf/trustees/pema_tshering.jpg";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";
import { FiduciaryMemberCard, type FiduciaryMember } from "@/components/fiduciary-member-card";

export const Route = createFileRoute("/about/trustees")({
  head: () => ({
    meta: [
      { title: "Board of Trustees | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory of the Board of Trustees of the Bhutan Health Trust Fund (Table 1.1), ministerial leadership, and fiduciary governance.",
      },
    ],
  }),
  component: TrusteesPage,
});

const trusteesList: FiduciaryMember[] = [
  {
    id: "trustee-tandin",
    orderNumber: 1,
    name: "HE Lyonpo Tandin Wangchuk",
    nameDz: "སྐུ་ཞབས་ བློན་པོ་ བསྟན་འཛིན་དབང་ཕྱུག",
    role: "Chairperson, Board of Trustees",
    roleDz: "ཚོགས་གཙོ། བཀོད་ཚོགས་ཀྱི་དབུ་ཁྲིད།",
    organization: "Minister, Ministry of Health",
    organizationDz: "གསོ་བའི་བློན་པོ། གསོ་བའི་ལྷན་ཁག",
    badge: "Chairperson • Table 1.1",
    badgeDz: "ཚོགས་གཙོ།",
    desc: "Provides supreme ministerial leadership, steering sovereign health financing policies and aligning BHTF endowment disbursements with Bhutan's constitutional mandate for free universal primary healthcare. Oversees the Board of Trustees in safeguarding long-term fiscal resilience.",
    descDz: "གསོ་བའི་བློན་པོ་མཆོག་གིས་ བཀོད་ཚོགས་ཀྱི་ཚོགས་གཙོ་སྦེ་ མཛད་འགན་བཞེས་ཏེ་ རྒྱལ་ཁབ་ནང་ རིན་མེད་གསོ་བའི་ཞབས་ཏོག་ གཏན་འཇགས་སྦེ་ བཞག་ཐབས་ལུ་ སྲིད་བྱུས་ཀྱི་ དབུ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Ministerial Leadership",
      "Universal Health Coverage",
      "Sovereign Guarantee",
      "Board Governance",
    ],
    tagsDz: [
      "བློན་པོའི་དབུ་ཁྲིད།",
      "རིན་མེད་གསོ་བའི་ཞབས་ཏོག",
      "གཞུང་གི་ཁག་འཁྱགས།",
      "བཀོད་ཚོགས་འགོ་ཁྲིད།",
    ],
    photo: trusteeLyonpoTandin,
    theme: "emerald",
  },
  {
    id: "trustee-lopen",
    orderNumber: 2,
    name: "Lopen Tshering Wangchuk",
    nameDz: "སློབ་དཔོན་ ཚེ་རིང་དབང་ཕྱུག",
    role: "Trustee",
    roleDz: "ཚོགས་མི།",
    organization: "Secretary, Monastic Council for Administration & Development, Zhung Dratshang",
    organizationDz: "དྲུང་ཆེན། གཞུང་གྲྭ་ཚང་།",
    badge: "Zhung Dratshang Representative",
    badgeDz: "གཞུང་གྲྭ་ཚང་།",
    desc: "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom. Bridges traditional spiritual values with nationwide health welfare.",
    descDz: "གཞུང་གྲྭ་ཚང་གི་ སྐུ་ཚབ་སྦེ་ མཛད་འགན་བཞེས་ཏེ་ དམ་པའི་ཆོས་དང་མཐུན་པའི་ བྱམས་སྙིང་རྗེའི་ གསོ་བའི་ཞབས་ཏོག་དང་ ཁྲིམས་མཐུན་བློ་གཏད་ཀྱི་ ཕྱག་ལཱ་གནང་དོ་ཡོད།",
    tags: [
      "Ethical Stewardship",
      "Compassionate Care",
      "Zhung Dratshang",
      "Monastic Welfare",
    ],
    tagsDz: [
      "དམ་ཆོས་ལམ་ལུགས།",
      "བྱམས་སྙིང་རྗེའི་ཞབས་ཏོག",
      "གཞུང་གྲྭ་ཚང་།",
      "དགོན་སྡེའི་ཕན་བདེ།",
    ],
    photo: trusteeLopenTshering,
    theme: "emerald",
  },
  {
    id: "trustee-ugyen",
    orderNumber: 3,
    name: "Ms. Ugyen Choden",
    nameDz: "སྐུ་ཞབས་ ཨོ་རྒྱན་ཆོས་ལྡན།",
    role: "Trustee & AMC Chairperson",
    roleDz: "ཚོགས་མི་དང་ མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་གཙོ།",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    organizationDz: "དངུལ་ལས་དབང་འཛིན་གྱི་ ལས་ཚབ་མངའ་བདག",
    badge: "Central Bank / AMC Chair",
    badgeDz: "དངུལ་ལས་དབང་འཛིན།",
    desc: "Brings extensive central banking, monetary policy, and financial regulatory expertise. As Chairperson of the Asset Management Committee (AMC), she directs the Fund's 70–20–10 investment model, foreign currency allocations, and capital preservation benchmarks.",
    descDz: "རྒྱལ་གཞུང་དངུལ་ལས་དབང་འཛིན་གྱི་ ཉམས་མྱོང་དང་བསྟུན་ མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་ (AMC) གི་ ཚོགས་གཙོ་སྦེ་ མ་དངུལ་སྐྱེད་འཕེལ་དང་ ༧༠-༢༠-༡༠ ལག་ལེན་ཐབས་བྱུས་ཚུ་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Central Banking",
      "Monetary Policy",
      "70-20-10 Model",
      "Foreign Reserves",
    ],
    tagsDz: [
      "དངུལ་ཁང་སྲིད་བྱུས།",
      "མ་རྩ་བཙུགས་བཞག",
      "༧༠-༢༠-༡༠ ལམ་ལུགས།",
      "ཕྱི་དངུལ་ཉེན་སྲུང་།",
    ],
    photo: trusteeUgyenChoden,
    theme: "emerald",
  },
  {
    id: "trustee-chencho",
    orderNumber: 4,
    name: "Mr. Chencho T. Namgay",
    nameDz: "སྐུ་ཞབས་ སྤེན་ཅོ་ ཏི་ རྣམ་རྒྱལ།",
    role: "Trustee & AMC Member",
    roleDz: "ཚོགས་མི། (མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་མི)",
    organization: "Chief Executive Officer, National Pension and Provident Fund (NPPF)",
    organizationDz: "གཙོ་འཛིན་འགོ་དཔོན། རྒྱལ་ཡོངས་རྒས་ཕོགས་དང་ ལྟོ་ཕོགས་མ་དངུལ།",
    badge: "Pension Fiduciary / AMC Member",
    badgeDz: "NPPF གཙོ་འཛིན།",
    desc: "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight from Bhutan's premier pension and provident fund institution. Guides risk-adjusted asset returns and diversification.",
    descDz: "རྒྱལ་ཡོངས་རྒས་ཕོགས་མ་དངུལ་ (NPPF) གི་ གཙོ་འཛིན་འགོ་དཔོན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ མ་རྩ་བགོ་བཀྲམ་དང་ ཉེན་ཁ་དོ་དམ་གྱི་ གྲོས་སྟོན་གནང་དོ་ཡོད།",
    tags: [
      "Institutional Investments",
      "Portfolio Diversification",
      "Risk Governance",
      "Yield Optimization",
    ],
    tagsDz: [
      "མ་རྩ་བགོ་བཀྲམ།",
      "ཉེན་ཁ་དོ་དམ།",
      "སྐྱེད་འཕེལ་ཐབས་བྱུས།",
      "ཚོགས་ཆུང་ཚོགས་མི།",
    ],
    photo: trusteeChenchoNamgay,
    theme: "emerald",
  },
  {
    id: "trustee-norbu",
    orderNumber: 5,
    name: "Mr. Norbu Dendup",
    nameDz: "སྐུ་ཞབས་ ནོར་བུ་དོན་གྲུབ།",
    role: "Trustee & AMC Member",
    roleDz: "ཚོགས་མི། (མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་མི)",
    organization: "Director, Department of Treasury and Accounts, Ministry of Finance",
    organizationDz: "མདོ་ཆེན། རྩིས་མཛོད་དང་རྩིས་ཁྲ་ལས་ཁུངས། དངུལ་རྩིས་ལྷན་ཁག",
    badge: "Treasury Governance / AMC Member",
    badgeDz: "དངུལ་རྩིས་ལྷན་ཁག",
    desc: "Oversees sovereign public financial management, government treasury bonds, and state budget alignment under the Ministry of Finance. Ensures robust fiduciary integration between the national exchequer and the Health Trust Fund.",
    descDz: "དངུལ་རྩིས་ལྷན་ཁག་གི་ མདོ་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ གཞུང་གི་བུན་འཛིན་དང་ རྒྱལ་གཞུང་རྩིས་མཛོད་ མཉམ་འབྲེལ་གྱི་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Public Financial Management",
      "Treasury Bonds",
      "Budget Alignment",
      "Audit Controls",
    ],
    tagsDz: [
      "རྒྱལ་གཞུང་རྩིས་མཛོད།",
      "གཞུང་གི་བུན་འཛིན།",
      "འཆར་དངུལ་མཉམ་སྦྱོར།",
      "རྩིས་ཞིབ་དོ་དམ།",
    ],
    photo: trusteeNorbuDendup,
    theme: "emerald",
  },
  {
    id: "trustee-pema",
    orderNumber: 6,
    name: "Mr. Pema Tshering",
    nameDz: "སྐུ་ཞབས་ པདྨ་ཚེ་རིང་།",
    role: "Trustee (Independent Director)",
    roleDz: "རང་དབང་ཅན་གྱི་ ཚོགས་མི།",
    organization: "Independent Fiduciary Expert / Former CEO, T Bank Ltd.",
    organizationDz: "དངུལ་ཁང་གཙོ་འཛིན་ཟུར་པ། ཊི་དངུལ་ཁང་།",
    badge: "Financial Sector Specialist",
    badgeDz: "དངུལ་ཁང་ཉམས་མྱོང་ཅན།",
    desc: "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan. Provides impartial financial oversight and external audit alignment.",
    descDz: "ཚོང་འབྲེལ་དངུལ་ཁང་དང་ ཚོང་འབྲེལ་མ་རྩ་ དོ་དམ་གྱི་ ཉམས་མྱོང་རྒྱ་ཆེན་ཡོད་མི་ རང་དབང་ཅན་གྱི་ འགོ་དཔོན་སྦེ་ བཀོད་ཚོགས་ནང་ ཕྱག་ལཱ་གནང་དོ་ཡོད།",
    tags: [
      "Commercial Banking",
      "Capital Markets",
      "Corporate Governance",
      "Independent Audit",
    ],
    tagsDz: [
      "ཚོང་འབྲེལ་དངུལ་ཁང་།",
      "མ་རྩའི་ཁྲོམ་ར།",
      "རང་དབང་ཅན་གྱི་ལྟ་རྟོག",
      "བཀོད་ཚོགས་ཚོགས་མི།",
    ],
    photo: trusteePemaTshering,
    theme: "emerald",
  },
  {
    id: "trustee-phub",
    orderNumber: 7,
    name: "Dr. Phub Tshering",
    nameDz: "འབུམ་རམས་པ་ ཕུར་བུ་ཚེ་རིང་།",
    role: "Trustee",
    roleDz: "ཚོགས་མི།",
    organization: "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)",
    organizationDz: "གསོ་རིག་མདོ་ཆེན། རྒྱལ་ཡོངས་གཙོ་བསྟེན་སྨན་ཁང་།",
    badge: "Clinical Specialist / Tertiary Care",
    badgeDz: "གསོ་རིག་དམིགས་བསལ་མཁས་པ།",
    desc: "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment, directly representing the nation's premier tertiary referral hospital. Bridges financial allocations with on-the-ground patient care realities.",
    descDz: "རྒྱལ་ཡོངས་གཙོ་བསྟེན་སྨན་ཁང་ (JDWNRH) གི་ གསོ་རིག་མདོ་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ འབུམ་རམས་པ་གིས་ སྨན་རྫས་ཀྱི་སྤུས་ཚད་དང་ ནད་པའི་ཞབས་ཏོག་གི་ གྲོས་སྟོན་གནང་དོ་ཡོད།",
    tags: [
      "Clinical Governance",
      "National Formulary",
      "Tertiary Healthcare",
      "Drug Efficacy",
    ],
    tagsDz: [
      "གསོ་རིག་ལམ་ལུགས།",
      "རྒྱལ་ཡོངས་སྨན་རྫས་ཐོ།",
      "སྨན་ཁང་ལྟེ་བ།",
      "སྨན་གྱི་སྤུས་ཚད།",
    ],
    photo: trusteeDrPhub,
    theme: "emerald",
  },
  {
    id: "trustee-gyambo",
    orderNumber: 8,
    name: "Mr. Gyambo Sithey, PhD",
    nameDz: "སྐུ་ཞབས་ རྒྱལ་མཚན་སི་ཐེ། (འབུམ་རམས་པ)",
    role: "Director & Member Secretary",
    roleDz: "མདོ་ཆེན། / ཚོགས་མི་དྲུང་ཆེན།",
    organization: "Director, Bhutan Health Trust Fund Secretariat",
    organizationDz: "མདོ་ཆེན། འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ དྲུང་ཆེན་ཡིག་ཚང་།",
    badge: "Member Secretary • Article 5.3",
    badgeDz: "ཚོགས་མི་དྲུང་ཆེན།",
    desc: "Serves as the ex-officio Member Secretary of the Board of Trustees pursuant to Article 5, Clause 5.3 of the Royal Charter. Heads the Secretariat in executing all Board decisions, managing sovereign endowment disbursements, and steering nationwide healthcare financing.",
    descDz: "རྒྱལ་པོའི་བཀའ་ཤོག་གི་དགོངས་དོན་ལྟར་ བཀོད་ཚོགས་ཀྱི་ ཚོགས་མི་དྲུང་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་སྟེ་ བཀོད་ཚོགས་ཀྱི་གྲོས་ཆོད་ཚུ་ ལག་ལེན་འཐབ་ནི་དང་ དྲུང་ཆེན་ཡིག་ཚང་གི་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Ex-Officio Member Secretary",
      "Executive Directorate",
      "Board Governance",
      "Operations & Policy",
    ],
    tagsDz: [
      "ཚོགས་མི་དྲུང་ཆེན།",
      "དྲུང་ཆེན་ཡིག་ཚང་།",
      "བཀོད་ཚོགས་གྲོས་ཆོད།",
      "སྲིད་བྱུས་ལག་ལེན།",
    ],
    photo: trusteeDrGyambo,
    theme: "emerald",
  },
];

function TrusteesPage() {
  const { t, isDzongkha } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        badge={t("trustees_page_badge", "Section 1.1 • Fiduciary Governance")}
        title={t("trustees_page_title", "Board of trustees")}
        subtitle={t(
          "trustees_page_subtitle",
          "The Bhutan Health Trust Fund operates under the guidance of the Board of Directors, headed by a Chairperson, providing strategic direction, accountability, and long-term sustainability."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("trustees_page_title", "Board of trustees") },
        ]}
      />

      {/* Complete Trustees Gallery Grid in Clean Large Cards with DHI-Style Interactive Hover Reveal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="trustees-roster">
        <SectionEditBadge
          label="Board of Trustees Roster"
          pageSlug="about-trustees"
          sectionId="trustees-roster"
          studioHref="/admin/trustees"
          initialData={{
            title: "1.1 Board of trustees",
            subtitle: "Table 1.1 official listing of Board of Trustees members and their positions.",
            badge: "Table 1.1 • Board of Trustees",
          }}
        />

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block font-mono">
            {t("trustees_table_badge", "Table 1.1 • High-Level Governance")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            {isDzongkha
              ? "རེའུ་མིག་ ༡.༡ • བཀོད་ཚོགས་ཀྱི་འཐུས་མི་ཚུ།"
              : "Table 1.1 • Fiduciary Board of Directors"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light max-w-2xl mx-auto">
            {isDzongkha
              ? "ཁ་གསལ་གཟིགས་ནིའི་དོན་ལུ་ བཀོད་ཚོགས་ཚོགས་མིའི་པར་གུར་ མཛུབ་རིས་ (Hover) བཞག་གནང་། ཚོགས་མི་རེ་རེ་བཞིན་གྱི་ ལོ་རྒྱུས་དང་ འགན་ཁུར་ མཛད་འགན་ཚུ་ གསལ་ཏོག་ཏོ་སྦེ་ མཐོང་ཚུགས།"
              : "Hover over any trustee card to reveal detailed institutional biographies, statutory responsibilities, and fiduciary portfolios."}
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>{isDzongkha ? "པར་གུར་ Hover འབད་དེ་ ཁ་གསལ་གཟིགས།" : "Interactive Hover Reveal (DHI Style)"}</span>
            </span>
          </div>
        </div>

        {/* 1. Chairperson Featured Leadership Card (#1 HE Lyonpo Tandin Wangchuk) */}
        <div className="max-w-xl mx-auto mb-10 sm:mb-14">
          <FiduciaryMemberCard
            member={trusteesList[0]}
            isActive={activeCardId === trusteesList[0].id}
            onToggle={() => handleToggleCard(trusteesList[0].id)}
            isDzongkha={isDzongkha}
          />
        </div>

        {/* 2. Key Trustees Large 3-Column Grid (#2 to #7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto mb-12 sm:mb-16">
          {trusteesList.slice(1, 7).map((member) => (
            <FiduciaryMemberCard
              key={member.id}
              member={member}
              isActive={activeCardId === member.id}
              onToggle={() => handleToggleCard(member.id)}
              isDzongkha={isDzongkha}
            />
          ))}
        </div>

        {/* 3. Director & Member Secretary Featured Anchor Card (#8 Mr. Gyambo Sithey, PhD) */}
        <div className="max-w-xl mx-auto pt-6 border-t border-slate-200/80">
          <div className="text-center mb-6 space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-800">
              {isDzongkha ? "ལས་འཛིན་དབུ་ཁྲིད། • རྩ་ཁྲིམས་ ༥.༣" : "Executive Directorate • Article 5.3"}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900">
              {isDzongkha ? "མདོ་ཆེན་དང་ ཚོགས་མི་དྲུང་ཆེན།" : "Director & Member Secretary"}
            </h3>
          </div>
          <FiduciaryMemberCard
            member={trusteesList[7]}
            isActive={activeCardId === trusteesList[7].id}
            onToggle={() => handleToggleCard(trusteesList[7].id)}
            isDzongkha={isDzongkha}
          />
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
