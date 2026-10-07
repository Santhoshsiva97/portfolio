import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Accent, Eyebrow, Section } from "@/components/ui/Section";

// Internal reference page for the "Flowline" design system. Not linked from the nav.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colors = [
  { name: "paper", note: "Page background" },
  { name: "surface", note: "Cards, panels" },
  { name: "surface-2", note: "Subtle fills" },
  { name: "ink", note: "Text, dark band" },
  { name: "muted", note: "Secondary text" },
  { name: "line", note: "Borders" },
  { name: "signal", note: "Primary accent / CTA" },
  { name: "signal-soft", note: "Accent tint" },
  { name: "flow", note: "Links, diagrams, focus" },
  { name: "flow-soft", note: "Flow tint" },
];

export default function Styleguide() {
  return (
    <>
      <Section
        index="00"
        eyebrow="Design system"
        title={
          <>
            Flowline <Accent>styleguide</Accent>
          </>
        }
      >
        <h3 className="mb-4 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Colors
        </h3>
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {colors.map((c) => (
            <li key={c.name}>
              <div
                className="h-20 rounded-2xl border border-line"
                style={{ background: `var(--${c.name})` }}
              />
              <p className="mt-2 font-mono text-sm">{c.name}</p>
              <p className="text-xs text-muted">{c.note}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="pt-0">
        <h3 className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Typography
        </h3>
        <div className="space-y-6">
          <p className="font-display text-7xl leading-none font-extrabold">
            Display / Bricolage
          </p>
          <p className="font-display text-5xl font-bold">
            Heading with an <Accent>italic accent</Accent>
          </p>
          <p className="max-w-2xl text-lg">
            Body / Geist. I help businesses turn messy processes into fast,
            reliable software that their teams and customers enjoy using.
          </p>
          <p className="font-mono text-sm text-muted">
            Mono / Geist Mono: labels, numbers, code
          </p>
          <Eyebrow index="02">Section eyebrow</Eyebrow>
        </div>
      </Section>

      <Section className="pt-0">
        <h3 className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Buttons &amp; badges
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button icon="arrow-right">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline" iconLeft="download">
            Outline
          </Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg" icon="arrow-up-right">
            Large
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge>Neutral</Badge>
          <Badge tone="signal">Signal</Badge>
          <Badge tone="flow" dot="live">
            Available
          </Badge>
          <Badge tone="outline" dot="static">
            In progress
          </Badge>
        </div>
      </Section>

      <Section className="pt-0">
        <h3 className="mb-6 font-mono text-xs tracking-[0.18em] text-muted uppercase">
          Cards
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <h4 className="text-2xl font-bold">Static card</h4>
            <p className="mt-2 text-muted">
              For content blocks that aren&apos;t clickable.
            </p>
          </Card>
          <Card interactive>
            <h4 className="text-2xl font-bold">Interactive card</h4>
            <p className="mt-2 text-muted">
              Lifts on hover and draws a signal→flow line across the top edge.
            </p>
          </Card>
        </div>
      </Section>
    </>
  );
}
