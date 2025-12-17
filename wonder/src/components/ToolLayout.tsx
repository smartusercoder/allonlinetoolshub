import { ReactNode, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Lock, Gift, ChevronRight, Star, ArrowUp } from "lucide-react";
import { LoadingOverlay } from "@/components/LoadingSpinner";
import { SEO } from "@/components/SEO";
import { toolsData } from "@/data/toolsData";
import { categories } from "@/data/categories";
import ToolCard from "@/components/ToolCard";

interface FAQ {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

interface ArticleData {
  headline: string;
  description: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  articleBody?: string;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  keywords?: string[];
  category?: string;
  faqs?: FAQ[];
  howToSteps?: HowToStep[];
  articleData?: ArticleData;
  schemaType?: "WebApplication" | "SoftwareApplication" | "WebPage" | "Article";
}

// Color classes for different categories
const colorClasses: Record<string, string> = {
  'text': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'image': 'bg-violet-500/10 text-violet-500 border-violet-500/20',
  'pdf': 'bg-red-500/10 text-red-500 border-red-500/20',
  'code': 'bg-green-500/10 text-green-500 border-green-500/20',
  'seo': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'math': 'bg-teal-500/10 text-teal-500 border-teal-500/20',
  'converter': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'crypto': 'bg-slate-600/10 text-slate-600 border-slate-600/20',
  'social': 'bg-rose-500/10 text-rose-500 border-rose-500/20',
  'generator': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'file': 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  'color': 'bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20',
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
  'social': 'text-rose-500',
  'generator': 'text-purple-500',
  'file': 'text-orange-500',
  'color': 'text-fuchsia-500',
};

export const ToolLayout = ({ 
  title, 
  description, 
  children, 
  isLoading, 
  loadingText, 
  keywords: propKeywords, 
  category: propCategory, 
  faqs, 
  howToSteps,
  articleData,
  schemaType = "WebApplication"
}: ToolLayoutProps) => {
  const location = useLocation();
  const currentToolId = location.pathname.replace("/tool/", "");
  
  // Get current tool data
  const currentTool = useMemo(() => 
    toolsData.find(t => t.id === currentToolId),
    [currentToolId]
  );

  // Get category data
  const categoryData = useMemo(() => 
    categories.find(c => c.id === currentTool?.category),
    [currentTool]
  );

  // Auto-inject keywords and category from toolsData if not provided
  const keywords = useMemo(() => {
    if (propKeywords && propKeywords.length > 0) return propKeywords;
    if (currentTool?.tags && currentTool.tags.length > 0) {
      return currentTool.tags.slice(0, 15);
    }
    return [title.toLowerCase(), "online tool", "free tool", "web tool"];
  }, [propKeywords, currentTool, title]);

  const category = propCategory || currentTool?.category || "utility";

  // Get related tools from the same category
  const relatedTools = useMemo(() => {
    return toolsData
      .filter(tool => tool.category === category && tool.id !== currentToolId)
      .slice(0, 4);
  }, [category, currentToolId]);

  const IconComponent = currentTool?.icon;
  const categoryColor = category;

  return (
    <>
      <SEO
        title={title}
        description={description}
        toolName={title}
        keywords={keywords}
        category={category}
        schemaType={schemaType}
        faqs={faqs}
        howToSteps={howToSteps}
        articleData={articleData}
        type={schemaType === "Article" ? "article" : "website"}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-6 md:py-8">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4 flex-wrap">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              {categoryData && (
                <>
                  <Link 
                    to={`/category/${categoryData.id}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {categoryData.name}
                  </Link>
                  <ChevronRight className="w-3 h-3" />
                </>
              )}
              <span className="text-foreground">{title}</span>
            </nav>

            <div className="flex flex-col md:flex-row items-start gap-4">
              {IconComponent && (
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${colorClasses[categoryColor] || 'bg-primary/10 text-primary border-primary/20'}`}>
                  <IconComponent className={`w-6 h-6 ${iconColorClasses[categoryColor] || 'text-primary'}`} />
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {title}
                  </h1>
                  {currentTool?.featured && (
                    <Badge className="bg-amber-500/10 text-amber-600 border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Interface */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Tool Content Card */}
              <Card>
                <CardContent className="p-6 relative">
                  {isLoading && <LoadingOverlay text={loadingText} />}
                  {children}
                </CardContent>
              </Card>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Shield className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">100% Browser-based</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Zap className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Instant Processing</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Lock className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Files Stay Private</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-card border border-border">
                  <Gift className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">Free Forever</p>
                </div>
              </div>

              {/* FAQ Section */}
              {faqs && faqs.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <Card key={index}>
                        <CardContent className="p-5">
                          <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                          <p className="text-muted-foreground text-sm">{faq.answer}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )}

              {/* How To Steps */}
              {howToSteps && howToSteps.length > 0 && (
                <section className="mt-8">
                  <h2 className="font-display text-xl font-bold text-foreground mb-6">How to Use {title}</h2>
                  <div className="space-y-4">
                    {howToSteps.map((step, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{step.name}</h3>
                          <p className="text-muted-foreground text-sm">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section className="py-8 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Related Tools
                  </h2>
                  {categoryData && (
                    <Link to={`/category/${categoryData.id}`} className="text-sm text-primary hover:underline flex items-center gap-1">
                      View All
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {relatedTools.map((relatedTool) => (
                    <ToolCard key={relatedTool.id} tool={relatedTool} showCategory={false} />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};
