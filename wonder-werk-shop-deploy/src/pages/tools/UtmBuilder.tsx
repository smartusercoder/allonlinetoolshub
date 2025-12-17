import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ExternalLink, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaign, setCampaign] = useState("");
  const [term, setTerm] = useState("");
  const [content, setContent] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");

  const buildUtmUrl = () => {
    if (!baseUrl) {
      toast.error("Please enter a website URL");
      return;
    }

    if (!source || !medium || !campaign) {
      toast.error("Campaign Source, Medium, and Name are required");
      return;
    }

    try {
      const url = new URL(baseUrl.includes("://") ? baseUrl : `https://${baseUrl}`);
      const params = new URLSearchParams();

      params.set("utm_source", source);
      params.set("utm_medium", medium);
      params.set("utm_campaign", campaign);
      if (term) params.set("utm_term", term);
      if (content) params.set("utm_content", content);

      const finalUrl = `${url.origin}${url.pathname}${url.search ? url.search + "&" : "?"}${params.toString()}${url.hash}`;
      setGeneratedUrl(finalUrl);
      toast.success("UTM URL generated successfully!");
    } catch (error) {
      toast.error("Invalid URL format");
    }
  };

  const copyToClipboard = () => {
    if (!generatedUrl) return;
    navigator.clipboard.writeText(generatedUrl);
    toast.success("URL copied to clipboard!");
  };

  const clearAll = () => {
    setBaseUrl("");
    setSource("");
    setMedium("");
    setCampaign("");
    setTerm("");
    setContent("");
    setGeneratedUrl("");
    toast.info("Form cleared");
  };

  const commonSources = [
    { label: "Google", value: "google" },
    { label: "Facebook", value: "facebook" },
    { label: "Twitter", value: "twitter" },
    { label: "LinkedIn", value: "linkedin" },
    { label: "Newsletter", value: "newsletter" },
    { label: "Instagram", value: "instagram" }
  ];

  const commonMediums = [
    { label: "CPC", value: "cpc" },
    { label: "Email", value: "email" },
    { label: "Social", value: "social" },
    { label: "Organic", value: "organic" },
    { label: "Referral", value: "referral" },
    { label: "Display", value: "display" }
  ];

  return (
    <ToolLayout 
      title="UTM Link Builder" 
      description="Build UTM tracking links for your marketing campaigns"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="baseUrl">Website URL *</Label>
              <Input
                id="baseUrl"
                type="url"
                placeholder="https://example.com/page"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                The full website URL (without UTM parameters)
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source">Campaign Source *</Label>
                <Input
                  id="source"
                  placeholder="e.g., google, newsletter"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="mt-2"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonSources.map((s) => (
                    <Button
                      key={s.value}
                      variant="outline"
                      size="sm"
                      onClick={() => setSource(s.value)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Identify the source (referrer): google, newsletter, etc.
                </p>
              </div>

              <div>
                <Label htmlFor="medium">Campaign Medium *</Label>
                <Input
                  id="medium"
                  placeholder="e.g., cpc, email, social"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="mt-2"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {commonMediums.map((m) => (
                    <Button
                      key={m.value}
                      variant="outline"
                      size="sm"
                      onClick={() => setMedium(m.value)}
                    >
                      {m.label}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Marketing medium: cpc, banner, email, social
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="campaign">Campaign Name *</Label>
              <Input
                id="campaign"
                placeholder="e.g., spring_sale, product_launch"
                value={campaign}
                onChange={(e) => setCampaign(e.target.value)}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Product, promo code, or slogan (e.g., spring_sale)
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="term">Campaign Term (Optional)</Label>
                <Input
                  id="term"
                  placeholder="e.g., running+shoes"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Identify paid search keywords
                </p>
              </div>

              <div>
                <Label htmlFor="content">Campaign Content (Optional)</Label>
                <Input
                  id="content"
                  placeholder="e.g., logolink, textlink"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Differentiate ads or links
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={buildUtmUrl} className="flex-1">
                Generate UTM URL
              </Button>
              <Button onClick={clearAll} variant="outline">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {generatedUrl && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Generated UTM URL</h3>
            <Textarea
              value={generatedUrl}
              readOnly
              className="font-mono text-sm min-h-[100px]"
            />
            <div className="flex gap-2 mt-4">
              <Button onClick={copyToClipboard} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy URL
              </Button>
              <Button
                onClick={() => window.open(generatedUrl, "_blank")}
                variant="outline"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Test Link
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">What are UTM Parameters?</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              UTM parameters are tags added to URLs to track the effectiveness of marketing campaigns across traffic sources and publishing media.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li><strong>utm_source:</strong> Identifies which site sent the traffic (e.g., google, newsletter)</li>
              <li><strong>utm_medium:</strong> Identifies what type of link was used (e.g., cpc, email)</li>
              <li><strong>utm_campaign:</strong> Identifies a specific product promotion or campaign</li>
              <li><strong>utm_term:</strong> Identifies search keywords (for paid search)</li>
              <li><strong>utm_content:</strong> Identifies what specifically was clicked (for A/B testing)</li>
            </ul>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
