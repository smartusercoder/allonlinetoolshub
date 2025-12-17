import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function EmojiPicker() {
  const [search, setSearch] = useState("");

  const emojis = [
    { emoji: "😀", name: "smile" },
    { emoji: "😂", name: "laugh" },
    { emoji: "😍", name: "love" },
    { emoji: "🎉", name: "party" },
    { emoji: "🔥", name: "fire" },
    { emoji: "💯", name: "hundred" },
    { emoji: "✅", name: "check" },
    { emoji: "❌", name: "cross" },
    { emoji: "⭐", name: "star" },
    { emoji: "💡", name: "idea" },
    { emoji: "🚀", name: "rocket" },
    { emoji: "💻", name: "computer" },
    { emoji: "📱", name: "phone" },
    { emoji: "🎯", name: "target" },
    { emoji: "🎨", name: "art" },
    { emoji: "📝", name: "note" },
    { emoji: "🔑", name: "key" },
    { emoji: "⚡", name: "lightning" },
    { emoji: "🌟", name: "sparkle" },
    { emoji: "🎵", name: "music" }
  ];

  const filtered = emojis.filter(e => 
    e.name.includes(search.toLowerCase()) || e.emoji.includes(search)
  );

  return (
    <ToolLayout title="Emoji Picker" description="Find and copy emojis">
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Search for emojis by name using the search bar",
            "Browse the emoji grid",
            "Click any emoji to copy it to clipboard",
            "Paste the emoji anywhere you need it"
          ]}
          tips={[
            "Search by name like \"smile\", \"fire\", \"star\"",
            "Great for social media posts and messages",
            "One-click copy makes it super fast",
            "Perfect for adding emojis to documents and emails"
          ]}
        />
        <div className="space-y-4">
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search emojis..." />
        <div className="grid grid-cols-5 gap-2">
          {filtered.map((item, i) => (
            <Card 
              key={i} 
              className="p-4 text-center cursor-pointer hover:bg-muted transition"
              onClick={() => navigator.clipboard.writeText(item.emoji)}
            >
              <div className="text-3xl">{item.emoji}</div>
              <div className="text-xs mt-1">{item.name}</div>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </ToolLayout>
  );
}
