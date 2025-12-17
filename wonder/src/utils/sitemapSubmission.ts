/**
 * Automatic Sitemap Submission Utility
 * Submits sitemap to Google Search Console and Bing Webmaster Tools
 */

const SITE_URL = 'https://allonlinetoolshub.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

interface SubmissionResult {
  service: string;
  success: boolean;
  message: string;
  timestamp: string;
}

/**
 * Submit sitemap to Google Search Console
 * Uses the IndexNow protocol which Google supports
 */
export async function submitToGoogle(): Promise<SubmissionResult> {
  const timestamp = new Date().toISOString();
  
  try {
    // Google Search Console ping URL
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    const response = await fetch(googlePingUrl, {
      method: 'GET',
      mode: 'no-cors', // Required for cross-origin ping
    });
    
    return {
      service: 'Google Search Console',
      success: true,
      message: 'Sitemap submitted successfully',
      timestamp
    };
  } catch (error) {
    return {
      service: 'Google Search Console',
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp
    };
  }
}

/**
 * Submit sitemap to Bing Webmaster Tools
 */
export async function submitToBing(): Promise<SubmissionResult> {
  const timestamp = new Date().toISOString();
  
  try {
    // Bing Webmaster Tools ping URL
    const bingPingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;
    
    const response = await fetch(bingPingUrl, {
      method: 'GET',
      mode: 'no-cors', // Required for cross-origin ping
    });
    
    return {
      service: 'Bing Webmaster Tools',
      success: true,
      message: 'Sitemap submitted successfully',
      timestamp
    };
  } catch (error) {
    return {
      service: 'Bing Webmaster Tools',
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp
    };
  }
}

/**
 * Submit sitemap to all search engines
 */
export async function submitSitemapToSearchEngines(): Promise<SubmissionResult[]> {
  console.log('🚀 Starting sitemap submission to search engines...');
  
  const results = await Promise.all([
    submitToGoogle(),
    submitToBing()
  ]);
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.service}: ${result.message}`);
    } else {
      console.log(`❌ ${result.service}: ${result.message}`);
    }
  });
  
  return results;
}

/**
 * Check if it's time to submit sitemap (throttle to once per day)
 */
export function shouldSubmitSitemap(): boolean {
  const STORAGE_KEY = 'lastSitemapSubmission';
  const lastSubmission = localStorage.getItem(STORAGE_KEY);
  
  if (!lastSubmission) {
    return true;
  }
  
  const lastSubmissionDate = new Date(lastSubmission);
  const now = new Date();
  const hoursSinceLastSubmission = (now.getTime() - lastSubmissionDate.getTime()) / (1000 * 60 * 60);
  
  // Submit once per day (24 hours)
  return hoursSinceLastSubmission >= 24;
}

/**
 * Record sitemap submission timestamp
 */
export function recordSitemapSubmission(): void {
  const STORAGE_KEY = 'lastSitemapSubmission';
  localStorage.setItem(STORAGE_KEY, new Date().toISOString());
}
