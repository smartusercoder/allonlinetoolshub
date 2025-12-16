import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ToolCard';
import { toolsData } from '@/data/toolsData';
import { categories } from '@/data/categories';
import { Search, ChevronRight, ArrowRight } from 'lucide-react';

// Improved search - handles case, spaces, partial matches
const searchTools = (query: string) => {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase().trim();
  
  // Split query into words for better matching
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
  
  return toolsData.filter(tool => {
    const titleLower = tool.title.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const categoryLower = tool.category.toLowerCase();
    const tagsLower = tool.tags?.map(t => t.toLowerCase()) || [];
    
    // Check if all query words match something
    return queryWords.every(word => {
      const titleMatch = titleLower.includes(word);
      const descMatch = descLower.includes(word);
      const categoryMatch = categoryLower.includes(word);
      const tagMatch = tagsLower.some(tag => tag.includes(word));
      return titleMatch || descMatch || categoryMatch || tagMatch;
    });
  });
};

const getToolCategories = () => {
  return categories.filter(cat => {
    if (cat.id === 'all') return false;
    return toolsData.filter(tool => tool.category === cat.id).length > 0;
  });
};

export const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toolCategories = getToolCategories();

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
  }, [searchParams]);

  const allResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchTools(searchQuery);
  }, [searchQuery]);

  const filteredResults = useMemo(() => {
    if (selectedCategory === 'all') return allResults;
    return allResults.filter(tool => tool.category === selectedCategory);
  }, [allResults, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allResults.length };
    toolCategories.forEach(cat => {
      counts[cat.id] = allResults.filter(tool => tool.category === cat.id).length;
    });
    return counts;
  }, [allResults, toolCategories]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
      setSelectedCategory('all');
    }
  };

  // Popular searches that are guaranteed to return results
  const popularSearches = ['PDF', 'Image', 'JSON', 'Password', 'Text', 'Converter'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-5">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Search Results</span>
          </nav>

          <h1 className="font-display text-xl md:text-2xl font-bold text-foreground mb-5">
            Search Results
          </h1>

          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-24 h-12 text-sm rounded-xl"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          {searchQuery.trim() ? (
            <>
              <p className="text-sm text-muted-foreground mb-5">
                Found <span className="font-semibold text-foreground">{filteredResults.length}</span> results for{' '}
                "<span className="font-semibold text-foreground">{searchQuery}</span>"
              </p>

              {/* Category Filter */}
              {allResults.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === 'all'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-muted'
                    }`}
                  >
                    All ({categoryCounts.all})
                  </button>
                  {toolCategories.map(cat => (
                    categoryCounts[cat.id] > 0 && (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-foreground hover:bg-muted'
                        }`}
                      >
                        {cat.name} ({categoryCounts[cat.id]})
                      </button>
                    )
                  ))}
                </div>
              )}

              {/* Results Grid */}
              {filteredResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredResults.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    No tools found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5">
                    Try different keywords or browse our categories
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/all-tools">
                      <Button className="rounded-lg">Browse All Tools</Button>
                    </Link>
                  </div>
                  
                  {/* Suggested searches */}
                  <div className="mt-8">
                    <p className="text-sm text-muted-foreground mb-3">Try searching for:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {popularSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSearchQuery(term);
                            setSearchParams({ q: term });
                          }}
                          className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-sm text-foreground transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                Start searching
              </h3>
              <p className="text-sm text-muted-foreground mb-5">
                Enter a keyword to find tools from our collection of {toolsData.length}+ free online tools
              </p>
              
              {/* Popular searches */}
              <div className="max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setSearchParams({ q: term });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-sm text-foreground transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResultsPage;
