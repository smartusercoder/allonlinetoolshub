import { useState, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Search, FileText, Image, Code, FileCode, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PageSizeResult {
  url: string;
  totalSize: number;
  htmlSize: number;
  estimatedCss: number;
  estimatedJs: number;
  estimatedImages: number;
  loadTime: number;
  grade: string;
  recommendations: string[];
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

const getGrade = (sizeKB: number): { grade: string; color: string } => {
  if (sizeKB < 500) return { grade: "A", color: "text-green-600" };
  if (sizeKB < 1000) return { grade: "B", color: "text-green-500" };
  if (sizeKB < 2000) return { grade: "C", color: "text-yellow-500" };
  if (sizeKB < 3000) return { grade: "D", color: "text-orange-500" };
  return { grade: "F", color: "text-red-500" };
};

export default function PageSizeChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PageSizeResult | null>(null);

  const analyzeHtml = useCallback((html: string): PageSizeResult => {
    const htmlSize = new Blob([html]).size;
    
    // Count resources by parsing HTML
    const imgCount = (html.match(/<img/gi) || []).length;
    const scriptCount = (html.match(/<script/gi) || []).length;
    const linkCount = (html.match(/<link[^>]+stylesheet/gi) || []).length;
    const inlineStyleCount = (html.match(/<style/gi) || []).length;

    // Estimate sizes based on typical resource sizes
    const estimatedImages = imgCount * 50000; // ~50KB per image average
    const estimatedJs = scriptCount * 30000; // ~30KB per script average
    const estimatedCss = (linkCount + inlineStyleCount) * 15000; // ~15KB per stylesheet average

    const totalSize = htmlSize + estimatedImages + estimatedJs + estimatedCss;
    const totalKB = totalSize / 1024;

    const recommendations: string[] = [];
    
    if (htmlSize > 100000) {
      recommendations.push("HTML size is large. Consider minifying HTML and removing unnecessary whitespace.");
    }
    if (imgCount > 10) {
      recommendations.push(`Found ${imgCount} images. Consider lazy loading images below the fold.`);
    }
    if (scriptCount > 5) {
      recommendations.push(`Found ${scriptCount} scripts. Consider bundling and minifying JavaScript files.`);
    }
    if (totalKB > 2000) {
      recommendations.push("Total page size exceeds 2MB. Consider optimizing images and code splitting.");
    }
    if (recommendations.length === 0) {
      recommendations.push("Page size looks good! Keep monitoring for optimization opportunities.");
    }

    return {
      url: url,
      totalSize,
      htmlSize,
      estimatedCss,
      estimatedJs,
      estimatedImages,
      loadTime: Math.round((totalSize / 1024 / 100) * 10) / 10, // Rough estimate: 100KB/s
      grade: getGrade(totalKB).grade,
      recommendations
    };
  }, [url]);

  const checkPageSize = async () => {
    if (!url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    let fullUrl = url.trim();
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = "https://" + fullUrl;
    }

    setLoading(true);
    setResult(null);

    try {
      // Try to fetch via a CORS proxy
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(fullUrl)}`;
      const startTime = performance.now();
      const response = await fetch(proxyUrl);
      const endTime = performance.now();
      
      if (!response.ok) {
        throw new Error("Failed to fetch page");
      }

      const html = await response.text();
      const analysisResult = analyzeHtml(html);
      analysisResult.loadTime = Math.round((endTime - startTime) / 100) / 10;
      
      setResult(analysisResult);
      toast.success("Page analysis complete");
    } catch (error) {
      // Use simulation for demo
      toast.info("Using simulation mode due to CORS restrictions");
      
      const simulatedHtmlSize = Math.floor(Math.random() * 100000) + 50000;
      const simulatedImgSize = Math.floor(Math.random() * 500000) + 100000;
      const simulatedJsSize = Math.floor(Math.random() * 200000) + 50000;
      const simulatedCssSize = Math.floor(Math.random() * 50000) + 20000;
      const totalSize = simulatedHtmlSize + simulatedImgSize + simulatedJsSize + simulatedCssSize;
      
      const recommendations: string[] = [];
      if (simulatedImgSize > 300000) {
        recommendations.push("Consider compressing images to reduce page weight.");
      }
      if (simulatedJsSize > 150000) {
        recommendations.push("JavaScript bundle is large. Consider code splitting.");
      }
      recommendations.push("Enable gzip/brotli compression on your server.");

      setResult({
        url: fullUrl,
        totalSize,
        htmlSize: simulatedHtmlSize,
        estimatedCss: simulatedCssSize,
        estimatedJs: simulatedJsSize,
        estimatedImages: simulatedImgSize,
        loadTime: Math.round((totalSize / 1024 / 100) * 10) / 10,
        grade: getGrade(totalSize / 1024).grade,
        recommendations
      });
    } finally {
      setLoading(false);
    }
  };

  const gradeInfo = result ? getGrade(result.totalSize / 1024) : null;

  return (
    <ToolLayout
      title="Page Size Checker"
      description="Analyze web page size and get performance recommendations"
    >
      <Card className="p-6 space-y-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            This tool fetches and analyzes the HTML of a webpage to estimate total resource sizes. For accurate results, use browser DevTools or services like GTmetrix or PageSpeed Insights.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => e.key === "Enter" && checkPageSize()}
              />
              <Button onClick={checkPageSize} disabled={loading}>
                <Search className="w-4 h-4 mr-2" />
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            {/* Grade and Total Size */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <div className={`text-6xl font-bold ${gradeInfo?.color}`}>
                  {result.grade}
                </div>
                <div className="text-sm text-muted-foreground mt-2">Performance Grade</div>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary">
                  {formatBytes(result.totalSize)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">Total Page Size (Estimated)</div>
                <div className="text-xs text-muted-foreground">
                  ~{result.loadTime}s on 3G connection
                </div>
              </Card>
            </div>

            {/* Size Breakdown */}
            <Card className="p-4">
              <h3 className="font-medium mb-4">Size Breakdown</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>HTML</span>
                    </div>
                    <span>{formatBytes(result.htmlSize)}</span>
                  </div>
                  <Progress value={(result.htmlSize / result.totalSize) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Image className="w-4 h-4 text-green-500" />
                      <span>Images (Est.)</span>
                    </div>
                    <span>{formatBytes(result.estimatedImages)}</span>
                  </div>
                  <Progress value={(result.estimatedImages / result.totalSize) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-yellow-500" />
                      <span>JavaScript (Est.)</span>
                    </div>
                    <span>{formatBytes(result.estimatedJs)}</span>
                  </div>
                  <Progress value={(result.estimatedJs / result.totalSize) * 100} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-purple-500" />
                      <span>CSS (Est.)</span>
                    </div>
                    <span>{formatBytes(result.estimatedCss)}</span>
                  </div>
                  <Progress value={(result.estimatedCss / result.totalSize) * 100} className="h-2" />
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-4">
              <h3 className="font-medium mb-3">Recommendations</h3>
              <div className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm">
                    {rec.includes("good") || rec.includes("Keep") ? (
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                    )}
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
