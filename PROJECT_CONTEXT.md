# Santhosh Portfolio — Project Context

Read this file and `PROGRESS_LOG.md` at the start of every session. Step prompts are in `BUILD_PROMPTS.md`.

## What this is

A personal portfolio site that does two jobs:

1. **Freelance:** shows clients what I build (case studies, services, "now building") and gets them to contact me.
2. **Job search:** works as an online resume for recruiters, with a downloadable ATS-friendly PDF.

Every page should answer one of two questions: "Can he build my project?" (client) or "Should we interview him?" (recruiter).

## Audience and primary actions

| Visitor | What they need | Primary CTA |
|---|---|---|
| Freelance client | Proof of similar work, process, how to reach me | **Hire me** → `/contact` |
| Recruiter / hiring manager | Experience, skills, projects, resume PDF | **Download resume** → `/resume.pdf` |

## Tech stack (do not deviate without discussion)

- **Next.js 16** (App Router, `src/` dir, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS 4** (CSS-first config in `src/app/globals.css`, no `tailwind.config.js`)
- **Content:** files in `content/`, no CMS, no database
  - `content/resume.json`: the single source of truth for profile, experience, skills and education. It feeds both the `/resume` page and the PDF.
  - `content/projects/<slug>.mdx`: one case study per project, with frontmatter
- **Hosting:** Vercel (free tier) + custom domain (TBD)
- **Contact form:** Formspree or Resend (decided in Step 8)
- **Node:** 24, npm 11

> Next 16 has breaking changes from older Next versions. Read `node_modules/next/dist/docs/` before using an unfamiliar API (see `AGENTS.md`).
> `next.config.ts` enables `cacheComponents` and `partialPrefetching` (scaffold defaults).

## Creative direction — "Flowline"

The idea: I turn messy processes into things that flow (50+ workflow-automation apps, stores, web apps). The site looks like a workflow editor canvas.

| Token | Light | Dark | Use |
|---|---|---|---|
| `paper` | `#f5f2ec` | `#0e0f12` | Page background |
| `surface` / `surface-2` | `#ffffff` / `#ece8df` | `#16171c` / `#1d1f25` | Cards, subtle fills |
| `ink` | `#15161a` | `#eeebe4` | Text, the dark CTA band |
| `muted` | `#5b5d66` | `#9b9ea8` | Secondary text |
| `line` | `#dcd6ca` | `#2a2c34` | Borders |
| `signal` | `#ff4f1a` | `#ff6a3d` | Primary accent and CTAs. Text on it is always `on-accent` (ink), never white |
| `flow` | `#2f45ff` | `#8593ff` | Links, diagram lines, focus ring |

- **Type:** Bricolage Grotesque (`font-display`, headings), Instrument Serif italic (`<Accent>`, one emphasis word per heading), Geist (body), Geist Mono (labels, eyebrows, numbers).
- **Motifs:**
  - Dot-grid canvas (`.bg-canvas`, `.mask-fade`)
  - Section eyebrows styled as nodes (`● 01 — Work`)
  - Animated dashed flow lines (`animate-flow-dash`)
  - The hero `FlowCanvas`: Brief → Design → Build → Test → Launch
  - Primary buttons with a hard offset shadow
  - Interactive cards that draw a signal→flow line along the top edge on hover
- **Motion:** `animate-rise` entrances with `stagger-1..4`. Everything is switched off under `prefers-reduced-motion`.
- **Theme:** `data-theme` on `<html>` is set before paint by `ThemeScript` (from localStorage, else the OS setting). The toggle is `ThemeToggle`. Use the `dark:` variant only when the tokens can't express a difference.
- **Reference page:** `/styleguide` (noindex, not in the nav).

## Components

- `src/components/ui/`: `Button` (primary / secondary / outline / ghost; `href` makes it a link), `Badge` (tones; `dot="live"` pulses), `Card` (`interactive`), `Container`, `Section` (+ `Eyebrow`, `Accent`), `Icon` (inline SVG, no icon library).
- `src/components/layout/`: `SiteHeader`, `NavLinks`, `MobileMenu`, `ThemeToggle`, `ThemeScript`, `Logo`, `SiteFooter`.
- `src/components/visual/FlowCanvas.tsx`: the hero visual.
- `src/lib/nav.ts`: nav items and CTA hrefs. It's client-safe, so client components import from here.
- `src/lib/site.ts` (`server-only`): site info and social links built from `resume.json`. Client components receive these as props.
- `src/mdx-components.tsx`: case-study typography plus `<Callout tone="note|win|lesson">`, `<Screenshot>` and `<Stack>`, which work in MDX without an import (`src/components/mdx/`).

## Home page

- Copy lives in `content/home.json` (`getHome()`): hero, stats, techStrip, services, process. Experience and testimonials come from `resume.json`, and featured projects come from MDX (`featured: true`, max 3).
- Sections: `src/components/home/`. Project cards and covers: `src/components/projects/` (shared with Step 5).
- Animate blocks into view with the `.reveal` class (CSS scroll timeline). Don't put it on elements that already use `transform` on hover.

## Content layer (`src/lib/content/`)

- Import from `@/lib/content` only: `getResume()`, `getProjects({ status, type, featured })`, `getProject(slug)`, `getProjectSlugs()`, `getProjectBody(slug)`.
- Zod schemas live in `schemas.ts`. Invalid content **fails the build** with the file, the field and the fix (e.g. `content/projects/x.mdx has invalid frontmatter: ✖ Use "YYYY-MM" → at startDate`).
- Frontmatter is read with **sync** `fs` (prerendered automatically under `cacheComponents`) and parsed with `yaml`. Bodies are compiled by `@next/mdx` (`remark-frontmatter`, `remark-gfm`) and loaded with a dynamic `import()` of `@content/projects/<slug>.mdx`. Alias: `@content/*` → `content/*`.
- **TODO handling:**
  - `resume.json` strings starting with `TODO` load as `null` and are hidden on the site.
  - In MDX bodies, write notes as `{/* TODO … */}` comments. Plain text would be published.
  - `cover` and `gallery` paths that don't exist in `public/` are dropped, and the UI shows a generated cover instead.
- Projects are sorted by `order`, then newest `startDate`. Files starting with `_` are ignored.
- In dev, projects are re-read on every request; in production they're read once. `/styleguide` has a "Content check" section showing what the loaders return.

## Resume

- `/resume` (HTML) and `/resume.pdf` (`src/app/resume.pdf/route.ts`, react-pdf) both render `resume.json`. The PDF also lists in-progress and completed projects. Keep the PDF ATS-safe: one column, Helvetica, no images or tables.
- The PDF is cached with `"use cache"`. In dev, restart `next dev` to see layout changes, or use `portfolio-prod`.

## Now page

- `content/now.json` (`getNow()`): update `updated` whenever you edit it. Project progress comes from frontmatter `progress` + `progressNote` + `targetDate`.
- `/now` and the home `NowBoard` show `in-progress` + `planned` projects. The "Slot available" call-to-action appears while `resume.json` `availability.freelance` is true.

## Projects pages

- `/projects` uses `ProjectsExplorer` (client): filters live in the URL and the cards are server-rendered and passed in by slug. Keep `useSearchParams` inside `<Suspense>` whose fallback is `ProjectsFilterView params={null}` (the full list stays in the static HTML).
- `/projects/[slug]` is static via `generateStaticParams`. Section ids come from `rehype-slug`, and `Project.headings` must use the same algorithm (`github-slugger`).
- Production check: launch config `portfolio-prod` (build + start on port 3101).

### Gotchas
- `dynamicParams` (and `dynamic`, `revalidate`, `fetchCache`) isn't allowed with `cacheComponents`. Unknown slugs → `notFound()`, which streams a 200 with `noindex` in production.
- Don't put `backdrop-filter` on an element that contains `position: fixed` children (it becomes their containing block). The header blurs a separate background layer for this reason.
- Don't add `hidden` through `className` on `Button`, because its `inline-flex` wins. Wrap it in a `div` instead.
- SVG presentation attributes don't resolve `var()`. Use classes (`fill-signal`, `stroke-line`) or `style`.
- Don't read the clock (`new Date()`) in prerendered components (`cacheComponents`).
- The in-app preview pane doesn't repaint after scrolling. Use headless Chrome for full-page screenshots, and the preview pane only for the top of the page and interactions.

## Conventions

- Pages are Server Components by default. Add `"use client"` only for interactive parts (theme toggle, mobile menu, filters, form).
- Content is read at build time through typed loaders in `src/lib/content/` (see "Content layer"). Components never read `content/` directly.
- Project `status` is one of `completed | in-progress | planned`. This drives the "Now building" section.
- Never put private client data or employer-confidential details in case studies. Work projects stay at resume-bullet level.
- Images: `public/images/projects/<slug>/…`, served through `next/image`. Max 1600px wide, WebP or JPG.
- Phone number is **not** shown publicly on the site (`basics.showPhone` in `resume.json`). It appears only in the PDF.
- Import alias `@/*` → `src/*`.
- Formatting: Prettier (with the Tailwind class-sorting plugin). Checks: `npm run lint`, `npm run typecheck` (runs `next typegen` first), `npm run build`.
- Local preview: the `portfolio` launch config runs `next dev` on **port 3100** (3000 is used by the interview-prep backend).

## Project status values

| Status | Shown where | Badge |
|---|---|---|
| `completed` | Projects list, featured on home | — |
| `in-progress` | Projects list + "Now building" | In progress |
| `planned` | "Now building" only | Coming soon |

## Repo

- Local: `C:\Santhosh\Projects\SS projects\Portfolio\santhosh-portfolio`
- GitHub: `Santhoshsiva97/portfolio` (`main` still holds the original Vite version until Step 0–1 is pushed)
- Workflow: one branch per step (`step-N-<name>`). Commit only when asked. Push = fast-forward `main` + push.
