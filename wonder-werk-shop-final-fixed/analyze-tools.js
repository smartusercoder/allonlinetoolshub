// Analyze toolsData for duplicates and category issues
const fs = require('fs');

// Read the file
const content = fs.readFileSync('./src/data/toolsData.ts', 'utf8');

// Extract all tool objects
const toolMatches = content.matchAll(/{\s*id:\s*"([^"]+)"[\s\S]*?category:\s*"([^"]+)"[\s\S]*?}/g);
const tools = [];
const idMap = new Map();
const categoryCount = {};

for (const match of toolMatches) {
  const id = match[1];
  const category = match[2];
  
  tools.push({ id, category });
  
  if (idMap.has(id)) {
    console.log(`DUPLICATE ID: ${id}`);
    idMap.get(id).push(category);
  } else {
    idMap.set(id, [category]);
  }
  
  categoryCount[category] = (categoryCount[category] || 0) + 1;
}

console.log('\n=== CATEGORY COUNTS ===');
Object.entries(categoryCount).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`${cat}: ${count} tools`);
});

console.log('\n=== DUPLICATE IDS ===');
let duplicates = 0;
idMap.forEach((categories, id) => {
  if (categories.length > 1) {
    console.log(`${id}: appears ${categories.length} times in categories: ${categories.join(', ')}`);
    duplicates++;
  }
});

console.log(`\nTotal unique tools: ${idMap.size}`);
console.log(`Total duplicates found: ${duplicates}`);
