import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function MetaTagsGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const { toast } = useToast();

  const metaTags = `<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">`;

  const copyTags = () => {
    navigator.clipboard.writeText(metaTags);
    toast({
      title: "Copied!",
      description: "Meta tags copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Meta Tags Generator"
      description="Generate SEO meta tags for your website"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Page Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your Page Title (max 60 characters)"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">{title.length}/60 characters</p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Page description (max 160 characters)"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground mt-1">{description.length}/160 characters</p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Keywords (comma-separated)</label>
            <Input
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Author</label>
            <Input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name or company"
            />
          </div>

          {title && description && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Generated Meta Tags</label>
              <Textarea
                value={metaTags}
                readOnly
                rows={6}
                className="bg-muted font-mono text-sm"
              />
              <Button onClick={copyTags} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Meta Tags
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
