import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicNews } from "@/lib/api/public.functions";
import type { NewsArticle } from "@/lib/db/schema";
import { Calendar, Search, ArrowRight, Loader2, Tag, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Press Releases | Bhutan Health Trust Fund" },
      {
        name: "description",
        content:
          "Official press releases, vaccine campaigns, annual reports, and healthcare commodity updates from Bhutan Health Trust Fund.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    getPublicNews()
      .then((res) => setArticles(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getImage = (img: string) => {
    if (img.includes("vaccine")) return newsVaccine;
    if (img.includes("community")) return newsCommunity;
    if (img.includes("report")) return newsReport;
    return newsVaccine;
  };

  const categories = ["ALL", "Immunization", "Essential Medicines", "Governance", "Partnership"];

  const filtered = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || a.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const regularStories = filtered.slice(1);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20">
      <PageHero
        badge="Official Media Room"
        title="News, Media & Press Releases"
        subtitle="Unbiased coverage of public health financing milestones, vaccine supply chains, and community healthcare impacts."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2.5 flex-1 w-full bg-slate-50 rounded-xl px-3.5 py-2 border border-slate-200/80">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search news, vaccine drives, annual meetings, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === c
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "ALL" ? "All Topics" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-sm font-semibold">Loading official media updates...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm font-medium">No announcements found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Hero Article */}
            {featured && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto relative bg-slate-100 overflow-hidden">
                  <img
                    src={getImage(featured.coverImage)}
                    alt={featured.title}
                    className="h-full w-full object-cover hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900/90 text-white text-xs font-bold backdrop-blur-md">
                      Featured Spotlight
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                        {featured.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(featured.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug hover:text-emerald-700 transition">
                      <Link to="/news/$slug" params={{ slug: featured.slug }}>
                        {featured.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/news/$slug"
                      params={{ slug: featured.slug }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-xs"
                    >
                      <span>Read Press Release</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Grid for Remaining Articles */}
            {regularStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {regularStories.map((n) => (
                  <article
                    key={n.id}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                        <img
                          src={getImage(n.coverImage)}
                          alt={n.title}
                          loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                          {n.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-2.5">
                        <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                          <Calendar className="h-3.5 w-3.5 text-emerald-600" />
                          {new Date(n.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>

                        <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                          <Link to="/news/$slug" params={{ slug: n.slug }}>
                            {n.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                          {n.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <Link
                        to="/news/$slug"
                        params={{ slug: n.slug }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition"
                      >
                        <span>Full Article</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition duration-150" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}