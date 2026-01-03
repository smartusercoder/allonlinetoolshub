# Tool Implementation Guide

This guide shows how to implement working tools to replace the placeholder implementations.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── tools/              # Tool implementations
│   ├── generators/     # Generator tools
│   ├── calculators/    # Calculator tools
│   ├── formatters/     # Formatter tools
│   ├── converters/     # Converter tools
│   └── validators/     # Validator tools
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── lib/                # Third-party library configurations
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Build for Production

```bash
npm run build
```

## Tool Implementation Pattern

All tools follow this structure:

```typescript
import { useState, useCallback } from 'react';

interface ToolNameProps {
  // Props if needed
}

export const ToolName = ({}: ToolNameProps) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleProcess = useCallback(() => {
    if (!input.trim()) {
      alert('Please enter input');
      return;
    }

    setIsProcessing(true);
    try {
      // ACTUAL IMPLEMENTATION HERE
      const result = processInput(input);
      setOutput(result);
    } catch (error) {
      console.error(error);
      alert('Error processing input');
    } finally {
      setIsProcessing(false);
    }
  }, [input]);

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="tool-container">
      <h1>Tool Name</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input..."
      />

      <div className="actions">
        <button onClick={handleProcess} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Process'}
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>

      {output && (
        <div className="output">
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};
```

## Complete Tool Examples

### Example 1: App Name Generator

**File:** `src/tools/generators/AppNameGenerator.tsx`

