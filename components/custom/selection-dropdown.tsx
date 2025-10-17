"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, PlayCircle, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Voice, type LLMModel } from "@/lib/mock-data";

type SelectionMode = "voice" | "model";

interface BaseProvider {
  id: string;
  name: string;
}

interface SelectionDropdownProps {
  mode: SelectionMode;
  value: string;
  onValueChange: (value: string) => void;
  items: Voice[] | LLMModel[];
  providers: BaseProvider[];
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

// Provider logo component
function ProviderLogo({ provider }: { provider: string }) {
  // Different colors for different providers
  const colors: Record<string, string> = {
    elevenlabs: "#1fd5f9",
    openai: "#10a37f",
    google: "#4285f4",
    azure: "#0078d4",
    anthropic: "#d4a574",
  };

  const color = colors[provider.toLowerCase()] || "#999999";

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
        "w-full flex items-center justify-between px-3 py-2 border-b border-separator1 hover:bg-bg3 transition-colors text-left",
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

// Model provider header
interface ProviderHeaderProps {
  provider: BaseProvider;
}

function ProviderHeader({ provider }: ProviderHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-1 border-b border-separator1">
      <ProviderLogo provider={provider.id} />
      <p className="text-xs font-semibold text-fg3 leading-[1.5]">
        {provider.name}
      </p>
    </div>
  );
}

// Model row component
interface ModelRowProps {
  model: LLMModel;
  isSelected?: boolean;
  onClick: () => void;
}

function ModelRow({ model, isSelected, onClick }: ModelRowProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between px-4 py-2 border-b border-separator1 hover:bg-bg3 transition-colors text-left",
        isSelected && "bg-bg3"
      )}
    >
      <p className="text-xs font-semibold text-fg1 leading-[1.5]">
        {model.name}
      </p>
      <ProviderLogo provider={model.provider} />
    </button>
  );
}

// Filter button component
interface FilterButtonProps {
  label: string;
  value: string | null;
  options: Array<{ id: string; name: string }>;
  onValueChange: (value: string | null) => void;
}

