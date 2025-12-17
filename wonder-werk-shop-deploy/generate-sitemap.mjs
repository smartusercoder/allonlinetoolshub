import { toolsData } from './src/data/toolsData';

const siteUrl = 'https://allonlinetoolshub.com';
const today = new Date().toISOString().split('T')[0];

const popularKeywords = [
  'word-counter', 'case-converter', 'image-compressor', 'pdf-merge', 
  'password-generator', 'qr-code-generator', 'json-formatter', 'base64-encoder', 
  'color-picker', 'calculator', 'bmi-calculator', 'uuid-generator',
  'hash-generator', 'regex-tester', 'image-resizer', 'url-encoder',
  'temperature-converter', 'unit-converter', 'lorem-ipsum', 'text-diff'
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Legal Pages -->
  <url>
    <loc>${siteUrl}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/privacy-policy</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/terms-of-service</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${siteUrl}/disclaimer</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>

  <!-- All ${toolsData.length} Tool Pages -->
`;

toolsData.forEach(tool => {
  const priority = popularKeywords.includes(tool.id) ? '0.9' : '0.8';
  xml += `  <url>
    <loc>${siteUrl}${tool.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>
`;
});

xml += `</urlset>`;

console.log(xml);
