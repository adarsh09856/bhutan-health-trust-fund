import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Landmark,
  Scale,
  Building,
  CheckCircle2,
  FileText,
  Lock,
  Coins,
  ArrowRight,
  Users,
  Sparkles,
  Pill,
  Syringe,
} from "lucide-react";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official profile of the Bhutan Health Trust Fund (BHTF), established by Royal Charter to sustain free primary healthcare, essential medicines, and vaccines in Bhutan.",
      },
    ],
  }),
  component: AboutRouteComponent,
});

function AboutRouteComponent() {
  const location = useLocation();
  const isExactAbout = location.pathname === "/about" || location.pathname === "/about/";

  if (!isExactAbout) {
    return <Outlet />;
  }

  return <AboutUsMainPage />;
}

function AboutUsMainPage() {
  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge="Section 1 • Institutional Profile"
        title="About Us"
        subtitle="Sustaining free primary healthcare, essential medicines, and vaccines for present and future generations of Bhutan."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us" },
        ]}
      />

      {/* 1. Official Section 1 Narrative: 4 Official Paragraphs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="about-us-narrative">
        <SectionEditBadge
          label="About Us Narrative"
          pageSlug="about"
          sectionId="about-us-narrative"
          studioHref="/admin/page-editor?slug=about"
          initialData={{
            title: "About the Bhutan Health Trust Fund",
            subtitle: "Official narrative approved by the BHTF Secretariat.",
            badge: "Section 1 • About Us",
          }}
        />
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Statutory Profile • Royal Charter 2000
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              About the Bhutan Health Trust Fund
            </h2>
          </div>

          <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed font-sans">
            <p>
              The Bhutan Health Trust Fund (BHTF) is a symbol of compassion, shared responsibility and Bhutan’s enduring commitment to the health and well-being of its people. Inspired by the vision of His Majesty the Fourth Druk Gyalpo, Jigme Singye Wangchuck, the Fund was established to help sustain Bhutan’s free primary healthcare service and ensure that essential medicines and vaccines remain accessible to all. It was officially launched on 12 May 1998 at the World Health Organization headquarters in Geneva, and received its formal legal foundation through the Royal Charter issued on 3 August 2000. Since 2018, the Fund has become a self-independent autonomous agency and continues to uphold a simple yet profound mission to protect lives and safeguard the health of present and future generations.
            </p>
            <p>
              Over the past two decades, the Bhutan Health Trust Fund has grown into a vital pillar of sustainable healthcare financing in Bhutan. Beginning with support for vaccines, the Fund expanded its assistance to include essential medicines in 2014. Today, it supports the procurement of 438 national essential medicines, 110 traditional medicines and four key vaccines, with an annual commitment of approximately Nu. 600 million. To date, the Fund has disbursed Nu. 4.3 billion towards essential medicines and vaccines, helping strengthen the delivery of free primary healthcare services across the country. Behind these figures are countless lives touched, families supported and communities given greater peace of mind through access to essential healthcare.
            </p>
            <p>
              The spirit of collective care has always been at the heart of the Fund. In 2002, the “Move for Health” initiative, led by the then Health Minister, Lyonpo Sangay Ngedup, brought people together through a remarkable journey from Trashigang to Thimphu. Raising nearly USD 2 million, the initiative demonstrated how the compassion, generosity and determination of individuals and communities can contribute to a healthier nation. This legacy of shared responsibility continues to inspire the Fund’s work today.
            </p>
            <p>
              With the support of the Royal Government of Bhutan, development partners, institutions, businesses and generous individuals, the Bhutan Health Trust Fund continues to build a sustainable foundation for essential healthcare. Every contribution represents more than financial support; it is an investment in human life, dignity and the well-being of future generations. Guided by the values of accountability, sustainability and service, the Fund remains committed to ensuring that no one is left behind in accessing essential medicines and vaccines. Its story is ultimately a story of a nation caring for its people, united by the belief that a healthy population is the foundation of a happy and thriving Bhutan.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Official Impact Benchmarks Banner */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B4F42] to-[#073C32] text-white rounded-3xl p-8 sm:p-12 shadow-lg border border-emerald-700/40 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-300">
              Enduring Stewardship • Verified Scale
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
              Sovereign Health Security at a Glance
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-light max-w-2xl">
              Unbroken healthcare commodity financing protecting every citizen across all 20 Dzongkhags.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-300">438</div>
              <div className="text-xs font-semibold text-white mt-1">Essential Modern Medicines</div>
              <div className="text-[11px] text-emerald-200/80 mt-0.5">100% of National List</div>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-300">110</div>
              <div className="text-xs font-semibold text-white mt-1">Traditional Formulations</div>
              <div className="text-[11px] text-emerald-200/80 mt-0.5">gSo-ba Rig-pa Therapies</div>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-teal-200">4 Key</div>
              <div className="text-xs font-semibold text-white mt-1">Universal Vaccines</div>
              <div className="text-[11px] text-emerald-200/80 mt-0.5">Penta, PCV, HPV, Flu</div>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 text-center">
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-300">Nu. 4.3B</div>
              <div className="text-xs font-semibold text-white mt-1">Disbursed to Date</div>
              <div className="text-[11px] text-emerald-200/80 mt-0.5">~Nu. 600M Annual Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About Us Governance & Institutional Navigation Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-slate-200/80 pt-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Institutional Sections
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Explore Governance, Mandate & Administration
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
            Dedicated sections covering the statutory mandate, apex trustees, investment committee, and executive secretariat.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {/* Card 1: Organization & Organogram */}
          <Link
            to="/about/organization"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Target className="size-6 text-emerald-800" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 block">
                Statutory Mandate & Organogram
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Organization & Organogram
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Our Mandate, Vision, Mission, 70–20–10 financial model, and full organizational chart.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Organization</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Board of Trustees */}
          <Link
            to="/about/trustees"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center group-hover:scale-110 transition-transform">
                <ShieldCheck className="size-6 text-amber-800" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 block">
                Table 1.1 • Apex Board
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Board of Trustees
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Official directory of the 7 Board members headed by the Hon'ble Minister for Health.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Trustees</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Asset Management Committee */}
          <Link
            to="/about/committees"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Scale className="size-6 text-teal-800" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-800 block">
                Table 1.2 • Fiduciary Oversight
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Asset Management Committee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Supporting responsible management and investment oversight of the Fund’s assets.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Committee</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Secretariat */}
          <Link
            to="/about/secretariat"
            className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-800 grid place-items-center group-hover:scale-110 transition-transform">
                <Users className="size-6 text-blue-800" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-800 block">
                Section 1.3 • Executive Arm
              </span>
              <h4 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
                Secretariat & Personnel
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                Director Dr. Gyambo Sithey, 4 core operational divisions, and key officer profiles.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>View Secretariat</span>
              <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Floating Bottom Navigation Capsule for About Sub-Pages */}
      <AboutBottomCapsule />
    </div>
  );
}
