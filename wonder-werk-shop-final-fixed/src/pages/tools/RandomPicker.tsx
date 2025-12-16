import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Shuffle } from "lucide-react";

export default function RandomPicker() {
  const [items, setItems] = useState("");
  const [picked, setPicked] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const pickRandom = () => {
    const itemList = items.split('\n').filter(item => item.trim() !== '');
    
    if (itemList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * itemList.length);
    const selectedItem = itemList[randomIndex];
    
    setPicked(selectedItem);
    setHistory(prev => [selectedItem, ...prev.slice(0, 9)]);
  };

  const reset = () => {
    setPicked(null);
    setHistory([]);
  };

  return (
    <ToolLayout
      title="Random Picker"
      description="Pick a random item from your list"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="items">Enter Items (one per line)</Label>
          <Textarea
            id="items"
            value={items}
            onChange={(e) => setItems(e.target.value)}
            rows={10}
            placeholder="Apple&#10;Banana&#10;Orange&#10;Grape&#10;Mango"
            className="font-mono"
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={pickRandom} className="flex-1">
            <Shuffle className="w-4 h-4 mr-2" />
            Pick Random
          </Button>
          <Button onClick={reset} variant="outline">
            Reset
          </Button>
        </div>

        {picked && (
          <Card className="p-6 bg-primary/10 text-center">
            <div className="text-sm text-muted-foreground mb-2">Selected Item</div>
            <div className="text-3xl font-bold text-primary">{picked}</div>
          </Card>
        )}

        {history.length > 0 && (
          <div className="space-y-2">
            <Label>Pick History</Label>
            <Card className="p-4">
              <div className="space-y-1">
                {history.map((item, index) => (
                  <div key={index} className="text-sm text-muted-foreground">
                    {index + 1}. {item}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}