import type {
  NewUser,
  NewNewsArticle,
  NewReport,
  NewPolicy,
  NewProgram,
  NewDonation,
  NewInquiry,
  NewSubscriber,
  NewTrustee,
  NewFaq,
  NewImpactMetric,
  NewMilestone,
  NewSiteSetting,
  NewMediaGalleryItem,
  NewMediaVideo,
  NewProcurementTender,
} from "./schema";
import { institutionalConfig } from "../../config/institutional";

// Precomputed genuine bcrypt hash for password "Admin@BHTF2026"
export const DEFAULT_ADMIN_PASSWORD_HASH =
  "$2b$10$.xtbHaRBEw.UtXl/l3FH0.NGBtoyZVOmvvcMw/KBJY.I.knfbv256";

export const initialAdminUsers: NewUser[] = [
  {
    name: "Executive Administrator",
    email: "admin@bhtf.bt",
    passwordHash: DEFAULT_ADMIN_PASSWORD_HASH,
    role: "SUPER_ADMIN",
  },
  {
    name: "Communications Officer",
    email: "media@bhtf.bt",
    passwordHash: DEFAULT_ADMIN_PASSWORD_HASH,
    role: "EDITOR",
  },
];

export const initialNewsArticles: NewNewsArticle[] = [
  {
    slug: "nationwide-influenza-vaccination-2024",
    title: "BHTF supports nationwide influenza vaccination program for 2024-2025",
    category: "Immunization",
    author: "BHTF Communications",
    coverImage: "/src/assets/news-vaccine.jpg",
    excerpt:
      "Over 200,000 doses of seasonal influenza vaccines are being deployed across all twenty dzongkhags to protect high-risk populations.",
    content: `The Bhutan Health Trust Fund (BHTF) has mobilized complete financial backing for the 2024-2025 Nationwide Seasonal Influenza Vaccination Campaign in close collaboration with the Department of Public Health, Ministry of Health.

### Protecting the Most Vulnerable
Over 200,000 doses of quadrivalent seasonal influenza vaccines have arrived in Thimphu and are being dispatched to health centers, district hospitals, and Basic Health Units (BHUs) throughout Bhutan. 

Priority target groups include:
- Elderly citizens aged 65 and above
- Pregnant women across all trimesters
- Children aged 6 to 23 months
- Healthcare workers and frontline responders
- Individuals with chronic medical conditions

"The timely financing of these vaccines represents our steadfast pledge that financial constraints will never compromise the health security of our people," stated the Secretariat Director.

### Logistics and Cold Chain Integrity
The vaccines are distributed via the National Cold Chain System, ensuring strict temperature maintenance even in remote mountain settlements like Laya, Lunana, and Lingzhi via cold-box porterage and helicopter drops where necessary.`,
    isPublished: true,
    viewsCount: 1420,
  },
  {
    slug: "strengthening-primary-healthcare-remote-bhutan",
    title: "Strengthening primary healthcare across remote communities in Bhutan",
    category: "Essential Medicines",
    author: "Program Operations Team",
    coverImage: "/src/assets/news-community.jpg",
    excerpt:
      "BHTF expands financing to outreach clinics and Basic Health Units serving Bhutan's most geographically isolated settlements.",
    content: `Ensuring equity in healthcare delivery is central to Gross National Happiness. This month, BHTF completed the second-quarter disbursement for essential commodity procurement, bolstering over 200 Basic Health Units (BHUs) and 450 Outreach Clinics (ORCs) across Bhutan.

### Bridging the Geographic Gap
In rugged terrains where reaching a district hospital requires days of walking, local BHUs are the lifeline. The fund covers 100% of essential medicines on the National Essential Drugs List (NEDL), including vital antibiotics, cardiovascular drugs, pediatric rehydration salts, and maternal micronutrients.

Health workers in Zhemgang, Trashiyangtse, and Gasa have reported zero stockouts of primary medicines over the past 12 months, a testament to reliable financing and streamlined supply chain partnerships.`,
    isPublished: true,
    viewsCount: 980,
  },
  {
    slug: "bhtf-annual-report-2023-released",
    title: "BHTF Annual Report 2023: Celebrating Resilience and Financial Sustainability",
    category: "Governance",
    author: "Governance & Planning",
    coverImage: "/src/assets/news-report.jpg",
    excerpt:
      "Read our full report detailing program impacts, capital endowment growth, and audited financials for fiscal year 2023.",
    content: `The Bhutan Health Trust Fund has officially published its Annual Report and Audited Financial Statements for the fiscal year ending December 2023.

### Key Highlights from 2023:
- **Capital Endowment Growth**: The trust fund capital reached Nu. 4.2 Billion through prudent asset management and royal grants.
- **Medicines & Vaccines Financed**: Financed 124 essential medicines and 11 routine national immunization antigens.
- **Population Impact**: Over 780,000 citizens benefited with uninterrupted free primary health services.
- **Audit Opinion**: Received an Unqualified ("Clean") Audit Opinion from the Royal Audit Authority of Bhutan.

The complete publication is now available for public download in our Reports & Publications section.`,
    isPublished: true,
    viewsCount: 1750,
  },
  {
    slug: "gavi-partnership-extension-2027",
    title: "Strategic Partnership with Gavi Extended Through 2027",
    category: "Partnership",
    author: "BHTF Media",
    coverImage: "/src/assets/news-community.jpg",
    excerpt:
      "Continued bilateral support reinforces sustainable co-financing for routine immunization and future vaccine introductions.",
    content: `BHTF and Gavi, the Vaccine Alliance, have finalized an agreement extending their co-financing partnership through 2027. Under this framework, BHTF continues to assume an increasing share of national vaccine procurement costs, advancing Bhutan's journey toward full self-reliance in public health commodities.`,
    isPublished: true,
    viewsCount: 620,
  },
  {
    slug: "hpv-vaccine-milestone-95-percent-coverage",
    title: "Bhutan Achieves 95% Coverage in Nationwide HPV Vaccination",
    category: "Immunization",
    author: "Public Health Desk",
    coverImage: "/src/assets/news-vaccine.jpg",
    excerpt:
      "A landmark milestone in the global campaign against cervical cancer, safeguarding young girls across all schools.",
    content: `Through school-based delivery mechanisms financed by BHTF and executed by the Ministry of Health, Bhutan has achieved over 95% first and second dose coverage for Human Papillomavirus (HPV) vaccination among eligible adolescent girls nationwide, positioning Bhutan as a regional leader in cervical cancer elimination.`,
    isPublished: true,
    viewsCount: 1140,
  },
  {
    slug: "regional-governance-excellence-award",
    title: "BHTF Recognized with Regional Award for Health Financing Transparency",
    category: "Governance",
    author: "Secretariat",
    coverImage: "/src/assets/news-report.jpg",
    excerpt:
      "Recognized for exemplary governance, fiduciary transparency, and sustainable public health endowment stewardship in South Asia.",
    content: `The South Asian Public Health Association has awarded BHTF the 2024 Excellence in Fiduciary Governance Citation, acknowledging BHTF's innovative trust fund model and transparency in tracking every Ngultrum directly to health outcomes.`,
    isPublished: true,
    viewsCount: 890,
  },
];

