import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function SocialPreviewGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const copyMeta = () => {
    const meta = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${imageUrl}">`;

    navigator.clipboard.writeText(meta);
    toast({
      title: "Copied",
      description: "Meta tags copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Social Media Preview Generator"
      description="Generate social media meta tags"
    >
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Page title"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">{title.length}/60 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Page description"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">{description.length}/160 characters</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-xs text-muted-foreground">Recommended: 1200x630px</p>
          </div>

          <Button onClick={copyMeta} className="w-full">
            Copy Meta Tags
          </Button>
        </Card>

        {title && description && (
          <Card className="p-6">
            <Label className="mb-3 block">Preview</Label>
            <div className="border rounded-lg overflow-hidden">
              {imageUrl && (
                <div className="bg-muted h-32 flex items-center justify-center">
                  <img src={imageUrl} alt="Preview" className="max-h-full object-cover w-full" onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }} />
                </div>
              )}
              <div className="p-4 bg-card">
                <div className="text-sm text-muted-foreground mb-1">{url || 'example.com'}</div>
                <div className="font-semibold mb-1">{title || 'Page Title'}</div>
                <div className="text-sm text-muted-foreground">{description || 'Page description'}</div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
