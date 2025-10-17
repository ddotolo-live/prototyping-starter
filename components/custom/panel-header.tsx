import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelHeaderProps {
  title: string;
  action?: ReactNode;
  showBorder?: boolean;
  background?: boolean;
}

export function PanelHeader({ title, action, showBorder, background }: PanelHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between w-full px-4 py-4",
        showBorder && "border-b border-separator1",
        background && "bg-bg1"
      )}
    >
      <h3 className="text-sm font-semibold text-fg1 select-none">{title}</h3>
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}

