import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps<T extends ElementType> = {
  as?: T;
  /** Lift and draw an accent edge on hover — use for clickable cards. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends ElementType = "div">({
  as,
  interactive,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component: ElementType = as ?? "div";
  return (
    <Component
      className={cn(
        "group/card relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.25)]",
        className,
      )}
      {...rest}
    >
      {interactive && (
        // Accent "flow line" that draws across the top edge on hover.
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-linear-to-r from-signal to-flow transition-transform duration-700 ease-out-expo group-hover/card:scale-x-100"
        />
      )}
      {children}
    </Component>
  );
}
