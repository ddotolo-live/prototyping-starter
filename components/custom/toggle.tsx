"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

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
    <div className="flex items-center gap-1">
      <SwitchPrimitive.Root
        className={cn(
          "inline-flex items-center w-[40px] h-[20px] p-[2px] rounded border border-separator1 cursor-pointer",
          "data-[state=checked]:bg-fgAccent1 data-[state=unchecked]:bg-bg3",
          "data-[state=checked]:border-[#1FD5F9] data-[state=unchecked]:border-separator1",
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
            "block size-4 rounded-xs shrink-0 border",
            "data-[state=checked]:bg-[#ffffff] data-[state=unchecked]:bg-fg1",
            "data-[state=checked]:border-[#15889F] data-[state=unchecked]:border-separator1",
            "data-[state=checked]:translate-x-[19px] data-[state=unchecked]:translate-x-0",
            "transition-transform duration-200 ease-out"
          )}
        />
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

