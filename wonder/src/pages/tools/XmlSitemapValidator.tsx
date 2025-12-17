import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function XmlSitemapValidator() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [stats, setStats] = useState<{urls: number; images: number} | null>(null);
  const { toast } = useToast();

  const validate = () => {
    const validationErrors: string[] = [];
    
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, "text/xml");
      
      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        validationErrors.push("Invalid XML format");
      }
      
      const urlset = xmlDoc.querySelector("urlset");
      if (!urlset) {
        validationErrors.push("Missing <urlset> root element");
      }
      
      const xmlns = urlset?.getAttribute("xmlns");
      if (!xmlns || xmlns !== "http://www.sitemaps.org/schemas/sitemap/0.9") {
        validationErrors.push("Invalid or missing xmlns attribute");
      }
      
      const urls = xmlDoc.querySelectorAll("url");
      if (urls.length === 0) {
        validationErrors.push("No URLs found in sitemap");
      }
      
      if (urls.length > 50000) {
        validationErrors.push("Sitemap exceeds maximum of 50,000 URLs");
      }
      
      let imageCount = 0;
      urls.forEach((url, index) => {
        const loc = url.querySelector("loc");
        if (!loc || !loc.textContent) {
          validationErrors.push(`URL #${index + 1} missing <loc> element`);
        }
        
        const images = url.querySelectorAll("image\\:image");
        imageCount += images.length;
      });
      
      setStats({ urls: urls.length, images: imageCount });
      setErrors(validationErrors);
      setIsValid(validationErrors.length === 0);
      
      toast({
        title: validationErrors.length === 0 ? "Valid Sitemap" : "Invalid Sitemap",
        description: validationErrors.length === 0 
          ? `Found ${urls.length} valid URLs` 
          : `Found ${validationErrors.length} issue(s)`,
        variant: validationErrors.length === 0 ? "default" : "destructive",
      });
    } catch (error) {
      setIsValid(false);
      setErrors(["Failed to parse XML"]);
      toast({
        title: "Error",
        description: "Failed to parse sitemap",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="XML Sitemap Validator"
      description="Validate XML sitemaps"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>XML Sitemap</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={15}
            placeholder='<?xml version="1.0" encoding="UTF-8"?>...'
            className="font-mono"
          />
        </div>
        
        <Button onClick={validate} className="w-full">
          Validate Sitemap
        </Button>
        
        {isValid !== null && (
          <>
            <Card className={`p-4 ${isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="font-semibold mb-2">
                {isValid ? "✓ Valid Sitemap" : "✗ Invalid Sitemap"}
              </div>
              {errors.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </Card>
            
            {stats && (
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Total URLs</div>
                  <div className="text-2xl font-bold">{stats.urls}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Total Images</div>
                  <div className="text-2xl font-bold">{stats.images}</div>
                </Card>
              </div>
            )}
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
