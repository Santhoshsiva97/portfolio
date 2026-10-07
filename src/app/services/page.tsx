import type { Metadata } from "next";
import { ProcessFlow } from "@/components/home/ProcessFlow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Accent, Eyebrow, Section } from "@/components/ui/Section";
import { getHome, getProjects, getServices } from "@/lib/content";
import { contactHref } from "@/lib/nav";

export const metadata: Metadata = {
  title: "Services — Santhosh Sivakumar",
  description:
    "Custom web applications, Shopify stores and workflow automation. What's included, how we work together, and how to get started.",
};

export default function ServicesPage() {
  const { intro, services, faq } = getServices();
  const { process } = getHome();
  const caseStudies = getProjects({
    status: ["in-progress", "completed"],
  }).length;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0"
        />
        <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-20">
          <Eyebrow>Services</Eyebrow>
          <h1 className="mt-5 max-w-4xl animate-rise text-5xl leading-[0.95] font-extrabold sm:text-7xl">
            How I can <Accent>help</Accent>
          </h1>
          <p className="stagger-1 mt-6 max-w-2xl animate-rise text-lg text-muted sm:text-xl">
            {intro}
          </p>
          <div className="stagger-2 mt-8 flex animate-rise flex-wrap gap-3">
            <Button href={contactHref} icon="arrow-right">
              Start a project
            </Button>
            <Button href="/projects" variant="outline">
              See {caseStudies} case {caseStudies === 1 ? "study" : "studies"}
            </Button>
          </div>
        </Container>
      </section>

      <Section
        index="01"
        eyebrow="What I offer"
        title="Three ways I usually help"
      >
        <div className="space-y-6">
          {services.map((service, i) => (
            <article
              key={service.slug}
              id={service.slug}
              className="reveal grid scroll-mt-28 gap-8 rounded-3xl border border-line bg-surface p-6 sm:p-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14"
            >
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Badge tone={i === 1 ? "signal" : "outline"}>
                    {service.tag}
                  </Badge>
                  <span className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-8 text-3xl font-bold sm:text-4xl">
                  {service.title}
                </h2>
                <p className="mt-3 text-lg text-muted">{service.summary}</p>
                <p className="mt-6 border-l-2 border-flow pl-4 text-sm">
                  <span className="font-mono text-xs tracking-wider text-muted uppercase">
                    Ideal for ·{" "}
                  </span>
                  {service.idealFor}
                </p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-8">
                  <p>
                    <span className="block font-mono text-xs tracking-wider text-muted uppercase">
                      {service.startingFrom ? "Starting from" : "Pricing"}
                    </span>
                    <span className="font-display text-3xl font-bold">
                      {service.startingFrom ?? "Custom quote"}
                    </span>
                  </p>
                  <Button
                    href={`${contactHref}?service=${service.slug}`}
                    icon="arrow-right"
                  >
                    Discuss this
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl bg-paper p-6 sm:p-8">
                <h3 className="font-mono text-xs font-medium tracking-[0.18em] text-muted uppercase">
                  What&apos;s included
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-signal text-on-accent">
                        <svg
                          viewBox="0 0 12 12"
                          className="size-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 6.2 5 8.5l4.5-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        index="02"
        eyebrow="Process"
        title={
          <>
            From first call to <Accent>launch day</Accent>
          </>
        }
        className="bg-canvas border-t border-line bg-surface"
      >
        <ProcessFlow steps={process} />
      </Section>

      {faq.length > 0 && (
        <Section
          index="03"
          eyebrow="FAQ"
          title="Questions clients ask"
          className="border-t border-line"
        >
          <div className="max-w-3xl divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.question} className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
                    <Icon name="close" size={14} className="rotate-45" />
                  </span>
                </summary>
                <p className="pb-5 text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      <Container className="pb-20">
        <div className="flex flex-col items-start gap-5 rounded-3xl border border-line bg-signal-soft/50 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Not sure which fits?
            </h2>
            <p className="mt-2 text-muted">
              Describe the problem and I&apos;ll suggest the simplest way to
              solve it.
            </p>
          </div>
          <Button href={contactHref} icon="arrow-right">
            Ask me
          </Button>
        </div>
      </Container>
    </>
  );
}
