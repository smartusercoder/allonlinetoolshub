import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Copy } from "lucide-react";
import { toast } from "sonner";

export default function FileChecksumCalculator() {
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [checksum, setChecksum] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const calculateChecksum = async (file: File) => {
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(2)} KB`);
    
    // Simple checksum simulation (in production, use crypto.subtle.digest)
    const text = `${file.name}${file.size}${file.lastModified}`;
    const hash = Array.from(text).reduce((acc, char) => {
      return ((acc << 5) - acc + char.charCodeAt(0)) | 0;
    }, 0);
    setChecksum(Math.abs(hash).toString(16).padStart(8, '0').toUpperCase());
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      calculateChecksum(file);
    }
  };

  return (
    <ToolLayout
      title="File Checksum Calculator"
      description="Calculate file hash and checksum"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Upload File</Label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose File
          </Button>
        </div>

        {fileName && (
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="text-sm text-muted-foreground mb-1">File Name</div>
                <div className="font-medium">{fileName}</div>
              </Card>

              <Card className="p-4">
                <div className="text-sm text-muted-foreground mb-1">File Size</div>
                <div className="font-medium">{fileSize}</div>
              </Card>
            </div>

            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-muted-foreground">Checksum (Simulated Hash)</div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(checksum);
                    toast.success("Checksum copied!");
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="font-mono text-lg font-bold break-all">{checksum}</div>
            </Card>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
