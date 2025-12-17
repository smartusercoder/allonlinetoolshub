import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { categories } from "@/data/categories";
import type { ToolCategory } from "@/types/tool.types";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  currentPage?: string;
  category?: ToolCategory;
}

export const Breadcrumb = ({ items, currentPage, category }: BreadcrumbProps) => {
  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = items || [
    { label: "Home", href: "/" }
  ];

  // If category is provided, add it to breadcrumb
  if (category && !items) {
    const categoryData = categories.find(c => c.id === category);
    if (categoryData) {
      breadcrumbItems.push({
        label: categoryData.name,
        href: `/?category=${category}`
      });
    }
  }

  // Add current page as last item
  if (currentPage && !items) {
    breadcrumbItems.push({ label: currentPage });
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `https://allonlinetoolshub.com${item.href}` })
    }))
  };

  return (
    <>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Visual breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            
            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-muted-foreground/50" aria-hidden="true" />
                )}
                
                {item.href && !isLast ? (
                  <Link
                    to={item.href}
                    className="hover:text-primary transition-colors inline-flex items-center gap-1.5"
                  >
                    {index === 0 && <Home className="w-4 h-4" />}
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? "text-foreground font-medium inline-flex items-center gap-1.5" : "inline-flex items-center gap-1.5"}>
                    {index === 0 && <Home className="w-4 h-4" />}
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
};
