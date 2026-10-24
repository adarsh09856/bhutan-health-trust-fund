import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Building2,
  TrendingUp,
  FileText,
  Activity,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import drGyamboDirector from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import staffSonamChojay from "@/assets/bhtf/secretariat/sonam_chojay.jpg";
import staffThinleyWangchuk from "@/assets/bhtf/secretariat/thinley_wangchuk_v2026_sharp.jpg";
import staffRinchenPhuntsho from "@/assets/bhtf/secretariat/rinchen_phuntsho.jpg";
import staffTsheringChoden from "@/assets/bhtf/secretariat/tshering_choden.jpg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/about/secretariat")({
  head: () => ({
    meta: [
      { title: "Secretariat & Key Personnel | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Secretariat executive structure, Director Dr. Gyambo Sithey, 4 core operational divisions, and key staff profiles.",
      },
    ],
  }),
  component: SecretariatPage,
});

interface SecretariatMember {
  id: string;
  orderNumber: number;
  name: string;
  nameDz: string;
  designation: string;
  designationDz: string;
  division: string;
  divisionDz: string;
  badge: string;
  badgeDz: string;
  bio: string;
  bioDz: string;
  tags: string[];
  tagsDz: string[];
  email: string;
  phone: string;
  location: string;
  locationDz: string;
  image: string;
}

