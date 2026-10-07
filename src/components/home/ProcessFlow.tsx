import type { Home } from "@/lib/content";

/** "How I work" as a workflow: numbered nodes joined by a dashed flow line (horizontal on desktop, vertical on mobile). */
export function ProcessFlow({ steps }: { steps: Home["process"] }) {
  return (
    <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
      {/* Connector: vertical on mobile, horizontal on desktop */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[1.375rem] w-px border-l-2 border-dashed border-line md:top-[1.375rem] md:right-[calc(25%-2.5rem)] md:bottom-auto md:left-[1.375rem] md:h-px md:w-auto md:border-t-2 md:border-l-0"
      />
      {steps.map((step, i) => (
        <li
          key={step.title}
          className="reveal relative flex gap-5 md:flex-col md:gap-6"
        >
          <span
            className={
              i === 0
                ? "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-signal font-mono text-sm font-bold text-on-accent"
                : i === steps.length - 1
                  ? "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-flow font-mono text-sm font-bold text-paper"
                  : "relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-paper font-mono text-sm font-bold"
            }
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-2xl font-bold">{step.title}</h3>
            <p className="mt-2 text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
