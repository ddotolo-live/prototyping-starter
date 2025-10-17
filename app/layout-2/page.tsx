"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectPageHeader } from "@/components/custom/project-page-header";
import ConfigPanel from "@/components/custom/config-panel";
import { CodePreviewPanel } from "@/components/custom/code-preview-panel";
import { CallPreviewPanel } from "@/components/custom/call-preview-panel";
import SegmentedControl from "@/components/custom/segmented-control";
import { DeploymentPanel } from "@/components/custom/deployment-panel";
import { ChainLink3Icon, CodeBracketsIcon } from "../../icons/react";
import { mockTools } from "@/lib/mock-data";
import type { HistoryItem } from "@/components/custom/edit-history-panel";

export default function Home() {
  // State management for active panel view
  const [activePanel, setActivePanel] = useState<"preview" | "code">("preview");

  // State management for deployment panel
  const [isDeploymentVisible, setIsDeploymentVisible] = useState(false);
  const [isDeploymentExpanded, setIsDeploymentExpanded] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<"deploying" | "success">("deploying");

  // State management for config panel
  const [config, setConfig] = useState({
    name: "Sally Scheduler",
    systemInstructions: `You are a helpful and conversational voice assistant. Speak naturally, like a knowledgeable friend who is approachable but professional. Keep responses concise, warm, and clear — avoid sounding robotic.

**When responding to questions:**
- Prioritize accuracy and clarity.
- If you don't know, admit it and suggest a next step.
- Break down complex ideas into simple explanations.
- Use analogies or examples when it helps understanding.
- Avoid jargon unless the user expects it, and explain technical terms in plain language.

**Interaction guidelines:**
- Ask clarifying questions if the request is ambiguous.
- Confirm important details before taking action.
- Be proactive in offering useful information.
- Avoid overwhelming the user with too much at once.
- Always aim to build trust and make the conversation smooth, natural, and productive.`,
    welcomeMessage: "Hello {{first_name}} how are you doing?",
    enableGreeting: true,
    greetingType: "script" as "script" | "prompt",
    allowInterrupt: true,
    language: "en-US",
    pipelineMode: "pipeline" as "pipeline" | "realtime",
    selectedVoice: "sophia",
    realtimeProvider: "openai-realtime",
    realtimeModel: "gemini-2.0-flash-exp",
    secretName: "",
    secretKey: "",
    llmModel: "gpt-4.1-mini",
    sttService: "deepgram",
    ttsService: "elevenlabs",
    tools: mockTools,
  });

  // State management for edit history
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  
  // Function to add new history entry
  const handleAddHistory = (editName: string) => {
    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      editName,
      userEmail: "dylan@example.com",
      timestamp: "Just now",
    };
    
    setHistoryItems((prev) => [newHistoryItem, ...prev]);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#070707]">
      {/* Page Header */}
      <ProjectPageHeader
        crumbs={[
          { label: "Pumpkin Spice Latte", href: "#" },
          { label: "Agents", href: "#" },
          { label: "Sally Scheduler", kind: "id" }
        ]}
      >
        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Status Indicator */}
          <div className="flex flex-col items-end gap-0 mr-2">
            <span className="text-[10px] font-mono uppercase tracking-wide text-fg4 font-bold">
              current status
            </span>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#28d96c]" />
              <span className="text-[10px] font-mono uppercase tracking-wide text-[#28d96c] font-bold">
                running
              </span>
            </div>
          </div>

          <div className="h-7 w-px bg-separator1" />

          <Button
            variant="ghost"
            size="sm"
          >
            Convert to code
            <CodeBracketsIcon className="w-3 h-3 ml-1" />
            {/* <ChevronDownSmallIcon className="w-3 h-3 ml-1" /> */}
          </Button>

          <Button
            variant="secondary"
            size="sm"
          >
            Share agent link
            <ChainLink3Icon className="w-3 h-3 mr-1" />
          </Button>

          <Button
            variant="primary"
            size="sm"
            className="disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => {
              setIsDeploymentVisible(true);
              setDeploymentStatus("deploying");
              setIsDeploymentExpanded(false);
            }}
            disabled={isDeploymentVisible && deploymentStatus === "deploying"}
          >
            Deploy agent
          </Button>
        </div>
      </ProjectPageHeader>

      {/* Two Column Layout */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Left Column - Preview Panels */}
        <div className="flex-1 flex flex-col bg-bg1 overflow-hidden min-w-0 max-w-full dot-grid-bg p-8 gap-2">
          <div className="flex items-center justify-center">
            <SegmentedControl
              value={activePanel}
              onValueChange={(value) => setActivePanel(value as "preview" | "code")}
              options={[
                { value: "preview", label: "Preview" },
                { value: "code", label: "Code" }
              ]}
              className="w-full"
            />
          </div>
          {activePanel === "preview" ? (
            <CallPreviewPanel className="flex-1 min-h-0" />
          ) : (
            <CodePreviewPanel className="flex-1 min-h-0" />
          )}
        </div>

        {/* Right Column - Deployment Panel + Config Panel */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0 max-w-full">
          {/* Deployment Panel */}
          <AnimatePresence>
            {isDeploymentVisible && (
              <DeploymentPanel
                status={deploymentStatus}
                isExpanded={isDeploymentExpanded}
                onExpandChange={setIsDeploymentExpanded}
                onStatusChange={setDeploymentStatus}
                onClose={() => {
                  setIsDeploymentVisible(false);
                  // Reset to deploying for next deployment
                  setTimeout(() => setDeploymentStatus("deploying"), 300);
                }}
              />
            )}
          </AnimatePresence>

          <motion.div
            layout
            transition={{ type: "spring" as const, damping: 28, stiffness: 320 }}
            className="flex-1 min-h-0"
          >
            <ConfigPanel
              name={config.name}
              systemInstructions={config.systemInstructions}
              welcomeMessage={config.welcomeMessage}
              enableGreeting={config.enableGreeting}
              greetingType={config.greetingType}
              allowInterrupt={config.allowInterrupt}
              language={config.language}
              pipelineMode={config.pipelineMode}
              selectedVoice={config.selectedVoice}
              realtimeProvider={config.realtimeProvider}
              realtimeModel={config.realtimeModel}
              secretName={config.secretName}
              secretKey={config.secretKey}
              llmModel={config.llmModel}
              sttService={config.sttService}
              ttsService={config.ttsService}
              tools={config.tools}
              historyItems={historyItems}
              onAddHistory={handleAddHistory}
              currentUserEmail="dylan@example.com"
              onNameChange={(value) =>
                setConfig((prev) => ({ ...prev, name: value }))
              }
              onSystemInstructionsChange={(value) =>
                setConfig((prev) => ({ ...prev, systemInstructions: value }))
              }
              onWelcomeMessageChange={(value) =>
                setConfig((prev) => ({ ...prev, welcomeMessage: value }))
              }
              onEnableGreetingChange={(value) =>
                setConfig((prev) => ({ ...prev, enableGreeting: value }))
              }
              onGreetingTypeChange={(value) =>
                setConfig((prev) => ({ ...prev, greetingType: value }))
              }
              onAllowInterruptChange={(value) =>
                setConfig((prev) => ({ ...prev, allowInterrupt: value }))
              }
              onLanguageChange={(value) =>
                setConfig((prev) => ({ ...prev, language: value }))
              }
              onPipelineModeChange={(value) =>
                setConfig((prev) => ({ ...prev, pipelineMode: value }))
              }
              onVoiceChange={(value) =>
                setConfig((prev) => ({ ...prev, selectedVoice: value }))
              }
              onRealtimeProviderChange={(value) =>
                setConfig((prev) => ({ ...prev, realtimeProvider: value }))
              }
              onRealtimeModelChange={(value) =>
                setConfig((prev) => ({ ...prev, realtimeModel: value }))
              }
              onSecretNameChange={(value) =>
                setConfig((prev) => ({ ...prev, secretName: value }))
              }
              onSecretKeyChange={(value) =>
                setConfig((prev) => ({ ...prev, secretKey: value }))
              }
              onLlmModelChange={(value) =>
                setConfig((prev) => ({ ...prev, llmModel: value }))
              }
              onSttServiceChange={(value) =>
                setConfig((prev) => ({ ...prev, sttService: value }))
              }
              onTtsServiceChange={(value) =>
                setConfig((prev) => ({ ...prev, ttsService: value }))
              }
              onToolsChange={(tools) =>
                setConfig((prev) => ({ ...prev, tools }))
              }
              className="flex-1 min-h-0"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