export const initialReports: NewReport[] = [
  {
    title: "BHTF Annual Report 2023-2024",
    year: "2024",
    category: "Annual Report",
    fileUrl: "/documents/bhtf-annual-report-2023.pdf",
    fileSize: "4.8 MB",
    description:
      "Comprehensive review of trust fund operations, program financing, capital growth, and healthcare metrics across Bhutan.",
    downloadCount: 382,
  },
  {
    title: "Audited Financial Statements (RAA) 2023",
    year: "2024",
    category: "Financial",
    fileUrl: "/documents/bhtf-audited-financials-2023.pdf",
    fileSize: "2.1 MB",
    description:
      "Independent audit conducted by the Royal Audit Authority of Bhutan with unqualified clean compliance opinion.",
    downloadCount: 294,
  },
  {
    title: "Sustainability of Vaccine Financing in Bhutan",
    year: "2023",
    category: "Research",
    fileUrl: "/documents/vaccine-financing-sustainability.pdf",
    fileSize: "3.5 MB",
    description:
      "Long-term econometric analysis on transition from donor aid to sovereign trust fund self-reliance.",
    downloadCount: 175,
  },
  {
    title: "Primary Healthcare Impact Assessment",
    year: "2023",
    category: "Assessment",
    fileUrl: "/documents/phc-impact-assessment.pdf",
    fileSize: "1.9 MB",
    description:
      "Field evaluation of medicine availability and patient satisfaction in remote Basic Health Units (BHUs).",
    downloadCount: 140,
  },
  {
    title: "Procurement Transparency & Compliance Report",
    year: "2023",
    category: "Governance",
    fileUrl: "/documents/procurement-transparency-2023.pdf",
    fileSize: "1.4 MB",
    description:
      "Detailed breakdown of international competitive bidding, medicine quality assurance, and supplier metrics.",
    downloadCount: 98,
  },
  {
    title: "BHTF Strategic Master Plan 2022-2027",
    year: "2022",
    category: "Strategy",
    fileUrl: "/documents/bhtf-strategic-plan-2022-2027.pdf",
    fileSize: "5.2 MB",
    description:
      "Five-year roadmap outlining endowment expansion, new vaccine introductions, and emergency reserve funds.",
    downloadCount: 510,
  },
];

