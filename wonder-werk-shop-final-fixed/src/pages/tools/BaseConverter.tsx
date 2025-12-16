import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BaseConverter = () => {
  const [number, setNumber] = useState("");
  const [fromBase, setFromBase] = useState("10");
  const [toBase, setToBase] = useState("2");
  const [result, setResult] = useState("");

  const convert = () => {
    try {
      const decimal = parseInt(number, parseInt(fromBase));
      const converted = decimal.toString(parseInt(toBase)).toUpperCase();
      setResult(converted);
    } catch (error) {
      setResult("Invalid input");
    }
  };

  return (
    <ToolLayout
      title="Base Converter"
      description="Convert numbers between different bases (2-36)"
    >
      <Card className="p-6 space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="number">Number</Label>
            <Input
              id="number"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                setResult("");
              }}
              placeholder="Enter number"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From Base</Label>
              <Select value={fromBase} onValueChange={setFromBase}>
                <SelectTrigger id="from">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Binary (2)</SelectItem>
                  <SelectItem value="8">Octal (8)</SelectItem>
                  <SelectItem value="10">Decimal (10)</SelectItem>
                  <SelectItem value="16">Hexadecimal (16)</SelectItem>
                  <SelectItem value="32">Base32</SelectItem>
                  <SelectItem value="36">Base36</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to">To Base</Label>
              <Select value={toBase} onValueChange={setToBase}>
                <SelectTrigger id="to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Binary (2)</SelectItem>
                  <SelectItem value="8">Octal (8)</SelectItem>
                  <SelectItem value="10">Decimal (10)</SelectItem>
                  <SelectItem value="16">Hexadecimal (16)</SelectItem>
                  <SelectItem value="32">Base32</SelectItem>
                  <SelectItem value="36">Base36</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <button
            onClick={convert}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Convert
          </button>

          {result && (
            <div className="p-4 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-2xl font-bold break-all">{result}</p>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
};

export default BaseConverter;
