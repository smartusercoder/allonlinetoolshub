import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { UsageGuide } from "@/components/UsageGuide";

const DummyText = () => {
  const [count, setCount] = useState("3");
  const [type, setType] = useState("paragraphs");
  const [style, setStyle] = useState("lorem");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const loremWords = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");
  
  const baconWords = "bacon ipsum dolor amet ball tip brisket ham hock turkey picanha spare ribs pork chop short loin salami chicken strip steak filet mignon tri-tip hamburger venison pancetta sausage drumstick jerky shankle".split(" ");

  const hipsterWords = "artisan skateboard tacos vinyl beard craft beer kale chips organic kombucha messenger bag portland fixie cold-pressed ironic vegan asymmetrical slow-carb meditation pabst flannel edison bulb".split(" ");

  const generateWord = (words: string[]) => {
    return words[Math.floor(Math.random() * words.length)];
  };

  const generateSentence = (words: string[], length = 15) => {
    const sentence = [];
    for (let i = 0; i < length; i++) {
      sentence.push(generateWord(words));
    }
    const text = sentence.join(" ");
    return text.charAt(0).toUpperCase() + text.slice(1) + ".";
  };

  const generateParagraph = (words: string[]) => {
    const sentences = Math.floor(Math.random() * 4) + 3;
    const paragraph = [];
    for (let i = 0; i < sentences; i++) {
      paragraph.push(generateSentence(words));
    }
    return paragraph.join(" ");
  };

  const generate = () => {
    const num = parseInt(count) || 1;
    const wordList = style === "bacon" ? baconWords : style === "hipster" ? hipsterWords : loremWords;
    let result = "";

    if (type === "words") {
      const words = [];
      for (let i = 0; i < num; i++) {
        words.push(generateWord(wordList));
      }
      result = words.join(" ");
    } else if (type === "sentences") {
      const sentences = [];
      for (let i = 0; i < num; i++) {
        sentences.push(generateSentence(wordList));
      }
      result = sentences.join(" ");
    } else {
      const paragraphs = [];
      for (let i = 0; i < num; i++) {
        paragraphs.push(generateParagraph(wordList));
      }
      result = paragraphs.join("\n\n");
    }

    setOutput(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Text copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Dummy Text Generator"
      description="Generate various types of placeholder text"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Choose how many words, sentences, or paragraphs you need",
            "Select text type (words, sentences, paragraphs)",
            "Pick a style: Lorem Ipsum, Bacon Ipsum, or Hipster Ipsum",
            "Click \"Generate Text\" and copy the result"
          ]}
          tips={[
            "Lorem Ipsum is the classic placeholder text",
            "Bacon Ipsum uses food-related words (fun for designers)",
            "Hipster Ipsum for trendy, modern placeholder content",
            "Perfect for mockups, wireframes, and design previews"
          ]}
        />
      </div>
      <Card className="mt-6">
        <CardContent className="pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Count</Label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                min="1"
                max="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="words">Words</SelectItem>
                  <SelectItem value="sentences">Sentences</SelectItem>
                  <SelectItem value="paragraphs">Paragraphs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lorem">Lorem Ipsum</SelectItem>
                  <SelectItem value="bacon">Bacon Ipsum</SelectItem>
                  <SelectItem value="hipster">Hipster Ipsum</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={generate} className="w-full">
            Generate Text
          </Button>

          {output && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Text</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                rows={12}
                className="font-serif"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default DummyText;
