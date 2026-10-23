import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  ShieldCheck,
  Landmark,
  Scale,
  Building,
  CheckCircle2,
} from "lucide-react";
import trusteeLyonpoTandin from "@/assets/bhtf/trustees/lyonpo_tandin_wangchuk.jpg";
import trusteeLopenTshering from "@/assets/bhtf/trustees/lopen_tshering_wangchuk.jpg";
import trusteeDrPhub from "@/assets/bhtf/trustees/dr_phub_tshering.jpg";
import trusteePemaTshering from "@/assets/bhtf/trustees/pema_tshering.jpg";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import { AboutBottomCapsule } from "@/components/about-bottom-capsule";
import { useLanguage } from "@/lib/i18n/language-context";

export const Route = createFileRoute("/about/trustees")({
  head: () => ({
    meta: [
      { title: "Board of Trustees | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory of the Board of Trustees of the Bhutan Health Trust Fund (Table 1.1), ministerial leadership, and fiduciary governance.",
      },
    ],
  }),
  component: TrusteesPage,
});

function TrusteesPage() {
  const { t, isDzongkha } = useLanguage();

  const displayTrustees = [
    {
      name: t("trustee_tandin_name", "HE Lyonpo Tandin Wangchuk"),
      role: t("trustee_tandin_role", "Chairperson"),
      organization: t("trustee_tandin_org", "Minister, Ministry of Health"),
      badge: t("trustee_tandin_role", "Chairperson"),
      desc: t(
        "trustee_tandin_desc",
        "Provides ministerial leadership, steering sovereign health financing and aligning BHTF disbursements with universal healthcare priorities."
      ),
      photo: trusteeLyonpoTandin,
    },
    {
      name: t("trustee_lopen_name", "Lopen Tshering Wangchuk"),
      role: t("trustee_lopen_role", "Trustee"),
      organization: t(
        "trustee_lopen_org",
        "Secretary, Monastic Council for Administration and Development Affairs, Zhung Dratshang"
      ),
      badge: t("trustee_lopen_badge", "Zhung Dratshang"),
      desc: t(
        "trustee_lopen_desc",
        "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom."
      ),
      photo: trusteeLopenTshering,
    },
    {
      name: t("trustee_ugyen_name", "Ms. Ugyen Choden"),
      role: t("trustee_ugyen_role", "Trustee & AMC Chairperson"),
      organization: t("trustee_ugyen_org", "Deputy Governor, Royal Monetary Authority (RMA)"),
      badge: t("trustee_ugyen_badge", "Central Bank / AMC Chair"),
      desc: t(
        "trustee_ugyen_desc",
        "Brings extensive central banking, monetary policy, and financial regulatory expertise. Chairs the BHTF Asset Management Committee (AMC) overseeing capital preservation and asset allocation."
      ),
      photo: trusteeUgyenChoden,
    },
    {
      name: t("trustee_chencho_name", "Mr. Chencho T. Namgay"),
      role: t("trustee_chencho_role", "Trustee & AMC Member"),
      organization: t(
        "trustee_chencho_org",
        "Chief Executive Officer, National Pension and Provident Fund (NPPF)"
      ),
      badge: t("trustee_chencho_badge", "Pension Fund / AMC Member"),
      desc: t(
        "trustee_chencho_desc",
        "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight as a member of the Board and Asset Management Committee."
      ),
      photo: trusteeChenchoNamgay,
    },
    {
      name: t("trustee_norbu_name", "Mr. Norbu Dendup"),
      role: t("trustee_norbu_role", "Trustee & AMC Member"),
      organization: t(
        "trustee_norbu_org",
        "Director, Department of Treasury and Accounts, Ministry of Finance"
      ),
      badge: t("trustee_norbu_badge", "Ministry of Finance / AMC Member"),
      desc: t(
        "trustee_norbu_desc",
        "Oversees public financial management, treasury coordination, and sovereign endowment governance, serving on the Board and Asset Management Committee."
      ),
      photo: trusteeNorbuDendup,
    },
    {
      name: t("trustee_pema_name", "Mr. Pema Tshering"),
      role: t("trustee_pema_role", "Trustee (Independent Director)"),
      organization: t("trustee_pema_org", "Independent Director / Former CEO, T Bank Ltd."),
      badge: t("trustee_pema_badge", "Financial Sector Specialist"),
      desc: t(
        "trustee_pema_desc",
        "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan."
      ),
      photo: trusteePemaTshering,
    },
    {
      name: t("trustee_phub_name", "Dr. Phub Tshering"),
      role: t("trustee_phub_role", "Trustee"),
      organization: t(
        "trustee_phub_org",
        "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)"
      ),
      badge: t("trustee_phub_badge", "Clinical Specialist"),
      desc: t(
        "trustee_phub_desc",
        "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment directly representing the nation's premier tertiary healthcare institution."
      ),
      photo: trusteeDrPhub,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge={t("trustees_page_badge", "Section 1.1 • Fiduciary Governance")}
        title={t("trustees_page_title", "Board of trustees")}
        subtitle={t(
          "trustees_page_subtitle",
          "The Bhutan Health Trust Fund operates under the guidance of the Board of Directors, headed by a Chairperson, providing strategic direction, accountability, and long-term sustainability."
        )}
        breadcrumb={[
          { label: t("nav_home", "Home"), to: "/" },
          { label: t("nav_about_us", "About Us"), to: "/about" },
          { label: t("trustees_page_title", "Board of trustees") },
        ]}
      />

      {/* Complete Trustees Gallery Grid in Clean NPPF Institutional Style */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative" data-bhtf-section="trustees-roster">
        <SectionEditBadge
          label="Board of Trustees Roster"
          pageSlug="about-trustees"
          sectionId="trustees-roster"
          studioHref="/admin/trustees"
          initialData={{
            title: "1.1 Board of trustees",
            subtitle: "Table 1.1 official listing of Board of Trustees members and their positions.",
            badge: "Table 1.1 • Board of Trustees",
          }}
        />
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 block mb-2 font-mono">
            {t("trustees_table_badge", "Table 1.1 • High-Level Governance")}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            {t("trustees_page_title", "Board of trustees")}
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 font-light">
            {t(
              "trustees_page_subtitle",
              "Providing strategic direction and ensuring effective governance, accountability, and the long-term sustainability of the Fund."
            )}
          </p>
        </div>

        {/* Chairperson Featured Leadership Card (NPPF Core Management Pattern) */}
        {displayTrustees.length > 0 && (
          <div className="max-w-md mx-auto mb-10 sm:mb-12">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition text-center flex flex-col items-center">
              <div className="w-52 h-52 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/90 mb-4 shadow-2xs flex items-center justify-center p-2">
                <img
                  src={displayTrustees[0].photo}
                  alt={displayTrustees[0].name}
                  className="w-full h-full object-contain object-center hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {displayTrustees[0].name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-emerald-800 mt-1">
                {displayTrustees[0].role}
              </p>
              {displayTrustees[0].organization && (
                <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                  {displayTrustees[0].organization}
                </p>
              )}
              <span className="inline-block text-[10px] font-mono font-bold text-amber-900 bg-amber-50 border border-amber-200 px-3 py-0.5 rounded-full mt-3">
                {displayTrustees[0].badge || "Chairperson"}
              </span>
            </div>
          </div>
        )}

        {/* Trustees Grid (NPPF Members Pattern) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayTrustees.slice(1).map((tItem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-lg hover:border-emerald-300 transition-all duration-300 text-center flex flex-col items-center justify-between group"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 border border-slate-200/80 mb-4 shadow-2xs flex items-center justify-center p-2">
                  <img
                    src={tItem.photo}
                    alt={tItem.name || tItem.role}
                    className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                  {tItem.name}
                </h3>
                <div className="text-xs font-semibold text-emerald-800 mt-1">
                  {tItem.role}
                </div>
                {tItem.organization && (
                  <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                    {tItem.organization}
                  </div>
                )}
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{t("trustees_statutory_badge", "Statutory Fiduciary Trustee")}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Sub-pages Sticky Bottom Capsule */}
      <AboutBottomCapsule />
    </div>
  );
}
