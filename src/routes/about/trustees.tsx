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
import trusteeLesang from "@/assets/reference/trustee_lesang_wangdi.webp";
import trusteeNawang from "@/assets/reference/trustee_nawang_norbu.webp";
import trusteeSonamTashi from "@/assets/reference/trustee_sonam_tashi.webp";
import trusteeTsheringDorji from "@/assets/reference/trustee_tshering_dorji.webp";
import trusteeTsheringYangzom from "@/assets/reference/trustee_tshering_yangzom.webp";
import trusteeSonamLeki from "@/assets/reference/trustee_sonam_leki_dorji.webp";
import directorKarma from "@/assets/reference/director_karma_tshering.webp";
import trusteeUjjwal from "@/assets/reference/trustee_ujjwal_deep_dahal.webp";

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
    badge: "Chairperson",
    desc: "Provides ministerial direction and policy leadership, ensuring alignment between national primary healthcare goals and trust fund commodity disbursements.",
    photo: trusteeLesang, // Fallback
  },
  {
    name: "Mr. Tshering Dorji",
    role: "Trustee (Finance & Sovereign Fiduciary)",
    organization: "Finance Secretary, Ministry of Finance, RGOB",
    badge: "Trustee",
    desc: "Supervises sovereign matching fund allocations, capital endowment ring-fencing, and statutory investment policy parameters.",
    photo: trusteeTsheringDorji,
  },
  {
    name: "Ambassador Lesang Wangdi",
    role: "Trustee & Senior Diplomatic Advisor",
    organization: "Board of Trustees, BHTF",
    badge: "Trustee",
    desc: "Oversees multilateral partnerships, international sovereign agreements, and bilateral healthcare endowments.",
    photo: trusteeLesang,
  },
  {
    name: "Dr. Nawang Norbu",
    role: "Trustee & Research Director",
    organization: "Board of Trustees, BHTF",
    badge: "Trustee",
    desc: "Directs epidemiological research, evidence-based health investment allocations, and climate health resilience.",
    photo: trusteeNawang,
  },
  {
    name: "Mr. Sonam Tashi",
    role: "Trustee & Chief Investment Strategist",
    organization: "Board of Trustees, BHTF",
    badge: "Trustee",
    desc: "Oversees investment portfolios, sovereign fixed-income allocations, and asset preservation benchmarks.",
    photo: trusteeSonamTashi,
  },
  {
    name: "Ms. Tshering Yangzom",
    role: "Trustee (Governance & Legal Compliance)",
    organization: "Board of Trustees, BHTF",
    badge: "Trustee",
    desc: "Ensures institutional compliance with the Royal Charter, RAA clean audit mandates, and fiduciary ethics regulations.",
    photo: trusteeTsheringYangzom,
  },
  {
    name: "Mr. Sonam Leki Dorji",
    role: "Trustee (Procurement & Clinical Logistics)",
    organization: "Board of Trustees, BHTF",
    badge: "Trustee",
    desc: "Oversees international WHO-prequalified vaccine tenders, alpine cold chain distribution, and zero-stockout supply lines.",
    photo: trusteeSonamLeki,
  },
  {
    name: "Mr. Ujjwal Deep Dahal",
    role: "Trustee (Technology & Systems Innovation)",
    organization: "Board of Trustees, BHTF / DHI",
    badge: "Trustee",
    desc: "Advises on digital health infrastructure, automated pharmaceutical logistics, and supply chain telemetry.",
    photo: trusteeUjjwal,
  },
  {
    name: "Dr. Karma Tshering",
    role: "Director & Member Secretary",
    organization: "Secretariat, Bhutan Health Trust Fund",
    badge: "Member Secretary",
    desc: "Executive head of the Secretariat, leading day-to-day operations, endowment investments, and national procurement releases.",
    photo: directorKarma,
  },
];

function TrusteesPage() {
  const { liveTrustees, customSections } = Route.useLoaderData();
  const [trusteesList, setTrusteesList] = useState<Trustee[]>(liveTrustees);

  if (customSections && customSections.length > 0) {
    return (
      <div className="flex flex-col gap-0 bg-[#FAF8F3] text-slate-900 min-h-screen pt-24 sm:pt-28">
        <PageRenderer sections={customSections} interactive={false} />
      </div>
    );
  }

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
    Lesang: trusteeLesang,
    Nawang: trusteeNawang,
    "Sonam Tashi": trusteeSonamTashi,
    "Tshering Dorji": trusteeTsheringDorji,
    "Tshering Yangzom": trusteeTsheringYangzom,
    "Sonam Leki": trusteeSonamLeki,
    Karma: directorKarma,
    Ujjwal: trusteeUjjwal,
  };

  const resolvePhoto = (name: string, photo: string | null) => {
    if (photo && (photo.startsWith("http://") || photo.startsWith("https://") || photo.startsWith("/assets/reference/"))) {
      return photo;
    }
    for (const key of Object.keys(trusteeFallbackPhotos)) {
      if (name.toLowerCase().includes(key.toLowerCase())) {
        return trusteeFallbackPhotos[key];
      }
    }
    return trusteeLesang;
  };

  const displayTrustees =
    trusteesList.length > 0
      ? trusteesList.map((t) => ({
          name: t.name,
          role: t.role,
          organization: t.organization || "Board of Trustees, BHTF",
          badge: t.orderIndex === 0 ? "Chairperson" : t.orderIndex === 8 ? "Member Secretary" : "Trustee",
          desc: t.bio || "Statutory fiduciary trustee managing health endowment allocations.",
          photo: resolvePhoto(t.name, t.photoUrl),
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
        <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-lg flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs font-bold">
          <Link
            to="/about/organization"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
          >
            Our Organization
          </Link>
          <Link
            to="/about/trustees"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-xs"
          >
            Board of Trustees
          </Link>
          <Link
            to="/about/committees"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
          >
            Asset Management Committee
          </Link>
          <Link
            to="/about/secretariat"
            className="px-4 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-slate-100 transition"
          >
            Secretariat & Organogram
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
                <div className="flex items-center justify-between">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-emerald-600/40 shadow-md shrink-0 bg-slate-100">
                    <img
                      src={t.photo}
                      alt={t.name || t.role}
                      className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                    t.badge === "Chairperson"
                      ? "bg-amber-50 text-amber-900 border-amber-300"
                      : t.badge === "Member Secretary"
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
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {t.organization}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-light">
                  {t.desc}
                </p>
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
