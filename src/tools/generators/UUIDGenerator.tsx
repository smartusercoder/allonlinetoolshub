import { useState, useCallback } from 'react';

const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const UUIDGenerator = () => {
  const [count, setCount] = useState(1);
  const [_version, _setVersion] = useState('v4');
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const handleGenerate = useCallback(() => {
    const newUUIDs: string[] = [];

    for (let i = 0; i < count; i++) {
      let uuid = generateUUID();

      if (!hyphens) {
        uuid = uuid.replace(/-/g, '');
      }

      if (uppercase) {
        uuid = uuid.toUpperCase();
      }

      newUUIDs.push(uuid);
    }

    setUuids(newUUIDs);
  }, [count, uppercase, hyphens]);

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    alert('All UUIDs copied to clipboard!');
  };

  const copyOne = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
    alert('UUID copied!');
  };

  return (
    <div className="tool-container">
      <h1>UUID Generator</h1>
      <p>Generate universally unique identifiers (UUIDs)</p>

      <div className="form-group">
        <label>Number of UUIDs: {count}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />
          Uppercase
        </label>

        <label>
          <input
            type="checkbox"
            checked={hyphens}
            onChange={(e) => setHyphens(e.target.checked)}
          />
          Include hyphens
        </label>
      </div>

      <button onClick={handleGenerate} className="btn-primary">
        Generate UUIDs
      </button>

      {uuids.length > 0 && (
        <div className="output">
          <div className="output-header">
            <h2>Generated UUIDs ({uuids.length})</h2>
            <button onClick={copyAll}>Copy All</button>
          </div>

          <div className="uuid-list">
            {uuids.map((uuid, i) => (
              <div key={i} className="uuid-item">
                <code>{uuid}</code>
                <button onClick={() => copyOne(uuid)}>Copy</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
