import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Accent } from "@/components/ui/Section";
import { FlowCanvas } from "@/components/visual/FlowCanvas";
import type { Home, Resume } from "@/lib/content";
import { contactHref, resumePdfHref } from "@/lib/nav";

export function Hero({ home, resume }: { home: Home; resume: Resume }) {
  const { availability, positioning } = resume.basics;
  const badge = availability.freelance
    ? "Available for new projects"
    : availability.fullTime
      ? "Open to new roles"
      : null;

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-canvas mask-fade absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 size-[520px] rounded-full bg-signal/15 blur-3xl dark:bg-signal/10"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-40 size-[480px] rounded-full bg-flow/10 blur-3xl"
      />

      <Container className="relative grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28">
        <div>
          {badge && (
            <div className="animate-rise">
              <Badge tone="flow" dot="live">
                {badge}
              </Badge>
            </div>
          )}
          <h1 className="stagger-1 mt-6 animate-lift text-5xl leading-[0.95] font-extrabold sm:text-6xl xl:text-7xl">
            {home.hero.title} <Accent>{home.hero.accent}</Accent>
          </h1>
          <p className="stagger-2 mt-6 max-w-xl animate-rise text-lg text-muted sm:text-xl">
            {positioning ?? home.hero.intro}
          </p>
          <div className="stagger-3 mt-9 flex animate-rise flex-wrap gap-3">
            <Button href={contactHref} size="lg" icon="arrow-right">
              Hire me
            </Button>
            <Button
              href={resumePdfHref}
              size="lg"
              variant="outline"
              iconLeft="download"
            >
              Download resume
            </Button>
          </div>
          {availability.note && (
            <p className="stagger-3 mt-4 animate-rise font-mono text-xs text-muted">
              {availability.note}
            </p>
          )}

          <dl className="stagger-4 mt-12 grid max-w-lg animate-rise grid-cols-3 gap-4 border-t border-line pt-6">
            {home.stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                  {s.label}
                </dt>
                <dd className="order-first font-display text-3xl font-bold sm:text-4xl">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <FlowCanvas className="stagger-2 animate-rise lg:rotate-1" />
      </Container>
    </section>
  );
}
