import { useState, useCallback } from 'react';

// Simple hash implementations (in production, use crypto-js or similar)
const simpleHash = async (str: string, algorithm: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);

  let hashBuffer: ArrayBuffer;

  try {
    hashBuffer = await crypto.subtle.digest(algorithm, data);
  } catch {
    // Fallback for unsupported algorithms
    return 'Hash algorithm not supported in this browser';
  }

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
};

export const HashGenerator = () => {
  const [input, setInput] = useState('');
  const [_algorithm, _setAlgorithm] = useState('SHA-256');
  const [hashes, setHashes] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const algorithms = [
    'SHA-1',
    'SHA-256',
    'SHA-384',
    'SHA-512'
  ];

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) {
      alert('Please enter text to hash');
      return;
    }

    setIsProcessing(true);
    const newHashes: Record<string, string> = {};

    try {
      for (const algo of algorithms) {
        newHashes[algo] = await simpleHash(input, algo);
      }
      setHashes(newHashes);
    } catch (error) {
      console.error(error);
      alert('Error generating hashes');
    } finally {
      setIsProcessing(false);
    }
  }, [input]);

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    alert('Hash copied to clipboard!');
  };

  return (
    <div className="tool-container">
      <h1>Hash Generator</h1>
      <p>Generate cryptographic hashes from your text</p>

      <div className="form-group">
        <label>Input Text</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          rows={5}
        />
      </div>

      <button
        onClick={handleGenerate}
        className="btn-primary"
        disabled={isProcessing}
      >
        {isProcessing ? 'Generating...' : 'Generate Hashes'}
      </button>

      {Object.keys(hashes).length > 0 && (
        <div className="output">
          <h2>Generated Hashes</h2>

          {algorithms.map(algo => (
            <div key={algo} className="hash-result">
              <h3>{algo}</h3>
              <div className="hash-value">
                <code>{hashes[algo]}</code>
                <button onClick={() => copyHash(hashes[algo])}>Copy</button>
              </div>
            </div>
          ))}

          <div className="info">
            <p><strong>Note:</strong> These are cryptographic hash functions. The same input will always produce the same hash, but it's computationally infeasible to reverse the process.</p>
          </div>
        </div>
      )}
    </div>
  );
};
