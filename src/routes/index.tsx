import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  getPublicImpactMetrics,
  getPublicSettings,
  getPublicNews,
  getPublicPage,
} from "@/lib/api/public.functions";
import type { ImpactMetric, NewsArticle, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer, HeroBlock } from "@/components/page-renderer";

import {
  Users,
  FileText,
  ShieldCheck,
  HandHeart,
  ArrowRight,
  BarChart3,
  Pill,
  Lock,
  Sparkles,
  Calendar,
  MapPin,
  Syringe,
  Activity,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Award,
  ThermometerSnowflake,
  Heart,
  Globe,
  Building2,
  Quote,
  Clock,
  Scale,
  Stethoscope,
  Zap,
} from "lucide-react";
import kingPortrait from "@/assets/king_portrait_fourth.jpg";
import { useCountUp } from "@/hooks/use-count-up";
import {
  StatementLayout,
  RuledLedgerLayout,
  TwoColumnNarrativeLayout,
  DocumentRegisterLayout,
} from "@/components/institutional-layouts";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const [page, metrics, settings, news] = await Promise.all([
        getPublicPage({ data: { slug: "home" } }).catch(() => null),
        getPublicImpactMetrics().catch(() => []),
        getPublicSettings().catch(() => ({})),
        getPublicNews().catch(() => []),
      ]);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return {
        customSections: sections,
        liveMetrics: metrics || [],
        settings: settings || {},
        liveNews: (news || []).slice(0, 3),
      };
    } catch {
      return {
        customSections: null,
        liveMetrics: [],
        settings: {},
        liveNews: [],
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      {
        name: "description",
        content:
          "Bhutan Health Trust Fund sustainably finances essential medicines and vaccines for every Bhutanese citizen across all 20 Dzongkhags.",
      },
    ],
  }),
  component: Index,
});



// Institutional Ledger Data & Regional Distribution
const fiduciaryLedgerRows = [
  {
    label: "Sovereign Health Corpus (Endowment Principal)",
    figure: "Nu. 3,248,500,000",
    code: "CORPUS-AUDIT-2025",
    subtext: "Ring-fenced statutory capital invested in sovereign instruments and fixed-income portfolios.",
  },
  {
    label: "Annual Commodity Procurement Yield Disbursement",
    figure: "Nu. 145,000,000",
    code: "DISB-NEDL",
    subtext: "Disbursed quarterly to Department of Medical Services exclusively for vital medicines and vaccines.",
  },
  {
    label: "Citizens Protected Across 20 Dzongkhags",
    figure: "780,000+",
    code: "COVERAGE-MOH",
    subtext: "Universal healthcare guarantee delivered across all 205 remote gewog Primary Health Units.",
  },
  {
    label: "Essential Medicines on Zero-Stockout Formulary",
    figure: "120+ Formulations",
    code: "NEML-REV-8",
    subtext: "Pre-stocked continuous 6-month buffer maintained against global supply-chain shocks.",
  },
  {
    label: "Universal Pediatric Vaccine Antigens Financed",
    figure: "14 Antigens",
    code: "EPI-WHO",
    subtext: "100% routine childhood and maternal immunization coverage sustained in perpetuity.",
  },
];

const recentAuditDocuments = [
  {
    title: "Annual Financial & Operational Audit Report (FY 2024–2025)",
    referenceNumber: "RAA-BHTF-2025-01",
    date: "June 2026",
    fileSize: "PDF, 4.2 MB",
    documentType: "Audit Report",
    downloadUrl: "/reports",
  },
  {
    title: "Royal Charter of the Bhutan Health Trust Fund (Official Enactment)",
    referenceNumber: "ROYAL-CHARTER-2000",
    date: "August 2000",
    fileSize: "PDF, 1.8 MB",
    documentType: "Legal Charter",
    downloadUrl: "/reports",
  },
  {
    title: "National Essential Drugs List & Vaccine Cold-Chain Protocol",
    referenceNumber: "MOH-NEDL-REV8",
    date: "January 2026",
    fileSize: "PDF, 2.4 MB",
    documentType: "Formulary",
    downloadUrl: "/reports",
  },
];

