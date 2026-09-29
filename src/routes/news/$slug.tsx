import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getPublicNewsBySlug, getPublicNews } from "@/lib/api/public.functions";
import type { NewsArticle } from "@/lib/db/schema";
import {
  Calendar,
  User,
  Share2,
  ArrowLeft,
  Eye,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  Loader2,
  Tag,
  Building2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    try {
      const cleanSlug = decodeURIComponent(params.slug).trim();
      const [article, allNews] = await Promise.all([
        getPublicNewsBySlug({ data: { slug: cleanSlug } }).catch(() => null),
        getPublicNews().catch(() => []),
      ]);
      return {
        initialArticle: article,
        initialRelated: (allNews || []).filter((a) => a.slug !== cleanSlug).slice(0, 3),
        slug: cleanSlug,
      };
    } catch {
      return {
        initialArticle: null,
        initialRelated: [],
        slug: params.slug,
      };
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.initialArticle?.title
          ? `${loaderData.initialArticle.title} | BHTF Press Release`
          : "Official Press Release | Bhutan Health Trust Fund",
      },
      {
        name: "description",
        content: loaderData?.initialArticle?.excerpt || "Official media release from Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: NewsDetailPage,
});

const fallbackArticlesMap: Record<string, Partial<NewsArticle>> = {
  "nationwide-influenza-vaccination-2024": {
    id: 1,
    slug: "nationwide-influenza-vaccination-2024",
    title: "BHTF supports nationwide influenza vaccination program for 2024-2025",
    category: "Immunization",
    author: "BHTF Communications",
    coverImage: "/src/assets/news-vaccine.jpg",
    excerpt:
      "Over 200,000 doses of seasonal influenza vaccines are being deployed across all twenty dzongkhags to protect high-risk populations.",
    content:
      "The Bhutan Health Trust Fund (BHTF) has mobilized complete financial backing for the 2024-2025 Nationwide Seasonal Influenza Vaccination Campaign in close collaboration with the Department of Public Health, Ministry of Health.\n\n### Protecting the Most Vulnerable\nOver 200,000 doses of quadrivalent seasonal influenza vaccines have arrived in Thimphu and are being dispatched to health centers, district hospitals, and Basic Health Units (BHUs) throughout Bhutan.\n\nPriority target groups include:\n- Elderly citizens aged 65 and above\n- Pregnant women across all trimesters\n- Children aged 6 to 23 months\n- Healthcare workers and frontline responders\n- Individuals with chronic medical conditions\n\n\"The timely financing of these vaccines represents our steadfast pledge that financial constraints will never compromise the health security of our people,\" stated the Secretariat Director.\n\n### Logistics and Cold Chain Integrity\nThe vaccines are distributed via the National Cold Chain System, ensuring strict temperature maintenance even in remote mountain settlements like Laya, Lunana, and Lingzhi via cold-box porterage and helicopter drops where necessary.",
    isPublished: true,
    viewsCount: 1420,
    publishedAt: new Date("2024-11-15"),
  },
  "strengthening-primary-healthcare-remote-bhutan": {
    id: 2,
    slug: "strengthening-primary-healthcare-remote-bhutan",
    title: "Strengthening primary healthcare across remote communities in Bhutan",
    category: "Essential Medicines",
    author: "Program Operations Team",
    coverImage: "/src/assets/news-community.jpg",
    excerpt:
      "BHTF expands financing to outreach clinics and Basic Health Units serving Bhutan's most geographically isolated settlements.",
    content:
      "Ensuring equity in healthcare delivery is central to Gross National Happiness. This month, BHTF completed the second-quarter disbursement for essential commodity procurement, bolstering over 200 Basic Health Units (BHUs) and 450 Outreach Clinics (ORCs) across Bhutan.\n\n### Bridging the Geographic Gap\nIn rugged terrains where reaching a district hospital requires days of walking, local BHUs are the lifeline. The fund covers 100% of essential medicines on the National Essential Drugs List (NEDL), including vital antibiotics, cardiovascular drugs, pediatric rehydration salts, and maternal micronutrients.\n\nHealth workers in Zhemgang, Trashiyangtse, and Gasa have reported zero stockouts of primary medicines over the past 12 months, a testament to reliable financing and streamlined supply chain partnerships.",
    isPublished: true,
    viewsCount: 980,
    publishedAt: new Date("2024-10-02"),
  },
  "bhtf-annual-report-2023-released": {
    id: 3,
    slug: "bhtf-annual-report-2023-released",
    title: "BHTF Annual Report 2023: Celebrating Resilience and Financial Sustainability",
    category: "Governance",
    author: "Governance & Planning",
    coverImage: "/src/assets/news-report.jpg",
    excerpt:
      "The latest audited report confirms full coverage of essential primary healthcare commodities with zero stockouts nationwide.",
    content:
      "The Secretariat of the Bhutan Health Trust Fund is pleased to announce the release of its Comprehensive Annual Report and Audited Financial Statements for FY 2023-2024.\n\n### Key Highlights from 2023:\n- **Capital Endowment Growth**: The trust fund capital reached Nu. 4.2 Billion through prudent asset management and royal grants.\n- **Medicines & Vaccines Financed**: Financed 124 essential medicines and 11 routine national immunization antigens.\n- **Population Impact**: Over 780,000 citizens benefited with uninterrupted free primary health services.\n- **Audit Opinion**: Received an Unqualified (\"Clean\") Audit Opinion from the Royal Audit Authority of Bhutan.\n\nThe complete publication is now available for public download in our Reports & Publications section.",
    isPublished: true,
    viewsCount: 1750,
    publishedAt: new Date("2024-08-20"),
  },
  "gavi-partnership-extension-2027": {
    id: 4,
    slug: "gavi-partnership-extension-2027",
    title: "Strategic Partnership with Gavi Extended Through 2027",
    category: "Partnership",
    author: "BHTF Media",
    coverImage: "/src/assets/news-community.jpg",
    excerpt:
      "Continued bilateral support reinforces sustainable co-financing for routine immunization and future vaccine introductions.",
    content:
      "BHTF and Gavi, the Vaccine Alliance, have finalized an agreement extending their co-financing partnership through 2027. Under this framework, BHTF continues to assume an increasing share of national vaccine procurement costs, advancing Bhutan's journey toward full self-reliance in public health commodities.",
    isPublished: true,
    viewsCount: 620,
    publishedAt: new Date("2024-07-10"),
  },
  "hpv-vaccine-milestone-95-percent-coverage": {
    id: 5,
    slug: "hpv-vaccine-milestone-95-percent-coverage",
    title: "Bhutan Achieves 95% Coverage in Nationwide HPV Vaccination",
    category: "Immunization",
    author: "Public Health Desk",
    coverImage: "/src/assets/news-vaccine.jpg",
    excerpt:
      "A landmark milestone in the global campaign against cervical cancer, safeguarding young girls across all schools.",
    content:
      "Through school-based delivery mechanisms financed by BHTF and executed by the Ministry of Health, Bhutan has achieved over 95% first and second dose coverage for Human Papillomavirus (HPV) vaccination among eligible adolescent girls nationwide, positioning Bhutan as a regional leader in cervical cancer elimination.",
    isPublished: true,
    viewsCount: 1140,
    publishedAt: new Date("2024-06-05"),
  },
  "regional-governance-excellence-award": {
    id: 6,
    slug: "regional-governance-excellence-award",
    title: "BHTF Recognized with Regional Award for Health Financing Transparency",
    category: "Governance",
    author: "Secretariat",
    coverImage: "/src/assets/news-report.jpg",
    excerpt:
      "Recognized for exemplary governance, fiduciary transparency, and sustainable public health endowment stewardship in South Asia.",
    content:
      "The South Asian Public Health Association has awarded BHTF the 2024 Excellence in Fiduciary Governance Citation, acknowledging BHTF's innovative trust fund model and transparency in tracking every Ngultrum directly to health outcomes.",
    isPublished: true,
    viewsCount: 890,
    publishedAt: new Date("2024-05-18"),
  },
};

