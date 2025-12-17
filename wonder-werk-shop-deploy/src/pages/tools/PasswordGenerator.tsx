import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UsageGuide } from "@/components/UsageGuide";
import { toolFAQs } from "@/data/faqData";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const { toast } = useToast();

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (options.uppercase) chars += uppercase;
    if (options.lowercase) chars += lowercase;
    if (options.numbers) chars += numbers;
    if (options.symbols) chars += symbols;

    if (!chars) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length[0]; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generatedPassword);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const getStrength = () => {
    if (!password) return { text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { text: "Weak", color: "text-red-600" };
    if (strength <= 4) return { text: "Medium", color: "text-orange-600" };
    return { text: "Strong", color: "text-green-600" };
  };

  const strength = getStrength();

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate strong, secure passwords with custom options"
      keywords={["password generator", "strong password", "secure password", "random password"]}
      category="SecurityTools"
      howToSteps={[
        {
          name: "Set Password Length",
          text: "Use the length slider to choose how many characters your password should have. Longer passwords (12+ characters) are more secure."
        },
        {
          name: "Choose Character Types",
          text: "Select which character types to include: uppercase letters, lowercase letters, numbers, and special symbols. Using all types creates the strongest passwords."
        },
        {
          name: "Generate Password",
          text: "Click the 'Generate Password' button to create a random, secure password based on your selected criteria. The tool will show the password strength indicator."
        },
        {
          name: "Copy and Save",
          text: "Click the copy button to copy the password to your clipboard. Save it securely in a password manager. Click 'Generate Password' again to create a different one if needed."
        }
      ]}
      faqs={toolFAQs["password-generator"]}
    >
      <div className="space-y-6">
        <UsageGuide
          steps={[
            "Set your desired password length using the slider (8-32 characters)",
            "Select which character types to include (uppercase, lowercase, numbers, symbols)",
            "Click \"Generate Password\" to create a random password",
            "Click the copy button to copy the password to your clipboard"
          ]}
          tips={[
            "Longer passwords (16+ characters) are more secure",
            "Include all character types for maximum security",
            "Password strength is shown below the generated password",
            "Never reuse passwords across different accounts"
          ]}
          note="Generated passwords are created entirely in your browser and are never sent to any server."
        />

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Password Length: {length[0]}
            </label>
            <Slider
              value={length}
              onValueChange={setLength}
              min={8}
              max={32}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Character Types</label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="uppercase"
                checked={options.uppercase}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, uppercase: checked as boolean })
                }
              />
              <label htmlFor="uppercase" className="text-sm cursor-pointer">
                Uppercase (A-Z)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="lowercase"
                checked={options.lowercase}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, lowercase: checked as boolean })
                }
              />
              <label htmlFor="lowercase" className="text-sm cursor-pointer">
                Lowercase (a-z)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="numbers"
                checked={options.numbers}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, numbers: checked as boolean })
                }
              />
              <label htmlFor="numbers" className="text-sm cursor-pointer">
                Numbers (0-9)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="symbols"
                checked={options.symbols}
                onCheckedChange={(checked) =>
                  setOptions({ ...options, symbols: checked as boolean })
                }
              />
              <label htmlFor="symbols" className="text-sm cursor-pointer">
                Symbols (!@#$%...)
              </label>
            </div>
          </div>
        </div>

        <Button onClick={generatePassword} className="w-full" variant="hero">
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Password
        </Button>

        {password && (
          <div className="space-y-4">
            <div className="relative">
              <Input
                value={password}
                readOnly
                className="font-mono text-lg pr-12"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="absolute right-1 top-1"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Password Strength:</span>
              <span className={`text-sm font-bold ${strength.color}`}>
                {strength.text}
              </span>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};

export default PasswordGenerator;
