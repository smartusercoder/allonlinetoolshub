import { useEffect } from 'react';
import { 
  submitSitemapToSearchEngines, 
  shouldSubmitSitemap, 
  recordSitemapSubmission 
} from '@/utils/sitemapSubmission';

/**
 * Hook to automatically submit sitemap to search engines
 * Runs once per day to avoid excessive API calls
 */
export function useSitemapSubmission() {
  useEffect(() => {
    // Only run in production
    if (import.meta.env.MODE !== 'production') {
      console.log('🔧 Sitemap submission skipped (development mode)');
      return;
    }

    // Check if we should submit (throttled to once per day)
    if (!shouldSubmitSitemap()) {
      console.log('⏰ Sitemap already submitted recently, skipping...');
      return;
    }

    // Submit sitemap to search engines
    const submitSitemap = async () => {
      try {
        const results = await submitSitemapToSearchEngines();
        
        // Record submission timestamp
        recordSitemapSubmission();
        
        // Log results
        const successCount = results.filter(r => r.success).length;
        console.log(`✅ Sitemap submitted to ${successCount}/${results.length} search engines`);
      } catch (error) {
        console.error('❌ Error submitting sitemap:', error);
      }
    };

    // Submit after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(submitSitemap, 5000);

    return () => clearTimeout(timeoutId);
  }, []);
}