export const initialPolicies: NewPolicy[] = [
  {
    title: "Royal Charter & Governance Bylaws",
    slug: "royal-charter-governance",
    category: "Governance",
    summary:
      "Foundational legal instrument establishing BHTF's autonomy, Board of Trustees mandate, and fiduciary duties.",
    content: `The Royal Charter defines the sovereign mandate of the Bhutan Health Trust Fund as an autonomous institution dedicated to the perpetual financing of essential medicines and vaccines for the people of Bhutan.`,
    effectiveDate: "2020 (Revised)",
    fileUrl: "/documents/bhtf-charter.pdf",
  },
  {
    title: "Medicine Procurement & Quality Assurance Policy",
    slug: "procurement-quality-assurance",
    category: "Procurement",
    summary:
      "Standard operating procedures ensuring open competitive bidding, WHO pre-qualification compliance, and batch testing.",
    content: `All medicine procurements financed by BHTF follow transparent, open competitive international bidding in adherence to the Royal Government Procurement Rules and WHO Pre-Qualification guidelines.`,
    effectiveDate: "2023",
    fileUrl: "/documents/procurement-policy.pdf",
  },
  {
    title: "Anti-Corruption & Whistleblower Protection Policy",
    slug: "anti-corruption-whistleblower",
    category: "Ethics",
    summary:
      "Zero-tolerance standard for corruption, fraud, or misuse of funds, with secure confidential reporting channels.",
    content: `BHTF maintains a zero-tolerance policy regarding bribery, fraud, embezzlement, or conflict of interest. Whistleblowers are protected under Bhutanese law with direct confidential access to the Board Ethics Committee and the Anti-Corruption Commission (ACC).`,
    effectiveDate: "2023",
    fileUrl: "/documents/whistleblower-policy.pdf",
  },
  {
    title: "Conflict of Interest & Ethics Code",
    slug: "conflict-of-interest-policy",
    category: "Ethics",
    summary:
      "Mandatory annual declarations and recusal guidelines for Trustees, Secretariat executives, and procurement evaluators.",
    content: `All trustees, committee members, and staff must declare financial and personal interests annually. Any member with a potential conflict is legally required to recuse themselves from deliberations.`,
    effectiveDate: "2024",
    fileUrl: "/documents/conflict-of-interest.pdf",
  },
  {
    title: "Endowment Investment Policy Statement",
    slug: "endowment-investment-policy",
    category: "Finance",
    summary:
      "Prudent guidelines governing asset allocation, risk management, and ethical investment of trust fund capital.",
    content: `The Investment Policy Statement governs capital preservation, inflation hedging, and liquidity maintenance to ensure sustainable annual funding disbursements without eroding real endowment value.`,
    effectiveDate: "2024",
    fileUrl: "/documents/investment-policy.pdf",
  },
  {
    title: "Data Protection & Donor Privacy Policy",
    slug: "data-protection-privacy",
    category: "Privacy",
    summary:
      "Rigorous standards protecting donor identities, financial transaction data, and organizational digital assets.",
    content: `We adhere to the highest standards of data security. Donor personal details and transaction records are encrypted and never sold, shared, or utilized for commercial purposes.`,
    effectiveDate: "2024",
    fileUrl: "/documents/privacy-policy.pdf",
  },
];

