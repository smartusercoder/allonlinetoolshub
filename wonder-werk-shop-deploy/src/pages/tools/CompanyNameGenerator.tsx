import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function CompanyNameGenerator() {
  const [names, setNames] = useState<string[]>([]);

  const prefixes = ["Tech", "Data", "Cloud", "Digital", "Cyber", "Smart", "Next", "Global", "Prime", "Meta"];
  const suffixes = ["Systems", "Solutions", "Technologies", "Ventures", "Innovations", "Labs", "Group", "Networks", "Works", "Corp"];

  const generateName = () => {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix}${suffix}`;
  };

  const generate = () => {
    setNames(Array.from({ length: 20 }, generateName));
  };

  if (names.length === 0) generate();

  return (
    <ToolLayout
      title="Company Name Generator"
      description="Generate professional company names"
    >
      <div className="space-y-4">
        <Button onClick={generate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Company Names
        </Button>

        <div className="grid md:grid-cols-3 gap-4">
          {names.map((name, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors text-center"
              onClick={() => {
                navigator.clipboard.writeText(name);
                toast.success("Company name copied!");
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">{name}</span>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
