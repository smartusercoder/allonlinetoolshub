import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NotepadOnline = () => {
  const [text, setText] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem("notepad-content");
    if (saved) {
      setText(saved);
    }
  }, []);

  const saveNote = () => {
    localStorage.setItem("notepad-content", text);
    toast({
      title: "Saved",
      description: "Your note has been saved locally",
    });
  };

  const clearNote = () => {
    setText("");
    localStorage.removeItem("notepad-content");
    toast({
      title: "Cleared",
      description: "Your note has been cleared",
    });
  };

  const downloadNote = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `note-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Online Notepad"
      description="Simple online notepad with auto-save to browser storage"
    >
      <Card className="p-6 space-y-4">
        <div className="flex gap-2">
          <Button onClick={saveNote}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button onClick={downloadNote} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button onClick={clearNote} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>

        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing your notes here..."
          rows={20}
          className="font-mono"
        />

        <div className="text-sm text-muted-foreground">
          <p>Character count: {text.length}</p>
          <p>Word count: {text.trim() ? text.trim().split(/\s+/).length : 0}</p>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default NotepadOnline;
