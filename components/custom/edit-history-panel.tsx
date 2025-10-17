"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// TypeScript interfaces
export interface HistoryItem {
  id: string;
  editName: string;
  userEmail: string;
  timestamp: string;
}

// Mock history data for prototype
const mockHistoryData: HistoryItem[] = [
  {
    id: "1",
    editName: "Updated system instructions",
    userEmail: "dylan@example.com",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    editName: "Changed voice to Alloy",
    userEmail: "sarah@example.com",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    editName: "Modified welcome message",
    userEmail: "dylan@example.com",
    timestamp: "Yesterday",
  },
  {
    id: "4",
    editName: "Enabled greeting prompt",
    userEmail: "mike@example.com",
    timestamp: "2 days ago",
  },
  {
    id: "5",
    editName: "Updated language to Spanish",
    userEmail: "dylan@example.com",
    timestamp: "3 days ago",
  },
];

// History List Item Component
interface HistoryListItemProps {
  item: HistoryItem;
  isSelected: boolean;
  onSelect: () => void;
}

function HistoryListItem({ item, isSelected, onSelect }: HistoryListItemProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full flex items-start gap-2 p-4 rounded-md bg-bg2 border border-separator1 transition-all",
        "hover:bg-bg3 focus:outline-none cursor-pointer",
        isSelected && "ring-1 ring-fgAccent1"
      )}
    >
      <div className="flex-1 flex flex-col items-start gap-0 min-w-0">
        <p className="text-sm font-semibold text-fg1 leading-[1.5] text-left">
          {item.editName}
        </p>
        <p className="text-sm font-normal text-fg3 leading-[1.5] text-left">
          {item.userEmail}
        </p>
      </div>
      <div className="flex-shrink-0">
        <p className="text-xs font-normal text-fg3 leading-[1.5] whitespace-nowrap">
          {item.timestamp}
        </p>
      </div>
    </button>
  );
}

// Main Edit History Panel Component
export interface EditHistoryPanelProps {
  trigger?: React.ReactNode;
  historyItems?: HistoryItem[];
  currentUserEmail?: string;
  onRevert?: (historyItem: HistoryItem) => void;
}

export default function EditHistoryPanel({
  trigger,
  historyItems,
  currentUserEmail = "dylan@example.com",
  onRevert,
}: EditHistoryPanelProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  // Use provided history items or fallback to mock data
  const displayItems = historyItems || mockHistoryData;

  const handleRevert = () => {
    const selectedItem = displayItems.find((item) => item.id === selectedId);
    if (selectedItem && onRevert) {
      onRevert(selectedItem);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            View edit history
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-[500px] bg-bg1 border-l border-separator1 p-0 flex flex-col gap-0"
      >
        {/* Header */}
        <div className="flex flex-col gap-0.5 px-6 pt-6 pb-5 flex-shrink-0">
          <SheetTitle className="text-lg font-semibold text-fg0 leading-[1.5]">
            Edit history
          </SheetTitle>
          <SheetDescription className="text-sm font-normal text-fg2 leading-[1.5]">
            Review the changes made to your agent and convert back to a previous
            iteration.
          </SheetDescription>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto px-6 pb-6 pt-1 min-h-0">
          {displayItems.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-fg3">No edit history yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {displayItems.map((item) => (
                <HistoryListItem
                  key={item.id}
                  item={item}
                  isSelected={selectedId === item.id}
                  onSelect={() => setSelectedId(item.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-separator1 px-6 py-4 flex items-center justify-end gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCancel}
            className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleRevert}
            disabled={!selectedId}
            className="h-7 px-3 bg-fgAccent1 text-bg1 hover:bg-fgAccent1/90 font-semibold text-xs"
          >
            Revert to selected
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

