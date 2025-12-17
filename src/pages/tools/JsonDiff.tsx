import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function JsonDiff() {
  const [json1, setJson1] = useState("");
  const [json2, setJson2] = useState("");
  const [differences, setDifferences] = useState<string[]>([]);
  const [error, setError] = useState("");

  const findDifferences = () => {
    setError("");
    setDifferences([]);

    try {
      const obj1 = JSON.parse(json1);
      const obj2 = JSON.parse(json2);

      const diffs: string[] = [];

      const compare = (o1: any, o2: any, path: string = "") => {
        if (typeof o1 !== typeof o2) {
          diffs.push(`${path}: Type mismatch (${typeof o1} vs ${typeof o2})`);
          return;
        }

        if (typeof o1 === 'object' && o1 !== null) {
          const keys1 = Object.keys(o1);
          const keys2 = Object.keys(o2);

          const allKeys = new Set([...keys1, ...keys2]);

          allKeys.forEach(key => {
            const newPath = path ? `${path}.${key}` : key;
            
            if (!(key in o1)) {
              diffs.push(`${newPath}: Missing in first JSON`);
            } else if (!(key in o2)) {
              diffs.push(`${newPath}: Missing in second JSON`);
            } else {
              compare(o1[key], o2[key], newPath);
            }
          });
        } else if (o1 !== o2) {
          diffs.push(`${path}: Value difference (${JSON.stringify(o1)} vs ${JSON.stringify(o2)})`);
        }
      };

      compare(obj1, obj2);

      if (diffs.length === 0) {
        setDifferences(["✅ No differences found - JSONs are identical"]);
      } else {
        setDifferences(diffs);
      }
    } catch (e) {
      setError(`Error: ${e instanceof Error ? e.message : 'Invalid JSON'}`);
    }
  };

  return (
    <ToolLayout
      title="JSON Diff Checker"
      description="Compare two JSON objects and find differences"
    >
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>First JSON</Label>
            <Textarea
              value={json1}
              onChange={(e) => setJson1(e.target.value)}
              rows={10}
              placeholder='{"key": "value"}'
              className="font-mono"
            />
          </div>
          
          <div>
            <Label>Second JSON</Label>
            <Textarea
              value={json2}
              onChange={(e) => setJson2(e.target.value)}
              rows={10}
              placeholder='{"key": "value2"}'
              className="font-mono"
            />
          </div>
        </div>

        <Button onClick={findDifferences} className="w-full">
          Find Differences
        </Button>

        {error && (
          <Card className="p-4 bg-destructive/10 text-destructive">
            {error}
          </Card>
        )}

        {differences.length > 0 && !error && (
          <Card className="p-4">
            <Label className="mb-2 block">Differences Found: {differences.length}</Label>
            <div className="space-y-1">
              {differences.map((diff, i) => (
                <div key={i} className="text-sm font-mono p-2 bg-muted rounded">
                  {diff}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
