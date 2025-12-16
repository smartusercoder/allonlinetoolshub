import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
];

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(quotes[0]);
  const { toast } = useToast();

  const generateQuote = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
    toast({ title: "Copied!", description: "Quote copied to clipboard" });
  };

  return (
    <ToolLayout
      title="Quote Generator"
      description="Generate inspirational and motivational quotes"
      keywords={["quote generator", "random quotes", "inspirational quotes", "motivational quotes"]}
    >
      <Card className="p-8 text-center space-y-6">
        <div className="space-y-4">
          <p className="text-2xl font-serif italic">"{quote.text}"</p>
          <p className="text-lg text-muted-foreground">— {quote.author}</p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={generateQuote}>
            <Sparkles className="w-4 h-4 mr-2" />
            New Quote
          </Button>
          <Button onClick={copyQuote} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copy
          </Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
