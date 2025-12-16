import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function SlugGenerator() {
  const [input, setInput] = useState("");
  const [slug, setSlug] = useState("");
  const { toast } = useToast();

  const generateSlug = () => {
    const slug = input
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    setSlug(slug);
  };

  const copySlug = () => {
    navigator.clipboard.writeText(slug);
    toast({
      title: "Copied!",
      description: "Slug copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Text to Slug Generator"
      description="Convert text to URL-friendly slugs"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter or paste your text (title, heading, etc.)",
            "Click \"Generate Slug\"",
            "The URL-friendly slug appears below",
            "Click the copy button to use it"
          ]}
          tips={[
            "Converts to lowercase automatically",
            "Replaces spaces with hyphens",
            "Removes special characters",
            "Perfect for blog URLs, product pages, and SEO",
            "Clean, readable URLs improve SEO rankings"
          ]}
          example="How to Use This Tool → how-to-use-this-tool"
        />
      </div>
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert to slug..."
              rows={4}
            />
          </div>

          <Button onClick={generateSlug} className="w-full">
            Generate Slug
          </Button>

          {slug && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Slug</label>
              <div className="flex gap-2">
                <Input value={slug} readOnly className="font-mono bg-muted" />
                <Button variant="outline" size="icon" onClick={copySlug}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
