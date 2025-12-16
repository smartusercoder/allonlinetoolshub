import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function OpenGraphGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const { toast } = useToast();

  const ogTags = `<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">
<meta property="og:url" content="${url}">
<meta property="og:site_name" content="${siteName}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${image}">`;

  const copyTags = () => {
    navigator.clipboard.writeText(ogTags);
    toast({
      title: "Copied!",
      description: "Open Graph tags copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Open Graph Generator"
      description="Generate Open Graph meta tags for social media"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title for social media"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Page description for social media"
              rows={3}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Image URL</label>
            <Input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground mt-1">Recommended: 1200x630px</p>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Page URL</label>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Site Name</label>
            <Input
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Your Website Name"
            />
          </div>

          {title && description && (
            <div className="space-y-2">
              <label className="block text-sm font-medium">Generated Open Graph Tags</label>
              <Textarea
                value={ogTags}
                readOnly
                rows={11}
                className="bg-muted font-mono text-sm"
              />
              <Button onClick={copyTags} variant="outline" className="w-full">
                <Copy className="w-4 h-4 mr-2" />
                Copy Open Graph Tags
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
