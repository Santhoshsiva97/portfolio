import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ContactForm,
  ContactFormWithParams,
} from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Accent, Eyebrow } from "@/components/ui/Section";
import { getResume, getServices } from "@/lib/content";
import { socialLinks } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Santhosh Sivakumar",
  description:
    "Tell me about your web app, Shopify store or automation project, or get in touch about a full-time role.",
};

const nextSteps = [
  {
    title: "I read your message",
    body: "and reply by email with any questions.",
  },
  {
    title: "We have a short call",
    body: "to understand your goals, users and constraints.",
  },
  {
    title: "You get a written estimate",
    body: "with scope and timeline, before any work starts.",
  },
];

export default function ContactPage() {
  const { basics } = getResume();
  const { services, contact } = getServices();

  const projectTypes = [
    ...services.map((s) => ({ value: s.title, label: s.title, slug: s.slug })),
    ...(basics.availability.fullTime
      ? [{ value: "Full-time role", label: "Full-time role", slug: "job" }]
      : []),
    { value: "Something else", label: "Something else" },
  ];
  const formProps = {
    projectTypes,
    budgets: contact.budgets,
    email: basics.email,
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="bg-canvas mask-fade absolute inset-0"
        />
        <Container className="relative pt-16 pb-14 sm:pt-24 sm:pb-16">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 max-w-4xl animate-rise text-5xl leading-[0.95] font-extrabold sm:text-7xl">
            Let&apos;s talk about <Accent>your project</Accent>
          </h1>
          <p className="stagger-1 mt-6 max-w-2xl animate-rise text-lg text-muted sm:text-xl">
            A few lines about what you need is enough to start. Hiring for a
            full-time role? Use the same form.
          </p>
        </Container>
      </section>

      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
        {/* The static HTML gets the form without a preselected type; ?service= applies after hydration. */}
        <Suspense fallback={<ContactForm {...formProps} />}>
          <ContactFormWithParams {...formProps} />
        </Suspense>

        <aside className="space-y-10">
          <section>
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Prefer email?
            </h2>
            <a
              href={`mailto:${basics.email}`}
              className="mt-3 inline-flex items-center gap-2 font-display text-xl font-bold break-all hover:text-signal sm:text-2xl"
            >
              {basics.email}
              <Icon name="arrow-up-right" size={18} className="shrink-0" />
            </a>
          </section>

          {contact.bookingUrl && (
            <section>
              <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                Or book a call
              </h2>
              <a
                href={contact.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-medium text-flow underline underline-offset-4"
              >
                Pick a time that suits you
                <Icon name="arrow-up-right" size={16} />
              </a>
            </section>
          )}

          <section>
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              What happens next
            </h2>
            <ol className="mt-5 space-y-5">
              {nextSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-ink font-mono text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="pt-1">
                    <span className="font-medium">{step.title}</span>{" "}
                    <span className="text-muted">{step.body}</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Elsewhere
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {socialLinks
                .filter((s) => s.icon !== "mail")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm hover:border-ink/40 hover:bg-ink/5"
                    >
                      <Icon name={s.icon} size={16} />
                      {s.label}
                    </a>
                  </li>
                ))}
            </ul>
            <p className="mt-4 font-mono text-xs text-muted">
              Based in {basics.location.city}, {basics.location.country}.
            </p>
          </section>
        </aside>
      </Container>
    </>
  );
}
