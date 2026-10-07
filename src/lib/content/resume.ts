import { z } from "zod";
import raw from "@content/resume.json";
import { resumeSchema, type Resume } from "./schemas";

// Validated once at module load (build time), so a typo in resume.json fails the build with a readable message.
const parsed = resumeSchema.safeParse(raw);
if (!parsed.success) {
  throw new Error(
    `content/resume.json is invalid:\n${z.prettifyError(parsed.error)}`,
  );
}

const resume: Resume = parsed.data;

export function getResume(): Resume {
  return resume;
}
