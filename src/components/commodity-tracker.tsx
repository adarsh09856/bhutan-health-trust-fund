import { useState } from "react";
import {
  Syringe,
  Pill,
  ThermometerSnowflake,
  Microscope,
  HeartPulse,
  Droplets,
  CheckCircle2,
  Building2,
  Sparkles,
} from "lucide-react";

interface CommodityCategory {
  id: string;
  name: string;
  dzongkha: string;
  icon: any;
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
    annualBudgetNu: "Nu. 68.5M / Year",
    reach: "100% of infants & mothers",
    leadTime: "3 Months (UNICEF Pooled)",
    qualityStandard: "WHO Prequalified & DRA Certified",
    description:
      "Full financing for routine childhood immunizations (Pentavalent, MMR, BCG, HPV, Rotavirus, Polio) protecting every newborn across all 20 Dzongkhags in perpetuity.",
    keyItems: [
      "Pentavalent & Hexavalent Pediatric Vaccines",
      "Measles, Mumps & Rubella (MMR)",
      "Human Papillomavirus (HPV) for adolescents",
      "Tetanus-Diphtheria (Td) for expectant mothers",
      "Seasonal Influenza for vulnerable elderly",
    ],
    logisticsFlow: [
      "Global Pooled Procurement via UNICEF Supply Division",
      "Cold-Chain Air Freight into Paro International Airport",
      "Central Cold Store Inspection in Thimphu",
      "Regional Distribution Hubs (Gelephu & Mongar)",
      "Solar-Powered BHU Refrigerators across 205 Gewogs",
    ],
  },
  {
    id: "medicines",
    name: "120+ Essential Medicines",
    dzongkha: "མཁོ་ཆེའི་སྨན་རིགས",
    icon: Pill,
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
      "Quality Sampling & Assay Testing at Phuntsholing Border Entry",
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
    annualBudgetNu: "Nu. 12.0M / Year",
    reach: "All Regional Transfusion Centers",
    leadTime: "Continuous Supply Lines",
    qualityStandard: "WHO Blood Transfusion Safety Mandate",
    description:
      "Serological screening reagents and apheresis sets guaranteeing 100% infection-free blood transfusions across Bhutanese hospitals.",
    keyItems: [
      "ELISA & Chemiluminescent Screening Kits (HIV, Hep B/C, Syphilis)",
      "Blood Grouping & Cross-Matching Reagents",
      "Sterile Quadruple Blood Collection Bag Systems",
      "Cryoprecipitate & Platelet Separation Reagents",
    ],
    logisticsFlow: [
      "Central Blood Bank Cold-Storage Reception",
      "Batch Quality Control & Nucleic Acid Testing",
      "Express Cold-Transit to Dzongkhag Blood Banks",
    ],
  },
];

export function CommodityTracker() {
  const [activeTab, setActiveTab] = useState<CommodityCategory>(commodityCategories[0]);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header */}
      <div className="relative z-10 max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F3] border border-amber-500/30 text-amber-800 text-xs font-semibold">
          <Sparkles className="h-3.5 w-3.5 text-amber-600" />
          <span>Statutory Health Commodities Portfolio</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
          Primary Healthcare Supplies Financed in Perpetuity
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
          The Bhutan Health Trust Fund ring-fences procurement capital for 6 core healthcare streams,
          ensuring sovereign health security across all 20 Dzongkhags.
        </p>
      </div>

      {/* 6 Minimal Tab Switchers */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {commodityCategories.map((c) => {
          const isSelected = activeTab.id === c.id;
          const Icon = c.icon;

          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveTab(c)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                isSelected
                  ? "border-emerald-800 bg-[#FAF8F3] ring-1 ring-emerald-800/30 shadow-xs"
                  : "border-slate-200/80 bg-white hover:border-amber-400/60 hover:bg-[#FAF8F3]/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`h-9 w-9 rounded-xl grid place-items-center transition ${
                    isSelected
                      ? "bg-slate-900 text-amber-300"
                      : "bg-[#FAF8F3] text-emerald-800 group-hover:text-amber-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-semibold text-emerald-800 tracking-wider font-sans">
                  {c.dzongkha}
                </span>
              </div>

              <div className="mt-3">
                <div className="font-serif text-xs font-semibold text-slate-900 group-hover:text-emerald-900 transition line-clamp-1">
                  {c.name}
                </div>
                <span className="text-[10px] text-slate-500 font-sans block mt-0.5">
                  {c.annualBudgetNu.split(" / ")[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Commodity Deep-Dive Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#FAF8F3] p-6 sm:p-8 rounded-2xl border border-slate-200/80">
        {/* Left Column: Description & Specifications (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider font-sans">
              {activeTab.dzongkha} • Statutory Health Stream
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-normal text-slate-900">
              {activeTab.name}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans font-light">
              {activeTab.description}
            </p>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-sans">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 text-[11px] block">Annual Spend:</span>
              <span className="font-serif text-sm font-normal text-slate-900 block">
                {activeTab.annualBudgetNu}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1">
              <span className="text-slate-400 text-[11px] block">Coverage Reach:</span>
              <span className="font-serif text-sm font-normal text-emerald-800 block">
                {activeTab.reach}
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 space-y-1 col-span-2 sm:col-span-1">
              <span className="text-slate-400 text-[11px] block">Quality Protocol:</span>
              <span className="font-sans text-[11px] font-medium text-slate-800 block truncate">
                {activeTab.qualityStandard}
              </span>
            </div>
          </div>

          {/* Key Commodity Formulations */}
          <div className="space-y-2.5">
            <h5 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-sans">
              Financed Formulations & Supplies:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {activeTab.keyItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-slate-200/80 text-slate-800 font-sans"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="leading-snug text-xs">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Supply Chain Pipeline (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 space-y-5">
          <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3 font-sans">
            <Building2 className="h-4 w-4 text-emerald-800" />
            <span>Procurement & Supply Pipeline</span>
          </h5>

          <div className="space-y-3.5 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-200">
            {activeTab.logisticsFlow.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-3 pl-1 text-xs font-sans">
                <div className="h-5 w-5 rounded-full bg-slate-900 text-amber-300 font-bold text-[10px] grid place-items-center shrink-0 z-10">
                  {idx + 1}
                </div>
                <div className="pt-0.5 text-slate-700 font-medium leading-snug">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
