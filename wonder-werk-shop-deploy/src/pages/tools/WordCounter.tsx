import { useState, useMemo } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const WordCounter = () => {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
    const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words/min

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
    };
  }, [text]);

  return (
    <ToolLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs in your text instantly. Free online word counter tool with real-time analysis."
      keywords={[
        "word counter", "character counter", "text counter", "word count tool",
        "count words online", "free word counter", "sentence counter", "paragraph counter"
      ]}
      category="text"
      faqs={toolFAQs["word-counter"]}
      howToSteps={[
        {
          name: "Enter Your Text",
          text: "Type or paste your text into the text area. You can enter any content - essays, articles, social media posts, or any written content you want to analyze."
        },
        {
          name: "View Real-Time Statistics",
          text: "As you type, the tool automatically counts and displays words, characters (with and without spaces), sentences, paragraphs, and estimated reading time."
        },
        {
          name: "Monitor Character Limits",
          text: "Use the character counter to ensure your text fits within specific limits like Twitter posts (280 chars), meta descriptions (150-160 chars), or essay requirements."
        },
        {
          name: "Check Reading Time",
          text: "Review the estimated reading time calculated at 200 words per minute to gauge how long it takes to read your content."
        }
      ]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Type or paste your text into the text area below",
            "The statistics will update automatically as you type",
            "View word count, character count, sentences, paragraphs, and reading time"
          ]}
          tips={[
            "Great for checking essay word counts or article length",
            "Reading time is calculated at 200 words per minute",
            "Use for SEO meta descriptions (aim for 150-160 characters)"
          ]}
        />

        <Textarea
          placeholder="Start typing or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[300px] text-base"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-2 border-blue-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stats.words}</p>
              <p className="text-sm text-muted-foreground">Words</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stats.characters}</p>
              <p className="text-sm text-muted-foreground">Characters</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-2 border-orange-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stats.charactersNoSpaces}</p>
              <p className="text-sm text-muted-foreground">Characters (no spaces)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stats.sentences}</p>
              <p className="text-sm text-muted-foreground">Sentences</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border-2 border-red-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stats.paragraphs}</p>
              <p className="text-sm text-muted-foreground">Paragraphs</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-2 border-teal-200">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold text-primary mb-1">{stats.readingTime}</p>
              <p className="text-sm text-muted-foreground">Min. to read</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
};

export default WordCounter;
