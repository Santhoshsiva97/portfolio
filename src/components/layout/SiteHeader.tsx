import { Suspense } from "react";
import { contactHref } from "@/lib/nav";
import { socialLinks } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 print:hidden">
      {/* Blur lives on a separate layer: backdrop-filter on <header> would trap the fixed mobile menu inside it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 border-b border-line/60 bg-paper/75 backdrop-blur-xl"
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Container className="relative flex h-16 items-center justify-between gap-4 sm:h-18">
        <Logo className="relative z-50" />

        <nav aria-label="Main" className="hidden md:block">
          {/* usePathname may suspend on routes with unknown dynamic params (cacheComponents). */}
          <Suspense fallback={null}>
            <NavLinks />
          </Suspense>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="relative z-50" />
          <div className="hidden md:block">
            <Button href={contactHref} size="sm" icon="arrow-up-right">
              Hire me
            </Button>
          </div>
          <div className="md:hidden">
            <Suspense fallback={null}>
              <MobileMenu socialLinks={socialLinks} />
            </Suspense>
          </div>
        </div>
      </Container>
    </header>
  );
}
