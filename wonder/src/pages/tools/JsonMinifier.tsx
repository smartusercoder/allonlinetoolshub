import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function JsonMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
    } catch {
      setOutput("Invalid JSON");
    }
  };

  const faqs = [
    {
      question: "What is JSON minification?",
      answer: "JSON minification removes all unnecessary whitespace, line breaks, and indentation from JSON code to reduce file size while maintaining functionality."
    },
    {
      question: "Will minifying break my JSON?",
      answer: "No, minification only removes cosmetic formatting. The JSON structure and data remain identical and fully functional."
    },
    {
      question: "How much smaller will my JSON file be?",
      answer: "Typically 10-40% smaller depending on how much whitespace and indentation your original JSON contains."
    },
    {
      question: "Can I minify invalid JSON?",
      answer: "No, the tool validates JSON first. If your JSON has syntax errors, it will show 'Invalid JSON' and you'll need to fix the errors first."
    },
    {
      question: "Should I minify JSON for production?",
      answer: "Yes, minified JSON reduces bandwidth usage and improves load times, especially for APIs and web applications."
    }
  ];

  const howToSteps = [
    {
      name: "Paste your JSON",
      text: "Copy your formatted JSON code and paste it into the input field."
    },
    {
      name: "Click Minify JSON",
      text: "Press the 'Minify JSON' button to remove all whitespace and compress the code."
    },
    {
      name: "Copy minified code",
      text: "The minified JSON appears below - copy it to use in your application or API."
    }
  ];

  return (
    <ToolLayout 
      title="JSON Minifier" 
      description="Minify JSON code"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Textarea value={input} onChange={e => setInput(e.target.value)} rows={10} placeholder="Enter JSON..." />
        <Button onClick={minify} className="w-full">Minify JSON</Button>
        {output && <Textarea value={output} readOnly rows={10} />}
      </div>
    </ToolLayout>
  );
}
