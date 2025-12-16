import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";
import { toast } from "sonner";

export default function TransactionIdGenerator() {
  const [ids, setIds] = useState<string[]>([]);

  const generateId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 15);
    return `TXN-${timestamp}-${random}`.toUpperCase();
  };

  const generateIds = () => {
    setIds(Array.from({ length: 15 }, generateId));
  };

  if (ids.length === 0) generateIds();

  return (
    <ToolLayout
      title="Transaction ID Generator"
      description="Generate unique transaction identifiers"
    >
      <div className="space-y-4">
        <Button onClick={generateIds} className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Generate New Transaction IDs
        </Button>

        <div className="grid md:grid-cols-2 gap-4">
          {ids.map((id, index) => (
            <Card
              key={index}
              className="p-4 cursor-pointer hover:bg-accent transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(id);
                toast.success("Transaction ID copied!");
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-sm">{id}</span>
                <Copy className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
