import { ArrowUpRight, Calendar, AlertCircle } from 'lucide-react';
import { SupportSystem } from '@/lib/supports';

interface SupportCardProps {
  support: SupportSystem;
  isClosingSoon?: boolean;
  isExpired?: boolean;
}

export default function SupportCard({ support, isClosingSoon = false, isExpired = false }: SupportCardProps) {
  // バッジカラーの決定 (Strict Rules)
  const badgeColor = support.badgeColor || '#555555';

  return (
    <div 
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm 
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-300
        flex flex-col h-full group relative overflow-hidden
        ${isExpired ? 'opacity-60 grayscale' : ''}
      `}
    >
      
      {/* 左上バッジ (Strict Badge Style) */}
      <div className="absolute top-4 left-4 z-10">
        <span 
          className="text-white px-2 py-1 rounded text-xs font-bold tracking-wider shadow-sm"
          style={{ backgroundColor: badgeColor }}
        >
          {support.badge}
        </span>
      </div>

      {/* コンテンツエリア */}
      <div className="p-6 pt-14 flex-grow flex flex-col">
        
        {/* メインタイトル（目的） - 18px Bold #1D3A52 */}
        <h3 className="text-lg font-bold text-[#1D3A52] mb-2 leading-snug">
          {support.title}
        </h3>

        {/* 制度名（正式名称） - 14px Normal #6B7280 */}
        <p className="text-sm font-normal text-gray-500 mb-4 pb-4 border-b border-gray-100">
          {support.officialName}
        </p>

        {/* タグリスト */}
        <div className="flex flex-wrap gap-2 mb-4">
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
        {support.deadline && !isExpired && (
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <Calendar className="w-3 h-3" />
            <span>申請期限: <span className={`font-bold ${isClosingSoon ? 'text-red-600' : ''}`}>{support.deadline}</span> まで</span>
          </div>
        )}
        
        {/* 締切間近アラート */}
        {isClosingSoon && !isExpired && (
          <div className="mb-2">
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" /> 締切間近
            </span>
          </div>
        )}
      </div>

      {/* アクションエリア (Strict Button Style) */}
      <div className="p-6 pt-0 mt-auto text-right">
        {isExpired ? (
          <div className="inline-block py-2 px-4 text-xs font-bold text-gray-400 bg-gray-50 rounded border border-gray-200 cursor-not-allowed">
            受付終了
          </div>
        ) : (
          <a 
            href={support.link || "#"}
            className="inline-flex items-center text-sm font-bold text-[#1D3A52] hover:text-[#B33E28] transition-colors no-underline group-hover:translate-x-1 duration-300"
          >
            詳細を見る <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
}
