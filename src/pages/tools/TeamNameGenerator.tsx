import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function TeamNameGenerator() {
  const [names, setNames] = useState<string[]>([]);

  const adjectives = ["Mighty", "Thunder", "Lightning", "Phoenix", "Golden", "Silver", "Royal", "Elite", "Supreme", "Victory"];
  const nouns = ["Warriors", "Dragons", "Titans", "Legends", "Champions", "Strikers", "Eagles", "Knights", "Wolves", "Raiders"];

  const generateName = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj} ${noun}`;
  };

  const generate = () => {
    setNames(Array.from({ length: 20 }, generateName));
  };

  if (names.length === 0) generate();

  return (
    <ToolLayout
      title="Team Name Generator"
      description="Generate creative team names"
    >
      <div className="space-y-4">
        <Button onClick={generate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Team Names
        </Button>

        <div className="grid md:grid-cols-3 gap-4">
          {names.map((name, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors text-center"
              onClick={() => {
                navigator.clipboard.writeText(name);
                toast.success("Team name copied!");
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
