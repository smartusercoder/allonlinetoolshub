import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function FakeEmailGenerator() {
  const [emails, setEmails] = useState<string[]>([]);

  const firstNames = ["john", "jane", "mike", "sarah", "alex", "emily", "david", "lisa", "chris", "mary"];
  const lastNames = ["smith", "johnson", "williams", "brown", "jones", "garcia", "miller", "davis", "rodriguez", "martinez"];
  const domains = ["example.com", "test.com", "demo.com", "sample.com", "temp.com"];

  const generateEmail = () => {
    const first = firstNames[Math.floor(Math.random() * firstNames.length)];
    const last = lastNames[Math.floor(Math.random() * lastNames.length)];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const separator = Math.random() > 0.5 ? "." : "_";
    const number = Math.random() > 0.7 ? Math.floor(Math.random() * 999) : "";
    return `${first}${separator}${last}${number}@${domain}`;
  };

  const generateEmails = () => {
    setEmails(Array.from({ length: 20 }, generateEmail));
  };

  if (emails.length === 0) {
    generateEmails();
  }

  return (
    <ToolLayout
      title="Fake Email Generator"
      description="Generate fake email addresses for testing"
    >
      <div className="space-y-4">
        <Button onClick={generateEmails} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Emails
        </Button>

        <div className="grid md:grid-cols-2 gap-4">
          {emails.map((email, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(email);
                toast.success("Email copied!");
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{email}</span>
                <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
