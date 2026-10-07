import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import {
  formatRange,
  formatYearMonth,
  statusLabel,
  typeLabel,
} from "@/lib/content/format";
import type { Project } from "@/lib/content/projects";
import type { Resume } from "@/lib/content/schemas";

// ATS-friendly on purpose: one column, real selectable text, standard section names, built-in Helvetica
// (no embedded/icon fonts), no tables, images or colour-only meaning. Mirrors Resume_Santhosh_ATS.pdf.

const NAVY = "#1f3a5f";
const INK = "#1a1a1a";
const MUTED = "#555555";

const s = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 40,
    fontFamily: "Helvetica",
    fontSize: 9.6,
    lineHeight: 1.35,
    color: INK,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    lineHeight: 1.2,
    color: NAVY,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: 2,
  },
  label: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    textAlign: "center",
    marginTop: 3,
  },
  contact: { fontSize: 9, textAlign: "center", marginTop: 3, color: MUTED },
  link: { color: MUTED, textDecoration: "none" },
  section: { marginTop: 11 },
  heading: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: NAVY,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    borderBottomWidth: 1,
    borderBottomColor: NAVY,
    paddingBottom: 2,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bold: { fontFamily: "Helvetica-Bold" },
  italic: { fontFamily: "Helvetica-Oblique", color: MUTED },
  projectName: { fontFamily: "Helvetica-Bold", marginTop: 3 },
  bullet: { flexDirection: "row", marginTop: 1.5, paddingLeft: 6 },
  bulletDot: { width: 9 },
  bulletText: { flex: 1 },
  job: { marginBottom: 6 },
});

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={s.bullet} wrap={false}>
      <Text style={s.bulletDot}>•</Text>
      <Text style={s.bulletText}>{children}</Text>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={s.section}>
      {/* Keep a heading with at least its first lines instead of stranding it at a page bottom. */}
      <Text style={s.heading} minPresenceAhead={40}>
        {title}
      </Text>
      {children}
    </View>
  );
}

export function ResumeDocument({
  resume,
  projects,
}: {
  resume: Resume;
  projects: Project[];
}) {
  const { basics } = resume;
  const location = [
    basics.location.city,
    basics.location.region,
    basics.location.country,
  ].join(", ");
  const profiles = basics.profiles.filter((p) => p.url);

  return (
    <Document
      title={`${basics.name} — Resume`}
      author={basics.name}
      subject={`${basics.label} resume`}
      keywords={resume.skills.flatMap((g) => g.keywords).join(", ")}
      creator={basics.name}
      producer={basics.name}
      language="en"
    >
      <Page size="A4" style={s.page}>
        {/* Header */}
        <Text style={s.name}>{basics.name.toUpperCase()}</Text>
        <Text style={s.label}>
          {basics.label} | {basics.headline.replace(/ · /g, " | ")}
        </Text>
        <Text style={s.contact}>
          {location} | {basics.phone} |{" "}
          <Link style={s.link} src={`mailto:${basics.email}`}>
            {basics.email}
          </Link>
        </Text>
        {(profiles.length > 0 || basics.website) && (
          <Text style={s.contact}>
            {[
              ...(basics.website
                ? [{ label: "Portfolio", url: basics.website }]
                : []),
              ...profiles.map((p) => ({
                label: p.network,
                url: p.url as string,
              })),
            ].map((l, i) => (
              <Text key={l.url}>
                {i > 0 && " | "}
                <Link style={s.link} src={l.url}>
                  {l.url.replace(/^https?:\/\/(www\.)?/, "")}
                </Link>
              </Text>
            ))}
          </Text>
        )}

        <Section title="Professional Summary">
          <Text>{basics.summary}</Text>
        </Section>

        <Section title="Technical Skills">
          {resume.skills.map((group) => (
            <Bullet key={group.name}>
              <Text style={s.bold}>{group.name}: </Text>
              {group.keywords.join(", ")}
            </Bullet>
          ))}
        </Section>

        <Section title="Professional Experience">
          {resume.work.map((job) => (
            <View key={`${job.company}-${job.startDate}`} style={s.job}>
              <View style={s.row} wrap={false}>
                <Text style={s.bold}>{job.position}</Text>
                <Text style={s.bold}>
                  {formatRange(job.startDate, job.endDate)}
                </Text>
              </View>
              <Text style={s.italic}>
                {job.company} | {job.location}
              </Text>
              {job.projects.map((project) => (
                <View key={project.name}>
                  {/* Name + first bullet can't be split, so a project title never strands at a page bottom. */}
                  <View wrap={false}>
                    <Text style={s.projectName}>{project.name}</Text>
                    <Bullet>{project.highlights[0]}</Bullet>
                  </View>
                  {project.highlights.slice(1).map((h) => (
                    <Bullet key={h}>{h}</Bullet>
                  ))}
                </View>
              ))}
            </View>
          ))}
        </Section>

        {projects.length > 0 && (
          <Section title="Projects">
            {projects.map((p) => (
              <View key={p.slug} style={s.job}>
                <View style={s.row} wrap={false}>
                  <Text style={s.bold}>
                    {p.title} ({typeLabel[p.type]})
                  </Text>
                  <Text style={s.bold}>{statusLabel[p.status]}</Text>
                </View>
                <Text style={s.italic}>{p.stack.join(", ")}</Text>
                <Bullet>{p.summary}</Bullet>
                {p.status !== "completed" && p.progressNote && (
                  <Bullet>{p.progressNote}</Bullet>
                )}
                {p.results.map((r) => (
                  <Bullet key={r}>{r}</Bullet>
                ))}
              </View>
            ))}
          </Section>
        )}

        <Section title="Education">
          {resume.education.map((e) => (
            <View key={e.institution} wrap={false}>
              <View style={s.row}>
                <Text style={s.bold}>
                  {e.studyType}, {e.area}
                </Text>
                <Text style={s.bold}>{formatYearMonth(e.endDate)}</Text>
              </View>
              <Text style={s.italic}>
                {e.institution} | {e.location}
              </Text>
            </View>
          ))}
        </Section>

        {resume.certificates.length > 0 && (
          <Section title="Certifications">
            {resume.certificates.map((c) => (
              <Bullet key={c.name}>
                <Text style={s.bold}>{c.name}</Text> | {c.issuer} |{" "}
                {formatYearMonth(c.date)}
              </Bullet>
            ))}
          </Section>
        )}
      </Page>
    </Document>
  );
}
