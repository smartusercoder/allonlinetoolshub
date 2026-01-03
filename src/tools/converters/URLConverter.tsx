import { useState, useCallback } from 'react';

export const URLConverter = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [encodeType, setEncodeType] = useState<'standard' | 'component'>('component');

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      alert('Please enter text to encode');
      return;
    }

    try {
      const encoded = encodeType === 'component'
        ? encodeURIComponent(input)
        : encodeURI(input);
      setOutput(encoded);
    } catch (err) {
      alert('Error encoding URL');
    }
  }, [input, encodeType]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      alert('Please enter URL to decode');
      return;
    }

    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (err) {
      // Try with decodeURI if decodeURIComponent fails
      try {
        const decoded = decodeURI(input);
        setOutput(decoded);
      } catch {
        alert('Error decoding URL. Invalid format.');
      }
    }
  }, [input]);

  const handleProcess = useCallback(() => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  }, [mode, handleEncode, handleDecode]);

  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  return (
    <div className="tool-container">
      <h1>URL Encoder/Decoder</h1>
      <p>Encode and decode URLs and query parameters</p>

      <div className="mode-selector">
        <button
          className={mode === 'encode' ? 'active' : ''}
          onClick={() => setMode('encode')}
        >
          Encode
        </button>
        <button
          className={mode === 'decode' ? 'active' : ''}
          onClick={() => setMode('decode')}
        >
          Decode
        </button>
      </div>

      {mode === 'encode' && (
        <div className="form-group">
          <label>Encoding Type</label>
          <select value={encodeType} onChange={(e) => setEncodeType(e.target.value as any)}>
            <option value="component">encodeURIComponent (Query Parameters)</option>
            <option value="standard">encodeURI (Full URLs)</option>
          </select>
        </div>
      )}

      <div className="form-group">
        <label>{mode === 'encode' ? 'Plain Text / URL' : 'Encoded URL'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode'
            ? 'Enter text or URL to encode...\nExample: Hello World & Special Characters!'
            : 'Enter encoded URL to decode...\nExample: Hello%20World%20%26%20Special%20Characters!'
          }
          rows={6}
        />
      </div>

      <div className="actions">
        <button onClick={handleProcess} className="btn-primary">
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </button>
        <button onClick={handleSwap} disabled={!output}>
          Swap
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>

      {output && (
        <div className="output">
          <div className="output-header">
            <h2>{mode === 'encode' ? 'Encoded' : 'Decoded'} Result</h2>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={6}
            className="output-textarea"
          />
        </div>
      )}

      <div className="info">
        <h3>About URL Encoding</h3>

        <h4>encodeURIComponent (Recommended for Query Parameters)</h4>
        <p>Encodes all special characters including: / ? : @ & = + $ #</p>
        <p><strong>Use for:</strong> Query parameter values, form data</p>
        <p><strong>Example:</strong> <code>name=John Doe&email=john@example.com</code></p>

        <h4>encodeURI (For Full URLs)</h4>
        <p>Preserves URL structure characters like: / ? : @ & = + $ #</p>
        <p><strong>Use for:</strong> Complete URLs</p>
        <p><strong>Example:</strong> <code>https://example.com/path/to/page?query=value</code></p>

        <h4>Common Encoded Characters</h4>
        <ul>
          <li>Space: <code>%20</code> or <code>+</code></li>
          <li>! : <code>%21</code></li>
          <li>@ : <code>%40</code></li>
          <li># : <code>%23</code></li>
          <li>& : <code>%26</code></li>
          <li>= : <code>%3D</code></li>
        </ul>
      </div>
    </div>
  );
};
