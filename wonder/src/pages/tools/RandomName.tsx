import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Shuffle } from "lucide-react";
import { UsageGuide } from "@/components/UsageGuide";

export default function RandomName() {
  const [gender, setGender] = useState("any");
  const [count, setCount] = useState("1");
  const [names, setNames] = useState<string[]>([]);

  const firstNames = {
    male: ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Christopher"],
    female: ["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Karen"]
  };
  
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez"];

  const generateNames = () => {
    const num = parseInt(count) || 1;
    const result: string[] = [];
    
    for (let i = 0; i < num; i++) {
      const firstNameList = gender === "male" ? firstNames.male 
        : gender === "female" ? firstNames.female 
        : [...firstNames.male, ...firstNames.female];
      
      const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      result.push(`${firstName} ${lastName}`);
    }
    
    setNames(result);
  };

  return (
    <ToolLayout
      title="Random Name Generator"
      description="Generate random names for testing and demos"
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Select gender preference (Male, Female, or Any)",
            "Set the number of names you need",
            "Click \"Generate Names\"",
            "View your list of random full names"
          ]}
          tips={[
            "Perfect for testing user registration forms",
            "Great for populating demo databases",
            "Use for creative writing character names",
            "Quickly generate realistic test data"
          ]}
        />
        <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Number of Names</Label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              min="1"
              max="50"
            />
          </div>
        </div>

        <Button onClick={generateNames} className="w-full">
          <Shuffle className="w-4 h-4 mr-2" />
          Generate Names
        </Button>

        {names.length > 0 && (
          <Card className="p-4">
            <div className="space-y-2">
              {names.map((name, index) => (
                <div key={index} className="p-3 bg-muted rounded">
                  {name}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
      </div>
    </ToolLayout>
  );
}
