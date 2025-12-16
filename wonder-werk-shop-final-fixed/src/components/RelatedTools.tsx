import { useMemo } from "react";
import { toolsData } from "@/data/toolsData";
import { ToolCard } from "@/components/ToolCard";

interface RelatedToolsProps {
  currentToolId: string;
  maxTools?: number;
}

export const RelatedTools = ({ currentToolId, maxTools = 4 }: RelatedToolsProps) => {
  const relatedTools = useMemo(() => {
    const currentTool = toolsData.find(t => t.id === currentToolId);
    if (!currentTool) return [];
    
    // Find tools with same category or matching tags
    const sameCategory = toolsData
      .filter(t => 
        t.id !== currentToolId && 
        t.implemented &&
        t.category === currentTool.category
      );
    
    const similarTags = toolsData
      .filter(t => 
        t.id !== currentToolId && 
        t.implemented &&
        t.category !== currentTool.category &&
        t.tags.some(tag => currentTool.tags.includes(tag))
      );
    
    // Prioritize same category, then similar tags
    const combined = [...sameCategory, ...similarTags];
    
    // Remove duplicates and limit
    return Array.from(new Set(combined.map(t => t.id)))
      .map(id => combined.find(t => t.id === id)!)
      .slice(0, maxTools);
  }, [currentToolId, maxTools]);

  if (relatedTools.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relatedTools.map(tool => (
          <ToolCard 
            key={tool.id} 
            tool={tool}
          />
        ))}
      </div>
    </section>
  );
};
