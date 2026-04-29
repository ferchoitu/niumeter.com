/**
 * Root layout — minimal wrapper required by Next.js App Router.
 * Actual layout (with fonts, providers, etc.) is in /[locale]/layout.tsx
 * The middleware handles redirecting / → /es/ automatically.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
