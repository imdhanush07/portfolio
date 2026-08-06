import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export function GlassPanel({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.24)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
