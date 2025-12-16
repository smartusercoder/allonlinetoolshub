import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EmailObfuscator() {
  const [email, setEmail] = useState("");
  const [output, setOutput] = useState("");

  const obfuscate = () => {
    const encoded = email.split('').map(c => `&#${c.charCodeAt(0)};`).join('');
    setOutput(encoded);
  };

  const faqs = [
    {
      question: "Why should I obfuscate my email address?",
      answer: "Email obfuscation helps protect your email from spam bots and web scrapers that harvest email addresses from websites. It converts your email into HTML entities that browsers can read but bots cannot easily detect."
    },
    {
      question: "Will obfuscated emails still work?",
      answer: "Yes, when you use the obfuscated email in HTML, browsers will display it correctly and mailto links will still function normally for users."
    },
    {
      question: "How effective is email obfuscation?",
      answer: "HTML entity obfuscation is effective against basic spam bots. For maximum protection, combine it with other methods like contact forms or CAPTCHA."
    },
    {
      question: "Can I obfuscate multiple emails at once?",
      answer: "This tool works best with one email at a time to ensure accurate encoding of each character."
    }
  ];

  const howToSteps = [
    {
      name: "Enter email address",
      text: "Type or paste the email address you want to protect from spam bots."
    },
    {
      name: "Click Obfuscate",
      text: "Press the Obfuscate button to convert your email into HTML entities."
    },
    {
      name: "Copy encoded email",
      text: "Copy the obfuscated code and paste it into your HTML source code."
    },
    {
      name: "Use in your website",
      text: "The encoded email will display normally to users but be hidden from spam bots."
    }
  ];

  return (
    <ToolLayout 
      title="Email Obfuscator" 
      description="Obfuscate email addresses"
      faqs={faqs}
      howToSteps={howToSteps}
    >
      <div className="space-y-4">
        <Textarea value={email} onChange={e => setEmail(e.target.value)} rows={4} placeholder="Enter email..." />
        <Button onClick={obfuscate} className="w-full">Obfuscate</Button>
        {output && <Textarea value={output} readOnly rows={4} />}
      </div>
    </ToolLayout>
  );
}
