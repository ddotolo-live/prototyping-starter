'use client';

import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Moon, Sun, Monitor } from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  // When collapsed, show icon button with popover
  if (isCollapsed) {
    const getThemeIcon = () => {
      switch (theme) {
        case 'light':
          return <Sun className="h-4 w-4" />;
        case 'dark':
          return <Moon className="h-4 w-4" />;
        default:
          return <Monitor className="h-4 w-4" />;
      }
    };

    return (
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9"
            >
              {getThemeIcon()}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-48"
          >
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Theme</h4>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme('light')}
                >
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme('dark')}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setTheme('system')}
                >
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  // When expanded, show the full select dropdown
  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="w-full" variant="primary" size="md">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  );
}
