#!/usr/bin/env node
/**
 * Enhanced tool validation script
 * Validates toolsData.ts for:
 * - Duplicate IDs and paths
 * - Undefined categories
 * - Unused categories
 * - Category distribution
 */
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/data/toolsData.ts');
const categoriesPath = path.resolve('./src/data/categories.ts');

// Check if files exist
if (!fs.existsSync(filePath)) {
  console.error('❌ ERROR: toolsData.ts not found');
  process.exit(1);
}

if (!fs.existsSync(categoriesPath)) {
  console.error('❌ ERROR: categories.ts not found');
  process.exit(1);
}

const content = fs.readFileSync(filePath, 'utf8');
const categoriesContent = fs.readFileSync(categoriesPath, 'utf8');

// Extract tools array
const toolsArrayMatch = content.match(/export const toolsData[:\s]*(?:readonly\s*)?Tool\[\]\s*=\s*\[([\s\S]*?)\];/);
if (!toolsArrayMatch) {
  console.error('❌ ERROR: Could not locate toolsData array');
  process.exit(1);
}
const toolsBlock = toolsArrayMatch[1];

// Extract tools
const tools = [];
const toolRegex = /{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?path:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?}/g;
let m;
while ((m = toolRegex.exec(toolsBlock)) !== null) {
  tools.push({ id: m[1], title: m[2], path: m[3], category: m[4] });
}

// Extract defined categories
const categoriesMatch = categoriesContent.match(/export const categories[:\s]*(?:readonly\s*)?.*?\[\s*([\s\S]*?)\]\s*as const;/);
if (!categoriesMatch) {
  console.error('❌ ERROR: Could not locate categories array');
  process.exit(1);
}

const categoriesBlock = categoriesMatch[1];
const categoryRegex = /{\s*id:\s*"([^"]+)"/g;
const definedCategories = new Set();
while ((m = categoryRegex.exec(categoriesBlock)) !== null) {
  if (m[1] !== 'all') {
    definedCategories.add(m[1]);
  }
}

console.log('\n🔍 VALIDATING TOOLS AND CATEGORIES...\n');

// Check for duplicates
const idMap = new Map();
const pathMap = new Map();
const duplicates = [];

tools.forEach((tool, index) => {
  if (idMap.has(tool.id)) {
    duplicates.push({ type: 'ID', id: tool.id, title: tool.title, first: idMap.get(tool.id), duplicate: index });
  } else {
    idMap.set(tool.id, index);
  }

  if (pathMap.has(tool.path)) {
    duplicates.push({ type: 'PATH', path: tool.path, title: tool.title, first: pathMap.get(tool.path), duplicate: index });
  } else {
    pathMap.set(tool.path, index);
  }
});

// Check categories
const usedCategories = new Set();
const categoryCounts = {};
const invalidCategories = [];

tools.forEach((tool, index) => {
  usedCategories.add(tool.category);
  categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
  
  if (!definedCategories.has(tool.category)) {
    invalidCategories.push({ tool: tool.title, category: tool.category, index });
  }
});

const unusedCategories = [...definedCategories].filter(cat => !usedCategories.has(cat));

// Report results
let hasErrors = false;

if (duplicates.length > 0) {
  hasErrors = true;
  console.log('❌ DUPLICATE ENTRIES FOUND:\n');
  duplicates.forEach(dup => {
    if (dup.type === 'ID') {
      console.log(`  - Duplicate ID "${dup.id}" (${dup.title})`);
      console.log(`    First at index ${dup.first}, duplicate at ${dup.duplicate}`);
    } else {
      console.log(`  - Duplicate PATH "${dup.path}" (${dup.title})`);
      console.log(`    First at index ${dup.first}, duplicate at ${dup.duplicate}`);
    }
  });
  console.log('');
}

if (invalidCategories.length > 0) {
  hasErrors = true;
  console.log('❌ TOOLS WITH UNDEFINED CATEGORIES:\n');
  invalidCategories.forEach(({ tool, category, index }) => {
    console.log(`  - "${tool}" at index ${index} uses undefined category: "${category}"`);
  });
  console.log('');
}

if (unusedCategories.length > 0) {
  console.log('⚠️  UNUSED CATEGORIES (no tools assigned):\n');
  unusedCategories.forEach(cat => {
    console.log(`  - "${cat}"`);
  });
  console.log('');
}

// Category distribution
console.log('📊 CATEGORY DISTRIBUTION:\n');
Object.entries(categoryCounts)
  .sort((a, b) => b[1] - a[1])
  .forEach(([cat, count]) => {
    const status = definedCategories.has(cat) ? '✓' : '✗';
    console.log(`  ${status} ${cat}: ${count} tools`);
  });

console.log(`\n📈 SUMMARY:`);
console.log(`  Total tools: ${tools.length}`);
console.log(`  Defined categories: ${definedCategories.size}`);
console.log(`  Used categories: ${usedCategories.size}`);
console.log(`  Duplicates: ${duplicates.length}`);
console.log(`  Invalid categories: ${invalidCategories.length}`);
console.log('');

if (hasErrors) {
  console.log('❌ VALIDATION FAILED\n');
  process.exit(1);
} else {
  console.log('✅ VALIDATION PASSED\n');
  process.exit(0);
}
