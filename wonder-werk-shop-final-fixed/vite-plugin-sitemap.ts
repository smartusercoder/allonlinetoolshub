import { Plugin } from 'vite';
import { writeFileSync } from 'fs';
import { join } from 'path';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    closeBundle() {
      // This runs after the build is complete
      try {
        console.log('\n🗺️  Generating sitemap...');
        
        // Dynamically import and run the sitemap generator
        import('./scripts/generate-dynamic-sitemap.ts').then(() => {
          console.log('✅ Sitemap generated during build');
        }).catch((error) => {
          console.error('❌ Sitemap generation failed:', error);
        });
      } catch (error) {
        console.error('Error in sitemap plugin:', error);
      }
    }
  };
}
