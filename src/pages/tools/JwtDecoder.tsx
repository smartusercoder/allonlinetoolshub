import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

export default function JwtDecoder() {
  const [jwt, setJwt] = useState("");
  const [header, setHeader] = useState("");
  const [payload, setPayload] = useState("");
  const { toast } = useToast();

  const decodeJwt = () => {
    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = JSON.parse(atob(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));

      toast({
        title: "Success",
        description: "JWT decoded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JWT token",
        variant: "destructive",
      });
    }
  };

  return (
    <ToolLayout
      title="JWT Decoder"
      description="Decode and verify JWT tokens"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste a JWT token into the input area",
            "Click \"Decode JWT\" to extract the header and payload",
            "View the decoded header (algorithm, token type)",
            "View the decoded payload (claims, user data, expiration)"
          ]}
          tips={[
            "JWT tokens have 3 parts separated by dots (header.payload.signature)",
            "This tool only decodes - it does NOT verify the signature",
            "Great for debugging authentication issues",
            "Check the 'exp' claim to see when the token expires"
          ]}
          note="Decoding happens in your browser - tokens are never sent to a server."
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">JWT Token</label>
            <Textarea
              value={jwt}
              onChange={(e) => setJwt(e.target.value)}
              placeholder="Paste JWT token..."
              rows={4}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={decodeJwt} className="w-full">
            Decode JWT
          </Button>

          {header && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Header</label>
                <Textarea
                  value={header}
                  readOnly
                  rows={6}
                  className="bg-muted font-mono text-sm"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">Payload</label>
                <Textarea
                  value={payload}
                  readOnly
                  rows={10}
                  className="bg-muted font-mono text-sm"
                />
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
