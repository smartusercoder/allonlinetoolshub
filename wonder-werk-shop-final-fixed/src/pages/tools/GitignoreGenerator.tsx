import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function GitignoreGenerator() {
  const [selections, setSelections] = useState<Record<string, boolean>>({});

  const templates: Record<string, string[]> = {
    "Node.js": ["node_modules/", "npm-debug.log", ".env", "dist/", "build/"],
    "Python": ["__pycache__/", "*.py[cod]", "*$py.class", ".Python", "venv/", ".env"],
    "Java": ["*.class", "*.jar", "*.war", "target/", ".gradle/"],
    "React": ["node_modules/", ".env.local", "build/", ".DS_Store"],
    "macOS": [".DS_Store", ".AppleDouble", ".LSOverride"],
    "Windows": ["Thumbs.db", "Desktop.ini"],
    "VS Code": [".vscode/", "*.code-workspace"],
    "JetBrains": [".idea/", "*.iml", "*.iws"],
  };

  const toggleSelection = (key: string) => {
    setSelections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const generateGitignore = () => {
    let content = "# .gitignore\n\n";
    Object.entries(templates).forEach(([category, patterns]) => {
      if (selections[category]) {
        content += `# ${category}\n`;
        patterns.forEach(pattern => {
          content += `${pattern}\n`;
        });
        content += '\n';
      }
    });
    return content || "# Select templates to generate .gitignore";
  };

  return (
    <ToolLayout
      title=".gitignore Generator"
      description="Generate .gitignore files for your projects"
    >
      <div className="space-y-6">
        <div>
          <Label>Select Templates</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {Object.keys(templates).map(key => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selections[key] || false}
                  onCheckedChange={() => toggleSelection(key)}
                />
                <label htmlFor={key} className="cursor-pointer">{key}</label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label>Generated .gitignore</Label>
          <Textarea value={generateGitignore()} readOnly rows={20} />
        </div>
      </div>
    </ToolLayout>
  );
}
