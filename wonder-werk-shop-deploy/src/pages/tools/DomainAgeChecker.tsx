import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, ExternalLink, Calendar, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function DomainAgeChecker() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<{ domain: string; whoisLinks: { name: string; url: string }[] } | null>(null);
  const { toast } = useToast();

  const checkDomain = () => {
    if (!domain) {
      toast({ title: "Error", description: "Please enter a domain", variant: "destructive" });
      return;
    }
    const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").split("/")[0];
    setResult({
      domain: cleanDomain,
      whoisLinks: [
        { name: "ICANN Lookup", url: `https://lookup.icann.org/lookup?name=${cleanDomain}` },
        { name: "Whois.com", url: `https://www.whois.com/whois/${cleanDomain}` },
        { name: "Who.is", url: `https://who.is/whois/${cleanDomain}` },
        { name: "DomainTools", url: `https://whois.domaintools.com/${cleanDomain}` },
      ]
    });
    toast({ title: "Success", description: "WHOIS lookup links generated" });
  };

  return (
    <ToolLayout title="Domain Age Checker" description="Check domain registration date and age">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">Enter Domain</Label>
            <div className="flex gap-2">
              <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="example.com" onKeyDown={(e) => e.key === "Enter" && checkDomain()} />
              <Button onClick={checkDomain}><Search className="h-4 w-4 mr-2" />Check</Button>
            </div>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>Domain age requires WHOIS database access. Use the links to check registration details.</AlertDescription>
          </Alert>
        </Card>

        <Card className="p-6 space-y-4">
          <Label className="text-lg font-semibold flex items-center gap-2"><Calendar className="h-5 w-5" />WHOIS Lookup Results</Label>
          {result ? (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg"><p className="font-mono text-lg">{result.domain}</p></div>
              <div className="space-y-2">
                {result.whoisLinks.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                    <span>{link.name}</span><ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Enter a domain above to generate WHOIS lookup links</p>
          )}
        </Card>
      </div>
    </ToolLayout>
  );
}
