import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileInfo = () => {
  const [fileInfo, setFileInfo] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const info = {
      name: file.name,
      size: formatSize(file.size),
      type: file.type || "Unknown",
      lastModified: new Date(file.lastModified).toLocaleString(),
      extension: file.name.split('.').pop() || "None",
    };

    setFileInfo(info);
    toast({
      title: "File Info Retrieved",
      description: `Details for ${file.name}`,
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
  };

  return (
    <ToolLayout
      title="File Info Reader"
      description="Get detailed information about any file"
    >
      <Card className="p-6 space-y-4">
        <div>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button asChild>
              <span>
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {fileInfo && (
          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-lg">File Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">File Name</p>
                <p className="font-medium break-all">{fileInfo.name}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">File Size</p>
                <p className="font-medium">{fileInfo.size}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">File Type</p>
                <p className="font-medium">{fileInfo.type}</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Extension</p>
                <p className="font-medium">{fileInfo.extension}</p>
              </div>
              <div className="col-span-2 p-3 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground">Last Modified</p>
                <p className="font-medium">{fileInfo.lastModified}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default FileInfo;
