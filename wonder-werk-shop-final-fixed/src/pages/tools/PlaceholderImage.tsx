import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PlaceholderImage() {
  const [width, setWidth] = useState("600");
  const [height, setHeight] = useState("400");
  const [bgColor, setBgColor] = useState("cccccc");
  const [textColor, setTextColor] = useState("333333");
  const [text, setText] = useState("");
  const { toast } = useToast();

  const imageUrl = `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(imageUrl);
    toast({
      title: "Copied!",
      description: "Image URL copied to clipboard",
    });
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.download = `placeholder-${width}x${height}.png`;
    link.href = imageUrl;
    link.click();
  };

  return (
    <ToolLayout
      title="Placeholder Image Generator"
      description="Generate placeholder images for mockups"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Width (px)</label>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min="1"
                max="2000"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Height (px)</label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="1"
                max="2000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Background Color</label>
              <div className="flex gap-2">
                <Input
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
                  placeholder="cccccc"
                  maxLength={6}
                />
                <input
                  type="color"
                  value={`#${bgColor}`}
                  onChange={(e) => setBgColor(e.target.value.slice(1))}
                  className="w-12 h-10 rounded cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Text Color</label>
              <div className="flex gap-2">
                <Input
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value.replace('#', ''))}
                  placeholder="333333"
                  maxLength={6}
                />
                <input
                  type="color"
                  value={`#${textColor}`}
                  onChange={(e) => setTextColor(e.target.value.slice(1))}
                  className="w-12 h-10 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Custom Text (Optional)</label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Leave empty for dimensions"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Preview</label>
            <div className="border rounded-lg p-4 bg-muted flex justify-center">
              <img src={imageUrl} alt="Placeholder" className="max-w-full" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Image URL</label>
            <div className="flex gap-2">
              <Textarea value={imageUrl} readOnly rows={2} className="font-mono text-sm bg-muted" />
              <Button variant="outline" size="icon" onClick={copyUrl}>
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button onClick={downloadImage} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Download Image
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
