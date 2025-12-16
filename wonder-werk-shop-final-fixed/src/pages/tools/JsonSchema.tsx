import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function JsonSchema() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const getType = (value: any): string => {
    if (value === null) return "null";
    if (Array.isArray(value)) return "array";
    return typeof value;
  };

  const generateSchema = (obj: any): any => {
    const type = getType(obj);
    
    if (type === "object") {
      const properties: any = {};
      const required: string[] = [];
      
      for (const key in obj) {
        properties[key] = generateSchema(obj[key]);
        required.push(key);
      }
      
      return {
        type: "object",
        properties,
        required
      };
    }
    
    if (type === "array") {
      if (obj.length === 0) {
        return {
          type: "array",
          items: {}
        };
      }
      return {
        type: "array",
        items: generateSchema(obj[0])
      };
    }
    
    return { type };
  };

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        ...generateSchema(parsed)
      };
      setOutput(JSON.stringify(schema, null, 2));
      toast({
        title: "Success",
        description: "JSON Schema generated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON input",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="JSON to JSON Schema"
      description="Generate JSON Schema from JSON data"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>JSON Input</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            placeholder='{"name": "John", "age": 30}'
            className="font-mono"
          />
        </div>
        
        <Button onClick={convert} className="w-full">
          Generate Schema
        </Button>
        
        {output && (
          <div className="space-y-2">
            <Label>JSON Schema</Label>
            <Textarea
              value={output}
              readOnly
              rows={15}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
