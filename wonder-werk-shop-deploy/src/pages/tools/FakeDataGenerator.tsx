import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FakeDataGenerator() {
  const [count, setCount] = useState(5);
  const [dataType, setDataType] = useState("name");
  const [results, setResults] = useState<string[]>([]);
  const { toast } = useToast();

  const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Robert", "Lisa", "James", "Mary"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com"];
  const streets = ["Main St", "Oak Ave", "Maple Dr", "Cedar Ln", "Pine Rd"];
  const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];

  const generateData = () => {
    const data: string[] = [];
    for (let i = 0; i < count; i++) {
      switch (dataType) {
        case "name":
          data.push(`${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`);
          break;
        case "email":
          const name = `${firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase()}${Math.floor(Math.random() * 100)}`;
          data.push(`${name}@${domains[Math.floor(Math.random() * domains.length)]}`);
          break;
        case "phone":
          data.push(`(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`);
          break;
        case "address":
          data.push(`${Math.floor(Math.random() * 9000) + 1000} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`);
          break;
      }
    }
    setResults(data);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join('\n'));
    toast({
      title: "Copied!",
      description: "All data copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="Fake Data Generator"
      description="Generate fake names, emails, addresses for testing"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Data Type</label>
            <Select value={dataType} onValueChange={setDataType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Full Names</SelectItem>
                <SelectItem value="email">Email Addresses</SelectItem>
                <SelectItem value="phone">Phone Numbers</SelectItem>
                <SelectItem value="address">Addresses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Number of Records</label>
            <Input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>

          <Button onClick={generateData} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Data
          </Button>

          {results.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Generated Data</label>
                <Button onClick={copyAll} variant="outline" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy All
                </Button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {results.map((item, index) => (
                  <div key={index} className="p-2 bg-muted rounded font-mono text-sm">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
