import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import {
  StatementLayout,
  RuledLedgerLayout,
  TwoColumnNarrativeLayout,
  DocumentRegisterLayout,
  GazetteTimelineLayout,
  PhotographicPlateLayout,
} from "@/components/institutional-layouts";
import kingPortrait from "@/assets/king_portrait_fourth.jpg";

export const Route = createFileRoute("/specimen")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "specimen" } }).catch(() => null);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return { customSections: sections };
    } catch {
      return { customSections: null };
    }
  },
  head: () => ({
    meta: [
      { title: "Institutional Design System Specimen | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official demonstration of the six approved institutional layouts with genuine statutory data, typography, and palette.",
      },
    ],
  }),
  component: SpecimenPage,
});

function SpecimenPage() {
  const { customSections } = Route.useLoaderData();

  if (customSections && customSections.length > 0) {
    return (
      <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 min-h-screen pt-24 sm:pt-28">
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900 min-h-screen">
      <PageHero
        badge="Design System Specimen"
        title="Institutional Layouts & Typographic Standards"
        subtitle="Verification specimen displaying all six approved layout archetypes populated strictly with authentic BHTF statutory data, figures, and historical records."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "Design System Specimen" },
        ]}
      />

      {/* Intro Note */}
      <div className="bg-[#FAF8F3] py-8 border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-600">
          SPECIMEN VOCABULARY: 1. Statement of Mandate • 2. Ruled Ledger • 3. Two-Column Narrative • 4. Document Register • 5. Gazette Timeline • 6. Photographic Plate
        </div>
      </div>

      {/* 1. Layout 1: Statement of Royal Mandate (Typographic Authority) */}
      <StatementLayout
        legalBasis="Royal Charter Proclamation • 3 August 2000"
        proclamation="No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come."
        citation="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
        theme="parchment"
      />

      {/* 2. Layout 2: Ruled Fiduciary Ledger / Data Table */}
      <RuledLedgerLayout
        title="Statutory Fiduciary & Operational Ledger"
        subtitle="Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship."
        sourceLine="Source: Royal Audit Authority (RAA) Certified Statements & BHTF Secretariat Annual Filing, FY 2024–2025"
        theme="parchment"
        rows={[
          {
            label: "Sovereign Health Corpus (Endowment Principal)",
            figure: "Nu. 3,248,500,000",
            subtext: "Ring-fenced statutory capital invested in sovereign instruments and fixed-income portfolios.",
            code: "CORPUS-AUDIT-2025",
          },
          {
            label: "Annual Commodity Procurement Yield Disbursement",
            figure: "Nu. 145,000,000",
            subtext: "Disbursed quarterly to Department of Medical Services exclusively for vital medicines and vaccines.",
            code: "DISB-NEDL",
          },
          {
            label: "Citizens Protected Across 20 Dzongkhags",
            figure: "780,000+",
            subtext: "Universal healthcare guarantee delivered across all 205 remote gewog Primary Health Units.",
            code: "COVERAGE-MOH",
          },
          {
            label: "Essential Medicines on Zero-Stockout Formulary",
            figure: "120+ Formulations",
            subtext: "Pre-stocked continuous 6-month buffer maintained against global supply-chain shocks.",
            code: "NEML-REV-8",
          },
          {
            label: "Universal Pediatric Vaccine Antigens Financed",
            figure: "14 Antigens",
            subtext: "100% routine childhood and maternal immunization coverage sustained in perpetuity.",
            code: "EPI-WHO",
          },
        ]}
      />

      {/* 3. Layout 3: Two-Column Institutional Narrative */}
      <TwoColumnNarrativeLayout
        sectionTitle="Universal Vaccine & Primary Formulary Financing"
        referenceCode="Statutory Mandate & Allocation"
        paragraphs={[
          "Under the benevolent vision of His Majesty the Fourth Druk Gyalpo, the Bhutan Health Trust Fund was enacted to protect the nation's primary healthcare from the volatility of external donor funding. Operating as an autonomous statutory institution, the Fund finances 100% of routine pediatric vaccines and over 120 essential pharmaceuticals directly for every hospital and gewog clinic in the Kingdom.",
          "Procurement is conducted through WHO-prequalified international supply agreements and UNICEF supply divisions to eliminate intermediaries and guarantee verified cold chain potency. All annual purchases are funded entirely from endowment returns, ensuring the core capital corpus of Nu. 3.24B remains untouched in perpetuity.",
        ]}
        actionLink={{
          label: "Read Full Governance & Mandate Details",
          to: "/about/organization",
        }}
        theme="parchment"
      />

      {/* 4. Layout 4: Archival Document & Publication Register */}
      <DocumentRegisterLayout
        title="Statutory Publication & Certified Audit Register"
        subtitle="Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny."
        theme="parchment"
        documents={[
          {
            id: 1,
            title: "Annual Financial & Operational Audit Report (FY 2024–2025)",
            referenceNo: "RAA-BHTF-2025-01",
            date: "June 2026",
            category: "Audit Report",
            formatSize: "PDF, 4.2 MB",
            downloadUrl: "/reports",
          },
          {
            id: 2,
            title: "Royal Charter of the Bhutan Health Trust Fund (Official Enactment)",
            referenceNo: "ROYAL-CHARTER-2000",
            date: "August 2000",
            category: "Legal Charter",
            formatSize: "PDF, 1.8 MB",
            downloadUrl: "/reports",
          },
          {
            id: 3,
            title: "National Essential Drugs List & Vaccine Cold-Chain Protocol",
            referenceNo: "MOH-NEDL-REV8",
            date: "January 2026",
            category: "Formulary",
            formatSize: "PDF, 2.4 MB",
            downloadUrl: "/reports",
          },
        ]}
      />

      {/* 5. Layout 5: Archival Chronology / Gazette Timeline */}
      <GazetteTimelineLayout
        title="Chronology of Health Sovereignty"
        subtitle="Milestones in statutory enactment, multilateral accords, and endowment growth."
        theme="parchment"
        entries={[
          {
            date: "12 May 1998",
            title: "Launch at 51st World Health Assembly in Geneva",
            summary:
              "The visionary proposal of an autonomous endowment fund to sustainably finance primary healthcare is presented to the international community in Geneva.",
            statutoryBasis: "Geneva Multilateral Health Accord",
          },
          {
            date: "3 August 2000",
            title: "Royal Charter Enacted by His Majesty the Fourth Druk Gyalpo",
            summary:
              "Formal statutory enactment establishing BHTF as an autonomous body with ring-fenced corpus capital and Board of Trustees oversight.",
            statutoryBasis: "Royal Charter 2000",
          },
          {
            date: "2014",
            title: "Institutionalization of 1:1 RGOB Sovereign Match",
            summary:
              "The Royal Government of Bhutan cements a permanent dollar-for-dollar matching commitment for all citizen and institutional contributions.",
            statutoryBasis: "Ministry of Finance Proclamation",
          },
          {
            date: "2026",
            title: "Corpus Exceeds Nu. 3.24 Billion",
            summary:
              "Endowment yields sustainably cover 100% of national routine vaccine needs and 120+ essential medicines across all 20 Dzongkhags.",
            statutoryBasis: "Royal Audit Authority Unqualified Clean Certification",
          },
        ]}
      />

      {/* 6. Layout 6: Photographic Plate with Archival Caption */}
      <PhotographicPlateLayout
        imageSrc={kingPortrait}
        imageAlt="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
        captionTitle="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
        captionText="Father of Gross National Happiness and founder of the Bhutan Health Trust Fund. Conceived in 1998 and enacted under Royal Charter in 2000 to guarantee that primary healthcare remains permanently free and accessible to all Bhutanese citizens."
        credit="Bhutan Health Trust Fund Archival Registry • Royal Government of Bhutan"
        theme="parchment"
      />
    </div>
  );
}
