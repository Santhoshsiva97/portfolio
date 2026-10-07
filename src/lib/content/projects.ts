import "server-only";

import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import type { MDXContent } from "mdx/types";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import {
  projectFrontmatterSchema,
  type ProjectFrontmatter,
  type ProjectStatus,
  type ProjectType,
} from "./schemas";

export type ProjectHeading = { id: string; text: string };

export type Project = ProjectFrontmatter & {
  slug: string;
  /** "## " sections of the body, for the case-study table of contents. */
  headings: ProjectHeading[];
};

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Reads and validates every case study's frontmatter. Uses sync fs on purpose: with cacheComponents,
 * synchronous reads are prerendered into the static shell (async reads would need "use cache" or Suspense).
 * Files starting with "_" (the template) are skipped.
 */
function loadProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const where = `content/projects/${file}`;
    if (!SLUG_PATTERN.test(slug)) {
      throw new Error(
        `${where}: file names must be lowercase-with-dashes (it becomes the URL).`,
      );
    }

    const source = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf8");
    const match = FRONTMATTER_PATTERN.exec(source);
    if (!match) {
      throw new Error(
        `${where}: missing the --- frontmatter --- block at the top.`,
      );
    }

    let data: unknown;
    try {
      data = parseYaml(match[1]);
    } catch (error) {
      throw new Error(
        `${where}: frontmatter is not valid YAML.\n${String(error)}`,
      );
    }

    const parsed = projectFrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `${where} has invalid frontmatter:\n${z.prettifyError(parsed.error)}`,
      );
    }

    const body = source.slice(match[0].length);
    const project: Project = {
      ...parsed.data,
      slug,
      headings: extractHeadings(body),
    };
    // Images are added later than the text; until then the UI falls back to a generated cover.
    if (project.cover && !publicFileExists(project.cover)) project.cover = null;
    project.gallery = project.gallery.filter(publicFileExists);
    return project;
  });
}

/**
 * Level-2 headings with the same ids rehype-slug gives them (both use github-slugger), skipping code fences.
 * Inline markdown (**, _, `) is stripped first, matching the heading's rendered text.
 */
function extractHeadings(body: string): ProjectHeading[] {
  const slugger = new GithubSlugger();
  const headings: ProjectHeading[] = [];
  let inFence = false;
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const m = !inFence && /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (m) {
      const text = m[1].replace(/[*_`]/g, "");
      headings.push({ id: slugger.slug(text), text });
    }
  }
  return headings;
}

function publicFileExists(publicPath: string) {
  return fs.existsSync(path.join(PUBLIC_DIR, publicPath));
}

function byOrderThenNewest(a: Project, b: Project) {
  return a.order - b.order || b.startDate.localeCompare(a.startDate);
}

let cache: Project[] | undefined;
function allProjects() {
  // Re-read on every call in dev so content edits show up without restarting the server.
  if (process.env.NODE_ENV === "development")
    return loadProjects().sort(byOrderThenNewest);
  cache ??= loadProjects().sort(byOrderThenNewest);
  return cache;
}

type ProjectFilter = {
  status?: ProjectStatus | ProjectStatus[];
  type?: ProjectType;
  featured?: boolean;
};

export function getProjects(filter: ProjectFilter = {}): Project[] {
  const statuses =
    filter.status === undefined
      ? undefined
      : ([] as ProjectStatus[]).concat(filter.status);
  return allProjects().filter(
    (p) =>
      (!statuses || statuses.includes(p.status)) &&
      (filter.type === undefined || p.type === filter.type) &&
      (filter.featured === undefined || p.featured === filter.featured),
  );
}

export function getProject(slug: string): Project | undefined {
  return allProjects().find((p) => p.slug === slug);
}

export function getProjectSlugs(): string[] {
  return allProjects().map((p) => p.slug);
}

/** The compiled MDX body of a case study (module import, so it is prerendered like any other import). */
export async function getProjectBody(slug: string): Promise<MDXContent> {
  if (!SLUG_PATTERN.test(slug))
    throw new Error(`Invalid project slug "${slug}"`);
  const mod = (await import(`@content/projects/${slug}.mdx`)) as {
    default: MDXContent;
  };
  return mod.default;
}
