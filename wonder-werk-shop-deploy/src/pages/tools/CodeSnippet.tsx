import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function CodeSnippet() {
  const [snippets, setSnippets] = useState<Array<{ title: string; code: string; lang: string }>>([]);
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [lang, setLang] = useState("javascript");

  const addSnippet = () => {
    if (title && code) {
      setSnippets([...snippets, { title, code, lang }]);
      setTitle("");
      setCode("");
    }
  };

  const deleteSnippet = (index: number) => {
    setSnippets(snippets.filter((_, i) => i !== index));
  };

  return (
    <ToolLayout
      title="Code Snippet Manager"
      description="Save and organize code snippets"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Add Snippet</h3>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Snippet title..."
              />
            </div>
            <div>
              <Label>Language</Label>
              <Input
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                placeholder="javascript"
              />
            </div>
            <div>
              <Label>Code</Label>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Your code here..."
                rows={6}
              />
            </div>
            <Button onClick={addSnippet} className="w-full">
              Save Snippet
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold">Saved Snippets ({snippets.length})</h3>
          {snippets.map((snippet, i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{snippet.title}</h4>
                  <div className="text-xs text-muted-foreground">{snippet.lang}</div>
                </div>
                <Button
                  onClick={() => deleteSnippet(i)}
                  variant="destructive"
                  size="sm"
                >
                  Delete
                </Button>
              </div>
              <pre className="bg-muted p-3 rounded overflow-x-auto text-sm">
                <code>{snippet.code}</code>
              </pre>
            </Card>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
