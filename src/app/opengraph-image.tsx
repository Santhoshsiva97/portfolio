import { getHome, getResume } from "@/lib/content";
import { renderOgCard, ogSize } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt =
  "Santhosh Sivakumar — Full Stack Software Engineer building web apps, Shopify stores and automation";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const { basics } = getResume();
  const { hero } = getHome();
  return renderOgCard({
    eyebrow: `${basics.name} · ${basics.label}`,
    title: hero.title,
    accent: hero.accent,
    badge: basics.availability.freelance ? "Available for projects" : undefined,
    chips: ["React", "Next.js", "Node.js", "TypeScript", "Shopify"],
    footer: getSiteUrl().host,
  });
}
