import { getProjects } from "@/lib/content";
import { renderOgCard, ogSize } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt = "Projects and case studies by Santhosh Sivakumar";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  const projects = getProjects({ status: ["in-progress", "completed"] });
  return renderOgCard({
    eyebrow: "Work",
    title: "Projects &",
    accent: "case studies",
    chips: projects.map((p) => p.title),
    footer: `${getSiteUrl().host}/projects`,
    theme: "ink",
  });
}
