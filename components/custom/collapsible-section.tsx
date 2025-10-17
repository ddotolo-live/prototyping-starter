"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronBottomIcon, ChevronTopIcon } from "../../icons/react";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export default function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
  className,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("w-full", className)}
    >
      <CollapsibleTrigger className="w-full">
        <div className="flex items-center gap-4 px-4 py-3 border-b border-separator1 w-full hover:bg-bg2 transition-colors">
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <div className="flex items-center pt-0.5 h-[21px]">
              {isOpen ? (
                <ChevronTopIcon className="h-3 w-3 text-fg1" />
              ) : (
                <ChevronBottomIcon className="h-3 w-3 text-fg1" />
              )}
            </div>
            <div className="flex flex-col gap-0 items-start justify-center flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold text-fg1 leading-[1.5]">
                {title}
              </p>
              {description && (
                <p className="text-xs font-normal text-fg3 leading-[1.5]">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

