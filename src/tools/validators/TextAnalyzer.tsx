import { useState, useMemo } from 'react';

export const TextAnalyzer = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split(/\r\n|\r|\n/).length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;

    // Average calculations
    const avgWordLength = words > 0 ? (charactersNoSpaces / words).toFixed(2) : '0';
    const avgSentenceLength = sentences > 0 ? (words / sentences).toFixed(2) : '0';

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words / 200);

    // Speaking time (average 130 words per minute)
    const speakingTime = Math.ceil(words / 130);

    // Character frequency
    const charFrequency: Record<string, number> = {};
    for (const char of text.toLowerCase()) {
      if (char.match(/[a-z]/)) {
        charFrequency[char] = (charFrequency[char] || 0) + 1;
      }
    }

    // Word frequency
    const wordFrequency: Record<string, number> = {};
    const cleanWords = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
    for (const word of cleanWords) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }

    // Top 10 most common words
    const topWords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    // Unique words
    const uniqueWords = Object.keys(wordFrequency).length;

    // Readability (simple score based on sentence length)
    const readabilityScore = sentences > 0 ? Math.max(0, Math.min(100, 100 - (parseFloat(avgSentenceLength) - 15) * 3)) : 0;

    return {
      characters,
      charactersNoSpaces,
      words,
      lines,
      sentences,
      paragraphs,
      avgWordLength,
      avgSentenceLength,
      readingTime,
      speakingTime,
      uniqueWords,
      topWords,
      readabilityScore: readabilityScore.toFixed(0),
    };
  }, [text]);

  const copyStats = () => {
    const statsText = `Text Statistics:
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Words: ${stats.words}
Lines: ${stats.lines}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Reading Time: ${stats.readingTime} min
Speaking Time: ${stats.speakingTime} min`;

    navigator.clipboard.writeText(statsText);
    alert('Statistics copied to clipboard!');
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="tool-container">
      <h1>Text Analyzer</h1>
      <p>Count words, characters, and analyze text statistics</p>

      <div className="form-group">
        <label>Enter Your Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          rows={12}
          style={{ fontSize: '14px', lineHeight: '1.6' }}
        />
      </div>

      <div className="actions">
        <button onClick={copyStats} disabled={!text}>
          Copy Statistics
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="output">
        <h2>Statistics</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}>
          <StatCard label="Characters" value={stats.characters.toLocaleString()} />
          <StatCard label="Characters (no spaces)" value={stats.charactersNoSpaces.toLocaleString()} />
          <StatCard label="Words" value={stats.words.toLocaleString()} />
          <StatCard label="Lines" value={stats.lines.toLocaleString()} />
          <StatCard label="Sentences" value={stats.sentences.toLocaleString()} />
          <StatCard label="Paragraphs" value={stats.paragraphs.toLocaleString()} />
          <StatCard label="Unique Words" value={stats.uniqueWords.toLocaleString()} />
          <StatCard label="Avg Word Length" value={stats.avgWordLength} />
          <StatCard label="Avg Sentence Length" value={stats.avgSentenceLength + ' words'} />
          <StatCard label="Reading Time" value={stats.readingTime + ' min'} />
          <StatCard label="Speaking Time" value={stats.speakingTime + ' min'} />
          <StatCard label="Readability Score" value={stats.readabilityScore + '/100'} />
        </div>

        {stats.topWords.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h3>Most Common Words</h3>
            <div style={{ marginTop: '12px' }}>
              {stats.topWords.map(([word, count], i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    backgroundColor: i % 2 === 0 ? '#f9fafb' : 'white',
                    borderRadius: '4px',
                    marginBottom: '4px'
                  }}
                >
                  <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                    {i + 1}. {word}
                  </span>
                  <span style={{ color: '#6b7280' }}>
                    {count} {count === 1 ? 'time' : 'times'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="info">
        <h3>About Text Analysis</h3>

        <h4>Reading Time</h4>
        <p>Based on average reading speed of 200 words per minute for adults.</p>

        <h4>Speaking Time</h4>
        <p>Based on average speaking speed of 130 words per minute for presentations.</p>

        <h4>Readability Score</h4>
        <p>Simple score based on average sentence length. Higher scores indicate easier-to-read text:</p>
        <ul>
          <li><strong>90-100:</strong> Very easy to read</li>
          <li><strong>70-90:</strong> Easy to read</li>
          <li><strong>50-70:</strong> Fairly easy to read</li>
          <li><strong>30-50:</strong> Difficult to read</li>
          <li><strong>0-30:</strong> Very difficult to read</li>
        </ul>

        <h4>Uses:</h4>
        <ul>
          <li>Check essay/article length</li>
          <li>Verify social media character limits</li>
          <li>Analyze writing complexity</li>
          <li>Estimate reading/speaking time</li>
          <li>Find overused words</li>
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div style={{
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f9fafb'
  }}>
    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
      {label}
    </div>
    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
      {value}
    </div>
  </div>
);
