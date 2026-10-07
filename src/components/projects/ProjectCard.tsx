import Link from "next/link";
import { cn } from "@/lib/cn";
import { statusLabel, typeLabel, type Project } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icon";
import { ProjectCover } from "./ProjectCover";

/** Clickable project card: the whole card is the link (stretched title link keeps one tab stop). */
export function ProjectCard({
  project,
  tone,
  large,
  className,
}: {
  project: Project;
  tone?: number;
  /** Wider layout with the text beside the cover on large screens. */
  large?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group/card relative flex flex-col gap-6 rounded-3xl border border-line bg-surface p-3 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)] sm:p-4",
        large && "lg:grid lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-10",
        className,
      )}
    >
      <ProjectCover project={project} tone={tone} />

      <div className="flex flex-1 flex-col px-2 pb-3 sm:px-3 lg:py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            tone={project.status === "completed" ? "neutral" : "signal"}
            dot={project.status === "in-progress" ? "live" : undefined}
          >
            {statusLabel[project.status]}
          </Badge>
          <Badge tone="outline">{typeLabel[project.type]}</Badge>
        </div>

        <h3
          className={cn(
            "mt-5 font-bold",
            large ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl",
          )}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-flow"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-muted">{project.summary}</p>

        {project.status !== "completed" && project.progressNote && (
          <p className="mt-4 border-l-2 border-signal pl-3 text-sm text-ink/80">
            <span className="font-mono text-xs tracking-wider text-muted uppercase">
              Now ·{" "}
            </span>
            {project.progressNote}
          </p>
        )}

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, large ? 8 : 5).map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-[0.7rem]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <p className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium">
          Read case study
          <Icon
            name="arrow-right"
            size={16}
            className="transition-transform duration-300 ease-out-expo group-hover/card:translate-x-1"
          />
        </p>
      </div>
    </article>
  );
}
