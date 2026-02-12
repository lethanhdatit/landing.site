'use client';

import React from 'react';

/**
 * Renders legal text with support for inline hyperlinks using markdown-like syntax.
 * 
 * Syntax: [link text](url) → rendered as <a> tag
 * 
 * Also preserves whitespace/newlines via whitespace-pre-line (inherited from parent).
 */

const LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g;

function parseContentWithLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = LINK_REGEX.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const [, linkText, url] = match;
    parts.push(
      <a
        key={match.index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
      >
        {linkText}
      </a>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

interface LegalContentProps {
  content: string;
  className?: string;
}

export function LegalContent({ content, className }: LegalContentProps) {
  return (
    <div className={className}>
      {parseContentWithLinks(content)}
    </div>
  );
}

interface LegalItemContentProps {
  text: string;
}

export function LegalItemContent({ text }: LegalItemContentProps) {
  return <span className="leading-relaxed">{parseContentWithLinks(text)}</span>;
}
