import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  Award,
  Target,
  Eye,
  Heart,
  Landmark,
  Scale,
  Building,
  CheckCircle2,
  FileText,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/about/organization")({
  head: () => ({
    meta: [
      { title: "Our Organization & Royal Charter Mandate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official profile of the Bhutan Health Trust Fund (BHTF), statutory founding under the Royal Charter, constitutional healthcare rights, and 2026 Vision & Mission.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

const corePillars = [
  {
    icon: Target,
    title: "Our Mission",
    dzongkha: "དམིགས་ཡུལ།",
    text: "To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for the financing of essential medicines, vaccines, and related health supplies.",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    icon: Eye,
    title: "Our Vision",
    dzongkha: "མཐོང་སྣང་།",
    text: "A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come.",
    color: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    icon: Heart,
    title: "Core Values",
    dzongkha: "གཞི་རྩའི་བརྩི་མཐོང་།",
    text: "Guided by Gross National Happiness, universal equity, zero procurement stockouts, compassion, absolute transparency, and fiduciary excellence.",
    color: "bg-rose-50 text-rose-800 border-rose-200",
  },
  {
    icon: Award,
    title: "Royal Charter Mandate",
    dzongkha: "རྒྱལ་པོའི་བཀའ་ཤོག",
    text: "Enacted by His Majesty the Fourth Druk Gyalpo as an autonomous statutory trust fund with permanent corpus protection and dedicated health procurement powers.",
    color: "bg-amber-50 text-amber-800 border-amber-200",
  },
];

function AboutOrganizationPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Institutional Profile"
        title="Our Organization & Royal Mandate"
        subtitle="A sacred sovereign institution established by Royal Charter to guarantee universal, equitable primary healthcare and life-saving medicines for all Bhutanese citizens in perpetuity."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Our Organization" },
        ]}
      />

      {/* Internal Navigation Sub-Bar */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-bold">
          <Link
            to="/about"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs"
          >
            Our Organization
          </Link>
          <Link
            to="/about"
            hash="trustees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
          >
            Board of Trustees
          </Link>
          <Link
            to="/about"
            hash="committees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
          >
            Asset Management Committee
          </Link>
          <Link
            to="/about"
            hash="organogram"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
          >
            Secretariat & Organogram
          </Link>
          <Link
            to="/our-story"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition"
          >
            Our Story & History →
          </Link>
        </div>
      </section>

      {/* 1. Sovereign Mandate & Legal Status */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold font-mono border border-emerald-200">
              <Landmark className="h-3.5 w-3.5 text-emerald-700" />
              <span>Article 9, Constitution of the Kingdom of Bhutan</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.12]">
              Healthcare as a Sacred Constitutional Guarantee
            </h2>

            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-light">
              <p>
                In the Kingdom of Bhutan, healthcare is not treated as a commodity, but as a fundamental human right guaranteed to every citizen. Under the benevolence and vision of His Majesty the Fourth Druk Gyalpo Jigme Singye Wangchuck, the Bhutan Health Trust Fund was established to ensure that universal access to free primary healthcare is safeguarded from economic volatility and international donor shifts.
              </p>
              <p>
                Operating as an independent statutory autonomous trust fund, BHTF manages a permanent sovereign endowment whose capital is preserved in perpetuity. The investment income earned annually is earmarked exclusively for procuring 100% of routine childhood vaccines, 120+ essential formulary medicines, and high-altitude solar cold chain infrastructure across all 205 remote gewogs in 20 Dzongkhags.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="font-serif text-2xl font-bold text-emerald-800 block">100%</span>
                <span className="font-bold text-slate-900 block">Universal Free Coverage</span>
                <p className="text-slate-500 font-light">Zero cost for vital drugs & childhood vaccines</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="font-serif text-2xl font-bold text-amber-700 block">Nu. 3.24B+</span>
                <span className="font-bold text-slate-900 block">Ring-Fenced Corpus</span>
                <p className="text-slate-500 font-light">Permanent endowment with capital preservation</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
                <span className="font-serif text-2xl font-bold text-teal-700 block">20 / 20</span>
                <span className="font-bold text-slate-900 block">Dzongkhags Buffer</span>
                <p className="text-slate-500 font-light">Uninterrupted stockouts buffer for 205 gewogs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Royal Charter Seal & Key Statutory Articles */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-800 border border-amber-300 grid place-items-center font-serif text-lg font-bold">
                  ༄
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900">Royal Charter Mandate</h3>
                  <span className="text-[11px] text-slate-500 font-mono">Issued 3 August 2000</span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                Statutory Authority
              </span>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-light">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Article 1 • Autonomous Legal Status</strong>
                  The Fund shall exist as an autonomous body with perpetual succession, common seal, and power to hold and dispose of property.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Lock className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Article 4 • Capital Ring-Fencing</strong>
                  The core capital of the Trust Fund shall remain inviolate; under no circumstances shall the capital corpus be liquidated for operational costs.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Scale className="h-4 w-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Article 7 • Royal Audit Authority (RAA)</strong>
                  All accounts and financial transactions shall be subjected to annual statutory audit by the Royal Audit Authority of Bhutan.
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Full Charter Documentation</span>
              <Link
                to="/reports"
                className="font-bold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
              >
                <span>View Legal Documents</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Vision, Mission & Core Values Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block mb-2 font-mono">
            Approved Strategic Compass (July 17, 2026)
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Vision, Mission & Guiding Principles
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Formally approved by the Secretariat leadership and Board of Trustees to anchor all strategic investment and healthcare allocations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corePillars.map((p) => (
            <div
              key={p.title}
              className="bg-white border border-slate-200 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-2xl grid place-items-center border ${p.color}`}>
                    <p.icon className="h-6 w-6" />
                  </div>
                  <span className="font-sans text-xs font-bold text-emerald-800">
                    {p.dzongkha}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-800 transition">
                  {p.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-light mt-3">
                  {p.text}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Institutional Mandate</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Link Cards to Trustees, Committees & Secretariat */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2 font-mono">
            Governance & Operational Leadership
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
            Fiduciary Structure & Stewardship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/about"
            hash="trustees"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-emerald-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Landmark className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
              Board of Trustees →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              High-level governance comprising ministerial leaders, health experts, and international partners.
            </p>
          </Link>

          <Link
            to="/about"
            hash="committees"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
              Asset Management Committee →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Specialized fiduciary and audit committees supervising investment strategies and risk parameters.
            </p>
          </Link>

          <Link
            to="/about"
            hash="organogram"
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-teal-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-teal-800 transition">
              Secretariat & Organogram →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              The Directorate and 3 operational divisions executing daily procurement and health logistics.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
