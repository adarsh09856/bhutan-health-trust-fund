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
    population: "138,700",
    bhuCount: 14,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "National Referral Hospital central buffer & pediatric immunizations",
    disbursedNu: "Nu. 42.5M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Air gateway emergency buffer and valley community clinics",
    disbursedNu: "Nu. 18.2M",
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
    coldChain: "Hybrid High-Altitude",
    keyFocus: "High-altitude winterized cold chain for highland pastoralists",
    disbursedNu: "Nu. 9.4M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Phuntsholing international import transit hub and industrial clinics",
    disbursedNu: "Nu. 26.8M",
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
    population: "28,700",
    bhuCount: 11,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Valley sub-center distribution and routine school health drives",
    disbursedNu: "Nu. 12.8M",
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
    coldChain: "Hybrid High-Altitude",
    keyFocus: "East-West highway junction supply and remote gewog outreach",
    disbursedNu: "Nu. 16.5M",
  },
  {
    id: "gasa",
    name: "Gasa",
    dzongkha: "མགར་ས",
    region: "Central",
    population: "3,950",
    bhuCount: 5,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Lunana glacial altitude solar-powered cold chain and emergency airlift meds",
    disbursedNu: "Nu. 7.8M",
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
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Central transit hub and maternal health monitoring",
    disbursedNu: "Nu. 10.2M",
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
    coldChain: "Hybrid High-Altitude",
    keyFocus: "High-altitude winter buffer storage and essential diagnostics",
    disbursedNu: "Nu. 11.6M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Remote agrarian community access and chronic illness medicines",
    disbursedNu: "Nu. 13.4M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Primary health network and maternal care packs",
    disbursedNu: "Nu. 11.9M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Gelephu regional hospital hub and southern border logistics",
    disbursedNu: "Nu. 21.4M",
  },

  // Eastern
  {
    id: "mongar",
    name: "Mongar",
    dzongkha: "མོང་སྒར",
    region: "Eastern",
    population: "37,100",
    bhuCount: 22,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Eastern Regional Referral Hospital supply and rural BHU grid",
    disbursedNu: "Nu. 24.8M",
  },
  {
    id: "trashigang",
    name: "Trashigang",
    dzongkha: "བཀྲིས་སྒང",
    region: "Eastern",
    population: "45,800",
    bhuCount: 24,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Broadest rural network with 24 BHUs across mountainous gewogs",
    disbursedNu: "Nu. 27.5M",
  },
  {
    id: "trashiyangtse",
    name: "Trashiyangtse",
    dzongkha: "བཀྲིས་གཡང་རྩེ",
    region: "Eastern",
    population: "17,300",
    bhuCount: 9,
    hospitals: 1,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Bumdeling valley and border health unit supply chains",
    disbursedNu: "Nu. 10.8M",
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
    coldChain: "Hybrid High-Altitude",
    keyFocus: "Remote Kurtoe highlands routine immunization and emergency antibiotics",
    disbursedNu: "Nu. 9.9M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Ridge community primary healthcare and childhood vaccination",
    disbursedNu: "Nu. 12.3M",
  },
  {
    id: "samdrupjongkhar",
    name: "Samdrup Jongkhar",
    dzongkha: "བསམ་གྲུབ་ལྗོངས་མཁར",
    region: "Eastern",
    population: "35,100",
    bhuCount: 15,
    hospitals: 2,
    bufferStatus: "Optimal (6+ Months)",
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Eastern border gateway warehouse and community clinic buffers",
    disbursedNu: "Nu. 17.6M",
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
    coldChain: "Solar & Grid Dual-Back",
    keyFocus: "Kheng region isolated communities and primary diagnostic kits",
    disbursedNu: "Nu. 11.2M",
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
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
      {/* Header & Region Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1.5">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Nationwide Primary Healthcare Shield</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            20 Dzongkhags Interactive Health Coverage
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Click any Dzongkhag to inspect live facility counts, buffer stocks, and health funding.
          </p>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl self-start md:self-auto">
          {(["All", "Western", "Central", "Eastern"] as const).map((reg) => (
            <button
              key={reg}
              type="button"
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedRegion === reg
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Grid: District Selector + Live Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* District Pills Grid (Left 7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {filtered.map((d) => {
            const isSelected = activeDzongkhag.id === d.id;
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveDzongkhag(d)}
                className={`p-3.5 rounded-2xl border text-left transition duration-150 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-600/20 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50"
                }`}
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 tracking-wide block">
                    {d.dzongkha}
                  </span>
                  <div className="font-extrabold text-sm text-slate-900 mt-0.5">
                    {d.name}
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>{d.bhuCount} Clinics</span>
                  <span className="text-emerald-700 font-bold">{d.disbursedNu}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected District Detail Card (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 h-48 w-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase block">
                {activeDzongkhag.region} Region • {activeDzongkhag.dzongkha}
              </span>
              <h4 className="text-2xl font-black text-white mt-1">
                {activeDzongkhag.name} Dzongkhag
              </h4>
            </div>

            <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 grid place-items-center shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Users className="h-3.5 w-3.5 text-emerald-400" /> Population
              </span>
              <div className="text-base font-extrabold text-white">
                {activeDzongkhag.population}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-emerald-400" /> Facilities
              </span>
              <div className="text-base font-extrabold text-white">
                {activeDzongkhag.bhuCount} BHUs + {activeDzongkhag.hospitals} Hosp
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Pill className="h-3.5 w-3.5 text-emerald-400" /> Medicine Buffer
              </span>
              <div className="text-xs font-bold text-emerald-300">
                {activeDzongkhag.bufferStatus}
              </div>
            </div>

            <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 space-y-1">
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Syringe className="h-3.5 w-3.5 text-emerald-400" /> Cold Chain
              </span>
              <div className="text-xs font-bold text-emerald-300 truncate">
                {activeDzongkhag.coldChain}
              </div>
            </div>
          </div>

          {/* Strategic Priority Box */}
          <div className="bg-emerald-950/40 border border-emerald-500/20 p-4 rounded-2xl text-xs space-y-1.5">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> BHTF Priority Mandate:
            </span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {activeDzongkhag.keyFocus}
            </p>
          </div>

          {/* Annual Allocation Total */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-xs">
            <span className="text-slate-400">Total Commodity Allocation:</span>
            <span className="text-lg font-mono font-black text-emerald-400">
              {activeDzongkhag.disbursedNu} / Year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
