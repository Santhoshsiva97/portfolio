import "server-only";

import type { ContactInput } from "./schema";

export class DeliveryNotConfiguredError extends Error {}

/**
 * Sends a contact message with whichever provider is configured (checked in this order):
 * - RESEND_API_KEY (+ CONTACT_TO_EMAIL, optional CONTACT_FROM_EMAIL): email straight to your inbox
 * - FORMSPREE_FORM_ID: forwarded by Formspree
 * - neither: logged to the server console in development; an error in production
 */
export async function deliverContactMessage(
  input: ContactInput,
  fallbackTo: string,
): Promise<void> {
  const subject = `Portfolio enquiry: ${input.projectType} — ${input.name}`;
  const text = [
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Project type: ${input.projectType}`,
    `Budget: ${input.budget || "—"}`,
    "",
    input.message,
  ].join("\n");

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // onboarding@resend.dev works before your domain is verified (it can only send to your own address).
        from:
          process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || fallbackTo],
        reply_to: input.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok)
      throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    return;
  }

  if (process.env.FORMSPREE_FORM_ID) {
    const res = await fetch(
      `https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input,
          _subject: subject,
          _replyto: input.email,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
    if (!res.ok)
      throw new Error(`Formspree responded ${res.status}: ${await res.text()}`);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    console.info(
      `\n[contact] No email provider configured; message logged instead:\n${subject}\n${text}\n`,
    );
    return;
  }

  throw new DeliveryNotConfiguredError(
    "No contact delivery provider is configured.",
  );
}
