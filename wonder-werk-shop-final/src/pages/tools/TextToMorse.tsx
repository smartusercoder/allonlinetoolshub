import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeftRight } from "lucide-react";

const morseCode: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

export default function TextToMorse() {
  const [text, setText] = useState("");
  const [morse, setMorse] = useState("");

  const toMorse = () => {
    const result = text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    setMorse(result);
  };

  const fromMorse = () => {
    const reverseMorse = Object.fromEntries(Object.entries(morseCode).map(([k, v]) => [v, k]));
    const result = morse.split(' ').map(code => reverseMorse[code] || code).join('');
    setText(result);
  };

  return (
    <ToolLayout title="Text to Morse Code" description="Convert text to Morse code and vice versa">
      <div className="space-y-4">
        <Textarea value={text} onChange={(e) => setText(e.target.value)} rows={6} placeholder="Enter text..." />
        <div className="flex gap-2">
          <Button onClick={toMorse} className="flex-1">To Morse</Button>
          <Button onClick={fromMorse} variant="outline" className="flex-1">
            <ArrowLeftRight className="w-4 h-4 mr-2" />
            From Morse
          </Button>
        </div>
        <Textarea value={morse} onChange={(e) => setMorse(e.target.value)} rows={6} placeholder="Morse code..." />
      </div>
    </ToolLayout>
  );
}
