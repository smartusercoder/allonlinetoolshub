import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const Base64Encoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const handleEncode = () => {
    try {
      const encoded = btoa(input);
      setOutput(encoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encode text",
        variant: "destructive",
      });
    }
  };

  const handleDecode = () => {
    try {
      const decoded = atob(input);
      setOutput(decoded);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid Base64 string",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Base64 Encoder/Decoder"
      description="Encode and decode Base64 strings easily"
      keywords={["base64 encode", "base64 decode", "base64 converter", "encode text"]}
      category="ConversionTools"
      howToSteps={[
        {
          name: "Choose Operation",
          text: "Select 'Encode' tab to convert plain text to Base64, or 'Decode' tab to convert Base64 back to readable text."
        },
        {
          name: "Enter Your Text",
          text: "Paste or type your text in the input text area. For encoding, enter any plain text. For decoding, enter a valid Base64 string."
        },
        {
          name: "Convert",
          text: "Click the 'Encode' or 'Decode' button to perform the conversion. The result will appear in the output area below."
        },
        {
          name: "Copy Result",
          text: "Click the copy button to copy the converted text to your clipboard for use in your projects or applications."
        }
      ]}
      faqs={toolFAQs["base64-encoder"]}
    >
      <UsageGuide
        steps={[
          "Choose \"Encode\" to convert text to Base64, or \"Decode\" to convert Base64 back to text",
          "Paste or type your input in the text area",
          "Click the corresponding button to convert",
          "Copy the result using the copy button"
        ]}
        tips={[
          "Base64 is commonly used for encoding binary data in text format",
          "Useful for embedding images in HTML/CSS or storing binary data",
          "The encoded output is always larger than the original data"
        ]}
        example="Hello World → SGVsbG8gV29ybGQ="
      />

      <Tabs defaultValue="encode" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>
        
        <TabsContent value="encode" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Input Text</label>
            <Textarea
              placeholder="Enter text to encode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <Button onClick={handleEncode} className="w-full" variant="hero">
            Encode to Base64
          </Button>
        </TabsContent>

        <TabsContent value="decode" className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Base64 String</label>
            <Textarea
              placeholder="Enter Base64 string to decode..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
          <Button onClick={handleDecode} className="w-full" variant="hero">
            Decode from Base64
          </Button>
        </TabsContent>
      </Tabs>

      {output && (
        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium">Result</label>
            <Button size="sm" variant="ghost" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-[150px] bg-muted/30 font-mono text-sm"
          />
        </div>
      )}
    </ToolLayout>
  );
};

export default Base64Encoder;
