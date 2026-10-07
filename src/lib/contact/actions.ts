"use server";

import { getResume } from "@/lib/content";
import { deliverContactMessage } from "./deliver";
import {
  MIN_FILL_MS,
  contactSchema,
  type ContactField,
  type ContactState,
} from "./schema";

const FIELDS: ContactField[] = [
  "name",
  "email",
  "projectType",
  "budget",
  "message",
];

export async function sendContactMessage(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values = Object.fromEntries(
    FIELDS.map((f) => [f, String(formData.get(f) ?? "")]),
  ) as Record<ContactField, string>;
  const email = getResume().basics.email;

  // Bots fill every field (including the hidden one) and submit instantly. Pretend it worked so they don't retry.
  // started_at is stamped by the browser on mount; it's empty without JavaScript, so only the honeypot applies then.
  const honeypot = String(formData.get("company_website") ?? "");
  const startedAt = Number(formData.get("started_at") || NaN);
  const tooFast =
    Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (honeypot || tooFast) {
    return { status: "success", name: values.name.trim() || "there" };
  }

  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<ContactField, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as ContactField;
      fieldErrors[field] ??= issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors,
      values,
    };
  }

  try {
    await deliverContactMessage(parsed.data, email);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return {
      status: "error",
      message: `Sorry, the message couldn't be sent. Please email me directly at ${email}.`,
      values,
    };
  }

  return { status: "success", name: parsed.data.name };
}
