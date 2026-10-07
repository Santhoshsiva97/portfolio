import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "signal" | "flow" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-ink",
  signal: "bg-signal-soft text-ink dark:text-signal",
  flow: "bg-flow-soft text-flow",
  outline: "border border-line text-muted",
};

type BadgeProps = {
  tone?: Tone;
  /** Shows a dot before the label; "live" makes it pulse (e.g. "Available for work"). */
  dot?: "static" | "live";
  className?: string;
  children: ReactNode;
};

export function Badge({
  tone = "neutral",
  dot,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.72rem] font-medium tracking-wide uppercase",
        tones[tone],
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-2">
          {dot === "live" && (
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-current" />
          )}
          <span className="relative size-2 rounded-full bg-current" />
        </span>
      )}
      {children}
    </span>
  );
}
