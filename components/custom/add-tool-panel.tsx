"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { type ToolItem } from "@/lib/mock-data";
import { Plus, X, ExternalLink } from "lucide-react";
import { FoldersIcon } from "@/icons/react";

// TypeScript interfaces
export interface AddToolPanelProps {
  trigger?: React.ReactNode;
  tool?: ToolItem;
  onSave: (tool: ToolItem) => void;
  className?: string;
}

// Field label component
interface FieldLabelProps {
  label: string;
  description?: string;
  required?: boolean;
}

function FieldLabel({ label, description, required }: FieldLabelProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <Label className="text-sm font-semibold text-fg1">
        {label}
        {required && <span className="text-fgSerious1 ml-0.5">*</span>}
      </Label>
      {description && (
        <p className="text-xs font-normal text-fg3 leading-[1.5]">
          {description}
        </p>
      )}
    </div>
  );
}

// Header/Key entry component
interface DynamicEntryProps {
  name: string;
  value: string;
  onNameChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onRemove: () => void;
  namePlaceholder?: string;
  valuePlaceholder?: string;
}

function DynamicEntry({
  name,
  value,
  onNameChange,
  onValueChange,
  onRemove,
  namePlaceholder = "Name",
  valuePlaceholder = "Value",
}: DynamicEntryProps) {
  return (
    <div className="flex gap-2 items-start">
      <Input
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        placeholder={namePlaceholder}
        className="flex-1 border-separator1 text-fg1 text-xs h-auto py-1.5 px-2 placeholder:text-fg4"
      />
      <Input
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={valuePlaceholder}
        className="flex-1 border-separator1 text-fg1 text-xs h-auto py-1.5 px-2 placeholder:text-fg4"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={onRemove}
        className="h-[30px] w-[30px] p-0 hover:bg-bg3 flex-shrink-0"
      >
        <X className="h-3 w-3 text-fg3" />
      </Button>
    </div>
  );
}

// Empty state component
interface EmptyStateProps {
  icon?: React.ReactNode;
  message?: string;
}

function EmptyState({ icon, message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="opacity-20 mb-2">
        {icon || <FoldersIcon className="h-12 w-12 text-fg3" />}
      </div>
      {message && (
        <p className="text-xs text-fg4 text-center">{message}</p>
      )}
    </div>
  );
}

