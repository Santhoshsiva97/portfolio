import { renderOgCard, ogSize } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt = "Contact Santhosh Sivakumar about your project";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Contact",
    title: "Let's talk about",
    accent: "your project",
    footer: `${getSiteUrl().host}/contact`,
    theme: "signal",
  });
}
