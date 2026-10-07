import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Project } from "@/lib/content";

// Generated covers rotate through the brand colors so a grid of image-less projects still looks designed.
const tones = [
  "bg-ink text-paper",
  "bg-signal text-on-accent",
  "bg-flow text-paper",
];

/** The project's cover image, or a generated "flow" cover until a screenshot is added. */
export function ProjectCover({
  project,
  tone = 0,
  priority,
  className,
}: {
  project: Project;
  tone?: number;
  priority?: boolean;
  className?: string;
}) {
  if (project.cover) {
    return (
      <div
        className={cn(
          "relative aspect-[16/10] overflow-hidden rounded-2xl bg-surface-2",
          className,
        )}
      >
        <Image
          src={project.cover}
          alt={`${project.title} cover`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover/card:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative flex aspect-[16/10] flex-col justify-between overflow-hidden rounded-2xl p-5 sm:p-7",
        tones[tone % tones.length],
        className,
      )}
    >
      <div className="bg-canvas absolute inset-0 opacity-60 [--dot:color-mix(in_srgb,currentColor_22%,transparent)]" />
      <svg
        viewBox="0 0 400 250"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full opacity-50 transition-transform duration-700 ease-out-expo group-hover/card:scale-105"
      >
        <path
          d="M-10 190 C80 190 110 70 200 80 S320 200 410 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          className="animate-flow-dash"
        />
        <circle cx="200" cy="80" r="5" fill="currentColor" />
      </svg>

      <p className="relative font-mono text-[0.7rem] tracking-[0.18em] uppercase opacity-75">
        {project.client}
      </p>
      <div className="relative flex items-end justify-between gap-4">
        <p className="font-display text-3xl leading-[0.95] font-extrabold tracking-tight sm:text-4xl">
          {project.title}
        </p>
        <ul className="hidden shrink-0 flex-col items-end gap-1.5 sm:flex">
          {project.stack.slice(0, 3).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-current/30 px-2.5 py-0.5 font-mono text-[0.65rem]"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
