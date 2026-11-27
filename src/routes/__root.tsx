import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteLayout } from "@/components/site/Layout";
import { Toaster } from "@/components/ui/sonner";
import { applyContent } from "@/lib/cms";
import { getSiteContent } from "@/lib/cms.functions";

function NotFoundComponent() {
  return (
    <div className="container py-5 text-center" style={{ minHeight: "65vh", display: "grid", placeItems: "center" }}>
      <div>
        <h1 className="display-1 text-primary">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted mb-4">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <Link to="/" className="btn btn-primary px-4 py-2">Go Back To Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="container py-5 text-center" style={{ minHeight: "65vh", display: "grid", placeItems: "center" }}>
      <div>
        <h2 className="mb-3">This page didn&apos;t load</h2>
        <p className="text-muted mb-4">Something went wrong on our end. You can try refreshing or head back home.</p>
        <div className="d-flex justify-content-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn btn-outline-secondary">
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
      { title: "Dr. Md. Afzal Mahfuzullah | Vitreo-Retina Specialist & Phaco Surgeon" },
      { name: "description", content: "Vitreo-Retina Specialist & Phaco Surgeon in Dhaka — Vision Eye Hospital, Green Road." },
      { name: "author", content: "Dr. Md. Afzal Mahfuzullah" },
      { property: "og:title", content: "Dr. Md. Afzal Mahfuzullah | Vitreo-Retina Specialist" },
      { property: "og:description", content: "Expert eye care at Vision Eye Hospital, Green Road, Dhaka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,500;1,9..144,600&family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" },
      { rel: "stylesheet", href: "/site/css/css2.css" },
      { rel: "stylesheet", href: "/site/css/all.min.css" },
      { rel: "stylesheet", href: "/site/css/bootstrap-icons.css" },
      { rel: "stylesheet", href: "/site/css/bootstrap.min.css" },
      { rel: "stylesheet", href: "/site/css/style.css" },
      { rel: "stylesheet", href: "/site/css/typography.css" },
      { rel: "stylesheet", href: "/site/css/html.css" },
      { rel: "stylesheet", href: "/site/css/training.css" },
      { rel: "stylesheet", href: "/site/css/gallery.css" },
      { rel: "stylesheet", href: "/site/css/videos.css" },
      { rel: "stylesheet", href: "/site/css/publications.css" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  }),
  loader: () => getSiteContent(),
  staleTime: 0,
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const content = Route.useLoaderData();
  applyContent(content);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const bare = path.startsWith("/admin") || path.startsWith("/auth");

  return (
    <QueryClientProvider client={queryClient}>
      {bare ? (
        <Outlet />
      ) : (
        <SiteLayout>
          <Outlet />
        </SiteLayout>
      )}
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
