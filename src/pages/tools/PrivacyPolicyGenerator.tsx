import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PrivacyPolicyGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [policy, setPolicy] = useState("");
  const { toast } = useToast();

  const generatePolicy = () => {
    const generated = `Privacy Policy for ${companyName}

Last updated: ${new Date().toLocaleDateString()}

1. Introduction
Welcome to ${websiteUrl}. ${companyName} ("we," "our," or "us") respects your privacy and is committed to protecting your personal data.

2. Information We Collect
We may collect and process the following data about you:
- Information you provide by filling in forms on our website
- Details of your visits to our website including traffic data, location data, and other communication data
- Information provided when you communicate with us

3. How We Use Your Information
We use information held about us in the following ways:
- To provide you with information, products, or services that you request from us
- To notify you about changes to our service
- To ensure that content from our website is presented in the most effective manner

4. Data Security
We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way.

5. Your Legal Rights
You have the right to:
- Request access to your personal data
- Request correction of your personal data
- Request erasure of your personal data
- Object to processing of your personal data
- Request restriction of processing your personal data
- Request transfer of your personal data
- Right to withdraw consent

6. Contact Us
If you have any questions about this privacy policy, please contact us at:
Email: ${email}
${country ? `Country: ${country}` : ''}

This privacy policy is effective as of the date stated at the top of this policy.`;

    setPolicy(generated);
  };

  const copyPolicy = () => {
    navigator.clipboard.writeText(policy);
    toast({
      title: "Copied",
      description: "Privacy policy copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Privacy Policy Generator"
      description="Generate a privacy policy for your website"
    >
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Your Company LLC"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">Website URL</Label>
            <Input
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="United States"
            />
          </div>
        </div>

        <Button onClick={generatePolicy} className="w-full">
          Generate Privacy Policy
        </Button>

        {policy && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated Privacy Policy</Label>
              <Button variant="outline" size="sm" onClick={copyPolicy}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={policy}
              readOnly
              rows={20}
              className="font-mono text-sm"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