const secretariatMembers: SecretariatMember[] = [
  {
    id: "director-gyambo-sithey",
    orderNumber: 1,
    name: "Dr. Gyambo Sithey, PhD",
    nameDz: "སྐུ་ཞབས་ འགྱུར་མེད་སྲིད་ཐེད། (འབུམ་རམས་པ།)",
    designation: "Director & Member Secretary",
    designationDz: "མདོ་ཆེན། དྲུང་ཆེན་ཡིག་ཚང་། (ཚོགས་ཆུང་གི་དྲུང་ཆེན།)",
    division: "Directorate & Executive Governance",
    divisionDz: "མདོ་ཆེན་དབུ་ཁྲིད་དང་ ལག་ལེན་གཙོ་འཛིན།",
    badge: "Directorate Leadership",
    badgeDz: "མདོ་ཆེན་དབུ་ཁྲིད།",
    bio: "Dr. Gyambo Sithey serves as the Director of the Bhutan Health Trust Fund Secretariat and Member Secretary to the Board of Trustees. With extensive leadership in public health policy, epidemiological research, and health financing, Dr. Sithey oversees the execution of Board policies, endowment capital growth, bilateral donor partnerships, and statutory governance to ensure Bhutan's lifelong supply of free primary healthcare.",
    bioDz: "འབུམ་རམས་པ་ འགྱུར་མེད་སྲིད་ཐེད་མཆོག་གིས་ དྲུང་ཆེན་ཡིག་ཚང་གི་མདོ་ཆེན་དང་ བཀོད་ཚོགས་ཀྱི་དྲུང་ཆེན་སྦེ་ ཕྱག་ལཱ་གནང་དོ་ཡོད། མི་མང་གསོ་བའི་སྲིད་བྱུས་དང་ ནད་ཡམས་ཞིབ་འཇུག གསོ་བའི་དངུལ་རྩིས་ཐད་ ཉམས་མྱོང་རྒྱ་ཆེན་ཡོད་མི་ མདོ་ཆེན་གྱིས་ བཀོད་ཚོགས་ཀྱི་བཀའ་རྒྱ་ལག་ལེན་འཐབ་ནི་དང་ མ་རྩ་རྒྱས་སྐྱེད་ དེ་ལས་ རིན་མེད་གསོ་བའི་ཞབས་ཏོག་གཏན་འཇགས་སྦེ་ བཞག་ཐབས་ལུ་ འགོ་ཁྲིད་གནང་དོ་ཡོད།",
    tags: [
      "Public Health Policy",
      "Endowment Governance",
      "WHO / Donor Liaison",
      "Statutory Board Oversight",
    ],
    tagsDz: [
      "མི་མང་གསོ་བའི་སྲིད་བྱུས།",
      "མ་རྩ་བདག་སྐྱོང་།",
      "རྒྱལ་སྤྱིའི་མཉམ་འབྲེལ།",
      "བཀོད་ཚོགས་དྲུང་ཆེན།",
    ],
    email: "bhtf@bhtf.bt",
    phone: "02-338636 / 338637",
    location: "Secretariat HQ, Motithang, Thimphu",
    locationDz: "དྲུང་ཆེན་ཡིག་ཚང་ལྟེ་བ། མོ་ཏི་ཐང་། ཐིམ་ཕུག",
    image: drGyamboDirector,
  },
  {
    id: "officer-sonam-chojay",
    orderNumber: 2,
    name: "Mr. Sonam Chojay",
    nameDz: "སྐུ་ཞབས་ བསོད་ནམས་ཆོས་རྒྱལ།",
    designation: "Accounts Officer",
    designationDz: "རྩིས་ཁྲ་འགོ་དཔོན།",
    division: "Administration & Finance Division",
    divisionDz: "སྲིད་སྐྱོང་དང་ དངུལ་རྩིས་སྡེ་ཚན།",
    badge: "Fiduciary Accounting",
    badgeDz: "ཁྲིམས་མཐུན་དངུལ་རྩིས།",
    bio: "Mr. Sonam Chojay oversees statutory accounting, financial reporting, and expenditure controls across the BHTF Secretariat. He ensures compliance with Royal Audit Authority (RAA) standards, manages disbursement audits for primary healthcare procurements, and coordinates annual statutory financial statements.",
    bioDz: "སྐུ་ཞབས་ བསོད་ནམས་ཆོས་རྒྱལ་གྱིས་ དྲུང་ཆེན་ཡིག་ཚང་གི་ ཁྲིམས་མཐུན་རྩིས་ཁྲ་དང་ དངུལ་རྩིས་སྙན་ཞུ། ཟད་འགྲོ་ཚུལ་མཐུན་དོ་དམ་ཚུ་ འགན་ལེན་འབད་དོ་ཡོད། རྒྱལ་གཞུང་རྩིས་ཞིབ་དབང་འཛིན་གྱི་ ཁྲིམས་ལུགས་དང་བསྟུན་ རྒྱལ་སྤྱིའི་སྨན་རྫས་མཁོ་སྒྲུབ་ཀྱི་ དངུལ་སྤྲོད་ཚུ་ དྭངས་གསལ་ཅན་སྦེ་ ལག་ལེན་འཐབ་དོ་ཡོད།",
    tags: [
      "RAA Audit Compliance",
      "Procurement Disbursement",
      "Financial Reporting",
      "Internal Controls",
    ],
    tagsDz: [
      "རྩིས་ཞིབ་བསྟུན་སྒྲིག",
      "མཁོ་སྒྲུབ་དངུལ་སྤྲོད།",
      "དངུལ་རྩིས་སྙན་ཞུ།",
      "ནང་འཁོད་དོ་དམ།",
    ],
    email: "bhtf@bhtf.bt",
    phone: "02-338636 / Ext. 104",
    location: "Secretariat HQ, Motithang, Thimphu",
    locationDz: "དྲུང་ཆེན་ཡིག་ཚང་ལྟེ་བ། མོ་ཏི་ཐང་། ཐིམ་ཕུག",
    image: staffSonamChojay,
  },
  {
    id: "officer-thinley-wangchuk",
    orderNumber: 3,
    name: "Mr. Thinley Wangchuk",
    nameDz: "སྐུ་ཞབས་ འཕྲིན་ལས་དབང་ཕྱུག",
    designation: "Senior Investment Officer",
    designationDz: "མ་རྩ་བཙུགས་བཞག་འགོ་དཔོན་གཙོ་འཛིན།",
    division: "Investment Management Division",
    divisionDz: "མ་རྩ་བདག་སྐྱོང་སྡེ་ཚན།",
    badge: "Portfolio & Yields",
    badgeDz: "མ་རྩ་འོང་འབབ།",
    bio: "Mr. Thinley Wangchuk spearheads endowment fund investment portfolios, asset allocation strategies, and liquidity management. He focuses on yield optimization across Royal Government Treasury Bonds, commercial term deposits, and sovereign investment instruments to safeguard BHTF's capital reserves in perpetuity.",
    bioDz: "སྐུ་ཞབས་ འཕྲིན་ལས་དབང་ཕྱུག་གིས་ མ་རྩ་བཙུགས་བཞག་གི་ སྲིད་བྱུས་དང་ མ་དངུལ་སྐྱེད་འཕེལ་གྱི་ འཆར་གཞི་ཚུ་ འགན་ལེན་འབད་དོ་ཡོད། རྒྱལ་གཞུང་བུན་འཛིན་ (Treasury Bonds) དང་ ཚོང་འབྲེལ་སྐྱེད་འཕེལ་མ་རྩ་ཚུ་ ཉེན་སྲུང་ཅན་སྦེ་ བཞག་ཐོག་ལས་ མ་རྩའི་དངུལ་ཕོགས་ གཏན་འཇགས་འོང་ཐབས་ལུ་ ཕྱག་ལཱ་གནང་དོ་ཡོད།",
    tags: [
      "Treasury Bonds (>5% Yield)",
      "Asset Allocation",
      "Liquidity Monitoring",
      "Yield Optimization",
    ],
    tagsDz: [
      "རྒྱལ་གཞུང་བུན་འཛིན།",
      "མ་རྩ་བགོ་བཀྲམ།",
      "དངུལ་རྐྱང་ཉེན་སྲུང་།",
      "སྐྱེད་འཕེལ་དོ་དམ།",
    ],
    email: "bhtf@bhtf.bt",
    phone: "02-338636 / Ext. 102",
    location: "Secretariat HQ, Motithang, Thimphu",
    locationDz: "དྲུང་ཆེན་ཡིག་ཚང་ལྟེ་བ། མོ་ཏི་ཐང་། ཐིམ་ཕུག",
    image: staffThinleyWangchuk,
  },
  {
    id: "staff-rinchen-phuntsho",
    orderNumber: 4,
    name: "Mr. Rinchen Phuntsho",
    nameDz: "སྐུ་ཞབས་ རིན་ཆེན་ཕུན་ཚོགས།",
    designation: "Driver / Support Logistics",
    designationDz: "སྣུམ་འཁོར་གཏོང་མི། (འགྲོ་འགྲུལ་དང་ རྒྱབ་སྐྱོར་དོ་དམ།)",
    division: "Support Logistics & Field Operations",
    divisionDz: "རྒྱབ་སྐྱོར་དོ་དམ་དང་ འགྲོ་འགྲུལ་ལས་དོན།",
    badge: "Field Logistics",
    badgeDz: "འགྲོ་འགྲུལ་སྐྱེལ་འདྲེན།",
    bio: "Mr. Rinchen Phuntsho manages essential transport logistics, emergency delivery support, and official mobility for the BHTF Secretariat. He ensures safe, reliable transit for critical documents, medical procurement coordination, and official Secretariat operations across Bhutan.",
    bioDz: "སྐུ་ཞབས་ རིན་ཆེན་ཕུན་ཚོགས་ཀྱིས་ དྲུང་ཆེན་ཡིག་ཚང་གི་ འགྲོ་འགྲུལ་སྐྱེལ་འདྲེན་དང་ གློ་བུར་རྒྱབ་སྐྱོར་གྱི་ ལས་དོན་ཚུ་ འགན་ལེན་འབད་དོ་ཡོད། སྨན་རྫས་དང་ སྨན་ཁབ་མཁོ་སྒྲུབ་ཀྱི་ ཡིག་ཆ་གལ་ཅན་ཚུ་ ཉེན་སྲུང་ཅན་སྦེ་ སྐྱེལ་འདྲེན་འབད་ནི་དང་ ཡིག་ཚང་གི་ ལས་དོན་འགྲོ་འགྲུལ་ཚུ་ ཚུལ་མཐུན་སྦེ་ འགན་ལེན་འབད་དོ་ཡོད།",
    tags: [
      "Transport Logistics",
      "Emergency Fleet Operations",
      "Regulatory Dispatch",
      "Field Mobility",
    ],
    tagsDz: [
      "འགྲོ་འགྲུལ་སྐྱེལ་འདྲེན།",
      "གློ་བུར་སྐྱེལ་འདྲེན་རྒྱབ་སྐྱོར།",
      "ཡིག་ཆ་སྐྱེལ་སྤྲོད།",
      "ས་གནས་འགྲོ་འགྲུལ།",
    ],
    email: "bhtf@bhtf.bt",
    phone: "02-338636",
    location: "Secretariat HQ, Motithang, Thimphu",
    locationDz: "དྲུང་ཆེན་ཡིག་ཚང་ལྟེ་བ། མོ་ཏི་ཐང་། ཐིམ་ཕུག",
    image: staffRinchenPhuntsho,
  },
  {
    id: "officer-tshering-choden",
    orderNumber: 5,
    name: "Ms. Tshering Choden",
    nameDz: "སྐུ་ཞབས་ ཚེ་རིང་ཆོས་ལྡན།",
    designation: "Senior Program Officer",
    designationDz: "ལས་རིམ་འགོ་དཔོན་གཙོ་འཛིན།",
    division: "Programme Division",
    divisionDz: "ལས་རིམ་སྡེ་ཚན།",
    badge: "Commodity Procurement",
    badgeDz: "སྨན་རྫས་མཁོ་སྒྲུབ།",
    bio: "Ms. Tshering Choden coordinates nationwide procurement programs for 438 essential drugs, traditional medicines, and universal vaccines. Working closely with the Ministry of Health and international suppliers (UNICEF/WHO), she monitors supply chain integrity and national healthcare needs.",
    bioDz: "སྐུ་ཞབས་ ཚེ་རིང་ཆོས་ལྡན་གྱིས་ གལ་ཆེ་བའི་སྨན་རྫས་ ༤༣༨ དང་ གསོ་རིག་སྨན་རྫས། དེ་ལས་ ཨ་ལོའི་སྨན་ཁབ་ཚུ་ རྒྱལ་ཡོངས་ལུ་ མཁོ་སྒྲུབ་འབད་ནིའི་ ལས་རིམ་ཚུ་ འགོ་འདྲེན་འཐབ་དོ་ཡོད། གསོ་བའི་ལྷན་ཁག་དང་ UNICEF, WHO ཚུ་དང་ མཉམ་འབྲེལ་ཐོག་ལས་ རྫོང་ཁག་ ༢༠ གི་ སྨན་ཁང་ཚུ་ནང་ སྨན་རྫས་ཚུ་ དུས་ཐོག་ལུ་ ལྷོད་ཐབས་ལུ་ ལྟ་རྟོག་འབད་དོ་ཡོད།",
    tags: [
      "438 Essential Medicines",
      "Universal Child Vaccines",
      "UNICEF Supply Chain",
      "Cold-Chain Monitoring",
    ],
    tagsDz: [
      "གལ་ཆེ་བའི་སྨན་རྫས་ ༤༣༨",
      "ཨ་ལོའི་སྨན་ཁབ།",
      "UNICEF མཁོ་སྒྲུབ།",
      "བསིལ་མཛོད་ལྟ་རྟོག",
    ],
    email: "bhtf@bhtf.bt",
    phone: "02-338636 / Ext. 101",
    location: "Secretariat HQ, Motithang, Thimphu",
    locationDz: "དྲུང་ཆེན་ཡིག་ཚང་ལྟེ་བ། མོ་ཏི་ཐང་། ཐིམ་ཕུག",
    image: staffTsheringChoden,
  },
];

