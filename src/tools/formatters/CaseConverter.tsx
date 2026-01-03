import { useState, useCallback } from 'react';
import { toCamelCase, toKebabCase, toSnakeCase } from '@utils/generators';

export const CaseConverter = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Record<string, string>>({});

  const toTitleCase = (str: string): string => {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  };

  const toSentenceCase = (str: string): string => {
    return str.toLowerCase().replace(/(^\w|\.\s+\w)/g, char => char.toUpperCase());
  };

  const toToggleCase = (str: string): string => {
    return str.split('').map(char =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join('');
  };

  const toPascalCase = (str: string): string => {
    const camel = toCamelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  };

  const toConstantCase = (str: string): string => {
    return toSnakeCase(str).toUpperCase();
  };

  const toDotCase = (str: string): string => {
    return str
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1.$2')
      .toLowerCase()
      .replace(/[^a-z0-9.]/g, '.')
      .replace(/\.+/g, '.')
      .replace(/^\.|\.$/g, '');
  };

  const toPathCase = (str: string): string => {
    return str
      .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1/$2')
      .toLowerCase()
      .replace(/[^a-z0-9/]/g, '/')
      .replace(/\/+/g, '/')
      .replace(/^\/|\/$/g, '');
  };

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      alert('Please enter text to convert');
      return;
    }

    const conversions: Record<string, string> = {
      'lowercase': input.toLowerCase(),
      'UPPERCASE': input.toUpperCase(),
      'Title Case': toTitleCase(input),
      'Sentence case': toSentenceCase(input),
      'camelCase': toCamelCase(input),
      'PascalCase': toPascalCase(input),
      'snake_case': toSnakeCase(input),
      'kebab-case': toKebabCase(input),
      'CONSTANT_CASE': toConstantCase(input),
      'dot.case': toDotCase(input),
      'path/case': toPathCase(input),
      'tOGGLE cASE': toToggleCase(input),
    };

    setResults(conversions);
  }, [input]);

  const copyResult = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleClear = () => {
    setInput('');
    setResults({});
  };

  return (
    <div className="tool-container">
      <h1>Case Converter</h1>
      <p>Convert text to different letter cases</p>

      <div className="form-group">
        <label>Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to convert..."
          rows={6}
        />
      </div>

      <div className="actions">
        <button onClick={handleConvert} className="btn-primary">
          Convert All Cases
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="output">
          <h2>Converted Results</h2>

          <div style={{ display: 'grid', gap: '12px', marginTop: '16px' }}>
            {Object.entries(results).map(([caseName, result]) => (
              <div
                key={caseName}
                style={{
                  padding: '12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: '#f9fafb'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <strong style={{ color: '#374151', fontSize: '14px' }}>
                    {caseName}
                  </strong>
                  <button
                    onClick={() => copyResult(result)}
                    style={{
                      padding: '4px 12px',
                      fontSize: '12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      background: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Copy
                  </button>
                </div>
                <div style={{
                  padding: '8px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  wordBreak: 'break-word'
                }}>
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="info">
        <h3>Case Types Explained</h3>
        <ul>
          <li><strong>lowercase:</strong> all characters in lowercase</li>
          <li><strong>UPPERCASE:</strong> ALL CHARACTERS IN UPPERCASE</li>
          <li><strong>Title Case:</strong> First Letter Of Each Word Capitalized</li>
          <li><strong>Sentence case:</strong> First letter of sentence capitalized</li>
          <li><strong>camelCase:</strong> firstWordLowercaseRestCapitalized (no spaces)</li>
          <li><strong>PascalCase:</strong> AllWordsCapitalized (no spaces)</li>
          <li><strong>snake_case:</strong> words_separated_by_underscores</li>
          <li><strong>kebab-case:</strong> words-separated-by-hyphens</li>
          <li><strong>CONSTANT_CASE:</strong> UPPERCASE_WITH_UNDERSCORES</li>
          <li><strong>dot.case:</strong> words.separated.by.dots</li>
          <li><strong>path/case:</strong> words/separated/by/slashes</li>
          <li><strong>tOGGLE cASE:</strong> sWAPS tHE cASE oF eACH cHARACTER</li>
        </ul>

        <h4>Common Uses:</h4>
        <ul>
          <li><strong>Programming:</strong> camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE</li>
          <li><strong>Writing:</strong> Title Case, Sentence case</li>
          <li><strong>URLs:</strong> kebab-case, path/case</li>
          <li><strong>File Names:</strong> snake_case, kebab-case</li>
        </ul>
      </div>
    </div>
  );
};
