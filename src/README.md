# Source Code - All Online Tools Hub

This directory contains the React + TypeScript source code for all tools.

## Directory Structure

```
src/
├── components/          # Reusable UI components
├── tools/              # Tool implementations
│   ├── generators/     # Generator tools (UUID, Lorem Ipsum, etc.)
│   ├── calculators/    # Calculator tools
│   ├── formatters/     # Code/text formatters
│   ├── converters/     # Converters (Base64, URL, Hash, etc.)
│   └── validators/     # Validation tools
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
│   └── generators.ts   # Helper functions for generators
├── types/              # TypeScript type definitions
│   └── tool.ts         # Common tool types
└── lib/                # Third-party library configurations
```

## Implemented Tools

### Generators (6 tools)
- ✅ App Name Generator (`tools/generators/AppNameGenerator.tsx`)
- ✅ Bug Report Generator (`tools/generators/BugReportGenerator.tsx`)
- ✅ Password Generator (`tools/generators/PasswordGenerator.tsx`)
- ✅ UUID Generator (`tools/generators/UUIDGenerator.tsx`)
- ✅ Lorem Ipsum Generator (`tools/generators/LoremIpsumGenerator.tsx`)
- ✅ Color Palette Generator (`tools/generators/ColorPaletteGenerator.tsx`)

### Converters (4 tools)
- ✅ Base64 Encoder/Decoder (`tools/converters/Base64Converter.tsx`)
- ✅ URL Encoder/Decoder (`tools/converters/URLConverter.tsx`)
- ✅ Hash Generator (`tools/converters/HashGenerator.tsx`)
- ✅ Timestamp Converter (`tools/converters/TimestampConverter.tsx`)

### Formatters (2 tools)
- ✅ JSON Formatter & Validator (`tools/formatters/JsonFormatter.tsx`)
- ✅ Case Converter (`tools/formatters/CaseConverter.tsx`)

### Validators (2 tools)
- ✅ Regex Tester (`tools/validators/RegexTester.tsx`)
- ✅ Text Analyzer (Word/Character Counter) (`tools/validators/TextAnalyzer.tsx`)

**Total: 14 Fully Working Tools**

## Adding a New Tool

### 1. Create the Tool Component

Create a new file in the appropriate category folder:

```typescript
// src/tools/generators/MyNewTool.tsx

import { useState, useCallback } from 'react';

export const MyNewTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleProcess = useCallback(() => {
    // Your actual implementation here
    const result = processInput(input);
    setOutput(result);
  }, [input]);

  return (
    <div className="tool-container">
      <h1>My New Tool</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter input..."
      />

      <button onClick={handleProcess}>
        Process
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

### 2. Export the Tool

Add your tool to the main exports (create an index.ts if needed):

```typescript
// src/tools/generators/index.ts
export { AppNameGenerator } from './AppNameGenerator';
export { UUIDGenerator } from './UUIDGenerator';
export { MyNewTool } from './MyNewTool';
```

### 3. Add to Router

Add your tool to the routing configuration (when setting up routing).

## Utility Functions

Common helper functions are available in `utils/generators.ts`:

```typescript
import {
  generateRandomElements,
  generateRandomString,
  capitalizeFirst,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  generateUUID
} from '@utils/generators';
```

## TypeScript Types

Common types are defined in `types/tool.ts`:

```typescript
import type { ToolProps, GeneratorOptions, ValidationResult } from '@types/tool';
```

## Development Workflow

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## Best Practices

### ✅ DO:
- Implement ACTUAL logic, not placeholders
- Add error handling
- Validate user input
- Provide clear feedback
- Add copy-to-clipboard functionality
- Include helpful descriptions/info
- Use TypeScript types
- Test with various inputs

### ❌ DON'T:
- Return placeholder text like "Generated output for: {input}"
- Skip validation
- Ignore edge cases
- Use generic error messages
- Forget to handle empty inputs

## Testing Your Tool

Before building, test your tool:

1. ✅ Empty input - should validate/show error
2. ✅ Valid input - should generate correct output
3. ✅ Edge cases - test boundaries
4. ✅ Special characters - ensure proper handling
5. ✅ Large inputs - test performance
6. ✅ Copy functionality - verify it works
7. ✅ Clear functionality - resets properly

## Example: Complete Tool Implementation

See the following files for complete examples:

- **Simple Generator**: `tools/generators/UUIDGenerator.tsx`
- **Complex Generator**: `tools/generators/AppNameGenerator.tsx`
- **Converter with Modes**: `tools/converters/Base64Converter.tsx`
- **Form-based Tool**: `tools/generators/BugReportGenerator.tsx`

## Common Patterns

### Copy to Clipboard
```typescript
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard!');
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

### Error Handling
```typescript
try {
  const result = processInput(input);
  setOutput(result);
} catch (error) {
  console.error(error);
  alert('Error processing input');
}
```

## Next Steps

1. Review `TOOL-IMPLEMENTATION-GUIDE.md` in the root directory
2. Implement remaining tools from `TOOLS-PLACEHOLDER-ISSUE.md`
3. Test each tool thoroughly
4. Build and deploy

## Questions?

Check the implementation guide or review existing working tools for reference.