function SecretariatMemberCard({
  member,
  isActive,
  onToggle,
  isDzongkha,
}: {
  member: SecretariatMember;
  isActive: boolean;
  onToggle: () => void;
  isDzongkha: boolean;
}) {
  return (
    <div
      onClick={onToggle}
      className={`group relative w-full rounded-3xl bg-white border-2 transition-all duration-300 shadow-sm hover:shadow-2xl overflow-hidden cursor-pointer flex flex-col ${
        isActive
          ? "border-emerald-600 ring-4 ring-emerald-500/20 shadow-2xl"
          : "border-slate-200/90 hover:border-emerald-500/60"
      }`}
      style={{ minHeight: "530px" }}
    >
      {/* Front Face: Large centered uncropped photo + clean footer */}
      <div className="flex flex-col h-full w-full">
        {/* Photo Container: Generous height, centered photo, zero cropping */}
        <div className="relative w-full h-[360px] sm:h-[390px] bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]/40 flex items-center justify-center p-6 overflow-hidden">
          {/* Subtle decorative background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

          {/* Centered, completely uncropped photo */}
          <img
            src={member.image}
            alt={isDzongkha ? member.nameDz : member.name}
            className="w-full h-full object-contain object-center drop-shadow-md group-hover:scale-105 transition-transform duration-500 relative z-10"
            loading="lazy"
          />

          {/* Order Number & Role Badge */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900/85 backdrop-blur-sm text-white font-mono text-xs font-bold shadow-sm">
              {member.orderNumber}
            </span>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-emerald-900 border border-emerald-200/80 shadow-2xs">
              {isDzongkha ? member.badgeDz : member.badge}
            </span>
          </div>

          {/* Interactive Cue Badge */}
          <div className="absolute bottom-3 right-3 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-900 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-emerald-200/80 shadow-2xs">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{isDzongkha ? "ཁ་གསལ་གཟིགས།" : "Hover for Bio"}</span>
            </span>
          </div>
        </div>

        {/* Front Footer Info */}
        <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex-1 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-800 font-bold block mb-1">
              {isDzongkha ? member.divisionDz : member.division}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-900 transition-colors leading-tight">
              {isDzongkha ? member.nameDz : member.name}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-700 mt-1">
              {isDzongkha ? member.designationDz : member.designation}
            </p>
          </div>

          <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono text-[11px]">BHTF Secretariat</span>
            <span className="text-emerald-800 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              <span>{isDzongkha ? "ལོ་རྒྱུས་རྒྱས་པ།" : "View Details"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* DHI Signature Hover Reveal Overlay */}
      <div
        className={`absolute inset-0 bg-white/98 backdrop-blur-md p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 z-20 rounded-3xl border-2 border-emerald-600/50 shadow-2xl ${
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        }`}
      >
        {/* Top Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              {isDzongkha ? member.divisionDz : member.division}
            </span>
            <span className="font-mono text-xs text-slate-400 font-bold">
              #{member.orderNumber}
            </span>
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {isDzongkha ? member.nameDz : member.name}
            </h3>
            <p className="text-xs sm:text-sm font-bold text-emerald-800 mt-0.5">
              {isDzongkha ? member.designationDz : member.designation}
            </p>
          </div>
        </div>

        {/* Middle: Institutional Bio & Responsibilities */}
        <div className="my-3 py-2 border-y border-slate-200/80 overflow-y-auto max-h-[220px] sm:max-h-[250px] pr-1 space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
            {isDzongkha ? member.bioDz : member.bio}
          </p>

          {/* Focus Tags */}
          <div className="pt-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1.5">
              {isDzongkha ? "གཙོ་བོའི་ལས་འགན།" : "Core Institutional Focus"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(isDzongkha ? member.tagsDz : member.tags).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-sans font-medium px-2.5 py-1 rounded-lg bg-emerald-50/80 text-emerald-900 border border-emerald-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Official Contact & Credentials */}
        <div className="space-y-2 pt-1 text-xs text-slate-600">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Mail className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <a
                href={`mailto:${member.email}`}
                className="hover:text-emerald-900 hover:underline font-mono text-[11px]"
                onClick={(e) => e.stopPropagation()}
              >
                {member.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Phone className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
              <span className="font-mono text-[11px]">{member.phone}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{isDzongkha ? member.locationDz : member.location}</span>
            </div>
            <span className="text-slate-400 font-mono text-[10px]">
              {isDzongkha ? "(ཨེབ་སྟེ་བསྡམས)" : "(Tap to close)"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecretariatPage() {
  const { t, isDzongkha } = useLanguage();
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleToggleCard = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        badge={t("secretariat_page_badge", "Executive Directorate")}
        title={t("secretariat_page_title", "Secretariat")}
        subtitle={t(
          "secretariat_page_subtitle",
          "The executive arm of the Bhutan Health Trust Fund executing day-to-day operations, endowment investments, and healthcare procurement disbursements."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("secretariat_page_title", "Secretariat") },
        ]}
      />

      {/* 1. Core Secretariat Operational Divisions */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-divisions">
        <SectionEditBadge
          label="Secretariat Operational Divisions"
          pageSlug="about-secretariat"
          sectionId="secretariat-divisions"
          studioHref="/admin/page-editor?slug=about-secretariat"
          initialData={{
            title: "Secretariat Operational Divisions",
            subtitle: "Four operational divisions executing day-to-day management and procurement.",
            badge: "Operational Structure",
          }}
        />

        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
              {isDzongkha ? "དབྱེ་ཚན་ ༡.༣ • ལག་ལེན་སྡེ་ཚན་ཚུ།" : "Section 1.3 • Operational Divisions"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
              {isDzongkha ? "ལག་ལེན་སྡེ་ཚན་ཚུ།" : "Core Operational Divisions"}
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-light">
              {t(
                "secretariat_divisions_sub",
                "Under the leadership of the Director & Member Secretary, the Secretariat manages four specialized operational divisions to fulfill the statutory objectives of the Fund."
              )}
            </p>
          </div>

          {/* 4 Divisions Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-2">
            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_investment", "Investment Management Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_investment_desc",
                    "Oversees endowment portfolio management, yield generation, onshore/offshore asset allocations, and liquidity monitoring."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-emerald-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "མ་རྩ་བདག་སྐྱོང་།" : "Endowment Stewardship"}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_admin", "Administration & Finance Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_admin_desc",
                    "Directs statutory accounting, audit compliance, human resources, IT infrastructure, and secretariat procurement support."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-amber-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "ཁྲིམས་མཐུན་དངུལ་རྩིས།" : "Statutory Fiduciary"}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_programme", "Programme Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_programme_desc",
                    "Coordinates with the Ministry of Health on the procurement of 438 essential medicines, traditional medicines, and universal vaccines."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-teal-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "སྨན་རྫས་མཁོ་སྒྲུབ།" : "Commodity Procurement"}
              </div>
            </div>

            <div className="bg-[#FAF8F3] border border-slate-200/90 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="h-10 w-10 rounded-xl bg-sky-50 text-sky-800 grid place-items-center">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                  {t("div_monitoring", "Monitoring & Evaluation Division")}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "div_monitoring_desc",
                    "Tracks distribution to health centers, formulary adherence, stock integrity, and primary healthcare outcomes across all 20 Dzongkhags."
                  )}
                </p>
              </div>
              <div className="text-[11px] font-mono font-semibold text-sky-800 pt-2 border-t border-slate-200/70">
                {isDzongkha ? "སྤུས་ཚད་དང་ བདེན་དཔྱད།" : "Quality & Verification"}
              </div>
            </div>
          </div>

          {/* Reference Link to Organization & Organogram */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>
              {isDzongkha
                ? "བདག་སྐྱོང་གི་གོ་རིམ་དང་ སྙན་ཞུའི་ལམ་ལུགས་རྒྱས་པ་གཟིགས་ནིའི་དོན་ལུ་:"
                : "To view the overarching governance hierarchy and reporting lines:"}
            </span>
            <Link
              to="/about/organization"
              className="inline-flex items-center gap-1.5 font-semibold text-emerald-800 hover:text-emerald-950 transition"
            >
              <span>
                {isDzongkha
                  ? "ལས་ཁུངས་དང་བཀོད་རིམ་རེའུ་མིག་ (Organogram) ནང་གཟིགས།"
                  : "View Organizational Chart (Organogram) in Organization & Mandate"}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Secretariat Staff Profiles: Large Cards with DHI-Style Interactive Hover Reveal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-roster">
        <SectionEditBadge
          label="Secretariat Personnel Roster"
          pageSlug="about-secretariat"
          sectionId="secretariat-roster"
          studioHref="/admin/page-editor?slug=about-secretariat"
          initialData={{
            title: "Secretariat Directorate & Officers",
            subtitle: "Dedicated professionals managing fiduciary operations, international commodity procurement, and statutory compliance.",
            badge: "Executive Leadership & Key Personnel",
          }}
        />

        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
            {isDzongkha ? "ལག་ལེན་དབུ་ཁྲིད་དང་ གཙོ་བོའི་འགོ་དཔོན་ཚུ།" : "Executive Leadership & Key Personnel"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            {isDzongkha ? "དབུ་ཁྲིད་དང་ གཙོ་བོའི་འགོ་དཔོན་ཚུ།" : "Executive Directorate & Key Personnel"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light max-w-2xl mx-auto">
            {isDzongkha
              ? "ཁ་གསལ་གཟིགས་ནིའི་དོན་ལུ་ འགོ་དཔོན་གྱི་པར་གུར་ མཛུབ་རིས་ (Hover) བཞག་གནང་། འགོ་དཔོན་རེ་རེ་བཞིན་གྱི་ ལོ་རྒྱུས་དང་ འགན་ཁུར་ འབྲེལ་གཏུགས་ཚུ་ གསལ་ཏོག་ཏོ་སྦེ་ མཐོང་ཚུགས།"
              : "Hover over any profile card to reveal institutional biographies, statutory responsibilities, and official contact channels."}
          </p>
          <div className="pt-2 flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>{isDzongkha ? "པར་གུར་ Hover འབད་དེ་ ཁ་གསལ་གཟིགས།" : "Interactive Hover Reveal (DHI Style)"}</span>
            </span>
          </div>
        </div>

        {/* 1. Director Featured Leadership Card (#1 Dr. Gyambo Sithey, PhD) */}
        <div className="max-w-xl mx-auto mb-10 sm:mb-14">
          <SecretariatMemberCard
            member={secretariatMembers[0]}
            isActive={activeCardId === secretariatMembers[0].id}
            onToggle={() => handleToggleCard(secretariatMembers[0].id)}
            isDzongkha={isDzongkha}
          />
        </div>

        {/* 2. Key Officers & Staff Large 2-Column Grid (#2 Sonam Chojay, #3 Thinley Wangchuk, #4 Rinchen Phuntsho, #5 Tshering Choden) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {secretariatMembers.slice(1).map((member) => (
            <SecretariatMemberCard
              key={member.id}
              member={member}
              isActive={activeCardId === member.id}
              onToggle={() => handleToggleCard(member.id)}
              isDzongkha={isDzongkha}
            />
          ))}
        </div>
      </section>

      {/* Secretariat Official Contact Details & Office Location (Section 7) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="secretariat-contact">
        <SectionEditBadge
          label="Secretariat Contact & HQ"
          pageSlug="about-secretariat"
          sectionId="secretariat-contact"
          studioHref="/admin/settings"
          initialData={{
            title: "Bhutan Health Trust Fund Office",
            subtitle: "Lower Motithang, Thori Lam, Thimphu, Bhutan",
            badge: "Section 7 • Official Contact",
          }}
        />
        <div className="bg-gradient-to-br from-slate-900 via-[#071914] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              {isDzongkha ? "དབྱེ་ཚན་ ༧ • གཞུང་འབྲེལ་འབྲེལ་གཏུགས།" : "Section 7 • Official Contact"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {isDzongkha ? "འབྲུག་གསོ་བའི་བློ་གཏད་མ་དངུལ་གྱི་ ཡིག་ཚང་།" : "Bhutan Health Trust Fund Office"}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl">
              {isDzongkha
                ? "འདྲི་དཔྱད་ག་ཅི་ཡོད་རུང་ གློག་འཕྲིན་ bhtf@bhtf.bt ཡང་ན་ ཐིམ་ཕུག་ལུ་ཡོད་པའི་ མ་དངུལ་གྱི་ཡིག་ཚང་ལུ་ འབྲེལ་བ་འཐབ་གནང་།"
                : "For any enquiries, please contact us at bhtf@bhtf.bt or visit the BHTF office in Thimphu."}
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-200 shrink-0">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>{t("topbar_address", "Lower Motithang, Thimphu")}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>02-338636 / 338637 / 77348083</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>bhtf@bhtf.bt</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-300 font-mono">
              <span className="font-bold">WhatsApp:</span>
              <span>77348083</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Bottom Navigation Capsule for About Sub-Pages */}
      <AboutBottomCapsule />
    </div>
  );
}
