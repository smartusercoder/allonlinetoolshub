import { useState, useCallback } from 'react';

export const Base64Converter = () => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter text to encode');
      return;
    }

    try {
      const encoded = btoa(input);
      setOutput(encoded);
      setError('');
    } catch (err) {
      setError('Error encoding text. Make sure it contains only valid characters.');
    }
  }, [input]);

  const handleDecode = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter Base64 text to decode');
      return;
    }

    try {
      const decoded = atob(input.trim());
      setOutput(decoded);
      setError('');
    } catch (err) {
      setError('Invalid Base64 string. Please check your input.');
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
    setError('');
  };

  return (
    <div className="tool-container">
      <h1>Base64 Encoder/Decoder</h1>
      <p>Encode and decode Base64 strings</p>

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

      <div className="form-group">
        <label>{mode === 'encode' ? 'Plain Text' : 'Base64 String'}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
          rows={8}
        />
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

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
            rows={8}
            className="output-textarea"
          />
          <div className="stats">
            Length: {output.length} characters
          </div>
        </div>
      )}

      <div className="info">
        <h3>About Base64</h3>
        <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. It's commonly used to encode data that needs to be stored or transferred over media designed to handle text.</p>

        <h4>Common Uses:</h4>
        <ul>
          <li>Embedding images in HTML/CSS</li>
          <li>Encoding authentication credentials</li>
          <li>Email attachments (MIME)</li>
          <li>Data URIs</li>
        </ul>
      </div>
    </div>
  );
};
