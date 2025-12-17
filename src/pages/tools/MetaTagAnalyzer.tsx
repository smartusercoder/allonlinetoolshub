import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MetaTagAnalyzer = () => {
  const [url, setUrl] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const analyzeMetaTags = () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    // Simulated analysis (real implementation would need backend to fetch and parse HTML)
    const mockAnalysis = {
      title: {
        content: "Example Page Title - Brand Name",
        length: 35,
        status: "good"
      },
      description: {
        content: "This is a meta description that describes the page content for search engines and users.",
        length: 92,
        status: "good"
      },
      keywords: {
        present: false,
        status: "warning"
      },
      openGraph: {
        present: true,
        tags: ["og:title", "og:description", "og:image"],
        status: "good"
      },
      twitter: {
        present: true,
        tags: ["twitter:card", "twitter:title"],
        status: "good"
      },
      canonical: {
        present: true,
        url: "https://example.com/page",
        status: "good"
      }
    };

    setAnalysis(mockAnalysis);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "good":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <ToolLayout
      title="Meta Tag Analyzer"
      description="Analyze webpage meta tags for SEO optimization"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <div className="flex gap-2">
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <Button onClick={analyzeMetaTags}>
              <Search className="mr-2 h-4 w-4" />
              Analyze
            </Button>
          </div>
        </div>

        {analysis && (
          <div className="space-y-4 pt-4 border-t">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                {getStatusIcon(analysis.title.status)}
                <div className="flex-1">
                  <p className="font-medium">Title Tag</p>
                  <p className="text-sm text-muted-foreground">{analysis.title.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Length: {analysis.title.length} characters (Optimal: 50-60)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                {getStatusIcon(analysis.description.status)}
                <div className="flex-1">
                  <p className="font-medium">Meta Description</p>
                  <p className="text-sm text-muted-foreground">{analysis.description.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Length: {analysis.description.length} characters (Optimal: 150-160)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                {getStatusIcon(analysis.openGraph.status)}
                <div className="flex-1">
                  <p className="font-medium">Open Graph Tags</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.openGraph.present ? "Present" : "Missing"}
                  </p>
                  {analysis.openGraph.tags && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Tags: {analysis.openGraph.tags.join(", ")}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted rounded-md">
                {getStatusIcon(analysis.canonical.status)}
                <div className="flex-1">
                  <p className="font-medium">Canonical URL</p>
                  <p className="text-sm text-muted-foreground">
                    {analysis.canonical.present ? analysis.canonical.url : "Missing"}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              Note: This is a simulated analysis. For real analysis, use browser extensions or online SEO tools.
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default MetaTagAnalyzer;
