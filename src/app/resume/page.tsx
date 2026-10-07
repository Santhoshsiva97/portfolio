import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Accent, Eyebrow } from "@/components/ui/Section";
import {
  formatRange,
  formatYearMonth,
  getProjects,
  getResume,
  statusLabel,
  typeLabel,
} from "@/lib/content";
import { contactHref, resumePdfHref } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Resume — Santhosh Sivakumar",
  description:
    "Resume of Santhosh Sivakumar: Full Stack Software Engineer with 7+ years of Node.js, TypeScript and React.js experience.",
};

export default function ResumePage() {
  const resume = getResume();
  const { basics } = resume;
  const projects = getProjects({ status: ["in-progress", "completed"] });

  const contacts: { icon: IconName; label: string; href: string }[] = [
    { icon: "mail", label: basics.email, href: `mailto:${basics.email}` },
    ...basics.profiles.flatMap((p) =>
      p.url
        ? [
            {
              icon: (p.network === "LinkedIn"
                ? "linkedin"
                : "github") as IconName,
              label: p.url.replace(/^https?:\/\/(www\.)?/, ""),
              href: p.url,
            },
          ]
        : [],
    ),
    ...(basics.website
      ? [
          {
            icon: "arrow-up-right" as IconName,
            label: basics.website.replace(/^https?:\/\//, ""),
            href: basics.website,
          },
        ]
      : []),
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line print:border-0">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0 print:hidden"
        />
        <Container className="relative pt-16 pb-12 sm:pt-24 sm:pb-16 print:pt-0 print:pb-6">
          <div className="print:hidden">
            <Eyebrow>Resume</Eyebrow>
          </div>
          <h1 className="mt-5 animate-rise text-5xl leading-[0.95] font-extrabold sm:text-7xl print:text-4xl">
            {basics.name}
          </h1>
          <p className="stagger-1 mt-4 animate-rise text-xl sm:text-2xl">
            {basics.label}{" "}
            <span className="text-muted">· {basics.headline}</span>
          </p>
          <p className="stagger-1 mt-2 animate-rise font-mono text-sm text-muted">
            {basics.location.city}, {basics.location.region},{" "}
            {basics.location.country}
          </p>
          <div className="stagger-2 mt-8 flex animate-rise flex-wrap gap-3 print:hidden">
            <Button href={resumePdfHref} iconLeft="download">
              Download PDF
            </Button>
            <Button href={contactHref} variant="outline" icon="arrow-right">
              Get in touch
            </Button>
          </div>
        </Container>
      </section>

      <Container className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 print:block print:py-0">
        {/* Sidebar */}
        <aside className="space-y-10 print:hidden">
          <SideBlock title="Contact">
            <ul className="space-y-2.5">
              {contacts.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-2.5 text-sm break-all hover:text-signal"
                  >
                    <Icon
                      name={c.icon}
                      size={16}
                      className="shrink-0 text-muted"
                    />
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </SideBlock>

          <SideBlock title="Open to">
            <div className="flex flex-wrap gap-2">
              {basics.availability.freelance && (
                <Badge tone="flow" dot="live">
                  Freelance
                </Badge>
              )}
              {basics.availability.fullTime && (
                <Badge tone="flow" dot="live">
                  Full-time roles
                </Badge>
              )}
            </div>
            {basics.availability.note && (
              <p className="mt-3 text-sm text-muted">
                {basics.availability.note}
              </p>
            )}
          </SideBlock>

          <SideBlock title="Skills">
            <div className="space-y-5">
              {resume.skills.map((group) => (
                <div key={group.name}>
                  <p className="text-sm font-medium">{group.name}</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {group.keywords.map((k) => (
                      <li
                        key={k}
                        className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.68rem]"
                      >
                        {k}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SideBlock>
        </aside>

        {/* Main column */}
        <div className="min-w-0 space-y-16 print:space-y-8">
          <ResumeSection title="Summary">
            <p className="text-lg leading-relaxed text-ink/85">
              {basics.summary}
            </p>
          </ResumeSection>

          <ResumeSection title="Experience">
            <ol className="relative space-y-12 border-l-2 border-line pl-8 print:space-y-6">
              {resume.work.map((job, i) => (
                <li
                  key={`${job.company}-${job.startDate}`}
                  className="relative break-inside-avoid-page"
                >
                  <span
                    aria-hidden="true"
                    className={
                      i === 0
                        ? "absolute top-1.5 -left-[2.6rem] size-4 rounded-full border-4 border-paper bg-signal ring-2 ring-signal"
                        : "absolute top-1.5 -left-[2.6rem] size-4 rounded-full border-4 border-paper bg-line ring-2 ring-line"
                    }
                  />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-2xl font-bold">
                      {job.position}{" "}
                      <span className="text-muted">at {job.company}</span>
                    </h3>
                    <p className="font-mono text-xs tracking-wider text-muted uppercase">
                      {formatRange(job.startDate, job.endDate)}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted">{job.location}</p>
                  {job.projects.map((project) => (
                    <div key={project.name} className="mt-6">
                      <h4 className="text-lg font-semibold tracking-normal">
                        {project.name}
                      </h4>
                      <ul className="mt-3 space-y-2 [&>li]:relative [&>li]:pl-6 [&>li]:before:absolute [&>li]:before:top-[0.6em] [&>li]:before:left-0.5 [&>li]:before:size-1.5 [&>li]:before:rounded-full [&>li]:before:bg-signal">
                        {project.highlights.map((h) => (
                          <li key={h} className="leading-relaxed text-ink/85">
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </ResumeSection>

          {projects.length > 0 && (
            <ResumeSection title="Projects">
              <ul className="grid gap-4">
                {projects.map((p) => (
                  <li
                    key={p.slug}
                    className="group relative rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-ink/30 sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        tone={p.status === "completed" ? "neutral" : "signal"}
                      >
                        {statusLabel[p.status]}
                      </Badge>
                      <Badge tone="outline">{typeLabel[p.type]}</Badge>
                    </div>
                    <h3 className="mt-4 text-xl font-bold">
                      <Link
                        href={`/projects/${p.slug}`}
                        className="after:absolute after:inset-0 after:rounded-2xl"
                      >
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-muted">{p.summary}</p>
                    <p className="mt-3 font-mono text-xs text-muted">
                      {p.stack.join(" · ")}
                    </p>
                    <Icon
                      name="arrow-up-right"
                      size={18}
                      className="absolute top-5 right-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink print:hidden"
                    />
                  </li>
                ))}
              </ul>
            </ResumeSection>
          )}

          <ResumeSection title="Education">
            {resume.education.map((e) => (
              <div
                key={e.institution}
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
              >
                <div>
                  <h3 className="text-xl font-bold">
                    {e.studyType}, {e.area}
                  </h3>
                  <p className="mt-1 text-muted">
                    {e.institution} · {e.location}
                  </p>
                </div>
                <p className="font-mono text-xs tracking-wider text-muted uppercase">
                  {formatYearMonth(e.endDate)}
                </p>
              </div>
            ))}
          </ResumeSection>

          {resume.certificates.length > 0 && (
            <ResumeSection title="Certifications">
              <ul className="space-y-3">
                {resume.certificates.map((c) => (
                  <li
                    key={c.name}
                    className="flex flex-wrap items-baseline justify-between gap-x-4"
                  >
                    <span>
                      <span className="font-medium">{c.name}</span>{" "}
                      <span className="text-muted">· {c.issuer}</span>
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {formatYearMonth(c.date)}
                    </span>
                  </li>
                ))}
              </ul>
            </ResumeSection>
          )}

          <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8 print:hidden">
            <p className="text-lg">
              Prefer a file? The PDF version is <Accent>ATS-friendly</Accent>{" "}
              and generated from the same data as this page.
            </p>
            <Button
              href={resumePdfHref}
              iconLeft="download"
              variant="secondary"
              className="mt-5"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

function SideBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-4 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ResumeSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-3 font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        <span className="relative flex size-3 items-center justify-center rounded-full border border-signal print:hidden">
          <span className="size-1.5 rounded-full bg-signal" />
        </span>
        {title}
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </h2>
      {children}
    </section>
  );
}
