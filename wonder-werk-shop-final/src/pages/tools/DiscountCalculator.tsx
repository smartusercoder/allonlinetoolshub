import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { UsageGuide } from "@/components/UsageGuide";

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const discountAmount = originalPrice && discount 
    ? (parseFloat(originalPrice) * parseFloat(discount)) / 100 
    : 0;
  const finalPrice = originalPrice && discount 
    ? parseFloat(originalPrice) - discountAmount 
    : 0;

  return (
    <ToolLayout
      title="Discount Calculator"
      description="Calculate discounts and savings"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Enter the original price of the item",
            "Enter the discount percentage (e.g., 20 for 20% off)",
            "See discount amount and final price instantly",
            "View how much you save"
          ]}
          tips={[
            "Perfect for shopping and comparing deals",
            "Quickly calculate sale prices",
            "Great for budgeting and price comparison",
            "Updates automatically as you type"
          ]}
          example="$100 with 25% discount = $75 final price (save $25)"
        />
      </div>
      <Card className="p-6 mt-6">
        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Original Price ($)
            </label>
            <Input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="Enter original price"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Discount (%)
            </label>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount percentage"
              min="0"
              max="100"
            />
          </div>

          {originalPrice && discount && (
            <div className="space-y-4 pt-4 border-t">
              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <span className="font-medium">Discount Amount:</span>
                <span className="text-xl font-bold text-orange-600">
                  ${discountAmount.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                <span className="font-medium">Final Price:</span>
                <span className="text-2xl font-bold text-primary">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                You save ${discountAmount.toFixed(2)} ({discount}%)
              </div>
            </div>
          )}
        </div>
      </Card>
    </ToolLayout>
  );
}
