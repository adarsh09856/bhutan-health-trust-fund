import type { NewUser, NewNewsArticle, NewReport, NewPolicy, NewProgram, NewDonation, NewInquiry, NewSubscriber } from "./schema";

// Precomputed bcrypt hash for password "Admin@BHTF2026"
export const DEFAULT_ADMIN_PASSWORD_HASH = "$2a$10$8g4s2M2rO7G6jH4U9D8a.uLdF1LfZ3Q6gQeYk.Qk8yF6d5K.q1d9C";

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
    excerpt: "Over 200,000 doses of seasonal influenza vaccines are being deployed across all twenty dzongkhags to protect high-risk populations.",
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
    excerpt: "BHTF expands financing to outreach clinics and Basic Health Units serving Bhutan's most geographically isolated settlements.",
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
    excerpt: "Read our full report detailing program impacts, capital endowment growth, and audited financials for fiscal year 2023.",
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
    excerpt: "Continued bilateral support reinforces sustainable co-financing for routine immunization and future vaccine introductions.",
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
    excerpt: "A landmark milestone in the global campaign against cervical cancer, safeguarding young girls across all schools.",
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
    excerpt: "Recognized for exemplary governance, fiduciary transparency, and sustainable public health endowment stewardship in South Asia.",
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
    description: "Comprehensive review of trust fund operations, program financing, capital growth, and healthcare metrics across Bhutan.",
    downloadCount: 382,
  },
  {
    title: "Audited Financial Statements (RAA) 2023",
    year: "2024",
    category: "Financial",
    fileUrl: "/documents/bhtf-audited-financials-2023.pdf",
    fileSize: "2.1 MB",
    description: "Independent audit conducted by the Royal Audit Authority of Bhutan with unqualified clean compliance opinion.",
    downloadCount: 294,
  },
  {
    title: "Sustainability of Vaccine Financing in Bhutan",
    year: "2023",
    category: "Research",
    fileUrl: "/documents/vaccine-financing-sustainability.pdf",
    fileSize: "3.5 MB",
    description: "Long-term econometric analysis on transition from donor aid to sovereign trust fund self-reliance.",
    downloadCount: 175,
  },
  {
    title: "Primary Healthcare Impact Assessment",
    year: "2023",
    category: "Assessment",
    fileUrl: "/documents/phc-impact-assessment.pdf",
    fileSize: "1.9 MB",
    description: "Field evaluation of medicine availability and patient satisfaction in remote Basic Health Units (BHUs).",
    downloadCount: 140,
  },
  {
    title: "Procurement Transparency & Compliance Report",
    year: "2023",
    category: "Governance",
    fileUrl: "/documents/procurement-transparency-2023.pdf",
    fileSize: "1.4 MB",
    description: "Detailed breakdown of international competitive bidding, medicine quality assurance, and supplier metrics.",
    downloadCount: 98,
  },
  {
    title: "BHTF Strategic Master Plan 2022-2027",
    year: "2022",
    category: "Strategy",
    fileUrl: "/documents/bhtf-strategic-plan-2022-2027.pdf",
    fileSize: "5.2 MB",
    description: "Five-year roadmap outlining endowment expansion, new vaccine introductions, and emergency reserve funds.",
    downloadCount: 510,
  },
];

