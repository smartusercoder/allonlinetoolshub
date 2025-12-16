import fs from 'fs';
import path from 'path';

// Get all component files
const componentsDir = './src/pages/tools';
const componentFiles = fs.readdirSync(componentsDir)
  .filter(f => f.endsWith('.tsx'))
  .map(f => f.replace('.tsx', ''));

console.log(`Found ${componentFiles.length} component files`);

// Convert component name to tool id
function toToolId(name) {
  return name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

// Read toolsData.ts and extract existing IDs
const toolsDataContent = fs.readFileSync('./src/data/toolsData.ts', 'utf8');
const existingToolIds = new Set();
const idRegex = /id:\s*["']([^"']+)["']/g;
let match;
while ((match = idRegex.exec(toolsDataContent)) !== null) {
  existingToolIds.add(match[1]);
}
console.log(`Found ${existingToolIds.size} tools in toolsData.ts`);

// Read toolRoutes.tsx and extract existing routes
const routesContent = fs.readFileSync('./src/routes/toolRoutes.tsx', 'utf8');
const existingRoutes = new Set();
const routeRegex = /["']([a-z0-9-]+)["']:\s*lazy/g;
while ((match = routeRegex.exec(routesContent)) !== null) {
  existingRoutes.add(match[1]);
}
console.log(`Found ${existingRoutes.size} routes in toolRoutes.tsx`);

// Find missing
const allToolIds = componentFiles.map(c => toToolId(c));
const missingFromData = allToolIds.filter(id => !existingToolIds.has(id));
const missingFromRoutes = componentFiles.filter(c => !existingRoutes.has(toToolId(c)));

console.log(`\nMissing from toolsData.ts: ${missingFromData.length}`);
console.log(`Missing from toolRoutes.tsx: ${missingFromRoutes.length}`);

// Generate missing routes entries
console.log('\n--- Generating missing route entries ---');
let routeEntries = '';
missingFromRoutes.forEach(componentName => {
  const toolId = toToolId(componentName);
  routeEntries += `  "${toolId}": lazy(() => import("@/pages/tools/${componentName}")),\n`;
});

fs.writeFileSync('./missing-routes.txt', routeEntries);
console.log(`Wrote ${missingFromRoutes.length} route entries to missing-routes.txt`);

// Generate missing toolsData entries
console.log('\n--- Generating missing toolsData entries ---');
let dataEntries = '';
missingFromData.forEach(toolId => {
  const title = toolId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  dataEntries += `  { id: "${toolId}", title: "${title}", description: "${title} tool", icon: Wrench, path: "/tool/${toolId}", category: "utility", tags: ["${toolId.split('-')[0]}"], implemented: true },\n`;
});

fs.writeFileSync('./missing-data.txt', dataEntries);
console.log(`Wrote ${missingFromData.length} data entries to missing-data.txt`);
