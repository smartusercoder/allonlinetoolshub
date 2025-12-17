# Adding Usage Guides to Tools

## Overview
A reusable `UsageGuide` component has been created to provide consistent "How to Use" instructions across all 327 tools. This improves user experience by giving clear guidance on how to use each tool.

## UsageGuide Component

Located at: `src/components/UsageGuide.tsx`

### Props
```typescript
interface UsageGuideProps {
  steps?: string[];      // Step-by-step instructions
  tips?: string[];       // Helpful tips and best practices
  note?: string;         // Important note or warning
  example?: string;      // Example input/usage
}
```

### Features
- ✅ Step-by-step instructions with numbered list
- ✅ Helpful tips with bullet points
- ✅ Important notes/warnings
- ✅ Example usage demonstrations
- ✅ Beautiful, color-coded UI with icons
- ✅ Fully responsive design

## How to Add to a Tool

### 1. Import the Component
```typescript
import { UsageGuide } from "@/components/UsageGuide";
```

### 2. Add to Your Tool's JSX
Place it at the top of your tool's content, before the main input/form:

```typescript
<ToolLayout title="Your Tool" description="Description">
  <div className="space-y-6">
    <UsageGuide
      steps={[
        "Step 1: Do this first",
        "Step 2: Then do this",
        "Step 3: Finally, do this"
      ]}
      tips={[
        "Helpful tip about best practices",
        "Another useful suggestion"
      ]}
      note="Important information users should know"
      example="sample input text or URL"
    />
    
    {/* Rest of your tool components */}
  </div>
</ToolLayout>
```

## Example Implementations

### Example 1: Word Counter (Text Tool)
```typescript
<UsageGuide
  steps={[
    "Type or paste your text into the text area below",
    "The statistics will update automatically as you type",
    "View word count, character count, sentences, paragraphs, and reading time"
  ]}
  tips={[
    "Great for checking essay word counts or article length",
    "Reading time is calculated at 200 words per minute",
    "Use for SEO meta descriptions (aim for 150-160 characters)"
  ]}
/>
```

### Example 2: Image Compressor (File Upload Tool)
```typescript
<UsageGuide
  steps={[
    "Click \"Choose Image File\" or drag and drop an image",
    "Adjust the quality slider to control compression level",
    "Preview the compressed image and check the file size reduction",
    "Click \"Download\" to save the compressed image"
  ]}
  tips={[
    "Lower quality = smaller file size but may reduce image clarity",
    "80% quality is usually a good balance between size and quality",
    "Supported formats: JPG, PNG, WebP"
  ]}
  note="Images are processed entirely in your browser - no uploads to servers!"
/>
```

### Example 3: QR Code Generator (Generator Tool)
```typescript
<UsageGuide
  steps={[
    "Enter the text or URL you want to encode",
    "Adjust the size slider to set QR code dimensions",
    "Click \"Generate QR Code\" to create your QR code",
    "Download the QR code image or scan it directly"
  ]}
  tips={[
    "Use for sharing website URLs, WiFi passwords, or contact info",
    "Larger sizes are better for printing on physical materials",
    "Test your QR code with a scanner before printing"
  ]}
  example="https://example.com or any text like contact details"
/>
```

### Example 4: JSON Formatter (Converter Tool)
```typescript
<UsageGuide
  steps={[
    "Paste your JSON data into the input area",
    "Select formatting options (indent size, sort keys, etc.)",
    "Click \"Format\" to beautify your JSON",
    "Copy the formatted output"
  ]}
  tips={[
    "Validates JSON syntax and highlights errors",
    "Sorting keys alphabetically makes JSON easier to compare",
    "Use 2-space indentation for web, 4-space for backends"
  ]}
  example='{"name": "John", "age": 30, "city": "New York"}'
/>
```

### Example 5: Calculator Tool
```typescript
<UsageGuide
  steps={[
    "Enter numbers in the input fields",
    "Select the operation you want to perform",
    "View the result automatically"
  ]}
  tips={[
    "Supports basic operations: +, -, ×, ÷",
    "Results update in real-time as you type",
    "Use for quick calculations without a physical calculator"
  ]}
/>
```

## Guidelines for Writing Good Usage Instructions

### Steps (What to Include)
✅ **DO:**
- Write clear, action-oriented steps (start with verbs)
- Order steps logically (1st to last)
- Keep steps concise (one action per step)
- Cover the complete user flow
- Use consistent terminology with your UI

❌ **DON'T:**
- Write paragraphs instead of discrete steps
- Assume prior knowledge
- Skip important steps
- Use technical jargon unnecessarily

### Tips (What to Include)
✅ **DO:**
- Share best practices and recommendations
- Mention common use cases
- Include keyboard shortcuts if applicable
- Suggest optimal settings/values
- Mention supported formats/limitations

❌ **DON'T:**
- Repeat information from steps
- Make tips longer than 2 lines
- Include outdated information

### Notes (When to Use)
Use the `note` prop for:
- Privacy/security information ("No data uploaded to servers")
- Important limitations ("Maximum file size: 10MB")
- Browser requirements ("Works best in Chrome/Firefox")
- Warnings ("This action cannot be undone")

### Examples (When to Include)
Include examples for:
- Tools with specific input formats (URLs, codes, etc.)
- Tools where users might not know what to enter
- Complex tools that benefit from seeing sample data

## Tool Categories & Suggested Content

### Text Tools
**Steps:** Input → Process → Output → Copy/Download
**Tips:** Use cases, character limits, formatting options
**Example:** Sample text or URL

### Image Tools
**Steps:** Upload → Adjust → Preview → Download
**Tips:** Supported formats, optimal settings, file size limits
**Note:** Browser processing vs server upload

### Converter Tools
**Steps:** Input → Select format → Convert → Copy/Download
**Tips:** Common conversions, format compatibility
**Example:** Sample input in original format

### Calculator Tools
**Steps:** Enter values → Select options → View result
**Tips:** Common use cases, unit information
**Example:** Sample calculation

### Generator Tools
**Steps:** Configure options → Generate → Copy/Download
**Tips:** Customization options, use cases
**Example:** Sample configuration

### SEO Tools
**Steps:** Enter URL/text → Analyze → View results → Apply fixes
**Tips:** SEO best practices, optimal values
**Note:** How data is used/stored

## Rollout Plan

### Phase 1: High-Traffic Tools (Completed ✅)
- Word Counter
- Image Compressor  
- QR Code Generator

### Phase 2: Popular Categories (Next)
Add to top 50 most-used tools across:
- Text manipulation tools
- Image editing tools
- Code formatters
- Calculators

### Phase 3: All Remaining Tools
Systematically add to all 327 tools following the patterns above

## Testing Checklist
Before deploying usage guides:
- ✅ Instructions are clear and accurate
- ✅ Steps match the actual UI flow
- ✅ No typos or grammatical errors
- ✅ Examples work correctly
- ✅ Tips are helpful and relevant
- ✅ Component renders properly on mobile
- ✅ Doesn't disrupt existing tool functionality

## Benefits
1. **Improved UX** - Users know exactly how to use tools
2. **Reduced Support** - Fewer questions about tool usage
3. **Better SEO** - Rich, keyword-relevant content
4. **Increased Engagement** - Users more likely to use tools correctly
5. **Professional Appearance** - Shows attention to detail

## Maintenance
- Review usage guides quarterly for accuracy
- Update when tool functionality changes
- Gather user feedback to improve instructions
- Add more examples based on common questions
