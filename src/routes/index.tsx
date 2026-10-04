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
import { SectionEditBadge } from "@/components/public/section-edit-badge";

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
import logoRgob from "@/assets/bhtf/partners/rgob.png";
import logoWho from "@/assets/bhtf/partners/who.jpg";
import logoUnicef from "@/assets/bhtf/partners/unicef.png";
import logoAdb from "@/assets/bhtf/partners/adb.jpg";
import logoGates from "@/assets/bhtf/partners/bill_gates_foundation.png";
import logoSaveChildren from "@/assets/bhtf/partners/save_the_children.png";
import logoSumitomo from "@/assets/bhtf/partners/sumitomo.png";
import logoAusAid from "@/assets/bhtf/partners/aus_aid.png";

import imgLhuntse from "@/assets/bhtf/field/lhuntse_clinic.jpg";
import imgHaa from "@/assets/bhtf/field/haa_hospital.jpg";
import imgVaccine from "@/assets/bhtf/field/vaccine_delivery.jpg";
import imgMedicines from "@/assets/bhtf/field/essential_medicines_stock.jpg";

import trusteeLyonpoTandin from "@/assets/bhtf/trustees/lyonpo_tandin_wangchuk.jpg";
import trusteeLopenTshering from "@/assets/bhtf/trustees/lopen_tshering_wangchuk.jpg";
import trusteeDrPhub from "@/assets/bhtf/trustees/dr_phub_tshering.jpg";
import trusteePemaTshering from "@/assets/bhtf/trustees/pema_tshering.jpg";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";

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
    figure: "Nu. 4,798,965,306.85",
    code: "CORPUS-AUDIT-2026",
    subtext: "Ring-fenced statutory capital invested under Royal Charter (~Nu. 4.8B as of 30 June 2026).",
  },
  {
    label: "Annual Commodity Procurement Yield Disbursement",
    figure: "Nu. 557,734,000",
    code: "DISB-FY24-25",
    subtext: "Disbursed quarterly for 438 essential drugs, 110 traditional remedies, and 4 routine vaccines.",
  },
  {
    label: "Citizens Protected Across 20 Dzongkhags",
    figure: "780,000+",
    code: "COVERAGE-MOH",
    subtext: "Universal healthcare guarantee delivered across all 205 remote gewog Primary Health Units.",
  },
  {
    label: "Essential Medicines & Traditional Formulations",
    figure: "438 Modern + 110 Traditional",
    code: "NEML-REV-V2",
    subtext: "100% of National Essential Drugs List and 65 core gSo-ba Rig-pa formulations.",
  },
  {
    label: "Routine National Immunization Antigens Financed",
    figure: "4 Key Antigens",
    code: "EPI-WHO-GAVI",
    subtext: "Pentavalent, PCV, HPV, and seasonal Influenza sustained in perpetuity.",
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

function PartnerLogosStrip() {
  const partners = [
    { name: "Royal Government of Bhutan", label: "Founding Sovereign", logo: logoRgob },
    { name: "World Health Organization", label: "Global Technical Partner", logo: logoWho },
    { name: "UNICEF", label: "Cold Chain & Vaccine Logistics", logo: logoUnicef },
    { name: "Asian Development Bank", label: "Development Partner", logo: logoAdb },
    { name: "Bill & Melinda Gates Foundation", label: "Philanthropic Grantor", logo: logoGates },
    { name: "Save the Children", label: "Maternal & Child Health", logo: logoSaveChildren },
    { name: "Sumitomo Mitsui Banking Corp", label: "Institutional Grantor", logo: logoSumitomo },
    { name: "Australian Aid", label: "Bilateral Partner", logo: logoAusAid },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200/80 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block">
            Multilateral & Sovereign Alliances
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Sovereign & Multilateral Founding Partners
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light max-w-2xl mx-auto">
            Established under Royal Charter in Geneva with initial endowment contributions from the Royal Government of Bhutan and international development partners.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-200 text-center min-h-[110px]"
            >
              <div className="h-12 w-full flex items-center justify-center mb-2 px-1">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-11 max-w-[90%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                />
              </div>
              <span className="text-[10px] font-bold text-slate-700 leading-tight line-clamp-1">
                {p.name}
              </span>
              <span className="text-[9px] font-mono text-slate-400 mt-0.5 line-clamp-1">
                {p.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FieldDispatchesGrid() {
  const dispatches = [
    {
      img: imgLhuntse,
      dzongkhag: "Eastern Dzongkhag",
      title: "Lhuentse Remote Gewog Primary Clinic",
      desc: "Guaranteed year-round buffer stock of 438 essential pharmaceuticals and routine vaccines maintained at 2,400m altitude.",
      code: "FIELD-OPS-LHUENTSE",
    },
    {
      img: imgHaa,
      dzongkhag: "Western Frontier",
      title: "Haa District Hospital Cold Chain Storage",
      desc: "Solar-backed continuous temperature monitoring safeguarding WHO-prequalified antigens through extreme winter freezes.",
      code: "FIELD-OPS-HAA",
    },
    {
      img: imgVaccine,
      dzongkhag: "Kingdom-Wide Fleet",
      title: "Universal Vaccine Cold-Chain Logistics",
      desc: "Direct quarterly shipments guaranteeing uninterrupted potency across 205 primary health units and gewog dispensaries.",
      code: "LOGISTICS-COLD-CHAIN",
    },
    {
      img: imgMedicines,
      dzongkhag: "Central Depot",
      title: "National Essential Drugs Warehouse",
      desc: "Mandatory 6-month national buffer shielding the Kingdom against international biopharmaceutical supply disruptions.",
      code: "CENTRAL-DEPOT-PHUENTSHOLING",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF8F3] border-b border-slate-200/80 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block">
              Field Operations & Verification
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Primary Health Units in Every Gewog
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light max-w-2xl">
              Photographic dispatches directly from public healthcare clinics and cold-chain hubs financed by the BHTF endowment.
            </p>
          </div>
          <Link
            to="/our-impact"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-800 hover:text-emerald-900 shrink-0 hover:underline"
          >
            <span>Explore Nationwide Logistics</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dispatches.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-amber-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {item.dzongkhag}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-base font-bold text-slate-900 leading-snug group-hover:text-emerald-800 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-0">
                <span className="text-[10px] font-mono text-slate-400 block border-t border-slate-100 pt-2">
                  {item.code}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WindowFinancingHighlightCard() {
  return (
    <section className="py-14 sm:py-18 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-950 via-[#07241C] to-slate-950 p-8 sm:p-12 border border-emerald-500/30 shadow-2xl text-white overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span>Quarterly Requisition Mechanism</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-black text-white tracking-tight">
                Window Financing Protocol for Primary Health Supplies
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed max-w-2xl">
                Statutory endowment earnings are released directly to the Department of Medical Services (DMS) via the Ministry of Finance across four quarterly disbursements (Q1–Q4). Every disbursement is conditioned upon verified physical inventory reconciliations and WHO batch certificates, shielding the Kingdom's primary healthcare from budget shocks.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                  <div className="font-mono text-base font-bold text-amber-300">Q1 Tranche</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Vaccine Procurement</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                  <div className="font-mono text-base font-bold text-amber-300">Q2 Tranche</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Essential Medicines</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                  <div className="font-mono text-base font-bold text-amber-300">Q3 Tranche</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Diagnostic Kits</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-center">
                  <div className="font-mono text-base font-bold text-amber-300">Q4 Tranche</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Cold-Chain Maintenance</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                to="/resources/window-financing"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all active:scale-95 text-center"
              >
                <span>Examine Window Financing Protocol</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/resources"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/20 transition-all text-center"
              >
                <FileText className="h-4 w-4 text-emerald-300" />
                <span>Download RAA Certified Audit Reports</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrusteesLeadershipShowcase() {
  const trustees = [
    {
      name: "Lyonpo Tandin Wangchuk",
      role: "Chairperson",
      title: "Hon'ble Minister for Health, RGOB",
      badge: "Cabinet Chair",
      photo: trusteeLyonpoTandin,
      duty: "Ministerial leadership, sovereign health financing & universal healthcare alignment (Cabinet Order C-3/4(4)/2024/35).",
    },
    {
      name: "Lopen Tshering Wangchuk",
      role: "Trustee (Monastic Representative)",
      title: "Secretary, Monastic Council Zhung Dratshang",
      badge: "Zhung Dratshang",
      photo: trusteeLopenTshering,
      duty: "Ethical fiduciary stewardship, compassionate healthcare & monastic community outreach.",
    },
    {
      name: "Ms. Ugyen Choden",
      role: "Trustee & AMC Chairperson",
      title: "Deputy Governor, Royal Monetary Authority (RMA)",
      badge: "AMC Chair / RMA",
      photo: trusteeUgyenChoden,
      duty: "Chairs the Asset Management Committee, overseeing capital preservation, asset allocation & liquidity.",
    },
    {
      name: "Mr. Chencho T. Namgay",
      role: "Trustee & Member AMC",
      title: "CEO, National Pension & Provident Fund (NPPF)",
      badge: "AMC Member / NPPF",
      photo: trusteeChenchoNamgay,
      duty: "Institutional fund management, portfolio risk controls & endowment growth strategies.",
    },
    {
      name: "Mr. Norbu Dendup",
      role: "Trustee & Member AMC",
      title: "Director, Department of Treasury & Accounts, MoF",
      badge: "AMC Member / MoF",
      photo: trusteeNorbuDendup,
      duty: "Public financial management, 1:1 RGOB matching fund releases & treasury coordination.",
    },
    {
      name: "Mr. Pema Tshering",
      role: "Trustee (Independent Director)",
      title: "Former CEO, T Bank Ltd. (Financial Sector Specialist)",
      badge: "Financial Specialist",
      photo: trusteePemaTshering,
      duty: "Independent fiduciary oversight, commercial banking expertise & governance audit.",
    },
    {
      name: "Dr. Phub Tshering",
      role: "Trustee (Clinical Specialist)",
      title: "Medical Director, JDWNRH",
      badge: "Clinical Specialist",
      photo: trusteeDrPhub,
      duty: "Therapeutic efficacy reviews, National Essential Drugs List & referral hospital alignment.",
    },
    {
      name: "Dr. Gyambo Sithey, PhD",
      role: "Director",
      title: "BHTF Secretariat",
      badge: "Director",
      photo: trusteeDrGyambo,
      duty: "Executive administration, board resolutions execution & nationwide procurement disbursements.",
    },
  ];

  return (
    <section id="trustees-showcase" className="py-16 sm:py-20 bg-white border-b border-slate-200/80 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-800 uppercase block">
              Sovereign Fiduciary Governance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              High-Level Board of Trustees
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light max-w-2xl">
              Distinguished ministerial leadership, fiscal specialists, and monastic trustees safeguarding universal health security under Royal Charter mandate.
            </p>
          </div>
          <Link
            to="/about/trustees"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-emerald-800 hover:text-emerald-900 shrink-0 hover:underline"
          >
            <span>View All 8 Statutory Trustees & Governance Terms</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustees.map((t) => (
            <div
              key={t.name}
              className="bg-[#FAF8F3] rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-400 hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-emerald-600/40 shadow-md shrink-0 bg-slate-100 ring-2 ring-emerald-50">
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 ${
                    t.badge === "Chairperson"
                      ? "bg-amber-100 text-amber-900 border-amber-300"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}>
                    {t.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                    {t.name}
                  </h3>
                  <div className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                    {t.role}
                  </div>
                  {t.title && (
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5 leading-tight">
                      {t.title}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-200/70 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" />
                  <span>Statutory Fiduciary</span>
                </span>
                <Link
                  to="/about/trustees"
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Profile →
                </Link>
              </div>
            </div>
          ))}
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
        {/* Custom Page Renderer */}
        <PageRenderer sections={customSections} interactive={false} pageSlug="home" />

        {/* Founding Partners Strip */}
        <div className="relative" data-bhtf-section="partners-strip">
          <SectionEditBadge
            label="Founding Partners"
            pageSlug="home"
            sectionId="partners-strip"
            studioHref="/admin/page-editor?slug=home"
          />
          <PartnerLogosStrip />
        </div>

        {/* Rich Institutional Content Sections Enriched on Homepage */}
        <div className="relative" data-bhtf-section="fiduciary-ledger">
          <SectionEditBadge
            label="Fiduciary Ledger"
            pageSlug="home"
            sectionId="fiduciary-ledger"
            studioHref="/admin/metrics"
            initialData={{
              title: "Statutory Fiduciary & Operational Ledger",
              subtitle: "Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship.",
              badge: "Audit Certified",
            }}
          />
          <RuledLedgerLayout
            title="Statutory Fiduciary & Operational Ledger"
            subtitle="Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship."
            sourceLine="Source: Royal Audit Authority (RAA) Certified Statements & BHTF Secretariat Annual Filing, FY 2024–2025"
            theme="parchment"
            rows={fiduciaryLedgerRows}
          />
        </div>

        <div className="relative" data-bhtf-section="commodities-formulary">
          <SectionEditBadge
            label="Vaccines & Commodities"
            pageSlug="home"
            sectionId="commodities-formulary"
            studioHref="/admin/programs"
            initialData={{
              title: "Universal Vaccine & Primary Formulary Financing",
              subtitle: "438 Modern + 110 Traditional Medicines Financed in Perpetuity",
              badge: "Statutory Allocation",
            }}
          />
          <TwoColumnNarrativeLayout
            sectionTitle="Universal Vaccine & Primary Formulary Financing"
            referenceCode="Statutory Mandate & Allocation"
            paragraphs={[
              "Under the benevolent vision of His Majesty the Fourth Druk Gyalpo, the Bhutan Health Trust Fund was enacted to protect the nation's primary healthcare from the volatility of external donor funding. Operating as an autonomous statutory institution, the Fund finances 100% of routine pediatric vaccines, 438 essential modern medicines, and 110 traditional formulations (gSo-ba Rig-pa) directly for every hospital and gewog clinic in the Kingdom.",
              "Procurement is conducted through WHO-prequalified international supply agreements and UNICEF supply divisions to eliminate intermediaries and guarantee verified cold chain potency. All annual purchases are funded entirely from endowment returns, ensuring the core capital corpus of Nu. 4.8B remains untouched in perpetuity.",
            ]}
            actionLink={{
              label: "Examine Financed Commodities & Formularies",
              to: "/our-impact",
            }}
            theme="parchment"
          />
        </div>

        {/* Field Operations & Cold Chain Dispatches */}
        <div className="relative" data-bhtf-section="field-dispatches">
          <SectionEditBadge
            label="Field Dispatches"
            pageSlug="home"
            sectionId="field-dispatches"
            studioHref="/admin/gallery"
            initialData={{
              title: "Primary Health Units in Every Gewog",
              subtitle: "Photographic dispatches directly from public healthcare clinics and cold-chain hubs.",
              badge: "Field Operations",
            }}
          />
          <FieldDispatchesGrid />
        </div>

        <div className="relative" data-bhtf-section="dzongkhag-coverage">
          <SectionEditBadge
            label="20 Dzongkhags Allocation"
            pageSlug="home"
            sectionId="dzongkhag-coverage"
            studioHref="/admin/metrics"
            initialData={{
              title: "Nationwide Coverage Across All 20 Dzongkhags",
              subtitle: "Equitable primary healthcare commodity buffer maintained across all 205 remote gewogs.",
              badge: "Kingdom-Wide Distribution",
            }}
          />
          <RuledDzongkhagMatrix />
        </div>

        {/* Window Financing Highlight Showcase */}
        <div className="relative" data-bhtf-section="window-financing">
          <SectionEditBadge
            label="Window Financing Protocol"
            pageSlug="home"
            sectionId="window-financing"
            studioHref="/admin/page-editor?slug=window-financing"
            initialData={{
              title: "Autonomous Sovereign Window Financing Protocol",
              subtitle: "Quarterly capital releases backed by inventory reconciliations and WHO/DRA compliance.",
              badge: "Statutory Mechanism",
              primaryCtaText: "Review Operational Protocol",
              primaryCtaUrl: "/resources/window-financing",
            }}
          />
          <WindowFinancingHighlightCard />
        </div>

        <div className="relative" data-bhtf-section="governance-triple-lock">
          <SectionEditBadge
            label="Governance & Triple-Lock"
            pageSlug="home"
            sectionId="governance-triple-lock"
            studioHref="/admin/policies"
            initialData={{
              title: "Governance, Legal Structure & Statutory Triple-Lock",
              subtitle: "Royal Charter mandate safeguarded by capital ring-fencing, RAA audits & committee oversight.",
              badge: "Triple-Lock Guarantee",
            }}
          />
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
        </div>

        {/* High-Level Board of Trustees Showcase with Authentic Portraits */}
        <div className="relative" data-bhtf-section="trustees-roster">
          <SectionEditBadge
            label="Board of Trustees"
            pageSlug="home"
            sectionId="trustees-roster"
            studioHref="/admin/trustees"
            initialData={{
              title: "High-Level Board of Trustees",
              subtitle: "Distinguished ministerial leadership, fiscal specialists, and monastic trustees safeguarding universal health security.",
              badge: "Board Leadership",
            }}
          />
          <TrusteesLeadershipShowcase />
        </div>

        <div className="relative" data-bhtf-section="audit-publications">
          <SectionEditBadge
            label="Audit Register & Publications"
            pageSlug="home"
            sectionId="audit-publications"
            studioHref="/admin/reports"
            initialData={{
              title: "Statutory Publications & Certified Audit Register",
              subtitle: "Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny.",
              badge: "Official Filings",
            }}
          />
          <DocumentRegisterLayout
            title="Statutory Publications & Certified Audit Register"
            subtitle="Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny."
            documents={recentAuditDocuments}
            viewAllLink={{
              label: "Browse Full Document & Audit Archive",
              to: "/resources",
            }}
            theme="parchment"
          />
        </div>

        <div className="relative" data-bhtf-section="tax-matching">
          <SectionEditBadge
            label="1:1 Match & DRC Tax Relief"
            pageSlug="home"
            sectionId="tax-matching"
            studioHref="/admin/donations"
            initialData={{
              title: "1:1 Sovereign Match & Permanent DRC Tax Exemption",
              subtitle: "Section 10(f) Income Tax Act • 100% Tax Deductible with Dollar-for-Dollar Sovereign Match",
              badge: "Royal Decree & Fiscal Law",
              primaryCtaText: "Contribute to Corpus (1:1 Matched)",
              primaryCtaUrl: "/donate",
            }}
          />
          <TwoColumnNarrativeLayout
            sectionTitle="1:1 Sovereign Match & Permanent DRC Tax Exemption"
            referenceCode="DRC Income Tax Act Section 10(f) • Royal Decree"
            paragraphs={[
              "Under Royal Decree and Section 10(f) of the Department of Revenue & Customs (DRC) Income Tax Act of the Kingdom of Bhutan, all individual, philanthropic, and corporate contributions to the Bhutan Health Trust Fund are 100% tax-deductible.",
              "Furthermore, the Royal Government of Bhutan commits a permanent dollar-for-dollar (1:1) sovereign match to every citizen and institutional Ngultrum contributed, instantly doubling the enduring health financing capacity of every contribution.",
            ]}
            actionLink={{
              label: "Contribute to the Sovereign Health Endowment (1:1 Matched)",
              to: "/donate",
            }}
            theme="parchment"
          />
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 selection:bg-amber-200 selection:text-slate-900">
      {/* 1. Sovereign Hero Section: Full 100dvh Unobstructed King Portrait + Scroll-Driven Translucent Card Elevation */}
      <div className="relative" data-bhtf-section="home-hero">
        <SectionEditBadge
          label="Hero Banner"
          pageSlug="home"
          sectionId="home-hero"
          studioHref="/admin/page-editor?slug=home"
          initialData={{
            title: "Healthy People. Stronger Bhutan.",
            subtitle: "Sovereign healthcare financing guaranteeing uninterrupted essential medicines and universal vaccines for every citizen across all 20 Dzongkhags.",
            badge: "Royal Charter Statutory Trust Fund",
            primaryCtaText: "Contribute to Corpus (1:1 Matched)",
            primaryCtaUrl: "/donate",
            secondaryCtaText: "Explore Commodities Formulary",
            secondaryCtaUrl: "/our-impact",
            backgroundImage: settings["hero_background_image"],
          }}
        />
        <HeroBlock section={{ id: "hero-main", type: "hero", backgroundImage: settings["hero_background_image"] }} />
      </div>

      {/* 2. Statement of Royal Mandate (Layout 1) */}
      <div className="relative" data-bhtf-section="royal-mandate">
        <SectionEditBadge
          label="Royal Mandate Proclamation"
          pageSlug="home"
          sectionId="royal-mandate"
          studioHref="/admin/page-editor?slug=home"
          initialData={{
            title: "The Royal Mandate of Sustainable Healthcare",
            content: "No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come.",
            badge: "Royal Charter Proclamation",
            subtitle: "His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck",
          }}
        />
        <StatementLayout
          proclamation="No citizen of Bhutan should ever suffer or be deprived of life-saving medical care due to lack of essential drugs or vaccines. The Bhutan Health Trust Fund stands as a sacred trust of self-reliance for generations to come."
          citation="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
          legalBasis="ROYAL CHARTER PROCLAMATION • 3 AUGUST 2000"
          theme="parchment"
        />
      </div>

      {/* Sovereign Founding & Multilateral Partners Strip */}
      <div className="relative" data-bhtf-section="partners-strip">
        <SectionEditBadge
          label="Founding Partners"
          pageSlug="home"
          sectionId="partners-strip"
          studioHref="/admin/page-editor?slug=home"
        />
        <PartnerLogosStrip />
      </div>

      {/* 3. Statutory Fiduciary & Operational Ledger (Layout 2) */}
      <div className="relative" data-bhtf-section="fiduciary-ledger">
        <SectionEditBadge
          label="Fiduciary Ledger"
          pageSlug="home"
          sectionId="fiduciary-ledger"
          studioHref="/admin/metrics"
          initialData={{
            title: "Statutory Fiduciary & Operational Ledger",
            subtitle: "Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship.",
            badge: "Audit Certified",
          }}
        />
        <RuledLedgerLayout
          title="Statutory Fiduciary & Operational Ledger"
          subtitle="Key financial benchmarks and nationwide commodity commitments under permanent trust stewardship."
          sourceLine="Source: Royal Audit Authority (RAA) Certified Statements & BHTF Secretariat Annual Filing, FY 2024–2025"
          theme="parchment"
          rows={fiduciaryLedgerRows}
        />
      </div>

      {/* 4. What the Fund Finances (Layout 3: Two-Column Narrative) */}
      <div className="relative" data-bhtf-section="commodities-formulary">
        <SectionEditBadge
          label="Vaccines & Commodities"
          pageSlug="home"
          sectionId="commodities-formulary"
          studioHref="/admin/programs"
          initialData={{
            title: "Universal Vaccine & Primary Formulary Financing",
            subtitle: "438 Modern + 110 Traditional Medicines Financed in Perpetuity",
            badge: "Statutory Allocation",
          }}
        />
        <TwoColumnNarrativeLayout
          sectionTitle="Universal Vaccine & Primary Formulary Financing"
          referenceCode="Statutory Mandate & Allocation"
          paragraphs={[
            "Under the benevolent vision of His Majesty the Fourth Druk Gyalpo, the Bhutan Health Trust Fund was enacted to protect the nation's primary healthcare from the volatility of external donor funding. Operating as an autonomous statutory institution, the Fund finances 100% of routine pediatric vaccines, 438 essential modern medicines, and 110 traditional formulations (gSo-ba Rig-pa) directly for every hospital and gewog clinic in the Kingdom.",
            "Procurement is conducted through WHO-prequalified international supply agreements and UNICEF supply divisions to eliminate intermediaries and guarantee verified cold chain potency. All annual purchases are funded entirely from endowment returns, ensuring the core capital corpus of Nu. 4.8B remains untouched in perpetuity.",
          ]}
          actionLink={{
            label: "Examine Financed Commodities & Formularies",
            to: "/our-impact",
          }}
          theme="parchment"
        />
      </div>

      {/* Field Operations & Cold Chain Dispatches */}
      <div className="relative" data-bhtf-section="field-dispatches">
        <SectionEditBadge
          label="Field Dispatches"
          pageSlug="home"
          sectionId="field-dispatches"
          studioHref="/admin/gallery"
          initialData={{
            title: "Primary Health Units in Every Gewog",
            subtitle: "Photographic dispatches directly from public healthcare clinics and cold-chain hubs.",
            badge: "Field Operations",
          }}
        />
        <FieldDispatchesGrid />
      </div>

      {/* 5. Nationwide Coverage Across All 20 Dzongkhags (Ruled Regional Matrix) */}
      <div className="relative" data-bhtf-section="dzongkhag-coverage">
        <SectionEditBadge
          label="20 Dzongkhags Allocation"
          pageSlug="home"
          sectionId="dzongkhag-coverage"
          studioHref="/admin/metrics"
          initialData={{
            title: "Nationwide Coverage Across All 20 Dzongkhags",
            subtitle: "Equitable primary healthcare commodity buffer maintained across all 205 remote gewogs.",
            badge: "Kingdom-Wide Distribution",
          }}
        />
        <RuledDzongkhagMatrix />
      </div>

      {/* Window Financing Highlight Showcase */}
      <div className="relative" data-bhtf-section="window-financing">
        <SectionEditBadge
          label="Window Financing Protocol"
          pageSlug="home"
          sectionId="window-financing"
          studioHref="/admin/page-editor?slug=window-financing"
          initialData={{
            title: "Autonomous Sovereign Window Financing Protocol",
            subtitle: "Quarterly capital releases backed by inventory reconciliations and WHO/DRA compliance.",
            badge: "Statutory Mechanism",
            primaryCtaText: "Review Operational Protocol",
            primaryCtaUrl: "/resources/window-financing",
          }}
        />
        <WindowFinancingHighlightCard />
      </div>

      {/* 6. Governance, Legal Structure & Statutory Triple-Lock (Layout 3: Forest Theme) */}
      <div className="relative" data-bhtf-section="governance-triple-lock">
        <SectionEditBadge
          label="Governance & Triple-Lock"
          pageSlug="home"
          sectionId="governance-triple-lock"
          studioHref="/admin/policies"
          initialData={{
            title: "Governance, Legal Structure & Statutory Triple-Lock",
            subtitle: "Royal Charter mandate safeguarded by capital ring-fencing, RAA audits & committee oversight.",
            badge: "Triple-Lock Guarantee",
          }}
        />
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
      </div>

      {/* High-Level Board of Trustees Showcase with Authentic Portraits */}
      <div className="relative" data-bhtf-section="trustees-roster">
        <SectionEditBadge
          label="Board of Trustees"
          pageSlug="home"
          sectionId="trustees-roster"
          studioHref="/admin/trustees"
          initialData={{
            title: "High-Level Board of Trustees",
            subtitle: "Distinguished ministerial leadership, fiscal specialists, and monastic trustees safeguarding universal health security.",
            badge: "Board Leadership",
          }}
        />
        <TrusteesLeadershipShowcase />
      </div>

      {/* 7. Statutory Publications & Certified Audit Register (Layout 4) */}
      <div className="relative" data-bhtf-section="audit-publications">
        <SectionEditBadge
          label="Audit Register & Publications"
          pageSlug="home"
          sectionId="audit-publications"
          studioHref="/admin/reports"
          initialData={{
            title: "Statutory Publications & Certified Audit Register",
            subtitle: "Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny.",
            badge: "Official Filings",
          }}
        />
        <DocumentRegisterLayout
          title="Statutory Publications & Certified Audit Register"
          subtitle="Unedited official filings, audited accounts, and statutory governance instruments available for public scrutiny."
          documents={recentAuditDocuments}
          viewAllLink={{
            label: "Browse Full Document & Audit Archive",
            to: "/resources",
          }}
          theme="parchment"
        />
      </div>

      {/* 8. Sovereign Matching & Permanent DRC Tax Exemption (Layout 3) */}
      <div className="relative" data-bhtf-section="tax-matching">
        <SectionEditBadge
          label="1:1 Match & DRC Tax Relief"
          pageSlug="home"
          sectionId="tax-matching"
          studioHref="/admin/donations"
          initialData={{
            title: "1:1 Sovereign Match & Permanent DRC Tax Exemption",
            subtitle: "Section 10(f) Income Tax Act • 100% Tax Deductible with Dollar-for-Dollar Sovereign Match",
            badge: "Royal Decree & Fiscal Law",
            primaryCtaText: "Contribute to Corpus (1:1 Matched)",
            primaryCtaUrl: "/donate",
          }}
        />
        <TwoColumnNarrativeLayout
          sectionTitle="1:1 Sovereign Match & Permanent DRC Tax Exemption"
          referenceCode="DRC Income Tax Act Section 10(f) • Royal Decree"
          paragraphs={[
            "Under Royal Decree and Section 10(f) of the Department of Revenue & Customs (DRC) Income Tax Act of the Kingdom of Bhutan, all individual, philanthropic, and corporate contributions to the Bhutan Health Trust Fund are 100% tax-deductible.",
            "Furthermore, the Royal Government of Bhutan commits a permanent dollar-for-dollar (1:1) sovereign match to every citizen and institutional Ngultrum contributed, instantly doubling the enduring health financing capacity of every contribution.",
          ]}
          actionLink={{
            label: "Contribute to the Sovereign Health Endowment (1:1 Matched)",
            to: "/donate",
          }}
          theme="parchment"
        />
      </div>
    </div>
  );
}
