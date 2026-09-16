import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";
import { PageRenderer } from "@/components/page-renderer";
import { Loader2, ArrowLeft, Layers } from "lucide-react";

export const Route = createFileRoute("/p/$slug")({
  component: CustomPublicPageRoute,
});

export function CustomPublicPageRoute() {
  const { slug } = Route.useParams();
  const [sections, setSections] = useState<PageBlockSection[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const page = await getPublicPage({ data: { slug } });
        if (!page) {
          setNotFound(true);
        } else {
          setTitle(page.title);
          try {
            const parsed = JSON.parse(page.sectionsJson);
            setSections(parsed);
          } catch {
            setSections([]);
          }
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-slate-500 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
        <span className="text-xs">Loading page content...</span>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
          <Layers className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-slate-900">Page Not Found</h1>
        <p className="text-sm text-slate-600 max-w-md font-sans">
          The custom page you are looking for does not exist or has not been published live yet.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageRenderer sections={sections} interactive={false} />
    </div>
  );
}
