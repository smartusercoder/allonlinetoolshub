import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AsciiBanner() {
  const [text, setText] = useState("HELLO");
  const [banner, setBanner] = useState("");

  const font = {
    'A': ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
    'B': ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
    'C': [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
    'D': ['DDD  ', 'D  D ', 'D   D', 'D  D ', 'DDD  '],
    'E': ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
    'F': ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
    'G': [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
    'H': ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
    'I': ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
    'J': ['JJJJJ', '   J ', '   J ', 'J  J ', ' JJ  '],
    'K': ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
    'L': ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
    'M': ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
    'N': ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
    'O': [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
    'P': ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
    'Q': [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
    'R': ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
    'S': [' SSS ', 'S    ', ' SSS ', '    S', 'SSSS '],
    'T': ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
    'U': ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
    'V': ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
    'W': ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
    'X': ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
    'Y': ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
    'Z': ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
    ' ': ['     ', '     ', '     ', '     ', '     ']
  };

  const generate = () => {
    const chars = text.toUpperCase().split('').filter(c => font[c as keyof typeof font]);
    const lines = ['', '', '', '', ''];
    
    chars.forEach((char, i) => {
      const charLines = font[char as keyof typeof font];
      charLines.forEach((line, j) => {
        lines[j] += line + (i < chars.length - 1 ? ' ' : '');
      });
    });
    
    setBanner(lines.join('\n'));
  };

  return (
    <ToolLayout
      title="ASCII Banner Generator"
      description="Create ASCII art banners from text"
    >
      <div className="space-y-6">
        <div>
          <Label>Text</Label>
          <Input
            value={text}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            placeholder="Enter text"
            maxLength={20}
          />
        </div>

        <Button onClick={generate} className="w-full">
          Generate Banner
        </Button>

        {banner && (
          <Card className="p-6">
            <pre className="font-mono text-sm overflow-x-auto">{banner}</pre>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
