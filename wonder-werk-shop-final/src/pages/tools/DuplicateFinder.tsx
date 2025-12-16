import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Upload, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const DuplicateFinder = () => {
  const [files, setFiles] = useState<Array<{ name: string; hash: string; size: number }>>([]);
  const [duplicates, setDuplicates] = useState<Array<Array<{ name: string; size: number }>>>([]);
  const { toast } = useToast();

  const calculateHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    
    const fileData = await Promise.all(
      uploadedFiles.map(async file => ({
        name: file.name,
        hash: await calculateHash(file),
        size: file.size
      }))
    );

    setFiles(prev => [...prev, ...fileData]);
    toast({
      title: "Success",
      description: `Uploaded ${uploadedFiles.length} files`,
    });
  };

  const findDuplicates = () => {
    const hashMap = new Map<string, Array<{ name: string; size: number }>>();

    files.forEach(file => {
      const existing = hashMap.get(file.hash) || [];
      existing.push({ name: file.name, size: file.size });
      hashMap.set(file.hash, existing);
    });

    const dupes = Array.from(hashMap.values()).filter(group => group.length > 1);
    setDuplicates(dupes);

    toast({
      title: dupes.length > 0 ? "Duplicates Found" : "No Duplicates",
      description: dupes.length > 0 
        ? `Found ${dupes.length} groups of duplicate files`
        : "No duplicate files found",
    });
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB";
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <ToolLayout
      title="Duplicate File Finder"
      description="Find duplicate files by comparing their hash values"
    >
      <UsageGuide
        steps={[
          "Click 'Upload Files' and select multiple files",
          "Files are analyzed using SHA-256 hash",
          "Click 'Find Duplicates' to compare",
          "View groups of identical files"
        ]}
        tips={[
          "Uses cryptographic hash for accurate matching",
          "Even identical files with different names are detected",
          "Perfect for cleaning up duplicate photos or documents",
          "Shows file sizes to help identify space savings"
        ]}
      />
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
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Uploaded Files: {files.length}</Label>
              <Button onClick={findDuplicates}>
                <Search className="mr-2 h-4 w-4" />
                Find Duplicates
              </Button>
            </div>
          )}

          {duplicates.length > 0 && (
            <div className="space-y-3 pt-4 border-t">
              <h3 className="font-semibold text-lg">
                Found {duplicates.length} Duplicate Groups
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {duplicates.map((group, groupIndex) => (
                  <div key={groupIndex} className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-medium mb-2">
                      Group {groupIndex + 1} ({group.length} files)
                    </p>
                    <div className="space-y-1">
                      {group.map((file, fileIndex) => (
                        <div key={fileIndex} className="text-sm pl-4">
                          • {file.name} ({formatSize(file.size)})
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default DuplicateFinder;