export const initialPrograms: NewProgram[] = [
  {
    slug: "essential-medicines-financing",
    title: "Essential Medicines Program",
    summary:
      "Procurement and uninterrupted supply of over 120 essential medicines distributed across all 20 dzongkhags.",
    fullDescription:
      "Finances 100% of the National Essential Drugs List, covering primary care therapeutics from remote Basic Health Units to national referral hospitals.",
    icon: "Pill",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "780,000+ Citizens",
    status: "ACTIVE",
  },
  {
    slug: "routine-childhood-immunization",
    title: "National Immunization Program",
    summary:
      "Financing routine childhood immunization and new vaccine introductions including HPV and seasonal influenza.",
    fullDescription:
      "Ensures no child in Bhutan misses life-saving vaccines against measles, polio, hepatitis B, rotavirus, pneumococcal disease, and HPV.",
    icon: "Syringe",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "100,000+ Children & Adolescents",
    status: "ACTIVE",
  },
  {
    slug: "primary-healthcare-strengthening",
    title: "Primary Healthcare & Remote Outreach",
    summary:
      "Strengthening Basic Health Units and outreach clinics that bring essential care to mountainous communities.",
    fullDescription:
      "Equips rural health clinics with diagnostic test kits, cold-chain refrigeration, and emergency medical kits.",
    icon: "Stethoscope",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "450+ Rural Villages",
    status: "ACTIVE",
  },
  {
    slug: "maternal-child-health",
    title: "Maternal & Child Health",
    summary:
      "Investing in safer pregnancies, healthy births, and thriving children through specialized medicines and supplements.",
    fullDescription:
      "Supplies antenatal vitamins, iron folic acid supplements, sterile delivery commodities, and neonatal resuscitation items.",
    icon: "HeartPulse",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "25,000+ Mothers & Infants",
    status: "ACTIVE",
  },
  {
    slug: "diagnostics-medical-supplies",
    title: "Diagnostics & Essential Supplies",
    summary:
      "Reliable point-of-care rapid diagnostics and medical consumables supporting clinicians at every level.",
    fullDescription:
      "Rapid test kits for malaria, dengue, HIV, diabetes screening, and standard laboratory reagents.",
    icon: "Microscope",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "205 Health Centers",
    status: "ACTIVE",
  },
  {
    slug: "health-workforce-enablement",
    title: "Health Workforce Enablement",
    summary:
      "Capacity-building programs and supply-chain training for health workers serving Bhutan's most remote communities.",
    fullDescription:
      "Conducts pharmacovigilance, vaccine cold-chain management, and inventory logistics training for health assistants.",
    icon: "GraduationCap",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "1,200+ Health Workers",
    status: "ACTIVE",
  },
];

export const initialDonations: NewDonation[] = [];

export const initialInquiries: NewInquiry[] = [];

export const initialSubscribers: NewSubscriber[] = [];

export const initialTrustees: NewTrustee[] = [
  {
    name: "Lyonpo Tandin Wangchuk",
    role: "Chairperson",
    organization: "Hon'ble Minister for Health, Royal Government of Bhutan",
    badge: "Cabinet Chair",
    bio: "Appointed Chairperson under Cabinet Order C-3/4(4)/2024/35. Provides ministerial leadership, steering sovereign health financing and aligning BHTF disbursements with universal healthcare priorities.",
    photoUrl: null,
    orderIndex: 0,
    isActive: true,
  },
  {
    name: "Lopen Tshering Wangchuk",
    role: "Trustee (Monastic Representative)",
    organization: "Secretary, Monastic Council Zhung Dratshang",
    badge: "Zhung Dratshang",
    bio: "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom.",
    photoUrl: null,
    orderIndex: 1,
    isActive: true,
  },
  {
    name: "Ms. Ugyen Choden",
    role: "Trustee & Chairperson of AMC",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    badge: "Central Bank / AMC Chair",
    bio: "Brings extensive central banking, monetary policy, and financial regulatory expertise. Chairs the BHTF Asset Management Committee (AMC) overseeing capital preservation and asset allocation.",
    photoUrl: null,
    orderIndex: 2,
    isActive: true,
  },
  {
    name: "Mr. Chencho T. Namgay",
    role: "Trustee & Member AMC",
    organization: "CEO, National Pension & Provident Fund (NPPF)",
    badge: "Pension Fund / AMC Member",
    bio: "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight as a member of the Board and Asset Management Committee.",
    photoUrl: null,
    orderIndex: 3,
    isActive: true,
  },
  {
    name: "Mr. Norbu Dendup",
    role: "Trustee & Member AMC",
    organization: "Director, Department of Treasury & Accounts, Ministry of Finance",
    badge: "Ministry of Finance / AMC Member",
    bio: "Oversees public financial management, treasury coordination, and sovereign endowment governance, serving on the Board and Asset Management Committee.",
    photoUrl: null,
    orderIndex: 4,
    isActive: true,
  },
  {
    name: "Mr. Pema Tshering",
    role: "Trustee (Independent Director)",
    organization: "Former CEO, T Bank Ltd. (Financial Sector Specialist)",
    badge: "Financial Sector Specialist",
    bio: "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan.",
    photoUrl: null,
    orderIndex: 5,
    isActive: true,
  },
  {
    name: "Dr. Phub Tshering",
    role: "Trustee (Clinical & Medical Specialist)",
    organization: "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)",
    badge: "Clinical Specialist",
    bio: "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment directly representing the nation's premier tertiary healthcare institution.",
    photoUrl: null,
    orderIndex: 6,
    isActive: true,
  },
  {
    name: "Dr. Gyambo Sithey, PhD",
    role: "Director",
    organization: "Director, BHTF Secretariat",
    badge: "Director",
    bio: "Leads day-to-day operations of the BHTF Secretariat, execution of statutory board directives, donor engagement, and nationwide healthcare procurement disbursements.",
    photoUrl: null,
    orderIndex: 7,
    isActive: true,
  },
];

