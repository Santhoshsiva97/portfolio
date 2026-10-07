import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow } from "@/components/ui/Section";
import { contactHref, navItems } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/** 404: a broken workflow, with the way back to the main pages. */
export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-canvas mask-fade absolute inset-0"
      />
      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <Eyebrow>Error 404</Eyebrow>
          <h1 className="mt-5 animate-lift text-5xl leading-[0.95] font-extrabold sm:text-7xl">
            This flow hit a <Accent>dead end.</Accent>
          </h1>
          <p className="stagger-1 mt-6 max-w-xl animate-rise text-lg text-muted sm:text-xl">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Here are some places that do work:
          </p>
          <div className="stagger-2 mt-8 flex animate-rise flex-wrap gap-3">
            <Button href="/" icon="arrow-right">
              Back to home
            </Button>
            <Button href={contactHref} variant="outline">
              Contact me
            </Button>
          </div>
          <ul className="stagger-3 mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-2 font-mono text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted underline-offset-4 hover:text-ink hover:underline"
                >
                  {item.href}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* A workflow whose last connection is broken */}
        <svg
          viewBox="0 0 400 260"
          className="stagger-2 w-full max-w-md animate-rise justify-self-center"
          aria-hidden="true"
        >
          <path
            d="M60 70 C140 70 160 130 220 130"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray="7 7"
            className="animate-flow-dash stroke-line"
          />
          <path
            d="M220 130 C250 130 262 150 270 168"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray="7 7"
            className="stroke-signal"
          />
          <path
            d="M300 196 C312 206 326 210 345 210"
            fill="none"
            strokeWidth="2.5"
            strokeDasharray="7 7"
            className="stroke-line"
          />
          <circle cx="60" cy="70" r="16" className="fill-signal" />
          <circle cx="220" cy="130" r="16" className="fill-ink" />
          <circle cx="345" cy="210" r="16" className="fill-line" />
          <text
            x="270"
            y="194"
            className="fill-signal font-mono"
            fontSize="26"
            fontWeight="700"
          >
            ✕
          </text>
          <text x="40" y="35" className="fill-muted font-mono" fontSize="13">
            request
          </text>
          <text x="196" y="170" className="fill-muted font-mono" fontSize="13">
            router
          </text>
          <text x="318" y="250" className="fill-muted font-mono" fontSize="13">
            404
          </text>
        </svg>
      </Container>
    </section>
  );
}
