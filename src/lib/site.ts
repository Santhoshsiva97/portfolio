import resume from "../../content/resume.json";

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Work", href: "/projects" },
  { label: "Now", href: "/now" },
  { label: "Services", href: "/services" },
  { label: "Resume", href: "/resume" },
];

export const contactHref = "/contact";
export const resumePdfHref = "/resume.pdf";

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

const iconFor: Record<string, SocialLink["icon"]> = {
  GitHub: "github",
  LinkedIn: "linkedin",
};

/** Social links from resume.json, skipping profiles still marked TODO. */
export const socialLinks: SocialLink[] = [
  ...resume.basics.profiles
    .filter((p) => p.url.startsWith("http") && iconFor[p.network])
    .map((p) => ({ label: p.network, href: p.url, icon: iconFor[p.network] })),
  { label: "Email", href: `mailto:${resume.basics.email}`, icon: "mail" },
];

export const site = {
  name: resume.basics.name,
  shortName: "SS",
  role: resume.basics.label,
  email: resume.basics.email,
  location: `${resume.basics.location.city}, ${resume.basics.location.country}`,
  availableForFreelance: resume.basics.availability.freelance,
};
