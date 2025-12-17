import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";

export default function Titlecase() {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");

  const convert = () => {
    const small = ['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with'];
    const words = text.toLowerCase().split(' ');
    const result = words.map((word, i) => {
      if (i === 0 || !small.includes(word)) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    });
    setOutput(result.join(' '));
  };

  return (
    <ToolLayout title="Title Case Converter" description="Convert to proper title case">
      <UsageGuide
        steps={[
          "Enter or paste your text",
          "Click 'Convert to Title Case'",
          "Get properly formatted title case",
          "Small words like 'a', 'the', 'and' stay lowercase (except at start)"
        ]}
        tips={[
          "Follows standard title capitalization rules",
          "First word always capitalized",
          "Articles and conjunctions stay lowercase",
          "Perfect for blog titles and headings"
        ]}
        example='"the quick brown fox" → "The Quick Brown Fox"'
      />
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Enter text..." />
        <Button onClick={convert} className="w-full">Convert to Title Case</Button>
        {output && <Textarea value={output} readOnly rows={6} />}
      </div>
    </ToolLayout>
  );
}
