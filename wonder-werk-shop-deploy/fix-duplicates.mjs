import fs from 'fs';

// Fix toolRoutes.tsx
let content = fs.readFileSync('./src/routes/toolRoutes.tsx', 'utf8');

// Extract the tools object
const toolsMatch = content.match(/const tools:[\s\S]*?= \{([\s\S]*?)\};/);
if (toolsMatch) {
  const toolsBlock = toolsMatch[1];
  const lines = toolsBlock.split('\n');
  
  const seen = new Set();
  const uniqueLines = [];
  
  for (const line of lines) {
    const keyMatch = line.match(/"([^"]+)":\s*lazy/);
    if (keyMatch) {
      const key = keyMatch[1];
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      } else {
        console.log(`Removing duplicate: ${key}`);
      }
    } else {
      // Keep comments and empty lines
      uniqueLines.push(line);
    }
  }
  
  const newToolsBlock = uniqueLines.join('\n');
  content = content.replace(/const tools:[\s\S]*?= \{[\s\S]*?\};/, 
    `const tools: Record<string, React.LazyExoticComponent<ComponentType<any>>> = {${newToolsBlock}};`);
  
  fs.writeFileSync('./src/routes/toolRoutes.tsx', content);
  console.log(`Fixed toolRoutes.tsx - kept ${seen.size} unique tools`);
}

// Fix toolsData.ts - remove duplicate IDs
let dataContent = fs.readFileSync('./src/data/toolsData.ts', 'utf8');

// Find all tool entries and deduplicate
const toolEntryRegex = /\{\s*id:\s*"([^"]+)"[^}]+\}/g;
const seenIds = new Set();
const matches = [...dataContent.matchAll(toolEntryRegex)];
const duplicateIds = [];

for (const match of matches) {
  const id = match[1];
  if (seenIds.has(id)) {
    duplicateIds.push(id);
  } else {
    seenIds.add(id);
  }
}

if (duplicateIds.length > 0) {
  console.log(`Found ${duplicateIds.length} duplicate IDs in toolsData.ts`);
  
  // Remove duplicate entries (keep first occurrence)
  for (const dupId of duplicateIds) {
    // Find all occurrences and remove all but the first
    const regex = new RegExp(`\\{\\s*id:\\s*"${dupId}"[^}]+\\},?\\n?`, 'g');
    let firstFound = false;
    dataContent = dataContent.replace(regex, (match) => {
      if (!firstFound) {
        firstFound = true;
        return match;
      }
      console.log(`Removing duplicate tool: ${dupId}`);
      return '';
    });
  }
  
  fs.writeFileSync('./src/data/toolsData.ts', dataContent);
  console.log(`Fixed toolsData.ts`);
}

console.log('Done fixing duplicates!');
