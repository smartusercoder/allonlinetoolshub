import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";

const TEMPLATES = {
  professional: {
    name: "Professional",
    style: "border-left: 3px solid #3b82f6; padding-left: 15px;",
  },
  minimal: {
    name: "Minimal",
    style: "border-top: 1px solid #e5e7eb; padding-top: 15px;",
  },
  modern: {
    name: "Modern",
    style: "background: linear-gradient(to right, #f3f4f6, transparent); padding: 15px; border-radius: 8px;",
  },
  classic: {
    name: "Classic",
    style: "font-family: Georgia, serif;",
  },
};

export default function EmailSignature() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [template, setTemplate] = useState<keyof typeof TEMPLATES>("professional");
  const [primaryColor, setPrimaryColor] = useState("#3b82f6");

  const generateHTML = (): string => {
    const templateStyle = TEMPLATES[template].style.replace("#3b82f6", primaryColor);
    
    return `
<table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; font-size: 14px; color: #333333; ${templateStyle}">
  <tr>
    <td style="padding-bottom: 10px;">
      <strong style="font-size: 16px; color: ${primaryColor};">${name || "Your Name"}</strong>
      ${title ? `<br><span style="color: #666666;">${title}</span>` : ""}
      ${company ? `<br><span style="font-weight: 500;">${company}</span>` : ""}
    </td>
  </tr>
  <tr>
    <td style="padding-top: 10px; border-top: 1px solid #eeeeee;">
      ${email ? `<div style="margin: 3px 0;">📧 <a href="mailto:${email}" style="color: ${primaryColor}; text-decoration: none;">${email}</a></div>` : ""}
      ${phone ? `<div style="margin: 3px 0;">📞 <a href="tel:${phone}" style="color: ${primaryColor}; text-decoration: none;">${phone}</a></div>` : ""}
      ${website ? `<div style="margin: 3px 0;">🌐 <a href="${website}" style="color: ${primaryColor}; text-decoration: none;">${website}</a></div>` : ""}
    </td>
  </tr>
  ${linkedin || twitter ? `
  <tr>
    <td style="padding-top: 10px;">
      ${linkedin ? `<a href="${linkedin}" style="margin-right: 10px; color: ${primaryColor}; text-decoration: none;">LinkedIn</a>` : ""}
      ${twitter ? `<a href="${twitter}" style="color: ${primaryColor}; text-decoration: none;">Twitter</a>` : ""}
    </td>
  </tr>
  ` : ""}
</table>
`.trim();
  };

  const html = generateHTML();

  const copyHTML = () => {
    navigator.clipboard.writeText(html);
    toast.success("HTML copied to clipboard");
  };

  const copyRichText = async () => {
    try {
      const blob = new Blob([html], { type: "text/html" });
      await navigator.clipboard.write([
        new ClipboardItem({ "text/html": blob })
      ]);
      toast.success("Signature copied - paste directly in email client");
    } catch {
      copyHTML();
    }
  };

  const downloadHTML = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-signature.html";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded");
  };

  return (
    <ToolLayout title="Email Signature Generator" description="Create professional email signatures with custom styling">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Personal Details</h3>
            <div className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <Label>Job Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Senior Developer" />
              </div>
              <div>
                <Label>Company</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" />
              </div>
              <div>
                <Label>Website</Label>
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Social Links</h3>
            <div className="space-y-4">
              <div>
                <Label>LinkedIn URL</Label>
                <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="https://linkedin.com/in/johndoe" />
              </div>
              <div>
                <Label>Twitter URL</Label>
                <Input value={twitter} onChange={(e) => setTwitter(e.target.value)} placeholder="https://twitter.com/johndoe" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Style Options</h3>
            <div className="space-y-4">
              <div>
                <Label>Template</Label>
                <Select value={template} onValueChange={(v) => setTemplate(v as keyof typeof TEMPLATES)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(TEMPLATES).map(([key, val]) => (
                      <SelectItem key={key} value={key}>{val.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div className="bg-white p-6 rounded-lg border" dangerouslySetInnerHTML={{ __html: html }} />
          </Card>

          <Card className="p-6">
            <Tabs defaultValue="actions">
              <TabsList className="mb-4">
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="html">HTML Code</TabsTrigger>
              </TabsList>
              <TabsContent value="actions" className="space-y-4">
                <Button onClick={copyRichText} className="w-full">
                  <Copy className="h-4 w-4 mr-2" /> Copy Signature (Rich Text)
                </Button>
                <Button onClick={copyHTML} variant="outline" className="w-full">
                  <Copy className="h-4 w-4 mr-2" /> Copy HTML Code
                </Button>
                <Button onClick={downloadHTML} variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" /> Download HTML File
                </Button>
              </TabsContent>
              <TabsContent value="html">
                <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[300px] text-xs font-mono">
                  {html}
                </pre>
              </TabsContent>
            </Tabs>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-2">How to Use</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Fill in your details on the left</li>
              <li>Choose a template and customize the color</li>
              <li>Click "Copy Signature" to copy rich text</li>
              <li>Paste directly into your email client's signature settings</li>
            </ol>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
