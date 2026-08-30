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
        <p className="text-sm font-semibold">Loading official press release...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">Announcement Not Found</h2>
        <p className="text-sm text-slate-500">
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
        {/* Back navigation */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News & Media Room
        </Link>

        {/* Header Title Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1 font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Tag className="h-3 w-3" /> {article.category}
            </span>
            <span className="text-slate-500 flex items-center gap-1 font-medium">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="text-slate-500 flex items-center gap-1 font-medium">
              <User className="h-3.5 w-3.5 text-slate-400" /> {article.author}
            </span>
            <span className="text-slate-400 flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {article.viewsCount.toLocaleString()} views
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Cover Photo */}
        <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-md border border-slate-200 bg-slate-100">
          <img
            src={getImage(article.coverImage)}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-12 shadow-xs space-y-6">
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed text-sm sm:text-base whitespace-pre-wrap font-sans space-y-4">
            {article.content}
          </div>

          {/* Social Share Bar */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="h-4 w-4 text-emerald-700" />
              <span>Official BHTF Secretariat Announcement</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                <span>{copied ? "Link Copied!" : "Share Link"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Related Press Releases
              </h3>
              <Link to="/news" className="text-xs font-bold text-emerald-700 hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/news/$slug"
                  params={{ slug: r.slug }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-lg hover:border-emerald-300 transition duration-200 flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={getImage(r.coverImage)}
                      alt={r.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 uppercase">
                        {r.category}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition line-clamp-2 leading-snug mt-1">
                        {r.title}
                      </h4>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <Calendar className="h-3 w-3" />
                      {new Date(r.publishedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
