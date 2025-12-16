import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FileSignature } from "lucide-react";

export default function PdfSign() {
  return (
    <ToolLayout title="Sign PDF" description="Add digital signatures to PDF documents">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <FileSignature className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Digital Signatures Unavailable in Browser</p>
                <p className="text-sm text-muted-foreground">
                  Digital PDF signatures require PKI (Public Key Infrastructure) and certificate management which cannot be implemented securely in browser-based tools.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Alternative solutions:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Adobe Acrobat Reader (supports digital certificates)</li>
                <li>DocuSign or SignNow (cloud-based e-signature services)</li>
                <li>Preview on Mac (supports signature creation)</li>
                <li>For visual signatures only, use the PDF Watermark tool</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
