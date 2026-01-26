import { ArrowUpRight, Wallet, FileText, AlertCircle } from 'lucide-react';
import { SupportSystem, PROVIDERS } from '@/data/supports';

interface SupportCardProps {
  support: SupportSystem;
}

export default function SupportCard({ support }: SupportCardProps) {
  const providerConfig = PROVIDERS.find(p => p.id === support.provider);
  
  // バッジの色設定（Strict Rulesに基づく）
  const badgeColor = 
    support.provider === 'ishikawa' ? 'bg-[#1D3A52]' : // 深藍
    support.provider === 'noto' ? 'bg-[#B33E28]' :     // 弁柄色
    'bg-[#2B2B2B]';                                    // 濃グレー（国）

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      {/* バッジエリア */}
      <div className="mb-4">
        <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded ${badgeColor}`}>
          {providerConfig?.label.replace('の制度', '')}
        </span>
      </div>

      {/* タイトルエリア */}
      <h3 className="text-lg font-bold text-[#1D3A52] mb-2 leading-snug">
        {support.benefit}
      </h3>
      <p className="text-xs text-gray-500 mb-6 font-medium">
        {support.name}
      </p>

      {/* 支援内容（説明文） */}
      <div className="mb-6 flex-grow">
        <p className="text-xs font-bold text-gray-500 mb-1">支援内容</p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {support.description || '詳細な支援内容は詳細ページをご確認ください。'}
        </p>
      </div>

      {/* スペック情報ブロック（薄い背景） */}
      <div className="bg-[#FAFAFA] rounded-lg p-4 mb-6 space-y-3">
        {/* 金額 */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#B33E28]/10 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[#B33E28] text-xs font-bold">¥</span>
          </div>
          <div>
            <span className="block text-xs text-gray-500 font-bold mb-0.5">金額</span>
            <span className="text-sm font-bold text-gray-900">{support.amount}</span>
          </div>
        </div>

        {/* 条件など */}
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full bg-[#1D3A52]/10 flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-3 h-3 text-[#1D3A52]" />
          </div>
          <div>
            <span className="block text-xs text-gray-500 font-bold mb-0.5">条件など</span>
            <span className="text-sm font-medium text-gray-700">{support.target}</span>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <a 
        href={support.link}
        className="mt-auto w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-600 font-bold py-3 rounded hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
      >
        詳細・相談先を見る
        <ArrowUpRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
