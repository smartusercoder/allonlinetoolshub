import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { toast } from "sonner";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';

export default function CsvToExcel() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [excelUrl, setExcelUrl] = useState<string>("");

  const handleFileChange = (file: File | null) => {
    setCsvFile(file);
    setExcelUrl("");
  };

  const convertToExcel = async () => {
    if (!csvFile) {
      toast.error("Please upload a CSV file");
      return;
    }

    try {
      const text = await csvFile.text();
      
      // Parse CSV
      const wb = XLSX.read(text, { type: 'string' });
      
      // If XLSX didn't auto-detect, manually parse CSV
      if (!wb.SheetNames.length) {
        const lines = text.split('\n');
        const data = lines.map(line => {
          // Simple CSV parsing (handles basic cases)
          return line.split(',').map(cell => cell.trim());
        });
        
        const ws = XLSX.utils.aoa_to_sheet(data);
        const newWb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(newWb, ws, "Sheet1");
        
        const wbout = XLSX.write(newWb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        
        setExcelUrl(url);
      } else {
        // XLSX auto-detected format
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        
        setExcelUrl(url);
      }

      toast.success("CSV converted to Excel successfully!");
    } catch (error) {
      console.error("Error converting CSV:", error);
      toast.error("Failed to convert CSV to Excel");
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
      title="CSV to Excel"
      description="Convert CSV files to Excel format"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload CSV File"
            accept=".csv,text/csv"
            onFileSelect={handleFileChange}
            helperText="Select a CSV file to convert"
          />

          <Button 
            onClick={convertToExcel} 
            disabled={!csvFile}
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
