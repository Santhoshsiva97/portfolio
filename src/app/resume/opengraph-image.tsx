import { getResume } from "@/lib/content";
import { renderOgCard, ogSize } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt = "Resume of Santhosh Sivakumar";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const { basics } = getResume();
  return renderOgCard({
    eyebrow: `Resume · ${basics.label}`,
    title: basics.name,
    badge: basics.availability.fullTime ? "Open to roles" : undefined,
    chips: basics.headline.split(" · "),
    footer: `${getSiteUrl().host}/resume`,
    theme: "ink",
  });
}
