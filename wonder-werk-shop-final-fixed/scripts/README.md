# Sitemap Generation Scripts

This directory contains automated scripts for maintaining the sitemap.

## Scripts

### `generate-sitemap.js`
Automatically generates `public/sitemap.xml` from toolsData.

**Usage:**
```bash
node scripts/generate-sitemap.js
```

**Features:**
- ✅ Automatically includes all tools
- ✅ Sets higher priority for popular tools
- ✅ Updates lastmod to current date
- ✅ Validates output
- ✅ Provides detailed logging

**Output:**
- Generates `public/sitemap.xml`
- Includes homepage, legal pages, and all tool pages
- Popular tools get 0.9 priority, others 0.8

## When to Run

Run the sitemap generator:
1. After adding new tools to toolsData
2. Before deploying to production
3. Weekly/monthly to update lastmod dates
4. After making significant changes to tool pages

## Automation

### Manual Execution
```bash
npm run generate-sitemap
```

### Pre-Build Hook (Recommended)
Add to package.json scripts:
```json
{
  "scripts": {
    "prebuild": "node scripts/generate-sitemap.js",
    "generate-sitemap": "node scripts/generate-sitemap.js"
  }
}
```

### Git Pre-Commit Hook
Create `.git/hooks/pre-commit`:
```bash
#!/bin/sh
node scripts/generate-sitemap.js
git add public/sitemap.xml
```

## Configuration

Edit the script to customize:

**Popular Tools** (line 35):
```javascript
const POPULAR_TOOLS = [
  'word-counter',
  'bmi-calculator',
  // Add more high-priority tools
];
```

**Site URL** (line 30):
```javascript
const SITE_URL = 'https://allonlinetoolshub.com';
```

## Validation

The script automatically validates:
- ✓ Total URL count
- ✓ File size
- ✓ XML structure
- ✓ URL format

Additional validation:
- [Google Search Console](https://search.google.com/search-console)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

## Troubleshooting

**Script fails to run:**
```bash
# Make script executable
chmod +x scripts/generate-sitemap.js

# Run with node
node scripts/generate-sitemap.js
```

**Tools missing from sitemap:**
- Check TOOL_SLUGS array in script
- Verify toolsData.ts structure
- Check console output for errors

**Wrong URL format:**
- Verify SITE_URL constant
- Check tool path format in toolsData

## Future Enhancements

Planned improvements:
- [ ] Dynamic import of toolsData (TypeScript support)
- [ ] Watch mode for automatic regeneration
- [ ] Image sitemap generation
- [ ] Multi-language sitemap support
- [ ] Gzip compression
- [ ] Sitemap index for large sites

## Related Files

- `public/sitemap.xml` - Generated sitemap
- `src/data/toolsData.ts` - Source of truth for tools
- `public/robots.txt` - References sitemap location
