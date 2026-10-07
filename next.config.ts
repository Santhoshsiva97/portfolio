import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Code that runs at request time on Vercel (the contact Server Action, unknown /projects/<slug> URLs, their
  // OG images) reads these files from disk via process.cwd(), which the tracer can't see. Bundle them explicitly.
  outputFileTracingIncludes: {
    "/*": ["./content/**/*", "./src/assets/fonts/**/*"],
    "/**/*": ["./content/**/*", "./src/assets/fonts/**/*"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Case studies in content/projects/*.mdx are compiled at build time and loaded with import().
// Plugins are given as strings so Turbopack can use them. remark-frontmatter strips the YAML header
// from the rendered body; the header itself is read and validated in src/lib/content/projects.ts.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
    // Heading ids for the case-study table of contents (projects.ts computes the same ids).
    rehypePlugins: ["rehype-slug"],
  },
});

export default withMDX(nextConfig);
