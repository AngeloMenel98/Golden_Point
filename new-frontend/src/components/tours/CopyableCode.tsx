'use client';

import { useState, useCallback } from 'react';

interface CopyableCodeProps {
  code: string;
}

export function CopyableCode({ code }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or clipboard API failure
        const textArea = document.createElement('textarea');
        textArea.value = code;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // Ultimate fallback: show prompt
          prompt('Copia este código:', code);
        } finally {
          textArea.remove();
        }
      }
    } catch (error) {
      console.error('Copy failed:', error);
      // Ultimate fallback: show prompt
      prompt('Copia este código:', code);
    }
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center gap-2 bg-gp-dark text-white px-3 py-1 rounded font-mono text-sm hover:bg-gp-pastel transition-colors cursor-pointer"
      title="Click to copy code"
      type="button"
    >
      <span>{code}</span>
      <span className="text-xs opacity-70">
        {copied ? (
          <span className="text-gp-light font-bold">✓</span>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
            />
          </svg>
        )}
      </span>
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gp-dark text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          ¡Copiado!
        </span>
      )}
    </button>
  );
}
