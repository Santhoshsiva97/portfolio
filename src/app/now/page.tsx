import type { Metadata } from "next";
import Link from "next/link";
import { ProgressBar } from "@/components/now/ProgressBar";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Accent, Eyebrow, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import {
  formatDate,
  formatYearMonth,
  getNow,
  getProjects,
  getResume,
} from "@/lib/content";
import { contactHref, resumePdfHref } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Now — Santhosh Sivakumar",
  description:
    "What Santhosh Sivakumar is building, learning and open to right now.",
};

export default function NowPage() {
  const now = getNow();
  const { availability } = getResume().basics;
  const building = getProjects({ status: "in-progress" });
  const planned = getProjects({ status: "planned" });
  // Keep cover colours consistent with /projects, which lists in-progress and completed projects in this order.
  const listed = getProjects({ status: ["in-progress", "completed"] });

  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0"
        />
        <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
          <Eyebrow>Now</Eyebrow>
          <h1 className="mt-5 max-w-4xl animate-rise text-5xl leading-[0.95] font-extrabold sm:text-7xl">
            What I&apos;m <Accent>up to</Accent> right now
          </h1>
          <p className="stagger-1 mt-6 max-w-2xl animate-rise text-lg text-muted sm:text-xl">
            {now.intro}
          </p>
          <div className="stagger-2 mt-8 flex animate-rise flex-wrap items-center gap-3">
            <Badge tone="flow" dot="live">
              Updated {formatDate(now.updated)}
            </Badge>
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-muted underline decoration-line underline-offset-4 hover:text-ink"
            >
              What is a now page?
            </a>
          </div>
        </Container>
      </section>

      {building.length > 0 && (
        <Section index={next()} eyebrow="Building" title="On the workbench">
          <ul className="space-y-6">
            {building.map((p) => (
              <li key={p.slug}>
                <article className="group/card reveal relative grid gap-6 rounded-3xl border border-line bg-surface p-3 transition-[border-color,box-shadow] duration-500 hover:border-ink/30 hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)] sm:p-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-center md:gap-10">
                  <ProjectCover
                    project={p}
                    tone={Math.max(
                      listed.findIndex((l) => l.slug === p.slug),
                      0,
                    )}
                  />
                  <div className="px-2 pb-3 sm:px-3 md:py-3 md:pr-6">
                    <h3 className="text-3xl font-bold">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="after:absolute after:inset-0 after:rounded-3xl"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    {p.progressNote && (
                      <p className="mt-3 text-lg text-ink/85">
                        {p.progressNote}
                      </p>
                    )}
                    {p.progress !== null && (
                      <ProgressBar
                        value={p.progress}
                        label={p.title}
                        className="mt-6"
                      />
                    )}
                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted">
                      <div>
                        <dt className="inline">Started </dt>
                        <dd className="inline text-ink">
                          {formatYearMonth(p.startDate)}
                        </dd>
                      </div>
                      {p.targetDate && (
                        <div>
                          <dt className="inline">Target </dt>
                          <dd className="inline text-ink">
                            {formatYearMonth(p.targetDate)}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="inline">Updated </dt>
                        <dd className="inline text-ink">
                          {formatDate(p.updated)}
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                      Read case study
                      <Icon
                        name="arrow-right"
                        size={16}
                        className="transition-transform duration-300 group-hover/card:translate-x-1"
                      />
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section
        index={next()}
        eyebrow="Coming up"
        title={planned.length > 0 ? "Next in the queue" : "The queue is open"}
        className="border-t border-line"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {planned.map((p) => (
            <Card key={p.slug} interactive className="reveal">
              <Badge tone="flow" dot="static">
                Coming soon
                {p.targetDate && ` · ${formatYearMonth(p.targetDate)}`}
              </Badge>
              <h3 className="mt-6 text-2xl font-bold">
                <Link
                  href={`/projects/${p.slug}`}
                  className="after:absolute after:inset-0"
                >
                  {p.title}
                </Link>
              </h3>
              <p className="mt-2 text-muted">{p.progressNote ?? p.summary}</p>
            </Card>
          ))}

          {availability.freelance && (
            // An open slot in the queue doubles as the call to action.
            <div className="reveal flex flex-col justify-between gap-8 rounded-3xl border-2 border-dashed border-signal/60 bg-signal-soft/30 p-6 sm:p-8">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-signal uppercase">
                  Slot available
                </p>
                <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                  Your project could be <Accent>next.</Accent>
                </h3>
                <p className="mt-2 text-muted">
                  I&apos;m taking on new freelance work: web apps, Shopify
                  stores and automation. Tell me what you have in mind.
                </p>
              </div>
              <Button
                href={contactHref}
                icon="arrow-right"
                className="self-start"
              >
                Start a conversation
              </Button>
            </div>
          )}
        </div>
      </Section>

      {now.learning.length > 0 && (
        <Section
          index={next()}
          eyebrow="Learning"
          title={
            <>
              Getting better <Accent>at</Accent>
            </>
          }
          className="bg-canvas border-t border-line bg-surface"
        >
          <ol className="grid gap-5 md:grid-cols-3">
            {now.learning.map((item, i) => (
              <li
                key={item.topic}
                className="reveal rounded-3xl border border-line bg-paper p-6 sm:p-8"
              >
                <span className="font-mono text-xs text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-xl font-bold">{item.topic}</h3>
                <p className="mt-2 text-muted">{item.note}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section
        index={next()}
        eyebrow="Open to"
        title="Ways to work together"
        className="border-t border-line"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <OpenToCard
            open={availability.freelance}
            title="Freelance projects"
            body="Web apps, Shopify stores, integrations and automation. New builds or ongoing support."
            action={{ label: "Hire me", href: contactHref }}
          />
          <OpenToCard
            open={availability.fullTime}
            title="Full-time roles"
            body="Full stack or backend roles working with Node.js, TypeScript and React."
            action={{ label: "Download resume", href: resumePdfHref }}
          />
        </div>
        {availability.note && (
          <p className="mt-6 font-mono text-sm text-muted">
            {availability.note}
          </p>
        )}
      </Section>
    </>
  );
}

function OpenToCard({
  open,
  title,
  body,
  action,
}: {
  open: boolean;
  title: string;
  body: string;
  action: { label: string; href: string };
}) {
  return (
    <Card className={cn("reveal flex flex-col", !open && "opacity-60")}>
      <Badge
        tone={open ? "flow" : "outline"}
        dot={open ? "live" : "static"}
        className="self-start"
      >
        {open ? "Open" : "Not right now"}
      </Badge>
      <h3 className="mt-6 text-2xl font-bold">{title}</h3>
      <p className="mt-2 flex-1 text-muted">{body}</p>
      {open && (
        <Button
          href={action.href}
          variant="secondary"
          icon={action.href.endsWith(".pdf") ? undefined : "arrow-right"}
          iconLeft={action.href.endsWith(".pdf") ? "download" : undefined}
          className="mt-8 self-start"
        >
          {action.label}
        </Button>
      )}
    </Card>
  );
}
