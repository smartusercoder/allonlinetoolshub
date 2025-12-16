import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Flashcard() {
  const [flashcards, setFlashcards] = useState<Array<{ front: string; back: string }>>([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);

  const addCard = () => {
    if (front && back) {
      setFlashcards([...flashcards, { front, back }]);
      setFront("");
      setBack("");
    }
  };

  const nextCard = () => {
    setShowBack(false);
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const prevCard = () => {
    setShowBack(false);
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <ToolLayout
      title="Flashcard Creator"
      description="Create and study flashcards"
    >
      <div className="space-y-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Create Flashcard</h3>
          <div className="space-y-4">
            <div>
              <Label>Front (Question)</Label>
              <Input
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Enter question..."
              />
            </div>
            <div>
              <Label>Back (Answer)</Label>
              <Textarea
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="Enter answer..."
                rows={3}
              />
            </div>
            <Button onClick={addCard} className="w-full">
              Add Flashcard
            </Button>
          </div>
        </Card>

        {flashcards.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">
              Study Mode ({currentIndex + 1}/{flashcards.length})
            </h3>
            
            <Card className="p-8 min-h-[200px] flex items-center justify-center cursor-pointer"
                  onClick={() => setShowBack(!showBack)}>
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">
                  {showBack ? "Answer" : "Question"}
                </div>
                <div className="text-xl">
                  {showBack 
                    ? flashcards[currentIndex].back 
                    : flashcards[currentIndex].front}
                </div>
              </div>
            </Card>

            <div className="flex gap-2">
              <Button onClick={prevCard} variant="outline" className="flex-1">
                Previous
              </Button>
              <Button onClick={() => setShowBack(!showBack)} className="flex-1">
                {showBack ? "Show Question" : "Show Answer"}
              </Button>
              <Button onClick={nextCard} variant="outline" className="flex-1">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
