import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SpamChecker() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const spamWords = ['free', 'win', 'winner', 'cash', 'prize', 'urgent', 'act now', 'limited time', 'click here'];
  const allText = (subject + ' ' + body).toLowerCase();
  const foundWords = spamWords.filter(word => allText.includes(word));
  const score = foundWords.length * 20;

  const faqs = [
    {
      question: "How does the spam checker work?",
      answer: "The tool scans your email subject and body for common spam trigger words and phrases, then calculates a spam score based on how many it finds."
    },
    {
      question: "What is a good spam score?",
      answer: "Lower is better. 0-20% is excellent, 20-40% needs improvement, and over 40% indicates high spam risk that should be revised."
    },
    {
      question: "Will this guarantee inbox delivery?",
      answer: "No, this is a basic checker. Real spam filters use hundreds of factors including sender reputation, authentication, and content analysis."
    },
    {
      question: "What words trigger spam filters?",
      answer: "Common triggers include 'free', 'win', 'cash', 'urgent', 'act now', 'click here', 'limited time', and excessive punctuation or caps."
    },
    {
      question: "How can I reduce my spam score?",
      answer: "Remove or replace spam trigger words, avoid excessive capitalization and exclamation marks, and write naturally as if speaking to a friend."
    }
  ];

  const howToSteps = [
    {
      name: "Enter email subject",
      text: "Type your email subject line in the first input field."
    },
    {
      name: "Add email body",
      text: "Paste or type your complete email message in the body textarea."
    },
    {
      name: "Review spam score",
      text: "The tool instantly shows your spam score percentage and highlights any trigger words found."
    },
    {
      name: "Revise if needed",
      text: "If your score is high, rewrite your email to remove spam trigger words and improve deliverability."
    }
  ];

  return (
    <ToolLayout 
      title="Email Spam Checker" 
      description="Check if email might be spam"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject line..." />
        <Textarea value={body} onChange={e => setBody(e.target.value)} rows={8} placeholder="Email body..." />
        {(subject || body) && (
          <div className={`p-6 rounded text-center ${score > 40 ? 'bg-red-50' : score > 20 ? 'bg-yellow-50' : 'bg-green-50'}`}>
            <div className="text-4xl font-bold">{score}%</div>
            <div className="text-sm mt-2">Spam Score</div>
            {foundWords.length > 0 && (
              <div className="text-xs mt-2">Found: {foundWords.join(', ')}</div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
