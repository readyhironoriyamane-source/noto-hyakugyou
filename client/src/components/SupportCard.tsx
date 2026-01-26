import { ArrowUpRight, AlertCircle, Calendar } from 'lucide-react';
import { SupportSystem } from '@/lib/supports';

interface SupportCardProps {
  support: SupportSystem;
  isClosingSoon?: (deadline?: string) => boolean;
  isExpired?: (deadline?: string) => boolean;
}

export default function SupportCard({ support, isClosingSoon, isExpired }: SupportCardProps) {
  // 日付判定ロジック（デフォルト実装）
  const today = new Date();
  const checkClosingSoon = isClosingSoon || ((deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  });

  const checkExpired = isExpired || ((deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  });

  const closing = checkClosingSoon(support.deadline);
  const expired = checkExpired(support.deadline);
  
  // バッジカラーの決定 (Strict Rules: 指定色以外禁止)
  // デフォルトは濃グレー(#2B2B2B)
  let badgeColor = '#2B2B2B';
  if (support.badge.includes('石川県')) badgeColor = '#1D3A52';
  else if (support.badge.includes('能登町')) badgeColor = '#B33E28';
  else if (support.badge.includes('国')) badgeColor = '#2B2B2B';
  else if (support.badgeColor) badgeColor = support.badgeColor;

  // アイコンのレンダリング（React Elementとしてレンダリングする）
  const IconComponent = support.icon;

  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-200 shadow-[0_4px_6px_rgba(0,0,0,0.05)] 
        hover:shadow-[0_10px_15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300
        flex flex-col h-full group relative overflow-hidden
        ${expired ? 'opacity-60 grayscale' : ''}
      `}
      style={{ borderLeft: '1px solid #E5E7EB' }} // 左ボーダー禁止（全周同じボーダー）
    >
      
      {/* 左上バッジ (Strict Badge Style) */}
      <div className="absolute top-5 left-5 z-10">
        <span 
          className="text-white px-3 py-1 rounded text-xs font-bold tracking-wider shadow-sm"
          style={{ backgroundColor: badgeColor }}
        >
          {support.badge}
        </span>
      </div>

      {/* コンテンツエリア */}
      <div className="p-6 pt-16 flex-grow flex flex-col">
        
        {/* メインタイトル（目的） - 20px Bold #1D3A52 */}
        <h3 className="text-[20px] font-bold text-[#1D3A52] mb-3 leading-snug">
          {support.title}
        </h3>

        {/* 制度名（正式名称） - 14px Normal #666666 */}
        <p className="text-[14px] font-normal text-[#666666] mb-5 pb-5 border-b border-gray-100">
          {support.officialName}
        </p>

        {/* タグリスト */}
        <div className="flex flex-wrap gap-2 mb-5">
          {support.tags.map((tag, index) => (
            <span key={index} className="text-xs font-medium text-[#1D3A52] bg-gray-100 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* 説明文 */}
        <p className="text-sm text-gray-600 mb-6 leading-relaxed flex-grow">
          {support.description}
        </p>

        {/* 期限表示 */}
        {support.deadline && !expired && (
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>申請期限: <span className={`font-bold ${closing ? 'text-red-600' : ''}`}>{support.deadline}</span> まで</span>
          </div>
        )}
        
        {/* 締切間近アラート */}
        {closing && !expired && (
          <div className="mb-2">
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" /> 締切間近
            </span>
          </div>
        )}
      </div>

      {/* アクションエリア (Strict Button Style: No Underline) */}
      <div className="p-6 pt-0 mt-auto">
        {expired ? (
          <div className="w-full py-3 text-center text-sm font-bold text-gray-400 bg-gray-50 rounded border border-gray-200 cursor-not-allowed">
            受付終了
          </div>
        ) : (
          <a 
            href={support.link || "#"}
            className="flex items-center justify-center w-full py-3 text-sm font-bold text-[#1D3A52] bg-white border border-gray-200 rounded hover:bg-gray-50 hover:border-[#1D3A52] transition-all no-underline group-hover:shadow-sm"
            style={{ textDecoration: 'none' }}
          >
            詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-2" />
          </a>
        )}
      </div>
    </div>
  );
}
