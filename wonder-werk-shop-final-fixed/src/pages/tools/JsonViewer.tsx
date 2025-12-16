import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, ChevronRight, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const JsonViewer = () => {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<any>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const parseJson = () => {
    try {
      const data = JSON.parse(input);
      setParsed(data);
      setExpanded(new Set());
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please enter valid JSON data",
        variant: "destructive",
      });
      setParsed(null);
    }
  };

  const toggleExpand = (path: string) => {
    const newExpanded = new Set(expanded);
    if (expanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpanded(newExpanded);
  };

  const renderValue = (value: any, path: string = "", level: number = 0): JSX.Element => {
    if (value === null) {
      return <span className="text-muted-foreground">null</span>;
    }
    if (typeof value === 'boolean') {
      return <span className="text-blue-600">{value.toString()}</span>;
    }
    if (typeof value === 'number') {
      return <span className="text-green-600">{value}</span>;
    }
    if (typeof value === 'string') {
      return <span className="text-orange-600">"{value}"</span>;
    }
    if (Array.isArray(value)) {
      const isExpanded = expanded.has(path);
      return (
        <div>
          <button
            onClick={() => toggleExpand(path)}
            className="inline-flex items-center hover:bg-muted px-1 rounded"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-muted-foreground ml-1">[{value.length}]</span>
          </button>
          {isExpanded && (
            <div className="ml-6 border-l-2 border-muted pl-4">
              {value.map((item, i) => (
                <div key={i} className="my-1">
                  <span className="text-muted-foreground">{i}: </span>
                  {renderValue(item, `${path}[${i}]`, level + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    if (typeof value === 'object') {
      const isExpanded = expanded.has(path);
      const keys = Object.keys(value);
      return (
        <div>
          <button
            onClick={() => toggleExpand(path)}
            className="inline-flex items-center hover:bg-muted px-1 rounded"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            <span className="text-muted-foreground ml-1">{"{"}{keys.length}{"}"}</span>
          </button>
          {isExpanded && (
            <div className="ml-6 border-l-2 border-muted pl-4">
              {keys.map(key => (
                <div key={key} className="my-1">
                  <span className="text-purple-600">"{key}"</span>
                  <span className="text-muted-foreground">: </span>
                  {renderValue(value[key], `${path}.${key}`, level + 1)}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return <span>{String(value)}</span>;
  };

  return (
    <ToolLayout
      title="JSON Viewer"
      description="View and explore JSON data in a tree structure"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your JSON data into the input area",
            "Click \"View JSON\" to parse and visualize the data",
            "Click chevrons (▶/▼) to expand or collapse nested objects and arrays",
            "Different data types are color-coded for easy reading"
          ]}
          tips={[
            "Great for debugging API responses",
            "Syntax highlighting helps identify data types quickly",
            "Perfect for exploring complex nested JSON structures",
            "Collapsible view makes large JSON files manageable"
          ]}
          example='{"name": "John", "age": 30, "hobbies": ["reading", "coding"]}'
        />

        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">JSON Input</label>
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='{"name": "John", "age": 30, "items": [1, 2, 3]}'
                rows={6}
                className="w-full font-mono text-sm"
              />
            </div>

            <Button onClick={parseJson} className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              View JSON
            </Button>

            {parsed && (
              <div className="border rounded-lg p-4 bg-muted/30 overflow-x-auto">
                <div className="font-mono text-sm">
                  {renderValue(parsed, 'root')}
                </div>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">Features</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Collapsible tree view for nested objects and arrays</li>
            <li>Syntax highlighting for different data types</li>
            <li>Click chevrons to expand/collapse sections</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default JsonViewer;
