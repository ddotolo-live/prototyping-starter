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
import { CircleCheckIcon } from "@/icons/react";
import AddToolPanel from "@/components/custom/add-tool-panel";

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
  className?: string;
}

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
function TopBar() {
  return (
    <div className="flex items-center gap-4 px-4 py-4 w-full">
      <StatDisplay label="Est. latency:" value="2,521ms" percentage={65} />
      <Separator orientation="vertical" className="h-7" />
      <StatDisplay label="Est. cost" value="$0.16/min" percentage={45} />
      <div className="flex-1 flex items-center justify-end gap-2">
        <EditHistoryPanel
          trigger={
            <Button
              variant="outline"
              size="sm"
              className="h-7 bg-bg2 border-separator1 text-fg1 hover:bg-bg3 font-semibold"
            >
              View edit history
              <ChevronDown className="ml-1 h-3 w-3" />
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
  className,
}: ConfigPanelProps) {
  
  return (
    <div
      className={cn(
        "flex flex-col gap-2 h-full bg-bg1 border-l border-separator1",
        className
      )}
    >
      {/* Top Bar */}
      <TopBar />

      {/* Tabs */}
      <Tabs
        defaultValue="instructions"
        className="flex flex-col flex-1 min-h-0 border-0"
      >
        <TabsList className="w-full justify-start rounded-none border-b border-separator1 bg-transparent px-4 h-auto flex-shrink-0 gap-2">
          <TabsTrigger
            value="instructions"
            className="relative px-2 pb-2 pt-0 rounded-none border-b-2 border-transparent data-[state=active]:border-[#07b6da] data-[state=active]:text-fg1 text-fg4 font-semibold text-sm tracking-normal capitalize hover:text-fg1 cursor-pointer"
          >
            Identity
          </TabsTrigger>
          <TabsTrigger
            value="voice"
            className="relative px-2 pb-2 pt-0 rounded-none border-b-2 border-transparent data-[state=active]:border-[#07b6da] data-[state=active]:text-fg1 text-fg4 font-semibold text-sm tracking-normal capitalize hover:text-fg1 cursor-pointer"
          >
            Models & Voice
          </TabsTrigger>
          <TabsTrigger
            value="actions"
            className="relative px-2 pb-2 pt-0 rounded-none border-b-2 border-transparent data-[state=active]:border-[#07b6da] data-[state=active]:text-fg1 text-fg4 font-semibold text-sm tracking-normal capitalize hover:text-fg1 cursor-pointer"
          >
            Actions
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
                onChange={(e) => onNameChange(e.target.value)}
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
                onChange={(e) => onSystemInstructionsChange(e.target.value)}
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
                  onCheckedChange={onEnableGreetingChange}
                />
              </div>
              
              {/* Radio Group and Add Variable Button */}
              <div className="flex items-center justify-between">
                <RadioGroup
                  value={greetingType}
                  onValueChange={(value) => onGreetingTypeChange(value as "script" | "prompt")}
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
                onChange={(e) => onWelcomeMessageChange(e.target.value)}
                className="border-separator1 bg-transparent text-fg1 text-xs h-[150px] px-3 py-1.5 resize-none"
                disabled={!enableGreeting}
              />
              
              {/* Allow Interrupt Checkbox */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={allowInterrupt}
                  onCheckedChange={(checked) =>
                    onAllowInterruptChange(checked as boolean)
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
              <Select value={language} onValueChange={onLanguageChange}>
                <SelectTrigger className="w-full border-separator1 bg-bg2 text-fg1 text-xs h-[30px] px-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockLanguages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <div className="flex items-center gap-2">
                        <span>{lang.flag}</span>
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
                  onPipelineModeChange(val as "pipeline" | "realtime")
                }
                options={[
                  { value: "pipeline", label: "Standard" },
                  { 
                    value: "realtime", 
                    label: "Realtime",
                    icon: <CircleCheckIcon className="h-3 w-3 text-fg1" />
                  },
                ]}
              />
            </div>

            {/* Standard Pipeline View */}
            {pipelineMode === "pipeline" && (
              <>
                {/* Text-to-Speech (TTS) Field */}
                <div className="flex flex-col gap-2">
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
                </div>

                {/* Voice Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Voice"
                    description="The voice your agent will use when speaking"
                  />
                  <SelectionDropdown
                    mode="voice"
                    value={selectedVoice}
                    onValueChange={onVoiceChange}
                    items={mockVoices}
                    providers={mockVoiceProviders}
                  />
                </div>

                {/* Language Model (LLM) Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Language model (LLM)"
                    description="The AI model that generates your agents response"
                  />
                  <SelectionDropdown
                    mode="model"
                    value={llmModel}
                    onValueChange={onLlmModelChange}
                    items={mockLLMModels}
                    providers={mockLLMProviders}
                  />
                </div>

                {/* Speech-to-Text (STT) Field */}
                <div className="flex flex-col gap-2">
                  <FieldLabel
                    label="Speech-to-text (STT)"
                    description="Converts caller speech into text for processing"
                  />
                  <Select value={sttService} onValueChange={onSttServiceChange}>
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
                  <Select value={realtimeModel} onValueChange={onRealtimeModelChange}>
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
                      onChange={(e) => onSecretNameChange(e.target.value)}
                      placeholder="PROVIDER_API_KEY"
                      className="flex-1 border-separator2 text-fg1 text-xs h-auto py-1.5 px-2 placeholder:text-fg4"
                    />
                    <Input
                      value={secretKey}
                      onChange={(e) => onSecretKeyChange(e.target.value)}
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
                  <SelectionDropdown
                    mode="voice"
                    value={selectedVoice}
                    onValueChange={onVoiceChange}
                    items={mockVoices}
                    providers={mockVoiceProviders}
                  />
                </div>
              </>
            )}
          </div>
        </TabsContent>

        {/* Actions Tab Content */}
        <TabsContent value="actions" className="flex-1 min-h-0 overflow-auto m-0">
          <div className="flex flex-col gap-5 p-4">
            {/* Tools Section */}
            <div className="flex flex-col gap-2">
              <FieldLabel
                label="Tools"
                description="Define tools your agent can use to take actions"
              />
            </div>

            {/* Built-in Tools */}
            {tools
              .filter((tool) => tool.isBuiltIn)
              .map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-start gap-2 p-4 bg-bg2 border border-separator1 rounded"
                >
                  <div className="flex-1 flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-fg1 leading-[1.5]">
                      {tool.name}
                    </p>
                    <p className="text-sm font-normal text-fg2 leading-[1.5] line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 h-7">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 w-8 p-0 hover:bg-bg3"
                    >
                      <Pencil className="h-3 w-3 text-fg1" />
                    </Button>
                    <Toggle
                      checked={tool.enabled}
                      onCheckedChange={(checked) => {
                        const updatedTools = tools.map((t) =>
                          t.id === tool.id ? { ...t, enabled: checked } : t
                        );
                        onToolsChange(updatedTools);
                      }}
                    />
                  </div>
                </div>
              ))}

            {/* Custom Tools Section */}
            <div className="flex flex-col gap-2">
              <div className="flex items-end justify-between pl-1">
                <FieldLabel
                  label="Custom tools"
                  description="Define custom tools your agent can use to take actions"
                />
                <AddToolPanel
                  onSave={(newTool) => {
                    const updatedTools = [...tools, newTool];
                    onToolsChange(updatedTools);
                  }}
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-fg1 hover:bg-bg2 font-semibold text-xs"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add tool
                    </Button>
                  }
                />
              </div>
            </div>

            {/* Custom Tool Items */}
            {tools
              .filter((tool) => !tool.isBuiltIn)
              .map((tool) => (
                <div
                  key={tool.id}
                  className="flex items-start gap-2 p-4 bg-bg2 border border-separator1 rounded"
                >
                  <div className="flex-1 flex flex-col gap-0.5">
                    <p className="text-sm font-semibold text-fg1 leading-[1.5]">
                      {tool.name}
                    </p>
                    <p className="text-sm font-normal text-fg2 leading-[1.5] line-clamp-2">
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
                        onToolsChange(updatedTools);
                      }}
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-8 p-0 hover:bg-bg3"
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
                        onToolsChange(updatedTools);
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
