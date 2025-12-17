import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedFileUpload } from "@/components/form/ValidatedFileUpload";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { toast } from "sonner";
import { Download } from "lucide-react";
import * as XLSX from 'xlsx';

export default function ExcelSplitter() {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [rowsPerFile, setRowsPerFile] = useState("100");
  const [splitFiles, setSplitFiles] = useState<Array<{ name: string; blob: Blob }>>([]);

  const handleFileChange = (file: File | null) => {
    setExcelFile(file);
    setSplitFiles([]);
  };

  const splitExcel = async () => {
    if (!excelFile) {
      toast.error("Please upload an Excel file");
      return;
    }

    const rows = parseInt(rowsPerFile);
    if (isNaN(rows) || rows <= 0) {
      toast.error("Please enter a valid number of rows");
      return;
    }

    try {
      const data = await excelFile.arrayBuffer();
      const workbook = XLSX.read(data);
      
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      
      // Convert to JSON to manipulate
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      if (jsonData.length <= 1) {
        toast.error("Excel file must have more than just headers");
        return;
      }

      const header = jsonData[0];
      const dataRows = jsonData.slice(1);
      
      // Split into chunks
      const chunks: any[][] = [];
      for (let i = 0; i < dataRows.length; i += rows) {
        chunks.push(dataRows.slice(i, i + rows));
      }

      const files = chunks.map((chunk, index) => {
        // Create new workbook
        const newWb = XLSX.utils.book_new();
        const newWs = XLSX.utils.aoa_to_sheet([header, ...chunk]);
        XLSX.utils.book_append_sheet(newWb, newWs, firstSheetName);
        
        // Convert to binary
        const wbout = XLSX.write(newWb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        
        return {
          name: `${excelFile.name.replace('.xlsx', '')}_part${index + 1}.xlsx`,
          blob
        };
      });

      setSplitFiles(files);
      toast.success(`Excel file split into ${files.length} files!`);
    } catch (error) {
      console.error("Error splitting Excel:", error);
      toast.error("Failed to split Excel file");
    }
  };

  const downloadFile = (file: { name: string; blob: Blob }) => {
    const url = URL.createObjectURL(file.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    splitFiles.forEach(file => downloadFile(file));
  };

  return (
    <ToolLayout
      title="Excel Splitter"
      description="Split Excel files into multiple smaller files"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedFileUpload
            label="Upload Excel File"
            accept=".xlsx,.xls"
            onFileSelect={handleFileChange}
            helperText="Select an Excel file to split"
          />

          <ValidatedInput
            label="Rows Per File"
            type="number"
            value={rowsPerFile}
            onChange={setRowsPerFile}
            placeholder="100"
            helperText="Number of data rows per output file"
          />

          <Button 
            onClick={splitExcel} 
            disabled={!excelFile}
            className="w-full"
          >
            Split Excel File
          </Button>

          {splitFiles.length > 0 && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <p className="font-medium mb-3">
                  Split into {splitFiles.length} files:
                </p>
                <div className="space-y-2">
                  {splitFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadFile(file)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button onClick={downloadAll} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download All Files
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
