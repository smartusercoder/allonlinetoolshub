import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function UsernameGenerator() {
  const [usernames, setUsernames] = useState<string[]>([]);

  const adjectives = ["Cool", "Super", "Mega", "Epic", "Pro", "Dark", "Shadow", "Ninja", "Swift", "Cyber"];
  const nouns = ["Tiger", "Dragon", "Phoenix", "Wolf", "Eagle", "Lion", "Falcon", "Panther", "Storm", "Thunder"];
  const suffixes = ["X", "Pro", "Master", "King", "Legend", "Elite", "Prime", "Alpha", "Omega", "Neo"];

  const generateUsername = () => {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const suffix = Math.random() > 0.5 ? suffixes[Math.floor(Math.random() * suffixes.length)] : "";
    const number = Math.random() > 0.6 ? Math.floor(Math.random() * 999) : "";
    return `${adj}${noun}${suffix}${number}`;
  };

  const generate = () => {
    setUsernames(Array.from({ length: 20 }, generateUsername));
  };

  if (usernames.length === 0) generate();

  return (
    <ToolLayout
      title="Username Generator"
      description="Generate unique and creative usernames"
    >
      <div className="space-y-4">
        <Button onClick={generate} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Usernames
        </Button>

        <div className="grid md:grid-cols-4 gap-4">
          {usernames.map((username, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors text-center"
              onClick={() => {
                navigator.clipboard.writeText(username);
                toast.success("Username copied!");
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <span className="font-semibold">{username}</span>
                <Copy className="h-4 w-4 text-muted-foreground" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
