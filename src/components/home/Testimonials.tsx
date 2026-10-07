import { Card } from "@/components/ui/Card";
import type { Resume } from "@/lib/content";

export function Testimonials({ items }: { items: Resume["testimonials"] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((t) => (
        <Card
          key={`${t.name}-${t.quote.slice(0, 20)}`}
          as="figure"
          className="reveal flex flex-col"
        >
          <span
            aria-hidden="true"
            className="font-serif text-7xl leading-none text-signal-ink"
          >
            &ldquo;
          </span>
          <blockquote className="-mt-4 font-serif text-2xl leading-snug italic sm:text-3xl">
            {t.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
            <span className="flex size-10 items-center justify-center rounded-full bg-ink font-display font-bold text-paper">
              {t.name.charAt(0)}
            </span>
            <span>
              <span className="block font-medium">{t.name}</span>
              <span className="block text-sm text-muted">{t.role}</span>
            </span>
          </figcaption>
        </Card>
      ))}
    </div>
  );
}
