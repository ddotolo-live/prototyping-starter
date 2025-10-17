"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Checkmark2SmallIcon } from "../../icons/react";

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  labelOn?: string;
  labelOff?: string;
  showLabel?: boolean;
}

export default function Toggle({
  className,
  labelOn = "on ",
  labelOff = "off",
  showLabel = true,
  checked,
  ...props
}: ToggleProps) {
  return (
    <div className="flex items-center gap-2">
      <SwitchPrimitive.Root
        className={cn(
          "inline-flex items-center w-[32px] h-[16px] rounded border border-separator1 cursor-pointer",
          "data-[state=checked]:bg-fgAccent2 data-[state=unchecked]:bg-bg3",
          "data-[state=checked]:border-fgAccent1 data-[state=unchecked]:border-separator2",
          "transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "hover:opacity-90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fgAccent1 focus-visible:ring-offset-2 focus-visible:ring-offset-bg2",
          className
        )}
        checked={checked}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "flex items-center justify-center size-4 rounded-[3px] shrink-0 border",
            "data-[state=checked]:bg-bg0 data-[state=unchecked]:bg-bg0",
            "data-[state=checked]:border-fgAccent1 data-[state=unchecked]:border-fg4",
            "data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0",
            "transition-transform duration-200 ease-out"
          )}
        >
          <Checkmark2SmallIcon data-state={checked ? "checked" : "unchecked"} className="w-3 h-3 data-[state=checked]:text-fgAccent1 data-[state=unchecked]:text-bg0" />
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {showLabel && (
        <span
          className={cn(
            "text-xs font-normal text-fg2 select-none min-w-[24px]",
            props.disabled && "opacity-50"
          )}
        >
          {checked ? labelOn : labelOff}
        </span>
      )}
    </div>
  );
}

