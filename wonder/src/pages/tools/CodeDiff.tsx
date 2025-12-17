import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const CodeDiff = () => {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");

  const getDiff = () => {
    const lines1 = code1.split("\n");
    const lines2 = code2.split("\n");
    const maxLines = Math.max(lines1.length, lines2.length);
    const diff: { line: number; type: string; content1: string; content2: string }[] = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";

      if (line1 !== line2) {
        diff.push({
          line: i + 1,
          type: !line1 ? "added" : !line2 ? "removed" : "modified",
          content1: line1,
          content2: line2
        });
      }
    }

    return diff;
  };

  const diff = getDiff();

  return (
    <ToolLayout
      title="Code Diff Checker"
      description="Compare code and find differences"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Original Code</Label>
              <Textarea
                value={code1}
                onChange={(e) => setCode1(e.target.value)}
                placeholder="Paste original code here"
                rows={15}
                className="font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label>Modified Code</Label>
              <Textarea
                value={code2}
                onChange={(e) => setCode2(e.target.value)}
                placeholder="Paste modified code here"
                rows={15}
                className="font-mono text-sm"
              />
            </div>
          </div>

          {diff.length > 0 && (
            <div className="space-y-2">
              <Label>Differences Found: {diff.length}</Label>
              <div className="border rounded-lg overflow-hidden">
                {diff.map((item, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    <div className="p-2 bg-muted text-sm font-semibold">
                      Line {item.line} - {item.type === "added" ? "Added" : item.type === "removed" ? "Removed" : "Modified"}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className={`p-3 font-mono text-sm ${item.type === "removed" || item.type === "modified" ? "bg-red-50 dark:bg-red-950/20" : ""}`}>
                        {item.content1 || <span className="text-muted-foreground italic">(empty)</span>}
                      </div>
                      <div className={`p-3 font-mono text-sm border-l ${item.type === "added" || item.type === "modified" ? "bg-green-50 dark:bg-green-950/20" : ""}`}>
                        {item.content2 || <span className="text-muted-foreground italic">(empty)</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {code1 && code2 && diff.length === 0 && (
            <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-500 rounded-lg text-center">
              <p className="text-green-900 dark:text-green-100 font-semibold">✓ No differences found - codes are identical</p>
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default CodeDiff;
