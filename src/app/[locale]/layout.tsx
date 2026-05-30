import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeScript } from "@/components/theme/theme-script";
import { SiteHeader } from "@/components/layout/site-header";
import { routing, type Locale } from "@/i18n/routing";
import "../globals.css";

// A technical type system: Space Grotesk (display) + Inter (body/UI) + JetBrains
// Mono (eyebrows, tags, meta). Inter/Space Grotesk ship the `vietnamese` subset
// so headings/body render diacritics; JetBrains Mono is latin-only (used for
// uppercased labels and ASCII meta, which don't need diacritics).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tung Pham — Software Engineer",
    template: "%s · Tung Pham",
  },
  description:
    "Portfolio of Tung Pham, a software engineer with a growing focus on optimization, parallel processing, and high-performance computing.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Opt into static rendering for this locale.
  setRequestLocale(locale as Locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col" suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
