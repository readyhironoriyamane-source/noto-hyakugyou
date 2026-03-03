import React from 'react';

/**
 * テキスト内の特定のフレーズをハイライト表示する関数
 * @param text - 元のテキスト
 * @param phrases - ハイライトするフレーズの配列
 * @returns ハイライト付きのReact要素
 */
export function highlightPhrases(text: string, phrases: string[]): React.ReactNode {
  if (!phrases || phrases.length === 0) {
    return text;
  }

  // フレーズを長い順にソート（長いフレーズを優先してマッチさせる）
  const sortedPhrases = [...phrases].sort((a, b) => b.length - a.length);
  
  // 正規表現パターンを作成（特殊文字をエスケープ）
  const escapedPhrases = sortedPhrases.map(phrase => 
    phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const pattern = new RegExp(`(${escapedPhrases.join('|')})`, 'g');
  
  // テキストを分割してハイライト
  const parts = text.split(pattern);
  
  return (
    <>
      {parts.map((part, index) => {
        if (phrases.includes(part)) {
          return (
            <strong
              key={index}
              className="font-bold text-stone-900"
            >
              {part}
            </strong>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}
