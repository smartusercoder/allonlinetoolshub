import type { LucideIcon } from "lucide-react";

/**
 * Tool category identifiers
 * These must match the category IDs in the categories array
 */
export type ToolCategory = 
  | "text"
  | "image" 
  | "pdf"
  | "code"
  | "converter"
  | "generator"
  | "crypto"
  | "file"
  | "date-time"
  | "math"
  | "web"
  | "color"
  | "seo"
  | "video"
  | "audio"
  | "utility";

/**
 * Tool interface with strict typing
 */
export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: ToolCategory;
  tags: string[];
  implemented?: boolean;
  lastModified?: string; // ISO date string for last update
  featured?: boolean; // High-priority tool for SEO and visibility
  priority?: "high" | "medium" | "low"; // Traffic-based priority
}

/**
 * Enhanced category metadata
 */
export interface CategoryMetadata {
  readonly id: ToolCategory | "all";
  readonly name: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly description?: string;
  readonly keywords?: readonly string[];
  readonly priority?: number; // Lower number = higher priority for display order
}

/**
 * Category with tool count
 */
export interface CategoryWithCount extends CategoryMetadata {
  count: number;
}

/**
 * Validation result for category checks
 */
export interface CategoryValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalTools: number;
    categorizedTools: number;
    toolsPerCategory: Record<string, number>;
    undefinedCategories: string[];
    unusedCategories: string[];
  };
}
