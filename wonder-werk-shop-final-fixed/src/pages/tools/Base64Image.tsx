import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Base64Image() {
  const [base64, setBase64] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBase64(result);
        setImageUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeBase64 = () => {
    try {
      if (base64.startsWith('data:image')) {
        setImageUrl(base64);
        toast({
          title: "Success",
          description: "Base64 decoded successfully",
        });
      } else {
        toast({
          title: "Error",
          description: "Invalid Base64 image string",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decode Base64",
        variant: "destructive",
      });
    }
  };

  const copyBase64 = () => {
    navigator.clipboard.writeText(base64);
    toast({
      title: "Copied!",
      description: "Base64 string copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Base64 Image Encoder/Decoder"
      description="Convert images to Base64 and vice versa"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Base64 String</label>
            <Textarea
              value={base64}
              onChange={(e) => setBase64(e.target.value)}
              placeholder="Paste Base64 string or upload image..."
              rows={6}
              className="font-mono text-xs"
            />
            <div className="flex gap-2 mt-2">
              <Button onClick={decodeBase64} variant="outline" className="flex-1">
                Decode Base64
              </Button>
              <Button onClick={copyBase64} variant="outline" disabled={!base64}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          </div>

          {imageUrl && (
            <div>
              <label className="block mb-2 text-sm font-medium">Preview</label>
              <div className="border rounded-lg p-4 bg-muted">
                <img src={imageUrl} alt="Preview" className="max-w-full mx-auto" />
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
