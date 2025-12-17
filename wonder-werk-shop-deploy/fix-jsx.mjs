import fs from 'fs';
import path from 'path';

const toolsDir = './src/pages/tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.tsx'));

let fixed = 0;
files.forEach(file => {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern: ]}\n      <div - missing > before <div
  // Fix by adding > after ]} on lines that are part of ToolLayout props
  const pattern = /(\s*}\s*\n\s*\]}\n)(\s*<div)/g;
  
  if (pattern.test(content)) {
    content = content.replace(pattern, '$1    >\n$2');
    fs.writeFileSync(filePath, content);
    console.log(`Fixed: ${file}`);
    fixed++;
  }
});

console.log(`\nFixed ${fixed} files`);
