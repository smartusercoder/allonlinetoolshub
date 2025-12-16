#!/usr/bin/env node
// Tool deduplication checker (pure JS, no TS imports)
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/data/toolsData.ts');
const content = fs.readFileSync(filePath, 'utf8');

// Extract tools array only to avoid matching category nav IDs
const toolsArrayMatch = content.match(/export const toolsData[\s\S]*?=\s*\[([\s\S]*?)\];/);
if (!toolsArrayMatch) {
  console.error('Could not locate toolsData array');
  process.exit(1);
}
const toolsBlock = toolsArrayMatch[1];

const tools = [];
const toolRegex = /{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?path:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?}/g;
let m;
while ((m = toolRegex.exec(toolsBlock)) !== null) {
  tools.push({ id: m[1], title: m[2], path: m[3], category: m[4], index: tools.length });
}

const idMap = new Map();
const pathMap = new Map();
const duplicates = [];

tools.forEach((tool, index) => {
  if (idMap.has(tool.id)) {
    duplicates.push({ type: 'ID', id: tool.id, title: tool.title, firstIndex: idMap.get(tool.id), duplicateIndex: index, category: tool.category });
  } else {
    idMap.set(tool.id, index);
  }

  if (pathMap.has(tool.path)) {
    duplicates.push({ type: 'PATH', path: tool.path, title: tool.title, firstIndex: pathMap.get(tool.path), duplicateIndex: index, category: tool.category });
  } else {
    pathMap.set(tool.path, index);
  }
});

if (duplicates.length > 0) {
  console.log('\n❌ DUPLICATES FOUND:\n');
  duplicates.forEach(dup => {
    if (dup.type === 'ID') {
      console.log(`  - Duplicate ID "${dup.id}" (${dup.title})`);
      console.log(`    First at index ${dup.firstIndex}, duplicate at ${dup.duplicateIndex}`);
    } else {
      console.log(`  - Duplicate PATH "${dup.path}" (${dup.title})`);
      console.log(`    First at index ${dup.firstIndex}, duplicate at ${dup.duplicateIndex}`);
    }
  });
  console.log(`\n  Total duplicates: ${duplicates.length}\n`);
} else {
  console.log('\n✅ No duplicates found!\n');
}

// Category counts
const categoryCounts = {};
tools.forEach(tool => {
  categoryCounts[tool.category] = (categoryCounts[tool.category] || 0) + 1;
});

console.log('📊 Category Counts:');
Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count} tools`);
});
console.log(`\n  Total tools: ${tools.length}\n`);
