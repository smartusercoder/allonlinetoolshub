# Missing PWA Icons

The following icon files are referenced in `index.html` and `manifest.json` but need to be created:

## Required Icons:

1. **favicon-16x16.png** (16x16 pixels)
2. **favicon-32x32.png** (32x32 pixels)
3. **apple-touch-icon.png** (180x180 pixels)
4. **android-chrome-192x192.png** (192x192 pixels)
5. **android-chrome-512x512.png** (512x512 pixels)
6. **logo.png** (512x512 pixels) - Referenced in structured data
7. **og-image.png** (1200x630 pixels) - Social media sharing image

## How to Create These Icons:

You can use the existing `favicon.ico` as a base and create PNG versions at the required sizes using:

- **Online Tools**: Use favicon generators like RealFaviconGenerator.net
- **Design Tools**: Photoshop, Figma, or Sketch
- **Command Line**: ImageMagick

```bash
# Example using ImageMagick (if you have a source SVG or large PNG)
convert source.png -resize 16x16 favicon-16x16.png
convert source.png -resize 32x32 favicon-32x32.png
convert source.png -resize 180x180 apple-touch-icon.png
convert source.png -resize 192x192 android-chrome-192x192.png
convert source.png -resize 512x512 android-chrome-512x512.png
convert source.png -resize 512x512 logo.png
convert source.png -resize 1200x630 og-image.png
```

## Brand Colors:

Based on the site theme:
- Primary: #2563eb (Blue)
- Dark: #1e40af (Dark Blue)
- Background: Light theme uses hsl(210 20% 98%), dark theme uses hsl(224 71% 4%)

## Design Suggestions:

- Use the "All Online Tools Hub" branding
- Simple, recognizable icon that works at all sizes
- Should include tools/utilities iconography
- Ensure good contrast for both light and dark backgrounds
