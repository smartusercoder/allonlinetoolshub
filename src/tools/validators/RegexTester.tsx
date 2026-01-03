import { useState, useCallback, useMemo } from 'react';

interface Match {
  match: string;
  index: number;
  groups?: string[];
}

export const RegexTester = () => {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false, s: false });
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');

  const flagString = useMemo(() => {
    return Object.entries(flags)
      .filter(([_, enabled]) => enabled)
      .map(([flag]) => flag)
      .join('');
  }, [flags]);

  const handleTest = useCallback(() => {
    if (!pattern) {
      setError('Please enter a regex pattern');
      return;
    }

    if (!testString) {
      setError('Please enter test string');
      return;
    }

    try {
      const regex = new RegExp(pattern, flagString);
      const foundMatches: Match[] = [];

      if (flags.g) {
        // Global flag - find all matches
        let match;
        while ((match = regex.exec(testString)) !== null) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      } else {
        // No global flag - find first match
        const match = regex.exec(testString);
        if (match) {
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(foundMatches);
      setError('');
    } catch (err) {
      setError(`Invalid regex: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setMatches([]);
    }
  }, [pattern, flagString, testString, flags.g]);

  const handleReplace = useCallback(() => {
    if (!pattern) {
      setError('Please enter a regex pattern');
      return;
    }

    try {
      const regex = new RegExp(pattern, flagString);
      const replacement = prompt('Enter replacement text:');
      if (replacement !== null) {
        const result = testString.replace(regex, replacement);
        setTestString(result);
        setError('');
      }
    } catch (err) {
      setError(`Invalid regex: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }, [pattern, flagString, testString]);

  const highlightedText = useMemo(() => {
    if (!pattern || matches.length === 0) return testString;

    const parts: { text: string; isMatch: boolean }[] = [];
    let lastIndex = 0;

    matches.forEach((match) => {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push({
          text: testString.slice(lastIndex, match.index),
          isMatch: false,
        });
      }

      // Add match
      parts.push({
        text: match.match,
        isMatch: true,
      });

      lastIndex = match.index + match.match.length;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      parts.push({
        text: testString.slice(lastIndex),
        isMatch: false,
      });
    }

    return parts;
  }, [testString, pattern, matches]);

  const commonPatterns = [
    { name: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)' },
    { name: 'Phone (US)', pattern: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}' },
    { name: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { name: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b' },
    { name: 'Hex Color', pattern: '#[0-9A-Fa-f]{6}' },
    { name: 'Credit Card', pattern: '\\d{4}[-.\\s]?\\d{4}[-.\\s]?\\d{4}[-.\\s]?\\d{4}' },
  ];

  return (
    <div className="tool-container">
      <h1>Regex Tester</h1>
      <p>Test and debug regular expressions</p>

      <div className="form-group">
        <label>Regular Expression Pattern</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '20px' }}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="Enter regex pattern"
            style={{ flex: 1, fontFamily: 'monospace' }}
          />
          <span style={{ fontSize: '20px' }}>/{flagString}</span>
        </div>
      </div>

      <div className="flags-group">
        <label>Flags:</label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={flags.g}
            onChange={(e) => setFlags({ ...flags, g: e.target.checked })}
          />
          g (global)
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={flags.i}
            onChange={(e) => setFlags({ ...flags, i: e.target.checked })}
          />
          i (case insensitive)
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={flags.m}
            onChange={(e) => setFlags({ ...flags, m: e.target.checked })}
          />
          m (multiline)
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={flags.s}
            onChange={(e) => setFlags({ ...flags, s: e.target.checked })}
          />
          s (dotAll)
        </label>
      </div>

      <div className="form-group">
        <label>Test String</label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Enter text to test against the regex..."
          rows={6}
          style={{ fontFamily: 'monospace' }}
        />
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="actions">
        <button onClick={handleTest} className="btn-primary">
          Test Regex
        </button>
        <button onClick={handleReplace}>
          Replace
        </button>
        <button onClick={() => { setPattern(''); setTestString(''); setMatches([]); setError(''); }}>
          Clear
        </button>
      </div>

      {matches.length > 0 && (
        <div className="output">
          <h2>Matches ({matches.length})</h2>

          <div className="highlighted-text" style={{
            padding: '12px',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {highlightedText.map((part, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: part.isMatch ? '#ffd700' : 'transparent',
                  fontWeight: part.isMatch ? 'bold' : 'normal',
                }}
              >
                {part.text}
              </span>
            ))}
          </div>

          <div className="matches-list">
            {matches.map((match, i) => (
              <div key={i} className="match-item" style={{ marginTop: '12px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <div><strong>Match {i + 1}:</strong> "{match.match}"</div>
                <div><small>Position: {match.index}</small></div>
                {match.groups && match.groups.length > 0 && (
                  <div><small>Groups: {match.groups.map((g, j) => `$${j + 1}: "${g}"`).join(', ')}</small></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {matches.length === 0 && testString && pattern && !error && (
        <div className="info" style={{ color: '#666' }}>
          No matches found
        </div>
      )}

      <div className="common-patterns">
        <h3>Common Patterns</h3>
        <div style={{ display: 'grid', gap: '8px' }}>
          {commonPatterns.map((item) => (
            <button
              key={item.name}
              onClick={() => setPattern(item.pattern)}
              style={{
                padding: '8px',
                textAlign: 'left',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              <strong>{item.name}</strong>
              <br />
              <code style={{ fontSize: '0.85em', color: '#666' }}>/{item.pattern}/</code>
            </button>
          ))}
        </div>
      </div>

      <div className="info">
        <h3>Regex Flags</h3>
        <ul>
          <li><strong>g</strong> - Global: Find all matches</li>
          <li><strong>i</strong> - Case insensitive: Match regardless of case</li>
          <li><strong>m</strong> - Multiline: ^ and $ match start/end of lines</li>
          <li><strong>s</strong> - DotAll: . matches newlines</li>
        </ul>
      </div>
    </div>
  );
};
