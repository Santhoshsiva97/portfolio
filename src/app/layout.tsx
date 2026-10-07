import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Instrument_Serif,
} from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { getResume } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const { basics, skills } = getResume();

export const metadata: Metadata = {
  // Resolves relative canonical / Open Graph URLs (see getSiteUrl for where the origin comes from).
  metadataBase: getSiteUrl(),
  title: {
    default: `${basics.name} — ${basics.label}`,
    template: `%s — ${basics.name}`,
  },
  description: `Portfolio and resume of ${basics.name}, a full stack engineer building web apps, Shopify stores and workflow automation.`,
  applicationName: basics.name,
  authors: [{ name: basics.name, url: "/" }],
  creator: basics.name,
  keywords: [
    basics.name,
    basics.label,
    "freelance developer",
    "Bangalore",
    ...skills
      .filter((g) => ["Frontend", "Backend", "E-commerce"].includes(g.name))
      .flatMap((g) => g.keywords)
      .slice(0, 12),
  ],
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#0e0f12" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // ThemeScript sets data-theme before hydration, so the attribute differs from the server HTML.
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
