"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { contactHref, navItems, resumePdfHref } from "@/lib/nav";
import type { SocialLink } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isActive } from "./NavLinks";

export function MobileMenu({ socialLinks }: { socialLinks: SocialLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="relative z-50 inline-flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink/5"
      >
        <Icon name={open ? "close" : "menu"} size={20} />
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="bg-canvas fixed inset-0 z-40 flex flex-col bg-paper px-4 pt-24 pb-8 sm:px-6"
      >
        <nav aria-label="Mobile">
          <ol className="flex flex-col">
            {[
              { label: "Home", href: "/" },
              ...navItems,
              { label: "Contact", href: contactHref },
            ].map((item, i) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className="animate-rise border-b border-line"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-4 py-4"
                  >
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-4xl font-bold tracking-tight transition-colors",
                        active ? "text-signal" : "group-hover:text-signal",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-auto flex flex-col gap-3">
          <Button
            href={contactHref}
            onClick={close}
            size="lg"
            icon="arrow-right"
          >
            Hire me
          </Button>
          <Button
            href={resumePdfHref}
            variant="outline"
            size="lg"
            iconLeft="download"
          >
            Download resume
          </Button>
          <ul className="mt-4 flex justify-center gap-3">
            {socialLinks.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-line text-ink hover:bg-ink/5"
                >
                  <Icon name={s.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
