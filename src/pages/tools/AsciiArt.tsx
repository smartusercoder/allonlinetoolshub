import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Type } from "lucide-react";

const AsciiArt = () => {
  const [text, setText] = useState("");
  const [ascii, setAscii] = useState("");

  const fonts: Record<string, Record<string, string[]>> = {
    standard: {
      'A': ['  ___  ', ' / _ \\ ', '/ /_\\ \\', '|  _  |', '| | | |', '\\_| |_/'],
      'B': [' ____  ', '| __ ) ', '|  _ \\ ', '| |_) |', '|____/ '],
      // Add more letters...
    }
  };

  const generateAscii = () => {
    if (!text.trim()) {
      setAscii('');
      return;
    }

    // Simple ASCII art generation
    const lines = ['', '', '', '', '', ''];
    const chars = text.toUpperCase().split('');
    
    chars.forEach(char => {
      if (char === ' ') {
        for (let i = 0; i < 6; i++) {
          lines[i] += '  ';
        }
      } else {
        const pattern = fonts.standard[char];
        if (pattern) {
          for (let i = 0; i < 6; i++) {
            lines[i] += (pattern[i] || '       ') + ' ';
          }
        }
      }
    });

    setAscii(lines.join('\n'));
  };

  return (
    <ToolLayout
      title="ASCII Art Generator"
      description="Convert text to ASCII art"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="text">Text</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text..."
            maxLength={20}
          />
        </div>

        <Button onClick={generateAscii}>
          <Type className="mr-2 h-4 w-4" />
          Generate ASCII Art
        </Button>

        {ascii && (
          <div className="space-y-2">
            <Label>ASCII Art</Label>
            <Textarea
              value={ascii}
              readOnly
              rows={8}
              className="font-mono text-xs"
            />
          </div>
        )}
      </Card>
    </ToolLayout>
  );
};

export default AsciiArt;
