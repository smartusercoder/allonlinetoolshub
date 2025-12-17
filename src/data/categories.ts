import {
  Type, FileImage, FileText, Code2, Hash, Calculator,
  Palette, File, Globe, Search, Box, ArrowLeftRight,
  Sparkles, Music, Video, Calendar, Wrench
} from "lucide-react";
import type { CategoryMetadata } from "@/types/tool.types";

// Export Category as alias for CategoryMetadata for convenience
export type Category = CategoryMetadata;

/**
 * Centralized category definitions with rich metadata
 * Categories define how tools are organized and displayed
 */
export const categories: readonly CategoryMetadata[] = [
  { 
    id: "all", 
    name: "All Tools", 
    icon: Box, 
    color: "slate",
    description: "Browse all available tools",
    priority: 0
  },
  { 
    id: "text", 
    name: "Text Tools", 
    icon: Type, 
    color: "blue",
    description: "Text manipulation, analysis, and formatting tools",
    keywords: ["word", "character", "case", "counter", "format", "string"],
    priority: 1
  },
  { 
    id: "image", 
    name: "Image Tools", 
    icon: FileImage, 
    color: "purple",
    description: "Image editing, compression, and conversion tools",
    keywords: ["photo", "picture", "resize", "compress", "filter", "crop"],
    priority: 2
  },
  { 
    id: "pdf", 
    name: "PDF Tools", 
    icon: FileText, 
    color: "red",
    description: "PDF manipulation, conversion, and editing tools",
    keywords: ["document", "merge", "split", "compress", "convert"],
    priority: 3
  },
  { 
    id: "converter", 
    name: "Converters", 
    icon: ArrowLeftRight, 
    color: "orange",
    description: "Convert between different formats and units",
    keywords: ["convert", "transform", "encode", "decode", "unit", "format"],
    priority: 4
  },
  { 
    id: "code", 
    name: "Code/Developer", 
    icon: Code2, 
    color: "green",
    description: "Developer tools for code formatting and analysis",
    keywords: ["developer", "programming", "format", "beautify", "minify"],
    priority: 5
  },
  { 
    id: "generator", 
    name: "Generators", 
    icon: Sparkles, 
    color: "yellow",
    description: "Generate content, code, and data",
    keywords: ["create", "generate", "make", "build", "produce"],
    priority: 6
  },
  { 
    id: "color", 
    name: "Color Tools", 
    icon: Palette, 
    color: "rose",
    description: "Color palette, conversion, and design tools",
    keywords: ["palette", "picker", "gradient", "contrast", "hex", "rgb"],
    priority: 7
  },
  { 
    id: "crypto", 
    name: "Crypto/Hash", 
    icon: Hash, 
    color: "violet",
    description: "Encryption, hashing, and security tools",
    keywords: ["hash", "encrypt", "decrypt", "encode", "security", "password"],
    priority: 8
  },
  { 
    id: "math", 
    name: "Math & Finance", 
    icon: Calculator, 
    color: "emerald",
    description: "Calculators and mathematical tools",
    keywords: ["calculator", "finance", "math", "calculate", "compute"],
    priority: 9
  },
  { 
    id: "seo", 
    name: "SEO Tools", 
    icon: Search, 
    color: "amber",
    description: "SEO analysis and optimization tools",
    keywords: ["seo", "meta", "tags", "keywords", "optimize", "analytics"],
    priority: 10
  },
  { 
    id: "web", 
    name: "Web Tools", 
    icon: Globe, 
    color: "sky",
    description: "Web development and analysis tools",
    keywords: ["web", "url", "domain", "ip", "dns", "http"],
    priority: 11
  },
  { 
    id: "video", 
    name: "Video Tools", 
    icon: Video, 
    color: "pink",
    description: "Video editing and conversion tools",
    keywords: ["video", "movie", "compress", "convert", "trim"],
    priority: 12
  },
  { 
    id: "audio", 
    name: "Audio Tools", 
    icon: Music, 
    color: "indigo",
    description: "Audio processing and conversion tools",
    keywords: ["audio", "sound", "music", "convert", "mp3"],
    priority: 13
  },
  { 
    id: "date-time", 
    name: "Date & Time", 
    icon: Calendar, 
    color: "cyan",
    description: "Date, time, and timezone tools",
    keywords: ["date", "time", "timezone", "calendar", "timestamp"],
    priority: 14
  },
  { 
    id: "file", 
    name: "File Tools", 
    icon: File, 
    color: "teal",
    description: "General file manipulation tools",
    keywords: ["file", "upload", "download", "merge", "split"],
    priority: 15
  },
  { 
    id: "utility", 
    name: "Utility Tools", 
    icon: Wrench, 
    color: "slate",
    description: "General utility and miscellaneous tools",
    keywords: ["utility", "misc", "tool", "helper", "general"],
    priority: 16
  },
] as const;

/**
 * Get category by ID
 */
export const getCategoryById = (id: string): CategoryMetadata | undefined => {
  return categories.find(cat => cat.id === id);
};

/**
 * Get all non-"all" categories (actual tool categories)
 */
export const getToolCategories = (): readonly CategoryMetadata[] => {
  return categories.filter(cat => cat.id !== "all");
};

/**
 * Get categories sorted by priority
 */
export const getCategoriesByPriority = (): readonly CategoryMetadata[] => {
  return [...categories].sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));
};
