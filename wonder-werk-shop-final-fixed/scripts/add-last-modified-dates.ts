import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

// Generate dates going back from today
const generateDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

const toolsDataPath = join(process.cwd(), 'src', 'data', 'toolsData.ts');
let content = readFileSync(toolsDataPath, 'utf-8');

// Add lastModified to tools that don't have it
let dayCounter = 0;
content = content.replace(
  /implemented: true\s*$/gm,
  () => {
    const date = generateDate(dayCounter);
    dayCounter++;
    return `implemented: true,\n    lastModified: "${date}"`;
  }
);

writeFileSync(toolsDataPath, content, 'utf-8');
console.log('✅ Added lastModified dates to all tools');
