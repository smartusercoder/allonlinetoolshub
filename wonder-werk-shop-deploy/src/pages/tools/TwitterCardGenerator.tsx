import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TwitterCardGenerator() {
  const [cardType, setCardType] = useState("summary_large_image");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [siteHandle, setSiteHandle] = useState("");
  const [creatorHandle, setCreatorHandle] = useState("");
  const { toast } = useToast();

  const generateMetaTags = () => {
    let tags = `<meta name="twitter:card" content="${cardType}" />\n`;
    if (title) tags += `<meta name="twitter:title" content="${title}" />\n`;
    if (description) tags += `<meta name="twitter:description" content="${description}" />\n`;
    if (imageUrl) tags += `<meta name="twitter:image" content="${imageUrl}" />\n`;
    if (siteHandle) tags += `<meta name="twitter:site" content="@${siteHandle.replace('@', '')}" />\n`;
    if (creatorHandle) tags += `<meta name="twitter:creator" content="@${creatorHandle.replace('@', '')}" />\n`;
    return tags;
  };

  const copyTags = () => {
    navigator.clipboard.writeText(generateMetaTags());
    toast({ title: "Copied", description: "Meta tags copied to clipboard" });
  };

  return (
    <ToolLayout title="Twitter Card Generator" description="Create Twitter card meta tags">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label>Card Type</Label>
            <Select value={cardType} onValueChange={setCardType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="summary">Summary</SelectItem>
                <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                <SelectItem value="app">App</SelectItem>
                <SelectItem value="player">Player</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Title (max 70 characters)</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value.slice(0, 70))} placeholder="Your page title" />
            <p className="text-xs text-muted-foreground">{title.length}/70</p>
          </div>

          <div className="space-y-2">
            <Label>Description (max 200 characters)</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value.slice(0, 200))} placeholder="Brief description" />
            <p className="text-xs text-muted-foreground">{description.length}/200</p>
          </div>

          <div className="space-y-2">
            <Label>Image URL</Label>
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
            <p className="text-xs text-muted-foreground">Recommended: 1200x628px for large image</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Site @username</Label>
              <Input value={siteHandle} onChange={(e) => setSiteHandle(e.target.value)} placeholder="@yoursite" />
            </div>
            <div className="space-y-2">
              <Label>Creator @username</Label>
              <Input value={creatorHandle} onChange={(e) => setCreatorHandle(e.target.value)} placeholder="@creator" />
            </div>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <Label className="text-lg font-semibold flex items-center gap-2"><Eye className="h-4 w-4" />Preview</Label>
            <div className="border rounded-xl overflow-hidden bg-white">
              {imageUrl && cardType.includes("large") && (
                <div className="aspect-[1.91/1] bg-muted">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                </div>
              )}
              <div className="p-3 space-y-1">
                {!cardType.includes("large") && imageUrl && (
                  <div className="float-left w-24 h-24 mr-3 bg-muted rounded">
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover rounded" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
                <p className="text-xs text-gray-500">example.com</p>
                <p className="font-semibold text-black text-sm">{title || "Your Title Here"}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{description || "Your description"}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Generated Meta Tags</Label>
              <Button variant="outline" size="sm" onClick={copyTags}><Copy className="h-4 w-4 mr-2" />Copy</Button>
            </div>
            <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{generateMetaTags()}</pre>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
