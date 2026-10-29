import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");

  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none";

  const variants = {
    primary:
      "bg-accent-primary text-white hover:shadow-[0_0_24px_-4px_var(--accent-primary)] hover:-translate-y-0.5",
    secondary:
      "border border-border-subtle text-text-primary hover:border-accent-secondary/50 hover:-translate-y-0.5",
  };

  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className={cn(base, variants[variant], className)}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {content}
    </Link>
  );
}
