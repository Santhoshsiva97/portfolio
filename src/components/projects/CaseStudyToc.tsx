"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import type { ProjectHeading } from "@/lib/content/projects";

/** Sticky "On this page" list that highlights the section currently being read. */
export function CaseStudyToc({ headings }: { headings: ProjectHeading[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    // A heading counts as "current" once it passes the upper third of the viewport.
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [headings]);

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
        On this page
      </p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              aria-current={active === h.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                active === h.id
                  ? "border-signal font-medium text-ink"
                  : "border-transparent text-muted hover:text-ink",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
