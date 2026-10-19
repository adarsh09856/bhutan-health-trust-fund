import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowRight,
  Pill,
  Syringe,
  ThermometerSnowflake,
  FileText,
  Calendar,
  MessageCircle,
  Play,
  CheckCircle2,
  Building2,
  Scale,
  Award,
  Download,
  Phone,
  Mail,
} from "lucide-react";

import kingHeroWidescreen from "@/assets/king_hero_widescreen.jpg";

// Client Field Photos
import imgDispensary from "@/assets/field/bhtf_dispensary_pharmacist.jpg";
import imgCubicles from "@/assets/field/bhtf_medicine_cubicles.jpg";
import imgCitizen from "@/assets/field/bhtf_citizen_receiving_medicine.jpg";
import imgCentralStore from "@/assets/field/bhtf_central_store.jpg";
import imgBbs from "@/assets/field/bhtf_bbs_broadcast.jpg";
import imgVaccineVial from "@/assets/field/bhtf_flu_vaccine_vial.jpg";
import imgTraditionalMed from "@/assets/field/bhtf_traditional_medicine.png";
import imgMaternalCare from "@/assets/field/bhtf_maternal_child_care.jpg";

// Partner Logos
import logoRgob from "@/assets/bhtf/partners/rgob.png";
import logoWho from "@/assets/bhtf/partners/who.jpg";
import logoUnicef from "@/assets/bhtf/partners/unicef.png";
import logoAdb from "@/assets/bhtf/partners/adb.jpg";
import logoGates from "@/assets/bhtf/partners/bill_gates_foundation.png";
import logoSaveChildren from "@/assets/bhtf/partners/save_the_children.png";
import logoSumitomo from "@/assets/bhtf/partners/sumitomo.png";
import logoAusAid from "@/assets/bhtf/partners/aus_aid.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bhutan Health Trust Fund — Building a Healthier Bhutan" },
      {
        name: "description",
        content:
          "Bhutan Health Trust Fund sustainably finances essential medicines and vaccines for every Bhutanese citizen across all 20 Dzongkhags.",
      },
    ],
  }),
  component: HomePage,
});

const QUICK_LINKS = [
  {
    icon: Pill,
    label: "Essential Medicines",
    sub: "438 Modern Formulations",
    color: "bg-soft-blue text-primary",
    to: "/our-work",
  },
  {
    icon: Syringe,
    label: "Vaccine Security",
    sub: "100% Childhood & Flu",
    color: "bg-amber-50 text-amber-800 border border-amber-200/60",
    to: "/our-work",
  },
  {
    icon: Sparkles,
    label: "Traditional Medicine",
    sub: "110 gSo-ba Rig-pa Formulations",
    color: "bg-soft-green text-[oklch(0.45_0.15_155)]",
    to: "/our-work",
  },
  {
    icon: ThermometerSnowflake,
    label: "Cold Chain Network",
    sub: "20 Dzongkhags Monitoring",
    color: "bg-soft-purple text-[oklch(0.5_0.18_290)]",
    to: "/our-impact",
  },
  {
    icon: ShieldCheck,
    label: "Universal Access",
    sub: "100% Free at Point of Care",
    color: "bg-soft-red text-[oklch(0.55_0.2_25)]",
    to: "/about",
  },
  {
    icon: Scale,
    label: "Window Financing",
    sub: "Quarterly DMS Releases",
    color: "bg-soft-blue text-primary",
    to: "/resources/annual-reports",
  },
];

const STATS = [
  { value: "Nu. 4.8B+", label: "Sovereign Endowment", sub: "Ring-fenced principal", icon: ShieldCheck },
  { value: "100%", label: "Free Primary Healthcare", sub: "Zero out-of-pocket costs", icon: Heart },
  { value: "438 + 110", label: "Medicines & Formulations", sub: "Modern + Traditional", icon: Pill },
  { value: "20 / 20", label: "Dzongkhags Covered", sub: "205 gewog health units", icon: Users },
  { value: "1:1", label: "Sovereign Match", sub: "Guaranteed by RGoB", icon: Sparkles },
];

