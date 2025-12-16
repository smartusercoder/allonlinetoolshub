import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SslChecker = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const checkSsl = () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain",
        variant: "destructive",
      });
      return;
    }

    // Simulated SSL check (real implementation would need backend)
    const mockResult = {
      valid: true,
      issuer: "Let's Encrypt",
      validFrom: "2024-01-01",
      validTo: "2024-12-31",
      daysRemaining: 180,
      protocol: "TLS 1.3",
      cipher: "TLS_AES_128_GCM_SHA256",
    };

    setResult(mockResult);
    toast({
      title: "SSL Check Complete",
      description: "Certificate information retrieved",
    });
  };

  return (
    <ToolLayout
      title="SSL Certificate Checker"
      description="Check SSL certificate details and validity"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain</Label>
          <div className="flex gap-2">
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
            />
            <Button onClick={checkSsl}>
              <Shield className="mr-2 h-4 w-4" />
              Check SSL
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              {result.valid ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <h3 className="font-semibold text-lg">
                {result.valid ? "Valid Certificate" : "Invalid Certificate"}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Issuer</p>
                <p className="font-medium">{result.issuer}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valid From</p>
                <p className="font-medium">{result.validFrom}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Valid To</p>
                <p className="font-medium">{result.validTo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Remaining</p>
                <p className="font-medium">{result.daysRemaining}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Protocol</p>
                <p className="font-medium">{result.protocol}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cipher Suite</p>
                <p className="font-medium">{result.cipher}</p>
              </div>
            </div>

            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
              Note: This is a client-side simulation. For real SSL checks, use dedicated SSL testing services.
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default SslChecker;
