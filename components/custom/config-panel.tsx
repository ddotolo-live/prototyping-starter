"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, Cell } from "recharts";
import { ChevronDown, Plus, Sparkles, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import VoiceSelector from "@/components/custom/voice-selector";
import SelectionDropdown from "@/components/custom/selection-dropdown";
import SegmentedControl from "@/components/custom/segmented-control";
import EditHistoryPanel from "@/components/custom/edit-history-panel";
import {
  mockLanguages,
  mockRealtimeProviders,
  mockRealtimeModels,
  mockLLMModels,
  mockLLMProviders,
  mockSTTServices,
  mockTTSServices,
  mockTools,
  mockVoices,
  mockVoiceProviders,
  type ToolItem,
  type RealtimeModel,
} from "@/lib/mock-data";
import Toggle from "@/components/custom/toggle";
import { CircleCheckIcon, ArrowHistoryClock } from "../../icons/react";
import AddToolPanel from "@/components/custom/add-tool-panel";
import CollapsibleSection from "@/components/custom/collapsible-section";
import type { HistoryItem } from "@/components/custom/edit-history-panel";

// TypeScript interfaces
export interface ConfigPanelProps {
  name: string;
  systemInstructions: string;
  welcomeMessage: string;
  enableGreeting: boolean;
  greetingType: "script" | "prompt";
  allowInterrupt: boolean;
  language: string;
  pipelineMode: "pipeline" | "realtime";
  selectedVoice: string;
  realtimeProvider: string;
  realtimeModel: string;
  secretName: string;
  secretKey: string;
  llmModel: string;
  sttService: string;
  ttsService: string;
  tools: ToolItem[];
  onNameChange: (value: string) => void;
  onSystemInstructionsChange: (value: string) => void;
  onWelcomeMessageChange: (value: string) => void;
  onEnableGreetingChange: (value: boolean) => void;
  onGreetingTypeChange: (value: "script" | "prompt") => void;
  onAllowInterruptChange: (value: boolean) => void;
  onLanguageChange: (value: string) => void;
  onPipelineModeChange: (value: "pipeline" | "realtime") => void;
  onVoiceChange: (value: string) => void;
  onRealtimeProviderChange: (value: string) => void;
  onRealtimeModelChange: (value: string) => void;
  onSecretNameChange: (value: string) => void;
  onSecretKeyChange: (value: string) => void;
  onLlmModelChange: (value: string) => void;
  onSttServiceChange: (value: string) => void;
  onTtsServiceChange: (value: string) => void;
  onToolsChange: (tools: ToolItem[]) => void;
  historyItems?: HistoryItem[];
  onAddHistory?: (editName: string) => void;
  currentUserEmail?: string;
  className?: string;
}

type SaveState = "idle" | "saving" | "saved";

// TopBar stat component
interface StatDisplayProps {
  label: string;
  value: string;
  percentage: number;
}

function StatDisplay({ label, value, percentage }: StatDisplayProps) {
  const chartData = [
    { name: "filled", value: percentage },
    { name: "empty", value: 100 - percentage },
  ];

  const chartConfig = {
    filled: { color: "#1fd5f9" },
    empty: { color: "#202020" },
  };

  return (
    <div className="flex items-center gap-1">
      <ChartContainer config={chartConfig} className="h-[34px] w-[34px]">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={10}
            outerRadius={17}
            strokeWidth={0}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.name === "filled"
                    ? chartConfig.filled.color
                    : chartConfig.empty.color
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.8px] leading-[1.5] whitespace-pre">
        <p className="text-fg3 mb-0">{label}</p>
        <p className="text-fg1">{value}</p>
      </div>
    </div>
  );
}

// TopBar component
interface TopBarProps {
  saveState: SaveState;
  historyItems?: HistoryItem[];
  currentUserEmail?: string;
}

