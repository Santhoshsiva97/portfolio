# Progress Log — Portfolio

## Steps

| Step | Name | Status |
|---|---|---|
| 0 | Content gathering | 🟡 Started: resume + 2 projects pre-filled, `TODO`s left for the owner |
| 1 | Project setup | ✅ |
| 2 | Design system and layout | ✅ |
| 3 | Content layer | ✅ |
| 4 | Home page | ✅ |
| 5 | Projects | ✅ |
| 6 | "Now building" | ✅ |
| 7 | Resume page and PDF | ✅ |
| 8 | Services and contact | ✅ |
| 9 | SEO and sharing | ✅ |
| 10 | Quality pass | ⬜ |
| 11 | Deploy | ⬜ |
| 12 | Launch and upkeep | ⬜ |

## Log

### 2026-10-07 — Steps 0 + 1 (setup, content skeleton)

**Branch:** `step-0-1-setup` (from `main`, whose only commit is `2d73db5`, the original Vite portfolio)

- Replaced the old Vite + React single-page portfolio with a **Next.js 16.4 / React 19.3 / TypeScript / Tailwind 4** scaffold (`create-next-app`: App Router, `src/`, ESLint, `@/*` alias). The old version is still in git history at `2d73db5`.
- Added Prettier with `prettier-plugin-tailwindcss` (`npm run format`, `npm run format:check`) and a `typecheck` script.
- Docs: `PROJECT_CONTEXT.md`, `BUILD_PROMPTS.md` (Steps 0–12), this log, `CONTENT_CHECKLIST.md`, `README.md`.
- Content:
  - `content/resume.json`, pre-filled from `Resume_Santhosh_ATS.pdf`: summary, skills (plus a Shopify group), Esko and Softsquare experience, education
  - `content/projects/interview-prep-portal.mdx` and `ps-textile-store.mdx`, both `in-progress` and `featured`
  - `content/projects/_template.mdx`
- Placeholder home page (`src/app/page.tsx`) that reads name and summary from `resume.json`. It will be replaced in Step 4.
- Prettier installed, scaffold SVGs removed. `typecheck` is `next typegen && tsc --noEmit`, because `LayoutProps` is a generated type. Lint, typecheck and build pass.

**Owner to do (Step 0):** see `CONTENT_CHECKLIST.md`. The main items are the positioning line, LinkedIn URL, photo, screenshots, the third featured project, the domain, and PS Textile naming permission.

**Next:** Step 2 (design system and layout).

### 2026-10-07 — Step 2 (design system and layout)

**Branch:** still `step-0-1-setup` (nothing committed yet). The Step 0–1 and Step 2 changes are in the same working tree.

- **"Flowline" creative direction** (details in `PROJECT_CONTEXT.md`):
  - Warm paper and ink neutrals, a vermilion `signal` accent and a cobalt `flow` accent
  - Fonts: Bricolage Grotesque, Instrument Serif italic accents, Geist and Geist Mono
  - Workflow-canvas motifs
- **Tokens and theme:** `globals.css` holds Tailwind 4 `@theme` tokens, light and dark values, a no-JS OS fallback, keyframes and the `.bg-canvas` / `.mask-fade` utilities. All motion respects reduced motion. `ThemeScript` prevents a theme flash on load, and `ThemeToggle` (built on `useSyncExternalStore`) saves the choice to localStorage.
- **Layout:** `SiteHeader` has a sticky blurred bar, pill nav with an active state, the theme toggle, a "Hire me" button and a skip link. `MobileMenu` is a full-screen overlay with numbered links, CTAs and socials; Escape closes it and page scroll is locked while it's open. `SiteFooter` has a big "Let's build something that flows." CTA band and a link grid.
- **UI kit:** Button, Badge, Card, Container, Section/Eyebrow/Accent, Icon (inline SVGs, no dependency).
- **Home preview:** the hero (live availability badge, headline, two CTAs, stats, and the animated `FlowCanvas` workflow diagram) plus a "What I build" section with 3 interactive cards. Copy is hard-coded for now; Step 4 wires it to `content/`.
- **`/styleguide`:** colors, typography, buttons, badges and cards (noindex).
- Fixed during verification: the header "Hire me" button showed on mobile (`inline-flex` beat `hidden`), and SVG `var()` attributes were replaced with classes.
- **Verified:** lint, typecheck and build pass. In the preview (port 3100) there are no console errors. The light/dark toggle works and persists after reload. At 375px the mobile menu opens and closes, and there's no horizontal overflow. Full-page headless Chrome screenshots of desktop and mobile look right.
- Nav links (`/projects`, `/now`, `/services`, `/resume`, `/contact`, `/resume.pdf`) return 404 until their steps are built.

