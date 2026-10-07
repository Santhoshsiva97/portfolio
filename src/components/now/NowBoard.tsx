import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatDate, formatYearMonth } from "@/lib/content/format";
import type { Project } from "@/lib/content/projects";
import { ProgressBar } from "./ProgressBar";

/** Compact status board styled like a log window: one row per in-progress or planned project. */
export function NowBoard({
  projects,
  updated,
  className,
}: {
  projects: Project[];
  updated: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border border-line bg-surface shadow-[0_40px_80px_-48px_rgb(0_0_0/0.35)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line px-5 py-3">
        <span className="size-2.5 rounded-full bg-signal" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-3 font-mono text-[0.7rem] text-muted">now.log</span>
        <span className="ml-auto font-mono text-[0.65rem] text-muted">
          updated {formatDate(updated)}
        </span>
      </div>

      <ul className="divide-y divide-line">
        {projects.map((p) => (
          <li
            key={p.slug}
            className="group relative px-5 py-5 transition-colors hover:bg-surface-2/60 sm:px-6"
          >
            <div className="flex items-center gap-3 font-mono text-[0.7rem] tracking-wider uppercase">
              <span
                className={cn(
                  "flex items-center gap-1.5",
                  p.status === "planned" ? "text-flow" : "text-signal-ink",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-current",
                    p.status === "in-progress" && "animate-pulse",
                  )}
                />
                {p.status === "planned" ? "queued" : "building"}
              </span>
              {p.targetDate && (
                <span className="text-muted">
                  target {formatYearMonth(p.targetDate)}
                </span>
              )}
            </div>
            <h3 className="mt-2 text-xl font-bold">
              <Link
                href={`/projects/${p.slug}`}
                className="after:absolute after:inset-0"
              >
                {p.title}
              </Link>
            </h3>
            {p.progressNote && (
              <p className="mt-1 line-clamp-2 text-sm text-muted">
                {p.progressNote}
              </p>
            )}
            {p.progress !== null && (
              <ProgressBar
                value={p.progress}
                label={p.title}
                className="mt-4"
              />
            )}
          </li>
        ))}
        {projects.length === 0 && (
          <li className="px-6 py-8 font-mono text-sm text-muted">
            $ idle. Ready for your project.
          </li>
        )}
      </ul>
    </div>
  );
}
