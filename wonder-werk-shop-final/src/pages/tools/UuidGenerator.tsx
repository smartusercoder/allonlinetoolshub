import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";

const UuidGenerator = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const { toast } = useToast();

  const generateUUID = () => {
    return crypto.randomUUID();
  };

  const handleGenerate = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const handleCopy = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    toast({
      title: "Copied!",
      description: "UUID copied to clipboard",
    });
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    toast({
      title: "Copied!",
      description: `${uuids.length} UUIDs copied to clipboard`,
    });
  };

  return (
    <ToolLayout
      title="UUID Generator"
      description="Generate universally unique identifiers (UUIDs)"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Set the number of UUIDs you need (1-100)",
            "Click \"Generate UUID\" button",
            "Click individual copy buttons for single UUIDs",
            "Use \"Copy All\" to copy multiple UUIDs"
          ]}
          tips={[
            "UUIDs are globally unique identifiers",
            "Perfect for database primary keys",
            "Great for session IDs and tracking codes",
            "Format: 8-4-4-4-12 hexadecimal digits",
            "Virtually impossible to have duplicates"
          ]}
          example="550e8400-e29b-41d4-a716-446655440000"
        />
        <div>
          <label className="text-sm font-medium mb-2 block">
            Number of UUIDs to Generate
          </label>
          <Input
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
          />
        </div>

        <Button onClick={handleGenerate} className="w-full" variant="hero">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate UUID{count > 1 ? 's' : ''}
        </Button>

        {uuids.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Generated UUIDs</h4>
              {uuids.length > 1 && (
                <Button size="sm" variant="outline" onClick={handleCopyAll}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              )}
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {uuids.map((uuid, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <code className="text-sm font-mono">{uuid}</code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(uuid)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default UuidGenerator;