export const initialFaqs: NewFaq[] = [
  {
    question: "What is the Bhutan Health Trust Fund (BHTF)?",
    answer:
      "The Bhutan Health Trust Fund (BHTF) is an autonomous statutory body established under the Royal Charter granted by His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck in 2000. It manages a ring-fenced capital endowment to guarantee uninterrupted financing for essential drugs and vaccines in perpetuity.",
    category: "About BHTF",
    orderIndex: 1,
    isPublished: true,
  },
  {
    question: "Why was BHTF created?",
    answer:
      "BHTF was created to insulate Bhutan's universal free healthcare system from donor dependency, geopolitical shifts, and economic volatility. By using only the investment returns of its endowment corpus, BHTF ensures that essential drugs and vaccines remain freely accessible to every Bhutanese citizen without interruption.",
    category: "About BHTF",
    orderIndex: 2,
    isPublished: true,
  },
  {
    question: "How does the sovereign 1:1 RGOB matching fund work?",
    answer:
      "Under the sovereign Royal Charter, every single Ngultrum contributed by individuals, corporations, civil society, and international well-wishers is matched 1:1 by the Royal Government of Bhutan through the Ministry of Finance, effectively doubling the impact of every donation.",
    category: "Matching Fund",
    orderIndex: 3,
    isPublished: true,
  },
  {
    question: "What healthcare commodities does BHTF finance?",
    answer:
      "BHTF finances 100% of the National Essential Medicines List comprising 438 essential modern medicines, 110 traditional medicines (gSo-ba Rig-pa) including 65 core formulations, and 4 routine national vaccines (Pentavalent, PCV, HPV, and seasonal Influenza), along with needles, syringes, and cold-chain equipment.",
    category: "Financing & Formulary",
    orderIndex: 4,
    isPublished: true,
  },
  {
    question: "Are donations to BHTF tax-deductible?",
    answer:
      "Yes. In accordance with Department of Revenue & Customs (DRC) Circular DRC/TAX-A&L/DO-16/399, contributions to BHTF are 100% tax-exempt and fully deductible up to 5% of taxable income under Corporate Income Tax (CIT) and Personal Income Tax (PIT).",
    category: "Tax Exemption",
    orderIndex: 5,
    isPublished: true,
  },
  {
    question: "How is BHTF governed and audited?",
    answer:
      "BHTF is governed by an eminent Board of Trustees chaired by the Hon'ble Minister for Health, comprising members from Zhung Dratshang, RMA, NPPF, MoF, private finance, and JDWNRH. Its accounts are audited annually by the Royal Audit Authority (RAA) of Bhutan, consistently receiving unqualified (clean) audit reports.",
    category: "Governance & Audit",
    orderIndex: 6,
    isPublished: true,
  },
  {
    question: "How are funds invested and managed?",
    answer:
      "The endowment corpus is managed under strict statutory investment policies overseen by the Board's Asset Management Committee (AMC). Investments prioritize capital preservation, inflation hedging, and liquidity across domestic treasury bills, fixed deposits, sovereign bonds, and prudent equities.",
    category: "Asset Management",
    orderIndex: 7,
    isPublished: true,
  },
  {
    question: "Can international donors contribute in foreign currency?",
    answer:
      "Yes. BHTF maintains an official USD account with the Bank of Bhutan (Account No. 100931468, SWIFT: BHUBBTBT022) for international wire transfers and bilateral donor contributions.",
    category: "Donations",
    orderIndex: 8,
    isPublished: true,
  },
  {
    question: "What is Window Financing and how does disbursement operate?",
    answer:
      "Window Financing is BHTF's quarterly disbursement mechanism to the Ministry of Health: Q1 (1st week of October), Q2 (1st week of January), Q3 (1st week of April), and Q4 (last week of June), following formal requisition and inventory reconciliations.",
    category: "Window Financing",
    orderIndex: 9,
    isPublished: true,
  },
  {
    question: "Where is the BHTF Secretariat located and how can I contact them?",
    answer:
      "The Secretariat is located at BTFEC Office Building, Genyen Lam, Thimphu, Bhutan. You can contact the Secretariat by phone at +975 2 322424, email at bhtf@bhtf.bt, or visit during official working hours (Monday-Friday, 9:00 AM - 5:00 PM BST).",
    category: "Contact & Location",
    orderIndex: 10,
    isPublished: true,
  },
];

