import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import CategoryCard from '@/components/CategoryCard';
import ToolCard from '@/components/ToolCard';
import { categories } from '@/data/categories';
import { toolsData } from '@/data/toolsData';
import { 
  CheckCircle, Search, Wrench, Layers, Gift, UserCheck,
  Zap, Lock, Infinity, Smartphone, UserX, Code,
  Rocket, Type, X, ChevronRight, ArrowRight
} from 'lucide-react';

// Get popular tools - featured first, then fill to 12
const getPopularTools = () => {
  const featured = toolsData.filter(tool => tool.featured);
  const nonFeatured = toolsData.filter(tool => !tool.featured);
  return [...featured, ...nonFeatured].slice(0, 12);
};

// Improved search - handles case, spaces, partial matches
const searchTools = (query: string) => {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
  
  return toolsData.filter(tool => {
    const titleLower = tool.title.toLowerCase();
    const descLower = tool.description.toLowerCase();
    const categoryLower = tool.category.toLowerCase();
    const tagsLower = tool.tags?.map(t => t.toLowerCase()) || [];
    
    return queryWords.every(word => {
      return titleLower.includes(word) || 
             descLower.includes(word) || 
             categoryLower.includes(word) || 
             tagsLower.some(tag => tag.includes(word));
    });
  });
};

// Get tool categories (excluding 'all' and empty categories)
const getToolCategories = () => {
  return categories.filter(cat => {
    if (cat.id === 'all') return false;
    return toolsData.filter(tool => tool.category === cat.id).length > 0;
  });
};

export const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const popularTools = getPopularTools();
  const toolCategories = getToolCategories();
  const totalTools = toolsData.length;

  const { searchResults, isSearching } = useMemo(() => {
    if (searchQuery.trim()) {
      const results = searchTools(searchQuery);
      return { searchResults: results.slice(0, 6), isSearching: true };
    }
    return { searchResults: [], isSearching: false };
  }, [searchQuery]);

  const stats = [
    { value: `${totalTools}+`, label: 'Total Tools', icon: Wrench },
    { value: `${toolCategories.length}`, label: 'Categories', icon: Layers },
    { value: '100%', label: 'Free Forever', icon: Gift },
    { value: 'No Signup', label: 'Required', icon: UserCheck },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePopularClick = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 py-12 md:py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free Online Tools — No Signup Required</span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-slide-up">
              <span className="gradient-text">{totalTools}+ Free Tools</span>
              <br />
              <span className="text-foreground">to Simplify Your Work</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
              PDF, Image, Text, SEO, Developer tools and more. All running in your browser for maximum privacy and speed.
            </p>

            {/* Search Box */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6 animate-slide-up">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tools... (e.g., PDF to Image, JSON formatter)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-5 h-12 text-base rounded-xl bg-card border-border shadow-md focus:shadow-lg focus:ring-2 focus:ring-primary/50 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Search Results Dropdown */}
              {isSearching && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-scale-in">
                  <div className="max-h-[400px] overflow-y-auto">
                    {searchResults.map((tool) => (
                      <Link
                        key={tool.id}
                        to={tool.path || `/tool/${tool.id}`}
                        className="flex items-center gap-3 p-3 hover:bg-secondary transition-colors border-b border-border"
                      >
                        <tool.icon className="w-4 h-4 text-primary shrink-0" />
                        <div className="flex-1 text-left min-w-0">
                          <p className="font-medium text-foreground text-sm">{tool.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    to={`/search?q=${encodeURIComponent(searchQuery)}`}
                    className="flex items-center justify-center gap-2 p-3 bg-secondary hover:bg-muted transition-colors text-primary font-medium text-sm border-t border-border"
                  >
                    View all results
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}

              {/* No results in dropdown */}
              {isSearching && searchResults.length === 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 p-4 text-center animate-scale-in">
                  <p className="text-sm text-muted-foreground mb-2">No tools found for "{searchQuery}"</p>
                  <Link to="/all-tools" className="text-sm text-primary hover:underline">
                    Browse all tools →
                  </Link>
                </div>
              )}
            </form>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-2 animate-slide-up">
              <span className="text-sm text-muted-foreground">Popular:</span>
              {['PDF', 'Image', 'JSON', 'Password', 'QR Code'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handlePopularClick(tag)}
                  className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-muted text-foreground transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="font-display text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Find the right tool for your task. All tools are organized into easy-to-navigate categories.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {toolCategories.slice(0, 12).map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>

          {toolCategories.length > 12 && (
            <div className="text-center mt-8">
              <Link to="/all-tools">
                <Button variant="outline" className="gap-2">
                  View All Categories
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                Popular Tools
              </h2>
              <p className="text-muted-foreground text-sm">
                Most used tools by our community
              </p>
            </div>
            <Link to="/all-tools">
              <Button variant="outline" className="gap-2">
                View All Tools
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Why Choose All Online Tools Hub?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Built for speed, privacy, and convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'All tools run directly in your browser. No waiting for server processing.',
              },
              {
                icon: Lock,
                title: 'Privacy First',
                description: 'Your files never leave your device. Everything is processed locally.',
              },
              {
                icon: Infinity,
                title: 'Unlimited Use',
                description: 'No daily limits, no file size restrictions, no hidden fees.',
              },
              {
                icon: Smartphone,
                title: 'Mobile Friendly',
                description: 'Works perfectly on any device — desktop, tablet, or phone.',
              },
              {
                icon: UserX,
                title: 'No Signup',
                description: 'Start using tools immediately. No account required.',
              },
              {
                icon: Code,
                title: 'Developer Friendly',
                description: 'Clean outputs, proper formatting, and export options.',
              },
            ].map((feature, index) => (
              <Card key={index} className="border-0 shadow-none bg-transparent">
                <CardContent className="p-4 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Join thousands of users who trust All Online Tools Hub for their daily productivity needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/all-tools">
                <Button size="lg" className="gap-2 h-11 px-6 rounded-xl">
                  <Rocket className="w-4 h-4" />
                  Explore All Tools
                </Button>
              </Link>
              <Link to="/category/text">
                <Button variant="outline" size="lg" className="gap-2 h-11 px-6 rounded-xl">
                  <Type className="w-4 h-4" />
                  Start with Text Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
