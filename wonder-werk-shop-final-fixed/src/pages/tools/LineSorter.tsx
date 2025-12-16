import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { UsageGuide } from "@/components/UsageGuide";

export default function LineSorter() {
  const [text, setText] = useState("");

  const sorted = text.split('\n').sort((a, b) => a.localeCompare(b)).join('\n');
  const reverse = text.split('\n').sort((a, b) => b.localeCompare(a)).join('\n');
  const random = text.split('\n').sort(() => Math.random() - 0.5).join('\n');

  return (
    <ToolLayout title="Line Sorter" description="Sort text lines multiple ways">
      <UsageGuide
        steps={[
          "Paste or type lines of text",
          "See three sorted versions instantly:",
          "A-Z (alphabetical), Z-A (reverse), and Random"
        ]}
        tips={[
          "Perfect for organizing lists alphabetically",
          "Random sort great for shuffling items",
          "All three versions update in real-time",
          "Each line is treated as a separate item"
        ]}
      />
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Enter lines..." />
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-sm font-semibold mb-2">A-Z</div>
            <Textarea value={sorted} readOnly rows={6} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Z-A</div>
            <Textarea value={reverse} readOnly rows={6} />
          </div>
          <div>
            <div className="text-sm font-semibold mb-2">Random</div>
            <Textarea value={random} readOnly rows={6} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
