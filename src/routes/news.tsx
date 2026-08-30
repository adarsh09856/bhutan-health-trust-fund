import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicNews } from "@/lib/api/public.functions";
import type { NewsArticle } from "@/lib/db/schema";
import { Calendar, Search, ArrowRight, Loader2, Tag } from "lucide-react";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Media Updates | Bhutan Health Trust Fund" },
      { name: "description", content: "Latest announcements, health commodity procurements, and press releases from BHTF." },
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

  return (
    <>
      <PageHero
        title="Media & News"
        subtitle="Stories, announcements and updates from BHTF and our partners across all 20 dzongkhags of Bhutan."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 space-y-8">
        {/* Search & Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 flex-1 w-full">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search news, vaccine campaigns, annual updates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === c
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {c === "ALL" ? "All Stories" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-2 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm font-medium">Fetching news announcements...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 p-8">
            <p className="text-sm">No stories found matching your filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((n) => (
              <Link
                key={n.id}
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="bg-white border rounded-xl overflow-hidden group hover:shadow-lg transition duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={getImage(n.coverImage)}
                      alt={n.title}
                      loading="lazy"
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md">
                      {n.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <Calendar className="h-3.5 w-3.5 text-slate-400" />{" "}
                      {new Date(n.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </p>
                    <h3 className="font-bold text-base text-primary leading-snug mb-2 group-hover:text-secondary transition">
                      {n.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {n.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center text-xs font-semibold text-primary group-hover:text-secondary transition gap-1">
                  Read Full Story <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}