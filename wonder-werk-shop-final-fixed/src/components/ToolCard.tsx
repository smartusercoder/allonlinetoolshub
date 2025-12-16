import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { categories } from '@/data/categories';
import { Star, ChevronRight } from 'lucide-react';
import type { Tool } from '@/types/tool.types';

interface ToolCardProps {
  tool: Tool;
  showCategory?: boolean;
}

const colorClasses: Record<string, string> = {
  'text': 'bg-blue-500/10 text-blue-500',
  'image': 'bg-violet-500/10 text-violet-500',
  'pdf': 'bg-red-500/10 text-red-500',
  'code': 'bg-green-500/10 text-green-500',
  'seo': 'bg-amber-500/10 text-amber-500',
  'math': 'bg-teal-500/10 text-teal-500',
  'converter': 'bg-pink-500/10 text-pink-500',
  'crypto': 'bg-slate-600/10 text-slate-600',
  'generator': 'bg-purple-500/10 text-purple-500',
  'file': 'bg-orange-500/10 text-orange-500',
  'color': 'bg-fuchsia-500/10 text-fuchsia-500',
  'web': 'bg-sky-500/10 text-sky-500',
  'video': 'bg-pink-500/10 text-pink-500',
  'audio': 'bg-indigo-500/10 text-indigo-500',
  'date-time': 'bg-cyan-500/10 text-cyan-500',
  'utility': 'bg-gray-500/10 text-gray-500',
};

const iconColorClasses: Record<string, string> = {
  'text': 'text-blue-500',
  'image': 'text-violet-500',
  'pdf': 'text-red-500',
  'code': 'text-green-500',
  'seo': 'text-amber-500',
  'math': 'text-teal-500',
  'converter': 'text-pink-500',
  'crypto': 'text-slate-600',
  'generator': 'text-purple-500',
  'file': 'text-orange-500',
  'color': 'text-fuchsia-500',
  'web': 'text-sky-500',
  'video': 'text-pink-500',
  'audio': 'text-indigo-500',
  'date-time': 'text-cyan-500',
  'utility': 'text-gray-500',
};

export const ToolCard: React.FC<ToolCardProps> = ({ tool, showCategory = true }) => {
  const category = categories.find(c => c.id === tool.category);
  const IconComponent = tool.icon;
  const categoryColor = tool.category;
  const optionsCount = tool.tags?.length || 0;

  return (
    <Link to={tool.path || `/tool/${tool.id}`}>
      <Card className="group h-full hover:shadow-md hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClasses[categoryColor] || 'bg-primary/10 text-primary'}`}>
              <IconComponent className={`w-5 h-5 ${iconColorClasses[categoryColor] || 'text-primary'}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm leading-tight line-clamp-1">
                {tool.title}
              </h3>
              {showCategory && category && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {category.name}
                </p>
              )}
            </div>
            {tool.featured && (
              <Badge variant="secondary" className="shrink-0 bg-amber-500/10 text-amber-600 border-0 text-xs px-1.5 py-0">
                <Star className="w-3 h-3" />
              </Badge>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 flex-grow leading-relaxed line-clamp-2">
            {tool.description}
          </p>
          
          {optionsCount > 0 && (
            <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {Math.min(optionsCount, 10)} options
              </span>
              <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ToolCard;
