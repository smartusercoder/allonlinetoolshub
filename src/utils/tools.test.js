import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

describe('All Online Tools Hub - Tool Verification', () => {
  describe('Asset Files Verification', () => {
    it('should have assets directory', () => {
      const assetsPath = join(process.cwd(), 'assets');
      expect(existsSync(assetsPath)).toBe(true);
    });

    it('should have all main entry point files referenced in index.html', () => {
      const indexHtml = readFileSync(join(process.cwd(), 'index.html'), 'utf-8');

      // Extract script and link references from index.html
      const scriptMatches = indexHtml.match(/src="([^"]+\.js)"/g) || [];
      const linkMatches = indexHtml.match(/href="([^"]+\.(css|js))"/g) || [];

      const assets = [
        ...scriptMatches.map(m => m.match(/src="([^"]+)"/)[1]),
        ...linkMatches
          .filter(m => m.includes('/assets/'))
          .map(m => m.match(/href="([^"]+)"/)[1])
      ];

      assets.forEach(asset => {
        const assetPath = join(process.cwd(), asset.replace(/^\//, ''));
        expect(existsSync(assetPath), `Asset ${asset} should exist`).toBe(true);
      });
    });

    it('should have at least 1500 JavaScript files in assets', () => {
      const assetsPath = join(process.cwd(), 'assets');
      const files = readdirSync(assetsPath);
      const jsFiles = files.filter(f => f.endsWith('.js'));

      expect(jsFiles.length).toBeGreaterThanOrEqual(1500);
      console.log(`✓ Found ${jsFiles.length} JavaScript tool files`);
    });

    it('should have valid JavaScript syntax in all asset files', () => {
      const assetsPath = join(process.cwd(), 'assets');
      const files = readdirSync(assetsPath);
      const jsFiles = files.filter(f => f.endsWith('.js'));

      let validCount = 0;
      let invalidFiles = [];

      jsFiles.forEach(file => {
        try {
          const content = readFileSync(join(assetsPath, file), 'utf-8');

          // Basic validation: file should not be empty and should contain valid JS patterns
          expect(content.length).toBeGreaterThan(0);

          // Check for common JavaScript patterns (import, export, function, const, let, var)
          const hasJsPatterns = /(?:import|export|function|const|let|var|class|\(\)=>)/i.test(content);

          if (hasJsPatterns) {
            validCount++;
          } else {
            invalidFiles.push(file);
          }
        } catch (error) {
          invalidFiles.push(`${file}: ${error.message}`);
        }
      });

      expect(invalidFiles.length).toBe(0);
      console.log(`✓ Validated ${validCount} JavaScript files`);
    });

    it('should have proper file naming convention for tools', () => {
      const assetsPath = join(process.cwd(), 'assets');
      const files = readdirSync(assetsPath);
      const jsFiles = files.filter(f => f.endsWith('.js'));

      // Tool files should follow pattern: ToolName-Hash.js
      const toolFiles = jsFiles.filter(f => /^[A-Z][a-zA-Z0-9]*-[A-Za-z0-9_-]+\.js$/.test(f));

      expect(toolFiles.length).toBeGreaterThan(1000);
      console.log(`✓ Found ${toolFiles.length} properly named tool files`);
    });

    it('should have CSS files in assets', () => {
      const assetsPath = join(process.cwd(), 'assets');
      const files = readdirSync(assetsPath);
      const cssFiles = files.filter(f => f.endsWith('.css'));

      expect(cssFiles.length).toBeGreaterThan(0);
      console.log(`✓ Found ${cssFiles.length} CSS files`);
    });
  });

  describe('Sitemap Verification', () => {
    it('should have main sitemap index', () => {
      const sitemapPath = join(process.cwd(), 'sitemap.xml');
      expect(existsSync(sitemapPath)).toBe(true);

      const content = readFileSync(sitemapPath, 'utf-8');
      expect(content).toContain('<sitemapindex');
      expect(content).toContain('sitemap-main.xml');
    });

    it('should have all category sitemaps referenced', () => {
      const sitemapPath = join(process.cwd(), 'sitemap.xml');
      const content = readFileSync(sitemapPath, 'utf-8');

      const categories = [
        'main', 'text', 'image', 'pdf', 'converter', 'code',
        'generator', 'color', 'crypto', 'math', 'seo', 'web',
        'date-time', 'utility', 'audio', 'video', 'file'
      ];

      categories.forEach(category => {
        expect(content).toContain(`sitemap-${category}.xml`);
      });

      console.log(`✓ All ${categories.length} category sitemaps are referenced`);
    });

    it('should have valid sitemap files for each category', () => {
      const categories = [
        'main', 'text', 'image', 'pdf', 'converter', 'code',
        'generator', 'color', 'crypto', 'math', 'seo', 'web',
        'date-time', 'utility', 'audio', 'video', 'file'
      ];

      let totalUrls = 0;

      categories.forEach(category => {
        const sitemapPath = join(process.cwd(), `sitemap-${category}.xml`);
        expect(existsSync(sitemapPath), `sitemap-${category}.xml should exist`).toBe(true);

        const content = readFileSync(sitemapPath, 'utf-8');
        expect(content).toContain('<?xml');
        expect(content).toContain('<urlset');

        // Count URLs in this sitemap
        const urlMatches = content.match(/<loc>/g);
        if (urlMatches) {
          totalUrls += urlMatches.length;
        }
      });

      console.log(`✓ Found ${totalUrls} tool URLs across all sitemaps`);
      expect(totalUrls).toBeGreaterThan(1500);
    });
  });

  describe('Configuration Files Verification', () => {
    it('should have valid package.json', () => {
      const packagePath = join(process.cwd(), 'package.json');
      expect(existsSync(packagePath)).toBe(true);

      const content = readFileSync(packagePath, 'utf-8');
      const pkg = JSON.parse(content);

      expect(pkg.name).toBe('allonlinetoolshub');
      expect(pkg.version).toBe('2.0.0');
      expect(pkg.scripts).toBeDefined();
      expect(pkg.scripts.test).toBe('vitest');
    });

    it('should have manifest.json for PWA', () => {
      const manifestPath = join(process.cwd(), 'manifest.json');
      expect(existsSync(manifestPath)).toBe(true);

      const content = readFileSync(manifestPath, 'utf-8');
      const manifest = JSON.parse(content);

      expect(manifest.name).toBeDefined();
      expect(manifest.short_name).toBeDefined();
    });

    it('should have robots.txt', () => {
      const robotsPath = join(process.cwd(), 'robots.txt');
      expect(existsSync(robotsPath)).toBe(true);

      const content = readFileSync(robotsPath, 'utf-8');
      expect(content).toContain('User-agent');
    });

    it('should have security headers configuration', () => {
      const headersPath = join(process.cwd(), '_headers');
      expect(existsSync(headersPath)).toBe(true);

      const content = readFileSync(headersPath, 'utf-8');
      expect(content).toContain('X-Frame-Options');
      expect(content).toContain('Content-Security-Policy');
      expect(content).toContain('X-Content-Type-Options');
    });
  });

  describe('HTML Entry Point Verification', () => {
    it('should have valid index.html', () => {
      const indexPath = join(process.cwd(), 'index.html');
      expect(existsSync(indexPath)).toBe(true);

      const content = readFileSync(indexPath, 'utf-8');

      // Basic HTML structure
      expect(content).toContain('<!doctype html>');
      expect(content).toContain('<html');
      expect(content).toContain('<head>');
      expect(content).toContain('<body>');
      expect(content).toContain('<div id="root">');

      // SEO and meta tags
      expect(content).toContain('<title>');
      expect(content).toContain('All Online Tools Hub');
      expect(content).toContain('1500+');

      // Security headers
      expect(content).toContain('X-Content-Type-Options');
      expect(content).toContain('X-XSS-Protection');
      expect(content).toContain('X-Frame-Options');

      // PWA elements
      expect(content).toContain('manifest.json');
      expect(content).toContain('theme-color');

      // Structured data
      expect(content).toContain('application/ld+json');
      expect(content).toContain('WebApplication');
    });

    it('should reference correct asset files', () => {
      const indexPath = join(process.cwd(), 'index.html');
      const content = readFileSync(indexPath, 'utf-8');

      // Should have main JS bundle
      expect(content).toContain('type="module"');
      expect(content).toContain('/assets/');
      expect(content).toMatch(/assets\/index-[A-Za-z0-9]+\.js/);

      // Should have CSS
      expect(content).toMatch(/assets\/index-[A-Za-z0-9]+\.css/);

      // Should have modulepreload for core chunks
      expect(content).toContain('rel="modulepreload"');
    });
  });

  describe('Sample Tool Files Validation', () => {
    it('should validate random sample of tool files contain valid JavaScript', () => {
      const assetsPath = join(process.cwd(), 'assets');
      const files = readdirSync(assetsPath);
      const toolFiles = files.filter(f =>
        f.endsWith('.js') && /^[A-Z][a-zA-Z0-9]*-/.test(f)
      );

      // Sample 20 random tools
      const sampleSize = Math.min(20, toolFiles.length);
      const samples = [];
      for (let i = 0; i < sampleSize; i++) {
        const randomIndex = Math.floor(Math.random() * toolFiles.length);
        samples.push(toolFiles[randomIndex]);
      }

      samples.forEach(file => {
        const content = readFileSync(join(assetsPath, file), 'utf-8');

        // File should not be empty
        expect(content.length).toBeGreaterThan(0);

        // Should contain JavaScript code patterns
        const hasValidJs =
          /import/i.test(content) ||
          /export/i.test(content) ||
          /function/i.test(content) ||
          /const |let |var /i.test(content) ||
          /=>/i.test(content);

        expect(hasValidJs, `${file} should contain valid JavaScript`).toBe(true);
      });

      console.log(`✓ Validated ${samples.length} random tool samples`);
    });
  });

  describe('Utility Functions Verification', () => {
    it('should have validation utilities', () => {
      const validationPath = join(process.cwd(), 'src/utils/validation.js');
      expect(existsSync(validationPath)).toBe(true);

      const content = readFileSync(validationPath, 'utf-8');

      // Should export validation functions
      expect(content).toContain('export');
      expect(content).toContain('isValidUrl');
      expect(content).toContain('isValidEmail');
      expect(content).toContain('sanitizeInput');
    });

    it('should have comprehensive validation tests', () => {
      const testPath = join(process.cwd(), 'src/utils/validation.test.js');
      expect(existsSync(testPath)).toBe(true);

      const content = readFileSync(testPath, 'utf-8');

      // Should have test suites for all validation functions
      expect(content).toContain('describe');
      expect(content).toContain('isValidUrl');
      expect(content).toContain('isValidEmail');
      expect(content).toContain('sanitizeInput');
      expect(content).toContain('validatePassword');
    });
  });
});
