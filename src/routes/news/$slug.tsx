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
  head: () => ({
    meta: [{ title: "Official Press Release | Bhutan Health Trust Fund" }],
  }),
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [related, setRelated] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPublicNewsBySlug({ data: { slug } })
      .then((res) => {
        setArticle(res);
      })
      .catch(() => toast.error("Failed to load article."))
      .finally(() => setLoading(false));

    getPublicNews()
      .then((all) => {
        setRelated(all.filter((a) => a.slug !== slug).slice(0, 3));
      })
      .catch(() => {});
  }, [slug]);

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

  if (loading) {
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
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5 text-slate-500" />}
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
              <Calendar className="h-3.5 w-3.5 text-emerald-700" /> {article.publishedAt}
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
              The Trust Fund Secretariat ensures that 100% of public and international contributions are matched 1:1 by the Royal Government, effectively multiplying the impact of every donation and reinforcing Bhutan's constitutional commitment to free primary healthcare.
            </p>
          </div>

          {/* Institutional Sign-off */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5 font-bold text-emerald-800">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> Authorized Release • Royal Government of Bhutan
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
                    Read Story <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition" />
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
