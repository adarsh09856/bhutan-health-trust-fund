import { useState } from "react";
import {
  MapPin,
  Building2,
  Users,
  ShieldCheck,
  Syringe,
  Pill,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export interface DzongkhagData {
  id: string;
  name: string;
  dzongkha: string;
  region: "Western" | "Central" | "Eastern" | "Southern";
  population: string;
  bhuCount: number;
  hospitals: number;
  bufferStatus: "Optimal (6+ Months)" | "Active (4+ Months)";
  bufferPercent: number;
  coldChain: "Solar & Grid Dual-Back" | "Hybrid High-Altitude";
  keyFocus: string;
  disbursedNu: string;
  mapX: number; // Percentage for SVG/interactive pin layout
  mapY: number;
}

const dzongkhags: DzongkhagData[] = [
  // Western
  {
    id: "thimphu",
    name: "Thimphu",
    dzongkha: "ཐིམ་ཕུག",
    region: "Western",
    population: "138,700",
    bhuCount: 14,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "National Referral Hospital central buffer & pediatric immunizations",
    disbursedNu: "Nu. 42.5M",
    mapX: 28,
    mapY: 48,
  },
  {
    id: "paro",
    name: "Paro",
    dzongkha: "སྤ་རོ",
    region: "Western",
    population: "46,300",
    bhuCount: 12,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Air gateway emergency buffer and valley community clinics",
    disbursedNu: "Nu. 18.2M",
    mapX: 22,
    mapY: 52,
  },
  {
    id: "haa",
    name: "Haa",
    dzongkha: "ཧཱ",
    region: "Western",
    population: "14,800",
    bhuCount: 7,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "High-altitude winterized cold chain for highland pastoralists",
    disbursedNu: "Nu. 9.4M",
    mapX: 16,
    mapY: 55,
  },
  {
    id: "chhukha",
    name: "Chhukha",
    dzongkha: "ཆུ་ཁ",
    region: "Western",
    population: "68,900",
    bhuCount: 16,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Phuntsholing international import transit hub and industrial clinics",
    disbursedNu: "Nu. 26.8M",
    mapX: 24,
    mapY: 72,
  },
  {
    id: "samtse",
    name: "Samtse",
    dzongkha: "བསམ་རྩེ",
    region: "Western",
    population: "62,500",
    bhuCount: 18,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 98,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Southern foothills primary clinics and maternal delivery kits",
    disbursedNu: "Nu. 22.1M",
    mapX: 14,
    mapY: 78,
  },

  // Central
  {
    id: "gasa",
    name: "Gasa",
    dzongkha: "མགར་ས",
    region: "Central",
    population: "3,950",
    bhuCount: 5,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Lunana glacial altitude solar-powered cold chain and emergency airlift meds",
    disbursedNu: "Nu. 7.8M",
    mapX: 35,
    mapY: 28,
  },
  {
    id: "punakha",
    name: "Punakha",
    dzongkha: "སྤུ་ན་ཁ",
    region: "Central",
    population: "28,700",
    bhuCount: 11,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Valley sub-center distribution and routine school health drives",
    disbursedNu: "Nu. 12.8M",
    mapX: 36,
    mapY: 48,
  },
  {
    id: "wangdue",
    name: "Wangdue Phodrang",
    dzongkha: "དབང་འདུས་ཕོ་བྲང",
    region: "Central",
    population: "42,100",
    bhuCount: 15,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 96,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "East-West highway junction supply and remote gewog outreach",
    disbursedNu: "Nu. 16.5M",
    mapX: 42,
    mapY: 52,
  },
  {
    id: "trongsa",
    name: "Trongsa",
    dzongkha: "ཀྲོང་གསར",
    region: "Central",
    population: "19,900",
    bhuCount: 8,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Central transit hub and maternal health monitoring",
    disbursedNu: "Nu. 10.2M",
    mapX: 52,
    mapY: 54,
  },
  {
    id: "bumthang",
    name: "Bumthang",
    dzongkha: "བུམ་ཐང",
    region: "Central",
    population: "17,800",
    bhuCount: 9,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "High-altitude winter buffer storage and essential diagnostics",
    disbursedNu: "Nu. 11.6M",
    mapX: 60,
    mapY: 42,
  },
  {
    id: "dagana",
    name: "Dagana",
    dzongkha: "དར་དཀར་ན",
    region: "Central",
    population: "24,900",
    bhuCount: 12,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 94,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Remote agrarian community access and chronic illness medicines",
    disbursedNu: "Nu. 13.4M",
    mapX: 38,
    mapY: 68,
  },
  {
    id: "tsirang",
    name: "Tsirang",
    dzongkha: "རྩི་རང",
    region: "Central",
    population: "22,300",
    bhuCount: 10,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 98,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Primary health network and maternal care packs",
    disbursedNu: "Nu. 11.9M",
    mapX: 45,
    mapY: 72,
  },
  {
    id: "sarpang",
    name: "Sarpang",
    dzongkha: "གསར་སྤང",
    region: "Central",
    population: "46,000",
    bhuCount: 14,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Gelephu regional hospital hub and southern border logistics",
    disbursedNu: "Nu. 21.4M",
    mapX: 52,
    mapY: 78,
  },
  {
    id: "zhemgang",
    name: "Zhemgang",
    dzongkha: "གཞལ་སྒང",
    region: "Central",
    population: "17,800",
    bhuCount: 14,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Kheng region isolated communities and primary diagnostic kits",
    disbursedNu: "Nu. 11.2M",
    mapX: 58,
    mapY: 66,
  },

  // Eastern
  {
    id: "mongar",
    name: "Mongar",
    dzongkha: "མོང་སྒར",
    region: "Eastern",
    population: "37,100",
    bhuCount: 21,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Eastern Regional Referral Hospital hub and vaccine distribution center",
    disbursedNu: "Nu. 24.5M",
    mapX: 72,
    mapY: 54,
  },
  {
    id: "trashigang",
    name: "Trashigang",
    dzongkha: "བཀྲ་ཤིས་སྒང",
    region: "Eastern",
    population: "45,800",
    bhuCount: 20,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 98,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Broadest rural primary health unit network and chronic disease care",
    disbursedNu: "Nu. 23.8M",
    mapX: 84,
    mapY: 55,
  },
  {
    id: "trashiyangtse",
    name: "Trashiyangtse",
    dzongkha: "བཀྲ་ཤིས་གཡང་རྩེ",
    region: "Eastern",
    population: "17,300",
    bhuCount: 9,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 96,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Remote north-eastern border gewogs and winter isolation medicine banks",
    disbursedNu: "Nu. 10.5M",
    mapX: 82,
    mapY: 38,
  },
  {
    id: "lhuentse",
    name: "Lhuentse",
    dzongkha: "ལྷུན་རྩེ",
    region: "Eastern",
    population: "14,400",
    bhuCount: 11,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Rugged valley cold chain nodes and seasonal booster drives",
    disbursedNu: "Nu. 9.8M",
    mapX: 72,
    mapY: 36,
  },
  {
    id: "pemagatshel",
    name: "Pema Gatshel",
    dzongkha: "པདྨ་དགའ་ཚལ",
    region: "Eastern",
    population: "23,600",
    bhuCount: 13,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 97,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Southern eastern hill communities and emergency trauma supplies",
    disbursedNu: "Nu. 12.3M",
    mapX: 78,
    mapY: 70,
  },
  {
    id: "samdrupjongkhar",
    name: "Samdrup Jongkhar",
    dzongkha: "བསམ་གྲུབ་ལྗོངས་མཁར",
    region: "Eastern",
    population: "35,100",
    bhuCount: 14,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Eastern border gateway hospital buffer and maternal child wards",
    disbursedNu: "Nu. 18.9M",
    mapX: 86,
    mapY: 75,
  },
];

export function DzongkhagExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<
    "All" | "Western" | "Central" | "Eastern"
  >("All");
  const [activeDzongkhag, setActiveDzongkhag] = useState<DzongkhagData>(dzongkhags[0]);

  const filtered =
    selectedRegion === "All"
      ? dzongkhags
      : dzongkhags.filter((d) => d.region === selectedRegion);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header & Region Filter Tabs */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/80 pb-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 block font-sans">
            Kingdom-Wide Coverage Matrix
          </span>
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Equitable Healthcare Across All 20 Dzongkhags
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl font-sans leading-relaxed">
            From the high-altitude glacial valleys of Gasa to the southern foothills of Samtse,
            BHTF guarantees zero-stockout supply lines for every basic health unit.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F3] p-1.5 rounded-xl border border-slate-200/80 self-start md:self-auto shrink-0">
          {[
            { id: "All", label: "All 20 Dzongkhags" },
            { id: "Western", label: "Western" },
            { id: "Central", label: "Central" },
            { id: "Eastern", label: "Eastern" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRegion(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                selectedRegion === tab.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: District Interactive Selector Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {filtered.map((d) => {
              const isSelected = activeDzongkhag.id === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveDzongkhag(d)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                    isSelected
                      ? "border-emerald-700 bg-[#FAF8F3] ring-1 ring-emerald-700/30 shadow-xs"
                      : "border-slate-200/80 bg-white hover:border-amber-400/60 hover:bg-[#FAF8F3]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-emerald-800 tracking-wider font-sans">
                        {d.dzongkha}
                      </span>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isSelected ? "bg-amber-500" : "bg-slate-200"
                        }`}
                      />
                    </div>
                    <div className="font-serif text-sm font-semibold text-slate-900 mt-1 group-hover:text-emerald-900 transition">
                      {d.name}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-sans">
                    <span className="text-slate-500">{d.bhuCount} BHUs</span>
                    <span className="text-emerald-800 font-medium font-serif">{d.disbursedNu}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sovereign District Dossier Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#0B1F1A] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-amber-400/20 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-amber-400/30 text-amber-300 text-[10px] font-semibold uppercase tracking-wider font-sans">
                {activeDzongkhag.region} Region • {activeDzongkhag.dzongkha}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-2 tracking-tight">
                {activeDzongkhag.name} Dzongkhag
              </h4>
            </div>

            <div className="h-10 w-10 rounded-xl bg-amber-400/15 text-amber-300 border border-amber-400/30 grid place-items-center shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-emerald-400" /> Population Reach
              </span>
              <div className="font-serif text-lg font-normal text-white">
                {activeDzongkhag.population}
              </div>
            </div>

            <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-amber-400" /> Health Facilities
              </span>
              <div className="font-serif text-base font-normal text-white">
                {activeDzongkhag.bhuCount} BHUs + {activeDzongkhag.hospitals} Hosp
              </div>
            </div>

            <div className="bg-white/[0.04] p-3.5 rounded-2xl border border-white/10 space-y-1.5 col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-sans flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5 text-emerald-400" /> Medicine Buffer Status
                </span>
                <span className="text-emerald-300 font-semibold text-xs font-sans">
                  {activeDzongkhag.bufferStatus}
                </span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-amber-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeDzongkhag.bufferPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Strategic Priority Highlight */}
          <div className="bg-white/[0.03] border border-amber-400/20 p-4 rounded-2xl text-xs space-y-1.5">
            <span className="text-amber-300 font-semibold flex items-center gap-1.5 font-sans">
              <Sparkles className="h-3.5 w-3.5" /> Fiduciary Healthcare Mandate:
            </span>
            <p className="text-slate-300 leading-relaxed font-sans font-light">
              {activeDzongkhag.keyFocus}
            </p>
          </div>

          {/* Annual Allocation Total */}
          <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
            <span className="text-slate-400 font-sans">Annual Commodity Allocation:</span>
            <span className="font-serif text-xl font-normal text-amber-300">
              {activeDzongkhag.disbursedNu} / Year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
