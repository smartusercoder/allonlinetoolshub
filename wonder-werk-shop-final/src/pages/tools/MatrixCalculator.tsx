import React, { useState, useCallback } from 'react';
import { ToolLayout } from '@/components/ToolLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Copy, Download, RefreshCw } from 'lucide-react';

const MatrixCalculator = () => {
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
        // Parse first matrix
        const matrices = input.split('---').map(m => {
          const rows = m.trim().split('\n').filter(r => r.trim());
          return rows.map(r => r.split(/[,\s]+/).map(Number));
        });
        
        if (matrices.length === 1) {
          const m = matrices[0];
          const rows = m.length;
          const cols = m[0].length;
          
          // Calculate determinant for square matrix
          if (rows === cols && rows <= 3) {
            let det = 0;
            if (rows === 1) det = m[0][0];
            else if (rows === 2) det = m[0][0] * m[1][1] - m[0][1] * m[1][0];
            else if (rows === 3) {
              det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1])
                  - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0])
                  + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
            }
            result = `Matrix ${rows}x${cols}:\n${m.map(r => r.join('\t')).join('\n')}\n\nDeterminant: ${det}`;
          } else {
            result = `Matrix ${rows}x${cols}:\n${m.map(r => r.join('\t')).join('\n')}`;
          }
        } else {
          // Two matrices - try to add them
          const [m1, m2] = matrices;
          if (m1.length === m2.length && m1[0].length === m2[0].length) {
            const sum = m1.map((row, i) => row.map((val, j) => val + m2[i][j]));
            result = `Matrix Sum:\n${sum.map(r => r.join('\t')).join('\n')}`;
          } else {
            result = 'Matrices must have same dimensions for addition';
          }
        }
      } catch(e) {
        result = 'Enter matrix rows (space or comma separated values)\nFor two matrices, separate with ---';
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
      title="Matrix Calculator"
      description="Perform matrix operations"
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

export default MatrixCalculator;
