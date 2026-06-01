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
import { AuthProvider } from "@/lib/auth";

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
      { title: "FASTWear - Thuê phong cách cho từng khoảnh khắc" },
      {
        name: "description",
        content:
          "FASTWear là hệ sinh thái thời trang O2O tiên phong tại Việt Nam, giúp bạn thuê outfit cao cấp cho tiệc cưới, sự kiện, prom, công sở và du lịch.",
      },
      { name: "author", content: "FASTWear" },
      { property: "og:title", content: "FASTWear - Thuê phong cách cho từng khoảnh khắc" },
      {
        property: "og:description",
        content:
          "Hệ sinh thái thời trang O2O giúp bạn tìm trang phục phù hợp mà không cần chi hàng triệu đồng để mua mới.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "FASTWear - Thuê phong cách cho từng khoảnh khắc" },
      {
        name: "twitter:description",
        content:
          "Thuê outfit cao cấp cho tiệc cưới, sự kiện, prom, công sở và những dịp quan trọng.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2f10df4a-6706-468f-bf31-92bffd478d8e/id-preview-e8143deb--c5b5026f-261b-42c8-babf-87add9dedee2.lovable.app-1778217598552.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2f10df4a-6706-468f-bf31-92bffd478d8e/id-preview-e8143deb--c5b5026f-261b-42c8-babf-87add9dedee2.lovable.app-1778217598552.png",
      },
      { name: "description", content: "FASTWear Style Studio is a premium fashion rental platform for young Vietnamese adults, now featuring AR virtual try-on." },
      { property: "og:description", content: "FASTWear Style Studio is a premium fashion rental platform for young Vietnamese adults, now featuring AR virtual try-on." },
      { name: "twitter:description", content: "FASTWear Style Studio is a premium fashion rental platform for young Vietnamese adults, now featuring AR virtual try-on." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/J67fPbyxGkVBFA4LXPxY2t6OcEF3/social-images/social-1780230671982-26_MAYWK1_US_RENT_SUMMER_UNAUTH_HERO_C_LS.jpg.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/J67fPbyxGkVBFA4LXPxY2t6OcEF3/social-images/social-1780230671982-26_MAYWK1_US_RENT_SUMMER_UNAUTH_HERO_C_LS.jpg.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&family=Manrope:wght@400;500;600;700&family=Montserrat:wght@600;700;800&family=Playfair+Display:wght@600;700;800&family=Raleway:wght@300&display=swap",
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
    <html lang="vi">
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

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}
