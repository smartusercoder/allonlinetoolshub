import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ToolCard';
import { toolsData } from '@/data/toolsData';
import { categories } from '@/data/categories';
import { Search, X, ChevronRight } from 'lucide-react';

const getToolsByCategory = (categoryId: string) => {
  return toolsData.filter(tool => tool.category === categoryId);
};

const getToolCategories = () => {
  return categories.filter(cat => {
    if (cat.id === 'all') return false;
    return toolsData.filter(tool => tool.category === cat.id).length > 0;
  });
};

export const AllToolsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  
  const toolCategories = getToolCategories();

  const filteredTools = useMemo(() => {
    let tools = [...toolsData];
    
    if (selectedCategory !== 'all') {
      tools = tools.filter(tool => tool.category === selectedCategory);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tools = tools.filter(tool =>
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        (tool.tags && tool.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    if (sortBy === 'name') {
      tools.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'popular') {
      tools.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    } else if (sortBy === 'options') {
      tools.sort((a, b) => (b.tags?.length || 0) - (a.tags?.length || 0));
    }
    
    return tools;
  }, [searchQuery, selectedCategory, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: toolsData.length };
    toolCategories.forEach(cat => {
      counts[cat.id] = getToolsByCategory(cat.id).length;
    });
    return counts;
  }, [toolCategories]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-8 md:py-10">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">All Tools</span>
          </nav>

          <div className="max-w-2xl">
            <h1 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">
              All Tools
            </h1>
            <p className="text-sm text-muted-foreground">
              Browse our complete collection of {toolsData.length}+ free online tools
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-56 shrink-0">
              <div className="lg:sticky lg:top-20">
                {/* Search */}
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Filter tools..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 h-9 rounded-lg text-sm"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-card rounded-xl border border-border p-3">
                  <h3 className="font-semibold text-foreground text-sm mb-3">Categories</h3>
                  <div className="space-y-0.5 max-h-[50vh] overflow-y-auto sidebar-scroll pr-1">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-secondary'
                      }`}
                    >
                      <span>All Tools</span>
                      <span className={`text-xs ${selectedCategory === 'all' ? '' : 'text-muted-foreground'}`}>
                        {categoryCounts.all}
                      </span>
                    </button>
                    {toolCategories.map(cat => {
                      const CatIcon = cat.icon;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-colors ${
                            selectedCategory === cat.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-foreground hover:bg-secondary'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <CatIcon className="w-3 h-3" />
                            <span className="truncate">{cat.name}</span>
                          </span>
                          <span className={`text-xs ${selectedCategory === cat.id ? '' : 'text-muted-foreground'}`}>
                            {categoryCounts[cat.id]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sort */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-foreground mb-1.5">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="custom-select"
                  >
                    <option value="default">Default</option>
                    <option value="name">Name A-Z</option>
                    <option value="popular">Popular First</option>
                    <option value="options">Most Options</option>
                  </select>
                </div>
              </div>
            </aside>

            {/* Tools Grid */}
            <main className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredTools.length} tools
                </p>
                {(searchQuery || selectedCategory !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear filters
                  </Button>
                )}
              </div>

              {filteredTools.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    No tools found
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Try different keywords or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllToolsPage;
