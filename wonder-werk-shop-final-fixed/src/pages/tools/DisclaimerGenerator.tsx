import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function DisclaimerGenerator() {
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const generateDisclaimer = () => {
    const disclaimer = `Disclaimer for ${websiteName}

Last updated: ${new Date().toLocaleDateString()}

The information provided by ${websiteName} ("we," "us," or "our") on ${websiteUrl} is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.

UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.

External Links Disclaimer
The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.

Professional Disclaimer
The Site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice.

Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of professional advice.

Fair Use Disclaimer
This site may contain copyrighted material the use of which has not always been specifically authorized by the copyright owner. We believe this constitutes a "fair use" of any such copyrighted material as provided for in section 107 of the US Copyright Law.

Contact Us
If you have any questions about this Disclaimer, please contact us at ${email}.`;

    navigator.clipboard.writeText(disclaimer);
    toast({
      title: "Copied",
      description: "Disclaimer copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Disclaimer Generator"
      description="Generate a legal disclaimer for your website"
    >
      <Card className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Website Name</Label>
            <Input
              id="name"
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="Your Website"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">Website URL</Label>
            <Input
              id="url"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2 col-span-2">
            <Label htmlFor="email">Contact Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="contact@example.com"
            />
          </div>
        </div>

        <Button onClick={generateDisclaimer} className="w-full">
          Generate & Copy Disclaimer
        </Button>
      </Card>
    </ToolLayout>
  );
}
