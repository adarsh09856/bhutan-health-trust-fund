import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import {
  Building2,
  Users2,
  TrendingUp,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Briefcase,
  Layers,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import drGyamboDirector from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";
import staffThinley from "@/assets/bhtf/secretariat/thinley_wangchuk.jpg";
import staffSonamChojay from "@/assets/bhtf/secretariat/sonam_chojay.jpg";
import staffFinance from "@/assets/bhtf/secretariat/tshering_choden.jpg";
import staffProcurement from "@/assets/bhtf/secretariat/rinchen_phuntsho.jpg";

export const Route = createFileRoute("/about/secretariat")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "about-secretariat" } }).catch(() => null);
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
      { title: "Secretariat & Organogram | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Secretariat organizational structure, Director's office, approved division staffing cadres (Annexure 1), and operational leadership of BHTF.",
      },
    ],
  }),
  component: SecretariatPage,
});

function SecretariatPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Executive Operations"
        title="Secretariat & Organizational Structure"
        subtitle="The executive arm executing daily health endowment investments, international vaccine procurement, and primary medicine distributions across Bhutan."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Secretariat & Organogram" },
        ]}
      />

      {/* Sub-Navigation Pill Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex items-center justify-start sm:justify-start gap-2 text-xs font-bold overflow-x-auto no-scrollbar sm:flex-wrap">
          <Link
            to="/about/organization"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Our Organization
          </Link>
          <Link
            to="/about/trustees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Board of Trustees
          </Link>
          <Link
            to="/about/committees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
          >
            Asset Management Committee
          </Link>
          <Link
            to="/about/secretariat"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs shrink-0 whitespace-nowrap"
          >
            Secretariat & Organogram
          </Link>
          <Link
            to="/our-story"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition shrink-0 whitespace-nowrap"
          >
            Our Story & History →
          </Link>
        </div>
      </section>

      {/* Annexure 1: Organizational Structure Visual Tree */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block mb-2">
            Approved Organogram • Annexure 1
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Organizational Structure of the Secretariat
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Formally approved governance hierarchy illustrating the direct line of accountability from the Board of Trustees to operational divisions.
          </p>
        </div>

        {/* Tree Container */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          {/* Top Level: Board of Trustees */}
          <div className="max-w-md mx-auto">
            <div className="bg-slate-900 text-white rounded-2xl p-5 text-center shadow-lg border border-amber-400/40">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold block mb-1">
                Apex Governing Authority
              </span>
              <h3 className="font-serif text-lg font-bold">Board of Trustees</h3>
              <p className="text-[11px] text-slate-300 mt-1 font-light">
                Chaired by Lyonpo, Ministry of Health, Royal Government of Bhutan
              </p>
            </div>
          </div>

          {/* Stem Down */}
          <div className="w-px h-8 bg-slate-300 mx-auto" />

          {/* Second Level: AMC and Director */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white border border-amber-300/80 rounded-2xl p-5 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block mb-1">
                Fiduciary Advisory Body
              </span>
              <h4 className="font-serif text-base font-bold text-slate-900">
                Asset Management Committee (AMC)
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Direct statutory advisory to the Board
              </p>
            </div>

            <div className="bg-white border-2 border-emerald-700 rounded-2xl p-5 text-center shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block mb-1">
                Executive Leadership
              </span>
              <h4 className="font-serif text-base font-bold text-slate-900">
                Director / Executive Secretary
              </h4>
              <p className="text-xs text-slate-500 mt-1 font-light">
                Executive Head of Secretariat Operations
              </p>
            </div>
          </div>

          {/* Stem Down */}
          <div className="w-px h-8 bg-slate-300 mx-auto" />

          {/* Third Level: 3 Operational Divisions (Annexure 1 Cadre) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Division 1: Investment Management */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Investment Management Division
                </h4>
                <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed">
                  Responsible for capital endowment preservation, asset diversification, multi-currency treasury oversight, and yield optimization.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                  Approved Cadre
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Chief of Division</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Investment Officer</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
              </div>
            </div>

            {/* Division 2: Administration & Finance */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center mb-3">
                  <Building2 className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Administration & Finance Division
                </h4>
                <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed">
                  Directs statutory accounting, audit compliance, financial reconciliation, secretariat administration, and HR logistics.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-1.5 text-xs text-slate-700">
                <div className="font-bold text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                  Approved Cadre
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Personal Assistant (PA)</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Accountant</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Administrative Assistant</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Driver / Peon</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Security Guard / Sweeper</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
              </div>
            </div>

            {/* Division 3: Programme Division */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center mb-3">
                  <Activity className="h-5 w-5" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-900">
                  Programme Division
                </h4>
                <p className="text-xs text-slate-600 mt-2 font-light leading-relaxed">
                  Supervises national vaccine requisitions, 438 essential medicines, 110 traditional medicines (65 core formulations), international procurement, and alpine solar cold chain logistics.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-[11px] text-slate-500 uppercase tracking-wider font-mono">
                  Approved Cadre
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Chief Programme Officer</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
                <div className="flex items-center justify-between font-medium">
                  <span>• Programme Officer</span>
                  <span className="font-mono text-slate-600 font-bold">1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secretariat Staff Profiles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block mb-2">
            Executive Leadership & Key Personnel
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Secretariat Directorate & Officers
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Dedicated professionals managing fiduciary operations, international commodity procurement, and statutory compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Director Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={drGyamboDirector}
                  alt="Dr. Gyambo Sithey, PhD"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block">
                  Directorate
                </span>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">Dr. Gyambo Sithey, PhD</h3>
                <p className="text-xs font-semibold text-teal-700">Director / Member Secretary</p>
              </div>
            </div>
            <div className="px-5 pb-5 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
              Cabinet Order C-3/4(4)/2024/35
            </div>
          </div>

          {/* 2. Senior Investment Officer Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={staffThinley}
                  alt="Mr. Thinley Wangchuk"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full inline-block">
                  Investment Management Division
                </span>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">Mr. Thinley Wangchuk</h3>
                <p className="text-xs font-semibold text-teal-700">Senior Investment Officer</p>
              </div>
            </div>
            <div className="px-5 pb-5 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
              Portfolio & Yield Operations
            </div>
          </div>

          {/* 3. Senior Program Officer Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={staffFinance}
                  alt="Ms. Tshering Choden"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block">
                  Programme Division
                </span>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">Ms. Tshering Choden</h3>
                <p className="text-xs font-semibold text-emerald-700">Senior Program Officer</p>
              </div>
            </div>
            <div className="px-5 pb-5 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
              Essential Drugs & Cold Chain Logistics
            </div>
          </div>

          {/* 4. Accounts Officer Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={staffSonamChojay}
                  alt="Mr. Sonam Chojay"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full inline-block">
                  Administration & Finance
                </span>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">Mr. Sonam Chojay</h3>
                <p className="text-xs font-semibold text-amber-700">Accounts Officer</p>
              </div>
            </div>
            <div className="px-5 pb-5 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
              Window Financing Ledgers
            </div>
          </div>

          {/* 5. Driver Card */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={staffProcurement}
                  alt="Mr. Rinchen Phuntsho"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full inline-block">
                  Administration & Finance
                </span>
                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">Mr. Rinchen Phuntsho</h3>
                <p className="text-xs font-semibold text-slate-700">Driver</p>
              </div>
            </div>
            <div className="px-5 pb-5 text-[10px] text-slate-400 font-mono border-t border-slate-100 pt-3">
              Fleet & Essential Cold Transit
            </div>
          </div>
        </div>
      </section>

      {/* Secretariat Contact Details & Office Location */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#071914] to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
              Secretariat Headquarters
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Bhutan Health Trust Fund Office
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light max-w-xl">
              Operating from the BTFEC Office Building in Genyen Lam, Thimphu, serving all primary healthcare units across the Kingdom.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-200 shrink-0">
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <span>BTFEC Office Building, Genyen Lam, Thimphu, Bhutan</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>+975 2 322424</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-emerald-400" />
              <span>bhtf@bhtf.bt</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
