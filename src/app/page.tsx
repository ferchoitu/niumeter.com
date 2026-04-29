import { redirect } from "next/navigation";

/**
 * Root page — redirects to Spanish locale.
 * Middleware also handles this redirect; this is a fallback.
 */
export default function RootPage() {
  redirect("/es");
}
