import { lazy, Suspense, ComponentType } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

/**
 * Lazy load utility for route components
 * Wraps components with Suspense and shows loading spinner
 */
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => {
  const LazyComponent = lazy(importFunc);
  
  return (props: any) => (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
      <LazyComponent {...props} />
    </Suspense>
  );
};
