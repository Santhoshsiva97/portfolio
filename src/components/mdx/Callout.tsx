import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = {
  note: { label: "Note", className: "border-flow bg-flow-soft/50" },
  win: { label: "Result", className: "border-signal bg-signal-soft/60" },
  lesson: { label: "Lesson learned", className: "border-ink/40 bg-surface-2" },
};

/** <Callout tone="win" title="Optional title">…</Callout> */
export function Callout({
  tone = "note",
  title,
  children,
}: {
  tone?: keyof typeof tones;
  title?: string;
  children: ReactNode;
}) {
  const t = tones[tone];
  return (
    <aside
      className={cn(
        "my-8 rounded-2xl border-l-4 px-5 py-4 sm:px-6",
        t.className,
      )}
    >
      <p className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
        {title ?? t.label}
      </p>
      <div className="mt-2 [&>p]:my-0 [&>p+p]:mt-3">{children}</div>
    </aside>
  );
}
