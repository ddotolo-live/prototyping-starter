import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Reads a CSS variable from document root and converts it to a THREE.js hex number
 * @param variableName - CSS variable name (e.g., '--bgSuccess1')
 * @returns Hex number for THREE.js (e.g., 0x001905)
 */
export function getCssVariableAsHex(variableName: string): number {
  if (typeof window === 'undefined') return 0x000000;
  
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim();
  
  // Handle hex colors
  if (value.startsWith('#')) {
    return parseInt(value.slice(1), 16);
  }
  
  // Handle rgb/rgba format
  if (value.startsWith('rgb')) {
    const match = value.match(/\d+/g);
    if (match && match.length >= 3) {
      const r = parseInt(match[0]);
      const g = parseInt(match[1]);
      const b = parseInt(match[2]);
      return (r << 16) | (g << 8) | b;
    }
  }
  
  // Fallback to black
  return 0x000000;
}
