import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  /** Node number shown in the eyebrow, e.g. "01". */
  index?: string;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** A page section styled like a node on a workflow canvas: "● 01 — Work". */
export function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      <Container>
        {(eyebrow || title || intro) && (
          <header className="mb-12 max-w-3xl sm:mb-16">
            {eyebrow && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
            {title && (
              <h2 className="mt-5 text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
                {title}
              </h2>
            )}
            {intro && (
              <p className="mt-5 text-lg text-muted sm:text-xl">{intro}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({
  index,
  children,
}: {
  index?: string;
  children: ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
      <span className="relative flex size-3 items-center justify-center rounded-full border border-signal">
        <span className="size-1.5 rounded-full bg-signal" />
      </span>
      {index && <span className="text-ink">{index}</span>}
      {index && <span aria-hidden="true" className="h-px w-6 bg-line" />}
      {children}
    </p>
  );
}

/** Italic serif accent for a word inside a display heading. */
export function Accent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <em
      className={cn(
        "font-serif font-normal tracking-normal text-signal italic",
        className,
      )}
    >
      {children}
    </em>
  );
}
