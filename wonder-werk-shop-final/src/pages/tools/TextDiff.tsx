import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

const TextDiff = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const getDifferences = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLines = Math.max(lines1.length, lines2.length);
    const differences = [];

    for (let i = 0; i < maxLines; i++) {
      const line1 = lines1[i] || '';
      const line2 = lines2[i] || '';
      
      if (line1 !== line2) {
        differences.push({
          line: i + 1,
          text1: line1,
          text2: line2,
          type: !line1 ? 'added' : !line2 ? 'removed' : 'modified'
        });
      }
    }

    return differences;
  };

  const differences = getDifferences();

  return (
    <ToolLayout
      title="Text Diff Checker"
      description="Compare two texts and find differences"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your original text in the left text area",
            "Paste the modified version in the right text area",
            "Differences will be highlighted automatically line by line"
          ]}
          tips={[
            "Great for comparing code versions or document revisions",
            "Green highlights show additions, red shows deletions",
            "Line numbers help you locate changes quickly",
            "Empty lines are preserved for accurate comparison"
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Original Text</Label>
            <Textarea
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder="Enter original text..."
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground">{text1.split('\n').length} lines</p>
          </div>

          <div className="space-y-2">
            <Label>Modified Text</Label>
            <Textarea
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder="Enter modified text..."
              rows={15}
              className="font-mono text-sm"
            />
            <p className="text-sm text-muted-foreground">{text2.split('\n').length} lines</p>
          </div>
        </div>

        {differences.length > 0 && (
          <div className="space-y-2">
            <Label>Differences Found: {differences.length}</Label>
            <div className="border rounded-lg p-4 bg-muted/10 space-y-2 max-h-96 overflow-y-auto">
              {differences.map((diff, idx) => (
                <div key={idx} className="text-sm space-y-1">
                  <div className="font-semibold text-muted-foreground">Line {diff.line}:</div>
                  {diff.type === 'removed' && (
                    <div className="bg-red-500/10 border-l-4 border-red-500 p-2 rounded">
                      <span className="text-red-600 dark:text-red-400">- {diff.text1}</span>
                    </div>
                  )}
                  {diff.type === 'added' && (
                    <div className="bg-green-500/10 border-l-4 border-green-500 p-2 rounded">
                      <span className="text-green-600 dark:text-green-400">+ {diff.text2}</span>
                    </div>
                  )}
                  {diff.type === 'modified' && (
                    <>
                      <div className="bg-red-500/10 border-l-4 border-red-500 p-2 rounded">
                        <span className="text-red-600 dark:text-red-400">- {diff.text1}</span>
                      </div>
                      <div className="bg-green-500/10 border-l-4 border-green-500 p-2 rounded">
                        <span className="text-green-600 dark:text-green-400">+ {diff.text2}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {text1 && text2 && differences.length === 0 && (
          <div className="text-center py-8 text-green-600 dark:text-green-400 font-semibold">
            ✓ Texts are identical
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default TextDiff;