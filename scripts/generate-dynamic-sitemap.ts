import { writeFileSync } from 'fs';
import { join } from 'path';
import { toolsData } from '../src/data/toolsData';
import { categories } from '../src/data/categories';
import type { ToolCategory } from '../src/types/tool.types';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

const SITE_URL = 'https://allonlinetoolshub.com';
const TODAY = new Date().toISOString().split('T')[0];

// Priority tiers for SEO visibility
const PRIORITY_MAP = {
  high: { priority: '0.95', changefreq: 'daily' as const },
  medium: { priority: '0.80', changefreq: 'weekly' as const },
  low: { priority: '0.70', changefreq: 'monthly' as const }
};

function generateCategorySitemap(category: ToolCategory): string {
  const categoryTools = toolsData.filter(tool => 
    tool.implemented && tool.category === category
  );

  if (categoryTools.length === 0) {
    return '';
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `  <!-- Category: ${category} (${categoryTools.length} tools) -->\n`;
  xml += `  <!-- Generated: ${new Date().toISOString()} -->\n\n`;

  categoryTools.forEach(tool => {
    const toolPriority = tool.priority || 'low';
    const priorityConfig = PRIORITY_MAP[toolPriority];
    
    let priority = priorityConfig.priority;
    let changefreq = priorityConfig.changefreq;
    const lastmod = tool.lastModified || TODAY;

    if (tool.featured) {
      priority = '0.98';
      changefreq = 'daily';
    }

    if (tool.tags && tool.tags.length > 10 && !tool.featured) {
      const currentPriority = parseFloat(priority);
      priority = Math.min(0.95, currentPriority + 0.05).toFixed(2);
    }

    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${tool.path}</loc>\n`;
    xml += `    <lastmod>${lastmod}</lastmod>\n`;
    xml += `    <changefreq>${changefreq}</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

function generateMainSitemap(): string {
  const urls: SitemapUrl[] = [];

  // Homepage - highest priority
  urls.push({
    loc: SITE_URL,
    lastmod: TODAY,
    changefreq: 'hourly',
    priority: '1.0'
  });

  // Sitemap page - high priority for SEO
  urls.push({
    loc: `${SITE_URL}/sitemap`,
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: '0.9'
  });

  // Legal pages - medium-low priority
  const legalPages = ['about', 'privacy-policy', 'terms-of-service', 'disclaimer'];
  legalPages.forEach(page => {
    urls.push({
      loc: `${SITE_URL}/${page}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.5'
    });
  });

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `  <!-- Main Pages Sitemap -->\n`;
  xml += `  <!-- Generated: ${new Date().toISOString()} -->\n\n`;

  urls.forEach(url => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';
  return xml;
}

function generateSitemapIndex(): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  xml += `  <!-- Sitemap Index - Generated: ${new Date().toISOString()} -->\n\n`;

  // Add main sitemap
  xml += '  <sitemap>\n';
  xml += `    <loc>${SITE_URL}/sitemap-main.xml</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += '  </sitemap>\n';

  // Add category sitemaps
  const toolCategories = categories.filter(cat => cat.id !== 'all');
  toolCategories.forEach(category => {
    const categoryTools = toolsData.filter(tool => 
      tool.implemented && tool.category === category.id
    );

    if (categoryTools.length > 0) {
      xml += '  <sitemap>\n';
      xml += `    <loc>${SITE_URL}/sitemap-${category.id}.xml</loc>\n`;
      xml += `    <lastmod>${TODAY}</lastmod>\n`;
      xml += '  </sitemap>\n';
    }
  });

  xml += '</sitemapindex>';
  return xml;
}

function validateSitemap(xml: string, type: string): void {
  const isIndex = xml.includes('<sitemapindex');
  let count = 0;
  
  if (isIndex) {
    const sitemapCount = (xml.match(/<sitemap>/g) || []).length;
    const locCount = (xml.match(/<loc>/g) || []).length;
    if (sitemapCount !== locCount) {
      throw new Error(`Invalid ${type} sitemap: sitemap and LOC counts do not match`);
    }
    if (sitemapCount === 0) {
      throw new Error(`Invalid ${type} sitemap: No sitemaps found`);
    }
    count = sitemapCount;
  } else {
    const urlCount = (xml.match(/<url>/g) || []).length;
    const locCount = (xml.match(/<loc>/g) || []).length;
    
    if (urlCount !== locCount) {
      throw new Error(`Invalid ${type} sitemap: URL and LOC counts do not match`);
    }
    
    if (urlCount === 0) {
      throw new Error(`Invalid ${type} sitemap: No URLs found`);
    }
    count = urlCount;
  }

  if (!xml.includes('<?xml version="1.0"')) {
    throw new Error(`Invalid ${type} sitemap: Missing XML declaration`);
  }

  console.log(`✓ ${type} validated: ${count} ${isIndex ? 'sitemaps' : 'URLs'}`);
}

// Generate and save all sitemaps
try {
  console.log('🚀 Generating sitemap index with category-based sitemaps...\n');
  
  const publicDir = join(process.cwd(), 'public');
  
  // Generate main sitemap
  console.log('📄 Generating main sitemap...');
  const mainSitemap = generateMainSitemap();
  writeFileSync(join(publicDir, 'sitemap-main.xml'), mainSitemap, 'utf-8');
  validateSitemap(mainSitemap, 'Main');
  
  // Generate category sitemaps
  const toolCategories = categories.filter(cat => cat.id !== 'all');
  let categorySitemapsCount = 0;
  let totalToolsInSitemaps = 0;
  
  console.log('\n📁 Generating category sitemaps...');
  toolCategories.forEach(category => {
    const categorySitemap = generateCategorySitemap(category.id as ToolCategory);
    if (categorySitemap) {
      const filename = `sitemap-${category.id}.xml`;
      writeFileSync(join(publicDir, filename), categorySitemap, 'utf-8');
      
      const toolCount = toolsData.filter(t => t.implemented && t.category === category.id).length;
      totalToolsInSitemaps += toolCount;
      console.log(`  ✓ ${filename} (${toolCount} tools)`);
      categorySitemapsCount++;
    }
  });
  
  // Generate sitemap index
  console.log('\n📋 Generating sitemap index...');
  const sitemapIndex = generateSitemapIndex();
  writeFileSync(join(publicDir, 'sitemap.xml'), sitemapIndex, 'utf-8');
  validateSitemap(sitemapIndex, 'Index');
  
  // Summary statistics
  const featuredCount = toolsData.filter(t => t.implemented && t.featured).length;
  const highPriorityCount = toolsData.filter(t => t.implemented && t.priority === 'high').length;
  const implementedCount = toolsData.filter(t => t.implemented).length;
  
  console.log(`\n✅ Sitemap index generated successfully!`);
  console.log(`📍 Location: public/sitemap.xml`);
  console.log(`📊 Structure:`);
  console.log(`   • 1 sitemap index (sitemap.xml)`);
  console.log(`   • 1 main sitemap (sitemap-main.xml)`);
  console.log(`   • ${categorySitemapsCount} category sitemaps`);
  console.log(`\n📈 Statistics:`);
  console.log(`   • Total tools in database: ${toolsData.length}`);
  console.log(`   • Implemented tools: ${implementedCount}`);
  console.log(`   • Tools in sitemaps: ${totalToolsInSitemaps}`);
  console.log(`   • Featured tools: ${featuredCount}`);
  console.log(`   • High priority tools: ${highPriorityCount}`);
  console.log(`   • Last modified: ${TODAY}\n`);
  
  // Trigger IndexNow submission after sitemap generation
  console.log('🔔 To submit to IndexNow, run: npm run indexnow');
  console.log('💡 IndexNow notifies Bing, Yandex, Naver, and Seznam.cz of updates\n');
  
} catch (error) {
  console.error('❌ Error generating sitemaps:', error);
  process.exit(1);
}
