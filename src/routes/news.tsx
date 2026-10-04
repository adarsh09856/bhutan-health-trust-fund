import { createFileRoute, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageHero } from "@/components/page-hero";
import { getPublicNews, getPublicPage } from "@/lib/api/public.functions";
import type { NewsArticle, PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { SectionEditBadge } from "@/components/public/section-edit-badge";
import {
  Calendar,
  Search,
  ArrowRight,
  Loader2,
  Tag,
  Clock,
  ArrowUpRight,
  Sparkles,
  Newspaper,
  Briefcase,
} from "lucide-react";
import newsVaccine from "@/assets/news-vaccine.jpg";
import newsCommunity from "@/assets/news-community.jpg";
import newsReport from "@/assets/news-report.jpg";

export const Route = createFileRoute("/news")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: typeof search.category === "string" ? search.category : undefined,
  }),
  loader: async () => {
    try {
      const [page, news] = await Promise.all([
        getPublicPage({ data: { slug: "news" } }).catch(() => null),
        getPublicNews().catch(() => []),
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
      return { customSections: sections, initialArticles: (news || []) as NewsArticle[] };
    } catch {
      return { customSections: null, initialArticles: [] };
    }
  },
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

const fallbackArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "nationwide-influenza-vaccination-2024",
    title: "BHTF supports nationwide influenza vaccination program for 2024-2025",
    category: "Immunization",
    author: "BHTF Communications",
    coverImage: "/src/assets/news-vaccine.jpg",
    excerpt:
      "Over 200,000 doses of seasonal influenza vaccines are being deployed across all twenty dzongkhags to protect high-risk populations.",
    content: "The Bhutan Health Trust Fund (BHTF) has mobilized complete financial backing for the 2024-2025 Nationwide Seasonal Influenza Vaccination Campaign in close collaboration with the Department of Public Health, Ministry of Health.",
    isPublished: true,
    viewsCount: 1420,
    publishedAt: new Date("2024-11-15"),
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
  },
  {
    id: 2,
    slug: "strengthening-primary-healthcare-remote-bhutan",
    title: "Strengthening primary healthcare across remote communities in Bhutan",
    category: "Essential Medicines",
    author: "Program Operations Team",
    coverImage: "/src/assets/news-community.jpg",
    excerpt:
      "BHTF expands financing to outreach clinics and Basic Health Units serving Bhutan's most geographically isolated settlements.",
    content: "Ensuring equity in healthcare delivery is central to Gross National Happiness. This month, BHTF completed the second-quarter disbursement for essential commodity procurement, bolstering over 200 Basic Health Units (BHUs) and 450 Outreach Clinics (ORCs) across Bhutan.",
    isPublished: true,
    viewsCount: 980,
    publishedAt: new Date("2024-10-02"),
    createdAt: new Date("2024-10-02"),
    updatedAt: new Date("2024-10-02"),
  },
  {
    id: 3,
    slug: "bhtf-annual-report-2023-released",
    title: "BHTF Annual Report 2023: Celebrating Resilience and Financial Sustainability",
    category: "Governance",
    author: "Governance & Planning",
    coverImage: "/src/assets/news-report.jpg",
    excerpt:
      "The latest audited report confirms full coverage of essential primary healthcare commodities with zero stockouts nationwide.",
    content: "The Secretariat of the Bhutan Health Trust Fund is pleased to announce the release of its Comprehensive Annual Report and Audited Financial Statements for FY 2023-2024.",
    isPublished: true,
    viewsCount: 750,
    publishedAt: new Date("2024-08-20"),
    createdAt: new Date("2024-08-20"),
    updatedAt: new Date("2024-08-20"),
  },
];

