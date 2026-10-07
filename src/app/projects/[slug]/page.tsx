import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaseStudyToc } from "@/components/projects/CaseStudyToc";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import {
  formatDate,
  formatRange,
  formatYearMonth,
  getProject,
  getProjectBody,
  getProjects,
  getProjectSlugs,
  statusLabel,
  typeLabel,
} from "@/lib/content";
import { cn } from "@/lib/cn";
import { contactHref } from "@/lib/nav";

// Every case study is prerendered at build time. Any other slug falls through to notFound() below
// (`dynamicParams` isn't allowed with cacheComponents).
export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case study`,
    description: project.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Body = await getProjectBody(slug);

  // Prev/next walk the same list (and colours) as /projects; planned projects are reachable but not linked.
  const listed = getProjects({ status: ["in-progress", "completed"] });
  const index = listed.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? listed[index - 1] : null;
  const next =
    index >= 0 && index < listed.length - 1 ? listed[index + 1] : null;
  const tone = Math.max(index, 0);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Role", value: project.role },
    {
      label: "Timeline",
      value: formatRange(project.startDate, project.endDate),
    },
    {
      label: "Stack",
      value:
        project.stack.slice(0, 4).join(", ") +
        (project.stack.length > 4 ? "…" : ""),
    },
  ];

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0"
        />
        <Container className="relative pt-10 pb-12 sm:pt-14">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase hover:text-ink"
          >
            <Icon
              name="arrow-right"
              size={14}
              className="rotate-180 transition-transform group-hover:-translate-x-1"
            />
            All work
          </Link>

          <div className="mt-8 flex animate-rise flex-wrap gap-2">
            <Badge
              tone={project.status === "completed" ? "neutral" : "signal"}
              dot={project.status === "in-progress" ? "live" : undefined}
            >
              {statusLabel[project.status]}
            </Badge>
            <Badge tone="outline">{typeLabel[project.type]}</Badge>
          </div>
          <h1 className="stagger-1 mt-5 max-w-5xl animate-rise text-5xl leading-[0.95] font-extrabold sm:text-7xl">
            {project.title}
          </h1>
          <p className="stagger-2 mt-6 max-w-3xl animate-rise text-lg text-muted sm:text-xl">
            {project.summary}
          </p>

          {(project.links.live ||
            project.links.github ||
            project.links.caseStudy) && (
            <div className="stagger-3 mt-8 flex animate-rise flex-wrap gap-3">
              {project.links.live && (
                <Button href={project.links.live} icon="arrow-up-right">
                  Visit live site
                </Button>
              )}
              {project.links.github && (
                <Button
                  href={project.links.github}
                  variant="outline"
                  iconLeft="github"
                >
                  Source code
                </Button>
              )}
              {project.links.caseStudy && (
                <Button
                  href={project.links.caseStudy}
                  variant="ghost"
                  icon="arrow-up-right"
                >
                  Full write-up
                </Button>
              )}
            </div>
          )}

          <dl className="stagger-4 mt-12 grid animate-rise gap-6 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                  {m.label}
                </dt>
                <dd className="mt-2 font-medium">{m.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </header>

      {/* Cover */}
      <Container>
        <ProjectCover
          project={project}
          tone={tone}
          priority
          size="lg"
          className="stagger-3 animate-rise"
        />
      </Container>

      {/* Now building / results */}
      {(project.status !== "completed" || project.results.length > 0) && (
        <Container
          className={cn(
            "mt-8 grid gap-4",
            project.status !== "completed" &&
              project.results.length > 0 &&
              "md:grid-cols-[1.2fr_1fr]",
          )}
        >
          {project.status !== "completed" && (
            <div className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
              <p className="flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-signal uppercase">
                <span className="size-2 animate-pulse rounded-full bg-signal" />
                {project.status === "planned" ? "Coming up" : "Now building"}
              </p>
              {project.progressNote && (
                <p className="mt-4 text-lg">{project.progressNote}</p>
              )}
              <p className="mt-4 font-mono text-xs text-muted">
                {project.targetDate && (
                  <>Target: {formatYearMonth(project.targetDate)} · </>
                )}
                Updated {formatDate(project.updated)}
              </p>
            </div>
          )}
          {project.results.length > 0 && (
            <ul className="grid gap-3 rounded-3xl bg-ink p-6 text-paper sm:p-8">
              <li className="font-mono text-xs tracking-[0.18em] text-paper/60 uppercase">
                Results
              </li>
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 text-lg">
                  <Icon
                    name="spark"
                    size={18}
                    className="mt-1.5 shrink-0 text-signal"
                  />
                  {r}
                </li>
              ))}
            </ul>
          )}
        </Container>
      )}

      {/* Body with sticky table of contents */}
      <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        {project.headings.length > 1 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <CaseStudyToc headings={project.headings} />
            </div>
          </aside>
        )}
        <div className="max-w-3xl lg:col-start-2">
          <Body />

          <section
            aria-labelledby="built-with"
            className="mt-14 border-t border-line pt-8"
          >
            <h2
              id="built-with"
              className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase"
            >
              Built with
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Link
                    href={`/projects?tech=${encodeURIComponent(tech)}`}
                    className="block rounded-full border border-line bg-surface px-3 py-1 font-mono text-xs transition-colors hover:border-ink"
                  >
                    {tech}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Container>

      {/* Gallery */}
      {project.gallery.length > 0 && (
        <Container className="pb-16">
          <h2 className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
            Screens
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {project.gallery.map((src, i) => (
              <div
                key={src}
                className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface"
              >
                <Image
                  src={src}
                  alt={`${project.title} screen ${i + 1}`}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      )}

      {/* Similar project CTA + prev/next */}
      <Container className="pb-20">
        <div className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-signal-soft/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Need something like this?
            </h2>
            <p className="mt-2 text-muted">
              Tell me what you&apos;re building and I&apos;ll suggest the
              simplest way to get there.
            </p>
          </div>
          <Button href={contactHref} icon="arrow-right">
            Start a project
          </Button>
        </div>

        {(prev || next) && (
          <nav
            aria-label="More case studies"
            className="mt-6 grid gap-4 sm:grid-cols-2"
          >
            {prev ? (
              <PagerLink
                direction="prev"
                href={`/projects/${prev.slug}`}
                title={prev.title}
              />
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <PagerLink
                direction="next"
                href={`/projects/${next.slug}`}
                title={next.title}
              />
            )}
          </nav>
        )}
      </Container>
    </article>
  );
}

function PagerLink({
  direction,
  href,
  title,
}: {
  direction: "prev" | "next";
  href: string;
  title: string;
}) {
  const isNext = direction === "next";
  return (
    <Link
      href={href}
      className={`group rounded-3xl border border-line bg-surface p-6 transition-colors hover:border-ink/40 ${isNext ? "sm:text-right" : ""}`}
    >
      <span
        className={`flex items-center gap-2 font-mono text-xs tracking-wider text-muted uppercase ${isNext ? "sm:justify-end" : ""}`}
      >
        {!isNext && (
          <Icon
            name="arrow-right"
            size={14}
            className="rotate-180 transition-transform group-hover:-translate-x-1"
          />
        )}
        {isNext ? "Next case study" : "Previous case study"}
        {isNext && (
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        )}
      </span>
      <span className="mt-2 block font-display text-2xl font-bold">
        {title}
      </span>
    </Link>
  );
}
