import { useState, useCallback } from 'react';

export const JsonFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indent, setIndent] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to format');
      return;
    }

    try {
      let parsed = JSON.parse(input);

      // Sort keys if requested
      if (sortKeys) {
        parsed = sortObjectKeys(parsed);
      }

      const formatted = JSON.stringify(parsed, null, indent);
      setOutput(formatted);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  }, [input, indent, sortKeys]);

  const sortObjectKeys = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(sortObjectKeys);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj)
        .sort()
        .reduce((sorted: any, key) => {
          sorted[key] = sortObjectKeys(obj[key]);
          return sorted;
        }, {});
    }
    return obj;
  };

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to minify');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError('');
    } catch (err) {
      setError(`Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter JSON to validate');
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const stats = getJsonStats(parsed);
      setError('');
      setOutput(`✅ Valid JSON!\n\nStatistics:\n${stats}`);
    } catch (err) {
      setError(`❌ Invalid JSON: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setOutput('');
    }
  }, [input]);

  const getJsonStats = (obj: any): string => {
    const countKeys = (o: any): number => {
      if (Array.isArray(o)) {
        return o.reduce((sum, item) => sum + countKeys(item), 0);
      } else if (o !== null && typeof o === 'object') {
        return Object.keys(o).length + Object.values(o).reduce((sum, val) => sum + countKeys(val), 0);
      }
      return 0;
    };

    const countValues = (o: any): number => {
      if (Array.isArray(o)) {
        return o.length + o.reduce((sum, item) => sum + countValues(item), 0);
      } else if (o !== null && typeof o === 'object') {
        return Object.values(o).reduce((sum, val) => sum + countValues(val), 0);
      }
      return 1;
    };

    const depth = (o: any, level = 0): number => {
      if (Array.isArray(o)) {
        return Math.max(level, ...o.map(item => depth(item, level + 1)));
      } else if (o !== null && typeof o === 'object') {
        return Math.max(level, ...Object.values(o).map(val => depth(val, level + 1)));
      }
      return level;
    };

    return `- Keys: ${countKeys(obj)}
- Values: ${countValues(obj)}
- Max Depth: ${depth(obj)}
- Size: ${JSON.stringify(obj).length} characters`;
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
      <h1>JSON Formatter & Validator</h1>
      <p>Format, minify, and validate JSON data</p>

      <div className="form-group">
        <label>Input JSON</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"name": "John", "age": 30, "city": "New York"}'
          rows={12}
          style={{ fontFamily: 'monospace' }}
        />
      </div>

      <div className="options-row">
        <div className="form-group">
          <label>Indent Spaces: {indent}</label>
          <input
            type="range"
            min="0"
            max="8"
            value={indent}
            onChange={(e) => setIndent(parseInt(e.target.value))}
          />
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={sortKeys}
            onChange={(e) => setSortKeys(e.target.checked)}
          />
          Sort Keys Alphabetically
        </label>
      </div>

      {error && (
        <div className="error-message" style={{ whiteSpace: 'pre-wrap' }}>
          {error}
        </div>
      )}

      <div className="actions">
        <button onClick={handleFormat} className="btn-primary">
          Format
        </button>
        <button onClick={handleMinify}>
          Minify
        </button>
        <button onClick={handleValidate}>
          Validate
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>

      {output && (
        <div className="output">
          <div className="output-header">
            <h2>Output</h2>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <textarea
            value={output}
            readOnly
            rows={12}
            style={{ fontFamily: 'monospace' }}
            className="output-textarea"
          />
        </div>
      )}

      <div className="info">
        <h3>Features</h3>
        <ul>
          <li><strong>Format:</strong> Pretty-print JSON with customizable indentation</li>
          <li><strong>Minify:</strong> Remove all whitespace for compact JSON</li>
          <li><strong>Validate:</strong> Check if JSON is valid and show statistics</li>
          <li><strong>Sort Keys:</strong> Alphabetically sort object keys</li>
        </ul>
      </div>
    </div>
  );
};
