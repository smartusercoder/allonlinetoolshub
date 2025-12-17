import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function StructuredDataValidator() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const { toast } = useToast();

  const validate = () => {
    try {
      const parsed = JSON.parse(input);
      
      const validationErrors: string[] = [];
      
      if (!parsed["@context"]) {
        validationErrors.push("Missing @context property");
      }
      
      if (!parsed["@type"]) {
        validationErrors.push("Missing @type property");
      }
      
      if (parsed["@type"] === "Organization" && !parsed.name) {
        validationErrors.push("Organization must have a name");
      }
      
      if (parsed["@type"] === "Person" && !parsed.name) {
        validationErrors.push("Person must have a name");
      }
      
      if (parsed["@type"] === "Product") {
        if (!parsed.name) validationErrors.push("Product must have a name");
        if (!parsed.image) validationErrors.push("Product should have an image");
      }
      
      if (parsed["@type"] === "Article") {
        if (!parsed.headline) validationErrors.push("Article must have a headline");
        if (!parsed.author) validationErrors.push("Article should have an author");
      }
      
      setErrors(validationErrors);
      setIsValid(validationErrors.length === 0);
      
      toast({
        title: validationErrors.length === 0 ? "Valid" : "Invalid",
        description: validationErrors.length === 0 
          ? "Structured data is valid" 
          : `Found ${validationErrors.length} issue(s)`,
        variant: validationErrors.length === 0 ? "default" : "destructive",
      });
    } catch (error) {
      setIsValid(false);
      setErrors(["Invalid JSON format"]);
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="Structured Data Validator"
      description="Validate JSON-LD structured data"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>JSON-LD Structured Data</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={15}
            placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "Example"}'
            className="font-mono"
          />
        </div>
        
        <Button onClick={validate} className="w-full">
          Validate
        </Button>
        
        {isValid !== null && (
          <Card className={`p-4 ${isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="font-semibold mb-2">
              {isValid ? "✓ Valid Structured Data" : "✗ Invalid Structured Data"}
            </div>
            {errors.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </Card>
    </ToolLayout>
  );
}
