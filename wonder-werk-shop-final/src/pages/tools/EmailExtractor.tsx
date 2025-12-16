import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EmailExtractor() {
  const [input, setInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const { toast } = useToast();

  const extractEmails = () => {
    const emailRegex = /[\w.-]+@[\w.-]+\.\w+/g;
    const found = input.match(emailRegex) || [];
    const unique = [...new Set(found)];
    setEmails(unique);
    
    toast({
      title: "Success",
      description: `Found ${unique.length} unique email(s)`,
    });
  };

  const copyAll = () => {
    navigator.clipboard.writeText(emails.join('\n'));
    toast({
      title: "Copied!",
      description: "All emails copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Email Extractor"
      description="Extract email addresses from text"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Input Text</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste text containing emails..."
              rows={8}
            />
          </div>

          <Button onClick={extractEmails} className="w-full">
            Extract Emails
          </Button>

          {emails.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">
                  Found {emails.length} email(s)
                </label>
                <Button onClick={copyAll} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {emails.map((email, index) => (
                  <Badge key={index} variant="secondary" className="font-mono text-sm">
                    {email}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
