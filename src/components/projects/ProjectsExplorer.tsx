"use client";

import { useSearchParams } from "next/navigation";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { statusLabel, typeLabel } from "@/lib/content/format";
import type { ProjectStatus, ProjectType } from "@/lib/content/schemas";

export type ProjectMeta = {
  slug: string;
  status: ProjectStatus;
  type: ProjectType;
  stack: string[];
};

type ExplorerProps = {
  projects: ProjectMeta[];
  /** Server-rendered <ProjectCard>s keyed by slug; this component only decides which to show. */
  cards: Record<string, ReactNode>;
};

const STATUS_ORDER: ProjectStatus[] = ["in-progress", "completed", "planned"];
const TYPE_ORDER: ProjectType[] = ["freelance", "personal", "professional"];
const TECH_PREVIEW = 10;

/** Reads filters from the URL (?status=&type=&tech=). Must sit inside <Suspense> (useSearchParams). */
export function ProjectsExplorer(props: ExplorerProps) {
  const searchParams = useSearchParams();
  return <ProjectsFilterView {...props} params={searchParams} />;
}

/** The filter bar + grid. Rendered with params={null} as the Suspense fallback, i.e. the static HTML shows everything. */
export function ProjectsFilterView({
  projects,
  cards,
  params,
}: ExplorerProps & { params: URLSearchParams | null }) {
  const [showAllTech, setShowAllTech] = useState(false);

  const statuses = STATUS_ORDER.filter((s) =>
    projects.some((p) => p.status === s),
  );
  const types = TYPE_ORDER.filter((t) => projects.some((p) => p.type === t));
  const techCounts = new Map<string, number>();
  for (const p of projects)
    for (const t of p.stack) techCounts.set(t, (techCounts.get(t) ?? 0) + 1);
  const techs = [...techCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([t]) => t);

  // Ignore unknown values (old links, typos) instead of showing an empty grid.
  const status = statuses.find((s) => s === params?.get("status")) ?? null;
  const type = types.find((t) => t === params?.get("type")) ?? null;
  const tech = techs.find((t) => t === params?.get("tech")) ?? null;

  const visible = projects.filter(
    (p) =>
      (!status || p.status === status) &&
      (!type || p.type === type) &&
      (!tech || p.stack.includes(tech)),
  );

  function setFilter(key: "status" | "type" | "tech", value: string | null) {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    // replaceState keeps filter clicks out of the back-button history; Next syncs useSearchParams with it.
    window.history.replaceState(
      null,
      "",
      query ? `?${query}` : window.location.pathname,
    );
  }

  const hasFilters = Boolean(status || type || tech);
  const shownTechs =
    showAllTech || (tech && techs.indexOf(tech) >= TECH_PREVIEW)
      ? techs
      : techs.slice(0, TECH_PREVIEW);

  return (
    <>
      <div className="space-y-4 rounded-3xl border border-line bg-surface p-4 sm:p-5">
        {statuses.length > 1 && (
          <FilterRow label="Status">
            <Chip active={!status} onClick={() => setFilter("status", null)}>
              All
            </Chip>
            {statuses.map((s) => (
              <Chip
                key={s}
                active={status === s}
                onClick={() => setFilter("status", status === s ? null : s)}
              >
                {statusLabel[s]}
              </Chip>
            ))}
          </FilterRow>
        )}
        {types.length > 1 && (
          <FilterRow label="Type">
            <Chip active={!type} onClick={() => setFilter("type", null)}>
              All
            </Chip>
            {types.map((t) => (
              <Chip
                key={t}
                active={type === t}
                onClick={() => setFilter("type", type === t ? null : t)}
              >
                {typeLabel[t]}
              </Chip>
            ))}
          </FilterRow>
        )}
        <FilterRow label="Tech">
          <Chip active={!tech} onClick={() => setFilter("tech", null)}>
            Any
          </Chip>
          {shownTechs.map((t) => (
            <Chip
              key={t}
              mono
              active={tech === t}
              onClick={() => setFilter("tech", tech === t ? null : t)}
            >
              {t}
            </Chip>
          ))}
          {techs.length > TECH_PREVIEW &&
            !(tech && techs.indexOf(tech) >= TECH_PREVIEW) && (
              <button
                type="button"
                onClick={() => setShowAllTech((v) => !v)}
                className="px-2 py-1 text-sm font-medium text-flow hover:underline"
              >
                {showAllTech
                  ? "Show less"
                  : `+${techs.length - TECH_PREVIEW} more`}
              </button>
            )}
        </FilterRow>
      </div>

      <div className="mt-6 mb-8 flex items-center justify-between gap-4">
        <p
          aria-live="polite"
          className="font-mono text-xs tracking-wider text-muted uppercase"
        >
          Showing {visible.length} of {projects.length}{" "}
          {projects.length === 1 ? "project" : "projects"}
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={() =>
              window.history.replaceState(null, "", window.location.pathname)
            }
            className="text-sm font-medium text-flow hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Cards use h3; this keeps the heading order h1 → h2 → h3 for screen readers. */}
      <h2 className="sr-only">Projects</h2>
      {visible.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {visible.map((p) => (
            <div key={p.slug} className="flex animate-rise [&>*]:flex-1">
              {cards[p.slug]}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-line px-6 py-16 text-center">
          <p className="font-display text-2xl font-bold">
            Nothing matches those filters yet.
          </p>
          <p className="mt-2 text-muted">
            Try another combination, or clear the filters to see everything.
          </p>
        </div>
      )}
    </>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div
      role="group"
      aria-label={`Filter by ${label.toLowerCase()}`}
      className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4"
    >
      <p className="w-14 shrink-0 pt-1.5 font-mono text-xs tracking-[0.18em] text-muted uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  mono,
  onClick,
  children,
}: {
  active: boolean;
  mono?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-sm transition-colors duration-200",
        mono && "font-mono text-xs",
        active
          ? "border-ink bg-ink text-paper"
          : "border-line text-ink hover:border-ink/40 hover:bg-ink/5",
      )}
    >
      {children}
    </button>
  );
}
