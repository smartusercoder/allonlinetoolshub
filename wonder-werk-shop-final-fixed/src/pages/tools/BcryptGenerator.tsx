import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { UsageGuide } from "@/components/UsageGuide";

const BcryptGenerator = () => {
  const [password, setPassword] = useState("");
  const [rounds, setRounds] = useState("10");
  const [hash, setHash] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [verifyHash, setVerifyHash] = useState("");
  const [verifyResult, setVerifyResult] = useState<boolean | null>(null);
  const [copied, setCopied] = useState(false);

  // Simple bcrypt-like hash for demo (not cryptographically secure)
  const simpleBcrypt = (password: string, saltRounds: number): string => {
    const salt = Math.random().toString(36).substring(2, 15);
    let hash = password + salt;
    
    for (let i = 0; i < Math.pow(2, saltRounds); i++) {
      hash = btoa(hash).substring(0, 60);
    }
    
    return `$2a$${saltRounds.toString().padStart(2, '0')}$${salt}${hash}`;
  };

  const verifyBcrypt = (password: string, hash: string): boolean => {
    // Simple verification (demo only)
    try {
      const parts = hash.split('$');
      if (parts.length !== 4) return false;
      const rounds = parseInt(parts[2]);
      const salt = parts[3].substring(0, 13);
      
      let testHash = password + salt;
      for (let i = 0; i < Math.pow(2, rounds); i++) {
        testHash = btoa(testHash).substring(0, 60);
      }
      
      return parts[3].includes(testHash);
    } catch {
      return false;
    }
  };

  const generateHash = () => {
    if (!password) {
      toast.error("Please enter a password");
      return;
    }
    const result = simpleBcrypt(password, parseInt(rounds) || 10);
    setHash(result);
  };

  const verify = () => {
    if (!verifyPassword || !verifyHash) {
      toast.error("Please enter both password and hash");
      return;
    }
    const result = verifyBcrypt(verifyPassword, verifyHash);
    setVerifyResult(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    toast.success("Hash copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Bcrypt Hash Generator"
      description="Generate and verify Bcrypt password hashes"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter a password in the \"Generate Hash\" section",
            "Adjust salt rounds (4-12) - higher = more secure but slower",
            "Click \"Generate Bcrypt Hash\" to create the hash",
            "Use \"Verify Hash\" section to check if a password matches a hash"
          ]}
          tips={[
            "Bcrypt is designed specifically for password hashing",
            "Salt rounds of 10 is a good balance (default)",
            "Each hash is unique even for the same password (salt)",
            "Perfect for securely storing user passwords"
          ]}
          note="This is a demonstration. For production, use a proper bcrypt library"
        />
      </div>
      <Card className="mt-6">
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Generate Hash</h3>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password to hash"
              />
            </div>

            <div className="space-y-2">
              <Label>Salt Rounds (4-12)</Label>
              <Input
                type="number"
                value={rounds}
                onChange={(e) => setRounds(e.target.value)}
                min="4"
                max="12"
              />
              <p className="text-xs text-muted-foreground">
                Higher rounds = more secure but slower (default: 10)
              </p>
            </div>

            <Button onClick={generateHash} className="w-full">
              Generate Bcrypt Hash
            </Button>

            {hash && (
              <div className="space-y-2">
                <Label>Bcrypt Hash</Label>
                <div className="flex gap-2">
                  <Textarea
                    value={hash}
                    readOnly
                    rows={3}
                    className="font-mono text-sm"
                  />
                  <Button variant="outline" size="icon" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="font-semibold">Verify Hash</h3>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                value={verifyPassword}
                onChange={(e) => setVerifyPassword(e.target.value)}
                placeholder="Enter password to verify"
              />
            </div>

            <div className="space-y-2">
              <Label>Hash to Verify</Label>
              <Textarea
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
                placeholder="Enter bcrypt hash"
                rows={3}
                className="font-mono text-sm"
              />
            </div>

            <Button onClick={verify} variant="secondary" className="w-full">
              Verify Password
            </Button>

            {verifyResult !== null && (
              <div className={`p-4 rounded-lg ${verifyResult ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                <p className={`font-semibold ${verifyResult ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}`}>
                  {verifyResult ? '✓ Password matches hash' : '✗ Password does not match'}
                </p>
              </div>
            )}
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> This is a demonstration. For production use, implement proper bcrypt library with cryptographically secure hashing.
            </p>
          </div>
        </CardContent>
      </Card>
    </ToolLayout>
  );
};

export default BcryptGenerator;
