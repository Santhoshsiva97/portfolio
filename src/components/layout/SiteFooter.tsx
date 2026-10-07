import Link from "next/link";
import { Suspense } from "react";
import { contactHref, navItems, resumePdfHref } from "@/lib/nav";
import { site, socialLinks } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Accent } from "@/components/ui/Section";
import { HideOnPaths } from "./HideOnPaths";
import { Logo } from "./Logo";

// Static on purpose: reading the clock in a prerendered Server Component breaks cacheComponents.
const COPYRIGHT_YEAR = 2026;

export function SiteFooter() {
  return (
    <footer className="mt-auto print:hidden">
      {/* CTA band (not on /contact, where it would link to itself; usePathname needs Suspense) */}
      <Suspense fallback={null}>
        <HideOnPaths paths={[contactHref]}>
          <section className="relative overflow-hidden bg-ink text-paper [--signal-ink:var(--signal-on-ink)]">
            <div
              aria-hidden="true"
              className="bg-canvas mask-fade absolute inset-0 opacity-40 [--dot:color-mix(in_srgb,var(--paper)_16%,transparent)]"
            />
            <Container className="relative py-20 sm:py-28">
              <p className="font-mono text-xs tracking-[0.18em] text-paper/60 uppercase">
                Got a project in mind?
              </p>
              <h2 className="mt-5 max-w-4xl text-5xl leading-[0.95] font-bold sm:text-7xl lg:text-8xl">
                Let&apos;s build something that <Accent>flows.</Accent>
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button
                  href={contactHref}
                  size="lg"
                  icon="arrow-right"
                  className="shadow-[3px_3px_0_0_var(--paper)] hover:shadow-[5px_5px_0_0_var(--paper)]"
                >
                  Start a project
                </Button>
                <Button
                  href={`mailto:${site.email}`}
                  size="lg"
                  variant="ghost"
                  iconLeft="mail"
                  className="text-paper hover:bg-paper/10"
                >
                  {site.email}
                </Button>
              </div>
            </Container>
          </section>
        </HideOnPaths>
      </Suspense>

      {/* Link grid */}
      <div className="border-t border-line">
        <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-muted">
              {site.role} based in {site.location}. Building web apps, Shopify
              stores and workflow automation for businesses that want things to
              just work.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {[...navItems, { label: "Contact", href: contactHref }].map(
                (item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-signal-ink">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              <li>
                <a
                  href={resumePdfHref}
                  className="inline-flex items-center gap-1.5 hover:text-signal-ink"
                >
                  Resume PDF <Icon name="download" size={15} />
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Connect
            </p>
            <ul className="mt-4 space-y-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    {...(s.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="inline-flex items-center gap-2 hover:text-signal-ink"
                  >
                    <Icon name={s.icon} size={16} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Container>

        <Container className="flex flex-col gap-2 border-t border-line py-6 font-mono text-xs text-muted sm:flex-row sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {site.name}
          </p>
          <p>Designed &amp; built by me · Next.js + Tailwind</p>
        </Container>
      </div>
    </footer>
  );
}
