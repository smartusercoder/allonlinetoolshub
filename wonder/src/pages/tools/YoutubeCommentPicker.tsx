import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const YoutubeCommentPicker = () => {
  const [comments, setComments] = useState("");
  const [winner, setWinner] = useState("");
  const { toast } = useToast();

  const pickRandom = () => {
    const commentList = comments
      .split('\n')
      .map(c => c.trim())
      .filter(c => c.length > 0);

    if (commentList.length === 0) {
      toast({
        title: "No Comments",
        description: "Please enter at least one comment",
        variant: "destructive",
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * commentList.length);
    setWinner(commentList[randomIndex]);
  };

  return (
    <ToolLayout
      title="YouTube Comment Picker"
      description="Pick a random winner from YouTube comments"
    >
      <div className="space-y-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Comments (one per line)
              </label>
              <Textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Paste comments here (one per line)&#10;John Doe&#10;Jane Smith&#10;Bob Johnson"
                rows={10}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {comments.split('\n').filter(c => c.trim()).length} comments entered
              </p>
            </div>

            <Button onClick={pickRandom} className="w-full">
              <Shuffle className="w-4 h-4 mr-2" />
              Pick Random Winner
            </Button>

            {winner && (
              <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border-2 border-primary">
                <p className="text-xs text-muted-foreground mb-2">🎉 Winner</p>
                <p className="text-xl font-bold">{winner}</p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-3">How to Use</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Copy comments from your YouTube video</li>
            <li>Paste them in the text area (one per line)</li>
            <li>Click "Pick Random Winner" to select a random comment</li>
            <li>Perfect for giveaways and contests!</li>
          </ul>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default YoutubeCommentPicker;
