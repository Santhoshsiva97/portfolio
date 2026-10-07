# Santhosh Sivakumar — Portfolio

Portfolio and online resume, built with Next.js 16, React 19, TypeScript and Tailwind CSS 4. Content lives in `content/`.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Prettier (write) |
| `npm run check` | Lint + typecheck + build (run before pushing) |
| `npm run new:project -- <slug> "<Title>"` | Scaffold a draft case study |

## Docs

| File | What |
|---|---|
| `UPDATING.md` | Day-to-day: add projects, refresh /now, update the resume, prices, domain |
| `DEPLOY.md` | Vercel, domain/DNS, Resend email, post-launch checks |
| `launch/LAUNCH_KIT.md` | Copy for LinkedIn, the GitHub profile, freelance platforms and the email signature |
| `PROJECT_CONTEXT.md` | Stack, design system and conventions (for development) |

## Updating content

- **Resume:** edit `content/resume.json`.
- **New project:** copy `content/projects/_template.mdx` to `content/projects/<slug>.mdx` and put images in `public/images/projects/<slug>/`.

See `PROJECT_CONTEXT.md` for conventions and `BUILD_PROMPTS.md` for the build plan.
