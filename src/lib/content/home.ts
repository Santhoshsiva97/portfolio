import { z } from "zod";
import raw from "@content/home.json";
import { homeSchema, type Home } from "./schemas";

const parsed = homeSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(
    `content/home.json is invalid:\n${z.prettifyError(parsed.error)}`,
  );
}

const home: Home = parsed.data;

export function getHome(): Home {
  return home;
}
