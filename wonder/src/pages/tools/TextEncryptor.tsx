import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Unlock } from "lucide-react";

const TextEncryptor = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [method, setMethod] = useState("caesar");
  const [shift, setShift] = useState(3);

  const caesarCipher = (str: string, shiftAmount: number, decrypt: boolean = false) => {
    const actualShift = decrypt ? -shiftAmount : shiftAmount;
    return str.split('').map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const isUpperCase = code >= 65 && code <= 90;
        const base = isUpperCase ? 65 : 97;
        return String.fromCharCode(((code - base + actualShift) % 26 + 26) % 26 + base);
      }
      return char;
    }).join('');
  };

  const rot13 = (str: string) => {
    return caesarCipher(str, 13);
  };

  const encrypt = () => {
    if (!text.trim()) return;
    
    if (method === "caesar") {
      setResult(caesarCipher(text, shift));
    } else if (method === "rot13") {
      setResult(rot13(text));
    }
  };

  const decrypt = () => {
    if (!text.trim()) return;
    
    if (method === "caesar") {
      setResult(caesarCipher(text, shift, true));
    } else if (method === "rot13") {
      setResult(rot13(text)); // ROT13 is symmetric
    }
  };

  return (
    <ToolLayout
      title="Text Encryptor"
      description="Encrypt and decrypt text using Caesar cipher and ROT13"
    >
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="method">Encryption Method</Label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger id="method">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="caesar">Caesar Cipher</SelectItem>
                <SelectItem value="rot13">ROT13</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {method === "caesar" && (
            <div className="space-y-2">
              <Label htmlFor="shift">Shift Amount</Label>
              <Input
                id="shift"
                type="number"
                value={shift}
                onChange={(e) => setShift(parseInt(e.target.value) || 0)}
                min={1}
                max={25}
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="text">Input Text</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to encrypt/decrypt..."
            rows={6}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={encrypt}>
            <Lock className="mr-2 h-4 w-4" />
            Encrypt
          </Button>
          <Button onClick={decrypt} variant="outline">
            <Unlock className="mr-2 h-4 w-4" />
            Decrypt
          </Button>
        </div>

        {result && (
          <div className="space-y-2">
            <Label htmlFor="result">Result</Label>
            <Textarea
              id="result"
              value={result}
              readOnly
              rows={6}
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default TextEncryptor;
