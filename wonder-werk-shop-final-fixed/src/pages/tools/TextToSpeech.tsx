import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("default");
  const [rate, setRate] = useState([1]);
  const [pitch, setPitch] = useState([1]);
  const [speaking, setSpeaking] = useState(false);
  const { toast } = useToast();

  const speak = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate[0];
    utterance.pitch = pitch[0];
    
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <ToolLayout
      title="Text to Speech"
      description="Convert text to speech audio"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to convert to speech..."
              rows={8}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate">Speed: {rate[0].toFixed(1)}x</Label>
              <Slider
                id="rate"
                min={0.5}
                max={2}
                step={0.1}
                value={rate}
                onValueChange={setRate}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pitch">Pitch: {pitch[0].toFixed(1)}</Label>
              <Slider
                id="pitch"
                min={0.5}
                max={2}
                step={0.1}
                value={pitch}
                onValueChange={setPitch}
              />
            </div>
          </div>

          <div className="flex gap-2">
            {!speaking ? (
              <Button onClick={speak}>
                <Play className="mr-2 h-4 w-4" />
                Speak
              </Button>
            ) : (
              <Button onClick={stop} variant="destructive">
                <Pause className="mr-2 h-4 w-4" />
                Stop
              </Button>
            )}
          </div>
        </div>
      </Card>
    </ToolLayout>
  );
};

export default TextToSpeech;
