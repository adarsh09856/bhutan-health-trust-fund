import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { PageRenderer } from "@/components/page-renderer";
import { getPublicPage } from "@/lib/api/public.functions";
import type { PageBlockSection } from "@/lib/db/schema";

// These routes render institutional React layouts directly. CMS blocks are
// appended here so published page-editor changes also appear on those routes.
const CMS_ROUTE_SLUGS: Record<string, string> = {
  "/": "home",
  "/donate": "donate",
  "/get-involved": "get-involved",
  "/our-impact": "our-work",
  "/our-work": "our-work",
  "/resources": "resources",
  "/resources/advocacy": "resources-advocacy",
  "/resources/annual-reports": "resources-annual-reports",
  "/resources/financial-reports": "resources-financial-reports",
  "/resources/other-publications": "resources-other-publications",
  "/resources/audit-reports": "resources-audit-reports",
  "/resources/window-financing": "window-financing",
  "/news": "news",
  "/news/events": "news-events",
  "/news/announcements": "news-announcements",
  "/news/careers": "news-careers",
  "/reports": "reports",
  "/policies": "policies",
  "/contact": "contact",
  "/track-donation": "track-donation",
};

const ROUTES_WITH_LOCAL_RENDERER = new Set([
  "/about",
  "/about/organization",
  "/about/trustees",
  "/about/committees",
  "/about/secretariat",
  "/our-story",
  "/specimen",
]);

export function PublicPageSections() {
  const { pathname } = useLocation();
  const slug = CMS_ROUTE_SLUGS[pathname];
  const [sections, setSections] = useState<PageBlockSection[]>([]);

  useEffect(() => {
    let active = true;
    setSections([]);
    if (!slug || ROUTES_WITH_LOCAL_RENDERER.has(pathname)) return;

    getPublicPage({ data: { slug } })
      .then((page) => {
        if (!active || !page || page.status !== "published") return;
        try {
          const parsed: unknown = JSON.parse(page.sectionsJson);
          if (Array.isArray(parsed)) setSections(parsed as PageBlockSection[]);
        } catch {
          setSections([]);
        }
      })
      .catch(() => {
        if (active) setSections([]);
      });

    return () => {
      active = false;
    };
  }, [pathname, slug]);

  if (!slug || ROUTES_WITH_LOCAL_RENDERER.has(pathname) || sections.length === 0) return null;

  // The donate route already uses the CMS hero title and subtitle in PageHero.
  const renderableSections = pathname === "/donate" || pathname === "/get-involved"
    ? sections.filter((section) => section.type !== "hero")
    : sections;

  return <PageRenderer sections={renderableSections} pageSlug={slug} />;
}
