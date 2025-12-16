import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { UsageGuide } from "@/components/UsageGuide";

export default function XmlMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const minify = () => {
    const minified = input
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
    setOutput(minified);
  };

  const faqs = [
    {
      question: "What does XML minification do?",
      answer: "XML minification removes unnecessary whitespace, line breaks, and indentation to reduce file size while preserving the XML structure and data."
    },
    {
      question: "Will it break my XML formatting?",
      answer: "The XML remains valid and functional. Only cosmetic whitespace is removed - the data and structure stay intact."
    },
    {
      question: "How much can I reduce file size?",
      answer: "Typically 20-50% reduction depending on how much indentation and whitespace your original XML contains."
    },
    {
      question: "Can I minify XML with attributes?",
      answer: "Yes, all XML elements, attributes, and values are preserved. Only spacing between elements is removed."
    }
  ];

  const howToSteps = [
    {
      name: "Paste XML code",
      text: "Copy your formatted XML document and paste it into the input textarea."
    },
    {
      name: "Click Minify XML",
      text: "Press the 'Minify XML' button to compress the code by removing whitespace."
    },
    {
      name: "Copy minified output",
      text: "The compressed XML appears below - copy it for use in your application or data transfer."
    }
  ];

  return (
    <ToolLayout 
      title="XML Minifier" 
      description="Minify XML code"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Paste your formatted XML code",
            "Click \"Minify XML\" button",
            "Minified XML appears below",
            "Use for reducing file size"
          ]}
          tips={[
            "Removes whitespace and line breaks",
            "Reduces XML file size",
            "Great for optimizing data transfers",
            "Useful for API payloads"
          ]}
        />
      </div>
      <div className="space-y-4">
        <Textarea value={input} onChange={e => setInput(e.target.value)} rows={10} placeholder="Enter XML..." />
        <Button onClick={minify} className="w-full">Minify XML</Button>
        {output && <Textarea value={output} readOnly rows={10} />}
      </div>
    </ToolLayout>
  );
}
