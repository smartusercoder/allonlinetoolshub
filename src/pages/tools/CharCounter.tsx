import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { UsageGuide } from "@/components/UsageGuide";

export default function CharCounter() {
  const [text, setText] = useState("");

  const counts = {
    total: text.length,
    noSpaces: text.replace(/\s/g, '').length,
    letters: text.replace(/[^a-zA-Z]/g, '').length,
    numbers: text.replace(/[^0-9]/g, '').length,
    special: text.replace(/[a-zA-Z0-9\s]/g, '').length
  };

  return (
    <ToolLayout title="Character Counter" description="Count different character types">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Type or paste your text",
            "Character counts update automatically",
            "View total, no spaces, letters, numbers, and special characters"
          ]}
          tips={[
            "Perfect for social media post limits",
            "Useful for writing constraints",
            "Great for text analysis",
            "Real-time counting as you type"
          ]}
        />
      </div>
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={10} placeholder="Enter text..." />
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-muted rounded text-center">
            <div className="text-2xl font-bold">{counts.total}</div>
            <div className="text-sm">Total</div>
          </div>
          <div className="p-4 bg-muted rounded text-center">
            <div className="text-2xl font-bold">{counts.noSpaces}</div>
            <div className="text-sm">No Spaces</div>
          </div>
          <div className="p-4 bg-muted rounded text-center">
            <div className="text-2xl font-bold">{counts.letters}</div>
            <div className="text-sm">Letters</div>
          </div>
          <div className="p-4 bg-muted rounded text-center">
            <div className="text-2xl font-bold">{counts.numbers}</div>
            <div className="text-sm">Numbers</div>
          </div>
          <div className="p-4 bg-muted rounded text-center">
            <div className="text-2xl font-bold">{counts.special}</div>
            <div className="text-sm">Special</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
