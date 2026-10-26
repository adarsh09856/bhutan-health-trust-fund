import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Scale,
  Sparkles,
} from "lucide-react";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";
import { FiduciaryMemberCard, type FiduciaryMember } from "@/components/fiduciary-member-card";

export const Route = createFileRoute("/about/committees")({
  head: () => ({
    meta: [
      { title: "Asset Management Committee (AMC) | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory and mandate of the BHTF Asset Management Committee (AMC), Table 1.2 members, and the 70–20–10 operating model.",
      },
    ],
  }),
  component: CommitteesPage,
});

const amcMembersList: FiduciaryMember[] = [
  {
    id: "amc-ugyen",
    orderNumber: 1,
    name: "Ms. Ugyen Choden",
    nameDz: "སྐུ་ཞབས་ ཨོ་རྒྱན་ཆོས་ལྡན།",
    role: "Chairperson, Asset Management Committee",
    roleDz: "ཚོགས་གཙོ། མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་།",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    organizationDz: "དངུལ་ལས་དབང་འཛིན་གྱི་ ལས་ཚབ་མངའ་བདག",
    badge: "Chairperson (AMC) • Table 1.2",
    badgeDz: "AMC ཚོགས་གཙོ།",
    desc: "Provides high-level central banking, liquidity, and macroeconomic portfolio oversight, guiding BHTF capital preservation strategies, offshore foreign exchange investments, and yield optimization benchmarks.",
    descDz: "རྒྱལ་གཞུང་དངུལ་ལས་དབང་འཛིན་གྱི་ ཉམས་མྱོང་དང་བསྟུན་ མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་གཙོ་སྦེ་ མ་དངུལ་སྐྱེད་འཕེལ་དང་ ༧༠-༢༠-༡༠ ལག་ལེན་ཐབས་བྱུས་ཚུ་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
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
    theme: "amber",
  },
  {
    id: "amc-chencho",
    orderNumber: 2,
    name: "Mr. Chencho T. Namgay",
    nameDz: "སྐུ་ཞབས་ སྤེན་ཅོ་ ཏི་ རྣམ་རྒྱལ།",
    role: "Member, Asset Management Committee",
    roleDz: "ཚོགས་མི། མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་།",
    organization: "Chief Executive Officer, National Pension and Provident Fund (NPPF)",
    organizationDz: "གཙོ་འཛིན་འགོ་དཔོན། རྒྱལ་ཡོངས་རྒས་ཕོགས་དང་ ལྟོ་ཕོགས་མ་དངུལ།",
    badge: "Member (AMC) • Table 1.2",
    badgeDz: "AMC ཚོགས་མི།",
    desc: "Brings extensive institutional fund management, asset allocation, and risk management insight from Bhutan's premier pension fiduciary, advising on fixed-income yields and corpus diversification.",
    descDz: "རྒྱལ་ཡོངས་རྒས་ཕོགས་མ་དངུལ་ (NPPF) གི་ གཙོ་འཛིན་འགོ་དཔོན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ མ་རྩ་བགོ་བཀྲམ་དང་ ཉེན་ཁ་དོ་དམ་གྱི་ གྲོས་སྟོན་གནང་དོ་ཡོད།",
    tags: [
      "Institutional Investment",
      "Pension Funds",
      "Risk Governance",
      "Fixed Income",
    ],
    tagsDz: [
      "མ་རྩ་བགོ་བཀྲམ།",
      "ཉེན་ཁ་དོ་དམ།",
      "སྐྱེད་འཕེལ་ཐབས་བྱུས།",
      "ཚོགས་ཆུང་ཚོགས་མི།",
    ],
    photo: trusteeChenchoNamgay,
    theme: "amber",
  },
  {
    id: "amc-norbu",
    orderNumber: 3,
    name: "Mr. Norbu Dendup",
    nameDz: "སྐུ་ཞབས་ ནོར་བུ་དོན་གྲུབ།",
    role: "Member, Asset Management Committee",
    roleDz: "ཚོགས་མི། མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་།",
    organization: "Director, Department of Treasury and Accounts, Ministry of Finance",
    organizationDz: "མདོ་ཆེན། རྩིས་མཛོད་དང་རྩིས་ཁྲ་ལས་ཁུངས། དངུལ་རྩིས་ལྷན་ཁག",
    badge: "Member (AMC) • Table 1.2",
    badgeDz: "AMC ཚོགས་མི།",
    desc: "Oversees public financial management, treasury coordination, and sovereign endowment governance under the Ministry of Finance, coordinating Royal Government Treasury Bonds (>5% yield).",
    descDz: "དངུལ་རྩིས་ལྷན་ཁག་གི་ མདོ་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ གཞུང་གི་བུན་འཛིན་དང་ རྒྱལ་གཞུང་རྩིས་མཛོད་ མཉམ་འབྲེལ་གྱི་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Treasury Bonds (>5% Yield)",
      "Public Accounts",
      "Sovereign Debt",
      "Fiscal Compliance",
    ],
    tagsDz: [
      "རྒྱལ་གཞུང་རྩིས་མཛོད།",
      "གཞུང་གི་བུན་འཛིན།",
      "འཆར་དངུལ་མཉམ་སྦྱོར།",
      "རྩིས་ཞིབ་དོ་དམ།",
    ],
    photo: trusteeNorbuDendup,
    theme: "amber",
  },
  {
    id: "amc-gyambo",
    orderNumber: 4,
    name: "Mr. Gyambo Sithey, PhD",
    nameDz: "སྐུ་ཞབས་ རྒྱལ་མཚན་སི་ཐེ། (འབུམ་རམས་པ)",
    role: "Director & Member Secretary, AMC",
    roleDz: "མདོ་ཆེན། / ཚོགས་མི་དྲུང་ཆེན། (AMC)",
    organization: "Director, Bhutan Health Trust Fund Secretariat",
    organizationDz: "མདོ་ཆེན། འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ དྲུང་ཆེན་ཡིག་ཚང་།",
    badge: "Director / Member Secretary",
    badgeDz: "AMC ཚོགས་མི་དྲུང་ཆེན།",
    desc: "Serves as Member Secretary to the Asset Management Committee, executing strategic investment mandates, portfolio allocation decisions, and liquidity deployment under the 70–20–10 model. Coordinates quarterly investment reviews and statutory yield reporting to the Board.",
    descDz: "མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་མི་དྲུང་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་སྟེ་ མ་དངུལ་སྐྱེད་འཕེལ་དང་ ༧༠-༢༠-༡༠ ལག་ལེན་ཐབས་བྱུས་ཚུ་ ལག་ལེན་འཐབ་ནི་དང་ བཀོད་ཚོགས་ལུ་ དུས་ཐོག་སྙན་ཞུ་ཕུལ་དོ་ཡོད།",
    tags: [
      "Investment Execution",
      "Member Secretary",
      "Operational Liquidity",
      "Statutory Reporting",
    ],
    tagsDz: [
      "མ་རྩ་ལག་ལེན།",
      "ཚོགས་མི་དྲུང་ཆེན།",
      "དངུལ་རྩིས་ལྟ་རྟོག",
      "ཁྲིམས་མཐུན་སྙན་ཞུ།",
    ],
    photo: trusteeDrGyambo,
    theme: "amber",
  },
];

