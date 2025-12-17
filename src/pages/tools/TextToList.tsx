import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";
import { ExportResults } from "@/components/ExportResults";

export default function TextToList() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    const lines = text.split(/[,;\n]+/).filter(l => l.trim());
    setOutput(lines.map(l => `• ${l.trim()}`).join('\n'));
  };

  return (
    <ToolLayout title="Text to List" description="Convert text to bullet lists">
      <UsageGuide
        steps={[
          "Paste comma, semicolon, or line-separated text",
          "Click 'Convert to List'",
          "Get a bulleted list with • symbols",
          "Each item appears on its own line"
        ]}
        tips={[
          "Accepts commas, semicolons, or line breaks as separators",
          "Automatically trims whitespace",
          "Perfect for formatting lists for documents",
          "Great for creating bullet points"
        ]}
        example='"item1, item2, item3" → "• item1\\n• item2\\n• item3"'
      />
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Enter text..." />
        <Button onClick={convert} className="w-full">Convert to List</Button>
        {output && (
          <>
            <Textarea value={output} readOnly rows={8} />
            <ExportResults data={output} filename="bullet-list" />
          </>
        )}
      </div>
    </ToolLayout>
  );
}
