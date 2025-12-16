import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function DomainNameGenerator() {
  const [domains, setDomains] = useState<string[]>([]);

  const words1 = ["my", "get", "the", "try", "use", "find", "see", "go", "new", "best"];
  const words2 = ["tech", "cloud", "data", "web", "app", "site", "hub", "zone", "box", "link"];
  const tlds = [".com", ".net", ".io", ".co", ".ai", ".app", ".dev", ".tech", ".online", ".site"];

  const generateDomain = () => {
    const w1 = words1[Math.floor(Math.random() * words1.length)];
    const w2 = words2[Math.floor(Math.random() * words2.length)];
    const tld = tlds[Math.floor(Math.random() * tlds.length)];
    return `${w1}${w2}${tld}`;
  };

  const generate = () => {
    setDomains(Array.from({ length: 20 }, generateDomain));
  };

  if (domains.length === 0) generate();

  return (
    <ToolLayout
      title="Domain Name Generator"
      description="Generate available domain name ideas"
    >
      <div className="space-y-4">
        <Button onClick={generate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Domain Names
        </Button>

        <div className="grid md:grid-cols-4 gap-4">
          {domains.map((domain, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors text-center"
              onClick={() => {
                navigator.clipboard.writeText(domain);
                toast.success("Domain copied!");
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-sm">{domain}</span>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