function CommitteesPage() {
  const { t, isDzongkha } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        badge={t("amc_page_badge", "Section 1.2 • Fiduciary Oversight")}
        title={t("amc_page_title", "Asset management committee")}
        subtitle={t(
          "amc_page_subtitle",
          "To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("amc_page_title", "Asset management committee") },
        ]}
      />

      {/* 1. Official AMC Table 1.2 Members Gallery in Large Cards with DHI-Style Interactive Hover Reveal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="amc-roster">
        <SectionEditBadge
          label="Asset Management Committee (AMC)"
          pageSlug="about-committees"
          sectionId="amc-roster"
          studioHref="/admin/page-editor?slug=about-committees"
          initialData={{
            title: "1.2 Asset management committee (AMC)",
            subtitle: "Table 1.2 official members and positions of the Asset Management Committee.",
            badge: "Table 1.2 • AMC Members",
          }}
        />

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 block">
            {t("amc_table_badge", "Table 1.2 • Investment Stewardship")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            {isDzongkha
              ? "རེའུ་མིག་ ༡.༢ • མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ཚོགས་མི་ཚུ།"
              : "Table 1.2 • Investment Sub-Committee Roster"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light max-w-2xl mx-auto">
            {isDzongkha
              ? "ཁ་གསལ་གཟིགས་ནིའི་དོན་ལུ་ ཚོགས་ཆུང་ཚོགས་མིའི་པར་གུར་ མཛུབ་རིས་ (Hover) བཞག་གནང་། མ་རྩ་བདག་སྐྱོང་དང་ མ་དངུལ་སྐྱེད་འཕེལ་གྱི་ འགན་ཁུར་ཚུ་ གསལ་ཏོག་ཏོ་སྦེ་ མཐོང་ཚུགས།"
              : "Hover over any committee card to reveal specialized investment mandates, portfolio oversight responsibilities, and fiduciary credentials."}
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-900 bg-amber-50 border border-amber-200/80 px-3.5 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>{isDzongkha ? "པར་གུར་ Hover འབད་དེ་ ཁ་གསལ་གཟིགས།" : "Interactive Hover Reveal (DHI Style)"}</span>
            </span>
          </div>
        </div>

        {/* 4 AMC Members (Chairperson, 2 Members, Director & Member Secretary) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {amcMembersList.map((member) => (
            <FiduciaryMemberCard
              key={member.id}
              member={member}
              isActive={activeCardId === member.id}
              onToggle={() => handleToggleCard(member.id)}
              isDzongkha={isDzongkha}
            />
          ))}
        </div>
      </section>

      {/* 2. Official 70–20–10 Operating Model & Capital Preservation Policy */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="amc-operating-model">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                {isDzongkha ? "མ་རྩ་བཙུགས་བཞག་ཐབས་བྱུས་གསལ་བཤད།" : "Investment Strategy Statement"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
                {t("model_title", "The 70–20–10 Operating Model")}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold font-mono">
              <Scale className="h-3.5 w-3.5 text-amber-700" />
              <span>{isDzongkha ? "འགན་འཁྲི་ཅན་གྱི་མ་རྩ་བདག་སྐྱོང་།" : "Prudent Capital Governance"}</span>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans">
            <p>
              {t(
                "model_desc",
                "As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a 70–20–10 operating model to ensure the sustainable financing of national essential medicines and vaccines in Bhutan."
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="bg-[#FAF8F3] border border-emerald-200/80 rounded-2xl p-5 space-y-2">
                <div className="text-3xl font-black font-mono text-emerald-800">70%</div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {t("model_70_title", "Procurement Financing")}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "model_70_desc",
                    "70% of investment income is allocated to finance the procurement of national essential medicines and vaccines."
                  )}
                </p>
              </div>

              <div className="bg-[#FAF8F3] border border-amber-200/80 rounded-2xl p-5 space-y-2">
                <div className="text-3xl font-black font-mono text-amber-800">20%</div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {t("model_20_title", "Capital Reinvestment")}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "model_20_desc",
                    "20% is reinvested to support the growth of the Fund’s capital and protect purchasing power against inflation."
                  )}
                </p>
              </div>

              <div className="bg-[#FAF8F3] border border-teal-200/80 rounded-2xl p-5 space-y-2">
                <div className="text-3xl font-black font-mono text-teal-800">10%</div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {t("model_10_title", "Operational Expenses")}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "model_10_desc",
                    "10% is allocated to cover operational expenses of the Secretariat, ensuring maximum resource efficiency."
                  )}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 mt-6">
              <h4 className="font-serif font-bold text-base text-slate-900">
                {t("preservation_title", "Principal Capital Preservation Principle")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t(
                  "preservation_text",
                  "A key principle of the Fund is the preservation of its principal capital. By financing healthcare needs through investment income rather than drawing on the principal, BHTF aims to safeguard its financial resources for future generations. Any remaining funding gap is supplemented by a 1% health contribution deducted from the monthly gross salaries of salaried employees in the country."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
