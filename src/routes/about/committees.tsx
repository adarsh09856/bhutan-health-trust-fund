import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Scale,
  ShieldCheck,
  TrendingUp,
  Landmark,
  Coins,
  CheckCircle2,
  Users,
} from "lucide-react";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/about/committees")({
  head: () => ({
    meta: [
      { title: "Asset Management Committee (AMC) | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory and mandate of the BHTF Asset Management Committee (AMC), Table 1.2 members, and the 70–20–10 operating model.",
      },
    ],
  }),
  component: CommitteesPage,
});

function CommitteesPage() {
  const { t, isDzongkha } = useLanguage();

  const displayAmcMembers = [
    {
      name: t("trustee_ugyen_name", "Ms. Ugyen Choden"),
      committeeRole: t("trustee_ugyen_role", "Chairperson"),
      title: t("trustee_ugyen_org", "Deputy Governor, RMA"),
      badge: t("amc_chair_badge", "Chairperson (AMC)"),
      desc: t(
        "trustee_ugyen_desc",
        "Provides high-level central banking, liquidity, and macroeconomic portfolio oversight, guiding BHTF capital preservation strategies."
      ),
      photo: trusteeUgyenChoden,
    },
    {
      name: t("trustee_chencho_name", "Mr. Chencho T. Namgay"),
      committeeRole: t("amc_member_badge", "Member"),
      title: t("trustee_chencho_org", "Chief Executive Officer, NPPF"),
      badge: t("amc_member_badge", "Member (AMC)"),
      desc: t(
        "trustee_chencho_desc",
        "Brings extensive institutional fund management, asset allocation, and risk management insight from Bhutan's premier pension fiduciary."
      ),
      photo: trusteeChenchoNamgay,
    },
    {
      name: t("trustee_norbu_name", "Mr. Norbu Dendup"),
      committeeRole: t("amc_member_badge", "Member"),
      title: t("trustee_norbu_org", "Director, Department of Treasury and Accounts, MoF"),
      badge: t("amc_member_badge", "Member (AMC)"),
      desc: t(
        "trustee_norbu_desc",
        "Oversees public financial management, treasury coordination, and sovereign endowment governance under the Ministry of Finance."
      ),
      photo: trusteeNorbuDendup,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge={t("amc_page_badge", "Section 1.2 • Fiduciary Oversight")}
        title={t("amc_page_title", "Asset management committee")}
        subtitle={t(
          "amc_page_subtitle",
          "To strengthen financial stewardship and investment oversight, the Board appoints an Asset Management Committee (AMC), which supports the responsible management of the Fund’s assets."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("amc_page_title", "Asset management committee") },
        ]}
      />

      {/* 1. Official AMC Table 1.2 Members Gallery (NPPF Pattern) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="amc-roster">
        <SectionEditBadge
          label="Asset Management Committee (AMC)"
          pageSlug="about-committees"
          sectionId="amc-roster"
          studioHref="/admin/page-editor?slug=about-committees"
          initialData={{
            title: "1.2 Asset management committee (AMC)",
            subtitle: "Table 1.2 official members and positions of the Asset Management Committee.",
            badge: "Table 1.2 • AMC Members",
          }}
        />

        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 block">
            {t("amc_table_badge", "Table 1.2 • Investment Stewardship")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            {t("amc_page_title", "Asset management committee (AMC)")}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 font-light">
            {t(
              "amc_page_subtitle",
              "Supporting the responsible management of the Fund’s assets in line with its mandate and objectives to safeguard resources for essential medicines and vaccines."
            )}
          </p>
        </div>

        {/* 3 AMC Members in Clean NPPF Institutional Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {displayAmcMembers.map((m, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-300 transition-all duration-300 text-center flex flex-col items-center justify-between group"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 mb-4 shadow-2xs">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-amber-800 transition leading-snug">
                  {m.name}
                </h3>
                <div className="text-xs font-semibold text-amber-800 mt-1">
                  {m.committeeRole}
                </div>
                <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                  {m.title}
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>{m.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Official 70–20–10 Operating Model & Capital Preservation Policy */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="amc-operating-model">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800">
                {isDzongkha ? "མ་རྩ་བཙུགས་བཞག་ཐབས་བྱུས་གསལ་བཤད།" : "Investment Strategy Statement"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
                {t("model_title", "The 70–20–10 Operating Model")}
              </h3>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold font-mono">
              <Scale className="h-3.5 w-3.5 text-amber-700" />
              <span>{isDzongkha ? "འགན་འཁྲི་ཅན་གྱི་མ་རྩ་བདག་སྐྱོང་།" : "Prudent Capital Governance"}</span>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 text-sm leading-relaxed font-sans">
            <p>
              {t(
                "model_desc",
                "As per the Investment Strategy Statement, the Bhutan Health Trust Fund follows a 70–20–10 operating model to ensure the sustainable financing of national essential medicines and vaccines in Bhutan."
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
              <div className="bg-[#FAF8F3] border border-emerald-200/80 rounded-2xl p-5 space-y-2">
                <div className="text-3xl font-black font-mono text-emerald-800">70%</div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {t("model_70_title", "Procurement Financing")}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "model_70_desc",
                    "70% of investment income is allocated to finance the procurement of national essential medicines and vaccines."
                  )}
                </p>
              </div>

              <div className="bg-[#FAF8F3] border border-amber-200/80 rounded-2xl p-5 space-y-2">
                <div className="text-3xl font-black font-mono text-amber-800">20%</div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {t("model_20_title", "Capital Reinvestment")}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "model_20_desc",
                    "20% is reinvested to support the growth of the Fund’s capital and protect purchasing power against inflation."
                  )}
                </p>
              </div>

              <div className="bg-[#FAF8F3] border border-teal-200/80 rounded-2xl p-5 space-y-2">
                <div className="text-3xl font-black font-mono text-teal-800">10%</div>
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {t("model_10_title", "Operational Expenses")}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {t(
                    "model_10_desc",
                    "10% is allocated to cover operational expenses of the Secretariat, ensuring maximum resource efficiency."
                  )}
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-3 mt-6">
              <h4 className="font-serif font-bold text-base text-slate-900">
                {t("preservation_title", "Principal Capital Preservation Principle")}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                {t(
                  "preservation_text",
                  "A key principle of the Fund is the preservation of its principal capital. By financing healthcare needs through investment income rather than drawing on the principal, BHTF aims to safeguard its financial resources for future generations. Any remaining funding gap is supplemented by a 1% health contribution deducted from the monthly gross salaries of salaried employees in the country."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
