'use client';

import katex from 'katex';

export default function MathText({ text = '' }: { text?: string }) {
  const parts = text.split(/(\\\\\[[\\s\\S]*?\\\\\]|\\\\\([\\s\\S]*?\\\\\))/g);
  return <span>{parts.map((part, i) => {
    const display = part.startsWith('\\\\[') && part.endsWith('\\\\]');
    const inline = part.startsWith('\\\\(') && part.endsWith('\\\\)');
    if (!display && !inline) return <span key={i}>{part}</span>;
    const expr = part.slice(2, -2);
    return <span key={i} dangerouslySetInnerHTML={{ __html: katex.renderToString(expr, { displayMode: display, throwOnError: false }) }} />;
  })}</span>;
}
