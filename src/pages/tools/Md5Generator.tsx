import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Hash, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { UsageGuide } from "@/components/UsageGuide";

const Md5Generator = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const md5 = (str: string) => {
    const rotateLeft = (n: number, s: number) => (n << s) | (n >>> (32 - s));
    const addUnsigned = (x: number, y: number) => {
      const lsw = (x & 0xFFFF) + (y & 0xFFFF);
      const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    };

    const ff = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned((b & c) | ((~b) & d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const gg = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned((b & d) | (c & (~d)), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const hh = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(b ^ c ^ d, x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const ii = (a: number, b: number, c: number, d: number, x: number, s: number, ac: number) => {
      a = addUnsigned(a, addUnsigned(addUnsigned(c ^ (b | (~d)), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    };

    const convertToWordArray = (str: string) => {
      const lWordCount = ((str.length + 8) >> 6) + 1;
      const lWordArray = new Array(lWordCount * 16).fill(0);
      
      for (let i = 0; i < str.length; i++) {
        lWordArray[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
      }
      
      lWordArray[str.length >> 2] |= 0x80 << ((str.length % 4) * 8);
      lWordArray[lWordCount * 16 - 2] = str.length * 8;
      
      return lWordArray;
    };

    const wordToHex = (n: number) => {
      let hex = "";
      for (let i = 0; i <= 3; i++) {
        const byte = (n >>> (i * 8)) & 255;
        hex += ("0" + byte.toString(16)).slice(-2);
      }
      return hex;
    };

    const x = convertToWordArray(str);
    let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;

    for (let i = 0; i < x.length; i += 16) {
      const olda = a, oldb = b, oldc = c, oldd = d;

      a = ff(a, b, c, d, x[i + 0], 7, 0xD76AA478);
      d = ff(d, a, b, c, x[i + 1], 12, 0xE8C7B756);
      c = ff(c, d, a, b, x[i + 2], 17, 0x242070DB);
      b = ff(b, c, d, a, x[i + 3], 22, 0xC1BDCEEE);
      a = ff(a, b, c, d, x[i + 4], 7, 0xF57C0FAF);
      d = ff(d, a, b, c, x[i + 5], 12, 0x4787C62A);
      c = ff(c, d, a, b, x[i + 6], 17, 0xA8304613);
      b = ff(b, c, d, a, x[i + 7], 22, 0xFD469501);
      a = ff(a, b, c, d, x[i + 8], 7, 0x698098D8);
      d = ff(d, a, b, c, x[i + 9], 12, 0x8B44F7AF);
      c = ff(c, d, a, b, x[i + 10], 17, 0xFFFF5BB1);
      b = ff(b, c, d, a, x[i + 11], 22, 0x895CD7BE);
      a = ff(a, b, c, d, x[i + 12], 7, 0x6B901122);
      d = ff(d, a, b, c, x[i + 13], 12, 0xFD987193);
      c = ff(c, d, a, b, x[i + 14], 17, 0xA679438E);
      b = ff(b, c, d, a, x[i + 15], 22, 0x49B40821);

      a = gg(a, b, c, d, x[i + 1], 5, 0xF61E2562);
      d = gg(d, a, b, c, x[i + 6], 9, 0xC040B340);
      c = gg(c, d, a, b, x[i + 11], 14, 0x265E5A51);
      b = gg(b, c, d, a, x[i + 0], 20, 0xE9B6C7AA);
      a = gg(a, b, c, d, x[i + 5], 5, 0xD62F105D);
      d = gg(d, a, b, c, x[i + 10], 9, 0x02441453);
      c = gg(c, d, a, b, x[i + 15], 14, 0xD8A1E681);
      b = gg(b, c, d, a, x[i + 4], 20, 0xE7D3FBC8);
      a = gg(a, b, c, d, x[i + 9], 5, 0x21E1CDE6);
      d = gg(d, a, b, c, x[i + 14], 9, 0xC33707D6);
      c = gg(c, d, a, b, x[i + 3], 14, 0xF4D50D87);
      b = gg(b, c, d, a, x[i + 8], 20, 0x455A14ED);
      a = gg(a, b, c, d, x[i + 13], 5, 0xA9E3E905);
      d = gg(d, a, b, c, x[i + 2], 9, 0xFCEFA3F8);
      c = gg(c, d, a, b, x[i + 7], 14, 0x676F02D9);
      b = gg(b, c, d, a, x[i + 12], 20, 0x8D2A4C8A);

      a = hh(a, b, c, d, x[i + 5], 4, 0xFFFA3942);
      d = hh(d, a, b, c, x[i + 8], 11, 0x8771F681);
      c = hh(c, d, a, b, x[i + 11], 16, 0x6D9D6122);
      b = hh(b, c, d, a, x[i + 14], 23, 0xFDE5380C);
      a = hh(a, b, c, d, x[i + 1], 4, 0xA4BEEA44);
      d = hh(d, a, b, c, x[i + 4], 11, 0x4BDECFA9);
      c = hh(c, d, a, b, x[i + 7], 16, 0xF6BB4B60);
      b = hh(b, c, d, a, x[i + 10], 23, 0xBEBFBC70);
      a = hh(a, b, c, d, x[i + 13], 4, 0x289B7EC6);
      d = hh(d, a, b, c, x[i + 0], 11, 0xEAA127FA);
      c = hh(c, d, a, b, x[i + 3], 16, 0xD4EF3085);
      b = hh(b, c, d, a, x[i + 6], 23, 0x04881D05);
      a = hh(a, b, c, d, x[i + 9], 4, 0xD9D4D039);
      d = hh(d, a, b, c, x[i + 12], 11, 0xE6DB99E5);
      c = hh(c, d, a, b, x[i + 15], 16, 0x1FA27CF8);
      b = hh(b, c, d, a, x[i + 2], 23, 0xC4AC5665);

      a = ii(a, b, c, d, x[i + 0], 6, 0xF4292244);
      d = ii(d, a, b, c, x[i + 7], 10, 0x432AFF97);
      c = ii(c, d, a, b, x[i + 14], 15, 0xAB9423A7);
      b = ii(b, c, d, a, x[i + 5], 21, 0xFC93A039);
      a = ii(a, b, c, d, x[i + 12], 6, 0x655B59C3);
      d = ii(d, a, b, c, x[i + 3], 10, 0x8F0CCC92);
      c = ii(c, d, a, b, x[i + 10], 15, 0xFFEFF47D);
      b = ii(b, c, d, a, x[i + 1], 21, 0x85845DD1);
      a = ii(a, b, c, d, x[i + 8], 6, 0x6FA87E4F);
      d = ii(d, a, b, c, x[i + 15], 10, 0xFE2CE6E0);
      c = ii(c, d, a, b, x[i + 6], 15, 0xA3014314);
      b = ii(b, c, d, a, x[i + 13], 21, 0x4E0811A1);
      a = ii(a, b, c, d, x[i + 4], 6, 0xF7537E82);
      d = ii(d, a, b, c, x[i + 11], 10, 0xBD3AF235);
      c = ii(c, d, a, b, x[i + 2], 15, 0x2AD7D2BB);
      b = ii(b, c, d, a, x[i + 9], 21, 0xEB86D391);

      a = addUnsigned(a, olda);
      b = addUnsigned(b, oldb);
      c = addUnsigned(c, oldc);
      d = addUnsigned(d, oldd);
    }

    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  };

  const generateHash = () => {
    const result = md5(input);
    setHash(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success("Hash copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="MD5 Hash Generator"
      description="Generate MD5 hashes from text"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter any text in the input field",
            "Click \"Generate MD5 Hash\"",
            "The 128-bit hash appears below",
            "Click the copy button to copy the hash"
          ]}
          tips={[
            "Same input always produces the same hash",
            "Even a tiny change creates a completely different hash",
            "MD5 is one-way - you cannot reverse a hash to get the original text",
            "Commonly used for file integrity checks and checksums"
          ]}
          note="MD5 is NOT secure for passwords or sensitive data. Use SHA-256 or bcrypt for security."
        />
      </div>
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash"
              rows={6}
            />
          </div>

          <Button onClick={generateHash} className="w-full">
            Generate MD5 Hash
          </Button>

          {hash && (
            <div className="space-y-2">
              <Label>MD5 Hash</Label>
              <div className="flex gap-2">
                <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                  {hash}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          )}

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              MD5 is a widely used cryptographic hash function that produces a 128-bit hash value. 
              Note: MD5 is not recommended for security-critical applications due to known vulnerabilities.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default Md5Generator;
