import {
  Sparkles,
  BarChart3,
  FileText,
  Grid,
  Quote,
  Video,
  HelpCircle,
  Megaphone,
} from "lucide-react";
import type { PageBlockSection } from "@/lib/db/schema";

export interface BlockMeta {
  type: PageBlockSection["type"];
  name: string;
  description: string;
  icon: any;
  defaultData: Omit<PageBlockSection, "id" | "order">;
}

export const BLOCK_REGISTRY: BlockMeta[] = [
  {
    type: "hero",
    name: "Hero Banner",
    description: "Grand royal hero banner with Dzongkha subline, badge, and dual CTA action buttons.",
    icon: Sparkles,
    defaultData: {
      type: "hero",
      title: "Healthy People. Stronger Bhutan.",
      subtitle: "Sovereign healthcare financing guaranteeing essential medicines and vaccines.",
      dzongkhaText: "མི་སེར་གཟུགས་ཁམས་བཟང་པོ་དང་ རྒྱལ་ཁབ་སྟོབས་ཤུགས་ཅན།",
      badge: "Royal Charter Statutory Fund",
      bgVariant: "dark",
      padding: "normal",
      isVisible: true,
      primaryCtaText: "Contribute to Corpus",
      primaryCtaUrl: "/get-involved",
      secondaryCtaText: "Learn More",
      secondaryCtaUrl: "/our-work",
    },
  },
  {
    type: "stats",
    name: "Impact Stat Counters",
    description: "High-impact verified national metrics with numeric highlights, icons, and descriptions.",
    icon: BarChart3,
    defaultData: {
      type: "stats",
      title: "National Health Security Metrics",
      subtitle: "Verified statutory impact across all 20 Dzongkhags",
      bgVariant: "warm",
      padding: "normal",
      isVisible: true,
      items: [
        {
          value: "780,000+",
          title: "Citizens Protected",
          description: "Universal primary healthcare coverage guaranteed across Bhutan.",
          icon: "Users",
        },
        {
          value: "120+",
          title: "Essential Medicines",
          description: "Continuous national buffer for vital primary and emergency drugs.",
          icon: "Pill",
        },
        {
          value: "20 / 20",
          title: "Dzongkhags Reached",
          description: "Active supply lines to all 205 remote gewog Primary Health Units.",
          icon: "MapPin",
        },
        {
          value: "100%",
          title: "Routine Vaccines",
          description: "14 pediatric antigens fully financed and sustained in perpetuity.",
          icon: "Syringe",
        },
      ],
    },
  },
  {
    type: "feature_cards",
    name: "Feature / Program Cards",
    description: "Multi-column grid showcasing healthcare commodity streams, pillars, or services.",
    icon: Grid,
    defaultData: {
      type: "feature_cards",
      title: "Healthcare Financing Streams",
      subtitle: "Uninterrupted medical supply lines secured by the Trust Fund",
      bgVariant: "white",
      padding: "normal",
      isVisible: true,
      items: [
        {
          title: "120+ Essential Medicines",
          description: "Vital antibiotics, cardiovascular agents, analgesics, and emergency maternity commodities.",
          badge: "Primary Formulary",
          icon: "Pill",
          url: "/our-work",
        },
        {
          title: "Universal Vaccines",
          description: "14 routine childhood immunization antigens protecting every newborn.",
          badge: "Immunization",
          icon: "Syringe",
          url: "/our-work",
        },
        {
          title: "Highland Cold Chain",
          description: "Solar-powered medical cooling units reaching alpine gewogs in Gasa and Laya.",
          badge: "Cold Chain",
          icon: "ThermometerSnowflake",
          url: "/our-work",
        },
      ],
    },
  },
  {
    type: "royal_decree",
    name: "Royal Decree / Quote Callout",
    description: "Sovereign royal decree card with golden borders, Dzongkha insignia, and royal attribution.",
    icon: Quote,
    defaultData: {
      type: "royal_decree",
      title: "The Royal Mandate of Sustainable Healthcare",
      subtitle: "His Majesty The King of Bhutan",
      dzongkhaText: "རྒྱལ་པོའི་བཀའ་ཤོག",
      content:
        "No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come.",
      badge: "Royal Charter",
      bgVariant: "gold",
      padding: "normal",
      isVisible: true,
    },
  },
  {
    type: "rich_text",
    name: "Rich Text & Mission",
    description: "Editorial text block for institutional statements, background history, and policy briefs.",
    icon: FileText,
    defaultData: {
      type: "rich_text",
      title: "Autonomous Statutory Mandate",
      subtitle: "Ring-Fenced Health Procurement Power",
      content:
        "The Bhutan Health Trust Fund operates under the highest fiduciary benchmarks in the Kingdom. Governed by an eminent Board of Trustees and audited annually by the Royal Audit Authority, all operational yields are ring-fenced exclusively for primary healthcare commodities.",
      bgVariant: "warm",
      padding: "normal",
      isVisible: true,
    },
  },
  {
    type: "accordion_faq",
    name: "FAQ Accordion",
    description: "Interactive collapsible question and answer section for citizen clarity.",
    icon: HelpCircle,
    defaultData: {
      type: "accordion_faq",
      title: "Frequently Asked Questions",
      subtitle: "Clear answers on governance, donations, and healthcare disbursements",
      bgVariant: "white",
      padding: "normal",
      isVisible: true,
      items: [
        {
          question: "How is my donation matched by the Royal Government?",
          answer:
            "Every Ngultrum donated by citizens and international well-wishers is doubled 1:1 by the Royal Government of Bhutan and deposited directly into the permanent endowment corpus.",
        },
        {
          question: "Is the principal corpus ever spent?",
          answer:
            "No. Under Royal Charter, the capital corpus is ring-fenced in perpetuity. Only the audited annual return on investment is disbursed to purchase essential drugs and vaccines.",
        },
        {
          question: "How are medicines distributed to remote Dzongkhags?",
          answer:
            "BHTF finances procurement through the Department of Medical Services and Central Medical Stores, guaranteeing supply lines to all 205 remote Gewog Primary Health Units.",
        },
      ],
    },
  },
  {
    type: "cta_banner",
    name: "Matched Giving / Action Banner",
    description: "High-converting action ribbon with matched pledge messaging and direct action button.",
    icon: Megaphone,
    defaultData: {
      type: "cta_banner",
      title: "Every Ngultrum is Matched 1:1 by the Royal Government",
      subtitle:
        "Strengthen Bhutan's perpetual sovereign health buffer. 100% of your contribution is ring-fenced for life-saving medicines and vaccines.",
      badge: "1:1 Sovereign Matching Grant",
      bgVariant: "emerald",
      padding: "normal",
      isVisible: true,
      primaryCtaText: "Contribute to Corpus (1:1 Matched)",
      primaryCtaUrl: "/get-involved",
      secondaryCtaText: "Track Donation Reference",
      secondaryCtaUrl: "/track-donation",
    },
  },
];
