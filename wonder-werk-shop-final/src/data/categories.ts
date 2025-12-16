import {
  Type, FileImage, FileText, Code2, Hash, Calculator,
  Palette, File, Globe, Search, Box, ArrowLeftRight,
  Sparkles, Music, Video, Calendar, Shield, Briefcase,
  Heart, BookOpen, Gamepad2, Share2, Layout, Database,
  Smartphone, Languages, Cpu, Camera, MessageSquare, 
  TrendingUp, Users, Plane, ShoppingCart, Wrench
} from "lucide-react";
import type { CategoryMetadata } from "@/types/tool.types";

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
    name: "Security & Crypto", 
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
    id: "business",
    name: "Business Tools",
    icon: Briefcase,
    color: "slate",
    description: "Business and productivity tools",
    keywords: ["invoice", "report", "business", "productivity", "work"],
    priority: 16
  },
  {
    id: "health",
    name: "Health & Fitness",
    icon: Heart,
    color: "red",
    description: "Health, fitness, and wellness calculators",
    keywords: ["health", "fitness", "bmi", "calories", "wellness"],
    priority: 17
  },
  {
    id: "education",
    name: "Education",
    icon: BookOpen,
    color: "blue",
    description: "Educational and learning tools",
    keywords: ["learn", "study", "education", "quiz", "flashcard"],
    priority: 18
  },
  {
    id: "social",
    name: "Social Media",
    icon: Share2,
    color: "pink",
    description: "Social media optimization tools",
    keywords: ["social", "facebook", "twitter", "instagram", "youtube"],
    priority: 19
  },
  {
    id: "design",
    name: "Design Tools",
    icon: Layout,
    color: "purple",
    description: "Design and UI/UX tools",
    keywords: ["design", "ui", "ux", "layout", "mockup"],
    priority: 20
  },
  {
    id: "data",
    name: "Data Tools",
    icon: Database,
    color: "green",
    description: "Data processing and analysis tools",
    keywords: ["data", "csv", "excel", "database", "analysis"],
    priority: 21
  },
  {
    id: "mobile",
    name: "Mobile Tools",
    icon: Smartphone,
    color: "gray",
    description: "Mobile app and device tools",
    keywords: ["mobile", "app", "android", "ios", "device"],
    priority: 22
  },
  {
    id: "language",
    name: "Language Tools",
    icon: Languages,
    color: "indigo",
    description: "Language and translation tools",
    keywords: ["translate", "language", "grammar", "spell", "dictionary"],
    priority: 23
  },
  {
    id: "network",
    name: "Network Tools",
    icon: Cpu,
    color: "orange",
    description: "Network and connectivity tools",
    keywords: ["network", "ip", "dns", "ping", "port"],
    priority: 24
  },
  {
    id: "photography",
    name: "Photography",
    icon: Camera,
    color: "amber",
    description: "Photography and camera tools",
    keywords: ["photo", "camera", "exposure", "lens", "exif"],
    priority: 25
  },
  {
    id: "writing",
    name: "Writing Tools",
    icon: MessageSquare,
    color: "teal",
    description: "Writing and content creation tools",
    keywords: ["write", "blog", "content", "article", "copy"],
    priority: 26
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: TrendingUp,
    color: "rose",
    description: "Marketing and analytics tools",
    keywords: ["marketing", "analytics", "campaign", "ads", "roi"],
    priority: 27
  },
  {
    id: "hr",
    name: "HR & Payroll",
    icon: Users,
    color: "cyan",
    description: "Human resources and payroll tools",
    keywords: ["hr", "payroll", "salary", "employee", "tax"],
    priority: 28
  },
  {
    id: "travel",
    name: "Travel Tools",
    icon: Plane,
    color: "sky",
    description: "Travel and planning tools",
    keywords: ["travel", "flight", "hotel", "currency", "timezone"],
    priority: 29
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    icon: ShoppingCart,
    color: "emerald",
    description: "E-commerce and shopping tools",
    keywords: ["shop", "price", "discount", "product", "commerce"],
    priority: 30
  },
  {
    id: "utility",
    name: "Utilities",
    icon: Wrench,
    color: "gray",
    description: "General utility tools",
    keywords: ["utility", "tool", "helper", "misc", "other"],
    priority: 31
  },
  {
    id: "fun",
    name: "Fun & Games",
    icon: Gamepad2,
    color: "violet",
    description: "Entertainment and fun tools",
    keywords: ["fun", "game", "random", "quiz", "entertainment"],
    priority: 32
  }
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
