import type { Tool, ToolCategory, CategoryValidationResult } from "@/types/tool.types";
import { getToolCategories } from "@/data/categories";

/**
 * Validates tool categorization
 * Checks for undefined categories, unused categories, and consistency
 */
export function validateToolCategories(tools: readonly Tool[]): CategoryValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Get all defined category IDs (excluding "all")
  const definedCategories = new Set(
    getToolCategories().map(cat => cat.id)
  );
  
  // Track categories used by tools
  const usedCategories = new Set<string>();
  const toolsPerCategory: Record<string, number> = {};
  
  // Initialize counts
  definedCategories.forEach(catId => {
    toolsPerCategory[catId] = 0;
  });
  
  // Validate each tool
  tools.forEach((tool, index) => {
    const category = tool.category;
    
    // Check if category is defined
    if (!definedCategories.has(category)) {
      errors.push(
        `Tool "${tool.title}" (index ${index}) uses undefined category: "${category}"`
      );
    } else {
      usedCategories.add(category);
      toolsPerCategory[category] = (toolsPerCategory[category] || 0) + 1;
    }
    
    // Validate required fields
    if (!tool.id) {
      errors.push(`Tool at index ${index} missing required field: id`);
    }
    if (!tool.title) {
      errors.push(`Tool at index ${index} missing required field: title`);
    }
    if (!tool.path) {
      errors.push(`Tool at index ${index} missing required field: path`);
    }
  });
  
  // Find undefined categories (used but not defined)
  const undefinedCategories = Array.from(usedCategories)
    .filter(cat => !definedCategories.has(cat as ToolCategory));
  
  // Find unused categories (defined but not used)
  const unusedCategories = Array.from(definedCategories)
    .filter(cat => !usedCategories.has(cat));
  
  if (unusedCategories.length > 0) {
    warnings.push(
      `Unused categories (no tools assigned): ${unusedCategories.join(", ")}`
    );
  }
  
  // Category distribution warnings
  Object.entries(toolsPerCategory).forEach(([cat, count]) => {
    if (count === 0) {
      // Already covered in unused categories
    } else if (count > 100) {
      warnings.push(
        `Category "${cat}" has ${count} tools - consider splitting into subcategories`
      );
    }
  });
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalTools: tools.length,
      categorizedTools: tools.filter(t => definedCategories.has(t.category)).length,
      toolsPerCategory,
      undefinedCategories,
      unusedCategories,
    },
  };
}

/**
 * Assert that all tools have valid categories
 * Throws an error if validation fails
 */
export function assertValidCategories(tools: readonly Tool[]): void {
  const result = validateToolCategories(tools);
  
  if (!result.isValid) {
    const errorMessage = [
      "❌ Tool category validation failed:",
      "",
      ...result.errors,
      "",
      result.warnings.length > 0 ? "⚠️  Warnings:" : "",
      ...result.warnings,
    ].filter(Boolean).join("\n");
    
    throw new Error(errorMessage);
  }
  
  // Log warnings even if valid
  if (result.warnings.length > 0) {
    console.warn("⚠️  Category validation warnings:");
    result.warnings.forEach(w => console.warn(`  - ${w}`));
  }
}

/**
 * Get tools by category with type safety
 */
export function getToolsByCategory(
  tools: readonly Tool[],
  category: ToolCategory | "all"
): readonly Tool[] {
  if (category === "all") {
    return tools;
  }
  return tools.filter(tool => tool.category === category);
}

/**
 * Count tools per category
 */
export function countToolsPerCategory(tools: readonly Tool[]): Record<string, number> {
  const counts: Record<string, number> = { all: tools.length };
  
  tools.forEach(tool => {
    counts[tool.category] = (counts[tool.category] || 0) + 1;
  });
  
  return counts;
}

/**
 * Find duplicate IDs and paths
 */
export function validateDuplicates(tools: readonly Tool[]): {
  duplicateIds: { id: string; firstIndex: number; duplicateIndex: number }[];
  duplicatePaths: { path: string; firstIndex: number; duplicateIndex: number }[];
} {
  const idMap = new Map<string, number>();
  const pathMap = new Map<string, number>();
  const duplicateIds: { id: string; firstIndex: number; duplicateIndex: number }[] = [];
  const duplicatePaths: { path: string; firstIndex: number; duplicateIndex: number }[] = [];

  tools.forEach((tool, index) => {
    if (idMap.has(tool.id)) {
      duplicateIds.push({ id: tool.id, firstIndex: idMap.get(tool.id)!, duplicateIndex: index });
    } else {
      idMap.set(tool.id, index);
    }

    if (pathMap.has(tool.path)) {
      duplicatePaths.push({ path: tool.path, firstIndex: pathMap.get(tool.path)!, duplicateIndex: index });
    } else {
      pathMap.set(tool.path, index);
    }
  });

  return { duplicateIds, duplicatePaths };
}

/**
 * Assert there are no duplicate IDs or paths
 */
export function assertNoDuplicates(tools: readonly Tool[]): void {
  const { duplicateIds, duplicatePaths } = validateDuplicates(tools);
  if (duplicateIds.length === 0 && duplicatePaths.length === 0) return;

  const lines: string[] = ["❌ Duplicate tools found:"]; 

  if (duplicateIds.length > 0) {
    lines.push("", "Duplicate IDs:");
    duplicateIds.forEach(d => lines.push(`  - id="${d.id}" (first index ${d.firstIndex}, duplicate index ${d.duplicateIndex})`));
  }

  if (duplicatePaths.length > 0) {
    lines.push("", "Duplicate paths:");
    duplicatePaths.forEach(d => lines.push(`  - path="${d.path}" (first index ${d.firstIndex}, duplicate index ${d.duplicateIndex})`));
  }

  throw new Error(lines.join("\n"));
}

