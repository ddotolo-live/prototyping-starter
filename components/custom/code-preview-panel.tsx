"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { PanelHeader } from "./panel-header";
import { sampleAgentCode } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CopyIcon } from "lucide-react";

interface CodePreviewPanelProps {
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
}

export function CodePreviewPanel({
  isExpanded,
  onToggleExpand,
  className,
}: CodePreviewPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col bg-bg1 border rounded border-separator1 overflow-hidden",
        className
      )}
    >
      <PanelHeader
        title="Code"
        action={
          <a
            href="https://github.com/livekit-examples/agent-starter-embed/blob/main/agent.py"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-fg3 hover:text-fg1 hover:bg-bg2 border border-transparent transition-colors"
          >
            Copy agent.py
            <CopyIcon className="w-3 h-3" />
          </a>
        }
      />
      <div className="flex-1 overflow-auto min-h-0">
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          lineNumberStyle={{
            minWidth: "3em",
            paddingRight: "1em",
            color: "#666666",
            userSelect: "none",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            },
          }}
        >
          {sampleAgentCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

