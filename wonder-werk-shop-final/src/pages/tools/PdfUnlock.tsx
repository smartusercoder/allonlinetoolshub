import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Unlock } from "lucide-react";

export default function PdfUnlock() {
  return (
    <ToolLayout title="Unlock PDF" description="Remove password protection from PDF files">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Unlock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">PDF Decryption Unavailable in Browser</p>
                <p className="text-sm text-muted-foreground">
                  Removing password protection from PDFs requires decryption capabilities which aren't available in browser-based tools due to security limitations.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Alternative solutions:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Use Adobe Acrobat (requires password to unlock)</li>
                <li>Try online tools like SmallPDF or iLovePDF (requires password)</li>
                <li>Use qpdf command: <code className="bg-muted px-1 rounded">qpdf --decrypt input.pdf output.pdf</code></li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
