import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function CharacterMap() {
  const [search, setSearch] = useState("");
  
  const specialChars = [
    { char: '©', name: 'Copyright', code: '&copy;' },
    { char: '®', name: 'Registered', code: '&reg;' },
    { char: '™', name: 'Trademark', code: '&trade;' },
    { char: '€', name: 'Euro', code: '&euro;' },
    { char: '£', name: 'Pound', code: '&pound;' },
    { char: '¥', name: 'Yen', code: '&yen;' },
    { char: '°', name: 'Degree', code: '&deg;' },
    { char: '±', name: 'Plus-minus', code: '&plusmn;' },
    { char: '×', name: 'Multiply', code: '&times;' },
    { char: '÷', name: 'Divide', code: '&divide;' },
    { char: '→', name: 'Right arrow', code: '&rarr;' },
    { char: '←', name: 'Left arrow', code: '&larr;' },
    { char: '↑', name: 'Up arrow', code: '&uarr;' },
    { char: '↓', name: 'Down arrow', code: '&darr;' },
    { char: '♠', name: 'Spade', code: '&spades;' },
    { char: '♣', name: 'Club', code: '&clubs;' },
    { char: '♥', name: 'Heart', code: '&hearts;' },
    { char: '♦', name: 'Diamond', code: '&diams;' },
  ];

  const filtered = specialChars.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.char.includes(search)
  );

  const copy = (char: string) => {
    navigator.clipboard.writeText(char);
    toast.success(`Copied: ${char}`);
  };

  return (
    <ToolLayout title="Character Map" description="Browse and copy special characters">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Search Characters</Label>
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {filtered.map((char, i) => (
            <Card 
              key={i} 
              className="p-4 text-center cursor-pointer hover:bg-accent transition"
              onClick={() => copy(char.char)}
            >
              <div className="text-3xl mb-1">{char.char}</div>
              <div className="text-xs text-muted-foreground">{char.name}</div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
