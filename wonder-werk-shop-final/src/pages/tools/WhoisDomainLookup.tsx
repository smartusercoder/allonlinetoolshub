import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search, Globe, Calendar, Building2, Server, ExternalLink, Copy, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface DomainInfo {
  domain: string;
  registrar: string | null;
  created: string | null;
  expires: string | null;
  nameservers: string[];
  status: string[];
}

export default function WhoisDomainLookup() {
  const [domain, setDomain] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DomainInfo | null>(null);

  const cleanDomain = (input: string): string => {
    let cleaned = input.trim().toLowerCase();
    cleaned = cleaned.replace(/^(https?:\/\/)?(www\.)?/, '');
    cleaned = cleaned.split('/')[0];
    return cleaned;
  };

  const lookupDomain = async () => {
    const cleanedDomain = cleanDomain(domain);
    
    if (!cleanedDomain || !cleanedDomain.includes('.')) {
      toast.error("Please enter a valid domain name");
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Fetch NS records using Google DNS-over-HTTPS
      const nsResponse = await fetch(
        `https://dns.google/resolve?name=${cleanedDomain}&type=NS`
      );
      const nsData = await nsResponse.json();
      
      // Fetch SOA record for additional info
      const soaResponse = await fetch(
        `https://dns.google/resolve?name=${cleanedDomain}&type=SOA`
      );
      const soaData = await soaResponse.json();

      const nameservers = nsData.Answer?.map((a: any) => a.data) || [];
      
      // Try to detect registrar from nameservers
      let registrar: string | null = null;
      const nsString = nameservers.join(' ').toLowerCase();
      
      if (nsString.includes('cloudflare')) registrar = 'Cloudflare';
      else if (nsString.includes('godaddy') || nsString.includes('domaincontrol')) registrar = 'GoDaddy';
      else if (nsString.includes('namecheap') || nsString.includes('registrar-servers')) registrar = 'Namecheap';
      else if (nsString.includes('google')) registrar = 'Google Domains';
      else if (nsString.includes('awsdns') || nsString.includes('amazonaws')) registrar = 'Amazon Route 53';
      else if (nsString.includes('azure') || nsString.includes('microsoft')) registrar = 'Microsoft Azure';
      else if (nsString.includes('digitalocean')) registrar = 'DigitalOcean';
      else if (nsString.includes('netlify')) registrar = 'Netlify';
      else if (nsString.includes('vercel')) registrar = 'Vercel';

      setResult({
        domain: cleanedDomain,
        registrar,
        created: null, // WHOIS data requires server-side lookup
        expires: null,
        nameservers,
        status: nsData.Status === 0 ? ['Active'] : ['Unknown']
      });

      toast.success(`Found information for ${cleanedDomain}`);
    } catch (error) {
      toast.error("Failed to lookup domain");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  const openWhoisService = (service: string) => {
    const cleanedDomain = cleanDomain(domain);
    const urls: Record<string, string> = {
      whois: `https://www.whois.com/whois/${cleanedDomain}`,
      icann: `https://lookup.icann.org/lookup?name=${cleanedDomain}`,
      domaintools: `https://whois.domaintools.com/${cleanedDomain}`,
      who: `https://who.is/whois/${cleanedDomain}`
    };
    window.open(urls[service], '_blank');
  };

  return (
    <ToolLayout 
      title="WHOIS Domain Lookup" 
      description="Look up domain registration information and nameservers"
    >
      <Card className="p-6">
        <div className="space-y-6">
          {/* Input section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="domain">Domain Name</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="example.com"
                  onKeyDown={(e) => e.key === 'Enter' && lookupDomain()}
                />
                <Button onClick={lookupDomain} disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-background border-t-transparent" />
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Lookup
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Enter domain without http:// or www.
              </p>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-bold text-lg">{result.domain}</h3>
                    <p className="text-sm text-muted-foreground">
                      {result.status.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {result.registrar && (
                    <div className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">DNS Provider</p>
                        <p className="font-medium">{result.registrar}</p>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Server className="h-5 w-5 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Nameservers</p>
                    </div>
                    {result.nameservers.length > 0 ? (
                      <div className="space-y-1">
                        {result.nameservers.map((ns, idx) => (
                          <div key={idx} className="flex items-center justify-between">
                            <code className="text-sm">{ns}</code>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(ns)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No nameservers found</p>
                    )}
                  </div>
                </div>
              </div>

              {/* External WHOIS services */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Get full WHOIS details:</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => openWhoisService('icann')}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    ICANN Lookup
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openWhoisService('whois')}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Whois.com
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openWhoisService('who')}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Who.is
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openWhoisService('domaintools')}>
                    <ExternalLink className="h-3 w-3 mr-1" />
                    DomainTools
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Quick lookup */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground self-center mr-2">Try:</span>
            {['google.com', 'github.com', 'wikipedia.org'].map((d) => (
              <Button
                key={d}
                variant="outline"
                size="sm"
                onClick={() => {
                  setDomain(d);
                  setTimeout(lookupDomain, 100);
                }}
              >
                {d}
              </Button>
            ))}
          </div>

          {/* Info section */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">About WHOIS Lookup:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>This tool queries DNS records to find nameserver information</li>
                  <li>Full WHOIS data (registrant info, dates) requires server-side lookup</li>
                  <li>Many domains use privacy protection to hide registrant details</li>
                  <li>Use the external links above for complete WHOIS information</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
}
