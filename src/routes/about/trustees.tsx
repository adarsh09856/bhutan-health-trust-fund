import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicTrustees, getPublicPage } from "@/lib/api/public.functions";
import type { Trustee, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
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

export const Route = createFileRoute("/about/trustees")({
  loader: async () => {
    try {
      const [trustees, page] = await Promise.all([
        getPublicTrustees().catch(() => []),
        getPublicPage({ data: { slug: "about-trustees" } }).catch(() => null),
      ]);
      let sections: PageBlockSection[] | null = null;
      if (page && page.status === "published") {
        try {
          const parsed = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed) && parsed.length > 0) {
            sections = parsed;
          }
        } catch {}
      }
      return { liveTrustees: trustees || [], customSections: sections };
    } catch {
      return { liveTrustees: [], customSections: null };
    }
  },
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

// Official Board of Trustees (Table 1.1 from official write-up)
const staticTrustees = [
  {
    name: "HE Lyonpo Tandin Wangchuk",
    role: "Chairperson",
    organization: "Minister, Ministry of Health",
    badge: "Chairperson",
    desc: "Provides ministerial leadership, steering sovereign health financing and aligning BHTF disbursements with universal healthcare priorities.",
    photo: trusteeLyonpoTandin,
  },
  {
    name: "Lopen Tshering Wangchuk",
    role: "Trustee",
    organization: "Secretary, Monastic Council for Administration and Development Affairs, Zhung Dratshang",
    badge: "Zhung Dratshang",
    desc: "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom.",
    photo: trusteeLopenTshering,
  },
  {
    name: "Ms. Ugyen Choden",
    role: "Trustee & AMC Chairperson",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    badge: "Central Bank / AMC Chair",
    desc: "Brings extensive central banking, monetary policy, and financial regulatory expertise. Chairs the BHTF Asset Management Committee (AMC) overseeing capital preservation and asset allocation.",
    photo: trusteeUgyenChoden,
  },
  {
    name: "Mr. Chencho T. Namgay",
    role: "Trustee & AMC Member",
    organization: "Chief Executive Officer, National Pension and Provident Fund (NPPF)",
    badge: "Pension Fund / AMC Member",
    desc: "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight as a member of the Board and Asset Management Committee.",
    photo: trusteeChenchoNamgay,
  },
  {
    name: "Mr. Norbu Dendup",
    role: "Trustee & AMC Member",
    organization: "Director, Department of Treasury and Accounts, Ministry of Finance",
    badge: "Ministry of Finance / AMC Member",
    desc: "Oversees public financial management, treasury coordination, and sovereign endowment governance, serving on the Board and Asset Management Committee.",
    photo: trusteeNorbuDendup,
  },
  {
    name: "Mr. Pema Tshering",
    role: "Trustee (Independent Director)",
    organization: "Independent Director / Former CEO, T Bank Ltd.",
    badge: "Financial Sector Specialist",
    desc: "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan.",
    photo: trusteePemaTshering,
  },
  {
    name: "Dr. Phub Tshering",
    role: "Trustee",
    organization: "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)",
    badge: "Clinical Specialist",
    desc: "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment directly representing the nation's premier tertiary healthcare institution.",
    photo: trusteeDrPhub,
  },
];

function TrusteesPage() {
  const { liveTrustees, customSections } = Route.useLoaderData();
  const [trusteesList, setTrusteesList] = useState<Trustee[]>(liveTrustees);

  useEffect(() => {
    if (liveTrustees.length === 0) {
      getPublicTrustees()
        .then((res) => {
          if (res && res.length > 0) setTrusteesList(res);
        })
        .catch(() => {});
    }
  }, [liveTrustees]);

  const trusteeFallbackPhotos: Record<string, string> = {
    Tandin: trusteeLyonpoTandin,
    "Tshering Wangchuk": trusteeLopenTshering,
    Lopen: trusteeLopenTshering,
    Choten: trusteeLopenTshering,
    Phub: trusteeDrPhub,
    Pema: trusteePemaTshering,
    Ugyen: trusteeUgyenChoden,
    Norbu: trusteeNorbuDendup,
    Chencho: trusteeChenchoNamgay,
  };

  const defaultPhotoList = [
    trusteeLyonpoTandin,
    trusteeLopenTshering,
    trusteeUgyenChoden,
    trusteeChenchoNamgay,
    trusteeNorbuDendup,
    trusteePemaTshering,
    trusteeDrPhub,
  ];

  const resolvePhoto = (name: string, photo: string | null, idx = 0) => {
    if (photo && (photo.startsWith("http://") || photo.startsWith("https://") || photo.startsWith("data:"))) {
      return photo;
    }
    for (const [key, p] of Object.entries(trusteeFallbackPhotos)) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return p;
      }
    }
    return defaultPhotoList[idx % defaultPhotoList.length];
  };

  const displayTrustees =
    trusteesList.length >= 7
      ? trusteesList.slice(0, 7).map((t, idx) => ({
          name: t.name,
          role: t.role,
          organization: t.organization || staticTrustees[idx]?.organization || "Board of Trustees, BHTF",
          badge:
            t.badge ||
            (idx === 0 || t.name.toLowerCase().includes("tandin")
              ? "Chairperson"
              : "Trustee"),
          desc: t.bio || staticTrustees[idx]?.desc || "Statutory fiduciary trustee managing health endowment allocations.",
          photo: resolvePhoto(t.name, t.photoUrl, idx),
        }))
      : staticTrustees;

  return (
    <div className="space-y-16 sm:space-y-24 pb-36 sm:pb-44 bg-[#FAF8F3]">
      <PageHero
        badge="Section 1.1 • Fiduciary Governance"
        title="Board of trustees"
        subtitle="The Bhutan Health Trust Fund operates under the guidance of the Board of Directors, headed by a Chairperson, providing strategic direction, accountability, and long-term sustainability."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about/organization" },
          { label: "Board of trustees" },
        ]}
      />

      {/* Custom Page Renderer if edited by admin */}
      {customSections && customSections.length > 0 && (
        <PageRenderer sections={customSections} pageSlug="about-trustees" />
      )}

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
            Table 1.1 • High-Level Governance
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Board of trustees
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-2.5 font-light">
            Providing strategic direction and ensuring effective governance, accountability, and the long-term sustainability of the Fund.
          </p>
        </div>

        {/* Chairperson Featured Leadership Card (NPPF Core Management Pattern) */}
        {displayTrustees.length > 0 && (
          <div className="max-w-md mx-auto mb-10 sm:mb-12">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition text-center flex flex-col items-center">
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/90 mb-4 shadow-2xs">
                <img
                  src={displayTrustees[0].photo}
                  alt={displayTrustees[0].name}
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
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
          {displayTrustees.slice(1).map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-300 text-center flex flex-col items-center justify-between group"
            >
              <div className="flex flex-col items-center w-full">
                <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 mb-4 shadow-2xs">
                  <img
                    src={t.photo}
                    alt={t.name || t.role}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                  {t.name}
                </h3>
                <div className="text-xs font-semibold text-emerald-800 mt-1">
                  {t.role}
                </div>
                {t.organization && (
                  <div className="text-xs text-slate-500 font-normal mt-1 leading-relaxed">
                    {t.organization}
                  </div>
                )}
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 w-full flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Statutory Fiduciary Trustee</span>
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
