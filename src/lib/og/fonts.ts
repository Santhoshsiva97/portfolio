import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Read once at module scope (the pattern the Next docs use), so image routes stay statically generated.
const dir = join(process.cwd(), "src", "assets", "fonts");
const [display, serifItalic, mono] = await Promise.all([
  readFile(join(dir, "BricolageGrotesque-ExtraBold.ttf")),
  readFile(join(dir, "InstrumentSerif-Italic.ttf")),
  readFile(join(dir, "GeistMono-Medium.ttf")),
]);

export const ogFonts = [
  {
    name: "Bricolage",
    data: display,
    weight: 800 as const,
    style: "normal" as const,
  },
  {
    name: "Instrument",
    data: serifItalic,
    weight: 400 as const,
    style: "italic" as const,
  },
  {
    name: "GeistMono",
    data: mono,
    weight: 500 as const,
    style: "normal" as const,
  },
];
