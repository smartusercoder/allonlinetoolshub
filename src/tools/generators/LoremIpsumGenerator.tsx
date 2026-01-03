import { useState, useCallback } from 'react';

const WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export const LoremIpsumGenerator = () => {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');

  const generateWord = () => {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  };

  const generateSentence = (minWords: number = 5, maxWords: number = 15) => {
    const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
    const words = [];

    for (let i = 0; i < wordCount; i++) {
      words.push(generateWord());
    }

    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
  };

  const generateParagraph = (minSentences: number = 3, maxSentences: number = 7) => {
    const sentenceCount = Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
    const sentences = [];

    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
    }

    return sentences.join(' ');
  };

  const handleGenerate = useCallback(() => {
    let result = '';

    if (type === 'words') {
      const words = [];
      if (startWithLorem) {
        words.push('Lorem', 'ipsum', 'dolor', 'sit', 'amet');
      }

      for (let i = startWithLorem ? 5 : 0; i < count; i++) {
        words.push(generateWord());
      }

      result = words.join(' ') + '.';
    } else if (type === 'sentences') {
      const sentences = [];
      if (startWithLorem) {
        sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      }

      for (let i = startWithLorem ? 1 : 0; i < count; i++) {
        sentences.push(generateSentence());
      }

      result = sentences.join(' ');
    } else {
      // paragraphs
      const paragraphs = [];
      if (startWithLorem) {
        paragraphs.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
      }

      for (let i = startWithLorem ? 1 : 0; i < count; i++) {
        paragraphs.push(generateParagraph());
      }

      result = paragraphs.join('\n\n');
    }

    setOutput(result);
  }, [type, count, startWithLorem]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="tool-container">
      <h1>Lorem Ipsum Generator</h1>
      <p>Generate placeholder text for your designs</p>

      <div className="form-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="paragraphs">Paragraphs</option>
          <option value="sentences">Sentences</option>
          <option value="words">Words</option>
        </select>
      </div>

      <div className="form-group">
        <label>Count: {count}</label>
        <input
          type="range"
          min="1"
          max={type === 'words' ? 500 : type === 'sentences' ? 50 : 10}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
      </div>

      <div className="checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
          />
          Start with "Lorem ipsum..."
        </label>
      </div>

      <button onClick={handleGenerate} className="btn-primary">
        Generate Text
      </button>

      {output && (
        <div className="output">
          <div className="output-header">
            <h2>Generated Text</h2>
            <button onClick={copyToClipboard}>Copy</button>
          </div>
          <p className="lorem-output">{output}</p>
          <div className="stats">
            Words: {output.split(/\s+/).length} | Characters: {output.length}
          </div>
        </div>
      )}
    </div>
  );
};
