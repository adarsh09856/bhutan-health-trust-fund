import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicTrustees, getPublicPage } from "@/lib/api/public.functions";
import type { Trustee, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import {
  ShieldCheck,
  Award,
  Landmark,
  Scale,
  Building,
  Users2,
  CheckCircle2,
  Calendar,
  Lock,
} from "lucide-react";
import trusteeLyonpoTandin from "@/assets/bhtf/trustees/lyonpo_tandin_wangchuk.jpg";
import trusteeLopenTshering from "@/assets/bhtf/trustees/lopen_tshering_wangchuk.jpg";
import trusteeDrPhub from "@/assets/bhtf/trustees/dr_phub_tshering.jpg";
import trusteePemaTshering from "@/assets/bhtf/trustees/pema_tshering.jpg";
import trusteeUgyenChoden from "@/assets/bhtf/trustees/ugyen_choden.jpg";
import trusteeNorbuDendup from "@/assets/bhtf/trustees/norbu_dendup.jpeg";
import trusteeChenchoNamgay from "@/assets/bhtf/trustees/chencho_t_namgay.jpeg";
import trusteeDrGyambo from "@/assets/bhtf/trustees/dr_gyambo_sithey.jpg";

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
      { title: "Board of Trustees & Fiduciary Governance | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official directory of the High-Level Board of Trustees of the Bhutan Health Trust Fund, ministerial governance, and fiduciary oversight.",
      },
    ],
  }),
  component: TrusteesPage,
});

