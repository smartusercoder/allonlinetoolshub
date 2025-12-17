import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TermsGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [terms, setTerms] = useState("");
  const { toast } = useToast();

  const generateTerms = () => {
    const generated = `Terms of Service for ${companyName}

Last updated: ${new Date().toLocaleDateString()}

1. Agreement to Terms
By accessing or using ${websiteUrl}, you agree to be bound by these Terms of Service and all applicable laws and regulations.

2. Use License
Permission is granted to temporarily access the materials on ${companyName}'s website for personal, non-commercial use only.

3. Disclaimer
The materials on ${companyName}'s website are provided on an 'as is' basis. ${companyName} makes no warranties, expressed or implied, and hereby disclaims all other warranties.

4. Limitations
In no event shall ${companyName} or its suppliers be liable for any damages arising out of the use or inability to use the materials on ${websiteUrl}.

5. Accuracy of Materials
The materials appearing on ${companyName}'s website could include technical, typographical, or photographic errors. ${companyName} does not warrant that any of the materials on its website are accurate, complete, or current.

6. Links
${companyName} has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.

7. Modifications
${companyName} may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms of service.

8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of ${country || 'your jurisdiction'}.

9. Contact Information
For any questions regarding these Terms of Service, please contact us at:
Email: ${email}
Website: ${websiteUrl}
${country ? `Country: ${country}` : ''}

By using our website, you signify your acceptance of these Terms of Service.`;

    setTerms(generated);
  };

  const copyTerms = () => {
    navigator.clipboard.writeText(terms);
    toast({
      title: "Copied",
      description: "Terms of service copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Terms of Service Generator"
      description="Generate terms of service for your website"
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
            <Label htmlFor="country">Country/Jurisdiction</Label>
            <Input
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="United States"
            />
          </div>
        </div>

        <Button onClick={generateTerms} className="w-full">
          Generate Terms of Service
        </Button>

        {terms && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Generated Terms of Service</Label>
              <Button variant="outline" size="sm" onClick={copyTerms}>
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
            </div>
            <Textarea
              value={terms}
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
