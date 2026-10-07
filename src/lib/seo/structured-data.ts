import { getResume, type Project } from "@/lib/content";
import { absoluteUrl } from "@/lib/site-url";

// schema.org JSON-LD for search engines and AI assistants. Validate with https://validator.schema.org/.

const PERSON_ID = "/#person";
const WEBSITE_ID = "/#website";

export function personSchema() {
  const { basics, skills, work, education } = getResume();
  const current = work.find((job) => job.endDate === null);
  return {
    "@type": "Person",
    "@id": absoluteUrl(PERSON_ID),
    name: basics.name,
    jobTitle: basics.label,
    description: basics.summary,
    url: absoluteUrl("/"),
    email: `mailto:${basics.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: basics.location.city,
      addressRegion: basics.location.region,
      addressCountry: basics.location.country,
    },
    sameAs: basics.profiles.flatMap((p) => (p.url ? [p.url] : [])),
    knowsAbout: skills
      .filter((g) =>
        [
          "Languages",
          "Frontend",
          "Backend",
          "Databases",
          "Cloud & DevOps",
          "E-commerce",
        ].includes(g.name),
      )
      .flatMap((g) => g.keywords),
    ...(current
      ? { worksFor: { "@type": "Organization", name: current.company } }
      : {}),
    alumniOf: education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
    })),
  };
}

/** Home page: the person and the website they publish. */
export function homeGraph() {
  const { basics } = getResume();
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": absoluteUrl(WEBSITE_ID),
        url: absoluteUrl("/"),
        name: basics.name,
        description: `Portfolio and resume of ${basics.name}, ${basics.label}.`,
        inLanguage: "en",
        publisher: { "@id": absoluteUrl(PERSON_ID) },
      },
    ],
  };
}

/** /resume: a ProfilePage whose main entity is the person (Google's profile-page format). */
export function profilePageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: absoluteUrl("/resume"),
    mainEntity: personSchema(),
  };
}

/** /projects/[slug]: the case study as a CreativeWork by the person. */
export function projectSchema(project: Project) {
  const { basics } = getResume();
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    url: absoluteUrl(`/projects/${project.slug}`),
    dateCreated: project.startDate,
    dateModified: project.updated,
    keywords: project.stack.join(", "),
    creativeWorkStatus:
      project.status === "completed" ? "Published" : "Incomplete",
    author: {
      "@type": "Person",
      "@id": absoluteUrl(PERSON_ID),
      name: basics.name,
    },
    ...(project.links.live ? { sameAs: project.links.live } : {}),
  };
}
