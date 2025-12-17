import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight } from "lucide-react";

const MorseCode = () => {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const morseCodeMap: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': '/'
  };

  const reverseMorseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
  );

  const textToMorse = () => {
    const converted = text
      .toUpperCase()
      .split('')
      .map(char => morseCodeMap[char] || char)
      .join(' ');
    setMorse(converted);
  };

  const morseToText = () => {
    const converted = morse
      .split(' ')
      .map(code => reverseMorseMap[code] || '')
      .join('');
    setText(converted);
  };

  return (
    <ToolLayout
      title="Morse Code Converter"
      description="Convert text to/from Morse code"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text..."
              rows={6}
            />
            <Button onClick={textToMorse}>
              Convert to Morse Code
            </Button>
          </div>

          <div className="flex justify-center">
            <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="morse">Morse Code</Label>
            <Textarea
              id="morse"
              value={morse}
              onChange={(e) => setMorse(e.target.value)}
              placeholder="Enter morse code (use . for dot, - for dash, / for space)..."
              rows={6}
            />
            <Button onClick={morseToText}>
              Convert to Text
            </Button>
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default MorseCode;
