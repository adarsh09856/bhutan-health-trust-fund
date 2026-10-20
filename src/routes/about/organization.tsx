import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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
  Layers,
} from "lucide-react";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";

export const Route = createFileRoute("/about/organization")({
  loader: async () => {
    try {
      const page = await getPublicPage({ data: { slug: "about-organization" } }).catch(() => null);
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
      { title: "About Us & Royal Charter Mandate | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official profile of the Bhutan Health Trust Fund (BHTF), established by Royal Charter to sustain free primary healthcare, essential medicines, and vaccines in Bhutan.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

function AboutOrganizationPage() {
  const { customSections } = Route.useLoaderData();

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge="Section 1 • Institutional Profile"
        title="About Us"
        subtitle="Sustaining free primary healthcare, essential medicines, and vaccines for present and future generations of Bhutan."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about/organization" },
          { label: "Organization & Mandate" },
        ]}
      />

      {/* Custom Page Renderer if edited by admin */}
      {customSections && customSections.length > 0 && (
        <PageRenderer sections={customSections} pageSlug="about-organization" />
      )}

      {/* 1. Official Section 1 Narrative: 4 Official Paragraphs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-about-narrative">
        <SectionEditBadge
          label="About Us Narrative"
          pageSlug="about-organization"
          sectionId="org-about-narrative"
          studioHref="/admin/page-editor?slug=about-organization"
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

      {/* 2. Official Mandate, Vision, Mission & Governance Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-core-tenets">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Mandate */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-emerald-300 transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Target className="size-6 text-emerald-800" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Our Mandate</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              To ensure sustainable financing for essential medicines and vaccines through prudent fund management and responsible investment.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-amber-300 transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-800 grid place-items-center">
              <Eye className="size-6 text-amber-800" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              A Bhutan where every citizen has uninterrupted access to essential medicines and vaccines, now and for generations to come.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 shadow-xs hover:border-teal-300 transition-all duration-300 space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-teal-50 text-teal-800 grid place-items-center">
              <Heart className="size-6 text-teal-800" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              To mobilise, invest, and prudently manage a dedicated health endowment to generate sustainable income for financing essential medicines, vaccines, and related health supplies.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Governance & Operating Model (70–20–10) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-governance-model">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Governance */}
          <div className="bg-white border border-slate-200/90 rounded-3xl p-7 sm:p-9 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-mono font-bold">
                <ShieldCheck className="size-3.5 text-emerald-800" />
                <span>Governance & Oversight</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                Governance Framework
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                The Bhutan Health Trust Fund (BHTF) operates under the guidance of the Board of Directors, headed by a Chairperson. The Board provides strategic direction and ensures effective governance, accountability and the long-term sustainability of the Fund.
              </p>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets in line with its mandate and objectives. Together, the Board and the AMC play an important role in safeguarding the Fund’s resources to ensure the continued availability of essential medicines and vaccines for the people of Bhutan.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-semibold">
              <Link to="/about/trustees" className="text-emerald-800 hover:underline inline-flex items-center gap-1">
                <span>View Board of Trustees (7 Members)</span>
                <ArrowRight className="size-3" />
              </Link>
              <Link to="/about/committees" className="text-amber-800 hover:underline inline-flex items-center gap-1">
                <span>Asset Management Committee</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Operating Model (70–20–10) & Capital Preservation */}
          <div className="bg-gradient-to-br from-[#0B4F42] to-[#073C32] text-white rounded-3xl p-7 sm:p-9 shadow-lg space-y-5 flex flex-col justify-between border border-emerald-700/40">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-mono font-bold border border-white/10">
                <Coins className="size-3.5 text-amber-300" />
                <span>70–20–10 Operating Model</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Our Operating Model
              </h3>
              <p className="text-xs sm:text-sm text-emerald-50/90 leading-relaxed font-sans">
                As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a <strong>70–20–10 operating model</strong> to ensure the sustainable financing of national essential medicines and vaccines in Bhutan. Under this model:
              </p>

              {/* Three Stream Breakdown */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-300">70%</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                    Medicines & Vaccines Procurement
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-300">20%</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                    Reinvested for Capital Growth
                  </div>
                </div>
                <div className="bg-white/10 rounded-2xl p-3 border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-teal-200">10%</div>
                  <div className="text-[10px] sm:text-xs text-white/90 font-medium mt-1 leading-tight">
                    Operational Expenses
                  </div>
                </div>
              </div>

              <div className="pt-2 text-xs sm:text-sm text-emerald-50/90 leading-relaxed space-y-2 font-sans border-t border-white/10">
                <p>
                  <strong>Principal Preservation:</strong> A key principle of the Fund is the preservation of its principal capital. By financing healthcare needs through investment income rather than drawing on the principal, BHTF aims to safeguard its financial resources for future generations.
                </p>
                <p className="text-xs text-emerald-100/80">
                  Any remaining funding gap is supplemented by a <strong>1% health contribution</strong> deducted from the monthly gross salaries of salaried employees in the country. Together, this financing mechanism supports the continued availability of national essential medicines and vaccines while strengthening the Fund’s long-term financial sustainability and its commitment to Bhutan’s free primary healthcare system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section 1.3: Secretariat and Organizational Chart (Annexure 1) */}
      <section id="organogram" className="mx-auto max-w-7xl scroll-mt-32 px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="org-structure-tree">
        <SectionEditBadge
          label="Secretariat Organogram"
          pageSlug="about-organization"
          sectionId="org-structure-tree"
          studioHref="/admin/page-editor?slug=about-organization"
          initialData={{
            title: "Secretariat and Organizational Chart",
            subtitle: "1.3 Secretariat and Organizational Chart approved hierarchy from the Board to 4 divisions.",
            badge: "Section 1.3 • Secretariat Structure",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800 block">
            Section 1.3 • Governance Hierarchy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Secretariat and Organizational Chart
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-light">
            Approved governance hierarchy illustrating the direct line of accountability from the Board of Trustees and Asset Management Committee to the Secretariat Directorate and four operational divisions.
          </p>
        </div>

        {/* Clean Organogram Diagram - Matching Section 1.3 and Image 6 */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-4xl mx-auto">
            {/* Level 1: Board */}
            <div className="flex justify-center">
              <div className="w-64 bg-slate-50 border-2 border-slate-800 rounded-2xl p-4 text-center shadow-xs">
                <span className="font-serif font-bold text-base text-slate-900 block">Board of Trustees</span>
                <span className="text-[10px] text-slate-500 font-sans block mt-0.5">Apex Governance & Ministerial Oversight</span>
              </div>
            </div>

            {/* Vertical Line from Board down */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Branch to Asset Management Committee on Left */}
            <div className="relative">
              {/* Center vertical continue line */}
              <div className="w-0.5 h-20 bg-slate-700 mx-auto" />

              {/* Connecting branch to AMC */}
              <div className="sm:absolute sm:top-1/2 sm:right-1/2 sm:-translate-y-1/2 flex items-center justify-center my-2 sm:my-0">
                <div className="w-60 bg-amber-50/60 border-2 border-amber-800/80 rounded-2xl p-3 text-center shadow-xs">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 block leading-snug">
                    Asset Management Committee
                  </span>
                  <span className="text-[10px] text-amber-800 font-sans block mt-0.5 font-semibold">Specialized Advisory Sub-committee</span>
                </div>
                <div className="hidden sm:block w-16 md:w-20 h-0.5 bg-slate-700" />
              </div>
            </div>

            {/* Level 2: Director */}
            <div className="flex justify-center">
              <div className="w-64 bg-slate-50 border-2 border-slate-800 rounded-2xl p-4 text-center shadow-xs">
                <span className="font-serif font-bold text-base text-slate-900 block">Director</span>
                <span className="text-[11px] text-emerald-800 font-sans block mt-0.5 font-semibold">Dr. Gyambo Sithey, PhD</span>
                <span className="text-[10px] text-slate-500 font-sans block">Member Secretary & Executive Head</span>
              </div>
            </div>

            {/* Stem Down to 4 Divisions */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Bar across all 4 Divisions */}
            <div className="hidden sm:block w-[88%] h-0.5 bg-slate-700 mx-auto" />

            {/* 4 Division Drops & Boxes Matching Section 1.3 */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-0 sm:pt-0">
              {/* Division 1 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Investment Management Division
                  </span>
                </div>
              </div>

              {/* Division 2 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Administration & Finance Division
                  </span>
                </div>
              </div>

              {/* Division 3 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Programme Division
                  </span>
                </div>
              </div>

              {/* Division 4 */}
              <div className="flex flex-col items-center">
                <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                    Monitoring & Evaluation Division
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Document Organogram Image View */}
          <div className="pt-6 border-t border-slate-100 flex flex-col items-center text-center space-y-3">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
              Official Organogram Graphic from Write-up
            </span>
            <div className="max-w-2xl rounded-2xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-50 p-2">
              <img
                src="/images/official/image6.png"
                alt="BHTF Secretariat Organizational Structure Chart"
                className="w-full h-auto object-contain rounded-xl"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sub-pages Quick Link Cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-t border-slate-200/80 pt-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            About Us Directory
          </span>
          <h3 className="font-serif text-2xl font-bold text-slate-900">
            Explore Governance & Administration
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/about/trustees"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-800 grid place-items-center">
              <Landmark className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition">
              Board of trustees (with photos) →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              7 Apex governing trustees chaired by HE Lyonpo Tandin Wangchuk, Minister for Health.
            </p>
          </Link>

          <Link
            to="/about/committees"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-800 grid place-items-center">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
              Asset management committee →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              3-member fiduciary sub-committee chaired by Ms. Ugyen Choden, Deputy Governor, RMA.
            </p>
          </Link>

          <Link
            to="/about/secretariat"
            className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-400 transition-all duration-300 group space-y-3"
          >
            <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-800 grid place-items-center">
              <Building className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-teal-800 transition">
              Secretariat and organizational chart →
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Executive arm headed by Director Dr. Gyambo Sithey, PhD, with 4 operational divisions.
            </p>
          </Link>
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
