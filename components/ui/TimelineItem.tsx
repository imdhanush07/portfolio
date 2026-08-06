import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  description: string;
  isLast?: boolean;
  icon?: ReactNode;
}

export function TimelineItem({
  title,
  subtitle,
  description,
  isLast = false,
  icon,
}: TimelineItemProps) {
  return (
    <div className="relative flex gap-5 pb-10 last:pb-0">
      {!isLast && (
        <span
          aria-hidden
          className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-primary/60 to-border-subtle"
        />
      )}
      <div
        className={cn(
          "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          "border border-accent-primary/50 bg-bg-elevated text-accent-secondary"
        )}
      >
        {icon}
      </div>
      <div className="pt-0.5">
        <h3 className="font-medium text-text-primary">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 font-mono text-xs text-accent-secondary">{subtitle}</p>
        )}
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
