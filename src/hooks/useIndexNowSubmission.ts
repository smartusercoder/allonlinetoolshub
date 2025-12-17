import { useEffect } from 'react';
import { 
  submitAllToolsToIndexNow, 
  shouldSubmitToIndexNow, 
  recordIndexNowSubmission 
} from '@/utils/indexNow';
import { toolsData } from '@/data/toolsData';

/**
 * Hook to automatically submit URLs to IndexNow API
 * Runs once per week to notify search engines of updates
 */
export function useIndexNowSubmission() {
  useEffect(() => {
    // Only run in production
    if (import.meta.env.MODE !== 'production') {
      console.log('🔧 IndexNow submission skipped (development mode)');
      return;
    }

    // Check if we should submit (throttled to once per week)
    if (!shouldSubmitToIndexNow()) {
      console.log('⏰ IndexNow already submitted recently, skipping...');
      return;
    }

    // Submit all tool URLs to IndexNow
    const submitToIndexNow = async () => {
      try {
        const toolPaths = toolsData
          .filter(tool => tool.implemented)
          .map(tool => tool.path);
        
        const result = await submitAllToolsToIndexNow(toolPaths);
        
        if (result.success) {
          // Record submission timestamp
          recordIndexNowSubmission();
          console.log(`✅ IndexNow: ${result.message}`);
        } else {
          console.error(`❌ IndexNow: ${result.message}`);
        }
      } catch (error) {
        console.error('❌ Error submitting to IndexNow:', error);
      }
    };

    // Submit after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(submitToIndexNow, 10000);

    return () => clearTimeout(timeoutId);
  }, []);
}
