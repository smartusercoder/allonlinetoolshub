import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

interface Category {
  readonly id: string;
  readonly name: string;
  readonly icon: any;
  readonly color?: string;
}

interface CategoryNavProps {
  categories: readonly Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  toolCounts?: Record<string, number>;
}

export const CategoryNav = ({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  toolCounts = {}
}: CategoryNavProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Check if user has seen the tooltip before
    const hasSeenTooltip = localStorage.getItem('categoryScrollTooltipSeen');
    if (!hasSeenTooltip) {
      setShowTooltip(true);
    }
  }, []);

  useEffect(() => {
    // Add mouse wheel horizontal scrolling
    const container = scrollContainerRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    
    const handleWheel = (e: WheelEvent) => {
      if (container && Math.abs(e.deltaY) > 0) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
        
        // Dismiss tooltip on interaction
        if (showTooltip) {
          handleDismissTooltip();
        }
      }
    };

    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [showTooltip]);

  const handleDismissTooltip = () => {
    setShowTooltip(false);
    localStorage.setItem('categoryScrollTooltipSeen', 'true');
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current?.querySelector('[data-radix-scroll-area-viewport]');
    if (container) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Dismiss tooltip on interaction
      if (showTooltip) {
        handleDismissTooltip();
      }
    }
  };

  return (
    <div className="relative w-full">
      {/* First visit tooltip */}
      {showTooltip && (
        <div className="absolute top-[-60px] left-1/2 transform -translate-x-1/2 z-20 animate-fade-in">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
            <span>← Scroll to view all categories →</span>
            <button
              onClick={handleDismissTooltip}
              className="hover:bg-primary-foreground/20 rounded-full p-1 transition-colors"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-primary"></div>
        </div>
      )}

      {/* Clickable gradient fade indicators with arrows for scrollability */}
      <button
        onClick={() => handleScroll('left')}
        className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-background/0 z-10 flex items-center cursor-pointer transition-colors pointer-events-none"
        aria-label="Scroll categories left"
      >
        <div className="text-muted-foreground/60 animate-pulse text-lg pointer-events-auto cursor-pointer">←</div>
      </button>
      <button
        onClick={() => handleScroll('right')}
        className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-background/0 z-10 flex items-center justify-end cursor-pointer transition-colors pointer-events-none"
        aria-label="Scroll categories right"
      >
        <div className="text-muted-foreground/60 animate-pulse text-lg pointer-events-auto cursor-pointer">→</div>
      </button>
      
      <ScrollArea className="w-full whitespace-nowrap" ref={scrollContainerRef}>
        <div className="flex gap-2 p-1 px-4 pb-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const count = toolCounts[category.id] || 0;
            const isActive = activeCategory === category.id;
            const catVar = `--cat-${category.id}`;

            const btnStyle: React.CSSProperties = isActive
              ? { backgroundColor: `hsl(var(${catVar}))`, color: `hsl(var(${catVar}-fg, var(--primary-foreground)))` }
              : { color: `hsl(var(${catVar}))`, borderColor: `hsl(var(${catVar}) / 0.5)`, backgroundColor: `hsl(var(${catVar}) / 0.08)` };

            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md",
                  "border"
                )}
                style={btnStyle}
                aria-pressed={isActive}
                aria-label={`${category.name} (${count})`}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
                {count > 0 && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-5 px-1.5 text-xs border-0"
                    style={{ backgroundColor: `hsl(var(${catVar}) / 0.2)`, color: `hsl(var(${catVar}))` }}
                  >
                    {count}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-3" />
      </ScrollArea>
    </div>
  );
};
