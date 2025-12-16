import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

const WhitespaceVisualizer = () => {
  const [text, setText] = useState("");

  const visualizeWhitespace = (str: string) => {
    return str
      .replace(/ /g, '·')
      .replace(/\t/g, '→')
      .replace(/\n/g, '↵\n');
  };

  return (
    <ToolLayout
      title="Whitespace Visualizer"
      description="Visualize spaces, tabs, and line breaks in text"
    >
      <UsageGuide
        steps={[
          "Paste text with invisible whitespace characters",
          "Spaces become dots (·)",
          "Tabs become arrows (→)",
          "Line breaks become return symbols (↵)"
        ]}
        tips={[
          "Perfect for debugging spacing issues",
          "See hidden formatting characters",
          "Great for comparing text files",
          "Helpful for identifying extra spaces or tabs"
        ]}
      />
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input">Input Text</Label>
          <Textarea
            id="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text with spaces, tabs, and line breaks..."
            rows={8}
          />
        </div>

        {text && (
          <div className="space-y-2">
            <Label>
              <Eye className="inline h-4 w-4 mr-2" />
              Visualized (· = space, → = tab, ↵ = newline)
            </Label>
            <Textarea
              value={visualizeWhitespace(text)}
              readOnly
              rows={8}
              className="font-mono"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default WhitespaceVisualizer;
