"use client";

import { useSearchParams } from "next/navigation";
import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Accent } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { sendContactMessage } from "@/lib/contact/actions";
import {
  CONTACT_LIMITS,
  type ContactField,
  type ContactState,
} from "@/lib/contact/schema";

type ProjectTypeOption = { value: string; label: string; slug?: string };

type ContactFormProps = {
  projectTypes: ProjectTypeOption[];
  budgets: string[];
  email: string;
};

/** Preselects the project type from /contact?service=<slug>. Must sit inside <Suspense> (useSearchParams). */
export function ContactFormWithParams(props: ContactFormProps) {
  const service = useSearchParams().get("service");
  const preselected = props.projectTypes.find(
    (t) => t.slug && t.slug === service,
  )?.value;
  return <ContactForm {...props} defaultProjectType={preselected} />;
}

const initialState: ContactState = { status: "idle" };

export function ContactForm({
  projectTypes,
  budgets,
  email,
  defaultProjectType,
}: ContactFormProps & { defaultProjectType?: string }) {
  // Remounting the form (new key) is how "Send another message" starts fresh.
  const [formKey, setFormKey] = useState(0);
  return (
    <ContactFormInner
      key={formKey}
      projectTypes={projectTypes}
      budgets={budgets}
      email={email}
      defaultProjectType={defaultProjectType}
      onReset={() => setFormKey((k) => k + 1)}
    />
  );
}

function ContactFormInner({
  projectTypes,
  budgets,
  email,
  defaultProjectType,
  onReset,
}: ContactFormProps & { defaultProjectType?: string; onReset: () => void }) {
  const [state, formAction, pending] = useActionState(
    sendContactMessage,
    initialState,
  );
  const startedAt = useRef<HTMLInputElement>(null);
  const [messageLength, setMessageLength] = useState(0);
  const id = useId();

  // Stamp the time the form became usable (spam check). Done after mount so a prerendered value is never sent.
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="animate-rise rounded-3xl border border-line bg-surface p-8 sm:p-10"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-signal text-on-accent">
          <Icon name="spark" size={22} />
        </span>
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
          Thanks, {state.name}! <Accent>Message sent.</Accent>
        </h2>
        <p className="mt-3 text-lg text-muted">
          I&apos;ll read it carefully and reply by email. If it&apos;s urgent,
          you can also write to me directly at{" "}
          <a
            href={`mailto:${email}`}
            className="text-flow underline underline-offset-4"
          >
            {email}
          </a>
          .
        </p>
        <Button variant="outline" className="mt-8" onClick={onReset}>
          Send another message
        </Button>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const values = state.status === "error" ? (state.values ?? {}) : {};
  const fieldId = (f: ContactField) => `${id}-${f}`;
  const errorId = (f: ContactField) => `${id}-${f}-error`;
  const describedBy = (f: ContactField) => (errors[f] ? errorId(f) : undefined);
  const selectedType = values.projectType || defaultProjectType || "";

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-8 rounded-3xl border border-line bg-surface p-6 sm:p-10"
    >
      {/* Honeypot: hidden from people and assistive tech, irresistible to bots. */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Company website
          <input
            type="text"
            name="company_website"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </label>
      </div>
      <input ref={startedAt} type="hidden" name="started_at" defaultValue="" />

      {state.status === "error" && (
        <p
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-signal/40 bg-signal-soft/60 px-4 py-3 text-sm"
        >
          <Icon
            name="spark"
            size={16}
            className="mt-0.5 shrink-0 text-signal"
          />
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Your name"
          htmlFor={fieldId("name")}
          error={errors.name}
          errorId={errorId("name")}
        >
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            defaultValue={values.name}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>
        <Field
          label="Email"
          htmlFor={fieldId("email")}
          error={errors.email}
          errorId={errorId("email")}
        >
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            defaultValue={values.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>
      </div>

      <ChipGroup
        legend="What do you need?"
        name="projectType"
        options={projectTypes.map((t) => ({ value: t.value, label: t.label }))}
        defaultValue={selectedType}
        error={errors.projectType}
        errorId={errorId("projectType")}
        required
      />

      <ChipGroup
        legend="Budget"
        hint="Optional. A rough range helps me suggest the right approach."
        name="budget"
        options={budgets.map((b) => ({ value: b, label: b }))}
        defaultValue={values.budget ?? ""}
      />

      <Field
        label="Tell me about your project"
        htmlFor={fieldId("message")}
        error={errors.message}
        errorId={errorId("message")}
        aside={
          <span
            className={cn(
              "font-mono text-xs",
              messageLength > CONTACT_LIMITS.message
                ? "text-signal"
                : "text-muted",
            )}
          >
            {messageLength}/{CONTACT_LIMITS.message}
          </span>
        }
      >
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={6}
          minLength={CONTACT_LIMITS.messageMin}
          maxLength={CONTACT_LIMITS.message}
          defaultValue={values.message}
          onChange={(e) => setMessageLength(e.target.value.length)}
          placeholder="What are you building, who is it for, and is there a deadline?"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className={cn(
            inputClass(Boolean(errors.message)),
            "min-h-40 resize-y py-3",
          )}
        />
      </Field>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          Your details are only used to reply to you.
        </p>
        <Button
          type="submit"
          size="lg"
          icon={pending ? undefined : "arrow-right"}
          disabled={pending}
        >
          {pending ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return cn(
    "block w-full rounded-2xl border bg-paper px-4 py-3 text-base text-ink transition-colors placeholder:text-muted/70 focus:outline-none focus-visible:outline-none",
    "focus:border-flow focus:ring-2 focus:ring-flow/20",
    invalid ? "border-signal" : "border-line hover:border-ink/30",
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  aside,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-4">
        <label htmlFor={htmlFor} className="text-sm font-medium">
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={errorId} className="mt-2 text-sm text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

function ChipGroup({
  legend,
  hint,
  name,
  options,
  defaultValue,
  error,
  errorId,
  required,
}: {
  legend: string;
  hint?: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
  error?: string;
  errorId?: string;
  required?: boolean;
}) {
  return (
    <fieldset aria-describedby={error ? errorId : undefined}>
      <legend className="mb-1 text-sm font-medium">{legend}</legend>
      {hint && <p className="mb-3 text-sm text-muted">{hint}</p>}
      <div className={cn("flex flex-wrap gap-2", !hint && "mt-2")}>
        {options.map((o) => (
          <label
            key={o.value}
            className="cursor-pointer rounded-full border border-line px-4 py-2 text-sm transition-colors select-none hover:border-ink/40 has-checked:border-ink has-checked:bg-ink has-checked:text-paper has-focus-visible:ring-2 has-focus-visible:ring-flow has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-surface"
          >
            <input
              type="radio"
              name={name}
              value={o.value}
              defaultChecked={o.value === defaultValue}
              required={required}
              className="sr-only"
            />
            {o.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-signal">
          {error}
        </p>
      )}
    </fieldset>
  );
}
