import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function FaqSchemaGenerator() {
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const { toast } = useToast();

  const addFaq = () => {
    setFaqs([...faqs, { question: "", answer: "" }]);
  };

  const updateFaq = (index: number, field: "question" | "answer", value: string) => {
    const updated = [...faqs];
    updated[index][field] = value;
    setFaqs(updated);
  };

  const removeFaq = (index: number) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const generateSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.filter(f => f.question && f.answer).map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const schemaString = JSON.stringify(schema, null, 2);
    navigator.clipboard.writeText(`<script type="application/ld+json">\n${schemaString}\n</script>`);
    
    toast({
      title: "Copied",
      description: "FAQ Schema copied to clipboard",
    });
  };

  return (
    <ToolLayout
      title="FAQ Schema Generator"
      description="Generate structured data for FAQ pages"
    >
      <Card className="p-6 space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <Label>FAQ #{index + 1}</Label>
              {faqs.length > 1 && (
                <Button variant="destructive" size="sm" onClick={() => removeFaq(index)}>
                  Remove
                </Button>
              )}
            </div>
            <Input
              placeholder="Question"
              value={faq.question}
              onChange={(e) => updateFaq(index, "question", e.target.value)}
            />
            <Textarea
              placeholder="Answer"
              value={faq.answer}
              onChange={(e) => updateFaq(index, "answer", e.target.value)}
              rows={3}
            />
          </Card>
        ))}

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={addFaq} variant="outline">Add FAQ</Button>
          <Button onClick={generateSchema}>Copy Schema</Button>
        </div>
      </Card>
    </ToolLayout>
  );
}
