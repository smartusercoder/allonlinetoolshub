import fs from 'fs';

// Load generated new tools data
const newTools = JSON.parse(fs.readFileSync('new-tools.json', 'utf8'));
const newIconsStr = fs.readFileSync('new-icons.txt', 'utf8').trim();
const newIcons = newIconsStr.length > 0 ? newIconsStr.split(', ').map(i => i.trim()) : [];

console.log(`Updating files with ${newTools.length} new tools...`);
console.log(`Adding ${newIcons.length} new icons...`);

// =====================
// UPDATE toolsData.ts
// =====================
let toolsData = fs.readFileSync('./src/data/toolsData.ts', 'utf8');

// Add new icons to import if needed
if (newIcons.length > 0) {
  // Find the lucide-react import statement
  const iconImportMatch = toolsData.match(/(import\s*\{[\s\S]*?)\}\s*from\s*["']lucide-react["']/);
  if (iconImportMatch) {
    const existingImportBlock = iconImportMatch[1];
    // Check which icons are already imported
    const importedIcons = new Set(existingImportBlock.match(/\b[A-Z][a-zA-Z0-9]*\b/g) || []);
    const iconsToAdd = newIcons.filter(icon => !importedIcons.has(icon));
    
    if (iconsToAdd.length > 0) {
      // Add new icons before the closing brace
      const newImportBlock = existingImportBlock + ',\n  ' + iconsToAdd.join(', ');
      toolsData = toolsData.replace(/(import\s*\{[\s\S]*?)\}\s*from\s*["']lucide-react["']/, 
        newImportBlock + '\n} from "lucide-react"');
      console.log(`Added ${iconsToAdd.length} new icons to imports`);
    }
  }
}

// Generate tool entries with the full format
const toolEntries = newTools.map(tool => {
  return `  { id: "${tool.id}", title: "${tool.title}", description: "${tool.desc}", icon: ${tool.icon}, path: "/tool/${tool.id}", category: "${tool.category}", tags: ${JSON.stringify(tool.tags)}, implemented: true }`;
}).join(',\n');

// Insert before the closing bracket of the array
const arrayEndIndex = toolsData.lastIndexOf('];');
if (arrayEndIndex > 0) {
  // Check if there's already content before
  const beforeArray = toolsData.substring(0, arrayEndIndex);
  const afterArray = toolsData.substring(arrayEndIndex);
  // Add comma after last existing entry if needed
  const needsComma = beforeArray.trimEnd().endsWith('}');
  toolsData = beforeArray + (needsComma ? ',\n' : '') + toolEntries + '\n' + afterArray;
}

fs.writeFileSync('./src/data/toolsData.ts', toolsData);
console.log(`Updated toolsData.ts with ${newTools.length} tool entries`);

// =====================
// UPDATE toolRoutes.tsx
// =====================
let routesContent = fs.readFileSync('./src/routes/toolRoutes.tsx', 'utf8');

// Generate route entries in the tools object format
const routeEntries = newTools.map(tool => {
  return `  "${tool.id}": lazy(() => import("@/pages/tools/${tool.componentName}"))`;
}).join(',\n');

// Find the end of the tools object (before the closing brace and semicolon)
const toolsObjectEnd = routesContent.lastIndexOf('};');
if (toolsObjectEnd > 0) {
  const beforeEnd = routesContent.substring(0, toolsObjectEnd);
  const afterEnd = routesContent.substring(toolsObjectEnd);
  // Add comma after last existing entry if needed
  const needsComma = beforeEnd.trimEnd().endsWith(')');
  routesContent = beforeEnd + (needsComma ? ',\n' : '') + routeEntries + '\n' + afterEnd;
}

fs.writeFileSync('./src/routes/toolRoutes.tsx', routesContent);
console.log(`Updated toolRoutes.tsx with ${newTools.length} route entries`);

console.log('\nDone! Run "npm run build" to verify.');
