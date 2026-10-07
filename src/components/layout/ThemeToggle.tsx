"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "@/components/ui/Icon";

type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getTheme = () =>
  (document.documentElement.getAttribute("data-theme") as Theme | null) ??
  "light";
// Unknown on the server; the button renders a neutral state until hydration.
const getServerTheme = () => null;

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage blocked (private mode); the theme still applies for this visit.
    }
  }

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-10 items-center justify-center overflow-hidden rounded-full border border-line text-ink transition-colors hover:border-ink/40 hover:bg-ink/5",
        className,
      )}
    >
      <Icon
        name="sun"
        size={18}
        className={cn(
          "absolute transition-all duration-500 ease-out-expo",
          theme === "dark"
            ? "translate-y-0 rotate-0 opacity-100"
            : "translate-y-6 -rotate-90 opacity-0",
        )}
      />
      <Icon
        name="moon"
        size={18}
        className={cn(
          "absolute transition-all duration-500 ease-out-expo",
          theme === "dark"
            ? "-translate-y-6 rotate-90 opacity-0"
            : "translate-y-0 rotate-0 opacity-100",
        )}
      />
    </button>
  );
}
