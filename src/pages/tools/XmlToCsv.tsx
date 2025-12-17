import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { toast } from "sonner";
import { Download } from "lucide-react";

export default function XmlToCsv() {
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string>("");

  const handleFileChange = (file: File | null) => {
    setXmlFile(file);
    setCsvData("");
  };

  const convertXmlToCsv = async () => {
    if (!xmlFile) {
      toast.error("Please upload an XML file");
      return;
    }

    try {
      const text = await xmlFile.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml");

      // Simple XML to CSV conversion (assumes flat structure)
      const rows = xmlDoc.querySelectorAll('row, item, record');
      
      if (rows.length === 0) {
        toast.error("No data rows found in XML");
        return;
      }

      // Get headers from first row
      const firstRow = rows[0];
      const headers = Array.from(firstRow.children).map(child => child.tagName);
      
      // Build CSV
      let csv = headers.join(',') + '\n';
      
      rows.forEach(row => {
        const values = headers.map(header => {
          const element = row.querySelector(header);
          const value = element?.textContent || '';
          return value.includes(',') ? `"${value}"` : value;
        });
        csv += values.join(',') + '\n';
      });

      setCsvData(csv);
      toast.success("XML converted to CSV successfully!");
    } catch (error) {
      console.error("Error converting XML:", error);
      toast.error("Failed to convert XML to CSV");
    }
  };

  const downloadCsv = () => {
    if (!csvData) return;
    
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
    a.click();
  };

  return (
    <ToolLayout
      title="XML to CSV"
      description="Convert XML files to CSV format"
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
            onClick={convertXmlToCsv} 
            disabled={!xmlFile}
            className="w-full"
          >
            Convert to CSV
          </Button>

          {csvData && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 max-h-96 overflow-auto">
                <pre className="text-sm">{csvData}</pre>
              </div>
              
              <Button onClick={downloadCsv} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
