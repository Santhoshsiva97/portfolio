# Launch kit

Copy-ready text for announcing the portfolio. Everything is drawn from `content/resume.json` and the case studies, so no claims are invented. Edit freely: it's your voice.

> **`https://YOUR-SITE`** is a placeholder. Once the site is live, tell Claude the URL and every placeholder in `launch/` will be replaced.

**Your call before posting:** your employment terms may limit freelance work alongside your full-time job. Headline A mentions Esko; Headline B doesn't. Pick what fits your situation.

---

## 1. LinkedIn

### Headline (max 220 characters)

**A — names your current role**
> Full Stack Software Engineer at Esko | Node.js · TypeScript · React | 7+ yrs building web apps, workflow automation & Shopify stores | Open to freelance projects

**B — role-neutral**
> Full Stack Software Engineer | Node.js · TypeScript · React · Next.js | 7+ years shipping web apps, APIs & workflow automation | Freelance web apps & Shopify stores

### About

> I build web applications, Shopify stores and workflow automation that make businesses run smoother.
>
> For 7+ years I've designed and shipped production software with Node.js, TypeScript, React.js and PostgreSQL, across the full lifecycle from requirements and architecture to testing, CI/CD and release.
>
> A few results I'm proud of:
> → Built and migrated 50+ workflow automation apps for the Enfocus Switch App Store
> → Automated prepress workflows that cut manual intervention by 60%
> → Reduced customer job onboarding from 45 minutes to under 10
> → Built pricing, contract-renewal and reporting features for an enterprise contract management platform
>
> Outside my day job I build products and client projects: an interview-prep platform (React, NestJS, Prisma, BullMQ) and a custom Shopify store for a textile reseller.
>
> 🔧 Stack: TypeScript · JavaScript · React · Next.js · Node.js · NestJS · Express · GraphQL · PostgreSQL · MongoDB · Prisma · AWS · Shopify
>
> 💼 Have a web app, store or automation in mind? Case studies, services and my resume: https://YOUR-SITE
> 📩 santhoshsiva2409@gmail.com

### Profile settings

- **Contact info → Website:** add `https://YOUR-SITE` (type *Portfolio*).
- **Featured** section → *Add a link*, three items:
  1. `https://YOUR-SITE`: "Portfolio — web apps, Shopify stores & automation"
  2. `https://YOUR-SITE/projects/interview-prep-portal`: "Case study: Interview Prep Portal"
  3. `https://YOUR-SITE/resume`: "Resume (web + PDF)"
- **Open to → Providing services:** pick *Web Development*, *Application Development* and *E-commerce*, and add the portfolio link.
- **Open to → Finding a new job** (only if you're job-hunting): use *Recruiters only* visibility if you don't want it public.
- Before posting, paste your URL into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) so the preview card is fresh.

### Launch post

> I just launched my new portfolio 🚀
>
> After 7+ years building software at Esko and Softsquare (workflow automation, enterprise platforms, REST/GraphQL APIs), I'm now also taking on freelance work: custom web apps, Shopify stores and automations that save teams hours every week.
>
> The site has:
> • Case studies with the problem, approach and results
> • A "Now" page showing what I'm building right now
> • My resume, as a web page and an ATS-friendly PDF
>
> Built with Next.js 16, TypeScript and Tailwind CSS, with 100 Lighthouse scores on accessibility, best practices and SEO.
>
> 👉 https://YOUR-SITE
>
> If you know someone who needs a web app, an online store or a process automated, I'd be grateful for an introduction 🙏
>
> #webdevelopment #nextjs #typescript #freelance #shopify

(Using Headline B? Drop "at Esko and Softsquare" from the post too.)

---

## 2. GitHub

1. **Profile README:** create a public repo named exactly **`Santhoshsiva97`** with a `README.md`, then paste in [`github-profile-README.md`](github-profile-README.md). GitHub shows it on your profile page. (Claude can create and push this for you if you say so.)
2. **Profile → Edit profile → Website:** `https://YOUR-SITE`.
3. **Pin** the `portfolio` repo. Interview Prep and PS Textile are private, so the README links to their case studies instead.
4. **The portfolio repo → About (⚙):** description "Portfolio & resume — Next.js 16, TypeScript, Tailwind", website `https://YOUR-SITE`, topics `nextjs`, `portfolio`, `typescript`, `tailwindcss`.

---

## 3. Freelance platforms (Upwork / Fiverr / Contra)

**Profile title**
> Full Stack Developer | React, Next.js, Node.js | Web Apps, Shopify Stores & Automation

**Overview**
> Hi, I'm Santhosh, a full stack engineer with 7+ years of experience shipping production software in Node.js, TypeScript, React and PostgreSQL.
>
> I can help you with:
> ✅ Custom web applications: dashboards, portals, SaaS MVPs (React / Next.js + Node.js APIs)
> ✅ Shopify stores: custom Online Store 2.0 themes, catalogue setup, mobile-first design
> ✅ Workflow automation and integrations: APIs, webhooks and background jobs that remove repetitive work
>
> In my day job I've built 50+ workflow automation apps and cut customer onboarding time from 45 minutes to under 10. I bring the same focus on reliability and measurable results to client work.
>
> How I work: a short call to understand your goals, then a written estimate with scope and timeline before any work starts, and regular progress on a live preview link.
>
> Portfolio and case studies: https://YOUR-SITE
>
> Tell me about your project and I'll suggest the simplest way to get it done.

**Skills / tags:** React, Next.js, Node.js, TypeScript, JavaScript, NestJS, Express, PostgreSQL, MongoDB, GraphQL, REST API, Shopify, Liquid, AWS, API Integration, Automation

**Fiverr gig titles (one per service)**
- I will build a custom web app or dashboard with React, Next.js and Node.js
- I will design and develop a custom Shopify store theme
- I will automate your workflow with APIs, webhooks and background jobs

> Platforms may not allow direct contact details in profiles. Their rules usually permit a portfolio link but not email or phone, so check each platform's policy.

---

## 4. Email signature

Plain text (for any client):

```
Santhosh Sivakumar
Full Stack Software Engineer · Web apps, Shopify stores & automation
https://YOUR-SITE · github.com/Santhoshsiva97
```

HTML version (Gmail → Settings → Signature): open [`email-signature.html`](email-signature.html) in a browser, select all, copy and paste it into the signature box.

---

## 5. Your resume files

Add `https://YOUR-SITE` to the header of your own `Resume_Santhosh_ATS.docx` / PDF. The PDF generated by the site at `/resume.pdf` shows the link automatically once `basics.website` is set.

---

## Checklist

- [ ] Site live (`DEPLOY.md` parts 2 and 4), URL given to Claude, placeholders replaced
- [ ] LinkedIn: headline, About, website, Featured, *Providing services*
- [ ] LinkedIn launch post (preview checked in Post Inspector first)
- [ ] GitHub: profile README, website, pinned `portfolio`, repo About
- [ ] Upwork / Fiverr / Contra profiles
- [ ] Email signature
- [ ] Resume docx/PDF header link
- [ ] Google Search Console: sitemap submitted (`DEPLOY.md` part 5)
