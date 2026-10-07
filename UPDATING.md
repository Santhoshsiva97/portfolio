# Updating the portfolio

Everything on the site comes from files in `content/`. You never need to touch the React code for normal updates. The loop is always:

1. Edit a file in `content/`.
2. Check it locally: `npm run dev`, then open http://localhost:3000.
3. Commit and push to `main`. Vercel rebuilds and the change is live in about a minute.

> **Safety net:** if a content file has a mistake (a typo in a status, a wrong date format, a missing field), the build stops with a message naming the file, the field and the fix, and the previous version stays live. Run `npm run check` before pushing to catch it locally.

---

## Add a new project (~5 minutes)

```bash
npm run new:project -- clinic-booking-app "Clinic Booking App"
```

This creates `content/projects/clinic-booking-app.mdx` (with today's date) and `public/images/projects/clinic-booking-app/`. It starts as **`draft: true`**: visible in `npm run dev` with a *Draft* badge, hidden on the live site.

1. **Fill in the frontmatter** (the block between the `---` lines):
   - `summary`: one sentence, shown on cards (max 200 characters).
   - `status`: `completed`, `in-progress` or `planned` (planned projects only appear on `/now`).
   - `type`: `freelance`, `personal` or `professional`.
   - `client`, `role`, `startDate` / `endDate` as `"YYYY-MM"`, `stack`.
   - `results`: short, measurable wins, e.g. `["Cut onboarding from 45 to 10 min"]`.
   - `links.live` / `links.github`: full URLs, or `null`.
   - `featured: true` shows it on the home page (keep it to 3), and `order` sets the position (lower comes first).
2. **Write the story:** keep the section headings (Problem, My role, Approach, Key features, Results). Each `##` heading becomes an entry in the case study's "On this page" menu.
3. **Images (optional):** add `cover.jpg` (1600×900) and screenshots to `public/images/projects/<slug>/`, then list them in `cover:` / `gallery:`. Without a cover, the site draws a branded one automatically. Inside the text you can use:
   ```mdx
   <Screenshot src="/images/projects/clinic-booking-app/01.jpg" alt="Booking calendar" caption="Patients pick a slot in two taps" />
   <Callout tone="win" title="Result">Bookings by phone dropped 70%.</Callout>
   ```
4. **Check it:** `npm run dev` → http://localhost:3000/projects/clinic-booking-app.
5. **Publish:** set `draft: false`, update `updated:` to today, then commit and push.

Notes for yourself go in MDX comments: `{/* TODO: ask client for a quote */}`. They never appear on the site.

## Finish an in-progress project

In its `.mdx` file:
- `status: "completed"` and `endDate: "YYYY-MM"`
- Add `results` and `links.live`
- Remove `progress` / `progressNote` (or leave them; they're only shown while in progress)
- Update `updated:`

## Refresh the "Now" page (monthly)

`content/now.json`:
- `updated`: today, `"YYYY-MM-DD"`. It's shown on the page and the home board.
- `focus`: one sentence about this month (shown on the home page).
- `learning`: what you're getting better at.

For each in-progress project, update `progress` (0–100), `progressNote`, `targetDate` and `updated` in its `.mdx` file.

## Update the resume

`content/resume.json` feeds the `/resume` page **and** the PDF (`/resume.pdf`). Edit it, push, and both update together.
- **New job:** add an entry at the top of `work`, and set the old job's `endDate`.
- **Availability:** `basics.availability.freelance` / `fullTime` (true or false) switch the "Available for new projects" badge, the "Slot available" card on `/now` and the cards on `/now` and `/resume`. `note` is an optional one-liner.
- **Testimonials:** add `{ "name": "…", "role": "…", "quote": "…" }` to `testimonials`. A "Kind words" section appears on the home page automatically.
- **Certificates:** `{ "name": "…", "issuer": "…", "date": "YYYY-MM", "url": "…" }`.
- A value starting with `TODO` is treated as empty and hidden everywhere.

## Services, prices and the contact form

`content/services.json`:
- `startingFrom`, e.g. `"₹40,000"`, shows "Starting from" on `/services`. Leave it as `TODO` to show "Custom quote".
- `faq`: questions and answers on `/services`.
- `contact.budgets`: the budget chips on `/contact`.
- `contact.bookingUrl`: a Cal.com or Calendly link adds "Or book a call" to `/contact`.

Home-page copy (headline, stats, tech strip, process steps) is in `content/home.json`.

## Set or change the domain

Set `basics.website` in `content/resume.json` to `https://yourdomain`. Canonical URLs, the sitemap, link previews and the PDF header all follow it. See `DEPLOY.md` part 3 for the Vercel and DNS side.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local site at http://localhost:3000 (drafts visible) |
| `npm run check` | Lint + type check + production build: run before pushing |
| `npm run new:project -- <slug> "<Title>"` | Scaffold a new draft case study |
| `npm run format` | Auto-format code |

## Troubleshooting

- **The build failed on Vercel:** open the deployment's build log. The error names the content file and field. Fix it, then push again; the old version stays live meanwhile.
- **The PDF didn't change in `npm run dev`:** it's cached, so restart `npm run dev`. Production always rebuilds it.
- **LinkedIn or WhatsApp still shows an old preview:** those apps cache previews. Re-scrape with [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). WhatsApp refreshes on its own after a while.
- **A style change doesn't show in dev:** restart `npm run dev`.
