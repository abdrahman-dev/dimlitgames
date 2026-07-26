import { forwardRef } from "react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const base =
  "inline-flex items-center gap-2 px-5 py-2.5 rounded-none border-2 font-body text-sm font-medium tracking-wider uppercase transition-all duration-200";

const variants = {
  primary:
    "bg-accent text-[var(--button-text)] border-accent hover:brightness-110",
  secondary:
    "border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] bg-transparent",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ children, href, variant = "primary", className, onClick, ariaLabel }, ref) => {
    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn(base, variants[variant], className)}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        aria-label={ariaLabel}
        className={cn(base, variants[variant], className)}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
