import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { toolsData } from '@/data/toolsData';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/data/categories';

interface CategoryCardProps {
  category: Category;
}

// Get tools by category
const getToolsByCategory = (categoryId: string) => {
  return toolsData.filter(tool => tool.category === categoryId);
};

// Color classes for different categories
const colorClasses: Record<string, string> = {
  'text': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'image': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'pdf': 'bg-red-500/10 text-red-500 border-red-500/20',
  'code': 'bg-green-500/10 text-green-500 border-green-500/20',
  'seo': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'math': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  'converter': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'crypto': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'generator': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'file': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'color': 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20',
  'web': 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  'video': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  'audio': 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
  'date-time': 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20',
  'utility': 'bg-slate-500/10 text-slate-500 border-slate-500/20',
};

const iconColorClasses: Record<string, string> = {
  'text': 'text-blue-500',
  'image': 'text-violet-500',
  'pdf': 'text-red-500',
  'code': 'text-green-500',
  'seo': 'text-amber-500',
  'math': 'text-teal-500',
  'converter': 'text-pink-500',
  'crypto': 'text-indigo-500',
  'generator': 'text-purple-500',
  'file': 'text-orange-500',
  'color': 'text-fuchsia-500',
  'web': 'text-sky-500',
  'video': 'text-rose-500',
  'audio': 'text-indigo-500',
  'date-time': 'text-cyan-500',
  'utility': 'text-slate-500',
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const actualToolCount = getToolsByCategory(category.id).length;
  const IconComponent = category.icon;
  
  return (
    <Link to={`/category/${category.id}`}>
      <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all duration-200 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${colorClasses[category.id] || 'bg-primary/10 text-primary border-primary/20'}`}>
            <IconComponent className={`w-6 h-6 ${iconColorClasses[category.id] || 'text-primary'}`} />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {actualToolCount} tools
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;
