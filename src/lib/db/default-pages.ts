import type { PageBlockSection } from "./schema";

export interface DefaultPageDef {
  slug: string;
  title: string;
  metaDescription: string;
  isSystemPage: boolean;
  sections: PageBlockSection[];
}

export const defaultCorePages: DefaultPageDef[] = [
  {
    slug: "home",
    title: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan",
    metaDescription:
      "Bhutan Health Trust Fund sustainably finances essential medicines and vaccines for every Bhutanese citizen across all 20 Dzongkhags.",
    isSystemPage: true,
    sections: [
      {
        id: "home-hero",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "Healthy People. Stronger Bhutan.",
        subtitle:
          "Sovereign healthcare financing guaranteeing uninterrupted essential medicines and universal vaccines for every citizen across all 20 Dzongkhags.",
        dzongkhaText: "མི་སེར་གཟུགས་ཁམས་བཟང་པོ་དང་ རྒྱལ་ཁབ་སྟོབས་ཤུགས་ཅན།",
        badge: "Royal Charter Statutory Trust Fund",
        bgVariant: "dark",
        primaryCtaText: "Contribute to Corpus (1:1 Matched)",
        primaryCtaUrl: "/get-involved",
        secondaryCtaText: "Explore Commodities Formulary",
        secondaryCtaUrl: "/our-work",
      },
      {
        id: "home-stats",
        type: "stats",
        order: 2,
        isVisible: true,
        title: "Sovereign Health Impact at a Glance",
        subtitle: "Verified national metrics monitored under Royal Audit Authority oversight",
        bgVariant: "warm",
        items: [
          {
            value: "780,000+",
            title: "Citizens Protected",
            description: "Universal healthcare coverage guaranteed across all 20 Dzongkhags",
            icon: "Users",
          },
          {
            value: "120+",
            title: "Essential Medicines",
            description: "Continuous national buffer for vital primary and emergency drugs",
            icon: "Pill",
          },
          {
            value: "20 / 20",
            title: "Dzongkhags Covered",
            description: "Direct supply line to all 205 remote gewog Primary Health Units",
            icon: "MapPin",
          },
          {
            value: "100%",
            title: "Routine Vaccines",
            description: "14 pediatric antigens fully financed and sustained in perpetuity",
            icon: "Syringe",
          },
        ],
      },
      {
        id: "home-royal-decree",
        type: "royal_decree",
        order: 3,
        isVisible: true,
        title: "The Royal Mandate of Sustainable Healthcare",
        dzongkhaText: "རྒྱལ་པོའི་བཀའ་ཤོག",
        content:
          "No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come.",
        badge: "Royal Charter",
        subtitle: "His Majesty The King of Bhutan",
        bgVariant: "gold",
      },
      {
        id: "home-features",
        type: "feature_cards",
        order: 4,
        isVisible: true,
        title: "Key Institutional Pillars",
        subtitle: "Structured governance and supply lines serving the nation",
        bgVariant: "white",
        items: [
          {
            title: "120+ Essential Medicines",
            description: "Zero-stockout primary and emergency healthcare formulary.",
            icon: "Pill",
            badge: "Primary Formulary",
            url: "/our-work",
          },
          {
            title: "Universal Pediatric Vaccines",
            description: "14 routine immunization antigens ensuring child health nationwide.",
            icon: "Syringe",
            badge: "Zero Polio & Measles",
            url: "/our-work",
          },
          {
            title: "Remote Cold-Chain Logistics",
            description: "Solar-powered temperature-controlled logistics reaching highland settlements.",
            icon: "ThermometerSnowflake",
            badge: "Cold Chain",
            url: "/our-work",
          },
          {
            title: "Fiduciary Integrity & Audits",
            description: "100% clean certification from Royal Audit Authority of Bhutan.",
            icon: "ShieldCheck",
            badge: "Statutory Oversight",
            url: "/reports",
          },
        ],
      },
      {
        id: "home-tools",
        type: "interactive_tools",
        order: 5,
        isVisible: true,
        badge: "Interactive Portals & Simulations",
        title: "National Health District Coverage & Matching Tools",
        subtitle: "Direct access to our 20 Dzongkhags cold-chain data, commodities distribution, and contribution matching.",
      },
      {
        id: "home-cta",
        type: "cta_banner",
        order: 6,
        isVisible: true,
        title: "Every Ngultrum is Matched 1:1 by the Royal Government",
        subtitle:
          "Your endowment contribution is permanently ring-fenced. Only investment yields fund medicines, sustaining healthcare in perpetuity.",
        badge: "Permanent Corpus Endowment",
        primaryCtaText: "Make an Official Contribution",
        primaryCtaUrl: "/get-involved",
        secondaryCtaText: "Track a Donation",
        secondaryCtaUrl: "/track-donation",
        bgVariant: "emerald",
      },
    ],
  },
  {
    slug: "about",
    title: "About Us & Royal Mandate | Bhutan Health Trust Fund",
    metaDescription:
      "Learn about BHTF's Royal Charter mandate, Board of Trustees, sustainable endowment model, and history financing medicines and vaccines for Bhutan.",
    isSystemPage: true,
    sections: [
      {
        id: "about-hero",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "A Sacred Covenant for National Self-Reliance",
        subtitle:
          "Established under Royal Charter in 1998 to protect Bhutan from external dependency on vital medicines and vaccines.",
        dzongkhaText: "རྒྱལ་པོའི་བཀའ་ཤོག་དང་ མི་སེར་གཟུགས་ཁམས་སྲུང་སྐྱོབ།",
        badge: "Royal Charter Institution",
        bgVariant: "dark",
        primaryCtaText: "View Board of Trustees",
        primaryCtaUrl: "#trustees",
        secondaryCtaText: "Read Charter Policies",
        secondaryCtaUrl: "/policies",
      },
      {
        id: "about-pillars",
        type: "feature_cards",
        order: 2,
        isVisible: true,
        title: "Core Foundational Values",
        subtitle: "The principles that anchor every Ngultrum managed by the Secretariat",
        bgVariant: "warm",
        items: [
          {
            title: "Our Mission (དམིགས་ཡུལ།)",
            description:
              "To sustainably finance essential drugs and universal vaccines, guaranteeing uninterrupted, equitable access to primary healthcare for every citizen in Bhutan.",
            icon: "Target",
            badge: "Mission",
          },
          {
            title: "Our Vision (མཐོང་སྣང་།)",
            description:
              "A self-reliant, resilient, and sovereign national health financing system where no Bhutanese is ever denied life-saving medicines or vaccines.",
            icon: "Eye",
            badge: "Vision",
          },
          {
            title: "Gross National Happiness",
            description:
              "Health is recognized as an indispensable foundation for Gross National Happiness, ensuring physical, mental, and social well-being.",
            icon: "Heart",
            badge: "GNH Pillar",
          },
          {
            title: "Permanent Corpus Protection",
            description:
              "Core capital is strictly preserved in perpetuity; only audited investment earnings disburse healthcare commodities.",
            icon: "Lock",
            badge: "Corpus Ring-Fence",
          },
        ],
      },
      {
        id: "about-decree",
        type: "royal_decree",
        order: 3,
        isVisible: true,
        title: "Founding Royal Decree",
        dzongkhaText: "མི་དབང་མངའ་བདག་རིན་པོ་ཆེའི་བཀའ་དྲིན་དྲན་གསོ།",
        content:
          "The Bhutan Health Trust Fund shall stand as an enduring pillar of national resilience, safeguarding the health and vitality of our people against all uncertainties.",
        subtitle: "Fourth Druk Gyalpo Jigme Singye Wangchuck",
        badge: "Founding Royal Decree 1998",
        bgVariant: "gold",
      },
      {
        id: "about-cta",
        type: "cta_banner",
        order: 4,
        isVisible: true,
        title: "Join in Strengthening Bhutan's Health Security",
        subtitle:
          "All contributions are doubled by the Royal Government of Bhutan and invested directly into the permanent endowment fund.",
        badge: "Matched Giving",
        primaryCtaText: "Pledge a Contribution",
        primaryCtaUrl: "/get-involved",
        bgVariant: "emerald",
      },
    ],
  },
  {
    slug: "our-work",
    title: "Healthcare Programs & Essential Medicines | BHTF",
    metaDescription:
      "Explore the 6 core healthcare commodity financing streams supported by Bhutan Health Trust Fund across all 20 Dzongkhags.",
    isSystemPage: true,
    sections: [
      {
        id: "work-hero",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "Sovereign Healthcare Commodity Financing",
        subtitle:
          "Financing 120+ vital medicines and 14 routine pediatric vaccines across all 20 Dzongkhags and 205 Gewogs.",
        dzongkhaText: "གཞི་རིམ་སྨན་རྫས་དང་ འགོག་ཁབ་རྒྱལ་ཡོངས་མཁོ་སྤྲོད།",
        badge: "Zero Stock-Out Mandate",
        bgVariant: "dark",
        primaryCtaText: "Contribute to Procurement",
        primaryCtaUrl: "/get-involved",
        secondaryCtaText: "Review Procurement Guidelines",
        secondaryCtaUrl: "/policies",
      },
      {
        id: "work-streams",
        type: "feature_cards",
        order: 2,
        isVisible: true,
        title: "Financing Streams & Logistics",
        subtitle: "How BHTF safeguards the medical supply line from port of entry to alpine clinics",
        bgVariant: "white",
        items: [
          {
            title: "Vital Primary Formulary",
            description: "Antibiotics, analgesics, cardiovascular treatments, and emergency maternity medicines.",
            icon: "Pill",
            badge: "120+ Formulations",
          },
          {
            title: "Universal Immunization Antigens",
            description: "BCG, Pentavalent, MR, HPV, Oral Polio, and seasonal influenza vaccines.",
            icon: "Syringe",
            badge: "14 Antigens",
          },
          {
            title: "Highland Cold Chain Infrastructure",
            description: "Solar direct drive refrigeration units in snowbound gewog clinics.",
            icon: "ThermometerSnowflake",
            badge: "100% Cold Chain",
          },
          {
            title: "Central Medical Stores Buffer",
            description: "Multi-month strategic emergency stockpile maintained in Phuntsholing and Thimphu.",
            icon: "Building2",
            badge: "Strategic Buffer",
          },
        ],
      },
    ],
  },
  {
    slug: "reports",
    title: "Statutory Reports & RAA Audits | Bhutan Health Trust Fund",
    metaDescription: "Annual reports, audited financial statements, and fiduciary reviews certified by the Royal Audit Authority.",
    isSystemPage: true,
    sections: [
      {
        id: "reports-hero",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "Institutional Transparency & Certified Audits",
        subtitle: "Uncompromising fiduciary integrity with statutory oversight by the Royal Audit Authority of Bhutan.",
        dzongkhaText: "ལོ་བསྟར་རྩིས་ཞིབ་དང་ དྭངས་གསལ་སྙན་ཞུ།",
        badge: "Royal Audit Authority Certified",
        bgVariant: "dark",
        primaryCtaText: "View Publications Catalog",
        primaryCtaUrl: "#catalog",
      },
      {
        id: "reports-notice",
        type: "rich_text",
        order: 2,
        isVisible: true,
        title: "Fiduciary Governance Commitment",
        subtitle: "Every Ngultrum Accounted For",
        content:
          "As an autonomous statutory trust fund created by Royal Charter, BHTF subjects its financial statements to rigorous annual audits by the Royal Audit Authority (RAA). All audit reports and annual returns are placed in the public domain for civic scrutiny.",
        bgVariant: "warm",
      },
    ],
  },
  {
    slug: "policies",
    title: "Policies, Charters & Sovereign Governance | BHTF",
    metaDescription: "Royal Charter, investment guidelines, procurement regulations, and anti-corruption policies.",
    isSystemPage: true,
    sections: [
      {
        id: "policies-hero",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "Policies & Royal Charter Governance",
        subtitle: "Statutory regulations, ethical procurement guidelines, and fiduciary bylaws.",
        dzongkhaText: "ཁྲིམས་ལུགས་དང་ བདག་སྐྱོང་ལམ་སྟོན།",
        badge: "Royal Charter Statutory Framework",
        bgVariant: "dark",
      },
    ],
  },
  {
    slug: "contact",
    title: "Contact Secretariat & Citizen Ombudsman | BHTF",
    metaDescription: "Reach the BHTF Secretariat in Thimphu for inquiries, donations, and feedback.",
    isSystemPage: true,
    sections: [
      {
        id: "contact-hero",
        type: "hero",
        order: 1,
        isVisible: true,
        title: "Citizen Inquiries & Secretariat Contact",
        subtitle: "We welcome citizen inquiries, partnership dialogues, and donor consultations.",
        dzongkhaText: "འབྲེལ་གཏུགས་དང་ མི་སེར་བདེ་དོན།",
        badge: "Secretariat Headquarters — Thimphu",
        bgVariant: "dark",
      },
    ],
  },
];
