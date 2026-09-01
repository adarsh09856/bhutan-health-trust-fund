import { useState } from "react";
import {
  Syringe,
  Pill,
  ThermometerSnowflake,
  Microscope,
  HeartPulse,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface CommodityCategory {
  id: string;
  name: string;
  dzongkha: string;
  icon: any;
  themeColor: {
    badge: string;
    iconBg: string;
    activeBorder: string;
    accentText: string;
  };
  annualBudgetNu: string;
  reach: string;
  leadTime: string;
  qualityStandard: string;
  description: string;
  keyItems: string[];
  logisticsFlow: string[];
}

const commodityCategories: CommodityCategory[] = [
  {
    id: "vaccines",
    name: "Universal Vaccines",
    dzongkha: "སྔོན་ཁབ་འཐོབ་ཐངས",
    icon: Syringe,
    themeColor: {
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      iconBg: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-blue-500/30",
      activeBorder: "border-blue-600 ring-blue-500/20 bg-blue-50/60",
      accentText: "text-blue-700",
    },
    annualBudgetNu: "Nu. 68.5M / Year",
    reach: "100% of infants & mothers",
    leadTime: "3 Months (UNICEF Pooled)",
    qualityStandard: "WHO Prequalified & DRA Certified",
    description:
      "Full financing for routine childhood immunizations (Pentavalent, MMR, BCG, HPV, Rotavirus, Polio) protecting every newborn across all 20 Dzongkhags.",
    keyItems: [
      "Pentavalent & Hexavalent Pediatric Vaccines",
      "Measles, Mumps & Rubella (MMR)",
      "Human Papillomavirus (HPV) for adolescents",
      "Tetanus-Diphtheria (Td) for expectant mothers",
      "Seasonal Influenza for vulnerable elderly",
    ],
    logisticsFlow: [
      "Global Pooled Procurement (UNICEF Supply Division)",
      "Cold-Chain Air Freight into Paro International Airport",
      "Central Cold Store Inspection in Thimphu",
      "Regional Hubs (Gelephu & Mongar)",
      "Solar-Powered BHU Refrigerators across 205 Gewogs",
    ],
  },
  {
    id: "medicines",
    name: "120+ Essential Medicines",
    dzongkha: "མཁོ་ཆེའི་སྨན་རིགས",
    icon: Pill,
    themeColor: {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      iconBg: "bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-500/30",
      activeBorder: "border-emerald-600 ring-emerald-500/20 bg-emerald-50/60",
      accentText: "text-emerald-700",
    },
    annualBudgetNu: "Nu. 145.0M / Year",
    reach: "780,000+ Citizens",
    leadTime: "Quarterly Scheduled",
    qualityStandard: "National Essential Drugs List (NEDL)",
    description:
      "Uninterrupted procurement of vital primary healthcare medications including broad-spectrum antibiotics, cardiovascular regulators, antidiabetics, and analgesics.",
    keyItems: [
      "Broad-Spectrum Antibiotics (Amoxicillin, Ceftriaxone)",
      "Cardiovascular & Antihypertensives (Amlodipine, Enalapril)",
      "Oral & Injectable Antidiabetics (Metformin, Gliclazide)",
      "Emergency Life-Support & Resuscitation Ampoules",
      "Mental Health & Psychotropic Essential Formulations",
    ],
    logisticsFlow: [
      "Competitive Bidding via Department of Medical Supplies",
      "Quality Sampling & Assay Testing at Border Entry (Phuntsholing)",
      "Warehouse Batch Quarantine & Inventory Cataloging",
      "District Health Logistics Fleet Transit",
      "6-Month Buffer Maintained at All Dzongkhag Hospitals",
    ],
  },
  {
    id: "cold-chain",
    name: "High-Altitude Cold Chain",
    dzongkha: "བསིལ་མཛོད་རྒྱུན་སྐྱོང",
    icon: ThermometerSnowflake,
    themeColor: {
      badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
      iconBg: "bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-cyan-500/30",
      activeBorder: "border-cyan-600 ring-cyan-500/20 bg-cyan-50/60",
      accentText: "text-cyan-700",
    },
    annualBudgetNu: "Nu. 24.2M / Year",
    reach: "20 Dzongkhags (Including Lunana & Laya)",
    leadTime: "Perpetual 24/7 Monitoring",
    qualityStandard: "WHO Category E003/007 Compliant",
    description:
      "Maintenance and continuous upgrading of remote solar direct-drive vaccine refrigerators and IoT temperature loggers operating in sub-zero Himalayan altitudes.",
    keyItems: [
      "Solar Direct-Drive (SDD) Vaccine Freezers",
      "Long-Range Mountain Carrier Vaccine Flasks",
      "Digital Temperature Data Loggers (IoT Connected)",
      "Emergency Backup Power Inverters & Lithium Banks",
      "High-Altitude Vehicle Refrigerated Containers",
    ],
    logisticsFlow: [
      "Remote Solar Inverters & Sensor Upgrades",
      "Real-time Telemetry Monitored by BHTF Secretariat",
      "Bi-annual Field Maintenance by Biomedical Engineers",
      "Helicopter Emergency Vaccine Replacement Protocol",
    ],
  },
  {
    id: "diagnostics",
    name: "Laboratory Reagents",
    dzongkha: "བརྟག་དཔྱད་སྨན་རྫས",
    icon: Microscope,
    themeColor: {
      badge: "bg-purple-50 text-purple-700 border-purple-200",
      iconBg: "bg-gradient-to-br from-purple-600 to-indigo-700 text-white shadow-purple-500/30",
      activeBorder: "border-purple-600 ring-purple-500/20 bg-purple-50/60",
      accentText: "text-purple-700",
    },
    annualBudgetNu: "Nu. 38.0M / Year",
    reach: "186 Primary Laboratories",
    leadTime: "Biannual Reagent Batches",
    qualityStandard: "ISO 15189 / ISO 13485 Standards",
    description:
      "Diagnostic test kits and biochemical reagents enabling instant bedside disease detection and blood chemistry analysis at the primary health unit level.",
    keyItems: [
      "Rapid Diagnostic Tests for Dengue, Malaria & Influenza",
      "Automated Blood Analyzer Reagent Packs",
      "Point-of-Care HbA1c & Blood Glucose Test Strips",
      "Urine Chemistry Multistix & Microscopy Stains",
      "Cervical Screening & HPV DNA Testing Supplies",
    ],
    logisticsFlow: [
      "Temperature-Sensitive Reagent Freight Logistics",
      "Laboratory Lot Quality Assurance Testing",
      "Direct Distribution to Gewog Primary Laboratories",
    ],
  },
  {
    id: "maternal",
    name: "Safe Motherhood Kits",
    dzongkha: "ཨམ་སྲུའི་འཕྲོད་བསྟེན",
    icon: HeartPulse,
    themeColor: {
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      iconBg: "bg-gradient-to-br from-rose-600 to-pink-700 text-white shadow-rose-500/30",
      activeBorder: "border-rose-600 ring-rose-500/20 bg-rose-50/60",
      accentText: "text-rose-700",
    },
    annualBudgetNu: "Nu. 18.5M / Year",
    reach: "100% of Expectant Mothers",
    leadTime: "Continuous Supply",
    qualityStandard: "UNFPA / WHO Maternal Guidelines",
    description:
      "Sterile disposable delivery packs, oxytocin, neonatal resuscitation equipment, and iron-folic acid supplementation for remote deliveries.",
    keyItems: [
      "Clean Delivery Delivery Kits (Sterile Blades, Cord Ties)",
      "Postpartum Hemorrhage Control (Oxytocin, Misoprostol)",
      "Neonatal Bag-Valve-Mask Resuscitators",
      "Antenatal Micronutrient & Iron-Folic Acid Buffers",
      "Kangaroo Mother Care Thermal Wraps",
    ],
    logisticsFlow: [
      "Pre-packed Sterile Kit Assembly in Thimphu",
      "Pre-monsoon Prepositioning in Remote BHUs",
      "Continuous Delivery Buffer Maintained by Gewog Nurses",
    ],
  },
  {
    id: "blood-safety",
    name: "Blood Safety Reagents",
    dzongkha: "ཁྲག་གི་ཉེན་སྲུང་",
    icon: Droplets,
    themeColor: {
      badge: "bg-red-50 text-red-700 border-red-200",
      iconBg: "bg-gradient-to-br from-red-600 to-rose-800 text-white shadow-red-500/30",
      activeBorder: "border-red-600 ring-red-500/20 bg-red-50/60",
      accentText: "text-red-700",
    },
    annualBudgetNu: "Nu. 14.8M / Year",
    reach: "All Regional Blood Banks",
    leadTime: "Monthly Regulated",
    qualityStandard: "WHO Safe Blood Directive",
    description:
      "Fourth-generation ELISA and Nucleic Acid Testing (NAT) reagents ensuring 100% safe, infection-free blood transfusions in hospital surgical units.",
    keyItems: [
      "HIV, Hepatitis B & C, Syphilis Screening Assays",
      "Sterile Triple-Blood Collection Bags",
      "Gel Card Blood Grouping & Cross-Matching Kits",
      "Component Separation Centrifuge Reagents",
      "Platelet Agitator Consumables",
    ],
    logisticsFlow: [
      "Direct Supply to National & Regional Blood Transfusion Centers",
      "Batch Traceability Logs Maintained with BCAA & MoH",
    ],
  },
];

export function CommodityTracker() {
  const [activeTab, setActiveTab] = useState<CommodityCategory>(commodityCategories[0]);

  return (
    <div className="relative overflow-hidden bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8">
      {/* Decorative Ambient Background */}
      <div className="absolute top-0 right-0 h-80 w-80 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-extrabold mb-2">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Perpetual Healthcare Commodities Pipeline</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            6 Core Health Streams Financed by BHTF
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Click any commodity stream to explore budget allocations, quality assurance, and distribution logistics.
          </p>
        </div>
      </div>

      {/* 6 Colorful Tab Switchers */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {commodityCategories.map((c) => {
          const isSelected = activeTab.id === c.id;
          const Icon = c.icon;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveTab(c)}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                isSelected
                  ? `${c.themeColor.activeBorder} shadow-md ring-2 scale-[1.02]`
                  : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-9 w-9 rounded-xl grid place-items-center shadow-md ${c.themeColor.iconBg}`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-black text-emerald-800 tracking-wider">{c.dzongkha}</span>
              </div>

              <div className="mt-3">
                <div className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">{c.name}</div>
                <span className="text-[10px] text-slate-500 font-bold block mt-0.5">
                  {c.annualBudgetNu.split(" / ")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Commodity Deep-Dive Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-gradient-to-br from-slate-50 via-white to-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
        {/* Left Column: Description & Specifications (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-extrabold uppercase tracking-wide px-3 py-0.5 rounded-full border ${activeTab.themeColor.badge}`}>
                {activeTab.dzongkha} • Fiduciary Health Stream
              </span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-slate-900">{activeTab.name}</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeTab.description}
            </p>
          </div>

          {/* Quick Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 font-medium block">Annual Spend:</span>
              <span className="font-black text-slate-900 block text-xs sm:text-sm font-mono">
                {activeTab.annualBudgetNu}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-slate-400 font-medium block">Coverage Reach:</span>
              <span className="font-extrabold text-emerald-700 block text-xs sm:text-sm">
                {activeTab.reach}
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 col-span-2 sm:col-span-1">
              <span className="text-slate-400 font-medium block">Quality Protocol:</span>
              <span className="font-bold text-slate-800 block text-[11px] truncate">
                {activeTab.qualityStandard}
              </span>
            </div>
          </div>

          {/* Key Commodity Formulations */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Core Financed Formulations & Supplies:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeTab.keyItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200 text-slate-800 shadow-xs font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Supply Chain & Distribution Stages (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b pb-3.5">
            <Building2 className="h-4 w-4 text-emerald-600" />
            <span>Procurement & Supply Pipeline</span>
          </h5>

          <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:to-teal-500">
            {activeTab.logisticsFlow.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3 pl-1 text-xs">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-slate-900 to-slate-800 text-amber-400 font-black text-[10px] grid place-items-center shrink-0 z-10 shadow-xs">
                  {idx + 1}
                </div>
                <div className="pt-0.5 font-bold text-slate-700 leading-snug">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
