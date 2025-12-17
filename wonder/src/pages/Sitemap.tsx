import { Link, useSearchParams } from "react-router-dom";
import { toolsData } from "@/data/toolsData";
import { categories } from "@/data/categories";
import { SEO } from "@/components/SEO";
import { ArrowLeft, Search, X, ChevronRight } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToolCard } from "@/components/ToolCard";

const Sitemap = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  
  // Update search from URL params
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  // Group tools by category
  const toolsByCategory = useMemo(() => {
    const grouped = new Map<string, typeof toolsData>();
    
    categories.forEach(category => {
      if (category.id === "all") return;
      
      const categoryTools = toolsData.filter(tool => tool.category === category.id && tool.implemented);
      if (categoryTools.length > 0) {
        grouped.set(category.id, categoryTools);
      }
    });
    
    return grouped;
  }, []);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return null;
    
    const query = searchQuery.toLowerCase();
    return toolsData.filter(tool => 
      tool.implemented &&
      (tool.title.toLowerCase().includes(query) ||
       tool.description.toLowerCase().includes(query) ||
       tool.tags.some(tag => tag.toLowerCase().includes(query)))
    );
  }, [searchQuery]);

  // Get total tool count
  const totalTools = toolsData.filter(t => t.implemented).length;
  
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <SEO
        title={`Browse All ${totalTools} Free Online Tools - All Online Tools Hub`}
        description={`Complete directory of ${totalTools}+ free online tools. Browse all tools organized by category including Image, PDF, Text, Code, Converters, and more. Find the perfect tool for your needs.`}
        keywords={[
          "all tools",
          "tool directory",
          "browse tools",
          "tool categories",
          "free online tools",
          "online utilities",
          "web tools"
        ]}
        canonical="https://allonlinetoolshub.com/sitemap"
        type="website"
        schemaType="WebPage"
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header - WebUtils Style */}
        <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                    <span className="text-white font-bold text-sm">A</span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white hidden sm:block">
                    All Online Tools Hub
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <Link to="/">
                  <Button variant="outline" size="sm" className="gap-2 border-slate-200 dark:border-slate-700">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Home</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
              <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900 dark:text-white font-medium">Browse Tools</span>
            </nav>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              Browse All Tools
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              {totalTools} free online tools organized by category
            </p>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search all tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              {searchQuery && filteredTools && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                  Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} matching "{searchQuery}"
                </p>
              )}
            </div>
          </div>

          {/* Search Results */}
          {searchQuery && filteredTools ? (
            <div>
              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredTools.map(tool => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
                    No tools found matching "{searchQuery}"
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Category Sections */
            <div className="space-y-12">
              {Array.from(toolsByCategory.entries()).map(([categoryId, tools]) => {
                const category = categories.find(c => c.id === categoryId);
                if (!category) return null;

                return (
                  <section key={categoryId} id={`category-${categoryId}`}>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                          {category.name}
                        </h2>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {tools.length} tools available
                        </p>
                      </div>
                      <Link
                        to={`/category/${categoryId}`}
                        className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View all →
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {tools.slice(0, 8).map(tool => (
                        <ToolCard
                          key={tool.id}
                          tool={tool}
                        />
                      ))}
                    </div>

                    {tools.length > 8 && (
                      <div className="mt-4 text-center">
                        <Link
                          to={`/category/${categoryId}`}
                          className="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          View all {tools.length} {category.name.toLowerCase()} tools
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          )}
        </main>

        {/* Footer - WebUtils Style */}
        <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400">
              <p>© {new Date().getFullYear()} All Online Tools Hub</p>
              <div className="flex items-center gap-6">
                <Link to="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
                <Link to="/terms-of-service" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
                <Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Sitemap;
