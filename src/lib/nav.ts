// Client-safe navigation constants (no content imports, so client components can use them).

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "Now", href: "/now" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
];

export const contactHref = "/contact";
export const resumePdfHref = "/resume.pdf";
