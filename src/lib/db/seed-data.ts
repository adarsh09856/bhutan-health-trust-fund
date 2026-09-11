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
    role: "Chairperson of the Board",
    organization: "Ministry of Health, RGOB",
    badge: "Government Trustee",
    bio: "Oversees strategic alignment with national healthcare policies, Five-Year Plans, and universal primary coverage across the Kingdom.",
    photoUrl: "/src/assets/logo.png",
    orderIndex: 1,
    isActive: true,
  },
  {
    name: "Dasho Leki Wangmo",
    role: "Secretary of Finance",
    organization: "Ministry of Finance, RGOB",
    badge: "Fiscal Trustee",
    bio: "Directs endowment investment policies, 1:1 RGOB matching disbursements, and statutory fiscal governance.",
    photoUrl: "/src/assets/logo.png",
    orderIndex: 2,
    isActive: true,
  },
  {
    name: "Dr. Bhupinder Kaur Aulakh",
    role: "Country Representative",
    organization: "World Health Organization (WHO)",
    badge: "Multilateral Partner",
    bio: "Advises on international pooled vaccine procurement, WHO prequalification standards, and cold chain safety.",
    photoUrl: "/src/assets/logo.png",
    orderIndex: 3,
    isActive: true,
  },
  {
    name: "Dasho Ugyen Tsewang",
    role: "Civil Society & Private Sector Trustee",
    organization: "Eminent Public Representative",
    badge: "Public Oversight",
    bio: "Ensures citizen representation, societal accountability, ethical fiduciary stewardship, and community donor engagement.",
    photoUrl: "/src/assets/logo.png",
    orderIndex: 4,
    isActive: true,
  },
  {
    name: "Dr. Pandup Tshering",
    role: "Director of Medical Services",
    organization: "Department of Medical Services, RGOB",
    badge: "Clinical Technical",
    bio: "Monitors national essential drug formularies, consumption rates, and 6-month buffer stock requirements across all 20 Dzongkhags.",
    photoUrl: "/src/assets/logo.png",
    orderIndex: 5,
    isActive: true,
  },
  {
    name: "Dr. Sithar Dorjee",
    role: "Secretariat Director",
    organization: "BHTF Executive Secretariat",
    badge: "Executive Leadership",
    bio: "Leads day-to-day capital endowment management, international tender financing, and statutory Royal Audit Authority compliance.",
    photoUrl: "/src/assets/logo.png",
    orderIndex: 6,
    isActive: true,
  },
];

export const initialFaqs: NewFaq[] = [
  {
    question: "How does the 1:1 RGOB Matching Fund work?",
    answer:
      "Every single Ngultrum contributed by individuals, corporations, or international donors is matched 1:1 by the Royal Government of Bhutan through the Ministry of Finance, effectively doubling your healthcare purchasing power.",
    category: "Matching Fund",
    orderIndex: 1,
    isPublished: true,
  },
  {
    question: "Are donations to BHTF tax-deductible in Bhutan?",
    answer:
      "Yes. In accordance with Department of Revenue & Customs regulations, donations made to BHTF are eligible for corporate and personal income tax deduction upon receipt of our official stamped pledge certificate.",
    category: "Tax Deduction",
    orderIndex: 2,
    isPublished: true,
  },
  {
    question: "How does BHTF select which medicines and vaccines to finance?",
    answer:
      "BHTF finances commodities from the National Essential Medicines List (NEML) approved by the Ministry of Health and Drug Regulatory Authority of Bhutan, strictly adhering to WHO prequalification standards.",
    category: "Procurement",
    orderIndex: 3,
    isPublished: true,
  },
  {
    question: "Can international donors contribute in foreign currencies (USD, EUR, GBP)?",
    answer:
      "Yes. BHTF maintains official foreign currency accounts with the Bank of Bhutan and Bhutan National Bank for direct international SWIFT wire transfers.",
    category: "Donations",
    orderIndex: 4,
    isPublished: true,
  },
  {
    question: "How can remote gewog clinics report emergency stock alerts?",
    answer:
      "Basic Health Units (BHUs) communicate through the National Emergency Health Logistics Channel and Dzongkhag Health Officers to trigger immediate replenishment.",
    category: "Logistics",
    orderIndex: 5,
    isPublished: true,
  },
];

export const initialImpactMetrics: NewImpactMetric[] = [
  {
    label: "Citizens Protected",
    value: "780,000+",
    description: "Universal health coverage for every citizen across the Kingdom",
    icon: "Users",
    badge: "Universal Access",
    orderIndex: 1,
    isActive: true,
  },
  {
    label: "Essential Medicines",
    value: "120+",
    description: "Uninterrupted national supply of primary and emergency drugs",
    icon: "Pill",
    badge: "Formulary Approved",
    orderIndex: 2,
    isActive: true,
  },
  {
    label: "Dzongkhags Covered",
    value: "20 / 20",
    description: "Direct supply line to all remote Primary Health Units (BHUs)",
    icon: "MapPin",
    badge: "Nationwide Reach",
    orderIndex: 3,
    isActive: true,
  },
  {
    label: "Childhood Vaccines",
    value: "100%",
    description: "Routine infant immunizations fully guaranteed in perpetuity",
    icon: "Syringe",
    badge: "100% Guaranteed",
    orderIndex: 4,
    isActive: true,
  },
];

export const initialMilestones: NewMilestone[] = [
  {
    year: "1998",
    title: "Conception in Geneva (WHO World Health Assembly)",
    description:
      "The Royal Government of Bhutan formally announced the vision of an autonomous health endowment fund to international partners in Geneva.",
    orderIndex: 1,
  },
  {
    year: "2003",
    title: "Royal Charter & Statutory Establishment",
    description:
      "Enacted under Royal Charter as a permanent statutory trust fund with ring-fenced capital grants from RGOB and bilateral partners.",
    orderIndex: 2,
  },
  {
    year: "2011",
    title: "Target Endowment Corpus Realization",
    description:
      "Reached primary target corpus of USD 24 Million, enabling full operational financing for routine national immunization schedules.",
    orderIndex: 3,
  },
  {
    year: "2018",
    title: "Expansion to 120+ Essential Medicines",
    description:
      "Royal Charter expanded to permanently cover 100% of essential medicines on the National Essential Drugs List.",
    orderIndex: 4,
  },
  {
    year: "2024",
    title: "Sovereign 1:1 RGOB Matching Campaign",
    description:
      "His Majesty The King commands a perpetual 1:1 RGOB matching grant for every Ngultrum pledged to the fund.",
    orderIndex: 5,
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
    settingValue: "Nu. 4.2 Billion",
    category: "fiduciary",
    description: "Current audited capital endowment corpus managed under Royal Charter",
  },
  {
    settingKey: "annual_disbursement_nu",
    settingValue: "Nu. 180 Million",
    category: "fiduciary",
    description: "Annual fund disbursement for essential medicines and vaccines",
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
    settingValue: "100% Essential Medicines",
    category: "pillars",
    description: "Pillar 1: Financing all 124+ life-saving primary medicines",
  },
  {
    settingKey: "pillar_2_title",
    settingValue: "Universal Immunization",
    category: "pillars",
    description: "Pillar 2: Guaranteeing 11 national routine childhood and seasonal antigens",
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
