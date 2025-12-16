import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function RobotsTxtValidator() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [stats, setStats] = useState<{agents: number; rules: number; sitemaps: number} | null>(null);
  const { toast } = useToast();

  const validate = () => {
    const validationWarnings: string[] = [];
    const lines = input.split('\n');
    
    let userAgents = 0;
    let rules = 0;
    let sitemaps = 0;
    let currentAgent = false;
    
    lines.forEach((line, index) => {
      const trimmed = line.trim();
      
      if (trimmed === '' || trimmed.startsWith('#')) {
        return;
      }
      
      if (trimmed.toLowerCase().startsWith('user-agent:')) {
        userAgents++;
        currentAgent = true;
        const agent = trimmed.substring(11).trim();
        if (!agent) {
          validationWarnings.push(`Line ${index + 1}: Empty user-agent value`);
        }
      } else if (trimmed.toLowerCase().startsWith('disallow:') || trimmed.toLowerCase().startsWith('allow:')) {
        rules++;
        if (!currentAgent) {
          validationWarnings.push(`Line ${index + 1}: Directive without user-agent`);
        }
      } else if (trimmed.toLowerCase().startsWith('sitemap:')) {
        sitemaps++;
        const url = trimmed.substring(8).trim();
        if (!url.startsWith('http')) {
          validationWarnings.push(`Line ${index + 1}: Sitemap URL should be absolute`);
        }
      } else if (trimmed.toLowerCase().startsWith('crawl-delay:')) {
        const delay = parseInt(trimmed.substring(12).trim());
        if (isNaN(delay) || delay < 0) {
          validationWarnings.push(`Line ${index + 1}: Invalid crawl-delay value`);
        }
      } else {
        validationWarnings.push(`Line ${index + 1}: Unknown directive "${trimmed}"`);
      }
    });
    
    if (userAgents === 0) {
      validationWarnings.push("No user-agent directives found");
    }
    
    setStats({ agents: userAgents, rules, sitemaps });
    setWarnings(validationWarnings);
    setIsValid(validationWarnings.length === 0);
    
    toast({
      title: validationWarnings.length === 0 ? "Valid robots.txt" : "Issues Found",
      description: validationWarnings.length === 0 
        ? "No issues detected" 
        : `Found ${validationWarnings.length} warning(s)`,
      variant: validationWarnings.length === 0 ? "default" : "destructive",
    });
  };

  return (
    <ToolLayout
      title="Robots.txt Validator"
      description="Validate robots.txt files"
    >
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label>robots.txt Content</Label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={15}
            placeholder="User-agent: *&#10;Disallow: /admin/&#10;Sitemap: https://example.com/sitemap.xml"
            className="font-mono"
          />
        </div>
        
        <Button onClick={validate} className="w-full">
          Validate robots.txt
        </Button>
        
        {isValid !== null && (
          <>
            <Card className={`p-4 ${isValid ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
              <div className="font-semibold mb-2">
                {isValid ? "✓ Valid robots.txt" : "⚠ Issues Found"}
              </div>
              {warnings.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              )}
            </Card>
            
            {stats && (
              <div className="grid grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">User-Agents</div>
                  <div className="text-2xl font-bold">{stats.agents}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Rules</div>
                  <div className="text-2xl font-bold">{stats.rules}</div>
                </Card>
                <Card className="p-4">
                  <div className="text-sm text-muted-foreground">Sitemaps</div>
                  <div className="text-2xl font-bold">{stats.sitemaps}</div>
                </Card>
              </div>
            )}
          </>
        )}
      </Card>
    </ToolLayout>
  );
}
