import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const CaseConverter = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const { toast } = useToast();

  const conversions = [
    {
      name: "UPPER CASE",
      convert: (str: string) => str.toUpperCase(),
      key: "upper",
    },
    {
      name: "lower case",
      convert: (str: string) => str.toLowerCase(),
      key: "lower",
    },
    {
      name: "Title Case",
      convert: (str: string) =>
        str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()),
      key: "title",
    },
    {
      name: "Sentence case",
      convert: (str: string) =>
        str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
      key: "sentence",
    },
    {
      name: "camelCase",
      convert: (str: string) =>
        str
          .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
            index === 0 ? word.toLowerCase() : word.toUpperCase()
          )
          .replace(/\s+/g, ''),
      key: "camel",
    },
    {
      name: "snake_case",
      convert: (str: string) =>
        str
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^\w_]/g, ''),
      key: "snake",
    },
  ];

  const handleCopy = (convertedText: string, key: string) => {
    navigator.clipboard.writeText(convertedText);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Case Converter"
      description="Convert text between UPPERCASE, lowercase, Title Case, camelCase, snake_case and more. Free online text case changer."
      keywords={[
        "case converter", "text case converter", "uppercase converter", "lowercase converter",
        "title case converter", "camelcase converter", "snake case converter", "change text case"
      ]}
      category="text"
      faqs={toolFAQs["case-converter"]}
      howToSteps={[
        {
          name: "Enter Your Text",
          text: "Type or paste any text into the input area. You can enter words, sentences, paragraphs, or even code variable names."
        },
        {
          name: "View All Case Options",
          text: "Instantly see your text converted to all available formats: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, and snake_case."
        },
        {
          name: "Copy Your Preferred Format",
          text: "Click the copy button next to any converted text to copy it to your clipboard. A confirmation will appear when successfully copied."
        },
        {
          name: "Use in Your Project",
          text: "Paste the converted text into your document, code editor, or any application. Perfect for formatting code variables, headings, or styling text."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Type or paste your text into the input area",
            "Your text will automatically be converted to all available cases",
            "Click the copy button next to any result to copy it to your clipboard"
          ]}
          tips={[
            "Perfect for formatting code variable names or text styling",
            "camelCase is common in JavaScript, snake_case in Python",
            "Title Case is great for headings and proper names",
            "All conversions happen instantly as you type"
          ]}
        />

        <Textarea
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] text-base"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conversions.map((conversion) => {
            const convertedText = text ? conversion.convert(text) : "";
            return (
              <div
                key={conversion.key}
                className="p-4 border-2 rounded-lg bg-gradient-to-br from-primary/5 to-accent/5 hover:border-primary/50 transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">{conversion.name}</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(convertedText, conversion.key)}
                    disabled={!text}
                  >
                    {copied === conversion.key ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm bg-background/50 p-3 rounded min-h-[60px] break-words">
                  {convertedText || "Text will appear here..."}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </ToolLayout>
  );
};

export default CaseConverter;
