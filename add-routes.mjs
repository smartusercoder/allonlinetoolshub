import fs from 'fs';

// Read missing routes
const missingRoutes = fs.readFileSync('./missing-routes.txt', 'utf8');

// Read current routes file
let routesContent = fs.readFileSync('./src/routes/toolRoutes.tsx', 'utf8');

// Find the closing }; of the tools object
const insertPoint = routesContent.indexOf('\n};');

if (insertPoint > 0) {
  // Insert missing routes before the closing };
  routesContent = routesContent.slice(0, insertPoint) + '\n' + missingRoutes + routesContent.slice(insertPoint);
  fs.writeFileSync('./src/routes/toolRoutes.tsx', routesContent);
  console.log('Added missing routes to toolRoutes.tsx');
} else {
  console.error('Could not find insertion point');
}