const NEWS = [
  {
    title: "BBS Special Report: BHTF Ensures Unbroken Pharmaceutical Reserves Across Remote Gewogs",
    date: "14 October 2026",
    img: imgBbs,
    to: "/news",
    source: "BBS TV News",
  },
  {
    title: "Annual Seasonal Influenza Vaccination Rollout Achieves 97.4% Target Coverage",
    date: "28 September 2026",
    img: imgVaccineVial,
    to: "/news",
    source: "MOH / BHTF",
  },
  {
    title: "Expansion of Indigenous gSo-ba Rig-pa Therapies Across Regional Traditional Hospitals",
    date: "15 September 2026",
    img: imgTraditionalMed,
    to: "/news",
    source: "Traditional Medicine Division",
  },
];

const UPCOMING_EVENTS = [
  {
    month: "NOV",
    day: "11",
    title: "Annual BHTF Day 2026",
    desc: "Commemoration of the Sovereign Healthcare Endowment & Public Accountability Filing.",
    place: "Clock Tower & BHTF Headquarters, Thimphu",
  },
  {
    month: "DEC",
    day: "17",
    title: "National Crowd Fundraising Initiative",
    desc: "Strategic public health mobilization in collaboration with the Royal Securities Exchange of Bhutan (RSEB).",
    place: "RSEB Financial Centre, Thimphu & Nationwide Online",
  },
];

const FIELD_DISPATCHES = [
  {
    img: imgDispensary,
    tag: "Hospital Outpatient Dispensary",
    title: "Essential Medicines Dispensed Free of Charge",
    caption: "Uniformed hospital pharmacists dispense verified pharmaceuticals directly to citizens under royal mandate.",
    badge: "100% Free at Point of Delivery",
  },
  {
    img: imgCubicles,
    tag: "District Hospital Inventory",
    title: "Organized Cubicle Storage & Batch Control",
    caption: "Modular inventory cubicles maintaining zero-stockout levels of essential medicines in district health centers.",
    badge: "Zero Stockout Protocol",
  },
  {
    img: imgCitizen,
    tag: "Universal Healthcare Guarantee",
    title: "No Citizen Billed for Care",
    caption: "A Bhutanese citizen receiving life-saving prescription medicines at the hospital counter without payment.",
    badge: "Sacred Constitutional Trust",
  },
  {
    img: imgCentralStore,
    tag: "Central Medical Store Warehouse",
    title: "Strategic Multi-Month National Reserves",
    caption: "High-capacity pallet racking shielding the Kingdom against international pharmaceutical supply chain interruptions.",
    badge: "National Supply Buffer",
  },
];

const FIDUCIARY_ROWS = [
  {
    label: "Sovereign Health Corpus (Endowment Principal)",
    figure: "Nu. 4,798,965,306.85",
    subtext: "Ring-fenced statutory capital invested under Royal Charter (~Nu. 4.8B as of 30 June 2026).",
  },
  {
    label: "Annual Commodity Procurement Yield Disbursement",
    figure: "Nu. 557,734,000",
    subtext: "Disbursed quarterly for 438 essential drugs, 110 traditional remedies, and 4 routine vaccines.",
  },
  {
    label: "Cumulative Procurement Disbursements (1998–2026)",
    figure: "Nu. 4,370,000,000+",
    subtext: "Direct financing for essential healthcare commodities without depleting the core corpus.",
  },
  {
    label: "Citizens Protected Across 20 Dzongkhags",
    figure: "780,000+",
    subtext: "Universal healthcare guarantee delivered across all 205 remote gewog Primary Health Units.",
  },
  {
    label: "Essential Medicines & Traditional Formulations",
    figure: "438 Modern + 110 Traditional",
    subtext: "100% of National Essential Drugs List and 110 core gSo-ba Rig-pa formulations.",
  },
  {
    label: "Routine National Immunization Coverage",
    figure: "97.4% – 99.8%",
    subtext: "Pentavalent (98.9%), PCV (98.7%), Seasonal Influenza (97.4%), and HPV (99.8%).",
  },
];

