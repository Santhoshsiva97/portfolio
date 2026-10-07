import { formatDate, getNow } from "@/lib/content";
import { renderOgCard, ogSize } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt = "What Santhosh Sivakumar is working on now";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: `Now · updated ${formatDate(getNow().updated)}`,
    title: "What I'm",
    accent: "up to right now",
    footer: `${getSiteUrl().host}/now`,
    theme: "flow",
  });
}
