"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PanelHeader } from "./panel-header";
import { cn } from "@/lib/utils";
import CuteRobotIcon from "@/icons/react/CuteRobotIcon";
import MicrophoneIcon from "@/icons/react/MicrophoneIcon";
import BubbleTextIcon from "@/icons/react/BubbleTextIcon";
import CallCancelIcon from "@/icons/react/CallCancelIcon";
import ChevronDownSmallIcon from "@/icons/react/ChevronDownSmallIcon";
import ArrowUpRightIcon from "@/icons/react/ArrowUpRightIcon";

interface CallPreviewPanelProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
}

// Audio Waveform Visualizer Component
function AudioWaveform() {
  return (
    <div className="flex gap-[4px] h-[12px] items-center justify-center">
      <div className="w-[2px] h-[10px] bg-fg0 rounded-full animate-wave-1" />
      <div className="w-[2px] h-[3px] bg-fg0 rounded-full animate-wave-2" />
      <div className="w-[2px] h-[12px] bg-fg0 rounded-full animate-wave-3" />
    </div>
  );
}

// Mini Audio Visualizer for Microphone Button
function MiniAudioBars() {
  return (
    <div className="flex gap-[1.75px] h-[12px] items-center justify-center">
      <div className="w-[2px] h-[10px] bg-fg1 rounded-full" />
      <div className="w-[2px] h-[3px] bg-fg1 rounded-full" />
      <div className="w-[2px] h-[12px] bg-fg1 rounded-full" />
    </div>
  );
}

export function CallPreviewPanel({
  isExpanded,
  onToggleExpand,
  className,
}: CallPreviewPanelProps) {
  const [callState, setCallState] = useState<"idle" | "active">("idle");

  const handleStartCall = () => {
    setCallState("active");
  };

  const handleEndCall = () => {
    setCallState("idle");
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-bg1 border rounded border-separator1 overflow-hidden",
        className
      )}
    >
      <PanelHeader
        title="Preview"
        action={
          <a
            href="https://github.com/livekit-examples/agent-starter-embed"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-fg3 hover:text-fg1 hover:bg-bg2 border border-transparent transition-colors"
          >
            Embed code
            <ArrowUpRightIcon className="w-3 h-3" />
          </a>
        }
      />
      
      {/* Idle State */}
      {callState === "idle" && (
        <div className="flex-1 flex items-center justify-center p-8 min-h-0">
          <div className="flex flex-col items-center gap-6 text-center max-w-md">
            {/* Bot Icon with Sparkles */}
            <div className="relative">
              <div className="w-12 h-12 flex items-center justify-center">
                <CuteRobotIcon className="w-full h-full text-fg0" />
              </div>
              {/* Sparkle decorations */}
              <div className="absolute -top-1 -right-1 w-2 h-2 text-fg3">
                <svg viewBox="0 0 8 8" fill="currentColor">
                  <path d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5L4 0Z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 text-fg3">
                <svg viewBox="0 0 8 8" fill="currentColor">
                  <path d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5L4 0Z" />
                </svg>
              </div>
              <div className="absolute top-1 -left-2 w-1.5 h-1.5 text-fg4">
                <svg viewBox="0 0 8 8" fill="currentColor">
                  <path d="M4 0L4.5 3.5L8 4L4.5 4.5L4 8L3.5 4.5L0 4L3.5 3.5L4 0Z" />
                </svg>
              </div>
            </div>
            
            {/* Heading and Description */}
            <div className="flex flex-col gap-2">
              <h3 className="text-fg0 font-semibold text-base">Preview your agent</h3>
              <p className="text-fg3 text-sm leading-relaxed">
                Start a live test call to speak to your agent as you configure and iterate.
              </p>
            </div>
            
            {/* Start Call Button */}
            <button
              onClick={handleStartCall}
              className="font-mono text-fgAccent1 text-xs uppercase tracking-wider hover:opacity-80 transition-opacity"
            >
              Start call
            </button>
          </div>
        </div>
      )}
      
      {/* Active Call State */}
      {callState === "active" && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Top Section - Audio Waveform */}
          <div className="flex items-center justify-center py-4">
            <AudioWaveform />
          </div>
          
          {/* Middle Spacer */}
          <div className="flex-1 min-h-0" />
          
          {/* Bottom Section - Controls */}
          <div className="bg-bg1 flex flex-col rounded-sm">
            {/* Text Input Area */}
            <div className="flex gap-2 items-center p-4">
              <Input
                placeholder="Type something..."
                className="flex-1 bg-transparent border-0 text-fg3 text-sm placeholder:text-fg3 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
              <button className="bg-bg2 px-3 py-2.5 rounded-full">
                <span className="font-mono text-fg1 text-xs uppercase tracking-wider">
                  Send
                </span>
              </button>
            </div>
            
            {/* Separator */}
            <div className="px-4">
              <div className="h-px bg-separator1" />
            </div>
            
            {/* Control Buttons */}
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-2">
                {/* Microphone Button with Dropdown */}
                <button className="bg-bg2 flex items-center gap-2 px-3 py-2.5 rounded-full hover:bg-bg3 transition-colors">
                  <div className="flex items-center gap-2">
                    <MicrophoneIcon className="w-4 h-4 text-fg1" />
                    <MiniAudioBars />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-px bg-separator1" />
                    <ChevronDownSmallIcon className="w-3 h-3 text-fg1" />
                  </div>
                </button>
                
                {/* Chat Button */}
                <button className="bg-bg2 flex items-center justify-center p-2.5 rounded-full hover:bg-bg3 transition-colors">
                  <BubbleTextIcon className="w-4 h-4 text-fg1" />
                </button>
              </div>
              
              {/* End Call Button */}
              <button
                onClick={handleEndCall}
                className="bg-bgSerious1 flex items-center gap-2 px-3 py-2.5 rounded-full hover:opacity-80 transition-opacity"
              >
                <CallCancelIcon className="w-4 h-4 text-fgSerious1" />
                <span className="font-mono text-fgSerious1 text-xs uppercase tracking-wider">
                  End call
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