const DZONGKHAG_DATA = [
  {
    region: "Western Region",
    dzongkhags: [
      { name: "Thimphu", bhus: "1 Regional Referral + 18 PHUs", allocation: "100% Buffer" },
      { name: "Chhukha", bhus: "1 General Hosp + 14 PHUs", allocation: "100% Buffer" },
      { name: "Paro", bhus: "1 District Hosp + 12 PHUs", allocation: "100% Buffer" },
      { name: "Haa", bhus: "1 District Hosp + 8 PHUs", allocation: "100% Buffer" },
      { name: "Samtse", bhus: "1 District Hosp + 16 PHUs", allocation: "100% Buffer" },
    ],
  },
  {
    region: "Central Region",
    dzongkhags: [
      { name: "Bumthang", bhus: "1 District Hosp + 8 PHUs", allocation: "100% Buffer" },
      { name: "Trongsa", bhus: "1 District Hosp + 9 PHUs", allocation: "100% Buffer" },
      { name: "Sarpang", bhus: "1 Regional Referral + 14 PHUs", allocation: "100% Buffer" },
      { name: "Zhemgang", bhus: "1 District Hosp + 13 PHUs", allocation: "100% Buffer" },
      { name: "Dagana", bhus: "1 District Hosp + 11 PHUs", allocation: "100% Buffer" },
      { name: "Tsirang", bhus: "1 District Hosp + 12 PHUs", allocation: "100% Buffer" },
      { name: "Wangdue Phodrang", bhus: "1 District Hosp + 15 PHUs", allocation: "100% Buffer" },
      { name: "Punakha", bhus: "1 District Hosp + 11 PHUs", allocation: "100% Buffer" },
      { name: "Gasa", bhus: "1 District Hosp + 4 PHUs", allocation: "100% Buffer" },
    ],
  },
  {
    region: "Eastern Region",
    dzongkhags: [
      { name: "Mongar", bhus: "1 Regional Referral + 21 PHUs", allocation: "100% Buffer" },
      { name: "Trashigang", bhus: "1 District Hosp + 20 PHUs", allocation: "100% Buffer" },
      { name: "Trashiyangtse", bhus: "1 District Hosp + 9 PHUs", allocation: "100% Buffer" },
      { name: "Lhuentse", bhus: "1 District Hosp + 10 PHUs", allocation: "100% Buffer" },
      { name: "Pemagatshel", bhus: "1 District Hosp + 11 PHUs", allocation: "100% Buffer" },
      { name: "Samdrup Jongkhar", bhus: "1 District Hosp + 13 PHUs", allocation: "100% Buffer" },
    ],
  },
];

const PARTNERS = [
  { name: "Royal Government of Bhutan", role: "Founding Sovereign & 1:1 Match", logo: logoRgob },
  { name: "World Health Organization", role: "Global Technical Partner", logo: logoWho },
  { name: "UNICEF", role: "Cold Chain & Vaccine Logistics", logo: logoUnicef },
  { name: "Asian Development Bank", role: "Development Partner", logo: logoAdb },
  { name: "Bill & Melinda Gates Foundation", role: "Philanthropic Grantor", logo: logoGates },
  { name: "Save the Children", role: "Maternal & Child Health", logo: logoSaveChildren },
  { name: "Sumitomo Mitsui Banking Corp", role: "Institutional Grantor", logo: logoSumitomo },
  { name: "Australian Aid", role: "Bilateral Partner (ACCF)", logo: logoAusAid },
];

