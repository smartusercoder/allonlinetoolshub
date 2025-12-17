import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SchemaGenerator = () => {
  const [schemaType, setSchemaType] = useState("Article");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": schemaType,
      name: name,
      description: description,
      url: url,
    };

    if (schemaType === "Article") {
      Object.assign(schema, {
        author: {
          "@type": "Person",
          name: "Author Name"
        },
        datePublished: new Date().toISOString(),
      });
    }

    setResult(JSON.stringify(schema, null, 2));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Schema markup copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Schema Markup Generator"
      description="Generate JSON-LD structured data for SEO"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Schema Type</Label>
            <Select value={schemaType} onValueChange={setSchemaType}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Article">Article</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Organization">Organization</SelectItem>
                <SelectItem value="Person">Person</SelectItem>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="Recipe">Recipe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <Button onClick={generateSchema}>
            <Code className="mr-2 h-4 w-4" />
            Generate Schema
          </Button>

          {result && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Schema Markup</Label>
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy
                </Button>
              </div>
              <Textarea value={result} readOnly rows={15} />
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default SchemaGenerator;
