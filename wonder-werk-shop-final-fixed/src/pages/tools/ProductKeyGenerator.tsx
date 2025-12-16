import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function ProductKeyGenerator() {
  const [format, setFormat] = useState("5-5-5-5-5");
  const [keys, setKeys] = useState<string[]>([]);

  const generateKey = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const segments = format.split("-").map(seg => parseInt(seg));
    
    return segments.map(length => {
      let segment = "";
      for (let i = 0; i < length; i++) {
        segment += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return segment;
    }).join("-");
  };

  const generateKeys = () => {
    setKeys(Array.from({ length: 10 }, generateKey));
  };

  if (keys.length === 0) generateKeys();

  return (
    <ToolLayout
      title="Product Key Generator"
      description="Generate product license keys"
    >
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Key Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5-5-5-5-5">5-5-5-5-5 (25 chars)</SelectItem>
                  <SelectItem value="4-4-4-4">4-4-4-4 (16 chars)</SelectItem>
                  <SelectItem value="6-6-6-6">6-6-6-6 (24 chars)</SelectItem>
                  <SelectItem value="8-8-8">8-8-8 (24 chars)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button onClick={generateKeys} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Keys
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          {keys.map((key, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(key);
                toast.success("Product key copied!");
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{key}</span>
                <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
