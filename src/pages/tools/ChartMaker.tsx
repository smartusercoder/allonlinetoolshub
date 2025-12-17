import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ValidatedTextarea } from "@/components/form/ValidatedTextarea";
import { ValidatedInput } from "@/components/form/ValidatedInput";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function ChartMaker() {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [chartTitle, setChartTitle] = useState("");
  const [csvData, setCsvData] = useState("Label,Value\nJan,100\nFeb,150\nMar,120\nApr,180");
  const [chartData, setChartData] = useState<any[]>([]);

  const parseData = () => {
    try {
      const lines = csvData.trim().split('\n');
      if (lines.length < 2) {
        toast.error("Please enter at least header and one data row");
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim());
      const data = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, i) => {
          obj[header] = isNaN(Number(values[i])) ? values[i] : Number(values[i]);
        });
        return obj;
      });

      setChartData(data);
      toast.success("Chart generated successfully!");
    } catch (error) {
      console.error("Error parsing data:", error);
      toast.error("Failed to parse data. Check CSV format.");
    }
  };

  const downloadChart = () => {
    const chartElement = document.getElementById('chart-container');
    if (!chartElement) return;

    // Note: Actual implementation would use html2canvas or similar
    toast.info("Chart download functionality requires additional libraries");
  };

  const renderChart = () => {
    if (chartData.length === 0) return null;

    const dataKey = Object.keys(chartData[0])[1] || 'Value';
    const nameKey = Object.keys(chartData[0])[0] || 'Label';

    switch (chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={nameKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey={dataKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={nameKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={dataKey} stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey={dataKey}
                nameKey={nameKey}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <ToolLayout
      title="Chart Maker"
      description="Create beautiful charts and graphs from your data"
    >
      <Card className="p-6">
        <div className="space-y-6">
          <ValidatedInput
            label="Chart Title"
            value={chartTitle}
            onChange={setChartTitle}
            placeholder="Enter chart title"
          />

          <div>
            <Label>Chart Type</Label>
            <Select value={chartType} onValueChange={(v: any) => setChartType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">Bar Chart</SelectItem>
                <SelectItem value="line">Line Chart</SelectItem>
                <SelectItem value="pie">Pie Chart</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ValidatedTextarea
            label="Data (CSV Format)"
            value={csvData}
            onChange={setCsvData}
            placeholder="Label,Value&#10;Jan,100&#10;Feb,150"
            rows={8}
            helperText="Enter your data in CSV format (comma-separated)"
          />

          <Button onClick={parseData} className="w-full">
            Generate Chart
          </Button>

          {chartData.length > 0 && (
            <div className="space-y-4">
              {chartTitle && (
                <h3 className="text-xl font-semibold text-center">{chartTitle}</h3>
              )}
              
              <div id="chart-container" className="border rounded-lg p-4 bg-card">
                {renderChart()}
              </div>
              
              <Button onClick={downloadChart} className="w-full gap-2">
                <Download className="w-4 h-4" />
                Download Chart
              </Button>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
