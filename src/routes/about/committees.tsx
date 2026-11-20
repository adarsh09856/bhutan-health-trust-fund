import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { PageHero } from "@/components/page-hero";
import { PageRenderer } from "@/components/page-renderer";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { getPublicTrustees } from "@/lib/api/public.functions";
import type { PageBlockSection, Trustee } from "@/lib/db/schema";
import { getPublicPage } from "@/lib/api/public.functions";
import { Scale, Sparkles } from "lucide-react";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import { useLanguage } from "@/lib/i18n/language-context";
import { FiduciaryMemberCard, type FiduciaryMember } from "@/components/fiduciary-member-card";

export const Route = createFileRoute("/about/committees")({
  loader: async () => {
    try {
      const live = await getPublicTrustees().catch(() => []);
      const page = await getPublicPage({ data: { slug: "about-committees" } }).catch(() => null);
      return { liveTrustees: live || [], page };
    } catch {
      return { liveTrustees: [], page: null };
    }
  },
  head: () => ({
    meta: [
      { title: "Asset Management Committee (AMC) | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory and mandate of the BHTF Asset Management Committee (AMC) and its members.",
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
    role: "Chairperson",
    roleDz: "ཚོགས་གཙོ།",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    organizationDz: "དངུལ་ལས་དབང་འཛིན་གྱི་ ལས་ཚབ་མངའ་བདག",
    badge: "Chairperson",
    badgeDz: "ཚོགས་གཙོ།",
    desc: "Provides central banking and financial oversight to support responsible management of the Fund’s assets.",
    descDz:
      "རྒྱལ་གཞུང་དངུལ་ལས་དབང་འཛིན་གྱི་ ཉམས་མྱོང་དང་བསྟུན་ མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་གཙོ་སྦེ་ མ་དངུལ་སྐྱེད་འཕེལ་དང་ ༧༠-༢༠-༡༠ ལག་ལེན་ཐབས་བྱུས་ཚུ་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: ["Central Banking", "Monetary Policy", "Financial Oversight"],
    tagsDz: ["དངུལ་ཁང་སྲིད་བྱུས།", "མ་རྩ་བཙུགས་བཞག", "༧༠-༢༠-༡༠ ལམ་ལུགས།", "ཕྱི་དངུལ་ཉེན་སྲུང་།"],
    photo: trusteeUgyenChoden,
    theme: "amber",
  },
  {
    id: "amc-chencho",
    orderNumber: 2,
    name: "Mr. Chencho T. Namgay",
    nameDz: "སྐུ་ཞབས་ སྤེན་ཅོ་ ཏི་ རྣམ་རྒྱལ།",
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Chief Executive Officer, National Pension and Provident Fund (NPPF)",
    organizationDz: "གཙོ་འཛིན་འགོ་དཔོན། རྒྱལ་ཡོངས་རྒས་ཕོགས་དང་ ལྟོ་ཕོགས་མ་དངུལ།",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Brings extensive institutional fund management, asset allocation, and risk management insight from Bhutan's premier pension fiduciary, advising on fixed-income yields and corpus diversification.",
    descDz:
      "རྒྱལ་ཡོངས་རྒས་ཕོགས་མ་དངུལ་ (NPPF) གི་ གཙོ་འཛིན་འགོ་དཔོན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ མ་རྩ་བགོ་བཀྲམ་དང་ ཉེན་ཁ་དོ་དམ་གྱི་ གྲོས་སྟོན་གནང་དོ་ཡོད།",
    tags: ["Institutional Investment", "Pension Funds", "Risk Governance", "Fixed Income"],
    tagsDz: ["མ་རྩ་བགོ་བཀྲམ།", "ཉེན་ཁ་དོ་དམ།", "སྐྱེད་འཕེལ་ཐབས་བྱུས།", "ཚོགས་ཆུང་ཚོགས་མི།"],
    photo: trusteeChenchoNamgay,
    theme: "amber",
  },
  {
    id: "amc-norbu",
    orderNumber: 3,
    name: "Mr. Norbu Dendup",
    nameDz: "སྐུ་ཞབས་ ནོར་བུ་དོན་གྲུབ།",
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Director, Department of Treasury and Accounts, Ministry of Finance",
    organizationDz: "མདོ་ཆེན། རྩིས་མཛོད་དང་རྩིས་ཁྲ་ལས་ཁུངས། དངུལ་རྩིས་ལྷན་ཁག",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Oversees public financial management, treasury coordination, and sovereign endowment governance under the Ministry of Finance, coordinating Royal Government Treasury Bonds (>5% yield).",
    descDz:
      "དངུལ་རྩིས་ལྷན་ཁག་གི་ མདོ་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ གཞུང་གི་བུན་འཛིན་དང་ རྒྱལ་གཞུང་རྩིས་མཛོད་ མཉམ་འབྲེལ་གྱི་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: ["Treasury Bonds (>5% Yield)", "Public Accounts", "Sovereign Debt", "Fiscal Compliance"],
    tagsDz: ["རྒྱལ་གཞུང་རྩིས་མཛོད།", "གཞུང་གི་བུན་འཛིན།", "འཆར་དངུལ་མཉམ་སྦྱོར།", "རྩིས་ཞིབ་དོ་དམ།"],
    photo: trusteeNorbuDendup,
    theme: "amber",
  },
  {
    id: "amc-gyambo",
    orderNumber: 4,
    name: "Dr. Gyambo Sithey, PhD",
    nameDz: "འབུམ་རམས་པ་ རྒྱལ་མཚན་སི་ཐེ།",
    role: "Member Secretary",
    roleDz: "ཚོགས་མི་དྲུང་ཆེན།",
    organization: "Director, Bhutan Health Trust Fund Secretariat",
    organizationDz: "མདོ་ཆེན། འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ དྲུང་ཆེན་ཡིག་ཚང་།",
    badge: "Member Secretary",
    badgeDz: "ཚོགས་མི་དྲུང་ཆེན།",
    desc: "Serves as Director of the Secretariat and Member Secretary to the Asset Management Committee, supporting its meetings and reporting to the Board.",
    descDz:
      "མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་གི་ ཚོགས་མི་དྲུང་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་སྟེ་ མ་དངུལ་སྐྱེད་འཕེལ་དང་ ༧༠-༢༠-༡༠ ལག་ལེན་ཐབས་བྱུས་ཚུ་ ལག་ལེན་འཐབ་ནི་དང་ བཀོད་ཚོགས་ལུ་ དུས་ཐོག་སྙན་ཞུ་ཕུལ་དོ་ཡོད།",
    tags: [
      "Investment Execution",
      "Member Secretary",
      "Operational Liquidity",
      "Statutory Reporting",
    ],
    tagsDz: ["མ་རྩ་ལག་ལེན།", "ཚོགས་མི་དྲུང་ཆེན།", "དངུལ་རྩིས་ལྟ་རྟོག", "ཁྲིམས་མཐུན་སྙན་ཞུ།"],
    photo: trusteeDrGyambo,
    theme: "amber",
  },
];

function CommitteesPage() {
  const loaderData = Route.useLoaderData();
  const [dbTrustees, setDbTrustees] = useState<Trustee[]>(loaderData?.liveTrustees || []);
  const { t, isDzongkha } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    getPublicTrustees()
      .then((res) => {
        if (res && res.length > 0) setDbTrustees(res);
      })
      .catch(() => {});
  }, []);

  const effectiveAmcMembers = useMemo(() => {
    if (!dbTrustees || dbTrustees.length === 0) return amcMembersList;

    const aliases: Record<string, string[]> = {
      "amc-ugyen": ["ugyen choden"],
      "amc-chencho": ["chencho t namgay", "chencho namgay"],
      "amc-norbu": ["norbu dendup"],
      "amc-gyambo": ["gyambo sithey"],
    };
    const expectedOrder: Record<string, number> = {
      "amc-ugyen": 2,
      "amc-chencho": 3,
      "amc-norbu": 4,
      "amc-gyambo": 7,
    };
    const usedIds = new Set<number>();
    return amcMembersList.map((fallback) => {
      const match = dbTrustees.find((dt) => {
        const normalized = dt.name.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
        return !usedIds.has(dt.id) &&
          ((aliases[fallback.id] || []).some((alias) => normalized.includes(alias)) ||
            dt.orderIndex === expectedOrder[fallback.id]);
      });
      if (!match) return fallback;
      usedIds.add(match.id);

      return {
        ...fallback,
        name: match.name || fallback.name,
        role: fallback.role,
        organization: match.organization || fallback.organization,
        desc: match.bio || fallback.desc,
        photo:
          match.photoUrl && (match.photoUrl.startsWith("http") || match.photoUrl.startsWith("/"))
            ? match.photoUrl
            : fallback.photo,
        fallbackPhoto: fallback.photo,
      };
    });
  }, [dbTrustees]);

  const handleToggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        title={t("amc_page_title", "Asset management committee")}
        subtitle={t(
          "amc_page_subtitle",
          "To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets.",
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("amc_page_title", "Asset management committee") },
        ]}
      />

      {/* 1. Official AMC Members Gallery in Large Cards */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="amc-roster"
      >
        {/* 4 AMC Members (Chairperson, 2 Members, Member Secretary) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {effectiveAmcMembers.map((member) => (
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

      <PageRenderer sections={(loaderData?.page?.sections || []) as PageBlockSection[]} pageSlug="about-committees" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
