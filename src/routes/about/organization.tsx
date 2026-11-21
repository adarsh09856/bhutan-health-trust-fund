import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/page-hero";
import { PageRenderer } from "@/components/page-renderer";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { SectionEditBadge } from "@/components/public/section-edit-badge";

export const Route = createFileRoute("/about/organization")({
  loader: async () => {
    const page = await getPublicPage({ data: { slug: "about-organization" } }).catch(() => null);
    return { page };
  },
  head: () => ({
    meta: [
      { title: "Organogram | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official Organizational Chart and Governance Organogram of the Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: AboutOrganizationPage,
});

function AboutOrganizationPage() {
  const { page } = Route.useLoaderData();
  const { t, isDzongkha } = useLanguage();
  const [sectionOverrides, setSectionOverrides] = useState<Record<string, PageBlockSection>>(
    () => Object.fromEntries((page?.sections || []).map((section) => [section.id, section])),
  );
  const sectionFor = (id: string) => sectionOverrides[id] || page?.sections?.find((section) => section.id === id);
  const saveSection = (section: PageBlockSection) => {
    setSectionOverrides((current) => ({ ...current, [section.id]: section }));
  };
  const organogramSection = sectionFor("org-organogram");
  const organogramItems = organogramSection?.items || [];
  const governanceSection = sectionFor("governance-framework");
  const investmentSection = sectionFor("investment-operating-model");
  const investmentItems = investmentSection?.items || [];
  const initialOrganogramItems = [
    { title: "Board of Directors", description: "High-level governance", value: "8 members", url: "/about/trustees" },
    { title: "Asset Management Committee", description: "Specialized investment and fiduciary oversight", value: "5 members", url: "/about/committees" },
    { title: "Director", description: "Member Secretary & Executive Head", value: "Dr. Gyambo Sithey, PhD", url: "/about/secretariat" },
    { title: "Investment Management Division" },
    { title: "Administration & Finance Division" },
    { title: "Programme Division" },
    { title: "Monitoring & Evaluation Division" },
  ];

  return (
    <div className="space-y-8 sm:space-y-10 pb-28 sm:pb-36 bg-[#FAF8F3]">
      <PageHero
        title={t("organogram_title", "Organogram")}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("nav_organogram", "Organogram") },
        ]}
      />

      {/* Official Organizational Chart (Organogram) Brought to the Top */}
      <section
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative"
        data-bhtf-section="org-organogram"
      >
        <SectionEditBadge
          label="Organogram"
          pageSlug="about-organization"
          sectionId="org-organogram"
          studioHref="/admin/page-editor?slug=about-organization"
          quickEditSupported
          initialData={{
            title: organogramSection?.title || "Official Organizational Chart",
            subtitle: organogramSection?.subtitle || "Hierarchical governance from the Board of Directors and Asset Management Committee to the Secretariat and its four operational divisions.",
            items: organogramSection?.items?.map((item) =>
              item.title === "Board of Directors" ? { ...item, value: "8 members" } : item,
            ) || initialOrganogramItems,
          }}
          onSaved={saveSection}
        />
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          {/* Interactive Organogram Diagram */}
          <div className="max-w-4xl mx-auto pt-4">
            <p className="max-w-2xl mx-auto mb-8 text-center text-sm sm:text-base leading-relaxed text-slate-600">
              {isDzongkha
                ? t("organogram_subtitle")
                : "Hierarchical governance from the Board of Directors and Asset Management Committee to the Secretariat Directorate and four operational divisions."}
            </p>
            {/* Level 1: Board of Directors */}
            <div className="flex justify-center">
              <Link
                to="/about/trustees"
                className="w-full max-w-sm bg-slate-50 hover:bg-emerald-50/50 border-2 border-slate-800 hover:border-emerald-700 rounded-2xl p-4 text-center shadow-xs transition group cursor-pointer block"
              >
                <span className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-900 block">
                  {isDzongkha ? t("organogram_board", "Board of Directors") : "Board of Directors"}
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-slate-600">
                  {isDzongkha
                    ? t("organogram_board_sub", "High-Level Governance")
                    : "High-level governance • 8 members"}
                </span>
              </Link>
            </div>

            {/* Vertical Line */}
              <div className="w-0.5 h-8 bg-slate-700 mx-auto" />

            {/* Horizontal Branch to AMC */}
            <div className="relative">
              <div className="w-0.5 h-20 bg-slate-700 mx-auto" />
              <div className="sm:absolute sm:top-1/2 sm:right-1/2 sm:-translate-y-1/2 flex items-center justify-center my-2 sm:my-0">
                <Link
                  to="/about/committees"
                  className="w-full max-w-xs bg-amber-50/70 hover:bg-amber-100/70 border-2 border-amber-800/80 hover:border-amber-900 rounded-2xl p-3 text-center shadow-xs transition group cursor-pointer block"
                >
                  <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 group-hover:text-amber-950 block leading-snug">
                    {isDzongkha ? t("organogram_amc", "Asset Management Committee") : "Asset Management Committee"}
                  </span>
                  <span className="mt-1 block text-xs text-slate-600">
                    {isDzongkha ? t("organogram_amc_sub", "Specialized Advisory Sub-committee") : "Specialized Advisory Sub-committee"}
                  </span>
                </Link>
                <div className="hidden sm:block w-16 md:w-20 h-0.5 bg-slate-700" />
              </div>
            </div>

            {/* Level 2: Director */}
            <div className="flex justify-center">
              <Link
                to="/about/secretariat"
                className="w-full max-w-sm bg-slate-50 hover:bg-teal-50/50 border-2 border-slate-800 hover:border-teal-700 rounded-2xl p-4 text-center shadow-xs transition group cursor-pointer block"
              >
                <span className="font-serif font-bold text-base text-slate-900 group-hover:text-teal-900 block">
                  {isDzongkha ? t("organogram_director", "Director") : "Director"}
                </span>
                <span className="mt-1 block text-sm font-semibold text-slate-800">
                  {isDzongkha ? t("organogram_director_name", "Dr. Gyambo Sithey, PhD") : "Dr. Gyambo Sithey, PhD"}
                </span>
                <span className="mt-1 block text-xs sm:text-sm text-slate-600">
                  {isDzongkha ? t("organogram_director_sub", "Member Secretary & Executive Head") : "Member Secretary & Executive Head"}
                </span>
              </Link>
            </div>

            {/* Stem Down to 4 Divisions */}
            <div className="w-0.5 h-8 bg-slate-700 mx-auto" />
            <div className="hidden sm:block w-[88%] h-0.5 bg-slate-700 mx-auto" />

            {/* Operational divisions remain editable as an ordered list in the section editor. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-0 sm:pt-0">
              {(organogramItems.length > 3 ? organogramItems.slice(3) : [
                { title: t("div_investment", "Investment Management Division") },
                { title: t("div_admin", "Administration & Finance Division") },
                { title: t("div_programme", "Programme Division") },
                { title: t("div_monitoring", "Monitoring & Evaluation Division") },
              ]).map((division, index) => (
                <div key={`${division.title}-${index}`} className="flex flex-col items-center">
                  <div className="hidden sm:block w-0.5 h-6 bg-slate-700" />
                  <div className="w-full bg-slate-50 border-2 border-slate-800 rounded-2xl p-3.5 text-center shadow-xs min-h-[82px] flex flex-col items-center justify-center">
                    <span className="font-serif font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                      {isDzongkha && index < 4
                        ? [t("div_investment", "Investment Management Division"), t("div_admin", "Administration & Finance Division"), t("div_programme", "Programme Division"), t("div_monitoring", "Monitoring & Evaluation Division")][index]
                        : division.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 lg:grid-cols-2" data-bhtf-section="governance-and-investment-model">
        <article className="relative rounded-3xl border border-emerald-700/30 bg-white p-6 sm:p-8 shadow-sm">
          <SectionEditBadge
            label="Governance framework"
            pageSlug="about-organization"
            sectionId="governance-framework"
            studioHref="/admin/page-editor?slug=about-organization"
            quickEditSupported
            initialData={{
              title: governanceSection?.title || "Governance Framework",
              content: governanceSection?.content || "The Bhutan Health Trust Fund (BHTF) operates under the guidance of the Board of Directors, headed by a Chairperson. The Board provides strategic direction and ensures effective governance, accountability and the long-term sustainability of the Fund. To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets in line with its mandate and objectives. Together, the Board and the AMC play an important role in safeguarding the Fund’s resources to ensure the continued availability of essential medicines and vaccines for the people of Bhutan.",
            }}
            onSaved={saveSection}
          />
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-700">Governance</p>
          <h2 className="mb-4 font-serif text-2xl sm:text-3xl font-bold text-slate-900">{governanceSection?.title || "Governance Framework"}</h2>
          <p className="leading-relaxed text-slate-700">{governanceSection?.content || "The Bhutan Health Trust Fund (BHTF) operates under the guidance of the Board of Directors, headed by a Chairperson. The Board provides strategic direction and ensures effective governance, accountability and the long-term sustainability of the Fund. To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets in line with its mandate and objectives. Together, the Board and the AMC play an important role in safeguarding the Fund’s resources to ensure the continued availability of essential medicines and vaccines for the people of Bhutan."}</p>
        </article>
        <article className="relative rounded-3xl border border-emerald-700/30 bg-white p-6 sm:p-8 shadow-sm">
          <SectionEditBadge
            label="70–20–10 operating model"
            pageSlug="about-organization"
            sectionId="investment-operating-model"
            studioHref="/admin/page-editor?slug=about-organization"
            quickEditSupported
            initialData={{
              title: investmentSection?.title || "The 70–20–10 Operating Model",
              content: investmentSection?.content || "As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a 70–20–10 operating model to ensure the sustainable financing of national essential medicines and vaccines in Bhutan.",
              items: investmentSection?.items || [
                { title: "Essential medicines and vaccines", value: "70%", description: "Funds national essential medicines and vaccines." },
                { title: "Capital reinvestment", value: "20%", description: "Is reinvested to support capital growth." },
                { title: "Operating expenses", value: "10%", description: "Covers operating expenses." },
              ],
            }}
            onSaved={saveSection}
          />
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-amber-700">Investment Strategy Statement</p>
          <h2 className="mb-4 font-serif text-2xl sm:text-3xl font-bold text-slate-900">{investmentSection?.title || "The 70–20–10 Operating Model"}</h2>
          <p className="mb-6 leading-relaxed text-slate-700">{investmentSection?.content || "As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a 70–20–10 operating model to ensure the sustainable financing of national essential medicines and vaccines in Bhutan."}</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(investmentItems.length > 0 ? investmentItems : [
              { title: "Essential medicines and vaccines", value: "70%", description: "Funds national essential medicines and vaccines." },
              { title: "Capital reinvestment", value: "20%", description: "Is reinvested to support capital growth." },
              { title: "Operating expenses", value: "10%", description: "Covers operating expenses." },
            ]).map((item, index) => (
              <div key={`${item.title}-${index}`} className={`rounded-2xl p-4 ${["bg-emerald-50", "bg-sky-50", "bg-amber-50"][index % 3]}`}>
                <strong className="block text-3xl text-emerald-900">{item.value}</strong>
                <span className="text-sm text-slate-700">{item.description || item.title}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <PageRenderer sections={(page?.sections || []) as PageBlockSection[]} pageSlug="about-organization" />

      {/* Floating Bottom Sub-pages Navigation Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
