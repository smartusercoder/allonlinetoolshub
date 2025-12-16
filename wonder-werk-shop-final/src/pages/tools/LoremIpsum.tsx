import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const LoremIpsum = () => {
  const [paragraphs, setParagraphs] = useState(3);
  const [words, setWords] = useState(50);
  const [generated, setGenerated] = useState("");
  const { toast } = useToast();

  const loremWords = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation",
    "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat",
  ];

  const generateWords = (count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return result.join(" ");
  };

  const generateParagraphs = (count: number) => {
    let result = [];
    for (let i = 0; i < count; i++) {
      const wordCount = 40 + Math.floor(Math.random() * 60);
      let paragraph = generateWords(wordCount);
      paragraph = paragraph.charAt(0).toUpperCase() + paragraph.slice(1) + ".";
      result.push(paragraph);
    }
    return result.join("\n\n");
  };

  const handleGenerateParagraphs = () => {
    setGenerated(generateParagraphs(paragraphs));
  };

  const handleGenerateWords = () => {
    let text = generateWords(words);
    text = text.charAt(0).toUpperCase() + text.slice(1) + ".";
    setGenerated(text);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Lorem Ipsum Generator"
      description="Generate placeholder text for your designs and mockups"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Choose between Paragraphs or Words tab",
            "Set the quantity (number of paragraphs or words)",
            "Click \"Generate\" to create placeholder text",
            "Copy the generated text for use in your designs"
          ]}
          tips={[
            "Perfect for mockups and wireframes",
            "Paragraphs mode creates full formatted text blocks",
            "Words mode gives you exact word count control",
            "Each generation is slightly randomized",
            "Classic Lorem Ipsum has been the industry standard since the 1500s"
          ]}
        />
      </div>
      <Tabs defaultValue="paragraphs" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
          <TabsTrigger value="words">Words</TabsTrigger>
        </TabsList>

        <TabsContent value="paragraphs" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Number of Paragraphs
            </label>
            <Input
              type="number"
              min={1}
              max={20}
              value={paragraphs}
              onChange={(e) => setParagraphs(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
            />
          </div>
          <Button onClick={handleGenerateParagraphs} className="w-full" variant="hero">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Paragraphs
          </Button>
        </TabsContent>

        <TabsContent value="words" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Number of Words
            </label>
            <Input
              type="number"
              min={1}
              max={500}
              value={words}
              onChange={(e) => setWords(Math.max(1, Math.min(500, parseInt(e.target.value) || 1)))}
            />
          </div>
          <Button onClick={handleGenerateWords} className="w-full" variant="hero">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Words
          </Button>
        </TabsContent>
      </Tabs>

      {generated && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Generated Text</label>
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={generated}
            readOnly
            className="min-h-[300px] bg-muted/30"
          />
        </div>
      )}
    </ToolLayout>
  );
};

export default LoremIpsum;
