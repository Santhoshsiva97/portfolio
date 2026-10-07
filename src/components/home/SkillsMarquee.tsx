import { Icon } from "@/components/ui/Icon";

/** Endless strip of technologies. The list renders twice so the loop is seamless; the copy is hidden from screen readers. */
export function SkillsMarquee({ skills }: { skills: string[] }) {
  const items = (copy: boolean) => (
    <ul
      aria-hidden={copy || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0 sm:gap-12 sm:pr-12"
    >
      {skills.map((skill) => (
        <li
          key={skill}
          className="flex items-center gap-8 font-display text-2xl font-bold tracking-tight whitespace-nowrap text-ink/80 sm:gap-12 sm:text-3xl"
        >
          {skill}
          <Icon name="spark" size={18} className="text-signal" />
        </li>
      ))}
    </ul>
  );

  return (
    <section
      aria-label="Technologies I work with"
      className="overflow-hidden border-y border-line bg-surface py-6 sm:py-8"
    >
      <div className="animate-marquee flex w-max motion-reduce:w-full motion-reduce:animate-none">
        {items(false)}
        <div className="flex motion-reduce:hidden">{items(true)}</div>
      </div>
    </section>
  );
}
