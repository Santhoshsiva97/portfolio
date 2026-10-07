# Deploying the portfolio

The code side is done. Everything below needs **your** accounts, so do the sign-ups, payments, DNS changes and API keys yourself. Each step says exactly where to click. Work top to bottom; the site is live after part 2.

---

## 1. Code on GitHub (Claude does this on your OK)

`main` is fast-forwarded to the latest step branch and pushed to `github.com/Santhoshsiva97/portfolio` (currently **public**). Every later push to `main` redeploys production, and every other branch gets its own preview URL.

## 2. Vercel: first deploy (~5 minutes)

1. Go to **vercel.com → Sign Up → Continue with GitHub** (Hobby plan, free).
2. **Add New… → Project → Import** `Santhoshsiva97/portfolio`. If it isn't listed, use *Adjust GitHub App Permissions* and grant access to that repo.
3. On the configure screen, leave everything as detected:
   - Framework: **Next.js**
   - Root directory: `./`
   - Build command: `next build`
   - Node: 24.x (from `package.json` `engines`)
4. **Environment Variables:** skip for now (part 4 adds them).
5. Click **Deploy**. After about a minute you get `https://<project>.vercel.app`. Open it and click around.
   - Canonical URLs, the sitemap and link previews already use this `.vercel.app` address automatically.
6. **Analytics tab → Enable Web Analytics** (cookieless, free tier). The code is already in place.

## 3. Domain (~15 minutes + DNS wait)

1. **Buy the domain** from any registrar (Cloudflare Registrar, Namecheap, GoDaddy, Hostinger…). Ideas: `santhoshsivakumar.dev`, `santhosh.dev`, `santhoshsivakumar.in`. `.dev` is HTTPS-only, which is fine on Vercel.
2. In Vercel: **Project → Settings → Domains → Add**. Enter `yourdomain` and accept the suggestion to also add `www` (Vercel redirects one to the other).
3. Vercel shows the DNS records to create. Add **exactly those values** at your registrar's DNS page:
   - usually an `A` record for the bare domain
   - and a `CNAME` for `www`
   - or switch the domain's nameservers to Vercel's if you prefer
4. Wait until both domains show **Valid Configuration** (minutes to a few hours). HTTPS certificates are automatic.
5. **Tell Claude the domain.** Claude sets `basics.website` in `content/resume.json`, which updates canonical URLs, the sitemap, OG images and the PDF header, then commits and pushes.

## 4. Contact form email: Resend (~10 minutes)

Until this is done, the live form tells visitors to email you directly.

1. **resend.com → Sign up**, using the email you want enquiries delivered to.
2. **API Keys → Create API Key**: permission *Sending access*. Copy it (it starts with `re_`).
3. In Vercel, go to **Project → Settings → Environment Variables** and add these for *Production* and *Preview*:
   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | the key from step 2 |
   | `CONTACT_TO_EMAIL` | your inbox (must be your Resend account email until step 4 is done) |
4. **Send from your own domain** (recommended, after part 3):
   1. Resend **Domains → Add Domain** → your domain.
   2. Add the DNS records it shows (DKIM `TXT`, SPF `MX` + `TXT`) at your registrar, then **Verify**.
   3. Add `CONTACT_FROM_EMAIL` = `Portfolio <hello@yourdomain>` in Vercel.
5. **Deployments → ⋯ → Redeploy** so the variables take effect. Send yourself a test message from `/contact`.

> For local testing, copy `.env.example` to `.env.local` and fill in the same values. `.env.local` is git-ignored, so it's never committed.

## 5. After launch: checks and sharing

- [ ] `https://yourdomain/sitemap.xml` and `/robots.txt` show your domain.
- [ ] **Link previews:** paste URLs into [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and [opengraph.xyz](https://www.opengraph.xyz/). Previews are cached, and the inspector refreshes LinkedIn's cache.
- [ ] **Google Search Console:** add a *Domain* property, verify with the DNS `TXT` record, then **Sitemaps → submit** `sitemap.xml`.
- [ ] **Structured data:** [Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/resume`.
- [ ] Download `/resume.pdf` and check that the header shows your website.
- [ ] Step 12: put the link on LinkedIn, the GitHub profile README, Upwork/Fiverr and your email signature.

## Day-to-day

- Edit content (`content/*.json`, `content/projects/*.mdx`), then commit and push to `main`. Vercel rebuilds in about a minute.
- A broken content file fails the Vercel build with the file and field named, and the previous version stays live.
