import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function InvoiceGenerator() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("001");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState([{ desc: "", qty: "1", price: "0" }]);

  const addItem = () => {
    setItems([...items, { desc: "", qty: "1", price: "0" }]);
  };

  const updateItem = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => {
    return sum + (parseFloat(item.qty) * parseFloat(item.price));
  }, 0);

  return (
    <ToolLayout
      title="Invoice Generator"
      description="Create simple invoices"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Fill in your company details in the \"From\" field",
            "Enter client information in the \"Bill To\" field",
            "Add invoice number and date",
            "Add line items with description, quantity, and price"
          ]}
          tips={[
            "Click \"Add Item\" to include multiple products/services",
            "Total amount calculates automatically",
            "Use for freelance work, small business billing",
            "Print or save the preview as PDF from your browser"
          ]}
        />
      </div>
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>From</Label>
            <Textarea
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="Your company name and address"
              rows={3}
            />
          </div>
          <div>
            <Label>Bill To</Label>
            <Textarea
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Client name and address"
              rows={3}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Invoice Number</Label>
            <Input
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
          </div>
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Items</Label>
          {items.map((item, i) => (
            <div key={i} className="grid grid-cols-12 gap-2">
              <Input
                className="col-span-6"
                value={item.desc}
                onChange={(e) => updateItem(i, 'desc', e.target.value)}
                placeholder="Description"
              />
              <Input
                className="col-span-2"
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(i, 'qty', e.target.value)}
                placeholder="Qty"
              />
              <Input
                className="col-span-4"
                type="number"
                value={item.price}
                onChange={(e) => updateItem(i, 'price', e.target.value)}
                placeholder="Price"
              />
            </div>
          ))}
          <Button onClick={addItem} variant="outline" size="sm">
            Add Item
          </Button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-bold">FROM:</h3>
                <pre className="text-sm whitespace-pre-wrap">{from}</pre>
              </div>
              <div className="text-right">
                <div className="text-sm">Invoice #: {invoiceNo}</div>
                <div className="text-sm">Date: {date}</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold">BILL TO:</h3>
              <pre className="text-sm whitespace-pre-wrap">{to}</pre>
            </div>

            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Description</th>
                  <th className="text-right p-2">Qty</th>
                  <th className="text-right p-2">Price</th>
                  <th className="text-right p-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-2">{item.desc}</td>
                    <td className="text-right p-2">{item.qty}</td>
                    <td className="text-right p-2">${item.price}</td>
                    <td className="text-right p-2">
                      ${(parseFloat(item.qty) * parseFloat(item.price)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td colSpan={3} className="text-right p-2">TOTAL:</td>
                  <td className="text-right p-2">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      </div>
    </ToolLayout>
  );
}
