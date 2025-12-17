import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/ThemeProvider';
import { toolsData } from '@/data/toolsData';
import { categories } from '@/data/categories';
import { 
  Wrench, Search, ChevronDown, Menu, X, Sun, Moon, 
  ArrowRight, ChevronRight
} from 'lucide-react';

// Get categories with tools
const getToolCategories = () => {
  return categories.filter(cat => {
    if (cat.id === 'all') return false;
    return toolsData.filter(tool => tool.category === cat.id).length > 0;
  });
};

// Get tool count for category
const getCategoryToolCount = (categoryId: string) => {
  return toolsData.filter(tool => tool.category === categoryId).length;
};

// Search tools - improved matching
const searchTools = (query: string) => {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase().trim();
  
  return toolsData.filter(tool => {
    const titleMatch = tool.title.toLowerCase().includes(lowerQuery);
    const descMatch = tool.description.toLowerCase().includes(lowerQuery);
    const categoryMatch = tool.category.toLowerCase().includes(lowerQuery);
    const tagMatch = tool.tags?.some(tag => tag.toLowerCase().includes(lowerQuery));
    return titleMatch || descMatch || categoryMatch || tagMatch;
  }).slice(0, 5);
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  
  const toolCategories = getToolCategories();
  const searchResults = searchTools(searchQuery);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setIsCategoriesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
            : 'bg-background border-b border-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="hidden sm:block font-display font-bold text-lg text-foreground">
                All Online Tools Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" ref={categoriesRef}>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className={`nav-link flex items-center gap-1 ${isCategoriesOpen ? 'active' : ''}`}
                >
                  Categories
                  <ChevronDown className={`w-3 h-3 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} />
                </button>

                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-scale-in z-50">
                    <div className="p-2 max-h-80 overflow-y-auto sidebar-scroll">
                      {toolCategories.map((category) => {
                        const IconComponent = category.icon;
                        const toolCount = getCategoryToolCount(category.id);
                        return (
                          <Link
                            key={category.id}
                            to={`/category/${category.id}`}
                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-secondary transition-colors"
                            onClick={() => setIsCategoriesOpen(false)}
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <IconComponent className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-foreground text-sm">{category.name}</p>
                              <p className="text-xs text-muted-foreground">{toolCount} tools</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                    <div className="border-t border-border p-2">
                      <Link
                        to="/all-tools"
                        className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-secondary hover:bg-muted transition-colors text-primary font-medium text-sm"
                        onClick={() => setIsCategoriesOpen(false)}
                      >
                        View All Tools
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 h-10 px-4 rounded-xl bg-secondary hover:bg-muted text-muted-foreground text-sm transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search...</span>
                <kbd className="hidden xl:inline-flex px-1.5 py-0.5 rounded bg-muted text-xs font-mono">⌘K</kbd>
              </button>

              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <Link to="/all-tools">
                <Button size="default" className="rounded-xl h-10">
                  Explore All Tools
                </Button>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-1">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background animate-slide-down">
            <div className="container mx-auto px-4 py-3">
              <nav className="space-y-1">
                <Link to="/" className="block p-2.5 rounded-lg hover:bg-secondary transition-colors">
                  <span className="font-medium text-sm text-foreground">Home</span>
                </Link>

                <Link to="/all-tools" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-secondary transition-colors">
                  <span className="font-medium text-sm text-foreground">All Tools</span>
                  <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {toolsData.length}+
                  </span>
                </Link>

                <div className="pt-2">
                  <p className="px-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1">
                    {toolCategories.slice(0, 8).map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Link
                          key={category.id}
                          to={`/category/${category.id}`}
                          className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <IconComponent className="w-4 h-4 text-primary" />
                          <span className="text-sm text-foreground truncate">{category.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-fade-in"
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
          />
          
          <div className="relative max-w-xl mx-auto mt-20 px-4 animate-slide-down">
            <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-11 pr-16 text-sm border-0 border-b border-border rounded-none focus:ring-0 bg-transparent"
                  autoFocus
                />
                <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-muted text-xs font-mono text-muted-foreground">
                  ESC
                </kbd>
              </form>

              {searchResults.length > 0 && (
                <div className="max-h-80 overflow-y-auto pb-1">
                  {searchResults.map((tool) => (
                    <Link
                      key={tool.id}
                      to={tool.path || `/tool/${tool.id}`}
                      className="flex items-center gap-3 p-3 hover:bg-secondary transition-colors border-b border-border last:border-0"
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <tool.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground">{tool.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{tool.description}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="p-6 text-center">
                  <p className="text-sm text-muted-foreground">No tools found for "{searchQuery}"</p>
                  <Link
                    to="/all-tools"
                    className="inline-flex items-center gap-2 mt-3 text-sm text-primary hover:underline"
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                  >
                    Browse all tools
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}

              {!searchQuery.trim() && (
                <div className="p-3 border-t border-border">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Popular</p>
                  <div className="flex flex-wrap gap-2">
                    {['PDF', 'Image', 'JSON', 'Password', 'QR Code'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted text-sm text-foreground transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
