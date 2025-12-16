import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TextEncryption = () => {
  const [plaintext, setPlaintext] = useState("");
  const [ciphertext, setCiphertext] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDecrypted] = useState("");

  // Simple XOR-based encryption for demo purposes
  const xorEncrypt = (text: string, key: string): string => {
    if (!key) return "";
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result);
  };

  const xorDecrypt = (ciphertext: string, key: string): string => {
    if (!key) return "";
    try {
      const decoded = atob(ciphertext);
      let result = "";
      for (let i = 0; i < decoded.length; i++) {
        result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
      }
      return result;
    } catch {
      return "Invalid ciphertext or key";
    }
  };

  const handleEncrypt = () => {
    const result = xorEncrypt(plaintext, encryptKey);
    setEncrypted(result);
  };

  const handleDecrypt = () => {
    const result = xorDecrypt(ciphertext, decryptKey);
    setDecrypted(result);
  };

  return (
    <ToolLayout
      title="Text Encryption Tool"
      description="Encrypt and decrypt text using XOR cipher"
    >
      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="encrypt">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="encrypt">Encrypt</TabsTrigger>
              <TabsTrigger value="decrypt">Decrypt</TabsTrigger>
            </TabsList>

            <TabsContent value="encrypt" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Plain Text</Label>
                <Textarea
                  value={plaintext}
                  onChange={(e) => setPlaintext(e.target.value)}
                  placeholder="Enter text to encrypt"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label>Encryption Key</Label>
                <Input
                  type="password"
                  value={encryptKey}
                  onChange={(e) => setEncryptKey(e.target.value)}
                  placeholder="Enter encryption key"
                />
              </div>

              <Button onClick={handleEncrypt} className="w-full">
                Encrypt
              </Button>

              {encrypted && (
                <div className="space-y-2">
                  <Label>Encrypted Text</Label>
                  <Textarea
                    value={encrypted}
                    readOnly
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>
              )}
            </TabsContent>

            <TabsContent value="decrypt" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Encrypted Text</Label>
                <Textarea
                  value={ciphertext}
                  onChange={(e) => setCiphertext(e.target.value)}
                  placeholder="Enter encrypted text"
                  rows={6}
                  className="font-mono text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label>Decryption Key</Label>
                <Input
                  type="password"
                  value={decryptKey}
                  onChange={(e) => setDecryptKey(e.target.value)}
                  placeholder="Enter decryption key"
                />
              </div>

              <Button onClick={handleDecrypt} className="w-full">
                Decrypt
              </Button>

              {decrypted && (
                <div className="space-y-2">
                  <Label>Decrypted Text</Label>
                  <Textarea
                    value={decrypted}
                    readOnly
                    rows={6}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="p-4 bg-muted rounded-lg mt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This uses XOR cipher for demonstration. For production use, implement proper encryption like AES-256.
              Keep your encryption keys secure and never share them.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default TextEncryption;
