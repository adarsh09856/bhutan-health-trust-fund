import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { PageHero } from "@/components/page-hero";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { PageRenderer } from "@/components/page-renderer";
import { getPublicTrustees, getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection, Trustee } from "@/lib/db/schema";
import { Sparkles } from "lucide-react";
import trusteeLyonpoTandin from "@/assets/bhtf/trustees/lyonpo_tandin_wangchuk.jpg";
import trusteeLopenTshering from "@/assets/bhtf/trustees/lopen_tshering_wangchuk.jpg";
import trusteeDrPhub from "@/assets/bhtf/trustees/dr_phub_tshering.jpg";
import trusteePemaTshering from "@/assets/bhtf/trustees/pema_tshering.jpg";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import { useLanguage } from "@/lib/i18n/language-context";
import { FiduciaryMemberCard, type FiduciaryMember } from "@/components/fiduciary-member-card";

export const Route = createFileRoute("/about/trustees")({
  loader: async () => {
    try {
      const [liveTrustees, customPage] = await Promise.all([
        getPublicTrustees(),
        getPublicPage({ data: { slug: "about-trustees" } }).catch(() => null),
      ]);
      return {
        liveTrustees: liveTrustees || [],
        trusteesLoaded: true,
        customPage,
      };
    } catch {
      return {
        liveTrustees: [],
        trusteesLoaded: false,
        customPage: null,
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Board of Directors | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory of the Board of Directors of the Bhutan Health Trust Fund, ministerial leadership, and fiduciary governance.",
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
    role: "Chairperson",
    roleDz: "ཚོགས་གཙོ།",
    organization: "Minister, Ministry of Health",
    organizationDz: "གསོ་བའི་བློན་པོ། གསོ་བའི་ལྷན་ཁག",
    badge: "Chairperson",
    badgeDz: "ཚོགས་གཙོ།",
    desc: "Provides supreme ministerial leadership, steering sovereign health financing policies and aligning BHTF endowment disbursements with Bhutan's constitutional mandate for free universal primary healthcare. Oversees the Board of Directors in safeguarding long-term fiscal resilience.",
    descDz:
      "གསོ་བའི་བློན་པོ་མཆོག་གིས་ བཀོད་ཚོགས་ཀྱི་ཚོགས་གཙོ་སྦེ་ མཛད་འགན་བཞེས་ཏེ་ རྒྱལ་ཁབ་ནང་ རིན་མེད་གསོ་བའི་ཞབས་ཏོག་ གཏན་འཇགས་སྦེ་ བཞག་ཐབས་ལུ་ སྲིད་བྱུས་ཀྱི་ དབུ་ཁྲིད་གནང་དོ་ཡོད།",
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
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Secretary, Monastic Council for Administration & Development, Zhung Dratshang",
    organizationDz: "དྲུང་ཆེན། གཞུང་གྲྭ་ཚང་།",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom. Bridges traditional spiritual values with nationwide health welfare.",
    descDz:
      "གཞུང་གྲྭ་ཚང་གི་ སྐུ་ཚབ་སྦེ་ མཛད་འགན་བཞེས་ཏེ་ དམ་པའི་ཆོས་དང་མཐུན་པའི་ བྱམས་སྙིང་རྗེའི་ གསོ་བའི་ཞབས་ཏོག་དང་ ཁྲིམས་མཐུན་བློ་གཏད་ཀྱི་ ཕྱག་ལཱ་གནང་དོ་ཡོད།",
    tags: ["Ethical Stewardship", "Compassionate Care", "Zhung Dratshang", "Monastic Welfare"],
    tagsDz: ["དམ་ཆོས་ལམ་ལུགས།", "བྱམས་སྙིང་རྗེའི་ཞབས་ཏོག", "གཞུང་གྲྭ་ཚང་།", "དགོན་སྡེའི་ཕན་བདེ།"],
    photo: trusteeLopenTshering,
    theme: "emerald",
  },
  {
    id: "trustee-ugyen",
    orderNumber: 3,
    name: "Ms. Ugyen Choden",
    nameDz: "སྐུ་ཞབས་ ཨོ་རྒྱན་ཆོས་ལྡན།",
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    organizationDz: "དངུལ་ལས་དབང་འཛིན་གྱི་ ལས་ཚབ་མངའ་བདག",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Brings central banking, monetary policy, and financial regulatory expertise to the Board’s oversight of the Fund.",
    descDz:
      "རྒྱལ་གཞུང་དངུལ་ལས་དབང་འཛིན་གྱི་ ཉམས་མྱོང་དང་བསྟུན་ མ་རྩ་བདག་སྐྱོང་ཚོགས་ཆུང་ (AMC) གི་ ཚོགས་གཙོ་སྦེ་ མ་དངུལ་སྐྱེད་འཕེལ་དང་ ༧༠-༢༠-༡༠ ལག་ལེན་ཐབས་བྱུས་ཚུ་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: ["Central Banking", "Monetary Policy", "Financial Oversight"],
    tagsDz: ["དངུལ་ཁང་སྲིད་བྱུས།", "མ་རྩ་བཙུགས་བཞག", "༧༠-༢༠-༡༠ ལམ་ལུགས།", "ཕྱི་དངུལ་ཉེན་སྲུང་།"],
    photo: trusteeUgyenChoden,
    theme: "emerald",
  },
  {
    id: "trustee-chencho",
    orderNumber: 4,
    name: "Mr. Chencho T. Namgay",
    nameDz: "སྐུ་ཞབས་ སྤེན་ཅོ་ ཏི་ རྣམ་རྒྱལ།",
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Chief Executive Officer, National Pension and Provident Fund (NPPF)",
    organizationDz: "གཙོ་འཛིན་འགོ་དཔོན། རྒྱལ་ཡོངས་རྒས་ཕོགས་དང་ ལྟོ་ཕོགས་མ་དངུལ།",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight from Bhutan's premier pension and provident fund institution. Guides risk-adjusted asset returns and diversification.",
    descDz:
      "རྒྱལ་ཡོངས་རྒས་ཕོགས་མ་དངུལ་ (NPPF) གི་ གཙོ་འཛིན་འགོ་དཔོན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ མ་རྩ་བགོ་བཀྲམ་དང་ ཉེན་ཁ་དོ་དམ་གྱི་ གྲོས་སྟོན་གནང་དོ་ཡོད།",
    tags: [
      "Institutional Investments",
      "Portfolio Diversification",
      "Risk Governance",
      "Yield Optimization",
    ],
    tagsDz: ["མ་རྩ་བགོ་བཀྲམ།", "ཉེན་ཁ་དོ་དམ།", "སྐྱེད་འཕེལ་ཐབས་བྱུས།", "ཚོགས་ཆུང་ཚོགས་མི།"],
    photo: trusteeChenchoNamgay,
    theme: "emerald",
  },
  {
    id: "trustee-norbu",
    orderNumber: 5,
    name: "Mr. Norbu Dendup",
    nameDz: "སྐུ་ཞབས་ ནོར་བུ་དོན་གྲུབ།",
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Director, Department of Treasury and Accounts, Ministry of Finance",
    organizationDz: "མདོ་ཆེན། རྩིས་མཛོད་དང་རྩིས་ཁྲ་ལས་ཁུངས། དངུལ་རྩིས་ལྷན་ཁག",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Oversees sovereign public financial management, government treasury bonds, and state budget alignment under the Ministry of Finance. Ensures robust fiduciary integration between the national exchequer and the Health Trust Fund.",
    descDz:
      "དངུལ་རྩིས་ལྷན་ཁག་གི་ མདོ་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ སྐུ་ཞབས་ཀྱིས་ གཞུང་གི་བུན་འཛིན་དང་ རྒྱལ་གཞུང་རྩིས་མཛོད་ མཉམ་འབྲེལ་གྱི་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: ["Public Financial Management", "Treasury Bonds", "Budget Alignment", "Audit Controls"],
    tagsDz: ["རྒྱལ་གཞུང་རྩིས་མཛོད།", "གཞུང་གི་བུན་འཛིན།", "འཆར་དངུལ་མཉམ་སྦྱོར།", "རྩིས་ཞིབ་དོ་དམ།"],
    photo: trusteeNorbuDendup,
    theme: "emerald",
  },
  {
    id: "trustee-pema",
    orderNumber: 6,
    name: "Mr. Pema Tshering",
    nameDz: "སྐུ་ཞབས་ པདྨ་ཚེ་རིང་།",
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Independent Fiduciary Expert / Former CEO, T Bank Ltd.",
    organizationDz: "དངུལ་ཁང་གཙོ་འཛིན་ཟུར་པ། ཊི་དངུལ་ཁང་།",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan. Provides impartial financial oversight and external audit alignment.",
    descDz:
      "ཚོང་འབྲེལ་དངུལ་ཁང་དང་ ཚོང་འབྲེལ་མ་རྩ་ དོ་དམ་གྱི་ ཉམས་མྱོང་རྒྱ་ཆེན་ཡོད་མི་ རང་དབང་ཅན་གྱི་ འགོ་དཔོན་སྦེ་ བཀོད་ཚོགས་ནང་ ཕྱག་ལཱ་གནང་དོ་ཡོད།",
    tags: ["Commercial Banking", "Capital Markets", "Corporate Governance", "Independent Audit"],
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
    role: "Member",
    roleDz: "ཚོགས་མི།",
    organization: "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)",
    organizationDz: "གསོ་རིག་མདོ་ཆེན། རྒྱལ་ཡོངས་གཙོ་བསྟེན་སྨན་ཁང་།",
    badge: "Member",
    badgeDz: "ཚོགས་མི།",
    desc: "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment, directly representing the nation's premier tertiary referral hospital. Bridges financial allocations with on-the-ground patient care realities.",
    descDz:
      "རྒྱལ་ཡོངས་གཙོ་བསྟེན་སྨན་ཁང་ (JDWNRH) གི་ གསོ་རིག་མདོ་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་མི་ འབུམ་རམས་པ་གིས་ སྨན་རྫས་ཀྱི་སྤུས་ཚད་དང་ ནད་པའི་ཞབས་ཏོག་གི་ གྲོས་སྟོན་གནང་དོ་ཡོད།",
    tags: ["Clinical Governance", "National Formulary", "Tertiary Healthcare", "Drug Efficacy"],
    tagsDz: ["གསོ་རིག་ལམ་ལུགས།", "རྒྱལ་ཡོངས་སྨན་རྫས་ཐོ།", "སྨན་ཁང་ལྟེ་བ།", "སྨན་གྱི་སྤུས་ཚད།"],
    photo: trusteeDrPhub,
    theme: "emerald",
  },
  {
    id: "trustee-gyambo",
    orderNumber: 8,
    name: "Dr. Gyambo Sithey, PhD",
    nameDz: "འབུམ་རམས་པ་ རྒྱལ་མཚན་སི་ཐེ།",
    role: "Director & Member Secretary",
    roleDz: "མདོ་ཆེན། / ཚོགས་མི་དྲུང་ཆེན།",
    organization: "Director, Bhutan Health Trust Fund Secretariat",
    organizationDz: "མདོ་ཆེན། འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་ དྲུང་ཆེན་ཡིག་ཚང་།",
    badge: "Director & Member Secretary",
    badgeDz: "མདོ་ཆེན་ / ཚོགས་མི་དྲུང་ཆེན།",
    desc: "Serves as the ex-officio Member Secretary of the Board of Directors pursuant to Article 5, Clause 5.3 of the Royal Charter. Heads the Secretariat in executing all Board decisions, managing sovereign endowment disbursements, and steering nationwide healthcare financing.",
    descDz:
      "རྒྱལ་པོའི་བཀའ་ཤོག་གི་དགོངས་དོན་ལྟར་ བཀོད་ཚོགས་ཀྱི་ ཚོགས་མི་དྲུང་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་སྟེ་ བཀོད་ཚོགས་ཀྱི་གྲོས་ཆོད་ཚུ་ ལག་ལེན་འཐབ་ནི་དང་ དྲུང་ཆེན་ཡིག་ཚང་གི་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Ex-Officio Member Secretary",
      "Executive Directorate",
      "Board Governance",
      "Operations & Policy",
    ],
    tagsDz: ["ཚོགས་མི་དྲུང་ཆེན།", "དྲུང་ཆེན་ཡིག་ཚང་།", "བཀོད་ཚོགས་གྲོས་ཆོད།", "སྲིད་བྱུས་ལག་ལེན།"],
    photo: trusteeDrGyambo,
    theme: "emerald",
  },
];

const officialRosterOrder = [
  "trustee-tandin",
  "trustee-lopen",
  "trustee-ugyen",
  "trustee-chencho",
  "trustee-norbu",
  "trustee-pema",
  "trustee-phub",
  "trustee-gyambo",
];

function TrusteesPage() {
  const loaderData = Route.useLoaderData();
  const [dbTrustees, setDbTrustees] = useState<Trustee[]>(loaderData?.liveTrustees || []);
  const [hasLoadedTrustees, setHasLoadedTrustees] = useState(Boolean(loaderData?.trusteesLoaded));
  const { t, isDzongkha } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    getPublicTrustees()
      .then((res) => { setDbTrustees(res || []); setHasLoadedTrustees(true); })
      .catch(() => {});
  }, []);

  const effectiveTrustees = useMemo(() => {
    const identityAliases: Record<string, string[]> = {
      "trustee-tandin": ["tandin wangchuk", "tandin"],
      "trustee-lopen": ["lopen tshering"],
      "trustee-ugyen": ["ugyen choden"],
      "trustee-chencho": ["chencho t namgay", "chencho namgay", "chencho"],
      "trustee-norbu": ["norbu dendup"],
      "trustee-pema": ["pema tshering"],
      "trustee-phub": ["phub tshering"],
      "trustee-gyambo": ["gyambo sithey", "gyambo"],
    };
    const normalizedName = (name: string) =>
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim();
    const canonicalProfiles = new Map(
      trusteesList.map((profile) => [profile.id, profile]),
    );
    const recordsByProfile = new Map<string, Trustee>();
    (hasLoadedTrustees ? dbTrustees.filter((record) => record.isActive !== false) : []).forEach((record) => {
      const normalized = normalizedName(record.name);
      const profileId = officialRosterOrder.find((id) =>
        (identityAliases[id] || []).some((alias) => normalized.includes(alias)),
      );
      if (profileId && !recordsByProfile.has(profileId)) {
        recordsByProfile.set(profileId, record);
      }
    });

    return officialRosterOrder.map((profileId, index): FiduciaryMember => {
      const canonical = canonicalProfiles.get(profileId)!;
      const record = recordsByProfile.get(profileId);
      if (!record) return { ...canonical, orderNumber: index + 1 };
      const storedPhoto = record.photoUrl?.trim();
      const isActualUploadedPhoto = Boolean(
        storedPhoto &&
          storedPhoto !== "null" &&
          storedPhoto !== "undefined" &&
          !/\/src\//i.test(storedPhoto) &&
          !/logo\.png/i.test(storedPhoto) &&
          (/^https?:\/\//i.test(storedPhoto) ||
            /^data:image\//i.test(storedPhoto) ||
            storedPhoto.startsWith("/uploads/") ||
            (storedPhoto.startsWith("/") && !storedPhoto.includes("person-placeholder.svg")))
      );
      return {
        ...canonical,
        name: record.name || canonical.name,
        role: record.role || canonical.role,
        organization: record.organization || canonical.organization,
        badge: record.badge || canonical.badge,
        desc: record.bio || canonical.desc,
        photo: isActualUploadedPhoto ? storedPhoto : (canonical.photo || "/images/person-placeholder.svg"),
        fallbackPhoto: canonical.photo || "/images/person-placeholder.svg",
        orderNumber: index + 1,
      };
    });
  }, [dbTrustees, hasLoadedTrustees]);

  const director = effectiveTrustees.find((member) => member.id === "trustee-gyambo");
  const boardMembers = effectiveTrustees.filter((member) => member.id !== "trustee-gyambo");

  const handleToggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        title={isDzongkha ? "བཀོད་ཚོགས།" : "Board of Directors"}
        subtitle={t(
          "trustees_page_subtitle",
          "The Bhutan Health Trust Fund operates under the guidance of the Board of Directors, headed by a Chairperson, providing strategic direction, accountability, and long-term sustainability.",
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: isDzongkha ? "བཀོད་ཚོགས།" : "Board of Directors" },
        ]}
      />

      {/* Complete Trustees Gallery Grid in Clean Large Cards */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="trustees-roster"
      >
        {boardMembers.length > 0 && <div className="max-w-xl mx-auto mb-10 sm:mb-14">
          <FiduciaryMemberCard
            member={boardMembers[0]}
            isActive={activeCardId === boardMembers[0].id}
            onToggle={() => handleToggleCard(boardMembers[0].id)}
            isDzongkha={isDzongkha}
          />
        </div>}

        {/* 2. Key Trustees Large 3-Column Grid (#2 to #7) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto mb-12 sm:mb-16">
          {boardMembers.slice(1).map((member) => (
            <FiduciaryMemberCard
              key={member.id}
              member={member}
              isActive={activeCardId === member.id}
              onToggle={() => handleToggleCard(member.id)}
              isDzongkha={isDzongkha}
            />
          ))}
        </div>

        {/* 3. Director & Member Secretary Featured Anchor Card (#8 Dr. Gyambo Sithey, PhD) */}
        {director && <div className="max-w-xl mx-auto pt-8 border-t border-slate-200/80">
          <FiduciaryMemberCard
            member={director}
            isActive={activeCardId === director.id}
            onToggle={() => handleToggleCard(director.id)}
            isDzongkha={isDzongkha}
          />
        </div>}
      </section>

      <PageRenderer sections={(loaderData?.customPage?.sections || []) as PageBlockSection[]} pageSlug="about-trustees" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
