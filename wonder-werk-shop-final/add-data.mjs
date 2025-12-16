import fs from 'fs';

// Read missing data
const missingData = fs.readFileSync('./missing-data.txt', 'utf8');

// Read current data file
let dataContent = fs.readFileSync('./src/data/toolsData.ts', 'utf8');

// Find the closing ]; of the toolsData array
const insertPoint = dataContent.lastIndexOf('\n];');

if (insertPoint > 0) {
  // Insert missing data before the closing ];
  dataContent = dataContent.slice(0, insertPoint) + ',\n' + missingData + dataContent.slice(insertPoint);
  fs.writeFileSync('./src/data/toolsData.ts', dataContent);
  console.log('Added missing data to toolsData.ts');
} else {
  console.error('Could not find insertion point');
}