const dzongkhagRegions = [
  {
    region: "Western Region",
    dzongkhags: [
      { name: "Thimphu", bhus: "14 BHUs", allocation: "Nu. 42.5M" },
      { name: "Paro", bhus: "12 BHUs", allocation: "Nu. 18.2M" },
      { name: "Haa", bhus: "7 BHUs", allocation: "Nu. 9.4M" },
      { name: "Chhukha", bhus: "16 BHUs", allocation: "Nu. 26.8M" },
      { name: "Samtse", bhus: "18 BHUs", allocation: "Nu. 22.1M" },
      { name: "Gasa", bhus: "5 BHUs", allocation: "Nu. 7.8M" },
    ],
  },
  {
    region: "Central Region",
    dzongkhags: [
      { name: "Punakha", bhus: "11 BHUs", allocation: "Nu. 12.8M" },
      { name: "Wangdue Phodrang", bhus: "15 BHUs", allocation: "Nu. 16.5M" },
      { name: "Trongsa", bhus: "8 BHUs", allocation: "Nu. 10.2M" },
      { name: "Bumthang", bhus: "9 BHUs", allocation: "Nu. 11.6M" },
      { name: "Dagana", bhus: "12 BHUs", allocation: "Nu. 13.4M" },
      { name: "Tsirang", bhus: "10 BHUs", allocation: "Nu. 11.9M" },
      { name: "Sarpang", bhus: "14 BHUs", allocation: "Nu. 21.4M" },
      { name: "Zhemgang", bhus: "14 BHUs", allocation: "Nu. 11.2M" },
    ],
  },
  {
    region: "Eastern Region",
    dzongkhags: [
      { name: "Mongar", bhus: "21 BHUs", allocation: "Nu. 24.5M" },
      { name: "Trashigang", bhus: "20 BHUs", allocation: "Nu. 25.8M" },
      { name: "Trashiyangtse", bhus: "9 BHUs", allocation: "Nu. 10.5M" },
      { name: "Lhuentse", bhus: "11 BHUs", allocation: "Nu. 9.8M" },
      { name: "Pema Gatshel", bhus: "13 BHUs", allocation: "Nu. 12.3M" },
      { name: "Samdrup Jongkhar", bhus: "14 BHUs", allocation: "Nu. 18.9M" },
    ],
  },
];

