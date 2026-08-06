import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({ className, hoverable = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border-subtle bg-bg-elevated p-6",
        "transition-colors duration-200",
        hoverable && "hover:border-accent-primary/40 hover:bg-bg-elevated-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
