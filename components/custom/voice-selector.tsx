"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronDown, 
  ChevronUp, 
  PlayCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockVoices, type Voice } from "@/lib/mock-data";

interface VoiceSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

// Voice icon component (microphone)
function VoiceIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M8 1C7.46957 1 6.96086 1.21071 6.58579 1.58579C6.21071 1.96086 6 2.46957 6 3V8C6 8.53043 6.21071 9.03914 6.58579 9.41421C6.96086 9.78929 7.46957 10 8 10C8.53043 10 9.03914 9.78929 9.41421 9.41421C9.78929 9.03914 10 8.53043 10 8V3C10 2.46957 9.78929 1.96086 9.41421 1.58579C9.03914 1.21071 8.53043 1 8 1Z"
        stroke="#999999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 8C12.5 9.19347 12.0259 10.3381 11.182 11.182C10.3381 12.0259 9.19347 12.5 8 12.5C6.80653 12.5 5.66193 12.0259 4.81802 11.182C3.97411 10.3381 3.5 9.19347 3.5 8"
        stroke="#999999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 12.5V15"
        stroke="#999999"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Provider logo placeholder component
function ProviderLogo({ provider }: { provider: string }) {
  // Different colors for different providers
  const colors: Record<string, string> = {
    elevenlabs: "#1fd5f9",
    openai: "#10a37f",
    google: "#4285f4",
    azure: "#0078d4",
  };

  const color = colors[provider] || "#999999";

  return (
    <div className="w-3 h-3 rounded-full flex items-center justify-center shrink-0">
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// Voice row component
interface VoiceRowProps {
  voice: Voice;
  isSelected?: boolean;
  onClick: () => void;
}

function VoiceRow({ voice, isSelected, onClick }: VoiceRowProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start justify-between px-3 py-2 border-b border-separator1 hover:bg-bg3 transition-colors text-left",
        isSelected && "bg-bg3"
      )}
    >
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <PlayCircle className="w-6 h-6 shrink-0 text-fg3" />
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <p className="text-xs font-semibold text-fg1 leading-[1.5] whitespace-nowrap">
            {voice.name}
          </p>
          <p className="text-xs font-normal text-fg3 leading-[1.5] truncate">
            {voice.description}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0 ml-2">
        <span className="text-sm leading-[1.5]">{voice.flag}</span>
        <ProviderLogo provider={voice.provider} />
      </div>
    </button>
  );
}

export default function VoiceSelector({
  value,
  onValueChange,
  className,
}: VoiceSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selectedVoice = mockVoices.find((v) => v.id === value) || mockVoices[1];
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

  // Measure trigger width
  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          className={cn(
            "w-full bg-bg2 border border-separator1 rounded-[4px] h-[30px] px-2 py-1.5",
            "flex items-center justify-between gap-2 text-left",
            "hover:bg-bg3 transition-colors",
            className
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <VoiceIcon />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs font-semibold text-fg1 leading-[1.5] truncate">
              {selectedVoice.name}
            </span>
          </div>
          {open ? (
            <ChevronUp className="w-2.5 h-2.5 shrink-0 text-fg3" />
          ) : (
            <ChevronDown className="w-2.5 h-2.5 shrink-0 text-fg3" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 bg-bg2 border-separator1"
        align="start"
        sideOffset={2}
        style={{ width: triggerWidth > 0 ? `${triggerWidth}px` : undefined }}
      >
        {/* Voice List */}
        <div className="flex items-start">
          <ScrollArea className="flex-1 h-[300px]">
            <div className="flex flex-col">
              {mockVoices.map((voice) => (
                <VoiceRow
                  key={voice.id}
                  voice={voice}
                  isSelected={voice.id === value}
                  onClick={() => {
                    onValueChange(voice.id);
                    setOpen(false);
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

