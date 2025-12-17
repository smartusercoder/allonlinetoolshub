import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ToolCard from '@/components/ToolCard';
import { categories } from '@/data/categories';
import { toolsData } from '@/data/toolsData';
import { Search, ChevronRight, Wrench, List, AlertTriangle } from 'lucide-react';

const getToolsByCategory = (categoryId: string) => {
  return toolsData.filter(tool => tool.category === categoryId);
};

const getToolCategories = () => {
  return categories.filter(cat => {
    if (cat.id === 'all') return false;
    return toolsData.filter(tool => tool.category === cat.id).length > 0;
  });
};

const colorClasses: Record<string, { bg: string; text: string }> = {
  'text': { bg: 'bg-blue-500/10', text: 'text-blue-500' },
  'image': { bg: 'bg-violet-500/10', text: 'text-violet-500' },
  'pdf': { bg: 'bg-red-500/10', text: 'text-red-500' },
  'code': { bg: 'bg-green-500/10', text: 'text-green-500' },
  'seo': { bg: 'bg-amber-500/10', text: 'text-amber-500' },
  'math': { bg: 'bg-teal-500/10', text: 'text-teal-500' },
  'converter': { bg: 'bg-pink-500/10', text: 'text-pink-500' },
  'crypto': { bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
  'generator': { bg: 'bg-purple-500/10', text: 'text-purple-500' },
  'file': { bg: 'bg-orange-500/10', text: 'text-orange-500' },
  'color': { bg: 'bg-fuchsia-500/10', text: 'text-fuchsia-500' },
  'web': { bg: 'bg-sky-500/10', text: 'text-sky-500' },
  'video': { bg: 'bg-rose-500/10', text: 'text-rose-500' },
  'audio': { bg: 'bg-indigo-500/10', text: 'text-indigo-500' },
  'date-time': { bg: 'bg-cyan-500/10', text: 'text-cyan-500' },
  'utility': { bg: 'bg-slate-500/10', text: 'text-slate-500' },
};

const defaultColor = { bg: 'bg-primary/10', text: 'text-primary' };

export const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const category = categories.find(c => c.id === categoryId);
  const categoryTools = useMemo(() => getToolsByCategory(categoryId || ''), [categoryId]);
  const toolCategories = getToolCategories();
  const colors = colorClasses[categoryId || ''] || defaultColor;

  const filteredTools = useMemo(() => {
    let tools = [...categoryTools];
    
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
  }, [categoryTools, searchQuery, sortBy]);

  const totalOptions = useMemo(() => {
    return categoryTools.reduce((sum, tool) => sum + (tool.tags?.length || 1), 0);
  }, [categoryTools]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-display text-xl font-bold text-foreground mb-2">Category Not Found</h1>
        <p className="text-sm text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    );
  }

  const IconComponent = category.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/all-tools" className="hover:text-primary transition-colors">Categories</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{category.name}</span>
          </nav>

          <div className="flex flex-col md:flex-row items-start gap-5">
            <div className={`icon-box icon-box-lg ${colors.bg} rounded-xl shrink-0`}>
              <IconComponent className={`w-7 h-7 ${colors.text}`} />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                {category.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Wrench className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{categoryTools.length} tools</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <List className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">{totalOptions} total options</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Search in ${category.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-lg text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="custom-select w-auto"
              >
                <option value="default">Default</option>
                <option value="name">Name A-Z</option>
                <option value="popular">Popular First</option>
                <option value="options">Most Options</option>
              </select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredTools.length} of {categoryTools.length} tools
          </p>

          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} showCategory={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Search className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                No tools found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Try a different search term or browse other categories
              </p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Clear search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-10 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-lg md:text-xl font-bold text-foreground mb-5">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {toolCategories.filter(c => c.id !== categoryId).map((cat) => {
              const CatIcon = cat.icon;
              const catColors = colorClasses[cat.id] || defaultColor;
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <CatIcon className={`w-4 h-4 ${catColors.text}`} />
                  <span className="text-sm font-medium text-foreground">{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