// Main Add Tool Panel Component
export default function AddToolPanel({
  trigger,
  tool,
  onSave,
  className,
}: AddToolPanelProps) {
  const [open, setOpen] = React.useState(false);
  const isEditMode = !!tool;

  // Form state
  const [name, setName] = React.useState(tool?.name || "");
  const [description, setDescription] = React.useState(tool?.description || "");
  const [method, setMethod] = React.useState<"GET" | "POST">(
    tool?.method || "GET"
  );
  const [endpoint, setEndpoint] = React.useState(tool?.endpoint || "");
  const [headers, setHeaders] = React.useState<Array<{ name: string; value: string }>>(
    tool?.headers || []
  );
  const [keys, setKeys] = React.useState<Array<{ secretName: string; secretValue: string }>>(
    tool?.keys || []
  );

  // Reset form when tool prop changes or modal opens
  React.useEffect(() => {
    if (open) {
      setName(tool?.name || "");
      setDescription(tool?.description || "");
      setMethod(tool?.method || "GET");
      setEndpoint(tool?.endpoint || "");
      setHeaders(tool?.headers || []);
      setKeys(tool?.keys || []);
    }
  }, [open, tool]);

  // Validation
  const isValid = name.trim() !== "" && description.trim() !== "";

  // Header management
  const addHeader = () => {
    setHeaders([...headers, { name: "", value: "" }]);
  };

  const updateHeader = (index: number, field: "name" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  // Key management
  const addKey = () => {
    setKeys([...keys, { secretName: "", secretValue: "" }]);
  };

  const updateKey = (index: number, field: "secretName" | "secretValue", value: string) => {
    const newKeys = [...keys];
    newKeys[index][field] = value;
    setKeys(newKeys);
  };

  const removeKey = (index: number) => {
    setKeys(keys.filter((_, i) => i !== index));
  };

  // Handle save
  const handleSave = () => {
    if (!isValid) return;

    const newTool: ToolItem = {
      id: tool?.id || `custom-tool-${Date.now()}`,
      name,
      description,
      enabled: tool?.enabled ?? true,
      isBuiltIn: false,
      method,
      endpoint,
      headers: headers.filter(h => h.name.trim() !== ""),
      keys: keys.filter(k => k.secretName.trim() !== ""),
    };

    onSave(newTool);
    setOpen(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Plus className="h-3 w-3 mr-1" />
            Add tool
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn(
          "w-full sm:max-w-[500px] bg-bg1 border-l border-separator1 p-0 flex flex-col gap-0",
          className
        )}
      >
        {/* Header */}
        <div className="flex flex-col gap-0.5 px-6 pt-6 pb-5 flex-shrink-0">
          <SheetTitle className="text-lg font-semibold text-fg0 leading-[1.5]">
            {isEditMode ? "Edit tool call" : "Add a tool call"}
          </SheetTitle>
          <SheetDescription className="text-sm font-normal text-fg2 leading-[1.5]">
            Connect external APIs and services that your agent can call to retrieve
            information or perform actions.
          </SheetDescription>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto px-6 pb-6 min-h-0">
          <div className="flex flex-col gap-5">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Name"
                description="Give your tool a clear, descriptive name that indicates its purpose."
                required
              />
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Weather API"
                className="border-separator1 text-fg1 text-xs h-auto py-1.5 px-3"
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Description"
                description="Explain what this tool does and when the agent should use it. Be specific about the tool's capabilities and use cases."
                required
              />
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Look up current weather information for a given location. Use this when the user asks about weather conditions, temperatures, or forecast."
                className="border-separator1 bg-transparent text-fg1 text-xs h-[120px] px-3 py-1.5 resize-none leading-[1.5]"
              />
            </div>

            {/* Method and API Endpoint */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Method and API endpoint"
                description="Specify the HTTP method and full URL for the API endpoint this tool will call"
              />
              <div className="flex gap-2">
                <Select value={method} onValueChange={(val) => setMethod(val as "GET" | "POST")}>
                  <SelectTrigger className="w-[100px] border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  value={endpoint}
                  onChange={(e) => setEndpoint(e.target.value)}
                  placeholder="https://api.weather.com/v1/current"
                  className="flex-1 border-separator1 text-fg1 text-xs h-auto py-1.5 px-3 placeholder:text-fg4"
                />
              </div>
            </div>

            {/* Headers Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <FieldLabel
                  label="Headers"
                  description="Define headers that will be sent with the request"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addHeader}
                  className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add header
                </Button>
              </div>
              
              {headers.length === 0 ? (
                <div className="border border-separator1 rounded-md bg-bg2">
                  <EmptyState
                    icon={<FoldersIcon className="h-12 w-12 text-fg3" />}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {headers.map((header, index) => (
                    <DynamicEntry
                      key={index}
                      name={header.name}
                      value={header.value}
                      onNameChange={(val) => updateHeader(index, "name", val)}
                      onValueChange={(val) => updateHeader(index, "value", val)}
                      onRemove={() => removeHeader(index)}
                      namePlaceholder="Header name"
                      valuePlaceholder="Header value"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Add Keys Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between">
                <FieldLabel
                  label="Add keys"
                  description="Define a secret name and key for this tool"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addKey}
                  className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add keys
                </Button>
              </div>
              
              {keys.length === 0 ? (
                <div className="border border-separator1 rounded-md bg-bg2">
                  <EmptyState
                    icon={<FoldersIcon className="h-12 w-12 text-fg3" />}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {keys.map((key, index) => (
                    <DynamicEntry
                      key={index}
                      name={key.secretName}
                      value={key.secretValue}
                      onNameChange={(val) => updateKey(index, "secretName", val)}
                      onValueChange={(val) => updateKey(index, "secretValue", val)}
                      onRemove={() => removeKey(index)}
                      namePlaceholder="PROVIDER_API_KEY"
                      valuePlaceholder="YOUR_SECRET"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-separator1 px-6 py-4 flex items-center justify-between gap-2 flex-shrink-0">
          <Button
            variant="link"
            size="sm"
            className="h-7 px-0 text-fgAccent1 hover:text-fgAccent1/80 font-semibold text-xs"
          >
            View documentation
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
          <div className="flex items-center gap-2">
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
              onClick={handleSave}
              disabled={!isValid}
              className="h-7 px-3 bg-fgAccent1 text-bg1 hover:bg-fgAccent1/90 font-semibold text-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditMode ? "Save changes" : "Save tool"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