function FilterButton({
  label,
  value,
  options,
  onValueChange,
}: FilterButtonProps) {
  const [open, setOpen] = React.useState(false);
  const displayValue = value
    ? options.find((opt) => opt.id === value)?.name
    : label;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-[30px] px-2 bg-bg2 border-separator1 text-fg1 hover:bg-bg3 text-xs font-semibold"
        >
          <Filter className="w-4 h-4 mr-1.5 text-fg3" />
          <Separator orientation="vertical" className="h-4 mx-1.5" />
          {displayValue}
          <ChevronDown className="w-2.5 h-2.5 ml-1.5 text-fg3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        <DropdownMenuItem
          onClick={() => {
            onValueChange(null);
            setOpen(false);
          }}
        >
          All
        </DropdownMenuItem>
        {options.map((option) => (
          <DropdownMenuItem
            key={option.id}
            onClick={() => {
              onValueChange(option.id);
              setOpen(false);
            }}
          >
            {option.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Main SelectionDropdown component
export default function SelectionDropdown({
  mode,
  value,
  onValueChange,
  items,
  providers,
  className,
}: SelectionDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedProvider, setSelectedProvider] = React.useState<string | null>(
    null
  );
  const [selectedGender, setSelectedGender] = React.useState<string | null>(
    null
  );
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [triggerWidth, setTriggerWidth] = React.useState<number>(0);

  // Get selected item
  const selectedItem = items.find((item) => item.id === value) || items[0];

  // Filter items based on search and filters
  const filteredItems = React.useMemo(() => {
    let filtered = items;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(query);
        if (mode === "voice" && "description" in item) {
          const voiceItem = item as Voice;
          const descMatch = voiceItem.description.toLowerCase().includes(query);
          return nameMatch || descMatch;
        }
        return nameMatch;
      });
    }

    // Apply provider filter
    if (selectedProvider) {
      filtered = filtered.filter(
        (item) => item.provider === selectedProvider
      );
    }

    // Apply gender filter (voice mode only)
    if (mode === "voice" && selectedGender) {
      filtered = filtered.filter(
        (item) => "gender" in item && item.gender === selectedGender
      );
    }

    return filtered;
  }, [items, searchQuery, selectedProvider, selectedGender, mode]);

  // Group items by provider for model mode
  const groupedItems = React.useMemo(() => {
    if (mode !== "model") return null;

    const groups = new Map<string, LLMModel[]>();
    filteredItems.forEach((item) => {
      const provider = item.provider;
      if (!groups.has(provider)) {
        groups.set(provider, []);
      }
      groups.get(provider)?.push(item as LLMModel);
    });

    return Array.from(groups.entries()).map(([providerId, models]) => ({
      provider: providers.find((p) => p.id === providerId) || {
        id: providerId,
        name: providerId,
      },
      models,
    }));
  }, [filteredItems, mode, providers]);

  // Gender options for voice mode
  const genderOptions = [
    { id: "male", name: "Male" },
    { id: "female", name: "Female" },
    { id: "neutral", name: "Neutral" },
  ];

  // Measure trigger width
  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  // Reset filters when dropdown closes
  React.useEffect(() => {
    if (!open) {
      setSearchQuery("");
      setSelectedProvider(null);
      setSelectedGender(null);
    }
  }, [open]);

  // Render trigger button
  const renderTrigger = () => {
    if (mode === "voice") {
      return (
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
              {selectedItem?.name}
            </span>
          </div>
          {open ? (
            <ChevronUp className="w-2.5 h-2.5 shrink-0 text-fg3" />
          ) : (
            <ChevronDown className="w-2.5 h-2.5 shrink-0 text-fg3" />
          )}
        </button>
      );
    } else {
      // Model mode
      const selectedModel = selectedItem as LLMModel;
      return (
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
            <ProviderLogo provider={selectedModel?.provider || ""} />
            <Separator orientation="vertical" className="h-4" />
            <span className="text-xs font-semibold text-fg1 leading-[1.5] truncate">
              {selectedModel?.name}
            </span>
          </div>
          {open ? (
            <ChevronUp className="w-2.5 h-2.5 shrink-0 text-fg3" />
          ) : (
            <ChevronDown className="w-2.5 h-2.5 shrink-0 text-fg3" />
          )}
        </button>
      );
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
      <PopoverContent
        className="p-0 bg-bg2 border-separator1"
        align="start"
        sideOffset={2}
        style={{ width: triggerWidth > 0 ? `${triggerWidth}px` : undefined }}
      >
        {/* Search and Filters */}
        <div className="flex items-center gap-3 p-3 border-b border-separator1">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="w-4 h-4 text-fg4" />
            </div>
            <Input
              placeholder={mode === "voice" ? "Search voices" : "Search models"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 h-[30px] bg-bg2 border-separator1 text-xs text-fg1 placeholder:text-fg4"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-3">
            <FilterButton
              label="Provider"
              value={selectedProvider}
              options={providers}
              onValueChange={setSelectedProvider}
            />
            {mode === "voice" && (
              <FilterButton
                label="Gender"
                value={selectedGender}
                options={genderOptions}
                onValueChange={setSelectedGender}
              />
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="flex items-start">
          <ScrollArea className="flex-1 h-[300px]">
            {mode === "voice" ? (
              <div className="flex flex-col">
                {filteredItems.map((item) => (
                  <VoiceRow
                    key={item.id}
                    voice={item as Voice}
                    isSelected={item.id === value}
                    onClick={() => {
                      onValueChange(item.id);
                      setOpen(false);
                    }}
                  />
                ))}
                {filteredItems.length === 0 && (
                  <div className="px-3 py-8 text-center text-xs text-fg3">
                    No voices found
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col">
                {groupedItems?.map(({ provider, models }) => (
                  <div key={provider.id}>
                    <ProviderHeader provider={provider} />
                    {models.map((model) => (
                      <ModelRow
                        key={model.id}
                        model={model}
                        isSelected={model.id === value}
                        onClick={() => {
                          onValueChange(model.id);
                          setOpen(false);
                        }}
                      />
                    ))}
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <div className="px-4 py-8 text-center text-xs text-fg3">
                    No models found
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}

