import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function MacAddressGenerator() {
  const [count, setCount] = useState("5");
  const [addresses, setAddresses] = useState<string[]>([]);

  const generate = () => {
    const num = Math.min(parseInt(count) || 5, 50);
    const result: string[] = [];
    
    for (let i = 0; i < num; i++) {
      const mac = Array(6).fill(0)
        .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, '0'))
        .join(':');
      result.push(mac.toUpperCase());
    }
    
    setAddresses(result);
  };

  const faqs = [
    {
      question: "What is a MAC address?",
      answer: "A MAC (Media Access Control) address is a unique 48-bit hardware identifier assigned to network interfaces. It consists of six groups of two hexadecimal digits separated by colons."
    },
    {
      question: "Are these MAC addresses real?",
      answer: "No, these are randomly generated MAC addresses for testing purposes only. They may not correspond to actual manufacturer assignments."
    },
    {
      question: "When would I need a fake MAC address?",
      answer: "Generated MAC addresses are useful for network testing, software development, virtual machines, documentation, and educational purposes."
    },
    {
      question: "How many can I generate at once?",
      answer: "You can generate up to 50 MAC addresses at a time. For most testing scenarios, 5-10 addresses are sufficient."
    },
    {
      question: "What format are the addresses?",
      answer: "Addresses are generated in standard colon-separated format (XX:XX:XX:XX:XX:XX) with uppercase hexadecimal characters."
    }
  ];

  const howToSteps = [
    {
      name: "Choose quantity",
      text: "Enter the number of MAC addresses you want to generate (1-50)."
    },
    {
      name: "Click Generate",
      text: "Press the Generate button to create random MAC addresses."
    },
    {
      name: "Copy addresses",
      text: "Copy the generated MAC addresses for use in your testing or development environment."
    }
  ];

  return (
    <ToolLayout 
      title="MAC Address Generator" 
      description="Generate random MAC addresses"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Input type="number" value={count} onChange={e => setCount(e.target.value)} placeholder="Count" min="1" max="50" />
        <button onClick={generate} className="w-full px-4 py-2 bg-primary text-primary-foreground rounded">Generate</button>
        {addresses.length > 0 && (
          <Card className="p-4 space-y-2">
            {addresses.map((addr, i) => (
              <div key={i} className="font-mono p-2 bg-muted rounded">{addr}</div>
            ))}
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
