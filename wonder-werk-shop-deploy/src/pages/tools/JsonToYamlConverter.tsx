import React, { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, Download, RefreshCw } from 'lucide-react';

const JsonToYamlConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      toast.error('Please enter some input');
      return;
    }
    setIsProcessing(true);
    try {
      // Processing logic
      let result = '';
      
      try {
        const parsed = JSON.parse(input);
        const toYaml = (obj, indent = 0) => {
          const spaces = '  '.repeat(indent);
          if (Array.isArray(obj)) {
            return obj.map(item => spaces + '- ' + (typeof item === 'object' ? '\n' + toYaml(item, indent + 1) : item)).join('\n');
          }
          return Object.entries(obj).map(([k, v]) => {
            if (typeof v === 'object' && v !== null) {
              return spaces + k + ':\n' + toYaml(v, indent + 1);
            }
            return spaces + k + ': ' + v;
          }).join('\n');
        };
        result = toYaml(parsed);
      } catch(e) { throw new Error('Invalid JSON'); }
      setOutput(result);
      toast.success('Processing complete!');
    } catch (error) {
      toast.error('Error processing input');
    } finally {
      setIsProcessing(false);
    }
  }, [input]);

  const handleCopy = useCallback(() => {
    if (output) {
      navigator.clipboard.writeText(output);
      toast.success('Copied to clipboard!');
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return (
    <ToolLayout
      title="JSON to YAML Converter"
      description="Convert JSON to YAML format"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="input">Enter your content</Label>
              <Textarea
                id="input"
                placeholder="Enter your content here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[200px] mt-2"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleProcess} disabled={isProcessing || !input.trim()}>
                {isProcessing ? 'Processing...' : 'Process'}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Output</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              placeholder="Output will appear here..."
              value={output}
              className="min-h-[200px]"
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCopy} disabled={!output}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
};

export default JsonToYamlConverter;
