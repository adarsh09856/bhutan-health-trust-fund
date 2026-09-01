import { useState } from "react";
import {
  MapPin,
  Building2,
  Users,
  ShieldCheck,
  Syringe,
  Pill,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";

export interface DzongkhagData {
  id: string;
  name: string;
  dzongkha: string;
  region: "Western" | "Central" | "Eastern" | "Southern";
  regionColor: string;
  population: string;
  bhuCount: number;
  hospitals: number;
  bufferStatus: "Optimal (6+ Months)" | "Active (4+ Months)";
  bufferPercent: number;
  coldChain: "Solar & Grid Dual-Back" | "Hybrid High-Altitude";
  keyFocus: string;
  disbursedNu: string;
}

const dzongkhags: DzongkhagData[] = [
  // Western
  {
    id: "thimphu",
    name: "Thimphu",
    dzongkha: "ཐིམ་ཕུག",
    region: "Western",
    regionColor: "from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200",
    population: "138,700",
    bhuCount: 14,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "National Referral Hospital central buffer & pediatric immunizations",
    disbursedNu: "Nu. 42.5M",
  },
  {
    id: "paro",
    name: "Paro",
    dzongkha: "སྤ་རོ",
    region: "Western",
    regionColor: "from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200",
    population: "46,300",
    bhuCount: 12,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Air gateway emergency buffer and valley community clinics",
    disbursedNu: "Nu. 18.2M",
  },
  {
    id: "haa",
    name: "Haa",
    dzongkha: "ཧཱ",
    region: "Western",
    regionColor: "from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200",
    population: "14,800",
    bhuCount: 7,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "High-altitude winterized cold chain for highland pastoralists",
    disbursedNu: "Nu. 9.4M",
  },
  {
    id: "chhukha",
    name: "Chhukha",
    dzongkha: "ཆུ་ཁ",
    region: "Western",
    regionColor: "from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200",
    population: "68,900",
    bhuCount: 16,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Phuntsholing international import transit hub and industrial clinics",
    disbursedNu: "Nu. 26.8M",
  },
  {
    id: "samtse",
    name: "Samtse",
    dzongkha: "བསམ་རྩེ",
    region: "Western",
    regionColor: "from-emerald-500 to-teal-600 text-emerald-700 bg-emerald-50 border-emerald-200",
    population: "62,500",
    bhuCount: 18,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 98,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Southern foothills primary clinics and maternal delivery kits",
    disbursedNu: "Nu. 22.1M",
  },

  // Central
  {
    id: "punakha",
    name: "Punakha",
    dzongkha: "སྤུ་ན་ཁ",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "28,700",
    bhuCount: 11,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Valley sub-center distribution and routine school health drives",
    disbursedNu: "Nu. 12.8M",
  },
  {
    id: "wangdue",
    name: "Wangdue Phodrang",
    dzongkha: "དབང་འདུས་ཕོ་བྲང",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "42,100",
    bhuCount: 15,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 96,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "East-West highway junction supply and remote gewog outreach",
    disbursedNu: "Nu. 16.5M",
  },
  {
    id: "gasa",
    name: "Gasa",
    dzongkha: "མགར་ས",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "3,950",
    bhuCount: 5,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Lunana glacial altitude solar-powered cold chain and emergency airlift meds",
    disbursedNu: "Nu. 7.8M",
  },
  {
    id: "trongsa",
    name: "Trongsa",
    dzongkha: "ཀྲོང་གསར",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "19,900",
    bhuCount: 8,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Central transit hub and maternal health monitoring",
    disbursedNu: "Nu. 10.2M",
  },
  {
    id: "bumthang",
    name: "Bumthang",
    dzongkha: "བུམ་ཐང",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "17,800",
    bhuCount: 9,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "High-altitude winter buffer storage and essential diagnostics",
    disbursedNu: "Nu. 11.6M",
  },
  {
    id: "dagana",
    name: "Dagana",
    dzongkha: "དར་དཀར་ན",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "24,900",
    bhuCount: 12,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 94,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Remote agrarian community access and chronic illness medicines",
    disbursedNu: "Nu. 13.4M",
  },
  {
    id: "tsirang",
    name: "Tsirang",
    dzongkha: "རྩི་རང",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "22,300",
    bhuCount: 10,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 98,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Primary health network and maternal care packs",
    disbursedNu: "Nu. 11.9M",
  },
  {
    id: "sarpang",
    name: "Sarpang",
    dzongkha: "གསར་སྤང",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "46,000",
    bhuCount: 14,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Gelephu regional hospital hub and southern border logistics",
    disbursedNu: "Nu. 21.4M",
  },
  {
    id: "zhemgang",
    name: "Zhemgang",
    dzongkha: "གཞལ་སྒང",
    region: "Central",
    regionColor: "from-amber-500 to-orange-600 text-amber-700 bg-amber-50 border-amber-200",
    population: "17,800",
    bhuCount: 14,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 95,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Kheng region isolated communities and primary diagnostic kits",
    disbursedNu: "Nu. 11.2M",
  },

  // Eastern
  {
    id: "mongar",
    name: "Mongar",
    dzongkha: "མོང་སྒར",
    region: "Eastern",
    regionColor: "from-blue-500 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200",
    population: "37,100",
    bhuCount: 22,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Eastern Regional Referral Hospital supply and rural BHU grid",
    disbursedNu: "Nu. 24.8M",
  },
  {
    id: "trashigang",
    name: "Trashigang",
    dzongkha: "བཀྲིས་སྒང",
    region: "Eastern",
    regionColor: "from-blue-500 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200",
    population: "45,800",
    bhuCount: 24,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Broadest rural network with 24 BHUs across mountainous gewogs",
    disbursedNu: "Nu. 27.5M",
  },
  {
    id: "trashiyangtse",
    name: "Trashiyangtse",
    dzongkha: "བཀྲིས་གཡང་རྩེ",
    region: "Eastern",
    regionColor: "from-blue-500 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200",
    population: "17,300",
    bhuCount: 9,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 96,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Bumdeling valley and border health unit supply chains",
    disbursedNu: "Nu. 10.8M",
  },
  {
    id: "lhuentse",
    name: "Lhuentse",
    dzongkha: "ལྷུན་རྩེ",
    region: "Eastern",
    regionColor: "from-blue-500 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200",
    population: "14,400",
    bhuCount: 11,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 94,
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Remote Kurtoe highlands routine immunization and emergency antibiotics",
    disbursedNu: "Nu. 9.9M",
  },
  {
    id: "pemagatshel",
    name: "Pema Gatshel",
    dzongkha: "པདྨ་དགའ་ཚལ",
    region: "Eastern",
    regionColor: "from-blue-500 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200",
    population: "23,600",
    bhuCount: 13,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 97,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Ridge community primary healthcare and childhood vaccination",
    disbursedNu: "Nu. 12.3M",
  },
  {
    id: "samdrupjongkhar",
    name: "Samdrup Jongkhar",
    dzongkha: "བསམ་གྲུབ་ལྗོངས་མཁར",
    region: "Eastern",
    regionColor: "from-blue-500 to-indigo-600 text-blue-700 bg-blue-50 border-blue-200",
    population: "35,100",
    bhuCount: 15,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    bufferPercent: 100,
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Eastern border gateway warehouse and community clinic buffers",
    disbursedNu: "Nu. 17.6M",
  },
];

export function DzongkhagExplorer() {
  const [selectedRegion, setSelectedRegion] = useState<"All" | "Western" | "Central" | "Eastern">("All");
  const [activeDzongkhag, setActiveDzongkhag] = useState<DzongkhagData>(dzongkhags[0]);

  const filtered =
    selectedRegion === "All"
      ? dzongkhags
      : dzongkhags.filter((d) => d.region === selectedRegion);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-emerald-50/30 border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 space-y-8">
      {/* Decorative Ambient Background */}
      <div className="absolute top-0 right-0 h-96 w-96 bg-gradient-to-br from-emerald-500/10 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

      {/* Header & Region Filter Tabs */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-amber-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Nationwide 20 Dzongkhags Sovereign Health Matrix</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Interactive Dzongkhag Healthcare Coverage
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Click any Dzongkhag to inspect live primary facilities, medicine buffer status, and annual funding.
          </p>
        </div>

        {/* Region Filter Buttons with Colorful Themes */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm self-start md:self-auto">
          {[
            { id: "All", label: "All 20", activeClass: "bg-slate-900 text-white" },
            { id: "Western", label: "Western", activeClass: "bg-emerald-600 text-white" },
            { id: "Central", label: "Central", activeClass: "bg-amber-500 text-white" },
            { id: "Eastern", label: "Eastern", activeClass: "bg-blue-600 text-white" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedRegion(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer ${
                selectedRegion === tab.id
                  ? `${tab.activeClass} shadow-md`
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid: District Selector + Live Detail Card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* District Pills Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((d) => {
            const isSelected = activeDzongkhag.id === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDzongkhag(d)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                  isSelected
                    ? "border-emerald-500 bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50/50 ring-2 ring-emerald-500/30 shadow-md shadow-emerald-500/10 scale-[1.02]"
                    : "border-slate-200 hover:border-emerald-300 bg-white hover:shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-emerald-800 tracking-wider">
                      {d.dzongkha}
                    </span>
                    <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 mt-1 group-hover:text-emerald-700 transition">
                    {d.name}
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-500">{d.bhuCount} Clinics</span>
                  <span className="text-emerald-700 font-mono">{d.disbursedNu}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected District Detail Card (Right 5 Cols) - Colorful Majestic Theme */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl border border-emerald-500/30 relative overflow-hidden">
          {/* Ambient Corner Glow */}
          <div className="absolute -top-12 -right-12 h-40 w-40 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 h-40 w-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex items-start justify-between border-b border-slate-800 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-extrabold uppercase tracking-wider">
                {activeDzongkhag.region} Region • {activeDzongkhag.dzongkha}
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-white mt-2 tracking-tight">
                {activeDzongkhag.name} Dzongkhag
              </h4>
            </div>

            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30 grid place-items-center shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
          </div>

          {/* 4 Colorful Metrics Cards */}
          <div className="relative z-10 grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1 hover:border-emerald-500/40 transition">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-emerald-400" /> Population
              </span>
              <div className="text-lg font-black text-white font-mono">
                {activeDzongkhag.population}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1 hover:border-amber-500/40 transition">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-amber-400" /> Facilities
              </span>
              <div className="text-base font-black text-white">
                {activeDzongkhag.bhuCount} BHUs + {activeDzongkhag.hospitals} Hosp
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80 space-y-1.5 col-span-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium flex items-center gap-1">
                  <Pill className="h-3.5 w-3.5 text-emerald-400" /> Medicine Buffer Status
                </span>
                <span className="text-emerald-300 font-bold text-xs">
                  {activeDzongkhag.bufferStatus}
                </span>
              </div>
              <div className="w-full bg-slate-700/80 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeDzongkhag.bufferPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Strategic Priority Highlight Box */}
          <div className="relative z-10 bg-gradient-to-r from-emerald-950/60 via-slate-900/60 to-emerald-950/60 border border-emerald-500/30 p-4 rounded-2xl text-xs space-y-1.5 shadow-inner">
            <span className="text-amber-400 font-extrabold flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> BHTF Sovereign Health Mandate:
            </span>
            <p className="text-slate-200 leading-relaxed font-normal">
              {activeDzongkhag.keyFocus}
            </p>
          </div>

          {/* Annual Allocation Total */}
          <div className="relative z-10 pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
            <span className="text-slate-400 font-medium">Annual Commodity Spend:</span>
            <span className="text-xl font-mono font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              {activeDzongkhag.disbursedNu} / Year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