export const initialImpactMetrics: NewImpactMetric[] = [
  {
    label: "Citizens Protected",
    value: "780,000+",
    description: "Universal primary healthcare guaranteed for every citizen across Bhutan",
    icon: "Users",
    badge: "Universal Access",
    orderIndex: 1,
    isActive: true,
  },
  {
    label: "Essential Medicines",
    value: "438",
    description: "Modern pharmaceuticals on the National Essential Drugs List (NEDL)",
    icon: "Pill",
    badge: "Formulary Approved",
    orderIndex: 2,
    isActive: true,
  },
  {
    label: "Traditional Medicines",
    value: "110",
    description: "Indigenous gSo-ba Rig-pa formulations (including 65 core remedies)",
    icon: "Sparkles",
    badge: "Traditional Care",
    orderIndex: 3,
    isActive: true,
  },
  {
    label: "Endowment Corpus",
    value: "Nu. 4.8B",
    description: "Capital endowment managed under Royal Charter (Nu. 4,798,965,306.85)",
    icon: "Coins",
    badge: "Sovereign Endowment",
    orderIndex: 4,
    isActive: true,
  },
];

export const initialMilestones: NewMilestone[] = [
  {
    year: "1998",
    title: "Conception & Geneva Launch",
    description:
      "Formally launched on 12 May 1998 at the 51st World Health Assembly in Geneva under the visionary guidance of His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck and led by Lyonpo Sangay Ngedup (then Health Minister).",
    orderIndex: 1,
  },
  {
    year: "2000",
    title: "Royal Charter Enactment",
    description:
      "His Majesty the Fourth Druk Gyalpo granted the Royal Charter on 12 May 2000, establishing BHTF as an autonomous statutory body with a ring-fenced capital endowment.",
    orderIndex: 2,
  },
  {
    year: "2003",
    title: "Operational Financing Commences",
    description:
      "The Trust Fund began financing essential primary healthcare needs, providing sustained funding for basic medical supplies and consumables across Bhutan's health facilities.",
    orderIndex: 3,
  },
  {
    year: "2006",
    title: "100% Childhood Vaccines Financing",
    description:
      "BHTF assumed complete financing responsibility for all routine childhood vaccines and essential immunization cold-chain equipment nationwide.",
    orderIndex: 4,
  },
  {
    year: "2014-2015",
    title: "Pentavalent Vaccine & Supply Chain Resilience",
    description:
      "Fully funded the transition to the 5-in-1 Pentavalent vaccine and sustained uninterrupted procurement through global WHO/UNICEF supply pipelines.",
    orderIndex: 5,
  },
  {
    year: "2017",
    title: "Target Endowment Corpus Realization",
    description:
      "BHTF reached its primary target endowment corpus of USD 24 Million (Nu. 1.5 Billion+), securing long-term financial independence and sustainability.",
    orderIndex: 6,
  },
  {
    year: "2018",
    title: "Nu. 3.0 Billion Corpus Milestone",
    description:
      "With continuous RGOB support, sovereign matching grants, and public donations, the capital endowment crossed Nu. 3.0 Billion.",
    orderIndex: 7,
  },
  {
    year: "2019",
    title: "Introduction of HPV & Flu Vaccines",
    description:
      "Financing expanded to cover nationwide Human Papillomavirus (HPV) vaccination for cervical cancer prevention and annual seasonal influenza vaccines for vulnerable groups.",
    orderIndex: 8,
  },
  {
    year: "2026",
    title: "Nu. 4.8 Billion Corpus & Comprehensive Formulary",
    description:
      "Capital endowment reached Nu. 4,798,965,306.85 (~Nu. 4.8B) as of 30 June 2026, funding 438 essential medicines, 110 traditional medicines (65 core formulations), and 4 routine vaccines nationwide.",
    orderIndex: 9,
  },
];

