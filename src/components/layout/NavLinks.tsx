"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { navItems } from "@/lib/nav";

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop nav: a pill group where the active page gets a filled pill. */
export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1 backdrop-blur">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "block rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                active
                  ? "bg-ink text-paper"
                  : "text-muted hover:bg-ink/5 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
