import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function XmlValidator() {
  const [xml, setXml] = useState("");
  const [result, setResult] = useState<{ valid: boolean; message: string } | null>(null);
  const { toast } = useToast();

  const validateXml = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "text/xml");
      
      const errorNode = xmlDoc.querySelector("parsererror");
      if (errorNode) {
        setResult({ 
          valid: false, 
          message: errorNode.textContent || "Invalid XML structure" 
        });
      } else {
        setResult({ valid: true, message: "Valid XML" });
      }
    } catch (error: any) {
      setResult({ valid: false, message: error.message });
    }
  };

  return (
    <ToolLayout
      title="XML Validator"
      description="Validate XML syntax and structure"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">XML Input</label>
            <Textarea
              value={xml}
              onChange={(e) => {
                setXml(e.target.value);
                setResult(null);
              }}
              placeholder="<root>...</root>"
              rows={12}
              className="font-mono text-sm"
            />
          </div>

          <Button onClick={validateXml} className="w-full">
            Validate XML
          </Button>

          {result && (
            <div className={`p-6 rounded-lg ${result.valid ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <p className={`font-semibold ${result.valid ? 'text-green-600' : 'text-red-600'}`}>
                {result.valid ? '✓ Valid XML' : '✗ Invalid XML'}
              </p>
              {!result.valid && (
                <p className="text-sm text-muted-foreground mt-1">
                  {result.message}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
