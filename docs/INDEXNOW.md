# IndexNow Integration

This project includes IndexNow API integration for instant search engine indexing.

## What is IndexNow?

IndexNow is a protocol that allows websites to instantly notify search engines about content changes. Supported search engines include:
- Microsoft Bing
- Yandex
- Naver
- Seznam.cz

## Setup

### 1. API Key File

The IndexNow API key file is already created at:
```
public/e8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4.txt
```

This file must be accessible at:
```
https://allonlinetoolshub.com/e8f9a7b6c5d4e3f2a1b0c9d8e7f6a5b4.txt
```

### 2. Automatic Submission

The app automatically submits URLs to IndexNow once per week in production mode. This happens via the `useIndexNowSubmission` hook in `src/App.tsx`.

### 3. Manual Submission

To manually submit all URLs to IndexNow, run:

```bash
npm run indexnow
```

Or with tsx directly:
```bash
npx tsx scripts/submit-to-indexnow.ts
```

## How It Works

1. **Automatic Mode**: The app checks localStorage to see if a week has passed since the last submission
2. **Manual Mode**: The script `submit-to-indexnow.ts` can be run anytime to force submission
3. **URLs Submitted**: 
   - Homepage
   - All implemented tool pages
   - Sitemap page
   - Legal pages (about, privacy, terms, disclaimer)

## Workflow

1. Generate sitemap: `npm run build` (triggers sitemap generation)
2. Submit to IndexNow: `npm run indexnow` (optional - also runs automatically)
3. Submit to Google/Bing: Automatic via `useSitemapSubmission` hook

## Response Codes

- `200 OK`: URL submission successful
- `202 Accepted`: URL received and will be processed
- `400 Bad Request`: Invalid payload
- `403 Forbidden`: Key validation failed
- `422 Unprocessable Entity`: URL not accepted (e.g., already indexed)

## Testing

To test in development mode, modify `useIndexNowSubmission.ts`:
```typescript
// Change this line:
if (import.meta.env.MODE !== 'production') {
  
// To:
if (false) {
```

## Links

- [IndexNow Documentation](https://www.indexnow.org/)
- [IndexNow API Docs](https://www.indexnow.org/documentation)
