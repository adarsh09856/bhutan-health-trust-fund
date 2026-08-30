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
} from "lucide-react";
import { toast } from "sonner";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/news/$slug")({
  head: () => ({
    meta: [{ title: "News Story | Bhutan Health Trust Fund" }],
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
    toast.success("Article link copied to clipboard!");
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
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading story...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-slate-500 mt-2">The news article you are looking for does not exist or has been unlisted.</p>
        <Link
          to="/news"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News & Media
        </Link>
      </div>
    );
  }

  return (
    <article className="py-10 bg-slate-50/50">
      <div className="mx-auto max-w-4xl px-4">
        {/* Back navigation */}
        <Link
          to="/news"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> All News & Updates
        </Link>

        {/* Header Title Section */}
        <div className="space-y-3 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
              <Tag className="h-3 w-3" /> {article.category}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" /> {new Date(article.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <User className="h-3.5 w-3.5" /> {article.author}
            </span>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" /> {article.viewsCount.toLocaleString()} views
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold text-primary leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Cover Photo */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg mb-8 border border-slate-200">
          <img
            src={getImage(article.coverImage)}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="prose prose-slate max-w-none text-slate-800 leading-relaxed space-y-4 whitespace-pre-wrap font-sans text-base">
            {article.content}
          </div>

          {/* Social Share Bar */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Share2 className="h-4 w-4 text-primary" /> Share this announcement
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>

        {/* Related Stories */}
        {related.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-primary">Related Press & Announcements</h3>
              <Link to="/news" className="text-xs font-semibold text-secondary hover:underline">
                View All →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/news/$slug"
                  params={{ slug: r.slug }}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-md transition flex flex-col"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getImage(r.coverImage)}
                      alt={r.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-semibold text-secondary uppercase mb-1">
                        {r.category}
                      </div>
                      <h4 className="font-semibold text-sm text-primary line-clamp-2 leading-snug group-hover:underline">
                        {r.title}
                      </h4>
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-3 flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {new Date(r.publishedAt).toLocaleDateString()}
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
