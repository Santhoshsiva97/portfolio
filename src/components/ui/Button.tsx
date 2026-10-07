import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[transform,background-color,color,box-shadow,border-color] duration-300 ease-out-expo active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Signal button: ink text on vermilion, with a hard offset shadow that "presses" on hover.
  primary:
    "bg-signal text-on-accent shadow-[3px_3px_0_0_var(--ink)] hover:-translate-x-px hover:-translate-y-px hover:shadow-[5px_5px_0_0_var(--ink)]",
  secondary: "bg-ink text-paper hover:bg-ink/85",
  outline:
    "border border-ink/20 bg-surface/60 text-ink backdrop-blur hover:border-ink hover:bg-surface",
  ghost: "text-ink hover:bg-ink/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconLeft?: IconName;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<
    ComponentPropsWithoutRef<"a">,
    "href" | "className" | "children"
  >;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<
    ComponentPropsWithoutRef<"button">,
    "className" | "children"
  >;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/** Internal links use next/link; mailto:, http(s) and file links use a plain <a>. */
function isPlainAnchor(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href) || /\.(pdf|zip)$/.test(href);
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconLeft,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {icon && (
        <Icon
          name={icon}
          size={18}
          className="transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px"
        />
      )}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest;
    if (isPlainAnchor(href)) {
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className={classes}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = rest;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
