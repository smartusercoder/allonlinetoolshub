import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, Download, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileMerger = () => {
  const [files, setFiles] = useState<Array<{ name: string; content: string }>>([]);
  const [mergedContent, setMergedContent] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    
    uploadedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFiles(prev => [...prev, {
          name: file.name,
          content: event.target?.result as string
        }]);
      };
      reader.readAsText(file);
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergeFiles = () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please upload at least one file",
        variant: "destructive",
      });
      return;
    }

    const merged = files.map(f => 
      `// ========== ${f.name} ==========\n\n${f.content}\n\n`
    ).join('');

    setMergedContent(merged);
    toast({
      title: "Success",
      description: `Merged ${files.length} files`,
    });
  };

  const downloadMerged = () => {
    const blob = new Blob([mergedContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "merged-file.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="File Merger"
      description="Merge multiple text files into one"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </span>
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="text/*,.txt,.md,.json,.csv,.xml,.html,.css,.js,.ts"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files ({files.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFile(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button onClick={mergeFiles} disabled={files.length === 0}>
            Merge Files
          </Button>

          {mergedContent && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Merged Content</Label>
                <Button size="sm" variant="outline" onClick={downloadMerged}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
              <Textarea
                value={mergedContent}
                readOnly
                rows={15}
                className="font-mono text-xs"
              />
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default FileMerger;