function RuledDzongkhagMatrix() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80 text-slate-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-800 uppercase block">
              Equitable Kingdom-Wide Distribution
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
              Nationwide Coverage Across All 20 Dzongkhags
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-sans font-light">
              Equitable primary healthcare commodity buffer maintained across all 205 remote gewogs and regional distribution centers.
            </p>
          </div>
          <Link
            to="/our-work"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-amber-800 hover:text-amber-900 shrink-0 hover:underline"
          >
            <span>View Detailed Commodity Allocations</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {dzongkhagRegions.map((reg) => (
            <div key={reg.region} className="border-t border-slate-300 pt-3 space-y-2">
              <div className="font-serif text-sm font-bold text-slate-900 uppercase tracking-wider pb-1 border-b border-slate-200">
                {reg.region}
              </div>
              <div className="divide-y divide-slate-100">
                {reg.dzongkhags.map((d) => (
                  <div key={d.name} className="py-2 flex items-baseline justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900">{d.name}</span>
                      <span className="text-slate-400 font-mono text-[10px] ml-1.5">({d.bhus})</span>
                    </div>
                    <span className="font-mono font-bold text-slate-700">{d.allocation}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-300 text-[11px] font-mono text-slate-500 gap-2">
          <div>All 20 Dzongkhags • 205 Primary Health Units • 100% Stockout Guarantee</div>
          <div>Source: Ministry of Health & BHTF Annual Dzongkhag Distribution Index, 2025–2026</div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const loaderData = Route.useLoaderData();
  const [liveMetrics, setLiveMetrics] = useState<ImpactMetric[]>(loaderData?.liveMetrics || []);
  const [settings, setSettings] = useState<Record<string, string>>(loaderData?.settings || {});
  const [liveNews, setLiveNews] = useState<NewsArticle[]>(loaderData?.liveNews || []);
  const [customSections, setCustomSections] = useState<PageBlockSection[] | null>(
    loaderData?.customSections || null,
  );

  useEffect(() => {
    getPublicPage({ data: { slug: "home" } })
      .then((page) => {
        if (page && page.status === "published") {
          try {
            const parsed = JSON.parse(page.sectionsJson);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setCustomSections(parsed);
            }
          } catch {}
        }
      })
      .catch(() => {});

    getPublicImpactMetrics()
      .then((res) => {
        if (res && res.length > 0) setLiveMetrics(res);
      })
      .catch(() => {});

    getPublicSettings()
      .then((res) => {
        if (res) setSettings(res);
      })
      .catch(() => {});

    getPublicNews()
      .then((res) => {
        if (res && res.length > 0) setLiveNews(res.slice(0, 3));
      })
      .catch(() => {});
  }, []);

  // Render custom CMS sections if published by admin
  const isCustomEdited = customSections && customSections.length > 0;
  if (isCustomEdited) {
    const hasHero = customSections[0]?.type === "hero";
    return (
      <div className={`flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900 min-h-screen ${hasHero ? "pt-0" : "pt-24 sm:pt-28"}`}>
        {settings["announcement_banner_enabled"] === "true" && settings["announcement_banner"] && !hasHero && (
          <div className="mx-auto max-w-7xl w-full px-4 mb-6">
            <div className="bg-[#EAF6F5] text-[#0B4F42] text-xs font-semibold py-2.5 px-5 rounded-2xl text-center border border-[#00A896]/30 flex items-center justify-center gap-2.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#D4A237]" />
              <span>{settings["announcement_banner"]}</span>
            </div>
          </div>
        )}
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      {/* 1. Sovereign Hero Section: Full 100dvh Unobstructed King Portrait + Scroll-Driven Translucent Card Elevation */}
      <HeroBlock />

            {/* 2. Statement of Royal Mandate (Layout 1) */}
      <StatementLayout
        proclamation="No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come."
        citation="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
        legalBasis="ROYAL CHARTER PROCLAMATION • 3 AUGUST 2000"
        theme="parchment"
      />

      {/* 3. Statutory Fiduciary & Operational Ledger (Layout 2) */}
      <RuledLedgerLayout
        title="Statutory Fiduciary & Operational Ledger"
        subtitle="Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship."
        sourceLine="Source: Royal Audit Authority (RAA) Certified Statements & BHTF Secretariat Annual Filing, FY 2024–2025"
        theme="parchment"
        rows={fiduciaryLedgerRows}
      />

      {/* 4. What the Fund Finances (Layout 3: Two-Column Narrative) */}
      <TwoColumnNarrativeLayout
        sectionTitle="Universal Vaccine & Primary Formulary Financing"
        referenceCode="Statutory Mandate & Allocation"
        paragraphs={[
          "Under the benevolent vision of His Majesty the Fourth Druk Gyalpo, the Bhutan Health Trust Fund was enacted to protect the nation's primary healthcare from the volatility of external donor funding. Operating as an autonomous statutory institution, the Fund finances 100% of routine pediatric vaccines and over 120 essential pharmaceuticals directly for every hospital and gewog clinic in the Kingdom.",
          "Procurement is conducted through WHO-prequalified international supply agreements and UNICEF supply divisions to eliminate intermediaries and guarantee verified cold chain potency. All annual purchases are funded entirely from endowment returns, ensuring the core capital corpus of Nu. 3.24B remains untouched in perpetuity.",
        ]}
        actionLink={{
          label: "Examine Financed Commodities & Formularies",
          to: "/our-work",
        }}
        theme="parchment"
      />

      {/* 5. Nationwide Coverage Across All 20 Dzongkhags (Ruled Regional Matrix) */}
      <RuledDzongkhagMatrix />

      {/* 6. Governance, Legal Structure & Statutory Triple-Lock (Layout 3: Forest Theme) */}
      <TwoColumnNarrativeLayout
        sectionTitle="Governance, Legal Structure & Statutory Triple-Lock"
        referenceCode="Charter Compliance & Oversight"
        paragraphs={[
          "BHTF operates under a strict Royal Charter mandate governed by a high-level Board of Trustees chaired by the Hon'ble Minister for Health. The Fund's fiduciary integrity is safeguarded by an institutional triple-lock: statutory capital ring-fencing prohibiting principal invasion, mandatory annual audits by the Royal Audit Authority (RAA), and independent oversight by the Asset Management and Technical Advisory Committees.",
          "Disbursements follow an uncompromising window financing mechanism. Annual procurement capital is released quarterly to the Department of Medical Services (DMS) via the Ministry of Finance only upon submission of physical inventory reconciliations and WHO/DRA batch compliance certificates.",
        ]}
        actionLink={{
          label: "Review Board of Trustees & Governance Structure",
          to: "/about/trustees",
        }}
        theme="forest"
      />

      {/* 7. Statutory Publications & Certified Audit Register (Layout 4) */}
      <DocumentRegisterLayout
        title="Statutory Publications & Certified Audit Register"
        subtitle="Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny."
        documents={recentAuditDocuments}
        viewAllLink={{
          label: "Browse Full Document & Audit Archive",
          to: "/reports",
        }}
        theme="parchment"
      />

      {/* 8. Sovereign Matching & Permanent DRC Tax Exemption (Layout 3) */}
      <TwoColumnNarrativeLayout
        sectionTitle="1:1 Sovereign Match & Permanent DRC Tax Exemption"
        referenceCode="DRC Income Tax Act Section 10(f) • Royal Decree"
        paragraphs={[
          "Under Royal Decree and Section 10(f) of the Department of Revenue & Customs (DRC) Income Tax Act of the Kingdom of Bhutan, all individual, philanthropic, and corporate contributions to the Bhutan Health Trust Fund are 100% tax-deductible.",
          "Furthermore, the Royal Government of Bhutan commits a permanent dollar-for-dollar (1:1) sovereign match to every citizen and institutional Ngultrum contributed, instantly doubling the enduring health financing capacity of every contribution.",
        ]}
        actionLink={{
          label: "Contribute to the Sovereign Health Endowment",
          to: "/get-involved",
        }}
        theme="parchment"
      />
    </div>
  );
}
