import { z } from "zod";
import raw from "@content/now.json";
import { nowSchema, type Now } from "./schemas";

const parsed = nowSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(
    `content/now.json is invalid:\n${z.prettifyError(parsed.error)}`,
  );
}

const now: Now = parsed.data;

export function getNow(): Now {
  return now;
}
