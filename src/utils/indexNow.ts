/**
 * IndexNow API Integration
 * Submits URLs to IndexNow for instant search engine indexing
 * Supported by: Microsoft Bing, Yandex, Naver, Seznam.cz
 */

const SITE_URL = 'https://allonlinetoolshub.com';
const INDEX_NOW_API = 'https://api.indexnow.org/indexnow';

// Generate a simple API key for IndexNow (can be any string)
// This should match a text file at: https://allonlinetoolshub.com/{API_KEY}.txt
const API_KEY = 'e8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4';

interface IndexNowResponse {
  success: boolean;
  message: string;
  urlCount: number;
}

/**
 * Submit URLs to IndexNow API
 * @param urls Array of URLs to submit (max 10,000 per request)
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResponse> {
  try {
    // IndexNow accepts up to 10,000 URLs per request
    const urlsToSubmit = urls.slice(0, 10000);
    
    const payload = {
      host: new URL(SITE_URL).hostname,
      key: API_KEY,
      keyLocation: `${SITE_URL}/${API_KEY}.txt`,
      urlList: urlsToSubmit
    };

    const response = await fetch(INDEX_NOW_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok || response.status === 202) {
      console.log(`✅ IndexNow: Successfully submitted ${urlsToSubmit.length} URLs`);
      return {
        success: true,
        message: `Successfully submitted ${urlsToSubmit.length} URLs to IndexNow`,
        urlCount: urlsToSubmit.length
      };
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow error (${response.status}):`, errorText);
      return {
        success: false,
        message: `IndexNow API returned status ${response.status}`,
        urlCount: 0
      };
    }
  } catch (error) {
    console.error('❌ IndexNow submission failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      urlCount: 0
    };
  }
}

/**
 * Submit all tool pages to IndexNow
 */
export async function submitAllToolsToIndexNow(toolPaths: string[]): Promise<IndexNowResponse> {
  const urls = toolPaths.map(path => `${SITE_URL}${path}`);
  
  // Add homepage and sitemap
  urls.unshift(SITE_URL);
  urls.push(`${SITE_URL}/sitemap`);
  urls.push(`${SITE_URL}/sitemap.xml`);
  
  console.log(`🚀 Submitting ${urls.length} URLs to IndexNow...`);
  return submitToIndexNow(urls);
}

/**
 * Submit specific URLs to IndexNow (for new/updated content)
 */
export async function submitUrlsToIndexNow(paths: string[]): Promise<IndexNowResponse> {
  const urls = paths.map(path => {
    // Handle both absolute and relative URLs
    if (path.startsWith('http')) {
      return path;
    }
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  });
  
  console.log(`🚀 Submitting ${urls.length} URL(s) to IndexNow...`);
  return submitToIndexNow(urls);
}

/**
 * Check if IndexNow submission should be throttled
 */
export function shouldSubmitToIndexNow(): boolean {
  const STORAGE_KEY = 'lastIndexNowSubmission';
  const lastSubmission = localStorage.getItem(STORAGE_KEY);
  
  if (!lastSubmission) {
    return true;
  }
  
  const lastSubmissionDate = new Date(lastSubmission);
  const now = new Date();
  const hoursSinceLastSubmission = (now.getTime() - lastSubmissionDate.getTime()) / (1000 * 60 * 60);
  
  // Submit once per week (168 hours) to avoid excessive API calls
  return hoursSinceLastSubmission >= 168;
}

/**
 * Record IndexNow submission timestamp
 */
export function recordIndexNowSubmission(): void {
  const STORAGE_KEY = 'lastIndexNowSubmission';
  localStorage.setItem(STORAGE_KEY, new Date().toISOString());
}

/**
 * Generate IndexNow API key file content
 * This should be saved as a text file at: public/{API_KEY}.txt
 */
export function getIndexNowKeyFileContent(): string {
  return API_KEY;
}
