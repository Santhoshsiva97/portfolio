import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/metadata";
import { Suspense } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import {
  ProjectsExplorer,
  ProjectsFilterView,
  type ProjectMeta,
} from "@/components/projects/ProjectsExplorer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow } from "@/components/ui/Section";
import { getProjects } from "@/lib/content";
import { contactHref } from "@/lib/nav";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies of web apps, Shopify stores and workflow automation built by Santhosh Sivakumar.",
  path: "/projects",
});

export default function ProjectsPage() {
  // Planned projects live on /now; this page lists work that exists.
  const projects = getProjects({ status: ["in-progress", "completed"] });

  const meta: ProjectMeta[] = projects.map(({ slug, status, type, stack }) => ({
    slug,
    status,
    type,
    stack,
  }));
  const cards = Object.fromEntries(
    projects.map((p, i) => [
      p.slug,
      <ProjectCard key={p.slug} project={p} tone={i} />,
    ]),
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0"
        />
        <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-5 max-w-4xl animate-lift text-5xl leading-[0.95] font-extrabold sm:text-7xl">
            Projects &amp; <Accent>case studies</Accent>
          </h1>
          <p className="stagger-1 mt-6 max-w-2xl animate-rise text-lg text-muted sm:text-xl">
            Client stores, products I&apos;m building and the problems behind
            them. Filter by status, type or technology.
          </p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        {/* Static HTML shows every project (fallback); the URL filters apply once the page hydrates. */}
        <Suspense
          fallback={
            <ProjectsFilterView projects={meta} cards={cards} params={null} />
          }
        >
          <ProjectsExplorer projects={meta} cards={cards} />
        </Suspense>

        <div className="mt-16 grid gap-6 rounded-3xl border border-line bg-surface p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Looking for my day-job experience?
            </h2>
            <p className="mt-2 text-muted">
              7+ years of enterprise work at Esko and Softsquare (workflow
              automation, contract management, assessment platforms) is on my
              resume.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/resume" variant="secondary" icon="arrow-right">
              View resume
            </Button>
            <Button href={contactHref} variant="outline">
              Discuss a project
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
