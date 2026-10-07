"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Renders server-rendered children except on the given paths (e.g. the footer CTA on /contact itself). */
export function HideOnPaths({
  paths,
  children,
}: {
  paths: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}
