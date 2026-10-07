import { cn } from "@/lib/cn";

/** A "flow line" progress bar: dashed track, solid signal→flow fill, node at the leading edge. */
export function ProgressBar({
  value,
  label,
  className,
}: {
  value: number;
  /** Accessible name, e.g. the project title. */
  label: string;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="progressbar"
        aria-label={`${label} progress`}
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-3 flex-1"
      >
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-line"
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-0 h-[3px] -translate-y-1/2 rounded-full bg-linear-to-r from-signal to-flow"
          style={{ width: `${pct}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper bg-flow ring-1 ring-flow"
          style={{ left: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-right font-mono text-xs text-muted tabular-nums">
        {pct}%
      </span>
    </div>
  );
}
