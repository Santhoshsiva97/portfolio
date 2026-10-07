import { z } from "zod";

/** "2026-09" */
const yearMonth = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use "YYYY-MM", e.g. "2026-09"');

/** "2026-10-07" */
const isoDate = z
  .string()
  .regex(/^\d{4}-(0[1-9]|1[0-2])-\d{2}$/, 'Use "YYYY-MM-DD"');

/** Text the owner hasn't filled in yet ("TODO: …") becomes null so it never reaches the page. */
const todoable = z
  .string()
  .transform((s) => (s.trim().toUpperCase().startsWith("TODO") ? null : s));

/** Site-relative path to a file in public/, e.g. "/images/projects/x/cover.jpg". */
const publicPath = z
  .string()
  .startsWith("/", 'Must start with "/" (a path inside public/)');

const nullableUrl = z.url().nullable().default(null);

// ---------------------------------------------------------------- resume.json

export const resumeSchema = z.object({
  basics: z.object({
    name: z.string().min(1),
    label: z.string().min(1),
    headline: z.string(),
    positioning: todoable,
    summary: z.string().min(1),
    email: z.email(),
    phone: z.string(),
    showPhone: z.boolean().default(false),
    location: z.object({
      city: z.string(),
      region: z.string(),
      country: z.string(),
    }),
    photo: publicPath,
    availability: z.object({
      freelance: z.boolean(),
      fullTime: z.boolean(),
      note: todoable,
    }),
    profiles: z.array(
      z.object({
        network: z.string(),
        username: todoable,
        url: todoable.pipe(z.url().nullable()),
      }),
    ),
  }),
  skills: z.array(
    z.object({ name: z.string(), keywords: z.array(z.string()).min(1) }),
  ),
  work: z.array(
    z.object({
      company: z.string(),
      position: z.string(),
      location: z.string(),
      startDate: yearMonth,
      endDate: yearMonth.nullable(),
      projects: z.array(
        z.object({
          name: z.string(),
          highlights: z.array(z.string()).min(1),
        }),
      ),
    }),
  ),
  education: z.array(
    z.object({
      institution: z.string(),
      location: z.string(),
      studyType: z.string(),
      area: z.string(),
      endDate: yearMonth,
    }),
  ),
  certificates: z
    .array(
      z.object({
        name: z.string(),
        issuer: z.string(),
        date: yearMonth,
        url: z.url().optional(),
      }),
    )
    .default([]),
  testimonials: z
    .array(
      z.object({
        name: z.string(),
        role: z.string(),
        quote: z.string(),
        projectSlug: z.string().optional(),
      }),
    )
    .default([]),
});

export type Resume = z.output<typeof resumeSchema>;

// ------------------------------------------------- content/projects/*.mdx frontmatter

export const projectStatuses = ["completed", "in-progress", "planned"] as const;
export const projectTypes = ["freelance", "personal", "professional"] as const;

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z
    .string()
    .min(1)
    .max(200, "Keep the card summary under 200 characters"),
  status: z.enum(projectStatuses),
  type: z.enum(projectTypes),
  client: z.string().min(1),
  role: z.string().min(1),
  startDate: yearMonth,
  endDate: yearMonth.nullable().default(null),
  targetDate: yearMonth.nullable().default(null),
  progressNote: z.string().nullable().default(null),
  updated: isoDate,
  featured: z.boolean().default(false),
  order: z.number().int().default(99),
  stack: z.array(z.string()).min(1),
  cover: publicPath.nullable().default(null),
  gallery: z.array(publicPath).default([]),
  links: z
    .object({
      live: nullableUrl,
      github: nullableUrl,
      caseStudy: nullableUrl,
    })
    .default({ live: null, github: null, caseStudy: null }),
  results: z.array(z.string()).default([]),
});

export type ProjectFrontmatter = z.output<typeof projectFrontmatterSchema>;
export type ProjectStatus = (typeof projectStatuses)[number];
export type ProjectType = (typeof projectTypes)[number];