function TopBar({ saveState, historyItems, currentUserEmail }: TopBarProps) {
  return (
    <div className="flex items-center gap-4 px-4 py-4 w-full">
      <StatDisplay label="Est. latency:" value="2,521ms" percentage={65} />
      <Separator orientation="vertical" className="h-7" />
      <StatDisplay label="Est. cost" value="$0.16/min" percentage={45} />
      <div className="flex-1 flex items-center justify-end gap-2">
        {saveState === "saving" && (
          <p className="text-xs font-normal italic text-fg3">
            Saving changes...
          </p>
        )}
        {saveState === "saved" && (
          <p className="text-xs font-normal italic text-fg3">
            All changes saved
          </p>
        )}
        <EditHistoryPanel
          historyItems={historyItems}
          currentUserEmail={currentUserEmail}
          trigger={
            <Button
              variant="secondary"
              size="sm"
            >
              View edit history
              <ArrowHistoryClock className="ml-1 h-3 w-3" />
            </Button>
          }
        />
      </div>
    </div>
  );
}

// Field label component with optional description
interface FieldLabelProps {
  label: string;
  description?: string;
  action?: React.ReactNode;
}

function FieldLabel({ label, description, action }: FieldLabelProps) {
  return (
    <div className="flex items-end justify-between pl-1 w-full">
      <div className="flex flex-col gap-0.5 flex-1">
        <Label className="text-sm font-semibold text-fg1">{label}</Label>
        {description && (
          <p className="text-xs font-normal text-fg3 leading-[1.5]">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}

// Field label mapping for history entries
const fieldLabels: Record<string, string> = {
  name: "agent name",
  systemInstructions: "system instructions",
  welcomeMessage: "welcome message",
  enableGreeting: "greeting settings",
  greetingType: "greeting type",
  allowInterrupt: "interrupt settings",
  language: "language",
  pipelineMode: "pipeline mode",
  selectedVoice: "voice",
  realtimeProvider: "realtime provider",
  realtimeModel: "realtime model",
  secretName: "secret name",
  secretKey: "secret key",
  llmModel: "language model",
  sttService: "speech-to-text service",
  ttsService: "text-to-speech service",
  tools: "tools configuration",
};

// Main ConfigPanel component
export default function ConfigPanel({
  name,
  systemInstructions,
  welcomeMessage,
  enableGreeting,
  greetingType,
  allowInterrupt,
  language,
  pipelineMode,
  selectedVoice,
  realtimeProvider,
  realtimeModel,
  secretName,
  secretKey,
  llmModel,
  sttService,
  ttsService,
  tools,
  onNameChange,
  onSystemInstructionsChange,
  onWelcomeMessageChange,
  onEnableGreetingChange,
  onGreetingTypeChange,
  onAllowInterruptChange,
  onLanguageChange,
  onPipelineModeChange,
  onVoiceChange,
  onRealtimeProviderChange,
  onRealtimeModelChange,
  onSecretNameChange,
  onSecretKeyChange,
  onLlmModelChange,
  onSttServiceChange,
  onTtsServiceChange,
  onToolsChange,
  historyItems,
  onAddHistory,
  currentUserEmail = "dylan@example.com",
  className,
}: ConfigPanelProps) {
  // Save state management
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const saveTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const savedTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // History tracking
  const [changedFields, setChangedFields] = React.useState<Set<string>>(new Set<string>());
  const [pendingHistoryDescription, setPendingHistoryDescription] = React.useState<string | null>(null);
  const historyTimerRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Custom voice/model mode state
  const [useVoiceCustomMode, setUseVoiceCustomMode] = React.useState(false);
  const [useModelCustomMode, setUseModelCustomMode] = React.useState(false);
  const [customVoiceProvider, setCustomVoiceProvider] = React.useState("");
  const [customVoiceId, setCustomVoiceId] = React.useState("");
  const [customModelProvider, setCustomModelProvider] = React.useState("");
  const [customModelId, setCustomModelId] = React.useState("");

  // Handle field changes and trigger save state
  const handleFieldChange = React.useCallback((fieldName: string) => {
    // Update save state
    setSaveState("saving");
    
    // Clear existing timers
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    
    // Transition to "saved" after 1.5 seconds
    saveTimerRef.current = setTimeout(() => {
      setSaveState("saved");
      
      // Transition back to "idle" after another 1.5 seconds
      savedTimerRef.current = setTimeout(() => {
        setSaveState("idle");
      }, 1500);
    }, 1500);

    // Track changed field for history
    setChangedFields((prev) => new Set<string>(prev).add(fieldName));
    
    // Clear existing history timer
    if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
    
    // Create history entry after 3 seconds of inactivity
    historyTimerRef.current = setTimeout(() => {
      setChangedFields((currentFields) => {
        if (currentFields.size > 0) {
          // Generate description based on changed fields
          const fieldArray = Array.from(currentFields);
          const fieldNames = fieldArray.map((f) => fieldLabels[f] || f);
          
          let description: string;
          if (fieldNames.length === 1) {
            description = `Updated ${fieldNames[0]}`;
          } else if (fieldNames.length === 2) {
            description = `Updated ${fieldNames[0]} and ${fieldNames[1]}`;
          } else {
            const lastField = fieldNames[fieldNames.length - 1];
            const otherFields = fieldNames.slice(0, -1).join(", ");
            description = `Updated ${otherFields}, and ${lastField}`;
          }
          
          // Set pending description to trigger useEffect
          setPendingHistoryDescription(description);
        }
        return new Set<string>(); // Clear the set
      });
    }, 3000);
  }, []);

  // Effect to handle history updates (prevents setState during render)
  React.useEffect(() => {
    if (pendingHistoryDescription && onAddHistory) {
      onAddHistory(pendingHistoryDescription);
      setPendingHistoryDescription(null);
    }
  }, [pendingHistoryDescription, onAddHistory]);

  // Cleanup timers on unmount
  React.useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      if (historyTimerRef.current) clearTimeout(historyTimerRef.current);
    };
  }, []);

  // Wrapped change handlers
  const handleNameChange = (value: string) => {
    onNameChange(value);
    handleFieldChange("name");
  };

  const handleSystemInstructionsChange = (value: string) => {
    onSystemInstructionsChange(value);
    handleFieldChange("systemInstructions");
  };

  const handleWelcomeMessageChange = (value: string) => {
    onWelcomeMessageChange(value);
    handleFieldChange("welcomeMessage");
  };

  const handleEnableGreetingChange = (value: boolean) => {
    onEnableGreetingChange(value);
    handleFieldChange("enableGreeting");
  };

  const handleGreetingTypeChange = (value: "script" | "prompt") => {
    onGreetingTypeChange(value);
    handleFieldChange("greetingType");
  };

  const handleAllowInterruptChange = (value: boolean) => {
    onAllowInterruptChange(value);
    handleFieldChange("allowInterrupt");
  };

  const handleLanguageChange = (value: string) => {
    onLanguageChange(value);
    handleFieldChange("language");
  };

  const handlePipelineModeChange = (value: "pipeline" | "realtime") => {
    onPipelineModeChange(value);
    handleFieldChange("pipelineMode");
  };

  const handleVoiceChange = (value: string) => {
    onVoiceChange(value);
    handleFieldChange("selectedVoice");
  };

  const handleRealtimeProviderChange = (value: string) => {
    onRealtimeProviderChange(value);
    handleFieldChange("realtimeProvider");
  };

  const handleRealtimeModelChange = (value: string) => {
    onRealtimeModelChange(value);
    handleFieldChange("realtimeModel");
  };

  const handleSecretNameChange = (value: string) => {
    onSecretNameChange(value);
    handleFieldChange("secretName");
  };

  const handleSecretKeyChange = (value: string) => {
    onSecretKeyChange(value);
    handleFieldChange("secretKey");
  };

  const handleLlmModelChange = (value: string) => {
    onLlmModelChange(value);
    handleFieldChange("llmModel");
  };

  const handleSttServiceChange = (value: string) => {
    onSttServiceChange(value);
    handleFieldChange("sttService");
  };

  const handleTtsServiceChange = (value: string) => {
    onTtsServiceChange(value);
    handleFieldChange("ttsService");
  };

  const handleToolsChange = (newTools: ToolItem[]) => {
    onToolsChange(newTools);
    handleFieldChange("tools");
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-2 h-full bg-bg1 border-l border-separator1",
        className
      )}
    >
      {/* Top Bar */}
      <TopBar 
        saveState={saveState} 
        historyItems={historyItems}
        currentUserEmail={currentUserEmail}
      />

      {/* Tabs */}
      <Tabs
        defaultValue="instructions"
        className="flex flex-col flex-1 min-h-0 border-0"
      >
        <TabsList className="w-full justify-start rounded-none border-b border-separator1 bg-transparent px-4 h-auto flex-shrink-0 gap-2">
          <TabsTrigger
            value="instructions"
            className="cursor-pointer"
          >
            Identity
          </TabsTrigger>
          <TabsTrigger
            value="voice"
            className="cursor-pointer"
          >
            Models & Voice
          </TabsTrigger>
          <TabsTrigger
            value="behavior"
            className="cursor-pointer"
          >
            Behavior
          </TabsTrigger>
        </TabsList>

        {/* Instructions Tab Content */}
        <TabsContent
          value="instructions"
          className="flex-1 min-h-0 overflow-auto scroll-pt-4 m-0"
        >
          <div className="flex flex-col gap-5 p-4 pb-4">
            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Name"
                description="Your agent's name for identification and personalization"
              />
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="border-separator1 text-fg1 text-xs h-auto py-1.5 px-3"
              />
            </div>

            {/* Instructions Field */}
            <div className="flex flex-col gap-2 flex-1 min-h-[200px]">
              <FieldLabel
                label="Instructions"
                description="Define your agent's personality, tone, and behavior guidelines"
                action={
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add metadata
                    </Button>
                    <Separator orientation="vertical" className="h-8 border-separator2" />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-7 p-0 hover:bg-bg2"
                    >
                      <Sparkles className="h-3 w-3 text-fg1" />
                    </Button>
                  </>
                }
              />
              <Textarea
                value={systemInstructions}
                onChange={(e) => handleSystemInstructionsChange(e.target.value)}
                className="flex-1 min-h-0 border-separator1 bg-transparent text-fg1 text-xs leading-[1.5] resize-none"
              />
            </div>

            {/* Welcome Message Field */}
            <div className="flex flex-col gap-2 bg-bg1 rounded-md">
              {/* Header with Toggle */}
              <div className="flex items-end justify-between pl-1">
                <FieldLabel
                  label="Welcome message"
                  description="The first message your agent says when a call begins"
                />
                <Toggle
                  checked={enableGreeting}
                  onCheckedChange={handleEnableGreetingChange}
                />
              </div>
              
              {/* Radio Group and Add Variable Button */}
              <div className="flex items-center justify-between">
                <RadioGroup
                  value={greetingType}
                  onValueChange={(value) => handleGreetingTypeChange(value as "script" | "prompt")}
                  className="flex items-center gap-2"
                  disabled={!enableGreeting}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="script" className="border-separator2" />
                    <Label className={cn("text-sm font-normal cursor-pointer", enableGreeting ? "text-fg1" : "text-fg3")}>Script</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="prompt" className="border-separator2" />
                    <Label className={cn("text-sm font-normal cursor-pointer", enableGreeting ? "text-fg1" : "text-fg3")}>Prompt</Label>
                  </div>
                </RadioGroup>
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs"
                  disabled={!enableGreeting}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add metadata
                </Button>
              </div>
              
              {/* Text Input */}
              <Textarea
                value={welcomeMessage}
                onChange={(e) => handleWelcomeMessageChange(e.target.value)}
                className="border-separator1 bg-transparent text-fg1 text-xs h-[150px] px-3 py-1.5 resize-none"
                disabled={!enableGreeting}
              />
              
              {/* Allow Interrupt Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={allowInterrupt}
                  onCheckedChange={(checked) =>
                    handleAllowInterruptChange(checked as boolean)
                  }
                  className="border-separator2"
                  disabled={!enableGreeting}
                />
                <Label className={cn("text-sm font-normal cursor-pointer", enableGreeting ? "text-fg1" : "text-fg3")}>
                  Allow users to interrupt
                </Label>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Voice Tab Content */}
        <TabsContent
          value="voice"
          className="flex-1 min-h-0 overflow-auto scroll-pt-4 m-0"
        >
          <div className="flex flex-col gap-5 p-4">
            {/* Language Field */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Language"
                description="This is the default language your agent will speak in"
              />
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        {/* <span>{lang.flag}</span> */}
                        <span>{lang.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Pipeline Mode Field */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Pipeline mode"
                description="Choose how your agent processes conversations"
              />
              <SegmentedControl
                value={pipelineMode}
                onValueChange={(val) =>
                  handlePipelineModeChange(val as "pipeline" | "realtime")
                }
                options={[
                  { value: "pipeline", label: "Standard" },
                  { value: "realtime", label: "Realtime" },
                ]}
              />
            </div>

            {/* Standard Pipeline View */}
            {pipelineMode === "pipeline" && (
              <>
                {/* Text-to-Speech (TTS) Field */}
                {/* <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Text-to-speech (TTS)"
                    description="Converts your agent's text response into speech"
                  />
                  <Select value={ttsService} onValueChange={onTtsServiceChange}>
                    <SelectTrigger className="w-full border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTTSServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div> */}

                {/* Voice Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Voice (TTS)"
                    description="Converts your agent's text response into speech using the selected voice."
                  />
                  {!useVoiceCustomMode ? (
                    <>
                      <SelectionDropdown
                        mode="voice"
                        value={selectedVoice}
                        onValueChange={handleVoiceChange}
                        items={mockVoices}
                        providers={mockVoiceProviders}
                      />
                      <button
                        onClick={() => setUseVoiceCustomMode(true)}
                        className="text-xs text-fgAccent1 hover:underline cursor-pointer text-left"
                      >
                        Bring your own
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Select value={customVoiceProvider} onValueChange={setCustomVoiceProvider}>
                          <SelectTrigger className="flex-1 border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockVoiceProviders.map((provider) => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          value={customVoiceId}
                          onChange={(e) => setCustomVoiceId(e.target.value)}
                          placeholder="Paste voice ID"
                          className="flex-1 border-separator1 bg-bg2 text-fg1 text-xs h-[30px] py-1.5 px-2 placeholder:text-fg4"
                        />
                      </div>
                      <button
                        onClick={() => setUseVoiceCustomMode(false)}
                        className="text-xs text-blue-500 hover:underline cursor-pointer text-left"
                      >
                        Use existing voices
                      </button>
                    </>
                  )}
                </div>

                {/* Language Model (LLM) Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Language model (LLM)"
                    description="The AI model that generates your agents response"
                  />
                  {!useModelCustomMode ? (
                    <>
                      <SelectionDropdown
                        mode="model"
                        value={llmModel}
                        onValueChange={handleLlmModelChange}
                        items={mockLLMModels}
                        providers={mockLLMProviders}
                      />
                      <button
                        onClick={() => setUseModelCustomMode(true)}
                        className="text-xs text-fgAccent1 hover:underline cursor-pointer text-left"
                      >
                        Bring your own
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Select value={customModelProvider} onValueChange={setCustomModelProvider}>
                          <SelectTrigger className="flex-1 border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockLLMProviders.map((provider) => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          value={customModelId}
                          onChange={(e) => setCustomModelId(e.target.value)}
                          placeholder="Paste model ID"
                          className="flex-1 border-separator1 bg-bg2 text-fg1 text-xs h-[30px] py-1.5 px-2 placeholder:text-fg4"
                        />
                      </div>
                      <button
                        onClick={() => setUseModelCustomMode(false)}
                        className="text-xs text-blue-500 hover:underline cursor-pointer text-left"
                      >
                        Use existing models
                      </button>
                    </>
                  )}
                </div>

                {/* Speech-to-Text (STT) Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Speech-to-text (STT)"
                    description="Converts caller speech into text for processing"
                  />
                  <Select value={sttService} onValueChange={handleSttServiceChange}>
                    <SelectTrigger className="w-full border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockSTTServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Realtime View */}
            {pipelineMode === "realtime" && (
              <>
                {/* Select model Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Select model"
                    description="The AI model that handles both conversation and voice generation"
                  />
                  <Select value={realtimeModel} onValueChange={handleRealtimeModelChange}>
                    <SelectTrigger className="w-full border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockRealtimeModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Secret name and key */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Secret name and key"
                    description="Add keys for your selected AI provider."
                  />
                  <div className="flex gap-4">
                    <Input
                      value={secretName}
                      onChange={(e) => handleSecretNameChange(e.target.value)}
                      placeholder="PROVIDER_API_KEY"
                      className="flex-1 border-separator2 text-fg1 text-xs h-auto py-1.5 px-2 placeholder:text-fg4"
                    />
                    <Input
                      value={secretKey}
                      onChange={(e) => handleSecretKeyChange(e.target.value)}
                      placeholder="YOUR_SECRET"
                      className="flex-1 border-separator2 text-fg1 text-xs h-auto py-1.5 px-2 placeholder:text-fg4"
                    />
                  </div>
                </div>

                {/* Voice Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Voice"
                    description="The voice your agent will use when speaking"
                  />
                  {!useVoiceCustomMode ? (
                    <>
                      <SelectionDropdown
                        mode="voice"
                        value={selectedVoice}
                        onValueChange={handleVoiceChange}
                        items={mockVoices}
                        providers={mockVoiceProviders}
                      />
                      <button
                        onClick={() => setUseVoiceCustomMode(true)}
                        className="text-xs text-fgAccent1 hover:underline cursor-pointer text-left"
                      >
                        Bring your own
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Select value={customVoiceProvider} onValueChange={setCustomVoiceProvider}>
                          <SelectTrigger className="flex-1 border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockVoiceProviders.map((provider) => (
                              <SelectItem key={provider.id} value={provider.id}>
                                {provider.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          value={customVoiceId}
                          onChange={(e) => setCustomVoiceId(e.target.value)}
                          placeholder="Paste voice ID"
                          className="flex-1 border-separator1 bg-bg2 text-fg1 text-xs h-[30px] py-1.5 px-2 placeholder:text-fg4"
                        />
                      </div>
                      <button
                        onClick={() => setUseVoiceCustomMode(false)}
                        className="text-xs text-blue-500 hover:underline cursor-pointer text-left"
                      >
                        Use existing voices
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* Behavior Tab Content */}
        <TabsContent value="behavior" className="flex-1 min-h-0 overflow-auto m-0">
          <div className="flex flex-col">
            {/* Tools Section - Collapsible */}
            <CollapsibleSection
              title="Tools"
              description="Define tools your agent can use to take actions"
              defaultOpen={true}
            >
              <div className="flex flex-col gap-5 px-4 p-4 border-b border-separator1">
                {/* Built-in Tools List */}
                <div className="flex flex-col overflow-clip rounded pb-px">
                  {tools
                    .filter((tool) => tool.isBuiltIn)
                    .map((tool, index, arr) => {
                      const isFirst = index === 0;
                      const isLast = index === arr.length - 1;
                      return (
                        <div
                          key={tool.id}
                          className={cn(
                            "flex items-start gap-2 p-3 bg-bg1 border border-separator1 mb-[-1px]",
                            isFirst && "rounded-tl rounded-tr",
                            isLast && "rounded-bl rounded-br"
                          )}
                        >
                          <div className="flex-1 flex flex-col gap-0 leading-[1.5] min-w-0">
                            <p className="text-xs font-semibold text-fg1">
                              {tool.name}
                            </p>
                            <p className="text-xs font-normal text-fg2 max-w-[400px] overflow-ellipsis overflow-hidden whitespace-nowrap">
                              {tool.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 h-7">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 w-8 p-0 hover:bg-bg3 rounded"
                            >
                              <Pencil className="h-3 w-3 text-fg1" />
                            </Button>
                            <Toggle
                              checked={tool.enabled}
                              onCheckedChange={(checked) => {
                                const updatedTools = tools.map((t) =>
                                  t.id === tool.id ? { ...t, enabled: checked } : t
                                );
                                handleToolsChange(updatedTools);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>

                {/* Custom Tools Section */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-end justify-between pl-1">
                    <div className="flex flex-col gap-0.5 flex-1">
                      <p className="text-sm font-semibold text-fg1 leading-[1.5] whitespace-pre">
                        Custom tools
                      </p>
                      <p className="text-xs font-normal text-fg3 leading-[1.5] whitespace-pre">
                        Define custom tools your agent can use to take actions
                      </p>
                    </div>
                    <AddToolPanel
                      onSave={(newTool) => {
                        const updatedTools = [...tools, newTool];
                        handleToolsChange(updatedTools);
                      }}
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs rounded"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add tool
                        </Button>
                      }
                    />
                  </div>

                  {/* Custom Tool Items */}
                  {tools.filter((tool) => !tool.isBuiltIn).length > 0 && (
                    <div className="flex flex-col overflow-clip rounded pb-px">
                      {tools
                        .filter((tool) => !tool.isBuiltIn)
                        .map((tool, index, arr) => {
                          const isFirst = index === 0;
                          const isLast = index === arr.length - 1;
                          const isOnly = arr.length === 1;
                          return (
                            <div
                              key={tool.id}
                              className={cn(
                                "flex items-start gap-2 p-3 bg-bg1 border border-separator1 mb-[-1px]",
                                (isFirst || isOnly) && "rounded-tl rounded-tr",
                                (isLast || isOnly) && "rounded-bl rounded-br"
                              )}
                            >
                              <div className="flex-1 flex flex-col gap-0 leading-[1.5] min-w-0">
                                <p className="text-xs font-semibold text-fg1">
                                  {tool.name}
                                </p>
                                <p className="text-xs font-normal text-fg2 max-w-[400px] overflow-ellipsis overflow-hidden whitespace-nowrap">
                                  {tool.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 h-7">
                                <AddToolPanel
                                  tool={tool}
                                  onSave={(updatedTool) => {
                                    const updatedTools = tools.map((t) =>
                                      t.id === tool.id ? updatedTool : t
                                    );
                                    handleToolsChange(updatedTools);
                                  }}
                                  trigger={
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-8 p-0 hover:bg-bg3 rounded"
                                    >
                                      <Pencil className="h-3 w-3 text-fg1" />
                                    </Button>
                                  }
                                />
                                <Toggle
                                  checked={tool.enabled}
                                  onCheckedChange={(checked) => {
                                    const updatedTools = tools.map((t) =>
                                      t.id === tool.id ? { ...t, enabled: checked } : t
                                    );
                                    handleToolsChange(updatedTools);
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              </div>
            </CollapsibleSection>

            {/* Placeholder Collapsible Sections */}
            <CollapsibleSection
              title="Collapsable section"
              description="A short description of the section."
              defaultOpen={false}
            />
            <CollapsibleSection
              title="Collapsable section"
              description="A short description of the section."
              defaultOpen={false}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