export const initialSiteSettings: NewSiteSetting[] = [
  // 1. General & Sovereign Branding
  {
    settingKey: "site_title",
    settingValue: "Bhutan Health Trust Fund | འབྲུག་གི་གསོ་བའི་བཅོལ་དངུལ།",
    category: "general",
    description: "Official institutional website title in English and Dzongkha",
  },
  {
    settingKey: "site_tagline",
    settingValue: "Universal Primary Healthcare in Perpetuity for All Citizens of Bhutan",
    category: "general",
    description: "Institutional motto and sovereign health mandate tagline",
  },
  {
    settingKey: "founding_year",
    settingValue: "1998",
    category: "general",
    description: "Royal Charter establishment year by His Majesty the Fourth Druk Gyalpo",
  },
  {
    settingKey: "emergency_hotline",
    settingValue: "112",
    category: "general",
    description: "National emergency health helpline number",
  },
  {
    settingKey: "emergency_hotline_label",
    settingValue: "Toll-Free, 24/7 Nationwide Emergency Medical Helpline",
    category: "general",
    description: "Helpline availability and service coverage text",
  },

  // 2. Announcement Banner
  {
    settingKey: "announcement_banner_enabled",
    settingValue: "true",
    category: "announcement",
    description: "Toggle site-wide emergency/statutory announcement broadcast",
  },
  {
    settingKey: "announcement_banner",
    settingValue:
      "Universal Primary Health Coverage Guaranteed: 100% of Essential Drugs & Vaccines Ring-Fenced in Perpetuity.",
    category: "announcement",
    description: "Top site-wide announcement broadcast text",
  },
  {
    settingKey: "announcement_badge",
    settingValue: "SOVEREIGN HEALTH MANDATE",
    category: "announcement",
    description: "Uppercase label badge accompanying the announcement ribbon",
  },
  {
    settingKey: "announcement_link",
    settingValue: "/our-work",
    category: "announcement",
    description: "Destination URL when visitors click the announcement ribbon",
  },

  // 3. Contact & Secretariat HQ
  {
    settingKey: "secretariat_phone",
    settingValue: institutionalConfig.secretariatPhone, // TODO-VERIFY
    category: "contact",
    description: "Secretariat official telephone contact",
  },
  {
    settingKey: "secretariat_email",
    settingValue: institutionalConfig.secretariatEmail, // TODO-VERIFY
    category: "contact",
    description: "Secretariat primary contact email",
  },
  {
    settingKey: "secretariat_address",
    settingValue: institutionalConfig.secretariatAddress, // TODO-VERIFY
    category: "contact",
    description: "Secretariat physical headquarters address in Thimphu",
  },
  {
    settingKey: "office_hours",
    settingValue: "Monday – Friday: 9:00 AM – 5:00 PM (Bhutan Standard Time)",
    category: "contact",
    description: "Public working hours for administrative visits and ombudsman queries",
  },
  {
    settingKey: "ombudsman_email",
    settingValue: "grievance@bhtf.bt",
    category: "contact",
    description: "Official public grievance and ombudsman contact desk",
  },

  // 4. Fiduciary, Endowment & Matching
  {
    settingKey: "matching_enabled",
    settingValue: "true",
    category: "fiduciary",
    description: "Enable sovereign 1:1 government matching grant display",
  },
  {
    settingKey: "matching_ratio",
    settingValue: "1:1 Sovereign Multiplier",
    category: "fiduciary",
    description: "Sovereign government matching multiplier on qualified donations",
  },
  {
    settingKey: "capital_endowment_target_nu",
    settingValue: "Nu. 5.0 Billion",
    category: "fiduciary",
    description: "Statutory target endowment corpus for perpetual health security",
  },
  {
    settingKey: "current_endowment_corpus_nu",
    settingValue: "Nu. 4.8 Billion (Nu. 4,798,965,306.85 as of 30 June 2026)",
    category: "fiduciary",
    description: "Current audited capital endowment corpus managed under Royal Charter",
  },
  {
    settingKey: "annual_disbursement_nu",
    settingValue: "Nu. 557.734 Million (FY 2024-25)",
    category: "fiduciary",
    description: "Annual fund disbursement for essential medicines and vaccines",
  },
  {
    settingKey: "bank_account_bob_nu",
    settingValue: institutionalConfig.bankAccountBOB,
    category: "fiduciary",
    description: "Official BoB Domestic Ngultrum Account for donations and sovereign matching",
  },
  {
    settingKey: "bank_account_bob_usd",
    settingValue: institutionalConfig.bankAccountUSD,
    category: "fiduciary",
    description: "Official BoB Foreign Currency USD Account (SWIFT: BHUBBTBT022)",
  },
  {
    settingKey: "drc_tax_exemption_ref",
    settingValue: institutionalConfig.drcCircularRef,
    category: "fiduciary",
    description: "Department of Revenue & Customs Tax Exemption Reference Circular",
  },

  // 5. Mission & Royal Charter Pillars
  {
    settingKey: "mission_statement",
    settingValue:
      "To secure sustainable financial resources in perpetuity to guarantee uninterrupted supply of essential drugs and vaccines for all Bhutanese citizens.",
    category: "pillars",
    description: "Official statutory mission statement",
  },
  {
    settingKey: "vision_statement",
    settingValue:
      "A resilient, self-reliant, and healthy Bhutan where no citizen is deprived of basic primary healthcare due to financial constraints.",
    category: "pillars",
    description: "Official statutory vision statement",
  },
  {
    settingKey: "pillar_1_title",
    settingValue: "438 Essential Medicines & 110 Traditional Formulations",
    category: "pillars",
    description: "Pillar 1: Financing 100% of the National Essential Drugs List and gSo-ba Rig-pa remedies",
  },
  {
    settingKey: "pillar_2_title",
    settingValue: "Universal Immunization (4 Antigens)",
    category: "pillars",
    description: "Pillar 2: Guaranteeing Pentavalent, PCV, HPV and seasonal Influenza vaccines nationwide",
  },
  {
    settingKey: "pillar_3_title",
    settingValue: "Cold-Chain Integrity",
    category: "pillars",
    description: "Pillar 3: Highland porterage and temperature-controlled air logistics",
  },
  {
    settingKey: "pillar_4_title",
    settingValue: "Sovereign Self-Reliance",
    category: "pillars",
    description: "Pillar 4: Perpetual endowment buffer insulating national health security",
  },

  // 6. Social Channels
  {
    settingKey: "social_facebook",
    settingValue: "https://facebook.com/bhtf.bhutan",
    category: "social",
    description: "Official Facebook page URL",
  },
  {
    settingKey: "social_twitter",
    settingValue: "https://twitter.com/bhtf_bhutan",
    category: "social",
    description: "Official X / Twitter account URL",
  },
  {
    settingKey: "social_youtube",
    settingValue: "https://youtube.com/@bhtf_bhutan",
    category: "social",
    description: "Official YouTube documentary and briefing channel",
  },
  {
    settingKey: "social_linkedin",
    settingValue: "https://linkedin.com/company/bhutan-health-trust-fund",
    category: "social",
    description: "Official LinkedIn institutional presence",
  },
];

