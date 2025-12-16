import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const WhoisLookup = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState("");
  const { toast } = useToast();

  const lookupWhois = () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        variant: "destructive",
      });
      return;
    }

    // Simulated WHOIS data (in production, this would call a real API)
    const simulatedResult = `Domain Name: ${domain}
Registry Domain ID: EXAMPLE123-EXAMPLE
Registrar WHOIS Server: whois.example.com
Registrar URL: http://www.example.com
Updated Date: 2024-01-15T10:00:00Z
Creation Date: 2020-01-01T00:00:00Z
Registrar Registration Expiration Date: 2025-01-01T00:00:00Z
Registrar: Example Registrar, Inc.
Registrar IANA ID: 123
Registrar Abuse Contact Email: abuse@example.com
Registrar Abuse Contact Phone: +1.5555551234
Domain Status: clientTransferProhibited

Note: This is a client-side tool with simulated data. For real WHOIS lookups, please use dedicated WHOIS services.`;

    setResult(simulatedResult);
    toast({
      title: "WHOIS Lookup Complete",
      description: "Domain information retrieved",
    });
  };

  return (
    <ToolLayout
      title="WHOIS Lookup"
      description="Get domain registration information"
    >
      <UsageGuide
        steps={[
          "Enter a domain name (e.g., example.com) in the input field",
          "Click the \"Lookup\" button to retrieve domain information",
          "View registration details including registrar, dates, and status"
        ]}
        tips={[
          "Remove http:// or https:// - just enter the domain name",
          "Works with .com, .net, .org and most other TLDs",
          "Use to check domain availability and ownership"
        ]}
        note="This is a demonstration tool with simulated data. For real WHOIS lookups, use dedicated WHOIS services."
        example="example.com"
      />

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="domain">Domain Name</Label>
          <div className="flex gap-2">
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter domain (e.g., example.com)"
            />
            <Button onClick={lookupWhois}>
              <Search className="mr-2 h-4 w-4" />
              Lookup
            </Button>
          </div>
        </div>

        {result && (
          <div className="space-y-2">
            <Label>WHOIS Information</Label>
            <Textarea value={result} readOnly rows={15} />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default WhoisLookup;
