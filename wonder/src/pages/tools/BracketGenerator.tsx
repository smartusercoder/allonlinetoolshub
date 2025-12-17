import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function BracketGenerator() {
  const [participants, setParticipants] = useState<string[]>(["", "", "", ""]);
  
  const updateParticipant = (index: number, value: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    if (participants.length < 16) {
      setParticipants([...participants, ""]);
    }
  };

  const removeParticipant = () => {
    if (participants.length > 2) {
      setParticipants(participants.slice(0, -1));
    }
  };

  const isPowerOfTwo = participants.length && (participants.length & (participants.length - 1)) === 0;

  return (
    <ToolLayout
      title="Tournament Bracket Generator"
      description="Create tournament brackets"
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button onClick={addParticipant} disabled={participants.length >= 16}>
            Add Participant
          </Button>
          <Button onClick={removeParticipant} variant="outline" disabled={participants.length <= 2}>
            Remove
          </Button>
        </div>

        {!isPowerOfTwo && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
            Number of participants should be a power of 2 (2, 4, 8, 16)
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          {participants.map((participant, i) => (
            <div key={i}>
              <Label>Participant {i + 1}</Label>
              <Input
                value={participant}
                onChange={(e) => updateParticipant(i, e.target.value)}
                placeholder={`Player ${i + 1}`}
              />
            </div>
          ))}
        </div>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Round 1</h3>
          <div className="space-y-4">
            {participants.filter((_, i) => i % 2 === 0).map((p1, i) => (
              <div key={i} className="border rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span>{p1 || `Player ${i * 2 + 1}`}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{participants[i * 2 + 1] || `Player ${i * 2 + 2}`}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
