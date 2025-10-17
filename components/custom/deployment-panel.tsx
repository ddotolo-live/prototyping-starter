"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LoaderIcon, ChevronTopSmallIcon, CircleCheckIcon, CircleXIcon } from "@/icons/react";
import { Button } from "@/components/ui/button";
import { BackgroundPattern } from "@/components/custom/BackgroundPattern";

export interface DeploymentPanelProps {
  status: "deploying" | "success";
  isExpanded: boolean;
  onExpandChange: (expanded: boolean) => void;
  onStatusChange: (status: "deploying" | "success") => void;
  onClose: () => void;
  className?: string;
}

interface DeploymentLog {
  timestamp: string;
  message: string;
}

// Mock deployment logs matching the Figma design
const mockDeploymentLogs: DeploymentLog[] = [
  { timestamp: "2025-06-17T19:34:55.310Z", message: "[+] Building 83.1s (20/20) FINISHED" },
  { timestamp: "2025-06-17T19:34:55.574Z", message: "=> [ 1/20] FROM docker.io/library/node:18-alpine" },
  { timestamp: "2025-06-17T19:34:55.574Z", message: "=> => resolve docker.io/library/node:18-alpine@sha256:4b..." },
  { timestamp: "2025-06-17T19:34:55.574Z", message: "=> => sha256:4bfbe15b3e0133f5e1103c9cf6d7f..." },
  { timestamp: "2025-06-17T19:34:55.680Z", message: "=> => sha256:8a7d8e3b2c9f6e1a4d5c9b8f7e6d5..." },
  { timestamp: "2025-06-17T19:34:55.780Z", message: "=> => extracting sha256:4bfbe15b3e0133f5e1103c..." },
  { timestamp: "2025-06-17T19:34:55.890Z", message: "=> => extracting sha256:8a7d8e3b2c9f6e1a4d5c9..." },
  { timestamp: "2025-06-17T19:34:56.010Z", message: "=> [ 2/20] RUN adduser --disabled-password --gecos '' appuser" },
  { timestamp: "2025-06-17T19:34:56.120Z", message: "=> [ 3/20] RUN apt-get update && apt-get install -y curl" },
  { timestamp: "2025-06-17T19:34:56.230Z", message: "=> [ 4/20] RUN apt-get install -y build-essential" },
  { timestamp: "2025-06-17T19:34:56.340Z", message: "=> [ 5/20] RUN apt-get install -y python3 python3-pip" },
  { timestamp: "2025-06-17T19:34:56.450Z", message: "=> [ 6/20] RUN mkdir -p /home/appuser/app" },
  { timestamp: "2025-06-17T19:34:56.560Z", message: "=> [ 7/20] RUN chown -R appuser:appuser /home/appuser" },
  { timestamp: "2025-06-17T19:34:56.670Z", message: "=> [ 8/20] WORKDIR /home/appuser/app" },
  { timestamp: "2025-06-17T19:34:56.780Z", message: "=> [ 9/20] COPY package*.json ./" },
  { timestamp: "2025-06-17T19:34:56.890Z", message: "=> [10/20] RUN npm ci --only=production" },
  { timestamp: "2025-06-17T19:34:57.000Z", message: "=> [11/20] RUN npm cache clean --force" },
  { timestamp: "2025-06-17T19:34:57.110Z", message: "=> [12/20] COPY requirements.txt ." },
  { timestamp: "2025-06-17T19:34:57.220Z", message: "=> [13/20] RUN pip install --no-cache-dir -r requirements.txt" },
  { timestamp: "2025-06-17T19:34:57.330Z", message: "=> [14/20] COPY --chown=appuser:appuser . ." },
  { timestamp: "2025-06-17T19:34:57.440Z", message: "=> [15/20] RUN chmod +x /home/appuser/app/entrypoint.sh" },
  { timestamp: "2025-06-17T19:34:57.550Z", message: "=> [16/20] USER appuser" },
  { timestamp: "2025-06-17T19:34:57.660Z", message: "=> [17/20] EXPOSE 8080" },
  { timestamp: "2025-06-17T19:34:57.770Z", message: "=> [18/20] ENV NODE_ENV=production" },
  { timestamp: "2025-06-17T19:34:57.880Z", message: "=> [19/20] HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8080/health" },
  { timestamp: "2025-06-17T19:34:57.990Z", message: "=> [20/20] CMD ['sh', 'entrypoint.sh']" },
  { timestamp: "2025-06-17T19:34:58.100Z", message: "=> exporting to image" },
  { timestamp: "2025-06-17T19:34:58.210Z", message: "=> => exporting layers 0/5" },
  { timestamp: "2025-06-17T19:34:58.320Z", message: "=> => exporting layers 3/5" },
  { timestamp: "2025-06-17T19:34:58.430Z", message: "=> => exporting layers 5/5 done" },
  { timestamp: "2025-06-17T19:34:58.540Z", message: "=> => writing image sha256:abc123def456789..." },
  { timestamp: "2025-06-17T19:34:58.650Z", message: "=> => naming to docker.io/library/sally-agent:latest" },
  { timestamp: "2025-06-17T19:34:58.760Z", message: "=> pushing image to registry" },
  { timestamp: "2025-06-17T19:34:58.870Z", message: "=> => pushing layer sha256:4bfbe15b3e..." },
  { timestamp: "2025-06-17T19:34:58.980Z", message: "=> => pushing layer sha256:8a7d8e3b2c..." },
  { timestamp: "2025-06-17T19:34:59.090Z", message: "✓ Deployment manifest created" },
  { timestamp: "2025-06-17T19:34:59.200Z", message: "✓ Container registry updated" },
  { timestamp: "2025-06-17T19:34:59.310Z", message: "✓ Health checks passed" },
];