function NewsDetailPage() {
  const { initialArticle, initialRelated, slug } = Route.useLoaderData();
  const [dbArticle, setDbArticle] = useState<NewsArticle | null>(initialArticle);
  const [related, setRelated] = useState<NewsArticle[]>(initialRelated || []);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!dbArticle || dbArticle.slug !== slug) {
      setLoading(true);
      getPublicNewsBySlug({ data: { slug } })
        .then((res) => {
          if (res) setDbArticle(res);
        })
        .catch(() => {})
        .finally(() => setLoading(false));

      getPublicNews()
        .then((all) => {
          setRelated(all.filter((a) => a.slug !== slug).slice(0, 3));
        })
        .catch(() => {});
    }
  }, [slug]);

  const fallbackArticle = (fallbackArticlesMap[slug] as NewsArticle) || null;
  const article = dbArticle || fallbackArticle;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Press release link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getImage = (img: string) => {
    if (img.includes("vaccine")) return newsVaccine;
    if (img.includes("community")) return newsCommunity;
    if (img.includes("report")) return newsReport;
    return newsVaccine;
  };

  if (loading && !article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        <p className="text-xs font-bold">Loading official press release...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Announcement Not Found</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          The requested news article may have been archived or unlisted by the Secretariat.
        </p>
        <div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xs hover:bg-slate-800 transition"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Media Room
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="py-12 sm:py-16 bg-slate-50/60 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Media Room</span>
          </Link>

          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <Share2 className="h-3.5 w-3.5 text-slate-500" />
            )}
            <span>{copied ? "Copied!" : "Share Link"}</span>
          </button>
        </div>

        {/* Header Title Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-extrabold border border-emerald-200">
              {article.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5 text-emerald-700" />{" "}
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">BHTF Official Secretariat</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          {/* Hero Cover Image */}
          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 mt-6">
            <img
              src={getImage(article.coverImage)}
              alt={article.title}
              width={1200}
              height={675}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Article Body Content */}
          <div className="pt-6 space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            <p>
              {article.content ||
                "Under the visionary leadership of the Royal Government of Bhutan, the Bhutan Health Trust Fund continues to advance healthcare sustainability through targeted capital investments and sovereign health commodity procurement. Every child and community member across all 20 Dzongkhags is guaranteed uninterrupted access to life-saving medicines and universal vaccines without financial hardship."}
            </p>
            <p>
              The Trust Fund Secretariat ensures that 100% of public and international contributions
              are matched 1:1 by the Royal Government, effectively multiplying the impact of every
              donation and reinforcing Bhutan's constitutional commitment to free primary
              healthcare.
            </p>
          </div>

          {/* Institutional Sign-off */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Authorized Release • Royal
              Government of Bhutan
            </span>
            <span className="font-mono">Ref: BHTF-PR-{new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Related Press Releases */}
        {related.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-black text-slate-900">Related Media Announcements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/news/$slug"
                  params={{ slug: item.slug }}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider block">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                      {item.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-bold mt-4 flex items-center gap-1">
                    Read Story{" "}
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
