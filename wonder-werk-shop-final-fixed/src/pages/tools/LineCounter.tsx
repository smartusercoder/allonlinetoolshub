import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function LineCounter() {
  const [text, setText] = useState("");

  const lines = text.split('\n').length;
  const nonEmptyLines = text.split('\n').filter(line => line.trim()).length;
  const emptyLines = lines - nonEmptyLines;

  return (
    <ToolLayout
      title="Line Counter"
      description="Count total, empty, and non-empty lines"
    >
      <UsageGuide
        steps={[
          "Paste or type text in the textarea",
          "Line counts update automatically",
          "See total, non-empty, and empty line counts",
          "Perfect for code analysis and text stats"
        ]}
        tips={[
          "Useful for analyzing log files",
          "Great for code metrics",
          "Counts blank lines separately",
          "Real-time counting as you type"
        ]}
      />
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter or paste text..."
              rows={12}
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-3xl font-bold text-primary">{lines}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Lines</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-3xl font-bold text-green-600">{nonEmptyLines}</div>
              <div className="text-sm text-muted-foreground mt-1">Non-Empty</div>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="text-3xl font-bold text-orange-600">{emptyLines}</div>
              <div className="text-sm text-muted-foreground mt-1">Empty</div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
