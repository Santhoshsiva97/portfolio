# Progress Log — Portfolio

## Steps

| Step | Name | Status |
|---|---|---|
| 0 | Content gathering | 🟡 Started: resume + 2 projects pre-filled, `TODO`s left for the owner |
| 1 | Project setup | ✅ |
| 2 | Design system and layout | ✅ |
| 3 | Content layer | ⬜ |
| 4 | Home page | ⬜ |
| 5 | Projects | ⬜ |
| 6 | "Now building" | ⬜ |
| 7 | Resume page and PDF | ⬜ |
| 8 | Services and contact | ⬜ |
| 9 | SEO and sharing | ⬜ |
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
