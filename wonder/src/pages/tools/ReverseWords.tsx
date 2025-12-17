import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { UsageGuide } from "@/components/UsageGuide";

export default function ReverseWords() {
  const [text, setText] = useState("");

  const reversed = text.split(' ').reverse().join(' ');

  const faqs = [
    {
      question: "What does reverse words do?",
      answer: "Reverse Words changes the order of words in your text while keeping each word intact. For example, 'Hello World' becomes 'World Hello'."
    },
    {
      question: "Does it reverse individual letters?",
      answer: "No, this tool only reverses the order of words. Each word remains spelled correctly. Use a text reverser tool if you want to reverse letters."
    },
    {
      question: "Can I reverse multiple sentences?",
      answer: "Yes, you can paste any amount of text and all words will be reversed in order across the entire text."
    },
    {
      question: "Is this useful for RTL languages?",
      answer: "Yes, this tool is helpful for testing right-to-left (RTL) language layouts and bidirectional text rendering."
    }
  ];

  const howToSteps = [
    {
      name: "Enter your text",
      text: "Type or paste the text you want to reverse into the input field."
    },
    {
      name: "View instant results",
      text: "The tool automatically reverses the word order in real-time as you type."
    },
    {
      name: "Copy reversed text",
      text: "Select and copy the reversed text from the output field to use it anywhere."
    }
  ];

  return (
    <ToolLayout 
      title="Reverse Words" 
      description="Reverse word order in text"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <UsageGuide
        steps={[
          "Type or paste text with multiple words",
          "Words are automatically reversed in real-time",
          "View reversed result instantly"
        ]}
        tips={[
          "Reverses word order, not letters",
          '"Hello World" becomes "World Hello"',
          "Great for RTL language testing",
          "Updates as you type"
        ]}
        example='"First Second Third" → "Third Second First"'
      />
      <div className="space-y-4">
        <Textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Enter text..." />
        <Textarea value={reversed} readOnly rows={6} />
      </div>
    </ToolLayout>
  );
}
