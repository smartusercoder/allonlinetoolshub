import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FileSpreadsheet } from "lucide-react";

export default function ExcelToPdf() {
  return (
    <ToolLayout title="Excel to PDF" description="Convert Excel spreadsheets to PDF">
      <Card className="p-6">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="space-y-3">
            <div className="flex items-start gap-2">
              <FileSpreadsheet className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium mb-2">Complex Conversion Unavailable</p>
                <p className="text-sm text-muted-foreground">
                  Converting Excel files to PDF requires complex spreadsheet parsing and layout rendering which cannot be reliably done in the browser.
                </p>
              </div>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">Alternative solutions:</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                <li>Microsoft Excel - File → Save As → PDF</li>
                <li>Google Sheets - File → Download → PDF</li>
                <li>Smallpdf or iLovePDF - Online converters</li>
                <li>LibreOffice Calc - Free desktop software</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      </Card>
    </ToolLayout>
  );
}
