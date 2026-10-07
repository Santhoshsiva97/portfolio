import { ExperienceSnapshot } from "@/components/home/ExperienceSnapshot";
import { Hero } from "@/components/home/Hero";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { SkillsMarquee } from "@/components/home/SkillsMarquee";
import { Testimonials } from "@/components/home/Testimonials";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accent, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { getHome, getProjects, getResume } from "@/lib/content";
import { contactHref } from "@/lib/nav";

export default function Home() {
  const home = getHome();
  const resume = getResume();
  const featured = getProjects({ featured: true }).slice(0, 3);
  const testimonials = resume.testimonials;

  // Section numbers follow what's actually shown (testimonials only appear once there are some).
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      <Hero home={home} resume={resume} />
      <SkillsMarquee skills={home.techStrip} />

      {featured.length > 0 && (
        <Section
          id="work"
          index={next()}
          eyebrow="Selected work"
          title={
            <>
              Things I&apos;ve built <Accent>lately</Accent>
            </>
          }
          intro="Client stores, full products and the automation work behind them. Each case study covers the problem, my approach and the result."
        >
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                tone={i}
                // An odd count gets one wide card on top so the grid stays balanced.
                large={featured.length % 2 === 1 && i === 0}
                className={cn(
                  "reveal",
                  featured.length % 2 === 1 && i === 0 && "md:col-span-2",
                )}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button href="/projects" variant="outline" icon="arrow-right">
              See all work
            </Button>
          </div>
        </Section>
      )}

      <Section
        id="services"
        index={next()}
        eyebrow="What I build"
        title={
          <>
            Software that saves you <Accent>time</Accent> and earns you
            customers.
          </>
        }
        intro="From the first sketch to launch day and beyond, you work directly with the engineer building your product."
        className="border-t border-line"
      >
        <div className="grid gap-5 md:grid-cols-3">
          {home.services.map((s, i) => (
            <Card key={s.tag} interactive className="reveal">
              <div className="flex items-center justify-between">
                <Badge tone={i === 1 ? "signal" : "outline"}>{s.tag}</Badge>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 text-muted">{s.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Button href="/services" variant="ghost" icon="arrow-right">
            Services &amp; pricing
          </Button>
        </div>
      </Section>

      <Section
        id="process"
        index={next()}
        eyebrow="How I work"
        title={
          <>
            A simple process that keeps you <Accent>in the loop.</Accent>
          </>
        }
        className="bg-canvas border-t border-line bg-surface"
      >
        <ProcessFlow steps={home.process} />
        <div className="mt-14 flex flex-wrap items-center gap-4">
          <Button href={contactHref} icon="arrow-right">
            Tell me about your project
          </Button>
          <p className="text-sm text-muted">
            No commitment. Just a conversation about what you need.
          </p>
        </div>
      </Section>

      <Section
        id="experience"
        index={next()}
        eyebrow="Experience"
        title={
          <>
            7+ years of shipping <Accent>real products.</Accent>
          </>
        }
        className="border-t border-line"
      >
        <ExperienceSnapshot resume={resume} />
      </Section>

      {testimonials.length > 0 && (
        <Section
          id="testimonials"
          index={next()}
          eyebrow="Kind words"
          title={
            <>
              What clients <Accent>say</Accent>
            </>
          }
          className="border-t border-line"
        >
          <Testimonials items={testimonials} />
        </Section>
      )}
    </>
  );
}