function NewsPage() {
  const location = useLocation();
  const isExactNews = location.pathname === "/news" || location.pathname === "/news/";

  if (!isExactNews) {
    return <Outlet />;
  }

  const { customSections, initialArticles } = Route.useLoaderData();
  const [articles, setArticles] = useState<NewsArticle[]>(
    initialArticles && initialArticles.length > 0 ? initialArticles : fallbackArticles,
  );
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchParams = Route.useSearch();
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.category || "ALL");

  useEffect(() => {
    if (searchParams?.category) {
      setSelectedCategory(searchParams.category);
    }
  }, [searchParams?.category]);

  useEffect(() => {
    getPublicNews()
      .then((res) => {
        if (res && res.length > 0) setArticles(res);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getImage = (img: string) => {
    if (img.includes("vaccine")) return newsVaccine;
    if (img.includes("community")) return newsCommunity;
    if (img.includes("report")) return newsReport;
    return newsVaccine;
  };

  const categories = [
    { id: "ALL", label: "All Releases" },
    { id: "EVENTS", label: "Upcoming Events", match: ["Events & Campaigns", "Immunization", "Campaign", "EVENTS", "Events"] },
    { id: "OFFICIAL_NEWS", label: "Announcement", match: ["Official News", "Governance", "Partnership", "OFFICIAL_NEWS", "Announcement", "Announcements"] },
    { id: "CAREERS", label: "Career", match: ["Career", "Careers", "Vacancies", "Recruitment", "CAREERS"] },
    { id: "FIELD_ACTIVITIES", label: "Field Activities", match: ["Field Activities", "Essential Medicines", "Logistics"] },
  ];

  const activeArticles = articles.length > 0 ? articles : fallbackArticles;

  const filtered = activeArticles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(search.toLowerCase());
    const catObj = categories.find((c) => c.id === selectedCategory);
    const matchesCategory =
      selectedCategory === "ALL" ||
      (catObj?.match ? catObj.match.includes(a.category) : a.category === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const regularStories = filtered.slice(1);

  return (
    <div className="space-y-12 sm:space-y-16 pb-20 bg-[#FAF8F3]">
      <PageHero
        badge="Official Media Room"
        title="News, Media & Press Releases"
        subtitle="Authoritative coverage of national health financing milestones, vaccine supply chains, and community health impacts."
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10 relative" data-bhtf-section="news-bulletins">
        <SectionEditBadge
          label="News & Media Bulletins"
          pageSlug="news"
          sectionId="news-bulletins"
          studioHref="/admin/news"
          initialData={{
            title: "News, Media & Press Releases",
            subtitle: "Authoritative coverage of national health financing milestones, vaccine supply chains, and community health impacts.",
            badge: "Official Media Room",
          }}
        />
        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5 flex-1 w-full bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-200">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search press releases, immunization campaigns, audit reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm outline-none bg-transparent placeholder-slate-400 text-slate-900"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer ${
                  selectedCategory === c.id
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center gap-3 text-slate-500">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            <p className="text-xs font-bold">Loading media releases...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-12 text-center space-y-2">
            <Newspaper className="h-10 w-10 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">No press releases found</h3>
            <p className="text-xs text-slate-500">
              Try modifying your search or clearing the category filter.
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Featured Hero Story */}
            {featured && (
              <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-emerald-300 transition duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 group">
                <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden relative bg-slate-100">
                  <img
                    src={getImage(featured.coverImage)}
                    alt={featured.title}
                    width={1000}
                    height={600}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
                      Featured Release
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                      <span className="flex items-center gap-1 text-emerald-700 font-bold">
                        <Calendar className="h-3.5 w-3.5" />{" "}
                        {new Date(featured.publishedAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold">
                        {featured.category}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition leading-tight">
                      <Link to="/news/$slug" params={{ slug: featured.slug }}>
                        {featured.title}
                      </Link>
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Reading Time: ~4 min</span>
                    <Link
                      to="/news/$slug"
                      params={{ slug: featured.slug }}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition duration-150" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Regular Stories Grid */}
            {regularStories.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {regularStories.map((item) => (
                  <article
                    key={item.slug}
                    className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-2xl hover:border-emerald-300 transition duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                        <img
                          src={getImage(item.coverImage)}
                          alt={item.title}
                          loading="lazy"
                          width={800}
                          height={500}
                          className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold shadow-md">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                          <Calendar className="h-3.5 w-3.5 text-emerald-700" />
                          <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
                        </div>

                        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-700 transition leading-snug line-clamp-2">
                          <Link to="/news/$slug" params={{ slug: item.slug }}>
                            {item.title}
                          </Link>
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          to="/news/$slug"
                          params={{ slug: item.slug }}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800 transition"
                        >
                          <span>Read Full Story</span>
                          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition duration-150" />
                        </Link>
                      </div>
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
