import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, QrCode } from "lucide-react";
import { toast } from "sonner";

export default function VcardGenerator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [notes, setNotes] = useState("");

  const generateVCard = (): string => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
    ];

    if (firstName || lastName) {
      lines.push(`N:${lastName};${firstName};;;`);
      lines.push(`FN:${firstName} ${lastName}`.trim());
    }

    if (organization) lines.push(`ORG:${organization}`);
    if (title) lines.push(`TITLE:${title}`);
    if (email) lines.push(`EMAIL:${email}`);
    if (phone) lines.push(`TEL;TYPE=WORK,VOICE:${phone}`);
    if (mobile) lines.push(`TEL;TYPE=CELL:${mobile}`);
    if (website) lines.push(`URL:${website}`);

    if (address || city || state || zip || country) {
      lines.push(`ADR;TYPE=WORK:;;${address};${city};${state};${zip};${country}`);
    }

    if (notes) lines.push(`NOTE:${notes.replace(/\n/g, "\\n")}`);

    lines.push("END:VCARD");
    return lines.join("\r\n");
  };

  const vcard = generateVCard();

  const downloadVCard = () => {
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${firstName || "contact"}_${lastName || ""}.vcf`.trim().replace(/\s+/g, "_");
    a.click();
    URL.revokeObjectURL(url);
    toast.success("vCard downloaded");
  };

  const copyVCard = () => {
    navigator.clipboard.writeText(vcard);
    toast.success("Copied to clipboard");
  };

  const generateQRCode = () => {
    const encoded = encodeURIComponent(vcard);
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}`;
  };

  return (
    <ToolLayout title="vCard Generator" description="Create digital contact cards in vCard format">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
              </div>
              <div>
                <Label>Organization</Label>
                <Input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Company Inc." />
              </div>
              <div>
                <Label>Job Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Software Engineer" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
              </div>
              <div>
                <Label>Work Phone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" />
              </div>
              <div>
                <Label>Mobile</Label>
                <Input value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="+1 234 567 891" />
              </div>
              <div className="col-span-2">
                <Label>Website</Label>
                <Input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Address</h3>
            <div className="space-y-4">
              <div>
                <Label>Street Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="New York" />
                </div>
                <div>
                  <Label>State/Province</Label>
                  <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="NY" />
                </div>
                <div>
                  <Label>ZIP/Postal Code</Label>
                  <Input value={zip} onChange={(e) => setZip(e.target.value)} placeholder="10001" />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="USA" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional notes..." className="mt-2" />
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Preview</h3>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-2xl font-bold text-primary">
                  {firstName?.[0] || ""}{lastName?.[0] || ""}
                </div>
                <div>
                  <h4 className="text-xl font-semibold">{firstName} {lastName}</h4>
                  {title && <p className="text-muted-foreground">{title}</p>}
                  {organization && <p className="text-sm text-muted-foreground">{organization}</p>}
                </div>
              </div>
              {email && <p className="text-sm mb-1">{email}</p>}
              {phone && <p className="text-sm mb-1">{phone}</p>}
              {mobile && <p className="text-sm mb-1">{mobile}</p>}
              {website && <p className="text-sm mb-1">{website}</p>}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <QrCode className="h-4 w-4" /> QR Code
            </h3>
            <div className="flex justify-center">
              <img src={generateQRCode()} alt="vCard QR Code" className="rounded-lg" />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">Scan to add contact</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">vCard Output</h3>
            <pre className="bg-muted p-4 rounded-lg overflow-auto max-h-[200px] text-xs font-mono">
              {vcard}
            </pre>
            <div className="flex gap-2 mt-4">
              <Button onClick={downloadVCard} className="flex-1">
                <Download className="h-4 w-4 mr-2" /> Download .vcf
              </Button>
              <Button variant="outline" onClick={copyVCard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
