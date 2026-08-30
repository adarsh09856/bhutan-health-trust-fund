import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      { name: "description", content: "Bhutan Health Trust Fund finances essential medicines and vaccines to strengthen primary healthcare for every Bhutanese." },
      { name: "author", content: "Bhutan Health Trust Fund" },
      { property: "og:title", content: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      { property: "og:description", content: "Bhutan Health Trust Fund finances essential medicines and vaccines to strengthen primary healthcare for every Bhutanese." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@bhtf" },
      { name: "twitter:title", content: "Bhutan Health Trust Fund — Healthy People, Stronger Bhutan" },
      { name: "twitter:description", content: "Bhutan Health Trust Fund finances essential medicines and vaccines to strengthen primary healthcare for every Bhutanese." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e17b6eb8-cf46-4627-aff2-e3015c2263a0/id-preview-1b16821b--1500e745-e9c5-4059-bf43-ac2ab6aa42fb.lovable.app-1779890469584.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e17b6eb8-cf46-4627-aff2-e3015c2263a0/id-preview-1b16821b--1500e745-e9c5-4059-bf43-ac2ab6aa42fb.lovable.app-1779890469584.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

import { AdminAuthProvider } from "@/lib/admin-auth";
import { Toaster } from "sonner";
import { useLocation } from "@tanstack/react-router";

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <QueryClientProvider client={queryClient}>
      <AdminAuthProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          {!isAdminRoute && <SiteHeader />}
          <main className="flex-1">
            <Outlet />
          </main>
          {!isAdminRoute && <SiteFooter />}
        </div>
        <Toaster position="top-right" richColors />
      </AdminAuthProvider>
    </QueryClientProvider>
  );
}