export const initialMediaGallery: NewMediaGalleryItem[] = [
  {
    title: "Cold-Chain Porterage to Lunana Basic Health Unit",
    category: "Highlands Outreach",
    imageUrl: "/src/assets/news-community.jpg",
    caption:
      "Health workers carrying solar-powered vaccine carrier boxes across 4,500m Himalayan passes to ensure zero children miss immunizations.",
    dzongkhag: "Gasa",
    orderIndex: 1,
    isPublished: true,
  },
  {
    title: "Nationwide Influenza Vaccine Arrival at Paro International",
    category: "Cold Chain",
    imageUrl: "/src/assets/news-vaccine.jpg",
    caption:
      "Over 200,000 doses of quadrivalent seasonal influenza vaccines arriving under strict digital temperature logging.",
    dzongkhag: "Paro",
    orderIndex: 2,
    isPublished: true,
  },
  {
    title: "Outreach Clinic Primary Care in Trashigang",
    category: "Clinics",
    imageUrl: "/src/assets/news-report.jpg",
    caption:
      "Primary health technicians administering life-saving essential medicines to elderly villagers at an outreach clinic.",
    dzongkhag: "Trashigang",
    orderIndex: 3,
    isPublished: true,
  },
];

export const initialMediaVideos: NewMediaVideo[] = [
  {
    title: "25 Years of Free Healthcare: The Royal Sovereign Mandate",
    category: "Documentary",
    videoUrl: "https://www.youtube.com/@bhtf_bhutan",
    duration: "14:20",
    thumbnailUrl: "/src/assets/news-report.jpg",
    description:
      "Comprehensive retrospective on the visionary founding of BHTF in 1998 by His Majesty the Fourth Druk Gyalpo.",
    orderIndex: 1,
    isPublished: true,
  },
  {
    title: "Behind the Cold Chain: Delivering Vaccines to Laya & Lunana",
    category: "Field Report",
    videoUrl: "https://www.youtube.com/@bhtf_bhutan",
    duration: "08:15",
    thumbnailUrl: "/src/assets/news-vaccine.jpg",
    description:
      "Follow Bhutanese frontline healthcare workers traversing snowbound glacial passes to protect remote mountain communities.",
    orderIndex: 2,
    isPublished: true,
  },
];

export const initialProcurementTenders: NewProcurementTender[] = [
  {
    tenderNo: "BHTF/TEND-2025/001",
    title:
      "Supply of 124 National Essential Drugs List (NEDL) Commodities for Fiscal Year 2025-2026",
    category: "Essential Drugs",
    status: "OPEN",
    closingDate: new Date("2026-11-30T17:00:00Z"),
    documentUrl: "",
    documentSize: "2.4 MB",
    description:
      "International competitive bidding for GMP-certified manufacturers supplying antibiotics, cardiovascular, and maternal health commodities.",
  },
  {
    tenderNo: "BHTF/TEND-2025/002",
    title: "Procurement of WHO-Prequalified Pentavalent and Measles-Rubella Vaccines",
    category: "Vaccines",
    status: "EVALUATING",
    closingDate: new Date("2026-10-15T17:00:00Z"),
    documentUrl: "",
    documentSize: "3.1 MB",
    description:
      "Annual sovereign procurement of routine childhood immunization antigens with cold-chain transit temperature validation.",
  },
];
