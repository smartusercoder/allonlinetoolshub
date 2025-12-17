import React, { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, Download, RefreshCw } from 'lucide-react';

const VectorCalculator = () => {
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
      
      const lines = input.trim().split('\n');
      try {
        const vectors = input.split('---').map(v => 
          v.trim().split(/[,\s]+/).map(Number).filter(n => !isNaN(n))
        );
        
        if (vectors.length === 1) {
          const v = vectors[0];
          const magnitude = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
          result = `Vector: [${v.join(', ')}]\nMagnitude: ${magnitude.toFixed(4)}\nDimension: ${v.length}`;
        } else {
          const [v1, v2] = vectors;
          if (v1.length === v2.length) {
            const dotProduct = v1.reduce((sum, x, i) => sum + x * v2[i], 0);
            const sum = v1.map((x, i) => x + v2[i]);
            result = `Vector 1: [${v1.join(', ')}]\nVector 2: [${v2.join(', ')}]\nDot Product: ${dotProduct}\nSum: [${sum.join(', ')}]`;
          } else {
            result = 'Vectors must have same dimension';
          }
        }
      } catch(e) {
        result = 'Enter vector values (space or comma separated)\nFor two vectors, separate with ---';
      }
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
      title="Vector Calculator"
      description="Perform vector operations"
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

export default VectorCalculator;
