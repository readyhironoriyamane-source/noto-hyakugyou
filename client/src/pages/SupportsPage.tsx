import { useState, useMemo, useEffect } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowUpRight, Search, Phone, MessageCircle, AlertCircle, Calendar, Building2, Wallet, Users, TrendingUp, Construction, ArrowRight } from 'lucide-react';
import { supportSystems, SupportCategory, SupportSystem } from '@/lib/supports';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// カテゴリ定義
const CATEGORIES: { id: SupportCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'すべて表示', icon: <Search className="w-4 h-4" /> },
  { id: 'reconstruction', label: '設備の復旧・再建', icon: <Construction className="w-4 h-4" /> },
  { id: 'sales', label: '販路開拓・売上', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'hr', label: '人材・事業承継', icon: <Users className="w-4 h-4" /> },
  { id: 'finance', label: '資金繰り・相談', icon: <Wallet className="w-4 h-4" /> },
];

export default function SupportsPage() {
  const searchString = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // URLパラメータから初期フィルタを設定
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const category = params.get('category');
    if (category && CATEGORIES.some(c => c.id === category)) {
      setSelectedCategory(category);
    }
  }, [searchString]);

  // フィルタリングロジック
  const filteredSupports = useMemo(() => {
    return supportSystems.filter(support => {
      return selectedCategory === 'all' || support.category === selectedCategory;
    });
  }, [selectedCategory]);

  // 今日の日付を取得
  const today = new Date();
  const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  // 締切間近判定（7日以内）
  const isClosingSoon = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  // 期限切れ判定
  const isExpired = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* ページタイトルエリア */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            支援制度一覧
          </h1>
          <p className="text-gray-600 font-medium md:text-lg">
            {formattedDate} 現在の情報です。<br className="md:hidden" />
            お困りごとに合わせて制度を探せます。
          </p>
        </div>

        {/* フィルターエリア (Filter UI: 鎮静化) */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-12 sticky top-20 z-40">
          <h2 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2">
            <Search className="w-4 h-4" /> 困りごとで絞り込む
          </h2>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`
                  h-12 px-6 rounded-full font-bold text-sm md:text-base transition-all duration-200 flex items-center gap-2
                  ${selectedCategory === cat.id 
                    ? 'bg-[#1D3A52] text-white shadow-md scale-105' // 選択時: 深藍背景 + 白文字
                    : 'bg-white border border-gray-300 text-[#1D3A52] hover:bg-gray-50 hover:border-gray-400'} // 未選択時: 白背景 + 深藍文字
                `}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 制度カードリスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSupports.length > 0 ? (
            filteredSupports.map((support) => (
              <SupportCard 
                key={support.id} 
                support={support} 
                isClosingSoon={isClosingSoon}
                isExpired={isExpired}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-bold">条件に一致する制度が見つかりませんでした。</p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="mt-4 text-primary font-bold hover:opacity-70 transition-opacity"
              >
                すべての制度を表示する
              </button>
            </div>
          )}
        </div>

        {/* 相談誘導エリア (Consultation CTA) - 脱・緑色 */}
        <div className="bg-[#F9F8F4] rounded-2xl p-8 md:p-12 text-center border border-[#1D3A52]">
          <h2 className="text-xl md:text-2xl font-bold text-[#1D3A52] mb-4">
            どの制度を使えばいいか分からない方へ
          </h2>
          <p className="text-[#1D3A52] mb-8 font-medium">
            専門の相談員が、あなたの状況に合わせて最適な制度をご案内します。<br className="hidden md:block" />
            まずはお近くの商工会へお電話ください。
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="tel:0768-62-0181" 
              className="flex items-center justify-center gap-3 bg-[#1D3A52] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-[#1D3A52]/90 transition-colors active:scale-95 no-underline"
            >
              <Phone className="w-6 h-6" />
              商工会に電話で相談する
            </a>
            <Link href="/contact">
              <a className="flex items-center justify-center gap-3 bg-white text-[#1D3A52] font-bold py-4 px-8 rounded-xl shadow border-2 border-[#1D3A52] hover:bg-gray-50 transition-colors active:scale-95 no-underline">
                <MessageCircle className="w-6 h-6" />
                相談窓口の一覧を見る
              </a>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// 制度カードコンポーネント (Unified Card Style)
function SupportCard({ support, isClosingSoon, isExpired }: { support: SupportSystem, isClosingSoon: (d?: string) => boolean, isExpired: (d?: string) => boolean }) {
  const closing = isClosingSoon(support.deadline);
  const expired = isExpired(support.deadline);
  
  // バッジカラーの決定 (デフォルトは濃グレー)
  const badgeColor = support.badgeColor || '#2B2B2B';

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col h-full group relative overflow-hidden ${expired ? 'opacity-60 grayscale' : ''}`}
      style={{ borderLeft: 'none' }} // 左ボーダー強制削除
    >
      
      {/* 左上バッジ (Badge Style) */}
      <div className="absolute top-6 left-6 z-10">
        <span 
          className="text-white px-3 py-1 rounded font-bold text-xs tracking-wider shadow-sm"
          style={{ backgroundColor: badgeColor }}
        >
          {support.badge}
        </span>
      </div>

      {/* コンテンツエリア */}
      <div className="p-6 pt-16 flex-grow flex flex-col">
        
        {/* メインタイトル（目的） - 20px Bold #1D3A52 */}
        <h3 className="text-[20px] font-bold text-[#1D3A52] mb-2 leading-snug group-hover:text-primary transition-colors">
          {support.title}
        </h3>

        {/* 制度名（正式名称） - 14px Normal #666666 */}
        <p className="text-[14px] font-normal text-[#666666] mb-4">
          {support.officialName}
        </p>

        {/* タグリスト */}
        <div className="flex flex-wrap gap-2 mb-6">
          {support.tags.map((tag, index) => (
            <span key={index} className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded">
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
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Calendar className="w-4 h-4" />
            <span>申請期限: <span className={`font-bold ${closing ? 'text-red-600' : ''}`}>{support.deadline}</span> まで</span>
          </div>
        )}
        
        {/* 締切間近アラート */}
        {closing && !expired && (
          <div className="mb-4">
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 animate-pulse">
              <AlertCircle className="w-3 h-3" /> 締切間近
            </span>
          </div>
        )}
      </div>

      {/* アクションエリア（下線禁止・ホバーエフェクトのみ） */}
      <div className="p-6 pt-0 mt-auto text-right">
        {expired ? (
          <span className="text-sm font-bold text-gray-400 flex items-center justify-end gap-2 cursor-not-allowed">
            受付終了
          </span>
        ) : (
          <a 
            href={support.link || "#"}
            className="inline-flex items-center text-sm font-bold text-primary hover:text-accent transition-colors no-underline"
            style={{ textDecoration: 'none' }} // 下線強制削除
          >
            詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        )}
      </div>
    </div>
  );
}
