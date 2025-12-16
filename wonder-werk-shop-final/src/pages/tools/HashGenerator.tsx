import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const HashGenerator = () => {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const generateHashes = async () => {
    if (!text) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const results: Record<string, string> = {};

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    results['SHA-256'] = Array.from(new Uint8Array(sha256Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    results['SHA-1'] = Array.from(new Uint8Array(sha1Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    // SHA-512
    const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
    results['SHA-512'] = Array.from(new Uint8Array(sha512Buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    setHashes(results);
  };

  const handleCopy = (hash: string, algorithm: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied!",
      description: `${algorithm} hash copied to clipboard`,
    });
  };

  return (
    <ToolLayout
      title="Hash Generator"
      description="Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-512)"
      faqs={toolFAQs["hash-generator"]}
      howToSteps={[
        {
          name: "Enter Text",
          text: "Type or paste the text you want to hash into the input area. This can be any text including passwords, file contents, or data strings."
        },
        {
          name: "Generate Hashes",
          text: "Click the 'Generate Hashes' button to create cryptographic hashes of your input using SHA-1, SHA-256, and SHA-512 algorithms."
        },
        {
          name: "View Hash Results",
          text: "Review the generated hashes displayed below. Each algorithm produces a unique fixed-length string that represents your input data."
        },
        {
          name: "Copy Hash",
          text: "Click the copy button next to any hash to copy it to your clipboard. Use SHA-256 or SHA-512 for security-critical applications."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter your text in the input area",
            "Click \"Generate Hashes\"",
            "View SHA-1, SHA-256, and SHA-512 hashes",
            "Click copy buttons to copy individual hashes"
          ]}
          tips={[
            "SHA-256 is recommended for most security uses",
            "SHA-512 provides even stronger security",
            "Same input always produces same hash",
            "One-way function - cannot reverse hashes",
            "Great for checksums and data integrity"
          ]}
          note="Use SHA-256 or SHA-512 for secure applications. Avoid MD5 and SHA-1 for security-critical uses."
        />
        <div>
          <label className="text-sm font-medium mb-2 block">Input Text</label>
          <Textarea
            placeholder="Enter text to hash..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px]"
          />
        </div>

        <Button onClick={generateHashes} className="w-full" variant="hero">
          Generate Hashes
        </Button>

        {Object.keys(hashes).length > 0 && (
          <div className="space-y-3">
            {Object.entries(hashes).map(([algorithm, hash]) => (
              <div key={algorithm} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">{algorithm}</label>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(hash, algorithm)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 bg-muted/30 rounded-lg font-mono text-sm break-all">
                  {hash}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default HashGenerator;
