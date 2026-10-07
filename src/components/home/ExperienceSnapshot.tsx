import { Button } from "@/components/ui/Button";
import { formatRange, formatYearMonth, type Resume } from "@/lib/content";
import { resumePdfHref } from "@/lib/nav";

/** Recruiter-facing summary: a short timeline of roles with the headline result of each. */
export function ExperienceSnapshot({ resume }: { resume: Resume }) {
  const education = resume.education[0];

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
      <div className="reveal">
        <p className="text-lg text-muted">{resume.basics.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/resume" variant="secondary" icon="arrow-right">
            Full resume
          </Button>
          <Button href={resumePdfHref} variant="outline" iconLeft="download">
            Download PDF
          </Button>
        </div>
      </div>

      <ol className="relative space-y-6 border-l-2 border-line pl-8">
        {resume.work.map((job, i) => (
          <li
            key={`${job.company}-${job.startDate}`}
            className="reveal relative"
          >
            <span
              aria-hidden="true"
              className={
                i === 0
                  ? "absolute top-1.5 -left-[2.6rem] size-4 rounded-full border-4 border-paper bg-signal ring-2 ring-signal"
                  : "absolute top-1.5 -left-[2.6rem] size-4 rounded-full border-4 border-paper bg-line ring-2 ring-line"
              }
            />
            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              {formatRange(job.startDate, job.endDate)} · {job.location}
            </p>
            <h3 className="mt-2 text-2xl font-bold">
              {job.position}{" "}
              <span className="text-muted">at {job.company}</span>
            </h3>
            {job.projects.map((project) => (
              <div key={project.name} className="mt-3">
                <p className="font-medium">{project.name}</p>
                <p className="mt-1 text-muted">{project.highlights[0]}</p>
              </div>
            ))}
          </li>
        ))}
        {education && (
          <li className="reveal relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[2.6rem] size-4 rounded-full border-4 border-paper bg-flow ring-2 ring-flow"
            />
            <p className="font-mono text-xs tracking-wider text-muted uppercase">
              {formatYearMonth(education.endDate)} · {education.location}
            </p>
            <h3 className="mt-2 text-xl font-bold">
              {education.studyType}, {education.area}
            </h3>
            <p className="mt-1 text-muted">{education.institution}</p>
          </li>
        )}
      </ol>
    </div>
  );
}