**Next:** Step 3 (content layer: Zod-validated loaders for `resume.json` and the MDX projects).

**Committed:** Steps 0–2 as `3d6be90` on `step-0-1-setup` (not pushed).

### 2026-10-07 — Step 3 (content layer)

**Branch:** `step-3-content-layer` (from `step-0-1-setup` @ `3d6be90`)

- Added `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `@types/mdx`, `remark-frontmatter`, `remark-gfm`, `zod` 4 and `yaml`. `next.config.ts` wraps the config with `createMDX`; plugins are given as strings so Turbopack can use them. New tsconfig alias `@content/*`.
- `src/lib/content/`:
  - `schemas.ts`: Zod schemas for `resume.json` and project frontmatter. Dates must be `YYYY-MM` / `YYYY-MM-DD`; `TODO` strings become null.
  - `resume.ts`: validated at module load.
  - `projects.ts` (`server-only`): sync frontmatter reads, YAML and Zod with readable errors, missing images dropped, filters and sort, `getProjectBody()` via dynamic MDX import.
  - `index.ts`: the public API.
- Split `src/lib/nav.ts` (client-safe) from `src/lib/site.ts` (server-only, built from `getResume()`), so Zod and the resume data stay out of the client bundle. `MobileMenu` now gets `socialLinks` as a prop.
- MDX rendering: `src/mdx-components.tsx` (typography) and `src/components/mdx/` (`Callout`, `Screenshot`, `Stack`).
- Content edits:
  - Body TODOs in both case studies became MDX comments, and each got a "Live demo" / "Launching soon" callout under Results.
  - `_template.mdx` now lists the available components.
  - Prettier reformatted `resume.json` (whitespace only).
- `/styleguide` has a "Content check" section: resume stats, a project table and the interview-prep body rendered through MDX.
- **Verified:**
  - Lint, typecheck and build pass. `/styleguide` (with the MDX body) is still statically prerendered.
  - A deliberately broken `zz-broken.mdx` failed the build with a clear message listing all 3 field errors. The file was removed.
  - In the preview, the loaders return 2 projects (covers missing, so they fall back), positioning is hidden as TODO, socials are GitHub and email only, and the rendered body has no TODO text.
  - A headless screenshot of the MDX typography looks right.
  - The 404 flood in the console happened during the dev-server restart after the `next.config` change. A fresh load has 0 failed requests.

**Next:** Step 4 (home page wired to `content/`: hero positioning, featured projects, skills strip, How I work, testimonials, contact CTA).

**Committed:** Step 3 as `ac91ea6` on `step-3-content-layer` (not pushed).

### 2026-10-07 — Step 4 (home page)

**Branch:** `step-4-home-page` (from `step-3-content-layer` @ `ac91ea6`)

- New `content/home.json`, validated by `homeSchema` and loaded with `getHome()`. It holds the hero headline and accent word, the fallback intro, stats, the tech strip, services and process steps. The hero intro uses `resume.json` `basics.positioning` once that's filled in.
- New `src/lib/content/format.ts`: `formatYearMonth`, `formatRange` (pure string formatting, no clock), `statusLabel`, `typeLabel`.
- Home sections. Numbering is automatic, so it stays correct when testimonials are hidden.
  - `Hero`: the availability badge comes from `resume.json`; the availability note shows only once it's filled in.
  - `SkillsMarquee`: endless strip, pauses on hover, wraps statically for reduced-motion users.
  - 01 Selected work: up to 3 `featured` projects using `ProjectCard`. With an odd count, the first card spans the full width.
  - 02 What I build: service cards.
  - 03 How I work: `ProcessFlow`, numbered nodes on a dashed connector.
  - 04 Experience: `ExperienceSnapshot` timeline from `resume.json` plus "Full resume" and "Download PDF".
  - Testimonials: shown only when `resume.json` has some.
  - The footer's call-to-action band closes the page.
- `ProjectCard` and `ProjectCover` live in `src/components/projects/` so Step 5 can reuse them. The card is fully clickable through a stretched title link. Without a cover image, `ProjectCover` renders a generated cover (ink, signal or flow colour, dot grid, flow line, title, top 3 technologies).
- CSS: `.animate-marquee` and a CSS-only `.reveal` scroll animation (`animation-timeline: view()`, only when the user hasn't asked for reduced motion and the browser supports it).
- Copy I deliberately kept free of commitments: "clear scope, timeline and estimate" (not "fixed quote"), "regular progress" (not "weekly"), and "No commitment. Just a conversation." **The owner should confirm the services and process wording in `content/home.json`.**
- Fixed during verification:
  - The stats row was misaligned when a label wrapped.
  - The process connector didn't reach the first and last nodes.
  - "@" rendered as ⓐ in Bricolage, so it's now "at".
- **Verified:**
  - Lint, typecheck and build pass; `/` is still static.
  - Full-page headless screenshot (1280, light) looks right.
  - In the preview: connector endpoints match node centres (±1px) at 1280px and vertically at 375px. Stats tops are equal, stagger delays apply, `reveal-up` with `view()` and `marquee` are active, and there's no horizontal overflow at 375px.
  - A fresh load has 0 failed requests.
  - The dev server served stale CSS after the `globals.css` edit, and a preview restart fixed it. If CSS changes don't show up, restart `next dev`.
- Links to `/projects/<slug>`, `/projects`, `/services`, `/resume` and `/contact` return 404 until Steps 5–8.

**Next:** Step 5 (`/projects` list with filters and `/projects/[slug]` case-study pages).

**Committed:** Step 4 as `9a22e69` on `step-4-home-page` (not pushed).

### 2026-10-07 — Step 5 (projects list and case studies)

**Branch:** `step-5-projects` (from `step-4-home-page` @ `9a22e69`)

- **`/projects`:**
  - Lists in-progress and completed projects. Planned ones are left for `/now`.
  - Filtering is done by `ProjectsExplorer`, a client component. The cards are server-rendered `ProjectCard`s passed in as props, so the client only chooses which to show.
  - Filters are status, type and tech (top 10, then "+N more"). A row is hidden when it has only one value. Each filter state lives in the URL (`?status=&type=&tech=`) via `history.replaceState`, so back-button history isn't polluted. Unknown values are ignored.
  - "Showing X of Y" (aria-live), "Clear filters" and an empty state.
  - `useSearchParams` sits inside `<Suspense>`. The fallback is the same view with no filters, so the static HTML contains every project.
  - A "Looking for my day-job experience?" call-to-action links to the resume.
- **`/projects/[slug]`:**
  - `generateStaticParams` prerenders every case study, and `generateMetadata` sets the title and description.
  - Header: back link, badges, H1, summary, links to the live site, source code or write-up (only those that exist), and a meta grid (client, role, timeline, stack).
  - `ProjectCover size="lg"` (21:9 on desktop).
  - A "Now building" or "Coming up" panel with progress note, target date and updated date, plus a Results panel. They sit side by side only when both exist.
  - The MDX body sits beside a sticky "On this page" table of contents (`CaseStudyToc`, a client component; IntersectionObserver highlights the current section).
  - "Built with" chips link to `/projects?tech=…`. Then the screens gallery (when images exist), a "Need something like this?" call-to-action, and previous/next case-study links.
- **Heading ids:** `rehype-slug` added to the MDX pipeline. `projects.ts` computes the same ids with `github-slugger` (`Project.headings`), skipping code fences.
- `ProjectCard` and `ProjectCover` now import from `@/lib/content/format` and `@/lib/content/projects` (types only), so they can be used from client components too.
- `format.ts` gained `formatDate("2026-10-07")` → "7 Oct 2026".
- **Next 16 findings:**
  - `export const dynamicParams` isn't allowed with `cacheComponents`, so it's removed. Unknown slugs call `notFound()`.
  - With `partialPrefetching`, an unknown slug is streamed, so production returns **200** with the not-found UI and an injected `<meta name="robots" content="noindex">` (documented behaviour). Dev returns 404. Accepted; real 404 statuses would need a proxy.
- New launch config `portfolio-prod` (build + `next start` on port 3101) for production checks.
- **Verified:**
  - Lint, typecheck and build pass. `/projects` and both case studies are static (○), and `[slug]` has a partial-prerender shell for unknown slugs.
  - In dev, filters work: Liquid shows 1 of 2 with `?tech=Liquid`; adding the Personal type gives 0 and the empty state; clear removes the query; history length is unchanged.
  - In production, the static HTML contains both projects, and the `?tech=Shopify` deep link shows 1 of 2 with the chip pressed and 0 failed requests.
  - All 6 table-of-contents links resolve to heading ids (including "What's next" → `#whats-next`).
  - Screenshots: the case study in light theme, before and after the cover-size fix, and `/projects` in dark theme.

**Next:** Step 6 ("Now building" section on home and `/now`).

**Committed:** Step 5 as `87d1c76` on `step-5-projects` (not pushed).

### 2026-10-07 — Step 6 ("Now building")

**Branch:** `step-6-now` (from `step-5-projects` @ `87d1c76`)

- **Content:**
  - New `content/now.json` (`nowSchema`, `getNow()`): `updated`, `intro`, a one-sentence `focus`, and `learning[]`.
  - New optional frontmatter field `progress` (0–100). Interview Prep is set to **45** (10 of 22 build steps done) and PS Textile to **90** (build done, launch pending). **The owner should confirm both.**
  - The learning items are drawn only from what the projects actually use: Next.js 16 / Cache Components, Shopify theme development, Redis + BullMQ.
- **`/now`:**
  - Header with an "Updated …" badge and a link explaining what a now page is.
  - 01 "On the workbench": in-progress projects with cover, note, `ProgressBar`, started/target/updated dates and a link to the case study.
  - 02 "Coming up": planned projects, plus a dashed "Slot available — your project could be next" call-to-action while `availability.freelance` is true.
  - 03 "Getting better at": the learning list.
  - 04 "Ways to work together": freelance and full-time cards driven by `resume.json` availability. A closed option is dimmed and has no button.
- **Home:** a new "04 Right now" section between "How I work" and "Experience". It shows the `focus` sentence, a "More on my now page" link, and `NowBoard`, a `now.log` window with one row per in-progress or planned project: status, title, a two-line note and the progress bar. Section numbers shifted automatically (Experience is now 05).
- `src/components/now/`: `ProgressBar` (`role="progressbar"`, dashed track, signal→flow fill, node at the value) and `NowBoard`.
- Fixed during verification: the open-to badges stretched across the full width inside the flex-column cards (fixed with `self-start`).
- **Verified:**
  - Lint, typecheck and build pass; `/now` is static.
  - On home: eyebrows run 01–05, progress-bar nodes sit at exactly 45% and 90% with aria values and labels, and "updated 7 Oct 2026" shows.
  - On `/now`: the "Now" nav item is active, the 4 sections render with the slot call-to-action and both open-to cards, and there are 0 failed requests.
  - Screenshots: `/now` in light theme and the home now-board in dark theme.

**Next:** Step 7 (resume page + generated ATS PDF at `/resume.pdf`).

**Committed:** Step 6 as `ab509f9` on `step-6-now` (not pushed).

### 2026-10-07 — Step 7 (resume page and PDF)

**Branch:** `step-7-resume` (from `step-6-now` @ `ab509f9`)

- **`/resume.pdf`:**
  - Generated from `resume.json` and the in-progress/completed projects by `@react-pdf/renderer` 4.9 (already on Next's server-external list, so no config needed).
  - Served by `src/app/resume.pdf/route.ts`, inline with the filename `Santhosh_Sivakumar_Resume.pdf`.
  - Rendering lives in a `"use cache"` + `cacheLife("max")` helper. react-pdf stamps a creation date, which otherwise made the route dynamic (`ƒ`); it's now prerendered (`○`).
  - **Gotcha:** in dev the cached PDF doesn't refresh when `ResumeDocument` changes. Restart `next dev`, or check with `portfolio-prod`.
- **`src/lib/resume-pdf/ResumeDocument.tsx` (ATS-friendly):**
  - A4, one column, built-in Helvetica, real selectable text and PDF metadata (title, author, keywords = skills).
  - Sections: Professional Summary, Technical Skills, Professional Experience, Projects, Education, plus Certifications when present. It mirrors `Resume_Santhosh_ATS.pdf`.
  - The phone number appears only here.
  - Pagination: headings use `minPresenceAhead`. Each work project's name and first bullet form one unbreakable `View`, because `minPresenceAhead` alone didn't stop a stranded title.
- **`/resume`:**
  - Hero: name, label and headline, location, "Download PDF" and "Get in touch".
  - Sidebar: contact (email, profiles, website), "Open to" badges, skill groups as chips.
  - Main: summary, an experience timeline with every highlight, project cards linking to case studies, education, certifications, and a call-to-action for the PDF.
  - Print styles: the site header, footer, sidebar and buttons are hidden (`print:hidden`).
  - The sidebar was sticky but is taller than the viewport, so stickiness was removed.
- New optional `basics.website` (todoable URL) in `resume.json`. It's shown in the PDF header and the contact list once the domain is live (Step 11).
- **Verified:**
  - Lint, typecheck and build pass; `/resume` and `/resume.pdf` are static.
  - The production response is `application/pdf` with `x-nextjs-cache: HIT`.
  - The PDF text layer extracts in reading order (checked on 3 renders). Fixed along the way: the header name overlapped the label line (lineHeight), and a project title was stranded at the bottom of page 1.
  - On `/resume`: the phone appears nowhere (also 0 matches in the production HTML), both jobs show all 19 bullets, the 4 PDF links are plain anchors, the "Resume" nav item is active, and there are 0 failed requests.
  - Headless screenshot of the page in light theme looks right.

**Next:** Step 8 (services and contact form).

**Committed:** Step 7 as `99d2c7d` on `step-7-resume` (not pushed).

### 2026-10-07 — Step 8 (services and contact)

**Branch:** `step-8-services-contact` (from `step-7-resume` @ `99d2c7d`)

- **Content:**
  - New `content/services.json` (`servicesSchema`, `getServices()`): intro; services (slug, tag, title, summary, includes, idealFor, `startingFrom` = TODO → shows "Custom quote"); FAQ; contact `budgets` (INR ranges, editable) and `bookingUrl` (TODO → hidden).
  - Services moved out of `home.json`, so the home cards now read `services.json` (`summary`).
  - **The owner decides prices, the budget ranges and the FAQ wording.** None of the copy commits to fixed prices, turnaround times or code ownership.
- **`/services`:**
  - Hero with "Start a project" and "See N case studies".
  - "01 What I offer": a card per service with ideal-for, pricing (or "Custom quote"), "What's included" checklist, and "Discuss this" → `/contact?service=<slug>`.
  - "02 Process" reuses `ProcessFlow`.
  - "03 FAQ" as a `<details>` accordion.
  - A "Not sure which fits?" call-to-action.
- **`/contact`:**
  - Form: name, email, "What do you need?" chips (services + "Full-time role" when available + "Something else"), optional budget chips, and a message with a character counter.
  - Aside: email, booking link (when set), "What happens next" (3 steps) and socials.
  - The `ContactFormWithParams` Suspense wrapper preselects `?service=`; the fallback renders the same form without a preselect.
- **Backend (`src/lib/contact/`):**
  - `schema.ts`: Zod schema, limits and `ContactState`.
  - `actions.ts`: Server Action `sendContactMessage` (`useActionState`). Spam is caught by a honeypot (`company_website`) and a 3 s minimum fill time (`started_at`, stamped after mount; skipped without JS). Spam gets a fake success. Field errors echo the submitted values back.
  - `deliver.ts` (`server-only`): Resend REST API if `RESEND_API_KEY` is set (to `CONTACT_TO_EMAIL` or the resume email, from `CONTACT_FROM_EMAIL` or `onboarding@resend.dev`, reply-to the sender); otherwise Formspree if `FORMSPREE_FORM_ID` is set; otherwise logged to the console in dev and an error in production, which tells the visitor to email directly.
  - `.env.example` added, and `.gitignore` now un-ignores it.
- **Footer:** the call-to-action band is wrapped in `HideOnPaths` (client, `usePathname`, inside `<Suspense>`), so it's hidden on `/contact`.
- **Verified:**
  - Lint, typecheck and build pass; `/services` and `/contact` are static.
  - Dev:
    - `?service=shopify` preselects correctly, `started_at` is stamped, and the honeypot is off-screen.
    - An invalid submit shows 3 field errors with `aria-invalid`, and values are kept.
    - A valid submit shows the success screen and the full message appears in the server log.
    - An instant submit and a honeypot submit both show success with nothing logged.
    - At 375px neither page overflows, the FAQ opens, and the "Discuss this" links are correct.
  - Production (`portfolio-prod`): the footer band shows on `/services`, hides on `/contact` (also after in-app navigation), `?service=automation` preselects, and with no provider the friendly error shows with values kept and `[contact] delivery failed` logged.
  - Dev-only quirk: the footer band's Suspense boundary sometimes stays pending in the slow dev server. Production streams it in the same HTML document.

**Owner to do:**
- Pick Resend (recommended) or Formspree.
- Put the key in `.env.local` now and in Vercel env vars in Step 11.
- Set prices / `bookingUrl` in `services.json` if wanted.

**Next:** Step 9 (SEO and sharing: metadata, OG images, sitemap, robots, JSON-LD).

**Committed:** Step 8 as `3495ad5` on `step-8-services-contact` (not pushed).

### 2026-10-07 — Step 9 (SEO and sharing)

**Branch:** `step-9-seo` (from `step-8-services-contact` @ `3495ad5`)

- **Site URL:** `src/lib/site-url.ts` `getSiteUrl()` / `absoluteUrl()`. Order: `resume.json` `basics.website` → `NEXT_PUBLIC_SITE_URL` → `https://$VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`. Everything currently resolves to localhost until the domain is set (Step 11).
- **Metadata:**
  - The layout sets `metadataBase`, a title template (`%s — Santhosh Sivakumar`), description, keywords, authors and `formatDetection` off.
  - `src/lib/seo/metadata.ts` `pageMetadata()` gives every page a title, description, canonical, a full Open Graph set (type/url/siteName/locale `en_IN`) and a Twitter `summary_large_image`. A page-level `openGraph` replaces the layout's, so each page builds the full set.
  - Used on home, `/projects`, case studies (`article`), `/now`, `/services`, `/resume` (`profile`) and `/contact`. `/styleguide` stays noindex.
- **OG images:**
  - `src/lib/og/OgCard.tsx` `renderOgCard()`: a 1200×630 Flowline card (paper/ink/signal/flow themes, dot grid, flow line, logo, badge, eyebrow, headline with a word-by-word italic accent, chips, domain).
  - Brand TTFs in `src/assets/fonts/` (Bricolage 800, Instrument Serif Italic, Geist Mono 500; OFL, downloaded from Google Fonts with the owner's OK; see the README there), read at module scope in `src/lib/og/fonts.ts`.
  - `opengraph-image.tsx` for `/` (also the default), `/projects`, `/projects/[slug]` (theme matches the cover colour), `/now`, `/services`, `/resume` and `/contact`.
  - The `[slug]` image needed its own `generateStaticParams` to be prerendered; it now shows ●.
- **Icons:** the scaffold's `favicon.ico` (Next logo) is removed. `icon.tsx` (64px) and `apple-icon.tsx` (180px, full bleed) come from `LogoMark` (solid flow line, so it stays legible at 16px).
- **`sitemap.ts`:** home, projects list, each case study, services, resume, now and contact. `lastModified` comes from content dates (`now.json` `updated`, project `updated`), never the clock.
- **`robots.ts`:** allow everything, disallow `/styleguide`, point to the sitemap.
- **JSON-LD** (`src/lib/seo/structured-data.ts` + `components/seo/JsonLd.tsx`, with `<` escaped):
  - Home: an `@graph` with Person (jobTitle, address, sameAs, 32 `knowsAbout` skills, `worksFor` the current employer, `alumniOf`) and WebSite.
  - `/resume`: ProfilePage whose `mainEntity` is the Person.
  - Case studies: CreativeWork (author = Person `@id`, dates, keywords, status).
- **Verified:**
  - Build: every route is static (○/●). `/projects/[slug]` keeps its partial-prerender shell for unknown slugs.
  - Production head of a case study: title, description, canonical, og:* (image 1200×630 + alt, type article) and twitter:* all present; icon and apple-touch-icon links present.
  - `/robots.txt` and `/sitemap.xml` are correct (8 URLs).
  - All 8 OG images and 2 icons return 200 image/png. Contact sheets were reviewed and two fixes made: the accent was indenting when it wrapped (now word-by-word), and the case-study footer URL wrapped onto 3 lines (now the domain only, max 4 chips).
  - JSON-LD parses on `/`, `/resume` and a case study.
- **After the domain is live:** set `basics.website` (or `NEXT_PUBLIC_SITE_URL` in Vercel), redeploy, then check the Rich Results Test and validator.schema.org, and preview links with LinkedIn Post Inspector and the opengraph.xyz debugger.

**Next:** Step 10 (quality pass: responsive, Lighthouse, accessibility, 404 page).

