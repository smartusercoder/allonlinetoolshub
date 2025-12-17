import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function TaglineGenerator() {
  const [taglines, setTaglines] = useState<string[]>([]);

  const templates = [
    "Your solution for _action_ _noun_",
    "_action_ your _noun_ today",
    "The future of _noun_",
    "_action_ better, _action_ smarter",
    "Where _noun_ meets _noun_",
    "_action_ the _adjective_ way",
    "Innovating _noun_ for tomorrow",
    "Your _adjective_ _noun_ partner",
    "_action_ beyond expectations",
    "Transforming _noun_ together"
  ];

  const actions = ["Build", "Create", "Grow", "Transform", "Innovate", "Discover", "Empower", "Elevate"];
  const nouns = ["business", "future", "success", "dreams", "goals", "vision", "innovation", "excellence"];
  const adjectives = ["trusted", "leading", "premier", "innovative", "reliable", "professional"];

  const generateTagline = () => {
    const template = templates[Math.floor(Math.random() * templates.length)];
    return template
      .replace("_action_", actions[Math.floor(Math.random() * actions.length)])
      .replace("_action_", actions[Math.floor(Math.random() * actions.length)])
      .replace("_noun_", nouns[Math.floor(Math.random() * nouns.length)])
      .replace("_noun_", nouns[Math.floor(Math.random() * nouns.length)])
      .replace("_adjective_", adjectives[Math.floor(Math.random() * adjectives.length)]);
  };

  const generate = () => {
    setTaglines(Array.from({ length: 15 }, generateTagline));
  };

  if (taglines.length === 0) generate();

  return (
    <ToolLayout
      title="Tagline Generator"
      description="Generate catchy business taglines"
    >
      <div className="space-y-4">
        <Button onClick={generate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Taglines
        </Button>

        <div className="grid md:grid-cols-2 gap-4">
          {taglines.map((tagline, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(tagline);
                toast.success("Tagline copied!");
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="italic">{tagline}</span>
                <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
