import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

interface ExportResultsProps {
  data: string;
  filename?: string;
  formats?: ("txt" | "pdf" | "csv" | "json")[];
}

export const ExportResults = ({ 
  data, 
  filename = "export",
  formats = ["txt", "pdf", "csv", "json"]
}: ExportResultsProps) => {
  const { toast } = useToast();

  const downloadFile = (content: string, fileName: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportTXT = () => {
    try {
      downloadFile(data, `${filename}.txt`, "text/plain");
      toast({ title: "Success", description: "Exported as TXT" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to export TXT", variant: "destructive" });
    }
  };

  const exportPDF = () => {
    try {
      const pdf = new jsPDF();
      const lines = pdf.splitTextToSize(data, 180);
      pdf.text(lines, 15, 15);
      pdf.save(`${filename}.pdf`);
      toast({ title: "Success", description: "Exported as PDF" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to export PDF", variant: "destructive" });
    }
  };

  const exportCSV = () => {
    try {
      const lines = data.split("\n");
      const csv = lines.map(line => `"${line.replace(/"/g, '""')}"`).join("\n");
      downloadFile(csv, `${filename}.csv`, "text/csv");
      toast({ title: "Success", description: "Exported as CSV" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to export CSV", variant: "destructive" });
    }
  };

  const exportJSON = () => {
    try {
      const lines = data.split("\n").filter(l => l.trim());
      const json = JSON.stringify({ data: lines }, null, 2);
      downloadFile(json, `${filename}.json`, "application/json");
      toast({ title: "Success", description: "Exported as JSON" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to export JSON", variant: "destructive" });
    }
  };

  const exportHandlers = {
    txt: exportTXT,
    pdf: exportPDF,
    csv: exportCSV,
    json: exportJSON
  };

  if (!data || data.trim() === "") return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <span className="text-sm text-muted-foreground self-center">Export as:</span>
      {formats.map(format => (
        <Button
          key={format}
          onClick={exportHandlers[format]}
          variant="outline"
          size="sm"
        >
          <Download className="w-4 h-4 mr-2" />
          {format.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
