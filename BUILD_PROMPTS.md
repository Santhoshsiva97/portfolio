# Build Prompts — Portfolio

One step per session or branch. Say "Implement Step N" to start a step. Each step ends with a `PROGRESS_LOG.md` entry.

---

## Step 0 — Content gathering (no code)
Fill `content/resume.json` and `content/projects/*.mdx`. Work through `CONTENT_CHECKLIST.md`: positioning line, bio, photo, project details, screenshots, links, testimonials.

## Step 1 — Project setup
Next.js 16 + TypeScript + Tailwind 4 scaffold, Prettier, the docs (`PROJECT_CONTEXT.md`, `PROGRESS_LOG.md`, this file) and the content folder structure.

## Step 2 — Design system and layout
Pick the palette (2 colors + neutrals) and fonts (`next/font`). Define tokens in `globals.css` with a light/dark theme and a theme toggle with no flash on load. Build the shared layout: sticky navbar (Home, Projects, Resume, Services, Contact), mobile menu, footer with socials. Add base UI pieces: Button, Badge, Card, Section, Container.

## Step 3 — Content layer
Typed loaders in `src/lib/content/`:
- `getResume()`, which validates `resume.json` with Zod
- `getProjects({ status?, featured? })` and `getProject(slug)`, which parse MDX frontmatter and validate it with Zod

Render MDX with `@next/mdx` or `next-mdx-remote`, using custom components (Callout, Screenshot, Stack). Invalid content should fail the build with a clear message.

## Step 4 — Home page
Hero with name, role, positioning line, availability badge and two CTAs (Hire me / Download resume). Then:
- 3 featured projects
- skills strip
- a "How I work" section (Discover → Build → Launch → Support)
- testimonials (hidden when there are none)
- a short contact CTA

## Step 5 — Projects
`/projects` lists projects with filters for status and tech (client component, state kept in the URL). `/projects/[slug]` is a case-study layout: Problem → Role → Approach → Key features → Results → Screenshots gallery → Stack → Links. Use `generateStaticParams` and add previous/next links.

## Step 6 — "Now building"
A section on home plus `/now`: in-progress and planned projects, each with a progress note, last-updated date and target date. Optionally a short "What I'm learning" list.

## Step 7 — Resume page and PDF
`/resume` renders `resume.json` as an HTML resume (experience timeline, skills, education, projects). The PDF is generated from the same data at build time with `@react-pdf/renderer` (single column, real text, standard headings, ATS-friendly) and saved as `/resume.pdf`. Add a "Download PDF" button. The phone number appears only in the PDF.

## Step 8 — Services and contact
`/services` covers what I offer (web apps, Shopify stores, automation/APIs, maintenance), process, FAQ and optional "starting from" pricing. `/contact` is a form (name, email, project type, budget, message) sent via Formspree or Resend. Add a honeypot and validation, plus success and error states. Also show email, LinkedIn, GitHub and an optional Cal.com booking link.

## Step 9 — SEO and sharing
Metadata API per page, generated Open Graph images (`opengraph-image.tsx`) for home and each project, `sitemap.ts`, `robots.ts`, JSON-LD `Person` and `ProfilePage`, canonical URLs, favicon and app icons.

## Step 10 — Quality pass
- Responsive check at 360, 768 and 1280 px
- Lighthouse 90+ in all categories
- Accessibility: alt text, contrast, focus rings, skip link, `prefers-reduced-motion`
- `next/image` everywhere
- 404 page
- Lint, type-check and build all clean

## Step 11 — Deploy
Vercel project from GitHub, production domain and DNS, HTTPS, environment variables (form keys), Vercel Analytics or Plausible. Preview deploys come from step branches.

## Step 12 — Launch and upkeep
Add the link to LinkedIn, GitHub profile README, Upwork/Fiverr, email signature and the resume header. Write `UPDATING.md`: how to add a project (one MDX file plus images), update the resume and redeploy.
