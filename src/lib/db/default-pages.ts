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
    sections: [],
  },
  {
    slug: "about",
    title: "About Us | Bhutan Health Trust Fund",
    metaDescription:
      "Statutory founding of BHTF under the Royal Charter to sustain free primary healthcare, essential medicines, and vaccines in Bhutan.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "about-organization",
    title: "About Us & Royal Charter Mandate | Bhutan Health Trust Fund",
    metaDescription:
      "Official profile of the Bhutan Health Trust Fund (BHTF), established by Royal Charter to sustain free primary healthcare, essential medicines, and vaccines in Bhutan.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "about-trustees",
    title: "Board of Trustees | Bhutan Health Trust Fund",
    metaDescription:
      "Official directory of the Board of Trustees of the Bhutan Health Trust Fund (Table 1.1), ministerial leadership, and fiduciary governance.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "about-committees",
    title: "Asset Management Committee (AMC) | Bhutan Health Trust Fund",
    metaDescription:
      "Official directory and mandate of the BHTF Asset Management Committee (AMC), Table 1.2 members, and the 70–20–10 operating model.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "about-secretariat",
    title: "Secretariat & Organogram | Bhutan Health Trust Fund",
    metaDescription:
      "Official Secretariat organizational structure, Director Dr. Gyambo Sithey, 4 core operational divisions, and key staff profiles.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "our-story",
    title: "Our Story & Milestones | Bhutan Health Trust Fund",
    metaDescription:
      "The founding chronicle and 26-year timeline of the Bhutan Health Trust Fund (BHTF) from its 1998 Geneva launch to nationwide healthcare financing.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "our-work",
    title: "Programs & Health Commodities | Bhutan Health Trust Fund",
    metaDescription:
      "Discover how BHTF finances essential medicines, life-saving vaccines, diagnostics, and cold chain logistics across all 20 Dzongkhags of Bhutan.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "reports",
    title: "Annual Reports & Financial Audits | Bhutan Health Trust Fund",
    metaDescription:
      "Official annual reports, Royal Audit Authority clean financial audits, and governance publications of the Bhutan Health Trust Fund.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "policies",
    title: "Governance & Policies | Bhutan Health Trust Fund",
    metaDescription:
      "Statutory anti-corruption safeguards, Royal Charter enactments, and operational manuals.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "contact",
    title: "Contact Us | Bhutan Health Trust Fund",
    metaDescription:
      "Official contact information, secretariat location at Lower Motithang, Thimphu, and public inquiry portal.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "news",
    title: "News & Events | Bhutan Health Trust Fund",
    metaDescription:
      "Latest announcements, press releases, procurement updates, and healthcare milestones from BHTF.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "track-donation",
    title: "Track Donation & DRC Tax Certificate | Bhutan Health Trust Fund",
    metaDescription:
      "Verify your tax-deductible contribution and generate an official DRC Tax Exemption Certificate.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "get-involved",
    title: "Donate & Support | Bhutan Health Trust Fund",
    metaDescription:
      "Sustain universal primary healthcare for Bhutan through 1:1 RGOB matched endowment giving.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "donate",
    title: "Donate & Support | Bhutan Health Trust Fund",
    metaDescription:
      "Make a contribution to sustain free primary healthcare for Bhutan. 1:1 RGOB matched giving.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "news-events",
    title: "Events Calendar | Bhutan Health Trust Fund",
    metaDescription: "Official BHTF calendar of commemorative events and public filings.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "news-announcements",
    title: "Official Announcements | Bhutan Health Trust Fund",
    metaDescription: "Press releases and announcements from the BHTF Secretariat.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "news-careers",
    title: "Careers & Procurement | Bhutan Health Trust Fund",
    metaDescription: "Career vacancies and procurement opportunities at BHTF.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "resources-advocacy",
    title: "Advocacy & Outreach | Bhutan Health Trust Fund",
    metaDescription: "Official advocacy materials and healthcare outreach documents.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "resources-annual-reports",
    title: "Annual Reports Archive | Bhutan Health Trust Fund",
    metaDescription: "Certified annual financial reports and impact archives.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "resources-audit-reports",
    title: "Audit Reports | Bhutan Health Trust Fund",
    metaDescription: "Royal Audit Authority (RAA) certified audit statements.",
    isSystemPage: true,
    sections: [],
  },
  {
    slug: "resources-window-financing",
    title: "Window Financing Operational Manual | Bhutan Health Trust Fund",
    metaDescription: "SOPs and procurement guidelines for quarterly healthcare releases.",
    isSystemPage: true,
    sections: [],
  },
];
