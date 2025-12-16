import { useState, memo } from "react";
import { ToolCard } from "@/components/ToolCard";
import { Tool } from "@/data/toolsData";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

// Memoize to prevent unnecessary re-renders

interface ToolGridProps {
  tools: Tool[];
  emptyMessage?: string;
}

const INITIAL_TOOLS_COUNT = 12;

const ToolGridComponent = ({ tools, emptyMessage = "No tools found" }: ToolGridProps) => {
  const [showAll, setShowAll] = useState(false);

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  const displayedTools = showAll ? tools : tools.slice(0, INITIAL_TOOLS_COUNT);
  const hasMore = tools.length > INITIAL_TOOLS_COUNT;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {displayedTools.map((tool) => (
          <ToolCard 
            key={tool.id} 
            tool={tool}
            disabled={!tool.implemented}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 text-center">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show All {tools.length} Tools <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
          {!showAll && (
            <p className="text-sm text-muted-foreground mt-2">
              Showing {INITIAL_TOOLS_COUNT} of {tools.length} tools
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ToolGrid = memo(ToolGridComponent);
