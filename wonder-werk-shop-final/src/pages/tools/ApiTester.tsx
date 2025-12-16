import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Send, Plus, Trash2, Clock } from "lucide-react";

interface Header {
  key: string;
  value: string;
}

export default function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [headers, setHeaders] = useState<Header[]>([{ key: "", value: "" }]);
  const [body, setBody] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [responseHeaders, setResponseHeaders] = useState<string>("");
  const [status, setStatus] = useState<number | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (index: number, field: "key" | "value", value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const sendRequest = async () => {
    if (!url) {
      toast({ title: "Error", description: "Please enter a URL", variant: "destructive" });
      return;
    }

    setLoading(true);
    setResponse(null);
    setStatus(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const headerObj: Record<string, string> = {};
      headers.forEach(h => {
        if (h.key && h.value) {
          headerObj[h.key] = h.value;
        }
      });

      const options: RequestInit = {
        method,
        headers: headerObj,
      };

      if (["POST", "PUT", "PATCH"].includes(method) && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      const endTime = performance.now();
      
      setStatus(res.status);
      setResponseTime(Math.round(endTime - startTime));

      // Get response headers
      const resHeaders: string[] = [];
      res.headers.forEach((value, key) => {
        resHeaders.push(`${key}: ${value}`);
      });
      setResponseHeaders(resHeaders.join("\n"));

      const contentType = res.headers.get("content-type") || "";
      let responseText: string;
      
      if (contentType.includes("application/json")) {
        const json = await res.json();
        responseText = JSON.stringify(json, null, 2);
      } else {
        responseText = await res.text();
      }
      
      setResponse(responseText);
      toast({ title: "Success", description: `Request completed with status ${res.status}` });
    } catch (error) {
      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));
      setResponse(`Error: ${error instanceof Error ? error.message : "Request failed"}`);
      toast({ title: "Error", description: "Request failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    if (!status) return "text-muted-foreground";
    if (status >= 200 && status < 300) return "text-green-500";
    if (status >= 300 && status < 400) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <ToolLayout title="API Tester" description="Test and debug REST APIs">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 space-y-4">
          <div className="flex gap-2">
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GET">GET</SelectItem>
                <SelectItem value="POST">POST</SelectItem>
                <SelectItem value="PUT">PUT</SelectItem>
                <SelectItem value="PATCH">PATCH</SelectItem>
                <SelectItem value="DELETE">DELETE</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Enter request URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={sendRequest} disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>

          <Tabs defaultValue="headers">
            <TabsList>
              <TabsTrigger value="headers">Headers</TabsTrigger>
              <TabsTrigger value="body">Body</TabsTrigger>
            </TabsList>
            
            <TabsContent value="headers" className="space-y-2">
              {headers.map((header, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Header name"
                    value={header.key}
                    onChange={(e) => updateHeader(index, "key", e.target.value)}
                  />
                  <Input
                    placeholder="Header value"
                    value={header.value}
                    onChange={(e) => updateHeader(index, "value", e.target.value)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeHeader(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addHeader}>
                <Plus className="h-4 w-4 mr-2" />
                Add Header
              </Button>
            </TabsContent>
            
            <TabsContent value="body">
              <Textarea
                placeholder='{"key": "value"}'
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[200px] font-mono text-sm"
              />
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-lg font-semibold">Response</Label>
            <div className="flex items-center gap-4 text-sm">
              {status && (
                <span className={getStatusColor()}>Status: {status}</span>
              )}
              {responseTime !== null && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {responseTime}ms
                </span>
              )}
            </div>
          </div>

          <Tabs defaultValue="body">
            <TabsList>
              <TabsTrigger value="body">Body</TabsTrigger>
              <TabsTrigger value="headers">Headers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="body">
              <Textarea
                readOnly
                value={response || "No response yet"}
                className="min-h-[300px] font-mono text-sm"
              />
            </TabsContent>
            
            <TabsContent value="headers">
              <Textarea
                readOnly
                value={responseHeaders || "No headers"}
                className="min-h-[300px] font-mono text-sm"
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </ToolLayout>
  );
}
