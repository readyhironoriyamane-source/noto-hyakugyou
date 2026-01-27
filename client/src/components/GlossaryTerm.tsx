'use client';
import { useState, useRef, useEffect } from 'react';
import { GLOSSARY_DICT } from '@/data/GlossaryData';

type Props = {
  term: string; // 辞書にある用語を指定
};

export const GlossaryTerm = ({ term }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const description = GLOSSARY_DICT[term];

  // 外側クリックで閉じる処理
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // 辞書にない言葉はそのまま表示（安全策）
  if (!description) {
    return <span>{term}</span>;
  }

  return (
    <span className="relative inline-block mx-0.5" ref={popoverRef}>
      {/* トリガーボタン（点線下線） */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          font-bold text-[#1D3A52] border-b border-dashed border-[#1D3A52]/60 
          cursor-help transition-all
          ${isOpen ? 'bg-[#1D3A52]/10' : 'hover:opacity-70'}
        `}
        aria-expanded={isOpen}
        aria-label={`${term}の解説を表示`}
      >
        {term}
      </button>

      {/* ポップオーバー（吹き出し） */}
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-[#1D3A52] text-white text-xs leading-relaxed rounded-lg shadow-xl z-50 text-left animate-in fade-in zoom-in-95 duration-200">
          {description.split('\n').map((line, i) => (
            <span key={i} className="block mb-1 last:mb-0">
              {line}
            </span>
          ))}
          {/* 吹き出しのしっぽ（三角） */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#1D3A52]" />
        </div>
      )}
    </span>
  );
};
