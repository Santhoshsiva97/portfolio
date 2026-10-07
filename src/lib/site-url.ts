import { getResume } from "@/lib/content";

/**
 * The site's public origin, used for canonical URLs, the sitemap and Open Graph tags. First match wins:
 * 1. `basics.website` in content/resume.json (set it once the domain is live)
 * 2. NEXT_PUBLIC_SITE_URL
 * 3. Vercel's production URL (VERCEL_PROJECT_PRODUCTION_URL, set automatically on Vercel)
 * 4. http://localhost:3000
 */
export function getSiteUrl(): URL {
  const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const raw =
    getResume().basics.website ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    (fromVercel ? `https://${fromVercel}` : "http://localhost:3000");
  return new URL(raw);
}

/** Absolute URL for a site path, e.g. absoluteUrl("/projects"). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, getSiteUrl()).toString();
}