```typescript
import { useState, useCallback } from 'react';
import { generateRandomElements, capitalizeFirst } from '@utils/generators';

const PREFIXES = ['Smart', 'Quick', 'Pro', 'Easy', 'My', 'Go', 'Fast', 'Super', 'Ultra', 'Mega', 'Best', 'Top', 'Prime'];
const SUFFIXES = ['App', 'Hub', 'Flow', 'Sync', 'Pal', 'Now', 'Pro', 'Max', 'Plus', 'Go', 'Spot', 'Link', 'Zone'];
const INDUSTRIES = ['Tech', 'Health', 'Finance', 'Education', 'Travel', 'Food', 'Social', 'Business', 'Shop', 'Media'];

export const AppNameGenerator = () => {
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Professional');
  const [context, setContext] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = useCallback(() => {
    const names: string[] = [];
    const industry = audience.trim() || 'General';
    const firstLetter = industry.charAt(0).toUpperCase();

    // Generate based on tone
    const selectedPrefixes = tone === 'Casual'
      ? ['My', 'Go', 'Easy', 'Quick']
      : ['Pro', 'Smart', 'Prime', 'Elite'];

    // Generate 10 unique names
    for (let i = 0; i < 10; i++) {
      const prefix = selectedPrefixes[Math.floor(Math.random() * selectedPrefixes.length)];
      const suffix = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];

      // Different naming patterns
      if (i % 3 === 0) {
        names.push(`${prefix}${firstLetter}${suffix}`);
      } else if (i % 3 === 1) {
        names.push(`${industry}${suffix}`);
      } else {
        const randomIndustry = INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)];
        names.push(`${prefix}${randomIndustry}`);
      }
    }

    // Format output
    const result = `# App Name Suggestions\n\n**Audience:** ${industry}\n**Tone:** ${tone}\n${context ? `**Context:** ${context}\n` : ''}\n## Generated Names\n\n${names.map((name, i) => `${i + 1}. ${name}`).join('\n')}\n\n---\n\n*Tip: Check domain availability and trademark status before using.*`;

    setOutput(result);
  }, [audience, tone, context]);

  return (
    <div className="tool-container">
      <h1>App Name Generator</h1>

      <div className="form-group">
        <label>Audience (optional)</label>
        <input
          type="text"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          placeholder="Who is this for? (e.g., Healthcare, Finance)"
        />
      </div>

      <div className="form-group">
        <label>Tone</label>
        <select value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Professional</option>
          <option>Casual</option>
          <option>Creative</option>
          <option>Technical</option>
        </select>
      </div>

      <div className="form-group">
        <label>Context</label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="What are you trying to do?"
          rows={3}
        />
      </div>

      <button onClick={handleGenerate} className="btn-primary">
        Generate Names
      </button>

      {output && (
        <div className="output">
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};
```

### Example 2: Password Generator

**File:** `src/tools/generators/PasswordGenerator.tsx`

```typescript
import { useState, useCallback } from 'react';

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';

export const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [passwords, setPasswords] = useState<string[]>([]);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLowercase) charset += LOWERCASE;
    if (includeUppercase) charset += UPPERCASE;
    if (includeNumbers) charset += NUMBERS;
    if (includeSymbols) charset += SYMBOLS;

    if (charset.length === 0) {
      alert('Please select at least one character type');
      return;
    }

    const newPasswords: string[] = [];
    for (let p = 0; p < 5; p++) {
      let password = '';

      // Ensure at least one character from each selected type
      if (includeLowercase) password += LOWERCASE.charAt(Math.floor(Math.random() * LOWERCASE.length));
      if (includeUppercase) password += UPPERCASE.charAt(Math.floor(Math.random() * UPPERCASE.length));
      if (includeNumbers) password += NUMBERS.charAt(Math.floor(Math.random() * NUMBERS.length));
      if (includeSymbols) password += SYMBOLS.charAt(Math.floor(Math.random() * SYMBOLS.length));

      // Fill the rest
      for (let i = password.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }

      // Shuffle the password
      password = password.split('').sort(() => Math.random() - 0.5).join('');
      newPasswords.push(password);
    }

    setPasswords(newPasswords);
  }, [length, includeLowercase, includeUppercase, includeNumbers, includeSymbols]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="tool-container">
      <h1>Password Generator</h1>

      <div className="form-group">
        <label>Length: {length}</label>
        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          Lowercase (a-z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Uppercase (A-Z)
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Numbers (0-9)
        </label>

        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Symbols (!@#$...)
        </label>
      </div>

      <button onClick={generatePassword} className="btn-primary">
        Generate Passwords
      </button>

      {passwords.length > 0 && (
        <div className="output">
          <h2>Generated Passwords</h2>
          {passwords.map((pwd, i) => (
            <div key={i} className="password-item">
              <code>{pwd}</code>
              <button onClick={() => copyToClipboard(pwd)}>Copy</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
```

### Example 3: Bug Report Generator

**File:** `src/tools/generators/BugReportGenerator.tsx`

```typescript
import { useState, useCallback } from 'react';

export const BugReportGenerator = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stepsToReproduce, setStepsToReproduce] = useState('');
  const [expectedBehavior, setExpectedBehavior] = useState('');
  const [actualBehavior, setActualBehavior] = useState('');
  const [severity, setSeverity] = useState('Medium');
  const [environment, setEnvironment] = useState('');
  const [output, setOutput] = useState('');

  const handleGenerate = useCallback(() => {
    if (!title.trim()) {
      alert('Please enter a bug title');
      return;
    }

    const steps = stepsToReproduce
      .split('\n')
      .filter(s => s.trim())
      .map((step, i) => `${i + 1}. ${step.trim()}`)
      .join('\n');

    const report = `# Bug Report: ${title}

## Description
${description || 'No description provided'}

## Severity
**${severity}**

## Steps to Reproduce
${steps || 'No steps provided'}

## Expected Behavior
${expectedBehavior || 'Not specified'}

## Actual Behavior
${actualBehavior || 'Not specified'}

## Environment
${environment || 'Not specified'}

## Additional Notes
- Report generated: ${new Date().toLocaleString()}
- Please attach screenshots or logs if available

---
*Generated by All Online Tools Hub*`;

    setOutput(report);
  }, [title, description, stepsToReproduce, expectedBehavior, actualBehavior, severity, environment]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Bug report copied to clipboard!');
  };

  return (
    <div className="tool-container">
      <h1>Bug Report Generator</h1>

      <div className="form-group">
        <label>Bug Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the bug"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Detailed description of the bug"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label>Severity</label>
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      <div className="form-group">
        <label>Steps to Reproduce (one per line)</label>
        <textarea
          value={stepsToReproduce}
          onChange={(e) => setStepsToReproduce(e.target.value)}
          placeholder="Step 1&#10;Step 2&#10;Step 3"
          rows={4}
        />
      </div>

      <div className="form-group">
        <label>Expected Behavior</label>
        <textarea
          value={expectedBehavior}
          onChange={(e) => setExpectedBehavior(e.target.value)}
          placeholder="What should happen?"
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>Actual Behavior</label>
        <textarea
          value={actualBehavior}
          onChange={(e) => setActualBehavior(e.target.value)}
          placeholder="What actually happens?"
          rows={2}
        />
      </div>

      <div className="form-group">
        <label>Environment</label>
        <textarea
          value={environment}
          onChange={(e) => setEnvironment(e.target.value)}
          placeholder="OS, Browser, Version, etc."
          rows={2}
        />
      </div>

      <button onClick={handleGenerate} className="btn-primary">
        Generate Bug Report
      </button>

      {output && (
        <div className="output">
          <div className="output-header">
            <h2>Generated Bug Report</h2>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};
```

## Tool Templates

### Generator Tool Template

```typescript
export const [ToolName]Generator = () => {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState({});
  const [output, setOutput] = useState('');

  const handleGenerate = useCallback(() => {
    // Validation
    if (!input.trim()) {
      alert('Please provide input');
      return;
    }

    // Generation logic
    const result = generateSomething(input, options);
    setOutput(result);
  }, [input, options]);

  return (
    <div className="tool-container">
      {/* Form inputs */}
      <button onClick={handleGenerate}>Generate</button>
      {/* Output display */}
    </div>
  );
};
```

### Calculator Tool Template

```typescript
export const [Name]Calculator = () => {
  const [values, setValues] = useState({});
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = useCallback(() => {
    // Validation
    // Calculation logic
    const calculated = performCalculation(values);
    setResult(calculated);
  }, [values]);

  return (
    <div className="tool-container">
      {/* Input fields */}
      <button onClick={handleCalculate}>Calculate</button>
      {/* Result display */}
    </div>
  );
};
```

## Implementation Checklist

For each tool:

- [ ] Create component file in appropriate category folder
- [ ] Import necessary utilities and types
- [ ] Implement form inputs
- [ ] Implement processing logic (NOT just placeholder!)
- [ ] Add error handling
- [ ] Add output display
- [ ] Test with various inputs
- [ ] Add copy-to-clipboard functionality
- [ ] Export component

## Priority Tools to Implement

### High Priority (Most Used)
1. Password Generator ✅
2. QR Code Generator
3. UUID Generator
4. Lorem Ipsum Generator
5. Color Palette Generator
6. JSON Formatter
7. Base64 Encoder/Decoder
8. Hash Generator (MD5, SHA)
9. URL Encoder/Decoder
10. Timestamp Converter

### Medium Priority
11. App Name Generator ✅
12. Bug Report Generator ✅
13. Regex Tester
14. Markdown Editor
15. Code Minifier
16. Image Compressor
17. CSS Generator
18. API Mock Generator
19. SQL Formatter
20. HTML Entities Encoder

## Testing Your Tool

```typescript
// Test checklist:
1. Empty input - should show validation error
2. Valid input - should generate correct output
3. Edge cases - test boundaries
4. Special characters - ensure proper handling
5. Large inputs - test performance
6. Copy functionality - verify clipboard works
7. Clear functionality - resets all fields
```

## Build and Deploy

```bash
# 1. Test locally
npm run dev

# 2. Build for production
npm run build

# 3. Test production build
npm run preview

# 4. Deploy (builds to current directory)
# Files will be in: index.html, assets/*, etc.
```

## Common Patterns

### Copy to Clipboard

```typescript
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => alert('Copied!'),
    () => alert('Failed to copy')
  );
};
```

### Download as File

```typescript
const downloadAsFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
```

### Debounced Input

```typescript
import { useEffect, useState } from 'react';

const useDebouncedValue = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
```

## Next Steps

1. Implement the high-priority tools first
2. Use the templates for similar tools
3. Test each tool thoroughly
4. Build and verify in production
5. Deploy to Cloudflare Pages

## Need Help?

- Check existing working tools for reference
- Review the utils/generators.ts for helper functions
- Follow the TypeScript types in types/tool.ts
- Test frequently during development

---

**Remember:** Every tool must have ACTUAL LOGIC, not placeholders!
