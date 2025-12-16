import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LoremIpsumHtml() {
  const [count, setCount] = useState("3");
  const [tag, setTag] = useState("p");

  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  
  const generateHtml = () => {
    const c = parseInt(count);
    return Array.from({ length: c }, (_, i) => `<${tag}>${lorem}</${tag}>`).join('\n');
  };

  const html = generateHtml();

  return (
    <ToolLayout
      title="Lorem Ipsum with HTML"
      description="Generate HTML lorem ipsum text"
    >
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="count">Number of Elements</Label>
            <Input
              id="count"
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>HTML Tag</Label>
            <Select value={tag} onValueChange={setTag}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p">Paragraph (p)</SelectItem>
                <SelectItem value="div">Div</SelectItem>
                <SelectItem value="span">Span</SelectItem>
                <SelectItem value="li">List Item (li)</SelectItem>
                <SelectItem value="h1">Heading 1 (h1)</SelectItem>
                <SelectItem value="h2">Heading 2 (h2)</SelectItem>
                <SelectItem value="h3">Heading 3 (h3)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Preview</Label>
          <div className="border rounded-lg p-4 overflow-auto max-h-[300px]" dangerouslySetInnerHTML={{ __html: html }} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>HTML Code</Label>
            <Button onClick={() => {
              navigator.clipboard.writeText(html);
              toast.success("Copied!");
            }} size="sm">
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
          <Textarea value={html} readOnly rows={10} className="font-mono text-xs" />
        </div>
      </Card>
    </ToolLayout>
  );
}
