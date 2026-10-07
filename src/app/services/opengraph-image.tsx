import { getServices } from "@/lib/content";
import { renderOgCard, ogSize } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt =
  "Services: custom web apps, Shopify stores and workflow automation";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Services",
    title: "How I can",
    accent: "help",
    chips: getServices().services.map((s) => s.tag),
    footer: `${getSiteUrl().host}/services`,
  });
}
