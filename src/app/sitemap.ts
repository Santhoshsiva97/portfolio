import type { MetadataRoute } from "next";
import { getNow, getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

// Dates come from content (never the clock), so the sitemap stays static and only changes when content does.
export default function sitemap(): MetadataRoute.Sitemap {
  const nowUpdated = getNow().updated;
  const projects = getProjects({ status: ["in-progress", "completed"] });
  const latestProject =
    projects
      .map((p) => p.updated)
      .sort()
      .at(-1) ?? nowUpdated;

  return [
    {
      url: absoluteUrl("/"),
      lastModified: nowUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: latestProject,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projects.map((p) => ({
      url: absoluteUrl(`/projects/${p.slug}`),
      lastModified: p.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/services"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: absoluteUrl("/resume"), changeFrequency: "monthly", priority: 0.8 },
    {
      url: absoluteUrl("/now"),
      lastModified: nowUpdated,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.7 },
  ];
}
