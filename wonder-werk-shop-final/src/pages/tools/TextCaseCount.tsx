import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UsageGuide } from "@/components/UsageGuide";

export default function TextCaseCount() {
  const [text, setText] = useState("");

  const count = () => {
    const uppercase = (text.match(/[A-Z]/g) || []).length;
    const lowercase = (text.match(/[a-z]/g) || []).length;
    const digits = (text.match(/[0-9]/g) || []).length;
    const special = text.length - uppercase - lowercase - digits - (text.match(/\s/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;

    return { uppercase, lowercase, digits, special, spaces };
  };

  const stats = count();

  return (
    <ToolLayout title="Text Case Counter" description="Count uppercase, lowercase, and other characters">
      <UsageGuide
        steps={[
          "Type or paste your text",
          "Counts update automatically as you type",
          "View breakdown by character type",
          "See uppercase, lowercase, digits, special chars, and spaces"
        ]}
        tips={[
          "Perfect for analyzing text composition",
          "Useful for password strength analysis",
          "Great for data validation",
          "Real-time counting as you type"
        ]}
      />
      <div className="space-y-4">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Enter Text</Label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border rounded min-h-32"
              placeholder="Enter text to analyze..."
            />
          </div>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Uppercase</div>
            <div className="text-2xl font-bold">{stats.uppercase}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Lowercase</div>
            <div className="text-2xl font-bold">{stats.lowercase}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Digits</div>
            <div className="text-2xl font-bold">{stats.digits}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Special Chars</div>
            <div className="text-2xl font-bold">{stats.special}</div>
          </Card>
          <Card className="p-4">
            <div className="text-sm text-muted-foreground">Spaces</div>
            <div className="text-2xl font-bold">{stats.spaces}</div>
          </Card>
          <Card className="p-4 bg-primary/10">
            <div className="text-sm text-muted-foreground">Total</div>
            <div className="text-2xl font-bold text-primary">{text.length}</div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
