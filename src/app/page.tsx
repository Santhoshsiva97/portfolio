import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Accent, Section } from "@/components/ui/Section";
import { FlowCanvas } from "@/components/visual/FlowCanvas";
import { contactHref, resumePdfHref } from "@/lib/site";

// Step 2 preview of the design system. Step 4 rebuilds this page from content/ (featured projects, testimonials…).
const stats = [
  { value: "7+", label: "Years shipping software" },
  { value: "50+", label: "Automation apps built" },
  { value: "60%", label: "Less manual work for clients" },
];

const offerings = [
  {
    tag: "Web apps",
    title: "Custom web applications",
    body: "Dashboards, portals and SaaS products built with React, Next.js, Node.js and PostgreSQL. Fast, secure, and easy to grow.",
  },
  {
    tag: "E-commerce",
    title: "Shopify stores that sell",
    body: "Custom themes with a distinctive look, mobile-first product pages and smooth checkout, ready for WhatsApp and Instagram traffic.",
  },
  {
    tag: "Automation",
    title: "Workflows & integrations",
    body: "Connect your tools with APIs, webhooks and background jobs so repetitive work runs itself. I've built 50+ of these.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0"
        />
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 size-[520px] rounded-full bg-signal/15 blur-3xl dark:bg-signal/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 -left-40 size-[480px] rounded-full bg-flow/10 blur-3xl"
        />

        <Container className="relative grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28">
          <div>
            <div className="animate-rise">
              <Badge tone="flow" dot="live">
                Available for new projects
              </Badge>
            </div>
            <h1 className="stagger-1 mt-6 animate-rise text-5xl leading-[0.95] font-extrabold sm:text-6xl xl:text-7xl">
              I build web apps, stores &amp; automations that{" "}
              <Accent>flow.</Accent>
            </h1>
            <p className="stagger-2 mt-6 max-w-xl animate-rise text-lg text-muted sm:text-xl">
              Hi, I&apos;m Santhosh, a full stack engineer with 7+ years
              shipping React, Node.js and TypeScript products. I help businesses
              turn messy processes into fast, reliable software.
            </p>
            <div className="stagger-3 mt-9 flex animate-rise flex-wrap gap-3">
              <Button href={contactHref} size="lg" icon="arrow-right">
                Hire me
              </Button>
              <Button
                href={resumePdfHref}
                size="lg"
                variant="outline"
                iconLeft="download"
              >
                Download resume
              </Button>
            </div>

            <dl className="stagger-4 mt-12 grid max-w-lg animate-rise grid-cols-3 gap-4 border-t border-line pt-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold sm:text-4xl">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <FlowCanvas className="stagger-2 animate-rise lg:rotate-1" />
        </Container>
      </section>

      {/* What I build */}
      <Section
        id="services"
        index="01"
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
          {offerings.map((o, i) => (
            <Card key={o.tag} interactive>
              <div className="flex items-center justify-between">
                <Badge tone={i === 1 ? "signal" : "outline"}>{o.tag}</Badge>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-10 text-2xl font-bold">{o.title}</h3>
              <p className="mt-3 text-muted">{o.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
