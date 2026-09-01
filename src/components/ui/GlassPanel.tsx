import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
}

export default function GlassPanel({ strong, className, children, ...rest }: GlassPanelProps) {
  return (
    <div className={cn(strong ? "glass-panel-strong" : "glass-panel", "rounded-sm", className)} {...rest}>
      {children}
    </div>
  );
}
