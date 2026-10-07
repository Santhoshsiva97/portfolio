import type { Metadata } from "next";
import { getResume } from "@/lib/content";

/**
 * Per-page metadata with canonical URL, Open Graph and Twitter tags. Next doesn't derive og:title from `title`,
 * and a page-level `openGraph` replaces the layout's, so every page builds the full set here.
 * Share images come from the opengraph-image.tsx files and are added by Next automatically.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  /** Short page title; the layout template appends " — <name>". Omit for the home page. */
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const { name } = getResume().basics;
  const fullTitle = title ? `${title} — ${name}` : undefined;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: name,
      locale: "en_IN",
      description,
      ...(fullTitle ? { title: fullTitle } : {}),
    },
    twitter: {
      card: "summary_large_image",
      description,
      ...(fullTitle ? { title: fullTitle } : {}),
    },
  };
}
