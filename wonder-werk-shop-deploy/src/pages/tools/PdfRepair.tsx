import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Wrench } from "lucide-react";

export default function PdfRepair() {
  return (
    <ToolLayout title="Repair PDF" description="Fix corrupted or damaged PDF files">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <Wrench className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">PDF Repair Unavailable in Browser</p>
                <p className="text-sm text-muted-foreground">
                  Repairing corrupted PDFs requires advanced file structure analysis and reconstruction which cannot be reliably performed in browser-based tools.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Alternative solutions:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Adobe Acrobat Pro (built-in repair tools)</li>
                <li>PDF Recovery Toolbox or Kernel PDF Repair (specialized tools)</li>
                <li>Online services like PDF2Go or iLovePDF Repair</li>
                <li>Use QPDF to attempt recovery: <code className="bg-muted px-1 rounded">qpdf --qdf input.pdf output.pdf</code></li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
