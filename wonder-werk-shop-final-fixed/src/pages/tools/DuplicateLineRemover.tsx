import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sparkles } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const DuplicateLineRemover = () => {
  const [text, setText] = useState("");

  const removeDuplicates = (str: string) => {
    const lines = str.split('\n');
    const unique = Array.from(new Set(lines));
    return unique.join('\n');
  };

  const result = text ? removeDuplicates(text) : "";
  const originalLines = text.split('\n').length;
  const uniqueLines = result.split('\n').length;
  const removed = originalLines - uniqueLines;

  return (
    <ToolLayout
      title="Duplicate Line Remover"
      description="Remove duplicate lines from text"
    >
      <UsageGuide
        steps={[
          "Paste text with potential duplicate lines",
          "Duplicates are automatically removed",
          "See count of removed duplicates",
          "Result shows only unique lines"
        ]}
        tips={[
          "Keeps only the first occurrence of each line",
          "Case-sensitive matching",
          "Perfect for cleaning lists",
          "Shows how many duplicates were found"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Input Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text with duplicate lines..."
            rows={8}
          />
        </div>

        {result && (
          <>
            <div className="p-3 bg-primary/10 rounded-md">
              <Sparkles className="inline h-4 w-4 mr-2" />
              <span className="text-sm">
                Removed {removed} duplicate line{removed !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-2">
              <Label>Result ({uniqueLines} unique lines)</Label>
              <Textarea value={result} readOnly rows={8} />
            </div>
          </>
        )}
      </Card>
    </ToolLayout>
  );
};

export default DuplicateLineRemover;
