/**
 * Script to submit all tool URLs to IndexNow API for instant indexing
 * Run this script after building or updating the sitemap
 */

import { toolsData } from '../src/data/toolsData';

const SITE_URL = 'https://allonlinetoolshub.com';
const INDEX_NOW_API = 'https://api.indexnow.org/indexnow';
const API_KEY = 'e8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4';

interface IndexNowPayload {
  host: string;
  key: string;
  keyLocation: string;
  urlList: string[];
}

async function submitToIndexNow(): Promise<void> {
  console.log('🚀 Starting IndexNow submission...\n');

  // Collect all implemented tool URLs
  const toolUrls = toolsData
    .filter(tool => tool.implemented)
    .map(tool => `${SITE_URL}${tool.path}`);

  // Add important pages
  const importantPages = [
    SITE_URL, // Homepage
    `${SITE_URL}/sitemap`,
    `${SITE_URL}/about`,
    `${SITE_URL}/privacy-policy`,
    `${SITE_URL}/terms-of-service`,
    `${SITE_URL}/disclaimer`
  ];

  const allUrls = [...importantPages, ...toolUrls];

  console.log(`📊 Preparing to submit ${allUrls.length} URLs to IndexNow`);
  console.log(`   - ${importantPages.length} important pages`);
  console.log(`   - ${toolUrls.length} tool pages\n`);

  // Prepare payload
  const payload: IndexNowPayload = {
    host: new URL(SITE_URL).hostname,
    key: API_KEY,
    keyLocation: `${SITE_URL}/${API_KEY}.txt`,
    urlList: allUrls
  };

  try {
    // Submit to IndexNow
    const response = await fetch(INDEX_NOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 202) {
      console.log('✅ IndexNow submission successful!');
      console.log(`📍 Submitted ${allUrls.length} URLs`);
      console.log(`🌐 Search engines notified: Bing, Yandex, Naver, Seznam.cz\n`);
      
      // Log sample URLs
      console.log('Sample submitted URLs:');
      allUrls.slice(0, 5).forEach(url => console.log(`   - ${url}`));
      if (allUrls.length > 5) {
        console.log(`   ... and ${allUrls.length - 5} more\n`);
      }
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow submission failed with status ${response.status}`);
      console.error(`Error: ${errorText}\n`);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error submitting to IndexNow:', error);
    process.exit(1);
  }
}

// Run the script
submitToIndexNow().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
