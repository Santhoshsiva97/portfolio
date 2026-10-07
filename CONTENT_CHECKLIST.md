# Content Checklist (Step 0)

Tick these off as you gather them. Search the content files for `TODO` to find every spot still waiting on you. TODOs never show on the site: in `resume.json` a value starting with `TODO` is hidden, and in `.mdx` bodies write notes as `{/* TODO … */}`. If you break a field, the build stops and names the file and the field.

## Must have before Step 4 (home page)

- [ ] **Positioning line** (`resume.json` → `basics.positioning`): one sentence for clients, covering what you build and for whom.
- [ ] **Availability note** (`basics.availability.note`): e.g. freelance + full-time, remote or Bangalore.
- [ ] **LinkedIn URL** (`basics.profiles`). It also appears in the PDF resume header.
- [ ] **Website** (`basics.website`): set it to your domain after Step 11 so the PDF links back to the site.
- [ ] **Profile photo**: square, at least 800×800, plain background. Save it as `public/images/profile.jpg`. (`Portfolio/profile/` is empty right now.)
- [ ] **Featured projects**: the top 3. Currently Interview Prep Portal and PS Textile. Which is the third?

## Per project (`content/projects/<slug>.mdx`)

- [ ] Cover image, 1600×900 → `public/images/projects/<slug>/cover.jpg`
- [ ] 3–6 screenshots (desktop + mobile) → same folder, then list them in `gallery`
- [ ] Live link and GitHub link (only if the repo is public)
- [ ] 1–3 measurable results
- [ ] Target date and progress note for in-progress work
- [ ] **PS Textile:** ask the owner whether you may name the business and show screenshots, and whether they'd give a one-line testimonial.

## More projects to consider adding

- [ ] Any past freelance or side work (even small sites count)
- [ ] Planned projects for "Now building" (status `planned`), e.g. your next freelance offer or product idea
- [ ] This portfolio itself, as a small case study once it's live

## Keep fresh (monthly)

- [ ] `content/now.json`: `updated`, `focus`, `learning`
- [ ] Each in-progress project: `progress`, `progressNote`, `targetDate`, `updated`
- [ ] Confirm the progress estimates: Interview Prep 45%, PS Textile 90%

## Nice to have

- [ ] Testimonials (`resume.json` → `testimonials`: `{ "name", "role", "quote", "projectSlug" }`)
- [ ] Certificates (`resume.json` → `certificates`)
- [ ] Services and pricing ("starting from" ₹ amounts), needed by Step 8
- [ ] Cal.com booking link, needed by Step 8

## Decisions

- [ ] **Domain name**, e.g. `santhoshsivakumar.dev`, `.in` or `.com`. Needed by Step 11.
- [ ] **Lead audience**: freelance clients or recruiters first? Decides hero order in Step 4.
- [ ] Show your phone number publicly? Currently **no**: it's only in the PDF (`basics.showPhone`).
- [ ] Contact email: the site uses `santhoshsiva2409@gmail.com` (from your resume). Keep it, or use a domain email later?
