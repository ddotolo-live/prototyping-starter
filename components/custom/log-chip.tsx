import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const logChipVariants = cva(
  "inline-flex items-center justify-center gap-1 rounded px-1.5 py-1 text-[10px] font-semibold uppercase leading-[1.5] border",
  {
    variants: {
      level: {
        debug: "bg-bg-accent-primary1 text-fg-accent-primary1 border-separator-accent",
        dev: "bg-bg-accent-secondary1 text-fg-accent-secondary border-separator-accent-secondary",
        info: "bg-bg-success1 text-fg-success border-separator-success",
        warning: "bg-bg-moderate1 text-fg-moderate border-separator-moderate",
        error: "bg-bg-serious1 text-fgSerious1 border-separator-serious1",
        critical: "bg-bg-serious2 text-fgSerious1 border-separator-serious1",
      },
    },
    defaultVariants: {
      level: "info",
    },
  }
);

export interface LogChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logChipVariants> {
  level?: "debug" | "dev" | "info" | "warning" | "error" | "critical";
}

function LogChip({ className, level, ...props }: LogChipProps) {
  const levelText = level?.toUpperCase() || "INFO";
  
  return (
    <div
      className={cn(logChipVariants({ level }), className)}
      {...props}
    >
      {levelText}
    </div>
  );
}

export { LogChip, logChipVariants };

