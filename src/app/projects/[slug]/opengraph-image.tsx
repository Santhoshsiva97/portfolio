import {
  getProject,
  getProjects,
  getProjectSlugs,
  statusLabel,
  typeLabel,
} from "@/lib/content";
import { renderOgCard, ogSize, type OgTheme } from "@/lib/og/OgCard";
import { getSiteUrl } from "@/lib/site-url";

export const alt = "Case study by Santhosh Sivakumar";
export const size = ogSize;
export const contentType = "image/png";

// One image per case study, generated at build time like the pages themselves.
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

// Same colour order as the generated covers on /projects (ink, signal, flow).
const THEMES: OgTheme[] = ["ink", "signal", "flow"];

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const index = getProjects({ status: ["in-progress", "completed"] }).findIndex(
    (p) => p.slug === slug,
  );

  return renderOgCard({
    eyebrow: project ? `Case study · ${typeLabel[project.type]}` : "Case study",
    title: project?.title ?? "Case study",
    badge: project ? statusLabel[project.status] : undefined,
    chips: project?.stack ?? [],
    footer: getSiteUrl().host,
    theme: THEMES[Math.max(index, 0) % THEMES.length],
  });
}
