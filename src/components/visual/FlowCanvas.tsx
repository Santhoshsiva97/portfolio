import { cn } from "@/lib/cn";

// Coordinates are in a 400x300 viewBox; the box keeps a 4:3 ratio so HTML nodes line up with the SVG path.
const FLOW_PATH =
  "M60 55 C160 55 200 55 300 80 S330 160 200 160 S70 190 100 240 S240 262 330 245";

const nodes = [
  { label: "Brief", x: 60, y: 55, tone: "signal" },
  { label: "Design", x: 300, y: 80, tone: "plain" },
  { label: "Build", x: 200, y: 160, tone: "ink" },
  { label: "Test", x: 100, y: 240, tone: "plain" },
  { label: "Launch", x: 330, y: 245, tone: "flow" },
] as const;

const toneClass = {
  signal: "bg-signal text-on-accent border-transparent",
  flow: "bg-flow text-paper border-transparent",
  ink: "bg-ink text-paper border-transparent",
  plain: "bg-surface text-ink border-line",
};

/** Hero visual: a mini workflow editor showing how a project moves from brief to launch. */
export function FlowCanvas({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative rounded-[28px] border border-line bg-surface/80 p-2 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.35)] backdrop-blur",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="size-2.5 rounded-full bg-signal" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="size-2.5 rounded-full bg-line" />
        <span className="ml-3 font-mono text-[0.7rem] text-muted">
          your-project.flow
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[0.65rem] text-flow">
          <span className="size-1.5 animate-pulse rounded-full bg-flow" />{" "}
          running
        </span>
      </div>

      <div className="bg-canvas relative aspect-[4/3] overflow-hidden rounded-[20px] border border-line bg-paper">
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 size-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="flow-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "var(--signal)" }} />
              <stop offset="1" style={{ stopColor: "var(--flow)" }} />
            </linearGradient>
          </defs>
          {/* Faint base track + animated dashed flow on top */}
          <path
            d={FLOW_PATH}
            fill="none"
            className="stroke-line"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d={FLOW_PATH}
            fill="none"
            stroke="url(#flow-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="6 6"
            className="animate-flow-dash"
          />
          {/* Travelling "job" token (hidden when the user prefers reduced motion) */}
          <g className="motion-reduce:hidden">
            <circle r="9" className="fill-signal" opacity="0.2">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path={FLOW_PATH}
              />
            </circle>
            <circle r="4.5" className="fill-signal">
              <animateMotion
                dur="6s"
                repeatCount="indefinite"
                path={FLOW_PATH}
              />
            </circle>
          </g>
        </svg>

        {nodes.map((node, i) => (
          <div
            key={node.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(node.x / 400) * 100}%`,
              top: `${(node.y / 300) * 100}%`,
            }}
          >
            <div
              className={cn(
                "flex animate-rise items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.7rem] font-medium shadow-sm sm:text-xs",
                toneClass[node.tone],
              )}
              style={{ animationDelay: `${300 + i * 120}ms` }}
            >
              <span className="opacity-60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {node.label}
            </div>
          </div>
        ))}

        {/* Floating proof chips */}
        <div className="absolute top-[38%] left-[6%] hidden animate-float rounded-2xl border border-line bg-surface px-3 py-2 shadow-md sm:block">
          <p className="font-mono text-[0.6rem] tracking-wider text-muted uppercase">
            Onboarding
          </p>
          <p className="font-display text-lg leading-tight font-bold">
            45 → 10 <span className="text-sm font-medium text-muted">min</span>
          </p>
        </div>
        <div
          className="absolute right-[5%] bottom-[34%] hidden animate-float rounded-2xl border border-line bg-surface px-3 py-2 shadow-md sm:block"
          style={{ animationDelay: "-3s" }}
        >
          <p className="font-mono text-[0.6rem] tracking-wider text-muted uppercase">
            Apps shipped
          </p>
          <p className="font-display text-lg leading-tight font-bold text-signal">
            50+
          </p>
        </div>
      </div>
    </div>
  );
}
