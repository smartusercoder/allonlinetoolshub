import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JSZip from "jszip";

export default function ImageSplitter() {
  const [image, setImage] = useState<string | null>(null);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const splitImage = async () => {
    if (!image) return;

    const img = new Image();
    img.src = image;

    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const pieceWidth = Math.floor(img.width / cols);
    const pieceHeight = Math.floor(img.height / rows);

    const zip = new JSZip();

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const canvas = document.createElement('canvas');
        canvas.width = pieceWidth;
        canvas.height = pieceHeight;
        const ctx = canvas.getContext('2d');

        if (ctx) {
          ctx.drawImage(
            img,
            col * pieceWidth,
            row * pieceHeight,
            pieceWidth,
            pieceHeight,
            0,
            0,
            pieceWidth,
            pieceHeight
          );

          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((b) => resolve(b!));
          });

          zip.file(`piece_${row + 1}_${col + 1}.png`, blob);
        }
      }
    }

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'split-images.zip';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: `Image split into ${rows * cols} pieces and downloaded`,
    });
  };

  return (
    <ToolLayout
      title="Image Splitter"
      description="Split images into grid pieces"
    >
      <Card className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {image && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rows">Rows</Label>
                <Input
                  id="rows"
                  type="number"
                  value={rows}
                  onChange={(e) => setRows(Math.max(1, Math.min(10, Number(e.target.value))))}
                  min="1"
                  max="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cols">Columns</Label>
                <Input
                  id="cols"
                  type="number"
                  value={cols}
                  onChange={(e) => setCols(Math.max(1, Math.min(10, Number(e.target.value))))}
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preview (Grid: {rows} × {cols})</Label>
              <div className="border rounded-lg p-4 bg-muted">
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${cols}, 1fr)`,
                  gap: '2px',
                  maxWidth: '100%'
                }}>
                  {Array.from({ length: rows * cols }).map((_, i) => (
                    <div key={i} className="border-2 border-primary aspect-square" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-muted p-3 rounded text-sm">
              Will create {rows * cols} image pieces
            </div>

            <Button onClick={splitImage} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Split & Download as ZIP
            </Button>
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
