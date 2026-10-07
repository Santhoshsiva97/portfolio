import { z } from "zod";

// Shared by the server action (authoritative validation) and the form (field limits / required attributes).
export const CONTACT_LIMITS = {
  name: 80,
  email: 120,
  message: 4000,
  messageMin: 20,
} as const;

/** Spam guard: real people take more than a few seconds to fill the form. */
export const MIN_FILL_MS = 3000;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please tell me your name.")
    .max(CONTACT_LIMITS.name),
  email: z.email("That email doesn't look right.").max(CONTACT_LIMITS.email),
  projectType: z
    .string()
    .trim()
    .min(1, "Pick what you need help with.")
    .max(80),
  budget: z.string().trim().max(80).optional().default(""),
  message: z
    .string()
    .trim()
    .min(
      CONTACT_LIMITS.messageMin,
      `A couple of sentences helps: at least ${CONTACT_LIMITS.messageMin} characters.`,
    )
    .max(CONTACT_LIMITS.message),
});

export type ContactInput = z.output<typeof contactSchema>;
export type ContactField = keyof ContactInput;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<ContactField, string>>;
      /** Echo the submitted values so the form isn't wiped on error. */
      values?: Partial<Record<ContactField, string>>;
    };