function HomePage() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. HERO SECTION (Widescreen King Portrait on desktop, dedicated royal card on mobile) */}
      <section className="relative overflow-hidden min-h-[520px] lg:min-h-[640px] xl:min-h-[680px] flex items-center border-b border-border bg-[#F5F2EB] md:bg-[#BFA26F]">
        {/* Full Seamless Portrait Background with His Majesty clearly on the right on desktop */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-no-repeat bg-right lg:bg-center"
          style={{ backgroundImage: `url(${kingHeroWidescreen})` }}
        />

        <div className="container-page py-10 sm:py-12 lg:py-20 relative z-10 w-full">
          {/* Left Column: Vision, Royal Mandate & Shorter Transparent Quote */}
          <div className="max-w-2xl lg:max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 text-amber-300 px-3.5 py-1 text-xs font-semibold mb-4 sm:mb-5 border border-amber-400/30 shadow-xs backdrop-blur-md">
              <Sparkles className="size-3.5 text-amber-400" />
              <span>1:1 Sovereign Match</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tight">
              Building a<br className="hidden sm:inline" /> Healthier Bhutan
            </h1>

            <div className="h-1.5 w-20 sm:w-24 bg-amber-500 rounded-full my-4 sm:my-5" />

            <p className="text-sm sm:text-base lg:text-lg text-slate-800 sm:text-slate-900/90 font-medium leading-relaxed">
              The Bhutan Health Trust Fund sustainably finances essential medicines and vaccines to strengthen primary
              healthcare and protect the well-being of every Bhutanese citizen.
            </p>

            {/* Mobile-only King portrait banner so His Majesty is prominently visible and respectful, with ZERO text overlapping his face */}
            <div className="md:hidden my-5 rounded-2xl overflow-hidden border border-amber-600/30 shadow-md bg-white">
              <div className="aspect-[16/11] w-full overflow-hidden bg-slate-100">
                <img
                  src={kingHeroWidescreen}
                  alt="His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck"
                  className="w-full h-full object-cover object-[75%_center]"
                />
              </div>
              <div className="p-3.5 bg-white border-t border-slate-100 text-center space-y-1">
                <p className="text-xs font-bold text-slate-900 italic leading-snug">
                  “No Bhutanese should ever have to choose between their health and their livelihood.”
                </p>
                <div className="text-[11px] font-semibold text-emerald-800">
                  HM the Fourth Druk Gyalpo Jigme Singye Wangchuck
                </div>
              </div>
            </div>

            {/* Desktop Shorter, Transparent Frosted Glass Royal Vision Callout */}
            <div className="hidden md:block my-5 p-3 sm:p-3.5 rounded-2xl bg-white/75 backdrop-blur-md border border-white/80 shadow-xs space-y-1.5 max-w-lg">
              <p className="text-xs sm:text-sm font-bold text-slate-900 italic leading-snug">
                “No Bhutanese should ever have to choose between their health and their livelihood.”
              </p>
              <div className="flex items-center gap-2 pt-1 border-t border-slate-900/10">
                <span className="size-1.5 rounded-full bg-amber-500" />
                <span className="text-[11px] font-bold text-slate-900">
                  HM the Fourth Druk Gyalpo Jigme Singye Wangchuck
                </span>
                <span className="text-[10px] text-slate-600 hidden sm:inline">(2004)</span>
              </div>
            </div>

            {/* Action CTA Pills: Clean, responsive layout */}
            <div className="mt-6 sm:mt-7 flex flex-wrap gap-3 items-center">
              <Link
                to="/donate"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B4F42] hover:bg-[#073C32] px-6 py-3 text-sm font-bold text-white shadow-elevated transition active:scale-95 flex-1 sm:flex-none"
              >
                <Heart className="size-4 fill-current text-amber-300" />
                <span>Donate (1:1 Sovereign Match)</span>
              </Link>

              <Link
                to="/our-impact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white hover:bg-slate-50 border border-slate-300 px-6 py-3 text-sm font-bold text-slate-900 shadow-xs transition active:scale-95 flex-1 sm:flex-none"
              >
                <span>Explore Our Impact</span>
                <ArrowRight className="size-4 text-emerald-800" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK LINKS PILL CARDS */}
      <section className="container-page -mt-4 sm:-mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-elevated p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 border border-border">
          {QUICK_LINKS.map((q) => (
            <Link
              key={q.label}
              to={q.to}
              className="group flex flex-col items-center text-center p-3 rounded-xl hover:bg-muted transition"
            >
              <div className={`size-13 rounded-full grid place-items-center ${q.color} mb-2 group-hover:scale-105 transition`}>
                <q.icon className="size-5" />
              </div>
              <div className="text-xs sm:text-sm font-bold text-foreground leading-tight">{q.label}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5 leading-tight">{q.sub}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. GRADIENT STATS BAND */}
      <section className="container-page mt-12 sm:mt-16">
        <div className="bg-gradient-stats rounded-3xl p-6 sm:p-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-white shadow-elevated">
          {STATS.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="size-12 rounded-full bg-white/10 grid place-items-center text-amber-300 shrink-0 border border-white/15">
                <s.icon className="size-6" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold leading-tight">{s.value}</div>
                <div className="text-xs text-white/90 font-medium leading-tight mt-0.5">{s.label}</div>
                <div className="text-[10px] text-white/60 leading-tight">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 3-COLUMN SECTION: LATEST NEWS | UPCOMING EVENTS | PUBLICATIONS */}
      <section className="container-page mt-14 sm:mt-16 grid lg:grid-cols-3 gap-6">
        {/* Col 1: Latest News with BBS Broadcast */}
        <div className="bg-white rounded-3xl shadow-card p-6 border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  Media & Dispatches
                </span>
                <h3 className="font-bold text-lg text-primary">Latest News</h3>
              </div>
              <Link to="/news" className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline">
                View All <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {NEWS.map((n) => (
                <Link key={n.title} to={n.to} className="flex gap-3 group cursor-pointer">
                  <div className="size-20 rounded-xl overflow-hidden shadow-2xs shrink-0 border border-border bg-slate-100">
                    <img src={n.img} alt={n.title} className="size-full object-cover group-hover:scale-105 transition" />
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-snug group-hover:text-emerald-800 transition line-clamp-2">
                      {n.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-1.5 flex items-center gap-1.5 font-medium">
                      <span>{n.date}</span>
                      <span>•</span>
                      <span className="text-primary font-semibold">{n.source}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Upcoming Events (11 Nov BHTF Day & 17 Dec RSEB) */}
        <div className="bg-white rounded-3xl shadow-card p-6 border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  Official Calendar
                </span>
                <h3 className="font-bold text-lg text-primary">Upcoming Events</h3>
              </div>
              <Link to="/news" className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline">
                Calendar <ArrowRight className="size-3" />
              </Link>
            </div>

            <div className="space-y-5">
              {UPCOMING_EVENTS.map((e) => (
                <div key={e.title} className="flex gap-3.5 items-start">
                  <div className="rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center w-14 h-14 shrink-0 leading-none border border-emerald-200/80 shadow-2xs">
                    <div className="text-center">
                      <div className="text-[10px] font-black uppercase tracking-wider">{e.month}</div>
                      <div className="text-xl font-black mt-0.5">{e.day}</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground leading-snug">{e.title}</div>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{e.desc}</p>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                      <span>📍 {e.place}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-soft-blue text-xs text-primary font-medium border border-primary/20">
            Commemorating 26 years of universal primary healthcare financing.
          </div>
        </div>

        {/* Col 3: Key Publications & Formularies */}
        <div className="bg-white rounded-3xl shadow-card p-6 border border-border flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  Statutory Register
                </span>
                <h3 className="font-bold text-lg text-primary">Certified Publications</h3>
              </div>
              <Link to="/reports" className="text-xs text-emerald-800 font-bold inline-flex items-center gap-1 hover:underline">
                Audit Vault <ArrowRight className="size-3" />
              </Link>
            </div>

            <ul className="space-y-3">
              {[
                { title: "Annual Audit Report (FY 2024–2025)", ref: "RAA-BHTF-2025-01", type: "RAA Certified PDF" },
                { title: "National Essential Drugs Formulary (8th Edition)", ref: "MOH-EDP-2024", type: "438 Modern Formulations" },
                { title: "Traditional Medicine Formulary (gSo-ba Rig-pa)", ref: "DTMS-BHTF-V2", type: "110 Remedies & Therapies" },
                { title: "Window Financing Operational Manual", ref: "SOP-WF-2024", type: "Quarterly DMS Protocols" },
              ].map((pub) => (
                <li key={pub.title} className="p-2.5 rounded-xl border border-border hover:border-emerald-400 hover:bg-slate-50 transition group">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <FileText className="size-4 text-primary shrink-0 mt-0.5 group-hover:text-emerald-700 transition" />
                      <div>
                        <div className="text-xs font-bold text-foreground leading-snug group-hover:text-primary">
                          {pub.title}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{pub.ref} • {pub.type}</div>
                      </div>
                    </div>
                    <Download className="size-3.5 text-muted-foreground group-hover:text-emerald-700 shrink-0" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-5">
            <Link
              to="/reports"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-primary text-xs font-bold transition text-center"
            >
              <span>Access All Statutory Audit Filings</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. AUTHENTIC PHOTO FIELD DISPATCHES */}
      <section className="container-page mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-saffron font-mono">
              <ShieldCheck className="size-3.5" />
              <span>Authentic Field Operations • No Stock Photos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mt-1">
              Field Operations & Nationwide Healthcare Logistics
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mt-1">
              Photographs documenting the real-world impact of BHTF across hospitals, remote gewog dispensaries, and national warehouses.
            </p>
          </div>
          <Link
            to="/our-impact"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-saffron transition shrink-0"
          >
            <span>Explore Full Impact Portfolio</span>
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FIELD_DISPATCHES.map((d) => (
            <div
              key={d.title}
              className="bg-white rounded-3xl overflow-hidden border border-border shadow-card flex flex-col group hover:shadow-elevated transition-all duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={d.img}
                  alt={d.title}
                  className="size-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-[10px] font-bold">
                  {d.tag}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-sm font-bold text-primary leading-snug group-hover:text-saffron transition">
                    {d.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {d.caption}
                  </p>
                </div>
                <div className="pt-2 border-t border-border flex items-center justify-between text-[11px] font-semibold text-primary">
                  <span>{d.badge}</span>
                  <CheckCircle2 className="size-3.5 text-saffron shrink-0" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TRADITIONAL MEDICINE & THERAPIES (gSo-ba Rig-pa) SHOWCASE */}
      <section className="container-page mt-16 sm:mt-20">
        <div className="rounded-3xl bg-soft-green/60 border border-[oklch(0.85_0.08_155)] p-6 sm:p-10 lg:p-12 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[oklch(0.4_0.15_155)]">
              gSo-ba Rig-pa • Traditional Medicine Financing
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-primary">
              Preserving Bhutan’s Sacred Healing Heritage: 110 Traditional Formulations
            </h3>
            <p className="text-sm text-foreground/80 leading-relaxed">
              In accordance with Royal Charter mandate, BHTF finances not only modern pharmaceuticals but also 110 essential
              traditional medicines (gSo-ba Rig-pa) manufactured at the National Traditional Medicine Hospital in Thimphu.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { title: "110 Formulations", desc: "Herbal pills, powders, decoctions, and mineral remedies." },
                { title: "Traditional Therapies", desc: "Chulum herbal baths, Lang-dug herbal steam, and Dug-pob." },
                { title: "20 Dzongkhags Reach", desc: "Dispensed at traditional units in all district hospitals." },
                { title: "100% Free Access", desc: "Zero patient billing for authentic indigenous healthcare." },
              ].map((item) => (
                <div key={item.title} className="p-3 rounded-2xl bg-white/90 border border-[oklch(0.85_0.08_155)] shadow-2xs">
                  <div className="text-xs font-bold text-primary">{item.title}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-white aspect-[4/3] bg-white">
            <img
              src={imgTraditionalMed}
              alt="Traditional Bhutanese Medicines and Therapies (gSo-ba Rig-pa)"
              className="size-full object-cover"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2 text-white text-[11px] text-center font-medium">
              Authentic gSo-ba Rig-pa essential traditional medications financed by BHTF
            </div>
          </div>
        </div>
      </section>

      {/* 7. STATUTORY FIDUCIARY LEDGER & 20 DZONGKHAGS MATRIX */}
      <section className="container-page mt-16 sm:mt-20">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-saffron">
            Audit Certified • Perpetual Stewardship
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Statutory Fiduciary & Operational Ledger
          </h2>
          <p className="text-sm text-muted-foreground">
            Audited financial benchmarks and nationwide commodity commitments under permanent trust stewardship.
          </p>
        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-3xl shadow-card border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {FIDUCIARY_ROWS.map((row) => (
              <div key={row.label} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50 transition">
                <div className="space-y-0.5 max-w-xl">
                  <div className="text-sm font-bold text-foreground">{row.label}</div>
                  <div className="text-xs text-muted-foreground">{row.subtext}</div>
                </div>
                <div className="text-base sm:text-lg font-bold text-primary font-mono sm:text-right shrink-0">
                  {row.figure}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted-foreground gap-2">
            <div>Source: Royal Audit Authority (RAA) Certified Statements & BHTF Secretariat Annual Filing</div>
            <Link to="/reports" className="text-saffron font-bold hover:underline">
              Download Certified RAA Audit Report →
            </Link>
          </div>
        </div>

        {/* 20 Dzongkhags Regional Distribution */}
        <div className="mt-10 bg-white rounded-3xl shadow-card border border-border p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-border gap-2">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-saffron">
                Equitable Kingdom-Wide Distribution
              </span>
              <h3 className="text-xl font-bold text-primary">Nationwide Coverage Across All 20 Dzongkhags</h3>
            </div>
            <div className="text-xs text-muted-foreground">205 Remote Gewogs • 100% Stockout Buffer</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DZONGKHAG_DATA.map((reg) => (
              <div key={reg.region} className="space-y-3">
                <div className="text-xs font-black uppercase tracking-wider text-primary pb-2 border-b-2 border-primary/20">
                  {reg.region}
                </div>
                <div className="divide-y divide-slate-100">
                  {reg.dzongkhags.map((d) => (
                    <div key={d.name} className="py-2 flex items-baseline justify-between text-xs">
                      <div>
                        <span className="font-bold text-foreground">{d.name}</span>
                        <span className="text-muted-foreground text-[11px] ml-1.5">({d.bhus})</span>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-primary bg-soft-blue px-2 py-0.5 rounded">
                        {d.allocation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. WHY SUPPORT BHTF + WHATSAPP INSTANT CHAT */}
      <section className="container-page mt-16 sm:mt-20 grid lg:grid-cols-[1.6fr_1fr] gap-6 items-stretch">
        <div className="rounded-3xl bg-gradient-to-br from-[#0B4F42] to-[#062822] text-white p-6 sm:p-10 grid sm:grid-cols-2 gap-8 items-center border border-emerald-600/30 shadow-card">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              Public Support & Sovereign 1:1 Match
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Why Support BHTF?</h3>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Every Ngultrum you contribute is permanently matched 1:1 by the Royal Government of Bhutan and tax deductible under DRC Registration No. E-73.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="size-4 text-amber-300 shrink-0" />
                <span>Zero administrative deduction from public donations</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="size-4 text-amber-300 shrink-0" />
                <span>Ring-fenced principal invested strictly under Royal Charter</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-white/90">
                <CheckCircle2 className="size-4 text-amber-300 shrink-0" />
                <span>Immediate tax deduction certificate issued</span>
              </div>
            </div>
            <div className="pt-2">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 rounded-full bg-white text-emerald-950 px-6 py-3 text-sm font-bold shadow-elevated hover:bg-emerald-50 transition"
              >
                <Heart className="size-4 fill-current text-rose-600" />
                <span>Make a Matched Contribution</span>
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-elevated aspect-[4/3] bg-white border border-white">
            <img src={imgMaternalCare} alt="Maternal and Child Healthcare in Bhutan" className="size-full object-cover" />
          </div>
        </div>

        {/* WhatsApp & Hotline Card */}
        <div className="rounded-3xl bg-white border border-border shadow-card p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <div className="size-12 rounded-2xl bg-[#25D366] text-white grid place-items-center shadow-card">
              <MessageCircle className="size-6 fill-current" />
            </div>
            <h3 className="text-xl font-bold text-primary">BHTF Direct Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect directly with our secretariat for contribution queries, tax deduction receipts, or general guidance.
            </p>
            <div className="pt-2 space-y-2 text-xs text-foreground font-medium">
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-saffron shrink-0" />
                <span>Landline: +975 2 328999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-saffron shrink-0" />
                <span>Email: bhtf@bhtf.bt</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <a
              href="https://wa.me/9752328999"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-3 text-xs font-bold hover:opacity-90 transition shadow-card"
            >
              <MessageCircle className="size-4 fill-current" />
              <span>Chat on WhatsApp (+975 2 328999)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. SOVEREIGN & MULTILATERAL PARTNERS STRIP */}
      <section className="container-page mt-16 sm:mt-24 mb-16">
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-saffron">
            Multilateral & Sovereign Alliances
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary">
            Sovereign & Multilateral Founding Partners
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            Established under Royal Charter in Geneva with initial endowment contributions from the Royal Government of Bhutan and international partners.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 items-center">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="group flex flex-col items-center justify-center p-3 rounded-2xl border border-border bg-white hover:border-saffron hover:shadow-card transition-all duration-200 text-center min-h-[110px]"
            >
              <div className="h-12 w-full flex items-center justify-center mb-2 px-1">
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-11 max-w-[90%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                />
              </div>
              <span className="text-[10px] font-bold text-foreground leading-tight line-clamp-1">
                {p.name}
              </span>
              <span className="text-[9px] text-muted-foreground mt-0.5 line-clamp-1">
                {p.role}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
