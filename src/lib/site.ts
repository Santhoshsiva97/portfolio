import "server-only";

import { getResume } from "@/lib/content";

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
};

const resume = getResume();

const iconFor: Record<string, SocialLink["icon"]> = {
  GitHub: "github",
  LinkedIn: "linkedin",
};

/** Social links from resume.json. Profiles whose URL is still TODO are skipped. */
export const socialLinks: SocialLink[] = [
  ...resume.basics.profiles.flatMap((p) =>
    p.url && iconFor[p.network]
      ? [{ label: p.network, href: p.url, icon: iconFor[p.network] }]
      : [],
  ),
  { label: "Email", href: `mailto:${resume.basics.email}`, icon: "mail" },
];

export const site = {
  name: resume.basics.name,
  firstName: resume.basics.name.split(" ")[0],
  role: resume.basics.label,
  email: resume.basics.email,
  location: `${resume.basics.location.city}, ${resume.basics.location.country}`,
  availableForFreelance: resume.basics.availability.freelance,
};