const staticTrustees = [
  {
    name: "Lyonpo Tandin Wangchuk",
    role: "Chairperson",
    organization: "Hon'ble Minister for Health, Royal Government of Bhutan",
    badge: "Cabinet Chair",
    desc: "Appointed Chairperson under Cabinet Order C-3/4(4)/2024/35. Provides ministerial leadership, steering sovereign health financing and aligning BHTF disbursements with universal healthcare priorities.",
    photo: trusteeLyonpoTandin,
  },
  {
    name: "Lopen Tshering Wangchuk",
    role: "Trustee (Monastic Representative)",
    organization: "Secretary, Monastic Council Zhung Dratshang",
    badge: "Zhung Dratshang",
    desc: "Represents the Central Monastic Body (Zhung Dratshang), upholding ethical fiduciary responsibility, spiritual stewardship, and compassionate healthcare across the Kingdom.",
    photo: trusteeLopenTshering,
  },
  {
    name: "Ms. Ugyen Choden",
    role: "Trustee & Chairperson of AMC",
    organization: "Deputy Governor, Royal Monetary Authority (RMA)",
    badge: "Central Bank / AMC Chair",
    desc: "Brings extensive central banking, monetary policy, and financial regulatory expertise. Chairs the BHTF Asset Management Committee (AMC) overseeing capital preservation and asset allocation.",
    photo: trusteeUgyenChoden,
  },
  {
    name: "Mr. Chencho T. Namgay",
    role: "Trustee & Member AMC",
    organization: "CEO, National Pension & Provident Fund (NPPF)",
    badge: "Pension Fund / AMC Member",
    desc: "Provides institutional investment acumen, large-scale portfolio management insight, and fiduciary risk oversight as a member of the Board and Asset Management Committee.",
    photo: trusteeChenchoNamgay,
  },
  {
    name: "Mr. Norbu Dendup",
    role: "Trustee & Member AMC",
    organization: "Director, Department of Treasury & Accounts, Ministry of Finance",
    badge: "Ministry of Finance / AMC Member",
    desc: "Oversees public financial management, treasury coordination, and sovereign endowment governance, serving on the Board and Asset Management Committee.",
    photo: trusteeNorbuDendup,
  },
  {
    name: "Mr. Pema Tshering",
    role: "Trustee (Independent Director)",
    organization: "Former CEO, T Bank Ltd. (Financial Sector Specialist)",
    badge: "Financial Sector Specialist",
    desc: "Serves as an independent fiduciary expert with decades of commercial banking, capital markets, and corporate governance leadership in Bhutan.",
    photo: trusteePemaTshering,
  },
  {
    name: "Dr. Phub Tshering",
    role: "Trustee (Clinical & Medical Specialist)",
    organization: "Medical Director, Jigme Dorji Wangchuck National Referral Hospital (JDWNRH)",
    badge: "Clinical Specialist",
    bio: "Provides high-level clinical guidance, therapeutic efficacy reviews, and medical formulary alignment directly representing the nation's premier tertiary healthcare institution.",
    photo: trusteeDrPhub,
  },
  {
    name: "Dr. Gyambo Sithey, PhD",
    role: "Director",
    organization: "BHTF Secretariat",
    badge: "Director",
    desc: "Leads day-to-day operations of the BHTF Secretariat, execution of statutory board directives, donor engagement, and nationwide healthcare procurement disbursements.",
    photo: trusteeDrGyambo,
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
    Gyambo: trusteeDrGyambo,
  };

  const defaultPhotoList = [
    trusteeLyonpoTandin,
    trusteeLopenTshering,
    trusteeUgyenChoden,
    trusteeChenchoNamgay,
    trusteeNorbuDendup,
    trusteePemaTshering,
    trusteeDrPhub,
    trusteeDrGyambo,
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
      ? trusteesList.map((t, idx) => ({
          name: t.name,
          role: t.role,
          organization: t.organization || "Board of Trustees, BHTF",
          badge:
            t.badge ||
            (idx === 0 || t.name.toLowerCase().includes("tandin")
              ? "Chairperson"
              : t.role.toLowerCase().includes("secretary")
              ? "Member Secretary"
              : "Trustee"),
          desc: t.bio || staticTrustees[idx]?.desc || "Statutory fiduciary trustee managing health endowment allocations.",
          photo: resolvePhoto(t.name, t.photoUrl, idx),
        }))
      : staticTrustees;

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Sovereign Governance"
        title="Board of Trustees & Oversight"
        subtitle="High-level fiduciary stewardship entrusted by Royal Charter with the perpetual management and statutory allocation of the Bhutan Health Trust Fund."
        breadcrumb={[
          { label: "Home", to: "/" },
          { label: "About Us", to: "/about" },
          { label: "Board of Trustees" },
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
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs shrink-0 whitespace-nowrap"
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
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition shrink-0 whitespace-nowrap"
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

      {/* Statutory Mandate Overview */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              Royal Charter Mandated Governance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">
              Composition, Fiduciary Duty & Terms of Reference
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              Pursuant to the Royal Charter granted by His Majesty the Fourth Druk Gyalpo, the Board of Trustees sits as the supreme governing authority of the Trust Fund. The Board brings together the Minister for Health, Finance Secretary, international public health specialists, and eminent civil society appointees to protect the sovereign endowment and authorize healthcare disbursements.
            </p>
          </div>

          <div className="lg:col-span-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="font-bold text-slate-900 uppercase font-mono tracking-wider">
              Statutory Terms
            </div>
            <div className="text-slate-600 space-y-1">
              <div>• <strong>Meeting Cadence:</strong> Biannual statutory reviews & ad-hoc emergency sessions.</div>
              <div>• <strong>Quorum:</strong> Minimum two-thirds voting membership required.</div>
              <div>• <strong>Audit Inspection:</strong> Directly reports to the Royal Audit Authority.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Trustees Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-emerald-800 block mb-2 font-mono">
            Official Directory • High-Level Trustees
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-black text-slate-900">
            Members of the Board of Trustees
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 font-light">
            Distinguished leaders entrusted with safeguarding universal health security across all 20 Dzongkhags.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayTrustees.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="relative h-28 w-28 sm:h-32 sm:w-32 rounded-2xl overflow-hidden border-2 border-emerald-600/50 shadow-lg shrink-0 bg-slate-100 ring-4 ring-emerald-50">
                    <img
                      src={t.photo}
                      alt={t.name || t.role}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border shrink-0 ${
                    t.badge === "Chairperson"
                      ? "bg-amber-50 text-amber-900 border-amber-300"
                      : t.badge === "Member Secretary" || t.badge === "Director"
                      ? "bg-teal-50 text-teal-900 border-teal-300"
                      : "bg-emerald-50 text-emerald-800 border-emerald-200"
                  }`}>
                    {t.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                    {t.name}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-800 mt-0.5">
                    {t.role}
                  </div>
                  {t.organization && (
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {t.organization}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Statutory Fiduciary Oversight</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
