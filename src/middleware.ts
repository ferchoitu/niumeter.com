import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Required for Cloudflare Workers (OpenNext) — must be Edge runtime
export const runtime = "experimental-edge";

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames — skip API, _next, static files
  matcher: [
    "/",
    "/(es|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
