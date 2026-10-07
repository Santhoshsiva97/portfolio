import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

/** Monogram: two workflow nodes joined by a flow line, plus the wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn("group/logo flex items-center gap-2.5", className)}
    >
      <svg viewBox="0 0 36 36" className="size-9 shrink-0" aria-hidden="true">
        <rect width="36" height="36" rx="11" className="fill-ink" />
        <path
          d="M11 12.5c8 0 6 11 14 11"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="3 3"
          className="stroke-paper/60 group-hover/logo:animate-flow-dash"
        />
        <circle cx="11" cy="12.5" r="3.5" className="fill-signal" />
        <circle cx="25" cy="23.5" r="3.5" className="fill-paper" />
      </svg>
      <span className="font-display text-lg leading-none font-bold tracking-tight">
        {site.name.split(" ")[0]}
        <span className="text-signal">.</span>
      </span>
    </Link>
  );
}
