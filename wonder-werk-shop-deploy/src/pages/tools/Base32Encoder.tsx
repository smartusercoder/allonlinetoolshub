import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const Base32Encoder = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const base32Encode = (str: string): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let bits = '';
    let result = '';

    for (let i = 0; i < str.length; i++) {
      bits += str.charCodeAt(i).toString(2).padStart(8, '0');
    }

    while (bits.length % 5 !== 0) {
      bits += '0';
    }

    for (let i = 0; i < bits.length; i += 5) {
      const chunk = bits.substr(i, 5);
      result += alphabet[parseInt(chunk, 2)];
    }

    while (result.length % 8 !== 0) {
      result += '=';
    }

    return result;
  };

  const base32Decode = (str: string): string => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    str = str.replace(/=+$/, '');
    let bits = '';

    for (let i = 0; i < str.length; i++) {
      const val = alphabet.indexOf(str[i].toUpperCase());
      if (val === -1) return 'Invalid Base32 string';
      bits += val.toString(2).padStart(5, '0');
    }

    let result = '';
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      const byte = bits.substr(i, 8);
      result += String.fromCharCode(parseInt(byte, 2));
    }

    return result;
  };

  const handleEncode = () => {
    setOutput(base32Encode(input));
  };

  const handleDecode = () => {
    setOutput(base32Decode(input));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Base32 Encoder/Decoder"
      description="Encode and decode Base32 strings"
    >
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="encode">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encode">Encode</TabsTrigger>
              <TabsTrigger value="decode">Decode</TabsTrigger>
            </TabsList>

            <TabsContent value="encode" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Text to Encode</Label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to encode"
                  rows={6}
                />
              </div>

              <Button onClick={handleEncode} className="w-full">
                Encode to Base32
              </Button>
            </TabsContent>

            <TabsContent value="decode" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Base32 to Decode</Label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter Base32 string to decode"
                  rows={6}
                  className="font-mono"
                />
              </div>

              <Button onClick={handleDecode} className="w-full">
                Decode from Base32
              </Button>
            </TabsContent>
          </Tabs>

          {output && (
            <div className="space-y-2 mt-6">
              <div className="flex justify-between items-center">
                <Label>Result</Label>
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                  Copy
                </Button>
              </div>
              <Textarea
                value={output}
                readOnly
                rows={6}
                className="font-mono text-sm"
              />
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg mt-6">
            <p className="text-sm text-muted-foreground">
              Base32 encoding is similar to Base64 but uses only letters and digits 2-7, making it more human-readable and case-insensitive.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default Base32Encoder;
