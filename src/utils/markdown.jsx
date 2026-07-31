import React from "react";

/**
 * Renders basic markdown strings into React JSX elements.
 * Supports bold, italic, inline code, headers, bullet lists, and numbered lists.
 */
export const renderMarkdown = (text) => {
  if (!text) return null;

  // Helper to parse inline markdown elements: **bold**, *italic*, `code`
  const parseInline = (str) => {
    if (!str) return [];

    // Split by inline code blocks first
    const codeParts = str.split(/(`[^`]+`)/g);

    return codeParts.flatMap((codePart, cIdx) => {
      if (codePart.startsWith("`") && codePart.endsWith("`") && codePart.length > 2) {
        return (
          <code
            key={`code-${cIdx}`}
            className="bg-[#222222] text-[#f98833] px-1.5 py-0.5 rounded text-xs font-mono"
          >
            {codePart.slice(1, -1)}
          </code>
        );
      }

      // Split by bold (**text**)
      const boldParts = codePart.split(/(\*\*.*?\*\*)/g);
      return boldParts.flatMap((boldPart, bIdx) => {
        if (boldPart.startsWith("**") && boldPart.endsWith("**") && boldPart.length >= 4) {
          return (
            <strong key={`bold-${cIdx}-${bIdx}`} className="font-bold text-white">
              {boldPart.slice(2, -2)}
            </strong>
          );
        }

        // Split by italic (*text*)
        const italicParts = boldPart.split(/(\*[^\*]+\*)/g);
        return italicParts.map((italicPart, iIdx) => {
          if (
            italicPart.startsWith("*") &&
            italicPart.endsWith("*") &&
            italicPart.length >= 2
          ) {
            return (
              <em key={`em-${cIdx}-${bIdx}-${iIdx}`} className="italic">
                {italicPart.slice(1, -1)}
              </em>
            );
          }
          return italicPart;
        });
      });
    });
  };

  const lines = text.split("\n");
  const elements = [];
  let currentBulletList = [];
  let currentNumberedList = [];

  const flushBulletList = () => {
    if (currentBulletList.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="list-disc list-inside my-2 space-y-1 pl-1"
        >
          {currentBulletList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      currentBulletList = [];
    }
  };

  const flushNumberedList = () => {
    if (currentNumberedList.length > 0) {
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="list-decimal list-inside my-2 space-y-1 pl-1"
        >
          {currentNumberedList.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {item}
            </li>
          ))}
        </ol>
      );
      currentNumberedList = [];
    }
  };

  const flushAllLists = () => {
    flushBulletList();
    flushNumberedList();
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Check for bullet items (*, -, +)
    const isBullet =
      trimmed.startsWith("* ") ||
      trimmed.startsWith("- ") ||
      trimmed.startsWith("+ ");

    // Check for numbered items (1. , 2. )
    const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)/);

    if (isBullet) {
      flushNumberedList();
      const content = trimmed.substring(2);
      currentBulletList.push(parseInline(content));
    } else if (numberedMatch) {
      flushBulletList();
      const content = numberedMatch[2];
      currentNumberedList.push(parseInline(content));
    } else {
      flushAllLists();

      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3
            key={`h3-${idx}`}
            className="text-sm sm:text-base font-bold text-white mt-3 mb-1"
          >
            {parseInline(trimmed.substring(4))}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2
            key={`h2-${idx}`}
            className="text-base sm:text-lg font-bold text-white mt-3 mb-1"
          >
            {parseInline(trimmed.substring(3))}
          </h2>
        );
      } else if (trimmed.startsWith("# ")) {
        elements.push(
          <h1
            key={`h1-${idx}`}
            className="text-lg sm:text-xl font-bold text-white mt-4 mb-2"
          >
            {parseInline(trimmed.substring(2))}
          </h1>
        );
      } else if (trimmed === "") {
        elements.push(<div key={`space-${idx}`} className="h-1.5" />);
      } else {
        elements.push(
          <p key={`p-${idx}`} className="leading-relaxed">
            {parseInline(trimmed)}
          </p>
        );
      }
    }
  });

  flushAllLists();

  return elements;
};
