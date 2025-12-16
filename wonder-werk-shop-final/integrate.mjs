import fs from 'fs';
import path from 'path';

// Read all tool definitions from JSON files
const toolsDataDir = './tools-data';
const allTools = [];

fs.readdirSync(toolsDataDir).forEach(file => {
  if (file.endsWith('.json')) {
    const data = JSON.parse(fs.readFileSync(path.join(toolsDataDir, file), 'utf8'));
    allTools.push(...data);
  }
});

console.log(`Loaded ${allTools.length} tool definitions`);

// Read existing toolsData.ts
const toolsDataPath = './src/data/toolsData.ts';
let toolsDataContent = fs.readFileSync(toolsDataPath, 'utf8');

// Find existing tool IDs using regex
const existingIds = new Set();
const idRegex = /id:\s*["']([^"']+)["']/g;
let match;
while ((match = idRegex.exec(toolsDataContent)) !== null) {
  existingIds.add(match[1]);
}
console.log(`Found ${existingIds.size} existing tool entries`);

// Find missing tools
const missingTools = allTools.filter(t => !existingIds.has(t.id));
console.log(`Missing tools: ${missingTools.length}`);

// Collect all icons needed
const existingIcons = new Set();
const iconImportRegex = /import\s*{([^}]+)}\s*from\s*["']lucide-react["']/;
const iconMatch = toolsDataContent.match(iconImportRegex);
if (iconMatch) {
  iconMatch[1].split(',').forEach(icon => {
    existingIcons.add(icon.trim());
  });
}

const neededIcons = new Set();
missingTools.forEach(t => {
  if (t.icon && !existingIcons.has(t.icon)) {
    neededIcons.add(t.icon);
  }
});
console.log(`New icons needed: ${neededIcons.size}`);

// Map category names
const categoryMap = {
  'math': 'calculators',
  'converter': 'converters',
  'text': 'text',
  'image': 'image',
  'code': 'developer',
  'crypto': 'security',
  'seo': 'seo',
  'generator': 'generators',
  'web': 'web',
  'color': 'design',
  'date-time': 'time',
  'video': 'media',
  'audio': 'media',
  'pdf': 'document',
  'file': 'file'
};

// Helper to convert id to component name
function toComponentName(id) {
  return id.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

// Generate new tool entries
let newEntries = '';
missingTools.forEach(tool => {
  const category = categoryMap[tool.category] || tool.category;
  const componentName = toComponentName(tool.id);
  const tags = tool.tags ? tool.tags.map(t => `"${t}"`).join(', ') : '';
  
  newEntries += `    {
        id: "${tool.id}",
        name: "${tool.title}",
        description: "${tool.desc}",
        category: "${category}",
        icon: ${tool.icon || 'Wrench'},
        component: lazy(() => import("@/pages/tools/${componentName}")),
        tags: [${tags}]
    },
`;
});

// Find the toolsData array end and insert before it
const arrayEndRegex = /(\];\s*export\s+(?:default\s+)?toolsData)/;
if (arrayEndRegex.test(toolsDataContent)) {
  toolsDataContent = toolsDataContent.replace(arrayEndRegex, newEntries + '$1');
} else {
  // Try to find just the closing bracket before export
  const simpleEndRegex = /(\n\];\s*\n)/;
  toolsDataContent = toolsDataContent.replace(simpleEndRegex, newEntries + '$1');
}

// Add new icon imports
if (neededIcons.size > 0) {
  const newIconsArray = Array.from(neededIcons).sort();
  const existingIconsArray = Array.from(existingIcons).sort();
  const allIconsArray = [...new Set([...existingIconsArray, ...newIconsArray])].sort();
  
  const newImportLine = `import { ${allIconsArray.join(', ')} } from "lucide-react";`;
  toolsDataContent = toolsDataContent.replace(iconImportRegex, newImportLine);
}

// Write updated toolsData.ts
fs.writeFileSync(toolsDataPath, toolsDataContent);
console.log('Updated toolsData.ts');

// Now update toolRoutes.tsx
const routesPath = './src/routes/toolRoutes.tsx';
let routesContent = fs.readFileSync(routesPath, 'utf8');

// Find existing route paths
const existingRoutes = new Set();
const routeRegex = /path:\s*["']\/tools\/([^"']+)["']/g;
while ((match = routeRegex.exec(routesContent)) !== null) {
  existingRoutes.add(match[1]);
}
console.log(`Found ${existingRoutes.size} existing routes`);

// Generate new routes
const missingRoutes = missingTools.filter(t => !existingRoutes.has(t.id));
console.log(`Missing routes: ${missingRoutes.length}`);

let newRoutes = '';
missingRoutes.forEach(tool => {
  const componentName = toComponentName(tool.id);
  newRoutes += `        {
            path: "/tools/${tool.id}",
            element: <Suspense fallback={<ToolLoading />}><${componentName} /></Suspense>
        },
`;
});

// Add lazy imports for new components
let newImports = '';
missingRoutes.forEach(tool => {
  const componentName = toComponentName(tool.id);
  newImports += `const ${componentName} = lazy(() => import("@/pages/tools/${componentName}"));\n`;
});

// Find where to insert imports (after existing lazy imports)
const lastLazyImportRegex = /(const \w+ = lazy\(\(\) => import\("[^"]+"\)\);\n)+/g;
let lastMatch = null;
while ((match = lastLazyImportRegex.exec(routesContent)) !== null) {
  lastMatch = match;
}

if (lastMatch) {
  const insertPos = lastMatch.index + lastMatch[0].length;
  routesContent = routesContent.slice(0, insertPos) + newImports + routesContent.slice(insertPos);
}

// Find where to insert routes (before closing of children array)
const childrenEndRegex = /(\s*\]\s*}\s*\])/;
routesContent = routesContent.replace(childrenEndRegex, newRoutes + '$1');

// Write updated routes
fs.writeFileSync(routesPath, routesContent);
console.log('Updated toolRoutes.tsx');

console.log('\nIntegration complete!');
console.log(`Total tools: ${existingIds.size + missingTools.length}`);
