import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { toast } from "sonner";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';

export default function XmlToExcel() {
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [excelUrl, setExcelUrl] = useState<string>("");

  const handleFileChange = (file: File | null) => {
    setXmlFile(file);
    setExcelUrl("");
  };

  const convertToExcel = async () => {
    if (!xmlFile) {
      toast.error("Please upload an XML file");
      return;
    }

    try {
      const text = await xmlFile.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");

      // Find data rows (common XML structures)
      const rows = xmlDoc.querySelectorAll('row, item, record, entry');
      
      if (rows.length === 0) {
        toast.error("No data rows found in XML");
        return;
      }

      // Extract data
      const data: any[] = [];
      const headers = new Set<string>();

      rows.forEach(row => {
        const rowData: any = {};
        Array.from(row.children).forEach(child => {
          const key = child.tagName;
          headers.add(key);
          rowData[key] = child.textContent || '';
        });
        data.push(rowData);
      });

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Generate Excel file
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      
      setExcelUrl(url);
      toast.success("XML converted to Excel successfully!");
    } catch (error) {
      console.error("Error converting XML:", error);
      toast.error("Failed to convert XML to Excel");
    }
  };

  const downloadExcel = () => {
    if (!excelUrl) return;
    const a = document.createElement('a');
    a.href = excelUrl;
    a.download = 'converted.xlsx';
    a.click();
  };

  return (
    <ToolLayout
      title="XML to Excel"
      description="Convert XML files to Excel format"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload XML File"
            accept=".xml,text/xml,application/xml"
            onFileSelect={handleFileChange}
            helperText="Select an XML file to convert"
          />

          <Button 
            onClick={convertToExcel} 
            disabled={!xmlFile}
            className="w-full"
          >
            Convert to Excel
          </Button>

          {excelUrl && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Excel file ready for download
                </p>
                <p className="font-medium">converted.xlsx</p>
              </div>
              
              <Button onClick={downloadExcel} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Excel File
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
