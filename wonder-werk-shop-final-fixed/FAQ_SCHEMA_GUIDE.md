# Adding FAQ Schema to Tools

## Overview
FAQ schema markup helps tools appear in Google's "People Also Ask" section, improving SEO visibility.

## Current Status
✅ FAQ schema infrastructure is ready
✅ FAQ data created for 10 popular tools
✅ Example implementation done for Word Counter

## Tools with FAQ Data
1. word-counter
2. bmi-calculator  
3. password-generator
4. qr-code-generator
5. image-compressor
6. json-formatter
7. pdf-merge
8. base64-encoder
9. calculator
10. case-converter

## How to Add FAQ Schema to a Tool

### Step 1: Import FAQ Data
```typescript
import { toolFAQs } from "@/data/faqData";
```

### Step 2: Add faqs Prop to ToolLayout
```typescript
<ToolLayout
  title="Your Tool Name"
  description="Your tool description"
  keywords={["keyword1", "keyword2"]}
  category="text"
  faqs={toolFAQs["your-tool-id"]}  // Add this line
>
```

## Adding New FAQ Data

To add FAQ data for additional tools, edit `src/data/faqData.ts`:

```typescript
export const toolFAQs: Record<string, FAQ[]> = {
  "your-tool-id": [
    {
      question: "What is this tool?",
      answer: "Detailed answer explaining the tool..."
    },
    {
      question: "How do I use it?",
      answer: "Step-by-step usage instructions..."
    },
    // Add 3-5 FAQs per tool
  ]
};
```

## FAQ Writing Guidelines

### Good FAQ Questions:
- Common user queries ("How does X work?")
- Feature explanations ("What can I do with X?")
- Privacy concerns ("Is my data saved?")
- Limitations ("What's the maximum size?")
- Best practices ("How often should I use X?")

### Good FAQ Answers:
- Start with a direct answer
- Keep answers 2-4 sentences
- Be specific and actionable
- Include relevant details
- Avoid marketing language

### Example:
```typescript
{
  question: "How secure are generated passwords?",
  answer: "Our password generator creates highly secure passwords using cryptographically secure random number generation. Passwords include a mix of uppercase, lowercase, numbers, and symbols, making them extremely difficult to crack."
}
```

## Priority Tools for FAQ Schema

Based on search volume, add FAQs to these tools next:

**High Priority:**
- [ ] image-resizer
- [ ] pdf-split
- [ ] pdf-compress
- [ ] regex-tester
- [ ] hash-generator
- [ ] uuid-generator
- [ ] url-encoder
- [ ] temperature-converter
- [ ] unit-converter
- [ ] color-picker

**Medium Priority:**
- [ ] loan-calculator
- [ ] mortgage-calculator
- [ ] age-calculator
- [ ] percentage-calculator
- [ ] text-diff
- [ ] html-beautifier
- [ ] css-minifier
- [ ] json-validator
- [ ] xml-formatter

## SEO Impact

FAQ schema helps with:
- **Featured Snippets**: Appear in Google's answer boxes
- **People Also Ask**: Show up in related questions
- **Rich Results**: Enhanced search result display
- **Voice Search**: Better match for voice queries
- **CTR Improvement**: More visible and trustworthy results

## Testing FAQ Schema

After adding FAQs to a tool:

1. Visit the tool page
2. View page source (Ctrl/Cmd + U)
3. Search for "FAQPage" in the source code
4. Verify the FAQ structured data is present
5. Test with Google Rich Results Test:
   - https://search.google.com/test/rich-results
   - Enter your tool's URL
   - Check for FAQPage markup validation

## Best Practices

✅ **DO:**
- Write 3-5 FAQs per tool
- Answer real user questions
- Keep answers concise (2-4 sentences)
- Use natural language
- Focus on value to users

❌ **DON'T:**
- Copy answers from other sites
- Write promotional content
- Use overly technical jargon
- Make answers too long
- Include outdated information

## Next Steps

1. Add FAQ data for remaining popular tools
2. Monitor Google Search Console for FAQ impressions
3. Update FAQs based on actual user queries
4. Test rich results for all FAQ-enabled tools
5. Track CTR improvements from FAQ schema
