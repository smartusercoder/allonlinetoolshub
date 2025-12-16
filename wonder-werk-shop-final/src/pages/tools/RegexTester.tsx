import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const RegexTester = () => {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [replacement, setReplacement] = useState("");
  const { toast } = useToast();

  const getMatches = () => {
    if (!pattern || !testString) return [];
    
    try {
      const regex = new RegExp(pattern, flags);
      const matches = testString.match(regex);
      return matches || [];
    } catch {
      return [];
    }
  };

  const getHighlighted = () => {
    if (!pattern || !testString) return testString;
    
    try {
      const regex = new RegExp(pattern, flags);
      return testString.replace(regex, (match) => `⟪${match}⟫`);
    } catch {
      return testString;
    }
  };

  const getReplaced = () => {
    if (!pattern || !testString) return "";
    
    try {
      const regex = new RegExp(pattern, flags);
      return testString.replace(regex, replacement);
    } catch {
      return "";
    }
  };

  const matches = getMatches();
  const highlighted = getHighlighted();
  const replaced = getReplaced();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <ToolLayout
      title="Regex Tester"
      description="Test and validate regular expressions"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter your regex pattern (e.g., for phone numbers)",
            "Set flags like 'g' (global), 'i' (case insensitive)",
            "Paste test text to match against",
            "See matches highlighted and counted",
            "Optionally add replacement text to test substitutions"
          ]}
          tips={[
            "Use 'g' flag to find all matches (not just the first)",
            "Use 'i' flag for case-insensitive matching",
            "Test patterns like emails, phone numbers, dates",
            "Great for validating input before using in code",
            "Matches are shown with count and highlighted"
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label>Regular Expression Pattern</Label>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g., \d{3}-\d{3}-\d{4}"
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>Flags</Label>
            <Input
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="g, i, m, etc."
              className="font-mono"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Test String</Label>
          <Textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against your regex..."
            rows={6}
          />
        </div>

        {pattern && testString && (
          <>
            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded">
              <div className="text-sm font-semibold mb-2">
                Matches found: {matches.length}
              </div>
              {matches.length > 0 && (
                <div className="space-y-1">
                  {matches.map((match, idx) => (
                    <div key={idx} className="font-mono text-sm">
                      [{idx + 1}] "{match}"
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Highlighted Text</Label>
                <Button onClick={() => copyToClipboard(highlighted, "Highlighted text")} variant="ghost" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={highlighted}
                readOnly
                rows={6}
                className="font-mono text-sm bg-muted"
              />
            </div>

            <div className="space-y-2">
              <Label>Replacement Text (optional)</Label>
              <Input
                value={replacement}
                onChange={(e) => setReplacement(e.target.value)}
                placeholder="Enter replacement text..."
              />
            </div>

            {replacement && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Replaced Result</Label>
                  <Button onClick={() => copyToClipboard(replaced, "Result")} variant="ghost" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={replaced}
                  readOnly
                  rows={6}
                  className="font-mono text-sm bg-muted"
                />
              </div>
            )}
          </>
        )}

        <div className="text-sm text-muted-foreground p-4 bg-muted/30 rounded-lg space-y-1">
          <p><strong>Common flags:</strong></p>
          <div className="space-y-1 font-mono">
            <div>g - Global (find all matches)</div>
            <div>i - Case insensitive</div>
            <div>m - Multiline</div>
            <div>s - Dotall (. matches newlines)</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default RegexTester;