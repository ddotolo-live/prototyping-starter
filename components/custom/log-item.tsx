"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { LogChip } from "./log-chip";

export type LogLevel = "debug" | "dev" | "info" | "warning" | "error" | "critical";

export interface LogItemProps extends React.HTMLAttributes<HTMLDivElement> {
  timestamp: string;
  level: LogLevel;
  title: string;
  message?: string;
}

const LogItem = React.forwardRef<HTMLDivElement, LogItemProps>(
  ({ className, timestamp, level, title, message, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-4 px-4 py-2 border-b border-separator1 transition-colors",
          isHovered && "bg-bg2",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Timestamp */}
        <div className="flex items-center shrink-0">
          <span className="font-mono text-xs text-fg3 leading-[1.5]">
            {timestamp}
          </span>
        </div>

        {/* Status + Title + Message */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Level Container */}
          <div className="flex items-center shrink-0 w-16">
            <LogChip level={level} />
          </div>

          {/* Title */}
          <div className="flex flex-col justify-center max-w-[300px] shrink-0">
            <p className="text-sm text-fg1 leading-[1.5] font-normal">
              {title}
            </p>
          </div>

          {/* Message (optional) */}
          {message && (
            <div className="flex flex-col justify-center flex-1 min-w-0">
              <p className="text-xs text-fg3 leading-[1.5] font-normal truncate">
                {message}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

LogItem.displayName = "LogItem";

export { LogItem };

