import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DnsLookup = () => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const lookupDns = async () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://dns.google/resolve?name=${domain}&type=A`
      );
      const data = await response.json();
      setResults(data);
      
      if (data.Status !== 0) {
        toast({
          title: "Error",
          description: "Failed to resolve domain",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform DNS lookup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolLayout
      title="DNS Lookup"
      description="Lookup DNS records for any domain"
    >
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
            <Button onClick={lookupDns} disabled={loading}>
              <Search className="mr-2 h-4 w-4" />
              Lookup
            </Button>
          </div>
        </div>

        {results && results.Answer && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">DNS Records</h3>
            <div className="space-y-2">
              {results.Answer.map((record: any, index: number) => (
                <div key={index} className="p-3 bg-muted rounded-md">
                  <p className="text-sm">
                    <span className="font-medium">Name:</span> {record.name}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Type:</span> {record.type}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">TTL:</span> {record.TTL}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Data:</span> {record.data}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default DnsLookup;
