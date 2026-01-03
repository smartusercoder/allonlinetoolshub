import { useState, useCallback } from 'react';

interface Color {
  hex: string;
  rgb: string;
  hsl: string;
}

export const ColorPaletteGenerator = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [scheme, setScheme] = useState<'monochromatic' | 'analogous' | 'complementary' | 'triadic' | 'tetradic'>('analogous');
  const [palette, setPalette] = useState<Color[]>([]);

  const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  };

  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const createColor = (h: number, s: number, l: number): Color => {
    const rgb = hslToRgb(h, s, l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    return {
      hex: hex,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hsl: `hsl(${h}, ${s}%, ${l}%)`
    };
  };

  const generatePalette = useCallback(() => {
    const rgb = hexToRgb(baseColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const colors: Color[] = [];

    switch (scheme) {
      case 'monochromatic':
        // Variations in lightness
        for (let i = 0; i < 5; i++) {
          const lightness = 20 + (i * 15);
          colors.push(createColor(hsl.h, hsl.s, lightness));
        }
        break;

      case 'analogous':
        // Colors adjacent on color wheel (±30°)
        for (let i = -2; i <= 2; i++) {
          const hue = (hsl.h + (i * 30) + 360) % 360;
          colors.push(createColor(hue, hsl.s, hsl.l));
        }
        break;

      case 'complementary':
        // Base color and its opposite (180°)
        colors.push(createColor(hsl.h, hsl.s, hsl.l));
        colors.push(createColor((hsl.h + 180) % 360, hsl.s, hsl.l));
        // Add lighter and darker versions
        colors.push(createColor(hsl.h, hsl.s, Math.min(hsl.l + 20, 90)));
        colors.push(createColor((hsl.h + 180) % 360, hsl.s, Math.min(hsl.l + 20, 90)));
        colors.push(createColor(hsl.h, hsl.s, Math.max(hsl.l - 20, 10)));
        break;

      case 'triadic':
        // Three colors evenly spaced (120°)
        for (let i = 0; i < 3; i++) {
          const hue = (hsl.h + (i * 120)) % 360;
          colors.push(createColor(hue, hsl.s, hsl.l));
        }
        // Add variations
        for (let i = 0; i < 2; i++) {
          const hue = (hsl.h + (i * 120)) % 360;
          colors.push(createColor(hue, hsl.s, Math.min(hsl.l + 15, 90)));
        }
        break;

      case 'tetradic':
        // Four colors evenly spaced (90°)
        for (let i = 0; i < 4; i++) {
          const hue = (hsl.h + (i * 90)) % 360;
          colors.push(createColor(hue, hsl.s, hsl.l));
        }
        // Add one more variation
        colors.push(createColor(hsl.h, hsl.s, Math.min(hsl.l + 20, 90)));
        break;
    }

    setPalette(colors);
  }, [baseColor, scheme]);

  const copyColor = (color: Color) => {
    navigator.clipboard.writeText(color.hex);
    alert(`Copied ${color.hex} to clipboard!`);
  };

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setBaseColor(randomHex);
  };

  return (
    <div className="tool-container">
      <h1>Color Palette Generator</h1>
      <p>Generate beautiful color palettes from a base color</p>

      <div className="form-group">
        <label>Base Color</label>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            style={{ width: '60px', height: '60px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            placeholder="#3b82f6"
            style={{ fontFamily: 'monospace', textTransform: 'uppercase' }}
          />
          <button onClick={generateRandomColor}>
            Random
          </button>
        </div>
      </div>

      <div className="form-group">
        <label>Color Scheme</label>
        <select value={scheme} onChange={(e) => setScheme(e.target.value as any)}>
          <option value="monochromatic">Monochromatic</option>
          <option value="analogous">Analogous</option>
          <option value="complementary">Complementary</option>
          <option value="triadic">Triadic</option>
          <option value="tetradic">Tetradic (Square)</option>
        </select>
      </div>

      <button onClick={generatePalette} className="btn-primary">
        Generate Palette
      </button>

      {palette.length > 0 && (
        <div className="output">
          <h2>Generated Palette</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '16px'
          }}>
            {palette.map((color, i) => (
              <div
                key={i}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                onClick={() => copyColor(color)}
              >
                <div
                  style={{
                    backgroundColor: color.hex,
                    height: '100px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: parseInt(color.hex.slice(1), 16) > 0xffffff / 2 ? '#000' : '#fff',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  {color.hex.toUpperCase()}
                </div>
                <div style={{ padding: '12px', fontSize: '12px', fontFamily: 'monospace' }}>
                  <div>{color.hex.toUpperCase()}</div>
                  <div style={{ color: '#666', marginTop: '4px' }}>{color.rgb}</div>
                  <div style={{ color: '#666' }}>{color.hsl}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
            💡 Click any color to copy its hex code
          </div>
        </div>
      )}

      <div className="info">
        <h3>Color Schemes Explained</h3>
        <ul>
          <li><strong>Monochromatic:</strong> Different shades and tints of the same hue</li>
          <li><strong>Analogous:</strong> Colors adjacent to each other on the color wheel</li>
          <li><strong>Complementary:</strong> Colors opposite on the color wheel</li>
          <li><strong>Triadic:</strong> Three colors evenly spaced around the color wheel</li>
          <li><strong>Tetradic:</strong> Four colors evenly spaced (forms a square)</li>
        </ul>

        <h4>Tips:</h4>
        <ul>
          <li>Monochromatic schemes are harmonious and easy on the eyes</li>
          <li>Analogous schemes are good for creating a sense of harmony</li>
          <li>Complementary schemes create high contrast and vibrant designs</li>
          <li>Triadic schemes are vibrant but balanced</li>
        </ul>
      </div>
    </div>
  );
};
