import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useSitemapSubmission } from "@/hooks/useSitemapSubmission";
import { useIndexNowSubmission } from "@/hooks/useIndexNowSubmission";
import { toolRoutes } from "@/routes/toolRoutes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

// Static imports for core pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsOfService from "./pages/TermsOfService";
import Sitemap from "./pages/Sitemap";
import CategoryPage from "./pages/CategoryPage";
import AllToolsPage from "./pages/AllToolsPage";
import SearchResultsPage from "./pages/SearchResultsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

// SEO submission wrapper
function SeoSubmissionWrapper({ children }: { children: React.ReactNode }) {
  useSitemapSubmission();
  useIndexNowSubmission();
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <TooltipProvider>
          <FavoritesProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <ErrorBoundary>
                <div className="min-h-screen flex flex-col bg-background">
                  <Header />
                  <main className="flex-1">
                    <SeoSubmissionWrapper>
                      <Routes>
                        {/* Core pages */}
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/disclaimer" element={<Disclaimer />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/sitemap" element={<Sitemap />} />
                        <Route path="/category/:categoryId" element={<CategoryPage />} />
                        <Route path="/all-tools" element={<AllToolsPage />} />
                        <Route path="/search" element={<SearchResultsPage />} />
                        
                        {/* All tool routes - auto-generated from toolsData */}
                        {toolRoutes}
                        
                        {/* 404 fallback */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </SeoSubmissionWrapper>
                  </main>
                  <Footer />
                </div>
              </ErrorBoundary>
            </BrowserRouter>
          </FavoritesProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