// Format timestamp to display only time
function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toTimeString().split(" ")[0];
}

export function DeploymentPanel({
  status,
  isExpanded,
  onExpandChange,
  onStatusChange,
  onClose,
  className,
}: DeploymentPanelProps) {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [visibleLogs, setVisibleLogs] = React.useState<DeploymentLog[]>([]);
  const [containerWidth, setContainerWidth] = React.useState(0);
  const [triggerRipple, setTriggerRipple] = React.useState(false);

  // Measure container width for BackgroundPattern
  React.useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll to bottom when logs update
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  // 10-second timer to transition from deploying to success
  React.useEffect(() => {
    if (status === "deploying") {
      const timer = setTimeout(() => {
        onStatusChange("success");
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [status, onStatusChange]);

  // Trigger ripple effect when transitioning to success state
  React.useEffect(() => {
    if (status === "success" && !prefersReducedMotion) {
      // Delay slightly after icon animation (200ms)
      const timer = setTimeout(() => {
        setTriggerRipple(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [status, prefersReducedMotion]);

  // Progressive log streaming animation
  React.useEffect(() => {
    if (status === "deploying") {
      setVisibleLogs([]); // Reset logs
      
      // If reduced motion, show all logs immediately
      if (prefersReducedMotion) {
        setVisibleLogs(mockDeploymentLogs);
        return;
      }
      
      // Progressive reveal for full motion
      let currentIndex = 0;
      const timeouts: NodeJS.Timeout[] = [];

      const revealNextLog = () => {
        if (currentIndex < mockDeploymentLogs.length) {
          const logToAdd = mockDeploymentLogs[currentIndex];
          if (logToAdd) {
            setVisibleLogs((prev) => [...prev, logToAdd]);
          }
          currentIndex++;
          
          // Variable timing for realism (150-300ms range)
          const delay = 150 + Math.random() * 150;
          const timeout = setTimeout(revealNextLog, delay);
          timeouts.push(timeout);
        }
      };

      revealNextLog();

      // Cleanup function to clear all timeouts
      return () => {
        timeouts.forEach((timeout) => clearTimeout(timeout));
      };
    }
  }, [status, prefersReducedMotion]);

  const collapsedHeight = 150;
  const expandedHeight = 350;
  const successHeight = 60;

  // Determine current height based on status
  const currentHeight = status === "success" 
    ? successHeight 
    : (isExpanded ? expandedHeight : collapsedHeight);

  // Animation variants for panel entrance/exit
  const panelVariants = {
    initial: { 
      y: -20, 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.98 
    },
    animate: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      height: currentHeight
    },
    exit: { 
      opacity: 0 
    }
  };

  // Spring transition for panel
  const panelTransition = prefersReducedMotion 
    ? { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] as const } // ease-out
    : { 
        type: "spring" as const, 
        damping: 28, 
        stiffness: 320,
        height: { type: "spring" as const, damping: 30, stiffness: 350 }
      };

  // Instant exit transition for snappy close behavior
  const exitTransition = { 
    duration: 0.05, 
    ease: [0.0, 0.0, 0.2, 1] as const 
  };

  // Success icon animation variants
  const successIconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: prefersReducedMotion
      ? { scale: 1, opacity: 1 }
      : { scale: 1, opacity: 1 }
  };

  const successIconTransition = prefersReducedMotion
    ? { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] as const }
    : { type: "spring" as const, damping: 15, stiffness: 200 };

  // Success text animation variants
  const successTextVariants = {
    initial: { y: 4, opacity: 0 },
    animate: { y: 0, opacity: 1 }
  };

  const successTextTransition = prefersReducedMotion
    ? { duration: 0.2, ease: [0.0, 0.0, 0.2, 1] as const }
    : { type: "spring" as const, damping: 25, stiffness: 300, delay: 0.08 };

  return (
    <motion.div
      ref={containerRef}
      initial={panelVariants.initial}
      animate={panelVariants.animate}
      exit={panelVariants.exit}
      transition={{
        ...panelTransition,
        opacity: exitTransition
      }}
      className={cn(
        "flex flex-col border-l border-b border-separator1 overflow-hidden",
        status === "success" ? "bg-bgSuccess1" : "bg-bg1",
        className
      )}
    >
      {/* Header */}
      {status === "success" ? (
        // Success State Header with choreographed animation and background pattern
        <div className="relative flex-shrink-0" style={{ height: successHeight, overflow: 'visible' }}>
          {/* BackgroundPattern Layer */}
          {containerWidth > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.3, ease: [0.0, 0.0, 0.2, 1] as const }
                  : { type: "spring" as const, damping: 25, stiffness: 200, delay: 0.1 }
              }
              className="absolute inset-0 overflow-hidden"
            >
              <BackgroundPattern
                width={containerWidth}
                height={successHeight}
                animationDelay={0}
                colors={{
                  off: 0x0a1a0f,      // Darker green/gray
                  light: 0x2d5a3d,    // Muted success green
                  accent: 0x4ade80,   // Bright success green
                }}
                triggerRipple={triggerRipple}
              />
            </motion.div>
          )}
          
          {/* Pulse Wave Effect */}
          {triggerRipple && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ zIndex: 5 }}
            >
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ 
                  scale: 8,
                  opacity: 0 
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0.8, ease: [0.0, 0.0, 0.2, 1] as const }
                    : { duration: 1.2, ease: [0.0, 0.0, 0.2, 1] as const }
                }
                className="w-32 h-32 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(74, 222, 128, 0.6) 0%, rgba(74, 222, 128, 0.3) 30%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
              />
            </motion.div>
          )}
          
          {/* Content Layer */}
          <div className="relative z-10 flex items-center justify-between px-4 py-4 h-full">
            <div className="flex items-center gap-2">
              <motion.div
                variants={successIconVariants}
                initial="initial"
                animate="animate"
                transition={successIconTransition}
              >
                <CircleCheckIcon className="w-4 h-4 text-fgSuccess" />
              </motion.div>
              <motion.h3
                variants={successTextVariants}
                initial="initial"
                animate="animate"
                transition={successTextTransition}
                className="text-sm font-semibold text-fgSuccess"
              >
                Your agent has been deployed
              </motion.h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0 hover:bg-bgSuccess2"
              onClick={onClose}
            >
              <CircleXIcon className="w-4 h-4 text-fgSuccess" />
            </Button>
          </div>
        </div>
      ) : (
        // Deploying State Header
        <div className="flex items-center justify-between px-4 py-3 border-b border-separator1 flex-shrink-0">
          <div className="flex items-center gap-2">
            <LoaderIcon className="w-4 h-4 text-fg1 animate-spin" />
            <div className="flex flex-col">
              <h3 className="text-sm font-semibold text-fg1">
                Your agent is being deployed
              </h3>
              <p className="text-xs text-fg3">
                Optional description text can go here.
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-bg2"
            onClick={() => onExpandChange(!isExpanded)}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : 180 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15, ease: [0.0, 0.0, 0.2, 1] as const }
                  : { type: "spring" as const, damping: 25, stiffness: 300 }
              }
            >
              <ChevronTopSmallIcon className="w-4 h-4 text-fg1" />
            </motion.div>
          </Button>
        </div>
      )}

      {/* Terminal Logs Container - Only show in deploying state */}
      {status === "deploying" && (
        <div className="relative flex-1 min-h-0">
          <div
            ref={scrollContainerRef}
            className="absolute inset-0 overflow-auto px-4 py-3"
          >
            <div className="flex flex-col gap-0.5 font-mono">
              {visibleLogs.filter(log => log != null).map((log, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.0, 0.0, 0.2, 1] as const }}
                  className="flex items-start gap-3 text-xs leading-relaxed"
                >
                  <span className="text-fg4 shrink-0">
                    {formatTimestamp(log.timestamp)}
                  </span>
                  <span className="text-fg1 break-all">{log.message}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gradient Overlay - Only visible in collapsed state */}
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                prefersReducedMotion
                  ? { duration: 0.15, ease: [0.0, 0.0, 0.2, 1] as const }
                  : { duration: 0.25, ease: [0.0, 0.0, 0.2, 1] as const }
              }
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg1 to-transparent pointer-events-none"
            />
          )}
        </div>
      )}
    </motion.div>
  );
}