export const initialPolicies: NewPolicy[] = [
  {
    title: "Royal Charter & Governance Bylaws",
    slug: "royal-charter-governance",
    category: "Governance",
    summary: "Foundational legal instrument establishing BHTF's autonomy, Board of Trustees mandate, and fiduciary duties.",
    content: `The Royal Charter defines the sovereign mandate of the Bhutan Health Trust Fund as an autonomous institution dedicated to the perpetual financing of essential medicines and vaccines for the people of Bhutan.`,
    effectiveDate: "2020 (Revised)",
    fileUrl: "/documents/bhtf-charter.pdf",
  },
  {
    title: "Medicine Procurement & Quality Assurance Policy",
    slug: "procurement-quality-assurance",
    category: "Procurement",
    summary: "Standard operating procedures ensuring open competitive bidding, WHO pre-qualification compliance, and batch testing.",
    content: `All medicine procurements financed by BHTF follow transparent, open competitive international bidding in adherence to the Royal Government Procurement Rules and WHO Pre-Qualification guidelines.`,
    effectiveDate: "2023",
    fileUrl: "/documents/procurement-policy.pdf",
  },
  {
    title: "Anti-Corruption & Whistleblower Protection Policy",
    slug: "anti-corruption-whistleblower",
    category: "Ethics",
    summary: "Zero-tolerance standard for corruption, fraud, or misuse of funds, with secure confidential reporting channels.",
    content: `BHTF maintains a zero-tolerance policy regarding bribery, fraud, embezzlement, or conflict of interest. Whistleblowers are protected under Bhutanese law with direct confidential access to the Board Ethics Committee and the Anti-Corruption Commission (ACC).`,
    effectiveDate: "2023",
    fileUrl: "/documents/whistleblower-policy.pdf",
  },
  {
    title: "Conflict of Interest & Ethics Code",
    slug: "conflict-of-interest-policy",
    category: "Ethics",
    summary: "Mandatory annual declarations and recusal guidelines for Trustees, Secretariat executives, and procurement evaluators.",
    content: `All trustees, committee members, and staff must declare financial and personal interests annually. Any member with a potential conflict is legally required to recuse themselves from deliberations.`,
    effectiveDate: "2024",
    fileUrl: "/documents/conflict-of-interest.pdf",
  },
  {
    title: "Endowment Investment Policy Statement",
    slug: "endowment-investment-policy",
    category: "Finance",
    summary: "Prudent guidelines governing asset allocation, risk management, and ethical investment of trust fund capital.",
    content: `The Investment Policy Statement governs capital preservation, inflation hedging, and liquidity maintenance to ensure sustainable annual funding disbursements without eroding real endowment value.`,
    effectiveDate: "2024",
    fileUrl: "/documents/investment-policy.pdf",
  },
  {
    title: "Data Protection & Donor Privacy Policy",
    slug: "data-protection-privacy",
    category: "Privacy",
    summary: "Rigorous standards protecting donor identities, financial transaction data, and organizational digital assets.",
    content: `We adhere to the highest standards of data security. Donor personal details and transaction records are encrypted and never sold, shared, or utilized for commercial purposes.`,
    effectiveDate: "2024",
    fileUrl: "/documents/privacy-policy.pdf",
  },
];

export const initialPrograms: NewProgram[] = [
  {
    slug: "essential-medicines-financing",
    title: "Essential Medicines Program",
    summary: "Procurement and uninterrupted supply of over 120 essential medicines distributed across all 20 dzongkhags.",
    fullDescription: "Finances 100% of the National Essential Drugs List, covering primary care therapeutics from remote Basic Health Units to national referral hospitals.",
    icon: "Pill",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "780,000+ Citizens",
    status: "ACTIVE",
  },
  {
    slug: "routine-childhood-immunization",
    title: "National Immunization Program",
    summary: "Financing routine childhood immunization and new vaccine introductions including HPV and seasonal influenza.",
    fullDescription: "Ensures no child in Bhutan misses life-saving vaccines against measles, polio, hepatitis B, rotavirus, pneumococcal disease, and HPV.",
    icon: "Syringe",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "100,000+ Children & Adolescents",
    status: "ACTIVE",
  },
  {
    slug: "primary-healthcare-strengthening",
    title: "Primary Healthcare & Remote Outreach",
    summary: "Strengthening Basic Health Units and outreach clinics that bring essential care to mountainous communities.",
    fullDescription: "Equips rural health clinics with diagnostic test kits, cold-chain refrigeration, and emergency medical kits.",
    icon: "Stethoscope",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "450+ Rural Villages",
    status: "ACTIVE",
  },
  {
    slug: "maternal-child-health",
    title: "Maternal & Child Health",
    summary: "Investing in safer pregnancies, healthy births, and thriving children through specialized medicines and supplements.",
    fullDescription: "Supplies antenatal vitamins, iron folic acid supplements, sterile delivery commodities, and neonatal resuscitation items.",
    icon: "HeartPulse",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "25,000+ Mothers & Infants",
    status: "ACTIVE",
  },
  {
    slug: "diagnostics-medical-supplies",
    title: "Diagnostics & Essential Supplies",
    summary: "Reliable point-of-care rapid diagnostics and medical consumables supporting clinicians at every level.",
    fullDescription: "Rapid test kits for malaria, dengue, HIV, diabetes screening, and standard laboratory reagents.",
    icon: "Microscope",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "205 Health Centers",
    status: "ACTIVE",
  },
  {
    slug: "health-workforce-enablement",
    title: "Health Workforce Enablement",
    summary: "Capacity-building programs and supply-chain training for health workers serving Bhutan's most remote communities.",
    fullDescription: "Conducts pharmacovigilance, vaccine cold-chain management, and inventory logistics training for health assistants.",
    icon: "GraduationCap",
    targetDzongkhags: "All 20 Dzongkhags",
    beneficiariesReached: "1,200+ Health Workers",
    status: "ACTIVE",
  },
];

