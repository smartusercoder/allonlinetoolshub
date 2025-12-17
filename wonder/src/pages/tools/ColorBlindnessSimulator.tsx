import { useState, useRef } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from "lucide-react";

export default function ColorBlindnessSimulator() {
  const [image, setImage] = useState<string>("");
  const [type, setType] = useState("protanopia");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const colorBlindTypes = {
    protanopia: "Protanopia (Red-blind)",
    deuteranopia: "Deuteranopia (Green-blind)",
    tritanopia: "Tritanopia (Blue-blind)",
    achromatopsia: "Achromatopsia (Total color blindness)"
  };

  return (
    <ToolLayout
      title="Color Blindness Simulator"
      description="Simulate different types of color blindness"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>Upload Image</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            Choose Image
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Color Blindness Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(colorBlindTypes).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {image && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm font-medium mb-2">Original</div>
              <img src={image} alt="Original" className="w-full rounded-lg" />
            </div>
            <div>
              <div className="text-sm font-medium mb-2">Simulated ({colorBlindTypes[type as keyof typeof colorBlindTypes]})</div>
              <img
                src={image}
                alt="Simulated"
                className="w-full rounded-lg"
                style={{
                  filter: type === "achromatopsia" ? "grayscale(100%)" :
                         type === "protanopia" ? "hue-rotate(180deg) saturate(0.6)" :
                         type === "deuteranopia" ? "hue-rotate(90deg) saturate(0.7)" :
                         "hue-rotate(-90deg) saturate(0.5)"
                }}
              />
            </div>
          </div>
        )}
      </Card>
    </ToolLayout>
  );
}
