import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getCategoryById } from "@/data/categories";
import { toolsData } from "@/data/toolsData";
import { Helmet } from "react-helmet-async";

export function Breadcrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbs: Array<{ label: string; path: string; isLast: boolean }> = [
    { label: "Home", path: "/", isLast: pathSegments.length === 0 }
  ];

  let currentPath = "";
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    // Determine label based on path
    let label = segment;
    
    // Category pages
    if (pathSegments[index - 1] === "category") {
      const category = getCategoryById(segment);
      label = category?.name || segment;
    }
    // Tool pages (assume direct tool paths like /word-counter)
    else if (index === 0 && segment !== "category") {
      const tool = toolsData.find(t => t.path === `/${segment}`);
      if (tool) {
        // Add category breadcrumb first
        const category = getCategoryById(tool.category);
        if (category) {
          breadcrumbs.push({
            label: category.name,
            path: `/category/${category.id}`,
            isLast: false
          });
        }
        label = tool.title;
      }
    }
    // Static pages
    else if (segment === "about") {
      label = "About Us";
    } else if (segment === "privacy-policy") {
      label = "Privacy Policy";
    } else if (segment === "terms-of-service") {
      label = "Terms of Service";
    } else if (segment === "disclaimer") {
      label = "Disclaimer";
    } else if (segment === "sitemap") {
      label = "Sitemap";
    }

    // Skip adding category segment itself if we're on a tool page
    if (segment !== "category") {
      breadcrumbs.push({ label, path: currentPath, isLast });
    }
  });

  // Generate JSON-LD structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://allonlinetoolshub.com${crumb.path}`
    }))
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.path} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {crumb.isLast ? (
              <span className="font-medium text-foreground" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link 
                to={crumb.path} 
                className="hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