export const initialDonations: NewDonation[] = [
  {
    referenceNo: "BHTF-DON-928174",
    donorName: "Tashi Dorji",
    donorEmail: "tashi.dorji@druknet.bt",
    donorPhone: "+975 17112233",
    amountNu: 10000,
    paymentMethod: "MBOB",
    status: "COMPLETED",
    message: "In honour of His Majesty's vision for universal healthcare.",
    isAnonymous: false,
  },
  {
    referenceNo: "BHTF-DON-741920",
    donorName: "Dechen Wangmo",
    donorEmail: "dechen.w@gmail.com",
    donorPhone: "+975 77665544",
    amountNu: 5000,
    paymentMethod: "BNB_PAY",
    status: "COMPLETED",
    message: "Supporting essential medicines for our rural elders.",
    isAnonymous: false,
  },
  {
    referenceNo: "BHTF-DON-551029",
    donorName: "Karma Yangzom",
    donorEmail: "karmay@hotmail.com",
    donorPhone: "+975 17889900",
    amountNu: 25000,
    paymentMethod: "RMA_GATEWAY",
    status: "VERIFIED",
    message: "Generous corporate match contribution.",
    isAnonymous: false,
  },
  {
    referenceNo: "BHTF-DON-318492",
    donorName: "Well-wisher",
    donorEmail: "anonymous@bhutan.bt",
    donorPhone: null,
    amountNu: 1000,
    paymentMethod: "MBOB",
    status: "COMPLETED",
    message: "May all sentient beings be free from illness.",
    isAnonymous: true,
  },
];

export const initialInquiries: NewInquiry[] = [
  {
    name: "Sonam Tobgay",
    email: "stobgay@moh.gov.bt",
    subject: "Procurement Schedule for Q3 2024 Essential Commodities",
    message: "Greetings from the Dzongkhag Health Office, Mongar. We would like to inquire about the delivery timeline for the pediatric antibiotic replenishment batch.",
    status: "UNREAD",
    replyNotes: null,
  },
  {
    name: "Dr. Rachel Higgins",
    email: "rachel.higgins@globalhealth.org",
    subject: "Partnership Inquiry: Cold Chain Monitoring Pilot",
    message: "We are developing IoT solar cold-chain data loggers and would love to discuss a pilot deployment with BHTF for remote outreach clinics.",
    status: "IN_PROGRESS",
    replyNotes: "Director advised forwarding proposal to Technical Advisory Committee.",
  },
  {
    name: "Ugyen Pelzom",
    email: "upelzom@bhutanfound.bt",
    subject: "Volunteer & Community Engagement Inquiry",
    message: "How can our university student association participate in the upcoming World Health Day awareness rallies in Thimphu?",
    status: "REPLIED",
    replyNotes: "Sent information brochure and contact of Communications Officer.",
  },
];

export const initialSubscribers: NewSubscriber[] = [
  { email: "info@drukhealth.bt", isActive: true },
  { email: "sangay.c@rub.edu.bt", isActive: true },
  { email: "pema.choden@undp.org", isActive: true },
  { email: "tshering.penjor@bhtf.bt", isActive: true },
];

