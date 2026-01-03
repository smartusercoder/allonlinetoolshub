import { useState, useCallback, useEffect } from 'react';

export const TimestampConverter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timestamp, setTimestamp] = useState('');
  const [humanReadable, setHumanReadable] = useState('');
  const [mode, setMode] = useState<'toHuman' | 'toTimestamp'>('toHuman');

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleConvertToHuman = useCallback(() => {
    if (!timestamp.trim()) {
      alert('Please enter a timestamp');
      return;
    }

    try {
      // Try parsing as number (Unix timestamp in seconds or milliseconds)
      const numTimestamp = parseFloat(timestamp);

      let date: Date;

      if (numTimestamp > 10000000000) {
        // Likely milliseconds
        date = new Date(numTimestamp);
      } else {
        // Likely seconds
        date = new Date(numTimestamp * 1000);
      }

      if (isNaN(date.getTime())) {
        throw new Error('Invalid timestamp');
      }

      const result = formatDateDetails(date);
      setHumanReadable(result);
    } catch (err) {
      alert('Invalid timestamp format');
    }
  }, [timestamp]);

  const handleConvertToTimestamp = useCallback(() => {
    if (!humanReadable.trim()) {
      alert('Please enter a date/time');
      return;
    }

    try {
      const date = new Date(humanReadable);

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }

      const unixSeconds = Math.floor(date.getTime() / 1000);
      const unixMillis = date.getTime();

      const result = `Unix Timestamp (seconds): ${unixSeconds}
Unix Timestamp (milliseconds): ${unixMillis}

ISO 8601: ${date.toISOString()}
UTC String: ${date.toUTCString()}`;

      setTimestamp(result);
    } catch (err) {
      alert('Invalid date format. Try: "2024-01-15" or "Jan 15, 2024"');
    }
  }, [humanReadable]);

  const formatDateDetails = (date: Date): string => {
    const unixSeconds = Math.floor(date.getTime() / 1000);
    const unixMillis = date.getTime();

    return `Unix Timestamp: ${unixSeconds} (seconds)
Unix Timestamp: ${unixMillis} (milliseconds)

Local Time:
${date.toLocaleString()}

UTC Time:
${date.toUTCString()}

ISO 8601:
${date.toISOString()}

Detailed:
Year: ${date.getFullYear()}
Month: ${date.getMonth() + 1} (${date.toLocaleString('default', { month: 'long' })})
Day: ${date.getDate()}
Day of Week: ${date.toLocaleString('default', { weekday: 'long' })}
Hour: ${date.getHours()}
Minute: ${date.getMinutes()}
Second: ${date.getSeconds()}
Millisecond: ${date.getMilliseconds()}

Timezone Offset: ${date.getTimezoneOffset()} minutes`;
  };

  const useCurrentTime = () => {
    const result = formatDateDetails(currentTime);
    setHumanReadable(result);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="tool-container">
      <h1>Timestamp Converter</h1>
      <p>Convert between Unix timestamps and human-readable dates</p>

      <div className="current-time" style={{
        padding: '16px',
        backgroundColor: '#f0f9ff',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        <h3>Current Time</h3>
        <div style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>
          {currentTime.toLocaleString()}
        </div>
        <div style={{ fontSize: '16px', color: '#666', marginTop: '8px' }}>
          Unix: {Math.floor(currentTime.getTime() / 1000)}
        </div>
        <button onClick={useCurrentTime} style={{ marginTop: '12px' }}>
          Use Current Time
        </button>
      </div>

      <div className="mode-selector">
        <button
          className={mode === 'toHuman' ? 'active' : ''}
          onClick={() => setMode('toHuman')}
        >
          Timestamp → Human Readable
        </button>
        <button
          className={mode === 'toTimestamp' ? 'active' : ''}
          onClick={() => setMode('toTimestamp')}
        >
          Human Readable → Timestamp
        </button>
      </div>

      {mode === 'toHuman' ? (
        <>
          <div className="form-group">
            <label>Unix Timestamp</label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              placeholder="Enter Unix timestamp (e.g., 1704067200 or 1704067200000)"
              style={{ fontFamily: 'monospace' }}
            />
            <small style={{ color: '#666' }}>
              Supports both seconds and milliseconds
            </small>
          </div>

          <button onClick={handleConvertToHuman} className="btn-primary">
            Convert to Human Readable
          </button>

          {humanReadable && (
            <div className="output">
              <div className="output-header">
                <h2>Human Readable Date</h2>
                <button onClick={() => copyToClipboard(humanReadable)}>Copy</button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{humanReadable}</pre>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="form-group">
            <label>Date/Time</label>
            <input
              type="text"
              value={humanReadable}
              onChange={(e) => setHumanReadable(e.target.value)}
              placeholder="Enter date (e.g., 2024-01-15 or Jan 15, 2024 14:30:00)"
            />
            <small style={{ color: '#666' }}>
              Supports various formats: ISO 8601, locale strings, etc.
            </small>
          </div>

          <button onClick={handleConvertToTimestamp} className="btn-primary">
            Convert to Timestamp
          </button>

          {timestamp && (
            <div className="output">
              <div className="output-header">
                <h2>Timestamps</h2>
                <button onClick={() => copyToClipboard(timestamp)}>Copy</button>
              </div>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{timestamp}</pre>
            </div>
          )}
        </>
      )}

      <div className="quick-actions" style={{ marginTop: '20px' }}>
        <h3>Quick Actions</h3>
        <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          <button onClick={() => {
            const now = new Date();
            setTimestamp(Math.floor(now.getTime() / 1000).toString());
            setMode('toHuman');
          }}>
            Now (seconds)
          </button>
          <button onClick={() => {
            const now = new Date();
            setTimestamp(now.getTime().toString());
            setMode('toHuman');
          }}>
            Now (milliseconds)
          </button>
          <button onClick={() => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setTimestamp(Math.floor(tomorrow.getTime() / 1000).toString());
            setMode('toHuman');
          }}>
            Tomorrow
          </button>
          <button onClick={() => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            setTimestamp(Math.floor(yesterday.getTime() / 1000).toString());
            setMode('toHuman');
          }}>
            Yesterday
          </button>
        </div>
      </div>

      <div className="info">
        <h3>About Unix Timestamps</h3>
        <p>Unix timestamp is the number of seconds (or milliseconds) that have elapsed since January 1, 1970 00:00:00 UTC (Unix Epoch).</p>

        <h4>Common Formats:</h4>
        <ul>
          <li><strong>Seconds:</strong> 10 digits (e.g., 1704067200)</li>
          <li><strong>Milliseconds:</strong> 13 digits (e.g., 1704067200000)</li>
        </ul>

        <h4>Supported Date Formats:</h4>
        <ul>
          <li>ISO 8601: 2024-01-15T10:30:00Z</li>
          <li>RFC 2822: Mon, 15 Jan 2024 10:30:00 GMT</li>
          <li>Human: January 15, 2024</li>
          <li>Short: 01/15/2024</li>
        </ul>
      </div>
    </div>
  );
};
