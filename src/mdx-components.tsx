import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Callout } from "@/components/mdx/Callout";
import { Screenshot } from "@/components/mdx/Screenshot";
import { Stack } from "@/components/mdx/Stack";

// Typography for case-study bodies (content/projects/*.mdx), plus custom components usable without imports.
const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-14 mb-4 scroll-mt-24 text-3xl font-bold first:mt-0 sm:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3 className="mt-10 mb-3 text-xl font-bold sm:text-2xl" {...props} />
  ),
  p: (props) => (
    <p className="my-4 text-lg leading-relaxed text-ink/85" {...props} />
  ),
  ul: (props) => (
    <ul
      className="my-5 space-y-2 pl-0 text-lg [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:top-[0.7em] [&>li]:before:left-1 [&>li]:before:size-2 [&>li]:before:rounded-full [&>li]:before:border-2 [&>li]:before:border-signal"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-lg marker:font-mono marker:text-muted"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed text-ink/85" {...props} />,
  a: ({ href = "", ...props }) => {
    const className =
      "font-medium text-flow underline decoration-flow/30 underline-offset-4 transition-colors hover:decoration-flow";
    return href.startsWith("/") ? (
      <Link href={href} className={className} {...props} />
    ) : (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  },
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-4 border-signal pl-5 font-serif text-2xl text-ink italic"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded-md border border-line bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
  Callout,
  Screenshot,
  Stack,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
