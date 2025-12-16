import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Lock } from "lucide-react";

export default function PdfProtect() {
  return (
    <ToolLayout title="Protect PDF" description="Add password protection to PDF files">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Lock className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">PDF Encryption Unavailable in Browser</p>
                <p className="text-sm text-muted-foreground">
                  Password-protecting PDFs requires AES encryption which isn't available in browser-based tools due to security limitations of the pdf-lib library.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Alternative solutions:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Use Adobe Acrobat or PDF-XChange Editor (desktop software)</li>
                <li>Try online tools like SmallPDF or PDFProtect (requires upload)</li>
                <li>Use command-line tools like qpdf or pdftk (for developers)</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
