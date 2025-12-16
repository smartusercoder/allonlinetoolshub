import { readFileSync } from 'fs';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';

interface ValidationResult {
  url: string;
  status: 'ok' | 'warning' | 'error';
  message: string;
}

interface SitemapStats {
  totalUrls: number;
  validUrls: number;
  warnings: number;
  errors: number;
  results: ValidationResult[];
}

const SITE_URL = 'https://allonlinetoolshub.com';

async function validateUrl(url: string): Promise<ValidationResult> {
  try {
    // For local validation, we check URL format and structure
    const urlObj = new URL(url);
    
    // Check if URL matches site domain
    if (!url.startsWith(SITE_URL)) {
      return {
        url,
        status: 'warning',
        message: `URL domain mismatch: ${urlObj.hostname}`
      };
    }

    // Check for common issues
    if (url.includes(' ')) {
      return {
        url,
        status: 'error',
        message: 'URL contains spaces'
      };
    }

    if (url.length > 2000) {
      return {
        url,
        status: 'warning',
        message: 'URL is very long (>2000 chars)'
      };
    }

    return {
      url,
      status: 'ok',
      message: 'URL structure valid'
    };
  } catch (error) {
    return {
      url,
      status: 'error',
      message: `Invalid URL format: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

async function parseSitemapFile(filePath: string): Promise<string[]> {
  const content = readFileSync(filePath, 'utf-8');
  const parser = new XMLParser();
  const parsed = parser.parse(content);

  const urls: string[] = [];

  // Handle sitemap index
  if (parsed.sitemapindex) {
    const sitemaps = Array.isArray(parsed.sitemapindex.sitemap) 
      ? parsed.sitemapindex.sitemap 
      : [parsed.sitemapindex.sitemap];
    
    for (const sitemap of sitemaps) {
      if (sitemap.loc) {
        const filename = sitemap.loc.split('/').pop();
        const sitemapPath = join(process.cwd(), 'public', filename);
        try {
          const subUrls = await parseSitemapFile(sitemapPath);
          urls.push(...subUrls);
        } catch (error) {
          console.warn(`⚠️  Could not parse ${filename}: ${error}`);
        }
      }
    }
  }

  // Handle regular sitemap
  if (parsed.urlset && parsed.urlset.url) {
    const urlEntries = Array.isArray(parsed.urlset.url) 
      ? parsed.urlset.url 
      : [parsed.urlset.url];
    
    urlEntries.forEach((entry: any) => {
      if (entry.loc) {
        urls.push(entry.loc);
      }
    });
  }

  return urls;
}

async function validateSitemap(): Promise<SitemapStats> {
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
  
  console.log('🔍 Starting sitemap validation...\n');
  console.log(`📄 Reading sitemap: ${sitemapPath}\n`);

  const urls = await parseSitemapFile(sitemapPath);
  
  console.log(`🔗 Found ${urls.length} URLs to validate\n`);

  const results: ValidationResult[] = [];
  let validUrls = 0;
  let warnings = 0;
  let errors = 0;

  // Validate each URL
  for (let i = 0; i < urls.length; i++) {
    const result = await validateUrl(urls[i]);
    results.push(result);

    if (result.status === 'ok') {
      validUrls++;
    } else if (result.status === 'warning') {
      warnings++;
      console.log(`⚠️  Warning [${i + 1}/${urls.length}]: ${result.url}`);
      console.log(`   ${result.message}\n`);
    } else if (result.status === 'error') {
      errors++;
      console.log(`❌ Error [${i + 1}/${urls.length}]: ${result.url}`);
      console.log(`   ${result.message}\n`);
    }

    // Progress indicator every 50 URLs
    if ((i + 1) % 50 === 0) {
      console.log(`✓ Validated ${i + 1}/${urls.length} URLs...`);
    }
  }

  return {
    totalUrls: urls.length,
    validUrls,
    warnings,
    errors,
    results: results.filter(r => r.status !== 'ok') // Only return issues
  };
}

async function checkForDuplicates(): Promise<void> {
  const sitemapPath = join(process.cwd(), 'public', 'sitemap.xml');
  const urls = await parseSitemapFile(sitemapPath);
  
  const urlCounts = new Map<string, number>();
  urls.forEach(url => {
    urlCounts.set(url, (urlCounts.get(url) || 0) + 1);
  });

  const duplicates = Array.from(urlCounts.entries())
    .filter(([_, count]) => count > 1);

  if (duplicates.length > 0) {
    console.log('\n⚠️  Duplicate URLs found:');
    duplicates.forEach(([url, count]) => {
      console.log(`   • ${url} (${count} times)`);
    });
  }
}

// Run validation
(async () => {
  try {
    const stats = await validateSitemap();
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 VALIDATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total URLs:     ${stats.totalUrls}`);
    console.log(`✅ Valid:       ${stats.validUrls}`);
    console.log(`⚠️  Warnings:    ${stats.warnings}`);
    console.log(`❌ Errors:      ${stats.errors}`);
    console.log('='.repeat(60));

    // Check for duplicates
    await checkForDuplicates();

    if (stats.errors > 0) {
      console.log('\n❌ Validation failed with errors');
      process.exit(1);
    } else if (stats.warnings > 0) {
      console.log('\n⚠️  Validation completed with warnings');
      process.exit(0);
    } else {
      console.log('\n✅ All URLs validated successfully!');
      process.exit(0);
    }
  } catch (error) {
    console.error('\n❌ Validation error:', error);
    process.exit(1);
  }
})();
