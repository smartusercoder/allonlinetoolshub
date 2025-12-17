import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ChangelogGenerator() {
  const [version, setVersion] = useState("1.0.0");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<Array<{ type: string; text: string }>>([
    { type: "added", text: "" }
  ]);

  const addEntry = () => {
    setEntries([...entries, { type: "added", text: "" }]);
  };

  const updateEntry = (index: number, field: string, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const generateChangelog = () => {
    let changelog = `## [${version}] - ${date}\n\n`;
    
    const grouped = entries.reduce((acc, entry) => {
      if (entry.text.trim()) {
        if (!acc[entry.type]) acc[entry.type] = [];
        acc[entry.type].push(entry.text);
      }
      return acc;
    }, {} as Record<string, string[]>);

    const sections = {
      added: "Added",
      changed: "Changed",
      deprecated: "Deprecated",
      removed: "Removed",
      fixed: "Fixed",
      security: "Security"
    };

    Object.entries(sections).forEach(([key, title]) => {
      if (grouped[key]?.length) {
        changelog += `### ${title}\n`;
        grouped[key].forEach(item => {
          changelog += `- ${item}\n`;
        });
        changelog += '\n';
      }
    });

    return changelog;
  };

  return (
    <ToolLayout
      title="Changelog Generator"
      description="Generate changelogs following Keep a Changelog format"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Version</Label>
            <Input
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="1.0.0"
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Changes</Label>
          {entries.map((entry, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <Select
                value={entry.type}
                onValueChange={(value) => updateEntry(i, 'type', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="added">Added</SelectItem>
                  <SelectItem value="changed">Changed</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                  <SelectItem value="removed">Removed</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                </SelectContent>
              </Select>
              <Input
                className="col-span-9"
                value={entry.text}
                onChange={(e) => updateEntry(i, 'text', e.target.value)}
                placeholder="Describe the change..."
              />
            </div>
          ))}
          <Button onClick={addEntry} variant="outline" size="sm">
            Add Entry
          </Button>
        </div>

        <div>
          <Label>Generated Changelog</Label>
          <Textarea value={generateChangelog()} readOnly rows={15} />
        </div>
      </div>
    </ToolLayout>
  );
}
