import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

const HmacGenerator = () => {
  const [input, setInput] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState("sha256");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const hmacSha256 = (message: string, key: string) => {
    const blockSize = 64;
    
    if (key.length > blockSize) {
      key = sha256(key);
    }
    
    if (key.length < blockSize) {
      key = key + '\0'.repeat(blockSize - key.length);
    }

    let oKeyPad = '';
    let iKeyPad = '';
    
    for (let i = 0; i < blockSize; i++) {
      oKeyPad += String.fromCharCode(0x5c ^ key.charCodeAt(i));
      iKeyPad += String.fromCharCode(0x36 ^ key.charCodeAt(i));
    }

    return sha256(oKeyPad + sha256(iKeyPad + message));
  };

  const sha256 = (str: string) => {
    // Simple SHA-256 implementation
    const rightRotate = (value: number, amount: number) => {
      return (value >>> amount) | (value << (32 - amount));
    };

    const k = [
      0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
      0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
      0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
      0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
      0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
      0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
      0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
      0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    let h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    const words: number[] = [];
    const asciiBitLength = str.length * 8;

    str += String.fromCharCode(0x80);
    while (str.length % 64 - 56) str += String.fromCharCode(0x00);

    for (let i = 0; i < str.length; i++) {
      words[i >> 2] |= str.charCodeAt(i) << ((3 - i) % 4) * 8;
    }
    words.push(0);
    words.push(asciiBitLength);

    for (let j = 0; j < words.length; j += 16) {
      const w = words.slice(j, j + 16);
      const oldHash = h;
      h = h.slice(0, 8);

      for (let i = 0; i < 64; i++) {
        const w15 = w[i - 15];
        const w2 = w[i - 2];
        const s0 = w15 ? (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) : 0;
        const s1 = w2 ? (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) : 0;
        w[i] = (w[i] || 0) + (i < 16 ? 0 : (w[i - 16] || 0) + s0 + (w[i - 7] || 0) + s1);

        const a = h[0], e = h[4];
        const S1 = (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25));
        const ch = ((e & h[5]) ^ ((~e) & h[6]));
        const temp1 = h[7] + S1 + ch + k[i] + (w[i] || 0);
        const S0 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22));
        const maj = ((a & h[1]) ^ (a & h[2]) ^ (h[1] & h[2]));
        const temp2 = S0 + maj;

        h = [(temp1 + temp2) | 0].concat(h);
        h[4] = (h[4] + temp1) | 0;
      }

      for (let i = 0; i < 8; i++) {
        h[i] = (h[i] + oldHash[i]) | 0;
      }
    }

    let result = "";
    for (let i = 0; i < 8; i++) {
      for (let j = 3; j >= 0; j--) {
        result += ((h[i] >> (j * 8)) & 255).toString(16).padStart(2, '0');
      }
    }
    return result;
  };

  const generateHmac = () => {
    if (!input || !secret) {
      toast.error("Please provide both input and secret key");
      return;
    }
    const result = hmacSha256(input, secret);
    setHash(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success("HMAC copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="HMAC Generator"
      description="Generate HMAC signatures for message authentication"
    >
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter message to sign"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Secret Key</Label>
            <Input
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter secret key"
            />
          </div>

          <div className="space-y-2">
            <Label>Algorithm</Label>
            <Select value={algorithm} onValueChange={setAlgorithm}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sha256">HMAC-SHA256</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={generateHmac} className="w-full">
            Generate HMAC
          </Button>

          {hash && (
            <div className="space-y-2">
              <Label>HMAC Signature</Label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                  {hash}
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              HMAC (Hash-based Message Authentication Code) is used to verify data integrity and authenticity. 
              It combines a secret key with the message using a cryptographic hash function.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default HmacGenerator;
