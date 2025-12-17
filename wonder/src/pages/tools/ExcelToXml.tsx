import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { toast } from "sonner";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';

export default function ExcelToXml() {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [rootTag, setRootTag] = useState("data");
  const [rowTag, setRowTag] = useState("row");
  const [xmlData, setXmlData] = useState<string>("");

  const handleFileChange = (file: File | null) => {
    setExcelFile(file);
    setXmlData("");
  };

  const convertToXml = async () => {
    if (!excelFile) {
      toast.error("Please upload an Excel file");
      return;
    }

    try {
      const data = await excelFile.arrayBuffer();
      const workbook = XLSX.read(data);
      
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Convert to XML
      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<${rootTag}>\n`;
      
      jsonData.forEach((row: any) => {
        xml += `  <${rowTag}>\n`;
        Object.entries(row).forEach(([key, value]) => {
          const cleanKey = key.replace(/[^a-zA-Z0-9_]/g, '_');
          xml += `    <${cleanKey}>${escapeXml(String(value))}</${cleanKey}>\n`;
        });
        xml += `  </${rowTag}>\n`;
      });
      
      xml += `</${rootTag}>`;

      setXmlData(xml);
      toast.success("Excel converted to XML successfully!");
    } catch (error) {
      console.error("Error converting Excel:", error);
      toast.error("Failed to convert Excel to XML");
    }
  };

  const escapeXml = (text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const downloadXml = () => {
    if (!xmlData) return;
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Excel to XML"
      description="Convert Excel files to XML format"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload Excel File"
            accept=".xlsx,.xls"
            onFileSelect={handleFileChange}
            helperText="Select an Excel file to convert"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <ValidatedInput
              label="Root Tag"
              value={rootTag}
              onChange={setRootTag}
              placeholder="data"
              helperText="XML root element name"
            />
            <ValidatedInput
              label="Row Tag"
              value={rowTag}
              onChange={setRowTag}
              placeholder="row"
              helperText="XML row element name"
            />
          </div>

          <Button 
            onClick={convertToXml} 
            disabled={!excelFile}
            className="w-full"
          >
            Convert to XML
          </Button>

          {xmlData && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 max-h-96 overflow-auto">
                <pre className="text-sm">{xmlData}</pre>
              </div>
              
              <Button onClick={downloadXml} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download XML
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
